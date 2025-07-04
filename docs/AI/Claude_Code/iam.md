---
sidebar_position: 12
---

# 身份和访问管理

> 了解如何为您的组织中的 Claude Code 配置用户身份验证、授权和访问控制。

## 身份验证方法

设置 Claude Code 需要访问 Anthropic 模型。对于团队，您可以通过以下三种方式之一设置 Claude Code 访问权限：

*   通过 Anthropic Console 的 Anthropic API
*   Amazon Bedrock
*   Google Vertex AI

### Anthropic API 身份验证

**要通过 Anthropic API 为您的团队设置 Claude Code 访问权限：**

1.  使用您现有的 Anthropic Console 帐户或创建一个新的 Anthropic Console 帐户
2.  您可以通过以下任一方法添加用户：
    *   从控制台内部批量邀请用户（控制台 -> 设置 -> 成员 -> 邀请）
    *   设置 SSO
3.  邀请用户时，他们需要以下角色之一：
    *   “Claude Code” 角色意味着用户只能创建 Claude Code API 密钥
    *   “开发人员” 角色意味着用户可以创建任何类型的 API 密钥
4.  每个受邀用户都需要完成以下步骤：
    *   接受控制台邀请
    *   检查系统要求
    *   安装 Claude Code
    *   使用控制台帐户凭据登录

### 云提供商身份验证

**要通过 Bedrock 或 Vertex 为您的团队设置 Claude Code 访问权限：**

1.  遵循 Bedrock 文档或 Vertex 文档
2.  将环境变量和生成云凭据的说明分发给您的用户。在此处阅读有关如何管理配置的更多信息。
3.  用户可以安装 Claude Code

## 访问控制和权限

我们支持细粒度的权限，以便您能够准确指定代理允许做什么（例如运行测试、运行 linter）和不允许做什么（例如更新云基础设施）。这些权限设置可以检入版本控制并分发给您组织中的所有开发人员，也可以由个别开发人员自定义。

### 权限系统

Claude Code 使用分层权限系统来平衡功能和安全性：

| 工具类型 | 示例 | 需要批准 | “是，不再询问” 行为 |
| :--- | :--- | :--- | :--- |
| 只读 | 文件读取、LS、Grep | 否 | 不适用 |
| Bash 命令 | Shell 执行 | 是 | 每个项目目录和命令永久 |
| 文件修改 | 编辑/写入文件 | 是 | 直到��话结束 |

### 配置权限

您可以使用 `/permissions` 查看和管理 Claude Code 的工具权限。此 UI 列出了所有权限规则及其来源的 settings.json 文件。

*   **允许**规则将允许 Claude Code 使用指定的工具，而无需进一步的手动批准。
*   **拒绝**规则将阻止 Claude Code 使用指定的工��。拒绝规则优先于允许规则。
*   **其他目录**将 Claude 的文件访问权限扩展到初始工作目录之外的目录。
*   **默认模式**控制 Claude 在遇到新请求时的权限行为。

权限规则使用以下格式：`Tool(optional-specifier)`

仅为工具名称的规则匹配该工具的任何使用。例如，将 `Bash` 添加到允许规则列表将允许 Claude Code 使用 Bash 工具而无需用户批准。

#### 权限模式

Claude Code 支持多种权限模式，可以在设置文件中设置为 `defaultMode`：

| 模式 | 描述 |
| :--- | :--- |
| `default` | 标准行为 - 首次使用每个工具时提示权限 |
| `acceptEdits` | 自动接受会话的文件编辑权限 |
| `plan` | 计划模式 - Claude 可以分析但不能修改文件或执行命令 |
| `bypassPermissions` | 跳过所有权限提示（在安全的环境中使用 - 请参阅下面的警告） |

#### 工作目录

默认情况下，Claude 可���访问其启动目录中的文件。您可以扩展此访问权限：

*   **��动期间**：使用 `--add-dir <path>` CLI 参数
*   **会话期间**：使用 `/add-dir` 斜杠命令
*   **持久配置**：在设置文件中添加到 `additionalDirectories`

