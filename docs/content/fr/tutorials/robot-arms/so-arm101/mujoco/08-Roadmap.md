---
title: "08 · Feuille de route"
description: "Terminé :"
---

# 08 · Feuille de route

## Terminé (directement exécutable depuis ce dépôt)

| Capacité | État |
| --- | --- |
| Chargement/pilotage/rendu de vérification des modèles de simulation (3 MJCF) | ✅ |
| Téléopération au clavier (simulation / robot réel) | ✅ validé sur matériel réel |
| Jumeau numérique du bras meneur (bras physique → bras simulé, avec ajustement fin du zéro) | ✅ validé sur matériel réel |
| Enregistrement de données (réel / simulation) + contrôle des épisodes + script d'inspection | ✅ validé sur matériel réel |
| Relecture de données (réel / simulation, mécanisme officiel) | ✅ validé sur matériel réel |
| Tests de fumée automatisés (sans matériel, `smoke_test.py`) | ✅ 26 tests réussis |
| Jeu de données visuel à deux caméras `so101_sim_vision` (5 épisodes / 10610 frames / 353,8 s) | ✅ |
| Entraînement (ACT) et déploiement de politique en simulation (`lerobot-train` / `lerobot-rollout`) | ✅ testé en smoke (voir [09](/fr/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial)) |

## Prochaines étapes (par ordre de valeur)

### Phase 2 · Caméra intégrée à la scène (en cours)

**Terminé** :
- Le support (STEP→STL) et la caméra (corps de remplacement construit d'après la fiche technique HBVCAM-F2170HD V22, 25×30×5,2 mm) sont assemblés dans la simulation,
  la pose étant ajustée par comparaison avec le robot réel via `adjust_mount.py` / `adjust_camera.py` ;
- L'élément `<camera>` est intégré (`sim_cam`, fovy initial 49°), et **la chaîne d'enregistrement visuel en simulation est opérationnelle** :
  `--robot.image_camera=sim_cam` produit un jeu de données vidéo `observation.images.wrist` (tests de fumée [5] tous réussis).

**Mise à jour du 2026-10-16** : la visée/fovy de la caméra a été réglée de manière satisfaisante (`adjust_camera.py` ajoute une **fenêtre d'image en temps réel live view**,
reprise du réglage après interruption et réouverture automatique en cas de fermeture accidentelle de la fenêtre ; correction du bug « l'orientation de l'objectif et l'image sont inversées » dû à la direction de visée d'une caméra MuJoCo = **−Z de l'élément**,
détails dans [07](/fr/tutorials/robot-arms/so-arm101/mujoco/07-Troubleshooting)). Le jeu de données visuel officiel a été enregistré avec le nouveau bras meneur calibré (avec vidéo wrist, erreur de suivi ≤2 unités) ✅ ;
les anciens enregistrements expérimentaux ont été nettoyés le 2026-10-16, et le jeu de données officiel est unifié sous `so101_sim_vision` (deux caméras).
**Le même jour, le robot simulé a migré vers le modèle SO-ARM100 de mujoco_menagerie** (2026-10-16) : la pince de l'ancien modèle du tutoriel ne peut pas saisir,
la pince du nouveau modèle utilise la collision CAO du robot réel et permet de saisir stablement un cube de 34 mm en pratique ; les chaînes d'enregistrement/téléopération/double caméra/espace de travail sont toutes conservées,
en attente d'une revérification par téléopération sur le robot réel (notamment le signe de direction de wrist_roll).
**Reste à faire** : une fois la HBVCAM réelle branchée, effectuer un ajustement comparatif « photo réelle vs rendu simulé » ;
en option : remplacer le corps de remplacement par le STL de la caméra réelle. La configuration caméra côté robot réel (`--robot.cameras` OpenCV) sera faite ensuite.

### Phase 3 · Scène et montée en échelle (en cours)

- ✅ Espace de travail intégré à la scène (2026-10-16) : plaque de base + cubes de trois couleurs (34 mm, saisissables) + bac de rangement + caméra de dessus fixe `top_cam`
  (définis dans `so101_assets.add_workspace`, outil de rendu et de contrôle du gain `preview_workspace.py`) ; **la chaîne d'enregistrement avec deux caméras (wrist+top)
  est opérationnelle** (`--robot.top_camera=top_cam`) ;
- **Génération automatique de données** : politiques scriptées/RL exécutées en batch toute la nuit dans la simulation (sans humain dans la boucle), c'est la source du « gain d'efficacité de plusieurs dizaines de fois » ;
- Randomisation du domaine visuel (textures/éclairage/tremblement de caméra) en préparation du sim2real.

### Phase 4 · Entraînement et déploiement

- ✅ **La chaîne entraînement/déploiement a été testée** (2026-10-16) : `lerobot-train` (ACT, smoke de 12 pas sur CPU — environ 2 s/pas, loss qui diminue normalement,
  checkpoint écrit sur disque comme prévu) et `lerobot-rollout --strategy.type=base` (exécution réelle de la politique pendant 20 s dans la simulation,
  retour automatique du bras à la pose initiale avant la fin) sont opérationnels ; commandes complètes, points clés et méthode de reprise dans les sections 7/8 du [09](/fr/tutorials/robot-arms/so-arm101/mujoco/09-Usage-Tutorial) ;
  le checkpoint de démonstration fourni avec le tutoriel `outputs/train/smoke_act` permet de tester directement la chaîne de déploiement ;
- L'entraînement officiel se fait sur une **machine équipée d'un GPU** (ACT / SmolVLA ; le CPU seul de cette machine ne convient qu'à la validation de la chaîne sur peu de pas) ;
  il suffit de copier le jeu de données ou de le pousser vers un dépôt privé HF ;
- Le déploiement sur robot réel passe également par `lerobot-rollout` (remplacez `--robot.*` par la configuration `so101_follower`).

### Long terme · sim2real

Entraînement mixte données de simulation + un peu de données réelles → évaluation à coût nul sur le robot réel (le taux de réussite des politiques peut être évalué de manière reproductible en simulation).
Attention : passer directement de données purement simulées au robot réel (transfert zéro-shot) est la voie la plus difficile ; commencez par une « boucle courte » (entraînement sur données réelles → déploiement réel),
puis ajoutez progressivement la simulation.

## En une phrase

Pour les équipes disposant déjà d'un bras physique : la simulation = **bac à sable de développement + support de démonstration + amplificateur de données** ;
pour les clients potentiels : la simulation = **un outil d'expérience permettant de parcourir tout le processus avant l'achat**.

<RelatedProducts slugs="so-arm101" />
