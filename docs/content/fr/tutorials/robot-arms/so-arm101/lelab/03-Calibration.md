---
title: "3 · Connexion et calibration"
description: "Connecter et calibrer les deux bras dans LeLab : câblage USB, permissions série sous Linux et calibration guidée qui enregistre le point zéro et la plage de chaque articulation."
---

# 3 · Connexion et calibration

> **Précédent :** [02 Installer et lancer](02-Install.md)
> **Suivant :** [04 Téléopération](04-Teleoperation.md)

La calibration enregistre le point zéro et la plage de débattement de chaque articulation. Faites-la une fois par bras ; refaites-la après un démontage ou si le fichier de calibration est perdu.

## Avant de commencer

- Les deux bras assemblés, les servos ayant reçu leurs ID.
- Les deux bras alimentés.
- Un câble USB par bras, sur **deux ports USB distincts** — un hub partagé les énumère parfois de manière peu fiable.

### Linux : permissions série

```bash
sudo usermod -aG dialout $USER
```

Ensuite, **déconnectez-vous et reconnectez-vous**. Sans cela, LeLab détecte le bras mais chaque lecture échoue avec une erreur de permission. Windows et macOS n'ont besoin de rien.

## Quel bras est lequel

| Bras | Nom LeRobot | Nom dans LeLab |
|---|---|---|
| Celui que vous déplacez à la main | `so101_leader` | **teleop** |
| Celui qui suit | `so101_follower` | **robot** |

Calibrez le leader en premier. Les confondre est la cause habituelle d'un bras fraîchement calibré qui se comporte bizarrement.

## Le déroulé

Ouvrez l'onglet **Calibration** et traitez un bras à la fois :

1. **Choisissez le dispositif** — leader (teleop) ou follower (robot).
2. **Choisissez le port série.** LeLab liste les dispositifs série USB qu'il voit. Pour les distinguer, débranchez un bras et regardez quelle entrée disparaît. Le choix est mémorisé.
3. **Choisissez un profil de calibration** — existant ou nouveau. Le profil contient les positions zéro enregistrées ; si ce bras a déjà été calibré, réutilisez son profil.
4. **Suivez les étapes guidées.** LeLab parcourt chaque articulation l'une après l'autre ; amenez l'articulation à la position demandée et confirmez. Aucune saisie au clavier.
5. **Répétez pour l'autre bras** — son propre profil et son propre port.

> Chaque profil appartient à un bras physique précis. Intervertir les deux bras impose de recalibrer.

## Caméras

Les caméras se configurent dans le même onglet. Le nom de chaque caméra (`front`, `wrist`, …) est la clé que voit la policy, alors utilisez des noms que vous reconnaîtrez dans un journal d'entraînement.

Les caméras peuvent être montées avant ou après la calibration ; la calibration ne dépend pas d'elles. Gardez l'association stable — changer quelle caméra physique s'appelle `wrist` entre l'enregistrement et l'inférence fait qu'une policy entraînée se comporte de façon absurde.

### Rotation

Si une caméra est montée à l'envers ou sur le côté, réglez sa **Rotation** : 0°, 90°, 180° ou 270° dans le sens horaire. Une caméra de poignet à l'envers correspond à 180°.

La rotation est enregistrée par caméra et appliquée à l'aperçu de configuration, à l'aperçu de téléopération, aux images enregistrées et à l'inférence. Les profils sans réglage de rotation sont traités comme 0°.

- **90° et 270° échangent les dimensions de sortie.** Une capture en 640 × 480 devient 480 × 640.
- **Les dimensions des images d'un checkpoint ne révèlent pas l'orientation.** 0° et 180° produisent des dimensions identiques mais des images opposées. Avant l'inférence, réglez la rotation utilisée lors de l'enregistrement — voir [page 6](06-Train-and-Inference.md).

## Ce qui est enregistré

| Fichier | Contenu |
|---|---|
| `~/.cache/huggingface/lerobot/calibration/teleoperators/so101_leader/*.json` | Profils du leader |
| `~/.cache/huggingface/lerobot/calibration/robots/so101_follower/*.json` | Profils du follower |
| `~/.cache/huggingface/lerobot/ports/leader_port.txt` | Port série du leader |
| `~/.cache/huggingface/lerobot/ports/follower_port.txt` | Port série du follower |

Ceux-ci se trouvent sous `~/.cache/`, donc les outils de nettoyage de cache peuvent les supprimer. Si un bras calibré redemande à être calibré, vérifiez ici — voir [Dépannage](07-Troubleshooting.md).

---

> **Suivant :** [04 Téléopération](04-Teleoperation.md)

<RelatedProducts slugs="so-arm101" />
