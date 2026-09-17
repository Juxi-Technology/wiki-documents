---
title: Contributing Guide
description: "Contribute to the Juxi Technology Wiki: fork the repository, fix errors, add tutorials or translations, and follow the pull-request workflow."
---

# Contributing Guide

Thank you for considering contributing to the Juxi Technology Wiki! This guide will walk you through the contribution process.

## Getting Started

1. **Fork** the [wiki-documents repository](https://github.com/Juxi-Technology/wiki-documents)
2. Clone your fork locally
3. Install dependencies:

```bash
cd wiki-documents
npm ci
```

4. Start the local development server to preview:

```bash
npm run docs:dev
```

Open `http://localhost:5173` in your browser to preview your changes.

## Ways to Contribute

### Fix Documentation Errors

Found a typo, broken link, or outdated information? Submit a Pull Request to the `main` branch directly.

### Add New Tutorials

If you have a tutorial for Juxi Technology products you'd like to share:

1. Open a Proposal in [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues) first, describing the tutorial topic and rough outline
2. Write the tutorial following the existing tutorial structure after maintainers confirm
3. Submit a PR

### Translation Contributions

The project supports eleven languages. English is the root locale (no prefix); the other locales live in subdirectories: `zh-hans/`, `zh-hant/`, `ja/`, `ko/`, `de/`, `fr/`, `es/`, `it/`, `pt-br/`, `pt-pt/`. Translation rules:

- Every `.md` file should have a counterpart in each language directory
- Images are shared under `docs/public/images/`
- Links in each language version must point to the corresponding language path

## Content Guidelines

### Images

- Location: `docs/public/images/tutorials/{product}/{tutorial}/`
- Naming: numbered or descriptive (e.g., `1.png`, `wiring-diagram.png`)
- Reference with relative paths in tutorials:

```markdown
![description](../../public/images/tutorials/xxx/xxx.png)
```

### File Naming

- Tutorial files use English names in kebab-case
- Every `.md` file needs `title` and `description` frontmatter

### Code Blocks

- Always specify the language type
- Make sure commands actually run

## PR Workflow

1. Make sure the local build passes: `npm run docs:build`
2. Fill in all sections of the Pull Request template
3. CI must pass, and at least 1 maintainer must approve before merging
4. After merging, GitHub Actions deploys automatically

## Code of Conduct

- Respect all contributors and users
- Provide objective, accurate technical content
- Do not submit untested code or commands

Thank you for your contribution! 🎉
