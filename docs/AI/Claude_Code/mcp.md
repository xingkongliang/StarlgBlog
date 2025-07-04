---
sidebar_position: 9
---

# 模型上下文协议 (MCP)

> 了解如何使用 Claude Code 设置 MCP。

模型上下文协议 (MCP) 是一种开放协议，使 LLM 能够访问外部工具和数据源。有关 MCP 的更多详细信息，请参阅 [MCP 文档](https://modelcontextprotocol.io/introduction)。

> **警告：**
> 使用第三方 MCP 服务器需要您自担风险。请确保您信任 MCP 服务器，并在使用与互联网通信的 MCP 服务器时要特别小心，因为这可能会使您面临提示注入的风险。

## 配置 MCP 服务器

#### 1. 添加 MCP stdio 服务器
```bash
# 基本语法
claude mcp add <name> <command> [args...]

# 示例：添加本地服务器
claude mcp add my-server -e API_KEY=123 -- /path/to/server arg1 arg2
```

#### 2. 添加 MCP SSE 服务器
```bash
# 基本语法
claude mcp add --transport sse <name> <url>

# 示例：添加 SSE 服务器
claude mcp add --transport sse sse-server https://example.com/sse-endpoint

# 示例：添加带有自定义标头的 SSE 服务器
claude mcp add --transport sse api-server https://api.example.com/mcp --header "X-API-Key: your-key"
```

#### 3. 添加 MCP HTTP ���务器
```bash
# 基本语法
claude mcp add --transport http <name> <url>

# 示例：添加可流式传输的 HTTP 服务器
claude mcp add --transport http http-server https://example.com/mcp

# 示例：添加带有身份验证标头的 HTTP 服务器
claude mcp add --transport http secure-server https://api.example.com/mcp --header "Authorization: Bearer your-token"
```

#### 4. 管理您的 MCP 服务器
```bash
# 列出所有已配置的服务器
claude mcp list

# 获取特定服务器的详细信息
claude mcp get my-server

# 删除服务器
claude mcp remove my-server
```

> **提示：**
>
> *   使用 `-s` 或 `--scope` 标志指定配置的存储位置：
>     *   `local` (默认): 仅在当前项目中对您可用（在旧版本中称为 `project`）
>     *   `project`: 通过 `.mcp.json` 文件与项目中的每个人共享
>     *   `user`: 在您的所有项目中对您可用（在旧版本中称为 `global`）
> *   使用 `-e` 或 `--env` 标志设置环境变量 (例如, `-e KEY=value`)
> *   使用 MCP\_TIMEOUT 环境变量配置 MCP 服务器启动超时 (例如, `MCP_TIMEOUT=10000 claude` 设置 10 秒超时)
> *   随时在 Claude Code 中使用 `/mcp` 命令检查 MCP 服务器状态
> *   MCP 遵循客户端-服务器架���，其中 Claude Code (客户端) 可以连接到多个专用服务器
> *   Claude Code 支持 SSE (服务器发送事件) 和可流式传输的 HTTP 服务器以进行实时通信
> *   使用 `/mcp` 对需要 OAuth 2.0 身份验证的远程服务器进行身份验证

## 理解 MCP 服务器范围

MCP 服务器可以在三个不同的范围级别进行配置，每个级别都用于管理服务器可访问性和共享的不同目的。了解这些范围有助于您确定满足特定需求的最佳服务器配置方式。

### 范围层次结构和优先级

MCP 服务器配置遵循明确的优先级层次结构。当同名服务器存在于多个范围时，系统通过首先优先考虑本地范围的服务器，然后是项目范围的服务器，最后是用户范围的服务器来解决冲突。此设计确保在需要时个人配置可以覆盖共享配置。

### 本地范围

本地范围的服务器表示默认配置级别，并存储在您的项目特定的用户设置中。这些服务器对您保持私有，并且仅在当前项目目录中工作时才可访问。此范围非常适合个人开发服务器、实验性配置或包含不应共享的敏感凭据的服务器。

```bash
# 添加本地范围的服务器 (默认)
claude mcp add my-private-server /path/to/server

# 显式指定本地范围
claude mcp add my-private-server -s local /path/to/server
```

### 项目范围

项目范围的服务器通过将配置存储在项目根目录的 `.mcp.json` 文件中来支持团队协作。此文件旨在检入版本控制，以确保所有团队成员都可以访问相同的 MCP 工具和服务。当您添加项目范围的服务器时，Claude Code 会自动使用适当的配置结构创建或更新此文件。

```bash
# 添加项目范围的服务器
claude mcp add shared-server -s project /path/to/server
```

生成的 `.mcp.json` 文件遵循标准化格式：

```json
{
  "mcpServers": {
    "shared-server": {
      "command": "/path/to/server",
      "args": [],
      "env": {}
    }
  }
}
```

出于安全原因，Claude Code 在使用 `.mcp.json` 文件中的项目范围服务器之前会提示批准。如果您需要重置这些批准选择，请使用 `claude mcp reset-project-choices` 命令。

### 用户范围

用户范围的服务器提供跨项目可访问性，使它们在您计算机上的所有项目中都可用，同时对您的用户帐户保持私有。此范围非常适合您在不同项目中经常使用的个人实用程序服务器、开发工具或服务。

```bash
# 添加用户服务�����
claude mcp add my-user-server -s user /path/to/server
```

### 选择正确的范围

根据以下内容选择您的范围：

*   **本地范围**：个人服务器、实验性配置或特定于一个项目的敏感凭据
*   **项目范围**：团队共享服务器、项目特定工具或协作所需的服务
*   **用户范围**：跨多个项目所需的个人实用程序、开发工具或常用服务

## 对远程 MCP 服务器进行身份验证

许多远程 MCP 服务器需要身份验证。Claude Code 支持 OAuth 2.0 身份验证流程，以安全连接到这些服务器。

#### 1. 添加需要身份验证的远程服务器
```bash
# 添加需要 OAuth 的 SSE 或 HTTP 服务器
claude mcp add --transport sse github-server https://api.github.com/mcp
```

#### 2. 使用 /mcp 命令进行身份验证
在 Claude Code 中，使用 `/mcp` 命令管理身份验证：

```
> /mcp
```

这将打开一个交互式菜单，您可以在其中：

*   查看所有服务器的连接状态
*   对需要 OAuth 的服务器进行身份验证
*   清除现有身份验证
*   查看服务器功能

#### 3. 完成 OAuth 流程
当您为服务器选择“身份验证”时：

1.  您的浏览器会自动打开到 OAuth 提供商
2.  在浏览器中完成身份验证
3.  Claude Code 接收并安全地存储访��令��
4.  服务器连接变为活动状态

> **提示：**
>
> *   身份验证令牌���安全存储并自动刷新
> *   在 `/mcp` 菜单中使用“清除身份验证”以撤销访问权限
> *   如果您的浏览器没有自动打开，请复制提供的 URL
> *   OAuth 身份验证适用于 SSE 和 HTTP 传输

## 连接到 Postgres MCP 服务器

假设您想授予 Claude 对 PostgreSQL 数据库的只读访问权限，以进行查询和模式检查。

#### 1. 添加 Postgres MCP 服务器
```bash
claude mcp add postgres-server /path/to/postgres-mcp-server --connection-string "postgresql://user:pass@localhost:5432/mydb"
```

#### 2. 使用 Claude 查询您的数据库
```
> 描述我们用户表的模式
```

```
> 系统中最近的订单是什么？
```

```
> 告诉我客户和发票之间的关系
```

> **提示：**
>
> *   Postgres MCP 服务器为安全起见提供只读访问
> *   Claude 可以帮助您探索数据库结构并运行分析查询
> *   您可以使用它来快速了解不熟悉项目中的数据库模式
> *   确保您的连接字符串使用具有最低所需权限的适当凭据

## 从 JSON 配置添加 MCP 服务器

假设您有一个要添加到 Claude Code 的单个 MCP 服务器的 JSON 配置���

#### 1. 从 JSON 添加 MCP 服务器
```bash
# 基本语法
claude mcp add-json <name> '<json>'

# 示例：使用 JSON 配置添加 stdio 服务器
claude mcp add-json weather-api '{"type":"stdio","command":"/path/to/weather-cli","args":["--api-key","abc123"],"env":{"CACHE_DIR":"/tmp"}}'
```

#### 2. 验证服务器已添加
```bash
claude mcp get weather-api
```

> **提示：**
>
> *   确保 JSON 在您的 shell 中正确转义
> *   JSON 必须符合 MCP 服务器配置模式
> *   您可以使用 `-s global` 将服务器添加到您的全局配置，而不是项目特定的配置

## 从 Claude Desktop 导入 MCP 服务器

假设您已经在 Claude Desktop 中配置了 MCP 服务器，并且希望在 Claude Code 中使用相同的服务器，而无需手动重新配置它们。

#### 1. 从 Claude Desktop 导入服务器
```bash
# 基本语法 
claude mcp add-from-claude-desktop 
```

#### 2. 选择要导入的服务器
运行命令后，您将看到一个交互式对话框，允许您选择要导入的服务器。

#### 3. 验证服务器已导入
```bash
claude mcp list 
```

> **提示：**
>
> *   此功能仅适用于 macOS 和 Windows Subsystem for Linux (WSL)
> *   它从这些平台上的标准��置读取 Claude Desktop 配置文件
> *   使用 `-s global` 标志将服务器添加到您的全局配置
> *   导入的服务器将与 Claude Desktop 中的名称相同
> *   如果已存在同名服务器，它们将获得一个数字后缀（例如，`server_1`）

## 将 Claude Code 用作 MCP 服务器

假设您想将 Claude Code 本身用作其他应用程序可以连接的 MCP 服务器，从而为它们提供 Claude 的工具和功能。

#### 1. 启动 Claude 作为 MCP 服务器
```bash
# 基本语法
claude mcp serve
```

#### 2. 从另一个应用程序连接
您可以从任何 MCP 客户端（例如 Claude Desktop）连接到 Claude Code MCP 服务器。如果您使用的是 Claude Desktop，则可以使用此配置添加 Claude Code MCP 服务器：

```json
{
  "command": "claude",
  "args": ["mcp", "serve"],
  "env": {}
}
```

> **提示：**
>
> *   该服务器提供对 Claude 工具（如查看、编辑、LS 等）的访问
> *   在 Claude Desktop 中，尝试要求 Claude 读取目录中的文件、进行编辑等。
> *   请注意，此 MCP 服务器只是将 Claude Code 的工具公开给您的 MCP 客户端，因此您自己的客户端负责为单个工具调用实现用户确认。

## 使用 MCP 资源

MCP 服务器可以公开您可以���用 @ 提及���用的资源，类似于您引用文件的方式。

### 引用 MCP 资源

#### 1. 列出可用资源
在您的提示中键入 `@` 以查看所有连接的 MCP 服务器中的可用资源。资源与文件一起出现在自动完成菜单中。

#### 2. 引用特定资源
使用 `@server:protocol://resource/path` 格式引用资源：

```
> 你能分析 @github:issue://123 并提出修复建议吗？
```

```
> 请在 @docs:file://api/authentication 查看 API 文档
```

#### 3. 多个资源引用
您可以在单个提示中引用多个资源：

```
> 比较 @postgres:schema://users 和 @docs:file://database/user-model
```

> **提示：**
>
> *   引用时会自动获取资源并将其作为附件包含在内
> *   资源路径可在 @ 提及自动完成中进行模糊搜索
> *   当服务器支持时，Claude Code 会自动提供列出和读取 MCP 资源的工具
> *   资源可以包含 MCP 服务器提供的任何类型的内容（文本、JSON、结构化数据等）

## 使用 MCP 提示作为斜杠命令

MCP 服务器可以公开提示，这些提示在 Claude Code 中可用作斜杠命令。

### 执行 MCP 提示

#### 1. 发现可用提示
键入 `/` 以查看所有可用命令，包括来自 MCP 服务器的命令。MCP 提示以 `/mcp__servername__promptname` 的格式出现。

#### 2. 执行不带参数的提示
```
> /mcp__github__list_prs
```

#### 3. 执行带参数的提示
许多提示接受参数。在命令后用空格分隔它们：

```
> /mcp__github__pr_review 456
```

```
> /mcp__jira__create_issue "登录流程中的错误" high
```

> **提示：**
>
> *   MCP 提示是从连接的服务器动态发现的
> *   参数根据提示的定义参数进行解析
> *   提示结果直接注入到对话中
> *   服务器和提示名称已规范化（空格变为下划线）
