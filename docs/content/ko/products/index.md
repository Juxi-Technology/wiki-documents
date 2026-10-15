---
title: 제품 목록 — 로봇 팔, Jetson 키트 및 센서
description: "Juxi Technology 제품 센터 — 로봇 암, 다지 손, 센서, 액세서리"
keywords: ["로봇 시스템", "AI 컴퓨팅 & 비전", "센서 & 측위", "액세서리 & 도구", "로봇 팔", "Jetson", "LeRobot"]
aside: false
sidebar: false
outline: false
prev: false
next: false
---

<!-- 本文件由 scripts/gen-products-index.mjs 生成,请勿手改(数据源:docs/.vitepress/products-data.mjs) -->

# 제품 목록

<p class="hero-subtitle">오픈소스 로봇 암부터 NVIDIA Jetson 엣지 컴퓨팅까지 — 모든 Juxi Technology 하드웨어의 매뉴얼, 사양과 튜토리얼을 한곳에서 바로 확인할 수 있으며, 공식 스토어 링크도 함께 제공합니다.</p>

<p class="hub-filters">
  <button class="hub-chip active" aria-pressed="true" data-filter="all" @click="applyFilter('all')">전체</button>
  <button class="hub-chip" aria-pressed="false" data-filter="robot" @click="applyFilter('robot')">로봇 시스템</button>
  <button class="hub-chip" aria-pressed="false" data-filter="compute-vision" @click="applyFilter('compute-vision')">AI 컴퓨팅 & 비전</button>
  <button class="hub-chip" aria-pressed="false" data-filter="sensor" @click="applyFilter('sensor')">센서 & 측위</button>
  <button class="hub-chip" aria-pressed="false" data-filter="accessory" @click="applyFilter('accessory')">액세서리 & 도구</button>
</p>

## 로봇 시스템

