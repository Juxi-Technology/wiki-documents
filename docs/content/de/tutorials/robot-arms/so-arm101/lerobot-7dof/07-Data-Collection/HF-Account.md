---
title: "Hugging Face-Konto registrieren (optional)"
description: "Zeigt, wie Sie ein Hugging-Face-Konto einrichten: Spiegel für China, Erstellen und Binden eines Zugriffstokens sowie Anlegen eines Datensatz-Repositorys."
---

# Hugging Face\-Konto registrieren (optional)

## HuggingFace\-Spiegel für China einrichten

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

https://huggingface\.co/settings/tokens

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/1.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/5.png)

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/2.png)

## Token notieren

Zum Beispiel, meiner lautet:

```Shell
hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Token binden

```Shell
hf auth login

hf auth whoami
```

![image\.png](/images/tutorials/robot-arms/so-arm101/lerobot-7dof/07-data-collection/3.png)

## Dataset\-Repo erstellen

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/1.png)

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/2.png)

![image\.png](/images/tutorials/robot-arms/lekiwi/Lekiwi-Tutorial/3.png)









