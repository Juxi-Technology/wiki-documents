---
title: "訓練パラメータの提案"
description: "lerobot-trainの主要パラメータ（save_freq、batch_size、steps）の目安と、訓練時間と成果のバランスの取り方を解説します。"
---

# 訓練パラメータの提案



https://github\.com/huggingface/lerobot/blob/main/src/lerobot/configs/train\.py

`save_freq`パラメータを適度に小さくすると、訓練後により早くモデルを確認できます



簡単なタスク（掴み取り、握手、配置）であれば、20K ステップの訓練で十分です



