---
title: USB-Soundkarte ohne Treiber – Tutorial
description: "JUXI USB-Soundkarte ohne Treiber: Testsoftware, Befehle und Audio-Debugging – für Raspberry Pi, Jetson, PC u. a."
---

# USB-Soundkarte ohne Treiber – Tutorial

> **[Im Shop kaufen](https://www.juxitech.com/de/products/usb-2-0-driver-free-sound-card-onboard-mic-speaker-for-ai-voice-interaction)**


# Visualisierungs-Testsoftware (Windows)

[audio_tools.7z](https://juxitech.feishu.cn/wiki/Wuc3wAppNi5elfkSI6VccrNDnfE)

**Befehlsübersicht (überspringbar)

- System aktualisieren und Tools installieren:

    - Ausführen: `sudo apt update && sudo apt full-upgrade`

    - ALSA installieren: `sudo apt install alsa-base alsa-utils`

- Hardware erkennen:

    - Audiogeräte auflisten: `aplay -l`

    - PCI/USB-Audiogeräte anzeigen: `lspci | grep -i audio`、`lsusb`

- Grundkonfiguration und Überprüfung:

    - Konfigurationsassistent ausführen: `sudo alsaconf` (falls verfügbar)

    - Lautstärke einstellen: `alsamixer` (**M** = Stummschaltung aufheben, Pfeiltasten = Lautstärke, ESC = beenden)

    - Einstellungen speichern: `sudo alsactl store`

    - Wiedergabetest: Audioausgabe testen (Lautsprecher/Kopfhörer anschließen):

```Bash
# Testton abspielen; -D gibt die USB-Soundkarte an (X = card-Nummer aus aplay -l)
speaker-test -c 2 -D plughw:X,0
```

- Audiodienst neu starten: `sudo systemctl restart alsa` (in manchen Umgebungen Neustart nötig: `sudo reboot`)

# Jetson-Serie & Ubuntu-System & Raspberry Pi

## Debugging über die Befehlszeile

### 1. USB-Soundkarte anschließen

1. Vor dem Einstecken der USB-Soundkarte die USB-Geräte mit `lsusb` anzeigen:

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/1.png)

2. USB-Soundkarte einstecken und erneut `lsusb` ausführen – das zusätzlich erscheinende Gerät ist die USB-Soundkarte:

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/10.png)

3. Mit `arecord -l` alle Aufnahmegeräte auflisten – unsere USB-Soundkarte ist sichtbar:

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/2.png)

4. Mit `aplay -l` alle Wiedergabegeräte auflisten:

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/3.png)

### 2. USB-Soundkarte verwenden

Zeigt `arecord -l` z. B. UACDemoV1.0, so ist das unsere Soundkarte. Bei card 0; device 0 wird im Befehl plughw:0,0 angegeben, um dieses Aufnahmegerät zu wählen:

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/4.png)

Mit dem Linux-eigenen Aufnahmebefehl 5 Sekunden Ton aufnehmen und testen:

`arecord -D plughw:0,0 -f S16_LE -r 16000 -d 5 -t wav test.wav`

`plughw:0,0` bedeutet `card 0, device 0`, also unsere USB-Soundkarte. Je nach Ausgabe von `arecord -l` anpassen: wenn UACDemoV1.0 als card 1; device 1 angezeigt wird, muss `plughw:0,0` in `plughw:1,1` geändert werden. Der Parameter `plughw` sorgt für automatische Formatkonvertierung und überbrückt verschiedene Datenformate und Hardware. Weitere arecord-Parameter:

|Befehl|Bedeutung|Bedeutung in diesem Befehl|
|---|---|---|
|-D|Gerätename wählen|Externe USB-Soundkarte "plughw:1.0" verwenden|
|-f|Aufnahmeformat|S16_LE = vorzeichenbehaftetes 16-Bit-Little-Endian|
|-r|Abtastrate|16000 = 16-kHz-Abtastung|
|-d|Aufnahmedauer|5 Sekunden aufnehmen|
|-t|Aufnahmeformat|wav-Format|
|test.wav|Dateiname (Pfad möglich)|Dateiname test.wav|

