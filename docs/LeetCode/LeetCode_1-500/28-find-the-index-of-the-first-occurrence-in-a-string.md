---
sidebar_position: 28
tags:
  - string
  - two-pointers
  - Easy
---

# 28.查找字符串首次出现的索引

标签: `string`, `two-pointers`

难度: Easy

通过率: 44.03%

原题链接: https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/description/

## 题目描述
给定两个字符串 needle 和 haystack，返回 needle 在 haystack 中首次出现的索引，如果 needle 不是 haystack 的一部分，则返回 -1。

## 解题思路
可以通过暴力匹配算法实现，也可以考虑使用更高效的字符串匹配算法如KMP算法。暴力实现的思路是在 haystack 中滑动一个窗口，窗口的长度与 needle 相同，检查每个窗口中的子串是否与 needle 相等，如果相等就返回当前的索引。KMP算法则通过预处理 needle，生成部分匹配表，从而可以快速避开一些子串的匹配。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def strStr(haystack: str, needle: str) -> int:
    # 获取needle和haystack的长度
    n, m = len(haystack), len(needle)
    
    # 如果needle是空字符串，返回0
    if m == 0:
        return 0

    # 开始遍历haystack，第一个可以检查的起始位置是 len(haystack) - len(needle)
    for i in range(n - m + 1):
        # 如果当前切片等于needle
        if haystack[i:i+m] == needle:
            return i  # 返回起始索引
    
    return -1  # 没找到返回-1
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int strStr(string haystack, string needle) {
    int n = haystack.size(), m = needle.size();
    
    if (m == 0) return 0;
    
    for (int i = 0; i <= n - m; ++i) {
        if (haystack.substr(i, m) == needle) {
            return i;
        }
    }

    return -1;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function strStr(haystack, needle) {
    const n = haystack.length, m = needle.length;
    
    if (m === 0) return 0;

    for (let i = 0; i <= n - m; i++) {
        if (haystack.substring(i, i + m) === needle) {
            return i;
        }
    }

    return -1;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int strStr(String haystack, String needle) {
    int n = haystack.length(), m = needle.length();
    
    if (m == 0) return 0;
    
    for (int i = 0; i <= n - m; i++) {
        if (haystack.substring(i, i + m).equals(needle)) {
            return i;
        }
    }

    return -1;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n \times m)$，其中 $n$ 是 haystack 的长度，$m$ 是 needle 的长度。因为对于 haystack 的每一位，我们最多会比较 $m$ 次。  
空间复杂度：$O(1)$，不考虑输出情况下，仅使用了常数额外空间。
