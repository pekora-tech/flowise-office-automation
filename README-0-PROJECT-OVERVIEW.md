# 📋 工作日誌代理人系統 - 專案總覽

## 🎯 專案目標

基於 Flowise 開發一套可自動根據 Git commits 生成每日工作日誌的代理人系統，具備自動化、審閱與格式輸出能力。

## 📚 文件索引

### 核心文件

-   **[flowise_worklog_roadmap.md](./flowise_worklog_roadmap.md)** - 專案開發藍圖（短期與長期目標）
-   **README-0-PROJECT-OVERVIEW.md** - 本文件，專案總覽
-   **README-1-BACKEND-FRONTEND-IMPLEMENTATION-GIT-REPOSITORIES.md** - Git Repositories 功能實作指南

### 開發階段文件（將陸續建立）

-   **README-2-GIT-SYNC-SERVICE-IMPLEMENTATION.md** - Git 同步服務實作（待建立）
-   **README-3-CHATFLOW-COMMIT-TO-LOG-DESIGN.md** - Chatflow 設計指南（待建立）
-   **README-4-AUTOMATION-SCHEDULING-IMPLEMENTATION.md** - 自動化排程實作（待建立）

## 🏗️ 系統架構

```
┌─────────────────────────────────────────────────────────────┐
│                     Flowise Platform                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐ │
│  │   Frontend   │───▶│   Backend    │───▶│   Database   │ │
│  │  (React UI)  │    │  (Express)   │    │  (TypeORM)   │ │
│  └──────────────┘    └──────────────┘    └──────────────┘ │
│         │                    │                     │        │
│         │                    │                     │        │
│  ┌──────▼────────────────────▼─────────────────────▼─────┐ │
│  │           Git Repositories Management                  │ │
│  │  • 倉庫 CRUD                                           │ │
│  │  • Git 同步服務                                        │ │
│  │  • Commits 儲存與管理                                  │ │
│  └────────────────────────────────────────────────────────┘ │
│                            │                                │
│  ┌─────────────────────────▼──────────────────────────────┐│
│  │         Chatflow: Commit → Worklog Converter           ││
│  │  • Prompt Template                                     ││
│  │  • LLM Processing (OpenAI/Local)                       ││
│  │  • 業務語言轉換                                         ││
│  └────────────────────────────────────────────────────────┘│
│                            │                                │
│  ┌─────────────────────────▼──────────────────────────────┐│
│  │            Worklog Generation & Output                 ││
│  │  • 每日工作日誌生成                                     ││
│  │  • Markdown/PDF 輸出                                   ││
│  │  • 人工審閱介面 (HITL)                                 ││
│  └────────────────────────────────────────────────────────┘│
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 📊 開發進度

### ✅ Phase 1: MVP 基礎 (V0.1) - 已完成

-   [x] Git Repositories 管理功能
    -   [x] 後端 API (CRUD + Sync endpoint)
    -   [x] 資料庫 Entity 與 Migration
    -   [x] 前端管理介面
    -   [x] 選單與路由整合
    -   [x] 權限控制 (RBAC)

### 🚧 Phase 2: Git 同步服務 (V0.2) - 進行中

-   [ ] Git 同步邏輯實作
    -   [ ] 使用 simple-git 拉取 commits
    -   [ ] 支援認證（Token/SSH）
    -   [ ] Commits 解析與儲存
    -   [ ] 錯誤處理與重試
-   [ ] Commits 管理介面
    -   [ ] Commits 列表頁面
    -   [ ] 篩選與搜尋功能

### 📋 Phase 3: Chatflow 設計 (V0.3) - 待開始

-   [ ] Commit → Worklog Prompt 設計
-   [ ] Chatflow 建立與測試
-   [ ] API 整合
-   [ ] 批次處理邏輯

### 🤖 Phase 4: 自動化與排程 (V0.4) - 待開始

-   [ ] 定時任務系統
-   [ ] 自動同步 repositories
-   [ ] 自動生成工作日誌
-   [ ] 通知機制

### 🎨 Phase 5: 進階功能 (V0.5+) - 待開始

-   [ ] 語義記憶 (Vector DB)
-   [ ] 多 Agent 協作
-   [ ] 事件聚合與分類
-   [ ] 自訂 Flowise Node

## 🛠️ 技術棧

### 後端

-   **Framework**: Node.js + Express
-   **ORM**: TypeORM
-   **Database**: SQLite / PostgreSQL / MySQL / MariaDB
-   **Queue**: BullMQ
-   **Auth**: Passport.js + JWT

### 前端

-   **Framework**: React 18
-   **UI Library**: Material-UI (MUI)
-   **State Management**: Redux
-   **Routing**: React Router
-   **Build**: Vite

### AI/ML

-   **Platform**: Flowise
-   **LLM**: OpenAI API / Local Models
-   **Vector DB**: ChromaDB / Qdrant (計劃中)

## 📁 專案結構

```
flowise-office-automation/
├── packages/
│   ├── server/                    # 後端
│   │   ├── src/
│   │   │   ├── controllers/       # 控制器
│   │   │   │   └── repositories/  # ✅ Repositories 控制器
│   │   │   ├── services/          # 業務邏輯
│   │   │   │   └── repositories/  # ✅ Repositories 服務
│   │   │   ├── routes/            # 路由
│   │   │   │   └── repositories/  # ✅ Repositories 路由
│   │   │   ├── database/
│   │   │   │   ├── entities/      # 資料模型
│   │   │   │   │   ├── Repository.ts      # ✅ 倉庫實體
│   │   │   │   │   └── GitCommit.ts       # ✅ Commit 實體
│   │   │   │   └── migrations/    # 資料庫遷移
│   │   │   │       ├── sqlite/    # ✅ SQLite migration
│   │   │   │       ├── postgres/  # ✅ PostgreSQL migration
│   │   │   │       ├── mysql/     # ✅ MySQL migration
│   │   │   │       └── mariadb/   # ✅ MariaDB migration
│   │   │   └── Interface.ts       # ✅ TypeScript 介面定義
│   │   └── package.json
│   │
│   ├── ui/                        # 前端
│   │   ├── src/
│   │   │   ├── api/
│   │   │   │   └── repositories.js        # ✅ Repositories API
│   │   │   ├── views/
│   │   │   │   └── repositories/          # ✅ Repositories 頁面
│   │   │   │       ├── index.jsx
│   │   │   │       └── AddEditRepositoryDialog.jsx
│   │   │   ├── routes/
│   │   │   │   └── MainRoutes.jsx         # ✅ 路由配置
│   │   │   └── menu-items/
│   │   │       └── dashboard.js           # ✅ 選單配置
│   │   └── package.json
│   │
│   ├── components/                # Flowise 元件
│   └── api-documentation/         # API 文件
│
├── flowise_worklog_roadmap.md    # 📌 開發藍圖
├── README-0-PROJECT-OVERVIEW.md  # 📌 本文件
└── README-1-BACKEND-FRONTEND-IMPLEMENTATION-GIT-REPOSITORIES.md  # 📌 實作指南

