---
title: Productos — Brazos robóticos, kits Jetson y sensores
description: "Centro de productos Juxi Technology — brazos, manos, sensores y accesorios"
keywords: ["Sistemas robóticos", "Cómputo de IA y visión", "Sensores y posicionamiento", "Accesorios y herramientas", "brazo robótico", "Jetson", "LeRobot"]
aside: false
sidebar: false
outline: false
prev: false
next: false
---

<!-- 本文件由 scripts/gen-products-index.mjs 生成,请勿手改(数据源:docs/.vitepress/products-data.mjs) -->

# Productos

<p class="hero-subtitle">De los brazos robóticos open source a la IA perimetral de NVIDIA Jetson: manuales, especificaciones y tutoriales de cada producto de Juxi Technology, todo en un solo lugar y con acceso directo a la tienda oficial.</p>

<p class="hub-filters">
  <button class="hub-chip active" aria-pressed="true" data-filter="all" @click="applyFilter('all')">Todos</button>
  <button class="hub-chip" aria-pressed="false" data-filter="robot" @click="applyFilter('robot')">Sistemas robóticos</button>
  <button class="hub-chip" aria-pressed="false" data-filter="compute-vision" @click="applyFilter('compute-vision')">Cómputo de IA y visión</button>
  <button class="hub-chip" aria-pressed="false" data-filter="sensor" @click="applyFilter('sensor')">Sensores y posicionamiento</button>
  <button class="hub-chip" aria-pressed="false" data-filter="accessory" @click="applyFilter('accessory')">Accesorios y herramientas</button>
</p>

## Sistemas robóticos

