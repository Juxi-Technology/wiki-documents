---
title: "RDK"
description: "Este tutorial usa a imagem da versão ? da placa-mãe RDK X5 como exemplo."
---

# RDK

## Etapa 1 Conectar dispositivos

Este tutorial usa a imagem da versão ? da placa-mãe RDK X5 como exemplo. 

Conecte o sensor de atitude IMU à interface I2C do RDK X5 conforme mostrado abaixo.

![Step 1 Connect devices – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjFjNTI1MjI3YjNlODQ0YjM0YjEyZTRmY2M3MDhjMzZfMzZjMWU3NDhmZTg5MDkxMTZhMGU3YzcwZTExOGEyNTRfSUQ6NzYzODkzMTkyMjI3ODg2MTc3Ml8xNzgwMzE4Njk0OjE3ODA0MDUwOTRfVjM)

![Step 1 Connect devices – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjAwZGU4NDIzMTE2YjU4YzE5OWU3OWY0Njc5Y2U5M2RfYzcxMzM5NTllY2QxZGI1Yjg3MTk3MzBmYmQ2YmE1ZTlfSUQ6NzYzODkzMTkxOTI1MDI3OTM1NV8xNzgwMzE4Njk1OjE3ODA0MDUwOTVfVjM)

## 2. Verificar o status do dispositivo

Visualizar Dispositivos I2C 

```PowerShell
python3 /app/40pin_samples/test_i2c.py
```

![2. Check device status – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDM2NDA4ZTAwZTQyMWY0YzAwNWZiMjJlNjNmY2Y0YzNfZTIxMGFjM2M2YzYzYzQ0YTZkNGM0MDIzY2I0OTFkOTlfSUQ6NzYzODkzMTkyMTIzMzY0NDQ4N18xNzgwMzE4Njk0OjE3ODA0MDUwOTRfVjM)

## 3. Instalar a biblioteca do driver

3.1** Instalar as bibliotecas Python necessárias para o código**

```PowerShell
sudo apt update
sudo apt install -y python3-serial
sudo apt install -y python3-smbus2
```

3.2 Transferir Ficheiros

[IMU_ROS2.zip]

Amigos que ainda não estão familiarizados com o uso do MobaXterm para transferir ficheiros, consultem a página a seguir para obter instruções detalhadas de instalação e operação do MobaXterm:[文件远程传输](https://juxitech.feishu.cn/wiki/KB0Jw2o6Wis9f0ksyeFceVmgnfd)

Arraste os ficheiros descompactados para o Raspberry Pi 5 por meio do software MobaXterm. 

![3. Install the driver library – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=N2E3NGJkNTA5OWVkM2FkYjc0ZDQ1ODJlNDQ5OGNjOTRfN2IyY2YxYzRjMDk4NmJmMWViYzczY2FiZDczYzM4MmFfSUQ6NzYzODkzMTkxOTg1ODMyMjM2NF8xNzgwMzE4Njk0OjE3ODA0MDUwOTRfVjM)

## 4. Visualizar os dados do IMU

**Entre no diretório ~/IMU_Library e execute o ficheiro IMU_Serial_Library.py**

```PowerShell
cd ~/imu_ros1/src/IMU_ROS1/IMU_Library
# 或
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library

# 运行 IMU 数据打印文件
python3 -m IMU_Library.IMU_I2C_Library
```

![4. View IMU data – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTBlMzMzMTQ0ZDg5MWM2ZjEwNWQ4ZDViMDdkN2Q5OWNfZTYxMWQzZTZmOTdiN2I3ZTA2Y2E2ZDVkZGYyNmMyMjNfSUQ6NzYzODkzMTkyMTY4NzU2MzIzMV8xNzgwMzE4Njk0OjE3ODA0MDUwOTRfVjM)

Atenção: O acima é a leitura de dados de um IMU de 10 eixos; o de 6 eixos não possui dados de magnetômetro e barômetro, e o de 9 eixos não possui dados de barômetro.

## **5. Calibração do IMU**

**Entre no diretório ~/IMU_Library e execute o ficheiro imu_calibration_tool.py**

```PowerShell
cd ~/IMU_Library

# 运行 IMU 校准代码文件 --I2C通讯校准
# 执行所有校准（整体、磁力计、温度）
python3 -m IMU_Library.imu_calibration_tool --mode i2c --port 0

# 仅整体校准
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate imu

# 仅磁力计校准
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate mag

# 仅温度校准
python3-m IMU_Library.imu_calibration_tool --mode i2c --port 0 --calibrate temp
```

![5. IMU Calibration – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjNkYjNiZTExNzllNjViZWMwYmU0OWU4ZTllYmM2MWZfYmJhYzRjMzc1OTA0MmRhNjk3MWVhZjA0NzlhYjhjOTRfSUQ6NzYzODkzMTkxOTU1MjMxODQzMV8xNzgwMzE4Njk0OjE3ODA0MDUwOTRfVjM)

## 6. Precauções

Ao usar a placa principal RDK X5, é necessário modificar o número do barramento I2C de acordo com a situação real. A posição de modificação é mostrada na figura abaixo. Normalmente, é o barramento número 0.

![6. Precautions – 1](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NjdkYmIxYmU3YmUwN2YyNzRmNWRhMjJiZjVkMzVmODZfM2M1MTgzMTg5ZmExNmE3OWZlYjY1MjYwM2QyNWEzNmVfSUQ6NzYzODkzMTkyMDIwNjMwMjE2NV8xNzgwMzE4Njk1OjE3ODA0MDUwOTVfVjM)

![6. Precautions – 2](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MWQwOTZmNDUyMjJlOGI3ZTY3MDY3MDcxMzUyMjQ0YTBfOTZlMTExOTNlOTk2NjA4NWYwNmM3MmJiNjc3MGVmNGFfSUQ6NzYzODkzMTkyMjM1NzU4NjkxOF8xNzgwMzE4Njk0OjE3ODA0MDUwOTRfVjM)



