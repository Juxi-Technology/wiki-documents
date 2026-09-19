---
title: Feetech バスサーボ(SCS0009 / STS3215)
category: accessory
description: "Feetech 製シリアルバスサーボ。磁気エンコーダの STS とポテンショメータの SCSCL の 2 版があり、SO-ARM101 に搭載、FD 上位機でデバッグできます。"
keywords: [feetech, サーボ, scs, sts, シリアルバス]
---

# Feetech バスサーボ(SCS0009 / STS3215)

> **[ストアで購入](https://www.juxitech.com/ja/products/feetech-scs0009-serial-bus-servo)**

## 製品概要

Feetech(フィートック)シリアルバスサーボは SO-ARM101 などのロボットアームの駆動コアです。**SCS 通信プロトコル**に対応し、単一バスで複数サーボを接続。磁気エンコーダ(STS)とポテンショメータ(SCSCL)の 2 バージョンを提供し、Windows 上位機 FD ソフトウェアでデバッグできます。

**主な特長**:

- シリアルバス通信、単一バスで複数サーボ
- 磁気エンコーダ(STS)/ ポテンショメータ(SCSCL)2 バージョン
- 位置/速度/トルクのリアルタイムフィードバック
- メモリテーブル解析ドキュメント完備
- デュアル通信方式:TTL(高速)/ RS485(高耐ノイズ)
- 単一バス最大 254 個のサーボ(ID 0-253、ブロードキャスト ID 254)
- デフォルト 1M ボーレート、8 データビット、1 ストップビット
- 過熱/過圧/過電流/過負荷の多重保護
- FD 上位機デバッグ(Windows)

## 製品仕様

| カテゴリ | 仕様 |
|------|------|
| プロトコル | SCS シリアルバス |
| バージョン | STS3215(磁気エンコーダ)/ SCS0009(ポテンショメータ) |
| デバッグ | FD 上位機(Windows) |
| ボーレート | 1,000,000(上位機デフォルト) |

## クイックスタート

```bash
# 上位機デバッグ(Windows): feetechrc.com/software.html をダウンロード
# ポートを選択、ボーレート 1000000、「搜索」をクリック
```
## 関連チュートリアル

- [Feetech STS3215 & SCS0009 デバッグチュートリアル](/ja/tutorials/accessories/feetech/Feetech-STS3215&SCS0009-Tutorial)
- [SCS 通信プロトコル](/ja/tutorials/accessories/feetech/Feetech-SCS_Communication_Protocol)
- [磁気エンコーダ STS サーボ メモリテーブル解析](/ja/tutorials/accessories/feetech/Feetech-Magnetic_Encoder_STS_Servo-Memory_Table_Analysis)
- [ポテンショメータ SCSCL サーボ メモリテーブル解析](/ja/tutorials/accessories/feetech/Feetech-Potentiometer_SCSCL_Servo-Memory_Table_Analysis)

## サポート

- 📧 メール: support@juxitech.com
- 🌐 公式サイト: [www.juxitech.com](https://www.juxitech.com)
