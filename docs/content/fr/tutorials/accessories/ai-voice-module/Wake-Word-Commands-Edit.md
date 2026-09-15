---
title: "Modifier le mot de réveil et les mots de commande"
description: "Veuillez modifier le mot de réveil dans un environnement calme ; un environnement bruyant affectera la précis…"
---

# Modifier le mot de réveil et les mots de commande

## 1. Précautions

Veuillez modifier le mot de réveil dans un environnement calme ; un environnement bruyant affectera la précision de reconnaissance du module d'interaction vocale.

Lorsque vous prononcez une entrée, la voix doit être forte et le débit ne doit pas être trop rapide ; il est recommandé de rester à moins de 5 mètres du module.

## 2. Connexion de l'appareil

![Image 1](../../../../../public/images/tutorials/accessories/ai-voice-module/Wake-Word-Commands-Edit/1.png)

## 3. Modifier le mot de réveil

Dites “你好，小犀” au module d'interaction vocale pour le réveiller ; lorsque le module répond “我在”, cela indique qu'il se trouve actuellement dans un état reconnaissable.  Dites ensuite l'entrée “学习唤醒词” au module d'interaction vocale ; lorsque le module d'interaction vocale répond “说出唤醒词”, vous êtes entré dans l'état d'apprentissage du mot de réveil.  Ensuite, dites le mot de réveil que vous souhaitez définir au module d'interaction vocale — le mot de réveil doit être aussi court que possible ; nous prenons ici comme exemple la définition de “你好，小犀”.  Lorsque le module d'interaction vocale le reconnaît avec succès, il diffuse “学习成功”, ce qui indique que le mot de réveil a été modifié avec succès. Nous pouvons alors utiliser l'entrée “你好小犀” pour réveiller le module.

Remarque : le mot de réveil “你好，小犀” du micrologiciel d'usine est le mot de réveil de base ; il ne peut pas être modifié ni supprimé par la voix. Un seul mot de réveil modifié par la voix peut exister à la fois, et il coexiste avec le mot de réveil de base.

## 4. Modifier les mots de commande

Le micrologiciel d'usine du module d'interaction vocale précharge 8 mots de commande modifiables par la voix, comme indiqué ci-dessous :

Un exemple d'utilisation est le suivant :

Dites "你好，小犀" au module d'interaction vocale pour le réveiller ; lorsque le module répond “我在”, cela indique qu'il se trouve actuellement dans un état reconnaissable.  Dites ensuite l'entrée “学习停车指令” au module d'interaction vocale ; lorsque le module d'interaction vocale répond “请说指令”, vous êtes entré dans l'état d'apprentissage des mots de commande.  Ensuite, dites le mot de commande que vous souhaitez définir au module d'interaction vocale — le mot de commande doit être aussi court que possible ; nous prenons ici comme exemple la définition de “前方停车”.  Après que le module d'interaction vocale l'a reconnu avec succès, il diffuse “学习成功”, ce qui indique que le mot de commande a été modifié avec succès. Nous pouvons alors utiliser l'entrée “前方停车” pour obtenir le même effet que le mot de commande “停车”.  Si vous devez supprimer l'entrée ”前方停车“, il suffit de dire ”删除停车指令“ ; lorsqu'il répond ”删除成功”, la suppression de l'entrée est terminée (seul “前方停车” sera supprimé ici, pas ”停车“).

Remarque : les mots de commande du micrologiciel d'usine sont des mots de commande de base ; ils ne peuvent pas être modifiés ni supprimés par la voix. Un seul mot de commande modifié par la voix peut exister à la fois, et il coexiste avec les mots de commande de base.



