# Workflow: Translating, Formatting, and Fixing Links in Markdown Files

This document outlines the automated workflow used to translate `hooks.md`, `settings.md`, and `slash-commands.md` from English to Chinese, fix formatting issues, and resolve broken links and anchors to prepare them for the Docusaurus site.

## 1. Objective

The goal was to process a batch of Markdown files by performing the following actions on each:
1.  Read the source file.
2.  Translate its content into Chinese.
3.  Identify and fix non-standard, custom JSX-like components (e.g., `<Warning>`, `<Note>`) by converting them to standard Markdown to ensure Docusaurus compatibility.
4.  Save the processed content as a new, properly formatted Docusaurus document.
5.  Identify and fix broken links and anchors in the translated files.

## 2. Workflow Steps

The process was executed sequentially for each of the three files provided.

### Step 1: Read the Source File

For each file, the first action was to read its content from the `sources/claude-code/` directory using the `read_file` tool.

*   **Tool Used:** `read_file`
*   **Example:** `read_file(absolute_path='.../sources/claude-code/hooks.md')`

### Step 2: Translate and Remediate Formatting

This was the core processing step for each file's content:

1.  **Translation:** The English text was translated into Chinese. Code blocks, commands, and technical identifiers were kept in their original form to maintain technical accuracy.
2.  **Formatting Fix:** The key challenge was the presence of custom components that are not valid in standard Markdown and would cause errors in Docusaurus. Each of these components was replaced with a standard equivalent:
    *   `<Warning>...</Warning>` was converted to a Markdown blockquote: `> **警告：** ...`
    *   `<Note>...</Note>` was also converted to a blockquote: `> **注意：** ...`
    *   Other structural tags like `<Steps>` and `<Card>` were replaced with headings, lists, and links to create a similar visual hierarchy using only standard Markdown.

### Step 3: Write the Destination File

Once the content was translated and cleaned, it was saved as a new file in the `./docs/AI/Claude_Code/` directory using the `write_file` tool.

*   **Tool Used:** `write_file`
*   **Action:** A new file was created with the translated content and appropriate Docusaurus frontmatter (e.g., `sidebar_position`) to ensure it is correctly integrated into the site's navigation.
*   **Example:** `write_file(file_path='.../docs/AI/Claude_Code/hooks.md', content='...')`

### Step 4: Fix Broken Links and Anchors

After the initial translation and formatting, the Docusaurus build process revealed broken links and anchors. The following steps were taken to resolve these issues:

1.  **Identify Broken Links:** The build error output was used to identify all broken links.
2.  **Correct Links:** Each broken link was corrected to point to the appropriate translated file.
3.  **Create Placeholder Files:** For links pointing to files that had not yet been translated, placeholder files were created to ensure the links were not broken.
4.  **Fix Broken Anchors:** Broken anchors were fixed by ensuring that the anchor in the link matched the heading in the translated file. In some cases, this required adding or modifying headings in the placeholder files.

## 3. Summary

This workflow was repeated for `hooks.md`, `settings.md`, and `slash-commands.md`, successfully creating three translated and properly formatted documents ready for the Docusaurus website. The final step of fixing broken links and anchors was crucial for a successful build.