# 图片尺寸规范

## Logo 图片

### 位置
导航栏左上角

### 推荐尺寸
- **尺寸**：512×512 或 256×256 或 128×128
- **比例**：1:1 (正方形)
- **格式**：PNG (推荐，支持透明背景) 或 SVG
- **位置**：`docs/public/logo.png`

### 使用方式
```markdown
<!-- 配置中自动使用 -->
logo: '/logo.png'
```

---

## 首页卡片图片

### 位置
首页 "最新文档" 区域的卡片

### 推荐尺寸
- **尺寸**：800×500
- **比例**：16:10 (宽:高)
- **格式**：JPG 或 PNG
- **CSS 显示高度**：160px
- **位置**：`docs/public/images/home-cards/`

### 使用方式
```markdown
<img src="/images/home-cards/your-image.jpg" alt="描述">
```

---

## 分类卡片图片

### 位置
首页 "浏览分类" 区域的卡片

### 推荐尺寸
- **尺寸**：800×400
- **比例**：2:1 (宽:高)
- **格式**：JPG 或 PNG
- **CSS 显示高度**：140px
- **位置**：`docs/public/images/categories/`

### 使用方式
```markdown
<img src="/images/categories/your-image.jpg" alt="描述">
```

---

## 教程专属图片

### 位置
各教程页面内的步骤图片

### 推荐尺寸
- **宽度**：1200-1600px
- **高度**：自适应
- **格式**：PNG 或 JPG
- **位置**：各教程的 `images/` 子目录

### 使用方式
```markdown
![Image](./images/TutorialName/1.png)
```

---

## 通用建议

### 文件格式
- **Logo**：PNG (支持透明) 或 SVG
- **照片**：JPG (质量 80-90%)
- **截图、图示**：PNG

### 文件大小
- 单个图片建议不超过 500KB
- 使用工具压缩图片（如 Squoosh、TinyPNG）

### 命名规范
- 使用小写字母、数字、连字符
- 如：`so-arm101-card.jpg`、`robot-category.jpg`
