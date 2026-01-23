# Soc Ops — VS Code Agent Lab（1小時）

Harald Kirschner `@digitarald`
— VS Code Team `@code`

## 檢查清單

- [ ] 最新的 VS Code **v1.107**（沒有待更新）
- [ ] 已使用 GitHub 登入
  - Copilot Free 無法執行雲端 agent！
- [ ] 已安裝 Git 和 Node
- [ ] Chat 已開啟，Agent 準備就緒

*選擇性*：使用 DevContainer 或 WSL。

## 設定


1. 開啟 https://github.com/microsoft/vscode-agent-lab-soc-ops
   1. *使用此模板* > *建立新儲存庫*（選擇 `my-soc-ops`，設定為*公開*）
      - ✅ 您自己的 *soc-ops* GitHub 儲存庫已準備好
   2. ⚠️ 啟用 *Settings* > *Pages* > *Deploy from a branch* 至 *GitHub Actions*
      - ✅ 任何提交到儲存庫都會將遊戲發佈為 GitHub page：`http://{your-gh-username}.github.io/{my-soc-ops}`
2. 開啟 VS Code：
	1. 指令：`Git: Clone > Clone from GitHub`
	2. 安裝推薦的擴充功能（通知或 `Extensions: Show Recommended Extensions`）
	3. Chat：執行 `/setup` 讓 agent 自動找出任何所需的安裝步驟
3. 🎉 應用程式已執行並在瀏覽器中開啟！

保持 `.lab/GUIDE.md` 開啟（📌 釘選）。

## 學習目標

完成此工作坊後，您將：

1. **能夠將 AI 導入您的程式碼庫**和工作流程並進行上下文工程
2. **瞭解代理原始功能**以建立 AI 優先的工程流程
3. **解鎖代理豐富功能**以擴展探索並加快在更多開發任務中的學習速度
4. **感受氛圍** ... 嘿，您設計並建立了您的社交 Bingo；使用它來創造更多美好氛圍

## 建議

1. 保持實時更新的瀏覽器開啟
2. 經常提交工作程式碼
3. 使用 Chat 的*檢查點*和*復原*來還原意外更改，然後重新嘗試

## 1. 上下文工程化您的儲存庫

自己動手：瀏覽專案。試試看遊戲。

### 任務：執行並理解 /setup 提示

**簡短版**：AI 引導的安裝，所以您不必閱讀文檔。

查看 `.github/prompts/setup.prompt.md`。

### 任務：自動產生的指示

**簡短版**：指示指導所有代理程式的程式碼庫互動，使其更有效且可靠。盡早新增，但務必保持維護和簡潔。

1. 指令 `Chat: Generate Workspace Instructions File`
   1. 當 agent 分析程式碼庫時，可選擇開始下一個任務
2. 審查結果，可能會非常冗長和詳細
3. 後續跟進 *「壓縮至原來的一半，並在頂部新增強制開發 [ ] 檢查清單（lint、build、test）」*
4. 提交指示

結果：所有未來的請求都將有基本的工作空間地圖。

### 任務：背景 agents

**簡短版**：將不需要手動幫助的任務交給在 git worktrees 中隔離執行的背景 agents，以進行快速平行本地迭代。

1. Chat `+` > `New background agent` / `New cloud agent`：
2. 新建背景 agent：*新增未使用變數和 awaits 使用情況的 linting 規則；並修復任何錯誤*
   1. 審查並*應用*，然後右鍵點擊刪除工作階段。
3. 新建雲端 agent：*使 readme 作為專案的著陸頁面更具吸引力*

結果：Agents 已調整規則、修復錯誤，所有編輯都已合併回主分支。更嚴格的 linting 規則將更早捕獲任何人工/agent 錯誤。

### 任務：檢查 Tailwind 4 指示

**簡短版**：Tailwind v4 指示彌補訓練資料的差距，並記錄最新的最佳實踐。

參考頁腳中的提示。