<div class="product-grid">
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/ko/products/so-arm101')" class="pc-link">
      <img :src="withBase('/images/categories/SO-ARM101.png')" alt="SO-ARM101 개발 키트" loading="lazy">
      <span class="pc-title">SO-ARM101 개발 키트</span>
      <p class="pc-desc">6 자유도 오픈소스 로봇 암; 네이티브 LeRobot 생태계에서 원격 조작, 데이터 수집, 모방 학습을 한 번에 시작하세요.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/so-arm101-developers-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=so-arm101" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/ko/products/so-arm101-7dof')" class="pc-link">
      <img :src="withBase('/images/categories/SO-ARM101-7DOF.png')" alt="SO-ARM101 7축 로봇 암" loading="lazy">
      <span class="pc-title">SO-ARM101 7축 로봇 암</span>
      <p class="pc-desc">클래식 6축 구성에 90° 손목 롤을 더했습니다; 12V 버스 서보, 공장 조립 완료, 완전한 튜토리얼 시리즈 제공.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/so-arm101-open-source-7-dof-robotic-arm?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=so-arm101-7dof" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/ko/products/amazinghand')" class="pc-link">
      <img :src="withBase('/images/categories/AmazingHand.png')" alt="AmazingHand 오픈소스 4손가락 정교 손" loading="lazy">
      <span class="pc-title">AmazingHand 오픈소스 4손가락 정교 손</span>
      <p class="pc-desc">오픈소스 4손가락 정교 손: TTL 버스 제어, 오픈 CAD — 구현 지능과 인간-로봇 상호작용 연구를 위해 설계되었습니다.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/amazinghand?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=amazinghand" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/ko/products/xlerobot')" class="pc-link">
      <img :src="withBase('/images/categories/XLeRobot.png')" alt="XLeRobot 양팔 이동 로봇" loading="lazy">
      <span class="pc-title">XLeRobot 양팔 이동 로봇</span>
      <p class="pc-desc">양팔 이동 로봇: SO-ARM101 두 대를 전방향 섀시에 탑재; 완제품과 부품 키트 두 가지 형태, LeRobot 생태계 완전 호환.</p>
    </a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/ko/products/lekiwi')" class="pc-link">
      <img :src="withBase('/images/categories/Lekiwi.png')" alt="Lekiwi 구현 지능 모바일 로봇" loading="lazy">
      <span class="pc-title">Lekiwi 구현 지능 모바일 로봇</span>
      <p class="pc-desc">가성비 좋은 구현 지능 모바일 플랫폼: 전방향 섀시 + 교육용 로봇 팔, LeRobot 입문을 위한 알뜰한 선택.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/lekiwi-embodied-intelligence-mobile-robotic-car?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=lekiwi" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/ko/products/tpu-flexible-gripper')" class="pc-link">
      <img :src="withBase('/images/categories/TPU-Gripper.png')" alt="SO-ARM101 TPU 플렉서블 그리퍼" loading="lazy">
      <span class="pc-title">SO-ARM101 TPU 플렉서블 그리퍼</span>
      <p class="pc-desc">유연한 TPU 그리퍼로 불규칙하고 깨지기 쉬운 물체를 안전하게 파지, 암 장착 카메라 옵션 제공.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/so-arm101-tpu-flexible-gripper?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=tpu-flexible-gripper" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/ko/products/robot-vision-kit')" class="pc-link">
      <img :src="withBase('/images/categories/Robot-Vision-Kit.png')" alt="SO-ARM101 로봇 팔 비전 키트" loading="lazy">
      <span class="pc-title">SO-ARM101 로봇 팔 비전 키트</span>
      <p class="pc-desc">손목/측면/정면 위 3시점 장착, 60FPS 고정 초점 또는 자동 초점 줌 선택; ACT, SmolVLA, Pi0, GR00T 호환.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/so-arm101-wrist-camera-mount?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=robot-vision-kit" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/ko/products/overhead-camera-mount')" class="pc-link">
      <img :src="withBase('/images/categories/Overhead-Camera-Mount.png')" alt="SO-ARM101 오버헤드 카메라 마운트" loading="lazy">
      <span class="pc-title">SO-ARM101 오버헤드 카메라 마운트</span>
      <p class="pc-desc">정면 위 데이터 수집 마운트, RealSense 호환 — 로봇 팔 비전 학습의 사각지대를 줄여줍니다.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/overhead-camera-mount-for-so-arm100-so-arm101-realsense-compatible?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=overhead-camera-mount" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/ko/products/servo-driver-board')" class="pc-link">
      <img :src="withBase('/images/categories/Servo-Driver-Board.png')" alt="JUXI 버스 서보 드라이버 보드" loading="lazy">
      <span class="pc-title">JUXI 버스 서보 드라이버 보드</span>
      <p class="pc-desc">단일 버스로 서보 253개 구동, Type-C 플러그 앤 플레이; LeRobot SO-ARM 전용 설계.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/bus-servo-driver-board?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=servo-driver-board" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/ko/products/pincopen')" class="pc-link">
      <img :src="withBase('/images/categories/PincOpen.png')" alt="PincOpen 오픈소스 패러럴 그리퍼" loading="lazy">
      <span class="pc-title">PincOpen 오픈소스 패러럴 그리퍼</span>
      <p class="pc-desc">PincOpen 오픈소스 병렬 그리퍼— 로봇 파지를 누구나 쉽게!</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/pincopen-open-source-parallel-gripper?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=pincopen" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/ko/products/so-arm101-amazinghand')" class="pc-link">
      <img :src="withBase('/images/categories/SO-ARM101-AmazingHand.png')" alt="SO-ARM101 & AmazingHand 오픈소스 다지 핸드 로봇 암" loading="lazy">
      <span class="pc-title">SO-ARM101 & AmazingHand 오픈소스 다지 핸드 로봇 암</span>
      <p class="pc-desc">SO-ARM101 & AmazingHand는 SO-ARM101 6축 로봇 암과 AmazingHand 8 자유도 사지 다지 핸드를 결합한 완전한 오픈소스 체화 AI 플랫폼입니다.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/so-arm101-amazinghand-open-source-dexterous-hand-robotic-arm?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=so-arm101-amazinghand" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
</div>

## AI 컴퓨팅 & 비전

