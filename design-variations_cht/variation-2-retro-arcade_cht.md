# 設計變體 2：復古街機霓虹

## 概述
一個靈感來自 1980 年代-90 年代街機遊戲和霓虹燈娛樂場所的充滿活力、懷舊的設計。具有大膽的色彩、粗糙的像素、掃描線效果和真實的復古遊戲 UI 元素。

## 核心美學原則
- **大膽**：高對比度、飽和色彩
- **懷舊**：真實的復古遊戲參考
- **充滿活力**：快速動畫、動態效果
- **俏皮**：有趣、遊戲聚焦互動

## 色調調色板

### 主要色彩（CRT 監視器靈感）
```css
--color-screen-black: #0d0208;      /* 深 CRT 黑 */
--color-screen-dark: #1a0f1e;       /* 深紫監視器光暈 */
--color-arcade-purple: #3c096c;     /* 深街機柜紫 */
--color-cabinet-blue: #10002b;      /* 海軍柜內部 */
```

### 霓虹重音色
```css
--color-neon-pink: #ff006e;         /* 熱粉紅霓虹 */
--color-neon-yellow: #ffbe0b;       /* 電黃色 */
--color-neon-cyan: #00f5ff;         /* 亮青 */
--color-neon-green: #39ff14;        /* 酸綠 */
--color-neon-orange: #fb5607;       /* 霓虹橙 */
```

### 語義色彩
```css
--color-surface: var(--color-screen-black);
--color-surface-elevated: var(--color-arcade-purple);
--color-border: var(--color-neon-cyan);
--color-text-primary: #ffffff;
--color-text-secondary: var(--color-neon-yellow);
--color-accent: var(--color-neon-pink);
--color-marked: var(--color-neon-yellow);
--color-bingo: var(--color-neon-green);
```

## 排版

### 字體棧
```css
--font-display: 'Press Start 2P', cursive;     /* 8 位像素字體 */
--font-body: 'VT323', monospace;               /* 終端/街機字體 */
--font-score: 'Bungee', display;               /* 復古街機顯示 */
```

### 型號標度
- **標題**：32px、Press Start 2P、400 重量（像素字體自然粗體）
- **副標題**：24px、Bungee、400 重量
- **正文**：20px、VT323、400 重量
- **標題**：18px、VT323、400 重量

### 型號效果
- 文本陰影配霓虹光暈（多層）
- 輕微色差效果以獲得 CRT 感覺
- 文本上的掃描線疊加層以獲得真實性

## 佈局原則

### 間距系統（8px 網格用於像素完美）
- xs：4px
- sm：8px
- md：16px
- lg：24px
- xl：32px
- 2xl：48px

### 邊框風格
- **寬度**：3-4px（粗糙復古邊框）
- **風格**：實心，有時為街機柜效果加雙線
- **角**：銳角 90°OR 2px 最大以獲得輕微斜角

### 陰影（盒子和霓虹光暈）
```css
--glow-pink: 0 0 5px #ff006e, 0 0 10px #ff006e, 0 0 20px #ff006e, 0 0 40px #ff006e;
--glow-cyan: 0 0 5px #00f5ff, 0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 40px #00f5ff;
--glow-yellow: 0 0 5px #ffbe0b, 0 0 10px #ffbe0b, 0 0 20px #ffbe0b;
--glow-green: 0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 40px #39ff14;
--arcade-inset: inset 0 -4px 0 rgba(0, 0, 0, 0.5);
```

## 動畫策略

### 原則
- **快速**：順暢、即時反饋（150-300ms）
- **街機**：參考硬幣遊戲動畫
- **閃爍**：不微妙 - 慶祝每一次互動

### 關鍵動畫
```css
@keyframes blink-arcade {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

@keyframes crt-flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.95; }
}

@keyframes neon-pulse {
  0%, 100% { 
    text-shadow: var(--glow-pink);
    filter: brightness(1);
  }
  50% { 
    text-shadow: 0 0 10px #ff006e, 0 0 20px #ff006e, 0 0 40px #ff006e, 0 0 80px #ff006e;
    filter: brightness(1.5);
  }
}

@keyframes scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

@keyframes pixel-pop {
  0% { transform: scale(0); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@keyframes coin-bounce {
  0%, 100% { transform: translateY(0) rotateY(0); }
  25% { transform: translateY(-15px) rotateY(90deg); }
  50% { transform: translateY(-20px) rotateY(180deg); }
  75% { transform: translateY(-10px) rotateY(270deg); }
}

@keyframes screen-shake {
  0%, 100% { transform: translate(0, 0); }
  10% { transform: translate(-2px, 1px); }
  20% { transform: translate(2px, -1px); }
  30% { transform: translate(-2px, -1px); }
  40% { transform: translate(2px, 1px); }
  50% { transform: translate(-1px, 2px); }
  60% { transform: translate(1px, -2px); }
  70% { transform: translate(-1px, -2px); }
  80% { transform: translate(1px, 2px); }
  90% { transform: translate(-1px, 1px); }
}
```

### 計時
- 點擊反饋：150ms（即時街機感覺）
- 霓虹脈衝：1.5s 無限
- 閃爍：800ms 無限（插入硬幣風格）
- 入口：300ms 配反彈/彈出

