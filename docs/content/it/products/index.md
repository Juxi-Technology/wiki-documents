---
title: Prodotti — Bracci robotici, kit Jetson e sensori
description: "Centro prodotti Juxi Technology — bracci, mani, sensori e accessori"
keywords: ["Sistemi robotici", "Calcolo AI e visione", "Sensori e posizionamento", "Accessori e strumenti", "braccio robotico", "Jetson", "LeRobot"]
aside: false
sidebar: false
outline: false
prev: false
next: false
---

<!-- 本文件由 scripts/gen-products-index.mjs 生成,请勿手改(数据源:docs/.vitepress/products-data.mjs) -->

# Prodotti

<p class="hero-subtitle">Dal braccio robotico open source all'AI edge di NVIDIA Jetson: manuali, specifiche e tutorial per ogni prodotto Juxi Technology in un unico posto, con link diretti al negozio ufficiale.</p>

<p class="hub-filters">
  <button class="hub-chip active" aria-pressed="true" data-filter="all" @click="applyFilter('all')">Tutti</button>
  <button class="hub-chip" aria-pressed="false" data-filter="robot" @click="applyFilter('robot')">Sistemi robotici</button>
  <button class="hub-chip" aria-pressed="false" data-filter="compute-vision" @click="applyFilter('compute-vision')">Calcolo AI e visione</button>
  <button class="hub-chip" aria-pressed="false" data-filter="sensor" @click="applyFilter('sensor')">Sensori e posizionamento</button>
  <button class="hub-chip" aria-pressed="false" data-filter="accessory" @click="applyFilter('accessory')">Accessori e strumenti</button>
</p>

## Sistemi robotici

