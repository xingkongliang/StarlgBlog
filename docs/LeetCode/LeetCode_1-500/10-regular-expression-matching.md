---
sidebar_position: 10
tags:
  - dynamic-programming
  - string
  - Hard
---

# 10.正则表达式匹配

标签: `dynamic-programming`, `string`

难度: Hard

通过率: 28.69%

原题链接: https://leetcode.com/problems/regular-expression-matching/description/

## 题目描述
给定一个输入字符串 $s$ 和一个模式 $p$，实现支持 '.' 和 '*' 的正则表达式匹配：

- '.' 匹配任意单个字符。
- '*' 匹配零个或多个前面的元素。

匹配应该覆盖整个输入字符串（而不是部分）。

## 解题思路
这个问题可以用动态规划来解决，以判断字符串 $s$ 和模式 $p$ 是否匹配。定义一个布尔值二维数组 `dp[i][j]` 表示字符串 $s$ 的前 $i$ 个字符与模式 $p$ 的前 $j$ 个字符是否匹配。

**初始化：**
- `dp[0][0]` 代表空字符串和空模式匹配，显然为真。
- `dp[i][0]` 为所有 $i>0$ 情况为假，因为没有可以匹配的模式。
- `dp[0][j]` 只有当 $p[j-1]` 为 `*`，并且其前一个字符 `dp[0][j-2]` 匹配时为真（`*` 可以匹配空字符串）。

**状态转移方程：**
- 如果 $p[j-1]$ 是普通字符或 '.'，则有 `dp[i][j] = dp[i-1][j-1]` 如果 $s[i-1] = p[j-1]$ 或 $p[j-1] = '.'$。
- 如果 $p[j-1]$ 是 '*'，它前面的字符是 $p[j-2]$，则有两种情况：
  1. 不使用当前 '*，有 `dp[i][j] = dp[i][j-2]`。
  2. 使用 '*' 来匹配一个或多个 `$p[j-2]$`，有 `dp[i][j] = dp[i-1][j]`，前提是 $s[i-1] = p[j-2]$ 或 $p[j-2] = '.'$。

**完整性：**
这种方法通过用小规模问题的解得到原问题的解，并保证覆盖所有可能子问题情况。最后 `dp[s.length][p.length]` 的值就是所求是否匹配的结果。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def isMatch(s: str, p: str) -> bool:
    m, n = len(s), len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True  # 空字符串和空模式匹配
    
    # 预处理模式开头的 `*`
    for j in range(2, n + 1):
        if p[j - 1] == '*':
            dp[0][j] = dp[0][j - 2]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j - 1] == '*':
                dp[i][j] = dp[i][j - 2] or (dp[i - 1][j] if (s[i - 1] == p[j - 2] or p[j - 2] == '.') else False)
            else:
                dp[i][j] = dp[i - 1][j - 1] and (s[i - 1] == p[j - 1] or p[j - 1] == '.')

    return dp[m][n]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.length(), n = p.length();
        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        dp[0][0] = true; // 空字符串和空模式匹配

        for (int j = 2; j <= n; ++j) {
            if (p[j - 1] == '*') {
                dp[0][j] = dp[0][j - 2];
            }
        }

        for (int i = 1; i <= m; ++i) {
            for (int j = 1; j <= n; ++j) {
                if (p[j - 1] == '*') {
                    dp[i][j] = dp[i][j - 2] || ((s[i - 1] == p[j - 2] || p[j - 2] == '.') && dp[i - 1][j]);
                } else {
                    dp[i][j] = dp[i - 1][j - 1] && (s[i - 1] == p[j - 1] || p[j - 1] == '.');
                }
            }
        }

        return dp[m][n];
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function isMatch(s, p) {
    const m = s.length, n = p.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
    dp[0][0] = true; // 空字符串和空模式匹配

    for (let j = 2; j <= n; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 2];
        }
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[j - 1] === '*') {
                dp[i][j] = dp[i][j - 2] || (dp[i - 1][j] && (s[i - 1] === p[j - 2] || p[j - 2] === '.'));
            } else {
                dp[i][j] = dp[i - 1][j - 1] && (s[i - 1] === p[j - 1] || p[j - 1] === '.');
            }
        }
    }

    return dp[m][n];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public boolean isMatch(String s, String p) {
        int m = s.length(), n = p.length();
        boolean[][] dp = new boolean[m + 1][n + 1];
        dp[0][0] = true; // 空字符串和空模式匹配

        for (int j = 2; j <= n; j++) {
            if (p.charAt(j - 1) == '*') {
                dp[0][j] = dp[0][j - 2];
            }
        }

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (p.charAt(j - 1) == '*') {
                    dp[i][j] = dp[i][j - 2] || ((s.charAt(i - 1) == p.charAt(j - 2) || p.charAt(j - 2) == '.') && dp[i - 1][j]);
                } else {
                    dp[i][j] = dp[i - 1][j - 1] && (s.charAt(i - 1) == p.charAt(j - 1) || p.charAt(j - 1) == '.');
                }
            }
        }

        return dp[m][n];
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(m \times n)$，其中 $m$是字符串 $s$ 的长度，$n$是模式 $p$ 的长度，因为需要计算二维 dp 数组的每个元素。
- 空间复杂度：$O(m \times n)$，用于存储动态规划表。
