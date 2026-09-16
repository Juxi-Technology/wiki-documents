---
title: "SSH-Dateiübertragung"
description: "SSH-Dateiübertragung für das IMU-Modul: Remote-Login-Software installieren, per SSH mit dem Board verbinden und Dateien zwischen PC und Gerät übertragen."
---

# SSH-Dateiübertragung

## 1. Installation des WInSCP-Programms

Remote-Login-Software.zip

Laden Sie das Programm herunter und entpacken Sie es, doppelklicken Sie, um das Programm zu öffnen, und beginnen Sie mit der Installation; klicken Sie auf Accept, um die Vereinbarung zu akzeptieren, und folgen Sie dann einfach den Anweisungen zur Installation.

![Abb. 1](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/1.png)

![Abb. 2](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/2.png)

![Abb. 3](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/3.png)

Klicken Sie auf Finish, um die Installation abzuschließen.

![Abb. 4](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/4.png)

Sie können sehen, dass auf dem Desktop ein WinSCP-Symbol hinzugekommen ist.

![Abb. 5](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/5.png)

## 2. Dateiübertragung per SSH-Fernzugriff

Nach dem Öffnen der WinSCP-Software erscheint die folgende Anmeldeoberfläche.

File protocol: Wählen Sie als Dateiprotokoll SFTP, Host name: die IP-Adresse, Port number: die Standardeinstellung 22 ist in Ordnung, User name: der Benutzername, Password: das Anmeldepasswort.

Nach Eingabe der korrekten Informationen können Sie auf Save klicken, um die eingegebenen Informationen zu speichern; bei der nächsten Anmeldung müssen Sie sie nicht erneut eingeben.

![Abb. 6](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/6.png)

Nach einer erfolgreichen Anmeldung durch Klicken auf Login wird die folgende Oberfläche angezeigt; links befindet sich der Ordner des Windows-Computers, rechts der Ordner des Nano.

![Abb. 7](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/7.png)

Für die Dateiübertragung gibt es drei Vorgehensweisen. Die erste besteht darin, die Datei direkt von links nach rechts oder von rechts nach links zu ziehen; das System kopiert automatisch eine Datei und überträgt sie hinüber.

Die zweite besteht darin, die Datei mit der Maus auszuwählen und dann die Taste F5 zu drücken; die ausgewählte Datei wird dann auf die andere Seite kopiert.

Die dritte besteht darin, die Datei auszuwählen und mit der rechten Maustaste anzuklicken; wenn Sie vom Windows-Computer zum Nano übertragen, klicken Sie auf upload,

![Abb. 8](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/8.png)

Es erscheint ein Hinweis; Sie können auswählen, nicht mehr darauf hingewiesen zu werden, und auf OK klicken, dann wird die Datei automatisch übertragen.

![Abb. 9](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/9.png)

Wenn Sie eine Datei vom Nano auf den Windows-Computer übertragen möchten, klicken Sie die Datei mit der rechten Maustaste an und wählen Sie Download

![Abb. 10](../../../../../public/images/tutorials/sensors/imu/ssh-file-transfer/10.png)

Hinweis: Die Dateiübertragung erfordert, dass sich der Computer und das Mainboard im selben lokalen Netzwerk befinden und dass der SSH-Dienst auf dem Raspberry Pi aktiviert ist. Wenn gelegentlich eine Dateiübertragung fehlschlägt, liegt das in der Regel daran, dass die Berechtigungen auf der Seite des Mainboards nicht ausreichen; wir müssen dann lediglich die höchsten Berechtigungen vergeben.

```Plain Text
chmod 777 目录名 
```



