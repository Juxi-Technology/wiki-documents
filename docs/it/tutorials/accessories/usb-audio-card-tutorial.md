---
title: Tutorial scheda audio USB senza driver
description: "Tutorial della scheda audio USB senza driver JUXI: software di test, comandi e debug audio – Raspberry Pi, Jetson, PC, ecc."
---

# Tutorial scheda audio USB senza driver

# Software di test visuale (Windows)

[audio_tools.7z](https://juxitech.feishu.cn/wiki/Wuc3wAppNi5elfkSI6VccrNDnfE)

**Riepilogo comandi (saltabile)

- Aggiornare il sistema e installare gli strumenti:

    - Eseguire: `sudo apt update && sudo apt full-upgrade`

    - Installare ALSA: `sudo apt install alsa-base alsa-utils`

- Identificare l'hardware:

    - Elencare i dispositivi audio: `aplay -l`

    - Vedere i dispositivi audio PCI/USB: `lspci | grep -i audio`、`lsusb`

- Configurazione e verifica di base:

    - Eseguire la procedura guidata: `sudo alsaconf` (se disponibile)

    - Regolare il volume: `alsamixer` (**M** per togliere il mute, frecce per il volume, ESC per uscire)

    - Salvare le impostazioni: `sudo alsactl store`

    - Test di riproduzione: testare l'uscita audio (altoparlanti/cuffie collegati):

```Bash
# Riproduce un tono di test; -D specifica la scheda audio USB (X = numero card da aplay -l)
speaker-test -c 2 -D plughw:X,0
```

- Riavviare il servizio audio: `sudo systemctl restart alsa` (in alcuni ambienti serve il riavvio del sistema: `sudo reboot`)

# Serie Jetson e sistema Ubuntu e Raspberry Pi

## Debug da riga di comando

### 1. Collegare la scheda audio USB

1. Prima di inserire la scheda audio USB, visualizzare i dispositivi USB con `lsusb`:

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/1.png)

2. Inserire la scheda audio USB ed eseguire di nuovo `lsusb`: il dispositivo aggiuntivo è la scheda audio USB:

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/10.png)

3. `arecord -l` elenca tutti i dispositivi di registrazione; qui si vede la nostra scheda audio USB:

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/2.png)

4. `aplay -l` elenca tutti i dispositivi di riproduzione:

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/3.png)

### 2. Usare la scheda audio USB

Se `arecord -l` mostra ad esempio UACDemoV1.0, quella è la nostra scheda audio. Se è card 0; device 0, nel comando si usa plughw:0,0 per specificare quel dispositivo di registrazione:

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/4.png)

Eseguire il comando di registrazione nativo di Linux per registrare 5 secondi di audio e testare:

`arecord -D plughw:0,0 -f S16_LE -r 16000 -d 5 -t wav test.wav`

Qui `plughw:0,0` significa `card 0, device 0`, cioè la nostra scheda audio USB; va modificato in base al numero di dispositivo di `arecord -l`. Se UACDemoV1.0 appare come card 1; device 1, sostituire `plughw:0,0` con `plughw:1,1`. Il parametro `plughw` fornisce la conversione automatica del formato e fa da ponte tra diversi formati di dati e hardware. Altri parametri di arecord:

|Comando|Significato|Significato in questo comando|
|---|---|---|
|-D|Selezionare il nome del dispositivo|Usare la scheda audio USB esterna "plughw:1.0"|
|-f|Formato di registrazione|S16_LE = intero con segno a 16 bit in little-endian|
|-r|Frequenza di campionamento|16000 = campionamento a 16 kHz|
|-d|Durata di registrazione|Registra 5 secondi|
|-t|Formato di registrazione|Formato wav|
|test.wav|Nome file (può contenere percorso)|Il file si chiama test.wav|

Se il suono è troppo basso, eseguire `alsamixer` e premere `F6` per selezionare la scheda audio USB:

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/5.png)

