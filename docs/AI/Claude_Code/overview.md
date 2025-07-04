---
sidebar_position: 1
---

# Claude Code 概述

> 了解 Claude Code，这是一款位于您终端中的代理编码工具，可理解您的代码库，并通过自然语言命令帮助您更快地编码。

通过直接与您的开发环境集成，Claude Code 简化了您的工作流程，无需额外的服务器或复杂的设置。

## 基本用法

要安装 Claude Code，请使用 NPM：

```bash
npm install -g @anthropic-ai/claude-code
```

有关更详细的安装说明，请参阅设置 Claude Code。

要运行 Claude Code，只需调用 `claude` CLI：

```bash
claude
```

然后，您可以直接从交互式 Claude Code REPL 会话中提示 Claude。

有关更多用法说明，请参阅快速入门。

## 为什么选择 Claude Code？

### 加速开发

使用 Claude Code 通过以下关键功能加速开发：

*   在您的整个代码库中编辑文件和修复错误
*   回答有关您的代码架构和逻辑的问题
*   执行和修复测试、linting 和其他命令
*   搜索 git 历史记录、解决合并冲突以及创建提交和 PR
*   使用网��搜索浏览文档和资源

Claude Code 提供了一套全面的工具，用于与您的��发环境进行交互，包��文件操作、代码搜索、网页浏览等。了解这些工具有助于您充分利用 Claude Code 的全部功能。

### 设计安全和隐私

您的代码安全至关重要。Claude Code 的架构可确保：

*   **直接 API 连接**：您的查询直接发送到 Anthropic 的 API，无需中间服务器
*   **在您工作的地方工作**：直接在您的终端中操作
*   **理解上下文**：保持对整个项目结构的感知
*   **采取行动**：执行实际操作，如编辑文件和创建提交

### 企业集成

Claude Code 与企业 AI 平台无缝集成。您可以连接到 Amazon Bedrock 或 Google Vertex AI 以进行安全、合规的部署，满足您组织的要求。

## 下一步

*   **设置**: 安装和验证 Claude Code
*   **快速入门**: 通过实际示例了解 Claude Code 的实际应用
*   **命令**: 了解 CLI 命令和控件
*   **配置**: 为您的工作流程自定义 Claude Code

## 其他资源

*   **常见工作流程**: 常见工作流程的分步指南
*   **故障排除**: Claude Code 常见问题的解决方案
*   **Bedrock & Vertex 集成**: 使用 Amazon Bedrock 或 Google Vertex AI 配置 Claude Code
*   **参考实现**: 克隆我们的开发容器参考实现。
