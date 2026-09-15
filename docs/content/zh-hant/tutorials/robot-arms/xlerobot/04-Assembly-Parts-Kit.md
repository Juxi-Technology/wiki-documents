---
title: "⚒️散件組裝"
description: "如果你寧願跳過擰螺絲的樂趣，你也可以購買適配Xlerobot的SO101從動臂的預組裝套件。"
---

# ⚒️散件組裝

![圖 1](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/1.png)

小技巧

如果你寧願跳過擰螺絲的樂趣，你也可以購買適配Xlerobot的SO101從動臂的[預組裝套件](https://item.taobao.com/item.htm?ft=t&id=1002551208989&spm=a21dvs.23580594.0.0.47b32c1bwUlxLA&skuId=6088534920039)。



## 🦾 SO101機械手臂

![圖 2](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/2.png)

> 如果你已經有2個配置了伺服馬達的組裝好的SO101機械手臂，請跳過。
> 
> 

- 按照[SO101逐步組裝說明](https://juxitech.feishu.cn/wiki/HllBwhjJ1iayMdkUTGgcyKbgn8g)構建2個SO101機械手臂，製作2個相同的從動臂，配備2套伺服馬達(之前都ID為1-6)用於2個伺服馬達驅動板。

- 按照這個[安裝指南](https://juxitech.feishu.cn/wiki/LjJywf5ILihuwkkOboGcFx1Qnkc)添加手腕相機。

- 如果你有防滑墊，可以將其貼在夾爪上。

## 一、配置伺服馬達

||數量|伺服馬達id|用途|
|---|---|---|---|
|飛特STS3215-C018伺服馬達|3|7、8、9|萬向輪底盤車|
|飛特STS3215-C018伺服馬達|2|7、8|上肢套件-相機塔|
|伺服馬達延長線90CM|2||將底盤車和相機塔連接伺服馬達驅動板|

![圖 3](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/3.png)

> 由於官方lerobot程式碼庫目前不支援除機械手臂外的伺服馬達配置，我們使用[Bambot](https://bambot.org/)代替(在Windows和Mac上工作，Linux需要先執行sudo chmod 666 /dev/ttyACM0)。
> 
> 

```Plain Text
sudo chmod 666 /dev/ttyACM0
```

- 將你想要配置的伺服馬達(逐個)連接到伺服馬達驅動板，並直接將伺服馬達驅動板連接到你的電腦。

- 導覽到[Bambot的伺服馬達配置頁面](https://bambot.org/feetech.js)，建立連接並掃描你的伺服馬達。 

![圖 4](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/4.png)

- 按照下面的說明重新命名伺服馬達ID。 

![圖 5](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/5.png)

- 除了SO101機械手臂外，你還需要為2個 伺服馬達驅動板 配置兩套伺服馬達：

    - 一套用於**相機塔**(伺服馬達id：7, 8)

    - 另一套用於**萬向輪底盤車**(伺服馬達id：7, 8, 9)。

- 提示：用記號筆在伺服馬達上寫數字，並區分不同板子的伺服馬達(如L1-L8和R1-R9)。

## 🛒 推車

- 萬一你意外扔掉了手冊，[這裡有一份](https://github.com/Vector-Wangel/XLeRobot/blob/main/others/Manuals_raskog_utility_cart.pdf)。

![圖 6](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/6.png)

## 🧑‍🦼‍➡ 輪式底座

> 如果你已經有一個Lekiwi底座，請拆下電池、伺服馬達支架等。底板只需安裝3個帶輪子的伺服馬達(保留接線)。
> 
> 

![圖 7](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/7.png)

**備註**

不要選錯板子，每個板子都有特定的順序。

- 根據上圖將 全向輪 安裝到板子上。

    - 應相應安裝特定的伺服馬達id。

- 注意全向輪的連接器需要3個M4螺絲。

- 按照[教學](https://github.com/SIGRobotics-UIUC/LeKiwi/blob/main/Assembly.md#2-bottom-plate-assembly)正常接線伺服馬達，之後不要將伺服馬達線纜連接到伺服馬達驅動板，而是使用 **90CM伺服馬達延長線** 來連接 伺服馬達驅動板。

![圖 8](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/8.png)

- 根據上圖安裝頂板。

- 讓 **90CM伺服馬達延長線** 懸掛，暫時不要從 頂板孔 拉出來。

![圖 9](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/9.png)

- 根據上圖在頂板上安裝3個連接器（增高架）。

小技巧

將帶連接器的Lekiwi底座放在推車下方，看看是否能給推車足夠的壓力，推車的四個輪子仍能接觸地面。如果不能，嘗試透過在切片軟體中直接稍微調整z軸比例(保持xy軸比例不變)來修改連接器的3D模型並重新列印。

![圖 10](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/10.png)

小技巧

翻轉推車進行下面的組裝。

- 現在將帶連接器的Lekiwi底座安裝到推車的底部，較薄的板子在另一側。

- 參考圖片根據伺服馬達索引找到所需的組裝方向。

備註

這個新硬體版本與推車金屬網格相容，所有12個M3螺絲都應該能夠輕鬆裝入。

![圖 11](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/11.png)

- 然後，將之前延長的線纜從下方穿過推車向上佈線。

## 🦾 機械手臂底座

### 頂部底座組裝

14個 M3\*12 六角螺絲

4個 M3\*16 六角螺絲

![圖 12](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/12.png)

- 當底座翻轉過來時組裝更容易。

### 頭部組裝

①先用 90CM伺服馬達延長線（黑白相間）和 伺服馬達線（白紅黑相間） 插在7號伺服馬達上。



②用四個 M2\*6墊片螺絲 將攝影機固定

![圖 13](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/13.png)

- 注意安裝舵盤時，舵盤的中間孔不鎖螺絲。

- 這應該與[SO101機械手臂組裝](https://huggingface.co/docs/lerobot/so101#joint-1)的前兩個步驟相同。

## 🧵 接線

重要

在將頂部底座夾到推車之前，完成頂部底座的所有接線和線纜管理，並將Raspberry Pi放入其外殼中。

![圖 14](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/14.png)

- 將來自**Lekiwi底座**的 90CM伺服馬達延長線 連接到 **左 SO101機械手臂**(這使底座和機械手臂成為Lekiwi)。

- 將2根**USB-C轉USB-A資料線 **從2個 **伺服馬達驅動板** 連接到 **Raspberry Pi**(剩下2個USB-A插槽用於相機)或Jetson主機板。

- 連接所有3根**電源線纜**：2根**USB-C轉DC(12V)從2個伺服馬達驅動板**和1根**USB-C轉USB-C**從**Raspberry Pi**，連接到電源的 PD快充 接口。每個接口在同時充電時提供高達100W功率，經測試足以支援12V版本運行。

### 🔋 放置電池 🛒

- 放在推車中層或下層的任何位置以保持低重心。電池有防滑底部，在正常操作中不易滑動。

- 為了安全保持直立放置。

- 萬一你也意外扔掉了電池手冊，[這裡有一份](https://github.com/Vector-Wangel/XLeRobot/blob/main/others/Manual_Anker_SOLIX_C300_DC_Portable_Power_Station.pdf)。

重要

為了保護伺服馬達驅動板，確保最後連接電源線纜。在插拔其他線纜時始終斷開電源線纜。

## 📸 最終組裝

### 底座裝入推車

重要

在將頂部底座夾到推車之前，完成頂部底座的所有接線和線纜管理，並將Raspberry Pi放入其外殼中。

![圖 15](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/15.png)

- 當你將推車邊緣塞入外殼插座時要小心不要弄壞外殼。

- 為了更容易測試，SO101機械手臂直接夾在推車上。將[機械手臂底座](https://github.com/Vector-Wangel/XLeRobot/blob/main/3D_Models/3D_models_for_printing/XLeRobot_special/SO_5DOF_ARM100_Assemblybases.stl)定位在推車頂層的兩個角落，然後用 **F型固定夾** 固定。

- 如果你有 bambulab耗材紙質線軸，不要忘記將其放在裡面以提供穩定的結構支撐。

![圖 16](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/16.png)

完成這些步驟後，XLeRobot應該在物理上組裝良好，準備做一些家務。

![圖 17](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/17.png)

![圖 18](../../../../../public/images/tutorials/robot-arms/xlerobot/04-Assembly-Parts-Kit/18.png)

重要

XLeRobot完全組裝後，不要像推車那樣推著它到處走，因為這可能損壞伺服馬達齒輪。相反，當你需要手動移動時，請抬起機器人(~12kg)。



