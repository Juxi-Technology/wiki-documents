---
title: Produtos — Braços robóticos, kits Jetson e sensores
description: "Página de entrada dos produtos da Juxi Technology com manuais completos, especificações e ligações de compra de todo o hardware de robótica."
keywords: ["Sistemas Robóticos", "Computação de IA e Visão", "Sensores e Posicionamento", "Acessórios e Ferramentas", "braço robótico", "Jetson", "LeRobot"]
aside: false
sidebar: false
outline: false
prev: false
next: false
---

<!-- 本文件由 scripts/gen-products-index.mjs 生成,请勿手改(数据源:docs/.vitepress/products-data.mjs) -->

# Produtos

<p class="hero-subtitle">Dos braços robóticos open source à IA na borda com NVIDIA Jetson — manuais, especificações e tutoriais para todos os produtos da Juxi Technology num só lugar, com ligações diretas à loja oficial.</p>

<p class="hub-filters">
  <button class="hub-chip active" aria-pressed="true" data-filter="all" @click="applyFilter('all')">Todos</button>
  <button class="hub-chip" aria-pressed="false" data-filter="robot" @click="applyFilter('robot')">Sistemas Robóticos</button>
  <button class="hub-chip" aria-pressed="false" data-filter="compute-vision" @click="applyFilter('compute-vision')">Computação de IA e Visão</button>
  <button class="hub-chip" aria-pressed="false" data-filter="sensor" @click="applyFilter('sensor')">Sensores e Posicionamento</button>
  <button class="hub-chip" aria-pressed="false" data-filter="accessory" @click="applyFilter('accessory')">Acessórios e Ferramentas</button>
</p>

## Sistemas Robóticos

