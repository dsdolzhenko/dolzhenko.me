---
title:    "First impressions of Clojure"
date:     2018-01-28
---

I've spent the last several weeks learning and practicing with Clojure. And in this post, I would like to share my first impressions of the language and its ecosystem.

### My way to Clojure

I started my career as a web developer, mostly coding on PHP and JavaScript. Two years ago I swapped PHP with Java, and now write most of my code in it. Alongside with it, I used C/C++, Python, and Perl. So I’ve only had experience with mainstream, c-like imperative languages and never had any experience with languages like LISPs. They were almost always out of my view. And when they occasionally appeared to me, they seemed too weird and esoteric. I suppose mostly because of unusual syntax. But time goes, and a few years ago I learned about Clojure. Even though I was impressed by the language, I decided to take up it only a few weeks ago.

### The syntax

At first glance, especially for those who have never encountered with LISPs, Clojure may seem a little bit peculiar. Plenty of parentheses, strange order of arguments, and different order of execution of expressions. But in fact, that is just a wrapping and not an essence of the language. After a while, I got used to Clojure’s syntax and could read and write code on it as well as in other languages that I used before.

One of the distinctive and impressive to me features of Clojure’s is that Clojure programs are written using the same syntax that is used to describe data structures, using so-called [S-expressions](https://en.wikipedia.org/wiki/S-expression). It is a legacy of LISPs, that makes it easy to work with “code as data” instead of “code as text” and that reduces meta-programming just to manipulation of lists.

### Functional programming

Clojure is a functional programming language. But at the same time, it doesn't force you to use the functional approach everywhere and if you need you can switch to imperative one whenever you need.

Alongside with it, Clojure provides the bunch of powerful tools to avoid problems with the mutable state, e.g., a software transactional memory system, [communicating sequential processes](https://en.wikipedia.org/wiki/Communicating_sequential_processes), persistent data structure, and others.

_The philosophy behind Clojure is that most parts of most programs should be functional and that programs that are more functional are more robust._

That makes Clojure, in my opinion, a good starting point into the functional programming world.

### Interactive development

I use a debugger all the time, especially when I need to figure out what is going on in an unfamiliar source code written in Java or JavaScript for example. In Clojure, you can also use a debugger, but it is not an idiomatic way to develop and investigate problems in it. Instead of this Clojure developers widely use REPL.

REPL (Read Eval Print Loop) allows you to try new library functions or evaluate an arbitrary piece of code and get the result right away. But what is most important is that it lets you work in a context of running application. So, you can not just evaluate code from your project's code base or read variable's values, but even redefine functions or define new ones and update values of variables on the fly.

### Conclusion

I don’t think that Clojure ever becomes a mainstream programming language, but it has a niche and solves tasks that it was designed for pretty well.

If you are not familiar with Clojure yet, I highly recommend you to try it even if you are not going to use it at work. Learning such a language as Clojure can be rewarding.

As for me, my journey into Clojure world hasn't completed. I'm not going to use it at work in near future, but I’m going to develop few side projects with it, and I’m sure it will be fun.
