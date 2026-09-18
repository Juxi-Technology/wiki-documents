---
title: "Etapa 2: Ver a porta do dispositivo serial (macOS)"
description: "No macOS, liste as portas seriais disponíveis, conceda permissões de leitura e escrita e entenda por que cada braço aparece com dois drivers diferentes."
---

# Etapa 2: Ver a porta do dispositivo serial (macOS)

## Ver as portas

```Shell
ls /dev/tty.*
```

O resultado é semelhante à figura abaixo; você pode usar qualquer uma das duas portas

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-MacOS/1.png)

## Conceder permissões à porta

Permitir que todos os usuários tenham permissão de leitura e escrita nesses dispositivos de porta serial

```Shell
chmod 666 /dev/tty.*
```

## Anotar as minhas portas

Braço seguidor:

/dev/tty.usbmodem5AAF2193061

/dev/tty.wchusbserial5AAF2193061

Braço líder:

/dev/tty.usbmodem5AAF2194741

/dev/tty.wchusbserial5AAF2194741

## Por que existem duas portas no Mac?

A placa controladora de servos que usamos é **reconhecida simultaneamente como dois tipos diferentes de driver de porta serial** no sistema Mac, por isso duas portas são exibidas:

- Uma é o driver de porta serial genérico padrão do sistema (`/dev/tty.usbmodemxxxx`)

- A outra é o driver de porta serial dedicado fornecido pelo fabricante do chip (por exemplo, aqui o “wch” corresponde ao chip CH340/CH341 da Nanjing Qinheng) (`/dev/tty.wchusbserialxxxx`)

Isto é um fenômeno normal, **as duas portas na verdade correspondem ao mesmo dispositivo de hardware**, e escolher qualquer uma delas permite conectar e comunicar (por exemplo, basta selecionar uma das portas no software que controla o braço robótico).

Se ocorrer um erro ao operar uma das portas mais adiante, tente trocar para a outra porta.

<RelatedProducts slugs="so-arm101" />
