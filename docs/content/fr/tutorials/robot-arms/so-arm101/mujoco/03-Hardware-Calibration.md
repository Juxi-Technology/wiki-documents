---
title: "03 · Connexion au robot réel et calibration"
description: "Une fois la carte de commande à puce CH343 branchée, un port COM apparaît ; son numéro change selon les branchements ou le port USB utilisé, vérifiez-le avan…"
---

# 03 · Connexion au robot réel et calibration

> Prérequis : avoir terminé [01 Préparation de l'environnement](/fr/tutorials/robot-arms/so-arm101/mujoco/01-Environment) (l'extra `feetech` fournit la communication série).
> Ports d'exemple de ce chapitre : bras suiveur `COM172`, bras meneur `COM124` (valeurs mesurées sur le bras meneur actuellement utilisé sur cette machine) — **le numéro peut changer à chaque branchement ;
> fiez-vous toujours au port réel relevé à la première étape**, il suffit de remplacer le port dans les commandes ci-dessous par votre numéro.

## Identifier le port série

Une fois la carte de commande à puce CH343 branchée, un port COM apparaît ; son numéro change selon les branchements ou le port USB utilisé, vérifiez-le avant chaque connexion :

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
uv run --frozen python -c "import serial.tools.list_ports as lp; [print(p.device, '|', p.description, '|', p.hwid) for p in lp.comports()]"
```

La ligne où apparaît `CH343` (ou un périphérique série USB similaire) correspond à la carte de commande ; notez son numéro `COM`.

## Première étape : contrôle initial en lecture seule (câblage/alimentation/servomoteurs)

**Sans rien écrire**, commencez par pinguer chacun des six servomoteurs, puis lisez la tension et la température (l'état du couple est conservé tel quel) :

```bash
uv run --frozen python examples/so101_mujoco/hardware_check.py --port COM172   # 换成你查到的端口
```

`--port` correspond au numéro relevé à la première étape ; indiquez le port du bras à contrôler (le même script fonctionne pour le bras suiveur comme pour le bras meneur).

Une sortie normale se présente ainsi : six lignes d'articulations, une température de 20–30 °C, un couple de 0 (bras libre). **La tension dépend du mode d'alimentation** : environ 11 V lorsque le bras suiveur est alimenté en externe,
environ 5 V lorsque le bras meneur est alimenté uniquement par la carte de commande — si les six servomoteurs sont lus, le câblage est correct. Un servomoteur manquant ou d'un modèle incorrect
déclenche une erreur immédiate.

## Deuxième étape : calibration

La calibration écrit dans l'EEPROM des servomoteurs « la plage de course de chaque articulation + la référence de position médiane » et l'enregistre dans un fichier local ; **le bras suiveur et le bras meneur doivent chacun être calibrés une fois**.
Les fichiers de calibration des deux bras sont stockés séparément et n'interfèrent pas entre eux :

| Appareil | Commande | Emplacement du fichier de calibration |
| --- | --- | --- |
| Bras suiveur | `uv run --frozen lerobot-calibrate --robot.type=so101_follower --robot.port=COM172 --robot.id=juxi_so101` | `~/.cache/huggingface/lerobot/calibration/robots/so_follower/juxi_so101.json` |
| Bras meneur | `uv run --frozen lerobot-calibrate --teleop.type=so101_leader --teleop.port=COM124 --teleop.id=juxi_leader` | `.../calibration/teleoperators/so_leader/juxi_leader.json` |

Signification des paramètres des commandes :

| Paramètre | Description |
| --- | --- |
| `--robot.type=so101_follower` / `--teleop.type=so101_leader` | rôle de l'objet à calibrer : bras suiveur / bras meneur (ne pas inverser les rôles, les fichiers de calibration sont stockés par rôle dans des répertoires distincts) |
| `--robot.port` / `--teleop.port` | numéro de port série relevé à la première étape |
| `--robot.id` / `--teleop.id` | nom donné à ce bras (ici `juxi_so101` / `juxi_leader`) ; **la téléopération et l'enregistrement doivent ensuite utiliser le même id**, sinon la calibration sera redemandée |

La valeur de `id` peut être choisie librement, mais les calibrations des deux bras sont indépendantes et ne s'écrasent pas mutuellement.

### Étapes physiques (le terminal affiche un schéma)

1. **Placez le bras en position médiane puis appuyez sur Entrée** : posez la base à plat sur le bord de la table, le grand bras vertical vers le haut, le petit bras horizontal vers l'avant, la rotation de l'épaule et le poignet centrés
   (la « pince » du bras meneur est une poignée/détente). La position à cet instant est enregistrée comme « référence médiane » du bras.
2. Après avoir appuyé sur Entrée, **parcourez lentement toute la plage de mouvement de chaque articulation, une par une** (`wrist_roll` n'a pas besoin d'être balayé, il est traité automatiquement sur un tour complet), puis appuyez de nouveau sur Entrée pour enregistrer.

Points d'attention :

- Pendant la calibration du bras suiveur, le couple est à 0 (le bras est mou) : guidez-le à la main ; le bras meneur n'a de toute façon pas de couple.
- La calibration écrit dans l'EEPROM des servomoteurs (cela fait partie de la procédure, c'est normal).
- Résultats de calibration mesurés cette fois (à titre de comparaison) : course d'environ 1474–2688 counts pour les articulations du bras suiveur, rotation du poignet (`wrist_roll`) à 4095 counts ;
  environ 2208–2681 counts pour le bras meneur. Une course nettement asymétrique est normale (raison et compensation dans
  [05 Ajustement fin du zéro](/fr/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin)).

<RelatedProducts slugs="so-arm101" />
