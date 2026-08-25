---
title: エッジ AI 導入入門
description: Jetson エッジ AI 導入入門——PyTorch モデルを TensorRT に載せる、ONNX エクスポートと推論最適化、一般的な導入パスとトラブルシューティング
keywords: [edge ai, tensorrt, onnx, エッジ導入, jetson]
---

# エッジ AI 導入入門

> 「訓練済み」モデルを「エッジデバイスで動く」状態に持ち込む開発者向け。NVIDIA Jetson プラットフォームを例にします。

## 1. なぜエッジ導入が必要か?

| 比較 | クラウド推論 | エッジ推論 |
|------|---------|---------|
| 遅延 | ネットワーク往復 50-500ms | デバイスローカル <10ms |
| プライバシー | データがクラウドへ | データがデバイス外に出ない |
| コスト | GPU 継続課金 | 一括ハードウェア |
| オフライン | 通信断で利用不可 | 完全オフライン |

ロボット（リアルタイム制御）、工業検査（生産ライン遅延敏感）、プライバシー敏感シーン（医療/セキュリティ）では、エッジ導入は必須です。

## 2. 導入パス全体像

```
PyTorch モデル
   │  torch.onnx.export
   ▼
ONNX モデル ──► TensorRT Engine ──► 推論アプリ
   │              │
   └──► TorchScript (JIT) ──► 推論アプリ(簡易パス)
```

| パス | 加速比（ネイティブ PyTorch 比） | 適用 |
|------|------------------------|------|
| TorchScript | ~1.5-2x | すぐ導入、変更小 |
| ONNX Runtime | ~2-4x | クロスプラットフォーム、エコシステム良 |
| **TensorRT** | **5-10x** | パフォーマンス最優先、Jetson/エッジ最適 |

## 3. クイックスタート: PyTorch → TensorRT

### 3.1 ONNX エクスポート

```python
import torch
# 安全な読み込み: weights_only=True はテンソル/単純構造のみ許可し、逆シリアル化攻撃を防止
model = torch.load('model.pt', map_location='cuda', weights_only=True)
model.eval()
dummy = torch.randn(1, 3, 224, 224).cuda()
torch.onnx.export(
    model, dummy, 'model.onnx',
    input_names=['input'], output_names=['output'],
    opset_version=17,
)
```

### 3.2 ONNX → TensorRT Engine

```bash
# trtexec で engine に変換(Jetson ボード上で実行)
trtexec --onnx=model.onnx \
        --saveEngine=model.engine \
        --fp16 \
        --workspace=2048
```

### 3.3 Python 推論

```python
import tensorrt as trt
import pycuda.driver as cuda
import pycuda.autoinit
# engine の読み込み
with open('model.engine', 'rb') as f:
    engine = trt.Runtime(trt.Logger()).deserialize_cuda_engine(f.read())
context = engine.create_execution_context()
# (完全な推論コード: 入出力バッファの割り当て、execute_v2 実行)
```

## 4. パフォーマンスチェックリスト

- [ ] `--fp16`(半精度)を fp32 の代わりに使用 —— Jetson で大幅高速化
- [ ] 入力解像度をタスクの許容下限まで下げる
- [ ] `trtexec` で実フレームレートを確認
- [ ] バッチ処理(batch=1 はロボットシーンで通常最適)
- [ ] パワーモード確認(`sudo nvpmodel -m 0` フルパワーモード)

## 5. よくある質問

**Q: TensorRT が `Unsupported layer` を報告?**
モデルに TensorRT が未対応の演算子(動的制御フローなど)がある。対策: 新しい TensorRT バージョン、ONNX 簡略化ツール(`onnx-simplifier`)、opset 引き下げ。

**Q: fp16 精度への影響は大きい?**
ほとんどの CV モデルはほぼ無損失。検出/分割タスクは mAP の実測比較を推奨。

**Q: メモリ不足(workspace)?**
tensorrt engine の workspace または入力解像度を下げる。Orin 16GB 版なら余裕あり。

**Q: TensorRT でも遅い?**
本当に GPU を使っているか確認(`nvidia-smi` で監視)。GPU と CPU 間のデータコピー繰り返しがないか確認。

---

## 関連リンク

- [Jetson Orin NX Super 開発キット](/ja/products/jetson-orin-nx-super-kit)
- [JetPack フラッシングとシステム設定](/ja/topics/jetpack-setup)
- [具身知能入門](/ja/topics/embodied-ai-intro)

## 技術サポート

- 📧 メール：support@juxitech.com
- 🌐 公式サイト：[www.juxitech.com](https://www.juxitech.com)
