# 📚 文件索引 (Documentation Index)

## 📖 閱讀指南

### 🎯 新手入門路線

```
README.md (專案介紹)
    ↓
README-0-PROJECT-OVERVIEW.md (專案總覽)
    ↓
flowise_worklog_roadmap.md (開發藍圖)
    ↓
README-1-BACKEND-FRONTEND-IMPLEMENTATION-GIT-REPOSITORIES.md (實作指南)
```

---

## 📋 文件清單

### 🔵 核心文件（必讀）

| 文件名稱                                                           | 用途                   | 狀態    | 適合對象   |
| ------------------------------------------------------------------ | ---------------------- | ------- | ---------- |
| **[README.md](./README.md)**                                       | 專案首頁，快速了解專案 | ✅ 完成 | 所有人     |
| **[README-0-PROJECT-OVERVIEW.md](./README-0-PROJECT-OVERVIEW.md)** | 專案總覽、架構、技術棧 | ✅ 完成 | 開發者、PM |
| **[flowise_worklog_roadmap.md](./flowise_worklog_roadmap.md)**     | 開發藍圖與規劃         | ✅ 完成 | PM、架構師 |

### 🟢 實作指南（開發者必讀）

| 文件名稱                                                                                                                           | 用途                          | 狀態      | 涵蓋內容                                           |
| ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | --------- | -------------------------------------------------- |
| **[README-1-BACKEND-FRONTEND-IMPLEMENTATION-GIT-REPOSITORIES.md](./README-1-BACKEND-FRONTEND-IMPLEMENTATION-GIT-REPOSITORIES.md)** | Git Repositories 功能完整實作 | ✅ 完成   | Entity、Service、Controller、Routes、UI、Migration |
| **README-2-GIT-SYNC-SERVICE-IMPLEMENTATION.md**                                                                                    | Git 同步服務實作              | 📋 待建立 | simple-git、認證、錯誤處理                         |
| **README-3-CHATFLOW-COMMIT-TO-LOG-DESIGN.md**                                                                                      | Chatflow 設計指南             | 📋 待建立 | Prompt 設計、LLM 整合                              |
| **README-4-AUTOMATION-SCHEDULING-IMPLEMENTATION.md**                                                                               | 自動化排程實作                | 📋 待建立 | BullMQ、定時任務                                   |

### 🟡 進階主題（未來文件）

| 文件名稱                              | 用途                   | 狀態      |
| ------------------------------------- | ---------------------- | --------- |
| **README-5-VECTOR-DB-INTEGRATION.md** | 向量資料庫整合         | 📋 待建立 |
| **README-6-MULTI-AGENT-SYSTEM.md**    | 多 Agent 系統設計      | 📋 待建立 |
| **README-7-CUSTOM-FLOWISE-NODES.md**  | 自訂 Flowise Node 開發 | 📋 待建立 |

### 🔧 技術文件

| 文件名稱               | 用途           | 狀態      |
| ---------------------- | -------------- | --------- |
| **API.md**             | API 接口文件   | 📋 待建立 |
| **DATABASE-SCHEMA.md** | 資料庫結構文件 | 📋 待建立 |
| **DEPLOYMENT.md**      | 部署指南       | 📋 待建立 |

---

## 📂 文件命名規範

### 格式

```
README-{序號}-{類別}-{主題}.md
```

### 命名規則

-   **序號**: 00-99，表示閱讀順序和重要性

    -   `0-9`: 核心文件
    -   `10-29`: 基礎實作
    -   `30-49`: 進階功能
    -   `50-99`: 專題與擴展

-   **類別**: 文件類型

    -   `PROJECT`: 專案層級
    -   `BACKEND`: 後端實作
    -   `FRONTEND`: 前端實作
    -   `FULLSTACK`: 全棧功能
    -   `DESIGN`: 設計文件
    -   `DEPLOYMENT`: 部署相關
    -   `API`: API 文件

-   **主題**: 具體主題，使用連字號分隔，全大寫

### 範例

```
README-0-PROJECT-OVERVIEW.md
README-1-BACKEND-FRONTEND-IMPLEMENTATION-GIT-REPOSITORIES.md
README-2-BACKEND-GIT-SYNC-SERVICE-IMPLEMENTATION.md
README-3-DESIGN-CHATFLOW-COMMIT-TO-LOG.md
README-10-FRONTEND-COMMITS-MANAGEMENT-PAGE.md
```

---

## 🎯 各階段對應文件

