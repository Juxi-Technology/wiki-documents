---
title: Products — Robot Arms, Jetson Kits & Sensors
description: "Juxi Technology product center — robot arms, dexterous hands, sensors and accessories"
keywords: ["Robot Systems", "AI Compute & Vision", "Sensors & Positioning", "Accessories & Tools", "robot arm", "Jetson", "LeRobot"]
aside: false
sidebar: false
outline: false
prev: false
next: false
---

<!-- 本文件由 scripts/gen-products-index.mjs 生成,请勿手改(数据源:docs/.vitepress/products-data.mjs) -->

# Products

<p class="hero-subtitle">From open-source robot arms to NVIDIA Jetson edge AI — manuals, specifications and tutorials for every Juxi Technology product, with direct links to the official store.</p>

<p class="hub-filters">
  <button class="hub-chip active" aria-pressed="true" data-filter="all" @click="applyFilter('all')">All</button>
  <button class="hub-chip" aria-pressed="false" data-filter="robot" @click="applyFilter('robot')">Robot Systems</button>
  <button class="hub-chip" aria-pressed="false" data-filter="compute-vision" @click="applyFilter('compute-vision')">AI Compute & Vision</button>
  <button class="hub-chip" aria-pressed="false" data-filter="sensor" @click="applyFilter('sensor')">Sensors & Positioning</button>
  <button class="hub-chip" aria-pressed="false" data-filter="accessory" @click="applyFilter('accessory')">Accessories & Tools</button>
</p>

## Robot Systems

