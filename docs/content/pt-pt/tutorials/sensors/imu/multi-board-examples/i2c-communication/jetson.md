---
title: Série Jetson
description: "Este tutorial usa a placa-mãe Jetson Orin NX como exemplo."
---

# Série Jetson

## 1. Conectar o dispositivo

Este tutorial usa a placa-mãe Jetson Orin NX como exemplo. 

Conecte o sensor de atitude IMU à interface I2C do Jetson Orin NX conforme mostrado na figura abaixo. 

![1. Connect the device – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzA3MWU4MTVlMjI4ZTY0MDA4NGRlZDJhYjEwM2JlNTNfMDVkN2E3ZjFhY2Y4YzE0ZTRhZjRmYzVhMzU4YzllMjFfSUQ6NzYzODkzMTcwMzc0MDQ1MTc3OF8xNzgwMzE4NjUyOjE3ODA0MDUwNTJfVjM)

![1. Connect the device – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZGI2NjZlMmNmYTFiYmYzZDM0YzYyNjJjZjJkMDJmY2NfYzUxNTI5N2Q2NzA0MmU1ZjIxOWJkNjdiMDIwN2ExMDRfSUQ6NzYzODkzMTcwNTIxMDQyNDI2OF8xNzgwMzE4NjUyOjE3ODA0MDUwNTJfVjM)

## 2. Verificar o status do dispositivo

Primeiro, instale o I2Ctool e depois digite o seguinte no terminal: 

```PowerShell
sudo apt-get update
sudo apt-get install -y i2c-tools
```

Visualizar Dispositivos I2C 

```PowerShell
sudo i2cdetect -y -r -a 7
```

![2. Check device status – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTEyMTU4Y2Q3YmRjMGE2ODRjZGVkNjMxNDMxZjVjMGVfMDI4NTlhZjQzMmIwMGMwMDYyNDAxOGZlNTE4YWE3MmZfSUQ6NzYzODkzMTcwMzQ2NTg1NTkzOF8xNzgwMzE4NjUyOjE3ODA0MDUwNTJfVjM)

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

![3. Install the driver library – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTAwZDhkMTA3NDM2ZDZhNDI3NzRmOTk3ZGEzNmFmNjZfZTQyMzFhYmIxNmEyZDQyYzEzZTc1ODk1ZTUzMDNjMzNfSUQ6NzYzODkzMTcwNjgyNDczOTgwN18xNzgwMzE4NjUyOjE3ODA0MDUwNTJfVjM)

## 4. Visualizar os dados do IMU

**Entre no diretório ~/IMU_Library e execute o ficheiro IMU_Serial_Library.py**

```PowerShell
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![4. View IMU data – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTU0NTQ3Yjc1ZGMyZjAxZGFmYjRjZWIyODgwZTliMzRfODkyODA2YWY2MDI2MzFjYjhmN2NjYjk2NGJjZmRlOTFfSUQ6NzYzODkzMTcwNjgyNDcyMzQyM18xNzgwMzE4NjUyOjE3ODA0MDUwNTJfVjM)

Observação: O acima é a leitura de dados de um IMU de 10 eixos. O de 6 eixos não possui dados de magnetômetro e barômetro, e o de 9 eixos não possui dados de barômetro.

## **5. Calibração do IMU**

**Entre no diretório ~/IMU_Library e execute o ficheiro imu_calibration_tool.py**

```PowerShell
cd ~/IMU_Library

# 运行 IMU 校准代码文件 --I2C通讯校准
# 执行所有校准（整体、磁力计、温度）
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 7

# 仅整体校准
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 7 --calibrate imu

# 仅磁力计校准
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 7 --calibrate mag

# 仅温度校准
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 7 --calibrate temp
```

![5. IMU Calibration – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjlkMjJiZjE5NTk2NTBmOTA0OWU3NDVmYmEyNjMwZmVfOTg2MTNjOTg2ZTE0YTgyZmE5ZThkMjc0NWNiOGQ0MTdfSUQ6NzYzODkzMTcwNDE4NzMyNTM5Ml8xNzgwMzE4NjUyOjE3ODA0MDUwNTJfVjM)

## 6. Precauções

Ao usar a placa-mãe da série Orin, é necessário modificar o número do barramento do I2C de acordo com a situação real. O local de modificação é mostrado na figura abaixo. Normalmente, é o barramento 7. 

![6. Precautions – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NmU4NjBhMmRmYzAxYmY0ODJjZDhiNTJmYWVkY2ViODRfNzUwMDc0NWRjYjAxYjI1MjczZGFhZWY4MzZmNGJjZTNfSUQ6NzYzODkzMTcwNDY0NDUyMDkzMV8xNzgwMzE4NjUyOjE3ODA0MDUwNTJfVjM)

![6. Precautions – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmFmYjUxZDk4OTAzMzIyNjA5MWQxNDBlMGZmZTQ5M2RfMTE1NzEwYmFlYzVhZjkyM2I3NzA4MWYwYWMyZjc0Y2JfSUQ6NzYzODkzMTcwMzQ2NTgzOTU1NF8xNzgwMzE4NjUyOjE3ODA0MDUwNTJfVjM)



