---
title: "Rust programming - Evolving post"
date: "July 11, 2025"
snippet: "Learning Rust programming from basic to application in distributed systems"
---
Disclaimer: Powered by human ideas and Google Gemini.
### Variables, Data types and functions
- Declare variables using the **let** keyword
- Immutable variables: Value cannot be change once assigned
```
    let immutable_var = 5;
    immutable_var = 10; //ERROR
```
- Mutable variables: Values can be changed once assigned
```
    let mut mutable_var = 5;
    mutable_var = 10;
```

- Data types: i32 - 32-bit integer, f64 - 64-bit floating point number, bool, char
    - unit type: () - A type without any specific data type. Used in situations where there is no useful information.

- Functions: Defined with **fn** keyword
```
    fn add_nums(num1: i32, num2: i32) {
        num1 + num2 // returns the sum when no semicolon is used
    }
```

### Ownership

There are three rules for ownership
- Each value has a single owner
- There can only be one owner at a time
- When the owner goes out of scope, the value will be dropped

```
    let s1 = String::from("hello"); // s1 is the owner of hello
    let s2 = s1; // Owenship of hello is moved to s2

    println!("{}", s1); // ERROR as s1 is not longer thw owner
```

To borrow the ownership of a value when passing it to a function, we could use reference.

```
    fun calculate_length(s: &String) -> usize {
        s.len()
    }
```
Why is ownership and borrowing required?
* It prevents data races when multiple threads try to access and change the same memeory location at the same time.
* Say there are two threads t1 and t2. They both call calculate thread and append a character to the reference string in the above function. This will lead to an error during compilation.

How to allow mutability of the variable while ensuring exclusivity ?
```
    fn increment_and_get_length(s: &mut String) -> usize {
        s.push_str("a");
        s.len()
    }
```
- Borrow the mutability of the variable into the function and modify.
- If two threads call the above function, the compiler errors as only one thread is allowed to modify the variable at a time. **Mutex** and **Arc** could be utilized for variable sharing, which will be discussed later.

### Structs, Enums and Pattern Matching

- Structs: A way to group related data together
```
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
```
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
```
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
Rust handles errors using two special enums: **Option** and **Result**

- **Option**: For values that might not exist
    - Say a function searches for an item in a list.  If the item is not present, it returns a NULL. Instead we could use Option to avoid null pointer errors.
    - Options has two variants
        - **Some(T)**: Holds a value of type T
        - **None**: Absense of a value
    ```
        fn val_comp(n: i32) -> Option<String> {
            if n == 1 {
                Some(String::from("True"))
            } else {
                None
            }
        }
    ```
    - As there are two variants, the calling function should handle them both to avoid errors.

- **Result**: For operations that can fail
    - When an operation can fail, say file writing or network request, Resut is used.
    - Result has two variants:
        - **Ok(T)**: Operation succeeded and holds the resulting value of type T
        - **Err(E)**: Operation failed and holds error value of type E
    ```
        fn connect_to_server(ip: &str) -> Result<String, String> {
            if ip.starts_with("192.") {
                Ok(String::from("Connection successful!"))
            } else {
                Err(String::from("Invalid IP address"))
            }
        }
    ```

The return type of functions in the above examples explicitly defines the type of variant types expected. For example, in case of result, the return type should ve a Result with String type for both Ok and Err.