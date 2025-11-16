# 🧭 工作日誌代理人系統開發藍圖（基於 Flowise）

## 🎯 專案目標（短期與長期）

- **短期目標（MVP）**：以 Flowise 為主體，開發一套可自動根據 Git commits 生成每日工作日誌的代理人，具備自動化、審閱與格式輸出能力。
- **長期目標**：fork Flowise，加入專屬工作日誌代理功能模組（custom nodes, plugin），支援進階功能如語意記憶、跨日分析、事件歸類、自動推送至第三方系統。

---

## 📦 MVP 功能模組規劃（V0.1）

### ✅ 1. Commits 抓取與儲存
- 倉庫管理（RepositoriesPage）與排程設定（SettingsPage）已實作。
- 自動透過 Git API 定期拉取 Commits。
- 儲存結構： `repo`, `message`, `hash`, `author`, `datetime`, `branch`。

### 🧠 2. Flowise Chatflow - Commit ➜ Log 描述轉換
- 使用 Prompt Template 將技術語言 commit message 轉為業務語言。
- Flowise chatflow 結構：
  - Input Node: JSON commit 資料
  - Prompt Template Node
  - OpenAI Node or Local Model Node
  - Output Node: log 描述文字

### 🧪 3. 測試與整合
- 使用 `/prediction/{id}` API 測試 chatflow 預測（參考 API 文件）
- 將資料封裝為每日 JSON 輸入（可用定時腳本或 n8n webhook 實現）

### 🧱 4. 實作 Custom Node（Fork Flowise 擴充）
- 範例：`commit-to-log-agent` node
  - 支援輸入 commit array，選擇模型，輸出轉換結果。
  - 可作為 plugin 提供 GUI 節點與可複用模板。
  - 放入 forked Flowise 專屬節點庫（例如：`flowise-nodes-worklog`）

### 📤 5. 輸出與手動審閱（暫不自動推送）
- 生成 markdown / plain text 日誌格式
- 可擴充：加入 HITL node，提示人工審閱與確認按鈕（可整合 Web UI 或 Notion）

---

## 🧱 Fork Flowise 擴充模組（V0.2）

### 📁 課製節點 `flowise-nodes-worklog`
- `commitToLogNode`
- `worklogFormatterNode`
- `dailyReportPreviewNode`
- `workEventClassifierNode`

### 🛠 自動化組合模塊
- `worklogAgentFlow`（專屬 Agentflow）
- 每日任務自動化流（定時 ➜ 分析 ➜ 分類 ➜ 審閱 ➜ 日誌）

---

## 🧬 中期功能規劃（V0.3+）

### 🔁 關聯記憶與向量資料庫
- 使用 ChromaDB / Qdrant 儲存 commit 語義
- 利用 Embedding 比對關聯 commit（如：「請假功能」）
- 使用多日資料生成完整工作事件描述

### 🧠 多 Agent 協作
- Supervisor Agent：負責解析工作日輸入
- Commit 分析 Worker：分類與語義轉換
- 事件聚合 Worker：同事件合併輸出
- 日誌草稿 Worker：生成摘要

### 🔄 API 自動推送模組
- 自定義 webhook / API 模組
- 具備資料驗證、失敗重送、批次分批（最多 4 筆/次）等機制

---

## 🔐 模組安全與擴充性設計
- 使用 Flowise API 權限機制（JWT）保護外部調用
- 建立 logging 模組記錄自動化執行流程與錯誤
- 可加入 MCP 工具支援對接企業內部資源

---

## 📝 下一步實作事項

| 優先 | 任務                               | 工具                     | 備註                     |
|------|------------------------------------|--------------------------|--------------------------|
| 🔹   | 製作 `commit-to-log` Prompt chatflow | Flowise                  | MVP 關鍵模塊             |
| 🔹   | 測試 Flowise API 呼叫 chatflow     | Postman / script         | /prediction/{id}         |
| 🔸   | Fork Flowise 增加課製 node          | TypeScript + node 插件    | 放入自定義 node 目錄      |
| 🔸   | 整合 n8n webhook 測試自動流程       | n8n + Flowise + webhook  | commit ➜ 生成 ➜ 紀錄     |
| 🔸   | 審閱功能設計（可選 HITL）           | Flowise HITL Node        | 可選人工確認流程         |

