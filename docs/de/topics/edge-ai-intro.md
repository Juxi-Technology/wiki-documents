---
title: Einstieg in Edge-KI-Deployment
description: Jetson-Edge-KI-Einstieg – PyTorch-Modelle auf TensorRT bringen, ONNX-Export und Inferenz-Optimierung, typische Deploy-Pfade und Fehlersuche
keywords: [edge ai, tensorrt, onnx, edge deployment, jetson]
---

# Einstieg in Edge-KI-Deployment

> Für Entwickler, die ein „fertig trainiertes" Modell auf ein Edge-Gerät bringen möchten. Am Beispiel der NVIDIA-Jetson-Plattform.

## 1. Warum Edge-Deployment?

| Vergleich | Cloud-Inferenz | Edge-Inferenz |
|------|---------|---------|
| Latenz | Netzwerk-Roundtrip 50–500 ms | lokal <10 ms |
| Datenschutz | Daten in der Cloud | Daten verlassen das Gerät nicht |
| Kosten | laufende GPU-Kosten | einmalige Hardware |
| Offline | ohne Netz nicht nutzbar | komplett offline |

Für Roboter (Echtzeitsteuerung), Industrieprüfung (latenzsensitiv) und datenschutzkritische Szenarien (Medizin/Sicherheit) ist Edge-Deployment Pflicht.

## 2. Deploy-Pfade im Überblick

```
PyTorch-Modell
   │  torch.onnx.export
   ▼
ONNX-Modell ──► TensorRT-Engine ──► Inferenz-Anwendung
   │              │
   └──► TorchScript (JIT) ──► Inferenz-Anwendung (einfacher Pfad)
```

| Pfad | Beschleunigung (vs. natives PyTorch) | Einsatz |
|------|------------------------|------|
| TorchScript | ~1,5–2x | schnell, wenig Änderungen |
| ONNX Runtime | ~2–4x | plattformübergreifend, gutes Ökosystem |
| **TensorRT** | **5–10x** | Performance-Fokus, optimal für Jetson/Edge |

## 3. Schnellstart: PyTorch → TensorRT

### 3.1 ONNX exportieren

```python
import torch
# Sicheres Laden: weights_only=True erlaubt nur Tensoren/einfache Strukturen, schützt vor Deserialisierungsangriffen
model = torch.load('model.pt', map_location='cuda', weights_only=True)
model.eval()
dummy = torch.randn(1, 3, 224, 224).cuda()
torch.onnx.export(
    model, dummy, 'model.onnx',
    input_names=['input'], output_names=['output'],
    opset_version=17,
)
```

### 3.2 ONNX → TensorRT-Engine

```bash
# Engine mit trtexec konvertieren (auf dem Jetson ausführen)
trtexec --onnx=model.onnx \
        --saveEngine=model.engine \
        --fp16 \
        --workspace=2048
```

### 3.3 Python-Inferenz

```python
import tensorrt as trt
import pycuda.driver as cuda
import pycuda.autoinit
# Engine laden
with open('model.engine', 'rb') as f:
    engine = trt.Runtime(trt.Logger()).deserialize_cuda_engine(f.read())
context = engine.create_execution_context()
# (Vollständiger Inferenzcode: Ein-/Ausgabepuffer allozieren, execute_v2 ausführen)
```

## 4. Performance-Checkliste

- [ ] `--fp16` (Halbpräzision) statt fp32 verwenden – große Beschleunigung auf Jetson
- [ ] Eingabeauflösung auf das akzeptable Minimum senken
- [ ] Tatsächliche Framerate mit `trtexec` messen
- [ ] Batch-Verarbeitung (batch=1 ist bei Robotern meist optimal)
- [ ] Leistungsmodus prüfen (`sudo nvpmodel -m 0` = volle Leistung)

## 5. Häufige Fragen

**F: TensorRT meldet `Unsupported layer`?**
Das Modell enthält Operatoren, die TensorRT nicht unterstützt (z. B. dynamische Kontrollflüsse). Gegenmaßnahmen: neuere TensorRT-Version, ONNX-Simplifier (`onnx-simplifier`), niedrigeres opset.

**F: Beeinträchtigt fp16 die Genauigkeit?**
Bei den meisten CV-Modellen praktisch verlustfrei. Bei Detektion/Segmentierung sollte mAP praktisch verglichen werden.

**F: Nicht genug Speicher (workspace)?**
Workspace der Engine oder Eingabeauflösung reduzieren; die Orin-16GB-Version ist entspannter.

**F: Warum trotz TensorRT langsam?**
Prüfen, ob wirklich die GPU genutzt wird (`nvidia-smi` beobachten); sicherstellen, dass nicht ständig Daten zwischen GPU und CPU kopiert werden.

---

## Verwandte Links

- [Jetson-Orin-NX-Super-Kit](/de/products/jetson-orin-nx-super-kit)
- [JetPack-Flashing und Systemkonfiguration](/de/topics/jetpack-setup)
- [Einstieg in die verkörperte Intelligenz](/de/topics/embodied-ai-intro)

## Technischer Support

- 📧 E-Mail：support@juxitech.com
- 🌐 Offizielle Website：[www.juxitech.com](https://www.juxitech.com)