<div class="product-grid">
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/products/so-arm101')" class="pc-link">
      <img :src="withBase('/images/categories/SO-ARM101.png')" alt="SO-ARM101 Developer Kit" loading="lazy">
      <span class="pc-title">SO-ARM101 Developer Kit</span>
      <p class="pc-desc">6-DOF open-source robot arm; the LeRobot-ecosystem staple for teleoperation, data collection and imitation learning.</p>
    </a>
    <a href="https://www.juxitech.com/products/so-arm101-developers-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=so-arm101" target="_blank" rel="noopener" class="pc-buy">Buy</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/products/so-arm101-7dof')" class="pc-link">
      <img :src="withBase('/images/categories/SO-ARM101-7DOF.png')" alt="SO-ARM101 7-DOF Robotic Arm" loading="lazy">
      <span class="pc-title">SO-ARM101 7-DOF Robotic Arm</span>
      <p class="pc-desc">The classic 6-axis arm plus a 90° wrist roll; 12V bus servos, factory assembly, complete tutorial series.</p>
    </a>
    <a href="https://www.juxitech.com/products/so-arm101-open-source-7-dof-robotic-arm?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=so-arm101-7dof" target="_blank" rel="noopener" class="pc-buy">Buy</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/products/amazinghand')" class="pc-link">
      <img :src="withBase('/images/categories/AmazingHand.png')" alt="AmazingHand Open-Source 4-Finger Dexterous Hand" loading="lazy">
      <span class="pc-title">AmazingHand Open-Source 4-Finger Dexterous Hand</span>
      <p class="pc-desc">Open-source 4-finger dexterous hand: TTL bus control and open CAD, built for embodied-AI and HRI research.</p>
    </a>
    <a href="https://www.juxitech.com/products/amazinghand?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=amazinghand" target="_blank" rel="noopener" class="pc-buy">Buy</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/products/xlerobot')" class="pc-link">
      <img :src="withBase('/images/categories/XLeRobot.png')" alt="XLeRobot Dual-Arm Mobile Robot" loading="lazy">
      <span class="pc-title">XLeRobot Dual-Arm Mobile Robot</span>
      <p class="pc-desc">Dual-arm mobile robot: two SO-ARM101 arms on an omnidirectional base; available assembled or as a parts kit, fully LeRobot-compatible.</p>
    </a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/products/lekiwi')" class="pc-link">
      <img :src="withBase('/images/categories/Lekiwi.png')" alt="Lekiwi Embodied Intelligence Mobile Robot" loading="lazy">
      <span class="pc-title">Lekiwi Embodied Intelligence Mobile Robot</span>
      <p class="pc-desc">Affordable embodied-AI mobile platform: omnidirectional base plus teaching arm, the budget-friendly gateway into LeRobot.</p>
    </a>
    <a href="https://www.juxitech.com/products/lekiwi-embodied-intelligence-mobile-robotic-car?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=lekiwi" target="_blank" rel="noopener" class="pc-buy">Buy</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/products/tpu-flexible-gripper')" class="pc-link">
      <img :src="withBase('/images/categories/TPU-Gripper.png')" alt="SO-ARM101 TPU Flexible Gripper" loading="lazy">
      <span class="pc-title">SO-ARM101 TPU Flexible Gripper</span>
      <p class="pc-desc">Soft TPU gripper for safe handling of irregular and fragile objects, with optional arm-mounted camera.</p>
    </a>
    <a href="https://www.juxitech.com/products/so-arm101-tpu-flexible-gripper?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=tpu-flexible-gripper" target="_blank" rel="noopener" class="pc-buy">Buy</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/products/robot-vision-kit')" class="pc-link">
      <img :src="withBase('/images/categories/Robot-Vision-Kit.png')" alt="SO-ARM101 Robot Vision Kit" loading="lazy">
      <span class="pc-title">SO-ARM101 Robot Vision Kit</span>
      <p class="pc-desc">Wrist, side or overhead camera mounts with 60 FPS fixed-focus or autofocus-zoom options; ACT, SmolVLA, Pi0 and GR00T ready.</p>
    </a>
    <a href="https://www.juxitech.com/products/so-arm101-wrist-camera-mount?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=robot-vision-kit" target="_blank" rel="noopener" class="pc-buy">Buy</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/products/overhead-camera-mount')" class="pc-link">
      <img :src="withBase('/images/categories/Overhead-Camera-Mount.png')" alt="SO-ARM101 Overhead Camera Mount" loading="lazy">
      <span class="pc-title">SO-ARM101 Overhead Camera Mount</span>
      <p class="pc-desc">Overhead data-collection mount, RealSense-compatible: close the blind spots in robot vision training.</p>
    </a>
    <a href="https://www.juxitech.com/products/overhead-camera-mount-for-so-arm100-so-arm101-realsense-compatible?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=overhead-camera-mount" target="_blank" rel="noopener" class="pc-buy">Buy</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/products/servo-driver-board')" class="pc-link">
      <img :src="withBase('/images/categories/Servo-Driver-Board.png')" alt="JUXI Bus Servo Driver Board" loading="lazy">
      <span class="pc-title">JUXI Bus Servo Driver Board</span>
      <p class="pc-desc">Drives up to 253 servos on a single bus; Type-C plug-and-play, purpose-built for LeRobot SO-ARM.</p>
    </a>
    <a href="https://www.juxitech.com/products/bus-servo-driver-board?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=servo-driver-board" target="_blank" rel="noopener" class="pc-buy">Buy</a>
  </div>
</div>

## AI Compute & Vision

