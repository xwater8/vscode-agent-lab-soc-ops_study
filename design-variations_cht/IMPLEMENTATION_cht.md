# 實施指南

本指南說明如何在社交 Bingo 應用中實施每個設計變體。

## 快速開始

每個變體包括：
1. **規範文件**（`variation-N-*.md`）- 完整設計系統詳情
2. **CSS 示例**（`*.example.css`）- 運行 CSS 實施參考
3. **比較分析**（`COMPARISON_cht.md`）- 決策制定指南

## 實施步驟

### 1. 選擇您的變體

查看 `COMPARISON_cht.md` 根據您的需求選擇最佳變體：
- **禪花園**：多功能、專業、平靜
- **復古街機**：有趣、易記、懷舊
- **野蠻派終端**：獨特、可訪問、最小

### 2. 更新主題變量

使用您選擇變體的 `*.example.css` 中的變量替換 `src/index.css` 中的 `@theme` 塊。

**禪花園示例：**
```css
@theme {
  --color-sand: #f5f1e8;
  --color-sage: #a8b5a0;
  /* ... 等等 */
}
```

### 3. 更新排版

添加 Google 字體到 `index.html`：

**禪花園：**
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&family=Inter:wght@400;500;600&family=Zen+Kaku+Gothic+New:wght@300;400;700&display=swap" rel="stylesheet">
```

**復古街機：**
```html
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=Bungee&display=swap" rel="stylesheet">
```

**野蠻派終端：**
```html
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;700&family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet">
```

### 4. 更新組件樣式

系統地更新每個組件文件：

#### StartScreen.tsx
- 替換背景漸變/效果
- 更新標題樣式（字體、大小、效果）
- 修改按鈕外觀
- 調整指令卡樣式

#### GameScreen.tsx
- 更新頭部樣式
- 修改 Bingo 指示器外觀
- 調整背景效果

#### BingoSquare.tsx
- 更改邊框樣式
- 更新懸停/標記/Bingo 狀態
- 修改排版

#### BingoModal.tsx
- 更新模態樣式
- 更改慶祝效果
- 調整按鈕外觀

#### StarField.tsx（可選）
- 移除禪花園和野蠻派終端
- 保留但調整復古街機的顏色
- 或用主題適當的背景替換

### 5. 更新關鍵幀動畫

使用來自您選擇的 `*.example.css` 的動畫關鍵幀替換 `src/index.css` 中的動畫關鍵幀。

### 6. 全面測試

- [ ] 測試所有互動狀態（懸停、活躍、標記、Bingo）
- [ ] 驗證動畫正確播放
- [ ] 在移動設備上測試
- [ ] 檢查可訪問性（鍵盤導航、屏幕閱讀器）
- [ ] 使用 `prefers-reduced-motion` 驗證
- [ ] 運行 `npm run build` 確保無錯誤

## 詳細組件映射

### 禪花園

```
StartScreen:
  - 背景：沙色配微妙紙張紋理
  - 標題：Cormorant Garamond，3rem，炭色
  - 按鈕：鼠尾草綠配柔和陰影，輕微懸停提升
  - 卡片：白色配微妙陰影

GameScreen:
  - 頭部：最小、清潔邊框
  - Bingo 橫幅：竹綠配簡單文本
  - 棋盤：慷慨內邊距

BingoSquare:
  - 默認：白色配 1px 低不透明度邊框
  - 懸停：陰影增加、輕微提升
  - 標記：陶土填充配勾號
  - Bingo：竹綠邊框脈衝

BingoModal:
  - 大邊框半徑、柔和模糊
  - 優雅的祝賀文本
  - 可選圓心圓
```

### 復古街機

```
StartScreen:
  - 背景：CRT 黑配掃描線
  - 標題：Press Start 2P，"INSERT COIN"閃爍
  - 按鈕：霓虹漸變配厚邊框、光暈效果
  - 框架：街機柜風格

GameScreen:
  - 頭部：像素化邊框、狀態欄
  - Bingo 橫幅：閃爍的"WINNER!"配顏色動畫
  - 棋盤：像素網格疊加層

BingoSquare:
  - 默認：暗色配厚青邊框
  - 懸停：霓虹光暈 + 放大
  - 標記：黃色填充配粗體 X
  - Bingo：綠色光暈、快速閃爍

BingoModal:
  - 街機"GAME OVER"風格
  - 像素藝術效果
  - 屏幕震動動畫
```

### 野蠻派終端

```
StartScreen:
  - 背景：純黑（#000）
  - 標題：Roboto Mono，"> SOC_OPS.EXE"
  - 按鈕："[START]"配白邊框
  - 佈局：終端輸出風格

