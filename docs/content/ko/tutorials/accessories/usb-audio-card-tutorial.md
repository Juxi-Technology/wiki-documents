---
title: USB 드라이버 불필요 사운드 카드 튜토리얼
description: "JUXI USB 드라이버 불필요 사운드 카드 튜토리얼. 시각화 테스트 소프트웨어, 명령어 작업, 오디오 디버깅 방법 포함. 라즈베리파이, Jetson, PC 등에서 사용 가능."
---

# USB 드라이버 불필요 사운드 카드 튜토리얼

> **[스토어에서 구매](https://www.juxitech.com/ko/products/usb-2-0-driver-free-sound-card-onboard-mic-speaker-for-ai-voice-interaction)**


# 시각화 테스트 소프트웨어(Windows)

[audio_tools.7z](https://juxitech.feishu.cn/wiki/Wuc3wAppNi5elfkSI6VccrNDnfE)

**명령어 요약(건너뛰어도 됨)

- 시스템 업데이트 및 도구 설치:

    - 실행: `sudo apt update && sudo apt full-upgrade`

    - ALSA 설치: `sudo apt install alsa-base alsa-utils`

- 하드웨어 식별:

    - 오디오 장치 나열: `aplay -l`

    - PCI/USB 오디오 장치 확인: `lspci | grep -i audio`、`lsusb`

- 기본 설정 및 검증:

    - 설정 마법사 실행: `sudo alsaconf`(사용 가능한 경우)

    - 볼륨 조절: `alsamixer`(**M** 키로 음소거 해제, 방향키로 볼륨 조절, ESC로 종료)

    - 설정 저장: `sudo alsactl store`

    - 재생 테스트: 오디오 출력 테스트(스피커/헤드폰 연결):

```Bash
# 테스트 사운드 재생, -D로 USB 사운드 카드 지정(X는 aplay -l에 표시된 card 번호)
speaker-test -c 2 -D plughw:X,0
```

- 오디오 서비스 재시작: `sudo systemctl restart alsa`(일부 환경에서는 시스템 재부팅 필요: `sudo reboot`)

# Jetson시리즈 주장치&Ubuntu시스템&라즈베리파이

## 명령줄 디버깅

### 1. USB 사운드 카드 연결

1. USB 사운드 카드를 꽂기 전에 `lsusb` 명령으로 USB 장치를 확인합니다:

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/1.png)

2. USB 사운드 카드를 꽂은 후 다시 `lsusb`를 실행하면, 새로 생긴 장치가 USB 사운드 카드입니다:

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/10.png)

3. `arecord -l`로 모든 녹음 장치를 나열할 수 있으며, USB 사운드 카드 장치를 확인할 수 있습니다:

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/2.png)

4. `aplay -l`로 모든 재생 장치를 나열할 수 있습니다:

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/3.png)

### 2. USB 사운드 카드 사용

`arecord -l`에서 예를 들어 UACDemoV1.0이 표시되면 그것이 우리 사운드 카드입니다. card 0; device 0이면 명령에서 plughw:0,0으로 변경해 해당 녹음 장치를 지정합니다:

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/4.png)

Linux 기본 녹음 명령으로 5초간 소리를 녹음하여 테스트합니다:

`arecord -D plughw:0,0 -f S16_LE -r 16000 -d 5 -t wav test.wav`

여기서 `plughw:0,0`은 `card 0, device 0`, 즉 우리 USB 사운드 카드를 뜻하며, `arecord -l`로 찾은 장치 번호에 맞게 수정해야 합니다. UACDemoV1.0이 즉 우리 사운드 카드가 card 1; device 1로 표시되면 명령의 `plughw:0,0`을 `plughw:1,1`로 변경해야 합니다. `plughw` 파라미터는 자동 형식 변환을 제공하여 서로 다른 데이터 형식과 하드웨어 사이를 브리징합니다. arecord의 기타 파라미터는 다음과 같습니다:

|명령|의미|본 명령에서의 의미|
|---|---|---|
|-D|장치 이름 선택|외장 USB 사운드 카드 "plughw:1.0" 사용|
|-f|녹음 형식|S16_LE는 부호 있는 16비트 리틀엔디언|
|-r|샘플레이트|16000은 16KHz 샘플링|
|-d|녹음 시간|5초 녹음|
|-t|녹음 형식|wav 형식|
|test.wav|파일 이름(경로 포함 가능)|파일 이름은 test.wav|

