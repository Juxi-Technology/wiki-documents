---
title: "7 · Fehlerbehebung"
description: "LeLab-Fehlerbehebung nach Symptom: Portkonflikte, USB- und serielle Probleme, Kalibrierungs- und Aufzeichnungsfehler – mit den passenden Lösungsschritten."
---

# 7 · Fehlerbehebung

> **Zurück:** [06 Trainieren und Inferenz ausführen](06-Train-and-Inference.md)

Nach Symptom gruppiert.

## Die Seite öffnet sich nicht, oder ein Port ist belegt

Die Ports **8000** und **8080** gehören LeLab. Ein veralteter Prozess ist die übliche Ursache — einer, den Sie durch Schließen des Terminals statt mit `Ctrl+C` beendet haben.

```bash
lelab --stop
```

Gibt beide Ports frei. Zur Kontrolle vor dem Start:

```bash
curl http://localhost:8000/health
```

Eine JSON-Antwort bedeutet, dass auf 8000 etwas läuft.

## Im `--dev`-Modus ist die Seite leer oder es kommt 404

Vite stellt die UI auf **:8080** bereit; die API läuft auf **:8000**. Rufen Sie `:8080` auf. Port 8000 liefert im `--dev`-Modus eine API ohne UI.

## Die Arme erscheinen nicht

Prüfen Sie, ob die Ports für Ihren Benutzer sichtbar sind. Unter Linux sieht eine fehlende Gruppe so aus, als wäre der Arm nicht da:

```bash
ls /dev/ttyACM*
groups | grep dialout
```

Wenn `dialout` fehlt:

```bash
sudo usermod -aG dialout $USER
```

Dann **melden Sie sich ab und wieder an** — die Gruppe wird beim Anmelden gelesen, ein neues Terminal genügt also nicht.

### Nur ein Arm wird gefunden

Verwenden Sie **zwei getrennte USB-Anschlüsse**, keinen Hub; beide Arme zählen als derselbe Gerätetyp auf, und ein gemeinsamer Hub kann sie unzuverlässig darstellen. Um einen Port zu identifizieren, ziehen Sie einen Arm ab und beobachten, welcher Listeneintrag verschwindet.

## Ich muss jedes Mal neu kalibrieren

Kalibrierungsdateien liegen unter `~/.cache/huggingface/lerobot/` — also unter `~/.cache/`. Cache-Bereinigungswerkzeuge und Container-Neustarts nehmen sie mit.

- Sichern Sie `~/.cache/huggingface/lerobot/calibration/` an einem dauerhaften Ort.
- Binden Sie in einem Container dieses Verzeichnis als Volume ein.

### Ein kalibrierter Arm verhält sich seltsam, ohne neu kalibriert werden zu wollen

Prüfen Sie, ob das gewählte **Profil** zu diesem physischen Arm gehört. Profile sind an die Nullpunkte eines Arms gebunden; die Arme zu vertauschen bedeutet neu zu kalibrieren.

## Ein Kamerabild ist kopfüber oder seitlich

Stellen Sie die **Rotation** der Kamera im [Kalibrierungs-Tab](03-Calibration.md) ein: 0°, 90°, 180° oder 270° im Uhrzeigersinn. Eine kopfüber montierte Handgelenkkamera ist 180°.

**90° und 270° vertauschen die Ausgabemaße** — eine 640 × 480-Aufnahme wird zu 480 × 640.

## Die trainierte Policy tut nichts Nützliches

Der Reihe nach — die ersten beiden sind weit häufiger als ein schlechter Trainingslauf:

1. **Kamerarotation.** Bestätigen Sie, dass die Inferenz die zur Aufzeichnungszeit verwendete Rotation nutzt. 0° und 180° haben identische Bildmaße, daher warnt Sie nichts.
2. **Kamerazuordnung.** Wenn die bei der Aufzeichnung `wrist` genannte Kamera jetzt eine andere physische Kamera ist, sieht die Policy das falsche Bild.
3. **Startposition und Task-Beschreibung.** Die Inferenz muss von der Anordnung ausgehen, von der die Demonstrationen ausgingen.
4. **Checkpoints.** Probieren Sie einen früheren.

## Ein Telefon als Kamera verwenden

Browser gewähren Kamerazugriff (`getUserMedia`) nur über **HTTPS**, außer auf `localhost`, daher wird ein Telefon, das sich über das LAN verbindet, abgelehnt.

Einrichtungsanleitung: [`frontend/HTTPS_SETUP.md`](https://github.com/Juxi-Technology/leLab/blob/main/frontend/HTTPS_SETUP.md). Zertifikate sind selbstsigniert, daher zeigt der Browser eine Warnung, die Sie akzeptieren müssen.

Die Standardinstallation startet **nicht** mit HTTPS; Telefonkameras benötigen den manuellen Start mit den dort beschriebenen Zertifikats-Flags.

## Ein Dataset lässt sich nicht öffnen — „noch nicht heruntergeladen"

LeRobot schreibt den Dataset-Index, wenn eine Aufzeichnung **ordnungsgemäß endet**. Eine mittendrin beendete Sitzung kann ein Verzeichnis hinterlassen, das vollständig aussieht, es aber nicht ist. Die Episodendaten sind meist noch auf der Festplatte; der Index ist das, was fehlt. Zeichnen Sie die Sitzung erneut auf und beenden Sie sie mit der Stopp-Schaltfläche.

## Das Training meldet ein fehlendes Paket

Manche Policy-Typen und optionalen Trainingsfunktionen benötigen Abhängigkeiten, die nicht standardmäßig installiert sind. Der Tab Training bietet an, sie zu installieren, wenn Sie einen auswählen; warten Sie, bis die Installation im Hintergrund abgeschlossen ist, bevor Sie den Job starten. Das Trainingslog nennt das Paket, falls Sie es lieber von Hand installieren.

## Es erscheint keine Update-Benachrichtigung

Absichtlich: Die Prüfung gilt nur für Installationen aus git. Eine **editierbare Installation** (`pip install -e .`) ist eine Arbeitskopie und wird nicht geprüft. Aktualisieren Sie diese mit `git pull`.

## Immer noch nicht weiter

Sammeln Sie die **Browser-Konsole** und das **Terminal, in dem `lelab` läuft** — der Server protokolliert die fehlgeschlagene Anfrage. Die meisten dieser Fehler liegen eine Stufe von der letzten Änderung entfernt, die Sie vorgenommen haben.

---

> **Zurück zum Anfang:** [01 Überblick](01-Overview.md) · [Tutorial-Übersicht](https://github.com/Juxi-Technology/leLab/blob/main/README.md)

<RelatedProducts slugs="so-arm101" />
