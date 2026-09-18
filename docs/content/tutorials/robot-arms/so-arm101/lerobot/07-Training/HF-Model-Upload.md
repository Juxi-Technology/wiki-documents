---
title: "Step 7: Training — Upload Model (Optional)"
description: "Upload a trained model to Hugging Face either automatically during training or manually afterwards, including intermediate checkpoints."
---

# Step 7: Training — Upload Model (Optional)

> This step is optional. Once the model finishes training it is stored on your computer or cloud GPU instance, and you can take it straight to inference without any problem. You only need to upload it to HuggingFace when you want to **back up the model, run inference on a different machine, or share the model with someone else**.

## Placeholders in the commands

This page follows the placeholder convention from the previous chapters. Please replace them with your own information, and **remove the angle brackets along with the placeholder** when you do so:

- `<用户名>`: your HuggingFace account name
- `<你的用户名>`: your computer's system username; you can check it by typing `whoami` in the terminal

## Method 1: Upload automatically during training

Add two lines of arguments to the training command, and the model will be uploaded automatically when training finishes:

```Shell
  --policy.push_to_hub=true \
  --policy.repo_id=<用户名>/shake_act_a \
```

**These two lines must appear together; writing only `push_to_hub=true` will cause an error.** `repo_id` is the repository name you give this model, in the form `账号名/模型名`. If the repository does not exist, LeRobot will create it automatically.

For example, the full ACT command becomes:

```Shell
lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=act \
  --output_dir=~/output_lerobot_train/shake/act/ \
  --job_name=shake_act_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=true \
  --policy.repo_id=<用户名>/shake_act_a \
  --steps=20000 \
  --batch_size=8
```

Following the instructions in the previous section, once this training run finishes, the model will appear at `https://huggingface.co/<用户名>/shake_act_a`.

### Upload the intermediate checkpoints as well

During training, a checkpoint is saved every `save_freq` (20000 steps by default). If you want to upload these intermediate checkpoints as well (for example, training takes a long time and you want to grab a mid-run model at any time), add this line:

```Shell
  --policy.save_checkpoint_to_hub=true \
```

When uploading, each checkpoint is tagged with a label matching its step count (for example `010000`); later, when loading the model, you can specify this tag to get the version at the corresponding step count. See "Load an uploaded model" below for details.

### A few optional parameters

Add as needed:

| Parameter | Description |
|---|---|
| `--policy.private=true` | Set the repository to private so others cannot see it |
| `--policy.tags=act,so101` | Add tags to the model for easier searching |
| `--policy.license=mit` | Specify the open-source license |

## Method 2: Upload manually after training finishes

This is the more commonly used approach: keep writing `--policy.push_to_hub=false` as usual during training, and once training ends and you have confirmed the results are satisfactory, upload the model manually.

### 1. Log in

If you have already bound a Token you can skip this; if you have not bound one, see [Register a Hugging Face account (Optional)](/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account).

```Shell
hf auth login
hf auth whoami
```

### 2. Upload

Assume the ACT training output directory is `~/output_lerobot_train/shake/act/`:

```Shell
export HF_USER=<用户名>

hf upload ${HF_USER}/shake_act_a \
  ~/output_lerobot_train/shake/act/checkpoints/last/pretrained_model
```

The model repository does not need to be created in advance; if `hf upload` finds that it does not exist, it will create one automatically.

### 3. Upload the checkpoint at a specified step

If you only want to upload a certain intermediate checkpoint rather than the last one:

```Shell
CKPT=005000
hf upload ${HF_USER}/shake_act_a_${CKPT} \
  ~/output_lerobot_train/shake/act/checkpoints/${CKPT}/pretrained_model
```

### 4. Upload from the web page

If the model is not large and you do not want to type commands, you can also do it directly on the HuggingFace website: create a new Model repository and drag the files from the `pretrained_model` directory into it.

## Load an uploaded model

After the model is uploaded, when deploying you just point `--policy.path` at it; you do not need to download it locally first:

```Shell
  --policy.path=<用户名>/shake_act_a \
```

This is more convenient than pointing to a local path: you can switch computers, or others can use it directly as long as they have your account name. Note that pulling a model from HuggingFace requires being able to connect to its servers; in a China network environment, it is recommended to first set up the mirror as described in [Register a Hugging Face account (Optional)](/tutorials/robot-arms/so-arm101/lerobot/06-Data-Collection/HF-Account).

If you uploaded multiple checkpoints and want to specify which one to use, add the revision number:

```Shell
  --policy.pretrained_revision=005000 \
```

`005000` is the step count of the checkpoint you uploaded.

## Notes

- The model's repository name (`repo_id`) has nothing to do with `--output_dir` and `--job_name` in the training command; it is independent, so just pick an easy-to-recognize name
- All training commands in this tutorial use `--policy.push_to_hub=false`; if you want to use automatic upload, change this line to `true` and add `--policy.repo_id`, and neither one can be missing

<RelatedProducts slugs="so-arm101" />
