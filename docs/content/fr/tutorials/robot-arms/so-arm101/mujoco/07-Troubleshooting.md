---
title: "07 · Problèmes fréquents et retours d'expérience"
description: "Les pièges réellement rencontrés dans ce parcours, à consulter rapidement par symptôme."
---

# 07 · Problèmes fréquents et retours d'expérience

Les pièges réellement rencontrés dans ce parcours, à consulter rapidement par symptôme.

## Environnement

| Symptôme | Cause et solution |
| --- | --- |
| `uv sync` affiche `failed to persist temporary file ... os error 17（跨盘）` | cas particulier Windows de cette machine, où le répertoire de cache uv est sur un autre disque. Ajoutez `export UV_CACHE_DIR='C:\Users\admin\AppData\Local\Temp\uv-cache'` devant toutes les commandes uv |
| La console affiche des dizaines de lignes d'échec de chargement de `libtorchcodec_core*.dll` | avertissement bruyant : après l'échec de chargement de torchcodec, repli automatique sur **pyav**. Mesures (smoke [5]) : pyav **encode et décode normalement les jeux de données vidéo** ; les jeux de données d'état comme les jeux de données vidéo ne sont pas affectés |
| `python` ouvre le Microsoft Store | utilisez le Python géré par uv ; n'utilisez pas la version Store |
| `lerobot-train` affiche `accelerate is required but not installed` | l'extra `training` a été omis lors de l'installation initiale — ajoutez `--extra training` à la commande `uv sync` de [01](/fr/tutorials/robot-arms/so-arm101/mujoco/01-Environment) puis réessayez (l'installation unique du 01 l'inclut déjà ; si vous avez suivi le 01, vous ne rencontrerez pas ce problème) |

## Téléopération

| Symptôme | Cause et solution |
| --- | --- |
| Le contrôle au clavier « très lent » | `--teleop.rate` est prudent par défaut à 60 unités/seconde ; passez à **150** pour un ressenti normal (course complète en environ 1,3 s) |
| Le journal de démarrage affiche des WARNING `clamped to be safe` | sortie normale pendant que le limiteur de vitesse rattrape la cible ; elle s'arrête une fois la position atteinte |
| Le bras simulé est décalé de quelques degrés lorsque le bras meneur est centré | biais fixe dû à l'asymétrie de la plage de calibration — utilisez l'ajustement automatique de `so101_leader_trim` ([05](/fr/tutorials/robot-arms/so-arm101/mujoco/05-Leader-Digital-Twin)) |
| Le bras bouge soudainement au moment de la connexion | comportement voulu : sur le robot réel, le couple s'active et le bras se déplace vers le point médian/la pose du bras meneur ; laissez de l'espace autour du bras |
| Après Ctrl-C, le bras devient mou et retombe | normal : le couple est coupé à la déconnexion ; soutenez-le à la main |
| Taper au clavier pendant la téléopération/l'enregistrement pilote le bras | l'écoute clavier est **globale et n'intercepte pas les touches** : toute frappe d'une touche mappée dans n'importe quelle fenêtre (y compris les lettres du pinyin) entre dans la file de touches. Ne tapez pas pendant la téléopération/l'enregistrement en mode clavier ; le mode bras meneur n'a pas ce problème |

## Enregistrement

