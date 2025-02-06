---
sidebar_position: 289
tags:
  - array
  - design
  - Medium
---

# 289.生命游戏

标签: `array`, `design`

难度: Medium

通过率: 70.5%

原题链接: https://leetcode.com/problems/game-of-life/description/

## 题目描述
生命游戏是由英国数学家 John Horton Conway 在1970年发明的细胞自动机。

棋盘由 m x n 网格组成，其中每个单元格都有一个初始状态：存活（用 1 表示）或死亡（用 0 表示）。每个单元格与其八个邻居（水平，垂直，对角线）交互，并根据以下四个规则更新状态：

1. 任何存活单元格如果少于两个存活邻居，则因人口不足而死亡。
2. 任何存活单元格如果有两个或三个存活邻居，则存活到下一代。
3. 任何存活单元格如果多于三个存活邻居，则因人口过多而死亡。
4. 任何死亡单元格如果恰好有三个存活邻居，则复活成为存活单元格。

给定当前棋盘的状态，更新棋盘以反映其下一个状态。

## 解题思路
为了在不创建副本的情况下更新棋盘，使用一些编码技巧来临时保存新状态。具体来说，

- 使用 2 位数的二进制来表示单元格的当前和下一个状态。
  - 例如，更新某格状态时，使用不同的数字来标记：
    - `01`：当前状态为 0，下一状态为 1
    - `10`：当前状态为 1，下一状态为 0

具体步骤：
1. 扫描整个网格，计算每个单元格的活邻居数量。
2. 根据当前状态和活邻居数量更新单元格成二进制数的形式。
3. 重新扫描网格，将每个单元格的状态更新成新的状态。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# 使用标记法在 Python 中实现。
# 我们使用2位二进制数表示旧状态和新状态以进行临时标记。
class Solution:
    def gameOfLife(self, board):
        def count_live_neighbors(x, y):
            # 计算活邻居数量。
            directions = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]
            count = 0
            for dx, dy in directions:
                nx, ny = x + dx, y + dy
                if 0 <= nx < len(board) and 0 <= ny < len(board[0]):
                    count += board[nx][ny] & 1
            return count
        
        for i in range(len(board)):
            for j in range(len(board[0])):
                live_neighbors = count_live_neighbors(i, j)
                
                # 当前是活的
                if board[i][j] == 1:
                    # 两个或三个活邻居时维持活态
                    if live_neighbors in [2, 3]:
                        board[i][j] = 3  # 3 = 11 表示其当前活，下一状态活
                else:
                    # 恰好三个活邻居时复活
                    if live_neighbors == 3:
                        board[i][j] = 2  # 2 = 10 表示其当前死，下一状态活
        
        # 更新状态
        for i in range(len(board)):
            for j in range(len(board[0])):
                board[i][j] >>= 1  # 右移一位，更新到新的状态
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++ 实现同样的方法。
#include <vector>
using namespace std;

class Solution {
public:
    void gameOfLife(vector<vector<int>>& board) {
        int directions[8][2] = {{-1, -1}, {-1, 0}, {-1, 1}, {0, -1}, {0, 1}, {1, -1}, {1, 0}, {1, 1}};

        int m = board.size(), n = board[0].size();

        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                int live_neighbors = 0;

                for (int k = 0; k < 8; ++k) {
                    int x = i + directions[k][0];
                    int y = j + directions[k][1];
                    if (x >= 0 && x < m && y >= 0 && y < n) {
                        live_neighbors += board[x][y] & 1;  // 保持当前活态的标记
                    }
                }

                if (board[i][j] == 1) {
                    if (live_neighbors == 2 || live_neighbors == 3) {
                        board[i][j] = 3;  // 状态标记：按位更新
                    }
                } else {
                    if (live_neighbors == 3) {
                        board[i][j] = 2;  // 状态标记：按位更新
                    }
                }
            }
        }

        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                board[i][j] >>= 1;  // 更新位
            }
        }
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript 使用两位二进制标记法
var gameOfLife = function(board) {
    const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const m = board.length, n = board[0].length;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let live_neighbors = 0;
            for (let [dx, dy] of directions) {
                const ni = i + dx, nj = j + dy;
                if (ni >= 0 && ni < m && nj >= 0 && nj < n) {
                    live_neighbors += board[ni][nj] & 1;
                }
            }

            if (board[i][j] === 1 && (live_neighbors === 2 || live_neighbors === 3)) {
                board[i][j] = 3;  // 按位更新：当前活，下一状态也活
            }
            if (board[i][j] === 0 && live_neighbors === 3) {
                board[i][j] = 2;  // 按位更新：当前死，下一状态活
            }
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            board[i][j] >>= 1;  // 右移更新
        }
    }
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java 版本实现
class Solution {
    public void gameOfLife(int[][] board) {
        int[] dx = {-1, -1, -1, 0, 0, 1, 1, 1};
        int[] dy = {-1, 0, 1, -1, 1, -1, 0, 1};
        int m = board.length, n = board[0].length;

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                int liveNeighbors = 0;
                for (int k = 0; k < 8; k++) {
                    int x = i + dx[k];
                    int y = j + dy[k];
                    if (x >= 0 && x < m && y >= 0 && y < n) {
                        liveNeighbors += board[x][y] & 1;
                    }
                }
                if (board[i][j] == 1 && (liveNeighbors == 2 || liveNeighbors == 3)) {
                    board[i][j] = 3; // 当前活，下一状态也活
                }
                if (board[i][j] == 0 && liveNeighbors == 3) {
                    board[i][j] = 2; // 当前死，下一状态活
                }
            }
        }

        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                board[i][j] >>= 1; // 更新至下一状态
            }
        }
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(m \times n)$，其中 $m$ 和 $n$ 分别是棋盘的行数和列数。需要遍历每一个单元格同时计算每个单元格的邻居。  
  
空间复杂度：$O(1)$，因为在原地更新棋盘，没有使用额外的空间。
