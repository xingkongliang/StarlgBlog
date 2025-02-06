---
sidebar_position: 37
tags:
  - backtracking
  - depth-first-search
  - Hard
---

# 37.数独求解器

标签: `backtracking`, `depth-first-search`

难度: Hard

通过率: 63.52%

原题链接: https://leetcode.com/problems/sudoku-solver/description/

## 题目描述
编写一个程序，通过填充空白单元格来解决数独谜题。数独解决方案必须满足以下所有规则：

- 每行的数字1-9必须只出现一次。
- 每列的数字1-9必须只出现一次。
- 每个3x3的小方格内的数字1-9必须只出现一次。

字符`.`表示空单元格。

约束条件：

- 输入的board长度为9。
- 每个board[i]的长度也是9。
- board[i][j]是数字或`.`。
- 输入保证只有一个解决方案。

## 解题思路
我们可以通过回溯法来解决数独问题。这种算法是一种试探法，即在搜索过程中不断尝试不同的数值组合，直到找到一个可行的解决方案或遍历所有可能的组合。

### 解法步骤：
1. **为空格填写数字**：逐个检查每一个位置如果为空格，尝试在该位置填入数字1到9。
2. **验证可行性**：每次填入一个数字后，检查这个数字是否符合数独规则（没有在当前行、列和3x3小方格中重复）。
3. **递归求解**：如果填入某个数字后，依然满足规则，则递归求解下一个空白位置。
4. **回溯**：若出现不满足规则的情况（无法找到可填入的数字），则回退到上一次决策位置，尝试其他数字。
5. **结束条件**：当所有位置都成功填入数字时，整个数独被解出。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def solveSudoku(board):
    def isValid(board, row, col, num):
        # 检查行是否有重复
        for x in range(9):
            if board[row][x] == num:
                return False
        # 检查列是否有重复
        for x in range(9):
            if board[x][col] == num:
                return False
        # 检查3x3小方格是否有重复
        startRow = row - row % 3
        startCol = col - col % 3
        for i in range(3):
            for j in range(3):
                if board[i + startRow][j + startCol] == num:
                    return False
        return True

    def solve(board):
        for i in range(9):
            for j in range(9):
                if board[i][j] == '.':
                    for num in '123456789':
                        if isValid(board, i, j, num):
                            board[i][j] = num
                            if solve(board):
                                return True
                            board[i][j] = '.'
                    return False
        return True

    solve(board)
    return board
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    bool isValid(vector<vector<char>>& board, int row, int col, char num) {
        for (int x = 0; x < 9; x++) {
            if (board[row][x] == num) return false;
            if (board[x][col] == num) return false;
            if (board[(row / 3) * 3 + x / 3][(col / 3) * 3 + x % 3] == num) return false;
        }
        return true;
    }

    bool solve(vector<vector<char>>& board) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == '.') {
                    for (char num = '1'; num <= '9'; num++) {
                        if (isValid(board, i, j, num)) {
                            board[i][j] = num;
                            if (solve(board)) return true;
                            board[i][j] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    void solveSudoku(vector<vector<char>>& board) {
        solve(board);
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const isValid = (board, row, col, num) => {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num) return false;
        if (board[x][col] === num) return false;
        if (board[Math.floor(row / 3) * 3 + Math.floor(x / 3)][Math.floor(col / 3) * 3 + x % 3] === num) return false;
    }
    return true;
};

const solve = (board) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === '.') {
                for (let num = '1'; num <= '9'; num++) {
                    if (isValid(board, i, j, num)) {
                        board[i][j] = num;
                        if (solve(board)) return true;
                        board[i][j] = '.';
                    }
                }
                return false;
            }
        }
    }
    return true;
};

const solveSudoku = (board) => {
    solve(board);
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    private boolean isValid(char[][] board, int row, int col, char num) {
        for (int x = 0; x < 9; x++) {
            if (board[row][x] == num) return false;
            if (board[x][col] == num) return false;
            if (board[(row/3) * 3 + x/3][(col/3) * 3 + x%3] == num) return false;
        }
        return true;
    }

    private boolean solve(char[][] board) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == '.') {
                    for (char num = '1'; num <= '9'; num++) {
                        if (isValid(board, i, j, num)) {
                            board[i][j] = num;
                            if (solve(board)) return true;
                            board[i][j] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    public void solveSudoku(char[][] board) {
        solve(board);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(9^{81})$，因为最坏情况下，我们可能需要尝试9种选择为每个单元格填写数字，而一个数独板有81个单元格。
- 空间复杂度：$O(81)$，即为数独板的大小，使得递归调用栈最深达到81层。
