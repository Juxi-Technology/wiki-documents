---
title: XLeRobot Operation
---

# XLeRobot Operation

> **Section:** [xlerobot/](01-Operation.md) — the whole XLeRobot (dual arms + base)
> **Prerequisite:** read through [deployment/](../deployment/01-Overview.md) first and get into the container
> **The other path:** [lerobot/](../lerobot/01-Operation.md) (a single SO-101 arm / LeKiwi)
> **Next:** [troubleshooting/](../troubleshooting/01-Troubleshooting.md)

🎯 **This page covers only running the whole XLeRobot** (dual arms + base).

To operate a **single SO-101 arm** or a **LeKiwi** with the `lerobot-*` command line, go to
[lerobot/](../lerobot/01-Operation.md) — the two paths are different.

What's on this page: calibration, teleoperation, the keymap, recording data, training, inference.

---

## 0. Pick your path first ⚠️

The image contains **two projects** with different ways to run them. **Check this table first to determine which path you're on:**

| Your hardware | Which path | Entry point |
|---|---|---|
| **Whole XLeRobot** (dual arms + base) | ✅ **This page** | Example scripts under `examples/` |
| **Single SO-101 / SO-100 arm** | ➡️ [lerobot/](../lerobot/01-Operation.md) | `lerobot-*` command line |
| **LeKiwi** | ➡️ [lerobot/](../lerobot/01-Operation.md) | `lerobot-*` command line |

**Why two paths**: command-line tools like `lerobot-calibrate`, `lerobot-record`, and `lerobot-teleoperate`
**only recognize the robot types they explicitly import** (14 original robots, **no `xlerobot`**).
Force it through and you get:

```
lerobot-calibrate: error: argument --robot.type: invalid choice: 'xlerobot'
```

**XLeRobot's entry points are the example scripts under `examples/`** (they import `XLerobot` directly).

The two paths **share the same environment** — switch at any time without reinstalling anything.

> Although the example files describe host/client two-process usage, **that part is commented out** —
> what actually runs is **direct mode**: one terminal is enough, and you don't need to launch a separate host.

---

## 1. Before your first teleoperation run: install two X11 libraries ⚠️

The image is missing two X11 libraries; **without them the rerun visualization window crashes**:

```
Failed loading libxkbcommon-x11.so.0
thread 'main' panicked at 'Library libxkbcommon-x11.so could not be loaded.'
```

**The robot itself is unaffected** (teleoperation works as usual and the keys respond) — you just can't see the visualization window,
and rerun's data channel backs up spamming WARN, which slows teleoperation down.

**In a separate terminal**, install them into the container:

```bash
docker exec -u root -it xlerobot bash -c "apt-get update && apt-get install -y libxkbcommon-x11-0 libxinerama1"
```

⚠️ **You can't omit `-u root`** — the image runs as the `jetson` user by default, and `docker exec`
also enters as that user by default, while installing apt packages requires root. Without the flag you get:

```
E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)
E: Unable to acquire the dpkg frontend lock — are you root?
```

And **the packages fail to install silently** — rerun still crashes, and it's easy to think "installing didn't help".

After installing, **restart the teleoperation script** (`Ctrl+C` to exit, then run it again).

> ⚠️ This change **only lasts for the current run** — the container is `--rm`, so it's gone on exit.
> That means you have to install the libraries again every time you restart the container.

---

## 2. Find the serial ports

```bash
lerobot-find-port
```

It prompts you to unplug and replug the servo cable, then prints the port name (for example `/dev/ttyACM0`).

> This command is **interactive** — passing `--help` directly raises an EOF, which is normal.

**XLeRobot uses two serial ports** (matching `port1` and `port2` in the config):

| Parameter | Default | Connects to |
|---|---|---|
| `port1` | `/dev/ttyACM0` | SO-101 dual arms + head camera |
| `port2` | `/dev/ttyACM1` | The servos for the base (wheels) |

You need to find both. The defaults are `/dev/ttyACM0` and `/dev/ttyACM1`; **if yours differ,
every later command must specify `--robot.port1=` / `--robot.port2=`** (see section 6).