| Symptôme | Cause et solution |
| --- | --- |
| Après avoir quitté avec `q`, toutes les lettres tapées pendant la session « se déversent d'un coup dans la ligne de commande » | écho accumulé du tampon d'entrée de la console Windows ; le lanceur intègre désormais un nettoyage `drain_pending_keys()` (seules les anciennes sessions présentaient ce symptôme) |
| L'action span d'un épisode est entièrement à 0 | enregistrement vide (personne n'a bougé) — bougez le bras avant d'enregistrer, ou supprimez l'épisode après coup |
| Erreur importante pendant la première seconde d'un épisode | segment de convergence : au début de l'enregistrement, le bras suiveur est encore dans sa pose initiale alors que le bras meneur est déjà ailleurs ; placez le bras meneur près de la position médiane au préalable pour l'éviter |
| Le jeu de données « disparaît » après avoir configuré `--dataset.root` sur un répertoire parent | **root est le répertoire du jeu de données lui-même** ; utilisez un nouveau root à chaque enregistrement |
| Différence entre `Esc` et `q` | `q` arrête seulement l'enregistrement ; `Esc` déconnecte aussi la téléopération au clavier. Les deux se terminent proprement (corrigé) ; privilégiez `q` |
| À la sauvegarde, `ValueError: You must add one or several frames...` et le processus s'arrête avec l'erreur | appuis supplémentaires sur `→`/`n` pendant l'**intervalle** entre épisodes (cas le plus fréquent : la sauvegarde + l'encodage vidéo des deux flux marque une pause de plusieurs dizaines de secondes, la console semble figée et l'on appuie plusieurs fois par impatience) ; le signal reste en attente et est consommé au début de l'épisode suivant → **épisode vide de 0 frame**, et l'upstream plante lors de la sauvegarde d'un épisode vide (limite connue de lerobot). **Les épisodes déjà enregistrés ne sont pas affectés, les données sont intactes** ; il suffit de rouvrir une session pour continuer. **Protection ajoutée** (2026-10-16) : `record.py` efface au début de chaque épisode les signaux `→`/`←` laissés en attente pendant l'intervalle (les appuis pendant l'enregistrement fonctionnent normalement) ; avant la sauvegarde, il affiche `saving the episode + encoding videos now...` ; test de régression `smoke_test.py` [7] |
| `KeyError: 'wrist'` au début de l'enregistrement (jeu de données avec images) | la boucle d'enregistrement lisait l'observation avant que la première frame de la caméra soit rendue ; **corrigé** (2026-10-16) : le plugin du robot `connect()` attend désormais que la première image soit prête avant de revenir |
| Un script avec vidéo affiche `BrokenProcessPool` / `Invalid argument: '<stdin>'` | l'encodage vidéo passe par un **pool de processus** ; les processus enfants doivent réimporter le module d'entrée à partir du chemin de fichier — exécuter le script d'enregistrement via `python - <<EOF` (stdin) provoque donc un plantage. Enregistrez le script dans un vrai fichier `.py` et exécutez-le (le point d'entrée réel `record.py` n'est pas concerné) |
| À la sauvegarde d'un épisode, `SvtMalloc[fatal]: allocate memory failed ... av.error.MemoryError: [Errno 12] ... 'avcodec_open2(libsvtav1)'` et toute la session se termine | l'encodeur upstream par défaut **libsvtav1**, lorsqu'il ouvre simultanément deux encodages pour les deux caméras (wrist+top), échoue à allouer un gros bloc de mémoire en une fois (plus probable sous la charge de la simulation + des fenêtres d'aperçu ; rencontré le 2026-10-16). **Corrigé** : `record.py` injecte par défaut `--dataset.rgb_encoder.vcodec=h264` (encodage h264 simultané de deux flux validé ; passer vcodec explicitement permet de le remplacer). Les épisodes déjà sauvegardés sont intacts ; le plantage peut laisser des `tmp*/` et des parquet orphelins dans le répertoire du jeu de données (nettoyage comme pour run2) |
| L'affichage devient saccadé pendant l'enregistrement (surtout après avoir appuyé sur `→`), mais les commandes ne sont pas réellement retardées | ce qui saccade, c'est la **fenêtre de sauvegarde/encodage** : les processus d'encodage saturent le CPU par défaut (deux flux vidéo simultanés), tandis que le thread de simulation continue de rendre 5 vues (plus visible avec un GPU intégré). La boucle de contrôle elle-même n'est pas affectée — fiez-vous aux chiffres de cadence (29,97 Hz sur toute la durée, 0 tick hors budget). **Atténué** (2026-10-16) : `record.py` applique par défaut `--dataset.encoder_threads=2` (2 threads par flux d'encodage) ; le rafraîchissement des fenêtres d'aperçu est réduit à 15 Hz (`--robot.preview_fps`). Plus l'épisode est court, plus la fenêtre de sauvegarde pèse et plus la saccade se ressent ; pour supprimer complètement la pause, utilisez `--dataset.streaming_encoding=true` (encodage pendant l'enregistrement, recommandé par l'upstream, à valider) |
| À la sauvegarde d'un épisode, l'encodeur signale un **échec d'allocation mémoire** et toute la session se termine (`SvtMalloc` de svtav1, `malloc ... failed` de x264 et les erreurs `avcodec_open2` en font partie) | la mémoire commitée du système sur cette machine approche durablement de la limite (2026-10-16 : **105,9 Go / 119,7 Go**, machine allumée en continu depuis 29 jours). Chaque sauvegarde lance 2 nouveaux processus d'encodage (chargeant chacun torch/av, avec un pic de commit élevé) ; les démarrer simultanément alors que la limite est proche fait échouer l'opération. **Atténué** : `record.py` ajoute désormais un **retry automatique en cas d'échec** de l'encodage (un échec transitoire ne fait plus perdre d'épisode), et le spam de journaux pendant la sauvegarde est mis en sourdine (`av.logging.set_libav_level` + barres de progression HF). **Remède définitif = redémarrer la machine** (nettoyer le commit accumulé par une longue exécution / les fuites du noyau ; les processus en espace utilisateur n'occupent que 27 Go, le reste est au niveau noyau/pilotes et ne peut pas être tué) ; auto-vérification : `Get-Counter '\Memory\Committed Bytes'` vs `'\Memory\Commit Limit'` |

## Matériel

| Symptôme | Cause et solution |
| --- | --- |
| Le numéro de port COM diffère de la dernière fois | le numéro de port série change selon les branchements/changements de port USB ; listez les ports avant chaque connexion ([03](/fr/tutorials/robot-arms/so-arm101/mujoco/03-Hardware-Calibration)) |
| Le contrôle en lecture seule signale un servomoteur manquant | problème de câblage/alimentation ; vérifiez d'abord la carte de commande et l'ordre des fils, ne vous précipitez pas sur la calibration |
| La direction de `shoulder_lift` est contre-intuitive (simulation) | la direction positive de ce modèle pointe vers le bas ; vérifiez le signe avant tout mappage ([02](/fr/tutorials/robot-arms/so-arm101/mujoco/02-Sim-Model-Verification)) |

## Notes de conception (pourquoi ces choix)

- **MuJoCo réécrit les données des sommets de maillage** : après le chargement d'un `<mesh>`, `mjModel.mesh_vert` stocke les sommets dans **le système de coordonnées du maillage lui-même**
  (origine recentrée sur le centre de gravité des sommets, axes réordonnés), et non plus dans les coordonnées d'origine du fichier — l'utiliser directement pour calculer une boîte englobante ou reporter des dimensions CAO donne
  des résultats erronés (l'affichage du rendu n'est pas affecté). Pour obtenir la géométrie CAO réelle, analysez le fichier d'origine (méthode utilisée dans `preview_mount.py` /
  `step_to_stl.py`). Un piège déjà rencontré : dimensions réelles du support 54,3 × 35,0 × 75,0 mm.
