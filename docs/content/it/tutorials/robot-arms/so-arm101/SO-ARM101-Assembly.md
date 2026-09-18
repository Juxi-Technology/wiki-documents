---
title: Guida di montaggio del braccio robotico Lerobot
description: "Montaggio del braccio LeRobot SO-ARM101: impostazione degli ID e calibrazione dei servo, assemblaggio e alimentatori Pro (leader 5V6A, follower 12V5A)."
---

# Guida di montaggio del braccio robotico Lerobot

Nota: se il braccio robotico è già assemblato, salta questo tutorial

## Componenti stampati in 3D del braccio follower

![IMG_20251229_141748.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/1.jpg)

## Componenti stampati in 3D del braccio leader

![IMG_20251229_141533.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/2.jpg)

Il braccio leader e il braccio follower sono molto simili; differiscono solo all'estremità

Il braccio leader ha un'impugnatura e un grilletto, il braccio follower ha una pinza

## Rimuovere i supporti residui dai componenti stampati in 3D

Controlla ogni foro, apertura, scanalatura e griglia, in particolare i cinque fori simili ai "cinque cerchi" del mahjong

Questo passaggio è molto importante, altrimenti in seguito non sarà possibile avvitare le viti

## Distinzione dei quattro tipi di servomotori

|Modello grande|Modello piccolo|Tensione (V)|Rapporto di riduzione|Articolazione del braccio|Quantità|
|---|---|---|---|---|---|
|STS-3215|C001|7.4|1:345|Braccio leader 2|1|
||C044|7.4|1:191|Braccio leader 1, 3|2|
||C046|7.4|1:147|Braccio leader 4, 5, 6|3|
||C047|12|1:345|Tutte le articolazioni del braccio follower|6|

> Il rapporto di riduzione è il rapporto tra "velocità del motore : velocità dell'albero di uscita del servomotore"; ad esempio 1:345 significa che il motore compie 345 giri perché l'albero di uscita del servomotore compia 1 giro.
> 
> Un rapporto di riduzione elevato amplifica la coppia tramite il gruppo di ingranaggi, quindi consente di azionare carichi più pesanti (ad esempio il braccio follower)
> 
> Allo stesso tempo, però, la velocità di rotazione dell'albero di uscita sarà più bassa (perché è stata "ridotta")
> 
> Se si trascina un'articolazione, sarà più faticoso
> 
> 

Di seguito sono riportati i modelli e i rapporti di riduzione di tutti i servomotori di questo progetto; le sottolineature sono i loro numeri

![12月30日(7).png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/3.jpg)

![IMG_20260108_145707.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/4.jpg)

## Distinguere i due tipi di alimentatori in base alla tensione

Alimentatore da 5V 6A 30W: alimenta i servomotori da 7.4V (braccio leader), nero

Alimentatore da 12V 5A 60W: alimenta i servomotori da 12V (braccio follower), bianco

## Scaricare lo strumento di debug per servomotori Feetech

### Computer Windows

https://gitee.com/ftservo/fddebug

