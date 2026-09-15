---
title: Tutorial de Uso do Sensor de Atitude IMU de Alta Precisão
description: "Sensor IMU de atitude de alta precisão da Juxi Technology: bibliotecas Python, comunicação serial e I2C, calibração e exemplos ROS1 e ROS2."
---

# Tutorial de Uso do Sensor de Atitude IMU de Alta Precisão

### Descarregue o pacote compactado [IMU_ROS1.zip](https://juxitech.feishu.cn/wiki/GNgWwGnYIiBd4Gk81yccEN6jnNf), descompacte-o e depois entre em ~/IMU_Library

1. **Instale as bibliotecas Python necessárias para o código**

```PowerShell
pip install pyserial
pip install smbus2
```

2. **Instale a IMU_Library**

```PowerShell
# 安装库及其依赖
pip install -e .

# 或使用setup.py安装
python setup.py install
```

3. **Configure o Mapeamento de Portas**

```PowerShell
# 防止插拔后端口变更，请设置端口映射
sudo gedit /etc/udev/rules.d/99-serial-imu.rules

# 如出现没有gedit命令相关内容，先下载安装
sudo apt install gedit

# 填写映射内容
KERNEL=="ttyUSB*", ATTRS{idVendor}=="1a86", ATTRS{idProduct}=="7523", MODE:="0777", SYMLINK+="imu-serial"

# 参数说明：
`--mode`: 通信模式，可选值为`serial`(串口)或`i2c`
`--port`: 串口名(如`/dev/ttyUSB0`)或I2C端口号(如`7`)
`--rate`: 数据打印频率(Hz)，默认10Hz
`--debug`: 启用调试模式，显示详细信息

# 保存退出，运行命令使规则生效
sudo udevadm trigger
sudo service udev reload
sudo service udev restart

# 验证
ll /dev/imu-serial

# 输出示例：
lrwxrwxrwx 1 root root 7 1月 22 10:00 /dev/imu-serial -> ttyUSB0
```

### Comunicação Serial

1. **Entre no diretório ~/IMU_Library/IMU_Library e execute o ficheiro IMU_Serial_Library.py**

```PowerShell
cd ~/imu_ros1/src/IMU_ROS1/IMU_Library/IMU_Library 
# 或
cd ~/imu_ros2/src/IMU_ROS2/IMU_Library/IMU_Library

# 运行 IMU 数据打印文件
python3 IMU_Serial_Library.py
```

### Comunicação I2C

1. **Entre no diretório ~/IMU_Library/IMU_Library e execute o ficheiro IMU_I2C_Library.py**

```PowerShell
cd ~/IMU_Library/IMU_Library

# 运行 IMU 数据打印文件
python3 IMU_I2C_Library.py
```

### Calibração do IMU

1. **Entre no diretório ~/IMU_Library/IMU_Library e execute o ficheiro imu_calibration_tool.py**

```PowerShell
cd ~/IMU_Library/IMU_Library

# 运行 IMU 校准代码文件 --串口通讯校准
# 执行所有校准（整体、磁力计、温度）
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial

# 仅整体校准
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate imu

# 仅磁力计校准
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate mag

# 仅温度校准
python3 imu_calibration_tool.py --mode serial --port /dev/imu-serial --calibrate temp

# 运行 IMU 校准代码文件 --I2C通讯校准
# 执行所有校准（整体、磁力计、温度）
python3 imu_calibration_tool.py --mode i2c --port 1

# 仅整体校准
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate imu

# 仅磁力计校准
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate mag

# 仅温度校准
python3 imu_calibration_tool.py --mode i2c --port 1 --calibrate temp
```

## Exemplo do repositório oficial

A Juxi Technology fornece código open source completo para o módulo IMU: [GitHub](https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module)

### Exemplos ROS1 / ROS2

O repositório suporta nativamente ROS1 e ROS2, incluindo ferramentas de calibração e nós de visualização:

```bash
git clone https://github.com/Juxi-Technology/ICM42670P-High-Precision-IMU-Module.git
cd ICM42670P-High-Precision-IMU-Module

# ROS2
colcon build
source install/setup.bash
ros2 launch icm42670p imu_launch.py
```

### Ferramenta de calibração Python

```bash
# 运行六面校准获取精确的加速度计和陀螺仪零偏
python calibration/calibrate.py --port /dev/ttyUSB0
```
