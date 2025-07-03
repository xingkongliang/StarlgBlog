---
sidebar_position: 6
---

# Hooks

> 通过注册 shell 命令来自定义和扩展 Claude Code 的行为

# 简介

Claude Code 挂钩是用户定义的 shell 命令，在 Claude Code生命周期的不同点执行。挂钩对 Claude Code 的行为提供确定性控制，确保某些操作总是发生，而不是依赖 LLM 选择运行它们。

用例示例包括：

*   **通知**：自定义 Claude Code 等待您输入或请求运行权限时的通知方式。
*   **自动格式化**：每次文件编辑后，在 .ts 文件上运行 `prettier`，在 .go 文件上运行 `gofmt` 等。
*   **日志记录**：跟踪和计数所有已执行的命令，以进行合规性或调试。
*   **反馈**：当 Claude Code 生成不符合您代码库约定的代码时，提供自动反馈。
*   **自定义权限**：阻止对生产文件或敏感目录的修改。

通过将这些规则编码为挂钩而不是提示说明，您可以将建议转化为在每次预期运行时都会执行的应用程序级代码。

> **警告：**
> 挂钩在未经确认的情况下以您的完全用户权限执行 shell 命令。您有责任确保您的挂钩是安全可靠的。Anthropic 对因使用挂钩而导致的任何数据丢失或系统损坏概不负责。请查看[安全注意事项](#security-considerations)。

## 快速入门

在本快速入门中，您将添加一个挂钩，用于记录 Claude Code 运行的 shell 命令。

快速入门先决条件：安装 `jq` 以在命令行中处理 JSON。

### 第 1 步：打开挂钩配置

运行 `/hooks` [斜杠命令](/en/docs/claude-code/slash-commands)并选择 `PreToolUse` 挂钩事件。

`PreToolUse` 挂钩在工具调用之前运行，可以阻止它们，同时向 Claude 提供有关如何进行不同操作的反馈。

### 第 2 步：添加匹配器

选择 `+ 添加新匹配器…` 以仅在 Bash 工具调用上运行您的挂钩。

为匹配器键入 `Bash`。

### 第 3 步：添加挂钩

选择 `+ 添加新挂钩…` 并输入此命令：

```bash
jq -r '"\(.tool_input.command) - \(.tool_input.description // "No description")"' >> ~/.claude/bash-command-log.txt
```

### 第 4 步：保存您的配置

对于存储位置，选择 `用户设置`，因为您要记录到您的主目录。此挂钩将适用于所有项目，而不仅仅是当前项目。

然后按 Esc 直到返回 REPL。您的挂钩现已注册！

### 第 5 步：验证您的挂钩

再次运行 `/hooks` 或检查 `~/.claude/settings.json` 以查看您的配置：

```json
"hooks": {
  "PreToolUse": [
    {
      "matcher": "Bash",
      "hooks": [
        {
          "type": "command",
          "command": "jq -r '\"\\(.tool_input.command) - \\(.tool_input.description // \"No description\")\"' >> ~/.claude/bash-command-log.txt"
        }
      ]
    }
  ]
}
```

## 配置

Claude Code 挂钩在您的[设置文件](/en/docs/claude-code/settings)中配置：

*   `~/.claude/settings.json` - 用户设置
*   `.claude/settings.json` - 项目设置
*   `.claude/settings.local.json` - 本地项目设置（未提交）
*   企业托管策略设置

### 结构

挂钩按匹配器组织，每个匹配器可以有多个挂钩：

```json
{
  "hooks": {
    "EventName": [
      {
        "matcher": "ToolPattern",
        "hooks": [
          {
            "type": "command",
            "command": "your-command-here"
          }
        ]
      }
    ]
  }
}
```

*   **matcher**：匹配工具名称的模式（仅适用于 `PreToolUse` 和 `PostToolUse`）
    *   简单字符串精确匹配：`Write` 仅匹配 Write 工具
    *   支持正则表达式：`Edit|Write` 或 `Notebook.*`
    *   如果省略或为空字符串，挂钩将为所有匹配事件运行
*   **hooks**：模式匹配时要执行的命令数组
    *   `type`：目前仅支持 `"command"`
    *   `command`：要执行的 bash 命令
    *   `timeout`：（可选）命令在取消所有正在进行的挂钩之前应运行多长时间（以秒为单位）。

## 挂钩事件

### PreToolUse

在 Claude 创建工具参数之后和处理工具调用之前运行。

**常见匹配器：**

*   `Task` - 代理任务
*   `Bash` - Shell 命令
*   `Glob` - 文件模式匹配
*   `Grep` - 内容搜索
*   `Read` - 文件读取
*   `Edit`, `MultiEdit` - 文件编辑
*   `Write` - 文件写入
*   `WebFetch`, `WebSearch` - Web 操作

### PostToolUse

在工具成功完成后立即运行。

识别与 PreToolUse 相同的匹配器值。

### Notification

在 Claude Code 发送通知时运行。

### Stop

在主 Claude Code 代理完成响应时运行。

### SubagentStop

在 Claude Code 子代理（任务工具调用）完成响应时运行。

## 挂钩输入

挂钩通过 stdin 接收包含会话信息和事件特定数据的 JSON 数据：

```typescript
{
  // Common fields
  session_id: string
  transcript_path: string  // Path to conversation JSON

  // Event-specific fields
  ...
}
```

### PreToolUse 输入

`tool_input` 的确切模式取决于工具。

```json
{
  "session_id": "abc123",
  "transcript_path": "~/.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "/path/to/file.txt",
    "content": "file content"
  }
}
```

### PostToolUse 输入

`tool_input` 和 `tool_response` 的确切模式取决于工具。

```json
{
  "session_id": "abc123",
  "transcript_path": "~/.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "tool_name": "Write",
  "tool_input": {
    "file_path": "/path/to/file.txt",
    "content": "file content"
  },
  "tool_response": {
    "filePath": "/path/to/file.txt",
    "success": true
  }
}
```

### Notification 输入

```json
{
  "session_id": "abc123",
  "transcript_path": "~/.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "message": "Task completed successfully",
  "title": "Claude Code"
}
```

### Stop 和 SubagentStop 输入

当 Claude Code 由于停止挂钩而已经继续时，`stop_hook_active` 为 true。检查此值或处理脚本以防止 Claude Code 无限期运行。

```json
{
  "session_id": "abc123",
  "transcript_path": "~/.claude/projects/.../00893aaf-19fa-41d2-8238-13269b9b3ca0.jsonl",
  "stop_hook_active": true
}
```

## 挂钩输出

挂钩有两种方式将输出返回给 Claude Code。输出传达是否阻止以及应向 Claude 和用户显示的任何反馈。

### 简单：退出代码

挂钩通过退出代码、stdout 和 stderr 传达状态：

*   **退出代码 0**：成功。`stdout` 在脚本模式（CTRL-R）下显示给用户。
*   **退出代码 2**：阻塞错误。`stderr` 被反馈给 Claude 以自动处理。请参阅下面的每个挂钩事件的行为。
*   **其他退出代码**：非阻塞错误。`stderr` 显示给用户，执行继续。

> **警告：**
> 提醒：如果退出代码为 0，Claude Code 不会看到 stdout。

#### 退出代码 2 行为

| 挂钩事件 | 行为 |
| :--- | :--- |
| `PreToolUse` | 阻止工具调用，向 Claude 显示错误 |
| `PostToolUse` | 向 Claude 显示错误（工具已运行） |
| `Notification` | 不适用，仅向用户显示 stderr |
| `Stop` | 阻止停止，向 Claude 显示错误 |
| `SubagentStop` | 阻止停止，向 Claude 子代理显示错误 |

### 高级：JSON 输出

挂钩可以在 `stdout` 中返回结构化的 JSON，以实现更复杂的控制：

#### 通用 JSON 字段

所有挂钩类型都可以包含这些可选字段：

```json
{
  "continue": true, // Claude 是否应在挂钩执行后继续（默认为 true）
  "stopReason": "string" // 当 continue 为 false 时显示的消息
  "suppressOutput": true, // 从脚本模式隐藏 stdout（默认为 false）
}
```

如果 `continue` 为 false，Claude 在运行挂钩后停止处理。

*   对于 `PreToolUse`，这与 `"decision": "block"` 不同，后者仅阻止特定的工具调用并向 Claude 提供自动反馈。
*   对于 `PostToolUse`，这与 `"decision": "block"` 不同，后者向 Claude 提供自动反馈。
*   对于 `Stop` 和 `SubagentStop`，这优先于任何 `"decision": "block"` 输出。
*   在所有情况下，`"continue" = false` 优先于任何 `"decision": "block"` 输出。

`stopReason` 伴随 `continue`，向用户显示原因，不向 Claude 显示。

#### `PreToolUse` 决策控制

`PreToolUse` 挂钩可以控制工具调用是否继续。

*   "approve" 绕过权限系统。`reason` 显示给用户，但不向 Claude 显示。
*   "block" 阻止工具调用执行。`reason` 显示给 Claude。
*   `undefined` 导致现有的权限流程。`reason` 被忽略。

```json
{
  "decision": "approve" | "block" | undefined,
  "reason": "决策的解释"
}
```

#### `PostToolUse` 决策控制

`PostToolUse` 挂钩可以控制工具调用是否继续。

*   "block" 使用 `reason` 自动提示 Claude。
*   `undefined` 不执行任何操作。`reason` 被忽略。

```json
{
  "decision": "block" | undefined,
  "reason": "决策的解释"
}
```

#### `Stop`/`SubagentStop` 决策控制

`Stop` 和 `SubagentStop` 挂钩可以控制 Claude 是否必须继续。

*   "block" 阻止 Claude 停止。您必须填充 `reason` 以便 Claude 知道如何继续。
*   `undefined` 允许 Claude 停止。`reason` 被忽略。

```json
{
  "decision": "block" | undefined,
  "reason": "当 Claude 被阻止停止时必须提供"
}
```

#### JSON 输出示例：Bash 命令编辑

```python
#!/usr/bin/env python3
import json
import re
import sys

# 将验证规则定义为 (正则表达式模式, 消息) 元组列表
VALIDATION_RULES = [
    (
        r"\bgrep\b(?!.*\|)",
        "使用 'rg' (ripgrep) 代替 'grep' 以获得更好的性能和功能",
    ),
    (
        r"\bfind\s+\S+\s+-name\b",
        "使用 'rg --files | rg pattern' 或 'rg --files -g pattern' 代替 'find -name' 以获得更好的性能",
    ),
]


def validate_command(command: str) -> list[str]:
    issues = []
    for pattern, message in VALIDATION_RULES:
        if re.search(pattern, command):
            issues.append(message)
    return issues


try:
    input_data = json.load(sys.stdin)
except json.JSONDecodeError as e:
    print(f"错误：无效的 JSON 输入：{e}", file=sys.stderr)
    sys.exit(1)

tool_name = input_data.get("tool_name", "")
tool_input = input_data.get("tool_input", {})
command = tool_input.get("command", "")

if tool_name != "Bash" or not command:
    sys.exit(1)

# 验证命令
issues = validate_command(command)

if issues:
    for message in issues:
        print(f"• {message}", file=sys.stderr)
    # 退出代码 2 阻止工具调用并向 Claude 显示 stderr
    sys.exit(2)
```

## 使用 MCP 工具

Claude Code 挂钩与[模型上下文协议 (MCP) 工具](/en/docs/claude-code/mcp)无缝协作。当 MCP 服务器提供工具时，它们会以特殊的命名模式出现，您可以在挂钩中匹配该模式。

### MCP 工具命名

MCP 工具遵循 `mcp__<server>__<tool>` 的模式，例如：

*   `mcp__memory__create_entities` - 内存服务器的创建实体工具
*   `mcp__filesystem__read_file` - 文件系统服务器的读取文件工具
*   `mcp__github__search_repositories` - GitHub 服务器的搜索工具

### 为 MCP 工具配置挂钩

您可以针对特定的 MCP 工具或整个 MCP 服务器：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "mcp__memory__.*",
        "hooks": [
          {
            "type": "command",
            "command": "echo '内存操作已启动' >> ~/mcp-operations.log"
          }
        ]
      },
      {
        "matcher": "mcp__.*__write.*",
        "hooks": [
          {
            "type": "command",
            "command": "/home/user/scripts/validate-mcp-write.py"
          }
        ]
      }
    ]
  }
}
```

## 示例

### 代码格式化

在文件修改后自动格式化代码：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "/home/user/scripts/format-code.sh"
          }
        ]
      }
    ]
  }
}
```

