# Explanation of Formatting Fix for `common-workflows.md`

This document outlines the changes made to `/docs/AI/Claude_Code/common-workflows.md` to resolve a Docusaurus rendering error.

## Problem

The original document used custom JSX-like components (`<Steps>`, `<Step>`, `<Tip>`, `<Note>`, `<Card>`) directly within the Markdown file. The Docusaurus renderer did not recognize these components, leading to the error: `Expected component <Component> to be defined`.

## Solution

The solution was to replace these custom components with standard Markdown syntax that achieves a similar visual structure and is fully compatible with the Docusaurus renderer.

### Component Conversion Details:

1.  **`<Steps>` and `<Step title="...">`**
    *   **Original:**
        ```html
        <Steps>
          <Step title="Navigate to the project root directory">
            ...
          </Step>
        </Steps>
        ```
    *   **Replacement:** Converted to numbered Markdown headings (`####`).
        ```markdown
        #### 1. 导航到项目根目录
        ...
        ```

2.  **`<Tip>`**
    *   **Original:**
        ```html
        <Tip>
          Tips:
          * Start with broad questions...
        </Tip>
        ```
    *   **Replacement:** Converted to a blockquote with bolded text.
        ```markdown
        > **提示:**
        >
        > * 从广泛的问题开始...
        ```

3.  **`<Note>`**
    *   **Original:**
        ```html
        <Note>
          Claude will display its thinking process...
        </Note>
        ```
    *   **Replacement:** Converted to a blockquote with bolded text.
        ```markdown
        > **注意:**
        > Claude 会在响应上方...
        ```

4.  **`<Card>`**
    *   **Original:**
        ```html
        <Card title="Claude Code reference implementation" icon="code" href="...">
          Clone our development container reference implementation.
        </Card>
        ```
    *   **Replacement:** Converted to a standard Markdown link with the title in bold, followed by the description text.
        ```markdown
        [**Claude Code 参考实现**](...)

        克隆我们的开发容器参考实现。
        ```

By applying these changes, the document now renders correctly without relying on undefined custom components.
