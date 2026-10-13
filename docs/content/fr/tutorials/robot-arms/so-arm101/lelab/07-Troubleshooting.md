---
title: "7 · Dépannage"
description: "Dépannage LeLab par symptôme : conflits de port, problèmes USB et série, erreurs de calibration et d'enregistrement, et les vérifications à faire."
---

# 7 · Dépannage

> **Précédent :** [06 Entraîner et exécuter l'inférence](06-Train-and-Inference.md)

Regroupé par symptôme.

## La page ne s'ouvre pas, ou un port est occupé

Les ports **8000** et **8080** appartiennent à LeLab. Un processus résiduel en est la cause habituelle — un que vous avez fermé en fermant le terminal plutôt qu'avec `Ctrl+C`.

```bash
lelab --stop
```

Libère les deux ports. Pour vérifier avant de démarrer :

```bash
curl http://localhost:8000/health
```

Une réponse JSON signifie que quelque chose tourne sur 8000.

## En mode `--dev`, la page est blanche ou renvoie 404

Vite sert l'interface sur **:8080** ; l'API tourne sur **:8000**. Naviguez sur `:8080`. Le port 8000 en mode `--dev` vous donne une API sans interface.

## Les bras n'apparaissent pas

Vérifiez que les ports sont visibles pour votre utilisateur. Sous Linux, un groupe manquant donne l'impression que le bras n'est pas là :

```bash
ls /dev/ttyACM*
groups | grep dialout
```

Si `dialout` est absent :

```bash
sudo usermod -aG dialout $USER
```

Ensuite, **déconnectez-vous et reconnectez-vous** — le groupe est lu à la connexion, donc un nouveau terminal ne suffit pas.

### Un seul bras est détecté

Utilisez **deux ports USB distincts**, pas un hub ; les deux bras s'énumèrent comme le même type de dispositif et un hub partagé peut les présenter de manière peu fiable. Pour identifier un port, débranchez un bras et regardez quelle entrée de la liste disparaît.

## Je dois recalibrer à chaque fois

Les fichiers de calibration se trouvent sous `~/.cache/huggingface/lerobot/` — c'est-à-dire sous `~/.cache/`. Les outils de nettoyage de cache et les redémarrages de conteneur les emportent.

- Sauvegardez `~/.cache/huggingface/lerobot/calibration/` dans un endroit durable.
- Dans un conteneur, montez ce répertoire comme volume.

### Un bras calibré se comporte bizarrement sans demander à être recalibré

Vérifiez que le **profil** sélectionné appartient à ce bras physique. Les profils sont liés aux points zéro d'un seul bras ; intervertir les bras impose de recalibrer.

## Une image de caméra est à l'envers ou sur le côté

Réglez la **Rotation** de la caméra dans l'[onglet Calibration](03-Calibration.md) : 0°, 90°, 180° ou 270° dans le sens horaire. Une caméra de poignet à l'envers correspond à 180°.

**90° et 270° échangent les dimensions de sortie** — une capture en 640 × 480 devient 480 × 640.

## La policy entraînée ne fait rien d'utile

Dans l'ordre — les deux premiers cas sont bien plus fréquents qu'un mauvais entraînement :

1. **Rotation de la caméra.** Confirmez que l'inférence utilise la rotation employée au moment de l'enregistrement. 0° et 180° ont des dimensions d'image identiques, donc rien ne vous avertit.
2. **Association des caméras.** Si la caméra nommée `wrist` pendant l'enregistrement est désormais une autre caméra physique, la policy voit la mauvaise image.
3. **Position de départ et description de la tâche.** L'inférence doit partir de la configuration depuis laquelle les démonstrations ont commencé.
4. **Checkpoints.** Essayez-en un plus ancien.

## Utiliser un téléphone comme caméra

Les navigateurs n'accordent l'accès à la caméra (`getUserMedia`) que via **HTTPS**, sauf sur `localhost`, donc un téléphone qui se connecte via le réseau local est refusé.

Guide d'installation : [`frontend/HTTPS_SETUP.md`](https://github.com/Juxi-Technology/leLab/blob/main/frontend/HTTPS_SETUP.md). Les certificats sont auto-signés, donc le navigateur affiche un avertissement à accepter.

L'installation par défaut ne démarre **pas** en HTTPS ; les caméras de téléphone nécessitent le démarrage manuel avec les options de certificat décrites dans ce guide.

## Un jeu de données ne peut pas être ouvert — « pas encore téléchargé »

LeRobot écrit l'index du jeu de données quand un enregistrement **se termine correctement**. Une session tuée en plein épisode peut laisser un répertoire qui semble complet mais ne l'est pas. Les données des épisodes sont généralement encore sur le disque ; c'est l'index qui manque. Réenregistrez la session, et arrêtez-la avec le bouton stop.

## L'entraînement signale un paquet manquant

Certains types de policy et fonctionnalités d'entraînement facultatives nécessitent des dépendances qui ne sont pas installées par défaut. L'onglet Entraînement propose de les installer quand vous en sélectionnez un ; attendez la fin de l'installation en arrière-plan avant de lancer la tâche. Le journal d'entraînement nomme le paquet si vous préférez l'installer à la main.

## Aucune notification de mise à jour n'apparaît

C'est voulu : la vérification ne s'applique qu'aux installations faites depuis git. Une **installation modifiable** (`pip install -e .`) est une copie de travail et n'est pas vérifiée. Mettez-les à jour avec `git pull`.

## Toujours bloqué

Rassemblez la **console du navigateur** et le **terminal qui exécute `lelab`** — le serveur journalise la requête qui a échoué. La plupart de ces échecs sont à un pas de la dernière chose que vous avez modifiée.

---

> **Retour au début :** [01 Vue d'ensemble](01-Overview.md) · [Index du tutoriel](https://github.com/Juxi-Technology/leLab/blob/main/README.md)

<RelatedProducts slugs="so-arm101" />
