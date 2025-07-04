---
sidebar_position: 14
---

# 有效管理成本

> 了解如何在使用 Claude Code 时跟踪和优化令牌使用和成本。

Claude Code 每次交互都会消耗令牌。平均成本为每位开发人员每天 6 美元，90% 的用户每日成本低于 12 美元。

对于团队使用，Claude Code 按 API 令牌消耗收费。平均而言，使用 Sonnet 4 的 Claude Code 每位开发人员每月花费约 50-60 美元，但根据用户运行的实例数量以及是否在自动化中使用它，差异很大。

## 跟踪您的成本

*   使用 `/cost` 查看当前会话的使用情况
*   **Anthropic Console 用户**：
    *   在 Anthropic Console 中查看[历史使用情况](https://support.anthropic.com/en/articles/9534590-cost-and-usage-reporting-in-console)（需要管理员或计费角色）
    *   为 Claude Code 工作区设置[工作区支出限制](https://support.anthropic.com/en/articles/9796807-creating-and-managing-workspaces)（需要管理员角色）
*   **Pro 和 Max 套餐用户**：使用情况包含在您的订阅中

## 为团队管理成本

使用 Anthropic API 时，您可以限制 Claude Code 工作区的总支出。要进行配置，请[按照这些说明操作](https://support.anthropic.com/en/articles/9796807-creating-and-managing-workspaces)。管理员可以[按照这些说明](https://support.anthropic.com/en/articles/9534590-cost-and-usage-reporting-in-console)查看成本和使用情况报告。

在 Bedrock 和 Vertex 上，Claude Code 不会从您的云端发送指标。为了获取成本指标，几家大型企业报告说他们使用 LiteLLM，这是一个开源工具，可帮助公司[按密钥跟踪支出](https://docs.litellm.ai/docs/proxy/virtual_keys#tracking-spend)。该项目与 Anthropic 无关，我们尚未对其进行安全审核。

## 减少令牌使用

*   **压缩对话：**

    *   当上下文超过 95% 的容量时，Claude 默认使用自动压缩
    *   切换自动压缩：运行 `/config` 并导航到“启用自动压缩”
    *   当上下文变大时手动使用 `/compact`
    *   添加自定义说明：`/compact 关注代码示例和 API 用法`
    *   通过添加到 CLAUDE.md 来自定义压缩：

        ```markdown
        # 摘要说明

        当您使用压缩时，请关注测试输出和代码更改
        ```

*   **编写具体查询：** 避免触发不必要扫描的模糊请求

*   **分解复杂任务：** 将大型任务分解为集中的交互

*   **在��务之间清除历史记录：** 使用 `/clear` 重���上下文

成本可能会因以下因素而有很大差异：

*   正在分析的代码库的大小
*   查询的复杂性
*   正在搜索或修改的文件数量
*   对话历史的长度
*   压缩对话的频率
*   后台进程（haiku 生成、对话摘要）

## 后台令牌使用

即使在空闲时，Claude Code 也会为某些后台功能使用令牌：

*   **Haiku 生成**：您键入时出现的简短创意消息（每天约 1 美分）
*   **对话摘要**：为 `claude --resume` 功能摘要先前对话的后台作业
*   **命令处理**：某些命令（如 `/cost`）可能会生成请求以检查状态

即使没有主动交互，这些后台进程也会消耗少量令牌（通常每个会话低于 0.04 美元）。

> **注意：**
> 对于团队部署，我们建议在更广泛推广之前，先从一个小型试点小组开始，以建立使用模式。
