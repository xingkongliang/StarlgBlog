---
sidebar_position: 200
tags:
  - depth-first-search
  - breadth-first-search
  - union-find
  - Medium
---

# 200.岛屿数量

标签: `depth-first-search`, `breadth-first-search`, `union-find`

难度: Medium

通过率: 61.03%

原题链接: https://leetcode.com/problems/number-of-islands/description/

## 题目描述
给定一个大小为 $m \times n$ 的二进制网格 `grid`，该网格表示地图上的 '1'（陆地）和 '0'（水域）。返回岛屿的数量。一个岛屿是由水平或垂直连接的陆地组成，且周围被水域包围。假设网格的四个边均被水域包围。

## 解题思路
为了求解岛屿的数量，可以采用深度优先搜索（DFS）或广度优先搜索（BFS）的算法。总体思路是在遍历网格时，每当遇到一个新的陆地（'1'），即找到了一个岛屿，随即使用DFS或BFS遍历标记连接的所有陆地为已访问（可以将其值改为'0'，表示水或者已访问），以避免重复统计。每成功标记一个新的岛屿后，岛屿计数器加一。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def numIslands(grid):
    if not grid:
        return 0
    
    def dfs(i, j):
        # 如果坐标超出边界或者当前是水则返回
        if i < 0 or i >= len(grid) or j < 0 or j >= len(grid[0]) or grid[i][j] == '0':
            return
        # 标记当前陆地为已访问
        grid[i][j] = '0'
        # 递归地检查其上下左右的陆地
        dfs(i + 1, j)
        dfs(i - 1, j)
        dfs(i, j + 1)
        dfs(i, j - 1)

    count = 0
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == '1':  # 发现一个新的岛屿
                count += 1
                dfs(i, j)
    return count
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty()) return 0;
        int count = 0;
        int m = grid.size();
        int n = grid[0].size();
        
        // 深度优先搜索函数
        auto dfs = [&](int i, int j) {
            if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] == '0')
                return;
            grid[i][j] = '0'; // 标记当前陆地为已访问
            dfs(i + 1, j);
            dfs(i - 1, j);
            dfs(i, j + 1);
            dfs(i, j - 1);
        };
        
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (grid[i][j] == '1') {  // 发现一个新的岛屿
                    ++count;
                    dfs(i, j);
                }
            }
        }
        return count;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;

    const dfs = (i, j) => {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === '0')
            return;
        grid[i][j] = '0'; // 标记当前节点为已访问
        dfs(i + 1, j);
        dfs(i - 1, j);
        dfs(i, j + 1);
        dfs(i, j - 1);
    };

    let count = 0;
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === '1') {
                count++;
                dfs(i, j);
            }
        }
    }
    return count;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) {
            return 0;
        }
        int count = 0;
        int m = grid.length;
        int n = grid[0].length;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j);
                }
            }
        }
        return count;
    }
    
    private void dfs(char[][] grid, int i, int j) {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] == '0') {
            return;
        }
        grid[i][j] = '0'; // 标记为访问过
        dfs(grid, i + 1, j);
        dfs(grid, i - 1, j);
        dfs(grid, i, j + 1);
        dfs(grid, i, j - 1);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度是 $O(m \cdot n)$，因为每个网格的位置最多只会被访问一次。  
  
空间复杂度是 $O(m \cdot n)$，在最坏情况下（整个矩阵都是陆地）递归调用栈的大小。  