<div class="product-grid">
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/pt-pt/products/so-arm101')" class="pc-link">
      <img :src="withBase('/images/categories/SO-ARM101.png')" alt="Kit de Desenvolvimento SO-ARM101" loading="lazy">
      <span class="pc-title">Kit de Desenvolvimento SO-ARM101</span>
      <p class="pc-desc">Braço robótico open source de 6 DOF; a peça central do ecossistema LeRobot para teleoperação, recolha de dados e aprendizagem por imitação.</p>
    </a>
    <a href="https://www.juxitech.com/products/so-arm101-developers-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=so-arm101" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/pt-pt/products/so-arm101-7dof')" class="pc-link">
      <img :src="withBase('/images/categories/SO-ARM101-7DOF.png')" alt="Braço Robótico SO-ARM101 de 7 DOF" loading="lazy">
      <span class="pc-title">Braço Robótico SO-ARM101 de 7 DOF</span>
      <p class="pc-desc">O clássico braço de 6 eixos com rotação extra do pulso de 90°; servos de barramento de 12V, montagem de fábrica e série completa de tutoriais.</p>
    </a>
    <a href="https://www.juxitech.com/products/so-arm101-open-source-7-dof-robotic-arm?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=so-arm101-7dof" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/pt-pt/products/amazinghand')" class="pc-link">
      <img :src="withBase('/images/categories/AmazingHand.png')" alt="Mão Dexterous de 4 Dedos Open Source AmazingHand" loading="lazy">
      <span class="pc-title">Mão Dexterous de 4 Dedos Open Source AmazingHand</span>
      <p class="pc-desc">Mão hábil de 4 dedos open source: controlo por barramento TTL e CAD aberto, criada para investigação em IA incorporada e interação humano-robô.</p>
    </a>
    <a href="https://www.juxitech.com/products/amazinghand?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=amazinghand" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/pt-pt/products/xlerobot')" class="pc-link">
      <img :src="withBase('/images/categories/XLeRobot.png')" alt="Robô móvel de dois braços XLeRobot" loading="lazy">
      <span class="pc-title">Robô móvel de dois braços XLeRobot</span>
      <p class="pc-desc">Robô móvel de dois braços: dois braços SO-ARM101 sobre chassis omnidirecional; disponível em kit montado ou em peças, totalmente compatível com o ecossistema LeRobot.</p>
    </a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/pt-pt/products/lekiwi')" class="pc-link">
      <img :src="withBase('/images/categories/Lekiwi.png')" alt="Robô Móvel de Inteligência Incorporada Lekiwi" loading="lazy">
      <span class="pc-title">Robô Móvel de Inteligência Incorporada Lekiwi</span>
      <p class="pc-desc">Plataforma móvel de inteligência incorporada a preço acessível: base omnidirecional e braço de ensino, a porta de entrada económica para o LeRobot.</p>
    </a>
    <a href="https://www.juxitech.com/products/lekiwi-embodied-intelligence-mobile-robotic-car?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=lekiwi" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/pt-pt/products/tpu-flexible-gripper')" class="pc-link">
      <img :src="withBase('/images/categories/TPU-Gripper.png')" alt="Garra Flexível TPU SO-ARM101" loading="lazy">
      <span class="pc-title">Garra Flexível TPU SO-ARM101</span>
      <p class="pc-desc">Garra flexível de TPU para agarrar com segurança objetos irregulares e frágeis, com câmara opcional montada no braço.</p>
    </a>
    <a href="https://www.juxitech.com/products/so-arm101-tpu-flexible-gripper?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=tpu-flexible-gripper" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/pt-pt/products/robot-vision-kit')" class="pc-link">
      <img :src="withBase('/images/categories/Robot-Vision-Kit.png')" alt="Kit de Visão Robótica SO-ARM101" loading="lazy">
      <span class="pc-title">Kit de Visão Robótica SO-ARM101</span>
      <p class="pc-desc">Suportes de câmara para pulso, lateral ou superior, com opções de foco fixo a 60 FPS ou zoom com foco automático; prontos para ACT, SmolVLA, Pi0 e GR00T.</p>
    </a>
    <a href="https://www.juxitech.com/products/so-arm101-wrist-camera-mount?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=robot-vision-kit" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/pt-pt/products/overhead-camera-mount')" class="pc-link">
      <img :src="withBase('/images/categories/Overhead-Camera-Mount.png')" alt="Suporte de Câmara Superior SO-ARM101" loading="lazy">
      <span class="pc-title">Suporte de Câmara Superior SO-ARM101</span>
      <p class="pc-desc">Suporte de recolha de dados com vista superior, compatível com RealSense: elimina pontos cegos no treino de visão do robô.</p>
    </a>
    <a href="https://www.juxitech.com/products/overhead-camera-mount-for-so-arm100-so-arm101-realsense-compatible?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=overhead-camera-mount" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="robot">
    <a :href="withBase('/pt-pt/products/servo-driver-board')" class="pc-link">
      <img :src="withBase('/images/categories/Servo-Driver-Board.png')" alt="Placa Driver de Servo de Barramento JUXI" loading="lazy">
      <span class="pc-title">Placa Driver de Servo de Barramento JUXI</span>
      <p class="pc-desc">Controla até 253 servos num único barramento; Type-C plug-and-play, concebida especificamente para o LeRobot SO-ARM.</p>
    </a>
    <a href="https://www.juxitech.com/products/bus-servo-driver-board?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=servo-driver-board" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
</div>

## Computação de IA e Visão

