---
title: "Arduino: Communication IIC"
description: "Communication IIC entre un Arduino et le module d'interaction vocale IA : câblage, compilation du projet, téléversement et test sur le moniteur série."
---

# Arduino: Communication IIC

## 📁 Structure des fichiers

```Plain Text
IIC_Voice/
├── IIC_Voice.ino    # 主程序
├── bsp_iic.hpp         # 头文件（地址和函数声明）
├── bsp_iic.cpp         # 实现文件
└── README.md            # 本教程
```

---

## 🔌 Connexion matérielle

![Image 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Arduino-IIC-Communication/1.png)

---

## 🔧 Compilation et téléversement

### Étape 1 : ouvrir l'IDE Arduino

1. Ouvrez le fichier `IIC_Voice.ino`

2. Sélectionnez le modèle de votre carte de développement (par exemple Arduino Uno)

3. Sélectionnez le port série correspondant

### Étape 2 : compiler et téléverser

1. Cliquez sur le bouton ✔️ pour compiler

2. Cliquez sur le bouton ➡️ pour téléverser vers la carte de développement

---

## 📡 Test du port série

### Ouvrir le moniteur série de l'IDE Arduino

- Débit en bauds : **115200**

- Caractère de fin : **Aucun**

### Sortie attendue

Après la mise sous tension, vous devriez voir :

`IIC Voice Module Initialized`

Prononcez le mot de réveil et les mots de commande vers le module, et les ID correspondants seront affichés :

```Plain Text
ID: 1
ID: 2
ID: 10
```

---

## 📚 Mappage des registres

---

## 📚 Description de l'interface BSP

### IIC_Init()

```Plain Text
void IIC_Init(void);
```

**Fonction** : initialise le bus I2C

**Exemple** :

```Plain Text
void setup() {
  IIC_Init();
}
```

---

### IIC_ReadCommand()

```Plain Text
int IIC_ReadCommand(void);
```

**Fonction** : lit l'ID de commande reconnu par le module vocal

**Valeur de retour** :

- `0` - aucune commande reconnue

- `1~254` - ID de commande

- `-1` - erreur de communication

**Exemple** :

```Plain Text
int id = IIC_ReadCommand();
if (id > 0) {
  Serial.print("识别到命令: ");
  Serial.println(id);
}
```

---

### IIC_SetPassiveVoice()

```Plain Text
void IIC_SetPassiveVoice(uint8_t voiceID);
```

**Fonction** : définit la phrase de diffusion passive

**Paramètres** :

- `0x00` - type de phrase de diffusion passive

**Exemple** :

```Plain Text
IIC_SetPassiveVoice(0x00);
delay(200);
```

---

### IIC_SetFunctionVoice()

```Plain Text
void IIC_SetFunctionVoice(uint8_t voiceID);
```

**Fonction** : définit la phrase de diffusion de mot de fonction

**Paramètres** :

- `0x00` - type de phrase de diffusion de mot de fonction

**Exemple** :

```Plain Text
IIC_SetFunctionVoice(0x00);
delay(200);
```

---

### IIC_SetCommandVoice()

```Plain Text
void IIC_SetCommandVoice(uint8_t voiceID);
```

**Fonction** : définit la phrase de diffusion de mot de commande

**Paramètres** :

- `0x00` - type de phrase de diffusion de mot de commande

**Exemple** :

```Plain Text
IIC_SetCommandVoice(0x00);
delay(200);
```

---

## 🎯 Description de la logique du programme principal

```JavaScript
void setup() {
  Serial.begin(115200);
  IIC_Init();

  Serial.println("IIC Voice Module Initialized");

  IIC_SetCommandVoice(0x00);  // 上电播报命令词语音
  delay(200);
}

void loop() {
  int commandId = IIC_ReadCommand();

  if (commandId >= 0) {
    // 过滤无效值，防止重复输出
    if (commandId != 0 && commandId != 255 && commandId != lastCommandId) {
      Serial.print("ID: ");
      Serial.println(commandId);
      lastCommandId = commandId;

      // 示例：根据识别到的命令控制播报
      if (commandId == 1) {
        IIC_SetCommandVoice(0x00);  // 识别到命令1，播报命令词语音
      } else if (commandId == 2) {
        IIC_SetCommandVoice(0x00);  // 识别到命令2，播报命令词语音
      }
    } else if (commandId == 0 || commandId == 255) {
      if (lastCommandId != 0) {
        lastCommandId = 0;  // 重置状态
      }
    }
  } else {
    Serial.println("IIC Read Error");
    delay(1000);
  }

  delay(50);
}
```

---

## 🔍 Dépannage

### Q1 : le port série n'affiche que "IIC Read Error"

**Causes possibles :**

1. Câblage incorrect, non connecté

2. Le module n'est pas alimenté

3. Adresse I2C incorrecte

**Solutions :**

- Vérifiez si SDA/SCL sont inversés

- Vérifiez si les masses sont communes

- Vérifiez si l'alimentation 5V est normale

- Utilisez un programme de scan I2C pour confirmer l'adresse du dispositif

---

### Q2 : aucune sortie

**Causes possibles :**

1. Débit en bauds du port série incorrect

2. Le module n'est pas réveillé

**Solutions :**

- Confirmez que le débit en bauds du port série est 115200

- Dites d'abord le mot de réveil, puis les mots de commande

---

### Q3 : la sortie affiche "ID: 255" ou "ID: 0"

**Remarque :** c'est un phénomène normal

- `0` = aucune commande reconnue

- `255` = pas de nouvelles données

Ces valeurs sont déjà filtrées dans le code et ne seront normalement pas affichées. Si vous les voyez s'afficher, cela signifie que le code n'a pas pris effet.

---

## 💡 Avantages de l'architecture BSP

### Une séparation claire des couches de code

- **bsp_iic.hpp** - ne consulte que les déclarations, pas l'implémentation

- **bsp_iic.cpp** - les détails concrets de l'implémentation

- **IIC_Voice.ino** - ne s'occupe que de la logique métier

### Facilité de portage

Si vous passez à une autre plateforme (comme STM32, ESP32), il suffit de modifier l'implémentation de `bsp_iic.cpp` ; le programme principal n'a pas besoin d'être modifié.

### Facilité de maintenance

Les modifications du code lié à l'I2C se font uniquement dans `bsp_iic.cpp` ; une seule modification, effective partout.

---

## 🚀 Exemples de fonctions étendues

### Exemple 1 : déclencher une diffusion différente selon la commande

```Plain Text
if (commandId == 1) {
  IIC_SetCommandVoice(0x00);      // 播报命令词
} else if (commandId == 2) {
  IIC_SetFunctionVoice(0x00);     // 播报功能词
} else if (commandId == 3) {
  IIC_SetPassiveVoice(0x00);      // 播报被动语
}
```

### Exemple 2 : contrôler une LED

```Plain Text
if (commandId == 10) {
  digitalWrite(LED_PIN, LOW);    // 关灯
  IIC_SetCommandVoice(0x00);     // 播报确认
}
```

### Exemple 3 : contrôler un moteur

```Plain Text
if (commandId == 11) {
  motor_stop();
  IIC_SetCommandVoice(0x00);     // 播报确认
}
```

<RelatedProducts slugs="ai-voice-module" />
