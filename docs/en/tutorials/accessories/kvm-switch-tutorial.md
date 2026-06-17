# Tutorial on Using KVM Switches 

The KVM switch includes HUB functionality, TTL serial port, and Bluetooth module 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWRkMTk2MGI5MDFiZjA1MzRkZjk3YmU2ZTQyMTQxZTZfN2U5YTg0ODY4OGMwOWY3NGJlYjYyN2RhN2EyZTgwZTZfSUQ6NzYzODkzMTc5Mjc2NjY1MTMyMF8xNzgwMzg1MDExOjE3ODA0NzE0MTFfVjM)

## Individual module functionality

### 1. HUB Function

A single USB-TypeC cable can expand one USB port into three USB ports 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ODc2MDdiYTM3MzVmZGM1NDM0OTQ1NGFhNzdjMjgwMTNfYzY1ODI1ZDM5MTYzMzU1Nzg2NDcxOTU3MzEwZTQxYjRfSUQ6NzYzODkzMTc5NTI0MTE1OTY0MF8xNzgwMzg1MDExOjE3ODA0NzE0MTFfVjM)

### 2. TTL Serial Port

The pins from left to right are GND, RXD, TXD, TNOW, 3V3, and 5V, respectively. 

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDc4MWRkYzM0NTYxNDMyNzgzNDZkZDk1MzZlNDQwZjVfODAxYjI4MmViOTI5NGQ3OGFiZjE4NjY1MjhmOGVhYzJfSUQ6NzYzODkzMTc5Mzc4NTc4NTI4N18xNzgwMzg1MDExOjE3ODA0NzE0MTFfVjM)

### 3. Bluetooth Module

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZWUxNDY1MGFkMzU0MzUyYjQ4NTIwN2I4N2FiMmVhMzZfMDgxN2YzMmRjZmJjN2Q4NWNhYjQ2YjY2ZTIwZmUwNDJfSUQ6NzYzODkzMTc5NTU1OTYzMTgzMl8xNzgwMzg1MDExOjE3ODA0NzE0MTFfVjM)

Connect using AT commands, or change to slave mode, and the phone must connect via the 4.2 protocol 



## Double-ended switching

### 1. Device A + Device B (both ends have monitors)

Button Switch &amp; Infrared Remote Control Switch

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2M3ZTE2NTcxMDI1ZDg5MjI1NmI3NjMyNTA0MjAxMjdfY2FhNmMzNDllNThjMGY5ZmQ5N2IzODlhNGM0M2FmZDlfSUQ6NzYzODkzMTc5Mjc2NjY2NzcwNF8xNzgwMzg1MDExOjE3ODA0NzE0MTFfVjM)

### 2. Motherboard (without monitor) + Host (with monitor)

Only need toadditionallyuse a 4K HD HDMI capture device connected to the host, and then**on the hostuse software such as OBS and Potplay to capture**screen

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MmRjYWRkNDVmMGZkMDU4YTMxNzIzYWNjZDlkNTc0ZDZfZTNmYTlmYjM2MjY2YWM3ZjM1MmZlM2I1MTg2MGMzMjhfSUQ6NzYzODkzMTc5MzU5Mjg4MDA3Nl8xNzgwMzg1MDExOjE3ODA0NzE0MTFfVjM)

**4K HD HDMI Capture Device Wiring Operation**

According to the motherboard interface, there are the following three wiring operations 

**HDMI Interface** ——\> HDMI Cable ——\> HDMI Interface of the Collector ——\> USB/Type-C ——\> Displays such as Laptops, Computers, All in One, Phones/Tablets, etc.

**Micro HAMI Interface** ——\> Micro to HDMI Adapter ——\> HDMI Cable ——\> HDMI Interface of the Collector ——\> USB/Type-C ——\> Displays such as Laptops, Computers, All in One, Phones/Tablets, etc.

**DP Interface** ——\> DP to HDMI Adapter ——\> HDMI Cable ——\> HDMI Interface of the Collector ——\> USB/Type-C ——\> Displays such as Laptops, Computers, All in One, Phones/Tablets, etc.

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjgxYmM4NGUyZWZjNTVkOTdiNGNkMDI1MjExYTE0ZDZfMWY1YmMyYmZkN2U5ZmQ4NDBkNjQxYzE0NjU1YmVkNWJfSUQ6NzYzODkzMTc5NTE4ODEwODIxOV8xNzgwMzg1MDExOjE3ODA0NzE0MTFfVjM)

**OBS Operation Guide**

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=N2FlNWFlZjBkNjFlYzFiMTc4ODk2NTViYmQwZjJjYTBfNjRiZjk5ZDJjNTgwZjY1MjdhNWJkYmFmNjNjYTVkZjNfSUQ6NzYzODkzMTc5MjcyMDgyNTI3NF8xNzgwMzg1MDExOjE3ODA0NzE0MTFfVjM)

**Potplayer Operation Guide**

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWM1N2UzYTQ1ZTMxNjg2ZjJiNTZiNmZlYWE4MjlhYThfZTMwODY2ZDNmNmRiMDNjMTBkN2M0ZDUxYzFiMjczNDZfSUQ6NzYzODkzMTc5MzUxMzEzOTEyOF8xNzgwMzg1MDExOjE3ODA0NzE0MTFfVjM)





Example of Pin Diagram

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTBlNTQ4ZjAyYzQzYTUyMjE4ZDE1NmU1OTYwZmUwNTJfMjhkMjFhYjljYTFjMzhlZjcyNmVlNjU4N2I1YTQ5ZWVfSUQ6NzYzODkzMTc5MjU4MjM4MDUyMV8xNzgwMzg1MDExOjE3ODA0NzE0MTFfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZDg4OTViOTZjMzNhOTY2ZmY2NWIzNjg0MTIxM2E5YjJfYTJmNmRhZDE0NWMzMzQ1NGRiZmM2NTU1NzdiZjZiMDhfSUQ6NzYzODkzMTc5MzE5NDUwMzEyNV8xNzgwMzg1MDExOjE3ODA0NzE0MTFfVjM)

![Image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzBlZjI0NzY4ZWMyMWFjN2NkZDgxN2EyMTM0OTBiZmZfODJkYTE2MTliMTQ5ZWFlMjVjZjg5Yzg1MzUwNjA3ZmJfSUQ6NzYzODkzMTc5NTAxMDI3NjMyMV8xNzgwMzg1MDExOjE3ODA0NzE0MTFfVjM)

