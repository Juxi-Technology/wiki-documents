---
title: "串列埠協定"
description: "開啟附件中的命令词播报词协议列表V1中文檔案，能看到發送協定和接收協定，"
---

# 串列埠協定

開啟附件中的命令词播报词协议列表V1_中文檔案，能看到發送協定和接收協定，

## 1.功能性詞條解析

根據檔案能看到10個功能性詞條的發送和接收協定，

![圖 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/1.png)

功能性詞條我們可以透過解析協定的第三個位元組來區分

![圖 2](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/2.png)

其中第一第二個位元組（EF EF）表示訊框標頭，第三個位元組表示功能字的ID，第四個位元組表示命令詞的ID，第五個位元組（EE）表示訊框尾

## 2.命令詞條

命令詞條示例如下，命令詞中的第四個位元組表示ID

![圖 3](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/3.png)

例子：

比如我們對模組說小車停止，模組會透過串列埠發送FE EF 00 01 EE五個位元組，我們可以透過主控串列埠服務函式取得這一組資料，之後透過解析第四個位元組得到ID:01，這個時候就得知現在是小車停止。

## 3.播報語詞條

播報語詞條不會主動播報，必須要主控透過串列埠發送指令才會進行播報（命令詞條的播報語也可以進行播報）。

![圖 4](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/4.png)

其中第一第二個位元組（FE EF）表示訊框標頭，第三個位元組表示播報功能FF的，第四個位元組表示需要播報內容的ID，第五個位元組（EE）表示訊框尾

例字：

但我們需要播報“初始化完成”時，主控需要透過串列埠發送FE EF FF 67 EE給語音互動模組，發送完成之後，語音互動模組即可播報“初始化完成”

![圖 5](../../../../../public/images/tutorials/accessories/ai-voice-module/Serial-Protocol/5.png)

<RelatedProducts slugs="ai-voice-module" />
