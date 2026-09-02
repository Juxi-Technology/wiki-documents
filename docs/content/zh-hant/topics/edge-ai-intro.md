---
title: 邊緣 AI 部署入門
description: Jetson 邊緣 AI 部署入門——PyTorch 模型落地 TensorRT,ONNX 導出與推理優化,常見部署路徑與排錯
keywords: [edge ai, tensorrt, onnx, 邊緣部署, jetson]
---

# 邊緣 AI 部署入門

> 面向把模型從「訓練好」帶到「跑在邊緣設備上」的開發者。以 NVIDIA Jetson 平台為例。

## 1. 為什麼需要邊緣部署?

| 對比 | 雲端推理 | 邊緣推理 |
|------|---------|---------|
| 延遲 | 網絡往返 50-500ms | 設備本地 <10ms |
| 隱私 | 數據需上雲 | 數據不出設備 |
| 成本 | 持續 GPU 費用 | 一次性硬件 |
| 離線 | 斷網不可用 | 完全離線 |

對於機器人(實時控制)、工業檢測(產線延遲敏感)、隱私敏感場景(醫療/安防),邊緣部署是剛需。

## 2. 部署路徑總覽

```
PyTorch 模型
   │  torch.onnx.export
   ▼
ONNX 模型 ──► TensorRT Engine ──► 推理應用
   │              │
   └──► TorchScript ──► 推理應用(簡化路徑)
```

| 路徑 | 加速比(相對原生 PyTorch) | 適用 |
|------|------------------------|------|
| TorchScript | ~1.5-2x | 快速落地,改動小 |
| ONNX Runtime | ~2-4x | 跨平台,生態好 |
| **TensorRT** | **5-10x** | 性能優先,Jetson/邊緣最優 |

## 3. 快速上手:PyTorch → TensorRT

### 3.1 導出 ONNX

```python
import torch

# 安全加載:weights_only=True 防止反序列化攻擊
model = torch.load('model.pt', map_location='cuda', weights_only=True)
model.eval()

dummy = torch.randn(1, 3, 224, 224).cuda()
torch.onnx.export(
    model, dummy, 'model.onnx',
    input_names=['input'], output_names=['output'],
    opset_version=17,
)
```

### 3.2 ONNX → TensorRT Engine

```bash
trtexec --onnx=model.onnx \
        --saveEngine=model.engine \
        --fp16 \
        --workspace=2048
```

### 3.3 Python 推理

```python
import tensorrt as trt
import pycuda.driver as cuda
import pycuda.autoinit

with open('model.engine', 'rb') as f:
    engine = trt.Runtime(trt.Logger()).deserialize_cuda_engine(f.read())
context = engine.create_execution_context()
```

## 4. 性能檢查清單

- [ ] 用 `--fp16`(半精度)而非 fp32
- [ ] 輸入分辨率降低到任務可接受下限
- [ ] 用 `trtexec` 基準測試確認實際幀率
- [ ] 機器人場景通常 batch=1 最優
- [ ] 檢查功率模式(`sudo nvpmodel -m 0`)

## 5. 常見問題

**Q: TensorRT 報 `Unsupported layer`?**

模型裡有 TensorRT 不支持的算子。對策:換新版本 TensorRT、用 `onnx-simplifier`、降 opset。

**Q: fp16 精度影響大嗎?**

大多數 CV 模型幾乎無損;檢測/分割任務建議實測對比 mAP。

**Q: 內存不足(workspace)?**

降低 workspace 或輸入分辨率;Orin 16GB 版本更從容。

**Q: 為什麼用 TensorRT 還是慢?**

檢查是否真的用了 GPU(`nvidia-smi`);確認沒有在 GPU 與 CPU 間反复拷貝數據。

---

## 相關鏈接

- [Jetson Orin NX Super 開發套件](/zh-hant/products/jetson-orin-nx-super-kit)
- [JetPack 刷機與系統配置](/zh-hant/topics/jetpack-setup)
- [具身智能入門](/zh-hant/topics/embodied-ai-intro)

## 技術支援

- 📧 郵箱：support@juxitech.com
- 🌐 官方網站：[www.juxitech.com](https://www.juxitech.com)