Poi premere `F5` per mostrare i dispositivi di registrazione e riproduzione. Alzare il volume di registrazione con la freccia su. PCM è riproduzione, CAPTURE MIC è registrazione:

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/6.png)

Infine, riprodurre con il comando `aplay`:

`aplay -D plughw:0,0 -f S16_LE -r 16000 -c 1 test.wav`

Spiegazione dei parametri:

- -D plughw:0,0: specifica il dispositivo di registrazione. plughw:0,0 = primo dispositivo della prima scheda audio.

- -f S16_LE: imposta il formato del file audio. S16_LE = intero con segno a 16 bit in little-endian (Signed 16-bit Little Endian), un formato dati audio comune; "little-endian" significa che il byte meno significativo è memorizzato all'indirizzo più basso della memoria.

- -r 16000: imposta la frequenza di campionamento.

- -c 1: imposta il numero di canali.

- -d 5: imposta la durata di registrazione in secondi.

## Visualizzazione con PulseAudio

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/7.png)

Verificare PulseAudio da [riga di comando](https://so.csdn.net/so/search?q=%E5%91%BD%E4%BB%A4%E8%A1%8C&spm=1001.2101.3001.7020):

`pactl list sources short`            # Elenca tutte le sorgenti audio disponibili del server PulseAudio

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/8.png)

> 49 rappresenta l'indice della sorgente
>
> Alsa _input.usb indica un dispositivo di ingresso USB, cioè un microfono
>
> s16le è il formato di campionamento audio a 16 bit con segno in little-endian.
>
> 1ch indica mono.
>
> 48000Hz è la frequenza di campionamento, 48000 campioni al secondo
>
> SUSPENDED indica che il microfono è sospeso
>
> RUNNING indica che il microfono è in uso

## Chiamare la scheda audio USB senza driver da Python

Cercare esempi di codice, ad esempio «[Python调用USB免驱声卡](https://blog.csdn.net/weixin_44463519/article/details/157463731?spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7ECtr-3-157463731-blog-105694458.235%5Ev43%5Epc_blog_bottom_relevance_base9&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7ECtr-3-157463731-blog-105694458.235%5Ev43%5Epc_blog_bottom_relevance_base9&utm_relevant_index=4)»

## Riepilogo problemi

### Jetson

1. Dispositivo occupato

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/9.png)

Chiudere la pagina delle impostazioni e rieseguire il comando

Se non basta, scollegare e ricollegare, oppure riavviare

Vedere quale processo occupa il dispositivo audio:

`sudo lsof /dev/snd/*`

Prima di inserire la scheda audio:

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/1.png)

Dopo aver inserito la scheda audio:

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/10.png)

Terminare il processo `kill -9 PID`, dove PID è quello apparso dopo l'inserimento (33739 nello screenshot)

Poi registrare e riprodurre di nuovo

### Raspberry Pi

1. Molto rumore

```Plain Text
Prima portare il volume del microfono a 100
Aprire un terminale
$ sudo vi /boot/config.txt    #oppure forse /boot/firmware/config.txt
Aggiungere in fondo al file
audio_pwm_mode = 2
ESC, digitare :wq per salvare e uscire
Poi riavviare
$ reboot
```

2. Le impostazioni di volume si azzerano a ogni riavvio

Dopo aver reimpostato il volume,

salvare la configurazione corrente nel file di configurazione predefinito del sistema

Eseguire i comandi seguenti per rendere persistenti le impostazioni:

```Bash
sudo chmod 664 /var/lib/alsa/asound.state
sudo alsactl store
```

### Macchina virtuale Ubuntu

1. Rumore durante la registrazione

Soluzione: cambiare la compatibilità del controller USB a 3.0 o 3.1

# RDK x3&x5

## Verificare il numero di dispositivo

Verificare che la scheda audio esista e quale sia il numero di dispositivo.

Con `cat /proc/asound/cards` verificare se la scheda audio è registrata:

