---
title: Produkte — Roboterarme, Jetson-Kits & Sensoren
description: "Juxi Technology Produktzentrum — Roboterarme, Hände, Sensoren und Zubehör"
keywords: ["Robotersysteme", "KI-Computing & Vision", "Sensoren & Positionierung", "Zubehör & Werkzeuge", "Roboterarm", "Jetson", "LeRobot"]
aside: false
sidebar: false
outline: false
prev: false
next: false
---

<!-- 本文件由 scripts/gen-products-index.mjs 生成,请勿手改(数据源:docs/.vitepress/products-data.mjs) -->

# Produkte

<p class="hero-subtitle">Von Open-Source-Roboterarmen bis zu NVIDIA Jetson Edge-KI — Handbücher, Spezifikationen und Tutorials für jede Juxi-Technology-Hardware an einem Ort, mit direktem Link zum offiziellen Shop.</p>

<p class="hub-filters">
  <button class="hub-chip active" aria-pressed="true" data-filter="all" @click="applyFilter('all')">Alle</button>
  <button class="hub-chip" aria-pressed="false" data-filter="robot" @click="applyFilter('robot')">Robotersysteme</button>
  <button class="hub-chip" aria-pressed="false" data-filter="compute-vision" @click="applyFilter('compute-vision')">KI-Computing & Vision</button>
  <button class="hub-chip" aria-pressed="false" data-filter="sensor" @click="applyFilter('sensor')">Sensoren & Positionierung</button>
  <button class="hub-chip" aria-pressed="false" data-filter="accessory" @click="applyFilter('accessory')">Zubehör & Werkzeuge</button>
</p>

## Robotersysteme

