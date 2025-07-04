---
sidebar_position: 11
---

# CLI 参考

> Claude Code 命令行界面的完整参考，包括命令和标志。

## CLI 命令

| 命令 | 描述 | 示例 |
| :--- | :--- | :--- |
| `claude` | 启动交互式 REPL | `claude` |
| `claude "query"` | 使用初始提示启动 REPL | `claude "解释这个项目"` |
| `claude -p "query"` | 通过 SDK 查询，然后退出 | `claude -p "解释这个函数"` |
| `cat file \| claude -p "query"` | 处理管道内容 | `cat logs.txt \| claude -p "解释"` |
| `claude -c` | 继续最近的对话 | `claude -c` |
| `claude -c -p "query"` | 通过 SDK 继续 | `claude -c -p "检查类型错误"` |
| `claude -r "<session-id>" "query"` | 按 ID 恢复会话 | `claude -r "abc123" "完成此 PR"` |
| `claude update` | 更新到最新版本 | `claude update` |
| `claude mcp` | 配置模型上下文协议 (MCP) 服务器 | 请参阅 Claude Code MCP 文档。 |

## CLI 标志

使用这些命令行标志自定义 Claude Code 的行为：

| 标志 | 描述 | 示例 |
| :--- | :--- | :--- |
| `--add-dir` | 添加 Claude 可访问的其他工作目���（验证每个路径都作为目录存在） | `claude --add-dir ../apps ../lib` |
| `--allowedTools` | 除 settings.json 文件外，应允许无需提示用户权限的工具列表 | `"Bash(git log:*)" "Bash(git diff:*)" "Read"` |
| `--disallowedTools` | 除 settings.json 文件外，应不允许无需提示用户权限的工具列表 | `"Bash(git log:*)" "Bash(git diff:*)" "Edit"` |
| `--print`, `-p` | 在没有交互模式的情况下打印响应（有关编程用法详细信息，请参阅 SDK 文档） | `claude -p "query"` |
| `--output-format` | 指定打印模式的输出格式（选项：`text`、`json`、`stream-json`） | `claude -p "query" --output-format json` |
| `--input-format` | 指定打印模式的输入格式（选项：`text`、`stream-json`） | `claude -p --output-format json --input-format stream-json` |
| `--verbose` | 启用详细日志记录，显示完整的逐轮输出（有助于在打印和交互模式下进行调试） | `claude --verbose` |
| `--max-turns` | 限制非交互模式下的代理轮数 | `claude -p --max-turns 3 "query"` |
| `--model` | 使用最新模型的别名（`sonnet` 或 `opus`）或模型的全名为当前会话设置模型 | `claude --model claude-sonnet-4-20250514` |
| `--permission-mode` | 以指定的权限模式开始 | `claude --permission-mode plan` |
| `--permission-prompt-tool` | 指定一个 MCP 工具来处理非交互模式下的权限提示 | `claude -p --permission-prompt-tool mcp_auth_tool "query"` |
| `--resume` | 按 ID 或在交互模式下选择以恢复特定会话 | `claude --resume abc123 "query"` |
| `--continue` | 加载当前目录中最近的对话 | `claude --continue` |
| `--dangerously-skip-permissions` | 跳过权限提示（请谨慎使用） | `claude --dangerously-skip-permissions` |

> **提示：**
> `--output-format json` 标志对于脚本编写和自动化特别有用，允许您以编程方式解析 Claude 的响应。

有关打印模式 (`-p`) 的详细信息，包括输出格式、流式传输、详细日志记录和编程用法，请参阅 SDK 文档。

## 另请参阅

*   交互模式 - 快捷方式、输入模式和交互功能
*   斜杠命令 - 交互式会话命令
*   快速入门指南 - Claude Code 入门
*   常见工作流程 - 高级工作流程和模式
*   设置 - 配置选项
*   SDK 文档 - 编程用法和集成
