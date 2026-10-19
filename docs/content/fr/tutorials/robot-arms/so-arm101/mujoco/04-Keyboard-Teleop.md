---
title: "04 · Téléopération au clavier"
description: "Utiliser le clavier pour « déplacer pas à pas » les articulations et contrôler manuellement le bras réel ou simulé — la méthode de contrôle la plus rapide lo…"
---

# 04 · Téléopération au clavier

Utiliser le clavier pour « déplacer pas à pas » les articulations et contrôler manuellement le bras réel ou simulé — la méthode de contrôle la plus rapide lorsqu'aucun bras meneur n'est disponible, et l'un des moyens d'enregistrer des données de démonstration.

> Prérequis : pour la partie simulation, il suffit d'avoir terminé [01](/fr/tutorials/robot-arms/so-arm101/mujoco/01-Environment) ; pour la partie robot réel, terminez aussi [03](/fr/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration).
> Les valeurs `COM172`/`juxi_so101` dans les commandes sont des exemples — remplacez le port après vérification au chapitre 03, et utilisez pour `id` le nom choisi lors de la calibration.

## Commandes

```bash
export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'

# 真机从动臂
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py \
    --robot.type=so101_follower --robot.port=COM172 --robot.id=juxi_so101 \
    --robot.use_degrees=false --robot.max_relative_target=5 \
    --teleop.type=so101_keyboard --teleop.rate=150

# 仿真从动臂（MuJoCo 窗口自动打开）
uv run --frozen --with mujoco python examples/so101_mujoco/teleoperate.py \
    --teleop.rate=150
```

(`teleoperate.py` utilise par défaut `--robot.type=so101_mujoco --teleop.type=so101_keyboard`.)

## Touches (maintenir pour agir, écoute globale — quel que soit le focus)

| Touche | Action | Touche | Action |
| --- | --- | --- | --- |
| `w` / `s` | shoulder_lift haut / bas | `a` / `z` | shoulder_pan gauche / droite |
| `e` / `d` | elbow_flex extension / flexion | `t` / `g` | wrist_flex + / − |
| `y` / `h` | wrist_roll + / − | `u` / `j` | pince ouverture / fermeture |

Les touches ont été **délibérément choisies pour éviter les touches de contrôle de l'enregistrement** (`n/r/q`, flèches, `Esc`), afin que la téléopération et l'enregistrement puissent tourner en même temps.

## Paramètres clés

| Paramètre | Rôle | Valeur recommandée |
| --- | --- | --- |
| `--teleop.rate` | vitesse cible lorsqu'une touche est maintenue (unités/seconde) | la valeur par défaut de 60 est plutôt lente ; **150** est plus adapté au ressenti sur le robot réel |
| `--robot.max_relative_target` | nombre maximal d'unités dont une articulation peut bouger par cycle de contrôle (limitation de vitesse de sécurité) | robot réel **5** (téléopération à 60 Hz) / **10** (enregistrement à 30 Hz) |
| `--robot.use_degrees=false` | utiliser la proportion de course (−100 à 100) plutôt que les degrés | **obligatoire sur le robot réel**, sinon les unités ne correspondent pas (la simulation est déjà alignée par défaut) |

## Comportement

- **Ne tapez pas pendant la téléopération** : l'écoute clavier est **globale et n'intercepte pas les touches** — appuyer sur une touche mappée dans n'importe quelle fenêtre de l'ordinateur
  (`w a s z e d t g y h u j`, y compris la saisie pinyin dans une fenêtre de discussion) pilote aussi le bras. Le mode bras meneur n'a pas ce problème.
- **Le bras bouge au moment de la connexion** : le bras suiveur réel active d'abord le couple (il devient rigide), puis se déplace vers la « pose médiane » (la cible avant tout appui sur une touche) ;
  le bras simulé converge directement vers la pose médiane. Laissez de l'espace autour du bras.
- **Quitter** : `Ctrl-C` dans ce terminal (ou `Esc`, l'écoute clavier se déconnecte et quitte proprement). Après la sortie, le robot réel **perd son couple et devient mou**,
  soutenez-le à la main — c'est un comportement normal.
- **Les séries de WARNING `clamped to be safe` dans le journal de démarrage** sont une sortie normale du limiteur de vitesse pendant qu'il « rattrape » la cible ; elles s'arrêtent automatiquement une fois la position atteinte.

<RelatedProducts slugs="so-arm101" />
