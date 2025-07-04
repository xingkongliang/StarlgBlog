---
sidebar_position: 17
---

# 企业部署概述

> 了解 Claude Code 如何与各种第三方服务和基础设施集成，以满足企业部署要求。

本页概述了可用的部署选项，并帮助您为您的组织选择正确的配置。

## 提供商比较

| 功能 | Anthropic | Amazon Bedrock | Google Vertex AI |
| :--- | :--- | :--- | :--- |
| 地区 | 支持的[国家/地区](https://www.anthropic.com/supported-countries) | 多个 AWS [地区](https://docs.aws.amazon.com/bedrock/latest/userguide/models-regions.html) | 多个 GCP [地区](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/locations) |
| 提示缓存 | 默认启用 | 默认启用 | 联系 Google 启用 |
| 身份验证 | API 密钥 | AWS 凭据 (IAM) | GCP 凭据 (OAuth/服务帐户) |
| 成本跟踪 | 仪表板 | AWS Cost Explorer | GCP Billing |
| 企业功能 | 团队、使用情况监控 | IAM 策略、CloudTrail | IAM 角色、Cloud Audit Logs |

## 云提供商

*   **Amazon Bedrock**: 通过具有基于 IAM 的身份验证和 AWS 原生监控的 AWS 基础设施使用 Claude 模型
*   **Google Vertex AI**: 通���具有企业级安全性和合规性的 Google Cloud Platform 访问 Claude 模型

## 公司基础设施

*   **公司代理**: 配置 Claude Code 以与您组织���代理服务器和 SSL/TLS 要求配合使用
*   **LLM 网关**: 部署具有使用情况跟踪、预算和审计日志记录的集中式模型访问

## 配置概述

Claude Code 支持灵活的配置选项，允许您组合不同的提供商和基础设施：

> **注意：**
> 了解以下两者之间的区别：
>
> *   **公司代理**：用于路由流量的 HTTP/HTTPS 代理（通过 `HTTPS_PROXY` 或 `HTTP_PROXY` 设置）
> *   **LLM 网关**：处理身份验证并提供与提供商兼容的端点的服务（通过 `ANTHROPIC_BASE_URL`、`ANTHROPIC_BEDROCK_BASE_URL` 或 `ANTHROPIC_VERTEX_BASE_URL` 设置）
>
> 两种配置可以同时使用。

### 将 Bedrock 与公司代理结合使用

通过公司 HTTP/HTTPS 代理路由 Bedrock 流量：

```bash
# 启用 Bedrock
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-east-1

# 配置公司代理
export HTTPS_PROXY='https://proxy.example.com:8080'
```

### 将 Bedrock 与 LLM 网关结合使用

使用提供与 Bedrock 兼容的端点的网关服务：

```bash
# 启用 Bedrock
export CLAUDE_CODE_USE_BEDROCK=1

# 配置 LLM 网关
export ANTHROPIC_BEDROCK_BASE_URL='https://your-llm-gateway.com/bedrock'
export CLAUDE_CODE_SKIP_BEDROCK_AUTH=1  # 如果网关处理 AWS 身份验证
```

### 将 Vertex AI 与公司代理结合使用

通过公司 HTTP/HTTPS 代理路由 Vertex AI 流量：

```bash
# 启用 Vertex
export CLAUDE_CODE_USE_VERTEX=1
export CLOUD_ML_REGION=us-east5
export ANTHROPIC_VERTEX_PROJECT_ID=your-project-id

# 配置公司代理
export HTTPS_PROXY='https://proxy.example.com:8080'
```

### 将 Vertex AI 与 LLM 网关结合使用

将 Google Vertex AI 模型与 LLM 网关相结合以进行集中管理：

```bash
# 启用 Vertex
export CLAUDE_CODE_USE_VERTEX=1

# 配置 LLM 网关
export ANTHROPIC_VERTEX_BASE_URL='https://your-llm-gateway.com/vertex'
export CLAUDE_CODE_SKIP_VERTEX_AUTH=1  # 如果网关处理 GCP 身份验证
```

### 身份验证配置

Claude Code 在需要时将 `ANTHROPIC_AUTH_TOKEN` 用于 `Authorization` 和 `Proxy-Authorization` 标头。`SKIP_AUTH` 标志（`CLAUDE_CODE_SKIP_BEDROCK_AUTH`、`CLAUDE_CODE_SKIP_VERTEX_AUTH`）用于网关处理提供商身份验证的 LLM 网关场景。

## 选择正确的部署配置

在选择部署方法时，请考虑以下因素：

### 直接提供商访问

最适合以下组织：

*   想要最简单的设置
*   拥有现有的 AWS 或 GCP 基础设施
*   需要提供商���生��监控和合规性

### 公司代理

最适合以下组织：

*   有现有的公司代理要求
*   需要流量监控和合规性
*   必须通过特定的网络路径路由所有流量

### LLM 网关

最适合以下组织：

*   需要跨团队的使用情况跟踪
*   想要在模型之间动态切换
*   需要自定义速率限制或预算
*   需要集中式身份验证管理

## 调试

在调试部署时：

*   使用 `claude /status` 斜杠命令。此命令提供对任何应用的身份验证、代理和 URL 设置的可观察性。
*   设置环境变量 `export ANTHROPIC_LOG=debug` 以记录请求。

## 组织最佳实践

1.  我们强烈建议投资于文档，以便 Claude Code 了解您的代码库。许多组织在存储库的根目录中创建一个 `CLAUDE.md` 文件（我们也称之为内存），其中包含系统架构、如何运行测试和其他常见命令以及为代码库做出贡献的最佳实践。此文件通常检入源代码管理，以便所有用户都可以从中受益。了解更多。
2.  如果您有自定义的开发环境，我们发现创建一个“一键式”安装 Claude Code 的方法是在整个组织中扩大采用率的关键。
3.  鼓励新用户尝试使用 Claude Code 进行代码库问答，或进行较小的错误修复或���能请求。要求 Claude Code 制定计划。检查 Claude 的建议，如果偏离轨道，请提供反馈。随着时间的推移，当用户更好地理解这个新范例时，他们将更有效地让 Claude Code 更具代理性地运行。
4.  安全团队可以为 Claude Code 允许和不允许执行的操作配置托管权限，这些权限不能被本地配置覆盖。了解更多。
5.  MCP 是为 Claude Code 提供更多信息的好方法，例如连接到票务管理系统或错误日志。我们建议由一个中央团队配置 MCP 服务器，并将 `.mcp.json` 配置检入代码库，以便所有用户都能受益。了解更多。

在 Anthropic，我们相信 Claude Code 能够为每个 Anthropic 代码库的开发提供动力。我们希望您和我们一样喜欢使用 Claude Code！

## 下一步

*   设置 Amazon Bedrock 以进行 AWS 原生部署
*   配置 Google Vertex AI 以进行 GCP 部署
*   实施公司代理以满足网络要求
*   部署 LLM 网关以进行企业管理
*   设置以了解配置选项和环境变量