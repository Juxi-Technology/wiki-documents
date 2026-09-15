---
title: "라즈베리파이: AGNSS 보조 측위"
description: "이번 과정에서는 주로 Raspberry Pi와 GPS 모듈 및 agnss 서버를 사용하여 약한 신호 환경에서 위치 정보를 읽고 분석하는 것을 구현하는 방법을 학습합니다."
---

# 라즈베리파이: AGNSS 보조 측위

**1. 학습 목표**

이번 과정에서는 주로 Raspberry Pi와 GPS 모듈 및 agnss 서버를 사용하여 약한 신호 환경에서 위치 정보를 읽고 분석하는 것을 구현하는 방법을 학습합니다.

**2. AGNSS 설명**

2.1. **AGNSS를 사용하는 이유**

• 자율형 GNSS 수신기가 측위하기 위한 조건에는 다음이 포함됩니다:

- 위성 신호를 포착하고 추적하여 시간을 분석한다

- 위성으로부터 항법 메시지를 획득한다

• 강한 신호 환경에서는 자율형 GNSS 수신기가 약 30초 정도에 콜드 스타트 측위를 할 수 있습니다. 그러나 약한 신호 환경에서는 외부 보조가 없는 수신기는 위성 포착이 매우 느리고 위성으로부터 항법 메시지를 획득하기 어려워, 측위에 매우 오랜 시간이 걸리며 심지어 측위할 수 없을 수도 있습니다.

• AGNSS는 수신기에 측위에 필요한 보조 정보, 예를 들어 항법 메시지, 대략적인 위치, 시간을 제공할 수 있습니다. 강한 신호 환경이든 약한 신호 환경이든, 이러한 정보는 최초 측위 시간을 현저히 단축할 수 있습니다.

2.2. **AGNSS 솔루션**

• AGNSS 서버는 여러 GNSS 데이터 소스로부터 AGNSS 보조 정보를 획득하여 관리합니다. 서버는 항상 클라이언트의 AGNSS 요청을 청취하고 응답합니다(사용자 이름과 비밀번호 필요).

• 사용자는 TCP/IP 프로토콜을 통해 AGNSS 서버로부터 보조 정보를 획득하며, 획득한 보조 정보는 그대로 GNSS 수신기에 전송할 수 있습니다.

• 사용자는 자신만의 프록시 서버를 구축할 수도 있습니다.

![그림 1](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/1.png) 

2.3. **AGNSS 절차**

• AGNSS 서버에 연결한다

–서버의 주소는 121.41.40.95(도메인: www.gnss-aide.com)

–포트 번호는 2621

• AGNSS 요청을 전송한다

–요청 문장: (사용자 이름과 비밀번호 필드는 필수 항목입니다)

–user=pm@juxi.com;pwd=juxi;cmd=full;gnss=gps+bd;lat=60.0;lon=55.0;alt=0;

• AGNSS 보조 정보를 획득한다

• AGNSS 보조 정보를 수신기에 전송한다

2.4. **AGNSS 요청 파라미터**

• 사용자 측은 AGNSS 서버로 요청을 전송하며, 요청 문장의 형식은 다음과 같습니다

–요청 문장은 여러 개의 key=value; 조합입니다. 예: key=value;key=value;

• 예: user=pm@juxi.com;pwd=juxi;cmd=full;gnss=gps+bd;lat=60.0;lon=55.0;alt=0;

• 구체적인 key와 value 정의는 아래 표와 같습니다

