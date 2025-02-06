---
sidebar_position: 63
tags:
  - array
  - dynamic-programming
  - Medium
---

# 63.路径总数 II

标签: `array`, `dynamic-programming`

难度: Medium

通过率: 42.49%

原题链接: https://leetcode.com/problems/unique-paths-ii/description/

## 题目描述
给定一个 $m \times n$ 的整数数组 grid，机器人最初位于左上角（即 grid[0][0]）。机器人试图移动到右下角（即 grid[m - 1][n - 1]）。机器人每次只能向下或者向右移动。网格中的障碍物和空地分别用 1 和 0 标识。机器人所走的路径不能包含任何障碍物的方格。返回机器人到达右下角的可能的不同路径的数量。

## 解题思路
这个问题可以用动态规划来解决。我们定义一个与输入网格 `obstacleGrid` 大小相同的二维数组 `dp`，其中 `dp[i][j]` 表示从起点 `(0, 0)` 到达位置 `(i, j)` 的不同路径数量。初始化时，如果起始点 `(0, 0)` 是障碍物，返回 0，因为此时没有路径可以到达终点。否则，`dp[0][0]` 应被初始化为 1，表示从起点到起点有一种路径。随后，我们遍历网格的每个位置 `(i, j)`，如果当前位置是障碍，则 `dp[i][j]` = 0，否则我们可以用以下递推公式计算：`dp[i][j] = dp[i-1][j] + dp[i][j-1]`，这表示当前位置的路径数量是从上方和左方累加来的路径数量之和。最后返回 `dp[m-1][n-1]`，这就是从起点到终点的路径总数。需要注意对边界的处理：`i-1 >= 0` 和 `j-1 >= 0` 确保我们没有访问数组外的元素。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def uniquePathsWithObstacles(obstacleGrid):
    if not obstacleGrid or obstacleGrid[0][0] == 1:
        return 0
    m, n = len(obstacleGrid), len(obstacleGrid[0])
    dp = [[0] * n for _ in range(m)]
    dp[0][0] = 1
    for i in range(m):
        for j in range(n):
            if obstacleGrid[i][j] == 1:
                dp[i][j] = 0
            else:
                if i > 0:
                    dp[i][j] += dp[i-1][j]
                if j > 0:
                    dp[i][j] += dp[i][j-1]
    return dp[m-1][n-1]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
    if (obstacleGrid.empty() || obstacleGrid[0][0] == 1) return 0;
    int m = obstacleGrid.size(), n = obstacleGrid[0].size();
    vector<vector<int>> dp(m, vector<int>(n, 0));
    dp[0][0] = 1;
    for (int i = 0; i < m; ++i) {
        for (int j = 0; j < n; ++j) {
            if (obstacleGrid[i][j] == 1) {
                dp[i][j] = 0;
            } else {
                if (i > 0) dp[i][j] += dp[i-1][j];
                if (j > 0) dp[i][j] += dp[i][j-1];
            }
        }
    }
    return dp[m-1][n-1];
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function uniquePathsWithObstacles(obstacleGrid) {
    if (!obstacleGrid || obstacleGrid[0][0] == 1) return 0;
    const m = obstacleGrid.length;
    const n = obstacleGrid[0].length;
    const dp = Array.from({ length: m }, () => Array(n).fill(0));
    dp[0][0] = 1;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (obstacleGrid[i][j] === 1) {
                dp[i][j] = 0;
            } else {
                if (i > 0) dp[i][j] += dp[i-1][j];
                if (j > 0) dp[i][j] += dp[i][j-1];
            }
        }
    }
    return dp[m-1][n-1];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int uniquePathsWithObstacles(int[][] obstacleGrid) {
    if (obstacleGrid == null || obstacleGrid.length == 0 || obstacleGrid[0][0] == 1) 
        return 0;
    int m = obstacleGrid.length, n = obstacleGrid[0].length;
    int[][] dp = new int[m][n];
    dp[0][0] = 1;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (obstacleGrid[i][j] == 1) {
                dp[i][j] = 0;
            } else {
                if (i > 0) dp[i][j] += dp[i-1][j];
                if (j > 0) dp[i][j] += dp[i][j-1];
            }
        }
    }
    return dp[m-1][n-1];
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(m \times n)$，因为需要遍历整个网格。  
空间复杂度：$O(m \times n)$，用于保存路径计数的dp数组。
