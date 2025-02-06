---
sidebar_position: 72
tags:
  - dynamic-programming
  - string
  - Medium
---

# 72.编辑距离

标签: `dynamic-programming`, `string`

难度: Medium

通过率: 57.8%

原题链接: https://leetcode.com/problems/edit-distance/description/

## 题目描述
给定两个字符串 word1 和 word2，返回将 word1 转换为 word2 所需的最小操作数。你可以对一个单词进行以下三种操作：

- 插入一个字符
- 删除一个字符
- 替换一个字符

## 解题思路
编辑距离问题可以使用动态规划来解决。我们定义一个二维数组 $dp$，其中 $dp[i][j]$ 表示将字符串 $word1$ 的前 $i$ 个字符转换为 $word2$ 的前 $j$ 个字符所需的编辑距离。

初始化：
- $dp[0][0] = 0$，两个空字符串的编辑距离为 0。
- $dp[i][0] = i$，需要对 $word1$ 的前 $i$ 个字符进行 $i$ 次删除操作来转换成空字符串。
- $dp[0][j] = j$，需要对空字符串进行 $j$ 次插入操作来转换成 $word2$ 的前 $j$ 个字符。

状态转移方程：
1. 如果 $word1[i-1] == word2[j-1]$，则 $dp[i][j] = dp[i-1][j-1]$。
2. 如果 $word1[i-1] \neq word2[j-1]$，则需要考虑：
   - 替换操作：$dp[i][j] = 1 + dp[i-1][j-1]$
   - 插入操作：$dp[i][j] = 1 + dp[i][j-1]$
   - 删除操作：$dp[i][j] = 1 + dp[i-1][j]$
   
选择其中的最小值作为当前的结果。

最终答案为 $dp[m][n]$，其中 $m$ 和 $n$ 分别是 $word1$ 和 $word2$ 的长度。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def minDistance(word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    # 创建 DP 数组，大小为 (m+1) x (n+1)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # 初始化边界条件
    for i in range(m + 1):
        dp[i][0] = i  # word1 的前 i 个字符到空字符串的距离
    for j in range(n + 1):
        dp[0][j] = j  # 空字符串到 word2 的前 j 个字符的距离

    # 填充 DP 数组
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]  # 字符相同，无需操作
            else:
                dp[i][j] = min(
                    dp[i - 1][j - 1],  # 替换
                    dp[i][j - 1],      # 插入
                    dp[i - 1][j]       # 删除
                ) + 1

    # 返回最终的编辑距离
    return dp[m][n]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int minDistance(string word1, string word2) {
    int m = word1.length();
    int n = word2.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

    // 初始化边界条件
    for (int i = 0; i <= m; ++i) dp[i][0] = i;
    for (int j = 0; j <= n; ++j) dp[0][j] = j;

    // 填充 DP 数组
    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (word1[i - 1] == word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];  // 字符相同，无需操作
            } else {
                dp[i][j] = min({dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]}) + 1;
            }
        }
    }

    // 返回最终的编辑距离
    return dp[m][n];
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function minDistance(word1, word2) {
    const m = word1.length;
    const n = word2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    // 初始化边界条件
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    // 填充 DP 数组
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i - 1] === word2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];  // 字符相同，无需操作
            } else {
                dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]) + 1;
            }
        }
    }

    // 返回最终的编辑距离
    return dp[m][n];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int minDistance(String word1, String word2) {
    int m = word1.length();
    int n = word2.length();
    int[][] dp = new int[m + 1][n + 1];

    // 初始化边界条件
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;

    // 填充 DP 数组
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1];  // 字符相同，无需操作
            } else {
                dp[i][j] = Math.min(dp[i - 1][j - 1], Math.min(dp[i][j - 1], dp[i - 1][j])) + 1;
            }
        }
    }

    // 返回最终的编辑距离
    return dp[m][n];
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(m \times n)$，其中 $m$ 和 $n$ 分别是 $word1$ 和 $word2$ 的长度。我们需要填充一个大小为 $m \times n$ 的 DP 表。
- 空间复杂度：$O(m \times n)$，用于存储 DP 表。
