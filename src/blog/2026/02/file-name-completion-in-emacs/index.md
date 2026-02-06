---
date:  2026-02-05T16:33+00:00
title: File name completion in Emacs
tags:
  - emacs
  - carnival
---

_The [Emacs Carnival](https://www.emacswiki.org/emacs/Carnival) for February is hosted by [Sacha Chua](https://sachachua.com/blog/2026/01/emacs-carnival-february-2026-completion/) and its topic is “Completion”. Below is my entry for this month's carnival._

Emacs has a myriad of ways to complete things for you in different contexts.

While the one I’d like to share with you may seem trivial, the feature is so ingrained into my workflow so that I even forgot that it’s not part of the core Emacs functionality.

I often switch from IntelliJ IDEA to Emacs (using [a convenient shortcut](/blog/2025/03/launching-magit-from-intellij-idea/)) just to use the feature.

The feature provided by a wonderful [cape.el](https://github.com/minad/cape) package which extends the Emacs’ standard completion-at-point function with a bunch of handy completion functions or Capfs, one of which is `cape-file`.

What’s good about it is that it works in any mode, programming or not, and in any context be it a string literal or a comment.

<img src="emacs-cape-file.avif" width="100%">

Here is a snippet from my `init.el`:

```
(use-package cape
  :ensure t
  :init
  (add-to-list 'completion-at-point-functions #'cape-abbrev)
  (add-to-list 'completion-at-point-functions #'cape-file)
  (add-to-list 'completion-at-point-functions #'cape-elisp-block)
  (advice-add 'eglot-completion-at-point :around #'cape-wrap-buster))
```
