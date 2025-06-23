---
slug: cursor_with_claude
title: How Cursor is building the future of AI coding with Claude
authors: [jay]
tags: [ai]
---

import ReactPlayer from 'react-player'

# Cursor 如何利用 Claude 构建 AI 编码的未来

<ReactPlayer controls url='https://www.youtube.com/watch?v=BGgsoIgbT_Y' />

## 来源介绍

本次对话内容摘自 **Anthropic YouTube 频道**上发布的视频 **“How Cursor is building the future of AI coding with Claude”** (Cursor 如何利用 Claude 构建 AI 编码的未来) 的文字记录。

该视频汇集了来自 Anthropic 的 **Alex**（负责 Claude 关系）以及来自 Cursor 的 **Lukas**（从事代理系统）、**Aman**（创始人之一，负责机器学习和检索）和 **Jacob Jackson**（从事机器学习）等专家，共同探讨了 Cursor 如何利用 Anthropic 的 Claude 模型来革新 AI 编码领域。

<!-- truncate -->

## 对话内容总结

### Cursor 的发展与 Claude 模型的应用

*   Cursor 是一家在 AI 编码领域迅速发展的公司，仅一年多时间营收已达 **3 亿美元**，并拥有数百万开发者用户。
*   Cursor 的成功部分归因于其能够弥补当前语言模型在编码方面的不足，并利用其功能拉近了这一差距。
*   **Claude 3.5 Sonnet** 的出现是 Cursor 发展中的一个“阶梯式”进步，它极大地提升了模型的编程能力。
*   Cursor 将 3.5 Sonnet 的智能与自定义检索模型相结合，实现了 **多文件编辑** 功能，这被认为是 Cursor 获得大规模采用的关键突破。
*   Cursor 团队通过不断地摸索和尝试，利用模型质量的提升以及工具使用等新功能，实现了更强大的 **代理式编码**。

### Cursor 内部的自反馈循环

*   Cursor 团队通过 **使用 Cursor 来构建 Cursor** 自身，形成了一个“自改进的递归反馈循环”。
*   这种内部使用的方式使得团队能够快速迭代新功能，并在内部诚实评估其效用，从而加速了产品开发和功能发布的速度。
*   根据代码熟悉程度和任务类型，团队成员会选择不同的 Cursor 功能：
    *   在非常熟悉的代码库中，**Tab 补全** 能够加速编码。
    *   **Command K** 适用于编辑单个区域或整个文件。
    *   **Agent (代理)** 功能擅长多文件编辑，尤其是在不熟悉的代码库中。
    *   **Background Agent (后台代理)** 则可以处理整个拉取请求（PRs）。

### Background Agent (后台代理) 功能

*   Cursor 最近发布了 Background Agent 的预览版，该功能允许模型在后台执行端到端任务。
*   它通过在独立的 **虚拟机环境** 中运行，并利用 **VS Code 扩展** 等开发者工具来执行任务。
*   这一功能旨在让开发者能够 **并行处理** 多个任务，并快速在后台和前台之间切换，以在模型未达到 100% 完美时进行人工介入和控制。

### 未来挑战：代码验证与大型代码库管理

*   未来软件开发的下一个瓶颈将是 **软件验证** 或 **代码审查**。模型可以高效地生成代码，但确保其正确性、符合预期以及与现有复杂代码库的协调性是关键挑战。
*   Cursor 团队正在探索多种解决方案，例如：
    *   以 **伪代码** 等更简洁的表示形式来呈现代码变更，以缩短验证时间。
    *   让模型在 **可运行测试的环境** 中工作，以验证代码的正确性。
    *   解决 **大型企业级代码库** 的复杂性，包括依赖管理和领域特定语言（DSLs）的理解。
    *   集成更多上下文来源，如最近的代码变更、团队成员的变更以及组织外部知识，以帮助模型更好地理解代码库并做出“正确”的决策。

### AI 对代码编写和开发者角色的影响

*   AI 正在改变 **API 设计** 和 **代码结构**，使其更易于语言模型理解和操作。
*   尽管如此，**整洁代码** 的原则对于人类和模型而言同样重要，AI 工具的普及将使“品味”在代码结构和复杂性控制方面变得更加关键。
*   AI 工具被视为强大的 **教育工具**，能够加速学习过程，帮助开发者更快地迭代、犯错并理解“什么有效，什么无效”。
*   未来可能会出现一类软件工程师，他们无需了解太多底层细节，而是更多地专注于 **高层设计** 和 **用户体验**。
*   预计到 2027 年 1 月 1 日，**几乎所有代码** 都将以某种方式涉及 AI。AI 将赋能更多非专业开发者（例如销售人员）构建自己的工具，实现 **“按需软件”** 的未来。

### 对新 Claude 模型的看法

*   Cursor 团队对新的 Claude 模型（特别是 **Sonnet 4**）印象深刻，认为它解决了旧版本中“过度热衷”和“奖励欺骗”的问题，并在智能方面有了显著提升。
*   Claude **3.5 Sonnet** 是 Anthropic 首次投入大量精力专门提升模型编码能力的重要成果，它为未来的模型奠定了基础。
*   Anthropic 不仅致力于提升模型在编码方面的表现，还将其在编码中获得的推理和代理能力推广到其他应用领域，同时高度重视模型的安全性和与用户意图的对齐。

