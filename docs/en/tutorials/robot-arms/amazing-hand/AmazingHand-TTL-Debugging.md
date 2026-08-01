# Debugging Tutorial for AmazingHand (TTL Serial Servo)

First, download the " [Amazing Debugging.zip ](https://juxitech.feishu.cn/wiki/I4K0w3W0Ri7u7EkY1qfcVoGon6e)" Compressed Packet. After decompression, you can use the "Debugging Dexterous Hand Process with Arduio Program (TTL Servo) " document to set the servo ID, calibrate, calibrate the median, and run the demonstration program, or refer to the [official open source code ](https://github.com/pollen-robotics/AmazingHand/tree/main/ArduinoExample).

**Without disassembling the finished product ** (the factory servo ID settings, calibration, and calibration of the neutral position have been adjusted), you can directly skip to **[** Point 6 Run "02 Demo Program" **](https://juxitech.feishu.cn/docx/OmmSdaXt7oZXBUxIwUacAI3Jnrc#doxcn2d0kH1XOXx1SlxvsF1x5df)** and Point 7 **[** Hand Tracking **](https://juxitech.feishu.cn/docx/OmmSdaXt7oZXBUxIwUacAI3Jnrc#doxcnjsmqox3aQVF6pVKanOCRng)**. **

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTQ0NjE2ZmE3MmFlM2ZkMGQ5YmE2MmY3NTUyZDdjMWRfZjY1YjhhN2Q4ZjhhOWQ0NGE5ZWM4YWRjZDY3N2EwYjZfSUQ6NzYzODkzOTYxMTI1MDc4OTMzM18xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 1. Debug the wiring method of the dexterous hand

One way is to use a computer to run host computer software such as Python, for example, the Feite Servo Host Computer or running Python code 

One is to use single-chip microcomputers such as MEGA328P, or self-purchased development boards or main controllers, etc.

The wiring method is as follows: 

(1)Wiring method during Python debugging(only connect the servo driver board): 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTdmMjBiMGQzMTI2ODllOWMzYTU2N2ZkYWZlMzVkODdfNjNlZTQ2OTI4M2M3Mzg2NmZmZDNiYjI5Zjc3NDg0MjZfSUQ6NzYzODkzOTYxMTQ4OTg0ODI5MV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(2)Wiring method during debugging of MEGA328P development board(Servo Driver Board + 328P Development Board):

**Take a good look at the pin positions of the MEGA328P development board! **

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjFjYzRiMGQ0ZGNjN2M0MmUyMTY1MjNiMjQ4MzQ4NmZfM2JmYWU5NmZjNDQyY2Y1MGZkNzExYTJiMDg1OGRlMjlfSUQ6NzYzODkzOTYwOTIwNDM5NDk2NV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzIxZTg3NzMxNzZiYTRhMWMzNmM5ODJhMzZhNTE2YzZfNDY1MTNkNTI3YTVmYzBkY2U2YjViZTQzZDU2YmI5NzBfSUQ6NzYzODkzOTYxMDQxMjE0MTUzNV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmYwNzM3ZjRiZjk3Njg1M2UyOGMwNzM0NmJhNjliMDNfNGE0NmRlYTI3MDY4ZDA1M2IwNTI3NTczZDE3NTBhNzhfSUQ6NzYzODkzOTYwOTU2NDkwODUwNV8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTUwM2U2Nzc0MjVhNzczODJiMGUwNjA0YTdjZWM0YTVfYWU4ZTQzOWRjOTlkOWU4NjhlNWFlOGJiODViNzNjNDRfSUQ6NzYzODkzOTYwNzY5MDk3MjEwOF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

The following describes the debugging process of using a microcontroller. The microcontroller itself will continuously loop through the demonstration program, and it can be stopped simply by disconnecting the data cable. 

## 2. Set Servo ID

A single dexterous hand uses a total of 8 servos, with the right hand ID needing to be set to 1-8 and the left hand ID needing to be set to 11-18 

Median calibration, finished product default, right hand [451,571,451,571,451,571,451,571], left hand [571,451,571,451,571,451,571,451] 

1. Wiring: Connect the **single** servo motor and servo driver board in sequence.

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWM0NTY2YjdjZWU5ZmNiNmJhZWRhODg0NjgwZDJiZjlfNjMzNGZmNzY1NTg3YmM5ZTMyNGRlYzk4YzdiMmZhYmNfSUQ6NzYzODkzOTYwNzUzOTQzNjUxN18xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

2. Use the upper computer software FD1.9.8.2 provided by the servo manufacturer for configuration

[FD.rar]

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NmI3MTMyZTFlMjRmM2U1OTY3M2JkN2ZlYWYwM2MyMzdfYjA0NzhmZDNjODMyYjNiNmYyZjBkN2Q2NzJkNDUxMmVfSUQ6NzYzODkzOTYwODM0OTAxOTA5MF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZGJmNWE2MGEwZGU4ZGUxMWU4ZDA2YWIwYWFkMDk3YzJfMjcxOGRlZTE2Mjg3MDQ0OWExNjJmODU1OTBmYTBhZDRfSUQ6NzYzODkzOTYxMDcyNjY4MTU3NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmQyNGIyMTQwOTExYzM3YzJhNGY2ZWQwMGZkOGI5NjdfZWJiYTYwZDZjNDlmNzY1OGRjYjEwMmRhMGEzMWZkZDBfSUQ6NzYzODkzOTYwODAxMzQ0MTk4MF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 3.**Fix the servo horn**

1. Upload the code program "used when installing the white servo horn" to the development board

Function of this program: Position the gear of the servo motor at a roughly centered position, and subsequent action angles are all based on this centered position.

(1) Install the software Arduino by yourself, and refer to the [installation tutorial](https://blog.csdn.net/weixin_35509395/article/details/156188274) according to your own system. If you want to compile and download the Arduino program, you need to first install the FTServo library and SCServo library in the Library Manager.

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjU0NGRjM2VhZDU4NGViMmU4YjBkNjQ3OGRmYzMxOGFfMzYxMzAxMDM1NmFhYjFjM2ZhMTlmODMwNDBiOWUwMzlfSUQ6NzYzODkzOTYwNzU1MjI4MTUzOF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(2) Development board type selection: Select "Arduino Nano" 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjdiYmNjMzFjMjE3OTZkNjAzYjZkM2RhZDRiZDY5MDFfZTVjNTAyZGU5ZGFmYmJmYzgwNDI3YzMyOWNmMjljYzVfSUQ6NzYzODkzOTYxMTUyMzQ1MTg1NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

2. Debug Servos 1 and 2

(1) Edit: Modify the following positions according to the ID of the servo to be debugged. For example, if you want to debug the index finger, set the ID values to 1 and 2.

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=N2UyYzFjYmJiNjA3YTZkMjY4MWZkYjdhMzFhMDNkZDlfMjQ4NjdlY2M4ZjI2ZjcxNjJlNDc5YmQyNGNmNGZhYzVfSUQ6NzYzODkzOTYwNzYyMzQwNDUxN18xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(2) Upload the program to the development board 

(3) Wiring: Connect the development board to the servo driver board, **servos No. 1 and 2**, and you can hear the servo gears rotate a certain angle and then stop.

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2U4MTBhZWY4YmY0Y2MzOWU5MzhiODA0ZDZhODc4MzRfZGEzZjM4ODdkOWQ1MTJmZjNiYmQxNTMyMjQ2ZDQ0MDZfSUQ6NzYzODkzOTYwNzkzNTY4MzU1OF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(4) Install the servo horn on the gear, keeping the position as parallel as possible.

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTUyMDI0ODVjYjhhNDBjZDJkZmQ1YjNmMzA2NDc5ZTlfNTUxNmQ2MWQwOTdmYzdjOTM2YTNkZTkxYzYzYjI5YmVfSUQ6NzYzODkzOTYwODAxMzQ1ODM2NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

3. Debug servos 3 and 4

(1)**Disconnect the wiring between the 328P development board and the servo driver board (otherwise uploading will not be possible)**

(2) Edit: Set ID values to 3, 4

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2RlNzE0MzI1ZDYxY2I2YjE4Y2YyNWZkYjM0MTgyOGFfZTI2MWI2MmQ0NmJlNTgwOTEzZDAzN2U4OGRmOTkwNDFfSUQ6NzYzODkzOTYxMTI0NjY2MDU3OF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(3) Upload the program to the development board 

(4) Connection: Connect the development board with the servo drive board, **3 and 4 **servos, and you can hear the servo gear rotate at a certain angle and stop.

(5) Install the servo horn on the gear, keeping the position as parallel as possible

4. Debug servos 5 and 6

The steps are the same as above 

5. Debug servos 7 and 8

The steps are the same as above 

## 4.**Fine-tune intermediate values**

1. Upload the code program "01 Used when fine-tuning MiddlePos value" to the development board

2. When the finger is in the closed position, immediately stop the program (simply disconnect the data cable), and check whether the servo horn is correctly aligned (as shown in the figure below). If it is not aligned, adjust the values of MiddlePos_1 and MiddlePos_2 in the program until it is aligned. Record these values (8 values corresponding to 8 servos), which will be used in the final program.

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmExMWZhZTY2NTUxMWE0OGJkMjg5OWJjM2QwNjcwMmJfNDE3MzY4ODI3OGRjNTU0YjlhMDA3ZDViMGNkZmUxNjZfSUQ6NzYzODkzOTYxMTE5MjAxOTkyMF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmY0ZTAyNTRkNGQ5OGQyMTAyZTkwNDk0Y2RmNDAzMjRfZGRjODE0NjQwODBlOTJkY2Q5NzUwN2M3OTZmYjEwZjlfSUQ6NzYzODkzOTYwODEwMzQ1NTY5NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 5.**Run the test program**

1. Fill the values of MiddlePos_1 and MiddlePos_2 saved above into the following array, and then download the program.

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzA4ZmVjODQzYzU3ZjIwMjU2NGQ1NjQ4YzFkZjFjZDdfMmU3ZDU0NGJiODU3OWI4ZDQzNDNiNzY0YjNkYzllYWZfSUQ6NzYzODkzOTYxMTI2MzQzNzc2Ml8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## 6.**Run "02 Demo Program"**

(1) Install the software arduino by yourself, referring to the [installation tutorial according to your own system](https://blog.csdn.net/weixin_35509395/article/details/156188274)

(2) Under the ` Dexterous Hand Debugging \00 TTL Serial Servo \ Arduino Program (MEGA328P Development Board) \02 Demo Program ` directory, open the corresponding ino file based on whether it is the left or right hand 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MGU3YzRlZWM2ZDRiNWZmYjNjMWQ3MmQzNGVkOTYxNTNfNzE3NWFjMGY4MGY4ZjJkYmJhMGY1NjhiMDAxNTFlMmVfSUQ6NzYzODkzOTYwODAxMzQ5MTEzMl8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(3) If you upload the Arduino program to the development board, you need to install the FTServo library and SCServo library in the library manager

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzgwNjdhZWY4ZjAzNmIzNzMyYmIzMGZkYzE0OTNiMTBfNmU3ODBjZTA2ODMwMzc5MWJhMDJmNDkzMDU3MmY1MjlfSUQ6NzYzODkzOTYwNzk0NjU3ODg3Ml8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(4) Select the development board type: Choose "Arduino Nano"

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTc0YjYyYjRjMTY4NGI5NzIxN2RhNjA0MTQ5YzE3OTRfYjYzZGYyNjkwMzY5ZTM3MjIzZWIxNmI4MWUzMGMxNmZfSUQ6NzYzODkzOTYxMTUwMjQxNDgwMl8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

(5) Compile and upload

Note that at this time, the computer is only connected to the development board alone, and the development board is not connected to the servo driver board (i.e., not connected to the dexterous hand) for the time being.

After successful upload, connect the development board to the servo driver board via three jumpers, and connect the servo to the servo driver board, referring to the wiring method in [ MEGA328P Development Board Debugging ](https://juxitech.feishu.cn/docx/OmmSdaXt7oZXBUxIwUacAI3Jnrc#doxcniHLi7JvMCniati2Mrgr6ne)[ ](https://juxitech.feishu.cn/docx/OmmSdaXt7oZXBUxIwUacAI3Jnrc#doxcniHLi7JvMCniati2Mrgr6ne)

The dexterous hand will continuously loop and run ** "02 Demo Program" **

The running results are as follows 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTY0NzA2NGI2OTBjNzkwODE4ZGFhNGM2ZDFkNjhhMzFfZDMxNjlmZWZhNmMxYjQ0YTNhMjZhZWEzYWU0OGY2YzBfSUQ6NzYzODkzOTYwOTI1NDY0NDY3NF8xNzgwMzE3MjM0OjE3ODA0MDM2MzRfVjM)

## [7. Hand Tracking](https://juxitech.feishu.cn/wiki/ZpHmwYARQiN2fwkqFJecqUFZnQg)



