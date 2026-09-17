---
title: 具身知能入門（LeRobot）
description: "具身知能入門——LeRobot フレームワーク使い方、SO-ARM101 データ収集/訓練/評価の全フロー、ACT/拡散戦略/SmolVLA 選定"
keywords: [lerobot, 具身知能, 模倣学習, act, so-arm101, ロボット学習]
---

# 具身知能入門（LeRobot）

> 初めて「ロボット学習」に取り組む開発者向け。HuggingFace LeRobot + JUXI SO-ARM101 ロボットアームを例に、**データ収集 → 訓練 → 評価**の全フローを完走します。

## 1. 具身知能とは?

具身知能（Embodied AI）は、エージェントが身体のセンサーを通じて物理世界と対話することを可能にします。ロボット模倣学習（Imitation Learning）はその主要な路線です：人間が遠隔操作でデモ → データ収集 → 戦略モデルを訓練 → ロボットが動作を再現。

**なぜ重要か**: 従来のプログラミングでは複雑な操作（ネジ締め、服を畳む）をカバーできず、模倣学習では「デモ + 訓練」だけで済みます。

## 2. ハードウェア構成

| コンポーネント | 推奨 | 説明 |
|------|------|------|
| ロボットアーム | SO-ARM101（leader + follower） | 双腕遠隔操作、6 DOF |
| 計算プラットフォーム | Jetson Orin NX Super / 4090 ホスト | 訓練は大演算、推論は Jetson |
| ビジョン | RealSense / USB カメラ | 遠隔操作時に環境を収集 |

- [SO-ARM101 使用チュートリアル](/ja/tutorials/robot-arms/so-arm101/SO-ARM101-Tutorial)
- [Jetson Orin NX Super 開発キット](/ja/products/jetson-orin-nx-super-kit)

## 3. 環境インストール

```bash
# クローン（JUXI フォークの安定版）
git clone https://github.com/Juxi-Technology/lerobot.git
cd lerobot
pip install -e ".[feetech]"        # SO-ARM は feetech サーボを使用
# Jetson ユーザー: まず PyTorch が使えるか確認
python3 -c "import torch; print(torch.cuda.is_available())"
```

## 4. データ収集（遠隔操作）

```bash
# ロボットアームのキャリブレーション（初回）
lerobot-calibrate \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 --robot.id=my_arm
# データ収集
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --teleop.type=so101_leader --teleop.port=/dev/ttyACM1 \
  --dataset.repo_id=juxi/pick_cube \
  --dataset.num_episodes=50 \
  --dataset.single_task="Pick the red cube" \
  --dataset.episode_time_s=30
```

**収集のコツ**:

- 各タスク ≥50 エピソード、位置/手法を多様化
- カメラを固定し、物体を一貫して見えるように
- 一貫した操作スタイルを保つ（同じデモンストレーター）

## 5. 訓練

```bash
# ACT 戦略（入門におすすめ）
lerobot-train \
  --dataset.repo_id=juxi/pick_cube \
  --policy.type=act \
  --output_dir=outputs/train/act_pick \
  --steps=300000 \
  --policy.device=cuda
```

**戦略選定**:

| 戦略 | メリット | 適用 |
|------|------|------|
| ACT | 小規模データでも安定、初心者向け | 単タスク、データ少なめ |
| 拡散戦略（Diffusion Policy） | 複雑なマルチモーダル動作 | 器用な操作 |
| SmolVLA / 基礎モデル | ゼロショット/少ショット汎化 | 多タスク |

## 6. 評価

```bash
# データセット再生（データ品質の確認）
lerobot-dataset-viz --repo-id juxi/pick_cube
# 戦略の評価
lerobot-record \
  --robot.type=so101_follower --robot.port=/dev/ttyACM0 \
  --policy.path=outputs/train/act_pick/checkpoints/last/pretrained_model \
  --dataset.repo_id=juxi/eval_pick \
  --policy.device=cuda
```

| 評価指標 | 説明 |
|---------|------|
| 成功率 | タスク完了率 |
| 軌跡の滑らかさ | 動作が震えていないか |
| 汎化能力 | 物体/位置変更でも成功するか |

## 7. よくある質問

**Q: 訓練が遅い?**

**A:** データ量、steps、演算力は比例します。まず 50 エピソード / 100k steps で開始し、フローを確認してから規模を拡大。

**Q: 戦略は単一動作しかできない?**

**A:** 単タスク訓練はタスクデータセットが必要。GR00T/Pi0 系の基礎モデルは小データでマルチタスクに微調整可能。

**Q: 訓練後に動作が震える?**

**A:** データ品質を確認（デモが安定）、平滑化フィルタを追加、制御周波数を下げる。

**Q: メモリ/VRAM 不足?**

**A:** batch_size を減らす、画像解像度を下げる、Jetson は 16GB 版を使用。

---

## 関連リンク

- [ロボットアーム選定ガイド](/ja/tutorials/robot-arms/select-guide)
- [エッジ AI 導入入門](/ja/topics/edge-ai-intro)
- [SO-ARM101 TPU フレキシブルグリッパー](/ja/products/tpu-flexible-gripper)
- [SO-ARM101 ロボットビジョンキット](/ja/products/robot-vision-kit)

## 技術サポート

- 📧 メール：support@juxitech.com
- 🌐 公式サイト：[www.juxitech.com](https://www.juxitech.com)
