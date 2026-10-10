---
title: "4장: 얼굴 검출"
description: "NanoCam 튜토리얼 4장: ESP-DL 얼굴 검출 모델로 화면에 얼굴 상자와 키포인트를 표시하고 좌표를 읽어 서보를 제어하는 방법을 다룹니다."
---

# 4장: 얼굴 검출

> **[스토어에서 구매](https://www.juxitech.com/ko/products/esp32-s3-wifi-video-module)**

**이번 장의 목표**: NanoCam이 화면 속 얼굴을 검출하고 얼굴 상자와 키포인트를 표시하도록 하며, 좌표를 읽어 외부 제어에 사용합니다.

## 원리

얼굴 검출은 ESP-DL 딥러닝 라이브러리를 사용하며, MobileNet 경량 검출 모델을 기반으로 합니다. 320x240 RGB565 이미지를 입력받아 얼굴 경계 상자 목록(위치+크기+신뢰도)을 출력합니다. 추론은 ESP32-S3에서 완료되며 네트워크 연결이 필요하지 않습니다.

### 검출 결과 형식

- 좌표: 좌측 상단(x,y) + 너비/높이(w,h)
- 신뢰도: 0-1 사이의 부동소수점
- 얼굴이 여러 개면 여러 개의 상자를 반환합니다

## 단계

### 4.1 모드 전환

```Plain
ai_mode:2
```

> 전체 명령은 [시리얼 프로토콜 매뉴얼](./ESP32-NanoCam-Serial-Protocol.md)을 참조하세요.

### 4.2 결과 확인

브라우저 `http://<IP>`에서 얼굴 검출 상자를 볼 수 있습니다.

### 4.3 좌표 얻기

시리얼 출력 형식:

```Plain
I (xxxxx) detection_result: [ 0]: ( 45,  30, 180, 210)
I (xxxxx) detection_result:       left eye: ( 90,  80), right eye: (150,  80), nose: (120, 120), mouth left: ( 95, 150), mouth right: (145, 150)
```

- 첫 번째 줄: `[번호] (x, y, w, h)` — 얼굴 상자 좌표
- 두 번째 줄: 5개 키포인트 — 왼쪽 눈, 오른쪽 눈, 코, 왼쪽 입꼬리, 오른쪽 입꼬리

## 코드

### Arduino로 좌표를 읽어 서보 제어

```C++
// $face:x,y,w,h# 형식 파싱
if (nanoSerial.available()) {
    String line = nanoSerial.readStringUntil('\n');
    if (line.startsWith("$face:")) {
        int x = line.substring(6).toInt();
        int y = line.substring(line.indexOf(',')+1).toInt();
        servoX.write(map(x, 0, 320, 0, 180));
    }
}
```

### Python으로 읽기

```Python
ser = serial.Serial("COM3", 115200)
line = ser.readline().decode()
if line.startswith("$face:"):
    parts = line[6:-1].split(",")
    x, y, w, h = map(int, parts)
```

## 결과

카메라 앞에 얼굴이 나타나면 → 화면에 녹색 상자가 표시되고 → 시리얼로 좌표가 출력됩니다.

다음 장: [5장: 고양이 얼굴 검출](./Ch05-Cat-Face-Detection.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