### 通知

自定义 Claude Code 请求权限或提示输入变为空闲时发送的通知。

```json
{
  "hooks": {
    "Notification": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "python3 ~/my_custom_notifier.py"
          }
        ]
      }
    ]
  }
}
```

## 安全注意事项

### 免责声明

**使用风险自负**：Claude Code 挂钩会在您的系统上自动执行任意 shell 命令。使用挂钩即表示您承认：

*   您对配置的命令负全部责任
*   挂钩可以修改、删除或访问您的用户帐户可以访问的任何文件
*   恶意或编写不当的挂钩可能导致数据丢失或系统损坏
*   Anthropic 不提供任何保证，也不对因使用挂钩而造成的任何损害承担任何责任
*   您应在生产使用前在安全的环境中彻底测试挂钩

在将任何挂钩命令添加到您的配置之前，请务必审查和理解它们。

### 安全最佳实践

以下是编写更安全挂钩的一些关键实践：

1.  **验证和清理输入** - 切勿盲目信任输入数据
2.  **始终引用 shell 变量** - 使用 `"$VAR"` 而不是 `$VAR`
3.  **阻止路径遍历** - 检查文件路径中的 `..`
4.  **使用绝对路径** - 为脚本指定完整路径
5.  **跳过敏感文件** - 避免 `.env`、`.git/`、密钥等。