- **La direction de visée d'une caméra MuJoCo est le −Z de son système de coordonnées** : l'élément `<camera>` ne regarde pas vers son +Z (la direction de saillie de l'objectif). La première version
  du module caméra plaçait l'objectif en +Z avec l'orientation identity de l'élément → l'image regardait en réalité « à l'envers » depuis l'arrière du PCB, **l'orientation de l'objectif et la direction de l'image
  étaient exactement opposées** (source du « le sens de rotation ne correspond pas à l'image » lors des réglages ; localisé le 2026-10-16 par un test de rendu comparatif avec des plaques rouge/bleu).
  Correction : rotation de l'élément caméra de 180° autour de Y (`view.quat = RPY(0,180,0)`, unifié aux trois endroits preview_mount / adjust_camera / plugin du robot) ;
  `adjust_camera.py` ajoute une fenêtre d'image en temps réel "sim_cam live view", pour régler l'objectif en voyant directement le résultat.
- **La pince du MJCF du tutoriel officiel est une pince à contact ponctuel en bec d'oiseau** : les deux pointes dentées se ferment jusqu'à un contact ponctuel d'environ 2,3 mm, avec quasiment aucune surface de préhension utilisable.
  Conclusion des expériences physiques systématiques (2026-10-16, plusieurs centaines de configurations) : quel que soit l'emplacement du cube près de l'ouverture dentée, il est poussé/coincé lors du balayage de fermeture d'environ 100° et ne peut pas être saisi (idem pour des cubes de 16–34 mm ; la course mécanique et le couple sont eux-mêmes normaux). **Interdiction de corriger par ajout de pièces de collision** — l'ajout de plaques dentées aux deux mâchoires a été essayé (il améliore nettement la préhension), mais cette géométrie n'existe pas sur le robot réel ; une politique entraînée en dépendrait, ce qui provoquerait une distorsion sim2real ; cette solution a été retirée. La bonne correction consiste à **remplacer la pince du modèle officiel par la géométrie de la pince du robot réel** (par exemple le SO-ARM101 de menagerie ou une reconstruction CAO maison), en conservant des paramètres physiques cohérents avec le robot réel.
- **Les paramètres de contact par défaut officiels sont trop « mous » et provoquent des pénétrations physiques** : la constante de temps `solref` vaut 20 ms par défaut ; les contacts rapides/fins
  (cube tombant sur une face de mâchoire fine, balayage de fermeture) se traversent mutuellement « avant d'avoir eu le temps de générer une force » — le symptôme est « le cube traverse directement la face de la pince et tombe ».
  Correction (2026-10-16) : durcissement des paramètres de contact — `harden_mesh_contacts` durcit après compilation le `solref` de tous les corps de collision de maillage
  à la valeur utilisée par les faces dentées de menagerie (0,01 s), avec le même traitement pour les contacts du cube. Correction de pure fidélité physique, sans ajout de géométrie.
- **Le robot simulé a migré vers le modèle SO-ARM100 de mujoco_menagerie** (2026-10-16) : le MJCF du zip du tutoriel d'origine est
  une démonstration cinématique dont la pince ne peut pas saisir ; le modèle menagerie est traité d'après la CAO du robot réel — la pince dispose de faces dentées de collision dédiées et de paramètres de contact durs,
  et les quatre positions dentées (peu profond → profond) permettent toutes, en pratique, de bloquer + saisir + soulever un cube de 34 mm. Points clés de la migration : le modèle est copié dans
  `assets/menagerie_so_arm100/` (Apache-2.0, avec LICENSE) ; le mappage des articulations et les signes d'unités sont dans `MODEL_JOINT`
  (déterminés articulation par articulation par rapport au mouvement dans le monde de l'ancien modèle ; le signe de wrist_roll reste à revérifier par téléopération sur le robot réel) ; la base du modèle est tournée de +90° autour de Z pour que sa
  face de travail soit orientée vers +x ; le support est déplacé sur le côté de Fixed_Jaw (servomoteur n° 6) (positionnement d'abord par recherche analytique, puis réglage manuel final le 2026-10-16 par l'utilisateur en comparant avec des photos du robot réel via `adjust_mount.py --model menagerie` : `[0.1, -0.7, 24.7]mm`, `RPY [0.34, -27.20, 89.51]°`). Les modèles et outils de l'ancien tutoriel sont conservés intacts pour comparaison à tout moment.
- **Pourquoi utiliser l'environnement de projet uv plutôt que conda** : le `.venv` est dans le même répertoire que le projet, ses versions sont verrouillées par `uv.lock` et il suffit de supprimer le répertoire pour le récupérer,
  totalement isolé des environnements conda de la machine ; `uv run` n'installe jamais rien dans le conda activé. Sur cette machine, l'environnement conda `lerobot`
  pointe vers **une autre copie du dépôt** (`lerobot-main`) ; les deux n'interfèrent pas.
- **Pourquoi tous les plugins sont dans `examples/so101_mujoco/`** : ils sont intégrés via le mécanisme d'enregistrement officiel (`register_subclass`),
  **sans aucune modification du code source de lerobot** ; une mise à niveau de l'upstream ne nécessite qu'un nouveau sync.

<RelatedProducts slugs="so-arm101" />
