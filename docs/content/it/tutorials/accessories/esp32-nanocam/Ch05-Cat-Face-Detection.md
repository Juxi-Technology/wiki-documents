---
title: "Capitolo 5: Rilevamento del muso del gatto"
description: "Tutorial ESP32-NanoCam capitolo 5: usare il modello CatFaceDetectMN03 per rilevare il muso del gatto."
---

# Capitolo 5: Rilevamento del muso del gatto

> **[Acquista nel negozio](https://www.juxitech.com/it/products/esp32-s3-wifi-video-module)**

**Obiettivo del capitolo**: far rilevare a NanoCam il muso dei gatti e capire le differenze rispetto al modello di rilevamento del volto umano.

## Come funziona

Il rilevamento del muso del gatto usa il modello CatFaceDetectMN03, addestrato e ottimizzato per le caratteristiche del muso dei gatti (orecchie triangolari / ampia distanza interpupillare / naso). In ingresso un'immagine 320x240 RGB565, in uscita un elenco di bounding box dei musi. Condivide lo stesso formato di output `print_detection_result` del rilevamento del volto del [Capitolo 4](./Ch04-Face-Detection.md).

### Differenze tra i modelli di rilevamento del volto umano e del muso del gatto

|Dimensione di confronto|Rilevamento del volto (ai_mode:2)|Rilevamento del muso del gatto (ai_mode:1)|
|---|---|---|
|Modello|MSR01 + MNP01 a doppia cascata|CatFaceDetectMN03 a stadio singolo|
|Keypoint|10 (occhi/estremità del naso/angoli della bocca)|Nessuno (il modello non li restituisce)|
|Soglia di confidenza|MSR01=0.3, MNP01=0.4|0.4|
|Disegno del riquadro|Rettangolo verde vuoto + 5 keypoint|Rettangolo verde vuoto (senza keypoint)|

## Passaggi

### 5.1 Cambiare modalità

```Plain
ai_mode:1
```

Il dispositivo si riavvia automaticamente entrando in modalità rilevamento del muso del gatto

> Per tutti i comandi vedi il [manuale del protocollo seriale](./ESP32-NanoCam-Serial-Protocol.md).

### 5.2 Osservare il risultato

Mettere un gatto o una sua foto davanti alla fotocamera: aprendo `http://<IP>` nel browser si vede il riquadro verde che annota il muso.

### 5.3 Output seriale

Quando viene rilevato un muso, la seriale emette:

```Plain
I (xxxxx) detection_result: [ 0]: ( 45,  30, 180, 210)
```

- Formato: `[indice] (x, y, w, h)` — coordinate dell'angolo in alto a sinistra del riquadro del muso + larghezza e altezza

- Il modello per il muso non restituisce keypoint (a differenza del rilevamento del volto umano)

## Codice

### Logica di rilevamento principale

`components/modules/ai/who_cat_face_detection.cpp`:

```C++
CatFaceDetectMN03 detector(0.4F, 0.3F, 10, 0.3F);
std::list<dl::detect::result_t> &detect_results = detector.infer(
    (uint16_t *)frame->buf, {(int)frame->height, (int)frame->width, 3});

if (detect_results.size() > 0) {
    draw_detection_result((uint16_t *)frame->buf, frame->height, frame->width, detect_results);
    print_detection_result(detect_results);  // output seriale delle coordinate
}
```

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

### Lettura seriale in Python

```Python
import serial
ser = serial.Serial("COM3", 115200)
while True:
    line = ser.readline().decode().strip()
    if "detection_result" in line:
        print(line)
```

## Risultato

Appare il gatto → nell'immagine viene annotato un riquadro verde → le coordinate sono inviate sulla seriale. È possibile leggere le coordinate con Arduino/Python per far seguire il gatto al servomotore.

Capitolo successivo: [Capitolo 6: Riconoscimento dei colori](./Ch06-Color-Recognition.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
