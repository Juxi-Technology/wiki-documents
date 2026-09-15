---
title: Guía de contribución
description: "Guía de contribución al Wiki de Juxi Technology: preparación del entorno, cómo enviar tutoriales y correcciones, normas de contenido y flujo de Pull Request."
---

# Guía de contribución

¡Gracias por considerar contribuir al Wiki de JUXI! Este documento le guía por el proceso.

## Preparación

1. **Fork** del [repositorio wiki-documents](https://github.com/Juxi-Technology/wiki-documents)
2. Clonar su fork en local
3. Instalar dependencias:

```bash
cd wiki-documents
npm ci
```

4. Iniciar el servidor de desarrollo local para previsualizar:

```bash
npm run docs:dev
```

Visite `http://localhost:5173` en el navegador para previsualizar sus cambios.

## Cómo contribuir

### Corregir errores de documentación

¿Errores tipográficos, enlaces rotos, información obsoleta? Envíe directamente una Pull Request a `main`.

### Añadir tutoriales

Si quiere compartir un tutorial sobre productos de JUXI:

1. Primero proponga un tema en [GitHub Issues](https://github.com/Juxi-Technology/wiki-documents/issues) explicando el tema y el contenido
2. Tras la confirmación de los mantenedores, redacte siguiendo la estructura existente
3. Envíe un PR

### Contribuir con traducciones

El proyecto admite 11 idiomas. Las traducciones siguen estas reglas:

- Cada archivo `.md` debe tener su equivalente en cada directorio de idioma
- Las imágenes se comparten desde `docs/public/images/`
- Los enlaces de cada versión apuntan a la ruta del idioma correspondiente

## Normas de contenido

### Imágenes

- Ubicación: `docs/public/images/tutorials/{producto}/{tutorial}/`
- Nomenclatura: numeración o descriptiva (p. ej. `1.png`, `wiring-diagram.png`)
- Referenciar con ruta relativa en el tutorial:

```markdown
![Descripción](../../../public/images/tutorials/xxx/xxx.png)
```

### Nomenclatura de archivos

- Tutoriales en inglés, estilo kebab-case
- Cada archivo `.md` necesita frontmatter `title` y `description`

### Bloques de código

- Indicar siempre el tipo de lenguaje
- Asegurar que los comandos se ejecutan correctamente

## Flujo de PR

1. Verificar la compilación local: `npm run docs:build`
2. Rellenar todos los campos de la plantilla de Pull Request
3. Tras un build de CI correcto, se requiere al menos 1 aprobación de mantenedor para fusionar
4. Tras la fusión, GitHub Actions despliega automáticamente

## Código de conducta

- Respetar a todos los contribuyentes y usuarios
- Aportar contenido técnico objetivo y preciso
- No enviar código ni comandos sin probar

¡Gracias por su contribución! 🎉
