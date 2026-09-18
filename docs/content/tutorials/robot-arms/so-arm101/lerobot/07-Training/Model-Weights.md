---
title: "Step 7: Training — Model Weights"
description: "Package the trained model checkpoints on the cloud GPU, download the archive to the local computer and extract the weight files."
---

# Step 7: Training — Model Weights

After training on the cloud GPU, you can package the model and download it locally:

```Shell
cd ~/output_lerobot_train/a/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

Every 20K steps, a model weight file is saved

Right-click to download the `ckpt.zip` archive and extract it on your local computer

> If the model also needs to be passed to someone else, or you plan to run inference on a different computer, uploading it directly to Hugging Face is more convenient than packaging and downloading it, see [Upload a model to HuggingFace (Optional)](/tutorials/robot-arms/so-arm101/lerobot/07-Training/HF-Model-Upload).

## Handshake

```Shell
# Save the model at the specified training step
# cd ~/output_lerobot_train/shake/diffusion/checkpoints/005000

# The latest model
cd ~/output_lerobot_train/shake/wallx/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

<RelatedProducts slugs="so-arm101" />
