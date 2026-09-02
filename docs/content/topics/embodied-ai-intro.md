---
title: Embodied AI Intro (LeRobot)
description: Embodied AI intro — LeRobot framework, SO-ARM101 data collection/training/evaluation, ACT/Diffusion/SmolVLA selection
keywords: [lerobot, embodied ai, imitation learning, act, so-arm101]
---

# Embodied AI Intro (LeRobot)

> For developers doing robot learning for the first time. Using HuggingFace LeRobot + Juxi Technology SO-ARM101 as the example: **collect → train → evaluate** full pipeline.

## 1. What is Embodied AI?

Embodied AI lets agents interact with the physical world through body sensors. Imitation learning is a core path: human teleoperation demonstrations → data collection → policy training → robot reproduces actions.

**Why it matters**: traditional programming can't cover complex manipulation (screwing, folding clothes), but imitation learning only needs "demonstrate + train".

## 2. Hardware Setup

| Component | Recommended | Notes |
|-----------|-------------|-------|
| Robot arm | SO-ARM101 (leader + follower) | Dual-arm teleoperation, 6 DOF |
| Compute | Jetson Orin NX Super / 4090 host | Train on big compute, infer on Jetson |
| Vision | RealSense / USB camera | Environment capture during teleop |

- [SO-ARM101 Tutorial](/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Jetson Orin NX Super Dev Kit](/products/jetson-orin-nx-super-kit)

## 3. Environment Setup

```bash
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot
pip install -e ".[feetech]"        # SO-ARM uses feetech servos

# Jetson users: verify PyTorch first
python3 -c "import torch; print(torch.cuda.is_available())"
```

## 4. Data Collection (Teleoperation)

```bash
# Calibrate (first time)
lerobot-calibrate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_arm

# Record data
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1 \
  --dataset.repo_id=juxi/pick_cube \
  --dataset.num_episodes=50 \
  --dataset.single_task="Pick the red cube" \
  --dataset.episode_time_s=30
```

**Collection tips**:

- ≥50 episodes per task, vary positions/techniques
- Keep cameras fixed and objects visible
- Consistent demo style (same demonstrator)

## 5. Training

```bash
# ACT policy (beginner-friendly)
lerobot-train \
  --dataset.repo_id=juxi/pick_cube \
  --policy.type=act \
  --output_dir=outputs/train/act_pick \
  --steps=300000 \
  --policy.device=cuda
```

**Policy selection**:

| Policy | Strengths | Best For |
|--------|-----------|----------|
| **ACT** | Stable, data-efficient | Entry point, fine manipulation |
| **Diffusion** | Robust multi-modal actions | High-frequency precise tasks |
| **Pi0 / GR00T** | Strong generalization | Multi-task, cross-object |

## 6. Evaluation

```bash
# Replay dataset (data quality check)
lerobot-dataset-viz --repo-id juxi/pick_cube

# Evaluate policy
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --policy.path=outputs/train/act_pick/checkpoints/last/pretrained_model \
  --dataset.repo_id=juxi/eval_pick \
  --policy.device=cuda
```

| Metric | Description |
|--------|-------------|
| Success rate | Task completion ratio |
| Trajectory smoothness | Jitter level |
| Generalization | Works with different objects/positions? |

## 7. FAQ

**Q: Training is slow?**

**A:** Data size, steps, and compute scale together; start with 50 episodes / 100k steps to validate the pipeline.

**Q: Policy only does one action?**

**A:** Single-task training needs multi-task datasets; GR00T/Pi0 foundation models can be fine-tuned with small data to multi-task.

**Q: Jerky actions after training?**

**A:** Check data quality (stable demos), add smoothing, lower the control frequency.

**Q: Out of memory?**

**A:** Reduce batch_size, lower image resolution, use the 16GB Jetson model.

---

## Related Links

- [Robot Arm Selection Guide](/tutorials/robot-arms/select-guide)
- [Edge AI Deployment Intro](/topics/edge-ai-intro)
- [SO-ARM101 TPU Flexible Gripper](/products/tpu-flexible-gripper)
- [SO-ARM101 Robot Vision Kit](/products/robot-vision-kit)

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
