---
title: "07 · Troubleshooting and Lessons Learned"
description: "Pitfalls actually encountered in this workflow, organized by symptom for quick lookup."
---

# 07 · Troubleshooting and Lessons Learned

Pitfalls actually encountered in this workflow, organized by symptom for quick lookup.

## Environment

| Symptom | Cause and solution |
| --- | --- |
| `uv sync` reports `failed to persist temporary file ... os error 17（跨盘）` | A Windows-specific case on this machine where the uv cache directory is on another drive. Prepend `export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'` to every uv command |
| Console floods with dozens of lines of `libtorchcodec_core*.dll` load failures | Noise warnings: after torchcodec fails to load, it automatically falls back to **pyav**. Measured (smoke [5]): pyav **encodes and decodes video datasets correctly**, and neither state datasets nor video datasets are affected |
| `python` opens the Microsoft Store | Use the uv-managed Python; do not use the Store version |
| `lerobot-train` reports `accelerate is required but not installed` | The `training` extra was missed during the initial installation—add `--extra training` per the `uv sync` command in [01](/tutorials/robot-arms/so-arm101/mujoco/01-Environment) and retry (the one-time installation in 01 already includes it, so following 01 will not hit this) |

## Teleoperation

| Symptom | Cause and solution |
| --- | --- |
| Keyboard control feels "very slow" | `--teleop.rate` defaults to a conservative 60 units/second; raise it to **150** for a normal feel (full travel in about 1.3s) |
| Startup log floods with `clamped to be safe` WARNINGs | Normal output while the rate limiter catches up; it stops once the target is reached |
| The simulated arm is off by a few degrees when the leader arm is centered | A fixed offset caused by asymmetric calibration ranges—use `so101_leader_trim` for automatic fine-tuning ([05](/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin)) |
| The arm suddenly moves at the moment of connection | By design: the real robot engages torque and moves toward the midpoint/leader-arm pose; keep space around it |
| The arm goes limp and drops after exiting with Ctrl-C | Normal: torque is turned off on disconnect; support it by hand |
| Typing during teleoperation/recording drives the arm | The keyboard listener is **global and does not swallow keys**: mapped keys pressed in any window (including pinyin letters) enter the key queue. Do not type during keyboard-mode teleoperation/recording; leader-arm mode does not have this problem |

## Recording