<div class="product-grid">
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/pt-pt/products/jetson-agx-orin-devkit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-AGX-Orin.png')" alt="Kit de Desenvolvedor Jetson AGX Orin (64GB)" loading="lazy">
      <span class="pc-title">Kit de Desenvolvedor Jetson AGX Orin (64GB)</span>
      <p class="pc-desc">Kit de IA na borda de topo de gama com 275 TOPS; pré-gravado e pronto a usar, com o conjunto completo de documentação do JetPack 7.2.</p>
    </a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/pt-pt/products/jetson-orin-nano-devkit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-Orin-Nano.png')" alt="Kit de Desenvolvedor Jetson Orin Nano Super (8GB)" loading="lazy">
      <span class="pc-title">Kit de Desenvolvedor Jetson Orin Nano Super (8GB)</span>
      <p class="pc-desc">IA na borda de nível de entrada com 67 TOPS e 8 GB de memória unificada; documentação completa desde a primeira gravação até à IA agêntica.</p>
    </a>
    <a href="https://www.juxitech.com/products/nvidia-jetson-orin-nano-super-development-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=jetson-orin-nano-devkit" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/pt-pt/products/jetson-orin-nx-super-kit')" class="pc-link">
      <img :src="withBase('/images/categories/Jetson-Orin-NX.png')" alt="Kit de Desenvolvedor Jetson Orin NX Super" loading="lazy">
      <span class="pc-title">Kit de Desenvolvedor Jetson Orin NX Super</span>
      <p class="pc-desc">Plataforma de IA na borda de 117/157 TOPS, pré-instalada com Ubuntu 22.04 e SSD NVMe de 256 GB; treine grandes modelos desde o primeiro dia.</p>
    </a>
    <a href="https://www.juxitech.com/products/nvidia-jetson-orin-nx-super-developer-kit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=jetson-orin-nx-super-kit" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/pt-pt/products/realsense-depth-camera')" class="pc-link">
      <img :src="withBase('/images/categories/RealSense-D435i.png')" alt="Câmara de Profundidade 3D RealSense" loading="lazy">
      <span class="pc-title">Câmara de Profundidade 3D RealSense</span>
      <p class="pc-desc">Escolha entre D435i, D405 ou D405CB: visão de profundidade de alta precisão para o XLeRobot e o SO-ARM101.</p>
    </a>
    <a href="https://www.juxitech.com/products/3d-realsense-depth-camera?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=realsense-depth-camera" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/pt-pt/products/esp32-s3-wifi-module')" class="pc-link">
      <img :src="withBase('/images/categories/ESP32-NanoCam.png')" alt="Módulo de Vídeo WiFi ESP32-S3" loading="lazy">
      <span class="pc-title">Módulo de Vídeo WiFi ESP32-S3</span>
      <p class="pc-desc">Transmissão de vídeo WiFi em tempo real de 2 MP com 8 modos de visão por IA a bordo; uma opção leve de visão em primeira pessoa para qualquer robô.</p>
    </a>
    <a href="https://www.juxitech.com/products/esp32-s3-wifi-video-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=esp32-s3-wifi-module" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/pt-pt/products/imx219-csi-camera')" class="pc-link">
      <img :src="withBase('/images/categories/CSI-Camera.png')" alt="Câmara CSI IMX219 79°" loading="lazy">
      <span class="pc-title">Câmara CSI IMX219 79°</span>
      <p class="pc-desc">CSI nativo ligado diretamente ao Jetson; FOV de 77° e baixa latência — a lente com a melhor relação qualidade-preço para visão na borda.</p>
    </a>
    <a href="https://www.juxitech.com/products/79-imx219-csi-camera?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=imx219-csi-camera" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="compute-vision">
    <a :href="withBase('/pt-pt/products/usb-auto-focus-camera')" class="pc-link">
      <img :src="withBase('/images/categories/USB-AutoFocus-Camera.png')" alt="Câmara USB com foco automático" loading="lazy">
      <span class="pc-title">Câmara USB com foco automático</span>
      <p class="pc-desc">1080P, grande angular de 86° e sem driver; plug-and-play em Windows, Linux, Jetson e Raspberry Pi.</p>
    </a>
  </div>
</div>

## Sensores e Posicionamento

<div class="product-grid">
  <div class="product-card" data-cat="sensor">
    <a :href="withBase('/pt-pt/products/imu-module')" class="pc-link">
      <img :src="withBase('/images/categories/IMU.png')" alt="Módulo Inercial IMU de Alta Precisão" loading="lazy">
      <span class="pc-title">Módulo Inercial IMU de Alta Precisão</span>
      <p class="pc-desc">Cálculo de atitude a 100 Hz, opções de 6/9/10 eixos e comunicação IIC + UART; integração ROS pronta a usar.</p>
    </a>
    <a href="https://www.juxitech.com/products/imu-module-ahrs-attitude-and-heading-angle-sensor?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=imu-module" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="sensor">
    <a :href="withBase('/pt-pt/products/gps-beidou-module')" class="pc-link">
      <img :src="withBase('/images/categories/GPS.png')" alt="Módulo de Posicionamento GNSS GPS e BeiDou" loading="lazy">
      <span class="pc-title">Módulo de Posicionamento GNSS GPS e BeiDou</span>
      <p class="pc-desc">Posicionamento por quatro constelações com precisão de 2,5 m e suporte ROS — a escolha de entrada para localização de robôs de exterior.</p>
    </a>
    <a href="https://www.juxitech.com/products/gps-beidou-gnss-positioning-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=gps-beidou-module" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
</div>

## Acessórios e Ferramentas

