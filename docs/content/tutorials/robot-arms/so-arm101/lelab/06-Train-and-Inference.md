---
title: "6 · Train and run inference"
description: "Train a policy and run inference from LeLab: choose the dataset and policy type (ACT first), run locally or as a Hugging Face cloud job, then deploy on the follower arm."
---

# 6 · Train and run inference

> **Previous:** [05 Record a dataset](05-Record-Dataset.md)
> **Next:** [07 Troubleshooting](07-Troubleshooting.md)

Training turns the dataset into a **policy** — a model mapping camera images to joint positions. Inference runs that policy on the follower arm.

## Train

Open the **Training** tab and choose:

| Choice | Notes |
|---|---|
| **Dataset** | A local dataset, or one from the Hub |
| **Policy type** | **ACT** is the usual first choice for a single arm. Diffusion Policy, SmolVLA and the π₀ family are also available |
| **Where to run** | This machine, or a Hugging Face cloud job |
| **Training length** | Number of steps. Watch the loss rather than assuming more is better |

The tab streams the training log and shows checkpoints as they are written.

### Local or cloud

| | Local | Hugging Face cloud job |
|---|---|---|
| Needs | A GPU on this machine | A Hugging Face account with access |
| Speed | Depends on your GPU | Fixed machine, chosen per job |
| Best for | Small datasets, experimenting | Longer runs |

The cloud option is why a laptop is enough for the rest of the workflow: record locally, train remotely.

### Policy extras

Some policy types need dependencies LeLab does not install by default. Selecting one prompts you to install them — accept and wait for the background install to finish before starting the job. The same mechanism covers optional training extras.

## Checkpoints

Training writes checkpoints periodically, not only at the end, so an interrupted run still leaves a usable model. Each checkpoint name carries its step number. Try an earlier one if the loss started climbing.

## Inference

Open the **Inference** tab:

1. Confirm both arms are connected and calibrated.
2. Select the **policy** — a local checkpoint, or a model from the Hub.
3. Confirm the **cameras** and their **rotation**.
4. Start inference, and clear the workspace.

### Camera rotation and binding

**Use the same rotation as during recording.** This is the most common reason a well-trained policy does nothing useful on the real robot, and nothing warns you: 0° and 180° produce identical image dimensions.

The same applies to the camera **binding**. If the camera called `wrist` during recording is now a different physical camera, the policy sees the wrong image.

If all of that is right and the arm still fails, look at the dataset again — see [page 5](05-Record-Dataset.md).

### Intervening

Stop inference before reaching for the arm. A correction you make by hand is not training signal unless you record a new episode and retrain.

## Replay

Replay re-runs a recorded episode on the follower arm. It plays back the recorded joint positions, so it looks correct even if the policy is bad — it checks the hardware and the dataset, not the policy. Use inference to see what the policy does.

---

> **Next:** [07 Troubleshooting](07-Troubleshooting.md)

<RelatedProducts slugs="so-arm101" />
