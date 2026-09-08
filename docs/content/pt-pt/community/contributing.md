---
title: Guia de Contribuição
description: Como contribuir para o Wiki da Juxi Technology
---

# Guia de Contribuição

Obrigado por considerar contribuir para o Wiki da Juxi Technology! Este guia apresenta o processo de contribuição.

## Primeiros Passos

1. **Fork** do [repositório wiki-documents](https://github.com/Juxi-Technology/wiki-documents)
2. Clone seu fork localmente
3. Instale as dependências:

```bash
cd wiki-documents
npm ci
```

4. Inicie o servidor de desenvolvimento local para pré-visualizar:

```bash
npm run docs:dev
```

Abra `http://localhost:5173` no seu navegador para pré-visualizar suas alterações.

## Formas de Contribuir

### Corrigir Erros na Documentação

Encontrou um erro de digitação, link quebrado ou informação desatualizada? Envie um Pull Request diretamente para a branch `main`.

### Adicionar Novos Tutoriais

Se você tem um tutorial sobre produtos da Juxi Technology que gostaria de compartilhar:

1. Abra primeiro uma Proposta em [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues), descrevendo o tópico do tutorial e um esboço geral
2. Escreva o tutorial a seguir a estrutura de tutorial existente após a confirmação dos mantenedores
3. Envie um PR

### Contribuições de Tradução

O projeto oferece suporte a dez idiomas. O inglês é o locale raiz (sem prefixo); os demais locales ficam em subdiretórios: `zh-hans/`, `zh-hant/`, `ja/`, `ko/`, `de/`, `fr/`, `es/`, `it/`, `pt/`. Regras de tradução:

- Cada ficheiro `.md` deve ter um equivalente em cada diretório de idioma
- As imagens são compartilhadas em `docs/public/images/`
- Os links de cada versão de idioma devem apontar para o caminho do idioma correspondente

## Diretrizes de Conteúdo

### Imagens

- Localização: `docs/public/images/tutorials/{product}/{tutorial}/`
- Nomenclatura: numerada ou descritiva (ex.: `1.png`, `wiring-diagram.png`)
- Referencie com caminhos relativos nos tutoriais:

```markdown
![description](../../public/images/tutorials/xxx/xxx.png)
```

### Nomenclatura de Arquivos

- Arquivos de tutorial usam nomes em inglês em kebab-case
- Cada ficheiro `.md` precisa dos campos frontmatter `title` e `description`

### Blocos de Código

- Sempre especifique o tipo de linguagem
- Garanta que os comandos realmente funcionem

## Fluxo de PR

1. Certifique-se de que a build local passa: `npm run docs:build`
2. Preencha todas as seções do template de Pull Request
3. O CI deve passar, e pelo menos 1 mantenedor deve aprovar antes do merge
4. Após o merge, o GitHub Actions implanta automaticamente

## Código de Conduta

- Respeite todos os colaboradores e utilizadors
- Forneça conteúdo técnico objetivo e preciso
- Não envie código ou comandos não testados

Obrigado pela sua contribuição! 🎉
