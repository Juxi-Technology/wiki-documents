---
title: Câmera USB com foco automático
category: compute-vision
description: Câmera USB com foco automático da Juxi Technology — grande angular de 86°, 1080P 30FPS, UVC plug-and-play para visão robótica e inferência de IA, compatível com Windows/Linux/macOS/Jetson/Raspberry Pi
keywords: [câmera usb, foco automático, 1080p, uvc, sem driver, visão robótica, jetson, raspberry pi]
---

# Câmera USB com foco automático

## Visão Geral

A câmera USB com foco automático é um módulo de câmera HD plug-and-play, projetado para visão robótica, inferência de IA e aplicações de visão computacional. Ela oferece **campo de visão grande angular de 86°**, foco automático e saída de vídeo **1080P 30FPS**, com protocolo padrão UVC e sem necessidade de instalação de driver.

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

### 1. Conectar o dispositivo

Conecte o conector USB da câmera à porta USB do dispositivo. Nenhum driver adicional é necessário.

### 2. Verificar a detecção do dispositivo

```bash
# Linux / Jetson / Raspberry Pi
ls /dev/video*
v4l2-ctl --list-devices
```

Uma câmera USB geralmente exibe dois dispositivos `video` (por exemplo, os recém-adicionados `/dev/video2` e `/dev/video3`); ao usá-la, escolha o de número menor.

### 3. Ler frames com Python

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

- [Tutorial da câmera USB com foco automático — detecção do dispositivo, seleção de múltiplas câmeras e exemplos em Python](/pt-br/tutorials/accessories/usb-auto-focus-camera)
- [Uso da câmera com foco automático no Jetson (dispositivos de vídeo e GUVCView)](/pt-br/tutorials/accessories/csi-camera/02-Auto-Focus-Camera)

---

## Aplicações

- Visão robótica e transmissão de vídeo para teleoperação
- Projetos de inferência de IA e visão computacional
- Soluções com múltiplas câmeras em Jetson / Raspberry Pi (combinadas com câmeras CSI)
- Transmissão ao vivo, gravação de tela e captura de vídeo

---

## FAQ

**P: Câmera não detectada?**

**R:** Verifique se o cabo USB está firmemente conectado, tente outra porta USB e use `lsusb` para ver a lista de dispositivos USB.

**P: Imagem desfocada?**

**R:** A câmera possui foco automático — aguarde de 2 a 3 segundos após a primeira conexão para o foco automático concluir. Se ainda estiver desfocada, confirme que a superfície da lente está limpa.

**P: Como alterar a resolução?**

**R:** Use `cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)` e `cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)`.

---

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
- 💬 [Reportar problemas](https://github.com/Juxi-Technology/wiki-documents/issues)
