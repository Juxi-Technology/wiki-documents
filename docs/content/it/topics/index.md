---
title: Argomenti
description: Juxi Technology Wiki — Argomenti
---

# Argomenti

Un approfondimento sulle tecnologie di robotica e automazione con prodotti reali e tutorial eseguibili.

## Argomenti

<div class="topic-cards">
  <div class="topic-card">
    <div class="topic-icon">⚡</div>
    <h3><a href="/it/topics/jetpack-setup">Flashing JetPack e configurazione di sistema</a></h3>
    <p>Guida al flashing e alla configurazione di base per NVIDIA Jetson</p>
  </div>
  <div class="topic-card">
    <div class="topic-icon">🚀</div>
    <h3><a href="/it/topics/edge-ai-intro">Introduzione al deploy AI edge</a></h3>
    <p>Porta i modelli sui dispositivi edge: PyTorch → ONNX → TensorRT su Jetson</p>
  </div>
  <div class="topic-card">
    <div class="topic-icon">🧠</div>
    <h3><a href="/it/topics/embodied-ai-intro">Introduzione all'intelligenza incarnata (LeRobot)</a></h3>
    <p>Apprendimento robotico con LeRobot: raccolta dati, training e valutazione</p>
  </div>
  <div class="topic-card">
    <div class="topic-icon">🤖</div>
    <h3><a href="/it/topics/robot-learning/">Tema Robot Learning</a></h3>
    <p>Robot learning full-stack basato su LeRobot, dalla raccolta dati al deployment</p>
  </div>
  <div class="topic-card">
    <div class="topic-icon">🔧</div>
    <h3><a href="/it/topics/open-source-hardware">Filosofia dell'hardware open source</a></h3>
    <p>La filosofia open source di JuxiTech: schemi, firmware e file CAD liberi</p>
  </div>
  <div class="topic-card">
    <div class="topic-icon">📚</div>
    <h3><a href="/it/topics/">Argomenti</a></h3>
    <p>Tutti i temi tecnici di Juxi: JetPack, AI edge, intelligenza incarnata, robot learning e hardware open source</p>
  </div>
</div>

<style>
.topic-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin: 32px 0 64px;
}

.topic-card {
  border: 1px solid var(--vp-c-gutter);
  border-radius: 12px;
  padding: 28px;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  background: var(--vp-c-bg-soft);
}

.topic-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: var(--vp-c-brand);
}

.topic-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.topic-card h3 {
  margin: 0 0 8px 0;
}

.topic-card h3 a {
  text-decoration: none;
  color: inherit;
}

.topic-card p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
}
</style>

---

## Tutorial correlati

<div class="tutorial-links">
  <a href="/it/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial" class="tutorial-link">
    <strong>Tutorial SO-ARM101</strong>
    <span>Guida completa per addestrare policy di manipolazione robotica con LeRobot</span>
  </a>
  <a href="/it/tutorials/sensors/imu/" class="tutorial-link">
    <strong>Modulo IMU di navigazione inerziale</strong>
    <span>Raccolta dati dei sensori ed esempi applicativi</span>
  </a>
  <a href="/it/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control" class="tutorial-link">
    <strong>Controllo interfaccia AmazingHand</strong>
    <span>Controllo dell'end-effector robotico e applicazioni</span>
  </a>
</div>

<style>
.tutorial-links {
  display: grid;
  gap: 12px;
  margin: 24px 0 48px;
}

.tutorial-link {
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  border: 1px solid var(--vp-c-gutter);
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
}

.tutorial-link:hover {
  border-color: var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
}

.tutorial-link strong {
  font-size: 15px;
  margin-bottom: 4px;
}

.tutorial-link span {
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>

---

## ✨ Contribuisci alla community

Diamo il benvenuto ai contributori della community! Se hai tutorial, casi di studio o analisi tecniche, inviaci una PR.

- [Invia un tutorial](https://github.com/Juxi-Technology/wiki-documents/issues)
- [Consulta le esigenze del progetto](https://github.com/orgs/Juxi-Technology/projects/)

---

## Supporto tecnico

- 📧 E-mail: support@juxitech.com
- 💬 GitHub Issues: [Feedback](https://github.com/Juxi-Technology/wiki-documents/issues)
