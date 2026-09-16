---
title: "SSH檔案傳輸"
description: "IMU 模組 SSH 檔案傳輸教程:安裝遠端登入軟體,透過 SSH 連線開發板,在電腦與裝置之間上傳下載檔案。"
---

# SSH檔案傳輸

## 一、WInSCP程式安裝

遠程登錄軟件.zip

下載並解壓，雙擊打開程式並且開始安裝，點擊Accept接受協定，然後跟着提示安裝就好。

![圖 1](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/1.png)

![圖 2](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/2.png)

![圖 3](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/3.png)

點擊Finish完成安裝。

![圖 4](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/4.png)

可以看到桌面多了一個WinSCP的圖示

![圖 5](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/5.png)

## 二、SSH遠程傳檔案

打開WinSCP軟件後出現以下登錄介面。

File protocol：檔案協定選擇SFTP，Host name：IP地址，Port number：預設22就可以，User name：使用者名，Password：登錄密碼。

輸入正確的資訊後可以點擊Save保存一下填寫的資訊，下次登錄的時候不用重複輸入。

![圖 6](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/6.png)

點擊Login登錄成功後會顯示以下介面，左邊的是win電腦的資料夾，右邊的是nano的資料夾。

![圖 7](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/7.png)

檔案傳輸有三種操作方式，第一種是直接把檔案從左邊拉到右邊，或者從右邊拉到左邊，系統會自動複製一份檔案傳輸過去。

第二種是滑鼠選中檔案，然後按一下F5鍵，則被選中的檔案會複製一份到另一邊。

第三種是選中檔案點擊滑鼠右鍵，如果是從win電腦傳到nano則點擊upload，

![圖 8](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/8.png)

會彈出一個提示，可以選擇不再提示，並且點擊OK，則檔案自動傳輸過去。

![圖 9](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/9.png)

如果從nano傳檔案到win電腦上，則按滑鼠右鍵選中檔案，選擇Download

![圖 10](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/10.png)

注意：檔案傳輸需要電腦和主板在同一個區域網絡下，並且樹莓派已開啟SSH服務才可以進行。有時若遇見傳輸檔案失敗一般是主板這邊的權限不夠，我們只需要給予最高權限。

```Plain Text
chmod 777 目录名 
```



