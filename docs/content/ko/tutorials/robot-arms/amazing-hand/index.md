---

title: "AmazingHand 로봇 손 사용 튜토리얼"

description: "AmazingHand 오픈소스 로봇 손 완전 튜토리얼: 제품 자료, 카메라 키트, 웹 제스처 인식, MuJoCo 제스처 추적, 인터페이스 제어, Arduino Nano, TTL 및 PWM 디버깅."

---



# AmazingHand 로봇 손 사용 튜토리얼



AmazingHand는 비용 250달러 미만의 오픈소스 인간형 로봇 손 프로젝트로, 로봇 애호가, 연구자 및 개발자를 대상으로 합니다.



## 프로젝트 소개



- **기계 설계**: 8 자유도, 손가락 4개, 각 손가락은 2개 마디 관절이 연동됩니다. 손가락은 병렬 링크 기구로 구동되며 외부 케이블이 없고 모든 액추에이터가 손 내부에 내장되어 있습니다. 3D 프린팅 부품을 사용하며 무게는 약 400g, 비용은 200유로 미만입니다.

- **제어 방식**: Python 시리얼 버스 드라이버(Waveshare 등 하드웨어 지원); Arduino + Feetech TTL Linker 두 가지 방식 중 선택 가능; Python 및 Arduino 예제 코드 제공; 서보 토크 온/오프, 위치 센싱, 온도 모니터링 등 피드백을 지원합니다.

- **풍부한 자료**: 전체 BOM 부품 목록, CAD 파일 및 Onshape 온라인 문서, 조립 튜토리얼과 캘리브레이션 스크립트, 기본 및 고급 데모 예제를 제공하며 역기구학/정기구학을 지원합니다.

- **프로젝트 하이라이트**: Reachy2 등 로봇 손목에 적합; 개방형 설계, 커뮤니티 주도; 향후 계획에는 촉각 센싱, 탄성 관절, 손가락 길이 옵션 및 5손가락 구성이 포함됩니다.



## 튜토리얼 목록



| 내용 | 설명 |
|---|---|
| [제품 자료](./product-info.md) | 제품 사양, BOM, 구조 및 자료 다운로드 |
| [환경 카메라 키트 설치](./Camera-Kit-Installation.md) | 카메라 키트 브래킷 설치 단계 |
| [웹 제스처 인식](./AmazingHand-Web-Control.md) | 온라인 웹 제어 및 로컬 배포 |
| [제스처 추적(MuJoCo 시뮬레이션)](./gesture-tracking/02-Windows.md) | Windows / Linux / Mac 원클릭 배포 실행 |
| [인터페이스 제어 튜토리얼](./AmazingHand-Interface-Control.md) | Python GUI / 명령줄 제어, 좌우손 캘리브레이션 및 프로토콜 |
| [Arduino Nano 사용 튜토리얼](./Arduino-Nano-Tutorial.md) | Nano 보드 배선, 라이브러리 설치 및 데모 프로그램 |
| [TTL 시리얼 서보 디버깅-조립](./AmazingHand-TTL-Debugging.md) | TTL 시리얼 서보 조립 및 디버깅 |
| [PWM 서보 디버깅](./pwm-debugging/01-GUI-Visual-Control.md) | GUI 시각화, 제스처 추적 및 사용 매뉴얼 |



## 자료 다운로드



- [AmazingHand.zip](https://juxitech.feishu.cn/wiki/EoLawIK31i3xNNkVX8WcENGfn2d) — 제스처 추적 원클릭 배포(Windows / Linux / Mac)

- [SCS0009_ServoController.zip](https://juxitech.feishu.cn/wiki/Qp06wpL4HiALsMkWHsKchxvKnJc) — Feetech SCS0009 서보 캘리브레이션 도구

- [AmazingHand 공식 저장소](https://github.com/pollen-robotics/AmazingHand)
- [delivery_package.zip](/downloads/delivery_package.zip) — PWM 버전 배포 패키지（GUI / 제스처 트래킹 / 펌웨어 / 문서）
- [Amazinghand-web.zip](/downloads/Amazinghand-web.zip) — 로컬 배포 패키지
- [Juxi_ServoController.zip](/downloads/Juxi_ServoController.zip) — 서보 디버깅 도구


### 전체 페이지

- [AmazingHand 로봇 손 제품 자료](./product-info.md)
- [환경 카메라 키트 설치](./Camera-Kit-Installation.md)
- [AmazingHand 웹 제어](./AmazingHand-Web-Control.md)
- [Windows 원클릭 배포 실행](./gesture-tracking/02-Windows.md)
- [Linux(Ubuntu) 원클릭 배포 실행](./gesture-tracking/01-Ubuntu.md)
- [Mac 원클릭 배포 실행](./gesture-tracking/03-macOS.md)
- [로봇핸드 공식 예제 실행 튜토리얼](./AmazingHand-Official-Example.md)
- [인터페이스 제어 튜토리얼](./AmazingHand-Interface-Control.md)
- [Arduino Nano 사용 튜토리얼](./Arduino-Nano-Tutorial.md)
- [로봇핸드(TTL 직렬 서보) 디버깅 튜토리얼](./AmazingHand-TTL-Debugging.md)
- [01-GUI 시각화 제어](./pwm-debugging/01-GUI-Visual-Control.md)
- [02-제스처 추적 튜토리얼](./pwm-debugging/02-Gesture-Tracking.md)
- [03-PWM 서보 버전-사용 매뉴얼](./pwm-debugging/03-PWM-Servo-Manual.md)
- [04-시리얼 서보 버전-사용 설명](./pwm-debugging/04-Serial-Servo-Guide.md)
- [전체 워크플로 가이드](./pwm-debugging/05-Full-Workflow-Tutorial.md)


<RelatedProducts slugs="amazinghand" />

