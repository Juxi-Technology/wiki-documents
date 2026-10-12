---
title: Troubleshooting and Quick Reference
---

# Troubleshooting and Quick Reference

> **Section:** [troubleshooting/](01-Troubleshooting.md)
> **Related:** [deployment/](../deployment/01-Overview.md) ·
> [xlerobot/](../xlerobot/01-Operation.md) ·
> [lerobot/](../lerobot/01-Operation.md)

---

## Common problems

### The container can't see the robot's serial port

```bash
# Confirm the device exists on the host
ls /dev/ttyACM*
# Confirm the user is in the dialout group
groups | grep dialout
```

If you're not in the group, run `sudo usermod -aG dialout $USER` and then **log out and back in**.

### Pulling the image hangs / times out

The registry mirrors aren't configured. See [02-Environment-Setup](../deployment/02-Environment-Setup.md), section 2.

### Model download fails / can't reach Hugging Face

Set `-e HF_ENDPOINT=https://hf-mirror.com`.
See [02-Environment-Setup](../deployment/02-Environment-Setup.md), section 4.

### The rerun visualization window crashes

```
thread 'main' panicked at 'Library libxkbcommon-x11.so could not be loaded.'
```

Missing X11 libraries. **The robot itself is unaffected** — you just can't see the window.
For the install command and the caveats, see [xlerobot/](../xlerobot/01-Operation.md), section 1 —
the key point is that `docker exec` **must include `-u root`**.

### `torch.cuda.is_available()` is False in the container

- Using a `cpu` / `cpu-slim` image → normal; those images have no GPU to begin with
- Using the `jetson` image → check whether you used `--runtime nvidia`
  (**you must use `--device nvidia.com/gpu=all`**), and whether the CDI spec was generated

### The container won't start, reporting a CDI error

```
CDI device injection failed: failed to stat CDI host device "/dev/dri/card0"
```

The auto-refresh service on the host generated a spec that references a nonexistent `card0`. To fix:

```bash
sudo systemctl disable --now nvidia-cdi-refresh.path nvidia-cdi-refresh.service
sudo rm -f /var/run/cdi/nvidia.yaml
sudo systemctl restart docker
```

(This problem reproduces on our own board after every reboot; for details, see
developer/03-Board-Remote-Testing.md.)

### Calibration has to be redone every time

The calibration files live inside the container and disappear the moment it's deleted. Mount the cache directory at startup:

```bash
-v ~/.cache/huggingface:/home/jetson/.cache/huggingface
```

`scripts/run.sh` already does this.

### The calibration command reports `invalid choice: 'xlerobot'`

Not a fault — it's by design. The `lerobot-calibrate` command-line tool doesn't support XLeRobot;
calibration is triggered automatically in the example scripts. See [xlerobot/](../xlerobot/01-Operation.md), sections 0 and 3.

### A wall of torchcodec errors during dataset operations

If you're using an environment you **installed yourself** rather than the image, you may see
`libnvrtc.so.13: cannot open shared object file`. That's torchcodec failing to load in a CPU-only
environment; lerobot automatically falls back to pyav, and functionality is unaffected.
The image has it uninstalled, so this error doesn't occur.

### Importing two robot variants in the container raises an error

```
Cannot register ... as xlerobot because ... is already registered
```

It only happens between **the pair `xlerobot` and `xlerobot_mecanum`** — both register as `"xlerobot"`
in the source (the mecanum config was copied and its registration name was never changed). This is an upstream XLeRobot bug.

**Every other combination is fine**: all the original LeRobot robots plus XLeRobot can **coexist in the same process**
(8 types registered together successfully in testing), and `xlerobot_2wheels` doesn't collide either.

One robot only ever uses one variant, so real-world use is unaffected. If you really need both at once (say, writing
a comparison script), run them in separate processes.

---

## Problems with the original `lerobot-*` commands

### `lerobot-record` reports camera-related errors / recorded data has no images

Cameras must be passed through `--robot.cameras` as a **nested dict**, not as separate top-level parameters:

```bash
--robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }"
```

Note it's `index_or_path` (not `index`), and `front` is the camera's name — you can define several.
For a complete example, see [lerobot/](../lerobot/01-Operation.md), section 6.

### `lerobot-eval` doesn't work on a real robot

`lerobot-eval` is for **simulation benchmarks** (`--env.type=aloha/pusht/libero/metaworld...`);
it is **not a real-robot deployment tool**.

To run a trained policy on a real robot, use **`lerobot-rollout`**:

```bash
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<your-username>/<my-model> --strategy.type=base
```

### Can't tell whether to use `examples/` or `lerobot-*`

| Your hardware | Which to use |
|---|---|
| Whole XLeRobot (dual arms + base) | `examples/` scripts → [xlerobot/](../xlerobot/01-Operation.md) |
| A single SO-101 / SO-100 arm, LeKiwi | `lerobot-*` command line → [lerobot/](../lerobot/01-Operation.md) |

The test is simple: the `lerobot-*` robot whitelist **has no `xlerobot`** (full list in
[lerobot/](../lerobot/01-Operation.md), section 11).