<div class="product-grid">
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/es/products/so-arm101')" class="pc-link">
      <img :src="withBase('/images/categories/SO-ARM101.png')" alt="Kit de desarrollo SO-ARM101" loading="lazy">
      <span class="pc-title">Kit de desarrollo SO-ARM101</span>
      <p class="pc-desc">Brazo robótico open source de 6 DOF; ecosistema LeRobot nativo, todo en uno, para teleoperación, recolección de datos y aprendizaje por imitación.</p>
    </a>
    <a href="https://www.juxitech.com/es/products/so-arm101-developers-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=so-arm101" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/es/products/so-arm101-7dof')" class="pc-link">
      <img :src="withBase('/images/categories/SO-ARM101-7DOF.png')" alt="Brazo robótico SO-ARM101 de 7 ejes" loading="lazy">
      <span class="pc-title">Brazo robótico SO-ARM101 de 7 ejes</span>
      <p class="pc-desc">El clásico brazo de 6 ejes más una rotación de muñeca de 90°; servos de bus de 12V, ensamblado de fábrica y serie de tutoriales completa.</p>
    </a>
    <a href="https://www.juxitech.com/es/products/so-arm101-open-source-7-dof-robotic-arm?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=so-arm101-7dof" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/es/products/amazinghand')" class="pc-link">
      <img :src="withBase('/images/categories/AmazingHand.png')" alt="Mano diestra AmazingHand" loading="lazy">
      <span class="pc-title">Mano diestra AmazingHand</span>
      <p class="pc-desc">Mano diestra open source de 4 dedos: control por bus TTL y CAD abierto, diseñada para la investigación en IA corporizada y HRI.</p>
    </a>
    <a href="https://www.juxitech.com/es/products/amazinghand?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=amazinghand" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/es/products/xlerobot')" class="pc-link">
      <img :src="withBase('/images/categories/XLeRobot.png')" alt="Robot móvil de dos brazos XLeRobot" loading="lazy">
      <span class="pc-title">Robot móvil de dos brazos XLeRobot</span>
      <p class="pc-desc">Robot móvil de dos brazos: dos SO-ARM101 sobre un chasis omnidireccional; disponible como kit ensamblado o kit de piezas, totalmente compatible con el ecosistema LeRobot.</p>
    </a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/es/products/lekiwi')" class="pc-link">
      <img :src="withBase('/images/categories/Lekiwi.png')" alt="Robot móvil de inteligencia corporizada Lekiwi" loading="lazy">
      <span class="pc-title">Robot móvil de inteligencia corporizada Lekiwi</span>
      <p class="pc-desc">Plataforma móvil de IA corporizada con gran relación calidad-precio: base omnidireccional + brazo robótico educativo, la opción económica para iniciarse en LeRobot.</p>
    </a>
    <a href="https://www.juxitech.com/es/products/lekiwi-embodied-intelligence-mobile-robotic-car?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=lekiwi" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/es/products/tpu-flexible-gripper')" class="pc-link">
      <img :src="withBase('/images/categories/TPU-Gripper.png')" alt="Pinza flexible TPU SO-ARM101" loading="lazy">
      <span class="pc-title">Pinza flexible TPU SO-ARM101</span>
      <p class="pc-desc">Pinza flexible de TPU para agarrar con seguridad objetos irregulares y frágiles, con cámara opcional montada en el brazo.</p>
    </a>
    <a href="https://www.juxitech.com/es/products/so-arm101-tpu-flexible-gripper?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=tpu-flexible-gripper" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/es/products/robot-vision-kit')" class="pc-link">
      <img :src="withBase('/images/categories/Robot-Vision-Kit.png')" alt="Kit de visión de brazo robótico SO-ARM101" loading="lazy">
      <span class="pc-title">Kit de visión de brazo robótico SO-ARM101</span>
      <p class="pc-desc">Montaje de cámara en muñeca, lateral o cenital, con enfoque fijo a 60FPS o autofoco con zoom; compatible con ACT, SmolVLA, Pi0 y GR00T.</p>
    </a>
    <a href="https://www.juxitech.com/es/products/so-arm101-wrist-camera-mount?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=robot-vision-kit" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/es/products/overhead-camera-mount')" class="pc-link">
      <img :src="withBase('/images/categories/Overhead-Camera-Mount.png')" alt="Soporte de cámara superior SO-ARM101" loading="lazy">
      <span class="pc-title">Soporte de cámara superior SO-ARM101</span>
      <p class="pc-desc">Soporte cenital para captura de datos, compatible con RealSense: elimina puntos ciegos en el entrenamiento visual del brazo robótico.</p>
    </a>
    <a href="https://www.juxitech.com/es/products/overhead-camera-mount-for-so-arm100-so-arm101-realsense-compatible?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=overhead-camera-mount" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/es/products/servo-driver-board')" class="pc-link">
      <img :src="withBase('/images/categories/Servo-Driver-Board.png')" alt="Placa driver de servos de bus JUXI" loading="lazy">
      <span class="pc-title">Placa driver de servos de bus JUXI</span>
      <p class="pc-desc">Controla hasta 253 servos en un solo bus; Type-C plug-and-play, diseñada específicamente para LeRobot SO-ARM.</p>
    </a>
    <a href="https://www.juxitech.com/es/products/bus-servo-driver-board?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=servo-driver-board" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/es/products/pincopen')" class="pc-link">
      <img :src="withBase('/images/categories/PincOpen.png')" alt="Pinza paralela de código abierto PincOpen" loading="lazy">
      <span class="pc-title">Pinza paralela de código abierto PincOpen</span>
      <p class="pc-desc">PincOpen: pinza paralela de código abierto— ¡haciendo accesible el agarre robótico para todos!</p>
    </a>
    <a href="https://www.juxitech.com/es/products/pincopen-open-source-parallel-gripper?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=pincopen" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/es/products/so-arm101-amazinghand')" class="pc-link">
      <img :src="withBase('/images/categories/SO-ARM101-AmazingHand.png')" alt="Brazo robótico SO-ARM101 y AmazingHand con mano diestra de código abierto" loading="lazy">
      <span class="pc-title">Brazo robótico SO-ARM101 y AmazingHand con mano diestra de código abierto</span>
      <p class="pc-desc">El SO-ARM101 y AmazingHand es una plataforma completa de IA encarnada de código abierto que combina el brazo robótico de 6 ejes SO-ARM101 con la mano diestra de cuatro dedos y 8 grados de libertad…</p>
    </a>
    <a href="https://www.juxitech.com/es/products/so-arm101-amazinghand-open-source-dexterous-hand-robotic-arm?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=so-arm101-amazinghand" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