<div class="product-grid">
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/de/products/so-arm101')" class="pc-link">
      <img :src="withBase('/images/categories/SO-ARM101.png')" alt="SO-ARM101 Entwicklungs-Kit" loading="lazy">
      <span class="pc-title">SO-ARM101 Entwicklungs-Kit</span>
      <p class="pc-desc">Open-Source-Roboterarm mit 6 DOF; nativ im LeRobot-Ökosystem — Teleoperation, Datenerfassung und Imitation Learning aus einer Hand.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/so-arm101-developers-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=so-arm101" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/de/products/so-arm101-7dof')" class="pc-link">
      <img :src="withBase('/images/categories/SO-ARM101-7DOF.png')" alt="SO-ARM101 7-DOF-Roboterarm" loading="lazy">
      <span class="pc-title">SO-ARM101 7-DOF-Roboterarm</span>
      <p class="pc-desc">Das klassische 6-Achsen-Design plus 90°-Handgelenk-Gierung; 12V-Bus-Servos, ab Werk montiert, inklusive kompletter Tutorial-Reihe.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/so-arm101-open-source-7-dof-robotic-arm?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=so-arm101-7dof" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/de/products/amazinghand')" class="pc-link">
      <img :src="withBase('/images/categories/AmazingHand.png')" alt="AmazingHand 4-Finger-Greifhand" loading="lazy">
      <span class="pc-title">AmazingHand 4-Finger-Greifhand</span>
      <p class="pc-desc">Open-Source-4-Finger-Greifhand: TTL-Bussteuerung und offene CAD-Dateien — gebaut für die Embodied-Intelligence- und HRI-Forschung.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/amazinghand?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=amazinghand" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/de/products/xlerobot')" class="pc-link">
      <img :src="withBase('/images/categories/XLeRobot.png')" alt="XLeRobot Zweiarm-Mobilroboter" loading="lazy">
      <span class="pc-title">XLeRobot Zweiarm-Mobilroboter</span>
      <p class="pc-desc">Zweiarm-Mobilroboter: zwei SO-ARM101-Arme auf Omnidirektionalrad-Fahrgestell; als Fertigbaugruppe oder Bausatz erhältlich, voll kompatibel mit dem LeRobot-Ökosystem.</p>
    </a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/de/products/lekiwi')" class="pc-link">
      <img :src="withBase('/images/categories/Lekiwi.png')" alt="Lekiwi Embodied-Intelligence-Mobileroboter" loading="lazy">
      <span class="pc-title">Lekiwi Embodied-Intelligence-Mobileroboter</span>
      <p class="pc-desc">Kostengünstige Embodied-Intelligence-Mobilplattform mit omnidirektionaler Basis und Lehr-Roboterarm — der erschwingliche Einstieg in LeRobot.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/lekiwi-embodied-intelligence-mobile-robotic-car?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=lekiwi" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/de/products/tpu-flexible-gripper')" class="pc-link">
      <img :src="withBase('/images/categories/TPU-Gripper.png')" alt="SO-ARM101 TPU-Flex-Greifer" loading="lazy">
      <span class="pc-title">SO-ARM101 TPU-Flex-Greifer</span>
      <p class="pc-desc">Flexibler TPU-Greifer für das sichere Greifen unregelmäßiger und zerbrechlicher Objekte, optional mit Armkamera.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/so-arm101-tpu-flexible-gripper?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=tpu-flexible-gripper" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/de/products/robot-vision-kit')" class="pc-link">
      <img :src="withBase('/images/categories/Robot-Vision-Kit.png')" alt="SO-ARM101 Robotik-Visions-Kit" loading="lazy">
      <span class="pc-title">SO-ARM101 Robotik-Visions-Kit</span>
      <p class="pc-desc">Montage am Handgelenk, seitlich oder in Draufsicht; 60FPS-Fixfokus oder Autofokus-Zoom zur Wahl — kompatibel mit ACT, SmolVLA, Pi0 und GR00T.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/so-arm101-wrist-camera-mount?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=robot-vision-kit" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/de/products/overhead-camera-mount')" class="pc-link">
      <img :src="withBase('/images/categories/Overhead-Camera-Mount.png')" alt="SO-ARM101 Overhead-Kamera-Halterung" loading="lazy">
      <span class="pc-title">SO-ARM101 Overhead-Kamera-Halterung</span>
      <p class="pc-desc">Overhead-Halterung für die Datenerfassung, RealSense-kompatibel — ein blinder Fleck weniger beim Vision-Training des Roboterarms.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/overhead-camera-mount-for-so-arm100-so-arm101-realsense-compatible?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=overhead-camera-mount" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/de/products/servo-driver-board')" class="pc-link">
      <img :src="withBase('/images/categories/Servo-Driver-Board.png')" alt="JUXI-Bus-Servo-Treiberplatine" loading="lazy">
      <span class="pc-title">JUXI-Bus-Servo-Treiberplatine</span>
      <p class="pc-desc">Treibt bis zu 253 Bus-Servos über einen einzigen Bus, Type-C Plug-and-Play — speziell für LeRobot SO-ARM entwickelt.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/bus-servo-driver-board?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=servo-driver-board" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/de/products/pincopen')" class="pc-link">
      <img :src="withBase('/images/categories/PincOpen.png')" alt="PincOpen-Open-Source-Parallelgreifer" loading="lazy">
      <span class="pc-title">PincOpen-Open-Source-Parallelgreifer</span>
      <p class="pc-desc">PincOpen Open-Source-Parallelgreifer— robotisches Greifen für alle zugänglich machen!</p>
    </a>
    <a href="https://www.juxitech.com/de/products/pincopen-open-source-parallel-gripper?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=pincopen" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/de/products/so-arm101-amazinghand')" class="pc-link">
      <img :src="withBase('/images/categories/SO-ARM101-AmazingHand.png')" alt="SO-ARM101 & AmazingHand Open-Source-Roboterarm mit Mehrfingerhand" loading="lazy">
      <span class="pc-title">SO-ARM101 & AmazingHand Open-Source-Roboterarm mit Mehrfingerhand</span>
      <p class="pc-desc">Das SO-ARM101 & AmazingHand ist eine komplette Open-Source-Plattform für verkörperte KI, die den 6-Achsen-Roboterarm SO-ARM101 mit der 8-DOF-Vierfinger-Hand AmazingHand kombiniert.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/so-arm101-amazinghand-open-source-dexterous-hand-robotic-arm?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=so-arm101-amazinghand" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
