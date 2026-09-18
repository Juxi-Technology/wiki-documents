---
title: "Paso 7: Comando de entrenamiento smolvla"
description: "Comando de entrenamiento con smolvla, recomendado como siguiente paso tras ACT, con el ajuste fino desde un modelo preentrenado y el entrenamiento desde cero."
---

# Paso 7: Comando de entrenamiento smolvla

## Antes de ejecutar

- **Entorno**: primero abre la instancia y sube el conjunto de datos según [Configuración del entorno de entrenamiento en GPU en la nube](/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU); ten en cuenta que smolvla necesita dependencias adicionales, consulta "Instalar el entorno" más abajo
- **Conjunto de datos**: `--dataset.root=~/lerobot_my_dataset_shake_hands` del comando apunta al conjunto de datos de dar la mano recogido en el sexto paso. Si entrenas tu propia tarea, sustitúyelo por el nombre de tu propio conjunto de datos
- **Dos formas de entrenar**: el ajuste fino a partir de un modelo preentrenado suele dar mejores resultados y converger más rápido; el entrenamiento desde cero, en cambio, no necesita descargar pesos preentrenados; elige según lo que necesites
- **Durante el entrenamiento puedes ver las curvas en wandb en cualquier momento**, consulta [Ver las curvas de entrenamiento en tiempo real con wandb](/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## Documentación de referencia

https://huggingface.co/docs/lerobot/smolvla

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/policy_smolvla_README.md

## Instalar el entorno

```Shell
cd lerobot
pip install -e ".[feetech,smolvla]"
```

## Ajuste fino a partir de un modelo preentrenado (recomendado)

```Shell
lerobot-train \
  --policy.path=lerobot/smolvla_base \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=smolvla \
  --output_dir=~/output_lerobot_train/shake/smolvla_A \
  --job_name=shake_smolvla_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=40000 \
  --batch_size=8
```

## Entrenamiento desde cero

```Shell
lerobot-train \
  --dataset.repo_id=<用户名>/lerobot_my_dataset_shake_hands \
  --dataset.root=~/lerobot_my_dataset_shake_hands \
  --dataset.revision=v0.1.0 \
  --dataset.streaming=false \
  --policy.type=smolvla \
  --output_dir=~/output_lerobot_train/shake/smolvla_A \
  --job_name=shake_smolvla_a \
  --policy.device=cuda \
  --wandb.enable=true \
  --wandb.project=Lerobot_my_Project \
  --policy.push_to_hub=false \
  --steps=40000 \
  --batch_size=8
```

## Descargar el modelo

El paquete comprimido del modelo smolvla ocupa más o menos 1 GB

<RelatedProducts slugs="so-arm101" />
