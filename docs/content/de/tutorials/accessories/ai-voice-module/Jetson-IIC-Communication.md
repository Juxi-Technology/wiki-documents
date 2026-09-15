---
title: "Jetson: IIC-Kommunikation"
description: "AI-Sprachinteraktionsmodul am Jetson per I2C steuern: Abhängigkeiten und Benutzergruppen einrichten, Verkabelung prüfen und Geräteadresse 0x2A testen."
---

# Jetson: IIC-Kommunikation

## Abhängigkeiten installieren

```Plain Text
sudo apt-get update
```

```Plain Text
sudo apt-get install -y python3-smbus python3-serial i2c-tools
```

## Benutzergruppe prüfen

```Plain Text
sudo usermod -aG i2c $USER
```

```Plain Text
sudo usermod -aG dialout $USER
```

Abmelden und erneut anmelden, damit die Änderung wirksam wird.

## Dateispeicherort

`IIC_Voice/iic_voice.py`

## Verkabelungsbeschreibung

![Abb. 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Jetson-IIC-Communication/1.png)

## I2C-Gerät prüfen

```Plain Text
sudo i2cdetect -y -r 1
```

Die Adresse `0x2A` sollte zu sehen sein

## Ausführen

```Plain Text
cd IIC_Voice
```

```Plain Text
sudo python3 iic_voice.py
```

## Ausgabeformat

```Plain Text
Speech Serial Opened! Baudrate=115200
ID:4
ID:1
ID:10
```

## Häufig gestellte Fragen

### I2C-Berechtigungsproblem

```Plain Text
sudo chmod 666 /dev/i2c-1
```

<RelatedProducts slugs="ai-voice-module" />
