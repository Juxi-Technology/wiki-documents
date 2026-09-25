---
title: "Obtain the Model Weight File"
description: "Package the trained model checkpoints on the cloud GPU, download the archive to the local computer and extract the weight files."
---

# Obtain the Model Weight File



```Shell
cd ~/output_lerobot_train/a/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```

Every 20K steps, a model weight file is saved



Right-click to download the `ckpt.zip` archive and extract it on your local computer















## Handshake

```Shell
# Save the model at the specified training step
# cd ~/output_lerobot_train/shake/diffusion/checkpoints/005000

# The latest model
cd ~/output_lerobot_train/shake/wallx/checkpoints/last
zip -r ~/ckpt.zip pretrained_model
```



