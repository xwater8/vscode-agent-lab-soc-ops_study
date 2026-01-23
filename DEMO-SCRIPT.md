# 演示腳本：三種設計風格 Worktrees

## 場景 1: 查看 Worktrees 設置

```bash
# 顯示所有 worktrees
git worktree list

# 輸出示例：
# vscode-agent-lab-soc-ops_study    4c89c16 [feature_study]
# soc-ops-zen-garden                5d8f7ce [design/zen-garden]
# soc-ops-retro-arcade              8cd48e3 [design/retro-arcade]
# soc-ops-brutalist-terminal        6727f2a [design/brutalist-terminal]
```

## 場景 2: 同時啟動所有設計

```bash
# 運行啟動腳本
./start-all-designs.sh

# 等待輸出：
# 🎨 Starting all design variations...
# 
# 📋 Design Variations:
# 1. Zen Garden        - http://localhost:5173
# 2. Retro Arcade      - http://localhost:5174
# 3. Brutalist Terminal - http://localhost:5175
# 
# 🚀 Starting development servers...
# ✅ All servers started!
```

## 場景 3: 在瀏覽器中比較

1. 打開三個瀏覽器標籤頁：
   - Tab 1: http://localhost:5173 (Zen Garden - 米色背景)
   - Tab 2: http://localhost:5174 (Retro Arcade - 黑色背景 + 掃描線)
   - Tab 3: http://localhost:5175 (Brutalist - 純黑白)

2. 點擊 "Start Game" 按鈕觀察不同的交互效果：
   - Zen Garden: 柔和的滑入動畫
   - Retro Arcade: 快速的像素彈出效果
   - Brutalist: 即時顯示，無過渡

3. 點擊 Bingo 格子觀察標記狀態：
   - Zen Garden: 變為陶土色，圓角柔和
   - Retro Arcade: 黃色霓虹光暈
   - Brutalist: 黃色背景 + [X] 前綴

## 場景 4: 獨立編輯某個設計

```bash
# 切換到 Zen Garden worktree
cd ../soc-ops-zen-garden

# 查看當前分支
git branch
# * design/zen-garden

# 編輯 CSS (例如改變主色)
vim src/index.css
# 修改 --color-sage: #a8b5a0; → --color-sage: #88aa77;

# 保存後，瀏覽器自動熱重載 (HMR)
# 在 http://localhost:5173 看到即時變化

# 提交變更
git add src/index.css
git commit -m "feat: adjust sage green color tone"
```

## 場景 5: 切換回主工作區

```bash
# 回到主工作區
cd ../vscode-agent-lab-soc-ops_study

# 查看分支
git branch
# * feature_study
#   design/brutalist-terminal
#   design/retro-arcade
#   design/zen-garden

# 主工作區的 CSS 仍然是原始的 Space Galaxy Glow 設計
cat src/index.css | head -20
```

## 場景 6: 清理（可選）

```bash
# 停止所有 dev servers (Ctrl+C)

# 如果要移除某個 worktree
git worktree remove ../soc-ops-zen-garden

# 列表確認
git worktree list
```

## 關鍵要點演示

### 亮點 1: 完全獨立的工作空間
```bash
# 在 Zen Garden 中
ls ../soc-ops-zen-garden/src/index.css
# → 顯示 Zen Garden 的 CSS

# 在主工作區中
ls src/index.css
# → 顯示 Space Galaxy Glow 的 CSS

# 兩個文件內容完全不同！
```

### 亮點 2: 共享 Git 歷史
```bash
# 所有 worktrees 共享同一個 .git 目錄
cd ../soc-ops-zen-garden
git log --oneline | head -5
# 5d8f7ce feat: implement Zen Garden minimalist design theme
# 4c89c16 fix: export ScavengerHuntScreenProps interface
# ...

cd ../soc-ops-retro-arcade
git log --oneline | head -5
# 8cd48e3 feat: implement Retro Arcade neon design theme
# 4c89c16 fix: export ScavengerHuntScreenProps interface
# ...
```

### 亮點 3: 即時對比
```bash
# 運行三個設計，並排放置瀏覽器窗口
# 同時點擊所有三個的 "Start Game"
# 觀察三種不同的動畫風格同時播放
```

## 使用技巧

### 技巧 1: 使用 VS Code 多窗口
```bash
# 在不同的 VS Code 窗口中打開每個 worktree
code ../soc-ops-zen-garden
code ../soc-ops-retro-arcade
code ../soc-ops-brutalist-terminal
```

### 技巧 2: 合併設計改進到其他分支
```bash
# 假設在 Zen Garden 中發現了一個好的動畫效果
cd ../soc-ops-zen-garden
git log --oneline | head -1
# 5d8f7ce feat: implement Zen Garden minimalist design theme

# 切換到 Retro Arcade 並挑選該提交
cd ../soc-ops-retro-arcade
git cherry-pick 5d8f7ce
# 手動解決衝突，保留兩種設計的優點
```

### 技巧 3: 創建設計快照
```bash
# 為每個設計創建標籤
cd ../soc-ops-zen-garden
git tag v1.0-zen-garden

cd ../soc-ops-retro-arcade
git tag v1.0-retro-arcade

cd ../soc-ops-brutalist-terminal
git tag v1.0-brutalist-terminal

# 推送標籤
git push origin --tags
```

---

**演示時間**: 約 15-20 分鐘
**難度**: 中級
**先決條件**: 熟悉 Git 和命令行操作
