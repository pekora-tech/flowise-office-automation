# 📚 學習範例：Variables 功能分析

## 🎯 目的

通過分析現有的 Variables 功能，學習如何在 Flowise 中新增一個完整的功能模組。

> 注意: 增加項目後，要徹底建置 `npm run build`後才有效，如果直接 `npm run dev` 並不會產生更新。

---

## 📂 檔案結構對照表

### 前端檔案

| 檔案路徑                                                    | 用途            | 關鍵程式碼                  |
| ----------------------------------------------------------- | --------------- | --------------------------- |
| `packages/ui/src/menu-items/dashboard.js`                   | 定義選單項目    | 第 55-60 行                 |
| `packages/ui/src/routes/MainRoutes.jsx`                     | 註冊路由        | 第 34-35 行 + 第 172-178 行 |
| `packages/ui/src/api/variables.js`                          | API 呼叫層      | 完整檔案                    |
| `packages/ui/src/views/variables/index.jsx`                 | 主頁面元件      | 完整檔案                    |
| `packages/ui/src/views/variables/AddEditVariableDialog.jsx` | 新增/編輯對話框 | 完整檔案                    |

### 後端檔案

| 檔案路徑                                             | 用途            | 關鍵程式碼           |
| ---------------------------------------------------- | --------------- | -------------------- |
| `packages/server/src/database/entities/Variable.ts`  | 資料庫實體      | 完整檔案             |
| `packages/server/src/Interface.ts`                   | TypeScript 介面 | 第 141-149 行        |
| `packages/server/src/services/variables/index.ts`    | 業務邏輯        | 完整檔案             |
| `packages/server/src/controllers/variables/index.ts` | 請求處理        | 完整檔案             |
| `packages/server/src/routes/variables/index.ts`      | 路由定義        | 完整檔案             |
| `packages/server/src/routes/index.ts`                | 主路由註冊      | 第 49 行 + 第 117 行 |
| `packages/server/src/enterprise/rbac/Permissions.ts` | 權限定義        | 第 55-60 行          |

---

## 🔍 逐步分析

### Step 1: 選單項目 (Menu Item)

**檔案**: `packages/ui/src/menu-items/dashboard.js`

```javascript
{
    id: 'variables',
    title: 'Variables',
    type: 'item',
    url: '/variables',
    icon: icons.IconVariable,
    breadcrumbs: true,
    permission: 'variables:view'
}
```

**關鍵點**:

-   `id`: 唯一識別碼
-   `url`: 路由路徑
-   `icon`: 使用的圖示
-   `permission`: 必要權限

**對照 Repositories**:

```javascript
{
    id: 'repositories',
    title: 'Git Repositories',
    type: 'item',
    url: '/repositories',
    icon: icons.IconGitBranch,
    breadcrumbs: true,
    permission: 'repositories:view'
}
```

---

### Step 2: 路由註冊 (Routes)

**檔案**: `packages/ui/src/routes/MainRoutes.jsx`

**2.1 Import Component** (第 34-35 行):

```javascript
// variables routing
const Variables = Loadable(lazy(() => import('@/views/variables')))
```

**2.2 註冊路由** (第 172-178 行):

```javascript
{
    path: '/variables',
    element: (
        <RequireAuth permission={'variables:view'}>
            <Variables />
        </RequireAuth>
    )
}
```

**對照 Repositories**:

```javascript
// Import
const Repositories = Loadable(lazy(() => import('@/views/repositories')))

// 路由
{
    path: '/repositories',
    element: (
        <RequireAuth permission={'repositories:view'}>
            <Repositories />
        </RequireAuth>
    )
}
```

✅ **已正確實作**

---

### Step 3: API 層

**檔案**: `packages/ui/src/api/variables.js`

```javascript
import client from './client'

const getAllVariables = (params) => client.get('/variables', { params })
const createVariable = (body) => client.post(`/variables`, body)
const updateVariable = (id, body) => client.put(`/variables/${id}`, body)
const deleteVariable = (id) => client.delete(`/variables/${id}`)

export default {
    getAllVariables,
    createVariable,
    updateVariable,
    deleteVariable
}
```

**對照 Repositories**: ✅ **已正確實作**

---

### Step 4: 主頁面元件

**檔案**: `packages/ui/src/views/variables/index.jsx`

**關鍵結構**:

