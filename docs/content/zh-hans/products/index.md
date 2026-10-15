---
title: 产品中心——机械臂、Jetson 套件与传感器
description: "钜犀科技产品中心——机械臂、灵巧手、视觉传感器与配件全系产品手册、规格参数与购买入口。"
keywords: ["机器人系统", "AI 计算与视觉", "传感器与定位", "配件与工具", "机械臂", "Jetson", "LeRobot"]
aside: false
sidebar: false
outline: false
prev: false
next: false
---

<!-- 本文件由 scripts/gen-products-index.mjs 生成,请勿手改(数据源:docs/.vitepress/products-data.mjs) -->

# 产品中心

<p class="hero-subtitle">从开源机械臂到 NVIDIA Jetson 边缘计算——每款钜犀科技硬件的手册、规格参数与配套教程在这里一站直达，并附官方商店入口。</p>

<p class="hub-filters">
  <button class="hub-chip active" aria-pressed="true" data-filter="all" @click="applyFilter('all')">全部</button>
  <button class="hub-chip" aria-pressed="false" data-filter="robot" @click="applyFilter('robot')">机器人系统</button>
  <button class="hub-chip" aria-pressed="false" data-filter="compute-vision" @click="applyFilter('compute-vision')">AI 计算与视觉</button>
  <button class="hub-chip" aria-pressed="false" data-filter="sensor" @click="applyFilter('sensor')">传感器与定位</button>
  <button class="hub-chip" aria-pressed="false" data-filter="accessory" @click="applyFilter('accessory')">配件与工具</button>
</p>

## 机器人系统