## 組件模式

### StartScreen
- "插入硬幣"風格的閃爍標題
- 厚邊框框架，如街機柜
- 掃描線疊加效果在整個屏幕上
- CRT 曲率效果（可選微妙桶形失真）
- "按開始"按鈕配脈衝霓虹光暈
- 說明的高分/信用計數器美學

### GameScreen
- 如街機柜的整個遊戲區域周圍的像素化邊框
- 角落中的分數顯示，採用 7 段 LED 風格數字
- 生命/信用指示器
- 粗邊框"暫停"或"返回"按鈕，具有街機柜風格
- Bingo 橫幅：全寬閃爍的"贏家！"配交替顏色

### BingoSquare
- 厚 3-4px 邊框
- 像素完美方形縱橫比
- 懸停：亮霓虹光暈 + 輕微縮放
- 標記：用霓虹黃填充 + X 或像素藝術風格的勾號
- Bingo：綠色霓虹光暈 + 快速閃爍動畫
- 點擊：快速縮放向下/向上（街機按鈕按下感）

### BingoModal
- 框架為街機遊戲"遊戲結束"或"您贏了！"屏幕
- 閃爍的"贏家！"文本
- 帶硬幣槽美學的繼續/再玩一次按鈕
- 可選：像素藝術五彩紙屑或星爆效果
- 厚邊框配霓虹光暈

## 互動狀態

### 默認
- 實心霓虹邊框（青或粉紅）
- 微妙的掃描線疊加層

### 懸停
- 霓虹光暈加強
- 邊框顏色可能轉移（青 → 綠）
- 持續時間：150ms ease-out

### 活躍/按下
- 內設陰影（街機按鈕凹陷）
- 略微縮放（0.95）
- 邊框暫時變暗
- 持續時間：100ms

### 標記/選擇
- 背景用霓虹黃填充
- 黑色 X 或像素勾號
- 保留明亮邊框

### Bingo/贏家
- 快速顏色循環
- 屏幕震動效果
- 多個霓虹色快速閃爍

### 聚焦
- 動畫虛線邊框（行進螞蟻）
- 亮光暈增加

## 特殊功能

### 背景效果
- **掃描線**：2-4px 水平線，10% 不透明度
- **CRT 曲率**：外邊緣上的微妙桶形失真
- **暈圈**：中心褪色的深角
- **網格**：可選像素網格疊加層（1px 線每 8px）
- **閃爍**：微妙 60Hz CRT 閃爍動畫

### 裝飾元素
- 像素藝術圖標（星星、硬幣、寶石）
- 8 位風格聲音效果指示器（☆ 丁！☆）
- 復古遊戲 UI 元素（生命心、硬幣計數器）
- 街機柜框架圖形
- "遊戲開始"和"遊戲結束"屏幕
- 閃爍"插入硬幣"提示

### 聲音集成
- 視覺反饋應該暗示聲音（嗶！嗶！）
- 言語氣泡中的動作詞（砰！紮！賓果！）

## 權衡

### 優勢
✓ 高度獨特和易記
✓ 通過懷舊的強烈情感連接
✓ 清晰遊戲背景 - 用戶知道這很有趣
✓ 高對比度 = 良好可見性
✓ 充滿活力和吸引人

### 劣勢
✗ 長期使用可能變得不堪重負或疲倦
✗ 不適合專業/企業背景
✗ 像素字體在小尺寸上可能更難閱讀
✗ 亮色可能導致眼睛疲勞
✗ 對不欣賞復古美學的用戶可能造成困擾

### 最適合
- 遊戲大會或電競活動
- 休閒社交聚會
- 熟悉復古遊戲的年輕受眾
- 有趣、非正式的公司活動
- 享受大膽、俏皮設計的用戶

## 實施說明

### 關鍵 CSS 變量
在 `@theme` 中定義所有霓虹色、光暈效果和街機特定變量

### 效果實施
- 掃描線：重複線性漸變疊加層
- CRT 曲率：CSS 過濾器或 SVG 過濾器
- 霓虹光暈：多個文本陰影和盒子陰影層
- 像素邊框：確保尺寸是 8px 的倍數

### 性能考慮
- 掃描線疊加應為單個偽元素
- 限制同時光暈效果數量
- 在可能的情況下使用 CSS 動畫而不是 JavaScript
- 在低端設備上測試（效果可能是 GPU 密集型）

### 字體加載
- 像素字體可能很大 - 確保適當的字體顯示策略
- 考慮可變字體替代以獲得更好的性能
- 提供到單空格字體的後備

### 可訪問性挑戰
- 確保動畫尊重 prefers-reduced-motion
- 提供無霓虹效果的高對比度模式
- 使用屏幕閱讀器測試（裝飾元素應為 aria-hidden）
- 注意閃爍率（避免發作觸發）
- 儘管亮色，仍保持 4.5:1 對比度

### 響應式行為
- 按比例縮放像素大小
- 減少較小屏幕上的光暈強度
- 簡化移動設備上的掃描線密度
- 確保觸摸目標足夠大，儘管厚邊框
