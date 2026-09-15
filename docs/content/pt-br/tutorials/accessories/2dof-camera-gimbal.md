---
title: "Gimbal de Câmera 2-DOF"
description: "Módulo de gimbal de câmera 2-DOF da Juxi Technology com rastreamento de cores, detecção de rosto e rastreamento automático"
---

# Gimbal de Câmera 2-DOF

> **[Comprar na loja](https://www.juxitech.com/pt/products/2-dof-servo-pan-tilt-unit)**


## Visão geral

O gimbal de câmera 2-DOF da Juxi Technology é uma plataforma open source de estabilização de câmera com dois graus de liberdade, que oferece suporte a controle via Python, rastreamento de cores, detecção de rosto e rastreamento automático de alvos. É adequado para visão robótica, vigilância e aplicações de automação.

**Características**:
- Controle de servo 2-DOF (Pitch / Yaw)
- Rastreamento de cores, detecção de rosto, detecção de código QR
- Implementação em Python puro, fácil de customizar
- Suporta câmera USB e servo de barramento serial
- Código open source: [GitHub](https://github.com/Juxi-Technology/2dof-camera-gimbal)

## Especificações

| Parâmetro | Especificação |
|-----------|------|
| Graus de liberdade | 2 eixos (Pitch + Yaw) |
| Tipo de servo | Servo de barramento serial (protocolo SCS) |
| Interface de controle | USB Serial |
| Suporte a câmera | Câmera USB UVC |
| Algoritmos de rastreamento | Rastreamento de cores / Detecção de rosto / Detecção de código QR |
| Linguagem de programação | Python 3 |

## Início rápido

### Conexão de hardware

1. Conecte o servo à interface de barramento serial
2. Conecte o módulo USB-serial ao seu computador/Jetson/Raspberry Pi
3. Monte a câmera no suporte do gimbal
4. Conecte a câmera USB

### Instalar dependências

```bash
pip install -r requirements.txt
# Or install manually
pip install opencv-python pyserial numpy
```

### Código de controle básico

```python
import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

from sc_servo import SCServo, Gimbal
import time

# Initialize servo controller
servo = SCServo("COM3")  # Linux: "/dev/ttyUSB0"
if servo.connect():
    print("✓ Serial connected")

    gimbal = Gimbal(servo)
    gimbal.enable_all()

    # Set angle (pitch, yaw)
    gimbal.set_angle(0, 30)   # yaw: -90~90
    time.sleep(1)
    gimbal.set_angle(1, -20)  # pitch: -45~45
    time.sleep(1)

    # Return to center
    gimbal.set_angle(0, 0)
    gimbal.set_angle(1, 0)

    gimbal.disable_all()
    servo.disconnect()
```

### Exemplo de rastreamento de cores

```python
import sys
import os
import cv2
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))
from sc_servo import SCServo, Gimbal

# Initialize camera and gimbal
cap = cv2.VideoCapture(0)
servo = SCServo("COM3")
servo.connect()
gimbal = Gimbal(servo)
gimbal.enable_all()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Convert to HSV for color detection
    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)

    # Red color range
    lower_red1 = (0, 100, 100)
    upper_red1 = (10, 255, 255)
    mask = cv2.inRange(hsv, lower_red1, upper_red1)

    # Find the largest contour
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    if contours:
        largest = max(contours, key=cv2.contourArea)
        x, y, w, h = cv2.boundingRect(largest)
        center_x = x + w // 2
        center_y = y + h // 2

        # Map pixel coordinates to servo angles
        frame_h, frame_w = frame.shape[:2]
        yaw = int((center_x / frame_w - 0.5) * 180)
        pitch = int((0.5 - center_y / frame_h) * 90)
        gimbal.set_angle(0, max(-90, min(90, yaw)))
        gimbal.set_angle(1, max(-45, min(45, pitch)))

        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

    cv2.imshow('Color Tracking', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

gimbal.disable_all()
cap.release()
cv2.destroyAllWindows()
```

## Recursos avançados

### Rastreamento por detecção de rosto

O `src/detectors/face_detector.py` do repositório fornece um detector de rosto baseado em OpenCV DNN que pode ser usado para rastreamento facial automático.

### Rastreamento automático

O `examples/auto_tracking_demo.py` do repositório implementa um fluxo completo de rastreamento automático, incluindo seleção de alvo, controle PID e rastreamento suave.

## Perguntas frequentes

**P: A porta serial não conecta?**

**R:** Verifique o nome correto da porta. Windows usa `COMx`, Linux usa `/dev/ttyUSBx`. Execute `python examples/list_ports.py` para listar as portas disponíveis.

**P: O servo não responde?**

**R:** Verifique se a alimentação do servo é suficiente. Servos SCS exigem alimentação externa (6-8.4V).

**P: O rastreamento está instável?**

**R:** Ajuste os parâmetros PID e a frequência de rastreamento. Reduzir a resolução do quadro pode melhorar o desempenho em tempo real.

## Suporte

- 📧 E-mail: support@juxitech.com
- 🌐 Site: [www.juxitech.com](https://www.juxitech.com)
- 💻 Repositório open source: [GitHub](https://github.com/Juxi-Technology/2dof-camera-gimbal)