<div class="product-grid">
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/it/products/so-arm101')" class="pc-link">
      <img :src="withBase('/images/categories/SO-ARM101.png')" alt="Kit di sviluppo SO-ARM101" loading="lazy">
      <span class="pc-title">Kit di sviluppo SO-ARM101</span>
      <p class="pc-desc">Braccio robotico open source a 6 DOF con supporto nativo per l'ecosistema LeRobot: teleoperazione, raccolta dati e apprendimento per imitazione, il tutto pronto all'uso.</p>
    </a>
    <a href="https://www.juxitech.com/it/products/so-arm101-developers-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=so-arm101" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/it/products/so-arm101-7dof')" class="pc-link">
      <img :src="withBase('/images/categories/SO-ARM101-7DOF.png')" alt="Braccio robotico SO-ARM101 7-DOF" loading="lazy">
      <span class="pc-title">Braccio robotico SO-ARM101 7-DOF</span>
      <p class="pc-desc">Il classico braccio a 6 assi più l'imbardata del polso a 90°; servo a bus 12V, assemblaggio in fabbrica e serie completa di tutorial.</p>
    </a>
    <a href="https://www.juxitech.com/it/products/so-arm101-open-source-7-dof-robotic-arm?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=so-arm101-7dof" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/it/products/amazinghand')" class="pc-link">
      <img :src="withBase('/images/categories/AmazingHand.png')" alt="Mano dexterous AmazingHand" loading="lazy">
      <span class="pc-title">Mano dexterous AmazingHand</span>
      <p class="pc-desc">Mano dexterous open source a 4 dita: controllo su bus TTL e CAD aperti, pensata per la ricerca su IA incarnata e HRI.</p>
    </a>
    <a href="https://www.juxitech.com/it/products/amazinghand?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=amazinghand" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/it/products/xlerobot')" class="pc-link">
      <img :src="withBase('/images/categories/XLeRobot.png')" alt="Robot mobile a due bracci XLeRobot" loading="lazy">
      <span class="pc-title">Robot mobile a due bracci XLeRobot</span>
      <p class="pc-desc">Robot mobile a due bracci: due SO-ARM101 su una base omnidirezionale; disponibile assemblato o in kit a pezzi, pienamente compatibile con l'ecosistema LeRobot.</p>
    </a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/it/products/lekiwi')" class="pc-link">
      <img :src="withBase('/images/categories/Lekiwi.png')" alt="Robot mobile a intelligenza incarnata Lekiwi" loading="lazy">
      <span class="pc-title">Robot mobile a intelligenza incarnata Lekiwi</span>
      <p class="pc-desc">Piattaforma mobile a intelligenza incarnata conveniente: base omnidirezionale + braccio didattico, la porta d'ingresso più accessibile all'ecosistema LeRobot.</p>
    </a>
    <a href="https://www.juxitech.com/it/products/lekiwi-embodied-intelligence-mobile-robotic-car?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=lekiwi" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/it/products/tpu-flexible-gripper')" class="pc-link">
      <img :src="withBase('/images/categories/TPU-Gripper.png')" alt="Pinza flessibile in TPU SO-ARM101" loading="lazy">
      <span class="pc-title">Pinza flessibile in TPU SO-ARM101</span>
      <p class="pc-desc">Pinza flessibile in TPU per afferrare in sicurezza oggetti irregolari e fragili, con fotocamera opzionale sul braccio.</p>
    </a>
    <a href="https://www.juxitech.com/it/products/so-arm101-tpu-flexible-gripper?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=tpu-flexible-gripper" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/it/products/robot-vision-kit')" class="pc-link">
      <img :src="withBase('/images/categories/Robot-Vision-Kit.png')" alt="Kit visione braccio robotico SO-ARM101" loading="lazy">
      <span class="pc-title">Kit visione braccio robotico SO-ARM101</span>
      <p class="pc-desc">Montaggio polso, laterale o dall'alto con opzioni 60FPS a fuoco fisso o autofocus zoom; compatibile con ACT, SmolVLA, Pi0 e GR00T.</p>
    </a>
    <a href="https://www.juxitech.com/it/products/so-arm101-wrist-camera-mount?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=robot-vision-kit" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/it/products/overhead-camera-mount')" class="pc-link">
      <img :src="withBase('/images/categories/Overhead-Camera-Mount.png')" alt="Supporto fotocamera overhead SO-ARM101" loading="lazy">
      <span class="pc-title">Supporto fotocamera overhead SO-ARM101</span>
      <p class="pc-desc">Supporto per la raccolta dati dall'alto, compatibile con RealSense: chiude i punti ciechi nell'addestramento visivo del braccio robotico.</p>
    </a>
    <a href="https://www.juxitech.com/it/products/overhead-camera-mount-for-so-arm100-so-arm101-realsense-compatible?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=overhead-camera-mount" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/it/products/servo-driver-board')" class="pc-link">
      <img :src="withBase('/images/categories/Servo-Driver-Board.png')" alt="Scheda driver servo bus JUXI" loading="lazy">
      <span class="pc-title">Scheda driver servo bus JUXI</span>
      <p class="pc-desc">Guida fino a 253 servo su un unico bus; Type-C plug-and-play, progettata appositamente per LeRobot SO-ARM.</p>
    </a>
    <a href="https://www.juxitech.com/it/products/bus-servo-driver-board?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=servo-driver-board" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/it/products/pincopen')" class="pc-link">
      <img :src="withBase('/images/categories/PincOpen.png')" alt="Pinza parallela open source PincOpen" loading="lazy">
      <span class="pc-title">Pinza parallela open source PincOpen</span>
      <p class="pc-desc">PincOpen Pinza parallela open source— rendere la presa robotica accessibile a tutti!</p>
    </a>
    <a href="https://www.juxitech.com/it/products/pincopen-open-source-parallel-gripper?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=pincopen" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/it/products/so-arm101-amazinghand')" class="pc-link">
      <img :src="withBase('/images/categories/SO-ARM101-AmazingHand.png')" alt="Braccio robotico open source SO-ARM101 e AmazingHand con mano destra" loading="lazy">
      <span class="pc-title">Braccio robotico open source SO-ARM101 e AmazingHand con mano destra</span>
      <p class="pc-desc">Il SO-ARM101 & AmazingHand è una piattaforma completa di IA incarnata open source che abbina il braccio robotico a 6 assi SO-ARM101 alla mano multi-dito a 4 dita e 8 gradi di libertà AmazingHand.</p>
    </a>
    <a href="https://www.juxitech.com/it/products/so-arm101-amazinghand-open-source-dexterous-hand-robotic-arm?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=so-arm101-amazinghand" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
