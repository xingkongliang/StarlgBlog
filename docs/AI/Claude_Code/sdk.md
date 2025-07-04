---
sidebar_position: 16
---

# Claude Code SDK

> 了解如何使用 Claude Code SDK 将 Claude Code 以编程方式集成到您的应用程序中。

Claude Code SDK 支持将 Claude Code 作为子进程运行，从而提供一种构建利用 Claude 功能的 AI 驱动的编码助手和工具的方法。

该 SDK 可用于命令行、TypeScript 和 Python。

## 身份验证

Claude Code SDK 支持多种身份验证方法：

### Anthropic API 密钥

要将 Claude Code SDK 直接与 Anthropic 的 API 结合使用，我们建议创建一个专用的 API 密钥：

1.  在 Anthropic Console 中创建一个 Anthropic API 密钥
2.  然后，设置 `ANTHROPIC_API_KEY` 环境变量。我们建议安全地存储此密钥（例如，使用 Github secret）

### 第三方 API 凭据

该 SDK 还支持第三方 API 提供商：

*   **Amazon Bedrock**：设置 `CLAUDE_CODE_USE_BEDROCK=1` 环境变量并配置 AWS 凭据
*   **Google Vertex AI**：设置 `CLAUDE_CODE_USE_VERTEX=1` 环境变量并配置 Google Cloud 凭据

有关第三方提供商的详细配置说明，请参阅 Amazon Bedrock 和 Google Vertex AI 文档。

## 基本 SDK 用法

Claude Code SDK 允许您在应用程序中以非交互模式使用 Claude Code。

### 命令行

以下是命令行 SDK 的一些基本示例：

```bash
# 运行单个提示并退出（打印模式）
$ claude -p "编写一个计算斐波那契数的函数"

# 使用管道提供 stdin
$ echo "解释这段代码" | claude -p

# 以 JSON 格式输出并附带元数据
$ claude -p "生成一个 hello world 函数" --output-format json

# 在到达时流式传输 JSON 输出
$ claude -p "构建一个 React 组件" --output-format stream-json
```

### TypeScript

TypeScript SDK 包含在 NPM 上的主要 `@anthropic-ai/claude-code` 包中：

```ts
import { query, type SDKMessage } from "@anthropic-ai/claude-code";

const messages: SDKMessage[] = [];

for await (const message of query({
  prompt: "写一首关于 foo.py 的俳句",
  abortController: new AbortController(),
  options: {
    maxTurns: 3,
  },
})) {
  messages.push(message);
}

console.log(messages);
```

TypeScript SDK 接受命令行 SDK 支持的所有参数，以及：

| 参数 | 描述 | 默认值 |
| :--- | :--- | :--- |
| `abortController` | 中止控制器 | `new AbortController()` |
| `cwd` | 当前工作目录 | `process.cwd()` |
| `executable` | 使用哪个 JavaScript 运行时 | 使用 Node.js 运行时为 `node`，使用 Bun 运行时为 `bun` |
| `executableArgs` | 传递给可执行文件的参数 | `[]` |
| `pathToClaudeCodeExecutable` | Claude Code 可执行文件的路径 | `@anthropic-ai/claude-code` 附带的可执行文件 |

### Python

Python SDK 可作为 `claude-code-sdk` 在 PyPI 上获得：

```bash
pip install claude-code-sdk
```

**先决条件：**

*   Python 3.10+
*   Node.js
*   Claude Code CLI: `npm install -g @anthropic-ai/claude-code`

基本用法：

```python
import anyio
from claude_code_sdk import query, ClaudeCodeOptions, Message

async def main():
    messages: list[Message] = []
    
    async for message in query(
        prompt="写一首关于 foo.py 的俳句",
        options=ClaudeCodeOptions(max_turns=3)
    ):
        messages.append(message);
    
    print(messages)

anyio.run(main)
```

Python SDK 通过 `ClaudeCodeOptions` 类接受命令行 SDK 支持的所有参数：

```python
from claude_code_sdk import query, ClaudeCodeOptions
from pathlib import Path

options = ClaudeCodeOptions(
    max_turns=3,
    system_prompt="你是一个乐于助人的助手",
    cwd=Path("/path/to/project"),  # 可以是字符串或 Path
    allowed_tools=["Read", "Write", "Bash"],
    permission_mode="acceptEdits"
)

async for message in query(prompt="你���", options=options):
    print(message)
```

## 高级用法

以下文档以命令行 SDK 为例，但也可与 TypeScript 和 Python SDK 一起使用。

### 多轮对话

