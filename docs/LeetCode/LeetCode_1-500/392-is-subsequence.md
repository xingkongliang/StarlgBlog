---
sidebar_position: 392
tags:
  - array
  - two-pointers
  - string
  - Easy
---

# 392.判断子序列

标签: `array`, `two-pointers`, `string`

难度: Easy

通过率: 48.12%

原题链接: https://leetcode.com/problems/is-subsequence/description/

## 题目描述
给定两个字符串 $s$ 和 $t$，当且仅当 $s$ 是 $t$ 的一个子序列时返回 true，否则返回 false。字符串的子序列是通过删除一些（可以是不删除）字符形成的新字符串，且剩余字符的顺序不变。

## 解题思路
为了判断字符串 $s$ 是否是字符串 $t$ 的子序列，我们可以使用双指针方法：一个指针 $i$ 用于遍历字符串 $s$，另一个指针 $j$ 用于遍历字符串 $t$。```\n1. 初始化指针 $i=0$ 和 $j=0$。```\n2. 当 $j$ 小于 $t$ 的长度时，进行以下判断：```\n   - 如果 $s[i]$ 等于 $t[j]$，则 $i$ 和 $j$ 同时增加1，表示匹配字符后移到下一个字符。```\n   - 否则，仅增加 $j$ 的值，表示继续在 $t$ 中寻找当前 $s[i]$。```\n3. 如果 $i$ 和 $s$ 的长度相同，则说明 $s$ 中所有字符都匹配上了，因此返回 true。```\n4. 如果遍历完 $t$，而 $i$ 仍然没有达到 $s$ 的长度，说明 $s$ 的某些字符没有匹配上，返回 false。```\n

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def isSubsequence(s: str, t: str) -> bool:
    # 初始化指针i和j
    i, j = 0, 0
    # 遍历t
    while j < len(t):
        # 当s[i]和t[j]匹配时，i后移
        if i < len(s) and s[i] == t[j]:
            i += 1
        # j总是后移
        j += 1
    # 如果i到达s的末尾，说明全部字符都能匹配
    return i == len(s)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    bool isSubsequence(string s, string t) {
        int i = 0, j = 0;
        // 遍历字符串t
        while (j < t.length()) {
            // 如果s[i]和t[j]相等，i后移
            if (i < s.length() && s[i] == t[j]) {
                ++i;
            }
            // j总是后移
            ++j;
        }
        // 检查i是否到达s的末尾
        return i == s.length();
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function isSubsequence(s, t) {
    let i = 0, j = 0;
    // 遍历字符串t
    while (j < t.length) {
        // 如果当前字符匹配，移动指针i
        if (i < s.length && s[i] === t[j]) {
            i++;
        }
        // 移动指针j
        j++;
    }
    // 检查i是否到达s的长度
    return i === s.length;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public boolean isSubsequence(String s, String t) {
        int i = 0, j = 0;
        // 遍历t字符串
        while (j < t.length()) {
            // 如果s[i]和t[j]匹配，前进i
            if (i < s.length() && s.charAt(i) == t.charAt(j)) {
                i++;
            }
            // 前进j
            j++;
        }
        // 如果i达到了s的长度，说明匹配成功
        return i == s.length();
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 是字符串 $t$ 的长度。因为我们在最坏情况下需要遍历整个字符串 $t$。  
  
空间复杂度为 $O(1)$，因为我们只需要几个额外的变量来进行指针操作。
