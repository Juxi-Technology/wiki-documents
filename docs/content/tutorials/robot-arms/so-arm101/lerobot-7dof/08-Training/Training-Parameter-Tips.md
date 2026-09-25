---
title: "Training Parameter Recommendations"
description: "Practical guidance on the main lerobot-train parameters — save frequency, batch size and steps — and how to trade off training time against results."
---

# Training Parameter Recommendations



https://github\.com/huggingface/lerobot/blob/main/src/lerobot/configs/train\.py

You can reduce the `save_freq` parameter appropriately, so that you can see the model earlier after training



For simple tasks (grabbing, shaking hands, placing), training for 20K steps is completely sufficient



