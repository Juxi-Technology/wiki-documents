---
title: Câmera USB com foco automático
description: "Tutorial da câmera USB da Juxi Technology sem driver, grande angular de 86°, foco automático, 1080P"
---

# Câmera USB com foco automático

## Visão geral

A câmera USB com foco automático da Juxi Technology é um módulo de câmera HD plug-and-play, projetado para visão robótica, inferência de IA e aplicações de visão computacional. Ela possui lente grande angular de 86°, foco automático e saída de vídeo 1080P a 30 FPS.

**Características**:
- USB sem driver, compatível com Windows / Linux / macOS / Jetson / Raspberry Pi
- Lente grande angular de 86° para um campo de visão mais amplo
- Foco automático (AF), sem necessidade de ajuste manual
- Fluxo de vídeo HD 1080P 30 FPS
- Protocolo padrão UVC, plug and play

## Especificações

| Parâmetro | Especificação |
|-----------|------|
| Resolução | 1920 × 1080 (1080P) |
| Taxa de quadros | 30 FPS |
| Campo de visão | 86° grande angular |
| Foco | Foco automático (AF) |
| Interface | USB 2.0 |
| Protocolo | UVC (USB Video Class) |
| Sistemas suportados | Windows / Linux / macOS / Jetson / Raspberry Pi |

## Início rápido

### Conectando o dispositivo

Conecte o conector USB da câmera à porta USB do seu dispositivo. Nenhum driver adicional é necessário.

### Verificar a detecção do dispositivo

```bash
# Linux / Jetson / Raspberry Pi
ls /dev/video*
# You should see /dev/video0 or /dev/video1

# View details
v4l2-ctl --list-devices
```

### Exemplo de código Python

Instale o OpenCV:

```bash
pip install opencv-python
```

Captura básica de imagem:

```python
import cv2

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)
cap.set(cv2.CAP_PROP_FPS, 30)

if not cap.isOpened():
    print("Cannot open camera")
    exit()

print(f"Resolution: {cap.get(cv2.CAP_PROP_FRAME_WIDTH)}×{cap.get(cv2.CAP_PROP_FRAME_HEIGHT)}")

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow('USB Camera', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

Seleção de múltiplas câmeras:

```python
import cv2

def list_cameras(max_devices=5):
    available = []
    for i in range(max_devices):
        cap = cv2.VideoCapture(i)
        if cap.isOpened():
            available.append(i)
            cap.release()
    return available

print(f"Available cameras: {list_cameras()}")

camera_index = 1
cap = cv2.VideoCapture(camera_index)
```

## Uso no Jetson

```bash
v4l2-ctl --list-devices
gst-launch-1.0 v4l2src device=/dev/video0 ! videoconvert ! autovideosink
```

## Perguntas frequentes

**P: Câmera não detectada?**

**R:** Verifique se o cabo USB está firmemente conectado. Tente outra porta USB. Execute `lsusb` para verificar a lista de dispositivos USB.

**P: Imagem desfocada?**

**R:** A câmera possui foco automático — aguarde de 2 a 3 segundos após a primeira conexão. Se ainda estiver desfocada, limpe a superfície da lente.

**P: Como alterar a resolução?**

**R:** Use `cap.set(cv2.CAP_PROP_FRAME_WIDTH, width)` e `cap.set(cv2.CAP_PROP_FRAME_HEIGHT, height)`.

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
- 💬 GitHub Issues: [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)
