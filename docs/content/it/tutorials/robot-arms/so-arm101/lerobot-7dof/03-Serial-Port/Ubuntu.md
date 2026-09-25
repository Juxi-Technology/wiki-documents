---
title: "Ubuntu"
description: "Su Ubuntu individuare le porte seriali con la riga di comando o con lo strumento ufficiale, riconoscere i bracci follower e leader e concedere i permessi."
---

# Ubuntu

# Metodo 1: visualizzazione diretta dalla riga di comando di Linux

## Visualizzare la porta del dispositivo seriale

```Shell
ls /dev/ttyACM*
```

## Collegare la porta USB del computer e del braccio robotico

Collega prima il braccio passivo Follower, poi collega il braccio attivo Leader

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/1.png)

# Metodo 2: strumento ufficiale LeRobot

```Shell
lerobot-find-port
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/2.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/3.png)

# Annotare le mie porte

`/dev/ttyACM0` è la porta del dispositivo seriale del braccio passivo Follower

`/dev/ttyACM1` è la porta del dispositivo seriale del braccio attivo Leader

# Concedere le autorizzazioni alle porte

Consentire a tutti gli utenti di leggere e scrivere su questi dispositivi seriali

```Shell
sudo chmod 666 /dev/ttyACM*
```











