GameScreen:
  - 頭部：白色終端狀態欄
  - Bingo 橫幅：終端綠色背景，"====== BINGO ======"
  - 棋盤：完美網格對齊

BingoSquare:
  - 默認：黑色配 1px 白邊框
  - 懸停：綠色邊框（即時）
  - 標記：黃色填充，"[X]"前綴
  - Bingo：綠色邊框閃爍

BingoModal:
  - 居中矩形、2px 邊框
  - 無背景模糊（僅黑色疊加層）
  - "BINGO ACHIEVED"單色
```

## 組件特定說明

### 移除 StarField 組件

對於禪花園和野蠻派終端，移除 StarField：

```tsx
// 在 App.tsx 中，移除：
<StarField />

// 或有條件地隱藏：
{theme === 'space-galaxy' && <StarField />}
```

### 背景替代方案

**禪花園：**
```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: /* 微妙紙張紋理 */;
  opacity: 0.02;
}
```

**復古街機：**
```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(/* 掃描線 */);
  animation: crt-flicker 0.1s infinite;
}
```

**野蠻派終端：**
```css
/* 可選網格疊加層 */
.grid-overlay {
  background-size: 8px 8px;
  background-image: 
    linear-gradient(/* 網格線 */);
}
```

## 常見陷阱

### 禪花園
- ❌ 不要使陰影過於密集
- ❌ 不要加速動畫
- ✅ 保持一切溫和平靜
- ✅ 使用慷慨的空白區域

### 復古街機
- ❌ 不要使用微妙效果（大膽點！）
- ❌ 不要過度圓角
- ✅ 層疊多層光暈效果
- ✅ 擁抱像素完美對齊

### 野蠻派終端
- ❌ 不要添加陰影或漸變
- ❌ 不要放鬆動畫
- ✅ 保持一切即時和平面
- ✅ 將所有內容對齊到 8px 網格

## 性能提示

### 禪花園
- 限制背景模糊使用
- 使用簡單 box-shadow
- 優化字體加載

### 復古街機
- 減少移動設備上的光暈層
- 簡化掃描線密度
- 使用 CSS 動畫而不是 JS
- 在低端設備上測試

### 野蠻派終端
- 已經優化（無效果要優化）
- 可以對邊框動畫使用 `will-change`
- 禁用字體平滑以實現清晰度

## 可訪問性檢查清單

- [ ] 所有文本達到 4.5:1 對比度比
- [ ] 焦點指示器可見
- [ ] 鍵盤導航有效
- [ ] 屏幕閱讀器測試
- [ ] `prefers-reduced-motion` 尊重
- [ ] 觸摸目標 ≥ 44px
- [ ] 色彩不是唯一指示器

## 測試矩陣

| 測試 | 禪 | 街機 | 終端 |
|------|-----|--------|----------|
| Chrome 桌面 | ✓ | ✓ | ✓ |
| Firefox 桌面 | ✓ | ✓ | ✓ |
| Safari 桌面 | ✓ | ✓ | ✓ |
| Chrome 移動 | ✓ | ⚠️ | ✓ |
| Safari iOS | ✓ | ⚠️ | ✓ |
| 減少運動 | ✓ | ✓ | ✓ |
| 屏幕閱讀器 | ✓ | ⚠️ | ✓ |

⚠️ = 可能需要調整（特別是移動設備上的光暈效果）

## 漸進遷移策略

不想一次性切換？逐漸實施：

1. **第 1 週**：僅更新主題變量和顏色
2. **第 2 週**：更新排版系統
3. **第 3 週**：逐個更新組件樣式
4. **第 4 週**：打磨動畫和效果
5. **第 5 週**：完整 QA 測試和精煉

## 回滾計畫

保留當前主題作為後備：

```tsx
// 創建主題變體
const themes = {
  'space-galaxy': SpaceGalaxyTheme,
  'zen-garden': ZenGardenTheme,
  'retro-arcade': RetroArcadeTheme,
  'brutalist': BrutalistTheme,
};

// 允許主題切換
const [theme, setTheme] = useState('space-galaxy');
```

這允許用戶 A/B 測試不同主題。

## 需要幫助？

- 查看詳細的規範文件
- 檢查 CSS 示例以獲取運行代碼
- 參考 COMPARISON_cht.md 以獲取決策指導
- 漸進式測試更改
- 使用 `npm run lint` 和 `npm run build` 驗證

## 成功標準

當以下條件滿足時，您的實施完成：

✓ 所有組件與設計規範匹配  
✓ 動畫遵循計時指南  
✓ 排版使用正確字體和比例  
✓ 顏色與調色板完全匹配  
✓ 互動狀態如指定工作  
✓ 滿足可訪問性要求  
✓ 構建無警告通過  
✓ 視覺審查確認設計意圖