### 配置安全

直接编辑设置文件中的挂钩不会立即生效。Claude Code：

1.  在启动时捕获挂钩的快照
2.  在整个会话中使用此快照
3.  如果挂钩被外部修改则发出警告
4.  要求在 `/hooks` 菜单中审查更改才能应用

这可以防止恶意挂钩修改影响您当前的会话。

## 挂钩执行细节

*   **超时**：默认执行限制为 60 秒，可为每个命令配置。
    *   如果任何单个命令超时，所有正在进行的挂钩都将被取消。
*   **并行化**：所有匹配的挂钩并行运行
*   **环境**：在当前目录中以 Claude Code 的环境运行
*   **输入**：通过 stdin 输入 JSON
*   **输出**：
    *   PreToolUse/PostToolUse/Stop：进度显示在脚本中（Ctrl-R）
    *   Notification：仅记录到调试（`--debug`）

## 调试

要对挂钩进行故障排除：

1.  检查 `/hooks` 菜单是否显示您的配置
2.  验证您的[设置文件](/en/docs/claude-code/settings)是否为有效的 JSON
3.  手动测试命令
4.  检查退出代码
5.  审查 stdout 和 stderr 格式期望
6.  确保正确的引号转义
7.  使用 `claude --debug` 调试您的挂钩。成功挂钩的输出如下所示。

```
[DEBUG] Executing hooks for PostToolUse:Write
[DEBUG] Getting matching hook commands for PostToolUse with query: Write
[DEBUG] Found 1 hook matchers in settings
[DEBUG] Matched 1 hooks for query "Write"
[DEBUG] Found 1 hook commands to execute
[DEBUG] Executing hook command: <Your command> with timeout 60000ms
[DEBUG] Hook command completed with status 0: <Your stdout>
```

进度消息显示在脚本模式（Ctrl-R）中，显示：

*   正在运行哪个挂钩
*   正在执行的命令
*   成功/失败状态
*   输出或错误消息
