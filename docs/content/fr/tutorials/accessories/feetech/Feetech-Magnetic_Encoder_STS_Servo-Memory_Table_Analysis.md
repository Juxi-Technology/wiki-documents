---
title: Analyse de la table mémoire du servo STS à encodeur magnétique
description: "Le servo utilise le protocole personnalisé FT-SCS. Configuration série par défaut en usine : servo STS à 1 Mbit/s, communication TTL mono-bus, 8 bits de données, sans parité, 1 bit d'arrêt ; débit configurable 38400 à 1 Mbit/s, adresse de communication par défaut (n° de station) 1."
---

# Analyse de la table mémoire du servo STS à encodeur magnétique

> **[Acheter en boutique](https://www.juxitech.com/fr/products/feetech-scs0009-serial-bus-servo)**


# 1 Protocole de communication du servo

Le servo utilise le protocole personnalisé FT-SCS. Configuration série par défaut en usine : servo STS à 1 Mbit/s, communication TTL mono-bus, 8 bits de données, sans parité, 1 bit d'arrêt ; débit configurable 38400 à 1 Mbit/s, adresse de communication par défaut (n° de station) 1.
[Protocole personnalisé FT-SCS](https://juxitech.feishu.cn/wiki/MTPLw8xCniTidGkm3amc27FXnKg) (protocole de communication SCS des servos)

# 2 Définition de la table mémoire du servo

Si une adresse de fonction utilise des données sur deux octets, l'octet de poids faible est à l'adresse antérieure, l'octet de poids fort à l'adresse postérieure

## 2.1 Informations de version

## 2.2 Configuration EPROM

## 2.3 Contrôle SRAM

## 2.4 Retour SRAM

## 3.5 Paramètres d'usine

# 3 Explication des octets spéciaux

## 3.1 Phase du servo

- Bits / poids : description

- BIT0（1）: phase du sens d'entraînement ; (0) direct, (1) inverse

- BIT1（2）: mode de pont d'entraînement ; (0) sans balais, (1) avec balais, effectif après redémarrage

- BIT2（4）: unité de vitesse ; (0) 0,732 tr/min, (1) 0,0146 tr/min

- BIT3（8）: mode de vitesse ; (0) vitesse 0 = arrêt, (1) vitesse 0 = vitesse maximale

- BIT4（16）: mode de retour d'angle ; (0) retour d'angle sur un tour, (1) retour d'angle complet

- BIT5（32）: configuration du pont d'entraînement / échantillonnage de tension ; (0) pont H indépendant / échantillonnage 1K haute tension, (1) pont H intégré / échantillonnage 1,5K basse tension / sans retour de courant

- BIT6（64）: fréquence PWM ; (0) 24 kHz, (1) 16 kHz

- BIT7（128）: phase de sens du retour de position ; (0) direct, (1) inverse

Si plusieurs bits sont définis simultanément, la valeur de phase du servo est la somme des valeurs des bits. Exemple : phase initiale 0, servo fonctionne en sens inverse, phase = 128+1=129 ;

## 3.2 État du servo

État du servo : 0 = normal, 1 = anormal

- Bits / poids : description

- BIT0（1）: état de tension

- BIT1（2）: état de l'encodeur magnétique

- BIT2（4）: état de température

- BIT3（8）: état de courant

- BIT4（16）: ----

- BIT5（32）: état de charge

- BIT6（64）: ----

- BIT7（128）: ----

Si plusieurs états coexistent, la valeur d'état du servo est la somme des valeurs des bits. Exemple : surtension/sous-tension et surchauffe du servo, état = 4+1=5 ;

## 3.3 Conditions de délestage

Conditions de délestage : 0 = désactivé, 1 = activé

- Bits / poids : description

- BIT0（1）: protection de tension

- BIT1（2）: protection de l'encodeur magnétique

- BIT2（4）: protection contre la surchauffe

- BIT3（8）: protection contre les surintensités

- BIT4（16）: ----

- BIT5（32）: surcharge de charge

- BIT6（64）: ----

- BIT7（128）: ----

Si plusieurs bits sont définis simultanément, la valeur de délestage est la somme des valeurs des bits. Exemple : protection de tension et protection de surchauffe activées, délestage = 4+1=5 ;

## 3.4 Conditions d'alarme LED

Conditions d'alarme LED : 0 = désactivée, 1 = activée

- Bits / poids : description

- BIT0（1）: alarme de tension

- BIT1（2）: alarme de l'encodeur magnétique

- BIT2（4）: alarme de surchauffe

- BIT3（8）: alarme de surintensité

- BIT4（16）: ----

- BIT5（32）: alarme de surcharge

- BIT6（64）: ----

- BIT7（128）: ----

Si plusieurs bits sont définis simultanément, la valeur d'alarme LED est la somme des valeurs des bits. Exemple : alarme de tension et alarme de surchauffe activées, alarme = 4+1=5 ;
