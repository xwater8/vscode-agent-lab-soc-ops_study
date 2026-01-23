# 設計變體 1：極簡禪花園

## 概述
一個靈感來自日本極簡主義和禪花園的平靜、寧靜設計。專注於空白、微妙的動畫和一個和平色調調色板，鼓勵有思想的互動。

## 核心美學原則
- **簡單**：少即是多 - 移除所有不必要的視覺元素
- **空白**：慷慨的間距創造呼吸空間
- **微妙**：溫和的動畫和微交互
- **優雅**：精緻的排版和平衡的組成

## 色調調色板

### 主要色彩
```css
--color-sand: #f5f1e8;           /* 溫暖的白色背景 */
--color-stone: #d4cfc4;          /* 淺石灰色 */
--color-pebble: #9b9690;         /* 中等灰色 */
--color-charcoal: #3d3d3d;       /* 深炭色文本 */
--color-ink: #1a1a1a;            /* 近黑色強調 */
```

### 重音色
```css
--color-sage: #a8b5a0;           /* 柔軟鼠尾草綠 */
--color-clay: #c9a88e;           /* 溫暖赤陶 */
--color-water: #b8d4d8;          /* 淡藍綠 */
--color-bamboo: #8b9a76;         /* 靜音橄欖綠 */
```

### 語義色彩
```css
--color-surface: var(--color-sand);
--color-surface-elevated: #ffffff;
--color-border: rgba(61, 61, 61, 0.08);
--color-text-primary: var(--color-charcoal);
--color-text-secondary: var(--color-pebble);
--color-accent: var(--color-sage);
--color-marked: var(--color-clay);
--color-bingo: var(--color-bamboo);
```

## 排版

### 字體棧
```css
--font-display: 'Cormorant Garamond', serif;  /* 標題優雅襯線 */
--font-body: 'Inter', sans-serif;              /* 清潔身體無襯線 */
--font-accent: 'Zen Kaku Gothic New', sans-serif; /* 日本靈感 */
```

### 型號標度
- **標題**：48px、字體顯示、400 重量、1.2 行高
- **副標題**：24px、字體重音、300 重量、1.4 行高
- **正文**：16px、字體正文、400 重量、1.6 行高
- **標題**：14px、字體正文、400 重量、1.5 行高

## 佈局原則

### 間距系統
基本單位：8px
- xs：4px
- sm：8px
- md：16px
- lg：24px
- xl：32px
- 2xl：48px
- 3xl：64px

### 邊框半徑
- sm：4px（微妙圓角）
- md：8px（卡片、按鈕）
- lg：16px（模態、主要容器）

### 陰影
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 12px 24px rgba(0, 0, 0, 0.10);
```

## 動畫策略

### 原則
- **溫和**：所有動畫應該是軟和平靜的
- **有目的**：僅動畫以引導注意力或提供反饋
- **自然**：使用 ease-out 計時以獲得有機感覺

### 關鍵動畫
```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from { 
    opacity: 0; 
    transform: translateY(16px);
  }
  to { 
    opacity: 1; 
    transform: translateY(0);
  }
}

@keyframes gentle-scale {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes ripple-zen {
  from { 
    transform: scale(0.8);
    opacity: 0.4;
  }
  to { 
    transform: scale(1.5);
    opacity: 0;
  }
}
```

### 計時
- 默認持續時間：400ms
- 交錯延遲：60ms（用於順序元素）
- 緩和：cubic-bezier(0.4, 0, 0.2, 1)（溫和 ease-out）

## 組件模式

### StartScreen
- 以豐富空白的中心垂直佈局
- 大型優雅標題配襯線排版
- 微妙的副標題淡入淡出
- 帶柔和陰影的卡片含說明
- 鼠尾草綠的最小邊框重點
- 帶溫和懸停提升的單色 CTA 按鈕

### GameScreen
- 清潔頭部，最小鉻
- 棋盤周圍的慷慨填充
- 微妙的背景紋理（紙/亞麻效果）
- Bingo 指示器：簡單橫幅，帶竹綠重點色彩

### BingoSquare
- 默認白色/提升背景
- 1px 邊框，低不透明度
- 懸停時：微妙陰影增加 + 輕微提升
- 標記時：陶土色填充配勾號圖標
- Bingo 時：溫和竹綠邊框脈衝
- 排版：居中對齐、可讀取的比例

### BingoModal
- 大邊框半徑（16px）
- 柔和陰影背景模糊
- 優雅的祝賀消息
- 單一聚焦 CTA 按鈕
- 可選裝飾元素（禪圓或園心）

## 互動狀態

### 默認
- 清潔、最小外觀
- 軟邊框在 8% 不透明度

### 懸停
- 陰影從 sm 增加到 md
- 微妙 translateY(-2px) 提升
- 持續時間：200ms ease-out

### 活躍/按下
- 陰影減少
- 微妙 scale(0.98)
- 持續時間：100ms ease-out

### 標記/選擇
- 背景色變為陶土
- 邊框變為可見
- 勾號或微妙指示器出現

### 聚焦
- 2px 鼠尾草綠邊框
- 無粗糙輪廓

## 特殊功能

### 背景
- 溫暖沙色作為基礎
- 可選：微妙噪聲紋理疊加層（2% 不透明度）
- 可選：從中心淡出的微弱徑向漸變（白色到沙色）

### 裝飾元素
- 極簡禪石或卵石作為微妙圖標
- 簡單線條圖或筆畫
- 園心圓（禪圓）以獲得勝利時刻
- 竹葉或分支圖案稀疏

### 排版處理
- 標題充足字母間距（0.05em）
- 舒適的行高（正文 1.6）
- 慷慨的段落間距
- 微妙的文本顏色層次

## 權衡

### 優勢
✓ 對長時間使用平靜和愉悅
✓ 優秀的可訪問性，良好的對比度
✓ 專業和精緻的外觀
✓ 在各種照明條件下表現良好
✓ 永恆的設計，不會感到過時

### 劣勢
✗ 對某些用戶可能缺乏興奮
✗ 微妙的動畫對電源用戶可能感到緩慢
✗ 較淺的顏色在強烈日光下可能更難看到
✗ 可能不強烈傳達"遊戲"方面

### 最適合
- 企業活動或專業聚會
- 用戶喜歡平靜、無干擾的界面
- 環境中應用程序將長期使用
- 欣賞精緻、極簡設計的受眾

## 實施說明

### 關鍵 CSS 變量
所有顏色、字體、陰影和動畫計時應在 `index.css` 中的 `@theme` 中定義

### 響應式考慮
- 增加較大屏幕上的填充
- 為移動設備調整型號標度（略小的標題）
- 將觸摸目標保持在 44px 最小值

### 可訪問性
- 確保所有文本達到 4.5:1 對比度比
- 為鍵盤導航提供焦點指示器
- 使用屏幕閱讀器測試
- 支持 prefers-reduced-motion

### 性能
- 最少使用背景模糊（僅限模態）
- 沒有複雜漸變或動畫
- 任何裝飾元素的小資產大小
