# 設計變體 3：野蠻派終端

## 概述
一個靈感來自野蠻派建築和命令行界面的原始、不妥協的設計。擁抱功能極簡、嚴峻的幾何、單色調色板和程序員工具的美學。

## 核心美學原則
- **誠實**：暴露結構、無裝飾元素
- **功能性**：形式完全跟隨功能
- **原始**：未拋光、工業美學
- **精度**：銳利邊緣、完美對齐、基於網格

## 色調調色板

### 單色核心
```css
--color-black: #000000;             /* 純黑 */
--color-void: #0a0a0a;              /* 近黑 */
--color-concrete: #1a1a1a;          /* 深灰 */
--color-steel: #333333;             /* 中深灰 */
--color-iron: #666666;              /* 中灰 */
--color-aluminum: #999999;          /* 淺灰 */
--color-chalk: #cccccc;             /* 非常淺灰 */
--color-white: #ffffff;             /* 純白 */
```

### 重音色（最小使用）
```css
--color-terminal-green: #00ff00;    /* 經典終端綠 */
--color-error-red: #ff0000;         /* 錯誤狀態 */
--color-warning-yellow: #ffff00;    /* 警告/選擇 */
```

### 語義色彩
```css
--color-surface: var(--color-black);
--color-surface-elevated: var(--color-concrete);
--color-border: var(--color-white);
--color-text-primary: var(--color-white);
--color-text-secondary: var(--color-aluminum);
--color-accent: var(--color-terminal-green);
--color-marked: var(--color-warning-yellow);
--color-bingo: var(--color-terminal-green);
```

## 排版

### 字體棧
```css
--font-mono: 'IBM Plex Mono', 'Courier New', monospace;    /* 主要 */
--font-display: 'Roboto Mono', monospace;                   /* 頭部 */
--font-system: system-ui, sans-serif;                       /* 後備 */
```

### 型號標度
- **標題**：36px、IBM Plex Mono、700 重量、1.1 行高
- **副標題**：20px、IBM Plex Mono、400 重量、1.3 行高
- **正文**：16px、IBM Plex Mono、400 重量、1.6 行高
- **標題**：14px、IBM Plex Mono、300 重量、1.4 行高

### 型號處理
- 標題和標籤全大寫
- 處處單空間以獲得野蠻派一致性
- 無文本陰影、無光暈、無效果
- 銳利、未插入字距（或最小插入字距）

## 佈局原則

### 網格系統
嚴格 8px 網格系統 - 所有內容都與網格對齐

### 間距系統
基本單位：8px（嚴格強制）
- xs：8px
- sm：16px
- md：24px
- lg：32px
- xl：48px
- 2xl：64px

### 邊框風格
- **寬度**：1px 或 2px 僅（細且精確）
- **風格**：實心（永不虛線、點線或漸變）
- **角**：0px（僅銳利直角）或 1px 最大
- **顏色**：始終白色或顯式網格線

### 陰影
無陰影。句號。僅使用邊框和平面顏色。

## 動畫策略

### 原則
- **最少**：僅在必要時動畫以獲得可用性
- **即時**：無緩和曲線、線性計時僅
- **功能性**：動畫服務於目的，而非裝飾

### 關鍵動畫
```css
@keyframes blink-cursor {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

@keyframes terminal-type {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes flash-border {
  0%, 100% { border-color: var(--color-white); }
  50% { border-color: var(--color-terminal-green); }
}

@keyframes grid-draw {
  from { 
    stroke-dashoffset: 1000;
  }
  to { 
    stroke-dashoffset: 0;
  }
}
```

### 計時
- 持續時間：200ms 最大
- 緩和：僅線性（無曲線）
- 延遲：50ms 倍數
- 無限：500ms 用於閃爍、1000ms 用於脈衝

## 組件模式

### StartScreen
- 全屏終端界面
- `> SOC_OPS.EXE` 作為標題
- 帶游標閃爍的單空間文本
- 作為終端輸出呈現的說明
- `[開始]` 按鈕樣式為命令提示符輸入
- 顯示結構的網格疊加層

### GameScreen
- 頭部：終端狀態欄（白色上黑色、1px 邊框）
- 棋盤區域：嚴格網格佈局、完美方形
- 每個元素：硬邊框、無間距浪費
- Bingo 指示器：全寬橫幅、白色文本上終端綠

### BingoSquare
- 完美方形配 1px 白邊框
- 黑色背景、白色文本
- 無懸停效果（也許邊框顏色變化）
- 標記時：反色（白色背景、黑色文本）+ "[X]"前綴
- Bingo 時：終端綠邊框、無其他效果
- 排版：單空間、左對齐或居中

### BingoModal
- 矩形模態、正中央、2px 邊框
- 無背景模糊 - 僅 80% 黑色疊加層
- 文本："BINGO ACHIEVED"單空間字體
- `[繼續]` 按鈕作為命令
- ASCII 藝術裝飾（可選，如 `====== ★ ======`）