其他目录中的文件遵循与原始工作目录相同的权限规则 - 它们无需提示即可���取，文件编辑权限遵循当前的权限模式。

#### 特定于工具的权限规则

某些工具使用可选说明符进行更细粒度的权限控制。例如，带有 `Bash(git diff:*)` 的允许规则将允许以 `git diff` 开头的 Bash 命令。以下工具支持带有说明符的权限规则：

**Bash**

*   `Bash(npm run build)` 匹配确切的 Bash 命令 `npm run build`
*   `Bash(npm run test:*)` 匹配以 `npm run test` 开头的 Bash 命令。

> **提示：**
> Claude Code 能够识别 shell 运算符（如 `&&`），因此像 `Bash(safe-cmd:*)` 这样的前缀匹配规则不会授予它运行命令 `safe-cmd && other-cmd` 的权限

**读取和编辑**

`Edit` 规则适用于所有编辑文件的内置工具。Claude 将尽力将 `Read` 规则应用于所有读取文件的内置工具，如 Grep、Glob 和 LS。

读取和编辑规则都遵循 gitignore 规范。模式相对于包含 `.claude/settings.json` 的目录进行解析。要引用绝���路径，请使用 `//`。对于相对于您的主目录的路径，请使用 `~/`。

*   `Edit(docs/**)` 匹配对项目 `docs` 目录中文件的编辑
*   `Read(~/.zshrc)` 匹配对您的 `~/.zshrc` 文件的读取
*   `Edit(//tmp/scratch.txt)` 匹配对 `/tmp/scratch.txt` 的编辑

**WebFetch**

*   `WebFetch(domain:example.com)` 匹配对 example.com 的获取请求

**MCP**

*   `mcp__puppeteer` 匹配由 `puppeteer` 服务器（在 Claude Code 中配置的名称）提供的任何工具
*   `mcp__puppeteer__puppeteer_navigate` 匹配由 `puppeteer` 服务器提供的 `puppeteer_navigate` 工具

### 企业托管策略设置

对于 Claude Code 的企业部署，我们支持优先于用户和项目设置的企业托管策略设置。这允许系统管理员强制执行用户无法覆盖的安全策略。

系统管理员可以将策略部署到：

*   **macOS**：`/Library/Application Support/ClaudeCode/managed-settings.json`
*   **Linux 和 Windows (via WSL)**：`/etc/claude-code/managed-settings.json`

这些策略文件遵循与常规设置文件相同的格式，但不能被用户或项目设置覆盖。这确保了在您的组织中实施一致的安全策略。

### 设置优先级

当存在多个��置源时，它们按以下顺序应用（从最高到最低优先级���：

1.  企业策略
2.  命令行参数
3.  本地项目设置 (`.claude/settings.local.json`)
4.  共享项目设置 (`.claude/settings.json`)
5.  用户设置 (`~/.claude/settings.json`)

此层次结构确保始终强制执行组织策略，同时在适当时允许在项目和用户级别具��灵活性。

### 使用挂钩进行其他权限控制

Claude Code 挂钩提���了一种注册自定义 shell 命令以在运行时执行权限评估的方法。当 Claude Code 进行工具调用时，PreToolUse 挂钩在权限系统运行之前运行，挂钩输出可以决定是批准还是拒绝工具调用，以代替权限系统。

## 凭据管理

Claude Code 支持通过 Claude.ai 凭据、Anthropic API 凭据、Bedrock Auth 和 Vertex Auth 进行身份验证。在 macOS 上，API 密钥、OAuth 令牌和其他凭据存储在加密的 macOS 钥匙串中。或者，可以将设置 apiKeyHelper 设置为返回 API 密钥的 shell 脚本。默认情况下，此帮助程序在 5 分钟后或在 HTTP 401 响应时调用；指定环境变量 `CLAUDE_CODE_API_KEY_HELPER_TTL_MS` 定义自定义刷新间隔。