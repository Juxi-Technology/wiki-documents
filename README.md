
# <img src="docs/public/images/logos/logo-black.png" width="120" align="left" style="margin-right: 30px;"> Juxi Technology Wiki Platform

🤖**Open-source documentation platform collecting all the wikis published by Juxi Technology**

[Quick Start](#-quick-start) • [Documentation](#-documentation) • [Project Structure](#-project-structure) • [Contact Us](#-contact-us)

---

## 📖 About

This repository contains the source files for Juxi Technology's official wiki platform. Built with VitePress and deployed on GitHub Pages, it provides comprehensive documentation, tutorials, and resources for Juxi Technology products.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone --depth 1 https://github.com/Juxi-Technology/wiki-documents.git

# Navigate to project directory
cd wiki-document

# Install dependencies
npm install

# Start development server
npm run docs:dev
```

Visit `http://localhost:5173` to view the website locally.

## 📚 Documentation

### Product Tutorials

- [SO-ARM101 Tutorial](https://juxi-technology.github.io/wiki-documents/tutorials/so-arm101-tutorial)
- [Getting Started](https://juxi-technology.github.io/wiki-documents/tutorials/getting-started)
- [Hardware Setup](https://juxi-technology.github.io/wiki-documents/tutorials/hardware-setup)
- [Software Configuration](https://juxi-technology.github.io/wiki-documents/tutorials/software-config)

### Technical Documentation

- [Development Guide](https://juxi-technology.github.io/wiki-documents/tech/dev-guide)
- [API Reference](https://juxi-technology.github.io/wiki-documents/tech/api-reference)

### Topics & Resources

- [Robot Learning](https://juxi-technology.github.io/wiki-documents/topics/robot-learning/)
- [Success Cases](https://juxi-technology.github.io/wiki-documents/cases/)
- [Contributor Community](https://juxi-technology.github.io/wiki-documents/community/)

## 📁 Project Structure

```
wiki-document/
├── docs/
│   ├── .vitepress/
│   │   └── config.ts          # VitePress configuration
│   ├── public/                # Static assets (images, etc.)
│   ├── tutorials/             # Product tutorials (Simplified Chinese)
│   ├── tech/                  # Technical documentation
│   ├── topics/                # Technical topics
│   ├── cases/                 # User success cases
│   ├── community/             # Contributor community
│   ├── en/                    # English content
│   ├── zh-HK/                 # Hong Kong Traditional Chinese content
│   └── index.md               # Home page
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Pages auto deployment
└── package.json
```

## 🛠️ User Guide

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run docs:dev
   ```
   Visit `http://localhost:5173` for preview.

3. **Build for production**
   ```bash
   npm run docs:build
   ```

### Managing Documentation on GitHub

#### Adding New Documentation (Create)

**Method 1: Local Editing**

1. Create new `.md` files in `docs/tutorials/` or `docs/tech/`
2. Write content in Markdown format
3. Add links to `sidebar` in `docs/.vitepress/config.ts`
4. Commit and push:
   ```bash
   git add .
   git commit -m "Add new documentation: [doc name]"
   git push
   ```

**Method 2: GitHub Web Interface**

1. Navigate to `docs/tutorials/` or `docs/tech/` directory
2. Click "Add file" → "Create new file"
3. File name format: `[doc name].md`
4. Write content
5. Commit changes

#### Updating Documentation (Update)

1. Edit the corresponding `.md` file
2. Commit and push
   ```bash
   git add .
   git commit -m "Update documentation: [doc name]"
   git push
   ```

#### Deleting Documentation (Delete)

1. Delete the corresponding `.md` file
2. Remove links from `sidebar` in `docs/.vitepress/config.ts`
3. Commit and push
   ```bash
   git add .
   git commit -m "Delete documentation: [doc name]"
   git push
   ```

#### Viewing Documentation (Read)

- Locally: `http://localhost:5173`
- Online: `https://juxi-technology.github.io/wiki-documents/`

### File Formats

#### Supported Formats

- **Markdown** (.md) - Primary format
- Images: `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`

#### Markdown Basics

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- List item 1
- List item 2

[Link text](url)
![Alt text](image path)

Code block:
```javascript
console.log('hello');
```
```

### Directory Structure

#### docs/public/

Stores static assets:

- Logo images
- Product images
- Diagram images

**Naming conventions:**
- `logo.png` (Logo)
- `hero.png` (Hero image)
- `product-xxx.png` (Product images)

#### docs/tutorials/

Stores product tutorials

#### docs/tech/

Stores technical documentation (APIs, development guides, etc.)

#### docs/topics/

Stores technical topic content

#### docs/cases/

Stores user success cases

#### docs/community/

Stores contributor community content

#### docs/en/ and docs/zh-HK/

Multilingual content, same structure as main directory

### Adding New Categories

If you need to add new documentation categories:

1. Create new folder under `docs/`, e.g., `docs/hardware/`
2. Create `index.md` as entry point
3. Add links to `nav` in `docs/.vitepress/config.ts`:
   ```typescript
   nav: [
     { text: 'Hardware', link: '/hardware/' },
     // ...
   ]
   ```
4. Add sidebar configuration in `sidebar`:
   ```typescript
   sidebar: {
     '/hardware/': [
       {
         text: 'Hardware Documentation',
         items: [
           { text: 'Doc 1', link: '/hardware/doc1' },
         ]
       }
     ]
   }
   ```

### Multilingual Content Management

#### Adding New Language Content

1. Create folder under `docs/`, e.g., `docs/ja/` (Japanese)
2. Copy content from `docs/tutorials/`, `docs/tech/` to new folder
3. Add configuration in `docs/.vitepress/config.ts`

#### Existing Languages

- Simplified Chinese: `docs/` (root directory)
- English: `docs/en/`
- Traditional Chinese (Hong Kong): `docs/zh-HK/`

### Deployment

#### Automatic Deployment

Every push to `main` branch, GitHub Actions automatically:

1. Builds the website
2. Deploys to GitHub Pages

#### Viewing Deployment Status

Navigate to repository → Actions → Deploy to GitHub Pages

#### Access URL

`https://juxi-technology.github.io/wiki-documents/`

## 📦 Build & Deploy

### Build

```bash
npm run docs:build
```

### Preview Build

```bash
npm run docs:preview
```

### Deploy to GitHub Pages

1. Push code to GitHub
2. Enable GitHub Pages in repository settings
3. Under Settings > Pages:
   - Source: Select `GitHub Actions`
4. Every push to `main` triggers auto deploy

## 🛠️ Tech Stack

- [VitePress](https://vitepress.dev/) - Static site generator
- [GitHub Pages](https://pages.github.com/) - Hosting
- [GitHub Actions](https://github.com/features/actions) - Auto deployment

## 🔧 Troubleshooting

### 1. Local Running Errors

```bash
npm install
```

Reinstall dependencies.

### 2. Pages Not Updating

- Refresh browser (Ctrl+Shift+R for hard refresh)
- Restart development server

### 3. Sidebar Not Displaying

Check `sidebar` configuration in `docs/.vitepress/config.ts`

### 4. Images Not Displaying

- Place images in `docs/public/` directory
- Reference as `![Alt text](/image name.png)`

## 🔗 Contact Us

For business inquiries, ODM cooperation or technical support, please contact us:

- 🌐 Official Website: [https://www.juxitech.com](https://www.juxitech.com/)
- 💬 Feedback: [pe@juxitech.com](mailto:pe@juxitech.com)
- 📧 Business: [sales@juxitech.com](mailto:sales@juxitech.com)
- 📺 Bilibili: [JuxiTech Bilibili](https://space.bilibili.com/3546906737248821)
- 🛒 TaoBao: [JuxiTech Taobao](https://juxitechnology.taobao.com/)
