---
title: "Capitolo 2: Avvio rapido"
description: "Tutorial ESP32-NanoCam capitolo 2: flashare il firmware e completare la configurazione WiFi (seriale o hotspot AP), aprire nel browser il primo fotogramma MJPEG in tempo reale e conoscere i vari endpoint HTTP."
---

# Capitolo 2: Avvio rapido

> **[Acquista nel negozio](https://www.juxitech.com/it/products/esp32-s3-wifi-video-module)**

**Obiettivo del capitolo**: flashare il firmware, completare la configurazione WiFi e vedere nel browser il primo fotogramma in tempo reale di NanoCam.

## 2.1 Flashing del firmware

### Passaggi

1. Estrarre la cartella → `nanocam_xxx.bin`

2. Aprire [esptool-js](https://espressif.github.io/esptool-js/)

3. Collegare NanoCam via Type-C

4. Cliccare su Connect → selezionare la porta seriale

5. Selezionare il file firmware, inserire `0x0` come indirizzo

6. Cliccare su START → attendere il completamento

### Verifica

Collegare NanoCam con uno strumento seriale (115200 8N1), si dovrebbe vedere:

```Plain
NanoCam Board Ver:0.3.0
```

---

## 2.2 Configurazione WiFi

> Risultato: **NanoCam connesso al WiFi, con IP ottenuto**

### Metodo A: configurazione via seriale (il più usato)

```Plain
sta_ssid:nome_della_tua_WiFi
sta_pd:password_della_tua_WiFi
```

Alla ricezione di `OK` → impostazione riuscita. Dopo la modifica della password il dispositivo si riavvia automaticamente.

> Per tutti i comandi seriali vedi il [manuale del protocollo seriale](./ESP32-NanoCam-Serial-Protocol.md).

### Metodo B: connessione diretta all'hotspot AP

NanoCam crea un proprio hotspot: `NanoCam-AP`, password `12345678`
Dopo aver collegato lo smartphone, aprire nel browser `http://192.168.4.1`

### Verifica

```Plain
sta_ip
```

Restituisce: `sta_ip:192.168.x.x` ✅

---

## 2.3 Il primo fotogramma

> Risultato: **video di NanoCam in tempo reale visibile nel browser**

1. Aprire nel browser `http://<indirizzo IP>`

2. Si vede il video MJPEG in tempo reale

3. Inviare `ai_mode:1` dalla seriale → passaggio al rilevamento del muso del gatto → nell'immagine compare il riquadro di rilevamento

### Descrizione degli endpoint

|URL|Funzione|
|---|---|
|`http://<IP>/`|Video in tempo reale (HTML)|
|`http://<IP>/stream`|Stream MJPEG puro (leggibile con OpenCV/VLC)|
|`http://<IP>/status`|Stato del dispositivo in JSON|
|`http://<IP>/admin`|Pannello di amministrazione web|

Capitolo successivo: [Capitolo 3: Fondamenti della fotocamera](./Ch03-Camera-Basics.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
