---
sidebar_position: 36
tags:
  - array
  - hash-table
  - Medium
---

# 36.有效的数独

标签: `array`, `hash-table`

难度: Medium

通过率: 61.14%

原题链接: https://leetcode.com/problems/valid-sudoku/description/

## 题目描述
给定一个 9 x 9 的数独板，判断它是否是有效的。只需要根据以下规则验证填满的格子：

1. 每一行必须包含 【1-9】 的数字，没有重复。
2. 每一列必须包含 【1-9】 的数字，没有重复。
3. 每个小的 3 x 3 子盒必须包含 【1-9】 的数字，没有重复。

注意：

- 一个部分填满的数独可能是合法的但不一定可解。
- 只需要验证填充的单元格是否符合上述规则。

## 解题思路
我们需要分别检查数独的每一行、每一列和每一个 3x3 子方块，以确保它们包含的数字没有重复。

具体步骤如下：

1. 创建三个集合列表：`rows`、`cols`、和 `boxes`。每个列表包含 9 个集合，用于记录在行、列和子方块中已经出现过的数字。

2. 遍历每一个位置 `(i, j)`：
   - 如果该位置为 `'.'`，则跳过。
   - 检查数字是否已经在 `i` 行出现过，如果是则返回 `False`。
   - 检查数字是否已经在 `j` 列出现过，如果是则返回 `False`。
   - 检查数字是否已经在3x3子方块中出现（通过 `(i // 3) * 3 + (j // 3)` 来确定哪个子方块），如果是则返回 `False`。
   - 将数字分别添加到相应的行、列和子方块的集合中。

3. 如果完成遍历后未发现冲突，则返回 `True`。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def isValidSudoku(board):
    # 初始化行，列，子方块的集合
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]
    
    for i in range(9):
        for j in range(9):
            num = board[i][j]
            if num == '.':
                continue
            # 检查行是否有效
            if num in rows[i]:
                return False
            rows[i].add(num)
            
            # 检查列是否有效
            if num in cols[j]:
                return False
            cols[j].add(num)
            
            # 检查子方块是否有效
            box_index = (i // 3) * 3 + (j // 3)
            if num in boxes[box_index]:
                return False
            boxes[box_index].add(num)
    
    # 所有检查通过则返回 True
    return True
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
bool isValidSudoku(vector<vector<char>>& board) {
    vector<unordered_set<char>> rows(9);
    vector<unordered_set<char>> cols(9);
    vector<unordered_set<char>> boxes(9);

    for (int i = 0; i < 9; ++i) {
        for (int j = 0; j < 9; ++j) {
            char num = board[i][j];
            if (num == '.') continue;
            
            // 检查行
            if (rows[i].count(num)) return false;
            rows[i].insert(num);

            // 检查列
            if (cols[j].count(num)) return false;
            cols[j].insert(num);

            // 检查子方块
            int box_index = (i / 3) * 3 + (j / 3);
            if (boxes[box_index].count(num)) return false;
            boxes[box_index].insert(num);
        }
    }

    return true;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function isValidSudoku(board) {
    const rows = Array.from({ length: 9 }, () => new Set());
    const cols = Array.from({ length: 9 }, () => new Set());
    const boxes = Array.from({ length: 9 }, () => new Set());

    for (let i = 0; i < 9; ++i) {
        for (let j = 0; j < 9; ++j) {
            const num = board[i][j];
            if (num === '.') continue;

            // 检查行
            if (rows[i].has(num)) return false;
            rows[i].add(num);

            // 检查列
            if (cols[j].has(num)) return false;
            cols[j].add(num);

            // 检查子方块
            const box_index = Math.floor(i / 3) * 3 + Math.floor(j / 3);
            if (boxes[box_index].has(num)) return false;
            boxes[box_index].add(num);
        }
    }

    return true;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public boolean isValidSudoku(char[][] board) {
        HashSet<Character>[] rows = new HashSet[9];
        HashSet<Character>[] cols = new HashSet[9];
        HashSet<Character>[] boxes = new HashSet[9];

        for (int i = 0; i < 9; i++) {
            rows[i] = new HashSet<>();
            cols[i] = new HashSet<>();
            boxes[i] = new HashSet<>();
        }

        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                char num = board[i][j];
                if (num == '.') continue;

                // 检查行
                if (rows[i].contains(num)) return false;
                rows[i].add(num);

                // 检查列
                if (cols[j].contains(num)) return false;
                cols[j].add(num);

                // 检查子方块
                int boxIndex = (i / 3) * 3 + j / 3;
                if (boxes[boxIndex].contains(num)) return false;
                boxes[boxIndex].add(num);
            }
        }

        return true;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(1)$ 由于数独板的尺寸是 $9 \times 9$ 的常数大小。`
空间复杂度：$O(1)$ 我们使用了三个固定大小的额外数组来存储状态。
