---
sidebar_position: 417
tags:
  - depth-first-search
  - breadth-first-search
  - graph
  - Medium
---

# 417.太平洋大西洋水流问题

标签: `depth-first-search`, `breadth-first-search`, `graph`

难度: Medium

通过率: 56.49%

原题链接: https://leetcode.com/problems/pacific-atlantic-water-flow/description/

## 题目描述
在一个矩形岛上，岛的左边界和上边界接触太平洋，右边界和下边界接触大西洋。给定一个m x n的整数矩阵heights，其中heights[r][c]表示坐标(r, c)处的高度。每单位降雨可以流到相邻的北、南、东、西方向，如果相邻的单元高度小于等于当前单元高度。请返回一个2D列表，列表中的每个元素是一个坐标[result[i] = [ri, ci]]，表示在这个位置降下的雨水可以流向太平洋和大西洋。

## 解题思路
可以采用逆向思维来解决这个问题。对于每一个能够流到某个海洋的点，我们用搜索算法来找到所有可能流到那个海洋的点。具体步骤如下：

1. 使用深度优先搜索（DFS）或广度优先搜索（BFS）分别从太平洋和大西洋的边界开始进行逆流搜索。即，从边界开始，寻找所有能够流入该海洋的点。

2. 根据题意，太平洋与矩阵的左边界和上边界相邻，可以在这些边界初始化DFS或BFS；大西洋与右边界和下边界相邻。同样在这些边界初始化搜索。

3. 对于每一个搜索起始点，尝试从该点向四周(上下左右)流动，条件是目标位置的高度大于等于当前节点的高度，并且目标点未被访问过。

4. 最终的答案是那些既能流入太平洋，又能流入大西洋的点。因此，我们需要找出在两次搜索中都被访问过的点。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def pacificAtlantic(heights):
    if not heights or not heights[0]:
        return []
    
    m, n = len(heights), len(heights[0])
    pacific_reachable = [[False]*n for _ in range(m)]
    atlantic_reachable = [[False]*n for _ in range(m)]

    def dfs(x, y, reachable):
        reachable[x][y] = True
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            new_x, new_y = x + dx, y + dy
            if 0 <= new_x < m and 0 <= new_y < n and not reachable[new_x][new_y] and heights[new_x][new_y] >= heights[x][y]:
                dfs(new_x, new_y, reachable)

    for y in range(n):
        dfs(0, y, pacific_reachable)   # Top edge (Pacific)
        dfs(m-1, y, atlantic_reachable) # Bottom edge (Atlantic)
    for x in range(m):
        dfs(x, 0, pacific_reachable)   # Left edge (Pacific)
        dfs(x, n-1, atlantic_reachable) # Right edge (Atlantic)

    result = []
    for x in range(m):
        for y in range(n):
            if pacific_reachable[x][y] and atlantic_reachable[x][y]:
                result.append([x, y])

    return result
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
    void dfs(int[][] heights, boolean[][] reachable, int i, int j) {
        int m = heights.length, n = heights[0].length;
        reachable[i][j] = true;
        int[] dx = {-1, 1, 0, 0};
        int[] dy = {0, 0, -1, 1};
        for (int d = 0; d < 4; d++) {
            int x = i + dx[d], y = j + dy[d];
            if (x >= 0 && x < m && y >= 0 && y < n && !reachable[x][y] && heights[x][y] >= heights[i][j]) {
                dfs(heights, reachable, x, y);
            }
        }
    }
    
    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        List<List<Integer>> result = new ArrayList<>();
        if (heights == null || heights.length == 0 || heights[0].length == 0)
            return result;
        int m = heights.length, n = heights[0].length;
        boolean[][] pacific = new boolean[m][n];
        boolean[][] atlantic = new boolean[m][n];
        for (int i = 0; i < m; i++) {
            dfs(heights, pacific, i, 0);
            dfs(heights, atlantic, i, n - 1);
        }
        for (int j = 0; j < n; j++) {
            dfs(heights, pacific, 0, j);
            dfs(heights, atlantic, m - 1, j);
        }
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (pacific[i][j] && atlantic[i][j])
                    result.add(Arrays.asList(i, j));
            }
        }
        return result;
    }
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function pacificAtlantic(heights) {
    if (!heights || !heights.length) return [];
    const m = heights.length, n = heights[0].length;
    const pacificReachable = Array.from({length: m}, () => Array(n).fill(false));
    const atlanticReachable = Array.from({length: m}, () => Array(n).fill(false));

    const dfs = (x, y, reachable) => {
        reachable[x][y] = true;
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        directions.forEach(([dx, dy]) => {
            const newX = x + dx, newY = y + dy;
            if (
                newX >= 0 && newX < m && newY >= 0 && newY < n &&
                !reachable[newX][newY] && heights[newX][newY] >= heights[x][y]
            ) {
                dfs(newX, newY, reachable);
            }
        });
    };

    for (let i = 0; i < m; i++) {
        dfs(i, 0, pacificReachable);  // Left edge (Pacific)
        dfs(i, n - 1, atlanticReachable); // Right edge (Atlantic)
    }

    for (let j = 0; j < n; j++) {
        dfs(0, j, pacificReachable);  // Top edge (Pacific)
        dfs(m - 1, j, atlanticReachable); // Bottom edge (Atlantic)
    }

    const result = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (pacificReachable[i][j] && atlanticReachable[i][j]) {
                result.push([i, j]);
            }
        }
    }

    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

public class Solution {
    private static final int[][] DIRECTIONS = new int[][]{{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    public List<List<Integer>> pacificAtlantic(int[][] heights) {
        if (heights == null || heights.length == 0 || heights[0].length == 0) return Collections.emptyList();
        int m = heights.length, n = heights[0].length;
        boolean[][] pacificReachable = new boolean[m][n];
        boolean[][] atlanticReachable = new boolean[m][n];

        for (int i = 0; i < m; i++) {
            dfs(heights, pacificReachable, i, 0);
            dfs(heights, atlanticReachable, i, n - 1);
        }
        for (int j = 0; j < n; j++) {
            dfs(heights, pacificReachable, 0, j);
            dfs(heights, atlanticReachable, m - 1, j);
        }

        List<List<Integer>> result = new ArrayList<>();
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (pacificReachable[i][j] && atlanticReachable[i][j]) {
                    result.add(Arrays.asList(i, j));
                }
            }
        }

        return result;
    }

    private void dfs(int[][] heights, boolean[][] reachable, int i, int j) {
        int m = heights.length, n = heights[0].length;
        reachable[i][j] = true;
        for (int[] dir : DIRECTIONS) {
            int x = i + dir[0], y = j + dir[1];
            if (x >= 0 && x < m && y >= 0 && y < n && !reachable[x][y] && heights[x][y] >= heights[i][j]) {
                dfs(heights, reachable, x, y);
            }
        }
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：

$O(m \times n)$，其中$m$是矩阵的行数，$n$是矩阵的列数。我们为每个点在两个DFS中最多各访问一次。

空间复杂度：

$O(m \times n)$，我们使用两个二维布尔数组来记录哪些格子可以流向太平洋和大西洋。
