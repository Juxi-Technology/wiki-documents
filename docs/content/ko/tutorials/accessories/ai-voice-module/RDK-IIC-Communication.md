---
title: "IIC 통신"
description: "이 저장소는 RDK X5(Raspberry Pi) 플랫폼과 AI 음성 인터랙션 모듈 간의 통신을 위한 Python 예제 코드를 제공하며, I2C 와 UART 두 가지 통신 방식을 지원합니다."
---

# IIC 통신

## 소개

이 저장소는 RDK X5(Raspberry Pi) 플랫폼과 AI 음성 인터랙션 모듈 간의 통신을 위한 Python 예제 코드를 제공하며, I2C 와 UART 두 가지 통신 방식을 지원합니다.

- **음성 인식 모듈**: 오프라인 음성 인식을 지원하며, 인식 후 명령 ID 를 출력합니다

- **재생 기능**: 수동 재생, 기능어 재생, 명령어 재생을 지원합니다

- **통신 프로토콜**: I2C 주소 0x2A, UART 보드레이트 115200

- **프로그래밍 언어**: Python 3

---

## 하드웨어 연결

### 공통 연결

> **중요 안내**: 모든 장치가 공통 접지되었는지 확인하십시오!
> 
> 

---

### I2C 버전 연결

**주의**: 기본적으로 I2C 버스 5(BCM 번호)를 사용합니다

![그림 1](../../../../../public/images/tutorials/accessories/ai-voice-module/RDK-IIC-Communication/1.jpg)

---

## 환경 설정

### 시스템 요구 사항

- RDK X5

- Ubuntu / Debian 시스템

- Python 3.7+

### 의존성 패키지 설치

```Bash
# 更新软件包
sudo apt update
sudo apt upgrade -y

# 安装 Python 库
sudo apt install -y python3-pip python3-smbus i2c-tools
```

### I2C 인터페이스 활성화

```Bash
# 打开配置工具
sudo raspi-config

# 选择 Interface Options → I2C → Enable
# 重启生效
sudo reboot
```

### 하드웨어 인터페이스 테스트

```Bash
# 测试 I2C 设备
sudo i2cdetect -y 5
```

---

## IIC 버전 사용

### 코드 파일 확인

```Bash
cd IIC_Voice
ls -la
# 应该看到 iic_voice.py
```

### I2C 버스 설정

`iic_voice.py` 파일을 편집하여 필요한 매개변수를 수정합니다:

```Bash
# I2C 设备地址
DEVICE_ADDRESS = 0x2A

# 寄存器地址
REG_RESULT = 0xDA

# I2C 总线编号（根据实际连接修改）
bus = smbus.SMBus(5)  # I2C 总线 5
```

### 프로그램 실행

```Bash
# 赋予执行权限
chmod +x iic_voice.py

# 运行（需要 sudo 权限访问 I2C）
sudo python3 iic_voice.py
```

### 실행 테스트

정상적으로 시작하면 다음이 표시됩니다:

```Bash
Speech Serial Opened! Baudrate=115200
```

음성 모듈에 명령어를 말하면 해당하는 ID 가 표시됩니다:

```Bash
Speech Serial Opened! Baudrate=115200
ID:1
ID:4
ID:10
```

### 프로그램 중지

`Ctrl + C` 를 눌러 프로그램을 중지합니다:

```Bash
Program terminated
```

---

## 자주 묻는 질문

### Q1: I2C 작업 권한 부족

**A: 사용자를 I2C 사용자 그룹에 추가:**

```Bash
sudo usermod -aG i2c $USER
# 重新登录生效
```

또는 `sudo` 로 프로그램을 실행합니다

---

### Q2: I2C 장치가 스캔되지 않음

**A: 확인 사항:**

1. I2C 가 활성화되었는지 확인 (raspi-config)

2. SDA/SCL 이 반대로 연결되지 않았는지 확인

3. 공통 접지되었는지 확인

4. 장치 전원이 켜졌는지 확인

```Bash
# 扫描 I2C 设备
sudo i2cdetect -y 5
# 如果看到 0x2A，说明设备连接正常
```

---

### Q3: 명령 ID 가 0 만 표시되거나 표시되지 않음

**A: 정상적인 현상:**

- 0 = 유효한 명령이 인식되지 않음

- 유효한 명령어를 말해야만 ID 가 출력됨

- 먼저 모듈을 웨이크하고, 그다음 명령을 말하기

---

### Q4: 인식 정확도가 높지 않음

**A: 최적화 제안:**

- 환경이 조용한지 확인하고 배경 소음이 너무 크지 않아야 함

- 마이크와의 거리를 적절하게 유지 (10-50cm)

- 말하는 속도를 적절하게 하고 발음을 명확하게

---

## 기술 지원

문제가 있는 경우 다음을 확인하십시오:

1. 하드웨어 배선이 올바른지 (공통 접지가 매우 중요합니다!)

2. 시리얼 포트 보드레이트가 115200 인지

3. I2C 주소가 올바른지 (0x2A)

4. 하드웨어 인터페이스에 접근할 권한이 충분한지

## 자주 사용하는 디버깅 명령

```Bash
ls -l /dev/i2c*      # 查看 I2C 设备
groups                # 查看用户组权限
```

<RelatedProducts slugs="ai-voice-module" />