### `--robot.type` is passed but reports `invalid choice`

Check against the full list in [lerobot/](../lerobot/01-Operation.md), section 11 —
only those 14 original types are accepted. `xlerobot` isn't among them; use the `examples/` scripts.

---

## Quick reference

### General (both paths)

```bash
# Pull the image
docker pull chenyang310/xlerobot:cpu-slim

# Start (generic)
bash scripts/run.sh cpu

# Start (Jetson, with GPU)
bash scripts/run.sh jetson

# After entering the container — first-time setup
lerobot-find-port                     # Find the serial port (interactive — unplug and replug the servo cable when prompted)

# Install the two X11 libraries rerun needs (in a separate terminal; -u root can't be omitted)
docker exec -u root -it xlerobot bash -c "apt-get update && apt-get install -y libxkbcommon-x11-0 libxinerama1"

# Training (shared by both paths: doesn't need robot.type)
lerobot-train --policy.type=act --dataset.repo_id=<username>/<dataset-name>

# Self-check
python -c "import torch, lerobot; print(torch.__version__, lerobot.__version__)"
python -c "import torch; print('GPU:', torch.cuda.is_available())"
```

### A · Whole XLeRobot (dual arms + base)

```bash
# Teleoperation: one terminal is enough; the first run enters the calibration guide automatically
python examples/4_xlerobot_teleop_keyboard.py

# Two-wheel base version
python examples/4_xlerobot_2wheels_teleop_keyboard.py

# ⚠️ Don't pass xlerobot to lerobot-calibrate / lerobot-record / lerobot-teleoperate —
#    it isn't in the whitelist and only reports invalid choice. XLeRobot uses the examples/ scripts.
```

See [xlerobot/](../xlerobot/01-Operation.md) for details.

### B · Single SO-101 / LeKiwi (`lerobot-*` command line)

```bash
# Find the devices
lerobot-find-port
lerobot-find-cameras opencv

# Write IDs to new servos (only needed for a freshly assembled arm)
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0

# Calibrate
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower

# Teleoperation (keyboard — no leader arm needed)
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard

# Record a dataset
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=keyboard \
  --dataset.repo_id=<username>/<dataset-name> --dataset.num_episodes=10 \
  --dataset.single_task="pick up the cube"

# Replay to check
lerobot-replay --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --dataset.repo_id=<username>/<dataset-name> --dataset.episode=0

# Deploy the trained policy on the real robot (⚠️ not lerobot-eval — that one is for simulation)
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<username>/<model-name> --strategy.type=base
```

See [lerobot/](../lerobot/01-Operation.md) for details.

### Keymap quick reference

| Part | Key | Action |
|---|---|---|
| Base | `i` `k` `j` `l` | Forward / Back / Left / Right |
| Base | `u` `o` `n` `m` | Turn left / Turn right / Speed up / Slow down |
| Base | `b` | Exit |
| Left arm | `q/e` `w/s` `a/d` `z/x` | pan / x / y / pitch |
| Left arm | `r/f` `t/g` `c` `y` | wrist / gripper / zero / rectangular trajectory |
| Left arm | `<` `>` `,` `.` | Head servos 1 / 2 |
| Right arm | `7/9` `8/2` `4/6` `1/3` | pan / x / y / pitch |
| Right arm | `/` `*` `+` `-` `0` | wrist / gripper / zero |
| Right arm | `Y` (**uppercase**) | Rectangular trajectory |
| Other | `?` | Head return to zero |

Full details in [xlerobot/](../xlerobot/01-Operation.md), section 4.

---

## Appendix: why things in this tutorial are the way they are

| Decision | Rationale |
|---|---|
| Python 3.12 is required | lerobot 0.6.2 uses PEP 695 syntax (`type X = ...`, `class Foo[T]:`); 3.10/3.11 can't even compile it |
| Registry mirrors are mandatory in mainland China | Direct Docker Hub connections time out — measured as `context deadline exceeded` |
| HF_ENDPOINT must be configured | `huggingface.co` is completely unreachable from mainland China; `hf-mirror.com` works |
| Jetson uses CDI instead of `--runtime nvidia` | Under JetPack 6/7's cgroup v2, `--runtime nvidia` doesn't inject device nodes |
| The placo kinematics library isn't installed | It has no cp312/aarch64 wheels; XLeRobot uses its own analytic IK and doesn't depend on it |

For more technical details, see developer/01-Jetson-Environment.md.

---

## Related links

- [XLeRobot project](https://github.com/Vector-Wangel/XLeRobot)
- [LeRobot documentation](https://huggingface.co/docs/lerobot)
- [Docker Hub usage and limits](https://docs.docker.com/docker-hub/usage/)
- [Juxi Technology Wiki](https://wiki.juxitech.com)

---

> **Back to the beginning:** [deployment/01-Overview](../deployment/01-Overview.md)
> **The other path:** [xlerobot/](../xlerobot/01-Operation.md) ·
> [lerobot/](../lerobot/01-Operation.md)