Bei zu leiser Aufnahme `alsamixer` verwenden und `F6` drücken, um die USB-Soundkarte zu wählen:

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/5.png)

Dann `F5` drücken, um Aufnahme- und Wiedergabegeräte anzuzeigen. Aufnahmelautstärke mit Pfeil-nach-oben erhöhen. PCM = Wiedergabe, CAPTURE MIC = Aufnahme:

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/6.png)

Anschließend mit `aplay` wiedergeben:

`aplay -D plughw:0,0 -f S16_LE -r 16000 -c 1 test.wav`

Parametererklärung:

- -D plughw:0,0: Aufnahmegerät festlegen. plughw:0,0 = erstes Gerät der ersten Soundkarte.

- -f S16_LE: Audioformat festlegen. S16_LE = 16-Bit-Little-Endian (Signed), ein gängiges Audioformat; „Little Endian" bedeutet, dass das niederwertige Byte im Speicher an der niedrigeren Adresse liegt.

- -r 16000: Abtastrate festlegen.

- -c 1: Kanalanzahl festlegen.

- -d 5: Aufnahmedauer in Sekunden.

## PulseAudio-Anzeige

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/7.png)

PulseAudio [per Befehlszeile](https://so.csdn.net/so/search?q=%E5%91%BD%E4%BB%A4%E8%A1%8C&spm=1001.2101.3001.7020) anzeigen:

`pactl list sources short`            # Alle verfügbaren Audioquellen des PulseAudio-Servers auflisten

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/8.png)

> 49 = Quellenindex
>
> Alsa _input.usb = USB-Eingabegerät, also ein Mikrofon
>
> s16le = 16-Bit-Little-Endian-Audioformat (Signed)
>
> 1ch = Monokanal.
>
> 48000Hz = Abtastrate, 48000 Abtastungen pro Sekunde
>
> SUSPENDED = Mikrofon derzeit angehalten
>
> RUNNING = Mikrofon in Benutzung

## Python: USB-Soundkarte ohne Treiber ansprechen

Codebeispiele selbst suchen, z. B. „[Python调用USB免驱声卡](https://blog.csdn.net/weixin_44463519/article/details/157463731?spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7ECtr-3-157463731-blog-105694458.235%5Ev43%5Epc_blog_bottom_relevance_base9&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7ECtr-3-157463731-blog-105694458.235%5Ev43%5Epc_blog_bottom_relevance_base9&utm_relevant_index=4)"

## Problemübersicht

### Jetson

1. Gerät belegt

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/9.png)

Einstellungsseite schließen und Befehl erneut ausführen

Falls weiterhin nicht: neu einstecken oder neu starten

Prozess anzeigen, der das Audiogerät belegt:

`sudo lsof /dev/snd/*`

Vor dem Einstecken der Soundkarte:

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/1.png)

Nach dem Einstecken:

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/10.png)

Prozess beenden mit `kill -9 PID` (PID = der nach dem Einstecken neu erscheinende Prozess, im Screenshot 33739)

Danach erneut aufnehmen und abspielen

### Raspberry Pi

1. Starke Störgeräusche

```Plain Text
Zuerst Mikrofonlautstärke auf 100 stellen
Terminal öffnen
$ sudo vi /boot/config.txt    #oder ggf. /boot/firmware/config.txt
Am Ende der Datei hinzufügen
audio_pwm_mode = 2
ESC, dann :wq zum Speichern und Beenden
Danach neu starten
$ reboot
```

2. Lautstärkeeinstellungen werden bei jedem Neustart zurückgesetzt

Nach dem erneuten Einstellen der Lautstärke

die aktuelle Konfiguration in der System-Standarddatei speichern:

```Bash
sudo chmod 664 /var/lib/alsa/asound.state
sudo alsactl store
```

### Ubuntu-VM

1. Rauschen bei der Aufnahme

Lösung: USB-Controller-Kompatibilität auf 3.0 oder 3.1 ändern

# RDK x3&x5

## Gerätenummer prüfen

Prüfen, ob die Soundkarte existiert und welche Gerätenummer sie hat.

Mit `cat /proc/asound/cards` prüfen, ob die Soundkarte registriert ist:

```Shell
0 [duplexaudio    ]: simple-card - duplex-audio
                      duplex-audio
```