<div class="product-grid">
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/ko/products/jetson-agx-orin-devkit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-AGX-Orin.png')" alt="Jetson AGX Orin 개발자 키트(64GB)" loading="lazy">
      <span class="pc-title">Jetson AGX Orin 개발자 키트(64GB)</span>
      <p class="pc-desc">275 TOPS 플래그십 엣지 AI 키트; 사전 플래싱으로 개봉 즉시 사용, 완전한 JetPack 7.2 문서 제공.</p>
    </a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/ko/products/jetson-orin-nano-devkit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-Orin-Nano.png')" alt="Jetson Orin Nano Super 개발자 키트(8GB)" loading="lazy">
      <span class="pc-title">Jetson Orin Nano Super 개발자 키트(8GB)</span>
      <p class="pc-desc">67 TOPS 엔트리급 엣지 AI, 8GB 통합 메모리 탑재; 첫 플래싱부터 에이전트 AI까지 전 과정 문서 제공.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/nvidia-jetson-orin-nano-super-development-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=jetson-orin-nano-devkit" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/ko/products/jetson-orin-nx-super-kit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-Orin-NX.png')" alt="Jetson Orin NX Super 개발 키트" loading="lazy">
      <span class="pc-title">Jetson Orin NX Super 개발 키트</span>
      <p class="pc-desc">117/157 TOPS 엣지 플랫폼, Ubuntu 22.04와 256GB NVMe 사전 설치 — 개봉 즉시 대형 모델 학습이 가능합니다.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/nvidia-jetson-orin-nx-super-developer-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=jetson-orin-nx-super-kit" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/ko/products/realsense-depth-camera')" class="pc-link">
      <img :src="withBase('/images/categories/RealSense-D435i.png')" alt="3D RealSense 깊이 카메라" loading="lazy">
      <span class="pc-title">3D RealSense 깊이 카메라</span>
      <p class="pc-desc">D435i / D405 / D405CB 중 선택; XLeRobot과 SO-ARM101을 위한 고정밀 깊이 비전.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/3d-realsense-depth-camera?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=realsense-depth-camera" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/ko/products/esp32-s3-wifi-module')" class="pc-link">
      <img :src="withBase('/images/categories/ESP32-NanoCam.png')" alt="ESP32-S3 WiFi 영상 모듈" loading="lazy">
      <span class="pc-title">ESP32-S3 WiFi 영상 모듈</span>
      <p class="pc-desc">200만 화소 WiFi 실시간 영상 전송 + 8가지 온보드 AI 비전 모드 — 모든 로봇을 위한 경량 1인칭 시점.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/esp32-s3-wifi-video-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=esp32-s3-wifi-module" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/ko/products/imx219-csi-camera')" class="pc-link">
      <img :src="withBase('/images/categories/CSI-Camera.png')" alt="79° IMX219 CSI 카메라" loading="lazy">
      <span class="pc-title">79° IMX219 CSI 카메라</span>
      <p class="pc-desc">네이티브 CSI 인터페이스로 Jetson 직결; 77° 화각, 저지연 — 엣지 비전의 가성비 렌즈.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/79-imx219-csi-camera?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=imx219-csi-camera" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/ko/products/usb-auto-focus-camera')" class="pc-link">
      <img :src="withBase('/images/categories/USB-AutoFocus-Camera.png')" alt="USB 자동 초점 카메라" loading="lazy">
      <span class="pc-title">USB 자동 초점 카메라</span>
      <p class="pc-desc">1080P 86° 광각, 드라이버 불필요; Windows/Linux/Jetson/라즈베리파이 전 플랫폼 플러그 앤 플레이.</p>
    </a>
  </div>
</div>

## 센서 & 측위

<div class="product-grid">
  <div class="product-card" data-cat="sensor">
    <a :href="withBase('/ko/products/imu-module')" class="pc-link">
      <img :src="withBase('/images/categories/IMU.png')" alt="IMU 고정밀 관성항법 모듈" loading="lazy">
      <span class="pc-title">IMU 고정밀 관성항법 모듈</span>
      <p class="pc-desc">100Hz 자세 연산, 6/9/10축 선택, IIC + 시리얼 이중 통신, ROS 즉시 통합.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/imu-module-ahrs-attitude-and-heading-angle-sensor?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=imu-module" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
  <div class="product-card" data-cat="sensor">
    <a :href="withBase('/ko/products/gps-beidou-module')" class="pc-link">
      <img :src="withBase('/images/categories/GPS.png')" alt="GPS & 北斗 GNSS 측위 모듈" loading="lazy">
      <span class="pc-title">GPS & 北斗 GNSS 측위 모듈</span>
      <p class="pc-desc">4대 위성 시스템 연합 측위, 2.5m 정밀도, ROS 지원 — 야외 로봇 측위 입문을 위한 첫 선택.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/gps-beidou-gnss-positioning-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=gps-beidou-module" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
  <div class="product-card" data-cat="sensor">
    <a :href="withBase('/ko/products/heart-rate-spo2')" class="pc-link">
      <img :src="withBase('/images/categories/Heart-Rate-SpO2.png')" alt="심박수 및 SpO2 센서 모듈" loading="lazy">
      <span class="pc-title">심박수 및 SpO2 센서 모듈</span>
      <p class="pc-desc">심박수 & SpO2 센서 모듈 — 고정밀 감지 | 심박수 & SpO2 직접 출력 | 멀티 플랫폼 호환</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/heart-rate-spo2-sensor-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=heart-rate-spo2" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
