---
sidebar_position: 240
tags:
  - array
  - binary-search
  - divide-and-conquer
  - Medium
---

# 240.搜索二维矩阵 II

标签: `array`, `binary-search`, `divide-and-conquer`

难度: Medium

通过率: 53.98%

原题链接: https://leetcode.com/problems/search-a-2d-matrix-ii/description/

## 题目描述
给定一个 $m \times n$ 的整数矩阵 `matrix`，该矩阵具有以下特点：

- 每行的整数按从左到右升序排列。
- 每列的整数按从上到下升序排列。

编写一个高效的算法来搜索矩阵中的一个目标值 `target` 。如果目标值存在，返回 `true`，否则返回 `false`。

## 解题思路
一个有效的搜索策略是从矩阵的右上角开始，因为这里的元素是行中元素最大的，列中元素最小的，这样可以利用矩阵的排序性质来进行剪枝：

1. 如果当前元素等于目标值 `target`，返回 `true`。
2. 如果当前元素大于目标值 `target`，那么当前列中剩下的元素都比 `target` 大，我们就可以左移一列。 
3. 如果当前元素小于目标值 `target`，说明在当前行中所有剩余元素都比 `target` 小，我们可以下移一行。

重复以上步骤，直到找到目标值。如果直到边界仍未找到，说明目标值不存在于矩阵中，返回 `false`。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def searchMatrix(matrix, target):
    # 从矩阵的右上角开始
    row = 0
    col = len(matrix[0]) - 1

    while row < len(matrix) and col >= 0:
        # 如果找到了目标值，返回 True
        if matrix[row][col] == target:
            return True
        # 如果当前值大于目标值，移动到左边一列
        elif matrix[row][col] > target:
            col -= 1
        # 如果当前值小于目标值，移动到下一行
        else:
            row += 1

    # 如果遍历完没有找到目标值，返回 False
    return False

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
bool searchMatrix(vector<vector<int>>& matrix, int target) {
    // 从矩阵的右上角开始
    int row = 0;
    int col = matrix[0].size() - 1;

    while (row < matrix.size() && col >= 0) {
        // 如果找到了目标值，返回 true
        if (matrix[row][col] == target) {
            return true;
        } else if (matrix[row][col] > target) {
            // 如果当前值大于目标值，移动到左边一列
            col--;
        } else {
            // 如果当前值小于目标值，移动到下一行
            row++;
        }
    }

    // 如果遍历完没有找到目标值，返回 false
    return false;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function searchMatrix(matrix, target) {
    // 从矩阵的右上角开始
    let row = 0;
    let col = matrix[0].length - 1;

    while (row < matrix.length && col >= 0) {
        // 如果找到了目标值，返回 true
        if (matrix[row][col] === target) {
            return true;
        } else if (matrix[row][col] > target) {
            // 如果当前值大于目标值，移动到左边一列
            col--;
        } else {
            // 如果当前值小于目标值，移动到下一行
            row++;
        }
    }

    // 如果遍历完没有找到目标值，返回 false
    return false;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public boolean searchMatrix(int[][] matrix, int target) {
    // 从矩阵的右上角开始
    int row = 0;
    int col = matrix[0].length - 1;

    while (row < matrix.length && col >= 0) {
        // 如果找到了目标值，返回 true
        if (matrix[row][col] == target) {
            return true;
        } else if (matrix[row][col] > target) {
            // 如果当前值大于目标值，移动到左边一列
            col--;
        } else {
            // 如果当前值小于目标值，移动到下一行
            row++;
        }
    }

    // 如果遍历完没有找到目标值，返回 false
    return false;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(m + n)$，其中 $m$ 是矩阵的行数，$n$ 是矩阵的列数。因为我们最多进行 $(m + n)$ 次操作。  
  
空间复杂度为 $O(1)$。我们只用了常数级别的额外空间来处理输入。