---

## 3. Calibration: triggered automatically when you run an example — no separate command needed

⚠️ **Don't use `lerobot-calibrate --robot.type=xlerobot`**. That command-line tool only recognizes the set of robots
it explicitly imports (so100/so101/lekiwi, etc.), and XLeRobot's config **isn't on the list** —
it reports `invalid choice: 'xlerobot'`.

XLeRobot's calibration is **built into `XLerobot.connect()`**, so running any example enters it automatically:

```bash
cd /opt/xlerobot
python examples/4_xlerobot_teleop_keyboard.py
```

**What it does:**

- **No calibration file** → guided calibration starts automatically:
  1. Prompts you to "move the left arm and head servos to the middle of their travel, then press Enter"
  2. Then prompts you to "walk each joint through its full range one at a time, press Enter to stop"
  3. Same for the right arm and the base
- **Calibration file exists** → asks you: press Enter to reuse the calibration, or type `c` to recalibrate

Calibration files live in:

```
~/.cache/huggingface/lerobot/calibration/robots/xlerobot/<id>.json
```

**This directory must be mounted to the host**, otherwise you recalibrate every time the container restarts:

```bash
-v ~/.cache/huggingface:/home/jetson/.cache/huggingface
```

> If you only want to calibrate a single SO-101 arm (not the whole XLeRobot), you can use the original command —
> the `so101_follower` type is on the CLI whitelist:
> ```bash
> lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_arm
> ```

> Some examples (such as `examples/0_so100_keyboard_joint_control.py`) use
> **calibration coefficients hard-coded in the script** instead of the flow above. Which one applies depends on your robot
> variant and the example you're running — take a look at the comments at the top of the example file first.

---

## 4. Teleoperation

**One terminal is enough** (the examples use direct mode — no separate host):

```bash
cd /opt/xlerobot
python examples/4_xlerobot_teleop_keyboard.py
```

**The first run enters the calibration guide automatically** (no separate calibration command needed):

1. `Move left arm and head motors to the middle of their range of motion and press ENTER....`
   → move the left arm and head servos to the middle of their range, **press Enter**
2. `Move all left arm and head joints sequentially through their entire ranges of motion...`
   → move each joint through its full range from start to finish, **press Enter** to stop
3. Same for the right arm and the base

Once a calibration file exists, it asks: press Enter to reuse it, or type `c` to recalibrate.

### Keymap

**Base**

| Key | Action |
|---|---|
| `i` / `k` | Forward / Backward |
| `j` / `l` | Strafe left / Strafe right |
| `u` / `o` | Turn left / Turn right |
| `n` / `m` | Speed up / Slow down (three levels) |
| `b` | Exit the program |

**Left arm**

| Key | Joint |
|---|---|
| `q` / `e` | shoulder_pan (base rotation) ± |
| `w` / `s` | x (forward/back) ± |
| `a` / `d` | y (left/right) ± |
| `z` / `x` | pitch ± |
| `r` / `f` | wrist_roll (wrist rotation) ± |
| `t` / `g` | gripper Open / Close |
| `c` | Return to zero position |
| `y` | Run a rectangular trajectory (for demo/testing) |
| `<` / `>` | head_motor_1 ± |
| `,` / `.` | head_motor_2 ± |

**Right arm**

| Key | Joint |
|---|---|
| `7` / `9` | shoulder_pan ± |
| `8` / `2` | x (forward/back) ± |
| `4` / `6` | y (left/right) ± |
| `1` / `3` | pitch ± |
| `/` / `*` | wrist_roll ± |
| `+` / `-` | gripper Open / Close |
| `0` | Return to zero position |
| `Y` (**uppercase**) | Run a rectangular trajectory |

**Other**: `?` → head servos return to zero position

> The left and right arms are **mirrored**: the left uses the letter block (`q/e`, `w/a/s/d`), the right uses the numpad/number block
> (`7/9`, `4/6`, `8/2`, `1/3`). The `reset` key differs too — `c` for the left arm, `0` for the right.
> Note the rectangular-trajectory key is lowercase `y` on the left arm and **uppercase** `Y` on the right.

