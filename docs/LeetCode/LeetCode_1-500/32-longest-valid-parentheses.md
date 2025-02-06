---
sidebar_position: 32
tags:
  - stack
  - dynamic-programming
  - string
  - Hard
---

# 32.最长有效括号

标签: `stack`, `dynamic-programming`, `string`

难度: Hard

通过率: 35.23%

原题链接: https://leetcode.com/problems/longest-valid-parentheses/description/

## 题目描述
给定一个仅包含字符 '(' 和 ')' 的字符串，返回最长的有效（格式正确且连续）括号子串的长度。

## 解题思路
要解决最长有效括号的问题，可以采用下面几种可能的解法：

1. **动态规划**：定义一个 DP 数组，其中 `dp[i]` 表示以 `i` 结尾的最长有效括号的长度。
   - 如果 `s[i]` 是 `'('`，则 `dp[i] = 0`，因为一个以 `'('` 结束的子字符串不可能是有效的。
   - 如果 `s[i]` 是 `')'` 且 `s[i-1] = '('`，`dp[i] = dp[i-2] + 2`，其中 `dp[i-2]` 是当括号被匹配后的有效的长度。
   - 如果 `s[i]` 是 `')'` 且 `s[i-1] = ')'`，则需要检查 `s[i-dp[i-1]-1]` 是否是 `'('`，若是，则 `dp[i] = dp[i-1] + dp[i-dp[i-1]-2] + 2`。
   - 最终答案为 `dp` 数组中的最大值。

2. **栈**：使用栈来存储括号索引。栈顶始终记录最后一个未匹配的 `)` 的位置。
   - 初始化一个栈，压入值为 `-1`，表示未匹配的起始。
   - 遍历字符串，当遇到 `'('` 时压入该字符的索引。
   - 当遇到 `')'` 时先弹出栈顶元素代表匹配当前的 `')'`，若栈为空，说明当前的 `')'` 无法匹配，将其索引入栈。
   - 若栈非空，当前的有效长度为 `current_index - stack_top` 与之前长度比较。

3. **通过扫描**：逆序和正序各做一次遍历，记录 `(` 和 `)` 的数量，只要遍历到了且 `)` 与 `(` 数量相等，就更新最大值。
   - 正序时遇到 `)` 数量多于 `(` 时重置计数。
   - 逆序时遇到 `(` 数量多于 `)` 时重置计数。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class Solution:
    def longestValidParentheses(self, s: str) -> int:
        # dp 数组用于存储以每个字符为结尾的最长有效括号长度
        dp = [0] * len(s)
        max_len = 0
        for i in range(1, len(s)):
            if s[i] == ')':
                # 情况1: 当前字符和其前一个字符组成一对'()'
                if s[i-1] == '(':  
                    # i 至少是 1，所以 i-2 是安全的
                    dp[i] = dp[i-2] + 2 if i >= 2 else 2
                elif i - dp[i-1] > 0 and s[i - dp[i-1] - 1] == '(':  
                    # 情况2: 当前的 ')' 与之前的匹配
                    dp[i] = dp[i-1] + (dp[i-dp[i-1]-2] if (i - dp[i-1]) >= 2 else 0) + 2
                # 每次计算都更新最大值
                max_len = max(max_len, dp[i])
        return max_len

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int longestValidParentheses(string s) {
        int n = s.length();
        vector<int> dp(n, 0);
        int maxLen = 0;
        for (int i = 1; i < n; ++i) {
            if (s[i] == ')') {
                if (s[i-1] == '(') {
                    dp[i] = (i >= 2 ? dp[i-2] : 0) + 2;
                } else if (i - dp[i-1] > 0 && s[i - dp[i-1] - 1] == '(') {
                    dp[i] = dp[i-1] + ((i - dp[i-1] >= 2) ? dp[i-dp[i-1]-2] : 0) + 2;
                }
                maxLen = max(maxLen, dp[i]);
            }
        }
        return maxLen;
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
var longestValidParentheses = function(s) {
    let n = s.length;
    let dp = Array(n).fill(0);
    let maxLen = 0;
    for (let i = 1; i < n; ++i) {
        if (s[i] == ')') {
            if (s[i-1] == '(') {
                dp[i] = (i >= 2 ? dp[i-2] : 0) + 2;
            } else if (i - dp[i-1] > 0 && s[i - dp[i-1] - 1] == '(') {
                dp[i] = dp[i-1] + ((i - dp[i-1] >= 2) ? dp[i-dp[i-1]-2] : 0) + 2;
            }
            maxLen = Math.max(maxLen, dp[i]);
        }
    }
    return maxLen;
};

```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int longestValidParentheses(String s) {
        int n = s.length();
        int[] dp = new int[n];
        int maxLength = 0;
        for (int i = 1; i < n; i++) {
            if (s.charAt(i) == ')') {
                if (s.charAt(i - 1) == '(') {
                    dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
                } else if (i - dp[i - 1] > 0 && s.charAt(i - dp[i - 1] - 1) == '(') {
                    dp[i] = dp[i - 1] + ((i - dp[i - 1] >= 2) ? dp[i - dp[i - 1] - 2] : 0) + 2;
                }
                maxLength = Math.max(maxLength, dp[i]);
            }
        }
        return maxLength;
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是字符串的长度，因为我们只需要遍历一次字符串。

空间复杂度：$O(n)$，需要一个长度为 $n$ 的 DP 数组来存储子问题的解。
