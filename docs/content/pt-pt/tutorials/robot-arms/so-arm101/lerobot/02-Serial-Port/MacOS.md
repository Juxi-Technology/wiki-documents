---
title: "Etapa 2: Ver a porta do dispositivo série (macOS)"
description: "Como ver as portas série no macOS, conceder permissões às portas e compreender por que motivo cada braço aparece com duas portas."
---

# Etapa 2: Ver a porta do dispositivo série (macOS)

## Ver as portas

```Shell
ls /dev/tty.*
```

O efeito é semelhante à figura abaixo; pode usar qualquer uma das duas portas

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-MacOS/1.png)

## Dar permissões às portas

Permitir que todos os utilizadores tenham permissão de leitura e escrita nestes dispositivos de porta série

```Shell
chmod 666 /dev/tty.*
```

## Registar as minhas portas

Braço seguidor：

/dev/tty.usbmodem5AAF2193061

/dev/tty.wchusbserial5AAF2193061

Braço líder：

/dev/tty.usbmodem5AAF2194741

/dev/tty.wchusbserial5AAF2194741

## Porque existem duas portas no Mac?

O painel de controlo de servos que usamos é **reconhecido ao mesmo tempo como dois tipos diferentes de controlador de porta série** no sistema Mac, por isso são mostradas duas portas:

- Uma é o controlador de porta série genérico predefinido do sistema (`/dev/tty.usbmodemxxxx`)

- A outra é o controlador de porta série dedicado fornecido pelo fabricante do chip (por exemplo, aqui "wch" corresponde ao chip CH340/CH341 da Nanjing Qinheng) (`/dev/tty.wchusbserialxxxx`)

Isto é um fenómeno normal, **as duas portas correspondem na verdade ao mesmo dispositivo de hardware**; pode escolher qualquer uma delas para ligar e comunicar (por exemplo, ao escolher uma das portas no software de controlo do braço robótico).

Se uma porta der erro em operações posteriores, pode experimentar a outra porta.

<RelatedProducts slugs="so-arm101" />
