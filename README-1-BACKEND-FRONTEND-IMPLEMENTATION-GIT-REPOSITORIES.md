# 🎯 Git Repositories 功能實作指南

## ✅ 已完成的工作

### 1. 後端 (Backend) 實作

#### 📁 資料庫層 (Database Entities)

-   **Repository Entity**: `packages/server/src/database/entities/Repository.ts`
    -   儲存 Git 倉庫資訊（名稱、URL、分支、認證等）
-   **GitCommit Entity**: `packages/server/src/database/entities/GitCommit.ts`
    -   儲存 commit 記錄（hash、訊息、作者、日期等）
-   **Interface 定義**: `packages/server/src/Interface.ts` (行 151-178)
    -   `IRepository` 和 `IGitCommit` 介面

#### 🔧 業務邏輯層 (Services)

-   **Repository Service**: `packages/server/src/services/repositories/index.ts`
    -   `createRepository` - 建立新倉庫
    -   `getAllRepositories` - 取得所有倉庫（支援分頁）
    -   `getRepositoryById` - 根據 ID 取得倉庫
    -   `updateRepository` - 更新倉庫資訊
    -   `deleteRepository` - 刪除倉庫（同時刪除相關 commits）
    -   `syncRepository` - 同步倉庫（TODO: 實作 Git 同步邏輯）

#### 🎮 控制層 (Controllers)

-   **Repository Controller**: `packages/server/src/controllers/repositories/index.ts`
    -   處理 HTTP 請求並驗證權限
    -   所有操作都檢查 workspace 權限

#### 🛣️ 路由層 (Routes)

-   **Repository Routes**: `packages/server/src/routes/repositories/index.ts`
    ```
    POST   /api/v1/repositories          - 建立倉庫
    GET    /api/v1/repositories          - 取得所有倉庫
    GET    /api/v1/repositories/:id      - 取得單一倉庫
    PUT    /api/v1/repositories/:id      - 更新倉庫
    DELETE /api/v1/repositories/:id      - 刪除倉庫
    POST   /api/v1/repositories/:id/sync - 同步倉庫
    ```
-   已整合到主路由: `packages/server/src/routes/index.ts`

#### 🗃️ 資料庫遷移 (Migrations)

為所有支援的資料庫建立了 migration：

-   **SQLite**: `packages/server/src/database/migrations/sqlite/1760000000001-AddRepositoryAndGitCommit.ts`
-   **PostgreSQL**: `packages/server/src/database/migrations/postgres/1760000000001-AddRepositoryAndGitCommit.ts`
-   **MySQL**: `packages/server/src/database/migrations/mysql/1760000000001-AddRepositoryAndGitCommit.ts`
-   **MariaDB**: `packages/server/src/database/migrations/mariadb/1760000000001-AddRepositoryAndGitCommit.ts`

### 2. 前端 (Frontend) 實作

#### 🌐 API 層

-   **Repository API**: `packages/ui/src/api/repositories.js`
    -   封裝所有後端 API 呼叫

#### 🖥️ UI 元件

-   **主頁面**: `packages/ui/src/views/repositories/index.jsx`

    -   倉庫列表顯示（表格格式）
    -   支援新增、編輯、刪除、同步操作
    -   分頁支援
    -   狀態顯示（Active/Inactive）
    -   最後同步時間顯示

-   **新增/編輯對話框**: `packages/ui/src/views/repositories/AddEditRepositoryDialog.jsx`
    -   Repository 名稱
    -   Repository URL
    -   分支選擇
    -   描述
    -   認證類型（無、Token、SSH）
    -   Active/Inactive 開關

#### 🧭 導航整合

-   **選單項目**: `packages/ui/src/menu-items/dashboard.js`

    -   已新增 "Git Repositories" 選單項目（使用 IconGitBranch 圖示）
    -   權限: `repositories:view`

-   **路由**: `packages/ui/src/routes/MainRoutes.jsx`
    -   路徑: `/repositories`
    -   需要權限驗證

---

## 🚀 如何啟動與測試

### 步驟 1: 安裝依賴

```bash
pnpm install
```

### 步驟 2: 執行資料庫遷移

```bash
# 在 packages/server 目錄下
cd packages/server
pnpm typeorm:migration-run
```

### 步驟 3: 建置專案

```bash
# 回到專案根目錄
cd ../..
pnpm build
```

### 步驟 4: 啟動開發環境

```bash
pnpm dev
```

應用程式會在 http://localhost:8080 啟動

### 步驟 5: 訪問 Repositories 頁面

1. 登入系統
2. 在左側選單找到 "Git Repositories"
3. 點擊進入倉庫管理頁面

---

## 📚 如何自己新增類似功能模組

根據剛才的實作，您可以按照以下步驟新增任何新功能：

### 後端開發步驟：

1. **建立 Entity** (`packages/server/src/database/entities/YourEntity.ts`)

    ```typescript
    import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

    @Entity()
    export class YourEntity {
        @PrimaryGeneratedColumn('uuid')
        id: string

        @Column()
        name: string
        // ... 其他欄位
    }
    ```

2. **定義 Interface** (`packages/server/src/Interface.ts`)

    ```typescript
    export interface IYourEntity {
        id: string
        name: string
        // ... 對應 Entity 的欄位
    }
    ```

3. **註冊 Entity** (`packages/server/src/database/entities/index.ts`)

    ```typescript
    import { YourEntity } from './YourEntity'
    export const entities = {
        // ... 現有 entities
        YourEntity
    }
    ```

4. **建立 Service** (`packages/server/src/services/yourfeature/index.ts`)

    - 實作 CRUD 操作
    - 使用 `getRunningExpressApp().AppDataSource` 存取資料庫

