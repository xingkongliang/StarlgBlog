---
sidebar_position: 14
tags:
  - string
  - Easy
---

# 14.最长公共前缀

标签: `string`

难度: Easy

通过率: 44.38%

原题链接: https://leetcode.com/problems/longest-common-prefix/description/

## 题目描述
编写一个函数，在一个字符串数组中找到最长的公共前缀字符串。 如果不存在公共前缀，返回空字符串 ""。

## 解题思路
Longest Common Prefix（LCP）问题可以通过多种方式解决。最直接的方法是水平扫描：

1. **初始化**：如果字符串数组为空，则返回空字符串。取得第一个字符串作为初始前缀。 
2. **逐个比较**：将前缀与数组中的每一个字符串进行比较：
   - 从字符串的开头逐个字符地匹配当前的公共前缀。
   - 如发现目前的前缀不是下一个字符串的前缀，就缩短这个前缀（截取到第一个不匹配字母之前）。
3. **早结束**：如果在任何时候前缀变成空字符串，代表不存在任何公共前缀，立即返回。 

整个过程结束后，当前的前缀即是最长公共前缀。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def longestCommonPrefix(strs):
    # 如果字符串列表为空，立即返回空前缀
    if not strs:
        return ""
    # 初始化第一个字符串为初始前缀
    prefix = strs[0]
    # 从第二个字符串开始逐一比较
    for s in strs[1:]:
        # 缩减当前前缀直到成为实际前缀
        while not s.startswith(prefix):
            prefix = prefix[:-1]
            # 一旦前缀为空，则意味着无公共前缀
            if not prefix:
                return ""
    return prefix
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
std::string longestCommonPrefix(std::vector<std::string>& strs) {
    // 检查字符串列表是否为空
    if (strs.empty()) return "";
    // 初始化第一个字符串为初始前缀
    std::string prefix = strs[0];
    // 从第二个字符串开始逐一比较
    for (const auto& s : strs) {
        // 缩减当前前缀直到成为实际前缀
        while (s.find(prefix) != 0) {
            prefix = prefix.substr(0, prefix.size() - 1);
            // 一旦前缀为空，则意味着无公共前缀
            if (prefix.empty()) return "";
        }
    }
    return prefix;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function longestCommonPrefix(strs) {
    // 检查字符串列表是否为空
    if (!strs.length) return "";
    // 初始化第一个字符串为初始前缀
    let prefix = strs[0];
    // 从第二个字符串开始逐一比较
    for (let i = 1; i < strs.length; i++) {
        // 缩减当前前缀直到成为实际前缀
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            // 一旦前缀为空，则意味着无公共前缀
            if (!prefix) return "";
        }
    }
    return prefix;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public String longestCommonPrefix(String[] strs) {
        // 检查字符串列表是否为空
        if (strs == null || strs.length == 0) return "";
        // 初始化第一个字符串为初始前缀
        String prefix = strs[0];
        // 从第二个字符串开始逐一比较
        for (int i = 1; i < strs.length; i++) {
            // 缩减当前前缀直到成为实际前缀
            while (strs[i].indexOf(prefix) != 0) {
                prefix = prefix.substring(0, prefix.length() - 1);
                // 一旦前缀为空，则意味着无公共前缀
                if (prefix.isEmpty()) return "";
            }
        }
        return prefix;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(S \cdot n)$，其中$S$是所有字符串中字符的总和，$n$是字符串的数量。在最坏的情况下，我们需要比较字符串中所有字符。 
空间复杂度：$O(1)$，不使用额外的空间，只是逐步缩短前缀。