```

## 🚀 快速開始

### 環境需求

-   Node.js >= 18.15.0
-   pnpm (建議使用)
-   Git

### 安裝與啟動

```bash
# 1. 安裝依賴
pnpm install

# 2. 執行資料庫遷移
cd packages/server
pnpm typeorm:migration-run

# 3. 建置專案
cd ../..
pnpm build

# 4. 啟動開發環境
pnpm dev
```

應用程式將在 http://localhost:8080 啟動

### 生產環境

```bash
# 建置
pnpm build

# 啟動
pnpm start
```

## 📖 開發指南

### 閱讀順序

1. **[flowise_worklog_roadmap.md](./flowise_worklog_roadmap.md)** - 了解整體規劃
2. **README-0-PROJECT-OVERVIEW.md** (本文件) - 了解專案結構
3. **README-1-BACKEND-FRONTEND-IMPLEMENTATION-GIT-REPOSITORIES.md** - 學習如何實作功能模組

### 如何新增功能

請參考 `README-1-BACKEND-FRONTEND-IMPLEMENTATION-GIT-REPOSITORIES.md` 的「如何自己新增類似功能模組」章節

### 程式碼規範

-   後端使用 TypeScript
-   前端使用 JSX (可逐步遷移到 TSX)
-   遵循 ESLint 規則
-   使用 Prettier 格式化

## 🔐 權限系統

本專案使用 RBAC (Role-Based Access Control) 權限系統：

### Git Repositories 權限

-   `repositories:view` - 檢視倉庫列表
-   `repositories:create` - 建立新倉庫
-   `repositories:update` - 更新倉庫資訊
-   `repositories:delete` - 刪除倉庫

### Workspace 隔離

所有資料都與 workspace 綁定，確保多租戶安全性。

## 🧪 測試

```bash
# 執行測試
pnpm test

# 端到端測試
pnpm e2e
```

## 📝 API 文件

啟動伺服器後訪問：

-   Swagger UI: http://localhost:3000/api-docs

## 🤝 貢獻指南

1. Fork 專案
2. 建立功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 授權

本專案基於 Flowise，遵循 Apache License Version 2.0

## 🔗 相關連結

-   [Flowise 官方文件](https://docs.flowiseai.com/)
-   [Flowise GitHub](https://github.com/FlowiseAI/Flowise)
-   [TypeORM 文件](https://typeorm.io/)
-   [Material-UI 文件](https://mui.com/)

## 📞 聯絡方式

如有問題或建議，請開啟 Issue 或 Discussion。

---

**最後更新**: 2025-01-16
**版本**: 0.1.0 (MVP Phase 1 完成)
**狀態**: 🚧 開發中
