---
sidebar_position: 79
tags:
  - array
  - backtracking
  - depth-first-search
  - Medium
---

# 79.单词搜索

标签: `array`, `backtracking`, `depth-first-search`

难度: Medium

通过率: 44.15%

原题链接: https://leetcode.com/problems/word-search/description/

## 题目描述
给定一个 $m \times n$ 的字符网格 `board` 和一个字符串 `word`，如果 `word` 存在于网格中则返回`true`。单词可以由连续相邻的单元格中的字母组成，其中相邻单元格是水平或垂直相邻的。相同的单元格内的字母不允许重复使用。

## 解题思路
这个问题可以通过回溯算法（Backtracking）来解决。我们要在给定的网格中查找是否存在一个满足条件的路径来组成给定的单词。关键在于从网格的每个可能的起始点出发，尝试每个方向上相邻的单元格，直到找到单词或走到死胡同。具体步骤如下：

1. **创建辅助函数 `dfs`**：从当前位置检查，从且目标单词的当前字符开始，递归地检查相邻的上下左右四个方向。
2. **边界检查**：在移动到下一个单元格之前，检查是否越界或者该单元格是否已经使用过（避免重复使用相同的字母）。
3. **字符匹配**：若当前位置的字符与目标单词的当前字符匹配，则继续递归检查下一个字符。
4. **回溯**：如果从某路径无法继续匹配下去，需回溯到上一步继续尝试其他路径。
5. **标记与重置**：为了避免重复使用相同的单元格，在递归调用前标记单元格，在递归调用后重置单元格的状态。
6. **初始调用**：针对网格中的每一个单元格，尝试调用 `dfs` 进行全局搜索，直到找到匹配路径或者所有路径尝试结束。

由于 `word` 的长度不超过 15 且网格最大为 $6 \times 6$，该方法在给定的约束下是可行的。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# Python 代码实现
class Solution:
    def exist(self, board: List[List[str]], word: str) -> bool:
        if not board or not board[0]:
            return False

        rows, cols = len(board), len(board[0])

        def dfs(x, y, index):
            # 检查是否越界或者字符不匹配
            if index == len(word):
                return True
            if x < 0 or x >= rows or y < 0 or y >= cols or board[x][y] != word[index]:
                return False

            # 标记当前点已访问，避免重复使用
            temp, board[x][y] = board[x][y], '#'

            # 递归搜索四个方向
            found = (dfs(x+1, y, index+1) or dfs(x-1, y, index+1) or
                     dfs(x, y+1, index+1) or dfs(x, y-1, index+1))

            # 恢复当前点的字符（回溯）
            board[x][y] = temp

            return found

        for i in range(rows):
            for j in range(cols):
                if dfs(i, j, 0):
                    return True

        return False

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++ 代码实现
class Solution {
public:
    bool exist(std::vector<std::vector<char>>& board, std::string word) {
        for (int i = 0; i < board.size(); ++i) {
            for (int j = 0; j < board[0].size(); ++j) {
                if (dfs(board, word, i, j, 0)) return true;
            }
        }
        return false;
    }

private:
    bool dfs(std::vector<std::vector<char>>& board, const std::string& word, int x, int y, int index) {
        if (index == word.size()) return true;
        if (x < 0 || x >= board.size() || y < 0 || y >= board[0].size() || board[x][y] != word[index])
            return false;

        char temp = board[x][y];
        board[x][y] = '#';
        bool found = dfs(board, word, x + 1, y, index + 1) ||
                     dfs(board, word, x - 1, y, index + 1) ||
                     dfs(board, word, x, y + 1, index + 1) ||
                     dfs(board, word, x, y - 1, index + 1);
        board[x][y] = temp;

        return found;
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript 代码实现
var exist = function(board, word) {
    const rows = board.length;
    const cols = board[0].length;

    const dfs = (x, y, index) => {
        if (index === word.length) {
            return true;
        }

        if (x < 0 || x >= rows || y < 0 || y >= cols || board[x][y] !== word[index]) {
            return false;
        }

        const temp = board[x][y];
        board[x][y] = '#';

        const found = dfs(x + 1, y, index + 1) ||
                      dfs(x - 1, y, index + 1) ||
                      dfs(x, y + 1, index + 1) ||
                      dfs(x, y - 1, index + 1);

        board[x][y] = temp;

        return found;
    };

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (dfs(i, j, 0)) {
                return true;
            }
        }
    }

    return false;
};

```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java 代码实现
class Solution {
    public boolean exist(char[][] board, String word) {
        int rows = board.length;
        int cols = board[0].length;

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (dfs(board, word, i, j, 0)) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean dfs(char[][] board, String word, int x, int y, int index) {
        if (index == word.length()) {
            return true;
        }
        if (x < 0 || x >= board.length || y < 0 || y >= board[0].length || board[x][y] != word.charAt(index)) {
            return false;
        }

        char temp = board[x][y];
        board[x][y] = '#';

        boolean found = dfs(board, word, x + 1, y, index + 1) ||
                        dfs(board, word, x - 1, y, index + 1) ||
                        dfs(board, word, x, y + 1, index + 1) ||
                        dfs(board, word, x, y - 1, index + 1);

        board[x][y] = temp;

        return found;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度: $O(M \cdot N \cdot 4^L)$，其中 $M$ 和 $N$ 为网格的行数和列数，$L$ 是单词的长度。在最坏情况下，每个单元格需要进行 $4^L$ 次递归调用。
- 空间复杂度: $O(L)$，由于递归导致的栈空间消耗，其中 $L$ 是单词的长度。
