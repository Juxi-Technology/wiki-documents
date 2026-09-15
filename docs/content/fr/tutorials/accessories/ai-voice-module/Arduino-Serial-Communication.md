---
title: "Arduino: Communication par port série"
description: "1. Ouvrez le fichier UARTVoice.ino"
---

# Arduino: Communication par port série

## 📁 Structure des fichiers

```Plain Text
UART_Voice/
├── UART_Voice.ino    # 主程序
├── bsp_uart.hpp         # 头文件（协议帧和函数声明）
├── bsp_uart.cpp         # 实现文件
└── README.md              # 本教程
```

---

## 🔌 Connexion matérielle

### Connexion au module vocal

> 💡 **Attention :** RX et TX doivent être croisés !
> 
> 

![Image 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Arduino-Serial-Communication/1.png)

---

## 🔧 Compilation et téléversement

### Étape 1 : ouvrir l'IDE Arduino

1. Ouvrez le fichier `UART_Voice.ino`

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

```Plain Text
UART Voice Module Initialized
```

Prononcez le mot de réveil et les mots de commande vers le module, et les ID correspondants seront affichés :

```Plain Text
ID: 1
ID: 2
ID: 10
```

---

## 📚 Format de la trame de protocole

**Exemple :** ID de commande lu = 10

```Plain Text
FE EF 00 0A EE
```

**Exemple :** envoi de la diffusion d'un mot de commande

```Plain Text
FE EF D3 00 EE
```

---

## 📚 Description de l'interface BSP

### UART_Init()

```Plain Text
void UART_Init(void);
```

**Fonction** : initialise le port série (débit en bauds 115200)

**Exemple** :

```Plain Text
void setup() {
  UART_Init();
}
```

---

### UART_ReadCommand()

int UART_ReadCommand(void);

**Fonction** : lit l'ID de commande reconnu par le module vocal

**Valeur de retour** :

- `0` - aucune commande reconnue

- `1~254` - ID de commande

- `-1` - pas de nouvelles données

**Exemple** :

```Plain Text
int id = UART_ReadCommand();
if (id > 0) {
  Serial.print("识别到命令: ");
  Serial.println(id);
}
```

---

### UART_SetPassiveVoice()

```Plain Text
void UART_SetPassiveVoice(uint8_t voiceID);
```

**Fonction** : définit la phrase de diffusion passive

**Paramètres** :

- `0x00` - type de phrase de diffusion passive

**Exemple** :

```Plain Text
UART_SetPassiveVoice(0x00);
delay(200);
```

---

### UART_SetFunctionVoice()

```Plain Text
void UART_SetFunctionVoice(uint8_t voiceID);
```

**Fonction** : définit la phrase de diffusion de mot de fonction

**Paramètres** :

- `0x00` - type de phrase de diffusion de mot de fonction

**Exemple** :

```Plain Text
UART_SetFunctionVoice(0x00);
delay(200);
```

---

### UART_SetCommandVoice()

```Plain Text
void UART_SetCommandVoice(uint8_t voiceID);
```

**Fonction** : définit la phrase de diffusion de mot de commande

**Paramètres** :

- `0x00` - type de phrase de diffusion de mot de commande

**Exemple** :

```Plain Text
UART_SetCommandVoice(0x00);
delay(200);
```

---

## 🎯 Description de la logique du programme principal

```JavaScript
void setup() {
  Serial.begin(115200);
  UART_Init();

  Serial.println("UART Voice Module Initialized");

  UART_SetCommandVoice(0x00);  // 上电播报命令词语音
  delay(200);
}

void loop() {
  int commandId = UART_ReadCommand();

  if (commandId >= 0) {
    // 过滤无效值，防止重复输出
    if (commandId != 0 && commandId != 255 && commandId != lastCommandId) {
      Serial.print("ID: ");
      Serial.println(commandId);
      lastCommandId = commandId;

      // 示例：根据识别到的命令控制播报
      if (commandId == 1) {
        UART_SetCommandVoice(0x00);  // 识别到命令1，播报命令词语音
      } else if (commandId == 2) {
        UART_SetCommandVoice(0x00);  // 识别到命令2，播报命令词语音
      }
    } else if (commandId == 0 || commandId == 255) {
      if (lastCommandId != 0) {
        lastCommandId = 0;  // 重置状态
      }
    }
  }

  delay(50);
}
```

---

## 🔍 Dépannage

### Q1 : aucune sortie

**Causes possibles :**

1. RX/TX sont inversés

2. GND n'est pas relié à la masse commune

3. Le module n'est pas alimenté

4. Débit en bauds incorrect

**Solutions :**

- Confirmez que D10 est connecté au TX du module et D11 au RX du module (connexion croisée)

- Confirmez la connexion GND

- Confirmez que l'alimentation 5V est normale

- Confirmez que le débit en bauds du port série est 115200

---

### Q2 : le port série n'affiche que des caractères illisibles

**Causes possibles :**

1. Débit en bauds non correspondant

2. L'alimentation du module est anormale

**Solutions :**

- Confirmez que le débit en bauds du moniteur série est 115200

- Appuyez sur le bouton de réinitialisation du module

---

### Q3 : la sortie affiche "ID: 255" ou "ID: 0"

**Remarque :** c'est un phénomène normal

- `0` = aucune commande reconnue

- `255` = pas de nouvelles données

Ces valeurs sont déjà filtrées dans le code et ne seront normalement pas affichées. Si vous les voyez s'afficher, cela signifie que le code n'a pas pris effet.

---

## 💡 Avantages de l'architecture BSP

### Une séparation claire des couches de code

- **bsp_uart.hpp** - ne consulte que les déclarations, pas l'implémentation

- **bsp_uart.cpp** - les détails concrets de l'implémentation

- **UART_Voice.ino** - ne s'occupe que de la logique métier

### Facilité de portage

Si vous passez à une autre plateforme (comme STM32, ESP32), il suffit de modifier l'implémentation de `bsp_uart.cpp` ; le programme principal n'a pas besoin d'être modifié.

### Facilité de maintenance

Les modifications du code lié à l'UART se font uniquement dans `bsp_uart.cpp` ; une seule modification, effective partout.

---

## 🚀 Exemples de fonctions étendues

### Exemple 1 : déclencher une diffusion différente selon la commande

```Plain Text
if (commandId == 1) {
  UART_SetCommandVoice(0x00);      // 播报命令词
} else if (commandId == 2) {
  UART_SetFunctionVoice(0x00);     // 播报功能词
} else if (commandId == 3) {
  UART_SetPassiveVoice(0x00);      // 播报被动语
}
```

### Exemple 2 : contrôler une LED

```Plain Text
if (commandId == 10) {
  digitalWrite(LED_PIN, LOW);    // 关灯
  UART_SetCommandVoice(0x00);     // 播报确认
}
```

### Exemple 3 : contrôler un moteur

```Plain Text
if (commandId == 11) {
  motor_stop();
  UART_SetCommandVoice(0x00);     // 播报确认
}
```

<RelatedProducts slugs="ai-voice-module" />
