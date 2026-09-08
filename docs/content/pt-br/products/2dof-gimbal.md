---
title: Unidade Pan-Tilt de Servo 2-DOF
category: accessory
description: Gimbal de câmera 2-DOF da Juxi Technology — servos de barramento SCS0009, 180° horizontal / 90° vertical, câmera de 2MP, rastreamento de visão por IA
keywords: [gimbal, pan tilt, 2dof, rastreamento por visão, scs0009]
---

# Unidade Pan-Tilt de Servo 2-DOF

> **[Comprar na loja](https://www.juxitech.com/products/2-dof-servo-pan-tilt-unit)**

## Visão Geral

O gimbal de servo 2-DOF usa servos de barramento serial SCS0009 de alta precisão com movimento horizontal de 180° / vertical de 90°. Acompanha uma câmera USB HD de 2MP (módulos opcionais de zoom 1080P ou fixo) com detecção de rosto, cor e QR, além de rastreamento em tempo real.

**Principais recursos**:

- 2 DOF (pan 180° / tilt 90°)
- Servos de barramento SCS0009: 2,5kg.cm, precisão de 0,293°, feedback em tempo real
- Proteção contra travamento/sobreaquecimento/sobretensão + placa driver com TVS
- Câmera de 2MP, zoom opcional 30FPS / fixa 60FPS
- Design com cabeamento oculto

## Especificações

| Categoria | Especificação |
|----------|------|
| Servos | FEETECH SCS0009 × 2 |
| Faixa | Pan 180°, tilt 90° |
| Câmera | USB plug-and-play de 2MP (opções de zoom/fixa) |
| Visão | Detecção e rastreamento de rosto/cor/QR |
| Hosts | Raspberry Pi, Jetson, RDK |

## Início Rápido

```bash
from sc_servo import SCServo, Gimbal
servo = SCServo("COM3")  # Linux: /dev/ttyUSB0
servo.connect()
gimbal = Gimbal(servo)
gimbal.enable_all()
gimbal.set_angle(0, 30)
```

## Tutoriais

- [Tutorial do Gimbal de Câmera 2-DOF](/pt-br/tutorials/accessories/2dof-camera-gimbal)

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
