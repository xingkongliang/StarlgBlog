---
sidebar_position: 7
---

# Claude Code 设置

> 使用全局和项目级设置以及环境变量配置 Claude Code。

Claude Code 提供多种设置来配置其行为以满足您的需求。您可以在使用交互式 REPL 时运行 `/config` 命令来配置 Claude Code。

## 设置文件

`settings.json` 文件是我们通过分层设置配置 Claude Code 的官方机制：

*   **用户设置**在 `~/.claude/settings.json` 中定义，并适用于所有项目。
*   **项目设置**保存在您的项目目录中：
    *   `.claude/settings.json` 用于检入源代码管理并与您的团队共享的设置
    *   `.claude/settings.local.json` 用于未检入的设置，适用于个人偏好和实验。Claude Code 在创建 `.claude/settings.local.json` 时会配置 git 以忽略它。
*   对于 Claude Code 的企业部署，我们还支持**企业托管策略设置**。这些设置优先于用户和项目设置。系统管理员可以将策略部署到 macOS 上的 `/Library/Application Support/ClaudeCode/managed-settings.json` 和 Linux 及 Windows via WSL 上的 `/etc/claude-code/managed-settings.json`。

```JSON 示例 settings.json
{
  "permissions": {
    "allow": [
      "Bash(npm run lint)",
      "Bash(npm run test:*)",
      "Read(~/.zshrc)"
    ],
    "deny": [
      "Bash(curl:*)"
    ]
  },
  "env": {
    "CLAUDE_CODE_ENABLE_TELEMETRY": "1",
    "OTEL_METRICS_EXPORTER": "otlp"
  }
}
```

### 可用设置

`settings.json` 支持多种选项：

| 键 | 描述 | 示例 |
| :--- | :--- | :--- |
| `apiKeyHelper` | 自定义脚本，在 `/bin/sh` 中执行，以生成身份验证值。此值通常作为 `X-Api-Key`、`Authorization: Bearer` 和 `Proxy-Authorization: Bearer` 标头发送给模型请求 | `/bin/generate_temp_api_key.sh` |
| `cleanupPeriodDays` | 本地保留聊天记录的时间（默认为 30 天） | `20` |
| `env` | 将应用于每个会话的环境变量 | `{"FOO": "bar"}` |
| `includeCoAuthoredBy` | 是否在 git 提交和拉取请求中包含 `co-authored-by Claude` 署名行（默认��� `true`） | `false` |
| `permissions` | 有关权限结构，请参见下表。 | |

### 权限设置

| 键 | 描述 | 示例 |
| :--- | :--- | :--- |
| `allow` | 允许工具使用的权限规则数组 | `[ "Bash(git diff:*)" ]` |
| `deny` | 拒绝工具使用的权限规则数组 | `[ "WebFetch", "Bash(curl:*)" ]` |
| `additionalDirectories` | Claude 有权访问的其他工作目录 | `[ "../docs/" ]` |
| `defaultMode` | 打开 Claude Code 时的默认权限模式 | `"allowEdits"` |
| `disableBypassPermissionsMode` | 设置为 `"disable"` 以防止激活 `bypassPermissions` 模式。请参阅托管策略设置 | `"disable"` |

### 设置优先级

设置按优先级顺序应用：

1.  企业策略
2.  命令行参数
3.  本地项目设置
4.  共享项目设置
5.  用户设置

## 环境变量

Claude Code 支持以下环境变量来控制其行为：

> **注意：**
> 所有环境变量也可以在 `settings.json` 中配置。这是一种为每个会话自动设置环境变量，或为整个团队或组织推出一组环境变量的有用方法。