<div class="product-grid">
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/zh-hans/products/so-arm101')" class="pc-link">
      <img :src="withBase('/images/categories/SO-ARM101.png')" alt="SO-ARM101 开发套件" loading="lazy">
      <span class="pc-title">SO-ARM101 开发套件</span>
      <p class="pc-desc">6 自由度开源机械臂；原生 LeRobot 生态，遥操作、数据采集与模仿学习一站式上手。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hans/products/so-arm101-developers-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=so-arm101" target="_blank" rel="noopener" class="pc-buy">购买</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/zh-hans/products/so-arm101-7dof')" class="pc-link">
      <img :src="withBase('/images/categories/SO-ARM101-7DOF.png')" alt="SO-ARM101 开源七自由度机械臂" loading="lazy">
      <span class="pc-title">SO-ARM101 开源七自由度机械臂</span>
      <p class="pc-desc">经典 6 轴之上再加 90° 腕部滚转；12V 总线舵机，工厂预组装，附完整教程系列。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hans/products/so-arm101-open-source-7-dof-robotic-arm?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=so-arm101-7dof" target="_blank" rel="noopener" class="pc-buy">购买</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/zh-hans/products/amazinghand')" class="pc-link">
      <img :src="withBase('/images/categories/AmazingHand.png')" alt="AmazingHand 开源 4 指灵巧手" loading="lazy">
      <span class="pc-title">AmazingHand 开源 4 指灵巧手</span>
      <p class="pc-desc">开源 4 指灵巧手：TTL 总线控制、开源 CAD，为具身智能与人机交互研究而生。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hans/products/amazinghand?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=amazinghand" target="_blank" rel="noopener" class="pc-buy">购买</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/zh-hans/products/xlerobot')" class="pc-link">
      <img :src="withBase('/images/categories/XLeRobot.png')" alt="XLeRobot 双臂移动机器人" loading="lazy">
      <span class="pc-title">XLeRobot 双臂移动机器人</span>
      <p class="pc-desc">双臂移动机器人：两条 SO-ARM101 装在全向底盘上；成品/散件两种形态，LeRobot 生态全兼容。</p>
    </a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/zh-hans/products/lekiwi')" class="pc-link">
      <img :src="withBase('/images/categories/Lekiwi.png')" alt="Lekiwi 具身智能移动机器人" loading="lazy">
      <span class="pc-title">Lekiwi 具身智能移动机器人</span>
      <p class="pc-desc">高性价比具身智能移动平台：全向底盘 + 教学机械臂，入门 LeRobot 的实惠之选。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hans/products/lekiwi-embodied-intelligence-mobile-robotic-car?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=lekiwi" target="_blank" rel="noopener" class="pc-buy">购买</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/zh-hans/products/tpu-flexible-gripper')" class="pc-link">
      <img :src="withBase('/images/categories/TPU-Gripper.png')" alt="SO-ARM101 TPU 柔性夹爪" loading="lazy">
      <span class="pc-title">SO-ARM101 TPU 柔性夹爪</span>
      <p class="pc-desc">柔性 TPU 夹爪，安全抓取不规则与易碎物品，可选臂载相机。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hans/products/so-arm101-tpu-flexible-gripper?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=tpu-flexible-gripper" target="_blank" rel="noopener" class="pc-buy">购买</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/zh-hans/products/robot-vision-kit')" class="pc-link">
      <img :src="withBase('/images/categories/Robot-Vision-Kit.png')" alt="SO-ARM101 机械臂视觉套件" loading="lazy">
      <span class="pc-title">SO-ARM101 机械臂视觉套件</span>
      <p class="pc-desc">腕部/侧方/俯视三视角安装，60FPS 定焦或自动对焦变焦可选；兼容 ACT、SmolVLA、Pi0、GR00T。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hans/products/so-arm101-wrist-camera-mount?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=robot-vision-kit" target="_blank" rel="noopener" class="pc-buy">购买</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/zh-hans/products/overhead-camera-mount')" class="pc-link">
      <img :src="withBase('/images/categories/Overhead-Camera-Mount.png')" alt="SO-ARM101 顶置相机支架" loading="lazy">
      <span class="pc-title">SO-ARM101 顶置相机支架</span>
      <p class="pc-desc">俯视数据采集支架，兼容 RealSense——让机械臂视觉训练少一块盲区。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hans/products/overhead-camera-mount-for-so-arm100-so-arm101-realsense-compatible?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=overhead-camera-mount" target="_blank" rel="noopener" class="pc-buy">购买</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/zh-hans/products/servo-driver-board')" class="pc-link">
      <img :src="withBase('/images/categories/Servo-Driver-Board.png')" alt="JUXI 总线舵机驱动板" loading="lazy">
      <span class="pc-title">JUXI 总线舵机驱动板</span>
      <p class="pc-desc">单总线驱动 253 路舵机，Type-C 即插即用；专为 LeRobot SO-ARM 设计。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hans/products/bus-servo-driver-board?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=servo-driver-board" target="_blank" rel="noopener" class="pc-buy">购买</a>
  </div>
</div>

## AI 计算与视觉

