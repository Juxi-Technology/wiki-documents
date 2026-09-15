---
title: トピック
description: "Juxi Technology Wiki のトピック一覧。ロボティクスと自動化技術を、実際の製品と実践チュートリアルで深掘りします。"
---

# トピック

実際の製品と実行可能なチュートリアルを通じて、ロボティクスと自動化技術を深く掘り下げます。

## トピック一覧

<div class="topic-cards">
  <div class="topic-card">
    <div class="topic-icon">🤖</div>
    <h3><a href="/ja/topics/robot-learning/">ロボット学習特集</a></h3>
    <p>LeRobot ベースのフルスタックロボット学習。データ収集からデプロイまで</p>
  </div>
  <div class="topic-card">
    <div class="topic-icon">⚙️</div>
    <h3><a href="/ja/topics/jetpack-setup">JetPack フラッシングとシステム設定</a></h3>
    <p>SDK Manager と公式イメージによる JetPack フラッシング、トラブルシューティングとシステム基本設定</p>
  </div>
  <div class="topic-card">
    <div class="topic-icon">⚡</div>
    <h3><a href="/ja/topics/edge-ai-intro">エッジ AI 導入入門</a></h3>
    <p>PyTorch モデルを TensorRT に載せる。ONNX エクスポートと推論最適化</p>
  </div>
  <div class="topic-card">
    <div class="topic-icon">🦾</div>
    <h3><a href="/ja/topics/embodied-ai-intro">具身知能入門（LeRobot）</a></h3>
    <p>LeRobot フレームワークで SO-ARM101 のデータ収集・訓練・評価までの全フロー</p>
  </div>
  <div class="topic-card">
    <div class="topic-icon">🔓</div>
    <h3><a href="/ja/topics/open-source-hardware">オープンソースハードウェアの理念</a></h3>
    <p>全製品の回路図・ファームウェア・CAD ファイルを公開する JuxiTech の理念</p>
  </div>
  <div class="topic-card">
    <div class="topic-icon">📚</div>
    <h3><a href="/ja/topics/">トピック</a></h3>
    <p>Juxi Technology の技術トピックと自動化技術の総合ハブ</p>
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

## 関連チュートリアル

<div class="tutorial-links">
  <a href="/ja/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial" class="tutorial-link">
    <strong>SO-ARM101 チュートリアル</strong>
    <span>LeRobot でロボット操作ポリシーをトレーニングするための完全ガイド</span>
  </a>
  <a href="/ja/tutorials/sensors/imu/" class="tutorial-link">
    <strong>IMU 慣性ナビゲーションモジュール</strong>
    <span>センサーデータの収集と応用例</span>
  </a>
  <a href="/ja/tutorials/robot-arms/amazing-hand/AmazingHand-Interface-Control" class="tutorial-link">
    <strong>AmazingHand インターフェース制御</strong>
    <span>ロボットエンドエフェクタの制御と応用</span>
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

## ✨ コントリビューター募集

コミュニティからのコントリビューターを歓迎します!チュートリアル、ケーススタディ、技術解析などがあれば、お気軽に PR を送ってください。

- [チュートリアルを提出する](https://github.com/Juxi-Technology/wiki-documents/issues)
- [プロジェクトのニーズを見る](https://github.com/orgs/Juxi-Technology/projects/)

---

## テクニカルサポート

- 📧 Email: support@juxitech.com
- 💬 GitHub Issues: [フィードバック](https://github.com/Juxi-Technology/wiki-documents/issues)
