---
title: "训练参数建议"
description: "训练参数怎么调更省时间：save_freq 适当调小能更早看到中间模型，抓取、握手、放置等简单任务 20K 个 step 完全足够。"
---

# 训练参数建议



https://github\.com/huggingface/lerobot/blob/main/src/lerobot/configs/train\.py

可以把`save_freq`参数适当调小，训练后更早能看到模型



对于简单任务（抓取、握手、放置），训练20K个step完全足够