</div>

## Calcolo AI e visione

<div class="product-grid">
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/it/products/jetson-agx-orin-devkit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-AGX-Orin.png')" alt="Kit di sviluppo Jetson AGX Orin (64GB)" loading="lazy">
      <span class="pc-title">Kit di sviluppo Jetson AGX Orin (64GB)</span>
      <p class="pc-desc">Kit di sviluppo AI edge di punta da 275 TOPS; preflashato e pronto all'uso, con la documentazione completa di JetPack 7.2.</p>
    </a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/it/products/jetson-orin-nano-devkit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-Orin-Nano.png')" alt="Kit di sviluppo Jetson Orin Nano Super (8GB)" loading="lazy">
      <span class="pc-title">Kit di sviluppo Jetson Orin Nano Super (8GB)</span>
      <p class="pc-desc">AI edge entry-level da 67 TOPS con 8 GB di memoria unificata; documentazione completa dal primo flashing all'IA agentica.</p>
    </a>
    <a href="https://www.juxitech.com/it/products/nvidia-jetson-orin-nano-super-development-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=jetson-orin-nano-devkit" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/it/products/jetson-orin-nx-super-kit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-Orin-NX.png')" alt="Kit di sviluppo Jetson Orin NX Super" loading="lazy">
      <span class="pc-title">Kit di sviluppo Jetson Orin NX Super</span>
      <p class="pc-desc">Piattaforma AI edge da 117/157 TOPS con Ubuntu 22.04 e SSD NVMe 256GB preinstallati: addestra grandi modelli all'edge fin dal primo giorno.</p>
    </a>
    <a href="https://www.juxitech.com/it/products/nvidia-jetson-orin-nx-super-developer-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=jetson-orin-nx-super-kit" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/it/products/realsense-depth-camera')" class="pc-link">
      <img :src="withBase('/images/categories/RealSense-D435i.png')" alt="Fotocamera di profondità 3D RealSense" loading="lazy">
      <span class="pc-title">Fotocamera di profondità 3D RealSense</span>
      <p class="pc-desc">Scegli tra D435i, D405 e D405CB: visione di profondità ad alta precisione per XLeRobot e SO-ARM101.</p>
    </a>
    <a href="https://www.juxitech.com/it/products/3d-realsense-depth-camera?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=realsense-depth-camera" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/it/products/esp32-s3-wifi-module')" class="pc-link">
      <img :src="withBase('/images/categories/ESP32-NanoCam.png')" alt="Modulo video WiFi ESP32-S3" loading="lazy">
      <span class="pc-title">Modulo video WiFi ESP32-S3</span>
      <p class="pc-desc">Trasmissione WiFi in tempo reale a 2MP con 8 modalità di visione AI integrate: una visuale in prima persona leggera per qualsiasi robot.</p>
    </a>
    <a href="https://www.juxitech.com/it/products/esp32-s3-wifi-video-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=esp32-s3-wifi-module" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/it/products/imx219-csi-camera')" class="pc-link">
      <img :src="withBase('/images/categories/CSI-Camera.png')" alt="Fotocamera CSI IMX219 79°" loading="lazy">
      <span class="pc-title">Fotocamera CSI IMX219 79°</span>
      <p class="pc-desc">Interfaccia CSI nativa collegata direttamente a Jetson; FOV 77°, bassa latenza: l'obiettivo dal miglior rapporto qualità-prezzo per la visione edge.</p>
    </a>
    <a href="https://www.juxitech.com/it/products/79-imx219-csi-camera?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=imx219-csi-camera" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/it/products/usb-auto-focus-camera')" class="pc-link">
      <img :src="withBase('/images/categories/USB-AutoFocus-Camera.png')" alt="Fotocamera USB con autofocus" loading="lazy">
      <span class="pc-title">Fotocamera USB con autofocus</span>
      <p class="pc-desc">1080P, grandangolare a 86°, senza driver: plug-and-play su Windows, Linux, Jetson e Raspberry Pi.</p>
    </a>
  </div>
