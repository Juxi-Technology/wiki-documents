---
title: Original LeRobot Operation
---

# Original LeRobot Operation

> **Section:** [lerobot/](01-Operation.md) — a single SO-101 / SO-100 arm, LeKiwi
> **Prerequisite:** read through [deployment/](../deployment/01-Overview.md) first and get into the container
> **The other path:** [xlerobot/](../xlerobot/01-Operation.md) (the whole XLeRobot)
> **Next:** [troubleshooting/](../troubleshooting/01-Troubleshooting.md)

Use the `lerobot-*` command line to operate a **single SO-101 / SO-100 arm** or a **LeKiwi**.

> ⚠️ To run the **whole XLeRobot**, go back to [xlerobot/](../xlerobot/01-Operation.md).
> These command-line tools **don't support `xlerobot`** — for why, see section 0 below.

---

## 0. When to take this path

| Your hardware | Which path | Why |
|---|---|---|
| **Single SO-101 / SO-100 arm** | ✅ **This page** (`lerobot-*` CLI) | The original tools support it directly |
| **LeKiwi** | ✅ **This page** (`lerobot-*` CLI) | The original tools support it directly |
| **Whole XLeRobot** (dual arms + base) | ❌ Go to [04](../xlerobot/01-Operation.md) | There's no `xlerobot` in the CLI whitelist |

**Why two paths**: command-line tools like `lerobot-calibrate` hard-code a robot import list in the source
(14 original robots — full list in section 11), **and `xlerobot` isn't on it**. Force it through and you get:

```
lerobot-calibrate: error: argument --robot.type: invalid choice: 'xlerobot'
```

Conversely, the scripts under `examples/` are written for the whole XLeRobot and are of no use for a single arm.

**The two paths share the same environment** — the package installed in the image is just called `lerobot`,
and XLeRobot merely adds three more pieces of code to the `robots/` directory. So you can **switch at any time
without reinstalling anything**, and both can be imported together in the same process.

---

## 1. The complete workflow

```
Setup          Calibration    Using it                Training       Deploy
─────          ───────────    ────────                ────────       ──────
find-port  →  calibrate  →  teleoperate  ┐
find-cameras              record        ┴→  train  →  rollout
                          replay
```

One command per step — each is covered in turn below.

---

## 2. Setup: find the serial port and cameras

```bash
lerobot-find-port          # interactive: unplug and replug the servo cable as prompted, then it prints the port name
lerobot-find-cameras opencv   # try each camera in turn and save a screenshot
```

`lerobot-find-cameras` saves its screenshots to `outputs/captured_images/`; if you see a picture, the camera works.
**Verified working** (it detected `/dev/video0` and captured successfully).

> Both commands are **interactive** — adding `--help` directly raises an EOF, which is normal.

---

## 3. First time with new servos: write IDs

Brand-new servos all ship with ID 1; you have to change them one by one to 1–6 before they can share one bus:

```bash
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0
```

It prompts you to "connect only one servo, then press Enter"; when one is done, plug in the next.

> Only needed on a freshly assembled arm, or when you've swapped servos. Arms that already communicate fine can skip this step.

---

## 4. Calibration

```bash
lerobot-calibrate \
  --robot.type=so101_follower \
  --robot.port=/dev/ttyACM0 \
  --robot.id=my_arm
```

- **No calibration file** → guided flow: first move the arm to the middle of its range and press Enter, then walk each joint through its full range
- **Calibration file exists** → asks whether to reuse it or recalibrate

The calibration file lives at `~/.cache/huggingface/lerobot/calibration/robots/so101_follower/my_arm.json`.
**Container startup mounts `-v ~/.cache/huggingface`** (see [03-Deployment](../deployment/03-Deployment.md)), so restarting the container doesn't lose it.

For a leader-follower pair, calibrate the follower and the leader **once each**:

```bash
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower
lerobot-calibrate --teleop.type=so101_leader --teleop.port=/dev/ttyACM1 --teleop.id=my_leader
```

---

## 5. Teleoperation

### Move the follower with the leader arm (leader-follower mode)

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader
```

### No leader arm? Use the keyboard

`--teleop.type` includes `keyboard`, which needs no second piece of hardware:

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard
```

You can also use `--teleop.type=gamepad` with an Xbox controller (needs `pip install "lerobot[gamepad]"`).

### With cameras for visual feedback

```bash
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader \
  --display_data=true --display_mode=rerun
```

> Using rerun visualization likewise requires the two X11 libraries installed first — see
> [xlerobot/](../xlerobot/01-Operation.md), section 1.

---

## 6. Collect demonstration data

```bash
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=so101_leader  --teleop.port=/dev/ttyACM1 --teleop.id=my_leader \
  --dataset.repo_id=<your-username>/<my-first-dataset> \
  --dataset.num_episodes=10 \
  --dataset.single_task="pick up the cube"
```

**Parameter reference:**

| Parameter | Purpose |
|---|---|
| `--robot.cameras` | Camera configuration, **nested-dict syntax**: `name: {type: opencv, index_or_path: ..., width/height/fps}` |
| `--dataset.repo_id` | The dataset's ID on Hugging Face (a dataset recorded locally can be pushed up there too) |
| `--dataset.num_episodes` | How many episodes to record |
| `--dataset.single_task` | Task description, used at training time |
| `--dataset.root` | Add this to store somewhere else; defaults to under the cache directory |

**Keys during recording** (the terminal prompts you):

| Key | Action |
|---|---|
| `→` (right arrow) | End the current episode early and move on to the reset phase |
| `←` (left arrow) | Discard the current episode and record it again |
| `Esc` | Stop the whole recording session |

As soon as recording is done you can use the data locally. To push it to the Hub:

```bash
--dataset.push_to_hub=true
```

