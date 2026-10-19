---
title: "08 · Roadmap"
description: "Completed:"
---

# 08 · Roadmap

## Completed (Runnable Directly from This Repository)

| Capability | Status |
| --- | --- |
| Simulation model loading/driving/rendering verification (3 MJCF models) | ✅ |
| Keyboard teleoperation (simulation / real robot) | ✅ Verified on hardware |
| Leader-arm digital twin (physical arm → simulated arm, with zero-point fine-tuning) | ✅ Verified on hardware |
| Data recording (real robot / simulation) + episode control + inspection script | ✅ Verified on hardware |
| Data replay (real robot / simulation, official mechanism) | ✅ Verified on hardware |
| Automated smoke tests (hardware-free `smoke_test.py`) | ✅ 26 passed |
| Dual-camera visual dataset `so101_sim_vision` (5 episodes / 10610 frames / 353.8s) | ✅ |
| Training (ACT) and simulated policy deployment (`lerobot-train` / `lerobot-rollout`) | ✅ Smoke-tested (see [09](/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial)) |

## Next Steps (Ordered by Value)

### Phase 2 · Cameras in the Scene (in progress)

**Completed**:
- The mount (STEP→STL) and camera (a placeholder body built to the HBVCAM-F2170HD V22 datasheet dimensions of 25×30×5.2mm) are assembled into the simulation,
  with poses adjusted against the real robot using `adjust_mount.py` / `adjust_camera.py`;
- The `<camera>` element is integrated (`sim_cam`, initial fovy 49°), and **the simulation visual recording pipeline is working end to end**:
  `--robot.image_camera=sim_cam` produces a video dataset with `observation.images.wrist` (smoke test [5] fully passes).

**2026-10-16 update**: camera aiming/fovy has been tuned to satisfaction (`adjust_camera.py` gained a **live view real-time window**,
with resumable tuning and automatic reopening if the window is accidentally closed; also fixed the bug where MuJoCo's camera view direction = **element −Z** caused
"lens direction opposite to the image", see [07](/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)). A visual dataset has been officially recorded with the newly calibrated leader arm (including wrist video, tracking error ≤2 units) ✅;
the old experimental recordings were cleaned up on 2026-10-16, and the official dataset is unified as `so101_sim_vision` (dual camera).
**On the same day, the simulated robot was migrated to the mujoco_menagerie SO-ARM100 model** (2026-10-16): the original tutorial model's gripper cannot grasp,
while the new model's gripper uses real-robot CAD collision and was measured to grip a 34mm cube reliably; the recording/teleoperation/dual-camera/workspace pipelines are all retained,
pending one real-robot teleoperation verification (especially the wrist_roll direction sign).
**Still to do**: after the real HBVCAM is connected, do a "real photos vs simulated renders" comparison for fine-tuning;
optional: replace the placeholder body with a camera STL. Real-robot-side camera configuration (`--robot.cameras` OpenCV) to be done as well later.

### Phase 3 · Scenes and Scale-Up (in progress)

- ✅ Workspace added to the scene (2026-10-16): mat + three colored cubes (34mm, graspable) + storage box + fixed top camera `top_cam`
  (defined in `so101_assets.add_workspace`, with render/benefit check tool `preview_workspace.py`); **the dual-camera (wrist+top)
  recording pipeline is working end to end** (`--robot.top_camera=top_cam`);
- **Automatic data generation**: scripted policies/RL run in simulation in batches overnight (no human in the loop), which is where the "tens of times the efficiency" comes from;
- Visual domain randomization (textures/lighting/camera jitter) to prepare for sim2real.

### Phase 4 · Training and Deployment

- ✅ **Training/deployment pipeline verified** (2026-10-16): `lerobot-train` (ACT, 12-step CPU smoke—about 2s/step, loss decreasing normally,
  checkpoint written to disk as expected) and `lerobot-rollout --strategy.type=base` (actually executing the policy in simulation for 20s,
  automatically returning the arm to the initial pose before finishing) both work end to end; full commands, key points, and resume-training instructions are in [09](/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial) sections 7/8,
  and the tutorial's bundled demo checkpoint `outputs/train/smoke_act` can be used directly to try out the deployment pipeline;
- Full training happens on a **machine with a GPU** (ACT / SmolVLA; this machine's pure CPU is only suitable for small-step pipeline validation);
  just copy the dataset or push it to a private HF repository;
- Real-robot deployment also goes through `lerobot-rollout` (replace `--robot.*` with the `so101_follower` configuration).

### Long Term · sim2real

Train on a mix of simulation data + a small amount of real-robot data → zero-cost evaluation on the real robot (policy success rates can be reproducibly evaluated in simulation).
Note: going directly from pure simulation data to the real robot (zero-shot transfer) is the hardest route; start with a "short loop" (train on real-robot data → deploy on the real robot),
and add simulation gradually.

## Positioning in One Sentence

For teams that already have physical arms: simulation = **a development sandbox + demo material + a data amplifier**;
for prospective customers: simulation = **a hands-on tool for walking through the entire workflow before buying**.

<RelatedProducts slugs="so-arm101" />