</div>

## 액세서리 & 도구

<div class="product-grid">
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/ko/products/ai-voice-module')" class="pc-link">
      <img :src="withBase('/images/categories/AI-Voice-Module.png')" alt="AI 음성 인터랙션 모듈" loading="lazy">
      <span class="pc-title">AI 음성 인터랙션 모듈</span>
      <p class="pc-desc">오프라인 음성 명령어 110+개, 5m 이내 99% 인식률; 시리얼/IIC로 Arduino, Jetson, 라즈베리파이 연결.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/ai-voice-recognition-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=ai-voice-module" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/ko/products/kws-voice-module')" class="pc-link">
      <img :src="withBase('/images/categories/KWS-Voice-Module.png')" alt="KWS 음성 상호작용 모듈" loading="lazy">
      <span class="pc-title">KWS 음성 상호작용 모듈</span>
      <p class="pc-desc">중·영문 웨이크 워드 인식, 펌웨어 오픈소스; 시리얼 출력 + RViz2 시각화.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/usb-kws-voice-interaction-module-english-translation-for-independent-station?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=kws-voice-module" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/ko/products/usb-sound-card')" class="pc-link">
      <img :src="withBase('/images/categories/AI_SoundCard.png')" alt="USB 드라이버 프리 사운드 카드" loading="lazy">
      <span class="pc-title">USB 드라이버 프리 사운드 카드</span>
      <p class="pc-desc">온보드 마이크 + 스피커를 갖춘 드라이버 불필요 사운드 카드 — 라즈베리파이/Jetson 음성 상호작용의 마지막 조각을 채워줍니다.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/usb-2-0-driver-free-sound-card-onboard-mic-speaker-for-ai-voice-interaction?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=usb-sound-card" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/ko/products/2dof-gimbal')" class="pc-link">
      <img :src="withBase('/images/categories/2DOF-Gimbal.png')" alt="2 자유도 서보 팬틸트" loading="lazy">
      <span class="pc-title">2 자유도 서보 팬틸트</span>
      <p class="pc-desc">2축 팬틸트 + 200만 화소 카메라; 색상 추적, 얼굴 검출과 자동 추적을 순수 Python으로 2차 개발.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/2-dof-servo-pan-tilt-unit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=2dof-gimbal" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/ko/products/4k-hdmi-capture')" class="pc-link">
      <img :src="withBase('/images/categories/4K-HDMI-Capture.png')" alt="4K HDMI 캡처 카드" loading="lazy">
      <span class="pc-title">4K HDMI 캡처 카드</span>
      <p class="pc-desc">4K 고화질 캡처, HDMI/DP 다중 인터페이스 USB 직결 — 라이브 방송, 화면 녹화와 비전 데이터 전송.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/4k-hd-hdmi-capture-card?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=4k-hdmi-capture" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/ko/products/feetech-servo')" class="pc-link">
      <img :src="withBase('/images/categories/Feetech-Servo.png')" alt="Feetech 버스 서보(SCS0009 / STS3215)" loading="lazy">
      <span class="pc-title">Feetech 버스 서보(SCS0009 / STS3215)</span>
      <p class="pc-desc">SCS0009 / STS3215 버스 서보 2종, 자기 엔코더·전위차계 버전 구비, 호스트 디버깅 도구 제공.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/feetech-serial-bus-servo-sts3215-scs0009?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=feetech-servo" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/ko/products/kvm-switch')" class="pc-link">
      <img :src="withBase('/images/categories/KVM-Switch.png')" alt="4-in-1 KVM 스위처" loading="lazy">
      <span class="pc-title">4-in-1 KVM 스위처</span>
      <p class="pc-desc">4-in-1 KVM: TTL 시리얼 + 블루투스 확장, 다중 기기 원클릭 전환 — 로봇 디버깅 데스크를 위한 효율 도구.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/4-in-1-kvm-switch-hub-ttl-serial-bluetooth-docking-station?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=kvm-switch" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/ko/products/jetson-orin-radiator')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-Orin-Radiator.png')" alt="Jetson Orin 라디에이터" loading="lazy">
      <span class="pc-title">Jetson Orin 라디에이터</span>
      <p class="pc-desc">Jetson Orin 라디에이터는 NVIDIA Jetson Orin NX SUPER 및 Jetson Orin Nano SUPER 개발 키트 전용으로 설계된 고성능 올메탈 냉각 솔루션입니다.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/jetson-orin-radiator?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=jetson-orin-radiator" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/ko/products/feetech-scs0009-servo')" class="pc-link">
      <img :src="withBase('/images/categories/Feetech-SCS0009.png')" alt="FEETECH SCS0009 시리얼 버스 서보" loading="lazy">
      <span class="pc-title">FEETECH SCS0009 시리얼 버스 서보</span>
      <p class="pc-desc">이 FEETECH SCS0009 시리얼 버스 서보는 AmazingHand 정교한 손에 적용되는 로봇 액추에이터입니다.</p>
    </a>
    <a href="https://www.juxitech.com/ko/products/feetech-scs0009-serial-bus-servo?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=feetech-scs0009-servo" target="_blank" rel="noopener" class="pc-buy">구매</a>
  </div>
