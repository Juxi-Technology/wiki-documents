---
title: "訓練參數建議"
description: "lerobot-train 關鍵參數怎麼調？本文給出 save_freq、batch_size、steps 的實戰建議，簡單任務 20K step 即可，幫你平衡訓練時間與效果。"
---

# 訓練參數建議



https://github\.com/huggingface/lerobot/blob/main/src/lerobot/configs/train\.py

可以把`save_freq`參數適當調小，訓練後更早能看到模型



對於簡單任務（抓取、握手、放置），訓練20K個step完全足夠