对于多轮对话，您可以恢复对话或从最近的会话继续：

```bash
# 继续最近的对话
$ claude --continue

# 继续并提供新的提示
$ claude --continue "现在重构它以获得更好的性能"

# 按会话 ID 恢复特定对话
$ claude --resume 550e8400-e29b-41d4-a716-446655440000

# 以打印模式（非交互式）恢复
$ claude -p --resume 550e8400-e29b-41d4-a716-446655440000 "更新测试"

# 以打印模式（非交互式）继续
$ claude -p --continue "添加错误处理"
```

### 自定义系统提示

您可以提供自定义系统提示来指导 Claude 的行为：

```bash
# 覆盖系统提示（仅适用于 --print）
$ claude -p "构建一个 REST API" --system-prompt "你是一位高级后端工程师。专注于安全性、性能和可维护性。"

# 带有特定要求的系统提示
$ claude -p "创建一个数据库模式" --system-prompt "你是一位数据库架构师。使用 PostgreSQL 最佳实践并包括适当的索引。"
```

您还可以将说明附加到默认系统提示中：

```bash
# 附加系统提示（仅适用于 --print）
$ claude -p "构建一个 REST API" --append-system-prompt "编写代码后，请务必对自己进行代码审查。"
```

### MCP 配置

模型上下文协议 (MCP) 允许您使用来自外部服务器的其他工具和资源来扩展 Claude Code。使用 `--mcp-config` 标志，您可以加载提供专业功能（如数据库访问、API 集成或自定义工具）的 MCP 服务器。

使用您的 MCP 服务器创建一个 JSON 配置文件：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/allowed/files"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-github-token"
      }
    }
  }
}
```

然后将其与 Claude Code 一起使用：

```bash
# 从配置加载 MCP 服务器
$ claude -p "列出项目中的所有文件" --mcp-config mcp-servers.json

# 重要提示：必须使用 --allowedTools 显式允许 MCP 工具
# MCP 工具遵循以下格式：mcp__$serverName__$toolName
$ claude -p "搜索 TODO 注释" \
  --mcp-config mcp-servers.json \
  --allowedTools "mcp__filesystem__read_file,mcp__filesystem__list_directory"

# 使用 MCP 工具处理非交互模式下的权限提示
$ claude -p "部署应用程序" \
  --mcp-config mcp-servers.json \
  --allowedTools "mcp__permissions__approve" \
  --permission-prompt-tool mcp__permissions__approve
```

> **注意：**
> 使用 MCP 工具时，必须使用 `--allowedTools` 标志显式允许它们。MCP 工具名称遵循 `mcp__<serverName>__<toolName>` 的模式，其中：
>
> *   `serverName` 是您 MCP 配置文件中的密钥
> *   `toolName` 是该服务器提供的特定工具
>
> 此安全措施可确保仅在明确允许的情况下才使用 MCP 工具。
>
> 如果您仅指定服务器名称（即 `mcp__<serverName>`），则将允许该服务器的所有工具。
>
> 不支持 Glob 模式（例如 `mcp__go*`）。

### 自定义权限提示工具

或者，使用 `--permission-prompt-tool` 传入一个 MCP 工具，我们将使用该工具来检查用户是否授予模型调用给定工具的权限。当模型调用工具时，会发生以下情况：

1.  我们首先检查权限设置：所有 settings.json 文件，以及传入 SDK 的 `--allowedTools` 和 `--disallowedTools`；如果其中之一允许或拒绝工具调用，我们将继续进行工具调用
2.  否则，我们将调用您在 `--permission-prompt-tool` 中提供的 MCP 工具

`--permission-prompt-tool` MCP 工具被传递了工具名称和输入，并且必须返回一个带有结果的 JSON 字符串化有效负载。有效负载必须是以下之一：

```ts
// 允许工具调用
{
  "behavior": "allow",
  "updatedInput": {...}, // 更新的输入，或者只返回原始输入
}

// 拒绝工具调用
{
  "behavior": "deny",
  "message": "..." // 解释为什么拒绝权限的人类可读字符串
}
```

例如，TypeScript MCP 权限提示工具实现可能如下所示：

```ts
const server = new McpServer({
  name: "Test permission prompt MCP Server",
  version: "0.0.1",
});

