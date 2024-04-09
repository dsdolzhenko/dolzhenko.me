---
date:  2024-04-08T09:33+00:00
title: Links from last week (#1)
---

Here are a few links to things I found interesting last week.

## [emacs] [Text Expansion with Hippie Expand](https://www.masteringemacs.org/article/text-expansion-hippie-expand)

One of the cool things about Emacs is that you can always learn something new

There is a well known Emacs feature called [Abbrevs](https://www.gnu.org/software/emacs/manual/html_node/emacs/Abbrevs.html),
which allows you to expand a single character or a short series of characters into different text.

However, there's another feature, about which I wasn't aware before, called ["Hippie" Expansion](https://www.gnu.org/software/emacs/manual/html_node/autotype/Hippie-Expand.html#Hippie-Expand).
It allows to dynamically expand typed text into a number of things, including abbrevs (configured with `hippie-expand-try-functions-list`).
File names, Lisp symbols, kill ring content, whole lines, command arguments in eshell are just a few examples.

## [emacs] [org-toggle-narrow-to-subtree](https://taonaw.com/2024/04/03/another-little-gem.html)

Another neat little feature of Emacs is narrowing.
With it, you can narrow a buffer to a particular part of it, giving the illusion that you're editing a file consisting solely of that part.
The part may be a region, a function, or a block.
In org mode, it can be a block or sub-tree.

This feature proves particularly useful when dealing with large documents, allowing you to concentrate on a single section.
For instance, if you have an org document containing your ongoing projects and associated tasks as sub-headings, you may want to focus on a particular project to see only tasks related to it.

The only nuisance of the feature is the necessity of using an additional command or key binding to widen the buffer back to its original state.
However, it turns out that org mode offers a special command that enables toggling narrowing with just a single key binding.

## [tools] [ast-grep(sg)](https://ast-grep.github.io/)

> ast-grep(sg) is a fast and polyglot tool for code structural search, lint, rewriting at large scale.

At work, I mostly code in Kotlin and use Intellij IDEA, which supports structured search and replace out of the box.
It's nice to see that there now a tool that is not bound to a particular IDE or a language.

## [osdev] [Unikraft](https://unikraft.org/)

> Unikraft is a fast, secure and open-source Unikernel Development Kit

Lately, I've become interested in operating systems development. And [unikernels](https://en.wikipedia.org/wiki/Unikernel) appear to be one of the hot topics of the field.

I played around with the project a bit.
It looks very mature, with good documentation, plenty of examples, and an easy-to-use command-line tool to build and run unikernels.

This week, the company behind it also [launched a cloud platform](https://unikraft.io/blog/kraftcloud/) to host unikernels built with the kit.

## [blogs] [Elizabeth Goodspeed on the importance of taste – and how to acquire it](https://www.itsnicethat.com/articles/elizabeth-goodspeed-column-taste-technology-art-280224)

> It's not enough to be able to draw or design anymore. Now you need to have taste.

An essay by Elizabeth Goodspeed that I really enjoyed reading.
She has an interesting perspective on AI-generated content and taste.
It may be targeting artists such as designers and illustrators,
but I think the ideas can be expanded to any creative profession that is affected by the recent AI bubble in one way or another.