<div class="product-grid">
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/products/jetson-agx-orin-devkit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-AGX-Orin.png')" alt="Jetson AGX Orin Developer Kit (64GB)" loading="lazy">
      <span class="pc-title">Jetson AGX Orin Developer Kit (64GB)</span>
      <p class="pc-desc">Flagship 275-TOPS edge-AI kit; pre-flashed and ready out of the box, with the complete JetPack 7.2 documentation set.</p>
    </a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/products/jetson-orin-nano-devkit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-Orin-Nano.png')" alt="Jetson Orin Nano Super Developer Kit (8GB)" loading="lazy">
      <span class="pc-title">Jetson Orin Nano Super Developer Kit (8GB)</span>
      <p class="pc-desc">Entry-level 67-TOPS edge AI with 8 GB unified memory; documented from first flash to agentic AI.</p>
    </a>
    <a href="https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=jetson-orin-nano-devkit" target="_blank" rel="noopener" class="pc-buy">Buy</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/products/jetson-orin-nx-super-kit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-Orin-NX.png')" alt="Jetson Orin NX Super Developer Kit" loading="lazy">
      <span class="pc-title">Jetson Orin NX Super Developer Kit</span>
      <p class="pc-desc">117/157-TOPS edge platform preinstalled with Ubuntu 22.04 and a 256 GB NVMe; train at the edge from day one.</p>
    </a>
    <a href="https://www.juxitech.com/products/nvidia-jetson-orin-nx-super-developer-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=jetson-orin-nx-super-kit" target="_blank" rel="noopener" class="pc-buy">Buy</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/products/realsense-depth-camera')" class="pc-link">
      <img :src="withBase('/images/categories/RealSense-D435i.png')" alt="3D RealSense Depth Camera" loading="lazy">
      <span class="pc-title">3D RealSense Depth Camera</span>
      <p class="pc-desc">Choose D435i, D405 or D405CB: high-precision depth vision for XLeRobot and SO-ARM101.</p>
    </a>
    <a href="https://www.juxitech.com/products/3d-realsense-depth-camera?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=realsense-depth-camera" target="_blank" rel="noopener" class="pc-buy">Buy</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/products/esp32-s3-wifi-module')" class="pc-link">
      <img :src="withBase('/images/categories/ESP32-NanoCam.png')" alt="ESP32-S3 WiFi Video Module" loading="lazy">
      <span class="pc-title">ESP32-S3 WiFi Video Module</span>
      <p class="pc-desc">2 MP WiFi live streaming with 8 on-board AI vision modes; a lightweight first-person view for any robot.</p>
    </a>
    <a href="https://www.juxitech.com/products/esp32-s3-wifi-video-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=esp32-s3-wifi-module" target="_blank" rel="noopener" class="pc-buy">Buy</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/products/imx219-csi-camera')" class="pc-link">
      <img :src="withBase('/images/categories/CSI-Camera.png')" alt="79° IMX219 CSI Camera" loading="lazy">
      <span class="pc-title">79° IMX219 CSI Camera</span>
      <p class="pc-desc">Native CSI straight into Jetson; 77° FOV, low latency, the value lens for edge vision.</p>
    </a>
    <a href="https://www.juxitech.com/products/79-imx219-csi-camera?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=imx219-csi-camera" target="_blank" rel="noopener" class="pc-buy">Buy</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/products/usb-auto-focus-camera')" class="pc-link">
      <img :src="withBase('/images/categories/USB-AutoFocus-Camera.png')" alt="USB Auto-Focus Camera" loading="lazy">
      <span class="pc-title">USB Auto-Focus Camera</span>
      <p class="pc-desc">1080P, 86° wide-angle, driver-free; plug-and-play on Windows, Linux, Jetson and Raspberry Pi.</p>
    </a>
  </div>
</div>

## Sensors & Positioning

<div class="product-grid">
  <div class="product-card" data-cat="sensor">
    <a :href="withBase('/products/imu-module')" class="pc-link">
      <img :src="withBase('/images/categories/IMU.png')" alt="IMU High-Precision Inertial Module" loading="lazy">
      <span class="pc-title">IMU High-Precision Inertial Module</span>
      <p class="pc-desc">100 Hz attitude estimation, 6/9/10-axis options, IIC + UART; ROS integration out of the box.</p>
    </a>
    <a href="https://www.juxitech.com/products/imu-module-ahrs-attitude-and-heading-angle-sensor?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=imu-module" target="_blank" rel="noopener" class="pc-buy">Buy</a>
  </div>
  <div class="product-card" data-cat="sensor">
    <a :href="withBase('/products/gps-beidou-module')" class="pc-link">
      <img :src="withBase('/images/categories/GPS.png')" alt="GPS & BeiDou GNSS Positioning Module" loading="lazy">
      <span class="pc-title">GPS & BeiDou GNSS Positioning Module</span>
      <p class="pc-desc">Four-constellation positioning at 2.5 m accuracy, ROS-ready; entry-level outdoor robot localization.</p>
    </a>
    <a href="https://www.juxitech.com/products/gps-beidou-gnss-positioning-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=gps-beidou-module" target="_blank" rel="noopener" class="pc-buy">Buy</a>
  </div>
</div>

## Accessories & Tools