server.tool(
  "approval_prompt",
  'Simulate a permission check - approve if the input contains "allow", otherwise deny',
  {
    tool_name: z.string().describe("The tool requesting permission"),
    input: z.object({}).passthrough().describe("The input for the tool"),
  },
  async ({ tool_name, input }) => {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            JSON.stringify(input).includes("allow")
              ? {
                  behavior: "allow",
                  updatedInput: input,
                }
              : {
                  behavior: "deny",
                  message: "Permission denied by test approval_prompt tool",
                }
          ),
        },
      ],
    };
  }
);
```

要使用此工具，请添加您的 MCP 服务器（例如，使用 `--mcp-config`），然后像这样调用 SDK：

```sh
claude -p "..." \
  --permission-prompt-tool mcp__test-server__approval_prompt \
  --mcp-config my-config.json
```

用法说明：

*   使用 `updatedInput` 告知模型权限提示已更改其输入；否则，将 `updatedInput` 设置为原始输入，如上例所示。例如，如果工具向用户显示文件编辑差异并让他们手动编辑差异，则权限提示工具应返回该更新的编辑。
*   有效负载必须是 JSON 字符串化的

## 可用的 CLI 选项

SDK 利用了 Claude Code 中所有可用的 CLI 选项。以下是 SDK 用法的关键选项：

| 标志 | 描述 | 示例 |
| :--- | :--- | :--- |
| `--print`, `-p` | 以非交互模式运行 | `claude -p "query"` |
| `--output-format` | 指定输出格式 (`text`, `json`, `stream-json`) | `claude -p --output-format json` |
| `--resume`, `-r` | 按会话 ID 恢复对话 | `claude --resume abc123` |
| `--continue`, `-c` | 继续最近的对话 | `claude --continue` |
| `--verbose` | 启用详细日志记录 | `claude --verbose` |
| `--max-turns` | 限制非交互模式下的代理轮数 | `claude --max-turns 3` |
| `--system-prompt` | 覆盖系统提示（仅适用于 `--print`） | `claude --system-prompt "Custom instruction"` |
| `--append-system-prompt` | 附加到系统提示（仅适用于 `--print`） | `claude --append-system-prompt "Custom instruction"` |
| `--allowedTools` | 以空格分隔的允许工具列表，或 <br /><br /> 以逗号分隔的允许工具列表的字符串 | `claude --allowedTools mcp__slack mcp__filesystem`<br /><br />`claude --allowedTools "Bash(npm install),mcp__filesystem"` |
| `--disallowedTools` | 以空格分隔的拒绝工具列表，或 <br /><br /> 以逗号分隔的拒绝工具列表的字符串 | `claude --disallowedTools mcp__splunk mcp__github`<br /><br />`claude --disallowedTools "Bash(git commit),mcp__github"` |
| `--mcp-config` | 从 JSON 文件加载 MCP 服务器 | `claude --mcp-config servers.json` |
| `--permission-prompt-tool` | 用于处理权限提示的 MCP 工具（仅适用于 `--print`） | `claude --permission-prompt-tool mcp__auth__prompt` |

有关 CLI 选项和功能的完整列表，请参阅 CLI 参考文档。

## 输出格式

SDK 支持多种输出格式：

### 文本输出（默认）

仅返回响应文本：

```bash
$ claude -p "解释文件 src/components/Header.tsx"
# 输出：这是一个显示...的 React 组件
```

### JSON 输出

返回结构化数据，包括元数据：

```bash
$ claude -p "数据层如何工作？" --output-format json
```

响应格式：

```json
{
  "type": "result",
  "subtype": "success",
  "total_cost_usd": 0.003,
  "is_error": false,
  "duration_ms": 1234,
  "duration_api_ms": 800,
  "num_turns": 6,
  "result": "响应文本在此处...",
  "session_id": "abc123"
}
```

### 流式 JSON 输出

在收到每条消息时流式传输它：

```bash
$ claude -p "构建一个应用程序" --output-format stream-json
```

每个对话都以一个初始的 `init` 系统消息开始，后跟一个用户和助手消息列表，最后是一个带有统计信息的 `result` 系统消息。每条消息都作为单独的 JSON 对象发出。

## 消息模式

从 JSON API 返回的消息严格按照以下模式进行类型化：

```ts
type SDKMessage =
  // 助手消息
  | {
      type: "assistant";
      message: Message; // 来自 Anthropic SDK
      session_id: string;
    }

  // 用户消息
  | {
      type: "user";
      message: MessageParam; // 来自 Anthropic SDK
      session_id: string;
    }

  // 作为最后一条消息发出
  | {
      type: "result";
      subtype: "success";
      duration_ms: float;
      duration_api_ms: float;
      is_error: boolean;
      num_turns: int;
      result: string;
      session_id: string;
      total_cost_usd: float;
    }

  // 当我们达到最大轮数时，作为最后一条消息发出
  | {
      type: "result";
      subtype: "error_max_turns" | "error_during_execution";
      duration_ms: float;
      duration_api_ms: float;
      is_error: boolean;
      num_turns: int;
      session_id: string;
      total_cost_usd: float;
    }

  // 在对话开始时作为第一条消息发出
  | {
      type: "system";
      subtype: "init";
      apiKeySource: string;
      cwd: string;
      session_id: string;
      tools: string[];
      mcp_servers: {
        name: string;
        status: string;
      }[];
      model: string;
      permissionMode: "default" | "acceptEdits" | "bypassPermissions" | "plan";
    };
