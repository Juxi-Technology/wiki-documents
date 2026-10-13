---
title: "第七步:訓練參數建議"
description: "訓練參數建議:把 save_freq 調小可以更早拿到中間模型;抓取、握手、放置這類簡單任務,訓練 2 萬步完全夠用。"
---

# 第七步:訓練參數建議

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

可以把`save_freq`參數適當調小，訓練後更早能看到模型

對於簡單任務（抓取、握手、放置），訓練20K個step完全足夠

<RelatedProducts slugs="so-arm101" />