Scarica [`FD1.9.8.5(250729).7z`](https://gitee.com/ftservo/fddebug/blob/master/FD1.9.8.5(250729).7z), estrailo ed esegui il programma exe contenuto all'interno

### Computer Ubuntu e computer Mac (l'archivio compresso include il tutorial)

[Juxi_ServoController.zip](/downloads/Juxi_ServoController.zip)

![Lerobot 101机械臂.jpg](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/5.jpg)

**Versione Pro: il braccio leader utilizza un alimentatore da 5V6A, il braccio follower utilizza un alimentatore da 12V5A**

L'impostazione degli ID dei servomotori e la calibrazione degli angoli dei servomotori, nonché l'assemblaggio, devono essere completati in anticipo; puoi fare riferimento al [tutorial di assemblaggio ufficiale](https://huggingface.co/docs/lerobot/so101)

## Passo 1: impostare gli ID dei servomotori e installare i dischi dei servi (tranne il servomotore n. 5)

![image.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/6.png)

![image.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/7.png)

1. Apri lo strumento di debug host Feetech, seleziona il numero di porta COM, imposta il baud rate su un milione e fai clic su "Apri"

2. Fai clic su "Cerca"; dopo che appare "STS3215", fai clic su "Stop" e poi su "STS3215"

3. Seleziona "Debug" in alto: puoi trascinare il cursore per far ruotare il servomotore, oppure fare clic su "Scansione" per far muovere il servomotore avanti e indietro. Verifica che il servomotore funzioni correttamente

4. Seleziona "Programmazione" in alto

5. Fai clic su "Calibrazione centrale" per impostare la posizione attuale dell'albero rotante del servomotore come posizione centrale (0-4095)

6. Fai clic su "ID", imposta nell'angolo in basso a destra il numero ID del servomotore corrispondente e fai clic su "Salva". Nota che il numero è composto solo da cifre arabe, senza lettere.

7. Scollega il cavo che collega il servomotore alla scheda di controllo

8. Inserisci il cavo del servomotore nel servomotore

Il servomotore n. 1 va collegato con due cavi; per gli altri servomotori, per ora inserisci un solo cavo

![截图_20260115151626.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/8.png)

Ancora una volta: assicurati che gli ID delle articolazioni dei servomotori e i rapporti di ingranaggio corrispondano rigorosamente a quelli del **SO-ARM101**.

Ogni motore sul bus ha un ID univoco. I nuovi motori di solito hanno un ID predefinito `1`. Per garantire una comunicazione corretta tra i motori e il controller, dobbiamo innanzitutto impostare un ID univoco per ogni motore. Inoltre, la velocità di trasmissione dei dati sul bus è determinata dal baud rate. Per poter comunicare tra loro, il controller e tutti i motori devono essere configurati con lo stesso baud rate; il baud rate dei servomotori di questo braccio robotico è 100000.

A tal fine, dobbiamo innanzitutto collegare il controller a ciascun motore separatamente per procedere alla configurazione. Poiché scriveremo questi parametri nell'area non volatile della memoria interna del motore (EEPROM), sarà sufficiente eseguire l'operazione una sola volta.

Se desideri riutilizzare i motori di un altro robot, potrebbe essere necessario eseguire nuovamente questo passaggio, poiché l'ID e il baud rate potrebbero non corrispondere.

Il video seguente mostra la sequenza dei passaggi per impostare l'ID dei motori.

### Sistema Windows

[Software host per servomotori Feetech.zip](/downloads/飞特舵机上位机.zip)

Utilizza il software host per servomotori Feetech per impostare gli ID dei servomotori e calibrare la posizione centrale; l'impostazione degli ID va da 1 a 6!

**Impostazione ID dei servomotori del braccio robotico-Sistema Windows.mp4**（机械臂舵机设置ID-Windows系统.mp4，体积超过站点单文件上限，可向 support@juxitech.com 索取）

### Sistema Linux/Ubuntu e computer Mac

Se hai bisogno del software host per servomotori Feetech, puoi fare riferimento allo [strumento di debug per servomotori Feetech](https://juxitech.feishu.cn/wiki/HllBwhjJ1iayMdkUTGgcyKbgn8g#share-Jvk1dRRl8oY0Skxrt2VczA9jnNb) qui sopra

Completa prima la distribuzione dell'ambiente seguendo la pagina [Installazione ufficiale dell'ambiente LeRobot](https://huggingface.co/docs/lerobot/installation)

Nota: attiva l'ambiente virtuale ed entra nella directory src/lerobot corrispondente

conda activate lerobot

cd lerobot/src/lerobot

1、Individua la porta USB corrispondente al braccio robotico. Per trovare la porta corretta di ciascun braccio robotico, esegui lo script di utilità due volte:

```Plain Text
lerobot-find-port
```

Esempio di output durante l'identificazione della porta del braccio Leader (ad esempio, su Mac `/dev/tty.usbmodem575E0031751`, oppure su Linux potrebbe essere `/dev/ttyACM0`):

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM1
Reconnect the USB cable.
```

Esempio di output durante l'identificazione della porta del braccio Follower (ad esempio, `/dev/tty.usbmodem575E0032081`, oppure su Linux potrebbe essere `/dev/ttyACM1`):

```PowerShell
Finding all available ports for the MotorBus.
['/dev/ttyACM0', '/dev/ttyACM1']
Remove the usb cable from your MotorsBus and press Enter when done.

[...Disconnect corresponding leader or follower arm and press Enter...]

The port of this MotorsBus is /dev/ttyACM0
Reconnect the USB cable.
```

Ricorda di scollegare il connettore USB, altrimenti l'interfaccia non verrà rilevata.

2、Collega il computer alla scheda driver dei servomotori del braccio follower con un cavo dati USB e alimenta il sistema. Poi esegui il seguente comando. Modifica `--robot.port=/dev/ttyACM0` nel comando con il numero di porta trovato. Se la porta trovata è /dev/ttyACM1, modificala in `--robot.port=/dev/ttyACM1`

```Python
lerobot-setup-motors \
    --robot.type=so101_follower \
    --robot.port=/dev/ttyACM0
```

Vedrai il seguente output.

```Python
Connect the controller board to the 'gripper' motor only and press enter.
```

Seguendo le indicazioni, collega il servomotore della pinza. Assicurati che sia l'unico servomotore collegato alla scheda driver e che non sia ancora collegato a nessun altro servomotore. Dopo aver premuto il tasto **[Enter]**, lo script imposterà automaticamente l'ID e il baud rate di quel servomotore; l'impostazione degli ID va da 6 a 1!

In seguito dovresti vedere le seguenti informazioni:

```Python
'gripper' motor id set to 6
```

Poi il successivo output è:

```Python
Connect the controller board to the 'wrist_roll' motor only and press enter.
```

**Nota** Seguendo le indicazioni, ripeti l'operazione precedente per ogni servomotore.

Come per i servomotori precedenti, assicurati che sia l'unico servomotore collegato alla scheda driver e che il servomotore stesso non sia collegato a nessun altro servomotore.

Prima di premere il tasto **Enter** ogni volta, assicurati di controllare i collegamenti dei cavi. Ad esempio, mentre si opera sulla scheda, il cavo di alimentazione potrebbe staccarsi.

Una volta completati tutti i passaggi, lo script terminerà automaticamente e i servomotori saranno pronti all'uso. Ora puoi collegare in sequenza i connettori a 3 pin di ogni servomotore e collegare il cavo del primo servomotore (il servomotore "shoulder pan" con ID 1) alla scheda driver. Ora puoi installare la scheda driver sulla base del braccio robotico.

Ripeti gli stessi passaggi per il braccio leader.

```Python
lerobot-setup-motors \
    --teleop.type=so101_leader \
    --teleop.port=/dev/ttyACM0
```

**Impostazione ID dei servomotori del braccio robotico-Sistema Linux.mp4**（机械臂舵机设置ID-Linux系统.mp4，体积超过站点单文件上限，可向 support@juxitech.com 索取）

## Passo 2: assemblaggio

- I passaggi di assemblaggio del braccio follower sono sostanzialmente identici a quelli del braccio leader. L'unica differenza è che dopo il passaggio 12 il modo di installare l'effettore finale (pinza e impugnatura) è diverso.

**SO-ARM101 Tutorial di assemblaggio del braccio robotico.mp4**（SO-ARM101机械臂组装教程.mp4，体积超过站点单文件上限，可向 support@juxitech.com 索取）

Installazione della scheda driver dei servomotori: installa prima i 4 distanziali in rame, poi fissa la scheda driver con quattro viti M2.5*8

![1768467962506.webp](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/9.webp)

![1768467970234.webp](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/10.webp)

![截图_20260115170850.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/11.png)

**Versione Pro: il braccio leader nero utilizza un alimentatore da 5V6A, il braccio follower bianco utilizza un alimentatore da 12V5A**

## Impostazione degli ID dei servomotori e calibrazione centrale tramite interfaccia web

https://bambot.org/feetech.js?lang=zh

1、In base al modello del servomotore, inserisci 0 o 1 e fai clic su "Connetti"

![截图_20260413125622.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/12.png)

2、Scansiona i servomotori con ID 1~6; puoi confermare il servomotore con l'ID corrispondente in base al FOUND presente nel risultato della scansione. Ad esempio, nell'immagine il servomotore con ID 1 è stato scansionato

![截图_20260413125712.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/13.png)

3、Impostazione dell'ID e calibrazione centrale

①Imposta l'ID del servomotore attuale come l'ID del servomotore scansionato

②In "Gestione ID" inserisci un numero e fai clic su "Cambia ID" per impostare l'ID

③Calibrazione centrale (la posizione centrale del servomotore STS3215 è 2047, quella del servomotore SCS0009 è 511)

Servomotore STS: inserisci 2047 in "Controllo posizione" e fai clic su "Set"

Servomotore SCS: inserisci 511 in "Controllo posizione" e fai clic su "Set"

![截图_20260413125748.png](../../../../../public/images/tutorials/robot-arms/so-arm101/SO-ARM101-Assembly/14.png)
