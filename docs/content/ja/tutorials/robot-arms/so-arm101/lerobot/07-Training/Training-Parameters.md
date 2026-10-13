---
title: "ステップ7:訓練パラメーターの推奨"
description: "lerobot-train パラメーターの実践的なヒント:save_freq を小さくすると早めにチェックポイントが得られます。把持・握手・配置などの簡単なタスクなら 2 万ステップで十分です。"
---

# ステップ7:訓練パラメーターの推奨

https://github.com/huggingface/lerobot/blob/main/src/lerobot/configs/train.py

`save_freq` パラメーターを少し小さくすると、学習後にモデルがより早く現れます

単純なタスク（把持・握手・配置）では、20K ステップの学習で十分すぎるほどです

<RelatedProducts slugs="so-arm101" />