5. **建立 Controller** (`packages/server/src/controllers/yourfeature/index.ts`)

    - 處理 HTTP 請求
    - 驗證權限和輸入
    - 呼叫 Service

6. **建立 Routes** (`packages/server/src/routes/yourfeature/index.ts`)

    - 定義 API 端點
    - 設定權限檢查

7. **註冊路由** (`packages/server/src/routes/index.ts`)

    ```typescript
    import yourfeatureRouter from './yourfeature'
    router.use('/yourfeature', yourfeatureRouter)
    ```

8. **建立 Migration** (`packages/server/src/database/migrations/*/timestamp-YourMigration.ts`)
    - 為每個資料庫類型建立對應的 migration

### 前端開發步驟：

1. **建立 API 層** (`packages/ui/src/api/yourfeature.js`)

    ```javascript
    import client from './client'

    const getAll = (params) => client.get('/yourfeature', { params })
    const create = (body) => client.post('/yourfeature', body)
    // ... 其他操作

    export default { getAll, create /* ... */ }
    ```

2. **建立主頁面** (`packages/ui/src/views/yourfeature/index.jsx`)

    - 使用現有的 UI 元件（MainCard, Table, etc.）
    - 實作列表、新增、編輯、刪除功能

3. **建立對話框** (`packages/ui/src/views/yourfeature/AddEditDialog.jsx`)

    - 表單驗證
    - API 呼叫

4. **加入選單** (`packages/ui/src/menu-items/dashboard.js`)

    ```javascript
    {
        id: 'yourfeature',
        title: 'Your Feature',
        type: 'item',
        url: '/yourfeature',
        icon: icons.IconYourIcon,
        permission: 'yourfeature:view'
    }
    ```

5. **加入路由** (`packages/ui/src/routes/MainRoutes.jsx`)

    ```javascript
    const YourFeature = Loadable(lazy(() => import('@/views/yourfeature')))

    // 在 children 中加入：
    {
        path: '/yourfeature',
        element: (
            <RequireAuth permission={'yourfeature:view'}>
                <YourFeature />
            </RequireAuth>
        )
    }
    ```

---

## 🔧 待實作功能（TODO）

### 1. Git 同步邏輯

目前 `syncRepository` 只是更新 `lastSyncDate`，需要實作：

-   使用 `simple-git` 或類似套件拉取 commits
-   解析 commit 資訊並儲存到 `git_commit` 表
-   處理錯誤和重試邏輯
-   支援認證（Token/SSH）

建議實作位置: `packages/server/src/services/repositories/gitSync.ts`

### 2. Commit 列表頁面

為每個 Repository 建立 commits 列表頁面：

-   路由: `/repositories/:id/commits`
-   顯示該倉庫的所有 commits
-   支援篩選和搜尋

### 3. Chatflow: Commit to Worklog

根據您的藍圖，下一步是建立 chatflow：

-   使用 Flowise UI 建立 Prompt Template
-   輸入: commit 資料（JSON）
-   輸出: 工作日誌描述（業務語言）

建議步驟：

1. 在 Flowise UI 建立新的 Chatflow
2. 加入 Prompt Template Node
3. 連接 OpenAI/LLM Node
4. 測試並調整 prompt
5. 使用 API 呼叫此 chatflow 處理 commits

### 4. 定時任務

實作定時同步 repositories：

-   使用現有的 BullMQ 佇列系統
-   每日/每小時自動同步 active repositories
-   處理同步後的 commits

### 5. 權限管理

確保在 RBAC 系統中加入以下權限：

-   `repositories:view`
-   `repositories:create`
-   `repositories:update`
-   `repositories:delete`

---

## 🎓 學習重點總結

### Flowise 架構模式

```
資料庫 Entity → Interface → Service → Controller → Routes
     ↓
  Migration

前端: API → View Component → Dialog Component → Routes → Menu
```

### 關鍵技術點

1. **TypeORM**: Entity 定義和 Migration
2. **Express**: 路由和中間件
3. **React + Material-UI**: 前端 UI 元件
4. **RBAC**: 權限控制
5. **Workspace 隔離**: 多租戶支援

### 最佳實踐

-   ✅ 所有操作都檢查 workspace 權限
-   ✅ 使用 TypeScript 介面確保型別安全
-   ✅ 前後端分離，API 層明確
-   ✅ 使用現有的 UI 元件保持一致性
-   ✅ Migration 支援所有資料庫類型
-   ✅ 錯誤處理和使用者通知

---

## 📝 下一步建議

1. **測試基本功能**

    - 新增一個測試倉庫
    - 測試編輯、刪除功能
    - 檢查權限控制

2. **實作 Git 同步**

    - 安裝 `simple-git`: `pnpm add simple-git`
    - 建立 Git 同步服務
    - 測試不同認證方式

3. **建立 Commit to Log Chatflow**

    - 在 Flowise UI 設計 prompt
    - 撰寫 commit message 轉換邏輯
    - 整合到同步流程

4. **加入自動化**
    - 定時任務同步 repositories
    - 自動處理新的 commits
    - 生成每日工作日誌

---

## 🐛 故障排除

### Migration 失敗

```bash
# 回退 migration
pnpm typeorm:migration-revert

# 重新執行
pnpm typeorm:migration-run
```

### 權限錯誤

確保您的使用者角色有 `repositories:*` 權限

### 前端頁面空白

1. 檢查瀏覽器 Console 是否有錯誤
2. 確認 API 是否正常回應
3. 檢查路由和選單配置

---

祝您開發順利！如有問題請參考現有的 Variables 或 Tools 模組作為範例。