| 키워드(Key) | 값(value)   | 필수/선택 | 비고                                                         |
| ----------- | ----------- | ------ | ------------------------------------------------------------ |
| **user**    | 문자열      | 필수   | 사용자 이름. 사용자 이름은 유효한 이메일 주소로 하는 것을 강력히 권장합니다. 중요한 AGNSS 서버 유지보수 정보가 해당 이메일로 전송됩니다. |
| **pwd**     | 문자열      | 필수   | 사용자 비밀번호                                              |
| **gnss**    | 문자열      | 선택   | 쉼표로 구분된 GNSS 목록이며, 현재는 GPS를 지원합니다. 유효한 값은: gps,bds,glo ”gnss=gps;”는 GPS 보조 정보를 요청함을 나타냅니다; gnss=gps,bds;”는 GPS와 BDS 보조 정보를 요청함을 나타냅니다; |
| **cmd**     | 문자열      | 선택   | full:전체 정보. 에페메리스, 추정 시간과 위치 포함eph:에페메리스 정보만 제공aid:보조 시간, 위치 등의 정보이 항목을 입력하지 않으면 기본값은 full |
| **lat**     | 숫자        | 선택   | 사용자 위치 위도의 추정값. 위도의 단위: 도. 값 범위는 -90~90도입니다. 두 가지 위치 보조 형식, 즉 위도 경도 고도 형식과 ECEF 형식 중 하나를 선택합니다. 유효한 위도 경도 고도 위치 보조 형식은 ”lat=30;lon=120.3;alt=100;”이며, 세 개의 필드가 모두 완전해야 합니다. |
| **lon**     | 숫자        | 선택   | 사용자 위치 경도의 추정값. 경도의 단위: 도. 값 범위는 -180~180도입니다. |
| **alt**     | 숫자        | 선택   | 사용자 위치 고도의 추정값. 단위:미터.                        |
| **x**       | 숫자        | 선택   | 사용자 위치(ECEF 좌표계에서의 X,Y,Z)의 추정값. 단위:미터. 유효한 ECEF 위치 보조 형식은 ”x=30000;y=1111120.3;z=3345100;”이며, 세 개의 필드가 모두 완전해야 합니다. |
| **y**       | 숫자        | 선택   | 사용자 위치(ECEF 좌표계에서의 X,Y,Z)의 추정값. 단위:미터.     |
| **z**       | 숫자        | 선택   | 사용자 위치(ECEF 좌표계에서의 X,Y,Z)의 추정값. 단위:미터.     |
| **pacc**    | 숫자        | 선택   | 사용자 위치의 정확도. 단위는 미터입니다.                     |

2.5. **서버 반환 정보**

![그림 2](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/2.png) 

• AGNSS 서버가 반환하는 데이터 예: 데이터 헤더 + 보조 데이터 내용

• 바이너리 데이터는 GNSS 수신기에 필요한 보조 데이터이며, 이 바이너리 데이터에는 모두 데이터 검증이 포함되어 있습니다. 바이너리 데이터 형식은 中科微의 수신기 프로토콜 규격을 참조하십시오.

• 데이터 헤더도 GNSS 수신기에 전송하더라도 GNSS 수신기에 영향을 주지 않습니다.

2.6. **AGNSS 성능 비교**

• 일반적인 독립형 GNSS 수신기에 비해 AGNSS 수신기는 TTFF 성능이 현저히 향상되었으며, 특히 약한 신호 조건에서 두드러집니다.

![그림 3](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/3.jpg) 

2.7. **주의 사항**

• 대략적인 위치 보조는 사용자 측이 다른 방식으로 획득해야 합니다. 예를 들어

–GSM/GPRS/3G 통신 모듈. 이러한 모듈은 모두 CELL ID 방식을 이용하여 현재의 대략적인 위치를 획득할 수 있습니다

–WiFi 등 기타 무선 모듈로도 대략적인 측위가 가능합니다

• 대략적인 위치의 정밀도는 15km 이내가 요구되며, 잘못된 위치 보조는 수신기의 성능에 영향을 줍니다

• 대략적인 위치를 획득할 수 없는 경우, AGNSS 요청 문장에서 위치 필드(lat,lon,alt,x,y,z)를 생략하면 수신기가 과거 측위의 유효한 위치를 자동으로 선택합니다

• GNSS 수신기 자체가 출력하는 위치를 대략적인 위치로 삼을 필요는 없습니다

2.8. **언제 AGNSS가 필요한가**

• 매번 부팅할 때마다 서버에서 다운로드할 필요가 없어 트래픽을 절약합니다

–中科微의 칩 내부에는 배터리 백업 SRAM 및 영구 백업 FLASH가 있으며, 모두 수신한 에페메리스 데이터 등을 자동으로 저장할 수 있습니다

–칩은 정상 동작 중에 끊임없이 위성으로부터 최신 에페메리스 데이터를 다운로드합니다

• 수신기의 상태를 조회하여 서버에서 AGNSS 데이터를 다운로드할 필요가 있는지 판단합니다

–수신기는 항법 메시지 상태 문장을 출력할 수 있습니다(기본적으로 출력되지 않으며, 설정해야 출력됩니다)

