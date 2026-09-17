---
title: Introduzione al deploy AI edge
description: "Deploy AI edge su Jetson – modelli PyTorch su TensorRT, esportazione ONNX e ottimizzazione dell'inferenza, percorsi di deploy e troubleshooting"
keywords: [edge ai, tensorrt, onnx, deploy edge, jetson]
---

# Introduzione al deploy AI edge

> Per sviluppatori che portano un modello «addestrato» su un dispositivo edge. Con la piattaforma NVIDIA Jetson come esempio.

## 1. Perché il deploy edge?

| Confronto | Inferenza cloud | Inferenza edge |
|------|---------|---------|
| Latenza | andata/ritorno rete 50-500 ms | locale <10 ms |
| Privacy | dati nel cloud | i dati non escono dal dispositivo |
| Costo | spese GPU continue | hardware una tantum |
| Offline | inutilizzabile senza rete | completamente offline |

Per robotica (controllo in tempo reale), ispezione industriale (linea sensibile alla latenza) e scenari sensibili (medico/sicurezza), il deploy edge è indispensabile.

## 2. Panoramica dei percorsi di deploy

```
Modello PyTorch
   │  torch.onnx.export
   ▼
Modello ONNX ──► Engine TensorRT ──► Applicazione di inferenza
   │              │
   └──► TorchScript (JIT) ──► Applicazione di inferenza (percorso semplice)
```

| Percorso | Accelerazione (vs PyTorch nativo) | Uso |
|------|------------------------|------|
| TorchScript | ~1,5-2x | deploy rapido, poche modifiche |
| ONNX Runtime | ~2-4x | multipiattaforma, buon ecosistema |
| **TensorRT** | **5-10x** | prestazioni prima, ottimale su Jetson/edge |

## 3. Avvio rapido: PyTorch → TensorRT

### 3.1 Esportare ONNX

```python
import torch
# Caricamento sicuro: weights_only=True consente solo tensori/strutture semplici, previene attacchi di deserializzazione
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
# Conversione in engine con trtexec (eseguire sulla scheda Jetson)
trtexec --onnx=model.onnx \
        --saveEngine=model.engine \
        --fp16 \
        --workspace=2048
```

### 3.3 Inferenza Python

```python
import tensorrt as trt
import pycuda.driver as cuda
import pycuda.autoinit
# Caricare l'engine
with open('model.engine', 'rb') as f:
    engine = trt.Runtime(trt.Logger()).deserialize_cuda_engine(f.read())
context = engine.create_execution_context()
# (Codice di inferenza completo: allocare buffer input/output, eseguire execute_v2)
```

## 4. Checklist prestazioni

- [ ] Usare `--fp16` (mezza precisione) invece di fp32 – grande accelerazione su Jetson
- [ ] Ridurre la risoluzione di input al minimo accettabile
- [ ] Misurare il framerate reale con `trtexec`
- [ ] Elaborazione a batch (batch=1 di solito ottimale in robotica)
- [ ] Verificare la modalità di potenza (`sudo nvpmodel -m 0` piena potenza)

## 5. Domande frequenti

**D: TensorRT segnala `Unsupported layer`?**
Il modello contiene operatori non supportati (flussi di controllo dinamici, ecc.). Rimedi: versione TensorRT più recente, strumento di semplificazione ONNX (`onnx-simplifier`), opset più basso.

**D: La precisione fp16 risente?**
Quasi nessuna perdita per la maggior parte dei modelli CV; per detection/segmentazione conviene confrontare la mAP in pratica.

**D: Memoria insufficiente (workspace)?**
Ridurre il workspace dell'engine o la risoluzione di input; la versione Orin 16 GB è più comoda.

**D: Perché TensorRT è ancora lento?**
Verificare che si usi davvero la GPU (`nvidia-smi`); assicurarsi che non ci siano copie ripetute tra GPU e CPU.

---

## Link correlati

- [Kit Jetson Orin NX Super](/it/products/jetson-orin-nx-super-kit)
- [Flashing JetPack e configurazione di sistema](/it/topics/jetpack-setup)
- [Introduzione all'intelligenza incarnata](/it/topics/embodied-ai-intro)

## Supporto tecnico

- 📧 E-mail: support@juxitech.com
- 🌐 Sito ufficiale: [www.juxitech.com](https://www.juxitech.com)