```javascript
const Variables = () => {
    // 1. State 管理
    const [variables, setVariables] = useState([])
    const [isLoading, setLoading] = useState(true)

    // 2. API 呼叫
    const getAllVariables = useApi(variablesApi.getAllVariables)

    // 3. 載入資料
    useEffect(() => {
        getAllVariables.request()
    }, [])

    // 4. 渲染
    return (
        <MainCard>
            <Table>{/* 資料表格 */}</Table>
        </MainCard>
    )
}
```

**對照 Repositories**: ✅ **已正確實作**

---

### Step 5: 後端路由

**檔案**: `packages/server/src/routes/index.ts`

**Import** (第 49 行):

```javascript
import variablesRouter from './variables'
```

**註冊** (第 117 行):

```javascript
router.use('/variables', variablesRouter)
```

**對照 Repositories**: ✅ **已正確實作**

---

### Step 6: 權限定義

**檔案**: `packages/server/src/enterprise/rbac/Permissions.ts`

```javascript
const variablesCategory = new PermissionCategory('variables')
variablesCategory.addPermission(new Permission('variables:view', 'View'))
variablesCategory.addPermission(new Permission('variables:create', 'Create'))
variablesCategory.addPermission(new Permission('variables:update', 'Update'))
variablesCategory.addPermission(new Permission('variables:delete', 'Delete'))
this.categories.push(variablesCategory)
```

**對照 Repositories**: ✅ **已正確實作**

---

## ✅ Repositories vs Variables 對照檢查表

| 項目       | Variables | Repositories | 狀態 |
| ---------- | --------- | ------------ | ---- |
| 選單項目   | ✅        | ✅           | 完成 |
| 前端路由   | ✅        | ✅           | 完成 |
| API 層     | ✅        | ✅           | 完成 |
| 主頁面     | ✅        | ✅           | 完成 |
| 對話框     | ✅        | ✅           | 完成 |
| Entity     | ✅        | ✅           | 完成 |
| Interface  | ✅        | ✅           | 完成 |
| Service    | ✅        | ✅           | 完成 |
| Controller | ✅        | ✅           | 完成 |
| 後端路由   | ✅        | ✅           | 完成 |
| 權限定義   | ✅        | ✅           | 完成 |
| Migration  | ✅        | ✅           | 完成 |

---

## 🔧 可能的問題排查

### 1. 選單沒顯示

**檢查點**:

-   [ ] 前端有重新建置？(`pnpm build` 或重啟 `pnpm dev`)
-   [ ] 瀏覽器快取清除？(`Ctrl + Shift + R`)
-   [ ] 當前用戶有權限？

**驗證方式**:

```bash
# 1. 重啟開發環境
pnpm dev

# 2. 檢查 Console 有無錯誤
# 開發者工具 > Console
```

### 2. 權限問題

**原因**: 新權限需要重新分配給用戶角色

**解決**:

1. 進入系統設定
2. Roles 管理
3. 給當前角色加上 `repositories:*` 權限
4. 或重新登入

### 3. Migration 錯誤

**已修正**: `timestamp` → `datetime` (SQLite 相容)

**驗證**:

```bash
cd packages/server
pnpm typeorm:migration-run
```

---

## 📝 學習重點總結

### 前端開發流程

```
選單定義 → 路由註冊 → API 層 → UI 元件 → 對話框
```

### 後端開發流程

```
Entity → Interface → Service → Controller → Routes → 權限
```

### 必須同步的地方

1. **權限字串**: 前後端必須一致

    - 前端: `permission={'repositories:view'}`
    - 後端: `checkPermission('repositories:view')`
    - 權限定義: `new Permission('repositories:view', 'View')`

2. **路由路徑**: 前後端必須一致

    - 前端: `/repositories`
    - 後端: `router.use('/repositories', ...)`

3. **API 呼叫**: URL 必須對應

    - 前端: `client.get('/repositories')`
    - 後端: `router.get('/', ...)`

---

## 🎓 下一步學習

1. **研讀 Variables 完整程式碼**

    - 理解 State 管理
    - 理解 useApi Hook
    - 理解表格渲染邏輯

2. **對比 Repositories 程式碼**

    - 找出差異
    - 理解為什麼這樣寫

3. **測試修改**

    - 嘗試改變文字
    - 嘗試增加欄位
    - 觀察變化

---

**最後更新**: 2025-01-16
**用途**: 學習參考
