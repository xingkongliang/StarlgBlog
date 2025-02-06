---
sidebar_position: 115
tags:
  - dynamic-programming
  - string
  - Hard
---

# 115.不同的子序列

标签: `dynamic-programming`, `string`

难度: Hard

通过率: 48.92%

原题链接: https://leetcode.com/problems/distinct-subsequences/description/

## 题目描述
给定两个字符串 $s$ 和 $t$，返回 $s$ 的不同子序列中等于 $t$ 的个数。

## 解题思路
这个问题可以通过动态规划来解决。我们定义一个二维数组 $dp$，其中 $dp[i][j]$ 表示 $s[0:i]$ 中子序列等于 $t[0:j]$ 的个数。显然，如果 $j = 0$，即 $t$ 是空串，那么 $s[0:i]$ 总有一个子序列等于空串，这个子序列就是空串本身，所以 $dp[i][0] = 1$ 对于所有 $i$ 生效。`如果 $i = 0$ （但 $j \neq 0$），那么 $dp[0][j] = 0$，因为没有任何子序列。`接下来，我们讨论如何填充 $dp$ 数组的其他部分：

- 如果当前字符 $s[i]$ 等于 $t[j]$，那么我们有两种选择：一是选择使用 $s[i]$，这种情况下 $dp[i][j] = dp[i-1][j-1]$；二是不使用 $s[i]$，这种情况下 $dp[i][j] = dp[i-1][j]$。总体而言，我们有 $dp[i][j] = dp[i-1][j] + dp[i-1][j-1]$。
- 如果当前字符 $s[i]$ 不等于 $t[j]$，那么我们只能选择不使用 $s[i]$，此时 $dp[i][j] = dp[i-1][j]$。

最终答案是 $dp[len(s)][len(t)]$。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def numDistinct(s: str, t: str) -> int:    # 初始化 dp 数组，进行填充    m, n = len(s), len(t)    dp = [[0] * (n + 1) for _ in range(m + 1)]    # dp 初始化：空字符串匹配的情况    for i in range(m + 1):        dp[i][0] = 1    # 填充 dp 数组    for i in range(1, m + 1):        for j in range(1, n + 1):            # 若 s[i-1] == t[j-1]，同时考虑使用和不使用这两个字符            if s[i - 1] == t[j - 1]:                dp[i][j] = dp[i - 1][j] + dp[i - 1][j - 1]            else:                # 仅考虑不使用 s[i-1]                dp[i][j] = dp[i - 1][j]    return dp[m][n]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int numDistinct(string s, string t) {    int m = s.size(), n = t.size();    vector<vector<long>> dp(m + 1, vector<long>(n + 1, 0));    // 初始化 dp 数组    for(int i = 0; i <= m; ++i) {        dp[i][0] = 1;    }    for(int i = 1; i <= m; ++i) {        for(int j = 1; j <= n; ++j) {            if(s[i - 1] == t[j - 1]) {                dp[i][j] = dp[i - 1][j] + dp[i - 1][j - 1];            } else {                dp[i][j] = dp[i - 1][j];            }        }    }    return dp[m][n];}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function numDistinct(s, t) {    const m = s.length, n = t.length;    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));    // 初始化 dp 数组    for (let i = 0; i <= m; i++) {        dp[i][0] = 1;    }    for (let i = 1; i <= m; i++) {        for (let j = 1; j <= n; j++) {            if (s[i - 1] === t[j - 1]) {                dp[i][j] = dp[i - 1][j] + dp[i - 1][j - 1];            } else {                dp[i][j] = dp[i - 1][j];            }        }    }    return dp[m][n];}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int numDistinct(String s, String t) {    int m = s.length(), n = t.length();    long[][] dp = new long[m + 1][n + 1];    // 初始化 dp 数组    for (int i = 0; i <= m; i++) {        dp[i][0] = 1;    }    for (int i = 1; i <= m; i++) {        for (int j = 1; j <= n; j++) {            if (s.charAt(i - 1) == t.charAt(j - 1)) {                dp[i][j] = dp[i - 1][j] + dp[i - 1][j - 1];            } else {                dp[i][j] = dp[i - 1][j];            }        }    }    return (int) dp[m][n];}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度: $O(m \cdot n)$，其中 $m$ 是字符串 $s$ 的长度，$n$ 是字符串 $t$ 的长度。`需要填充一个大小为 $m \times n$ 的 dp 表。
- 空间复杂度: $O(m \cdot n)$，用于存储 dp 表。