### Phase 1: MVP 基礎 (V0.1) - 已完成 ✅

-   [x] README-0-PROJECT-OVERVIEW.md
-   [x] README-1-BACKEND-FRONTEND-IMPLEMENTATION-GIT-REPOSITORIES.md

### Phase 2: Git 同步服務 (V0.2) - 進行中 🚧

-   [ ] README-2-BACKEND-GIT-SYNC-SERVICE-IMPLEMENTATION.md
-   [ ] README-10-FRONTEND-COMMITS-MANAGEMENT-PAGE.md

### Phase 3: Chatflow 設計 (V0.3) - 待開始 📋

-   [ ] README-3-DESIGN-CHATFLOW-COMMIT-TO-LOG.md
-   [ ] README-11-BACKEND-CHATFLOW-API-INTEGRATION.md

### Phase 4: 自動化與排程 (V0.4) - 待開始 📋

-   [ ] README-4-BACKEND-AUTOMATION-SCHEDULING-IMPLEMENTATION.md
-   [ ] README-12-BACKEND-NOTIFICATION-SERVICE.md

### Phase 5: 進階功能 (V0.5+) - 待開始 📋

-   [ ] README-5-BACKEND-VECTOR-DB-INTEGRATION.md
-   [ ] README-6-DESIGN-MULTI-AGENT-SYSTEM.md
-   [ ] README-7-BACKEND-CUSTOM-FLOWISE-NODES.md

---

## 📊 文件狀態說明

| 圖示 | 狀態   | 說明                       |
| ---- | ------ | -------------------------- |
| ✅   | 完成   | 文件已完成且經過審核       |
| 🚧   | 撰寫中 | 文件正在撰寫               |
| 📋   | 待建立 | 已規劃但尚未開始撰寫       |
| 🔄   | 需更新 | 文件需要更新以反映最新變更 |
| ❌   | 已廢棄 | 文件已過時或不再使用       |

---

## 🔍 快速查找

### 我想了解...

#### 專案整體

→ 閱讀 [README.md](./README.md) 和 [README-0-PROJECT-OVERVIEW.md](./README-0-PROJECT-OVERVIEW.md)

#### 如何開始開發

→ 閱讀 [README-1-BACKEND-FRONTEND-IMPLEMENTATION-GIT-REPOSITORIES.md](./README-1-BACKEND-FRONTEND-IMPLEMENTATION-GIT-REPOSITORIES.md)

#### 未來規劃

→ 閱讀 [flowise_worklog_roadmap.md](./flowise_worklog_roadmap.md)

#### 如何新增功能模組

→ 參考 [README-1 的「如何自己新增類似功能模組」章節](./README-1-BACKEND-FRONTEND-IMPLEMENTATION-GIT-REPOSITORIES.md#-如何自己新增類似功能模組)

#### 資料庫結構

→ 參考 [README-1 的實體定義部分](./README-1-BACKEND-FRONTEND-IMPLEMENTATION-GIT-REPOSITORIES.md#1-資料庫層-database-entities)

#### API 使用方式

→ 參考 [README-1 的路由部分](./README-1-BACKEND-FRONTEND-IMPLEMENTATION-GIT-REPOSITORIES.md#️-路由層-routes)

---

## 📝 文件撰寫指南

### 每份文件應包含

1. **標題與簡介** - 清楚說明文件目的
2. **目錄** - 方便快速導航（長文件必須）
3. **主要內容** - 結構清晰、層次分明
4. **程式碼範例** - 附帶註解說明
5. **相關連結** - 連結到相關文件
6. **更新記錄** - 記錄重要變更（頁尾）

### Markdown 格式規範

-   使用 emoji 提升可讀性
-   程式碼區塊指定語言
-   適當使用表格整理資訊
-   重要資訊使用 blockquote 強調
-   截圖使用相對路徑

### 範例模板

```markdown
# 🎯 [文件標題]

## 📋 簡介

[簡短說明文件目的]

## 📚 目錄

-   [章節 1](#章節1)
-   [章節 2](#章節2)

## 🎯 章節 1

[內容]

## 📝 章節 2

[內容]

---

**最後更新**: YYYY-MM-DD
**版本**: X.Y.Z
**作者**: [作者名稱]
```

---

## 🤝 貢獻文件

如果您想新增或更新文件：

1. 遵循命名規範
2. 在此索引中登記文件
3. 確保文件格式一致
4. 提交 Pull Request

---

**最後更新**: 2025-01-16
**維護者**: 專案團隊
