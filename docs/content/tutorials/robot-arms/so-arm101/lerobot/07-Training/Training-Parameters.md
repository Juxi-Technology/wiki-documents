---
title: "Step 7: Training — Parameter Tips"
description: "Practical tips for lerobot-train parameters: lowering save_freq makes a checkpoint appear earlier, and for simple tasks (picking, handshaking, placing) 20K training steps are entirely sufficient."
---

# Step 7: Training — Parameter Tips

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

You can lower the `save_freq` parameter a little so that the model appears earlier after training

For simple tasks (picking, handshaking, placing), 20K steps of training is entirely sufficient

<RelatedProducts slugs="so-arm101" />
