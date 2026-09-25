---
title: "Computer Mac"
description: "Su Mac elencare le porte seriali disponibili, capire perché ne compaiono due per ogni scheda e concedere i permessi di lettura e scrittura."
---

# Computer Mac

## Visualizzare le porte

```Shell
ls /dev/tty.*
```

Il risultato è simile a quello dell'immagine sottostante; è possibile utilizzare una qualsiasi delle due porte

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-MacOS/1.png)

## Concedere le autorizzazioni alle porte

Consentire a tutti gli utenti di leggere e scrivere su questi dispositivi seriali

```Shell
chmod 666 /dev/tty.*
```

## Annotare le mie porte

Braccio passivo:

/dev/tty\.usbmodem5AAF2193061

/dev/tty\.wchusbserial5AAF2193061

Braccio attivo:

/dev/tty\.usbmodem5AAF2194741

/dev/tty\.wchusbserial5AAF2194741

## Perché su Mac compaiono due porte?

La scheda di controllo dei servomotori che utilizziamo viene riconosciuta nel sistema Mac **contemporaneamente come due diversi tipi di driver seriale**, per questo vengono mostrate due porte:

- una è il driver seriale generico predefinito del sistema (`/dev/tty.usbmodemxxxx`)

- l'altra è il driver seriale dedicato fornito dal produttore del chip (ad esempio, qui "wch" corrisponde al chip CH340/CH341 di Nanjing Qinheng) (`/dev/tty.wchusbserialxxxx`)

Si tratta di un fenomeno normale: **le due porte in realtà corrispondono allo stesso dispositivo hardware**, e scegliendone una qualsiasi è possibile collegarsi e comunicare (ad esempio, nel software di controllo del braccio robotico è sufficiente selezionare una delle due porte).

Se in un'operazione successiva una delle porte restituisce un errore, è possibile provare a passare all'altra porta.





