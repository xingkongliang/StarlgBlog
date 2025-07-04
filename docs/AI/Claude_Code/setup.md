---
sidebar_position: 3
---

# 设置 Claude Code

> 在您的开发机器上安装、验证和开始使用 Claude Code。

## 系统要求

*   **操作系统**：macOS 10.15+、Ubuntu 20.04+/Debian 10+ 或通过 WSL 的 Windows
*   **硬件**：最低 4GB RAM
*   **软件**：
    *   Node.js 18+
    *   [git](https://git-scm.com/downloads) 2.23+ (可选)
    *   用于 PR 工作流程的 [GitHub](https://cli.github.com/) 或 [GitLab](https://gitlab.com/gitlab-org/cli) CLI (可选)
*   **网络**：需要互联网连接以进行身份验证和 AI 处理
*   **地区**：仅在[支持的国家/地区](https://www.anthropic.com/supported-countries)可用

## 安装和验证

#### 1. 安装 Claude Code
安装 [NodeJS 18+](https://nodejs.org/en/download)，然后运行：

```sh
npm install -g @anthropic-ai/claude-code
```

> **警告：**
> 不要使用 `sudo npm install -g`，因为这可能导致权限问题和安全风险。如果遇到权限错误，请参阅配置 Claude Code 以获取推荐的解决方案。

#### 2. 导航到您的项目
```bash
cd your-project-directory 
```

#### 3. 启动 Claude Code
```bash
claude
```

#### 4. 完成身份验证
Claude Code 提供多种身份验证选项：

1.  **Anthropic Console**：默认选项。通过 Anthropic Console 连接并完成 OAuth 流程。需要在 [console.anthropic.com](https://console.anthropic.com) 上有有效的计费。
2.  **Claude App (使用 Pro 或 Max 套餐)**：订阅 Claude 的 [Pro 或 Max 套餐](https://www.anthropic.com/pricing)，以获得包含 Claude Code 和 Web 界面的统一订阅。在同一地点管理您的帐户，以相同的价格获得更多价值。使用您的 Claude.ai 帐户登录。在启动期间，选择与您的订阅类型匹配的选项。
3.  **企业平台**：将 Claude Code 配置为使用 Amazon Bedrock 或 Google Vertex AI 进行企业部署，并使用您现有的云基础设施。

## 初始化您的项目

对于首次使用的用户，我们建议：

#### 1. 启动 Claude Code
```bash
claude
```

#### 2. 运行一个简单的命令
```
> 总结这个项目
```

#### 3. 生成一个 CLAUDE.md 项目指南
```
/init 
```

#### 4. 提交生成的 CLAUDE.md 文件
要求 Claude 将生成的 CLAUDE.md 文件提交到您的存储库。

## 故障排除

### WSL 安装故障排除

目前，Claude Code 不能直接在 Windows 中运行，而是需要 WSL。

您可能会在 WSL 中遇到以下问题：

**操作系统/平台检测问题**：如果在安装过程中收到错误，WSL 可能正在使用 Windows `npm`。请尝试：

*   在安装前运行 `npm config set os linux`
*   使用 `npm install -g @anthropic-ai/claude-code --force --no-os-check` 安装 (不要使用 `sudo`)

**找不到 Node 错误**：如果在运行 `claude` 时看到 `exec: node: not found`，则您的 WSL 环境可能正在使用 Windows 安装的 Node.js。您可以使用 `which npm` 和 `which node` 进行确认，它们应指向以 `/usr/` 而不是 `/mnt/c/` 开头的 Linux 路径。要解决此问题，请尝试通过您的 Linux 发行版的包管理器或通过 `nvm` 安装 Node。

## 优化您的终端设置

当您的终端配置正确时，Claude Code 的效果最佳。请遵循以下指南以优化您的体验。

**支持的 shell**：

*   Bash
*   Zsh
*   Fish

### 主题和外观

Claude 无法控制您终端的主题。这由您的终端应用程序处理。您可以在入门期间或随时通过 `/config` 命令将 Claude Code 的主题与您的终端匹配。

### 换行符

您有多种方法可以在 Claude Code 中输入换行符：

*   **快速转义**：键入 `\` 后跟 Enter 以创建换行符
*   **键盘快捷键**：在正确配置的情况下按 Option+Enter (Meta+Enter)

要在您的终端中设置 Option+Enter：

**对于 Mac Terminal.app：**

1.  打开设置 → 配置文件 → 键盘
2.  选中“使用 Option 作为 Meta 键”

**对于 iTerm2 和 VSCode 终端：**

1.  打开设置 → 配置文件 → 按键
2.  在“常规”下，将左/右 Option 键设置为“Esc+”

**iTerm2 和 VSCode 用户提示**：在 Claude Code 中运行 `/terminal-setup` 以自动将 Shift+Enter 配置为更直观的替代方案。

### 通知设置

通过正确的通知配置，绝不会错过 Claude 完成任务的时间：

#### 终端铃声通知

启用任务完成时的声音警报：

```sh
claude config set --global preferredNotifChannel terminal_bell
```

**对于 macOS 用户**：不要忘记在系统设置 → 通知 → [您的终端应用] 中启用通知权限。

#### iTerm 2 系统通知

对于任务完成时的 iTerm 2 警报：

1.  打开 iTerm 2 首选项
2.  导航到配置文件 → 终端
3.  启用“静音铃声”和过滤警报 → “发送转义序列生成的警报”
4.  设置您首选的通知延迟

请注意，这些通知特定于 iTerm 2，在默认的 macOS 终端中不可用。

#### 自定义通知挂钩

对于高级通知处理，您可以创建通知挂钩来运行您自己的逻辑。

### 处理大输入

在处理大量代码或长指令时：

*   **避免直接粘贴**：Claude Code 可能难以处理非常长的粘贴内容
*   **使用基于文件的工作流程**：将内容写入文件并要求 Claude 读取它
*   **注意 VS Code 的限制**：VS Code 终端特别容易截断长粘贴

### Vim 模式

Claude Code 支持一部分 Vim 键绑定，可以使用 `/vim` 启用或通过 `/config` 配置。

支持的子集包括：

*   模式切换：`Esc` (到 NORMAL)，`i`/`I`，`a`/`A`，`o`/`O` (到 INSERT)
*   导航：`h`/`j`/`k`/`l`，`w`/`e`/`b`，`0`/`$` `/`^`，`gg`/`G`
*   编辑：`x`，`dw`/`de`/`db`/`dd`/`D`，`cw`/`ce`/`cb`/`cc`/`C`，`.` (重复)
