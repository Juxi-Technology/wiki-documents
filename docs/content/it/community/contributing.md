---
title: Guida alla contribuzione
description: Come contribuire al Wiki JUXI
---

# Guida alla contribuzione

Grazie per voler contribuire al Wiki JUXI! Questo documento ti guida nel processo.

## Preparazione

1. **Fork** del [repository wiki-documents](https://github.com/Juxi-Technology/wiki-documents)
2. Clonare il fork in locale
3. Installare le dipendenze:

```bash
cd wiki-documents
npm ci
```

4. Avviare il server di sviluppo locale per l'anteprima:

```bash
npm run docs:dev
```

Visita `http://localhost:5173` nel browser per anteprime le modifiche.

## Come contribuire

### Correggere errori nella documentazione

Refusi, link rotti, informazioni obsolete? Invia direttamente una Pull Request a `main`.

### Aggiungere tutorial

Se vuoi condividere un tutorial sui prodotti JUXI:

1. Prima proponi un argomento in [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues) spiegando tema e contenuto
2. Dopo la conferma dei maintainer, scrivi seguendo la struttura esistente
3. Invia un PR

### Contribuire con traduzioni

Il progetto supporta 9 lingue. Le traduzioni seguono queste regole:

- Ogni file `.md` deve avere il corrispondente in ogni directory di lingua
- Le immagini sono condivise da `docs/public/images/`
- I link di ogni versione puntano al percorso della lingua corrispondente

## Norme sui contenuti

### Immagini

- Percorso: `docs/public/images/tutorials/{prodotto}/{tutorial}/`
- Denominazione: numerica o descrittiva (es. `1.png`, `wiring-diagram.png`)
- Nel tutorial usare percorsi relativi:

```markdown
![Descrizione](../../../public/images/tutorials/xxx/xxx.png)
```

### Denominazione file

- Tutorial in inglese, stile kebab-case
- Ogni file `.md` richiede frontmatter `title` e `description`

### Blocchi di codice

- Indicare sempre il tipo di linguaggio
- Assicurarsi che i comandi siano eseguibili

## Flusso PR

1. Verificare la build locale: `npm run docs:build`
2. Compilare tutti i campi del template di Pull Request
3. Dopo il build CI riuscito, serve almeno 1 approvazione di un maintainer per il merge
4. Dopo il merge, GitHub Actions esegue il deploy automatico

## Codice di condotta

- Rispettare tutti i contributori e gli utenti
- Fornire contenuti tecnici oggettivi e accurati
- Non inviare codice o comandi non testati

Grazie per il tuo contributo! 🎉
