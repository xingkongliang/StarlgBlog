---
sidebar_position: 193
tags:
  - string
  - Easy
---

# 193.有效电话号码

标签: `string`

难度: Easy

通过率: 26.64%

原题链接: https://leetcode.com/problems/valid-phone-numbers/description/

## 题目描述
给定一个文件 file.txt，其中包含一系列电话号码（每行一个）。编写一个单行的 Bash 脚本以输出所有有效的电话号码。有效电话号必须是以下两种格式之一：(xxx) xxx-xxxx 或 xxx-xxx-xxxx。（x 代表数字）可以假设文件中的每一行都没有前置或后置的空白字符。

## 解题思路
可以使用正则表达式来匹配正确格式的电话号码，分别是：(xxx) xxx-xxxx 和 xxx-xxx-xxxx。通过使用 `grep` 工具来过滤出符合这两种格式的电话。`grep` 提供了 `-E` 选项来支持扩展正则表达式，也可以在命令中使用多个正则表达式进行匹配。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# 使用 grep 命令来匹配文件中格式正确的电话号码
# -P 选项用于启用 Perl 兼容的正则表达式
# -e 选项用于指定一个正则表达式，多个 -e 选项表示逻辑“或”
grep -P -e '^\(\d{3}\) \d{3}-\d{4}$' -e '^\d{3}-\d{3}-\d{4}$' file.txt
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript

```

</TabItem>
<TabItem value="java" label="Java">

```java

```

</TabItem>
</Tabs>

## 复杂度分析
本问题重点在于使用正则表达式进行模式匹配，
通过 `grep` 工具执行，时间复杂度基本上是 $O(n)$，其中 $n$ 是文件中行的数量，因为每行都需要检查。  

由于是直接进行流式处理，每行不需要额外存储，空间复杂度为 $O(1)$。
