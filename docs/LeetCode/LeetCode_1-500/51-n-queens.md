---
sidebar_position: 51
tags:
  - backtracking
  - Hard
---

# 51.N皇后问题

标签: `backtracking`

难度: Hard

通过率: 70.85%

原题链接: https://leetcode.com/problems/n-queens/description/

## 题目描述
给定一个整数 n，返回所有不同的解决 N 皇后问题的方案。你可以按任意顺序返回答案。每个解决方案包含一个独特的 n 皇后问题的棋盘布置，其中 'Q' 和 '.' 分别表示皇后和空格。

## 解题思路
N 皇后问题可以用回溯算法来解决。我们需要在棋盘上放置 n 个皇后，且保证每个皇后不能互相攻击。具体解题思路如下：

1. 使用一个数组 `board` 保存棋盘状态，初始时都是 `.` 表示没有皇后。

2. 定义一个递归函数 `backtrack`：
   - 参数 `row` 表示当前正在尝试在第 `row` 行放置皇后。
   - 如果 `row == n`，说明所有行都成功放置了皇后，将当前棋盘状态保存到结果中。
   - 对于第 `row` 行的每一列，尝试放置皇后，放置后需要检查是否存在冲突：
     - 列冲突：检查当前列是否有皇后。
     - 主对角线冲突：`row - col` 恒等于某个常数。
     - 副对角线冲突：`row + col` 恒等于某个常数。
   - 用集合来跟踪已占用的列和对角线。
   - 如果当前放置合法，则递归调用 `backtrack(row + 1)`。
   - 回溯：撤销当前的放置，尝试下一个位置。

3. 初始化 `n` 行的空棋盘，调用 `backtrack(0)` 开始搜索。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def solveNQueens(n):
    def backtrack(row=0, diagonals=set(), anti_diagonals=set(), cols=set(), state=[]):
        # 如果所有的行都已经填好
        if row == n:
            # 将当前棋盘状态复制一份后加入到结果中
            solutions.append(state.copy())
            return
        for col in range(n):
            # 计算该位置的对角线编号
            diagonal = row - col
            anti_diagonal = row + col
            
            if col in cols or diagonal in diagonals or anti_diagonal in anti_diagonals:  
                continue
            # 放置皇后
            cols.add(col)
            diagonals.add(diagonal)
            anti_diagonals.add(anti_diagonal)
            state.append('.' * col + 'Q' + '.' * (n - col - 1))
            # 继续放置下一行
            backtrack(row + 1, diagonals, anti_diagonals, cols, state)
            # 回溯撤销放置
            cols.remove(col)
            diagonals.remove(diagonal)
            anti_diagonals.remove(anti_diagonal)
            state.pop()
    solutions = []  # 用于保存所有的解
    backtrack()  # 从第 0 行开始
    return solutions
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> solutions;
        vector<string> board(n, string(n, '.'));
        backtrack(board, solutions, 0);
        return solutions;
    }

private:
    void backtrack(vector<string>& board, vector<vector<string>>& solutions, int row) {
        if (row == board.size()) {
            solutions.push_back(board);
            return;
        }
        for (int col = 0; col < board.size(); ++col) {
            if (isValid(board, row, col)) {
                board[row][col] = 'Q';
                backtrack(board, solutions, row + 1);
                board[row][col] = '.';
            }
        }
    }

    bool isValid(vector<string>& board, int row, int col) {
        for (int i = 0; i < row; ++i)
            if (board[i][col] == 'Q')
                return false;
        for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; --i, --j)
            if (board[i][j] == 'Q')
                return false;
        for (int i = row - 1, j = col + 1; i >= 0 && j < board.size(); --i, ++j)
            if (board[i][j] == 'Q')
                return false;
        return true;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
var solveNQueens = function(n) {
    const solutions = [];
    const board = Array.from({ length: n }, () => '.'.repeat(n));

    const backtrack = (row = 0, diagonals = new Set(), antiDiagonals = new Set(), cols = new Set()) => {
        if (row === n) {
            solutions.push([...board]);
            return;
        }
        for (let col = 0; col < n; col++) {
            const diagonal = row - col;
            const antiDiagonal = row + col;
            
            if (cols.has(col) || diagonals.has(diagonal) || antiDiagonals.has(antiDiagonal)) {
                continue;
            }

            cols.add(col);
            diagonals.add(diagonal);
            antiDiagonals.add(antiDiagonal);
            board[row] = board[row].slice(0, col) + 'Q' + board[row].slice(col + 1);
            backtrack(row + 1, diagonals, antiDiagonals, cols);
            board[row] = board[row].slice(0, col) + '.' + board[row].slice(col + 1);
            cols.delete(col);
            diagonals.delete(diagonal);
            antiDiagonals.delete(antiDiagonal);
        }
    };

    backtrack();
    return solutions;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> solutions = new ArrayList<>();
        char[][] board = new char[n][n];
        for (char[] row : board) {
            Arrays.fill(row, '.');
        }
        backtrack(solutions, board, 0);
        return solutions;
    }

    private void backtrack(List<List<String>> solutions, char[][] board, int row) {
        if (row == board.length) {
            solutions.add(construct(board));
            return;
        }
        for (int col = 0; col < board.length; col++) {
            if (isValid(board, row, col)) {
                board[row][col] = 'Q';
                backtrack(solutions, board, row + 1);
                board[row][col] = '.';
            }
        }
    }

    private List<String> construct(char[][] board) {
        List<String> res = new ArrayList<>();
        for (char[] row : board) {
            res.add(new String(row));
        }
        return res;
    }

    private boolean isValid(char[][] board, int row, int col) {
        for (int i = 0; i < row; i++) {
            if (board[i][col] == 'Q') return false;
        }
        for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] == 'Q') return false;
        }
        for (int i = row - 1, j = col + 1; i >= 0 && j < board.length; i--, j++) {
            if (board[i][j] == 'Q') return false;
        }
        return true;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度: $O(N!)$。精确的复杂度取决于$n$ 的大小，但主要受限于通过排列和递归达到的最坏情况。
- 空间复杂度: $O(N^2)$。由于要存储棋盘，而且递归时栈的空间复杂度最多达到$O(N)$。