<div class="product-grid">
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/zh-hans/products/jetson-agx-orin-devkit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-AGX-Orin.png')" alt="Jetson AGX Orin 开发者套件(64GB)" loading="lazy">
      <span class="pc-title">Jetson AGX Orin 开发者套件(64GB)</span>
      <p class="pc-desc">275 TOPS 旗舰边缘 AI 套件；出厂预烧录、开箱即用，附完整 JetPack 7.2 文档体系。</p>
    </a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/zh-hans/products/jetson-orin-nano-devkit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-Orin-Nano.png')" alt="Jetson Orin Nano Super 开发者套件(8GB)" loading="lazy">
      <span class="pc-title">Jetson Orin Nano Super 开发者套件(8GB)</span>
      <p class="pc-desc">67 TOPS 入门级边缘 AI，8GB 统一内存；从首次刷机到智能体 AI 的全流程文档。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hans/products/nvidia-jetson-orin-nano-super-development-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=jetson-orin-nano-devkit" target="_blank" rel="noopener" class="pc-buy">购买</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/zh-hans/products/jetson-orin-nx-super-kit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-Orin-NX.png')" alt="Jetson Orin NX Super 开发套件" loading="lazy">
      <span class="pc-title">Jetson Orin NX Super 开发套件</span>
      <p class="pc-desc">117/157 TOPS 边缘平台，预装 Ubuntu 22.04 与 256GB NVMe，开箱即训大模型。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hans/products/nvidia-jetson-orin-nx-super-developer-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=jetson-orin-nx-super-kit" target="_blank" rel="noopener" class="pc-buy">购买</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/zh-hans/products/realsense-depth-camera')" class="pc-link">
      <img :src="withBase('/images/categories/RealSense-D435i.png')" alt="3D RealSense 深度相机" loading="lazy">
      <span class="pc-title">3D RealSense 深度相机</span>
      <p class="pc-desc">D435i / D405 / D405CB 三选一；为 XLeRobot 与 SO-ARM101 提供高精度深度视觉。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hans/products/3d-realsense-depth-camera?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=realsense-depth-camera" target="_blank" rel="noopener" class="pc-buy">购买</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/zh-hans/products/esp32-s3-wifi-module')" class="pc-link">
      <img :src="withBase('/images/categories/ESP32-NanoCam.png')" alt="ESP32-S3 WiFi 视频模块" loading="lazy">
      <span class="pc-title">ESP32-S3 WiFi 视频模块</span>
      <p class="pc-desc">200 万像素 WiFi 实时图传 + 8 种板载 AI 视觉模式，任何机器人的轻量第一视角。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hans/products/esp32-s3-wifi-video-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=esp32-s3-wifi-module" target="_blank" rel="noopener" class="pc-buy">购买</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/zh-hans/products/imx219-csi-camera')" class="pc-link">
      <img :src="withBase('/images/categories/CSI-Camera.png')" alt="79° IMX219 CSI 摄像头" loading="lazy">
      <span class="pc-title">79° IMX219 CSI 摄像头</span>
      <p class="pc-desc">原生 CSI 接口直连 Jetson；77° 视场、低延迟——边缘视觉的高性价比镜头。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hans/products/79-imx219-csi-camera?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=imx219-csi-camera" target="_blank" rel="noopener" class="pc-buy">购买</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/zh-hans/products/usb-auto-focus-camera')" class="pc-link">
      <img :src="withBase('/images/categories/USB-AutoFocus-Camera.png')" alt="USB 自动对焦摄像头" loading="lazy">
      <span class="pc-title">USB 自动对焦摄像头</span>
      <p class="pc-desc">1080P 86° 广角免驱摄像头，Windows/Linux/Jetson/树莓派全平台即插即用。</p>
    </a>
  </div>
</div>

## 传感器与定位

<div class="product-grid">
  <div class="product-card" data-cat="sensor">
    <a :href="withBase('/zh-hans/products/imu-module')" class="pc-link">
      <img :src="withBase('/images/categories/IMU.png')" alt="IMU 高精度惯导模块" loading="lazy">
      <span class="pc-title">IMU 高精度惯导模块</span>
      <p class="pc-desc">100Hz 姿态解算，六/九/十轴可选，IIC + 串口双通信，ROS 开箱集成。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hans/products/imu-module-ahrs-attitude-and-heading-angle-sensor?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=imu-module" target="_blank" rel="noopener" class="pc-buy">购买</a>
  </div>
  <div class="product-card" data-cat="sensor">
    <a :href="withBase('/zh-hans/products/gps-beidou-module')" class="pc-link">
      <img :src="withBase('/images/categories/GPS.png')" alt="GPS & 北斗 GNSS 定位模块" loading="lazy">
      <span class="pc-title">GPS & 北斗 GNSS 定位模块</span>
      <p class="pc-desc">四星座联合定位、2.5 米精度，ROS 就绪——户外机器人定位的入门首选。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hans/products/gps-beidou-gnss-positioning-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=gps-beidou-module" target="_blank" rel="noopener" class="pc-buy">购买</a>
  </div>
</div>

## 配件与工具

