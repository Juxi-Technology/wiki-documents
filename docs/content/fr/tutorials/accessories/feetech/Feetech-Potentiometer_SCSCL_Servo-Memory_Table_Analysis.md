---
title: Analyse de la table mémoire du servo SCSCL à potentiomètre
description: "Le servo utilise le protocole personnalisé FT-SCS. Configuration série par défaut en usine : débit par défaut 1M ou 500k, communication TTL mono-bus, 8 bits de données, sans parité, 1 bit d'arrêt ; débit configurable 38400 à 1 Mbit/s (500k), adresse de communication par défaut (n° de station) 1."
---

# Analyse de la table mémoire du servo SCSCL à potentiomètre

> **[Acheter en boutique](https://www.juxitech.com/fr/products/feetech-scs0009-serial-bus-servo)**


# 1 Protocole de communication du servo

Le servo utilise le protocole personnalisé FT-SCS. Débit par défaut 1M ou 500k, communication TTL mono-bus, 8 bits de données, sans parité, 1 bit d'arrêt ; débit configurable 38400 à 1 Mbit/s (500k), adresse de communication par défaut (n° de station) 1.
[Protocole personnalisé FT-SCS](https://juxitech.feishu.cn/wiki/MTPLw8xCniTidGkm3amc27FXnKg)

# 2 Définition de la table mémoire du servo

Si une adresse de fonction utilise des données sur deux octets, l'octet de poids fort est à l'adresse antérieure, l'octet de poids faible à l'adresse postérieure

## 2.1 Informations de version

## 2.2 Configuration EPROM

## 2.3 Contrôle SRAM

## 2.4 Retour SRAM

## 2.5 Paramètres d'usine

# 3 Explication des octets spéciaux

## 3.1 Phase du servo

- Bits / poids : description

- BIT0（1）: phase du sens d'entraînement ; (0) direct, (1) inverse

- BIT1（2）: ----

- BIT2（4）: ----

- BIT3（8）: mode de vitesse ; (0) vitesse 0 = arrêt, (1) vitesse 0 = vitesse maximale

- BIT4（16）: ----

- BIT5（32）: phase PWM ; (0) en phase, (1) en opposition de phase

- BIT6（64）: mode de tension ; (0) échantillonnage 1,5K basse tension, (1) échantillonnage 1K haute tension

- BIT7（128）: ----

Si plusieurs bits sont définis simultanément, la valeur de phase du servo est la somme des valeurs des bits.

## 3.2 État du servo

État du servo : 0 = normal, 1 = anormal

- Bits / poids : description

- BIT0（1）: état de tension

- BIT1（2）: ----

- BIT2（4）: état de température

- BIT3（8）: ----

- BIT4（16）: ----

- BIT5（32）: état de charge

- BIT6（64）: ----

- BIT7（128）: ----

Si plusieurs états coexistent, la valeur d'état du servo est la somme des valeurs des bits. Exemple : surtension/sous-tension et surchauffe du servo, état = 4+1=5 ;

## 3.3 Conditions de délestage

Conditions de délestage : 0 = désactivé, 1 = activé

- Bits / poids : description

- BIT0（1）: protection de tension

- BIT1（2）: ----

- BIT2（4）: protection contre la surchauffe

- BIT3（8）: ----

- BIT4（16）: ----

- BIT5（32）: surcharge de charge

- BIT6（64）: ----

- BIT7（128）: ----

Si plusieurs bits sont définis simultanément, la valeur de délestage est la somme des valeurs des bits. Exemple : protection de tension et protection de surchauffe activées, délestage = 4+1=5 ;

## 3.4 Conditions d'alarme LED

Conditions d'alarme LED : 0 = désactivée, 1 = activée

- Bits / poids : description

- BIT0（1）: alarme de tension

- BIT1（2）: ----

- BIT2（4）: alarme de surchauffe

- BIT3（8）: ----

- BIT4（16）: ----

- BIT5（32）: alarme de surcharge

- BIT6（64）: ----

- BIT7（128）: ----

Si plusieurs bits sont définis simultanément, la valeur d'alarme LED est la somme des valeurs des bits. Exemple : alarme de tension et alarme de surchauffe activées, alarme = 4+1=5 ;