</div>

## KI-Computing & Vision

<div class="product-grid">
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/de/products/jetson-agx-orin-devkit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-AGX-Orin.png')" alt="Jetson AGX Orin Developer Kit (64GB)" loading="lazy">
      <span class="pc-title">Jetson AGX Orin Developer Kit (64GB)</span>
      <p class="pc-desc">275-TOPS-Flaggschiff-Kit für Edge-KI; ab Werk vorgeflasht und sofort einsatzbereit, mit vollständiger JetPack-7.2-Dokumentation.</p>
    </a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/de/products/jetson-orin-nano-devkit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-Orin-Nano.png')" alt="Jetson Orin Nano Super Developer Kit (8GB)" loading="lazy">
      <span class="pc-title">Jetson Orin Nano Super Developer Kit (8GB)</span>
      <p class="pc-desc">Edge-KI der Einstiegsklasse mit 67 TOPS und 8 GB Unified Memory; vom ersten Flashen bis zur agentischen KI durchgängig dokumentiert.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/nvidia-jetson-orin-nano-super-development-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=jetson-orin-nano-devkit" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/de/products/jetson-orin-nx-super-kit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-Orin-NX.png')" alt="Jetson Orin NX Super Developer Kit" loading="lazy">
      <span class="pc-title">Jetson Orin NX Super Developer Kit</span>
      <p class="pc-desc">117/157-TOPS-Edge-Plattform mit vorinstalliertem Ubuntu 22.04 und 256 GB NVMe — große Modelle sofort an der Edge trainieren.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/nvidia-jetson-orin-nx-super-developer-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=jetson-orin-nx-super-kit" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/de/products/realsense-depth-camera')" class="pc-link">
      <img :src="withBase('/images/categories/RealSense-D435i.png')" alt="3D-RealSense-Tiefenkamera" loading="lazy">
      <span class="pc-title">3D-RealSense-Tiefenkamera</span>
      <p class="pc-desc">D435i, D405 oder D405CB zur Wahl; hochpräzise Tiefenwahrnehmung für XLeRobot und SO-ARM101.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/3d-realsense-depth-camera?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=realsense-depth-camera" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/de/products/esp32-s3-wifi-module')" class="pc-link">
      <img :src="withBase('/images/categories/ESP32-NanoCam.png')" alt="ESP32-S3 WiFi-Videomodul" loading="lazy">
      <span class="pc-title">ESP32-S3 WiFi-Videomodul</span>
      <p class="pc-desc">2MP-Kamera mit WiFi-Liveübertragung und 8 integrierten KI-Visionsmodi — die leichtgewichtige Ego-Perspektive für jeden Roboter.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/esp32-s3-wifi-video-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=esp32-s3-wifi-module" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/de/products/imx219-csi-camera')" class="pc-link">
      <img :src="withBase('/images/categories/CSI-Camera.png')" alt="79° IMX219 CSI-Kamera" loading="lazy">
      <span class="pc-title">79° IMX219 CSI-Kamera</span>
      <p class="pc-desc">Natives CSI für den direkten Anschluss an den Jetson; 77° Sichtfeld, niedrige Latenz — Edge-Vision mit starkem Preis-Leistungs-Verhältnis.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/79-imx219-csi-camera?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=imx219-csi-camera" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/de/products/usb-auto-focus-camera')" class="pc-link">
      <img :src="withBase('/images/categories/USB-AutoFocus-Camera.png')" alt="USB-Kamera mit Autofokus" loading="lazy">
      <span class="pc-title">USB-Kamera mit Autofokus</span>
      <p class="pc-desc">1080P-Kamera mit 86°-Weitwinkel, treiberfrei — Plug-and-Play unter Windows, Linux, Jetson und Raspberry Pi.</p>
    </a>
  </div>