소리가 작으면 `alsamixer` 명령으로 볼륨을 조정합니다. `F6`를 눌러 USB 사운드 카드를 선택:

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/5.png)

그 다음 `F5`를 눌러 녹음 및 재생 장치를 모두 표시합니다. 녹음 볼륨은 위쪽 방향키로 올립니다. PCM은 재생, CAPTURE MIC는 녹음입니다:

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/6.png)

그 다음 `aplay` 명령으로 재생합니다:

`aplay -D plughw:0,0 -f S16_LE -r 16000 -c 1 test.wav`

파라미터 설명:

- -D plughw:0,0: 녹음 장치 지정. plughw:0,0은 첫 번째 사운드 카드의 첫 번째 장치를 사용.

- -f S16_LE: 오디오 파일 형식 설정. S16_LE는 부호 있는 16비트 리틀엔디언(Signed 16-bit Little Endian)으로 일반적인 오디오 데이터 형식입니다. "리틀엔디언"은 데이터의 하위 바이트가 메모리의 낮은 주소에 저장됨을 뜻합니다.

- -r 16000: 샘플레이트 설정.

- -c 1: 채널 수 설정.

- -d 5: 녹음 시간(초) 설정.

## PulseAudio 시각화 창으로 확인

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/7.png)

PulseAudio를 [명령줄](https://so.csdn.net/so/search?q=%E5%91%BD%E4%BB%A4%E8%A1%8C&spm=1001.2101.3001.7020)로 확인:

`pactl list sources short`            # 현재 PulseAudio 오디오 서버에서 사용 가능한 모든 오디오 소스 나열

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/8.png)

> 49는 소스 인덱스를 나타냅니다
>
> Alsa _input.usb는 USB 입력 장치, 즉 마이크임을 나타냅니다
>
> s16le은 부호 있는 16비트 리틀엔디언(Signed 16-bit Little Endian) 오디오 샘플링 형식입니다.
>
> 1ch는 모노를 나타냅니다.
>
> 48000Hz는 샘플레이트로, 초당 48000회 샘플링함을 나타냅니다
>
> SUSPENDED는 현재 마이크가 일시 중단 상태임을 나타냅니다
>
> RUNNING은 마이크가 사용 중임을 나타냅니다

## python에서 USB 드라이버 불필요 사운드 카드 호출

코드 예시는 직접 검색하세요. 예: "[Python调用USB免驱声卡](https://blog.csdn.net/weixin_44463519/article/details/157463731?spm=1001.2101.3001.6650.3&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7ECtr-3-157463731-blog-105694458.235%5Ev43%5Epc_blog_bottom_relevance_base9&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EYuanLiJiHua%7ECtr-3-157463731-blog-105694458.235%5Ev43%5Epc_blog_bottom_relevance_base9&utm_relevant_index=4)"

## 문제 정리

### Jetson

1. 장치 점유 문제

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/9.png)

설정 페이지를 닫고 명령을 다시 실행합니다

그래도 안 되면 다시 꽂거나 재부팅합니다

오디오 장치를 점유한 프로세스 확인:

`sudo lsof /dev/snd/*`

사운드 카드를 꽂기 전:

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/1.png)

사운드 카드를 꽂은 후:

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/10.png)

프로세스 종료 `kill -9 PID`, PID는 사운드 카드 꽂은 후 나타난 PID입니다. 스크린샷에서는 33739입니다

그 다음 다시 녹음, 재생합니다

### 라즈베리파이

1.노이즈가 많은 문제

```Plain Text
먼저 마이크 볼륨을 100으로 설정
터미널 열기
$ sudo vi /boot/config.txt    #또는 /boot/firmware/config.txt일 수도 있음
텍스트 마지막에 추가
audio_pwm_mode = 2
ESC 입력:wq로 저장 및 종료
그 다음 재부팅
$ reboot
```

2.재부팅할 때마다 볼륨 설정이 초기화됨

볼륨을 다시 설정한 후,

현재 볼륨 설정을 시스템 기본 설정 파일에 저장해야 합니다

다음 명령으로 현재 설정을 영구화합니다:

```Bash
sudo chmod 664 /var/lib/alsa/asound.state
sudo alsactl store
```

### Ubuntu 가상 머신

1. 녹음 시 노이즈가 섞임

해결 방법: USB 컨트롤러 호환성을 3.0 또는 3.1로 변경

# RDK x3&x5