```Shell
0 [duplexaudio    ]: simple-card - duplex-audio
                      duplex-audio
```

Con `cat /proc/asound/devices` verificare i dispositivi logici:

```Shell
root@ubuntu:~# cat /proc/asound/devices
  2: [ 0- 0]: digital audio playback
  3: [ 0- 0]: digital audio capture
  4: [ 0]   : control
 33:        : timer
```

Con `ls /dev/snd/` verificare i file di dispositivo reali nello spazio utente:

```Shell
root@ubuntu:~# ls /dev/snd/
by-path/   controlC0  pcmC0D0c   pcmC0D0p   timer
```

Da queste verifiche si conferma: la scheda audio 0 è quella integrata; i dispositivi esistono e il numero è `0-0`. I dispositivi effettivamente operati sono `pcmC0D0p` e `pcmC0D0c`.

## Registrare 5 secondi di audio per testare

`arecord -D plughw:0,0 -f S16_LE -r 16000 -d 5 -t wav test.wav`

Qui `plughw:0,0` significa `card 0, device 0`, cioè la nostra scheda audio USB. `plughw` fornisce la conversione automatica del formato e fa da ponte tra diversi formati di dati e hardware. Altri parametri di arecord:

|Comando|Significato|Significato in questo comando|
|---|---|---|
|-D|Selezionare il nome del dispositivo|Usare la scheda audio USB esterna "plughw:1.0"|
|-f|Formato di registrazione|S16_LE = intero con segno a 16 bit in little-endian|
|-r|Frequenza di campionamento|16000 = campionamento a 16 kHz|
|-d|Durata di registrazione|Registra 5 secondi|
|-t|Formato di registrazione|Formato wav|
|test.wav|Nome file (può contenere percorso)|Il file si chiama test.wav|

Se il suono è troppo basso, eseguire `alsamixer` e premere `F6` per selezionare la scheda audio USB:

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/2.png)

Poi premere `F5` per mostrare i dispositivi di registrazione e riproduzione. Alzare il volume di registrazione con la freccia su. PCM è riproduzione, CAPTURE MIC è registrazione:

![](../../../public/images/tutorials/accessories/usb-audio-card-tutorial/3.png)

Infine, riprodurre con il comando `aplay`:

`aplay -D plughw:0,0 -f S16_LE -r 16000 -c 1 test.wav`

Spiegazione dei parametri:

- -D plughw:0,0: specifica il dispositivo di registrazione. plughw:0,0 = primo dispositivo della prima scheda audio.

- -f S16_LE: imposta il formato del file audio. S16_LE = intero con segno a 16 bit in little-endian (Signed 16-bit Little Endian), un formato dati audio comune; "little-endian" significa che il byte meno significativo è memorizzato all'indirizzo più basso della memoria.

- -r 16000: imposta la frequenza di campionamento.

- -c 1: imposta il numero di canali.

- -d 5: imposta la durata di registrazione in secondi.

## Domande frequenti

### Come distinguere la scheda audio USB da quella integrata su una board RDK?

### Come far coesistere la sub-scheda audio della serie RDK X3 con la scheda audio USB e usarle contemporaneamente?

### Come abilitare le funzioni audio del RDKS100 tramite interfaccia grafica?

