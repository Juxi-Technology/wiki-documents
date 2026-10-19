---
title: "03 · Bluetooth"
description: "L'appareil intègre un module Bluetooth (le côté sans fil du même canal série que le port TTL 6 broches) : une fois une carte de développement ou un capteur r…"
---

# 03 · Bluetooth

> [← Retour à la présentation](/fr/tutorials/accessories/kvm-switch/00-Overview-and-Quick-Start) | Produit concerné : JUXI Technology KVM&HUB&TTL

## À quoi sert le Bluetooth

L'appareil intègre un module Bluetooth (**le côté sans fil du même canal série que le port TTL 6 broches**) : une fois une carte de développement ou un capteur relié au port TTL, ses données sont émises non seulement sur le port série du PC, mais **aussi simultanément en Bluetooth** ; connectez un téléphone et vous pouvez échanger des données sans fil.

> Pour le câblage, voir [04 - Port série TTL](/fr/tutorials/accessories/kvm-switch/04-TTL-Serial-Port). La connexion Bluetooth et le transfert de données **ne sont pas affectés par la commutation d'ordinateur** (la liaison reste établie quel que soit l'ordinateur sélectionné).

## Principes de fonctionnement (à lire en premier)

⚠️ **Le Bluetooth n'est pas une « télécommande »** — c'est un **câble série sans fil** : il transporte les données série entre le « périphérique relié au connecteur 6 broches » et votre « téléphone/ordinateur ». **Sans périphérique externe connecté, une connexion Bluetooth n'affiche aucune donnée — c'est normal.**

```
【Périphérique externe】  【Ce produit】             【Vous】
 Carte/capteur ──6 broches──> passerelle série ──┬─ filaire → série du PC (USB-BLE-SERIAL CH9143)
 (génère/reçoit des données)                     └─ sans fil → Bluetooth téléphone/PC (appli BleUart)
```

**Exemple 1 : consulter sans fil les données d'attitude d'une IMU**

1. Reliez TX/RX/GND/5V du module IMU au connecteur 6 broches (croisé, avec alimentation — voir 04) ; l'IMU commence à émettre ;
2. Maintenez le bouton de commutation enfoncé environ 3 secondes pour passer en mode Bluetooth (le voyant s'allume) ;
3. Connectez l'appli BleUart du téléphone à `CH9143BLE2U` ;
4. Les trames de données apparaissent immédiatement sur le téléphone (environ 80 images/seconde de données d'attitude lors de notre test) ;
5. En parallèle, un outil série du PC ouvert sur `USB-BLE-SERIAL CH9143` affiche exactement les mêmes données.

**Exemple 2 : débogage sans fil de Raspberry Pi / Jetson**

1. Reliez Pin8(TXD)/Pin10(RXD)/GND du Raspberry Pi au connecteur 6 broches (croisé) ;
2. Démarrez le Raspberry Pi ; le journal de démarrage est émis sur le port série ;
3. Connectez l'appli BleUart du téléphone pour **voir le journal de démarrage sans fil** ;
4. Ce que vous tapez dans l'appli est émis par TXD du connecteur 6 broches vers le Raspberry Pi — le téléphone devient une **console série sans fil** (connexion, envoi de commandes).

## Étapes de connexion du téléphone (4 étapes)

1. **Maintenez le bouton de commutation enfoncé environ 3 secondes** jusqu'à ce que le voyant s'allume — mode Bluetooth (nom diffusé : `CH9143BLE2U`) ;
2. Installez l'appli officielle WCH **« BleUart »** sur le téléphone (recherche dans la boutique d'applications, gratuite) ;
3. Ouvrez l'appli → touchez « Connecter Bluetooth » → sélectionnez **CH9143BLE2U** dans la liste ;
4. Connexion réussie (**sans mot de passe**) — échange de données possible.

(Illustration : ressource du tutoriel 04 – Appui long pour le mode Bluetooth)

## ⚠️ Avertissements importants

- **N'utilisez pas l'« appairage » Bluetooth des réglages système du téléphone** : il demandera un code PIN et aucun code ne fonctionnera — connectez toujours les appareils BLE directement avec l'**appli BleUart** ;
- Le module Bluetooth n'accepte **qu'un seul appareil hôte à la fois** (pendant qu'un téléphone est connecté, un ordinateur ne peut pas se connecter en Bluetooth, et inversement). Le **port série** (USB) du PC n'est pas concerné et peut être utilisé en parallèle.

## Dépannage

| Problème | Solution |
|---|---|
| CH9143BLE2U introuvable | Maintenez à nouveau le bouton enfoncé jusqu'à allumer le voyant ; vérifiez que vous êtes à moins de 10 m |
| Demande de code PIN / connexion impossible | Annulez l'appairage système et utilisez l'appli BleUart |
| L'appli ne se connecte pas | Peut-être occupé par un autre appareil (ordinateur, etc.) — déconnectez d'abord l'autre connexion |
| Connecté mais aucune donnée | Le Bluetooth transporte les données série du connecteur 6 broches — vérifiez d'abord que le périphérique externe est relié au port TTL (voir 04) |

<RelatedProducts slugs="kvm-switch" />