**選擇性**，如果有興趣瞭解其運作方式：刪除主要文本並重新執行提示

### 任務：檢查前端指示

**簡短版**：「沒有紫色漸層」的指示，挑戰 agent 像設計師一樣思考並更大膽、更有創意。

來源：Claude 部落格，連結在頁腳中。

**選擇性**：您還可以挑戰和改進哪些其他代理偏見？

## 2. 設計優先的前端體驗

現在我們已經為儲存庫進行了上下文工程化，讓我們發揮創意。

### 任務：讓它成為您的

**簡短版**：以計劃模式開始任何更大的工作項目—迭代計劃（2 次以上！）並進行調整和澄清。

步驟：
1. 切換到計劃模式
2. *讓我們進行完整重新設計。使其 …*
3. 審查計劃並開始實施

想法：
- 極簡主義單色
- Grotesque 字型網格
- 復古終端綠色
- Vaporwave 日落
- Cyberpunk 霓虹
- 粗野主義方塊
- 柔和糕點雲
- Skeuomorphic 貼紙
- 深色模式黑色電影
- 好玩糖果流行
- 像素街機風格
- 斯堪地那維亞寧靜
- 企業乾淨藍色
- 漸層玻璃 UI
- 筆記本塗鴉素描
- 太空銀河光
- 紙卡切割
- 幾何 Memphis
- 舒適咖啡館
- 金屬鍍鉻 UI
- 大膽構成主義
- 生態綠葉
- 動畫氣泡美學
- 單色報紙
- 黑板教室
- 遊艇俱樂部航海
- 沙漠沙色極簡
- 大膽襯線復古
- 玩具箱原色

結果：前端和 tailwind 指示用於建立美觀的設計。

### 任務：保持指示更新

**簡短版**：使用主要架構/設計/依賴變更保持指示更新。

1. 後續跟進：`新增設計指南部分到 copilot-instructions.md`
2. 確認、提交並推送

獎勵：檢查 GitHub pages 是否在更新。

### 任務：進行大量重新設計

**簡短版**：使用非同步雲端 agents 擴展探索和學習。

- 新的 Chat，使用計劃模式
- `將啟動螢幕重新設計為更具吸引力的著陸頁面`
- *結果*：在考慮中建議了很多變化
- 執行提示：`/cloud-explore design variations`
  - 參考 `.github/prompts/cloud-explore.prompt.md`
- 檢查新出現的 3 個雲端 agents 的 Agent 工作階段以追蹤進度。按一下跟隨或在網路中開啟 agent。
- 稍後：根據 PRs 中的螢幕截圖審查 3 個設計。

**結果：** 3 個雲端 agent 工作階段將花費幾分鐘完成。同時 …

## 3. 測驗

### 任務：您自己的 Quiz Master

**簡短版**：使用自訂 agents 定義您自己的專門工作流程，超越通用編碼提示。適用於本地和雲端編碼 agent。

步驟：
- 新的 Chat，選擇 *Quiz Master* 作為自訂 agent
- `更新問題為 …` 或只是 `更新測驗`
- 查看 `.github/agents/quiz-master.agent.md` 中的提示
- 選擇性：後續跟進以推動更多創意、混亂、參與。
- `+` > `新建雲端 agent`：選擇 Quiz Master
- 選擇另一個主題並發送

