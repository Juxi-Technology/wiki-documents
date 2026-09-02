---
title: Introducción al despliegue de IA en el borde
description: Despliegue de IA en el borde Jetson – modelos PyTorch a TensorRT, exportación ONNX y optimización de inferencia, rutas de despliegue y solución de problemas
keywords: [edge ai, tensorrt, onnx, despliegue en el borde, jetson]
---

# Introducción al despliegue de IA en el borde

> Para desarrolladores que llevan un modelo «entrenado» a un dispositivo de borde. Con la plataforma NVIDIA Jetson como ejemplo.

## 1. ¿Por qué el despliegue en el borde?

| Comparación | Inferencia en la nube | Inferencia en el borde |
|------|---------|---------|
| Latencia | ida y vuelta de red 50-500 ms | local <10 ms |
| Privacidad | los datos van a la nube | los datos no salen del dispositivo |
| Coste | gasto continuo de GPU | hardware único |
| Sin conexión | inutilizable sin red | totalmente sin conexión |

Para robótica (control en tiempo real), inspección industrial (línea sensible a la latencia) y escenarios sensibles (médico/seguridad), el despliegue edge es imprescindible.

## 2. Resumen de rutas de despliegue

```
Modelo PyTorch
   │  torch.onnx.export
   ▼
Modelo ONNX ──► Motor TensorRT ──► Aplicación de inferencia
   │              │
   └──► TorchScript (JIT) ──► Aplicación de inferencia (ruta simple)
```

| Ruta | Aceleración (frente a PyTorch nativo) | Uso |
|------|------------------------|------|
| TorchScript | ~1,5-2x | despliegue rápido, pocos cambios |
| ONNX Runtime | ~2-4x | multiplataforma, buen ecosistema |
| **TensorRT** | **5-10x** | rendimiento primero, óptimo Jetson/edge |

## 3. Inicio rápido: PyTorch → TensorRT

### 3.1 Exportar ONNX

```python
import torch
# Carga segura: weights_only=True solo permite tensores/estructuras simples, evita ataques de deserialización
model = torch.load('model.pt', map_location='cuda', weights_only=True)
model.eval()
dummy = torch.randn(1, 3, 224, 224).cuda()
torch.onnx.export(
    model, dummy, 'model.onnx',
    input_names=['input'], output_names=['output'],
    opset_version=17,
)
```

### 3.2 ONNX → Motor TensorRT

```bash
# Convertir a engine con trtexec (ejecutar en la placa Jetson)
trtexec --onnx=model.onnx \
        --saveEngine=model.engine \
        --fp16 \
        --workspace=2048
```

### 3.3 Inferencia en Python

```python
import tensorrt as trt
import pycuda.driver as cuda
import pycuda.autoinit
# Cargar el engine
with open('model.engine', 'rb') as f:
    engine = trt.Runtime(trt.Logger()).deserialize_cuda_engine(f.read())
context = engine.create_execution_context()
# (Código de inferencia completo: asignar buffers de entrada/salida, ejecutar execute_v2)
```

## 4. Lista de control de rendimiento

- [ ] Usar `--fp16` (media precisión) en lugar de fp32 – gran aceleración en Jetson
- [ ] Reducir la resolución de entrada al mínimo aceptable
- [ ] Medir el framerate real con `trtexec`
- [ ] Procesamiento por lotes (batch=1 suele ser óptimo en robótica)
- [ ] Comprobar el modo de potencia (`sudo nvpmodel -m 0` modo plena potencia)

## 5. Preguntas frecuentes

**Q: ¿TensorRT reporta `Unsupported layer`?**

El modelo contiene operadores no soportados (flujos de control dinámicos, etc.). Soluciones: versión de TensorRT más nueva, simplificador ONNX (`onnx-simplifier`), opset más bajo.

**Q: ¿La precisión fp16 se ve afectada?**

Casi sin pérdida en la mayoría de modelos CV; en detección/segmentación conviene comparar mAP en la práctica.

**Q: ¿Memoria insuficiente (workspace)?**

Reducir el workspace del engine o la resolución de entrada; la versión Orin de 16 GB es más holgada.

**Q: ¿Por qué TensorRT sigue siendo lento?**

Comprobar que se usa realmente la GPU (`nvidia-smi`); asegurar que no se copian datos repetidamente entre GPU y CPU.

---

## Enlaces relacionados

- [Kit Jetson Orin NX Super](/es/products/jetson-orin-nx-super-kit)
- [Flasheo de JetPack y configuración del sistema](/es/topics/jetpack-setup)
- [Introducción a la inteligencia incorporada](/es/topics/embodied-ai-intro)

## Soporte técnico

- 📧 Correo: support@juxitech.com
- 🌐 Sitio oficial: [www.juxitech.com](https://www.juxitech.com)