| 变量 | 目的 |
| :--- | :--- |
| `ANTHROPIC_API_KEY` | 作为 `X-Api-Key` 标头发送的 API 密钥，通常用于 Claude SDK（对于交互式使用，请运行 `/login`） |
| `ANTHROPIC_AUTH_TOKEN` | `Authorization` 和 `Proxy-Authorization` 标头的自定义值（您在此处设置的值将以 `Bearer ` 为前缀） |
| `ANTHROPIC_CUSTOM_HEADERS` | 您要添加到请求的自定义标头（格式为 `Name: Value`） |
| `ANTHROPIC_MODEL` | 要使用的自定义模型的名称 |
| `ANTHROPIC_SMALL_FAST_MODEL` | 用于后台任务的 Haiku 级模型的名称 |
| `BASH_DEFAULT_TIMEOUT_MS` | 长时间运行的 bash 命令的��认超时 |
| `BASH_MAX_TIMEOUT_MS` | 模型可以为长时间运行的 bash 命令设置的最大超时 |
| `BASH_MAX_OUTPUT_LENGTH` | bash 输出在被中间截断之前的最大字符数 |
| `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR` | 每个 Bash 命令后返回原始工作目录 |
| `CLAUDE_CODE_API_KEY_HELPER_TTL_MS` | 应刷新凭据的时间间隔（以毫秒为单位）（使用 `apiKeyHelper` 时） |
| `CLAUDE_CODE_MAX_OUTPUT_TOKENS` | 设置大多数请求的最大输出令牌数 |
| `CLAUDE_CODE_USE_BEDROCK` | 使用 Bedrock |
| `CLAUDE_CODE_USE_VERTEX` | 使用 Vertex |
| `CLAUDE_CODE_SKIP_BEDROCK_AUTH` | 跳过 Bedrock 的 AWS 身份验证（例如，使用 LLM 网关时） |
| `CLAUDE_CODE_SKIP_VERTEX_AUTH` | 跳过 Vertex 的 Google 身份验证（例如，使用 LLM 网关时） |
| `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` | 等同于设置 `DISABLE_AUTOUPDATER`、`DISABLE_BUG_COMMAND`、`DISABLE_ERROR_REPORTING` 和 `DISABLE_TELEMETRY` |
| `DISABLE_AUTOUPDATER` | 设置为 `1` 以禁用自动更新程序 |
| `DISABLE_BUG_COMMAND` | 设置为 `1` 以禁用 `/bug` 命令 |
| `DISABLE_COST_WARNINGS` | 设置为 `1` 以禁用成本警告消息 |
| `DISABLE_ERROR_REPORTING` | 设置为 `1` 以选择退出 Sentry 错误报告 |
| `DISABLE_NON_ESSENTIAL_MODEL_CALLS` | 设置为 `1` 以禁用非关键路径（如风格文本）的模型调用 |
| `DISABLE_TELEMETRY` | 设置为 `1` 以选择退出 Statsig 遥测（请注意，Statsig 事件不包括用户数据，如代码、文件路径或 bash 命令） |
| `HTTP_PROXY` | 指定用于网络连接的 HTTP 代理服务器 |
| `HTTPS_PROXY` | 指定用于网络连接的 HTTPS 代理服务器 |
| `MAX_THINKING_TOKENS` | 强制为模型预算进行思考 |
| `MCP_TIMEOUT` | MCP 服务器启动的超时时间（以毫秒为单位） |
| `MCP_TOOL_TIMEOUT` | MCP 工具执行的超时时间（以毫秒为单位） |
| `MAX_MCP_OUTPUT_TOKENS` | MCP 工具响应中允许的最大令牌数（默认为 25000） |

## 配置选项

我们正在将全局配置迁移到 `settings.json`。

`claude config` 将被弃用，取而代之的是 [settings.json](#设置文件)

要管理您的配置，请使用以下命令：

*   列出设置：`claude config list`
*   查看设置：`claude config get <key>`
*   更改设置：`claude config set <key> <value>`
*   推送到设置（对于列表）：`claude config add <key> <value>`
*   从设置中删除（对于列表）：`claude config remove <key> <value>`

默认情况下，`config` 会更改您的项目配置。要管理您的全局配置，请使用 `--global`（或 `-g`）标志。

### 全局��置

要设置全局配置，请使用 `claude config set -g <key> <value>`：

| 键 | 描述 | 示例 |
| :--- | :--- | :--- |
| `autoUpdates` | 是否启用自动更新（默认为 `true`） | `false` |
| `preferredNotifChannel` | 您希望在哪里接收通知（默认为 `iterm2`） | `iterm2`、`iterm2_with_bell`、`terminal_bell` 或 `notifications_disabled` |
| `theme` | 颜色主题 | `dark`、`light`、`light-daltonized` 或 `dark-daltonized` |
| `verbose` | 是否显示完整的 bash 和命令输出（默认为 `false`） | `true` |

## Claude 可用的工具

Claude Code 可以访问一组强大的工具，帮助它理解和修改您的代码库：

| 工具 | 描述 | 需要权限 |
| :--- | :--- | :--- |
| **Agent** | 运行子代理以处理复杂的多步骤任务 | 否 |
| **Bash** | 在您的环境中执行 shell 命令 | ���������� |
| **Edit** | 对特定文件进行有针对性的编辑 | 是 |
| **Glob** | 根据模�������配查找文件 | 否 |
| **Grep** | 在文件内容中搜索模式 | 否 |
| **LS** | 列出文件和目录 | 否 |
| **MultiEdit** | 原子地对单个文件执行多个编辑 | 是 |
| **NotebookEdit** | 修改 Jupyter 笔记本单元格 | 是 |
| **NotebookRead** | 读取并显示 Jupyter 笔记本内容 | 否 |
| **Read** | 读取��件内容 | 否 |
| **TodoRead** | 读取当前会话的任务列表 | 否 |
| **TodoWrite** | 创建和管理结构化任务列表 | 否 |
| **WebFetch** | 从指定 URL 获取内容 | 是 |
| **WebSearch** | 使用域过滤执行 Web 搜索 | 是 |
| **Write** | 创建或覆盖文件 | 是 |

可以使用 `/allowed-tools` 或在[权限设置](#可用设置)中配置权限规则。

### 使用挂钩扩展工具

您可以在任何工具执行之前或之后使用[Claude Code 挂钩](./hooks.md)运行自定��命��。

例如，您可以在 Claude 修改 Python 文件后自动运行 Python 格式化程序，或通过阻止对某些路径的写入操作来防止修改生产配置文件。

## 另请参阅

*   身份和访问管理 - 了解 Claude Code 的权限系统
*   IAM 和访问控制 - �����业策�������管理
*   故障排除 - 常见配置问题的解决方案
