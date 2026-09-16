---
title: "Capitolo 4: Rilevamento del volto"
description: "Tutorial ESP32-NanoCam capitolo 4: usare il modello di rilevamento volti ESP-DL MobileNet per annotare nell'immagine il riquadro del volto e i 5 keypoint."
---

# Capitolo 4: Rilevamento del volto

> **[Acquista nel negozio](https://www.juxitech.com/it/products/esp32-s3-wifi-video-module)**

**Obiettivo del capitolo**: far rilevare a NanoCam i volti nell'immagine, annotare il riquadro del volto e i keypoint, e leggere le coordinate per il controllo esterno.

## Come funziona

Il rilevamento del volto usa la libreria di deep learning ESP-DL, basata sul modello leggero di rilevamento MobileNet. In ingresso un'immagine 320x240 RGB565, in uscita un elenco di bounding box dei volti (posizione + dimensione + confidenza). L'inferenza avviene sull'ESP32-S3, senza connessione di rete.

### Formato del risultato di rilevamento

- Coordinate: angolo in alto a sinistra (x,y) + larghezza e altezza (w,h)

- Confidenza: numero in virgola mobile tra 0 e 1

- Con più volti vengono restituiti più riquadri

## Passaggi

### 4.1 Cambiare modalità

```Plain
ai_mode:2
```

> Per tutti i comandi vedi il [manuale del protocollo seriale](./ESP32-NanoCam-Serial-Protocol.md).

### 4.2 Osservare il risultato

Nel browser `http://<IP>` si vede il riquadro di rilevamento del volto.

### 4.3 Ottenere le coordinate

Formato dell'output seriale:

```Plain
I (xxxxx) detection_result: [ 0]: ( 45,  30, 180, 210)
I (xxxxx) detection_result:       left eye: ( 90,  80), right eye: (150,  80), nose: (120, 120), mouth left: ( 95, 150), mouth right: (145, 150)
```

- Prima riga: `[indice] (x, y, w, h)` — coordinate del riquadro del volto

- Seconda riga: 5 keypoint — occhio sinistro, occhio destro, naso, angolo sinistro della bocca, angolo destro della bocca

## Codice

### Arduino: leggere le coordinate e controllare il servomotore

```C++
// analizza il formato $face:x,y,w,h#
if (nanoSerial.available()) {
    String line = nanoSerial.readStringUntil('\n');
    if (line.startsWith("$face:")) {
        int x = line.substring(6).toInt();
        int y = line.substring(line.indexOf(',')+1).toInt();
        servoX.write(map(x, 0, 320, 0, 180));
    }
}
```

### Lettura in Python

```Python
ser = serial.Serial("COM3", 115200)
line = ser.readline().decode()
if line.startswith("$face:"):
    parts = line[6:-1].split(",")
    x, y, w, h = map(int, parts)
```

## Risultato

Un volto davanti alla fotocamera → nell'immagine viene annotato un riquadro verde → le coordinate sono inviate sulla seriale.

Capitolo successivo: [Capitolo 5: Rilevamento del muso del gatto](./Ch05-Cat-Face-Detection.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
