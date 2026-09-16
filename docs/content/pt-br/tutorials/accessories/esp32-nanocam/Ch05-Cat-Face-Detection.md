---
title: "Capítulo 5: Detecção de rosto de gato"
description: "Capítulo 5 do tutorial do ESP32-NanoCam: use o modelo CatFaceDetectMN03 para detectar rostos de gatos."
---

# Capítulo 5: Detecção de rosto de gato

> **[Comprar na loja](https://www.juxitech.com/products/esp32-s3-wifi-video-module)**

**Objetivo do capítulo**: fazer o NanoCam detectar o rosto de gatos e entender as diferenças em relação ao modelo de detecção de rosto humano.

## Princípio

A detecção de rosto de gato usa o modelo CatFaceDetectMN03, treinado com otimização específica para as características faciais dos gatos (orelhas triangulares / distância interpupilar ampla / nariz). Recebe uma imagem RGB565 de 320x240 e retorna uma lista de caixas delimitadoras de rosto de gato. Compartilha o mesmo formato de saída `print_detection_result` da detecção de rosto humano do [Capítulo 4](./Ch04-Face-Detection.md).

### Diferenças entre os modelos de rosto de gato e de rosto humano

|Aspecto|Detecção de rosto (ai_mode:2)|Detecção de rosto de gato (ai_mode:1)|
|---|---|---|
|Modelo|MSR01 + MNP01 em cascata dupla|CatFaceDetectMN03 estágio único|
|Pontos-chave|10 (dois olhos / ponta do nariz / cantos da boca)|Nenhum (o modelo não fornece)|
|Limiar de confiança|MSR01=0.3, MNP01=0.4|0.4|
|Desenho da caixa de detecção|Retângulo vazado verde + 5 pontos-chave|Retângulo vazado verde (sem pontos-chave)|

## Passos

### 5.1 Alternar o modo

```Plain
ai_mode:1
```

O dispositivo reinicia automaticamente e entra no modo de detecção de rosto de gato

> Consulte o [manual do protocolo serial](./ESP32-NanoCam-Serial-Protocol.md) para todos os comandos.

### 5.2 Observar o resultado

Coloque um gato ou uma foto de gato diante da câmera e abra `http://<IP>` no navegador para ver a caixa de detecção verde marcando o rosto do gato.

### 5.3 Saída serial

Quando um rosto de gato é detectado, a porta serial exibe:

```Plain
I (xxxxx) detection_result: [ 0]: ( 45,  30, 180, 210)
```

- Formato: `[número] (x, y, w, h)` — coordenadas do canto superior esquerdo da caixa do rosto de gato + largura e altura

- O modelo de rosto de gato não fornece pontos-chave (diferente da detecção de rosto humano)

## Código

### Lógica central de detecção

`components/modules/ai/who_cat_face_detection.cpp`:

```C++
CatFaceDetectMN03 detector(0.4F, 0.3F, 10, 0.3F);
std::list<dl::detect::result_t> &detect_results = detector.infer(
    (uint16_t *)frame->buf, {(int)frame->height, (int)frame->width, 3});

if (detect_results.size() > 0) {
    draw_detection_result((uint16_t *)frame->buf, frame->height, frame->width, detect_results);
    print_detection_result(detect_results);  // 串口输出坐标
}
```

### Arduino: ler as coordenadas e controlar o servo

```C++
// 解析 $face:x,y,w,h# 格式
if (nanoSerial.available()) {
    String line = nanoSerial.readStringUntil('\n');
    if (line.startsWith("$face:")) {
        int x = line.substring(6).toInt();
        int y = line.substring(line.indexOf(',')+1).toInt();
        servoX.write(map(x, 0, 320, 0, 180));
    }
}
```

### Leitura serial em Python

```Python
import serial
ser = serial.Serial("COM3", 115200)
while True:
    line = ser.readline().decode().strip()
    if "detection_result" in line:
        print(line)
```

## Resultado

O gato aparece → caixa verde marcada na imagem → coordenadas enviadas pela porta serial. Use Arduino/Python para ler as coordenadas e mover o servo para rastrear.

Próximo capítulo: [Capítulo 6: Reconhecimento de cores](./Ch06-Color-Recognition.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
