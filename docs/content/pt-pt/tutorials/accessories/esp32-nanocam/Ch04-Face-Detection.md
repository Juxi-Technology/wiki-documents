---
title: "Capítulo 4: Deteção de rostos"
description: "Tutorial ESP32-NanoCam, Capítulo 4: usar o modelo de deteção de rostos MobileNet do ESP-DL para marcar o rosto e os 5 pontos-chave na imagem e ler as."
---

# Capítulo 4: Deteção de rostos

> **[Comprar na loja](https://www.juxitech.com/products/esp32-s3-wifi-video-module)**

**Objetivo deste capítulo**: fazer com que o NanoCam detete rostos na imagem, marque a caixa do rosto e os pontos-chave e forneça as coordenadas para controlo externo.

## Princípio

A deteção de rostos utiliza a biblioteca de aprendizagem profunda ESP-DL, com base no modelo de deteção leve MobileNet. A entrada é uma imagem RGB565 de 320x240 e a saída é uma lista de caixas delimitadoras de rostos (posição + tamanho + confiança). A inferência é executada no próprio ESP32-S3, sem necessidade de ligação à rede.

### Formato do resultado da deteção

- Coordenadas: canto superior esquerdo (x,y) + largura e altura (w,h)
- Confiança: número de vírgula flutuante entre 0 e 1
- Quando há vários rostos, são devolvidas várias caixas

## Passos

### 4.1 Mudar de modo

```Plain
ai_mode:2
```

> Consulte o [manual do protocolo da porta serial](./ESP32-NanoCam-Serial-Protocol.md) para a lista completa de comandos.

### 4.2 Observar o resultado

Abra `http://<IP>` no navegador para ver a caixa de deteção do rosto.

### 4.3 Obter as coordenadas

Formato da saída na porta série:

```Plain
I (xxxxx) detection_result: [ 0]: ( 45,  30, 180, 210)
I (xxxxx) detection_result:       left eye: ( 90,  80), right eye: (150,  80), nose: (120, 120), mouth left: ( 95, 150), mouth right: (145, 150)
```

- Primeira linha: `[número] (x, y, w, h)` — coordenadas da caixa do rosto
- Segunda linha: 5 pontos-chave — olho esquerdo, olho direito, nariz, canto esquerdo da boca, canto direito da boca

## Código

### Arduino: ler as coordenadas para controlar um servo

```C++
// Analisar o formato $face:x,y,w,h#
if (nanoSerial.available()) {
    String line = nanoSerial.readStringUntil('\n');
    if (line.startsWith("$face:")) {
        int x = line.substring(6).toInt();
        int y = line.substring(line.indexOf(',')+1).toInt();
        servoX.write(map(x, 0, 320, 0, 180));
    }
}
```

### Leitura em Python

```Python
ser = serial.Serial("COM3", 115200)
line = ser.readline().decode()
if line.startswith("$face:"):
    parts = line[6:-1].split(",")
    x, y, w, h = map(int, parts)
```

## Efeito

Aparece um rosto em frente da câmara → a imagem mostra uma caixa verde → as coordenadas são enviadas pela porta série.

Próximo capítulo: [Capítulo 5: Deteção de faces de gato](./Ch05-Cat-Face-Detection.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
