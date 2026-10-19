---
title: "06 · Headless Host (Capture Card + OBS)"
description: "Give a \"monitor-less dev board / motherboard\" a keyboard and mouse — no need to provide it with its own monitor: video goes through a capture card into your …"
---

# 06 · Headless Host (Capture Card + OBS)

> [← Back to overview](/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Applies to: JUXI Technology KVM&HUB&TTL

Give a "monitor-less dev board / motherboard" a keyboard and mouse — **no need to provide it with its own monitor**: video goes through a capture card into your computer, and the keyboard/mouse go through the KVM switch.

## How It Works

```
Dev board (no monitor) ──video──→ capture card ──USB──→ your computer (view in an OBS window)
Dev board (no monitor) ──keyboard/mouse──→ ←── KVM switch ──→ your computer (same keyboard/mouse)
```

## Steps

**① Connect video** (feed the host's video output into a **4K HDMI capture card**, whose USB end plugs into your computer):

| Host output | Wiring |
|---|---|
| HDMI | HDMI cable → capture card |
| Micro HDMI (Raspberry Pi, etc.) | Micro-HDMI adapter → HDMI cable → capture card |
| DP | DP-HDMI adapter → HDMI cable → capture card |

**② Connect keyboard/mouse**: plug the keyboard/mouse (or wireless receiver) into this product's USB-A port, then press the button to **switch them to the dev board**.

**③ View and operate**: on your computer, add a "Video Capture Device" in **OBS** or **PotPlayer** — watch the dev board's screen and type on the keyboard.

(Illustration: tutorial asset 06 – Dev board + capture card setup, 07 – capture card wiring, 08 – OBS guide, 09 – PotPlayer guide)

## Tips

- Connect the capture card **directly to the computer** (not through the KVM's USB ports) for a stable picture.
- After switching the keyboard/mouse away, the dev board stops responding to them — press the button once to switch back.

<RelatedProducts slugs="kvm-switch" />
