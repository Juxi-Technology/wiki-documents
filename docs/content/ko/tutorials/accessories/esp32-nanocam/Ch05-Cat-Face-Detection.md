---
title: "5장: 고양이 얼굴 검출"
description: "ESP32-NanoCam 튜토리얼 5장: CatFaceDetectMN03 모델로 고양이 얼굴을 검출하고, 얼굴 검출 모델과의 차이를 비교하며, 좌표를 읽어 서보 추적을 구동합니다."
---

# 5장: 고양이 얼굴 검출

> **[스토어에서 구매](https://www.juxitech.com/ko/products/esp32-s3-wifi-video-module)**

**이번 장의 목표**: NanoCam이 고양이 얼굴을 검출하도록 하고, 얼굴 검출 모델과의 차이를 이해합니다.

## 원리

고양이 얼굴 검출은 CatFaceDetectMN03 모델을 사용하며, 고양이 얼굴 특징(삼각형 귀/넓은 눈 간격/코)에 최적화되어 학습되었습니다. 320x240 RGB565 이미지를 입력받아 고양이 얼굴 경계 상자 목록을 출력합니다. [4장](./Ch04-Face-Detection.md)의 얼굴 검출과 동일한 `print_detection_result` 출력 형식을 공유합니다.

### 고양이 얼굴 vs 얼굴 검출 모델 차이

|비교 항목|얼굴 검출 (ai_mode:2)|고양이 얼굴 검출 (ai_mode:1)|
|---|---|---|
|모델|MSR01 + MNP01 이중 캐스케이드|CatFaceDetectMN03 단일 단계|
|키포인트|10개(양눈/코끝/입꼬리)|없음(모델이 출력하지 않음)|
|신뢰도 임계값|MSR01=0.3, MNP01=0.4|0.4|
|검출 상자 그리기|녹색 빈 사각형 + 키포인트 5개|녹색 빈 사각형(키포인트 없음)|

## 단계

### 5.1 모드 전환

```Plain
ai_mode:1
```

기기가 자동으로 재부팅되어 고양이 얼굴 검출 모드로 진입합니다

> 전체 명령은 [시리얼 프로토콜 매뉴얼](./ESP32-NanoCam-Serial-Protocol.md)을 참조하세요.

### 5.2 결과 확인

고양이 또는 고양이 사진을 카메라 앞에 두고, 브라우저에서 `http://<IP>`를 열면 녹색 검출 상자가 고양이 얼굴을 표시합니다.

### 5.3 시리얼 출력

고양이 얼굴이 검출되면 시리얼로 출력됩니다:

```Plain
I (xxxxx) detection_result: [ 0]: ( 45,  30, 180, 210)
```

- 형식: `[번호] (x, y, w, h)` — 고양이 얼굴 상자 좌측 상단 좌표 + 너비/높이

- 고양이 얼굴 모델은 키포인트를 출력하지 않습니다(얼굴 검출과 다름)

## 코드

### 핵심 검출 로직

`components/modules/ai/who_cat_face_detection.cpp`:

```C++
CatFaceDetectMN03 detector(0.4F, 0.3F, 10, 0.3F);
std::list<dl::detect::result_t> &detect_results = detector.infer(
    (uint16_t *)frame->buf, {(int)frame->height, (int)frame->width, 3});

if (detect_results.size() > 0) {
    draw_detection_result((uint16_t *)frame->buf, frame->height, frame->width, detect_results);
    print_detection_result(detect_results);  // 시리얼로 좌표 출력
}
```

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

### Python 시리얼 읽기

```Python
import serial
ser = serial.Serial("COM3", 115200)
while True:
    line = ser.readline().decode().strip()
    if "detection_result" in line:
        print(line)
```

## 결과

고양이가 나타나면 → 화면에 녹색 상자가 표시되고 → 시리얼로 좌표가 출력됩니다. Arduino/Python으로 좌표를 읽어 서보 추적을 구동할 수 있습니다.

다음 장: [6장: 색상 인식](./Ch06-Color-Recognition.md)

<RelatedProducts slugs="esp32-s3-wifi-module" />
