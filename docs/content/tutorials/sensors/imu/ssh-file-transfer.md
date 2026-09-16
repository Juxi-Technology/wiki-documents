---
title: "SSH File Transfer"
description: "Download and extract it, double-click to open the program and start the installation, click Accept to accept …"
---

# SSH File Transfer

## I. WinSCP Program Installation

Remote login software.zip

Download and extract it, double-click to open the program and start the installation, click Accept to accept the agreement, then just follow the prompts to install.

![Image 1](../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/1.png)

![Image 2](../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/2.png)

![Image 3](../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/3.png)

Click Finish to complete the installation.

![Image 4](../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/4.png)

You can see that an extra WinSCP icon has appeared on the desktop

![Image 5](../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/5.png)

## II. SSH Remote File Transfer

After opening the WinSCP software, the following login interface appears.

File protocol: select SFTP for the file protocol; Host name: IP address; Port number: the default 22 is fine; User name: username; Password: login password.

After entering the correct information, you can click Save to save the information you filled in, so that you do not need to enter it again the next time you log in.

![Image 6](../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/6.png)

After clicking Login and logging in successfully, the following interface will be displayed; the left side is the folder of the Windows computer, and the right side is the folder of the nano.

![Image 7](../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/7.png)

There are three ways to transfer files. The first is to drag the file directly from the left side to the right side, or from the right side to the left side, and the system will automatically copy the file over.

The second is to select the file with the mouse and then press the F5 key, and the selected file will be copied to the other side.

The third is to select the file and right-click the mouse; if you are transferring from the Windows computer to the nano, click upload,

![Image 8](../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/8.png)

A prompt will pop up; you can choose not to show it again, and click OK, then the file will be transferred automatically.

![Image 9](../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/9.png)

If you are transferring files from the nano to the Windows computer, right-click to select the file and choose Download

![Image 10](../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/10.png)

Note: File transfer requires the computer and the board to be under the same local area network, and the Raspberry Pi to have the SSH service enabled. Sometimes if file transfer fails, it is usually because the board does not have sufficient permissions; we just need to grant the highest permissions.

```Plain Text
chmod 777 目录名 
```



