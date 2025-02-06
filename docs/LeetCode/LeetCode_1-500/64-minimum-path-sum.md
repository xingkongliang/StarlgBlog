---
sidebar_position: 64
tags:
  - array
  - dynamic-programming
  - Medium
---

# 64.最小路径和

标签: `array`, `dynamic-programming`

难度: Medium

通过率: 65.42%

原题链接: https://leetcode.com/problems/minimum-path-sum/description/

## 题目描述
给定一个包含非负整数的 $m \times n$ 网格，找出一条从左上角到右下角的路径，使得路径上的数字总和最小。**注意：每次只能向下或者向右移动。**

## 解题思路
为了求出从左上角到右下角的最小路径和，可以使用动态规划的方法来解决这个问题：

1. 定义一个 2D 数组 `dp`，其中 `dp[i][j]` 表示从位置 `(0,0)` 到 `(i,j)` 的最小路径和。

2. 初始化：
   - `dp[0][0]` 即为 `grid[0][0]`，因为从起点到起点的路径和就是起点的值。
   - 第一行的其他元素 `dp[0][j] = dp[0][j-1] + grid[0][j]`，这是因为在第一行上只能从左向右移动。
   - 第一列的其他元素 `dp[i][0] = dp[i-1][0] + grid[i][0]`，因为在第一列上只能从上向下移动。

3. 递推公式：对于其他位置 `(i,j)`，可以选择从上面 `(i-1,j)` 移动下来或者从左边 `(i,j-1)` 移动过来，所以：
   $$ dp[i][j] = \min(dp[i-1][j], dp[i][j-1]) + grid[i][j] $$

4. 目标：最终我们需要的结果就是 `dp[m-1][n-1]`，即达到网格右下角位置的最小路径和。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def minPathSum(grid):
    # 获取网格的大小
    m, n = len(grid), len(grid[0])
    
    # 初始化dp数组，与grid大小一致，用于存储最小路径和
    dp = [[0] * n for _ in range(m)]
    
    # 初始化起点位置的值
    dp[0][0] = grid[0][0]
    
    # 初始化第一行
    for j in range(1, n):
        dp[0][j] = dp[0][j - 1] + grid[0][j]
    
    # 初始化第一列
    for i in range(1, m):
        dp[i][0] = dp[i - 1][0] + grid[i][0]
    
    # 填充其余的dp表
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
    
    # 返回右下角位置的dp值
    return dp[m - 1][n - 1]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size();
        int n = grid[0].size();
        vector<vector<int>> dp(m, vector<int>(n, 0));
        
        dp[0][0] = grid[0][0];
        
        for (int j = 1; j < n; j++) {
            dp[0][j] = dp[0][j - 1] + grid[0][j];
        }
        
        for (int i = 1; i < m; i++) {
            dp[i][0] = dp[i - 1][0] + grid[i][0];
        }
        
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
            }
        }
        
        return dp[m - 1][n - 1];
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function minPathSum(grid) {
    let m = grid.length;
    let n = grid[0].length;
    let dp = Array.from({ length: m }, () => Array(n).fill(0));
    
    dp[0][0] = grid[0][0];
    
    for (let j = 1; j < n; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j];
    }

    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
        }
    }
    
    return dp[m - 1][n - 1];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int minPathSum(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        int[][] dp = new int[m][n];

        dp[0][0] = grid[0][0];

        for (int j = 1; j < n; j++) {
            dp[0][j] = dp[0][j - 1] + grid[0][j];
        }

        for (int i = 1; i < m; i++) {
            dp[i][0] = dp[i - 1][0] + grid[i][0];
        }

        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
            }
        }

        return dp[m - 1][n - 1];
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(m \times n)$ ，其中 $m$ 和 $n$ 分别是网格的行数和列数。我们需要遍历整个网格的每个单元格来计算最小路径和。`
空间复杂度：$O(m \times n)$ 。需要一个与网格大小相同的二维数组来存储动态规划的结果。`
