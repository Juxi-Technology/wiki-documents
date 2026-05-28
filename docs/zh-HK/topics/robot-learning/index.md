---
title: 機器人學習專題
description: 基於 LeRobot 的全棧機器人學習技術
---

# 機器人學習專題

為每個人提供更快、更靈活、可擴展的機器人學習方案。我們致力於在開源平台上覆蓋各種機器人學習場景，以加速行業的機器人應用。

我們期待利用本地和全球資源，與你一起加速下一代機器人解決方案的發展。

---

## 由 SO-ARM101 機械臂驅動

[**🖱️ 產品購買**](https://www.juxitech.com) [**📚 SO-ARM101 教程**](/zh-HK/tutorials/so-arm101/)

---

## 數據採集專題

| 數據採集策略 | 數據增強技巧 | 數據品質評估 |
|---|---|---|
| ![](https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop) | ![](https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop) | ![](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop) |
| 各種數據採集策略詳解，包括單臂演示、雙臂協作、遙操作等 | 數據增強技術，提高模型泛化能力，包括視角變換、顏色抖動等 | 如何評估數據品質，識別低質量數據，清洗和優化數據集 |
| [**📚 了解更多**](/zh-HK/topics/robot-learning/data-collection/strategies) | [**📚 了解更多**](/zh-HK/topics/robot-learning/data-collection/augmentation) | [**📚 了解更多**](/zh-HK/topics/robot-learning/data-collection/quality) |

## 模型訓練專題

| ACT 算法詳解 | Diffusion Policy | Pi0 與 Pi0.5 |
|---|---|---|
| ![](https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=300&h=200&fit=crop) | ![](https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop) | ![](https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=300&h=200&fit=crop) |
| ACT (Action Chunking with Transformer) 算法深度解析，源碼閱讀與調優指南 | Diffusion Policy 算法詳解，生成式機器人控制方法 | Pi0、Pi0fast、Pi0.5 系列算法對比與應用場景 |
| [**📚 了解更多**](/zh-HK/topics/robot-learning/training/act-in-depth) | [**📚 了解更多**](/zh-HK/topics/robot-learning/training/diffusion-policy) | [**📚 了解更多**](/zh-HK/topics/robot-learning/training/pi0-series) |

| 超參數調優指南 | 訓練流程詳解 | 常見問題與解決方案 |
|---|---|---|
| ![](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop) | ![](https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop) | ![](https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=200&fit=crop) |
| 學習率、Batch Size、訓練步數等超參數的調優經驗分享 | 從數據準備到模型導出的完整訓練流程詳解 | 訓練失敗、不收斂、過擬合等常見問題排查 |
| [**📚 了解更多**](/zh-HK/topics/robot-learning/training/hyperparameter-tuning) | [**📚 了解更多**](/zh-HK/topics/robot-learning/training/training-workflow) | [**📚 了解更多**](/zh-HK/topics/robot-learning/training/troubleshooting) |

## 部署優化專題

| TensorRT 加速 | 模型量化 | 邊緣設備部署 |
|---|---|---|
| ![](https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop) | ![](https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop) | ![](https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop) |
| 使用 TensorRT 優化模型推理速度，降低延遲 | INT8/FP16 量化技術，在保持精度的同時減小模型體積 | 在 Jetson、樹莓派等邊緣設備上部署機器人學習模型 |
| [**📚 了解更多**](/zh-HK/topics/robot-learning/deployment/tensorrt-optimization) | [**📚 了解更多**](/zh-HK/topics/robot-learning/deployment/model-quantization) | [**📚 了解更多**](/zh-HK/topics/robot-learning/deployment/edge-deployment) |

## 性能評估專題

| 評估指標詳解 | 成功率分析 | 消融實驗設計 |
|---|---|---|
| ![](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop) | ![](https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop) | ![](https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=300&h=200&fit=crop) |
| 機器人學習常用評估指標：成功率、完成時間、路徑效率等 | 如何分析模型成功率，識別失敗模式，改進訓練數據 | 科學的消融實驗設計，驗證各個組件的貢獻 |
| [**📚 了解更多**](/zh-HK/topics/robot-learning/evaluation/metrics) | [**📚 了解更多**](/zh-HK/topics/robot-learning/evaluation/success-analysis) | [**📚 了解更多**](/zh-HK/topics/robot-learning/evaluation/ablation-studies) |

---

## ✨ 貢獻者計劃

- 鉅犀科技貢獻者計劃是一個協作計劃，旨在團結我們社區的朋友們，與我們共同構建創新解決方案。
- 我們非常期待您的貢獻：
  - [[教程貢獻] 分享你訓練機器人模型的經驗](https://github.com/Juxi-Technology/wiki-documents/issues)
  - [[技術解析] 深入解析某個機器人學習算法](https://github.com/Juxi-Technology/wiki-documents/issues)
  - 更多[需要的項目](https://github.com/orgs/Juxi-Technology/projects/)

---

## 技術支援與產品討論

感謝您選擇我們的產品！我們在這裡為您提供不同的支持，以確保您使用我們產品的體驗盡可能順暢。

- 📧 郵箱：support@juxitech.com
- 💬 GitHub Issues：[問題回饋](https://github.com/Juxi-Technology/wiki-documents/issues)