## 장치 번호 확인

사운드 카드가 존재하는지, 장치 번호를 확인합니다.

`cat /proc/asound/cards` 명령으로 사운드 카드가 등록되었는지 확인:

```Shell
0 [duplexaudio    ]: simple-card - duplex-audio
                      duplex-audio
```

`cat /proc/asound/devices` 명령으로 논리 장치를 확인:

```Shell
root@ubuntu:~# cat /proc/asound/devices
  2: [ 0- 0]: digital audio playback
  3: [ 0- 0]: digital audio capture
  4: [ 0]   : control
 33:        : timer
```

`ls /dev/snd/` 명령으로 사용자 공간의 실제 장치 파일 확인:

```Shell
root@ubuntu:~# ls /dev/snd/
by-path/   controlC0  pcmC0D0c   pcmC0D0p   timer
```

위 조회를 통해 사운드 카드 0이 온보드 사운드 카드임을 확인할 수 있습니다. 장치도 존재하며 장치 번호는 `0-0`입니다. 실제로 조작할 장치는 `pcmC0D0p`와 `pcmC0D0c`입니다.

## 5초간 소리를 녹음하여 테스트

`arecord -D plughw:0,0 -f S16_LE -r 16000 -d 5 -t wav test.wav`

여기서 `plughw:0,0`은 `card 0, device 0`, 즉 우리 USB 사운드 카드를 뜻합니다. `plughw` 파라미터는 자동 형식 변환을 제공하여 서로 다른 데이터 형식과 하드웨어 사이를 브리징합니다. arecord의 기타 파라미터는 다음과 같습니다:

|명령|의미|본 명령에서의 의미|
|---|---|---|
|-D|장치 이름 선택|외장 USB 사운드 카드 "plughw:1.0" 사용|
|-f|녹음 형식|S16_LE는 부호 있는 16비트 리틀엔디언|
|-r|샘플레이트|16000은 16KHz 샘플링|
|-d|녹음 시간|5초 녹음|
|-t|녹음 형식|wav 형식|
|test.wav|파일 이름(경로 포함 가능)|파일 이름은 test.wav|

소리가 작으면 `alsamixer` 명령으로 볼륨을 조정합니다. `F6`를 눌러 USB 사운드 카드를 선택:

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/2.png)

그 다음 `F5`를 눌러 녹음 및 재생 장치를 모두 표시합니다. 녹음 볼륨은 위쪽 방향키로 올립니다. PCM은 재생, CAPTURE MIC는 녹음입니다:

![](../../../../public/images/tutorials/accessories/usb-audio-card-tutorial/3.png)

그 다음 `aplay` 명령으로 재생합니다:

`aplay -D plughw:0,0 -f S16_LE -r 16000 -c 1 test.wav`

파라미터 설명:

- -D plughw:0,0: 녹음 장치 지정. plughw:0,0은 첫 번째 사운드 카드의 첫 번째 장치를 사용.

- -f S16_LE: 오디오 파일 형식 설정. S16_LE는 부호 있는 16비트 리틀엔디언(Signed 16-bit Little Endian)으로 일반적인 오디오 데이터 형식입니다. "리틀엔디언"은 데이터의 하위 바이트가 메모리의 낮은 주소에 저장됨을 뜻합니다.

- -r 16000: 샘플레이트 설정.

- -c 1: 채널 수 설정.

- -d 5: 녹음 시간(초) 설정.

## 자주 묻는 질문

### RDK 보드에서 USB 사운드 카드와 온보드 사운드 카드를 구분하는 방법?

### RDK X3 시리즈의 오디오 서브보드와 USB 사운드 카드를 공존시켜 동시에 사용하는 방법?

### RDKS100에서 그래픽 인터페이스로 오디오 기능을 사용하는 방법?