| Symptom | Cause and solution |
| --- | --- |
| After exiting with `q`, the letters pressed during the session "all spill onto the command line at once" | Backlogged echo from the Windows console input buffer; the launcher has built-in `drain_pending_keys()` cleanup (only older sessions show this symptom) |
| An episode has action span all zero | Empty recording (nobody moved)—move a little before recording, or delete that episode afterwards |
| Large error in the first second of an episode | Convergence segment: at the instant recording starts, the follower arm is still at its initial pose while the leader arm is already parked elsewhere; placing the leader arm near the midpoint beforehand avoids it |
| The dataset "disappears" after setting `--dataset.root` to a parent directory | **root is the dataset directory itself**; use a new root for every recording session |
| Difference between `Esc` and `q` | `q` only stops recording; `Esc` also disconnects keyboard teleoperation. Both now finish cleanly (fixed); get into the habit of using `q` |
| On save, `ValueError: You must add one or several frames...` and the process exits with the error | Extra `→`/`n` presses during the **gap** between episodes (most common: saving + dual-stream video encoding pauses for tens of seconds, the console looks stuck, and you press it several times), leaving a flag that gets consumed at the start of the next episode → **0-frame empty episode**, and upstream crashes when saving an empty episode (a known lerobot edge case). **Saved episodes are unaffected and the data is intact**; just restart the session and continue recording. **Protection added** (2026-10-16): `record.py` clears `→`/`←` flags left over from the gap at the start of each episode (keys still work normally during recording), and prints the hint `saving the episode + encoding videos now...` before saving; regression test `smoke_test.py` [7] |
| `KeyError: 'wrist'` at the instant recording starts (image datasets) | The recording loop read observations before the camera's first frame had finished rendering; **fixed** (2026-10-16): the robot plugin's `connect()` now waits for the first frame to be ready before returning |
| Video-enabled scripts report `BrokenProcessPool` / `Invalid argument: '<stdin>'` | Video encoding uses a **multiprocessing pool**, and child processes must re-import the entry module by file path—running the recording script via `python - <<EOF` (stdin) will crash. Save the script as a real `.py` file and run that (the real entry point `record.py` is unaffected) |
| On saving an episode, `SvtMalloc[fatal]: allocate memory failed ... av.error.MemoryError: [Errno 12] ... 'avcodec_open2(libsvtav1)'` and the whole session exits | The upstream default encoder **libsvtav1** fails a large one-shot memory allocation when the two camera streams (wrist+top) open concurrently (more likely under simulation + preview window load; hit in practice on 2026-10-16). **Fixed**: `record.py` injects `--dataset.rgb_encoder.vcodec=h264` by default (dual-stream h264 encoding verified; explicitly passing vcodec overrides it). Saved episodes are intact; a crash may leave `tmp*/` and orphaned parquet files in the dataset directory (clean up the way run2 was cleaned) |
| Video stutters during recording (especially after pressing `→`), but the control itself has no latency | What stutters is the **save/encode window**: encoder processes use all CPU by default (two concurrent video streams) while the simulation thread is still rendering 5 views (more noticeable on integrated graphics). The control loop itself is unaffected—trust the cadence numbers (29.97Hz throughout, 0 ticks over budget, measured). **Mitigated** (2026-10-16): `record.py` defaults to `--dataset.encoder_threads=2` (2 threads per encode stream); camera preview windows are reduced to 15Hz (`--robot.preview_fps`). The shorter the episodes, the larger the share taken by the save window and the more stutter you feel; to eliminate pauses entirely, use `--dataset.streaming_encoding=true` (encode while recording; upstream-recommended, pending verification) |
| On saving an episode the encoder reports **memory allocation failure** and the whole session exits (svtav1's `SvtMalloc`, x264's `malloc ... failed`, and `avcodec_open2` errors all fall into this category) | This machine's system commit charge has long been close to the limit (measured 2026-10-16: **105.9GB / 119.7GB**, with 29 days of continuous uptime). Each save starts 2 new encoder processes (each loading torch/av, causing large commit spikes), and launching them concurrently at the edge of the cliff tips it over. **Mitigated**: `record.py` now adds **one automatic retry after an encoding failure** (transient failures no longer lose an episode), and save-time log flooding is also muted (`av.logging.set_libav_level` + HF progress bars). **The real fix is restarting the machine** (clears commit accumulated over the long run / kernel leaks; user-space processes take only 27GB, the rest is in the kernel/driver layer and cannot be killed); check with: `Get-Counter '\Memory\Committed Bytes'` vs `'\Memory\Commit Limit'` |

## Hardware

| Symptom | Cause and solution |
| --- | --- |
| COM port number differs from last time | Port numbers change with replugging/port switching; list the ports first every time ([03](/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration)) |
| Read-only check reports missing servos | A wiring/power problem; check the driver board and wire order first, do not rush into calibration |
| `shoulder_lift` direction is counterintuitive (simulation) | The model's positive direction points down; verify the sign before mapping ([02](/tutorials/robot-arms/so-arm101/mujoco/02-Sim-Model-Verification)) |

## Design Notes (Why It Is Done This Way)

- **MuJoCo rewrites mesh vertex data**: after `<mesh>` is loaded, `mjModel.mesh_vert` stores vertices in the **mesh's own coordinate frame**
  (the origin is re-centered on the vertex centroid and the axes are reordered), no longer in the file's original coordinates—using it directly to compute bounding boxes or fit CAD dimensions
  gives wrong results (the rendered display is unaffected). To get the true CAD geometry, parse the original file (the approach used in `preview_mount.py` /
  `step_to_stl.py`). Hit once: the mount's true dimensions are 54.3 × 35.0 × 75.0 mm.
