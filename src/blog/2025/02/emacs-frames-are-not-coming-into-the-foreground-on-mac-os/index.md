---
date:  2025-02-26T15:41+00:00
title: Emacs frames are not coming into the foreground on macOS
tags:
  - til
  - emacs
---

I have a simple bash script in my `$PATH` to quickly open files or directories from the terminal in the running instance of Emacs.

```bash
#!/usr/bin/env bash

/Applications/Emacs.app/Contents/MacOS/bin/emacsclient "$@"
```

However, after upgrading to macOS 15.3, `emacsclient` stopped bringing the Emacs frame up front.

One of the solutions I could find suggested adding `(select-frame-set-input-focus (selected-frame))` to the Emacs config.
However, it only works when you start a new instance of Emacs.

What worked for me is adding this to the script before calling `emacsclient`:

```bash
osascript << EOF
tell application "System Events"
	tell application process "Emacs"
		set frontmost to true
	end tell
end tell
EOF
```