### Other examples

| Example | Description | Extra install needed? |
|---|---|---|
| `4_xlerobot_2wheels_teleop_keyboard.py` | Two-wheel base version | No (the two libraries are still needed first) |
| `5_xlerobot_teleop_xbox.py` | Xbox controller | Needs `pip install "lerobot[gamepad]"` |
| `7_xlerobot_teleop_joycon.py` | Joy-Con | Missing the `joyconrobotics` module — unusable |
| `8_xlerobot_teleop_vr.py` | VR | Requires mounting an XLeVR directory as well |

---

## 5. Collect demonstration data

⚠️ `lerobot-record --robot.type=xlerobot` **doesn't work** (same reason as section 0).

XLeRobot's only recording path is the VR one, and it depends on the `XLeVR` module, which isn't in the image.

**If you need it, you'll have to write your own script** using the LeRobotDataset API (the library is in the image):

```python
from lerobot.datasets.lerobot_dataset import LeRobotDataset

ds = LeRobotDataset.create(
    repo_id="<your-username>/<dataset-name>", fps=30,
    features={"observation.state": {"dtype": "float32", "shape": (6,), "names": None},
              "action": {"dtype": "float32", "shape": (6,), "names": None}},
    root="/data/ds")

# Inside the teleoperation loop:
#   ds.add_frame({"observation.state": ..., "action": ..., "task": "pick"})
#   ds.save_episode()

ds.finalize()   # must call it, otherwise the metadata isn't written to disk
```

You can use `examples/8_vr_teleop_with_dataset_recording.py` from the image as a reference,
swapping the VR part for keyboard teleoperation.

**Remember to add `-e HF_ENDPOINT=https://hf-mirror.com`**, otherwise pushing the dataset to the Hub fails.

> There's a pitfall when writing datasets: after `save_episode()` you **must call `ds.finalize()`**,
> otherwise the episode metadata is never written to disk and can't be read back later (it reports
> `Provided directory does not contain any parquet file`).

---

## 6. What if the serial ports aren't ACM0/ACM1

The examples have **no argparse** — the serial ports use the defaults from `XLerobotConfig()`:

```python
robot_config = XLerobotConfig()
robot = XLerobot(robot_config)
```

Change it to specify the ports explicitly:

```python
robot_config = XLerobotConfig(port1="/dev/ttyACM1", port2="/dev/ttyACM2")
robot = XLerobot(robot_config)
```

Then just run it again (the source is mounted, so editing host files takes effect immediately).

---

## 7. Deploy a trained model

ACT policies **need no extra dependencies** and work straight out of the image:

```python
from lerobot.policies.act.configuration_act import ACTConfig
from lerobot.policies.act.modeling_act import ACTPolicy

policy = ACTPolicy.from_pretrained("<your-username>/<model-name>")
policy.eval()

# Then run inference in a loop with the robot connected
# action = policy.select_action(batch)
```

Policies already preinstalled in the image:

| Policy | Dependencies | Notes |
|---|---|---|
| **ACT** | None | Most commonly used; verified working |
| **Diffusion** | `diffusers` | Requires the full image |
| SmolVLA / pi0 / groot | transformers | **Not preinstalled**; the packages are large and won't run on CPU |

> You **can't import two robot variants in the same process** — `xlerobot_mecanum`
> registers its config as `"xlerobot"` and collides with the base version, reporting
> `Cannot register ... already registered`. One robot uses only one variant;
> running them in separate processes works fine.

---

## 8. Training

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=<your-username>/<my-dataset-name>
```

> `lerobot-train` **doesn't need `robot.type`** (it only takes a dataset and a policy type),
> so this command works and isn't limited by section 0.
>
> Training is very compute-hungry. On CPU you can only run tiny scales; for anything practical you need a Jetson's GPU.

---

> **Next:** [troubleshooting/](../troubleshooting/01-Troubleshooting.md) — look here when something goes wrong
> **The other path:** [lerobot/](../lerobot/01-Operation.md) (run a single arm / LeKiwi with the `lerobot-*` command line)
