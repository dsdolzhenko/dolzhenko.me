---
date:  2025-03-23T14:00+00:00
title: Launching Magit from IntelliJ IDEA
tags:
  - til
  - emacs
  - idea
---

For a large portion of git operations I use daily, I find [Magit](https://magit.vc/)’s interface much more convenient than git’s own CLI or IntelliJ’s UI. Although, I don’t use Emacs for all my coding projects, I’d like to have a shortcut to quickly open Magit for any git repository, either from a terminal or IDEA.

When I’m in a terminal and need to open a file or a directory in Emacs, I call the following wrapper, which I have in my `$PATH` as `emacsclient`:

```bash
#!/usr/bin/env bash

# Bring Emacs frame to the foreground
osascript << EOF
tell application "System Events"
	tell application process "Emacs"
		set frontmost to true
	end tell
end tell
EOF

/Applications/Emacs.app/Contents/MacOS/bin/emacsclient "$@"
```

The wrapper simply brings the current Emacs window to the foreground and calls `emacsclient` passing the arguments to it.

Now, to open Magit from a terminal, I have another bash script that opens Magit’s status view for the current git repository in the running Emacs.

```bash
#!/usr/bin/env bash

set -o errexit

git_root=$(git rev-parse --show-toplevel)

emacsclient -e "(magit-status \"${git_root}\")" > /dev/null
```

Now coming to the IDE, I didn’t know that before but you can configure a third-party command-line application as an external tool.
You can pass the project’s root or any of [the predefined macros](https://www.jetbrains.com/help/idea/built-in-macros.html) to it as an argument.

{% picture "magit-external-tool.png", "External tool configuration UI in IntelliJ IDEA" %}

What more is that you can bind a shortcut to it.

{% picture "magit-keymap.png", "Keymap configuration UI in IntelliJ IDEA" %}