</div>

## Sensori e posizionamento

<div class="product-grid">
  <div class="product-card" data-cat="sensor">
    <a :href="withBase('/it/products/imu-module')" class="pc-link">
      <img :src="withBase('/images/categories/IMU.png')" alt="Modulo IMU inerziale di alta precisione" loading="lazy">
      <span class="pc-title">Modulo IMU inerziale di alta precisione</span>
      <p class="pc-desc">Stima dell'assetto a 100Hz, opzioni a 6/9/10 assi, comunicazione IIC + UART; integrazione ROS pronta all'uso.</p>
    </a>
    <a href="https://www.juxitech.com/it/products/imu-module-ahrs-attitude-and-heading-angle-sensor?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=imu-module" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
  <div class="product-card" data-cat="sensor">
    <a :href="withBase('/it/products/gps-beidou-module')" class="pc-link">
      <img :src="withBase('/images/categories/GPS.png')" alt="Modulo di posizionamento GNSS GPS e Beidou" loading="lazy">
      <span class="pc-title">Modulo di posizionamento GNSS GPS e Beidou</span>
      <p class="pc-desc">Posizionamento con quattro costellazioni e precisione di 2.5 m, ROS-ready: la scelta ideale per iniziare con la localizzazione dei robot all'aperto.</p>
    </a>
    <a href="https://www.juxitech.com/it/products/gps-beidou-gnss-positioning-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=gps-beidou-module" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
  <div class="product-card" data-cat="sensor">
    <a :href="withBase('/it/products/heart-rate-spo2')" class="pc-link">
      <img :src="withBase('/images/categories/Heart-Rate-SpO2.png')" alt="Modulo sensore frequenza cardiaca e SpO2" loading="lazy">
      <span class="pc-title">Modulo sensore frequenza cardiaca e SpO2</span>
      <p class="pc-desc">Modulo sensore frequenza cardiaca & SpO2 — Rilevamento ad alta precisione | Uscita diretta frequenza cardiaca & SpO2 | Compatibile multipiattaforma</p>
    </a>
    <a href="https://www.juxitech.com/it/products/heart-rate-spo2-sensor-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=heart-rate-spo2" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
</div>

## Accessori e strumenti