</div>

<script setup>
import { withBase } from 'vitepress'

// 分类筛选:纯 DOM 切换(卡片是静态内容,不参与 Vue 重渲染;无 JS 时默认全部可见)
function applyFilter(cat) {
  document.querySelectorAll('.hub-chip').forEach((btn) => {
    const on = btn.dataset.filter === cat
    btn.classList.toggle('active', on)
    btn.setAttribute('aria-pressed', String(on))
  })
  document.querySelectorAll('.product-grid').forEach((grid) => {
    let any = false
    grid.querySelectorAll('.product-card').forEach((cardEl) => {
      const on = cat === 'all' || cardEl.dataset.cat === cat
      cardEl.style.display = on ? '' : 'none'
      if (on) any = true
    })
    grid.style.display = any ? '' : 'none'
    const h2 = grid.previousElementSibling
    if (h2 && h2.tagName === 'H2') h2.style.display = any ? '' : 'none'
  })
}
</script>

<style>

.hero-subtitle {
  font-size: 19px;
  line-height: 1.8;
  margin: 8px auto 8px;
  max-width: 780px;
  color: var(--vp-c-text-2);
  display: block;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 20px;
  margin: 24px 0 48px 0;
}
.hub-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin: 18px 0 6px;
}
.hub-chip {
  padding: 6px 16px;
  border: 1px solid var(--vp-c-gutter);
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 14px;
  line-height: 1.4;
  cursor: pointer;
  transition: border-color 0.2s, background-color 0.2s, color 0.2s;
}
.hub-chip:hover {
  border-color: #1e3a5f;
  color: var(--vp-c-text-1);
}
.hub-chip.active {
  background: #1e3a5f;
  border-color: #1e3a5f;
  color: #ffffff;
}
.product-card {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-gutter);
  border-radius: 12px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  background: var(--vp-c-bg-soft);
}
/* 卡片链接/购买按钮须 .vp-doc 前缀:主题 .vp-doc a(0,1,1)会以品牌蓝+下划线+字重500
   压过单类选择器(0,1,0) */
.vp-doc .pc-link {
  display: block;
  flex: 1;
  text-decoration: none;
  color: inherit;
}
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: var(--vp-c-brand);
}
.product-card img {
  width: 100%;
  height: 150px;
  object-fit: contain;
  padding: 14px 16px 0;
  background: var(--vp-c-bg);
}
.pc-title {
  display: block;
  font-weight: 700;
  font-size: 15px;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  margin: 12px 16px 8px;
}
.pc-desc {
  font-size: 13px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin: 0 16px 16px;
}
.vp-doc .pc-buy {
  align-self: center;
  margin: 0 16px 18px;
  padding: 7px 26px;
  border-radius: 6px;
  background: #1e3a5f;
  color: #ffffff;
  font-size: 13.5px;
  font-weight: 600;
  line-height: 1.4;
  text-decoration: none;
  transition: background-color 0.2s;
}
.vp-doc .pc-buy:hover {
  background: #152a45;
  color: #ffffff;
}
@media (max-width: 767px) {
  .product-grid { grid-template-columns: 1fr; }
}
</style>
