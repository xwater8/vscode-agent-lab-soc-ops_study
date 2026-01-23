# 🎨 三種設計風格 Worktrees - 快速開始

## ✅ 已完成設置

已成功創建三個 git worktrees，每個都實現了不同的設計風格：

### 📂 Worktree 位置
```
├── vscode-agent-lab-soc-ops_study/    ← 主工作區
├── soc-ops-zen-garden/                ← Zen Garden 設計
├── soc-ops-retro-arcade/              ← Retro Arcade 設計
└── soc-ops-brutalist-terminal/        ← Brutalist Terminal 設計
```

### 🎯 設計特色一覽

| 設計風格 | 主色調 | 字體 | 動畫風格 |
|---------|--------|------|---------|
| **Zen Garden** | 米色、竹綠、陶土 | Cormorant Garamond (襯線) | 柔和、緩慢 |
| **Retro Arcade** | 霓虹粉、電黃、青色 | Press Start 2P (像素) | 快速、閃爍 |
| **Brutalist Terminal** | 黑白、終端綠 | IBM Plex Mono (等寬) | 極簡、功能性 |

## 🚀 立即啟動

### 選項 A: 同時啟動所有三個設計（推薦）

```bash
./start-all-designs.sh
```

將自動在以下端口啟動：
- 🌿 Zen Garden: http://localhost:5173
- 🎮 Retro Arcade: http://localhost:5174  
- 💻 Brutalist Terminal: http://localhost:5175

### 選項 B: 啟動單個設計

```bash
# Zen Garden
cd ../soc-ops-zen-garden && npm run dev

# Retro Arcade  
cd ../soc-ops-retro-arcade && npm run dev

# Brutalist Terminal
cd ../soc-ops-brutalist-terminal && npm run dev
```

## 🔍 驗證設置

```bash
# 查看所有 worktrees
git worktree list

# 輸出應該顯示：
# vscode-agent-lab-soc-ops_study    [feature_study]
# soc-ops-zen-garden                [design/zen-garden]
# soc-ops-retro-arcade              [design/retro-arcade]
# soc-ops-brutalist-terminal        [design/brutalist-terminal]
```

## 📖 更多資訊

詳細的使用說明請查看：
- `WORKTREES-GUIDE.md` - 完整的 worktrees 管理指南
- `design-variations/` - 各設計風格的詳細規格

## 🎉 開始探索

現在你可以：
1. 運行 `./start-all-designs.sh` 啟動所有設計
2. 在瀏覽器中打開三個分頁同時比較
3. 在不同的 worktrees 中獨立編輯代碼
4. 實時看到每個設計的變化

享受創作！ 🚀
