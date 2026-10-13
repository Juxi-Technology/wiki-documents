---
title: "7 · Troubleshooting"
description: "LeLab troubleshooting by symptom: port conflicts, USB and serial issues, calibration and recording problems, and what to check next."
---

# 7 · Troubleshooting

> **Previous:** [06 Train and run inference](06-Train-and-Inference.md)

Grouped by symptom.

## The page will not open, or a port is in use

Ports **8000** and **8080** are LeLab's. A stale process is the usual cause — one you closed by closing the terminal rather than with `Ctrl+C`.

```bash
lelab --stop
```

Frees both ports. To check before starting:

```bash
curl http://localhost:8000/health
```

A JSON answer means something is running on 8000.

## In `--dev` mode the page is blank or 404

Vite serves the UI on **:8080**; the API runs on **:8000**. Browse `:8080`. Port 8000 in `--dev` gives you an API with no UI.

## The arms do not appear

Check the ports are visible to your user. On Linux, a missing group looks like the arm is not there:

```bash
ls /dev/ttyACM*
groups | grep dialout
```

If `dialout` is missing:

```bash
sudo usermod -aG dialout $USER
```

Then **log out and back in** — the group is read at login, so a new terminal is not enough.

### Only one arm is found

Use **two separate USB ports**, not a hub; both arms enumerate as the same kind of device and a shared hub can present them unreliably. To identify a port, unplug one arm and watch which list entry disappears.

## I have to recalibrate every time

Calibration files live under `~/.cache/huggingface/lerobot/` — that is, under `~/.cache/`. Cache-cleanup tools and container restarts take them.

- Back up `~/.cache/huggingface/lerobot/calibration/` somewhere durable.
- In a container, mount that directory as a volume.

### A calibrated arm behaves strangely without asking to be recalibrated

Check the selected **profile** belongs to that physical arm. Profiles are tied to one arm's zero points; swapping the arms over means recalibrating.

## A camera image is upside down or sideways

Set the camera's **Rotation** on the [Calibration tab](03-Calibration.md): 0°, 90°, 180° or 270° clockwise. An upside-down wrist camera is 180°.

**90° and 270° swap the output dimensions** — a 640 × 480 capture becomes 480 × 640.

## The trained policy does nothing useful

In order — the first two are far more common than a bad training run:

1. **Camera rotation.** Confirm inference uses the rotation used at recording time. 0° and 180° have identical image dimensions, so nothing warns you.
2. **Camera binding.** If the camera named `wrist` during recording is now a different physical camera, the policy sees the wrong image.
3. **Starting position and task description.** Inference must start from the arrangement the demonstrations started from.
4. **Checkpoints.** Try an earlier one.

## Using a phone as a camera

Browsers grant camera access (`getUserMedia`) over **HTTPS** only, except on `localhost`, so a phone connecting over the LAN is refused.

Setup guide: [`frontend/HTTPS_SETUP.md`](https://github.com/Juxi-Technology/leLab/blob/main/frontend/HTTPS_SETUP.md). Certificates are self-signed, so the browser shows a warning to accept.

The default install does **not** start with HTTPS; phone cameras need the manual start with certificate flags described there.

## A dataset cannot be opened — "not downloaded yet"

LeRobot writes the dataset index when a recording **finishes properly**. A session killed mid-episode can leave a directory that looks complete but is not. The episode data is usually still on disk; the index is what is missing. Re-record the session, and stop it with the stop button.

## Training says a package is missing

Some policy types and optional training features need dependencies that are not installed by default. The Training tab offers to install them when you select one; wait for the background install to finish before starting the job. The training log names the package if you prefer to install it by hand.

## No update notification appears

By design: the check only applies to installs made from git. An **editable install** (`pip install -e .`) is a working copy and is not checked. Update those with `git pull`.

## Still stuck

Collect the **browser console** and the **terminal running `lelab`** — the server logs the request that failed. Most of these failures are one step removed from the last thing you changed.

---

> **Back to the beginning:** [01 Overview](01-Overview.md) · [Tutorial index](https://github.com/Juxi-Technology/leLab/blob/main/README.md)

<RelatedProducts slugs="so-arm101" />