### 对工程师的建议

*   对于有才华的工程师，Cursor 和 Anthropic 等 **创业公司** 相对于大型公司具有吸引力。
*   创业公司通常拥有 **更高的人才密度**，能够提供与优秀同事合作的愉快体验。
*   在这些公司，工程师有机会在较小的团队中参与具有 **巨大影响力** 的工作，例如构建改变世界编写软件方式的产品或模型。

---

## Source Introduction

The content of this conversation is excerpted from the transcript of the video "**How Cursor is building the future of AI coding with Claude**" uploaded on the **Anthropic YouTube channel**.

This video brings together experts from Anthropic, including **Alex** (Head of Claude Relations), and from Cursor, including **Lukas** (working on agentic systems), **Aman** (co-founder, working on ML and retrieval), and **Jacob Jackson** (working on ML). They discuss how Cursor is leveraging Anthropic's Claude model to revolutionise the field of AI coding.

## Conversation Summary

### Cursor's Development and the Application of Claude Models

*   Cursor is a rapidly growing company in the AI coding space, achieving **over $300 million in revenue** in just over a year and now boasting **millions of developers** as users.
*   Cursor's success is partly attributed to its ability to bridge the gaps in current language models for coding and leverage their capabilities.
*   The advent of **Claude 3.5 Sonnet** marked a "step function" improvement for Cursor, significantly enhancing the model's programming capabilities.
*   Cursor combined the intelligence of 3.5 Sonnet with custom retrieval models to enable **multi-file editing** functionality. This is considered the key breakthrough that led to Cursor's mass adoption.
*   The Cursor team has continuously tinkered and experimented, pushing the limits of these models by leveraging improvements in model quality and new features like tool use, achieving more powerful **agentic coding**.

### Cursor's Internal Self-Feedback Loop

*   The Cursor team uses **Cursor to build Cursor itself**, creating a "self-improving recursive feedback loop".
*   This internal use allows the team to rapidly iterate on new features and honestly evaluate their usefulness internally, thereby accelerating product development and feature releases.
*   Depending on code familiarity and task type, team members choose different Cursor features:
    *   In very familiar codebases, **Tab completion** speeds up coding.
    *   **Command K** is suitable for editing single regions or entire files.
    *   The **Agent** feature excels at multi-file editing, especially in unfamiliar codebases.
    *   The **Background Agent** can handle entire pull requests (PRs).

### Background Agent Functionality

*   Cursor recently released a preview of the Background Agent. This feature allows models to perform end-to-end tasks in the background.
*   It operates by running in separate **virtual machine environments** and utilising developer utilities like **VS Code extensions** to execute tasks.
*   This functionality aims to enable developers to **parallelise multiple tasks** and quickly switch between background and foreground, allowing for human intervention and control when the model is not 100% perfect.

### Future Challenges: Code Verification and Large Codebase Management

*   The next bottleneck in future software development will be **software verification** or **code review**. While models can efficiently generate code, ensuring its correctness, alignment with expectations, and coordination with existing complex codebases are key challenges.
*   The Cursor team is exploring various solutions, such as:
    *   Presenting code changes in more concise representations like **pseudo code** to shorten verification time.
    *   Allowing models to work in **testable environments** to verify code correctness.
    *   Addressing the complexity of **large enterprise-grade codebases**, including dependency management and understanding Domain Specific Languages (DSLs).
    *   Integrating more context sources, such as recent code changes, team members' changes, and external organisational knowledge, to help the model better understand the codebase and make "correct" decisions.

### AI's Impact on Code Writing and the Developer Role

*   AI is changing **API design** and **code structure**, making them easier for language models to understand and operate.
*   Nonetheless, the principles of **clean code** are equally important for humans and models. The widespread adoption of AI tools will make "taste" in code structure and complexity control even more crucial.
*   AI tools are seen as powerful **educational instruments** that can accelerate the learning process, helping developers iterate faster, make mistakes, and understand "what works and what doesn't".
*   In the future, a class of software engineers may emerge who need to know fewer low-level details, focusing more on **high-level design** and **user experience**.
*   It is anticipated that by January 1, 2027, **almost all code** will involve AI in some way. AI will empower more non-professional developers (e.g., sales personnel) to build their own tools, leading to a future of **"software on demand"**.

### Views on New Claude Models

*   The Cursor team is highly impressed with the new Claude models (especially **Sonnet 4**), believing it addresses issues like "overeagerness" and "reward hacking" seen in older versions, while showing a significant jump in intelligence.
*   Claude **3.5 Sonnet** was Anthropic's first significant effort dedicated to improving the model's coding capabilities, laying the groundwork for future models.
*   Anthropic is committed not only to enhancing model performance in coding but also to extending the reasoning and agentic capabilities gained from coding to other application areas, all while prioritising model safety and alignment with user intent.

### Advice for Engineers

*   For talented engineers, **startups** like Cursor and Anthropic offer an attractive alternative to larger companies.
*   Startups typically have a **higher talent density**, providing an enjoyable experience of working with excellent colleagues.
*   In these companies, engineers have the opportunity to engage in work with **immense impact** within smaller teams, such as building products or models that change the way the world writes software.