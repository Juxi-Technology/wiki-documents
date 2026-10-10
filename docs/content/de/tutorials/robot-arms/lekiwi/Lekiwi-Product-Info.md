---
title: Produktinformationen
---

# Produktinformationen

> **[Im Shop kaufen](https://www.juxitech.com/de/products/lekiwi-embodied-intelligence-mobile-robotic-car)**

## Produktübersicht

LeKiwi wird unter der Leitung von SIGRobotics-UIUC (der Robotics-Interessengruppe der University of Illinois Urbana-Champaign) entwickelt. Es bietet eine kostengünstige, hochflexible quelloffene Roboterplattform, die die Verbreitung der Robotiktechnologie in Bildung, Forschung und industrieller Automatisierung fördert. Das Hardware-Design (3D-Druckdateien), der Software-Stack (kompatibel mit dem LeRobot-Framework) und die Tutorials sind vollständig quelloffen, und es unterstützt benutzerdefinierte Erweiterungen.

LeKiwi besteht aus einer mobilen Plattform und einem Leader-Follower-Arm. Der Leader-Follower-Arm verwendet 3D-gedruckte Teile als Struktur und 6 12-V-Feetech-Servos als Antriebsgelenke. Der Leader-Arm steht auf einer festen Plattform, nutzt eine Servotreiberplatine und wird über USB-C mit einem Computer verbunden. Der Follower-Arm ist auf der mobilen Plattform montiert, die von 3 12-V-Feetech-Servos angetrieben wird; er nutzt eine Servotreiberplatine und wird über USB-C in Verbindung mit einem Raspberry Pi gesteuert.

LeKiwi integriert LeRobot (Hugging Faces quelloffenes ML-Framework für Roboter) tiefgehend und unterstützt Imitationslernen, Datenerfassung und Policy-Training. Es ist auf PyTorch implementiert und enthält vortrainierte Modelle, Datasets und eine Simulationsumgebung und ist mit bekannten quelloffenen Datasets wie Stanford ALOHA kompatibel. Es verwendet das DORA-Framework (eine verteilte Dataflow-Engine), um eine Hardware-Algorithmus-Kommunikation mit geringer Latenz zu erreichen (die Python-Leistung ist 17-mal schneller als ROS2), und unterstützt Hot Reloading, sodass Code in Echtzeit ohne Neustart angepasst werden kann.

LeKiwi eignet sich sehr gut für Bildung und Forschung auf Einstiegsniveau: einführender Robotikunterricht mit End-to-End-Tutorials, die alles von der Montage und Programmierung bis zum Deployment von KI-Policies abdecken; Forschungsvalidierung: Es unterstützt die Imitationslernforschung (beispielsweise das Training eines Roboters anhand von über VR aufgezeichneten Videos menschlicher Bedienung), mit dem Fall des Pollen-Roboters Ready2, der Aufgaben wie das Falten von Kleidung und das Einstecken von Schlüsseln nach nur 2 Stunden Training mit 50 15-sekündigen Videos lernt; industrielle Prototypenerstellung: kostengünstige Validierung von Automatisierungslösungen (etwa Materialhandling und Präzisionsmontage).
