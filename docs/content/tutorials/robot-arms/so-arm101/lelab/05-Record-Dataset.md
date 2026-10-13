---
title: "5 · Record a dataset"
description: "Record a dataset in LeLab: set the repo_id, task description, episode count and cameras on the Recording page, then capture demonstrations as a LeRobotDataset."
---

# 5 · Record a dataset

> **Previous:** [04 Teleoperation](04-Teleoperation.md)
> **Next:** [06 Train and run inference](06-Train-and-Inference.md)

A dataset is a collection of **episodes**, each a single demonstration of the task from start to finish. Recording is teleoperation plus a record control.

## Setting up

Open the **Recording** tab and fill in:

| Field | What to put there |
|---|---|
| **Dataset name** (`repo_id`) | `your-name/task-name`, e.g. `juxi/pick-up-the-cube`. The `name/` part must be your Hugging Face username if you plan to upload |
| **Task description** | One sentence, e.g. `pick up the cube and drop it in the box`. This is the text the policy is conditioned on |
| **Episodes** | How many demonstrations — see below |
| **Cameras** | Which configured cameras to include, and at what resolution and frame rate |

### How many episodes

**30 to 50** for a simple pick-and-place. A very repetitive task needs fewer; a task with much variation needs more.

Consistency matters more than count: the same starting position, camera framing and task description across every episode. Fifty near-identical demonstrations beat a hundred varied ones. Vary only what you want the policy to be robust to — if every episode starts with the cube in the same spot, the policy learns that spot.

## During recording

| Key | Action |
|---|---|
| `SPACE` or `→` | End the current episode, start the next |
| `DEL` or `←` | Discard the episode just recorded and redo it |

The tab shows an episode counter and a session counter.

End the episode when the task is complete — not after the arm has returned to the start. Returning is the next episode's business.

Redo an episode when you fumbled the arm, knocked the object out of place, or did not complete the task. The policy learns from everything in the dataset, including mistakes.

## Stopping

Stop the session once you have enough episodes. **The recording is finalised when you stop** — that is when the dataset index is written. A session killed mid-episode may leave a dataset that reads as incomplete.

## Where the data goes

By default under `~/.cache/huggingface/lerobot/`, keyed by the `repo_id` you chose. Nothing is uploaded until you push it from the **Upload** tab.

## Check the recording

Open the **Datasets** tab and select the dataset. You can step through episodes frame by frame, one camera at a time, with a joint-motion trace.

Do this before training. It catches what is invisible while you are holding the arm:

- A camera rotated wrongly — the frames are sideways
- An episode with a stretch of dead time at the start
- A wrist camera that drifted out of frame partway through

A re-record costs minutes; discovering it after training costs the training run.

---

> **Next:** [06 Train and run inference](06-Train-and-Inference.md)

<RelatedProducts slugs="so-arm101" />
