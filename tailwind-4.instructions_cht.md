---
description: 在撰寫任何 Tailwind CSS 前，請先閱讀此文件以了解最新的 v4 功能。
---

# Tailwind CSS v4 開發實踐

## 核心哲學
- 透過 `@theme` 指令進行 CSS 優先配置（無需 `tailwind.config.js`）
- 原生 CSS 功能：級聯層、`@property`、`color-mix()`、邏輯屬性
- 自動內容檢測

## 設置
```css
@import "tailwindcss";
```

## @theme 配置

### 定義設計標記
```css
@theme {
  --color-brand: oklch(0.72 0.11 178);
  --font-display: "Inter", sans-serif;
  --breakpoint-tablet: 640px;
}
```
→ 用法如下：`bg-brand`、`font-display`

### 多主題模式
```css
@theme inline {
  --color-primary: var(--primary);
}

:root { --primary: #3b82f6; }
.dark { --primary: #60a5fa; }
```
使用 `@theme inline` 進行執行時變數解析。

### 規則
- 保持 @theme 變數平坦（僅頂層）
- 不在 @media 或選擇器中嵌套
- 對非 Tailwind CSS 變數使用 :root

## v4 功能

### 原生不透明度
```html
<div class="bg-black/50 text-brand/75">
```

### 容器查詢
```html
<div class="@container">
  <div class="@md:text-lg">
</div>
```

### 任意 CSS 變數
```html
<div class="fill-[--my-color] w-[--sidebar-width]">
```

### 新公用程式
- 3D：`rotate-x-45`、`rotate-y-90`
- 漸變：`bg-gradient-radial`、`bg-gradient-conic`
- 變體：`not-*`、`color-scheme:*`、`@starting-style`

## 遷移

### 重命名的類別
- `bg-opacity-50` → `bg-black/50`
- `overflow-ellipsis` → `text-ellipsis`
- `shadow-sm` → `shadow-xs`

## 最佳實踐
1. 在 `@theme` 中放置設計標記
2. 對常規 CSS 變數使用 `:root`
3. 信任自動檢測
4. 優先使用 `w-[--custom]` 而不是複雜配置

// 種子提示
// > 填寫 1 頁 copilot 說明（緊湊、最少散文），針對前端開發人員並專注於 tailwind v4 特定開發要點；#web_search
