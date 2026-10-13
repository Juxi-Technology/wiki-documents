---
title: "第七步:训练模型——训练参数建议"
description: "训练参数建议:把 save_freq 调小可以更早拿到中间模型;抓取、握手、放置这类简单任务,训练 2 万步完全够用。"
---

# 第七步:训练模型——训练参数建议

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

可以把`save_freq`参数适当调小，训练后更早能看到模型

对于简单任务（抓取、握手、放置），训练20K个step完全足够

<RelatedProducts slugs="so-arm101" />