</div>

## Sensoren & Positionierung

<div class="product-grid">
  <div class="product-card" data-cat="sensor">
    <a :href="withBase('/de/products/imu-module')" class="pc-link">
      <img :src="withBase('/images/categories/IMU.png')" alt="IMU Hochpräzisions-Trägheitsnavigationsmodul" loading="lazy">
      <span class="pc-title">IMU Hochpräzisions-Trägheitsnavigationsmodul</span>
      <p class="pc-desc">100Hz-Attitüdenberechnung, 6/9/10-Achsen-Optionen, IIC + UART; ROS-Integration ab Werk.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/imu-module-ahrs-attitude-and-heading-angle-sensor?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=imu-module" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
  <div class="product-card" data-cat="sensor">
    <a :href="withBase('/de/products/gps-beidou-module')" class="pc-link">
      <img :src="withBase('/images/categories/GPS.png')" alt="GPS- & Beidou-GNSS-Positionsmodul" loading="lazy">
      <span class="pc-title">GPS- & Beidou-GNSS-Positionsmodul</span>
      <p class="pc-desc">Vier-Konstellationen-Positionierung mit 2.5m Genauigkeit, ROS-ready — die erste Wahl für den Einstieg in die Outdoor-Lokalisierung von Robotern.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/gps-beidou-gnss-positioning-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=gps-beidou-module" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
  <div class="product-card" data-cat="sensor">
    <a :href="withBase('/de/products/heart-rate-spo2')" class="pc-link">
      <img :src="withBase('/images/categories/Heart-Rate-SpO2.png')" alt="Herzfrequenz-&-SpO2-Sensormodul" loading="lazy">
      <span class="pc-title">Herzfrequenz-&-SpO2-Sensormodul</span>
      <p class="pc-desc">Herzfrequenz- & SpO2-Sensormodul — Präzisionserkennung | Direkte Herzfrequenz- & SpO2-Ausgabe | Multiplattform-kompatibel</p>
    </a>
    <a href="https://www.juxitech.com/de/products/heart-rate-spo2-sensor-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=heart-rate-spo2" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
</div>

## Zubehör & Werkzeuge

