---

title: "AmazingHand 器用ハンド使用チュートリアル"

description: "AmazingHand オープンソース器用ハンドの完全チュートリアル：製品資料、カメラキット、Web ジェスチャー認識、MuJoCo ジェスチャートラッキング、インターフェース制御、Arduino Nano、TTL と PWM のデバッグ。"

---



# AmazingHand 器用ハンド使用チュートリアル



AmazingHand は、コスト 250 ドル未満のオープンソースの人間の手を模したハンドプロジェクトで、ロボット愛好家、研究者、開発者を対象としています。



## プロジェクト概要



- **機械設計**：8 自由度、4 本指で、各指は 2 節の指関節が連動。指はパラレルリンク機構で駆動され、外部ケーブルがなく、すべてのアクチュエータが手の内部に内蔵されています。3D プリント部品を使用し、重量は約 400g、コストは 200 ユーロ未満です。

- **制御方式**：Python シリアルバスドライバ（Waveshare などのハードウェアに対応）。Arduino + Feetech TTL Linker の 2 方式から選択可能。Python と Arduino のサンプルコードを提供。サーボのトルク開閉、位置センシング、温度監視などのフィードバックに対応します。

- **充実したリソース**：完全な BOM 部品表、CAD ファイルと Onshape オンラインドキュメント、組立チュートリアルとキャリブレーションスクリプト、基本・上級デモ例を提供し、逆運動学/順運動学に対応します。

- **プロジェクトのハイライト**：Reachy2 などのロボットの手首に適合。オープンな設計、コミュニティ主導。今後の計画には触覚センシング、弾性関節、指の長さのバリエーション、5 指構成などがあります。



## チュートリアル目次



| 内容 | 説明 |
|---|---|
| [製品資料](./product-info.md) | 製品仕様、BOM、構造と資料ダウンロード |
| [環境カメラキット取付](./Camera-Kit-Installation.md) | カメラキットブラケットの取付手順 |
| [Web ジェスチャー認識](./AmazingHand-Web-Control.md) | オンライン Web 制御とローカルデプロイ |
| [ジェスチャートラッキング（MuJoCo シミュレーション）](./gesture-tracking/02-Windows.md) | Windows / Linux / Mac ワンクリックデプロイ実行 |
| [インターフェース制御チュートリアル](./AmazingHand-Interface-Control.md) | Python GUI / コマンドライン制御、左右手のキャリブレーションとプロトコル |
| [Arduino Nano 使用チュートリアル](./Arduino-Nano-Tutorial.md) | Nano ボードの配線、ライブラリのインストールとデモプログラム |
| [TTL シリアルサーボのデバッグ-組立](./AmazingHand-TTL-Debugging.md) | TTL シリアルサーボの組立とデバッグ |
| [PWM サーボのデバッグ](./pwm-debugging/01-GUI-Visual-Control.md) | GUI 可視化、ジェスチャートラッキングと使用マニュアル |



## 資料ダウンロード



- [AmazingHand.zip](https://juxitech.feishu.cn/wiki/EoLawIK31i3xNNkVX8WcENGfn2d) — ジェスチャートラッキングのワンクリックデプロイ（Windows / Linux / Mac）

- [SCS0009_ServoController.zip](https://juxitech.feishu.cn/wiki/Qp06wpL4HiALsMkWHsKchxvKnJc) — Feetech SCS0009 サーボキャリブレーションツール

- [AmazingHand 公式リポジトリ](https://github.com/pollen-robotics/AmazingHand)
- [delivery_package.zip](/downloads/delivery_package.zip) — PWM 版配布パッケージ（GUI / ジェスチャートラッキング / ファームウェア / ドキュメント）
- [Amazinghand-web.zip](/downloads/Amazinghand-web.zip) — ローカルデプロイパッケージ
- [Juxi_ServoController.zip](/downloads/Juxi_ServoController.zip) — サーボデバッグツール


### すべてのページ

- [AmazingHand 器用なハンド製品資料](./product-info.md)
- [環境カメラキット取付](./Camera-Kit-Installation.md)
- [AmazingHand Web コントロール](./AmazingHand-Web-Control.md)
- [Windows ワンクリックデプロイ実行](./gesture-tracking/02-Windows.md)
- [Linux（Ubuntu）ワンクリックデプロイ実行](./gesture-tracking/01-Ubuntu.md)
- [Mac ワンクリックデプロイ実行](./gesture-tracking/03-macOS.md)
- [器用ハンド公式サンプル実行チュートリアル](./AmazingHand-Official-Example.md)
- [インターフェース制御チュートリアル](./AmazingHand-Interface-Control.md)
- [Arduino Nano 使用チュートリアル](./Arduino-Nano-Tutorial.md)
- [器用ハンド（TTL シリアルサーボ）デバッグチュートリアル](./AmazingHand-TTL-Debugging.md)
- [01-GUI 可視化制御](./pwm-debugging/01-GUI-Visual-Control.md)
- [02-ジェスチャートラッキングチュートリアル](./pwm-debugging/02-Gesture-Tracking.md)
- [03-PWM サーボバージョン-使用マニュアル](./pwm-debugging/03-PWM-Servo-Manual.md)
- [04-シリアルサーボバージョン-使用説明](./pwm-debugging/04-Serial-Servo-Guide.md)
- [全流程使用チュートリアル](./pwm-debugging/05-Full-Workflow-Tutorial.md)


<RelatedProducts slugs="amazinghand" />