Mit `cat /proc/asound/devices` die logischen Geräte prüfen:

```Shell
root@ubuntu:~# cat /proc/asound/devices
  2: [ 0- 0]: digital audio playback
  3: [ 0- 0]: digital audio capture
  4: [ 0]   : control
 33:        : timer
```

Mit `ls /dev/snd/` die tatsächlichen Gerätedateien im Userspace prüfen:

```Shell
root@ubuntu:~# ls /dev/snd/
by-path/   controlC0  pcmC0D0c   pcmC0D0p   timer
```

Daraus ergibt sich: Soundkarte 0 ist die Onboard-Soundkarte; die Geräte existieren mit Nummer `0-0`. Die tatsächlich verwendeten Geräte sind `pcmC0D0p` und `pcmC0D0c`.

## 5 Sekunden Ton aufnehmen und testen

`arecord -D plughw:0,0 -f S16_LE -r 16000 -d 5 -t wav test.wav`

`plughw:0,0` bedeutet `card 0, device 0`, also unsere USB-Soundkarte. `plughw` sorgt für automatische Formatkonvertierung und überbrückt verschiedene Datenformate und Hardware. Weitere arecord-Parameter:

|Befehl|Bedeutung|Bedeutung in diesem Befehl|
|---|---|---|
|-D|Gerätename wählen|Externe USB-Soundkarte "plughw:1.0" verwenden|
|-f|Aufnahmeformat|S16_LE = vorzeichenbehaftetes 16-Bit-Little-Endian|
|-r|Abtastrate|16000 = 16-kHz-Abtastung|
|-d|Aufnahmedauer|5 Sekunden aufnehmen|
|-t|Aufnahmeformat|wav-Format|
|test.wav|Dateiname (Pfad möglich)|Dateiname test.wav|

Bei zu leiser Aufnahme `alsamixer` verwenden und `F6` drücken, um die USB-Soundkarte zu wählen:

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/2.png)

Dann `F5` drücken, um Aufnahme- und Wiedergabegeräte anzuzeigen. Aufnahmelautstärke mit Pfeil-nach-oben erhöhen. PCM = Wiedergabe, CAPTURE MIC = Aufnahme:

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/3.png)

Anschließend mit `aplay` wiedergeben:

`aplay -D plughw:0,0 -f S16_LE -r 16000 -c 1 test.wav`

Parametererklärung:

- -D plughw:0,0: Aufnahmegerät festlegen. plughw:0,0 = erstes Gerät der ersten Soundkarte.

- -f S16_LE: Audioformat festlegen. S16_LE = 16-Bit-Little-Endian (Signed), ein gängiges Audioformat; „Little Endian" bedeutet, dass das niederwertige Byte im Speicher an der niedrigeren Adresse liegt.

- -r 16000: Abtastrate festlegen.

- -c 1: Kanalanzahl festlegen.

- -d 5: Aufnahmedauer in Sekunden.

## Häufige Fragen

### Wie unterscheidet man auf einem RDK-Board die USB-Soundkarte von der Onboard-Soundkarte?

### Wie können das Audio-Subboard der RDK-X3-Serie und die USB-Soundkarte gleichzeitig koexistieren und verwendet werden?

### Wie nutzt man die Audiofunktionen auf dem RDKS100 über die grafische Oberfläche?

