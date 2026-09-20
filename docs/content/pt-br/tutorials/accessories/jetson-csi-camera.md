---
title: Câmera CSI Jetson
description: "Tutorial do módulo de câmera CSI NVIDIA Jetson Orin da Juxi Technology"
---

# Câmera CSI Jetson

> **[Comprar na loja](https://www.juxitech.com/pt/products/79-imx219-csi-camera)**


## Visão geral

O módulo de câmera CSI da Juxi Technology foi projetado para o kit de desenvolvedor NVIDIA Jetson Orin, oferecendo vídeo de baixa latência e alta largura de banda por meio da interface CSI (Camera Serial Interface). Ideal para inferência de visão de IA, percepção robótica e computação de borda.

**Características**:
- Interface CSI-2, conexão direta ao Jetson Orin
- Exemplos prontos para uso com OpenCV e GStreamer
- Transmissão de vídeo de baixa latência
- Compatível com o protocolo UVC

## Especificações

| Parâmetro | Especificação |
|-----------|------|
| Interface | CSI-2 (MIPI) |
| Plataforma | Série NVIDIA Jetson Orin |
| Formato de vídeo | RAW / YUV |
| SDK | JetPack 5.0+ |
| Framework | GStreamer / OpenCV |

## Início rápido

### Conexão de hardware

1. Desligue o Jetson Orin
2. Conecte uma extremidade do cabo flat CSI ao módulo da câmera
3. Insira a outra extremidade no conector CSI da placa Jetson Orin
4. Garanta a orientação correta (contatos metálicos voltados para a placa)

> ⚠️ **Aviso**: Conecte sempre o cabo CSI com o aparelho DESLIGADO para evitar danos ao hardware.

### Verificar a detecção do dispositivo

```bash
ls /dev/video*
v4l2-ctl --list-devices
v4l2-ctl --list-formats-ext -d /dev/video0
```

### Exemplo de código Python

Instale as dependências:

```bash
sudo apt install -y python3-opencv
```

Captura CSI com GStreamer + OpenCV:

```python
import cv2

def gstreamer_pipeline(
    sensor_id=0,
    capture_width=1920,
    capture_height=1080,
    display_width=960,
    display_height=540,
    framerate=30,
    flip_method=0,
):
    return (
        "nvarguscamerasrc sensor-id=%d ! "
        "video/x-raw(memory:NVMM), "
        "width=(int)%d, height=(int)%d, "
        "format=(string)NV12, framerate=(fraction)%d/1 ! "
        "nvvidconv flip-method=%d ! "
        "video/x-raw, width=(int)%d, height=(int)%d, format=(string)BGRx ! "
        "videoconvert ! "
        "video/x-raw, format=(string)BGR ! appsink"
        % (
            sensor_id, capture_width, capture_height,
            framerate, flip_method, display_width, display_height,
        )
    )

cap = cv2.VideoCapture(gstreamer_pipeline(), cv2.CAP_GSTREAMER)
if not cap.isOpened():
    print("Cannot open CSI camera")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow('CSI Camera', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

Captura básica (se a câmera funcionar no modo UVC):

```python
import cv2

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1920)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1080)

while True:
    ret, frame = cap.read()
    if not ret:
        break
    cv2.imshow('Camera', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
```

## Perguntas frequentes

**P: Câmera não detectada?**

**R:** Verifique se o cabo flat está corretamente conectado e orientado. Execute `ls /dev/video*`. Se ainda assim não for detectada, tente regravar o JetPack.

**P: Erros no pipeline GStreamer?**

**R:** Garanta JetPack ≥ 5.0. Execute `apt list --installed | grep nvarguscamerasrc` para verificar os plugins GStreamer.

**P: Como alternar entre câmeras?**

**R:** Altere o parâmetro `sensor-id`: `sensor_id=0` para a primeira câmera, `sensor_id=1` para a segunda.

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
- 💬 GitHub Issues: [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)
