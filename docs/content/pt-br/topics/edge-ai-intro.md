---
title: Introdução à Implantação de IA de Borda
description: Implantação de IA de borda no Jetson — pipeline PyTorch para TensorRT, exportação ONNX, otimização de inferência, solução de problemas
keywords: [ia de borda, tensorrt, onnx, implantação de borda, jetson]
---

# Introdução à Implantação de IA de Borda

> Para desenvolvedores levando um modelo de "treinado" para "rodando em dispositivos de borda". Usando o NVIDIA Jetson como plataforma de referência.

## 1. Por Que Implantar na Borda?

| Comparação | Inferência em Nuvem | Inferência na Borda |
|---------|----------------|----------------|
| Latência | Ida e volta de rede de 50-500ms | <10ms no dispositivo |
| Privacidade | Dados saem do dispositivo | Dados permanecem locais |
| Custo | Taxas contínuas de GPU | Hardware de pagamento único |
| Offline | Indisponível offline | Totalmente offline |

Para robótica (controle em tempo real), inspeção industrial (sensível ao pipeline) e cenários sensíveis à privacidade (médico/segurança), a implantação na borda é uma necessidade.

## 2. Caminhos de Implantação

```
PyTorch Model
   │  torch.onnx.export
   ▼
ONNX ──► TensorRT Engine ──► Inference App
   │              │
   └──► TorchScript ──► Inference App (simpler path)
```

| Caminho | Aceleração vs PyTorch nativo | Ideal Para |
|------|--------------------------|----------|
| TorchScript | ~1,5-2x | Rápido, mudanças mínimas |
| ONNX Runtime | ~2-4x | Multiplataforma |
| **TensorRT** | **5-10x** | Desempenho em primeiro lugar, Jetson/borda |

## 3. Início Rápido: PyTorch → TensorRT

### 3.1 Exportar ONNX

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

### 3.2 ONNX → Engine TensorRT

```bash
trtexec --onnx=model.onnx \
        --saveEngine=model.engine \
        --fp16 \
        --workspace=2048
```

### 3.3 Inferência em Python

```python
import tensorrt as trt
import pycuda.driver as cuda
import pycuda.autoinit

with open('model.engine', 'rb') as f:
    engine = trt.Runtime(trt.Logger()).deserialize_cuda_engine(f.read())
context = engine.create_execution_context()
```

## 4. Checklist de Desempenho

- [ ] Use `--fp16` (meia precisão) em vez de fp32
- [ ] Reduza a resolução de entrada ao mínimo da tarefa
- [ ] Faça benchmark com `trtexec` para o FPS real
- [ ] batch=1 costuma ser o melhor para robótica
- [ ] Verifique o modo de energia (`sudo nvpmodel -m 0`)

## 5. FAQ

**P: Erros do TensorRT com `Unsupported layer`?**

**R:** O modelo tem operadores que o TensorRT não suporta. Tente: TensorRT mais recente, `onnx-simplifier`, opset menor.

**P: O fp16 prejudica a precisão?**

**R:** A maioria dos modelos de CV é praticamente sem perdas; valide o mAP para detecção/segmentação.

**P: Sem memória (workspace)?**

**R:** Reduza o workspace ou a resolução de entrada; o modelo de 16GB é mais confortável.

**P: Ainda lento com TensorRT?**

**R:** Verifique se a GPU é realmente usada (`nvidia-smi`); evite cópias repetidas GPU↔CPU.

---

## Links Relacionados

- [Jetson Orin NX Super Dev Kit](/pt-br/products/jetson-orin-nx-super-kit)
- [Gravação do JetPack e Configuração](/pt-br/topics/jetpack-setup)
- [Introdução à IA Incorporada](/pt-br/topics/embodied-ai-intro)

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
