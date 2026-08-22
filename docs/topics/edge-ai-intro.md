---
title: 边缘 AI 部署入门
description: Jetson 边缘 AI 部署入门——PyTorch 模型落地 TensorRT,ONNX 导出与推理优化,常见部署路径与排错
keywords: [edge ai, tensorrt, onnx, 边缘部署, jetson]
---

# 边缘 AI 部署入门

> 面向把模型从"训练好"带到"跑在边缘设备上"的开发者。以 NVIDIA Jetson 平台为例。

## 1. 为什么需要边缘部署?

| 对比 | 云端推理 | 边缘推理 |
|------|---------|---------|
| 延迟 | 网络往返 50-500ms | 设备本地 <10ms |
| 隐私 | 数据需上云 | 数据不出设备 |
| 成本 | 持续 GPU 费用 | 一次性硬件 |
| 离线 | 断网不可用 | 完全离线 |

对于机器人(实时控制)、工业检测(产线延迟敏感)、隐私敏感场景(医疗/安防),边缘部署是刚需。

## 2. 部署路径总览

```
PyTorch 模型
   │  torch.onnx.export
   ▼
ONNX 模型 ──► TensorRT Engine ──► 推理应用
   │              │
   └──► TorchScript (JIT) ──► 推理应用(简化路径)
```

| 路径 | 加速比(相对原生 PyTorch) | 适用 |
|------|------------------------|------|
| TorchScript | ~1.5-2x | 快速落地,改动小 |
| ONNX Runtime | ~2-4x | 跨平台,生态好 |
| **TensorRT** | **5-10x** | 性能优先,Jetson/边缘最优 |

## 3. 快速上手:PyTorch → TensorRT

### 3.1 导出 ONNX

```python
import torch

# 安全加载:weights_only=True 只允许张量/简单结构,防反序列化攻击
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
# 用 trtexec 转 engine(Jetson 板端执行)
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

# 加载 engine
with open('model.engine', 'rb') as f:
    engine = trt.Runtime(trt.Logger()).deserialize_cuda_engine(f.read())
context = engine.create_execution_context()

# (完整推理代码:分配输入输出 buffer,执行 execute_v2)
```

## 4. 性能检查清单

- [ ] 用 `--fp16`(半精度)而非 fp32 —— Jetson 大幅提速
- [ ] 输入分辨率降低到任务可接受下限
- [ ] 用 `trtexec` 基准测试确认实际帧率
- [ ] 批处理(batch=1 机器人场景通常最优)
- [ ] 检查功率模式(`sudo nvpmodel -m 0` 满血模式)

## 5. 常见问题

**Q: TensorRT 报 `Unsupported layer`?**
模型里有 TensorRT 不支持的算子(如某些动态控制流)。对策:换新版本 TensorRT、用 ONNX 简化工具(`onnx-simplifier`)、降 opset。

**Q: fp16 精度影响大吗?**
大多数 CV 模型几乎无损;检测/分割任务建议实测对比 mAP。

**Q: 内存不足(workspace)?**
降低 tensorrt engine 的 workspace 或输入分辨率;Orin 16GB 版本更从容。

**Q: 为什么用 TensorRT 还是慢?**
检查是否真的用了 GPU(`nvidia-smi` 观察);确认没有在 GPU 与 CPU 间反复拷贝数据。

---

## 相关链接

- [Jetson Orin NX Super 开发套件](/products/jetson-orin-nx-super-kit)
- [JetPack 刷机与系统配置](/topics/jetpack-setup)
- [具身智能入门](/topics/embodied-ai-intro)

## 技术支持

- 📧 邮箱：support@juxitech.com
- 🌐 官方网站：[www.juxitech.com](https://www.juxitech.com)
