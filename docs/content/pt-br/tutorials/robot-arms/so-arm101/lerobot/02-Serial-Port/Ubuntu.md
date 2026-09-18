---
title: "Etapa 2: Ver a porta do dispositivo serial (Ubuntu)"
description: "No Ubuntu, descubra as portas seriais dos braços líder e seguidor pela linha de comando e com a ferramenta oficial do LeRobot, e conceda permissões de acesso."
---

# Etapa 2: Ver a porta do dispositivo serial (Ubuntu)

## Método 1: visualizar diretamente pela linha de comando do Linux

### Ver a porta do dispositivo serial

```Shell
ls /dev/ttyACM*
```

### Conectar a porta USB do computador e do braço robótico

Primeiro conecte o braço seguidor Follower, depois conecte o braço líder Leader

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/1.png)

## Método 2: ferramenta oficial do LeRobot

```Shell
lerobot-find-port
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/3.png)

## Anotar as minhas portas

`/dev/ttyACM0` é o número da porta do dispositivo serial do braço seguidor Follower

`/dev/ttyACM1` é o número da porta do dispositivo serial do braço líder Leader

## Conceder permissões à porta

Permitir que todos os usuários tenham permissão de leitura e escrita nesses dispositivos de porta serial

```Shell
sudo chmod 666 /dev/ttyACM*
```

<RelatedProducts slugs="so-arm101" />