</div>

## Cómputo de IA y visión

<div class="product-grid">
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/es/products/jetson-agx-orin-devkit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-AGX-Orin.png')" alt="Kit de desarrollo Jetson AGX Orin (64GB)" loading="lazy">
      <span class="pc-title">Kit de desarrollo Jetson AGX Orin (64GB)</span>
      <p class="pc-desc">Kit insignia de IA perimetral con 275 TOPS; flasheado de fábrica y listo para usar, con el conjunto completo de documentación de JetPack 7.2.</p>
    </a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/es/products/jetson-orin-nano-devkit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-Orin-Nano.png')" alt="Kit de desarrollo Jetson Orin Nano Super (8GB)" loading="lazy">
      <span class="pc-title">Kit de desarrollo Jetson Orin Nano Super (8GB)</span>
      <p class="pc-desc">IA perimetral de nivel de entrada con 67 TOPS y 8GB de memoria unificada; documentación de todo el proceso, desde el primer flasheo hasta la IA agéntica.</p>
    </a>
    <a href="https://www.juxitech.com/es/products/nvidia-jetson-orin-nano-super-development-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=jetson-orin-nano-devkit" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/es/products/jetson-orin-nx-super-kit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-Orin-NX.png')" alt="Kit de desarrollo Jetson Orin NX Super" loading="lazy">
      <span class="pc-title">Kit de desarrollo Jetson Orin NX Super</span>
      <p class="pc-desc">Plataforma de IA perimetral de 117/157 TOPS con Ubuntu 22.04 y SSD NVMe de 256GB preinstalados; lista para entrenar modelos desde el primer día.</p>
    </a>
    <a href="https://www.juxitech.com/es/products/nvidia-jetson-orin-nx-super-developer-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=jetson-orin-nx-super-kit" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/es/products/realsense-depth-camera')" class="pc-link">
      <img :src="withBase('/images/categories/RealSense-D435i.png')" alt="Cámara de profundidad 3D RealSense" loading="lazy">
      <span class="pc-title">Cámara de profundidad 3D RealSense</span>
      <p class="pc-desc">Elige entre D435i, D405 o D405CB: visión de profundidad de alta precisión para XLeRobot y SO-ARM101.</p>
    </a>
    <a href="https://www.juxitech.com/es/products/3d-realsense-depth-camera?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=realsense-depth-camera" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/es/products/esp32-s3-wifi-module')" class="pc-link">
      <img :src="withBase('/images/categories/ESP32-NanoCam.png')" alt="Módulo de vídeo WiFi ESP32-S3" loading="lazy">
      <span class="pc-title">Módulo de vídeo WiFi ESP32-S3</span>
      <p class="pc-desc">Transmisión de vídeo WiFi en tiempo real con 2MP y 8 modos de visión IA integrados; la vista en primera persona ligera para cualquier robot.</p>
    </a>
    <a href="https://www.juxitech.com/es/products/esp32-s3-wifi-video-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=esp32-s3-wifi-module" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/es/products/imx219-csi-camera')" class="pc-link">
      <img :src="withBase('/images/categories/CSI-Camera.png')" alt="Cámara CSI IMX219 79°" loading="lazy">
      <span class="pc-title">Cámara CSI IMX219 79°</span>
      <p class="pc-desc">Interfaz CSI nativa que conecta directamente con el Jetson; FOV de 77° y baja latencia: la lente con mejor relación calidad-precio para visión en el borde.</p>
    </a>
    <a href="https://www.juxitech.com/es/products/79-imx219-csi-camera?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=imx219-csi-camera" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/es/products/usb-auto-focus-camera')" class="pc-link">
      <img :src="withBase('/images/categories/USB-AutoFocus-Camera.png')" alt="Cámara USB con enfoque automático" loading="lazy">
      <span class="pc-title">Cámara USB con enfoque automático</span>
      <p class="pc-desc">Cámara de 1080P con gran angular de 86° y sin controladores; plug-and-play en Windows, Linux, Jetson y Raspberry Pi.</p>
    </a>
  </div>