**主題想法**：
- 技能 Bingo：而不是個人事實 → 工作場所或技術技能。
- 個性 Bingo：偏好、怪癖、有趣特徵。
- 秘密挑戰 Bingo：每個方格都有一個與您遇到的人進行的快速微任務。
- 團隊 Bingo：每個方格包含一個部門或團隊類別。
- 經典事實 Bingo：基本人類事實（生日月份、寵物等）。
- 工作文化 Bingo：生產力習慣、會議風格、工具。
- 科技生活 Bingo：編碼語言、快捷鍵、框架、開發者迷因。
- 旅行 Bingo：居住過的城市、訪問過的國家、文化傳統。
- 創意 Bingo：音樂、藝術、設計品味、創意技能。
- 微挑戰 Bingo：快速動作（教一個詞、展示迷因）。
- 深層聊天 Bingo：反思或有意義的談話開啟者。
- 辦公幽默 Bingo：辦公桌怪癖、咖啡因習慣、會議熱話題。
- 對立面 Bingo：找一個在特定軸線上是您對立面的人。
- Fandom Bingo：科幻、遊戲、書籍、節目、小眾興趣。
- 生活風格 Bingo：睡眠、健身、食物、例行程序。
- 神秘 Bingo：猜測誰符合特徵並驗證。
- 混亂 Bingo：令人驚訝、荒謬、不可預測的提示。

**結果：** 自訂 agent 通過更新的測驗，生成新的創意和引人入勝的問題。

## 4. 多代理和多重 Bingo

### 任務：新的尋寶狩獵模式，TDD 驅動

**簡短版**：自訂 agents 配備交接功能可以將複雜工作流程分解為更小的步驟，由使用者控制關鍵決定。

步驟：
- 啟動新的計劃 agent
- *新增新的尋寶狩獵模式：相同的問題，但顯示為簡單列表，含複選框 + 進度條。*
- 迭代計劃以確保正確性和完整性 …
  - 它是否將模式新增到啟動頁面？
  - 它是否過度使用進度？
- 執行 TDD Red 模式 *從測試開始*
	- 審查正在編寫的測試
	- 檢查 VS Code 的測試執行器
- TDD Red 完成後，選擇 TDD Green
	- 審查實施和更多通過的測試
- 檢查之前和之後/重構
    - 確保它有效，因為 TDD agent 只專注於編寫完全測試的程式碼
- 完成交接工作流程、紅色 - 綠色 - 重構。

獎勵：
- 重置為「TDD Red」開始前的檢查點，並使用「TDD Supervisor」重試

**結果：** 精細控制的 TDD 流程會分解測試，但允許您審查/確認每個關鍵步驟（測試、實施、審查）。

### 任務：卡牌組洗牌，設計驅動

**簡短版**：將 agent 工作流程分解為特定焦點區域，例如設計優先。

步驟：
1. 新的 Chat，agent：`Pixel Jam`
2. *新模式：卡牌組洗牌。每個玩家開啟遊戲 → 點擊 → 獲得包含問題的隨機卡。*
3. 結果：Agent 迭代 UI 時保持設計一致性
4. 後續跟進以使其按您想要的方式運作：
    - *新增左/右（失敗、成功）*
    - *當我開啟時立即抽一張卡*
5. 提交

### 任務：UX 審查 Agent

**簡短版**：結合 MCP、自訂工作流程和 subagent 隔離在 agent 中以實現強大的工作流程。專注於不同方面，例如可用性、a11y、合規性。

- 新的 Chat，agent：`Pixel Jam`：*執行審查*
- 為此工作空間使用 Allow 以獲得 Playwright 工具批准
- 跟隨審查過程
  - 旁註：開啟 `.github/agents/pixel-jam.agent.md` 以審查提示
- *結果*：看看一份強大的深度審查
- 獎勵：
  - 將發現結果提交為 GitHub 上的問題供稍後使用
  - 將關鍵問題指派給編碼 agent 以修復

## 獎勵：繼續進行

- 修復 UX 審查問題，委託給背景或雲端 agent
- 新增從中選擇多個問題主題的功能
- 新增社交分享至勝利狀態
- 製作真正的 iOS 或全堆棧應用程式？

---

祝您編碼愉快，

  👋 Harald Kirschner 和 VS Code 團隊

p.s. 保持更新：

1. [VS Code on YouTube](https://www.youtube.com/code)
2. [VS Code Copilot 文檔](https://code.visualstudio.com/docs/copilot/overview)
3. [Awesome Copilot](https://github.com/github/awesome-copilot) 以了解更多自訂選項