<div class="product-grid">
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/de/products/ai-voice-module')" class="pc-link">
      <img :src="withBase('/images/categories/AI-Voice-Module.png')" alt="AI-Sprachinteraktionsmodul" loading="lazy">
      <span class="pc-title">AI-Sprachinteraktionsmodul</span>
      <p class="pc-desc">110+ Offline-Befehle, 99 % Erkennungsrate im Umkreis von 5 m; Anbindung per UART/IIC an Arduino, Jetson und Raspberry Pi.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/ai-voice-recognition-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=ai-voice-module" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/de/products/kws-voice-module')" class="pc-link">
      <img :src="withBase('/images/categories/KWS-Voice-Module.png')" alt="KWS-Sprachinteraktionsmodul" loading="lazy">
      <span class="pc-title">KWS-Sprachinteraktionsmodul</span>
      <p class="pc-desc">Wake-Word-Erkennung für Chinesisch und Englisch mit Open-Source-Firmware; UART-Ausgabe plus RViz2-Visualisierung.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/usb-kws-voice-interaction-module-english-translation-for-independent-station?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=kws-voice-module" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/de/products/usb-sound-card')" class="pc-link">
      <img :src="withBase('/images/categories/AI_SoundCard.png')" alt="USB Soundkarte ohne Treiber" loading="lazy">
      <span class="pc-title">USB Soundkarte ohne Treiber</span>
      <p class="pc-desc">Treiberfreie Soundkarte mit Onboard-Mikrofon und Lautsprecher — das letzte Puzzleteil für die Sprachinteraktion mit Raspberry Pi und Jetson.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/usb-2-0-driver-free-sound-card-onboard-mic-speaker-for-ai-voice-interaction?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=usb-sound-card" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/de/products/2dof-gimbal')" class="pc-link">
      <img :src="withBase('/images/categories/2DOF-Gimbal.png')" alt="2-DOF-Servo-Pan-Tilt-Einheit" loading="lazy">
      <span class="pc-title">2-DOF-Servo-Pan-Tilt-Einheit</span>
      <p class="pc-desc">2-DOF-Pan-Tilt-Einheit mit 2MP-Kamera; Farbverfolgung, Gesichtserkennung und Auto-Follow — eigene Weiterentwicklung in reinem Python.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/2-dof-servo-pan-tilt-unit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=2dof-gimbal" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/de/products/4k-hdmi-capture')" class="pc-link">
      <img :src="withBase('/images/categories/4K-HDMI-Capture.png')" alt="4K-HDMI-Capture-Karte" loading="lazy">
      <span class="pc-title">4K-HDMI-Capture-Karte</span>
      <p class="pc-desc">4K-Capture über HDMI/DP mit direktem USB-Anschluss — Live-Streaming, Bildschirmaufzeichnung und Vision-Datenerfassung.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/4k-hd-hdmi-capture-card?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=4k-hdmi-capture" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/de/products/feetech-servo')" class="pc-link">
      <img :src="withBase('/images/categories/Feetech-Servo.png')" alt="Feetech-Bus-Servos (SCS0009 / STS3215)" loading="lazy">
      <span class="pc-title">Feetech-Bus-Servos (SCS0009 / STS3215)</span>
      <p class="pc-desc">Zwei Bus-Servo-Modelle SCS0009 und STS3215, mit Magnetencoder- oder Potentiometer-Version, inklusive Debug-Tools für den Host-PC.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/feetech-serial-bus-servo-sts3215-scs0009?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=feetech-servo" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/de/products/kvm-switch')" class="pc-link">
      <img :src="withBase('/images/categories/KVM-Switch.png')" alt="4-in-1-KVM-Switch" loading="lazy">
      <span class="pc-title">4-in-1-KVM-Switch</span>
      <p class="pc-desc">4-in-1-KVM mit TTL-Serial und Bluetooth-Erweiterung; Mehrgeräte-Umschaltung per Tastendruck — das Effizienz-Tool für den Roboter-Arbeitsplatz.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/4-in-1-kvm-switch-hub-ttl-serial-bluetooth-docking-station?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=kvm-switch" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/de/products/jetson-orin-radiator')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-Orin-Radiator.png')" alt="Jetson Orin Kühlkörper" loading="lazy">
      <span class="pc-title">Jetson Orin Kühlkörper</span>
      <p class="pc-desc">Der Jetson Orin Radiator ist eine leistungsstarke Ganzmetall-Kühllösung, die speziell für die Entwickler-Kits NVIDIA Jetson Orin NX SUPER und Jetson Orin Nano SUPER entwickelt wurde.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/jetson-orin-radiator?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=jetson-orin-radiator" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/de/products/feetech-scs0009-servo')" class="pc-link">
      <img :src="withBase('/images/categories/Feetech-SCS0009.png')" alt="FEETECH SCS0009 Serienbus-Servo" loading="lazy">
      <span class="pc-title">FEETECH SCS0009 Serienbus-Servo</span>
      <p class="pc-desc">Dieser FEETECH-SCS0009-Serienbus-Servo ist ein Roboteraktor, der für die geschickten Hände der AmazingHand angepasst wurde.</p>
    </a>
    <a href="https://www.juxitech.com/de/products/feetech-scs0009-serial-bus-servo?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=feetech-scs0009-servo" target="_blank" rel="noopener" class="pc-buy">Kaufen</a>
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

.vp-doc .hero-subtitle {
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
.vp-doc .hub-filters {
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
/* 卡片内 a/p 元素样式须 .vp-doc 前缀:主题 .vp-doc a / .vp-doc p(0,1,1)会以
   品牌蓝+下划线,或 margin:16px 0(清掉左右间距)压过单类选择器(0,1,0) */
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
.vp-doc .pc-desc {
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