## 互動狀態

### 默認
- 白色 1px 邊框
- 黑色背景
- 白色文本

### 懸停
- 邊框變為終端綠（1px）
- 無縮放、陰影或運動
- 持續時間：0ms（即時）

### 活躍/按下
- 反色（白色背景、黑色文本）
- 持續時間：0ms（即時切換）

### 標記/選擇
- 背景：警告黃
- 文本：黑色
- 邊框：黑色 2px

### Bingo/贏家
- 邊框：終端綠 2px
- 可選：緩慢閃爍動畫（1s 間隔）

### 聚焦
- 雙邊框（1px 白 + 1px 綠）
- 或單 2px 終端綠邊框

## 特殊功能

### 背景
- 純黑（#000000）
- 可選：8px × 8px 網格疊加層（1px 白線在 10% 不透明度）
- 可選：微弱水平掃描線（終端 CRT 效果）

### 結構元素
- 可見網格系統（顯示 8px 網格）
- 分區分隔符：全寬 1px 白線
- ASCII 藝術邊框：`+----+` 風格
- 終端提示指示器：`>`、`$`、`#`

### 排版處理
- 單空間間距嚴格強制
- 文本在像素網格上渲染（無子像素）
- 帶系統指示符的標籤前綴：
  - `[01]`、`[02]` 用於編號
  - `>` 用於活躍/選擇
  - `*` 用於標記
  - `!` 用於警報

### UI 模式
- 按鈕作為括號文本：`[開始]`、`[重置]`、`[繼續]`
- 狀態指示器：`狀態：就緒`、`分數：0012`
- 加載狀態：`加載...` 帶閃爍游標
- 頁腳中的時間戳或系統信息

## 特殊考慮

### 終端美學
- 模仿命令行界面行為
- 在心理上使用終端顏色代碼（綠色 = 成功、黃色 = 警告）
- 考慮文本出現的打字動畫
- 在適當地方包括游標閃爍

### 野蠻派建築參考
- 暴露混凝土 = 暴露黑色背景
- 幾何精度 = 嚴格網格對齐
- 重複 = 一致的間距和邊框
- 大規模 = 大型排版、慷慨的空白
- 功能性 = 無裝飾

### 網格可視化
- 可選地將 8px 網格顯示為可見疊加層
- 用它來證明對齐（在開發模式中切換開/關）
- 組件可見地捕捉到網格

## 權衡

### 優勢
✓ 極其獨特和大膽
✓ 高對比度 = 優秀可讀性
✓ 快速性能（無效果要渲染）
✓ 易於訪問（簡單、清晰結構）
✓ 吸引開發者和科技精通用戶
✓ 在任何顯示器上表現良好

### 劣勢
✗ 可能感到冷或不友善
✗ 缺乏溫暖和俏皮感
✗ 單色可能對某些用戶感到無聊
✗ 對非技術用戶來說終端美學不熟悉
✗ 可能看起來未完成或"壞掉"
✗ 視覺趣味有限

### 最適合
- 開發者大會或黑客馬拉松
- 科技聚焦受眾
- 欣賞野蠻派設計的用戶
- 需要最大清晰度的情況
- 想要通過極簡主義突出的項目
- 可訪問性聚焦用例

## 實施說明

### 關鍵 CSS 變量
在 `@theme` 中定義單色調色板和邊框寬度

### 網格系統實施
```css
* {
  /* 強制 8px 網格 */
  box-sizing: border-box;
}

/* 網格疊加層（開發模式） */
.grid-overlay {
  position: fixed;
  inset: 0;
  background-size: 8px 8px;
  background-image: 
    linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  pointer-events: none;
}
```

### 排版渲染
```css
body {
  -webkit-font-smoothing: none; /* 禁用反鋸齒以獲得清晰單空間 */
  -moz-osx-font-smoothing: grayscale;
  text-rendering: geometricPrecision;
}
```

### 性能
- 默認情況下無動畫 = 最大性能
- 無漸變、陰影或模糊要渲染
- 簡單平面顏色 = 快速繪製
- 網格可以是 CSS 背景（不是畫布）

### 可訪問性
- 優秀的對比度比（白色上黑色 = 21:1）
- 清晰的焦點指示器
- 默認情況下無運動（prefers-reduced-motion 友好）
- 屏幕閱讀器友好（語義 HTML）
- 強調鍵盤導航

### 響應式行為
- 嚴格網格按比例縮放
- 在所有屏幕大小上保持 8px 基本單位
- 減少移動設備上的外邊距，不是網格單位
- 字體大小可以縮放但保持單空間
- 觸摸目標必須仍達到 44px 最小值

### 終端命令（概念）
將互動呈現為終端命令：
- 開始遊戲：`> execute socops.exe`
- 標記方格：`> toggle cell_05`
- 重置：`> reset --all`
- 查看說明：`> help`

這創建與終端美學的一致性。
