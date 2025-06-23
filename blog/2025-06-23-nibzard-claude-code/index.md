---
slug: nibzard-claude-code
title: 精通 Claude 编码：Boris Cherny 的指南与速查表 - 日志 - nibzard
authors: [jay]
tags: [ai]
---

原文地址 [www.nibzard.com](https://www.nibzard.com/claude-code/)

> Boris Cherny 关于 Claude Code 演讲的总结和速查表：设置、工作流程、工具和技巧。

**Claude Code** 是一个强大、灵活的**终端优先 AI 编程助手**，旨在与现有开发者工作流程和工具深度集成。

有效使用涉及理解其代理性质，提供丰富的上下文，并学会通过提示和配置来指导其工具使用。其功能正在不断扩展，特别是通过 [SDK](https://docs.anthropic.com/en/docs/claude-code/sdk?utm_source=nibzard.com) 进行程序化访问和脚本编写。

这是 [Boris Cherny](https://x.com/bcherny?utm_source=nibzard.com) 关于["30 分钟掌握 Claude Code"](https://www.youtube.com/watch?v=6eBSHbLKuN0&utm_source=nibzard.com)演讲的详细总结。

<!-- truncate -->

注意：从 Youtube 录音自动生成。

## 安装
------------

开始之前，您需要全局安装 Claude Code：

```
npm install -g @anthropic-ai/claude-code

```

安装完成后，您可以在终端中运行 `claude` 来启动 Claude Code。

### I. 优化您的设置（初始配置）
------------------------------------------------

*   **`/allowed-tools`**：自定义 Claude 可以使用的工具权限（例如，Git、Bash、文件系统操作），以避免对常用工具的重复确认提示。
*   **`/terminal-setup`**：启用诸如 Shift+Enter 在提示中换行等功能，使多行输入更容易。
*   **`/theme`**：设置您偏好的配色方案（亮色、暗色、色盲友好的 Daltonize）。
*   **`/install-github-app`**：与 GitHub 集成，允许您在问题或 PR 上标记 `@claude`，然后 Claude Code 可以对其进行操作。
*   **`/config`**：管理各种设置，包括打开/关闭通知。
*   **macOS 听写**：可以在系统设置中启用，用于提示的语音转文本输入，对于较长或更复杂的指令很有用。

### II. 入门：代码库问答
---------------------------------

*   **新用户最简单的开始方式。**
*   **强大的入职工具：** Anthropic 使用它来显著减少新员工的技术入职时间（从几周到 2-3 天）。
*   **工作原理：** 询问关于您代码库的问题。Claude 在本地探索代码来回答。
*   **问答示例提示：**
    *   "如何使用 `@RoutingController.py`？"
    *   "如何创建新的 `@app/services/ValidationTemplateFactory`？"
    *   "为什么 `recoverFromException` 需要这么多参数？查看 git 历史来回答。"（Claude 可以使用 Git 工具）
    *   "我们为什么通过在 `@src/login.ts` API 中添加 if/else 来修复问题 `#18383`？"
    *   "我们在哪个版本中发布了新的 `@api/ext/PreHooks.php` API？"
    *   "查看 PR `#9383`，然后仔细验证哪些应用版本受到了影响。"
    *   "我上周发布了什么？"（Claude 可以查看您用户的 Git 日志）
*   **技巧 #1：** 使用代码库问答来熟悉 Claude Code 的功能。
*   **技巧 #2：** 练习提示。这有助于您理解 Claude Code 立即"理解"什么，以及什么需要更具体的指令或上下文。

1.  **内置工具：** Claude Code 开箱即用地提供十几种工具，包括：
    *   Bash（用于运行 shell 命令）
    *   文件搜索、文件列表、文件读取、文件写入
    *   网络获取和搜索
    *   TODO 管理
    *   子代理（用于更复杂的多步骤任务）
2.  **引导 Claude 使用工具（示例提示）：**
    *   "为问题 `#8732` 提出几个修复方案，然后实施我选择的那个。"
    *   "识别 `@app/tests/signupTest.ts` 中未涵盖的边缘情况，然后更新测试来覆盖这些。_think hard_。"（"think hard" 可以鼓励更彻底的推理）。
    *   "commit, push, pr"（Claude 学会解释的标准 Git 工作流程的常见简写咒语）。
    *   "使用 3 个并行代理来头脑风暴如何清理 `@services/aggregator/feed_service.cpp` 的想法。"
3.  **迭代工作流程：**
    *   **探索 -> 计划 -> 确认 -> 编码 -> 提交：** 适用于复杂更改。
    *   **编写测试 -> 提交 -> 编码 -> 迭代 -> 提交：** 测试驱动开发（TDD）方法。
    *   **编写代码 -> 截图结果（例如，使用 Puppeteer/iOS 模拟器）-> 迭代：** 对 UI 开发有用。如果 Claude 有检查其工作的方法（例如，将截图与模拟比较），它可以基于视觉反馈进行迭代。
4.  **技巧 #3：教 Claude 使用_您的_团队工具。**
    *   如果您的团队有自定义 CLI 或脚本，告诉 Claude 关于它们："使用 `barley` CLI 检查最后一次训练运行中的错误日志。使用 `-h` 查看如何使用它。"
5.  **技巧 #4：根据任务调整工作流程。** 不同的任务受益于不同的方法（计划、TDD、视觉迭代）。

### IV. 为 Claude 提供上下文
-------------------------

*   **更多上下文 = 更好的性能：** Claude 拥有的相关信息越多，其响应和操作就越好。
*   **提供上下文的方法：**
    *   **`CLAUDE.md` 文件：** Claude 自动读取的特殊 Markdown 文件。
        *   `/<enterprise root>/CLAUDE.md`：跨组织所有项目共享（企业策略）。
        *   `~/.claude/CLAUDE.md`：用户特定的全局上下文，跨所有项目共享。
        *   `<project-root>/CLAUDE.md`：项目特定上下文，检入版本控制（Git）。
        *   `<project-root>/CLAUDE.local.md`：项目特定本地上下文，_不_检入 Git（用于本地覆盖、秘密或临时笔记）。
    *   **斜杠命令：** 在 `.claude/commands/` 内的 `.md` 文件中定义的自定义命令（在用户主目录或项目根目录中）。
        *   示例：`~/.claude/commands/foo.md` 可以用 `/user:foo` 调用。
        *   `claude-code` 仓库本身有像 `/label-github-issues.md` 这样的示例。
    *   **@提及文件/文件夹：** 输入 `@` 后跟文件或文件夹路径（例如，`@src/components/Button.tsx` 或 `@app/tests/`）将其内容拉入当前会话的上下文。
*   **技巧 #5：** 您给 Claude 的上下文越多，它就越聪明。
*   **技巧 #6：** 花时间_调优_您的上下文。考虑它是供个人使用还是团队使用，以及它应该自动加载（例如，在 `CLAUDE.md` 中）还是懒加载（通过 @提及或斜杠命令）。为了效率，保持 `CLAUDE.md` 简洁。

### V. 键盘绑定和 UI 技巧
------------------------

*   **Shift+Tab：** 自动接受编辑。Bash 命令仍需要明确批准，但文件编辑可以自动接受。
*   **`#`（井号）：** 创建记忆。当前交互或摘要将添加到相关的 `CLAUDE.md` 文件中。
*   **`!`（感叹号）：** 进入 Bash 模式。允许您在本地运行 shell 命令。命令及其输出将添加到 Claude 的上下文中。
*   **`@`（@符号）：** 将文件或文件夹添加到当前会话的上下文中。
*   **`Esc`：** 取消 Claude 正在执行的当前操作。
*   **`Double-Esc`：** 跳回历史。然后您可以使用 `--resume` 继续之前的会话。
*   **`Ctrl+R`：** 显示详细输出。这揭示了 Claude 的"思考过程"，包括它正在考虑或使用的工具。
*   **`/vibe`**（观众提及，演讲者跳过）。

### VI. 脚本化 Claude：Claude Code SDK
-------------------------------------

*   提供对 Claude Code 功能的程序化、低级访问。
*   **使用案例：**
    *   CI/CD 管道
    *   非交互式上下文（例如，计划任务）
    *   自动化任务
    *   更复杂交互式应用程序的构建块。
*   **当前支持：**
    *   CLI 工具（用 TypeScript 编写）。
    *   Python SDK "即将推出"。
*   **CLI 使用示例：**
    
    ```
    $ claude -p \
    "我这周做了什么？" \
    --allowedTools Bash(git log:*) \
    --output-format json
    
    ```
    
    *   这运行一个提示，仅允许 `git log` Bash 命令，并将结果输出为 JSON。
*   **Unix 实用程序哲学：** 可以通过管道传入和传出，例如：
    
    ```
    $ git status | claude -p "我的更改是什么？" --output-format=json | jq '.result'
    
    ```
    

### VII. 多 Claude（并行运行会话）
------------------------------------------------

*   高级用户经常同时运行多个 Claude Code 会话用于不同的任务或仓库。
*   **方法：**
    *   在单独的终端选项卡中多次检出仓库。
    *   使用 Git worktrees 进行分支隔离的单次检出。
    *   SSH 会话结合 TMUX 来管理多个远程 Claude 实例。
    *   GitHub Actions 并行启动 Claude Code 作业用于 CI/自动化。