Siehe [RDK Multimedia-Verarbeitung und -Anwendung](https://developer.d-robotics.cc/rdk_doc/FAQ/multimedia#usb-%E5%A3%B0%E5%8D%A1%E5%92%8C%E6%9D%BF%E8%BD%BD%E5%A3%B0%E5%8D%A1%E5%A6%82%E4%BD%95%E5%8C%BA%E5%88%86%E4%BD%BF%E7%94%A8)

# Grundlegenden Audiotreiber prüfen

Ob die treiberfreie USB-Soundkarte funktioniert, **hängt vom Kernel ab**

- Ist die USB-Audio-Class-Unterstützung aktiviert (`CONFIG_USB_AUDIO`)?

- Ist das passende Kernelmodul geladen (z. B. `snd-usb-audio`)?

Unterstützt der Kernel es, genügt die Installation der Basis-Audiotools. Ist der Kernel beschnitten, muss er neu kompiliert werden, um den Treiber zu aktivieren.

**Schritt 1: Prüfen, ob der Kernel snd_usb_audio unterstützt**

```Plain Text
# Methode 1: Prüfen, ob das Treibermodul geladen ist
lsmod | grep snd_usb_audio

# Methode 2: Prüfen, ob das Modul im Kernel enthalten ist (auch wenn nicht geladen)
modinfo snd_usb_audio  # Ausgabe vorhanden = Kernel unterstützt; keine Ausgabe = Modul nicht einkompiliert
```

**Keine Ausgabe bei `modinfo`**: Der Systemkernel hat den Treiber beschnitten – Kernel neu kompilieren und in `.config` aktivieren:

```Plain Text
CONFIG_SND_USB_AUDIO=m  # als Modul kompilieren, oder =y fest einkompilieren
CONFIG_SND_USB_UA101=y
CONFIG_SND_USB_CAIAQ=y
```

**Ausgabe bei `modinfo` vorhanden**: Modul direkt laden:

```Bash
sudo modprobe snd_usb_audio
```

#### Schritt 2: Basis-Audiotools installieren (in der Minimalversion nicht enthalten)

Minimalsysteme haben oft kein `alsa-utils` – manuell installieren:

```Bash
# Ubuntu/Debian
sudo apt update && sudo apt install -y alsa-utils usbutils

# Ohne Netzwerk: Offline-Paket von alsa-utils herunterladen und mit dpkg -i installieren
```

#### Schritt 3: Erkennung und Funktion der USB-Soundkarte prüfen

1. USB-Soundkarte einstecken und Geräteerkennung prüfen:

```Bash
# USB-Enumeration anzeigen
lsusb | grep -i audio

# Audiogeräte auflisten
aplay -l
```

Erscheint ein Eintrag `card X` mit `USB Audio`, ist die Erkennung erfolgreich.

2. Audioausgabe testen (Lautsprecher/Kopfhörer anschließen):

```Bash
# Testton abspielen; -D gibt die USB-Soundkarte an (X = card-Nummer aus aplay -l)
speaker-test -c 2 -D plughw:X,0
```

#### Schritt 4: (Optional) Audiodienst installieren (für Desktop/Hintergrundwiedergabe)

Für Hintergrundwiedergabe oder Desktop-Umgebungen muss in Minimalversionen ein Audiodienst installiert werden:

```Bash
# Leichtgewichtiger Dienst (empfohlen, funktioniert auch ohne Desktop)
sudo apt install -y pulseaudio

# oder PipeWire (empfohlen für Ubuntu 22.04+)
sudo apt install -y pipewire pipewire-alsa
```

### Typische Probleme der Minimalversion und Lösungen

**1. Fehlende Berechtigungen – Normalnutzer kann nicht auf die Soundkarte zugreifen**

Lösung: Benutzer der Gruppe `audio` hinzufügen, nach Neustart wirksam:

```Bash
sudo usermod -aG audio $USER
```

2.**Kein Ton, aber Gerät wird erkannt**

Lösung: Mit `alsamixer` die Lautstärke erhöhen und Stummschaltung aufheben (**M**-Taste):

```Bash
alsamixer -c X  # X = card-Nummer der USB-Soundkarte
```

3.**Kernel zu alt für moderne USB-Soundkarten – zwei Fälle**

```Bash
sudo apt install -y linux-generic && sudo reboot
```

```Bash
sudo modprobe snd-hda-intel model=generic #(je nach Gerät andere model-Werte probieren)
# Soundkarten-Treiberkonfiguration erstellen
sudo echo "options snd-hda-intel model=generic" > /etc/modprobe.d/sound.conf
sudo reboot
```


---

## Offizielles Repository

Open-Source-Repository der JUXI-treiberfreien USB-Soundkarte: [GitHub](https://github.com/Juxi-Technology/Driver-Free-Sound-Card)

Plug-and-Play, kompatibel mit Raspberry Pi, Jetson, PC u. a. Kein zusätzlicher Treiber nötig – das System erkennt sie automatisch als Audio-Eingabe-/Ausgabegerät.