```

我们很快将以与 JSONSchema 兼容的格式发布这些类型。我们对主要的 Claude Code 包使用语义版本控制来传达对此格式的重大更改。

`Message` 和 `MessageParam` 类型可在 Anthropic SDK 中获得。例如，请参阅 Anthropic TypeScript 和 Python SDK。

## 输入格式

SDK 支持多种输入格式：

### 文本输入（默认）

输入文本可以作为参数提供：

```bash
$ claude -p "解释这段代码"
```

或者输入文本可以通过 stdin 管道传输：

```bash
$ echo "解释这段代码" | claude -p
```

### 流式 JSON 输入

通过 `stdin` 提供的消息流，其中每条消息代表一个用户轮次。这允许在不重新启动 `claude` 二进制文件的情况下进行多轮对话，并允许在模型处理请求时向其提供指导。

每条消息都是一个 JSON“用户消息”对象，遵循与输出消息模式相同的格式。消息使用 [jsonl](https://jsonlines.org/) 格式进行格式化，其中每行输入都是一个完整的 JSON 对象。流式 JSON 输入需要 `-p` 和 `--output-format stream-json`。

目前这仅限于纯文本用户消息。

```bash
$ echo '{"type":"user","message":{"role":"user","content":[{"type":"text","text":"Explain this code"}]}}' | claude -p --output-format=stream-json --input-format=stream-json --verbose
```

## 示例

### 简单脚本集成

```bash
#!/bin/bash

# 运行 Claude 并检查退出代码的简单函数
run_claude() {
    local prompt="$1"
    local output_format="${2:-text}"

    if claude -p "$prompt" --output-format "$output_format"; then
        echo "成功！"
    else
        echo "错误：Claude 失败，退出代码为 $?" >&2
        return 1
    fi
}

# 用法示例
run_claude "编写一个读取 CSV 文件的 Python 函数"
run_claude "优化此数据库查询" "json"
```

### 使用 Claude 处理文件

```bash
# 通过 Claude 处理文件
$ cat mycode.py | claude -p "审查此代码中的错误"

# 处理多个文件
$ for file in *.js; do
    echo "正在处理 $file..."
    claude -p "为此文件添加 JSDoc 注释：" < "$file" > "${file}.documented"
done

# 在管道中使用 Claude
$ grep -l "TODO" *.py | while read file; do
    claude -p "修复此文件中的所有 TODO 项" < "$file"
done
```

### 会话管理

```bash
# 启动会话并捕获会话 ID
$ claude -p "初始化一个新项目" --output-format json | jq -r '.session_id' > session.txt

# 继续同一会话
$ claude -p --resume "$(cat session.txt)" "添加单元测试"
```

## 最佳实践

1.  **使用 JSON 输出格式**以编程方式解析响应：

    ```bash
    # 使用 jq 解析 JSON 响应
    result=$(claude -p "生成代码" --output-format json)
    code=$(echo "$result" | jq -r '.result')
    cost=$(echo "$result" | jq -r '.cost_usd')
    ```

2.  **优雅地处理错误** - 检查退出代码和 stderr：

    ```bash
    if ! claude -p "$prompt" 2>error.log; then
        echo "发生错误：" >&2
        cat error.log >&2
        exit 1
    fi
    ```

3.  **使用会话管理**在多轮对话中维护上下文

4.  **考虑超时**以处理长时间运行的操作：

    ```bash
    timeout 300 claude -p "$complex_prompt" || echo "5 分钟后超时"
    ```

5.  在进行多个请求时，通过在调用之间添加延迟来**遵守速率限制**

## 实际应用

Claude Code SDK 支持与您的开发工作流程进行强大的集成。一个著名的例子是 Claude Code GitHub Actions，它使用 SDK 直接在您的 GitHub 工作流程中提供自动代码审查、PR 创建和问题分类功能。

## 相关资源

*   CLI 用法和控件
*   GitHub Actions 集成
*   常见工作流程