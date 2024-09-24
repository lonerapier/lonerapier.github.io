---
title: "Multithreading"
date: 2024-08-02:12:00:00
tags:
- technical
- multithreading
---

- [ ] Green vs native threads
- [ ] threadpool
- [ ] Rust's approach (native threads)
	- [ ] tokio (green threads)
- [ ] Go's approach (green threads)

## Green vs Native threads



## Rust approach

Async/Await:
- how to use?
	- mark a function as `async fn ..`
	- get the result of an async function as `let res = some_async_fn().await?`. Note that async function always returns a `Result`, so you'll have to either explicitly transform that result or use `?` to stack the error/value.
- what even is an async function?
	- 

### Tokio approach

## References

- [CS511](https://web.stevens.edu/academic_files/courses/syllabus/CS511syl.pdf)
- [Concurrent programming](https://www.cs.ox.ac.uk/teaching/courses/2020-2021/concurrentprogramming/)
- [Concurrent and Distributed Systems](https://www.cl.cam.ac.uk/teaching/2122/ConcDisSys/)
- [CS353: Principles of Concurrency and Parallelism](https://www.cs.purdue.edu/homes/suresh/353-Spring2022/)
- [CS491](https://cs491hpcc.class.uic.edu/schedule/)
- [What every systems programmer should know about concurrency](https://assets.bitbashing.io/papers/concurrency-primer.pdf)
- [Awesome concurrency](https://gitlab.com/Lipovsky/awesome-concurrency)
- [Rust's asynchronous book](https://rust-lang.github.io/async-book/)
- [async-std book](https://book.async.rs/introduction)
- [async, concurrent or parallel](https://blog.dtornow.com/asynchronous-concurrent-or-parallel/)
- [Rust: atomics and Locks]()
- [asynchronous programming with rust]
- [Thorsten's tweet asking for resources](https://x.com/thorstenball/status/1771051150558588963)
- [KAIST CS431: Concurrent Programming](https://www.youtube.com/playlist?list=PL5aMzERQ_OZ9j40DJNlsem2qAGoFbfwb4)
- [Async rust from ground up](https://www.youtube.com/watch?v=7pU3gOVAeVQ)
- [Async Rust: the good, the bad, and the ugly - Steve Klabnik](https://www.youtube.com/watch?v=1zOd52_tUWg)
- <https://maximilianfeldthusen.github.io/rustAsync/>
- <https://jamesmcm.github.io/blog/a-practical-introduction-to-async-programming-in-rust/>
- <https://learnrust.github.io/comprehensive-rust/async.html>
- <https://github.com/jbarszczewski/rust-tokio-tutorial>
- <https://github.com/benkay86/async-applied/>
- <https://funkill.github.io/async-book-i18n/en/03_async_await/01_chapter.html>
- <https://msarmi9.github.io/posts/async-rust/>
- <https://dev.to/jbarszczewski/basics-of-asynchronous-rust-with-tokio-34fn>
- <https://blog.logrocket.com/a-practical-guide-to-async-in-rust/>
- <https://akhilsharma90.github.io/Akhil-Tutorials-Website/docs/rust/rust/async_programming_rust/>