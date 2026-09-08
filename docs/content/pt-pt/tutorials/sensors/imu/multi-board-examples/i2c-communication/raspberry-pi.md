---
title: Raspberry Pi 5
description: "Este tutorial usa a placa-mãe Raspberry Pi 5 e a imagem oficial de 64 bits como exemplo."
---

# Raspberry Pi 5

## 1. Conectar o dispositivo

Este tutorial usa a placa-mãe Raspberry Pi 5 e a imagem oficial de 64 bits como exemplo. 

Conecte o sensor de atitude IMU à interface I2C do Raspberry Pi 5 conforme mostrado na figura abaixo. 

![1. Connect the device – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NDYxMGQyZWEyNmY4MzYyMDcwNjhhZDI1Mjg3OTAzMWVfNzNlZWYyNjg0OWE4MjkyMTJkYjk2ZDMwMmNlY2VlMzFfSUQ6NzYzODkzMTU2MTM2MjE0ODI4OF8xNzgwMzE4NTk1OjE3ODA0MDQ5OTVfVjM)

![1. Connect the device – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjNlNDJkMjY5YjkxNDY3Y2IyMDk3N2E3Mzk4YTViZTFfZTQ5ODI2OWY0OGY0NTEzMjlmMzBiYjE0MDJlMjk5OTRfSUQ6NzYzODkzMTU2MDAxMTkyNjQ5OV8xNzgwMzE4NTk1OjE3ODA0MDQ5OTVfVjM)

## 2. Verificar o status do dispositivo

Primeiro, instale o I2Ctool e depois digite o seguinte no terminal: 

```PowerShell
sudo apt-get update
sudo apt-get install -y i2c-tools
```

Visualizar Dispositivos I2C 

```PowerShell
sudo i2cdetect -y -r -a 1
```

![2. Check device status – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NjcwZDgyNmJmZDEwNmNmNjhiZTIzNGVmMGZkNzYyYmJfNmRlNTBjOGZlMWI3ODBmMDljZTY4Y2QyMzNhNDZhZDRfSUQ6NzYzODkzMTU1OTU4ODIzNjIzM18xNzgwMzE4NTk1OjE3ODA0MDQ5OTVfVjM)

## 3. Instalar a biblioteca do driver

3.1** Instalar as bibliotecas Python necessárias para o código**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 Transferir Arquivos

[IMU_ROS2.zip]

Amigos que ainda não estão familiarizados com o uso do MobaXterm para transferir ficheiros, consultem a página a seguir para obter instruções detalhadas de instalação e operação do MobaXterm:[文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

Arraste os ficheiros descompactados para o Raspberry Pi 5 por meio do software MobaXterm. 

![3. Install the driver library – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTkxMzZhNTNmZTI5MWE2Y2FkNzQzZTI4MTQ4OWMwMTlfNTMyY2MxNDE0MDQ3MWJmMDhkMzIxMGJmYTJhMGEzMDFfSUQ6NzYzODkzMTU1ODYxNTQxOTg1NF8xNzgwMzE4NTk1OjE3ODA0MDQ5OTVfVjM)

## 4. Visualizar os dados do IMU

**Entre no diretório ~/IMU_Library e execute o ficheiro IMU_Serial_Library.py**

```PowerShell
cd ~/imu_ros2/src/IMU_ROS1/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![4. View IMU data – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NjM1OTBlMTM4Yzg4MDFhNmM2NjcxNWI1MWQ4NGY5OGJfN2Y2NjkxODUzNjYxNmNlYWYzOTMwM2RmZDIwNTlhY2RfSUQ6NzYzODkzMTU1ODQ3MzA0MjkyMV8xNzgwMzE4NTk1OjE3ODA0MDQ5OTVfVjM)

Observação: O acima é a leitura de dados de um IMU de 10 eixos. O de 6 eixos não possui dados de magnetômetro e barômetro, e o de 9 eixos não possui dados de barômetro.

## **5. Calibração do IMU**

**Entre no diretório ~/IMU_Library e execute o ficheiro imu_calibration_tool.py**

```PowerShell
cd ~/IMU_Library

# 运行 IMU 校准代码文件 --I2C通讯校准
# 执行所有校准（整体、磁力计、温度）
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 1

# 仅整体校准
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate imu

# 仅磁力计校准
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate mag

# 仅温度校准
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 1 --calibrate temp
```

![5. IMU Calibration – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTQxNzA1YjY0N2FkYTdiOWM2ZDI5ODU2YjIyZjQ2N2JfMzBhYWY2NGU1M2M2NDViMjg5OGFkMDI5MzgzNmQ5YzFfSUQ6NzYzODkzMTU1NzU3NjUxMDQxMV8xNzgwMzE4NTk1OjE3ODA0MDQ5OTVfVjM)

## 6. Precauções

O Raspberry Pi 5 precisa habilitar o pino i2c antecipadamente. 

O procedimento de habilitação é o seguinte: 

Executar o comando no terminal

```PowerShell
sudo raspi-config
```

Selecione a usar as setas do teclado e pressione a tecla Enter para entrar após a seleção

![6. Precautions – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTU4ZGFjMTllY2U1MGNlZGM3ZjY1MzQzOGJkYTA5MTVfN2MyYmM3ZDhiM2I5ZmNiOWE4NWQ5ZTM2MDFiYjQ1ZGZfSUQ6NzYzODkzMTU1ODE5NjYyODQ1MV8xNzgwMzE4NTk1OjE3ODA0MDQ5OTVfVjM)

Selecione I2C e, após a seleção, pressione a tecla Enter para entrar.

![6. Precautions – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ODUwZDY4OTRlYTIxOTk4NjA1OGE5YzdiYjU4ZmE3MDZfMjBiZDk2ZjM3ZWVkMzNjNThmMDVmZGUyMDQxYzk4MTRfSUQ6NzYzODkzMTU1ODgyMTA1NTQ1Nl8xNzgwMzE4NTk1OjE3ODA0MDQ5OTVfVjM)

Após selecionar I2C, pressione a tecla Enter no teclado, use as setas para selecionar Yes e pressione Enter para confirmar. 

![6. Precautions – 3](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NjZhNWQxMjVjMWU2MjZhZTgzOTM4ZDM5ZWFkMGUwNmFfZTg3M2Q1ZTRiZWYzYTE4Yzk0ZTdjZGQzMTlmYjdlYjBfSUQ6NzYzODkzMTU2MDk4ODg4ODAyMV8xNzgwMzE4NTk1OjE3ODA0MDQ5OTVfVjM)

Pressione Enter para confirmar

![6. Precautions – 4](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTA1YzI4ODJjMTU1Yjk1ZTNiODIwMzI1MDAxYzA2ODVfMzliYWRhODM2MThmMTNlYjg4NjdhMmRmNjA0YjQyYWVfSUQ6NzYzODkzMTU1ODA4ODA2ODA2M18xNzgwMzE4NTk1OjE3ODA0MDQ5OTVfVjM)

Pressione as setas para selecionar Finish e depois Enter para sair da configuração.

![6. Precautions – 5](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YWNiNmZjNjExOTA3NTM2ZTg5M2Q4MjM4MDM2YTE0Y2VfZmVhNGRkNjA1OGIzZDI4YjRlMGQwM2I3Njk0OWMyNDFfSUQ6NzYzODkzMTU1Nzc5MzY4MDM0NV8xNzgwMzE4NTk1OjE3ODA0MDQ5OTVfVjM)



