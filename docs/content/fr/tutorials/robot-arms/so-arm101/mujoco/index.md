---
title: "SO-ARM101 × MuJoCo — Tutoriel du parcours complet (index)"
---

# SO-ARM101 × MuJoCo — Tutoriel du parcours complet (index)


> Ce tutoriel documente et reproduit le **workflow complet simulation + robot réel** du SO-ARM101 : de la mise en place de l'environnement, la vérification du modèle et la calibration du matériel réel,
> à la téléopération au clavier / au bras meneur, à l'enregistrement et à la relecture des données. Toutes les commandes ont été validées lors d'une session réelle + simulation le 2026-10-15.
>
> Public visé : utilisateurs du kit Juxi SO-ARM101 et ingénieurs internes. Aucune connaissance préalable de MuJoCo ou de LeRobot n'est requise.

## Carte du parcours complet (deux pistes, un socle de composants commun)

```
                         ┌──────────────── 共用组件 ────────────────┐
                         │  数据集格式(LeRobotDataset) · 回放 · 未来训练  │
                         └──────────────────────────────────────────┘
                                      ▲                    ▲
        ┌── 真机轨 ──────────────────┘                    └──────────── 仿真轨 ──┐
        │  操控: 主动臂(实体) / 键盘                                      操控: 键盘 / 主动臂(实体) │
        │  被控: 真机从动臂 (COM 串口)                                    被控: MuJoCo 仿真从动臂   │
        │  命令: --robot.type=so101_follower                            命令: --robot.type=so101_mujoco │
        └───────────────────────────────────────────────────────────────────────┘
```

| Chapitre | Contenu | Ce que vous obtenez |
| --- | --- | --- |
| [01 Préparation de l'environnement](/fr/tutorials/robot-arms/so-arm101/mujoco/01-Environment) | environnement uv, extras de dépendances, points d'attention Windows | un environnement opérationnel |
| [02 Vérification du modèle de simulation](/fr/tutorials/robot-arms/so-arm101/mujoco/02-Sim-Model-Verification) | chargement/comparaison/rendu piloté des trois modèles MJCF | la confiance dans le modèle et le comportement de la simulation |
| [03 Connexion au robot réel et calibration](/fr/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration) | identification des ports série, contrôle initial en lecture seule, calibration du bras suiveur/meneur | deux bras reconnus par le logiciel |
| [04 Téléopération au clavier](/fr/tutorials/robot-arms/so-arm101/mujoco/04-Keyboard-Teleop) | pilotage clavier du robot réel/simulé, réglage de la cadence, limitation de vitesse de sécurité | le moyen de contrôle manuel le plus rapide |
| [05 Jumeau numérique du bras meneur](/fr/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin) | le bras meneur physique pilote le bras suiveur simulé, ajustement fin du zéro | démonstration de jumeau numérique et acquisition de données |
| [06 Enregistrement et relecture de données](/fr/tutorials/robot-arms/so-arm101/mujoco/06-Record-and-Replay) | enregistrement réel/simulation, contrôle des épisodes, relecture, script d'inspection | un jeu de données exploitable pour l'entraînement |
| [07 Problèmes fréquents et retours d'expérience](/fr/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting) | tous les pièges rencontrés dans ce parcours et leurs solutions | un manuel de dépannage |
| [08 Feuille de route](/fr/tutorials/robot-arms/so-arm101/mujoco/08-Roadmap) | caméras, scènes avec objets, génération automatique de données, entraînement | les prochaines étapes prévues |
| [09 Tutoriel d'utilisation complet](/fr/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial) | chaîne complète : démarrage du bras → enregistrement → inspection → visionnage des vidéos → entraînement → déploiement en simulation ; inclut une alternative avec environnement conda | de zéro à un jeu de données conforme, puis à une politique en action |

**Ordre recommandé pour une première utilisation** : 01 (environnement) → 03 (uniquement si vous connectez le robot réel) → suivez le [09 Tutoriel d'utilisation complet](/fr/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial)
pour le parcours principal (enregistrement → inspection → visionnage des vidéos → entraînement → déploiement) ; 02 et 04–08 sont des manuels de référence à consulter au besoin.
Chaque commande du 09 peut être copiée et exécutée directement, sans avoir à revenir à un autre chapitre pour installer quoi que ce soit.

## Trois conventions à retenir impérativement

1. **Système d'unités** (aligné sur les trois acteurs) : les cinq articulations du corps utilisent **−100 à 100** (proportion de course, 0 = milieu de course), la pince utilise
   **0 à 100** (0 = fermée). Le robot réel (`use_degrees=false`), la simulation et le bras meneur suivent tous cette convention ; les jeux de données enregistrés sont structurellement identiques aux jeux de données réels officiels tels que
   `lerobot/svla_so101_pickplace` (vecteur à 6 dimensions + noms des articulations).
2. **Correspondance des rôles** : l'objet piloté (robot réel ou simulation) est toujours configuré avec `--robot.*` ; le dispositif de commande (clavier/bras meneur) est toujours configuré avec `--teleop.*`.
3. **Préfixe de commande sur cette machine** : sur ce poste de développement, toutes les commandes `uv` nécessitent de définir d'abord le répertoire de cache (raison dans [07](/fr/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)) :

   ```bash
   export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'
   ```

## Environnement de test

| Élément | Version |
| --- | --- |
| Système | Windows 11 |
| Python / uv | 3.12.9 / 0.12.5 |
| lerobot | 0.6.2 (ce dépôt, `.venv` isolé dans le projet, sans impact sur conda) |
| MuJoCo | 3.16.0 |
| PyTorch | 2.11.0 (version CPU) |
| Matériel | bras meneur SO-ARM101 (COM124) + bras suiveur (COM172), puce série CH343 |

<RelatedProducts slugs="so-arm101" />
