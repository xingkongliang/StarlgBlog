---
sidebar_position: 221
tags:
  - dynamic-programming
  - array
  - Medium
---

# 221.最大正方形

标签: `dynamic-programming`, `array`

难度: Medium

通过率: 47.83%

原题链接: https://leetcode.com/problems/maximal-square/description/

## 题目描述
给定一个由0和1组成的 $m \times n$ 的二进制矩阵，求只包含1的最大正方形，并返回其面积。

## 解题思路
为了找到只包含1的最大正方形，可以使用动态规划来解决。我们定义一个二维数组 $dp$，其中 $dp[i][j]$ 表示以 $(i, j)$ 为右下角的最大正方形的边长。基本思路如下：

1. 初始化：为了避免边界问题，可以在矩阵周围添加一层0。这样初始化后的 $dp$ 矩阵大小为 $(m+1) \times (n+1)$，且初始值都为0。
2. 状态转移：对于每个位置 $(i, j)$，如果 $matrix[i-1][j-1]$ 为1，则 $dp[i][j] = \min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1$，这个公式的意思是，当前单元格可以作为正方形的右下角，只有在其左方、上方和左上方单元格都能构成更大的正方形的情况下，而最小值加1表示包裹当前单元格的最大正方形边长。
3. 迭代整个矩阵并更新 $dp$ 矩阵，在更新的过程中跟踪最大边长。
4. 最后，最大正方形的面积即为最大边长的平方。

总之，通过动态规划，我们能高效地计算出最大正方形的面积。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def maximalSquare(matrix):
    # 获取矩阵的行数和列数
    if not matrix:
        return 0
    rows, cols = len(matrix), len(matrix[0])
    
    # 初始化dp数组，大小为(rows+1)x(cols+1)
    dp = [[0] * (cols + 1) for _ in range(rows + 1)]
    max_len = 0
    
    # 遍历矩阵从1开始避免边界情况
    for i in range(1, rows + 1):
        for j in range(1, cols + 1):
            if matrix[i - 1][j - 1] == '1':
                # 动态规划转移公式
                dp[i][j] = min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
                max_len = max(max_len, dp[i][j])
    
    # 返回最大边长的平方即为最大正方形的面积
    return max_len * max_len
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int maximalSquare(vector<vector<char>>& matrix) {
    if (matrix.empty() || matrix[0].empty()) return 0;
    int rows = matrix.size(), cols = matrix[0].size();
    vector<vector<int>> dp(rows + 1, vector<int>(cols + 1, 0));
    int max_len = 0;
    for (int i = 1; i <= rows; ++i) {
        for (int j = 1; j <= cols; ++j) {
            if (matrix[i - 1][j - 1] == '1') {
                dp[i][j] = min({dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]}) + 1;
                max_len = max(max_len, dp[i][j]);
            }
        }
    }
    return max_len * max_len;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function maximalSquare(matrix) {
    if (!matrix.length || !matrix[0].length) return 0;
    const rows = matrix.length, cols = matrix[0].length;
    const dp = Array.from({ length: rows + 1 }, () => Array(cols + 1).fill(0));
    let maxLen = 0;
    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= cols; j++) {
            if (matrix[i - 1][j - 1] === '1') {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
                maxLen = Math.max(maxLen, dp[i][j]);
            }
        }
    }
    return maxLen * maxLen;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int maximalSquare(char[][] matrix) {
    if (matrix.length == 0 || matrix[0].length == 0) return 0;
    int rows = matrix.length, cols = matrix[0].length;
    int[][] dp = new int[rows + 1][cols + 1];
    int maxLen = 0;
    for (int i = 1; i <= rows; i++) {
        for (int j = 1; j <= cols; j++) {
            if (matrix[i - 1][j - 1] == '1') {
                dp[i][j] = Math.min(Math.min(dp[i - 1][j], dp[i][j - 1]), dp[i - 1][j - 1]) + 1;
                maxLen = Math.max(maxLen, dp[i][j]);
            }
        }
    }
    return maxLen * maxLen;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(m \times n)$，其中 $m$ 是矩阵的行数，$n$ 是矩阵的列数，因为我们需要遍历整个矩阵。

空间复杂度为 $O(m \times n)$，因为我们使用了一个与输入矩阵大小相同的二维数组来存储动态规划的结果。
