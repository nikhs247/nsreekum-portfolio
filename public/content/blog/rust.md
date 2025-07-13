---
title: "Rust programming - Evolving post"
date: "July 11, 2025"
snippet: "Learning Rust programming from basic to application in distributed systems"
---
Disclaimer: Powered by human ideas and Google Gemini.
### Variables, Data types and functions
- Declare variables using the `let` keyword
- Immutable variables: Value cannot be change once assigned
```rust
    let immutable_var = 5;
    immutable_var = 10; //ERROR
```
- Mutable variables: Values can be changed once assigned
```rust
    let mut mutable_var = 5;
    mutable_var = 10;
```

- Data types: i32 - 32-bit integer, f64 - 64-bit floating point number, bool, char
    - unit type: () - A type without any specific data type. Used in situations where there is no useful information.

- Functions: Defined with `fn` keyword
```rust
    fn add_nums(num1: i32, num2: i32) {
        num1 + num2 // returns the sum when no semicolon is used
    }
```

### Ownership

There are three rules for ownership
- Each value has a single owner
- There can only be one owner at a time
- When the owner goes out of scope, the value will be dropped

```rust
    let s1 = String::from("hello"); // s1 is the owner of hello
    let s2 = s1; // Owenship of hello is moved to s2

    println!("{}", s1); // ERROR as s1 is not longer thw owner
```

To borrow the ownership of a value when passing it to a function, we could use reference.

```rust
    fun calculate_length(s: &String) -> usize {
        s.len()
    }
```
Why is ownership and borrowing required?
* It prevents data races when multiple threads try to access and change the same memeory location at the same time.
* Say there are two threads t1 and t2. They both call calculate thread and append a character to the reference string in the above function. This will lead to an error during compilation.

How to allow mutability of the variable while ensuring exclusivity ?
```rust
    fn increment_and_get_length(s: &mut String) -> usize {
        s.push_str("a");
        s.len()
    }
```
- Borrow the mutability of the variable into the function and modify.
- If two threads call the above function, the compiler errors as only one thread is allowed to modify the variable at a time. `Mutex` and `Arc` could be utilized for variable sharing, which will be discussed later.

### Structs, Enums and Pattern Matching

- Structs: A way to group related data together
```rust
    struct Connection {
        ip_address: String,
        port: u32,
        is_active: bool,
    }

    // Create an instance of connection
    let conn = Connection {
        ip_address: String::from("127.0.0.1"),
        port: 8080,
        is_active: true,
    }
```
- Enum: An umbrella type that can accomodate multiple possible variants for a value.
```rust
    enum ServerState {
        Offline, // unit-like
        Running(String, u32), //tuple-like: IP, active connections
        Error {code: u32, message: String}, // struct-like : error, description
    }

    let state1 = ServerState::Offline;
    let state2 = ServerState::Running(String:from("127.0.0.1"), 100)
    let state3 = ServerState::Error{
        code: 503,
        message: String::from("Service unavailable"),
    }
```
- Pattern Matching: Match with every possible variants of a data type. In case of enum, it ensure all different variants are checked. If a variant is missed, a compile time error is issued.
```rust
    enum Message {
        Write(String),
        Read,
        Acknowledge,
    }

    fn process_message(msg: Message) {
        match msg {
            Message::Write(text) => {
                println!("Writing message: {}", text);
            }
            Message::Read => {
                println!("Reading a message.");
            }
            Message::Acknowledge => {
                println!("Message acknowledged.);
            }
        }
    }
```

### Error handling with Option and Result
Rust handles errors using two special enums: `Option` and `Result`

- `Option`: For values that might not exist
    - Say a function searches for an item in a list.  If the item is not present, it returns a NULL. Instead we could use Option to avoid null pointer errors.
    - Options has two variants
        - `Some(T)`: Holds a value of type T
        - `None`: Absense of a value
    ```rust
        fn val_comp(n: i32) -> Option<String> {
            if n == 1 {
                Some(String::from("True"))
            } else {
                None
            }
        }
    ```
    - As there are two variants, the calling function should handle them both to avoid errors.

- `Result`: For operations that can fail
    - When an operation can fail, say file writing or network request, Resut is used.
    - Result has two variants:
        - `Ok(T)`: Operation succeeded and holds the resulting value of type T
        - `Err(E)`: Operation failed and holds error value of type E
    ```rust
        fn connect_to_server(ip: &str) -> Result<String, String> {
            if ip.starts_with("192.") {
                Ok(String::from("Connection successful!"))
            } else {
                Err(String::from("Invalid IP address"))
            }
        }
    ```

The return type of functions in the above examples explicitly defines the type of variant types expected. For example, in case of result, the return type should ve a Result with String type for both Ok and Err.

### Concurrency: Threads

In a distributed system, we have to handle multiple connections or tasks simultaneously. One way to achieve this behavior is using threads.

Threads can be created using `thread::spawn` function. It takes a **closure**, an anonymous, one time use function containing the code the new thread would execute.

```rust
    use std::thread;
    use std::time::Duration;

    fn main() {
        // Spawn a new thread
        thread::spawn(|| {
                for i in 1..=5 {
                    println!("{} reported by child thread", i);
                    thread::sleep(Duration::from_millis(1));
                }
            }
        );

        // Code executed by main thread
        for i in 1..=3 {
            println!("{ reported by main thread}", i);
            thread::sleep(Duration::from_millis(1));
        }
    }
```

In the above code, the print statements by the main and child thread will be interleaved. `||` used in the `spawn` function is the syntax for creating a closure. The `||` is used to define the parameters a closure will accept. The code to be executed goes inside the `{}` that follows
```rust
    // closure with no arguments
    let no_arg_closure = || {
        println!("This si a no argument closure");
    };

    // closure with a single argument
    let single_arg_closure = |num: i32| -> i32 {
        num + 1
    };
```

Function could also be passed to `spawn`. However, functions that take no arguments and return no value could be passed (`fn() -> ()`).

```rust
    fn thread_task() {
        for i in 1..=5 {
            println!("{} reported by child thread", i);
            thread::sleep(Duration::from_millis(1));
        }
    }

    fn main() {
        thread::spwan(thread_task);

        for i in 1..=3 {
            println!("{} reported by main thread", i);
            thread::sleep(Duration::from_millis(1));
        }
    }
```
In the above code examples, if the main thread finishes before the child thread, the entire program shuts down irrespective of what the child was doing. The OS reclaims the resources, however, the clean up is not carried out in an orderly fashion.

To ensure the completion of child threads, the main thread could wait for them. The `thread::spawn` function returns a `JoinHandle`. By calling the `join()` of the handle, the waiting can be enforced. In addition, to handle any errors from the child, a shortcut method called `unwrap()` could be used on the `Result` return value of `join()`. The `unwrap()` extracts the `value` from `Result` if it had the `Some(value)` variant, otherwise a panic is raised.
```rust
    use std::thread;
    use std::time::Duration;

    fn main() {
        // Spawn a new thread
        let handle = thread::spawn(|| { // JoinHandle
                for i in 1..=5 {
                    println!("{} reported by child thread", i);
                    thread::sleep(Duration::from_millis(1));
                }
            }
        );

        // Code executed by main thread
        for i in 1..=3 {
            println!("{ reported by main thread}", i);
            thread::sleep(Duration::from_millis(1));
        }

        // Wait for child thread to complete execution
        handle.join().unwrap();
    }
```
