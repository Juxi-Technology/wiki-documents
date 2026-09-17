---
title: Introduction au déploiement IA en périphérie
description: "Déploiement IA en périphérie Jetson – PyTorch vers TensorRT, export ONNX et optimisation d'inférence, chemins de déploiement et dépannage"
keywords: [edge ai, tensorrt, onnx, déploiement périphérie, jetson]
---

# Introduction au déploiement IA en périphérie

> Pour les développeurs qui amènent un modèle « entraîné » sur un appareil périphérique. Exemple avec la plateforme NVIDIA Jetson.

## 1. Pourquoi le déploiement en périphérie ?

| Comparaison | Inférence cloud | Inférence périphérie |
|------|---------|---------|
| Latence | aller-retour réseau 50-500 ms | locale <10 ms |
| Confidentialité | données dans le cloud | les données ne sortent pas |
| Coût | facturation GPU continue | matériel unique |
| Hors ligne | inutilisable sans réseau | totalement hors ligne |

Pour la robotique (contrôle temps réel), l'inspection industrielle (ligne de production sensible à la latence) et les scénarios sensibles (médical/sécurité), le déploiement edge est indispensable.

## 2. Vue d'ensemble des chemins de déploiement

```
Modèle PyTorch
   │  torch.onnx.export
   ▼
Modèle ONNX ──► Moteur TensorRT ──► Application d'inférence
   │              │
   └──► TorchScript (JIT) ──► Application d'inférence (chemin simple)
```

| Chemin | Accélération (vs PyTorch natif) | Usage |
|------|------------------------|------|
| TorchScript | ~1,5-2x | déploiement rapide, peu de changements |
| ONNX Runtime | ~2-4x | multiplateforme, bon écosystème |
| **TensorRT** | **5-10x** | performance d'abord, optimal Jetson/edge |

## 3. Prise en main : PyTorch → TensorRT

### 3.1 Export ONNX

```python
import torch
# Chargement sécurisé : weights_only=True n'autorise que les tenseurs/structures simples, évite les attaques de désérialisation
model = torch.load('model.pt', map_location='cuda', weights_only=True)
model.eval()
dummy = torch.randn(1, 3, 224, 224).cuda()
torch.onnx.export(
    model, dummy, 'model.onnx',
    input_names=['input'], output_names=['output'],
    opset_version=17,
)
```

### 3.2 ONNX → Moteur TensorRT

```bash
# Conversion en engine avec trtexec (exécuter sur la carte Jetson)
trtexec --onnx=model.onnx \
        --saveEngine=model.engine \
        --fp16 \
        --workspace=2048
```

### 3.3 Inférence Python

```python
import tensorrt as trt
import pycuda.driver as cuda
import pycuda.autoinit
# Charger l'engine
with open('model.engine', 'rb') as f:
    engine = trt.Runtime(trt.Logger()).deserialize_cuda_engine(f.read())
context = engine.create_execution_context()
# (Code d'inférence complet : allouer les tampons d'entrée/sortie, exécuter execute_v2)
```

## 4. Liste de contrôle des performances

- [ ] Utiliser `--fp16` (demi-précision) au lieu de fp32 – grande accélération sur Jetson
- [ ] Réduire la résolution d'entrée au minimum acceptable
- [ ] Mesurer le framerate réel avec `trtexec`
- [ ] Traitement par lots (batch=1 généralement optimal en robotique)
- [ ] Vérifier le mode de puissance (`sudo nvpmodel -m 0` mode pleine puissance)

## 5. Questions fréquentes

**Q : TensorRT signale `Unsupported layer` ?**
Le modèle contient des opérateurs non pris en charge (flux de contrôle dynamiques, etc.). Solutions : version TensorRT plus récente, outil de simplification ONNX (`onnx-simplifier`), opset plus bas.

**Q : La précision fp16 est-elle dégradée ?**
Presque sans perte pour la plupart des modèles CV ; pour la détection/segmentation, comparer la mAP en pratique.

**Q : Mémoire insuffisante (workspace) ?**
Réduire le workspace de l'engine ou la résolution d'entrée ; la version Orin 16 Go est plus confortable.

**Q : Pourquoi TensorRT reste-t-il lent ?**
Vérifier que le GPU est réellement utilisé (`nvidia-smi`) ; s'assurer qu'il n'y a pas de copie répétée entre GPU et CPU.

---

## Liens connexes

- [Kit Jetson Orin NX Super](/fr/products/jetson-orin-nx-super-kit)
- [Flashage JetPack et configuration système](/fr/topics/jetpack-setup)
- [Introduction à l'intelligence incarnée](/fr/topics/embodied-ai-intro)

## Support technique

- 📧 E-mail : support@juxitech.com
- 🌐 Site officiel : [www.juxitech.com](https://www.juxitech.com)
