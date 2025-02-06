---
sidebar_position: 329
tags:
  - depth-first-search
  - dynamic-programming
  - graph
  - Hard
---

# 329.矩阵中的最长递增路径

标签: `depth-first-search`, `dynamic-programming`, `graph`

难度: Hard

通过率: 54.57%

原题链接: https://leetcode.com/problems/longest-increasing-path-in-a-matrix/description/

## 题目描述
给定一个 $m \times n$ 的整数矩阵，返回矩阵中最长递增路径的长度。

## 解题思路
这个问题可以通过深度优先搜索（DFS）结合记忆化搜索（缓存中间结果）来解决。由于每个位置的状态唯一由它所在的值和位置决定，因此可以使用记忆化来避免重复计算。同样对于每个单元格，我们考虑它的四个可能的方向来进行递增路径的判断。具体步骤如下：

1. 对于每一个单元格，使用DFS探测四个可能的方向（上下左右），前提是能够递增，即只有周围单元格数值大于当前单元格时才能继续探测。
2. 使用一个memo矩阵来存储每个位置的最长递增路径长度，避免重复计算。
3. 对矩阵的每一个单元格执行一次DFS，最大化地计算所有可能的路径。
4. 结果为探索结束时记录的最大路径长度。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def longestIncreasingPath(matrix):
    if not matrix or not matrix[0]:
        return 0

    rows, cols = len(matrix), len(matrix[0])
    memo = [[0] * cols for _ in range(rows)]
    directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]  # 上、下、左、右

    def dfs(r, c):
        if memo[r][c]:
            return memo[r][c]

        max_length = 1
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and matrix[nr][nc] > matrix[r][c]:
                max_length = max(max_length, 1 + dfs(nr, nc))

        memo[r][c] = max_length
        return max_length

    return max(dfs(r, c) for r in range(rows) for c in range(cols))
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        if (matrix.empty() || matrix[0].empty()) return 0;
        int rows = matrix.size(), cols = matrix[0].size();
        vector<vector<int>> memo(rows, vector<int>(cols, 0));
        vector<pair<int, int>> directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

        function<int(int, int)> dfs = [&](int r, int c) {
            if (memo[r][c]) return memo[r][c];

            int max_length = 1;
            for (auto& [dr, dc] : directions) {
                int nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && matrix[nr][nc] > matrix[r][c]) {
                    max_length = max(max_length, 1 + dfs(nr, nc));
                }
            }

            return memo[r][c] = max_length;
        };

        int max_len = 0;
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < cols; ++c) {
                max_len = max(max_len, dfs(r, c));
            }
        }

        return max_len;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
var longestIncreasingPath = function(matrix) {
    if (!matrix || !matrix.length || !matrix[0].length) return 0;
    const rows = matrix.length, cols = matrix[0].length;
    const memo = Array(rows).fill(0).map(() => Array(cols).fill(0));
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    const dfs = (r, c) => {
        if (memo[r][c]) return memo[r][c];

        let max_length = 1;
        for (const [dr, dc] of directions) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && matrix[nr][nc] > matrix[r][c]) {
                max_length = Math.max(max_length, 1 + dfs(nr, nc));
            }
        }

        return memo[r][c] = max_length;
    };

    let max_len = 0;
    for (let r = 0; r < rows; ++r) {
        for (let c = 0; c < cols; ++c) {
            max_len = Math.max(max_len, dfs(r, c));
        }
    }

    return max_len;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    private int[][] directions = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    public int longestIncreasingPath(int[][] matrix) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return 0;
        int rows = matrix.length, cols = matrix[0].length;
        int[][] memo = new int[rows][cols];
        int maxLen = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                maxLen = Math.max(maxLen, dfs(matrix, r, c, memo));
            }
        }
        return maxLen;
    }

    private int dfs(int[][] matrix, int r, int c, int[][] memo) {
        if (memo[r][c] != 0) return memo[r][c];

        int maxLength = 1;
        for (int[] direction : directions) {
            int nr = r + direction[0], nc = c + direction[1];
            if (nr >= 0 && nr < matrix.length && nc >= 0 && nc < matrix[0].length 
                && matrix[nr][nc] > matrix[r][c]) {
                maxLength = Math.max(maxLength, 1 + dfs(matrix, nr, nc, memo));
            }
        }
        return memo[r][c] = maxLength;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：每个位置在DFS时均有其子路径的递归执行，因此总体时间复杂度为 $O(m \times n)$。  
  
空间复杂度：由于使用了记忆化矩阵，其空间复杂度也为 $O(m \times n)$。
