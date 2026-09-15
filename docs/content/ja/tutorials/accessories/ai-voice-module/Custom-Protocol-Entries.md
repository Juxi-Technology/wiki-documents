---
title: "カスタムプロトコルエントリーの作成"
description: "モジュールは出荷時に音声認識機能のファームウェアがすでに書き込まれており、資料の圧縮ファイル内にも出荷時ファームウェアが提供されています。ファームウェアを作り直す必要がある場合は、以下の手順に従ってファームウェアを作成…"
---

# カスタムプロトコルエントリーの作成

## 1.音声チップファームウェアの作成

## 1.1注意事項

モジュールは出荷時に音声認識機能のファームウェアがすでに書き込まれており、資料の圧縮ファイル内にも出荷時ファームウェアが提供されています。ファームウェアを作り直す必要がある場合は、以下の手順に従ってファームウェアを作成できます。

## 1.2ファームウェアの作成

まず “[启英泰伦音声 AI プラットフォーム](https://aiplatform.chipintelli.com/)” のリンクを開き、ファームウェア作成の公式サイトに入ります。  メニューバーの “機能開発” をクリックし、次に製品開発欄の下にある “オフライン音声認識大規模モデルアプリケーション” をクリックします。

![図 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/1.png)

このときログインが必要である旨が表示されます。ここではご自身の情報でプラットフォームのアカウントを登録する必要があります。本チュートリアルでは事前に登録済みです。ログイン後に再度 “音声認識ファームウェアおよび SDK 開発” をクリックします。

![図 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/2.png)

ページが遷移したら、左側の新規プロジェクトをクリックし、下図に従って製品を新規作成します。このうち製品名と説明は自由に設定でき、その他の情報は赤枠の内容に従って選択する必要があります。製品タイプは “汎用->スマート中央制御” を選択し、完了したら作成をクリックします。

![図 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/3.png)

次にプロジェクトの基本情報を入力します。ここでは中国語を認識する必要があるため、言語タイプは “中国語” を選択します。英語を認識する必要がある場合は、それに応じて変更することもできます。その他の情報は下図に従って選択し、完了したら続行をクリックします。

![図 4](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/4.png)

次にファームウェアを設定します。ここでは変更が必要な部分のみを説明します。アルゴリズムパラメータのエコーキャンセルをオンにします。

![図 5](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/5.png)

ハードウェアパラメータでは、水晶振動子ソースを “内蔵 RC” に選択する必要があります。

![図 6](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/6.png)

プリント用シリアルポート設定では、UART0 のレベルをオープンドレイン機能に設定し、外部 5V プルアップに対応させます。

![図 7](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/7.png)

通信シリアルポート設定を変更し、ボーレートを 115200 に設定し、UART1 のレベルをオープンドレイン機能に設定して外部 5V プルアップに対応させます。設定完了後、“続行” をクリックして次のステップに進みます。

![図 8](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/8.png)

次にコマンドワード編集機能に進みます。まず再生する音色を選択する必要があります。ここでは “小蝶-清新女声 Ver.3” を選択します。

![図 9](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/9.png)

続いてコマンドワードの添付ファイルをアップロードします。本文書と同じパスにある “命令词播报词协议列表V1_中文” 表を見つけ、Web ページに直接ドラッグしてアップロードします。

![図 10](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/10.png)

ファイルをアップロードすると、下の表でコマンドワードのデータを確認できます。

![図 11](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/11.png)

自己学習機能をオンにして指定学習を選択します。このときシステムは 4 つの自己学習コマンドを自動生成しますが、ここでは変更しません。

![図 12](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/12.png)

送信後、数分待つとファームウェアの作成が完了します。完了後にファームウェアをダウンロードをクリックすると、作成したファームウェアを取得できます。

![図 13](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/13.png)

ファームウェアの書き込み手順は《[モジュールファームウェアの書き込み](https://juxitech.feishu.cn/wiki/FfE8wbL1wipUWgkUKW6cbsw2nOe)》をご覧ください。

## 2.機能エントリーの変更

添付ファイル内の命令词播报词协议列表V1_中文ファイルを開きます。

![図 14](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/14.png)

表の中の機能エントリー、つまり表の最初の 10 項目を見つけます。注意が必要なのは、ここでの最初の 10 件の機能エントリーはすべて固定エントリーであり、新規追加はできず、変更のみ可能です。

![図 15](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/15.png)

ここではウェイクワードの再生フレーズを変更する例を挙げます。もともと “你好，小犀” を認識した後に “在的” を再生していたものを、“我在” を再生するように変更します。

![図 16](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/16.png)

修正が完了したら保存し、続いて “1.2 ファームウェアの作成” の手順に従って、表を Web サイトにインポートします。すでに一度ファームウェアを作成したことがある場合は、以前のプロジェクトの “継承” ボタンをクリックすると、パラメータ設定の手順を省略できます。

![図 17](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/17.png)

ファームウェアを作り直した後、さらにファームウェアを音声対話モジュールに書き込む必要があります。これで機能エントリーの変更が実現できます。

## 3.コマンドエントリーの追加

添付ファイル内の命令词播报词协议列表V1_中文ファイルを開きます。

![図 18](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/18.png)

表の最下部に新しいコマンドエントリーを追加します。ここでは “打扫房间” というコマンドワードを新規追加する例を挙げます。

![図 19](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/19.png)

ここでは機能タイプを “命令词” に選択し、同時に再生モードを “主” に設定する必要があります。これにより “打扫房间” を認識した後に “好的” をアクティブに再生できます。

![図 20](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/20.png)

次に送信プロトコルについて説明します。データの 1 番目と 2 番目はデータフレームヘッダーであり、変更する必要はありません。機能タイプとしてコマンドワードを選択した場合、送信プロトコルに従って 3 番目のデータは必ず “00” でなければなりません。これはコマンドが “命令词” なのか “播报语” なのかを区別するためです。

![図 21](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/21.png)

4 番目のデータはコマンドワードのデータ ID です。これは 16 進数のデータで、前のコマンドワードの ID が “8B” であるため、この桁は “8C” に設定する必要があります。特殊な場合にはデータ ID を同じにすることもでき、例えば以下の 2 つのコマンドワードの返す結果が一致する場合などです。

![図 22](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/22.png)

プロトコル内の 5 番目は固定で “EE” であり、同様に変更する必要はありません。表の中では、送信プロトコルと受信プロトコルを一致させる必要があります。

![図 23](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/23.png)

修正が完了したら保存し、続いて “1.2 ファームウェアの作成” の手順に従って、表を Web サイトにインポートします。すでに一度ファームウェアを作成したことがある場合は、以前のプロジェクトの “継承” ボタンをクリックすると、パラメータ設定の手順を省略できます

![図 24](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/24.png)

ファームウェアを作り直した後、さらにファームウェアを音声対話モジュールに書き込む必要があります。これでコマンドエントリーを追加する機能が実現できます。

## 4.再生フレーズの追加

添付ファイル内の命令词播报词协议列表V1_中文ファイルを開きます。

![図 25](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/25.png)

表の最下部に新しいエントリーを追加します。ここでは “现在是晚上” という再生フレーズを新規追加する例を挙げます。

![図 26](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/26.png)

ここでは機能タイプを “播报语” に選択し、同時に再生モードを “被” に設定する必要があります。

![図 27](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/27.png)

次に送信プロトコルについて説明します。データの 1 番目と 2 番目はデータフレームヘッダーであり、変更する必要はありません。機能タイプとして再生フレーズを選択した場合、送信プロトコルに従って 3 番目のデータは必ず “FF” でなければなりません。これはコマンドが “播报语” であることを区別するためです。

![図 28](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/28.png)

4 番目のデータはコマンドワードのデータ ID です。これは 16 進数のデータで、前の再生フレーズの ID が “8B” であるため、この桁は “8C” に設定する必要があります。

プロトコル内の 5 番目は固定で “EE” であり、同様に変更する必要はありません。表の中では、送信プロトコルと受信プロトコルを一致させる必要があります。

![図 29](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/29.png)

修正が完了したら保存し、続いて “1.2 ファームウェアの作成” の手順に従って、表を Web サイトにインポートします。すでに一度ファームウェアを作成したことがある場合は、以前のプロジェクトの “継承” ボタンをクリックすると、パラメータ設定の手順を省略できます。

![図 30](../../../../../public/images/tutorials/accessories/ai-voice-module/Custom-Protocol-Entries/30.png)

ファームウェアを作り直した後、さらにファームウェアを音声対話モジュールに書き込む必要があります。これで新しい再生フレーズを追加する機能が実現できます。

<RelatedProducts slugs="ai-voice-module" />