2.9. **항법 메시지 상태 문장 소개**

![그림 4](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/4.png) 

![그림 5](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/5.png) 

• 이 문장이 출력하는 것은 현재 수신기 내부의 시간 + 항법 메시지 상태입니다.

• 명령 $PCAS03,,,,,,,,,,,1*1F를 전송하면 매초 한 번 항법 메시지 상태 문장을 출력합니다

• 명령 $PCAS03,,,,,,,,,,,0*1E를 전송하면 항법 메시지 상태 문장 출력을 중지합니다

• 주의: 각 문장 뒤에는 반드시 \r\n으로 끝나야 합니다(0x0D,0x0A). 문장에는 11개의 쉼표가 있습니다

• 시간 플래그가 유효(0이 아님)하고 유효한 에페메리스 수가 많으면(8개 초과) AGNSS 에페메리스를 다운로드할 필요가 없습니다.

 

**3. 사전 준비**

**3.1. 배선**

GPS 모듈은 UART 통신 또는 USB 통신을 사용하며, 여기서는 USB 통신을 예로 듭니다.

![그림 6](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/6.png)

type-c 케이블로 Raspberry Pi와 GPS 모듈을 연결하고, 명령 ls /dev | grep 'ttyUSB' 을 실행하면 GPS 모듈이 USB0로 인식되는 것을 확인할 수 있습니다

![그림 7](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/7.png) 

**3.2. 百度地图 ak 신청**

문서 [百度地图 api 신청 튜토리얼](./RaspberryPi-Baidu-Map-API.md)를 참조하십시오

 

**4. 프로그램**

이번 과정의 프로그램은 다음을 참조하십시오: GPS-agnss.py

USB를 초기화합니다:

![그림 8](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/8.jpg) 

자료의 ak에는 자신이 신청한 ak 값을 기입해야 하며, 그러면 百度地图를 통해 현재의 대략적인 위도 경도 정보를 얻을 수 있습니다

![그림 9](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/9.jpg) 

여기서는 百度地图에서 획득한 대략적인 위도 경도 정보를 서버로 전송합니다. 우리가 사용하는 로그인 계정은 钜犀 공식 계정입니다. 획득이 완료된 후 전체 패킷을 모듈에 전송합니다

![그림 10](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/10.jpg) 

![그림 11](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/11.jpg) 

위치 정보 획득 및 분석 함수입니다. 아래 그림에서는 위치 정보 중 GNGGA로 시작하는 위치 정보를 추출한 후, 데이터를 분석하여 각 전역 변수에 저장합니다.

![그림 12](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/12.jpg) 

![그림 13](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/13.jpg) 

같은 방법으로 GNVTG의 방위 정보를 획득하여 분석합니다.

![그림 14](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/14.jpg) 

분석된 데이터를 반복 출력합니다

![그림 15](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/15.jpg) 

**5.프로그램 실행**

터미널에 sudo python2 GPS-agnss.py를 입력하여 프로그램을 실행합니다.

**6.실험 현상**

**주의, 보조 측위에서는 Raspberry Pi가 반드시 네트워크에 연결되어야 합니다.**

모듈은 약한 신호 환경에서 전원이 인가되면 USB 초기화를 시작하고, 초기화에 성공하면 "GPS Serial Opened! Baudrate=9600"이 표시되며, 그렇지 않으면 "GPS Serial Open Failed!"가 표시됩니다. 오류가 있으면 배선 또는 USB 포트를 확인해야 합니다.

이후 "GPS Agnss start"가 표시되며 보조 측위 정보를 서버로 전송하기 시작하고, 전송 완료 후 "GPS Agnss success"가 표시됩니다

전송 후 일정 시간 동안 아직 GPS 신호를 읽지 못한 경우, 이때 "GPS no found"가 표시되고 百度地图에서 읽은 대략적인 위도 경도 정보가 출력됩니다.

![그림 16](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/16.jpg) 

얼마 후 GPS를 인식하면 위치와 방위 정보를 반복 출력합니다.

![그림 17](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/17.jpg) 

Ctrl+C를 눌러 정보 읽기를 종료합니다.

![그림 18](../../../../../public/images/tutorials/sensors/gps/RaspberryPi-AGNSS/18.jpg)

<RelatedProducts slugs="gps-beidou-module" />