- **A MuJoCo camera's viewing direction is its frame's −Z**: a `<camera>` element does not look along its own +Z (the direction the lens protrudes). The first version
  of the camera module built the lens on +Z with the element oriented identity → the image was effectively "looking backward" from the back of the PCB, and
  **the lens direction and image direction were exactly opposite** (the root cause of "the direction it turns does not match the image" during tuning; located on 2026-10-16 with red/blue board comparison render tests).
  Fix: rotate the camera element 180° about Y (`view.quat = RPY(0,180,0)`, unified in preview_mount / adjust_camera / the robot plugin);
  `adjust_camera.py` gained a "sim_cam live view" real-time window, so lens tuning is what-you-see-is-what-you-get.
- **The official tutorial MJCF's gripper is a "beak-style" point-contact gripper**: the two tooth tips close to a ~2.3 mm point contact with almost no usable gripping surface.
  Systematic physics experiments (2026-10-16, hundreds of trials) concluded: wherever a cube is placed near the jaw opening, it gets scooped/wedged out during the about 100° closing sweep and
  cannot be grasped (true for 16–34 mm cubes; the mechanical travel and torque themselves are normal). **Do not use "adding collision pads" as a fix**—adding tooth plates
  to the jaws was tried (it significantly improved gripping), but that is geometry that does not exist on the real robot; a trained policy would depend on it and cause sim2real distortion, so it was removed. The correct fix is to
  **replace the official model's gripper with the real robot's gripper geometry** (e.g. menagerie's SO-ARM101 or a CAD reconstruction of your own), while physical parameters should stay consistent with the real robot.
- **The official default contact parameters are too "soft" and cause physical tunneling**: the `solref` time constant defaults to 20 ms, so fast/thin contacts
  (a cube landing on a thin gripper surface, the closing sweep) pass through each other "before a force can develop"—the symptom is "the cube falls straight through the gripper surface".
  Fix (2026-10-16): harden the contact parameters—`harden_mesh_contacts` hardens the `solref` of all mesh colliders after compilation to the same value used on the menagerie tooth surfaces (0.01 s), and cube contacts are treated the same way.
  A pure physics-fidelity fix that adds no geometry.
- **The simulated robot has migrated to the mujoco_menagerie SO-ARM100 model** (2026-10-16): the original tutorial zip's MJCF is
  a kinematics demo piece whose gripper cannot grasp; the menagerie model is processed from the real robot's CAD—the gripper has dedicated collision tooth surfaces and hard contact parameters,
  and all four tooth positions (shallow→deep) were measured to stop against, grip, and lift a 34mm cube. Migration key points: the model is vendored at
  `assets/menagerie_so_arm100/` (Apache-2.0, LICENSE included); joint mapping and unit signs are in `MODEL_JOINT`
  (determined joint by joint against the old model's world motion; the wrist_roll sign awaits real-robot teleoperation verification); the model's base is rotated +90° about Z so its
  working front faces +x; the mount is instead attached to the side of Fixed_Jaw (servo #6) (initially located by parsing search, then manually fine-tuned and finalized by the user on 2026-10-16 against real-robot
  photos with `adjust_mount.py --model menagerie`: `[0.1, -0.7, 24.7]mm`, `RPY [0.34, -27.20, 89.51]°`). The old tutorial model and tools are left untouched and can be compared at any time.
- **Why use a uv project environment instead of conda**: `.venv` lives in the same directory as the project, versions are pinned by `uv.lock`, and deleting the directory reclaims it;
  it is fully isolated from the machine's conda environments; `uv run` never installs anything into the activated conda. This machine's `lerobot` conda environment
  points at **another repository copy** (`lerobot-main`), and the two do not interfere.
- **Why all plugins live in `examples/so101_mujoco/`**: they integrate through the official registration mechanism (`register_subclass`),
  with **zero modifications to the lerobot source**; upgrading upstream only requires a re-sync.

<RelatedProducts slugs="so-arm101" />