Vedere [Elaborazione e applicazione multimediale RDK](https://developer.d-robotics.cc/rdk_doc/FAQ/multimedia#usb-%E5%A3%B0%E5%8D%A1%E5%92%8C%E6%9D%BF%E8%BD%BD%E5%A3%B0%E5%8D%A1%E5%A6%82%E4%BD%95%E5%8C%BA%E5%88%86%E4%BD%BF%E7%94%A8)

# Verificare il driver audio di base

Che la scheda audio USB senza driver funzioni dipende **essenzialmente dal kernel**

- È abilitato il supporto USB Audio Class (cioè `CONFIG_USB_AUDIO`)?

- È caricato il modulo kernel corrispondente (ad esempio `snd-usb-audio`)?

Se il kernel lo supporta, è sufficiente installare gli strumenti audio di base; se il kernel è ridotto, va ricompilato per abilitare il driver.

**Passo 1: verificare che il kernel supporti snd_usb_audio**

```Plain Text
# Metodo 1: verificare se il modulo driver è caricato
lsmod | grep snd_usb_audio

# Metodo 2: verificare se il modulo è integrato nel kernel (anche se non caricato)
modinfo snd_usb_audio  # con output = kernel supportato; senza output = modulo non compilato nel kernel
```

**Se `modinfo` non produce output**: il kernel del sistema ha rimosso questo driver; ricompilare il kernel e abilitare in `.config`:

```Plain Text
CONFIG_SND_USB_AUDIO=m  # compilato come modulo, oppure =y integrato nel kernel
CONFIG_SND_USB_UA101=y
CONFIG_SND_USB_CAIAQ=y
```

**Se `modinfo` produce output**: caricare direttamente il modulo:

```Bash
sudo modprobe snd_usb_audio
```

#### Passo 2: installare gli strumenti audio di base (assenti di default nella versione ridotta)

I sistemi ridotti di solito non hanno `alsa-utils`; vanno installati manualmente:

```Bash
# Sistemi Ubuntu/Debian
sudo apt update && sudo apt install -y alsa-utils usbutils

# Senza rete: scaricare il pacchetto offline di alsa-utils e installarlo con dpkg -i
```

#### Passo 3: verificare il riconoscimento e il funzionamento della scheda audio USB

1. Inserire la scheda audio USB e verificare il riconoscimento:

```Bash
# Vedere l'enumerazione USB
lsusb | grep -i audio

# Elencare i dispositivi audio
aplay -l
```

Se nell'output compare una voce `card X` relativa a `USB Audio`, il riconoscimento è riuscito.

2. Testare l'uscita audio (altoparlanti/cuffie collegati):

```Bash
# Riproduce un tono di test; -D specifica la scheda audio USB (X = numero card da aplay -l)
speaker-test -c 2 -D plughw:X,0
```

#### Passo 4: (facoltativo) installare un servizio audio (per desktop / riproduzione in background)

Per riprodurre in background o con ambiente desktop, nelle versioni ridotte serve un servizio audio aggiuntivo:

```Bash
# Servizio leggero (consigliato, funziona anche senza desktop)
sudo apt install -y pulseaudio

# oppure PipeWire (consigliato su Ubuntu 22.04+)
sudo apt install -y pipewire pipewire-alsa
```

### Problemi comuni dei sistemi ridotti e soluzioni

**1. Permessi insufficienti: l'utente normale non può accedere alla scheda audio**

Soluzione: aggiungere l'utente al gruppo `audio`, effettivo dopo il riavvio:

```Bash
sudo usermod -aG audio $USER
```

2.**Nessun suono, ma il dispositivo è riconosciuto correttamente**

Soluzione: alzare il volume con `alsamixer` e togliere il mute (tasto **M**):

```Bash
alsamixer -c X  # X = numero card della scheda audio USB
```

3.**Kernel troppo vecchio per le schede audio USB moderne – due casi**

```Bash
sudo apt install -y linux-generic && sudo reboot
```

```Bash
sudo modprobe snd-hda-intel model=generic #(provare valori diversi a seconda del modello)
# Creare il file di configurazione del driver
sudo echo "options snd-hda-intel model=generic" > /etc/modprobe.d/sound.conf
sudo reboot
```


---

## Repository ufficiale

Repository open source della scheda audio USB senza driver JUXI: [GitHub](https://github.com/Juxi-Technology/Driver-Free-Sound-Card)

Plug-and-play, compatibile con Raspberry Pi, Jetson, PC, ecc. Nessun driver aggiuntivo: il sistema la riconosce automaticamente come dispositivo di ingresso/uscita audio.
