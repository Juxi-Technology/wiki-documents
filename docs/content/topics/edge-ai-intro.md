---
title: Edge AI Deployment Intro
description: Edge AI deployment on Jetson — PyTorch to TensorRT pipeline, ONNX export, inference optimization, troubleshooting
keywords: [edge ai, tensorrt, onnx, edge deployment, jetson]
---

# Edge AI Deployment Intro

> For developers taking a model from "trained" to "running on edge devices". Using NVIDIA Jetson as the reference platform.

## 1. Why Edge Deployment?

| Compare | Cloud Inference | Edge Inference |
|---------|----------------|----------------|
| Latency | 50-500ms network round-trip | <10ms on-device |
| Privacy | Data leaves device | Data stays local |
| Cost | Ongoing GPU fees | One-time hardware |
| Offline | Unavailable offline | Fully offline |

For robotics (real-time control), industrial inspection (pipeline-sensitive), and privacy-sensitive scenarios (medical/security), edge deployment is a necessity.

## 2. Deployment Paths

```
PyTorch Model
   │  torch.onnx.export
   ▼
ONNX ──► TensorRT Engine ──► Inference App
   │              │
   └──► TorchScript ──► Inference App (simpler path)
```

| Path | Speedup vs native PyTorch | Best For |
|------|--------------------------|----------|
| TorchScript | ~1.5-2x | Quick, minimal changes |
| ONNX Runtime | ~2-4x | Cross-platform |
| **TensorRT** | **5-10x** | Performance-first, Jetson/edge |

## 3. Quick Start: PyTorch → TensorRT

### 3.1 Export ONNX

```python
import torch

# Safe load: weights_only=True prevents deserialization attacks
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

### 3.3 Python Inference

```python
import tensorrt as trt
import pycuda.driver as cuda
import pycuda.autoinit

with open('model.engine', 'rb') as f:
    engine = trt.Runtime(trt.Logger()).deserialize_cuda_engine(f.read())
context = engine.create_execution_context()
```

## 4. Performance Checklist

- [ ] Use `--fp16` (half precision) instead of fp32
- [ ] Reduce input resolution to task minimum
- [ ] Benchmark with `trtexec` for actual FPS
- [ ] batch=1 is usually best for robotics
- [ ] Check power mode (`sudo nvpmodel -m 0`)

## 5. FAQ

**Q: TensorRT errors with `Unsupported layer`?**
The model has operators TensorRT doesn't support. Try: newer TensorRT, `onnx-simplifier`, lower opset.

**Q: Does fp16 hurt accuracy?**
Most CV models are nearly lossless; validate mAP for detection/segmentation.

**Q: Out of memory (workspace)?**
Lower workspace or input resolution; the 16GB model is more comfortable.

**Q: Still slow with TensorRT?**
Verify GPU is actually used (`nvidia-smi`); avoid repeated GPU↔CPU copies.

---

## Related Links

- [Jetson Orin NX Super Dev Kit](/products/jetson-orin-nx-super-kit)
- [JetPack Flashing & Setup](/topics/jetpack-setup)
- [Embodied AI Intro](/topics/embodied-ai-intro)

## Support

- 📧 Email: support@juxitech.com
- 🌐 Website: [www.juxitech.com](https://www.juxitech.com)
