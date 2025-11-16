<!-- markdownlint-disable MD030 -->

<p align="center">
<img src="https://github.com/FlowiseAI/Flowise/blob/main/images/flowise_white.svg#gh-light-mode-only">
<img src="https://github.com/FlowiseAI/Flowise/blob/main/images/flowise_dark.svg#gh-dark-mode-only">
</p>

<div align="center">

# 🧭 工作日誌代理人系統 (Worklog Agent System)

**基於 Flowise 開發的智能工作日誌生成系統**

[![Release Notes](https://img.shields.io/github/release/FlowiseAI/Flowise)](https://github.com/FlowiseAI/Flowise/releases)
[![Discord](https://img.shields.io/discord/1087698854775881778?label=Discord&logo=discord)](https://discord.gg/jbaHfsRVBW)

</div>

---

## 🎯 專案簡介

本專案基於 [Flowise](https://github.com/FlowiseAI/Flowise) 開發，目的是建立一套可自動根據 Git commits 生成每日工作日誌的代理人系統，具備自動化、AI 轉換與格式輸出能力。

### 核心功能

-   ✅ **Git Repositories 管理** - 管理多個 Git 倉庫
-   🚧 **自動同步 Commits** - 定時拉取並儲存 commit 記錄
-   📝 **AI 工作日誌轉換** - 使用 LLM 將技術 commit 轉為業務語言
-   🤖 **智能代理流程** - 多 Agent 協作處理工作日誌生成
-   📊 **人工審閱機制** - 支援 HITL (Human-in-the-Loop)

---

## 📚 文件導航

### 核心文件（依閱讀順序）

1. **[README-0-PROJECT-OVERVIEW.md](./README-0-PROJECT-OVERVIEW.md)** - 📋 專案總覽與架構
2. **[flowise_worklog_roadmap.md](./flowise_worklog_roadmap.md)** - 🗺️ 開發藍圖（短期與長期規劃）
3. **[README-1-BACKEND-FRONTEND-IMPLEMENTATION-GIT-REPOSITORIES.md](./README-1-BACKEND-FRONTEND-IMPLEMENTATION-GIT-REPOSITORIES.md)** - 🛠️ Git Repositories 功能完整實作指南

### 開發階段文件（將陸續建立）

-   **README-2-GIT-SYNC-SERVICE-IMPLEMENTATION.md** - Git 同步服務實作
-   **README-3-CHATFLOW-COMMIT-TO-LOG-DESIGN.md** - Chatflow 設計指南
-   **README-4-AUTOMATION-SCHEDULING-IMPLEMENTATION.md** - 自動化排程實作

---

## 🚀 快速開始

### 環境需求

-   Node.js >= 18.15.0 < 19.0.0 || ^20
-   pnpm (推薦) 或 npm
-   Git

### 安裝步驟

```bash
# 1. Clone 專案
git clone https://github.com/yourusername/flowise-office-automation.git
cd flowise-office-automation

# 2. 安裝依賴
pnpm install

# 3. 執行資料庫遷移
cd packages/server
pnpm typeorm:migration-run

# 4. 建置專案
cd ../..
pnpm build

# 5. 啟動開發環境
pnpm dev
```

應用程式將在 http://localhost:8080 啟動

### 生產環境部署

```bash
pnpm build
pnpm start
```

---

## 📊 當前進度

### ✅ Phase 1: MVP 基礎建設 (已完成)

-   [x] Git Repositories 完整 CRUD 功能
-   [x] 前後端整合與 UI 介面
-   [x] 資料庫 Migration (支援 4 種資料庫)
-   [x] RBAC 權限控制

### 🚧 Phase 2: Git 同步服務 (進行中)

-   [ ] Git 同步邏輯實作
-   [ ] Commits 管理介面

### 📋 Phase 3-5: 待開發

詳見 [flowise_worklog_roadmap.md](./flowise_worklog_roadmap.md)

---

## 🏗️ 技術架構

```
Frontend (React + MUI)
    ↓
Backend API (Express + TypeORM)
    ↓
Database (SQLite/PostgreSQL/MySQL/MariaDB)
    ↓
Flowise Chatflow (LLM Processing)
    ↓
Worklog Output (Markdown/PDF)
```

詳細架構請參考 [README-0-PROJECT-OVERVIEW.md](./README-0-PROJECT-OVERVIEW.md)

---

## 🎓 學習資源

### 新手入門

1. 閱讀 [README-0-PROJECT-OVERVIEW.md](./README-0-PROJECT-OVERVIEW.md) 了解專案結構
2. 跟隨 [README-1-BACKEND-FRONTEND-IMPLEMENTATION-GIT-REPOSITORIES.md](./README-1-BACKEND-FRONTEND-IMPLEMENTATION-GIT-REPOSITORIES.md) 學習如何新增功能

### 原始 Flowise 文件

<h3>Build AI Agents, Visually</h3>
<a href="https://github.com/FlowiseAI/Flowise">
<img width="100%" src="https://github.com/FlowiseAI/Flowise/blob/main/images/flowise_agentflow.gif?raw=true"></a>

## 📚 Table of Contents

-   [⚡ Quick Start](#-quick-start)
-   [🐳 Docker](#-docker)
-   [👨‍💻 Developers](#-developers)
-   [🌱 Env Variables](#-env-variables)
-   [📖 Documentation](#-documentation)
-   [🌐 Self Host](#-self-host)
-   [☁️ Flowise Cloud](#️-flowise-cloud)
-   [🙋 Support](#-support)
-   [🙌 Contributing](#-contributing)
-   [📄 License](#-license)

## ⚡Quick Start

Download and Install [NodeJS](https://nodejs.org/en/download) >= 18.15.0

1. Install Flowise
    ```bash
    npm install -g flowise
    ```
2. Start Flowise

    ```bash
    npx flowise start
    ```

3. Open [http://localhost:3000](http://localhost:3000)

## 🐳 Docker

### Docker Compose

1. Clone the Flowise project
2. Go to `docker` folder at the root of the project
3. Copy `.env.example` file, paste it into the same location, and rename to `.env` file
4. `docker compose up -d`
5. Open [http://localhost:3000](http://localhost:3000)
6. You can bring the containers down by `docker compose stop`

### Docker Image

1. Build the image locally:

    ```bash
    docker build --no-cache -t flowise .
    ```

2. Run image:

    ```bash
    docker run -d --name flowise -p 3000:3000 flowise
    ```

3. Stop image:

    ```bash
    docker stop flowise
    ```

## 👨‍💻 Developers

Flowise has 3 different modules in a single mono repository.

-   `server`: Node backend to serve API logics
-   `ui`: React frontend
-   `components`: Third-party nodes integrations
-   `api-documentation`: Auto-generated swagger-ui API docs from express

### Prerequisite

-   Install [PNPM](https://pnpm.io/installation)
    ```bash
    npm i -g pnpm
    ```

### Setup

1.  Clone the repository:

    ```bash
    git clone https://github.com/FlowiseAI/Flowise.git
    ```

2.  Go into repository folder:

    ```bash
    cd Flowise
    ```

3.  Install all dependencies of all modules:

    ```bash
    pnpm install
    ```

4.  Build all the code:

    ```bash
    pnpm build
    ```

    <details>
    <summary>Exit code 134 (JavaScript heap out of memory)</summary>  
    If you get this error when running the above `build` script, try increasing the Node.js heap size and run the script again:

    ```bash
    # macOS / Linux / Git Bash
    export NODE_OPTIONS="--max-old-space-size=4096"

    # Windows PowerShell
    $env:NODE_OPTIONS="--max-old-space-size=4096"

    # Windows CMD
    set NODE_OPTIONS=--max-old-space-size=4096
    ```

    Then run:

    ```bash
    pnpm build
    ```

    </details>

5.  Start the app:

    ```bash
    pnpm start
    ```

    You can now access the app on [http://localhost:3000](http://localhost:3000)

6.  For development build:

    -   Create `.env` file and specify the `VITE_PORT` (refer to `.env.example`) in `packages/ui`
    -   Create `.env` file and specify the `PORT` (refer to `.env.example`) in `packages/server`
    -   Run:

        ```bash
        pnpm dev
        ```

    Any code changes will reload the app automatically on [http://localhost:8080](http://localhost:8080)

## 🌱 Env Variables

Flowise supports different environment variables to configure your instance. You can specify the following variables in the `.env` file inside `packages/server` folder. Read [more](https://github.com/FlowiseAI/Flowise/blob/main/CONTRIBUTING.md#-env-variables)

## 📖 Documentation

You can view the Flowise Docs [here](https://docs.flowiseai.com/)

## 🌐 Self Host

Deploy Flowise self-hosted in your existing infrastructure, we support various [deployments](https://docs.flowiseai.com/configuration/deployment)

-   [AWS](https://docs.flowiseai.com/configuration/deployment/aws)
-   [Azure](https://docs.flowiseai.com/configuration/deployment/azure)
-   [Digital Ocean](https://docs.flowiseai.com/configuration/deployment/digital-ocean)
-   [GCP](https://docs.flowiseai.com/configuration/deployment/gcp)
-   [Alibaba Cloud](https://computenest.console.aliyun.com/service/instance/create/default?type=user&ServiceName=Flowise社区版)
-   <details>
      <summary>Others</summary>

    -   [Railway](https://docs.flowiseai.com/configuration/deployment/railway)

        [![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/pn4G8S?referralCode=WVNPD9)

    -   [Northflank](https://northflank.com/stacks/deploy-flowiseai)

        [![Deploy to Northflank](https://assets.northflank.com/deploy_to_northflank_smm_36700fb050.svg)](https://northflank.com/stacks/deploy-flowiseai)

    -   [Render](https://docs.flowiseai.com/configuration/deployment/render)

        [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://docs.flowiseai.com/configuration/deployment/render)

    -   [HuggingFace Spaces](https://docs.flowiseai.com/deployment/hugging-face)

        <a href="https://huggingface.co/spaces/FlowiseAI/Flowise"><img src="https://huggingface.co/datasets/huggingface/badges/raw/main/open-in-hf-spaces-sm.svg" alt="HuggingFace Spaces"></a>

    -   [Elestio](https://elest.io/open-source/flowiseai)

        [![Deploy on Elestio](https://elest.io/images/logos/deploy-to-elestio-btn.png)](https://elest.io/open-source/flowiseai)

    -   [Sealos](https://template.sealos.io/deploy?templateName=flowise)

        [![Deploy on Sealos](https://sealos.io/Deploy-on-Sealos.svg)](https://template.sealos.io/deploy?templateName=flowise)

    -   [RepoCloud](https://repocloud.io/details/?app_id=29)

        [![Deploy on RepoCloud](https://d16t0pc4846x52.cloudfront.net/deploy.png)](https://repocloud.io/details/?app_id=29)

      </details>

## ☁️ Flowise Cloud

Get Started with [Flowise Cloud](https://flowiseai.com/).

## 🙋 Support

Feel free to ask any questions, raise problems, and request new features in [Discussion](https://github.com/FlowiseAI/Flowise/discussions).

## 🙌 Contributing

Thanks go to these awesome contributors

<a href="https://github.com/FlowiseAI/Flowise/graphs/contributors">
<img src="https://contrib.rocks/image?repo=FlowiseAI/Flowise" />
</a><br><br>

See [Contributing Guide](CONTRIBUTING.md). Reach out to us at [Discord](https://discord.gg/jbaHfsRVBW) if you have any questions or issues.

[![Star History Chart](https://api.star-history.com/svg?repos=FlowiseAI/Flowise&type=Timeline)](https://star-history.com/#FlowiseAI/Flowise&Date)

## 📄 License

Source code in this repository is made available under the [Apache License Version 2.0](LICENSE.md).
