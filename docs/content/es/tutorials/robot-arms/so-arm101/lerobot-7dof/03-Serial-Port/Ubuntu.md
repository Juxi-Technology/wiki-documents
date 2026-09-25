---
title: "Ubuntu"
description: "Consulta el número de puerto serie del brazo seguidor y del brazo líder en Ubuntu, con la línea de comandos de Linux o la herramienta oficial de LeRobot."
---

# Ubuntu

# Método 1: verlo directamente desde la línea de comandos de Linux

## Ver el puerto del dispositivo de puerto serie

```Shell
ls /dev/ttyACM*
```

## Conectar el puerto USB de la computadora y el brazo robótico

Primero conecta el brazo seguidor Follower, y luego conecta el brazo líder Leader

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/1.png)

# Método 2: herramienta oficial de Lerobot

```Shell
lerobot-find-port
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/2.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-02-Serial-Port-Ubuntu/3.png)

# Registrar mis puertos

`/dev/ttyACM0` es el número de puerto del dispositivo de puerto serie del brazo seguidor Follower

`/dev/ttyACM1` es el número de puerto del dispositivo de puerto serie del brazo líder Leader

# Otorgar permisos al puerto

Permitir que todos los usuarios tengan permiso de lectura y escritura en estos dispositivos de puerto serie

```Shell
sudo chmod 666 /dev/ttyACM*
```











































