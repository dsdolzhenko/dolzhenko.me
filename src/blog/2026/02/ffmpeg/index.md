---
date:  2026-02-09T20:30+00:00
title: Optimising short screencasts using ffmpeg
tags:
  - tools
  - cli
  - ffmpeg
  - avif
---

For the previous post [on file completion in Emacs](/blog/2026/02/file-name-completion-in-emacs/) I wanted to attach a short screencast demonstrating the feature in action.

I recorded it with macOS's Screenshot app and then converted into gif using ffmpeg, so that it plays automatically:

```
ffmpeg -i emacs-cape-file.mov emacs-cape-file.gif
```

By default, the resolution of the videos recorded by Screenshot is quite high, so no surprise that the output gif turned out to be huge _1.4M_.
Even though it was only part of the screen recorded, the resolution was _1730x1658_, which is way more than I needed to publish it on a web page.

To reduce the resolution, we can apply a filter:

```
ffmpeg -i emacs-cape-file.mov -filter:v scale=768:-1 emacs-cape-file.gif
```

This reduced the resolution to _768x736_ and the file size to _427K_, which is much better but still too big for such a short video.

Another thing we can do is to reduce the frame rate before converting to gif.
In screencast videos there are usually not many things that are changing between frames, so you may not even notice a difference:

```
ffmpeg -i emacs-cape-file.mov -filter:v fps=5,scale=768:-1 emacs-cape-file.gif
```

However, it only reduced the file size by about half: _247K_.

Converting the screencast using an encoding that supports compression, like H264, for example, would reduce the size to just _61K_.
But I didn't want it to be displayed as video.

```
ffmpeg -i emacs-cape-file.mov -filter:v fps=5,scale=768:-1 emacs-cape-file.mp4
```

I've been using AVIF format for pictures on this blog for a while.
All of the pictures I attach are automatically converted into several options using [@11ty/eleventy-img](https://github.com/11ty/eleventy-img) plugin and included into a page using `<picture>` tag.

Avif is a modern image format based on the AV1 video format.
It's [supported](https://caniuse.com/?search=avif) by all major browsers now.

What I didn't know is that it also supports animated image sequences with proper compression and ffmpeg supports it too.

```
ffmpeg -i emacs-cape-file.mov -filter:v fps=5,scale=768:-1 emacs-cape-file.avif
```

So with such a simple command I can get a short screencast as an animated picture (just _52K_ in size) I can add to a page using `<img>` tag.
