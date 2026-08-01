# 图片资源组织指南

## 目录结构说明

### 全局资源（所有页面共用）
- `public/images/logos/` - Logo 和品牌图片
- `public/images/common/` - 多个教程共用的图片

### 教程专属资源
每个教程有自己的 `images/` 目录，比如：
- `tutorials/robot-arms/so-arm101/images/SO-ARM101-Tutorial/`
- `tutorials/robot-arms/so-arm101/images/SO-ARM101-Assembly/`

## 如何引用图片

### 引用全局图片（public/ 目录下）
从任何页面都可以直接用绝对路径引用：
```markdown
![Logo](/images/logos/logo.png)
![Banner](/images/common/banner.png)
```

### 引用教程专属图片
用相对路径引用：
```markdown
![Step 1](./images/SO-ARM101-Tutorial/1.png)
```

## 何时使用哪个目录

| 情况 | 推荐目录 |
|------|---------|
| Logo、品牌图 | `public/images/logos/` |
| 多个教程共用的图 | `public/images/common/` |
| 首页卡片图片 | `public/images/home-cards/` |
| 分类卡片图片 | `public/images/categories/` |
| 某个教程专属的图 | 该教程的 `images/` 子目录 |

## 图片尺寸规范

详细的尺寸要求请参考 [DIMENSIONS.md](./DIMENSIONS.md)

### 快速参考
| 图片类型 | 推荐尺寸 | 比例 |
|---------|---------|------|
| Logo | 512×512 或 256×256 | 1:1 |
| 首页卡片 | 800×500 | 16:10 |
| 分类卡片 | 800×400 | 2:1 |
| 教程图片 | 宽 1200-1600px | 自适应 |
