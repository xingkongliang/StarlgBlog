---
sidebar_position: 8
---

# 斜杠命令

> 在交互式会话期间使用斜杠命令控制 Claude 的行为。

## 内置斜杠命令

| 命令 | 目的 |
| :--- | :--- |
| `/add-dir` | 添加额外的工作目录 |
| `/bug` | 报告错误（将对话发送给 Anthropic） |
| `/clear` | 清除对话历史记录 |
| `/compact [instructions]` | 使用可选的焦点说明压缩对话 |
| `/config` | 查看/修改配置 |
| `/cost` | 显示令牌使用情况统计信息 |
| `/doctor` | 检查您的 Claude Code 安装的健康状况 |
| `/help` | 获取使用帮助 |
| `/init` | 使用 CLAUDE.md 指南初始化项目 |
| `/login` | 切换 Anthropic 帐户 |
| `/logout` | 从您的 Anthropic 帐户注销 |
| `/mcp` | 管理 MCP 服务器连接和 OAuth 身份验证 |
| `/memory` | 编辑 CLAUDE.md 内存文件 |
| `/model` | 选择或更改 AI 模型 |
| `/permissions` | 查看或更新权限 |
| `/pr_comments` | 查看拉取请求评论 |
| `/review` | 请求代码审查 |
| `/status` | 查看帐户和系统状态 |
| `/terminal-setup` | 安装 Shift+Enter 换行键绑定（仅限 iTerm2 和 VSCode） |
| `/vim` | 进入 vim 模式以交替使用插入和命令模式 |

## 自定义斜杠命令

自定义���杠命令允许您将常用提示定义为 Claude Code 可以执行的 Markdown 文件。命令按范围（项目特定或个人）组织，并支持通过目录结构进行命名空间。

### 语法

```
/<prefix>:<command-name> [arguments]
```

#### 参数

| 参数 | 描述 |
| :--- | :--- |
| `<prefix>` | 命令范围（`project` 用于项目特定，`user` 用于个人） |
| `<command-name>` | 从 Markdown 文件名派生的名称（不含 `.md` 扩展名） |
| `[arguments]` | 传递给命令的可选参数 |

### 命令类型

#### 项目命令

存储在您的存储库中并与您的团队共享的命令。

**位置**：`.claude/commands/`
**前缀**：`/project:`

在以下示例中，我们创建 `/project:optimize` 命令：

```bash
# 创建一个项目命令
mkdir -p .claude/commands
echo "分析此代码的性能问题并提出优化建议：" > .claude/commands/optimize.md
```

#### 个人命令

可在您的所有项目中使用的命令。

**位置**：`~/.claude/commands/`
**前缀**：`/user:`

在以下示例中，我们创建 `/user:security-review` 命令：

```bash
# 创建一个个人命令
mkdir -p ~/.claude/commands
echo "审查此代码的安全漏洞：" > ~/.claude/commands/security-review.md
```

### 特性

#### 命���空间

在子目录中组织命令以创建命名空间命令。

**结构**：`<prefix>:<namespace>:<command>`

例如，位于 `.claude/commands/frontend/component.md` 的文件创建命令 `/project:frontend:component`

#### 参数

使用 `$ARGUMENTS` 占位符将动态值传递给命令。

例如：

```bash
# 命令定义
echo '按照我们的编码标准修复问题 #$ARGUMENTS' > .claude/commands/fix-issue.md

# 用法
> /project:fix-issue 123
```

#### Bash 命令执行

在斜杠命令运行之前，使用 `!` 前缀执行 bash 命令。输出包含在命令上下文中。

例如：

```markdown
---
allowed-tools: Bash(git add:*), Bash(git status:*), Bash(git commit:*)
description: 创建一个 git 提交
---

## 上下文

- 当前 git 状态: !`git status`
- 当前 git diff (暂存和未暂存的更改): !`git diff HEAD`
- 当前分支: !`git branch --show-current`
- 最近的提交: !`git log --oneline -10`

## 您的任务

根据以上更改，创建一个 git 提交。
```

#### 文件引用

使用 `@` 前缀在命令中包含文件内容以引用文件。

例如：

```markdown
# 引用特定文件
审查 @src/utils/helpers.js 中的实现

# 引用多个文件
比较 @src/old-version.js 和 @src/new-version.js
```

#### 思考模式

斜杠命令可以通过包含扩展思考关键字来触发扩展思考。

### 文件格式

命令文件支持：

*   **Markdown 格式**（`.md` 扩展名）
*   **YAML frontmatter** 用于元数据：
    *   `allowed-tools`：命令可以使用的工具列表
    *   `description`：命令的简要描述
*   使用 bash 命令 (`!`) 和文件引用 (`@`) 的**动态内容**
*   作为主要内容的**提示说明**

## MCP 斜杠命令

MCP 服务器可以将提示公开为斜杠命令，这些命令在 Claude Code 中可用。这些命令是从连接的 MCP 服务器动态发现的。

### 命令格式

MCP 命令遵循以下模式：

```
/mcp__<server-name>__<prompt-name> [arguments]
```

### 特性

#### 动态发现

当满足以下条件时，MCP 命令会自动可用：

*   MCP 服务器已连接并处于活动状态
*   服务器通过 MCP 协议公开提示
*   在连接期间成功检索到提示

#### 参数

MCP 提示可以接受服务器定义的参数：

```
# 不带参数
> /mcp__github__list_prs

# 带参数
> /mcp__github__pr_review 456
> /mcp__jira__create_issue "错误标题" high
```

#### 命名约定

*   服务器和提示名称已规范化
*   空格和特殊字符变为下划线
*   名称小写以保持一致性

### 管理 MCP 连接

使用 `/mcp` 命令可以：

*   查看所有已配置的 MCP 服务器
*   检查连接状态
*   使用启用 OAuth 的服务器进行身份验证
*   清除身份验证令牌
*   查看每个服务器可用的工具和提示

## 另请参阅

*   交互模式 - 快捷方式、输入模式和交互功能
*   CLI 参考 - 命令行标志和选项
*   设置 - 配置选项
*   内存管理 - 在会话之间管理 Claude 的内存