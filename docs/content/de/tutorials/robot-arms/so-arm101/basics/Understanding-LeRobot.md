---
title: "LeRobot kennenlernen"
description: "Erklärt verkörperte Intelligenz, das LeRobot-Framework von Hugging Face und den SO-ARM101-Roboterarm und nennt die nötige Computerausstattung."
---

# LeRobot kennenlernen

## Was ist verkörperte Intelligenz?

Intelligenz mit einem Körper. KI wird in verschiedene Hardware-Entitäten integriert, zum Beispiel:

Vierbeinige Roboterhunde, zweibeinige humanoide Roboter, radfahrende Roboter, Drohnen, autonom fahrende Autos

## Was ist LeRobot?

LeRobot ist das von HuggingFace als Open Source bereitgestellte `Software-Framework für verkörperte intelligente Roboter`

Github-Adresse：https://github.com/huggingface/lerobot

Geringe Einstiegshürde für：**Datenerfassung, Algorithmentraining und Inferenz-Deployment** von Reinforcement Learning und **Imitation Learning (VLA)**, wobei **Imitation Learning (VLA)** im Mittelpunkt steht

- Welche Roboter lassen sich mit LeRobot entwickeln?

Vom SO-ARM 101 Roboterarm im Preissegment ab tausend Yuan, dem LeKiwi-Fahrzeug, über den AgileX piper-Roboterarm für mehrere zehntausend Yuan, den StarAI-Roboterarm, die Hope-JR Greifhand, bis hin zum humanoiden Unitree G1 für über hunderttausend Yuan. LeRobot ist zum Standard der Branche für verkörperte Intelligenz bei Datenerfassung und Algorithmentraining geworden.

Sie können auch Ihren eigenen Roboter an das LeRobot-Framework anpassen.

- LeRobot-Datensätze und -Modelle

LeRobot definiert ein eigenes Datensatzformat für Imitation Learning. Sie können alle öffentlichen Datensätze und Modelle auf HuggingFace ansehen, verwenden, herunterladen und trainieren und auch Ihre eigenen Datensätze auf HuggingFace hochladen

## Was ist der SO-ARM 101 Roboterarm?

Dieses Tutorial verwendet den SO-ARM 101 Roboterarm als Beispiel, mit 3D-gedruckten Strukturteilen und Feetech-Servos, zu sehr niedrigen Kosten.

Dies ist ein Körper für verkörperte Intelligenz, den sich auch arme Studierende leisten können, und einer der von LeRobot offiziell empfohlenen Körper.

Der Roboterarm besteht aus zwei Armen: dem Führungsarm (Leader) und dem Folgearm (Follower). Jeder Arm verfügt über 6 Freiheitsgrade (5 Gelenkfreiheitsgrade + 1 Greifwerkzeug-Freiheitsgrad).

## Welche Computerausstattung brauche ich

Ein gewöhnlicher Windows-Laptop reicht für alle Schritte vor dem Training

Ein gewöhnlicher Mac reicht für alle Schritte

Ein Ubuntu-Rechner mit NVIDIA-Grafikkarte reicht für alle Schritte

In diesem Tutorial wird eine [Cloud-GPU-Plattform](https://featurize.cn?s=d7ce99f842414bfcaea5662a97581bd1) zum Trainieren der Modelle verwendet, Ihr eigener Rechner muss also keine hohe Ausstattung haben

## Was ist **Imitation Learning und VLA**?

Ein Mensch führt den Roboter und erfasst so Daten, aus denen ein Datensatz entsteht. Mit diesem Datensatz wird dann ein Imitation-Learning-Algorithmus trainiert und schließlich auf dem Roboter eingesetzt, damit der Roboter menschliche Bewegungen autonom nachahmt und auf die reale Umgebung generalisiert. Teleoperation und Fernsteuerung sind nicht nötig.

Wie im Video oben zieht ein Mensch den SO-ARM Roboterarm, um Flusskrebse zu greifen, sie in die Soße zu tauchen und in heißes Öl zu geben, damit der Roboterarm diese Bewegung schließlich autonom ausführt. Selbst bei einem neuen Flusskrebs kann er jederzeit reagieren und die Bewegung ausführen.

Imitation Learning hat auch einen modernen, schicken Namen：VLA (Vision-Language-Action-Modell). Dies ist zugleich das Forschungsfeld der verkörperten Intelligenz, das sich derzeit am schnellsten entwickelt, die stärksten Investitionen anzieht, den intensivsten Wettbewerb zwischen China und den USA erlebt, das blühendste Open-Source-Ökosystem hat, die größte Medienaufmerksamkeit erhält und in das unzählige Master- und Doktoranden einsteigen.

Der Algorithmus, den LeRobot hauptsächlich unterstützt, ist Imitation Learning. Zum Beispiel ACT, Diffusion Policy, SmolVLA, Pi0, Pi0.5, Wall-OSS usw.

Imitation Learning in diesem Tutorial umfasst nur VLA.

<RelatedProducts slugs="so-arm101" />