[RDK 멀티미디어 처리 및 응용](https://developer.d-robotics.cc/rdk_doc/FAQ/multimedia#usb-%E5%A3%B0%E5%8D%A1%E5%92%8C%E6%9D%BF%E8%BD%BD%E5%A3%B0%E5%8D%A1%E5%A6%82%E4%BD%95%E5%8C%BA%E5%88%86%E4%BD%BF%E7%94%A8) 참조

# 기본 오디오 드라이버 확인

USB 드라이버 불필요 사운드 카드를 사용할 수 있는지의 **핵심은 커널**입니다

- USB Audio Class 지원 여부(즉 `CONFIG_USB_AUDIO`);

- 해당 커널 모듈이 로드되었는지(예: `snd-usb-audio`)

커널이 지원하면 기본 오디오 도구만 추가 설치하면 정상 사용 가능합니다. 커널이 잘려 있으면 커널을 다시 컴파일하여 드라이버를 활성화해야 합니다.

**1단계: 커널이 snd_usb_audio를 지원하는지 확인**

```Plain Text
# 방법1: 드라이버 모듈이 로드되었는지 확인
lsmod | grep snd_usb_audio

# 방법2: 커널에 모듈이 내장되었는지 확인(로드되지 않았어도)
modinfo snd_usb_audio  # 출력 있음=커널 지원; 출력 없음=커널이 해당 모듈 미컴파일
```

**`modinfo` 출력이 없으면**: 시스템 커널이 해당 드라이버를 잘라냈다는 뜻이므로 커널을 다시 컴파일하고 `.config`에서 활성화:

```Plain Text
CONFIG_SND_USB_AUDIO=m  # 모듈로 컴파일, 또는 =y로 커널에 내장
CONFIG_SND_USB_UA101=y
CONFIG_SND_USB_CAIAQ=y
```

**`modinfo` 출력이 있으면**: 모듈을 바로 로드:

```Bash
sudo modprobe snd_usb_audio
```

#### 2단계: 기본 오디오 도구 설치(경량 버전에는 기본으로 없음)

경량 시스템에는 보통 `alsa-utils` 같은 도구가 없어 수동 설치가 필요합니다:

```Bash
# Ubuntu/Debian 시스템
sudo apt update && sudo apt install -y alsa-utils usbutils

# 네트워크 없는 환경: alsa-utils 오프라인 패키지를 내려받아 dpkg -i로 설치
```

#### 3단계: USB 사운드 카드 인식 및 기능 검증

1.USB 사운드 카드를 꽂고 장치 인식 확인:

```Bash
# USB 장치 열거 확인
lsusb | grep -i audio

# 오디오 장치 나열
aplay -l
```

출력에 `USB Audio` 관련 `card X` 항목이 보이면 인식 성공입니다.

2.오디오 출력 테스트(스피커/헤드폰 연결):

```Bash
# 테스트 사운드 재생, -D로 USB 사운드 카드 지정(X는 aplay -l에 표시된 card 번호)
speaker-test -c 2 -D plughw:X,0
```

#### 4단계: (선택) 오디오 서비스 설치(데스크톱/백그라운드 재생 필요 시)

백그라운드에서 오디오를 재생하거나 데스크톱 환경과 함께 사용하려면 경량 버전에는 오디오 서비스 추가 설치가 필요합니다:

```Bash
# 경량 서비스(권장, 데스크톱 없이도 사용 가능)
sudo apt install -y pulseaudio

# 또는 PipeWire (Ubuntu 22.04+ 권장)
sudo apt install -y pipewire pipewire-alsa
```

### 경량 시스템의 흔한 문제 및 해결

**1.권한 부족으로 일반 사용자가 사운드 카드에 접근 불가**

해결: 사용자를 `audio` 그룹에 추가, 재부팅 후 적용:

```Bash
sudo usermod -aG audio $USER
```

2.**소리가 나지 않지만 장치는 정상 인식됨**

해결: `alsamixer`로 볼륨을 올리고 음소거 해제(**M** 키로 음소거 해제):

```Bash
alsamixer -c X  # X는 USB 사운드 카드의 card 번호
```

3.**커널 버전이 낮아 최신 USB 사운드 카드를 지원하지 않는 경우, 다음 두 가지 상황**

```Bash
sudo apt install -y linux-generic && sudo reboot
```

```Bash
sudo modprobe snd-hda-intel model=generic #(기종에 따라 다른 model 값 시도 가능)
# 사운드 카드 드라이버 설정 파일 생성
sudo echo "options snd-hda-intel model=generic" > /etc/modprobe.d/sound.conf
sudo reboot
```


---

## 공식 저장소

JUXI USB 드라이버 불필요 사운드 카드 오픈소스 저장소: [GitHub](https://github.com/Juxi-Technology/Driver-Free-Sound-Card)

플러그 앤 플레이로 Raspberry Pi, Jetson, PC 등 장치와 호환됩니다. 추가 드라이버 불필요, 시스템이 자동으로 오디오 입력/출력 장치로 인식합니다.
