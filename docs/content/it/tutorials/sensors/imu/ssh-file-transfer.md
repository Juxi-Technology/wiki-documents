---
title: "Trasferimento di file tramite SSH"
description: "Trasferimento file SSH per il modulo IMU: installa il software di accesso remoto, collega la scheda via SSH e trasferisci file tra PC e dispositivo."
---

# Trasferimento di file tramite SSH

## 1. Installazione del programma WInSCP

Software di accesso remoto.zip

Scaricare e decomprimere, fare doppio clic per aprire il programma e iniziare l'installazione, fare clic su Accept per accettare il contratto, quindi seguire le indicazioni per installare.

![Immagine 1](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/1.png)

![Immagine 2](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/2.png)

![Immagine 3](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/3.png)

Fare clic su Finish per completare l'installazione.

![Immagine 4](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/4.png)

Si può notare che sul desktop è comparsa un'icona di WinSCP

![Immagine 5](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/5.png)

## 2. Trasferimento remoto di file tramite SSH

Dopo aver aperto il software WinSCP compare la seguente schermata di accesso.

File protocol: selezionare SFTP come protocollo di file; Host name: indirizzo IP; Port number: il valore predefinito 22 è sufficiente; User name: nome utente; Password: password di accesso.

Dopo aver inserito i dati corretti si può fare clic su Save per salvare le informazioni inserite, così da non doverle reinserire al prossimo accesso.

![Immagine 6](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/6.png)

Dopo aver fatto clic su Login e aver effettuato l'accesso correttamente, verrà mostrata la seguente schermata: a sinistra la cartella del computer Windows, a destra la cartella del nano.

![Immagine 7](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/7.png)

Il trasferimento di file prevede tre modalità operative: la prima consiste nel trascinare direttamente il file da sinistra a destra, oppure da destra a sinistra, e il sistema copierà automaticamente una copia del file trasferendola.

La seconda consiste nel selezionare il file con il mouse e premere una volta il tasto F5; il file selezionato verrà copiato sull'altro lato.

La terza consiste nel selezionare il file e fare clic con il tasto destro del mouse; se si trasferisce dal computer Windows al nano, fare clic su upload,

![Immagine 8](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/8.png)

Comparirà un avviso; si può scegliere di non mostrarlo più e fare clic su OK, così il file verrà trasferito automaticamente.

![Immagine 9](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/9.png)

Se si trasferisce un file dal nano al computer Windows, fare clic con il tasto destro selezionando il file e scegliere Download

![Immagine 10](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/10.png)

Nota: il trasferimento di file richiede che il computer e la scheda siano nella stessa rete locale e che la Raspberry Pi abbia il servizio SSH abilitato. Talvolta, se il trasferimento di file non riesce, di norma è perché i permessi della scheda non sono sufficienti; è sufficiente concedere i permessi più elevati.

```Plain Text
chmod 777 目录名 
```



