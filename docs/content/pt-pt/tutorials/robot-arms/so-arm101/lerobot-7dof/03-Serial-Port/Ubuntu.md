---
title: "Ubuntu"
description: "Métodos para ver a porta série de cada braço no Ubuntu, com a ligação USB pela ordem correta, o registo dos números e as permissões de acesso."
---

# Ubuntu

# Método 1: consulta direta na linha de comandos do Linux

## Ver a porta do dispositivo série

```Shell
ls /dev/ttyACM*
```

## Ligar a porta USB do computador e do braço robótico

Ligue primeiro o braço seguidor Follower e depois continue a ligar o braço líder Leader

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/1.png)

# Método 2: ferramenta oficial do Lerobot

```Shell
lerobot-find-port
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/2.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/3.png)

# Registar as minhas portas

`/dev/ttyACM0` é a porta do dispositivo série do braço seguidor Follower

`/dev/ttyACM1` é a porta do dispositivo série do braço líder Leader

# Dar permissões às portas

Permitir que todos os utilizadores tenham permissão de leitura e escrita nestes dispositivos de porta série

```Shell
sudo chmod 666 /dev/ttyACM*
```


