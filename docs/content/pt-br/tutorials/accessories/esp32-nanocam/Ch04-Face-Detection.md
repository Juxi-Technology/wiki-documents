---
title: "Capítulo 4: Detecção de rosto"
description: "Capítulo 4 do tutorial do ESP32-NanoCam: use o modelo de detecção de rosto MobileNet da ESP-DL para marcar a caixa do rosto e 5 pontos-chave na imagem, e leia as coordenadas com Arduino/Python para controlar um servo."
---

# Capítulo 4: Detecção de rosto

> **[Comprar na loja](https://www.juxitech.com/products/esp32-s3-wifi-video-module)**

**Objetivo do capítulo**: fazer o NanoCam detectar rostos na imagem, marcar a caixa e os pontos-chave do rosto, e ler as coordenadas para controle externo.

## Princípio

A detecção de rosto usa a biblioteca de aprendizado profundo ESP-DL, com base no modelo leve de detecção MobileNet. Recebe uma imagem RGB565 de 320x240 e retorna uma lista de caixas delimitadoras de rosto (posição + tamanho + confiança). A inferência roda no ESP32-S3, sem necessidade de conexão à internet.

### Formato do resultado da detecção

- Coordenadas: canto superior esquerdo (x,y) + largura e altura (w,h)

- Confiança: número de ponto flutuante entre 0 e 1

- Com vários rostos, várias caixas são retornadas

## Passos

### 4.1 Alternar o modo

```Plain
ai_mode:2
```

> Consulte o [manual do protocolo serial](./ESP32-NanoCam-Serial-Protocol.md) para todos os comandos.

### 4.2 Observar o resultado

No navegador, `http://<IP>` mostra a caixa de detecção de rosto.

### 4.3 Obter as coordenadas

Formato da saída serial:

```Plain
I (xxxxx) detection_result: [ 0]: ( 45,  30, 180, 210)
I (xxxxx) detection_result:       left eye: ( 90,  80), right eye: (150,  80), nose: (120, 120), mouth left: ( 95, 150), mouth right: (145, 150)
```

- Primeira linha: `[número] (x, y, w, h)` — coordenadas da caixa de rosto

- Segunda linha: 5 pontos-chave — olho esquerdo, olho direito, nariz, canto esquerdo da boca, canto direito da boca

## Código

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

### Leitura em Python

```Python
ser = serial.Serial("COM3", 115200)
line = ser.readline().decode()
if line.startswith("$face:"):
    parts = line[6:-1].split(",")
    x, y, w, h = map(int, parts)
```

## Resultado

Um rosto aparece diante da câmera → caixa verde marcada na imagem → coordenadas enviadas pela porta serial.

Próximo capítulo: [Capítulo 5: Detecção de rosto de gato](./Ch05-Cat-Face-Detection.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