<div class="product-grid">
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/it/products/ai-voice-module')" class="pc-link">
      <img :src="withBase('/images/categories/AI-Voice-Module.png')" alt="Modulo di interazione vocale IA" loading="lazy">
      <span class="pc-title">Modulo di interazione vocale IA</span>
      <p class="pc-desc">Oltre 110 comandi offline con riconoscimento al 99% entro 5 metri; uscita seriale/IIC per Arduino, Jetson e Raspberry Pi.</p>
    </a>
    <a href="https://www.juxitech.com/it/products/ai-voice-recognition-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=ai-voice-module" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/it/products/kws-voice-module')" class="pc-link">
      <img :src="withBase('/images/categories/KWS-Voice-Module.png')" alt="Modulo di interazione vocale KWS" loading="lazy">
      <span class="pc-title">Modulo di interazione vocale KWS</span>
      <p class="pc-desc">Riconoscimento di parole di attivazione cinese/inglese con firmware open source; uscita seriale + visualizzazione su RViz2.</p>
    </a>
    <a href="https://www.juxitech.com/it/products/usb-kws-voice-interaction-module-english-translation-for-independent-station?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=kws-voice-module" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/it/products/usb-sound-card')" class="pc-link">
      <img :src="withBase('/images/categories/AI_SoundCard.png')" alt="Scheda audio USB senza driver" loading="lazy">
      <span class="pc-title">Scheda audio USB senza driver</span>
      <p class="pc-desc">Scheda audio senza driver con microfono e altoparlante integrati: il tassello finale per l'interazione vocale su Raspberry Pi e Jetson.</p>
    </a>
    <a href="https://www.juxitech.com/it/products/usb-2-0-driver-free-sound-card-onboard-mic-speaker-for-ai-voice-interaction?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=usb-sound-card" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/it/products/2dof-gimbal')" class="pc-link">
      <img :src="withBase('/images/categories/2DOF-Gimbal.png')" alt="Unità pan-tilt servo a 2 DOF" loading="lazy">
      <span class="pc-title">Unità pan-tilt servo a 2 DOF</span>
      <p class="pc-desc">Unità pan-tilt a due assi con fotocamera da 2MP: tracciamento del colore, rilevamento del volto e inseguimento automatico, il tutto in puro Python.</p>
    </a>
    <a href="https://www.juxitech.com/it/products/2-dof-servo-pan-tilt-unit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=2dof-gimbal" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/it/products/4k-hdmi-capture')" class="pc-link">
      <img :src="withBase('/images/categories/4K-HDMI-Capture.png')" alt="Scheda di acquisizione HDMI 4K" loading="lazy">
      <span class="pc-title">Scheda di acquisizione HDMI 4K</span>
      <p class="pc-desc">Acquisizione 4K con ingressi HDMI/DP e collegamento USB diretto: live streaming, registrazione dello schermo e trasmissione di dati visivi.</p>
    </a>
    <a href="https://www.juxitech.com/it/products/4k-hd-hdmi-capture-card?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=4k-hdmi-capture" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/it/products/feetech-servo')" class="pc-link">
      <img :src="withBase('/images/categories/Feetech-Servo.png')" alt="Servo bus Feetech (SCS0009 / STS3215)" loading="lazy">
      <span class="pc-title">Servo bus Feetech (SCS0009 / STS3215)</span>
      <p class="pc-desc">Servo bus SCS0009 e STS3215 in versioni con encoder magnetico o potenziometro, con strumenti di debug host.</p>
    </a>
    <a href="https://www.juxitech.com/it/products/feetech-serial-bus-servo-sts3215-scs0009?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=feetech-servo" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/it/products/kvm-switch')" class="pc-link">
      <img :src="withBase('/images/categories/KVM-Switch.png')" alt="Switch KVM 4-in-1" loading="lazy">
      <span class="pc-title">Switch KVM 4-in-1</span>
      <p class="pc-desc">Switch KVM 4-in-1 con seriale TTL ed espansione Bluetooth: commutazione multi-dispositivo con un clic, lo strumento di produttività per il banco di debug robotico.</p>
    </a>
    <a href="https://www.juxitech.com/it/products/4-in-1-kvm-switch-hub-ttl-serial-bluetooth-docking-station?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=kvm-switch" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/it/products/jetson-orin-radiator')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-Orin-Radiator.png')" alt="Dissipatore Jetson Orin" loading="lazy">
      <span class="pc-title">Dissipatore Jetson Orin</span>
      <p class="pc-desc">Il Jetson Orin Radiator è una soluzione di raffreddamento interamente in metallo ad alte prestazioni, progettata appositamente per i kit di sviluppo NVIDIA Jetson Orin NX SUPER e Jetson Orin Nano…</p>
    </a>
    <a href="https://www.juxitech.com/it/products/jetson-orin-radiator?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=jetson-orin-radiator" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/it/products/feetech-scs0009-servo')" class="pc-link">
      <img :src="withBase('/images/categories/Feetech-SCS0009.png')" alt="Servomotore a bus seriale FEETECH SCS0009" loading="lazy">
      <span class="pc-title">Servomotore a bus seriale FEETECH SCS0009</span>
      <p class="pc-desc">Questo servomotore a bus seriale FEETECH SCS0009 è un attuatore robotico adattato alle mani abili di AmazingHand.</p>
    </a>
    <a href="https://www.juxitech.com/it/products/feetech-scs0009-serial-bus-servo?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=feetech-scs0009-servo" target="_blank" rel="noopener" class="pc-buy">Acquista</a>
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