(Remember the container is started with `-e HF_ENDPOINT=https://hf-mirror.com`.)

---

## 7. Replay to check

After recording, replay it once to confirm the data is good before training:

```bash
lerobot-replay \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --dataset.repo_id=<your-username>/<my-first-dataset> \
  --dataset.episode=0
```

---

## 8. Training

```bash
lerobot-train \
  --policy.type=act \
  --dataset.repo_id=<your-username>/<my-first-dataset>
```

> `lerobot-train` **doesn't need `robot.type`** (it only takes a dataset and a policy type),
> so this command is **shared** with the XLeRobot path — data you recorded with XLeRobot trains the same way.
>
> Training is very compute-hungry. On CPU you can only run tiny scales; for anything practical you need a Jetson's GPU.

Optional policies (`--policy.type`): `act` (most commonly used), `diffusion`, `smolvla`,
`pi0` / `pi05` / `pi0_fast`, `groot`, `tdmpc`, `vqbet`, and more.

---

## 9. Real-robot deployment: run a trained policy

```bash
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<your-username>/<my-model> \
  --strategy.type=base
```

| Parameter | Description |
|---|---|
| `--policy.path` | The trained model (an ID on the Hub or a local path) |
| `--strategy.type` | `base` is most common; there are also `sentry`, `highlight`, `episodic`, `dagger` |
| `--inference.type` | `sync` (default) or `rtc` |

> ⚠️ **Don't use `lerobot-eval` on a real robot** — it's for **simulation benchmarks**
> (`--env.type=aloha/pusht/libero/metaworld...`), not real-robot deployment. Real robots use
> `lerobot-rollout`.

---

## 10. Full table of command-line tools

| Command | Purpose | Needs `robot.type`? |
|---|---|---|
| `lerobot-find-port` | Find the serial port | No |
| `lerobot-find-cameras` | Find cameras | No |
| `lerobot-setup-motors` | Write IDs to new servos | Yes |
| `lerobot-calibrate` | Calibrate | Yes |
| `lerobot-teleoperate` | Teleoperate | Yes |
| `lerobot-record` | Record a dataset | Yes |
| `lerobot-replay` | Replay data | Yes |
| `lerobot-train` | Train a policy | **No** (shared with XLeRobot) |
| `lerobot-rollout` | Deploy a policy on a **real robot** | Yes |
| `lerobot-eval` | **Simulation** benchmark evaluation | No (uses `--env.type`) |
| `lerobot-edit-dataset` | Edit a dataset | No |
| `lerobot-dataset-viz` | Dataset visualization | No |
| `lerobot-info` | Print environment and version info | No |

---

## 11. Robot types the CLI supports (full list)

These are all the types the `lerobot-*` command line **actually recognizes** (read out of the whitelist in the source).
**There's no `xlerobot`** — that's why the tutorial splits into two paths.

**Robots (`--robot.type`) — 14 types:**

```
openarm_follower      bi_openarm_follower     rebot_b601_follower
bi_rebot_b601_follower so100_follower         so101_follower
bi_so_follower        hope_jr_hand            hope_jr_arm
koch_follower         lekiwi                  lekiwi_client
omx_follower          unitree_g1
```

**Teleoperators (`--teleop.type`) — including:**

```
so101_leader      so100_leader      bi_so_leader      koch_leader
openarm_leader    omx_leader        rebot_102_leader  unitree_g1
keyboard          gamepad           homunculus_arm    homunculus_glove
```

> For the definitive list, rely on `--help` in your own image — different versions add and remove types.

---

## 12. A complete example (from zero to running)

```bash
# 1. Find the devices
lerobot-find-port                          # note the port name; /dev/ttyACM0 is used below
lerobot-find-cameras opencv                # note the camera; /dev/video0 is used below

# 2. Write IDs to new servos (only needed for a freshly assembled arm)
lerobot-setup-motors --robot.type=so101_follower --robot.port=/dev/ttyACM0

# 3. Calibrate
lerobot-calibrate --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower

# 4. Try the keyboard to see whether it moves
lerobot-teleoperate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --teleop.type=keyboard

# 5. Record 10 episodes
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --robot.cameras="{ front: {type: opencv, index_or_path: /dev/video0, width: 640, height: 480, fps: 30} }" \
  --teleop.type=keyboard \
  --dataset.repo_id=<your-username>/my-first-dataset \
  --dataset.num_episodes=10 --dataset.single_task="pick up the cube"

# 6. Train
lerobot-train --policy.type=act --dataset.repo_id=<your-username>/my-first-dataset

# 7. Let the arm run on its own
lerobot-rollout \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_follower \
  --policy.path=<your-username>/my-first-dataset --strategy.type=base
```

---

## Verification status

Every command on this page was **actually executed** in the `chenyang310/xlerobot:jetson` image on JetPack 7.2:

| Item | Result |
|---|---|
| Argument parsing for all 14 original `--robot.type` values | ✅ Pass |
| Argument parsing for `--teleop.type` (including `keyboard`) | ✅ Pass |
| `lerobot-calibrate` full chain | ✅ Ran up to opening the serial port, then stopped (no servos were connected at the time) |
| `lerobot-teleoperate --teleop.type=keyboard` full chain | ✅ Same as above |
| `lerobot-find-cameras opencv` | ✅ **Real hardware**: detected `/dev/video0` and captured images successfully |
| `--robot.cameras` nested syntax parsing | ✅ Pass |
| Original robots and XLeRobot **coexisting in one process** | ✅ 8 types registered together successfully |

No robot arm was connected, so **motion-level verification hasn't been done yet**. Once you connect your SO-101,
walk through section 12 — tell me if any step misbehaves.

---

> **Next:** [troubleshooting/](../troubleshooting/01-Troubleshooting.md) — look here when something goes wrong
