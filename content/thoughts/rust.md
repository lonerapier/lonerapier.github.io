---
title: "Rust notes"
date: 2023-01-03:00:00:00Z
tags:
- technical
- rust
---

## principles

> Understand the difference between **aliasing** and **mutability**.

Aliasing refers to having several immutable references to `T`. Mutability refers to having single mutable reference to `T`. Rust follows **Aliasing XOR Mutability** rule. You're either allowed to have multiple references to an object or have single unique mutable reference.

- [Rust design axioms](https://smallcultfollowing.com/babysteps/blog/2023/12/07/rust-design-axioms/)
- 

## primitives

`coercion`: coercion refers to changing types on run time to a related type. for example: converting from i16 to u16. but not from sttring to int. 

Question: how rust defines the relation about conversion from one type to another?

- `unwrap()` : unwrap `Result<T, E>` into T.
	```rust
	fn total_cost(input: String) -> Result<String, Error> {}
	
	let cost = total_cost(input).unwrap();
	```

- `expect()` : catches an error and panic with that

	```rust
	let f = File::open("hello.txt").expect("File not found!");
	```

- `is_ok()` : returns bool whether returned val is Result Ok.

- `parse()` : parses number to string

	```rust
	let cost = "8".parse::<i32>();
	// OR
	let cost: i32 = "8".parse();
	```

- `?` : when returning `Result<T, E>` type from a func, if want to return error as soon as you encounter it, use `?` .

	```rust
	// qty can be "hello", in which case it'll return error due to `?`
	let qty = item_quantity.parse::<i32>()?;
	Ok(qty * 2 * 3)
	```

- `::from()` : convert primitive type to custom type

- `.into()` : converts custom to primitive type, reverse of `From`

- Every type whether primitive or custom have `traits` implemented. Each trait have different functions that the type uses. Example: `println!` utilises `Display` trait for types like `i32` or `String`. 
	- Thus, these types need to implement the following traits in order to use `println!` like functions. 
	- `Debug` trait implements `{:?}` functionality. So, whenever you implement a function for a generic type,

- `usize` : used as unsigned size type, basically `ui32`

- `const fn`: [const functions](https://doc.rust-lang.org/reference/const_eval.html) are evaluated at compile time, and have some limitations like `for` can't be used.
	- > The interpretation happens in the environment of the compilation target and not the host.

- `Deref` trait is used to enforce any smart pointer to have same functionality as a normal pointer.
	- If a type implements `Deref`, it means it can handle shared references to inner type.
	 - If a type implements `DerefMut`, it means it has access to mutable reference (exclusive) reference to inner type.
	```rust
	use std::ops::Deref;
	
	struct MyBox<T> (T);
	
	impl<T> Deref for MyBox<T> {
	    type Target = T;
	
	    fn deref(&self) -> &Self::Target {
	        &self.0
	    }
	}
	```

### Pointers and References

Both refer to same thing, i.e. an address in the virtual memory. Major differences are:
- Compiler adds several rules (borrow checker) to references, i.e. reference cannot outlive the thing it's referencing to. Mutable reference cannot be aliased.
- Pointers are more about the address. Modifying a pointer, changes the address it's pointing to.

```rust
fn main() {
	let x: u32 = 10;
	let ref_x: &u32 = &x;
	let pointer_x: *const u32 = &x;
	dbg!(x);
	dbg!(ref_x);
	dbg!(pointer_x);
}
```

### Functions and traits

`fn` type refers to any function type which also include closures.

```rust
fn(type) -> return_type
```

> [!note] there is no such thing as `&fn(type) -> return_type` as `fn()` is already a pointer type. Each named function has a distinct type since [Rust PR #19891](https://github.com/rust-lang/rust/pull/19891) was merged.

there is a difference between function item type and function return type, any named function when referred in an object always return a function item type: `fn(arg)->return_type {name}` which is different than function pointer: `fn(arg)->return_type`.

```rust
fn temp(a: i64) -> bool {
    a != 0
}
fn another_fn<F: Fn(i64)->bool>(callback: F, b: bool) -> bool {
    if b {return (callback)(b as i64)}
    b
}
fn main() {
    another_fn(|a: i64|->bool{a==0}, false);
    another_fn(temp, true);
}
```

> [!question] Use of traits is advised as it compiled to direct function call which is [better](https://stackoverflow.com/a/64446465) than function pointer. How?
> 
> This means that when you call `func_of_func` with a function item such as `func`, `callback` will be compiled to a direct function call instead of a function pointer, which is easier for the compiler to optimize.
> 
> Function pointers have to be [dereferenced](https://stackoverflow.com/a/64298764) to be called while a function call is directly called from stack.

When passing function items as args in function calls, it can't accept closures as closures doesn't implement `FnMut` trait.

#### fn item types vs fn pointer type

- item type: function types that are assignable at compile time.
- pointer type: assignable at run time

> [!question] A big question mark in my mind: how does any language define and knows what is compile time abstractable and what is run-time?

> [When](https://stackoverflow.com/questions/27895946/expected-fn-item-found-a-different-fn-item-when-working-with-function-pointer) you refer to a function by its name, the type you get is not a function pointer (e.g. `fn(u32) -> bool`). Instead, you get an a zero-sized value of the function's _item type_ (e.g. `fn(u32) -> bool {foo}`).

A big [unlock](https://stackoverflow.com/a/63173483) for understanding why closures closely emulates functions are how they are treated by the language. In rust, closures are objects that can implement `Fn*` traits which allows them to be callable. Rust desugars closure `|| a + 1` with a trait definition like this:

```rust
struct __SomeName {
        a: i32,
    }

    impl FnOnce<()> for __SomeName {
        type Output = i32;
        
        extern "rust-call" fn call_once(self, args: ()) -> Self::Output {
            self.a + 1
        }
    }
```

#### Trait objects and Fat pointers

rustc want everything to be done at compile time. It forces you to write things in such a way that less and less things are left to be done dynamically or at runtime.

> Rust accomplishes this by [performing](https://doc.rust-lang.org/book/ch10-01-syntax.html#performance-of-code-using-generics) monomorphization of the code using generics at compile time. _Monomorphization_ is the process of turning generic code into specific code by filling in the concrete types that are used when compiled. In this process, the compiler does the opposite of the steps we used to create the generic function in Listing 10-5: the compiler looks at all the places where generic code is called and generates code for the concrete types the generic code is called with.

That's why rust's way of handling generics is quite simple and straightforward. Let's say you take a function `F` and supplies it's arguments with generic parameters `<T>`. Now, since rust doesn't know it's concrete types but it does know what other type implement this trait, and it just copies the function with all the concrete types so that at runtime, it just becomes a function call and no additional overhead is implied due to generics.

Now, you can do other thing as well, and that is, [impl trait](https://doc.rust-lang.org/rust-by-example/trait/impl_trait.html) objects in [return type](https://doc.rust-lang.org/book/ch10-02-traits.html#returning-types-that-implement-traits) of the [function](https://www.ncameron.org/blog/dyn-trait-and-impl-trait-in-rust). In usual generic argument function `fn f<T: Bar>(…)->T`, caller determines the concrete type of the function, but in case of impl Trait `fn f(…) -> impl Bar`, callee determine what function type to return so the caller only has an object of that trait type and doesn't know what concrete type it belongs to. But note that, impl trait only works when all return type is of one concrete type. So, in the example show below, function `rands(x: bool) -> impl Bar` doesn't work because it returns two different types, `Foo` and `Baz`. So, rustc throws an error that first match expression returns a `Foo` and expects second to be `Foo` as well. 

Below example doesn't work, because of how trait objects are implemented in Rust. Every [trait objects](https://stackoverflow.com/questions/67767207/why-are-trait-methods-with-generic-type-parameters-object-unsafe) is associated with a [vtable](https://users.rust-lang.org/t/v-tables-differences-between-rust-and-c/92445). That's how [fat pointers](https://stackoverflow.com/questions/57754901/what-is-a-fat-pointer?) work in rust, they generally have extra data as compared to normal pointers. In case of trait objects, it contains a vptr to trait's vtable. So, when the function is called, vptr references the vtable with an offset which calls the required function implemented by that concrete type.

```rust
trait Bar {fn bar();}
struct Foo {}
struct Baz {}
impl Bar for Foo {
    fn bar() {
        println!("foo");
    }
}
impl Bar for Baz {
    fn bar() {
        println!("baz");
    }
}
fn rands() -> impl Bar {Foo {}}

// fn rands(x: bool) -> dyn Bar { // this doesnt work
fn rands(x: bool) -> impl Bar { // this doesn't work either
    match x {
        true => Foo {},
        false => Baz {},
    }
} 
// this works
fn rands(x: bool) -> Box<dyn Bar> {
    match x {
        true => Box::new(Foo {}),
        false => Box::new(Baz {}),
    }
} 
fn main() {
	let x = rands();
	x.bar();
    let a = rands(true);
    a.bar();
}
```

Adding a `&self` to trait function makes this work, because now rust has a concrete object whose function will be determined using vtable.  Rust creates a vtable containing function pointers to each implementor class of the trait. So, when you call `rands()`, it returns a concrete type that implements `Bar`, and then when you call `.bar()`, 

```rust
trait_object.vtable.echo(trait_object.obj, "hello")
```

rust can look up at the vtable to determine which trait objects function call happens. Following [diagram](https://users.rust-lang.org/t/v-tables-differences-between-rust-and-c/92445/8) explains how rust determines which function to call depending on vtable. Pros of this: Rust only calls what is needed, so even if a type implements ton of traits, when you use a [trait object](https://www.reddit.com/r/rust/comments/8ckfdb/were_fat_pointers_a_good_idea/), it only creates a vtable for the types implementing that trait object and not for all other traits implemented by the type.

```text
&dyn Foo (Trait Object)
+--------+----------+
| Data * | Vtable * |
+--------+----------+
    |        |
    |        v
    |     +---------------+--------+----------+-------+
    |     | drop_in_place | size   | method_1 | ...   |
    |     +---------------+--------+----------+-------+
    v
+---------+---------+--------+
| field_1 | field_2 | ...    |
+---------+---------+--------+
```

![memory layout of trait objects](https://i.imgur.com/yNB5zn5.png)

```rust
fn rands(x: bool) -> Box<dyn Bar> {
	if x {
		return Box::new(Bar{})
	}
	
	Box::new(Foo {})
}
```

- [Rust polymorphism](https://oswalt.dev/2021/06/polymorphism-in-rust/)
### Lifetimes

Lifetimes are used in association with references to tell compiler how much you need a particular reference and should compiler keep it alive for that lifetime.

Very nice implementation of `StrSplit` by Jon Gjengset shows nice usage lifetimes, multiple lifetimes and generics.

```rust
// This is the struct with that lifetime, it has a remainder and delimiter.
// Note the usage of `'a` here, which is a lifetime used to tell the compiler
// the lifetime of a particular variable.
#[derive(Debug)]
pub struct StrSplit<'a, D> {
    remainder: Option<&'a str>,
    delimiter: D,
}

impl<'a, D> StrSplit<'a, D> {
    fn new(string: &'a str, delimiter: D) -> Self {
        StrSplit { remainder: Some(string), delimiter}
    }
}

impl<'a, D> Iterator for StrSplit<'a, D>
where
    D: Delimiter {
    type Item = &'a str;
    fn next(&mut self) -> Option<Self::Item> {
        if let Some(ref mut remainder) = self.remainder {
            if let Some((start, end)) = self.delimiter.find_next(remainder) {
                let res = &remainder[..start];
                *remainder = &remainder[end..];
                Some(res)
            } else {
                self.remainder.take()
            }
        } else {
            None
        }
    }
}

pub trait Delimiter {
    fn find_next(&self, s: &str) -> Option<(usize, usize)>;
}

impl Delimiter for &str {
    fn find_next(&self, s: &str) -> Option<(usize, usize)> {
        s.find(self).map(|start| (start, start + self.len()))
    }
}

impl Delimiter for char {
    fn find_next(&self, s: &str) -> Option<(usize, usize)> {
        s.char_indices().find(|(_, c)| c == self).map(|(start, _)| (start, start + self.len_utf8()))
    }
}

fn until_char(s: &str, c: char) -> &str {
    StrSplit::new(s, c).next().unwrap()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works_until_char() {
        assert_eq!(until_char("hello world", 'o'), "hell");
    }

    #[test]
    fn it_works() {
        let haystack = " a b c d e ";
        let letters: Vec<_> = StrSplit::new(haystack, " ").collect();
        assert_eq!(letters, vec!["", "a", "b", "c", "d", "e", ""]);
    }
}
```

### Generics

```rust
// Struct
struct GenVal<T> {
    gen_val: T,
}

// impl
impl<T> GenVal<T> {
    fn value(&self) -> &T {
        &self.gen_val
    }
}

// A trait generic over `T`.
trait DoubleDrop<T> {
    // Define a method on the caller type which takes an
    // additional single parameter `T` and does nothing with it.
    fn double_drop(self, _: T);
}
// Implement `DoubleDrop<T>` for any generic parameter `T` and
// caller `U`.
impl<T, U> DoubleDrop<T> for U {
    // This method takes ownership of both passed arguments,
    // deallocating both.
    fn double_drop(self, _: T) {}
}
```

Can define generic trait, then `impl` can be generic or concrete, and it can be further restricted with other traits.

```rust
// generic trait with T restricted in fn
pub trait Surtur<T> {
  fn sort(&self, slice: &mut [T]
  where
    T: Ord + Copy;
}

// unit struct
pub struct StdSort;

// generic trait impl for struct restricted at impl level
impl<T> Surtur<T> for StdSort
where
  T: Ord {

  fn sort(&self, slice: &mut [T]) {}
}

// Another unit struct
pub struct GenericSort;

// generic trait impl for struct restricted at fn level
impl<T> Surtur<T> for GenericSort {
  fn sort(&self, slice: &mut [T])
  where
    T: Ord + Copy {}
}
```

### Macros

```rust
#[macro_export]
macro_rules! avec {
  ( $($x:expr),* ) => {
    {
      let mut _vec = Vec::with_capacity(avec![@COUNT; $($x),*]);
      $(_vec.push($x);)*
      _vec
    }
  };
  ( $($x:expr,)* ) => {
    avec![$($x),*]
  };
  ( $x:expr; $count:expr ) => {
    {
      let mut vs = Vec::new();
      vs.resize($count, $x);
      vs
    }
  };
  (@COUNT; $($x:expr),*) => {
    <[()]>::len(&[$(avec![@SUBST; $x]),*])
  };
  (@SUBST; $_:expr) => {()};
}

#[test]
fn it_works() {
  let x: Vec<i32> = avec![];
  assert!(x.is_empty());
  assert_eq!(avec![1, 2, 3,], vec![1, 2, 3]);
  assert_eq!(avec![1; 3], vec![1, 1, 1]);
}
```

Some examples to learn rust declarative macros from:

#### Macro for Implementing Getters

```rust
pub struct Person {
    name: String,
    age: u32,
}
macro_rules! generate_getters {
    ($type_name: ty, $($getter_name: ident, $elem_name: ident, $elem_type: ty),+) => {
        $(impl $type_name {
            pub fn $getter_name(&self) -> $elem_type {
                &self.$elem_name
            }
        })+
    };
}
```

#### Macro for implementing default trait

```rust
pub enum Help {
    Cry,
    SoS,
    Noop,
}
pub struct Elf(Help);
macro_rules! impl_default_elf {
    ($type: ty, $default_val: expr) => {
        impl Default for $type {
            fn default() -> Self {
                Self($default_val)
            }
        }
    };
}
impl_default_elf!(Elf, Help::SoS);
```

#### Macro for enum parsing

[Resource](https://palant.info/2023/04/17/processing-a-complex-syntax-with-rusts-declarative-macros/)

```rust
enhanced_enum!(
    Chicks {
        BBW,
        Redhead,
        Latina,
        Age(u8),
        Ass,
    },
    name_chick
);
macro_rules! enhanced_enum {
    ($type: ident {
		$($variant: tt)*
	}, $method_name: ident) => {
        #[derive(Debug)]
        pub enum $type {
            $($variant)*
        }

        impl $type {
	        // pub fn $method_name(&self) -> &'static str {
    		// 	another_enum_impl!(self, $($variant)*);
			// 	""
        	// }
			another_enum_match_impl!([] $($variant)*);
        }
    };
}
// using if expression
macro_rules! another_enum_impl {
    ($self:ident, $variant: ident, $($rest: tt)*) => {
        if let Self::$variant = $self {
            return stringify!($variant);
        }
    };
    ($self: ident, $variant:ident($type: ty), $($rest:tt)*) => {
        if let Self::$variant(_) = $self {
            return stringify!($variant);
        }
    };
}

// using tt munching: variable tt matcher expression
macro_rules! another_enum_match_impl {
    ([$($processed:tt)*] $variant:ident, $($rest: tt)*) => {
		another_enum_match_impl!{[
			$($processed)*
			Self::$variant => stringify!($variant),
		] $($rest)*}
	};
    ([$($processed:tt)*] $variant:ident($type:ty), $($rest:tt)*) => {
		another_enum_match_impl!{[
				$($processed)*
				Self::$variant(_) => stringify!($variant),
			] $($rest)*
        }
	};
	([$($processed:tt)*]) => {
		pub fn name(&self) -> &'static str {
			match self {
				$($processed)*
			}
		}
	};
}
```

- [Dtolnay's proc macro workshop](https://github.com/dtolnay/proc-macro-workshop)
- [crust of rust - declarative macros](https://www.youtube.com/watch?v=q6paRBbLgNw)
- [macros in rust](https://blog.logrocket.com/macros-in-rust-a-tutorial-with-examples/)
- [book of rust macros](https://veykril.github.io/tlborm/syntax-extensions.html)

### Iterators

```rust
trait IteratorExt
where
    Self: Iterator + Sized,
{
    fn flatten_ext(self) -> Flatten<Self>
    where
        Self::Item: IntoIterator;
}

impl<T> IteratorExt for T
where
    T: Iterator,
{
    fn flatten_ext(self) -> Flatten<Self>
    where
        Self::Item: IntoIterator,
    {
        flatten(self)
    }
}

// This is the main function flatten which takes any two level nested iterator and returns Flatten struct.
// Defined on generic `O` which has to implement `IntoIterator` and it's item also has to implement `IntoIterator`

fn flatten<O>(iter: O) -> Flatten<O::IntoIter>
where
    O: IntoIterator,
    O::Item: IntoIterator,
{
    Flatten::new(iter.into_iter())
}

// Struct which houses outer and inner iterators to move on the data structure.
// Is generic on `O` such that O has to iterator and O's item has to implement `IntoIterator`
struct Flatten<O>
where
    O: Iterator,
    O::Item: IntoIterator,
{
    outer: O,
    iter_next: Option<<O::Item as IntoIterator>::IntoIter>,
    iter_back: Option<<O::Item as IntoIterator>::IntoIter>,
}

// Constructor fn
impl<O> Flatten<O>
where
    O: Iterator,
    O::Item: IntoIterator,
{
    fn new(iter: O) -> Self {
        Flatten {
            outer: iter,
            iter_next: None,
            iter_back: None,
        }
    }
}

// Implements Iterator trait's next function for `Flatten` struct
impl<O> Iterator for Flatten<O>
where
    O: Iterator,
    O::Item: IntoIterator,
{
    type Item = <O::Item as IntoIterator>::Item;
    fn next(&mut self) -> Option<Self::Item> {
        loop {
            if let Some(ref mut inner_iter) = self.iter_next {
                if let Some(res) = inner_iter.next() {
                    return Some(res);
                }

                self.iter_next = None;
            }

            if let Some(next_inner) = self.outer.next() {
                self.iter_next = Some(next_inner.into_iter());
            } else {
                return self.iter_back.as_mut()?.next();
            }
        }
    }
}

// Implements DoubleEndedIterator's next_back fn for `Flatten` struct
impl<O> DoubleEndedIterator for Flatten<O>
where
    O: Iterator + DoubleEndedIterator,
    O::Item: IntoIterator,
    <O::Item as IntoIterator>::IntoIter: DoubleEndedIterator,
{
    fn next_back(&mut self) -> Option<Self::Item> {
        loop {
            if let Some(ref mut inner_iter) = self.iter_back {
                if let Some(res) = inner_iter.next_back() {
                    return Some(res);
                }

                self.iter_back = None
            }

            if let Some(next_back_inner) = self.outer.next_back() {
                self.iter_back = Some(next_back_inner.into_iter());
            } else {
                return self.iter_next.as_mut()?.next_back();
            }
        }
    }
}
```

- [Effectively using iterators in rust](https://hermanradtke.com/2015/06/22/effectively-using-iterators-in-rust.html/)

### Cargo

```toml
[workspace]
members = ["node", "narwhal-shim", "evm-client"]
```

workspace: used to add different packages together in a project with same `cargo.lock`.

### Error Handling

- [Error Handling in Rust](https://blog.burntsushi.net/rust-error-handling/)
- [Error Handling in Rust](https://www.sheshbabu.com/posts/rust-error-handling/)
- [Error handling](https://www.shuttle.rs/blog/2022/06/30/error-handling)
- [Error Handling In Rust - A Deep Dive | A learning journal](https://www.lpalmieri.com/posts/error-handling-rust/)
- [Why is recursion not suggested in Rust?](https://stackoverflow.com/questions/65948553/why-is-recursion-not-suggested-in-rust)

### Closures

`closures`: lambdas instantiated as:

```rust
let a = || {
// body
};
```


[[rust-multithreading]]



### [[rust-multithreading|Interior mutability]]
### [[rust-multithreading|async]]
### ffi
- `extern` blocks: mark functions or statics as external items not defined in the current crate.
```rust
use libc::size_t;

// "C" represents ABI of the external library
// can be following values:
// - "Rust"
// - "C"
// - "system": windows API
unsafe extern "C" {
	// variadic function: allows any number of variables
	unsafe fn foo(size: size_t, ...); 
	unsafe fn bar(x: i32, ...); 
	unsafe fn with_name(format: *const u8, args: ...); 
	// SAFETY: This function guarantees it will not access 
	// variadic arguments. 
	safe fn ignores_variadic_arguments(x: i32, ...); 
}
```

- `#[repr()]`: representation of a struct in memory depending on the alignment and packing.
	- values allowed: `C, Rust, transparent`
	- functions: `align(), packed()`
	- difference between the three reprs?
	- is repr preemptive, i.e. if an outer struct is repr C, then will an inner Rust repr struct be changed to C repr or will it retain its own representation?
		- It retains the original representation.
```rust
#[repr(C, align(8))]
struct Complex {
	re: i32
	im: i32
	sign: bool
}

// default repr: Rust
struct Quaternions {
	a: i32
	b: i32
	c: i32
	d: i32
}

#[repr(C)]
enum VectorSpace {
	R(Real),
	C(Complex),
	Q(Quaternions),
}
```

- `#[no_mangle]`
- `#[link(name = "library_name", kind = "static|dylib|framework", modifiers = "+whole-archive,-xyz")]`: tells compiler to link to which native library
	- How does the compiler know where to find the library?
	- how can i link to custom library?
- bindgen: generating rust bindings for c/cpp libraries, i.e. rust -> c/cpp 
- cbindgen: generating c header files for rust libraries, i.e. c -> rust
- cxx: 
- [FFI - The Rustonomicon](https://doc.rust-lang.org/nomicon/ffi.html)

## Advanced Topics
### Allocation
### Memory Layout

- [Rust enums memory layout](https://www.eventhelix.com/rust/rust-to-assembly-enum-match/)
- 
#### Resources

- [understanding allocations in rust](https://speice.io/2019/02/understanding-allocations-in-rust.html)
- [std::allocator by Andrei Alexandrescu](https://www.youtube.com/watch?v=LIb3L4vKZ7U&t=21s)
- [allocation api](https://notes.iveselov.info/programming/allocation-api-and-allocators)
- [rust custom allocators](https://nical.github.io/posts/rust-custom-allocators.html)
- [tsoding malloc impl](https://www.youtube.com/watch?v=sZ8GJ1TiMdk)

#### Things that i'm missing with Rust
- raw pointers
- Box, Rc, Arc, Mutex, Cell, Refcell, Borrow, Cow, 
- Async rust: Future, 
- How ownership is being handled? where copy and clones are happening? how can i use more pointers? 

## Unstable features
### Specialisation
Extends rust trait's functionality to have overloading like feature using [specialisations](https://rust-lang.github.io/rfcs/1210-impl-specialization.html).

> [!question] "traits today can provide static dispatch in Rust,"
> what's the meaning of static dispatch?


## std crates
- [std](https://doc.rust-lang.org/nightly/std/index.html)
- [arch](https://doc.rust-lang.org/nightly/core/arch/index.html)
- [alloc](https://doc.rust-lang.org/nightly/alloc/index.html)


## Crates
- [cargo fuzz](https://rust-fuzz.github.io/book/cargo-fuzz.html)
- pyo3
- polars
- riverml
- tokenizers
- 

## Resources

- [Rust Reference](https://doc.rust-lang.org/reference/introduction.html)
- [rust design patterns](https://www.reddit.com/r/rust/comments/1bn8s72/share_rust_design_patterns/)
- ["Basic Things", matklad](https://matklad.github.io/2024/03/22/basic-things.html)
	- Good readme, `architecture.md` for large projects
	- dev and user docs
	- use workspaces
	- test features, not code
	- "What is the purpose of review?", author should lay out what it want from the reviewer.
	- 
- [\_02\_\_reference\_types in dtolnay - Rust](https://docs.rs/dtolnay/latest/dtolnay/macro._02__reference_types.html)

### Interesting Questions
- [reborrowing of mutable references](https://stackoverflow.com/questions/65474162/reborrowing-of-mutable-reference)
- [Rust axioms](https://smallcultfollowing.com/babysteps/blog/2023/12/07/rust-design-axioms/)
- [rust + category theory abstractions](https://twitter.com/jtriley_eth/status/1767940959223026112)
- [Good advanced rust resource](https://www.youtube.com/@TomMarksTalksCodeLIVE/videos)
- [Good rust avoidances](https://x.com/saxenism/status/1831580655467295087)
- 