<div class="product-grid">
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/products/ai-voice-module')" class="pc-link">
      <img :src="withBase('/images/categories/AI-Voice-Module.png')" alt="AI Voice Interaction Module" loading="lazy">
      <span class="pc-title">AI Voice Interaction Module</span>
      <p class="pc-desc">110+ offline commands with 99% recognition within 5 m; serial/IIC into Arduino, Jetson or Raspberry Pi.</p>
    </a>
    <a href="https://www.juxitech.com/products/ai-voice-recognition-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=ai-voice-module" target="_blank" rel="noopener" class="pc-buy">Buy</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/products/kws-voice-module')" class="pc-link">
      <img :src="withBase('/images/categories/KWS-Voice-Module.png')" alt="KWS Voice Interaction Module" loading="lazy">
      <span class="pc-title">KWS Voice Interaction Module</span>
      <p class="pc-desc">Chinese/English wake-word recognition with open firmware; UART output plus RViz2 visualization.</p>
    </a>
    <a href="https://www.juxitech.com/products/usb-kws-voice-interaction-module-english-translation-for-independent-station?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=kws-voice-module" target="_blank" rel="noopener" class="pc-buy">Buy</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/products/usb-sound-card')" class="pc-link">
      <img :src="withBase('/images/categories/AI_SoundCard.png')" alt="USB Driver-Free Sound Card" loading="lazy">
      <span class="pc-title">USB Driver-Free Sound Card</span>
      <p class="pc-desc">Driver-free sound card with on-board mic and speaker; the last missing piece for Pi/Jetson voice interaction.</p>
    </a>
    <a href="https://www.juxitech.com/products/usb-2-0-driver-free-sound-card-onboard-mic-speaker-for-ai-voice-interaction?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=usb-sound-card" target="_blank" rel="noopener" class="pc-buy">Buy</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/products/2dof-gimbal')" class="pc-link">
      <img :src="withBase('/images/categories/2DOF-Gimbal.png')" alt="2-DOF Servo Pan-Tilt Unit" loading="lazy">
      <span class="pc-title">2-DOF Servo Pan-Tilt Unit</span>
      <p class="pc-desc">Two-axis gimbal with a 2 MP camera; color tracking, face detection and auto-follow, all in pure Python.</p>
    </a>
    <a href="https://www.juxitech.com/products/2-dof-servo-pan-tilt-unit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=2dof-gimbal" target="_blank" rel="noopener" class="pc-buy">Buy</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/products/4k-hdmi-capture')" class="pc-link">
      <img :src="withBase('/images/categories/4K-HDMI-Capture.png')" alt="4K HDMI Capture Card" loading="lazy">
      <span class="pc-title">4K HDMI Capture Card</span>
      <p class="pc-desc">4K capture over HDMI/DP into USB; live streaming, screen recording and vision-data capture.</p>
    </a>
    <a href="https://www.juxitech.com/products/4k-hd-hdmi-capture-card?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=4k-hdmi-capture" target="_blank" rel="noopener" class="pc-buy">Buy</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/products/feetech-servo')" class="pc-link">
      <img :src="withBase('/images/categories/Feetech-Servo.png')" alt="Feetech Bus Servos (SCS0009 / STS3215)" loading="lazy">
      <span class="pc-title">Feetech Bus Servos (SCS0009 / STS3215)</span>
      <p class="pc-desc">SCS0009 and STS3215 bus servos, magnetic or potentiometer versions, with host-side debugging tools.</p>
    </a>
    <a href="https://www.juxitech.com/products/feetech-serial-bus-servo-sts3215-scs0009?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=feetech-servo" target="_blank" rel="noopener" class="pc-buy">Buy</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/products/kvm-switch')" class="pc-link">
      <img :src="withBase('/images/categories/KVM-Switch.png')" alt="4-in-1 KVM Switch" loading="lazy">
      <span class="pc-title">4-in-1 KVM Switch</span>
      <p class="pc-desc">4-in-1 KVM with TTL serial and Bluetooth docking; one-click device switching for the robot workbench.</p>
    </a>
    <a href="https://www.juxitech.com/products/4-in-1-kvm-switch-hub-ttl-serial-bluetooth-docking-station?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=kvm-switch" target="_blank" rel="noopener" class="pc-buy">Buy</a>
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
