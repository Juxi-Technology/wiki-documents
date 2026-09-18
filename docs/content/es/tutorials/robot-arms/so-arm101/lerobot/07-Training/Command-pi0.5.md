---
title: "Paso 7: Comando de entrenamiento pi0.5"
description: "Comando de entrenamiento con el algoritmo pi0.5, la versión mejorada de pi0, con la instalación del entorno y los parámetros del proceso de ajuste fino."
---

# Paso 7: Comando de entrenamiento pi0.5

## Antes de ejecutar

- **Entorno**: primero abre la instancia y sube el conjunto de datos según [Configuración del entorno de entrenamiento en GPU en la nube](/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/Cloud-GPU), y luego vuelve a este artículo para ejecutar las dos secciones "Instalar el entorno" y "Línea de comandos"
- **Conjunto de datos**: `--dataset.root=~/lerobot_my_dataset_shake_hands` del comando apunta al conjunto de datos de dar la mano recogido en el sexto paso. Si entrenas tu propia tarea, sustitúyelo por el nombre de tu propio conjunto de datos
- **Directorio de salida**: si `--output_dir` ya existe, bórralo primero con el comando `sudo rm -rf` de arriba, o usa un nombre nuevo
- **Durante el entrenamiento puedes ver las curvas en wandb en cualquier momento**, consulta [Ver las curvas de entrenamiento en tiempo real con wandb](/es/tutorials/robot-arms/so-arm101/lerobot/07-Training/WandB-Curves)

## Documentación de referencia

https://github.com/huggingface/lerobot/blob/46e19ae579f80ce66211afafd1c3c649c569131f/docs/source/pi0.mdx

https://www.pi.website/blog/pi05

## Instancia de GPU en la nube recomendada

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0.5/1.png)

## Instalar el entorno

```Shell
cd lerobot
pip install -e ".[pi0]"
```

## Línea de comandos

- Eliminar los archivos que hay bajo output de un entrenamiento anterior interrumpido

```Shell
sudo rm -rf output_lerobot_train/shake/pi05_A
```

- Entrenar

```Shell
lerobot-train \
    --dataset.repo_id=<usuario>/lerobot_my_dataset_shake_hands \
    --dataset.root=~/lerobot_my_dataset_shake_hands \
    --dataset.revision=v0.1.0 \
    --policy.type=pi05 \
    --output_dir=~/output_lerobot_train/shake/pi05_A \
    --job_name=shake_pi05_A \
    --policy.pretrained_path=lerobot/pi05_base \
    --policy.compile_model=true \
    --policy.gradient_checkpointing=true \
    --policy.dtype=bfloat16 \
    --policy.freeze_vision_encoder=false \
    --policy.train_expert_only=false \
    --steps=50000 \
    --policy.device=cuda \
    --policy.push_to_hub=false \
    --wandb.enable=true \
    --wandb.project=Lerobot_my_Project \
    --batch_size=8
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0.5/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-07-Training-Command-pi0.5/3.png)

El entrenamiento no empieza de verdad hasta 20 minutos después de ejecutar la línea de comandos

El paquete comprimido del modelo ocupa unos 5 GB y, una vez descomprimido, 7 GB

<RelatedProducts slugs="so-arm101" />