</div>

## Sensores y posicionamiento

<div class="product-grid">
  <div class="product-card" data-cat="sensor">
    <a :href="withBase('/es/products/imu-module')" class="pc-link">
      <img :src="withBase('/images/categories/IMU.png')" alt="Módulo IMU inercial de alta precisión" loading="lazy">
      <span class="pc-title">Módulo IMU inercial de alta precisión</span>
      <p class="pc-desc">Cálculo de actitud a 100Hz, opciones de 6/9/10 ejes y comunicación dual IIC + puerto serie; integración con ROS lista para usar.</p>
    </a>
    <a href="https://www.juxitech.com/es/products/imu-module-ahrs-attitude-and-heading-angle-sensor?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=imu-module" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="sensor">
    <a :href="withBase('/es/products/gps-beidou-module')" class="pc-link">
      <img :src="withBase('/images/categories/GPS.png')" alt="Módulo de posicionamiento GNSS GPS y Beidou" loading="lazy">
      <span class="pc-title">Módulo de posicionamiento GNSS GPS y Beidou</span>
      <p class="pc-desc">Posicionamiento conjunto de cuatro constelaciones con precisión de 2.5 m y compatibilidad con ROS: la opción de entrada para localizar robots en exteriores.</p>
    </a>
    <a href="https://www.juxitech.com/es/products/gps-beidou-gnss-positioning-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=gps-beidou-module" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="sensor">
    <a :href="withBase('/es/products/heart-rate-spo2')" class="pc-link">
      <img :src="withBase('/images/categories/Heart-Rate-SpO2.png')" alt="Módulo sensor de frecuencia cardíaca y SpO2" loading="lazy">
      <span class="pc-title">Módulo sensor de frecuencia cardíaca y SpO2</span>
      <p class="pc-desc">Módulo sensor de frecuencia cardíaca y SpO2 — Detección de alta precisión | Salida directa de frecuencia cardíaca y SpO2 | Compatible con múltiples plataformas</p>
    </a>
    <a href="https://www.juxitech.com/es/products/heart-rate-spo2-sensor-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=heart-rate-spo2" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
</div>

## Accesorios y herramientas

