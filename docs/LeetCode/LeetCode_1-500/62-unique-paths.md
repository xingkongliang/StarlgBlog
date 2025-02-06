---
sidebar_position: 62
tags:
  - dynamic-programming
  - math
  - Medium
---

# 62.独特路径

标签: `dynamic-programming`, `math`

难度: Medium

通过率: 65.13%

原题链接: https://leetcode.com/problems/unique-paths/description/

## 题目描述
一个机器人位于一个 $m \times n$ 的网格的左上角（即起点：grid[0][0]）。机器人每次只能向下或向右移动一步。机器人试图到达网格的右下角（即终点：grid[m-1][n-1]）。问有多少条不同的路径？答案保证在不超过 $2 \times 10^9$。

## 解题思路
要解决这个问题，我们可以使用动态规划。假设我们有一个二维数组 `dp` ，其中 `dp[i][j]` 表示从位置 `(0,0)` 移动到 `(i,j)` 的唯一路径数。`dp` 数组的初始化如下：`dp[0][0] = 1`，因为机器人在起始位置只有一种途径（即不动）。对于第一行和第一列，显然只有1种到达方式，即全向右或全向下。对于其他位置 `(i, j)`，路径数由上方和左方路径数之和得到，即 $dp[i][j] = dp[i-1][j] + dp[i][j-1]$。最终，`dp[m-1][n-1]` 即为所求解。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def uniquePaths(m, n):
    # 初始化m x n的dp数组，所有元素初始化为1
    dp = [[1]*n for _ in range(m)]
    # 填充dp数组
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
    # 返回右下角的路径数
    return dp[-1][-1]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int uniquePaths(int m, int n) {
    // 创建一个m x n的dp数组并初始化为1
    vector<vector<int>> dp(m, vector<int>(n, 1));
    // 填充dp数组
    for (int i = 1; i < m; ++i) {
        for (int j = 1; j < n; ++j) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    // 返回右下角的路径数
    return dp[m-1][n-1];
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function uniquePaths(m, n) {
    // 创建一个m x n的二维数组并初始化为1
    const dp = Array.from({ length: m }, () => Array(n).fill(1));
    // 填充dp数组
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    // 返回右下角的路径数
    return dp[m-1][n-1];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int uniquePaths(int m, int n) {
    // 创建一个m x n的dp数组并初始化为1
    int[][] dp = new int[m][n];
    for (int[] row : dp) {
        Arrays.fill(row, 1);
    }
    // 填充dp数组
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[i][j] = dp[i-1][j] + dp[i][j-1];
        }
    }
    // 返回右下角的路径数
    return dp[m-1][n-1];
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(m \times n)$，因为我们需要填满一个 $m \times n$ 的数组。`
`空间复杂度：$O(m \times n)$，因为我们使用了一个 $m \times n$ 的数组来存储中间结果。
