---
title: "Schritt 6: Hugging-Face-Konto registrieren (optional)"
description: "Zeigt, wie Sie ein Hugging-Face-Konto einrichten: Spiegel für China, Erstellen und Binden eines Zugriffstokens sowie Anlegen eines Datensatz-Repositorys."
---

# Schritt 6: Hugging-Face-Konto registrieren (optional)

## HuggingFace-Spiegel für China einrichten

- Ubuntu

```Shell
sudo nano ~/.bashrc

# Am Ende der Datei hinzufügen
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.bashrc
echo $HF_ENDPOINT

# Ausgabe
# https://hf-mirror.com
```

- Mac

```Shell
sudo nano ~/.zshrc

# Am Ende der Datei hinzufügen
export HF_ENDPOINT=https://hf-mirror.com
```

```Shell
source ~/.zshrc

# Ausgabe
# https://hf-mirror.com
```

## Token erstellen

https://huggingface.co/settings/tokens

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/1.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/2.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/3.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/4.png)

## Notieren Sie sich Ihren eigenen Token

Nach dem Erstellen zeigt die Seite einen Schlüssel an, der mit `hf_` beginnt; kopieren Sie ihn und bewahren Sie ihn gut auf, Sie benötigen ihn später beim Binden des Kontos. Das Format sieht wie folgt aus (dies ist nur ein Platzhalter, maßgeblich ist der Wert auf Ihrer eigenen Seite)：

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Token binden

```Shell
hf auth login

hf auth whoami
```

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/5.png)

> Mit den Pfeiltasten nach oben und unten navigieren und den einzufügenden Schlüssel auswählen
> 
> 

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/6.png)

> Erfolgreiche Anzeige
> 
> 

## Dataset-Repo erstellen

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/7.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/8.png)

![image.png](../../../../../../../public/images/tutorials/robot-arms/so-arm101/lerobot-06-Data-Collection-HF-Account/9.png)

<RelatedProducts slugs="so-arm101" />