<div class="product-grid">
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/pt-pt/products/ai-voice-module')" class="pc-link">
      <img :src="withBase('/images/categories/AI-Voice-Module.png')" alt="Módulo de interação por voz IA" loading="lazy">
      <span class="pc-title">Módulo de interação por voz IA</span>
      <p class="pc-desc">110+ comandos offline com 99% de reconhecimento até 5 m; ligação por porta série ou IIC a Arduino, Jetson ou Raspberry Pi.</p>
    </a>
    <a href="https://www.juxitech.com/products/ai-voice-recognition-module?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=ai-voice-module" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/pt-pt/products/kws-voice-module')" class="pc-link">
      <img :src="withBase('/images/categories/KWS-Voice-Module.png')" alt="Módulo de Interação por Voz KWS" loading="lazy">
      <span class="pc-title">Módulo de Interação por Voz KWS</span>
      <p class="pc-desc">Reconhecimento de palavras de ativação em chinês e inglês com firmware open source; saída UART e visualização em RViz2.</p>
    </a>
    <a href="https://www.juxitech.com/products/usb-kws-voice-interaction-module-english-translation-for-independent-station?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=kws-voice-module" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/pt-pt/products/usb-sound-card')" class="pc-link">
      <img :src="withBase('/images/categories/AI_SoundCard.png')" alt="Placa de Som USB sem Driver" loading="lazy">
      <span class="pc-title">Placa de Som USB sem Driver</span>
      <p class="pc-desc">Placa de som sem drivers com microfone e altifalante integrados; a última peça que faltava para a interação por voz no Raspberry Pi/Jetson.</p>
    </a>
    <a href="https://www.juxitech.com/products/usb-2-0-driver-free-sound-card-onboard-mic-speaker-for-ai-voice-interaction?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=usb-sound-card" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/pt-pt/products/2dof-gimbal')" class="pc-link">
      <img :src="withBase('/images/categories/2DOF-Gimbal.png')" alt="Unidade Pan-Tilt de Servo 2-DOF" loading="lazy">
      <span class="pc-title">Unidade Pan-Tilt de Servo 2-DOF</span>
      <p class="pc-desc">Gimbal de dois eixos com câmara de 2 MP; rastreamento de cores, deteção de rosto e seguimento automático, tudo em Python puro.</p>
    </a>
    <a href="https://www.juxitech.com/products/2-dof-servo-pan-tilt-unit?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=2dof-gimbal" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/pt-pt/products/4k-hdmi-capture')" class="pc-link">
      <img :src="withBase('/images/categories/4K-HDMI-Capture.png')" alt="Capturadora HDMI 4K" loading="lazy">
      <span class="pc-title">Capturadora HDMI 4K</span>
      <p class="pc-desc">Captura 4K via HDMI/DP com ligação USB direta: streaming, gravação de ecrã e captura de dados de visão.</p>
    </a>
    <a href="https://www.juxitech.com/products/4k-hd-hdmi-capture-card?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=4k-hdmi-capture" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/pt-pt/products/feetech-servo')" class="pc-link">
      <img :src="withBase('/images/categories/Feetech-Servo.png')" alt="Servos de Barramento Feetech (SCS0009 / STS3215)" loading="lazy">
      <span class="pc-title">Servos de Barramento Feetech (SCS0009 / STS3215)</span>
      <p class="pc-desc">Servos de barramento SCS0009 e STS3215, em versões de encoder magnético ou potenciómetro, com ferramentas host de depuração.</p>
    </a>
    <a href="https://www.juxitech.com/products/feetech-serial-bus-servo-sts3215-scs0009?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=feetech-servo" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
  </div>
  <div class="product-card" data-cat="accessory">
    <a :href="withBase('/pt-pt/products/kvm-switch')" class="pc-link">
      <img :src="withBase('/images/categories/KVM-Switch.png')" alt="Chaveador KVM 4-em-1" loading="lazy">
      <span class="pc-title">Chaveador KVM 4-em-1</span>
      <p class="pc-desc">KVM 4-em-1 com porta série TTL e dock Bluetooth; troca de dispositivos com um clique — a ferramenta de eficiência da bancada de robótica.</p>
    </a>
    <a href="https://www.juxitech.com/products/4-in-1-kvm-switch-hub-ttl-serial-bluetooth-docking-station?utm_source=wiki&utm_medium=referral&utm_campaign=products-hub&utm_content=kvm-switch" target="_blank" rel="noopener" class="pc-buy">Comprar</a>
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
