---
title: "Rust programming - Evolving post"
date: "July 11, 2025"
snippet: "Learning Rust programming from basic to application in distributed systems"
---
# Variables, Data types and functions
- Declare variables using the `let` keyword
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

- Data types: i32 - 32-bit integer, f64 - 64-bit floating point number, boo, char

- Functions: Defined with `fn` keyword
```
    fn add_nums(num1: i32, num2: i32) {
        num1 + num2 // returns the sum when no semicolon is used
    }
```

# Ownership

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
- If two threads call the above function, the compiler errors as only one thread is allowed to modify the variable at a time. `Mutex` and `Arc` could be utilized for variable sharing, which will be discussed later.