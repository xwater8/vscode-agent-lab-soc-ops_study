# 設計變化 Worktrees 使用說明

本專案已經建立了三個 git worktrees，每個都實現了不同的設計風格。

## 📁 Worktree 結構

```
vscode-agent-lab-soc-ops_study/     (主工作區 - feature_study 分支)
soc-ops-zen-garden/                  (Zen Garden 設計 - design/zen-garden 分支)
soc-ops-retro-arcade/                (Retro Arcade 設計 - design/retro-arcade 分支)
soc-ops-brutalist-terminal/          (Brutalist Terminal 設計 - design/brutalist-terminal 分支)
```

## 🎨 設計風格說明

### 1. Zen Garden (極簡禪意)
- **位置**: `../soc-ops-zen-garden`
- **分支**: `design/zen-garden`
- **特色**: 
  - 溫暖的沙色背景 (#f5f1e8)
  - 優雅的襯線字體 (Cormorant Garamond)
  - 柔和的動畫效果
  - 微妙的紙張紋理
- **色調**: 米色、竹綠、陶土色

### 2. Retro Arcade (復古街機)
- **位置**: `../soc-ops-retro-arcade`
- **分支**: `design/retro-arcade`
- **特色**:
  - CRT 顯示器掃描線效果
  - 8-bit 像素字體 (Press Start 2P, VT323)
  - 霓虹光輝效果
  - 快速、閃爍的動畫
- **色調**: 霓虹粉、電黃、青色、螢光綠

### 3. Brutalist Terminal (粗野主義終端)
- **位置**: `../soc-ops-brutalist-terminal`
- **分支**: `design/brutalist-terminal`
- **特色**:
  - 純黑白單色調
  - 嚴格的 8px 網格系統
  - 等寬字體 (IBM Plex Mono)
  - 極簡動畫（僅限功能性）
- **色調**: 黑、白、終端綠

## 🚀 啟動方式

### 方法 1: 使用啟動腳本 (推薦)
```bash
./start-all-designs.sh
```

這將同時啟動三個設計變化，分別在不同的端口：
- Zen Garden: http://localhost:5173
- Retro Arcade: http://localhost:5174
- Brutalist Terminal: http://localhost:5175

### 方法 2: 手動啟動單個設計
```bash
# Zen Garden
cd ../soc-ops-zen-garden
npm run dev

# Retro Arcade
cd ../soc-ops-retro-arcade
npm run dev

# Brutalist Terminal
cd ../soc-ops-brutalist-terminal
npm run dev
```

## 🔧 管理 Worktrees

### 查看所有 worktrees
```bash
git worktree list
```

### 切換到特定 worktree
```bash
cd ../soc-ops-zen-garden        # 切換到 Zen Garden
cd ../soc-ops-retro-arcade      # 切換到 Retro Arcade
cd ../soc-ops-brutalist-terminal # 切換到 Brutalist Terminal
```

### 在 worktree 中提交變更
```bash
cd ../soc-ops-zen-garden
git add .
git commit -m "Update Zen Garden design"
git push origin design/zen-garden
```

### 移除 worktree（如果需要）
```bash
# 先切換回主工作區
cd vscode-agent-lab-soc-ops_study

# 移除 worktree
git worktree remove ../soc-ops-zen-garden

# 刪除遠程分支
git push origin --delete design/zen-garden

# 刪除本地分支
git branch -d design/zen-garden
```

## 📝 設計文件參考

詳細的設計規格文件位於 `design-variations/` 資料夾：
- `variation-1-zen-garden.md` - Zen Garden 完整規格
- `variation-2-retro-arcade.md` - Retro Arcade 完整規格
- `variation-3-brutalist-terminal.md` - Brutalist Terminal 完整規格
- `zen-garden.example.css` - Zen Garden CSS 範例
- `retro-arcade.example.css` - Retro Arcade CSS 範例
- `brutalist-terminal.example.css` - Brutalist Terminal CSS 範例

## 💡 提示

1. **同時查看多個設計**: 使用 `start-all-designs.sh` 腳本可以同時在瀏覽器中打開三個分頁比較
2. **獨立開發**: 每個 worktree 都是獨立的工作目錄，可以同時編輯不同的設計
3. **共享依賴**: 所有 worktrees 共享 `.git` 目錄，但有各自的 `node_modules`
4. **熱重載**: Vite 的 HMR 在每個 worktree 中都能正常工作

## 🔄 同步主分支的更改

如果主分支有新的功能或修復，可以將它們合併到設計分支：

```bash
cd ../soc-ops-zen-garden
git fetch origin
git merge origin/main
# 或使用 rebase: git rebase origin/main
```

## ⚠️ 注意事項

- 每個 worktree 需要自己的 `node_modules` 目錄
- 修改一個 worktree 不會影響其他 worktrees
- 提交前確認在正確的 worktree 和分支上
- 不要刪除主工作區的 `.git` 目錄，它被所有 worktrees 共享
