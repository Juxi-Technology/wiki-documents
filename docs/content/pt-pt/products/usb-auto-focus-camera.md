---
title: Câmara USB com foco automático
category: compute-vision
description: Câmara USB com foco automático da Juxi Technology — sem driver, grande angular de 86°, 1080P 30FPS, UVC plug-and-play para visão robótica e inferência de IA, compatível com Windows/Linux/macOS/Jetson/Raspberry Pi
keywords: [câmara usb, foco automático, 1080p, uvc, sem driver, visão robótica, jetson, raspberry pi]
---

# Câmara USB com foco automático

## Visão Geral

A câmara USB com foco automático é um módulo de câmara HD plug-and-play, adequado para visão robótica, inferência de IA e aplicações de visão computacional. Suporta **campo de visão grande angular de 86°**, foco automático e saída de vídeo **1080P a 30 FPS**, com protocolo padrão UVC e sem necessidade de instalar drivers.

**Principais recursos**:

- USB sem driver, protocolo padrão UVC, plug and play
- Compatível com Windows / Linux / macOS / Jetson / Raspberry Pi
- Lente grande angular de 86° para um campo de visão mais amplo
- Foco automático (AF), sem necessidade de ajuste manual
- Fluxo de vídeo HD 1080P 30 FPS

---

## Especificações

| Parâmetro | Especificação |
|------|------|
| Resolução | 1920 × 1080 (1080P) |
| Taxa de quadros | 30 FPS |
| Campo de visão | 86° grande angular |
| Foco | Foco automático (AF) |
| Interface | USB 2.0 |
| Protocolo | UVC (USB Video Class) |
| Sistemas suportados | Windows / Linux / macOS / Jetson / Raspberry Pi |

---

## Início Rápido

### 1. Conectar a câmara

Conecte o conector USB da câmara à porta USB do seu dispositivo. Nenhum driver adicional é necessário.

### 2. Verificar a deteção do dispositivo

```bash
# Linux / Jetson / Raspberry Pi
ls /dev/video*
v4l2-ctl --list-devices
```

Uma câmara USB normalmente expõe dois dispositivos `video` (por exemplo, os `/dev/video2` e `/dev/video3` recém-adicionados); ao utilizá-la, escolha o de número menor.

### 3. Ler imagens com Python

```python
import cv2

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)
cap.set(cv2.CAP_PROP_FPS, 30)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow('USB Camera', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
```

---

## Tutoriais completos

- [Tutorial da câmara USB com foco automático — deteção do dispositivo, seleção de múltiplas câmaras e exemplos em Python](/pt-pt/tutorials/accessories/usb-auto-focus-camera)
- [Utilizar a câmara com foco automático no Jetson (dispositivos video e GUVCView)](/pt-pt/tutorials/accessories/csi-camera/02-Auto-Focus-Camera)

---

## Aplicações

- Visão robótica e transmissão de vídeo para teleoperação
- Projetos de inferência de IA e visão computacional
- Soluções multi-câmara em Jetson / Raspberry Pi (em conjunto com câmaras CSI)
- Transmissão em direto, gravação de ecrã e captura de vídeo

---

## FAQ

**P: Câmara não detetada?**

**R:** Verifique se o cabo USB está firmemente conectado. Tente outra porta USB. Execute `lsusb` para verificar a lista de dispositivos USB.

**P: Imagem desfocada?**

**R:** A câmara possui foco automático — aguarde de 2 a 3 segundos após a primeira ligação. Se ainda estiver desfocada, verifique se a superfície da lente está limpa.

**P: Como alterar a resolução?**

**R:** Use `cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)` e `cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)`.

---

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Reportar problemas](https://github.com/Juxi-Technology/wiki-documents/issues)
