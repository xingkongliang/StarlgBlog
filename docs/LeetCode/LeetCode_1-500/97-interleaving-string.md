---
sidebar_position: 97
tags:
  - dynamic-programming
  - string
  - Medium
---

# 97.交错字符串

标签: `dynamic-programming`, `string`

难度: Medium

通过率: 41.02%

原题链接: https://leetcode.com/problems/interleaving-string/description/

## 题目描述
给定字符串 $s_1$，$s_2$ 和 $s_3$，判断 $s_3$ 是否由 $s_1$ 和 $s_2$ 的交错组成。

字符串 $s$ 和 $t$ 的交错是一种配置，其中 $s$ 和 $t$ 被分割成分别的 $n$ 和 $m$ 个子串，如下所示：

$s = s_1 + s_2 + \ldots + s_n$  
$t = t_1 + t_2 + \ldots + t_m$  
$|n - m| \leq 1$  
交错方式为 $s_1 + t_1 + s_2 + t_2 + s_3 + t_3 + \ldots$ 或 $t_1 + s_1 + t_2 + s_2 + t_3 + s_3 + \ldots$。

注意: $a + b$ 表示字符串 $a$ 和 $b$ 的拼接。

## 解题思路
这是一个经典的动态规划问题。设一个二维布尔数组 $dp[i][j]$ 表示字符串 $s_3$ 的前 $i+j$ 个字符是否由 $s_1$ 的前 $i$ 个字符和 $s_2$ 的前 $j$ 个字符交错组成。我们需要确定 $dp[m][n]$。主要思想如下：

1. 如果 $s_1[i-1] == s_3[i+j-1]$ 且 $dp[i-1][j]$ 为真，那么 $dp[i][j]$ 为真，这意味着可以通过将 $s_1$ 的前 $i-1$ 个字符与 $s_2$ 的前 $j$ 个字符加上 $s_1$ 第 $i-1$ 个字符来构成 $s_3$ 的前 $i+j$ 个字符。

2. 如果 $s_2[j-1] == s_3[i+j-1]$ 且 $dp[i][j-1]$ 为真，那么 $dp[i][j]$ 为真，这意味着可以通过将 $s_1$ 的前 $i$ 个字符与 $s_2$ 的前 $j-1$ 个字符加上 $s_2$ 的第 $j-1$ 个字符来构成 $s_3$ 的前 $i+j$ 个字符。

初始条件为 $dp[0][0] = \\text{true}$，因为空串之间是互相交错的。

最终结果取决于 $dp[s1.length()][s2.length()]$ 的值。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def isInterleave(s1, s2, s3):
    # 如果长度不匹配，直接返回 False
    if len(s1) + len(s2) != len(s3):
        return False

    # 初始化 DP 数组
    dp = [[False] * (len(s2) + 1) for _ in range(len(s1) + 1)]

    # 空串之间肯定是交错的
    dp[0][0] = True

    # 处理 s1 边界情况
    for i in range(1, len(s1) + 1):
        dp[i][0] = dp[i - 1][0] and s1[i - 1] == s3[i - 1]

    # 处理 s2 边界情况
    for j in range(1, len(s2) + 1):
        dp[0][j] = dp[0][j - 1] and s2[j - 1] == s3[j - 1]

    # 填充 DP 表
    for i in range(1, len(s1) + 1):
        for j in range(1, len(s2) + 1):
            dp[i][j] = (dp[i - 1][j] and s1[i - 1] == s3[i + j - 1]) or (dp[i][j - 1] and s2[j - 1] == s3[i + j - 1])

    return dp[-1][-1]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        if (s1.length() + s2.length() != s3.length()) {
            return false;
        }

        vector<vector<bool>> dp(s1.length() + 1, vector<bool>(s2.length() + 1, false));
        dp[0][0] = true;

        for (int i = 1; i <= s1.length(); ++i) {
            dp[i][0] = dp[i - 1][0] && s1[i - 1] == s3[i - 1];
        }

        for (int j = 1; j <= s2.length(); ++j) {
            dp[0][j] = dp[0][j - 1] && s2[j - 1] == s3[j - 1];
        }

        for (int i = 1; i <= s1.length(); ++i) {
            for (int j = 1; j <= s2.length(); ++j) {
                dp[i][j] = (dp[i - 1][j] && s1[i - 1] == s3[i + j - 1]) ||
                           (dp[i][j - 1] && s2[j - 1] == s3[i + j - 1]);
            }
        }

        return dp[s1.length()][s2.length()];
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function isInterleave(s1, s2, s3) {
    if (s1.length + s2.length !== s3.length) {
        return false;
    }
    
    const dp = Array(s1.length + 1).fill(null).map(() => Array(s2.length + 1).fill(false));
    dp[0][0] = true;

    for (let i = 1; i <= s1.length; ++i) {
        dp[i][0] = dp[i - 1][0] && s1[i - 1] === s3[i - 1];
    }
    
    for (let j = 1; j <= s2.length; ++j) {
        dp[0][j] = dp[0][j - 1] && s2[j - 1] === s3[j - 1];
    }

    for (let i = 1; i <= s1.length; ++i) {
        for (let j = 1; j <= s2.length; ++j) {
            dp[i][j] = (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) ||
                       (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1]);
        }
    }

    return dp[s1.length][s2.length];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public boolean isInterleave(String s1, String s2, String s3) {
        if (s1.length() + s2.length() != s3.length()) {
            return false;
        }

        boolean[][] dp = new boolean[s1.length() + 1][s2.length() + 1];
        dp[0][0] = true;

        for (int i = 1; i <= s1.length(); ++i) {
            dp[i][0] = dp[i - 1][0] && s1.charAt(i - 1) == s3.charAt(i - 1);
        }

        for (int j = 1; j <= s2.length(); ++j) {
            dp[0][j] = dp[0][j - 1] && s2.charAt(j - 1) == s3.charAt(j - 1);
        }

        for (int i = 1; i <= s1.length(); ++i) {
            for (int j = 1; j <= s2.length(); ++j) {
                dp[i][j] = (dp[i - 1][j] && s1.charAt(i - 1) == s3.charAt(i + j - 1)) ||
                           (dp[i][j - 1] && s2.charAt(j - 1) == s3.charAt(i + j - 1));
            }
        }

        return dp[s1.length()][s2.length()];
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(m \cdot n)$，其中 $m$ 和 $n$ 分别是 $s1$ 和 $s2$ 的长度。我们需要填写一个 $m \times n$ 的 DP 表。
空间复杂度：$O(m \cdot n)$，用于存储 DP 表。可以通过优化将其降低到 $O(n)$。
