---
title:    "How to block all non-VPN traffic on macOS"
date:     2018-02-24
---

If you use OpenVPN (via thunnelblick or another client) on macOS, you probably know that neither in preference settings nor thunnelblick's settings there is no easy way to prohibit the use of the unsecured network before VPN connection is established. In this post, you are going to find one of the possible solutions to this problem.

Since OpenVPN creates separate network interface for the traffic that should go through it, we can just block all the traffic on other interfaces except one connection that is used by OpenVPN itself.

To do that we are going to use pf (packet filter) tool that is built-in to macOS since OS X 10.7.

Pf is a command line tool that doesn't have UI to configure it. So you need to open your most liked terminal and then create two configuration files with the following content.

/etc/pf.anchors/me.dolzhenko.pf.conf:

```
anchor "me.dolzhenko.pf"
load anchor "me.dolzhenko.pf" from "/etc/pf.anchors/me.dolzhenko.pf.rules"
```

/etc/pf.anchors/me.dolzhenko.pf.rules:

```
# Options
set block-policy drop
set fingerprints "/etc/pf.os"
set ruleset-optimization basic
set skip on lo0

# Normalization
# Scrub incoming packets
scrub in all no-df

# Filtering
# Antispoof
antispoof log quick for { lo0 en0 en2 }

# Block everything by default
block in log
block out log

# Block to/from illegal destinations or sources
block in log quick from no-route to any

# Pass packets that go through TUN interfaces
pass in quick on { utun0 utun1 } all
pass out quick on { utun0 utun1 } all

# Pass packets that go to/from VPN server
vpn = "0.0.0.0"
pass in on en0 proto { tcp udp } from $vpn
pass out on en0 proto { tcp udp } from any to $vpn

# Allow access to local networks
table <local-networks> { 10.0.0.0/8 172.16.0.0/12 192.168.0.0/16 }
pass out on en0 proto { tcp udp } from any to <local-networks>

#ICMP (ping)
pass out proto icmp from any to any

#DHCP
pass inet proto udp from port 68 to port 67
pass inet proto udp from port 67 to port 68

#DNS
pass out inet proto { tcp udp } from any to any port 53
```

_Note: Don't forget to replace `vpn = "0.0.0.0"` with IP address of your VPN server._

_Note: On your Mac the list of active interfaces may be different, so you need to change the configuration above accordingly. For example, you may have [more than two `utun` interfaces](https://github.com/Tunnelblick/Tunnelblick/issues/340) or you may use Bluetooth PAN to connect to the Internet so your `en` interface will be different._

To make sure that configuration file is correct, type the following command in your terminal.

```
$ sudo pfctl -n -v -f /etc/pf.anchors/me.dolzhenko.pf.conf
```

If everything is correct and there are no errors, you can apply packet filtering rules described in the configuration file. To do that just type the following command:

```
$ sudo pfctl -e -v -f /etc/pf.anchors/me.dolzhenko.pf.conf
```

And check that all of them was applied using the command:

```
$ sudo pfctl -a me.dolzhenko.pf -s rules
```

Now all packets except those that go through the VPN server is being dropped. And everything is great except one moment. After the next restart, macOS will reset the list of filtering rules to the default state.

To not to run that command manually every time after restart, you can register it in the launchd service that will execute it for you.

To do that just create a file with the following content:

/Library/LaunchDaemons/me.dolzhenko.pf.plist:

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE plist PUBLIC "-//Apple Computer/DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
        <key>Label</key>
        <string>me.dolzhenko.pf.plist</string>
        <key>Program</key>
        <string>/sbin/pfctl</string>
        <key>ProgramArguments</key>
        <array>
                <string>/sbin/pfctl</string>
                <string>-e</string>
                <string>-f</string>
                <string>/etc/pf.anchors/me.dolzhenko.pf.conf</string>
        </array>
        <key>RunAtLoad</key>
        <true/>
        <key>ServiceDescription</key>
        <string>FreeBSD Packet Filter (pf) daemon</string>
    <key>StandardErrorPath</key>
        <string>/var/log/pf.log</string>
        <key>StandardOutPath</key>
        <string>/var/log/pf.log</string>
</dict>
</plist>
```

Now, you can try to restart your computer and check that all required rules are applied. But before that make sure that all created files are owned by the super-user - root.