<div class="product-grid">
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/es/products/ai-voice-module')" class="pc-link">
      <img :src="withBase('/images/categories/AI-Voice-Module.png')" alt="Módulo de interacción de voz IA" loading="lazy">
      <span class="pc-title">Módulo de interacción de voz IA</span>
      <p class="pc-desc">Más de 110 comandos sin conexión y un 99% de reconocimiento en 5 m; conexión por puerto serie o IIC a Arduino, Jetson y Raspberry Pi.</p>
    </a>
    <a href="https://www.juxitech.com/es/products/ai-voice-recognition-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=ai-voice-module" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/es/products/kws-voice-module')" class="pc-link">
      <img :src="withBase('/images/categories/KWS-Voice-Module.png')" alt="Módulo de interacción por voz KWS" loading="lazy">
      <span class="pc-title">Módulo de interacción por voz KWS</span>
      <p class="pc-desc">Reconocimiento de palabras de activación en chino e inglés con firmware open source; salida por puerto serie y visualización en RViz2.</p>
    </a>
    <a href="https://www.juxitech.com/es/products/usb-kws-voice-interaction-module-english-translation-for-independent-station?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=kws-voice-module" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/es/products/usb-sound-card')" class="pc-link">
      <img :src="withBase('/images/categories/AI_SoundCard.png')" alt="Tarjeta de sonido USB sin controladores" loading="lazy">
      <span class="pc-title">Tarjeta de sonido USB sin controladores</span>
      <p class="pc-desc">Tarjeta de sonido sin controladores con micrófono y altavoz integrados; la pieza que faltaba para la interacción por voz con Raspberry Pi/Jetson.</p>
    </a>
    <a href="https://www.juxitech.com/es/products/usb-2-0-driver-free-sound-card-onboard-mic-speaker-for-ai-voice-interaction?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=usb-sound-card" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/es/products/2dof-gimbal')" class="pc-link">
      <img :src="withBase('/images/categories/2DOF-Gimbal.png')" alt="Unidad pan-tilt de servo de 2 GDL" loading="lazy">
      <span class="pc-title">Unidad pan-tilt de servo de 2 GDL</span>
      <p class="pc-desc">Unidad pan-tilt de dos ejes con cámara de 2MP; seguimiento de color, detección de rostros y seguimiento automático, todo en Python puro.</p>
    </a>
    <a href="https://www.juxitech.com/es/products/2-dof-servo-pan-tilt-unit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=2dof-gimbal" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/es/products/4k-hdmi-capture')" class="pc-link">
      <img :src="withBase('/images/categories/4K-HDMI-Capture.png')" alt="Tarjeta de captura HDMI 4K" loading="lazy">
      <span class="pc-title">Tarjeta de captura HDMI 4K</span>
      <p class="pc-desc">Captura 4K por HDMI/DP con conexión USB directa: streaming en vivo, grabación de pantalla y retorno de datos de visión.</p>
    </a>
    <a href="https://www.juxitech.com/es/products/4k-hd-hdmi-capture-card?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=4k-hdmi-capture" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/es/products/feetech-servo')" class="pc-link">
      <img :src="withBase('/images/categories/Feetech-Servo.png')" alt="Servos de bus Feetech (SCS0009 / STS3215)" loading="lazy">
      <span class="pc-title">Servos de bus Feetech (SCS0009 / STS3215)</span>
      <p class="pc-desc">Servos de bus SCS0009 y STS3215 con versiones de encoder magnético o potenciómetro y herramientas de depuración para PC.</p>
    </a>
    <a href="https://www.juxitech.com/es/products/feetech-serial-bus-servo-sts3215-scs0009?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=feetech-servo" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/es/products/kvm-switch')" class="pc-link">
      <img :src="withBase('/images/categories/KVM-Switch.png')" alt="Conmutador KVM 4 en 1" loading="lazy">
      <span class="pc-title">Conmutador KVM 4 en 1</span>
      <p class="pc-desc">Conmutador KVM 4 en 1 con puerto serie TTL y expansión Bluetooth; cambio de varios dispositivos con un clic, la herramienta de eficiencia para la mesa de depuración de robots.</p>
    </a>
    <a href="https://www.juxitech.com/es/products/4-in-1-kvm-switch-hub-ttl-serial-bluetooth-docking-station?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=kvm-switch" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/es/products/jetson-orin-radiator')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-Orin-Radiator.png')" alt="Radiador Jetson Orin" loading="lazy">
      <span class="pc-title">Radiador Jetson Orin</span>
      <p class="pc-desc">El Jetson Orin Radiator es una solución de refrigeración totalmente metálica de alto rendimiento, diseñada específicamente para los kits de desarrollo NVIDIA Jetson Orin NX SUPER y Jetson Orin…</p>
    </a>
    <a href="https://www.juxitech.com/es/products/jetson-orin-radiator?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=jetson-orin-radiator" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/es/products/feetech-scs0009-servo')" class="pc-link">
      <img :src="withBase('/images/categories/Feetech-SCS0009.png')" alt="Servomotor de bus serie FEETECH SCS0009" loading="lazy">
      <span class="pc-title">Servomotor de bus serie FEETECH SCS0009</span>
      <p class="pc-desc">Este servomotor de bus serie FEETECH SCS0009 es un actuador robótico adaptado a las manos hábiles de AmazingHand.</p>
    </a>
    <a href="https://www.juxitech.com/es/products/feetech-scs0009-serial-bus-servo?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=feetech-scs0009-servo" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
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
