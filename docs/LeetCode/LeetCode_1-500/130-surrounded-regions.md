---
sidebar_position: 130
tags:
  - depth-first-search
  - breadth-first-search
  - graph
  - Medium
---

# 130.被围绕的区域

标签: `depth-first-search`, `breadth-first-search`, `graph`

难度: Medium

通过率: 41.45%

原题链接: https://leetcode.com/problems/surrounded-regions/description/

## 题目描述
给定一个 m x n 的矩阵，矩阵中仅包含 'X' 和 'O'。找到并填充所有被 'X' 围绕的区域：

* 连通性：一个单元格与相邻的水平方向或垂直方向的单元格相连。
* 区域：通过连接每一个 'O' 细胞来形成的区域。
* 围绕：如果该区域与 'X' 细胞相连，并且该区域中的所有细胞都不在棋盘的边缘上，则被认为是被围绕。

被围绕的区域通过将所有 'O' 替换为 'X' 来捕获。

## 输入输出示例

示例 1：

输入: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]

输出: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]

解释: 下方的区域未被捕获，因为它在棋盘的边缘，无法被 'X' 围绕。

示例 2：

输入: board = [["X"]]

输出: [["X"]]

## 解题思路
解决这个问题的关键在于找到所有不会被 'X' 围绕的 'O' 区域。一个有效的策略是从边界上的 'O' 开始，通过 DFS 或 BFS 标记所有相邻的 'O'，这些 'O' 是无法被围绕的。然后，将没有被标记的 'O' 替换为 'X'。

具体步骤如下：

1. 遍历棋盘的四个边界，如果检测到 'O'，则从该单元格开始进行 DFS 或 BFS，将所有与之相连的 'O' 标记为安全（可以用一个临时的字符，比如 '#'）。
2. 完成标记后，遍历整个棋盘。
3. 将剩余的（未标记的） 'O' 替换为 'X'，因为这些 'O' 是被围绕的区域。
4. 将标记为安全的 '#' 转回 'O'。

这样就可以实现对所有被围绕区域的正确捕捉。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class Solution:
    def solve(self, board: List[List[str]]) -> None:
        def dfs(x, y):
            if x < 0 or x >= len(board) or y < 0 or y >= len(board[0]) or board[x][y] != 'O':
                return
            # 标记为临时字符
            board[x][y] = '#'
            # 向上下左右四个方向递归
            dfs(x + 1, y)
            dfs(x - 1, y)
            dfs(x, y + 1)
            dfs(x, y - 1)

        if not board or not board[0]:
            return

        # 从边界开始DFS搜索标记
        for i in range(len(board)):
            dfs(i, 0)
            dfs(i, len(board[0]) - 1)

        for j in range(len(board[0])):
            dfs(0, j)
            dfs(len(board) - 1, j)

        # 遍历整个棋盘
        for i in range(len(board)):
            for j in range(len(board[0])):
                if board[i][j] == 'O':
                    board[i][j] = 'X'  # 被围绕的区域
                elif board[i][j] == '#':
                    board[i][j] = 'O'  # 边界可达的O
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    void solve(vector<vector<char>>& board) {
        if (board.empty() || board[0].empty()) return;
        int m = board.size(), n = board[0].size();

        auto dfs = [&](int x, int y) {
            if (x < 0 || x >= m || y < 0 || y >= n || board[x][y] != 'O') return;
            // 标记该位置
            board[x][y] = '#';
            // 向四个方向搜索
            dfs(x + 1, y);
            dfs(x - 1, y);
            dfs(x, y + 1);
            dfs(x, y - 1);
        };

        // 从边界上的O开始标记
        for (int i = 0; i < m; ++i) {
            dfs(i, 0);
            dfs(i, n - 1);
        }

        for (int j = 0; j < n; ++j) {
            dfs(0, j);
            dfs(m - 1, j);
        }

        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (board[i][j] == 'O')
                    board[i][j] = 'X'; // 被围绕的区域
                else if (board[i][j] == '#')
                    board[i][j] = 'O'; // 没有被围绕的区域
            }
        }
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function solve(board) {
    if (!board.length || !board[0].length) return;
    const m = board.length;
    const n = board[0].length;

    const dfs = (x, y) => {
        if (x < 0 || x >= m || y < 0 || y >= n || board[x][y] !== 'O') return;
        // 标记该单元格为临时字符
        board[x][y] = '#';
        dfs(x + 1, y);
        dfs(x - 1, y);
        dfs(x, y + 1);
        dfs(x, y - 1);
    };

    // 从边界进行DFS搜索标记
    for (let i = 0; i < m; i++) {
        dfs(i, 0);
        dfs(i, n - 1);
    }
    for (let j = 0; j < n; j++) {
        dfs(0, j);
        dfs(m - 1, j);
    }

    // 遍历整个棋盘
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 'O')
                board[i][j] = 'X';
            else if (board[i][j] === '#')
                board[i][j] = 'O';
        }
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public void solve(char[][] board) {
        if (board.length == 0 || board[0].length == 0) return;
        int m = board.length, n = board[0].length;

        // 定义DFS函数
        void dfs(int x, int y) {
            if (x < 0 || x >= m || y < 0 || y >= n || board[x][y] != 'O') return;
            board[x][y] = '#';
            dfs(x + 1, y);
            dfs(x - 1, y);
            dfs(x, y + 1);
            dfs(x, y - 1);
        }

        // 从边界上的O开始标记
        for (int i = 0; i < m; i++) {
            dfs(i, 0);
            dfs(i, n - 1);
        }

        for (int j = 0; j < n; j++) {
            dfs(0, j);
            dfs(m - 1, j);
        }

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == 'O')
                    board[i][j] = 'X'; // 被围绕的区域
                else if (board[i][j] == '#')
                    board[i][j] = 'O'; // 边界可达的O
            }
        }
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(m \times n)$，其中 $m$ 和 $n$ 分别是矩阵的行数和列数，因为我们遍历了整个矩阵。
空间复杂度：$O(m \times n)$，最坏情况下，递归调用栈可能需要存储整个矩阵的每个元素。
