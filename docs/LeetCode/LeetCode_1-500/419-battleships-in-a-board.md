---
sidebar_position: 419
tags:
  - array
  - depth-first-search
  - Medium
---

# 419. 船舰在棋盘上

标签: `array`, `depth-first-search`

难度: Medium

通过率: 76.0%

原题链接: https://leetcode.com/problems/battleships-in-a-board/description/

## 题目描述
给定一个 $m \times n$ 的矩阵 `board`，其中每个单元格是一个战舰 'X' 或空 '.'，返回棋盘上战舰的数量。战舰只能水平或垂直放置。换句话说，它们只能是形状为 $1 \times k$（1 行，k 列）或 $k \times 1$（k 行，1 列），其中 $k$ 可以是任意大小。至少有一个水平或垂直的单元格分隔两个战舰（即，没有相邻的战舰）。

## 解题思路
要计算棋盘上战舰的数量，我们可以遍历每个单元格，检查它所包含的是否是战舰的起始部分。一个战舰的起始部分在以下两种情况下会被计数：

1. 该单元格是 'X'。
2. 该单元格的上方和左侧没有其他 'X'。这是因为如果某个 'X' 的上或左有另一个 'X'，那么它就不是战舰的起始部分。

因此，我们遍历棋盘上的每个单元格，如果满足上面的条件，就将战舰计数加一。这个方法确保我们只计数一次完整的战舰。我们只需一次遍历矩阵即可完成计算，同时只使用常数额外空间。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def countBattleships(board):
    # 初始化战舰计数
    count = 0
    # 得到矩阵尺寸
    m, n = len(board), len(board[0])
    # 遍历每一个单元格
    for i in range(m):
        for j in range(n):
            # 如当前单元格是 'X'
            if board[i][j] == 'X':
                # 如果左边和上边均没有 'X'，说明是新的战舰开始的位置
                if (i == 0 or board[i-1][j] == '.') and (j == 0 or board[i][j-1] == '.'):
                    count += 1
    return count
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int countBattleships(vector<vector<char>>& board) {
    int count = 0; // 初始化战舰计数
    int m = board.size(); // 得到矩阵行数
    int n = board[0].size(); // 得到矩阵列数
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (board[i][j] == 'X') { // 当前单元格是 'X'
                // 如果左边和上边均没有 'X'，说明是新的战舰开始的位置
                if ((i == 0 || board[i-1][j] == '.') && (j == 0 || board[i][j-1] == '.')) {
                    count++;
                }
            }
        }
    }
    return count;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function countBattleships(board) {
    let count = 0;
    const m = board.length;
    const n = board[0].length;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] === 'X') {
                // 如果左边和上边均没有 'X'，说明是新战舰的开始
                if ((i === 0 || board[i-1][j] === '.') && (j === 0 || board[i][j-1] === '.')) {
                    count++;
                }
            }
        }
    }
    return count;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int countBattleships(char[][] board) {
    int count = 0;
    int m = board.length;
    int n = board[0].length;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (board[i][j] == 'X') {
                // 如果左边和上边均没有 'X'，说明是新的战舰开始的位置
                if ((i == 0 || board[i-1][j] == '.') && (j == 0 || board[i][j-1] == '.')) {
                    count++;
                }
            }
        }
    }
    return count;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(m \times n)$，其中 $m$ 是矩阵的行数，$n$ 是矩阵的列数。我们只需遍历整个矩阵一次。  
  
空间复杂度为 $O(1)$。我们没有使用任何额外的数据结构来存储中间数据，除了有限的几个变量。
