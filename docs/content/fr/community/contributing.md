---
title: Guide de contribution
description: Comment contribuer au Wiki JUXI
---

# Guide de contribution

Merci de contribuer au Wiki JUXI ! Ce document vous guide tout au long du processus.

## Préparation

1. **Fork** du [dépôt wiki-documents](https://github.com/Juxi-Technology/wiki-documents)
2. Cloner votre fork en local
3. Installer les dépendances :

```bash
cd wiki-documents
npm ci
```

4. Lancer le serveur de développement local pour prévisualiser :

```bash
npm run docs:dev
```

Visitez `http://localhost:5173` dans le navigateur pour prévisualiser vos modifications.

## Méthodes de contribution

### Corriger les erreurs de documentation

Fautes de frappe, liens cassés, informations obsolètes ? Envoyez directement une Pull Request sur `main`.

### Ajouter un tutoriel

Si vous souhaitez partager un tutoriel sur les produits JUXI :

1. Proposez d'abord un sujet dans [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues) avec le thème et le contenu
2. Après confirmation des mainteneurs, rédigez selon la structure existante
3. Soumettez un PR

### Contribution à la traduction

Le projet prend en charge 11 langues. Les traductions suivent ces règles :

- Chaque fichier `.md` doit avoir son équivalent dans chaque répertoire de langue
- Les images sont partagées depuis `docs/public/images/`
- Les liens de chaque version pointent vers le chemin de la langue correspondante

## Normes de contenu

### Images

- Emplacement : `docs/public/images/tutorials/{produit}/{tutoriel}/`
- Nommage : numérotation ou descriptif (ex. `1.png`, `wiring-diagram.png`)
- Références en chemin relatif dans le tutoriel :

```markdown
![Description](../../../public/images/tutorials/xxx/xxx.png)
```

### Nommage des fichiers

- Tutoriels en anglais, kebab-case
- Chaque fichier `.md` doit avoir un frontmatter `title` et `description`

### Blocs de code

- Toujours indiquer le type de langage
- Vérifier que les commandes s'exécutent correctement

## Processus PR

1. Vérifier la compilation locale : `npm run docs:build`
2. Remplir tous les champs du modèle de Pull Request
3. Après un build CI réussi, au moins 1 approbation de mainteneur pour fusionner
4. Après fusion, GitHub Actions déploie automatiquement

## Code de conduite

- Respecter tous les contributeurs et utilisateurs
- Fournir un contenu technique objectif et précis
- Ne pas soumettre de code ou commandes non testés

Merci pour votre contribution ! 🎉