<div class="product-grid">
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/zh-hans/products/ai-voice-module')" class="pc-link">
      <img :src="withBase('/images/categories/AI-Voice-Module.png')" alt="AI 语音交互模块" loading="lazy">
      <span class="pc-title">AI 语音交互模块</span>
      <p class="pc-desc">110+ 条离线指令、5 米内 99% 识别率；串口/IIC 接入 Arduino、Jetson 与树莓派。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hans/products/ai-voice-recognition-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=ai-voice-module" target="_blank" rel="noopener" class="pc-buy">购买</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/zh-hans/products/kws-voice-module')" class="pc-link">
      <img :src="withBase('/images/categories/KWS-Voice-Module.png')" alt="KWS 语音交互模块" loading="lazy">
      <span class="pc-title">KWS 语音交互模块</span>
      <p class="pc-desc">中英文唤醒词识别，固件开源；串口输出 + RViz2 可视化。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hans/products/usb-kws-voice-interaction-module-english-translation-for-independent-station?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=kws-voice-module" target="_blank" rel="noopener" class="pc-buy">购买</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/zh-hans/products/usb-sound-card')" class="pc-link">
      <img :src="withBase('/images/categories/AI_SoundCard.png')" alt="USB 免驱声卡" loading="lazy">
      <span class="pc-title">USB 免驱声卡</span>
      <p class="pc-desc">板载麦克风 + 扬声器的免驱声卡，为树莓派/Jetson 语音交互补齐最后一环。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hans/products/usb-2-0-driver-free-sound-card-onboard-mic-speaker-for-ai-voice-interaction?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=usb-sound-card" target="_blank" rel="noopener" class="pc-buy">购买</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/zh-hans/products/2dof-gimbal')" class="pc-link">
      <img :src="withBase('/images/categories/2DOF-Gimbal.png')" alt="2 自由度舵机云台" loading="lazy">
      <span class="pc-title">2 自由度舵机云台</span>
      <p class="pc-desc">两轴云台 + 200 万摄像头；颜色追踪、人脸检测与自动跟随，纯 Python 二次开发。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hans/products/2-dof-servo-pan-tilt-unit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=2dof-gimbal" target="_blank" rel="noopener" class="pc-buy">购买</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/zh-hans/products/4k-hdmi-capture')" class="pc-link">
      <img :src="withBase('/images/categories/4K-HDMI-Capture.png')" alt="4K HDMI 采集卡" loading="lazy">
      <span class="pc-title">4K HDMI 采集卡</span>
      <p class="pc-desc">4K 高清采集，HDMI/DP 多接口 USB 直连——直播录屏与视觉数据回传。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hans/products/4k-hd-hdmi-capture-card?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=4k-hdmi-capture" target="_blank" rel="noopener" class="pc-buy">购买</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/zh-hans/products/feetech-servo')" class="pc-link">
      <img :src="withBase('/images/categories/Feetech-Servo.png')" alt="Feetech 总线舵机(SCS0009 / STS3215)" loading="lazy">
      <span class="pc-title">Feetech 总线舵机(SCS0009 / STS3215)</span>
      <p class="pc-desc">SCS0009 / STS3215 总线舵机双型号，磁编码与电位器版本齐备，配套上位机调试工具。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hans/products/feetech-serial-bus-servo-sts3215-scs0009?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=feetech-servo" target="_blank" rel="noopener" class="pc-buy">购买</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/zh-hans/products/kvm-switch')" class="pc-link">
      <img :src="withBase('/images/categories/KVM-Switch.png')" alt="4 合 1 KVM 切换器" loading="lazy">
      <span class="pc-title">4 合 1 KVM 切换器</span>
      <p class="pc-desc">4 合 1 KVM：TTL 串口 + 蓝牙扩展，多设备一键切换——机器人调试桌的效率工具。</p>
    </a>
    <a href="https://www.juxitech.com/zh-hans/products/4-in-1-kvm-switch-hub-ttl-serial-bluetooth-docking-station?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=kvm-switch" target="_blank" rel="noopener" class="pc-buy">购买</a>
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
