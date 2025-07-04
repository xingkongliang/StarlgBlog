---
sidebar_position: 4
---

# 管理 Claude 的记忆

了解如何通过不同的记忆位置和最佳实践来管理 Claude Code 在不同会话中的记忆。

Claude Code 可以记住您在不同会话中的偏好，例如样式指南和工作流程中的常用命令。

### 确定记忆类型

Claude Code 提供三种记忆位置，每种都有不同的用途：

| 记忆类型 | 位置 | 目的 | 用例示例 |
| :--- | :--- | :--- | :--- |
| **项目记忆** | `./CLAUDE.md` | 团队共享的项目说明 | 项目架构、编码标准、通用工作流程 |
| **用户记忆** | `~/.claude/CLAUDE.md` | 所有项目的个人偏好 | 代码样式偏好、个人工具快捷方式 |
| **项目记忆 (本地)** | `./CLAUDE.local.md` | 个人项目特定偏好 | *（已弃用，见下文）* 您的沙箱 URL、首选测试数据 |

所有记忆文件在启动时都会自动加载到 Claude Code 的上下文中。

### CLAUDE.md 导入

`CLAUDE.md` 文件可以使用 `@path/to/import` 语法导入其他文件。以下示例导入了 3 个文件：

```markdown
参见 @README 了解项目概述，@package.json 了解此项目可用的 npm 命令。

# 附加说明
- git workflow @docs/git-instructions.md
```

允许使用相对路径和绝对路径。特别是，导入用户主目录中的文件是团队成员提供未检入存储库的个人说明的便捷方式。以前 `CLAUDE.local.md` 也用于类似目的，但现在已弃用，推荐使用导入，因为它们在多个 git 工作树中效果更好。

```markdown
# 个人偏好
- @~/.claude/my-project-instructions.md
```

为避免潜在冲突，不会在 Markdown 代码段和代码块内评估导入。

```
这个代码段不会被视为导入：`@anthropic-ai/claude-code`
```

导入的文件可以递归导入其他文件，最大深度为 5 跳。您可以通过运行 `/memory` 命令查看加载了哪些记忆文件。

### Claude 如何查找记忆

Claude Code 递归读取记忆：从当前工作目录开始，Claude Code 向上递归到（但不包括）根目录 `/` 并读取它找到的任何 `CLAUDE.md` 或 `CLAUDE.local.md` 文件。这在处理大型存储库时特别方便，当您在 `foo/bar/` 中运行 Claude Code，并且在 `foo/CLAUDE.md` 和 `foo/bar/CLAUDE.md` 中都有记忆时。

Claude 还将发现在您当前工作目录下嵌套在子树中的 `CLAUDE.md`。它们不会在启动时加载，而仅在 Claude 读取这些子树中的文件时才包含���内。

### 使用 `#` 快捷方式快速添加记忆

添加记忆的最快方法是以 `#` 字符开始您的输入：

```
# 总是使用描述性的变量名
```

系统将提示您选择要将此记忆存储在哪个记忆文件中。

### 使用 `/memory` 直接编辑记忆

在会话期间使用 `/memory` 斜杠命令可以在您的系统编辑器中打开任何记忆文件，以进行更广泛的添加或组织。

### 设置项目记忆

假设您想设置一个 `CLAUDE.md` 文件来存储重要的项目信息、约定和常用命令。

使用以下命令为您的代码库引导一个 `CLAUDE.md`：

```
> /init 
```

**提示:**

*   包含常用命令（构建、测试、lint）以避免重复搜索。
*   记录代码样式偏好和命名约定。
*   添加特定于您项目的重要架构模式。
*   `CLAUDE.md` 记忆既可用于与团队共享的说明，也可用于您的个人偏好。

### 记忆最佳实践

*   **具体**：“使用 2 空格缩进”比“正确格式化代码”更好。
*   **使用结构来组织**：将每个单独的记忆格式化为项目符号，并将相关的记忆分组在描述性的 markdown 标题下。
*   **定期审查**：随着项目的发展更新记忆，以确保 Claude 始终使用最新的信息和上下文。
