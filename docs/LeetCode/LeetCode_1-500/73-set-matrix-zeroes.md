---
sidebar_position: 73
tags:
  - array
  - hash-table
  - Medium
---

# 73.矩阵置零

标签: `array`, `hash-table`

难度: Medium

通过率: 58.24%

原题链接: https://leetcode.com/problems/set-matrix-zeroes/description/

## 题目描述
给定一个 $m \times n$ 整数矩阵 matrix，如果一个元素为 0，则将其所在行和列的所有元素都设置为 0。要求你必须在原地执行此操作。

## 解题思路
题目要求原地修改矩阵，对于空间复杂度的严格限制，使得我们不能直接使用任何额外空间标记，而应该利用现有的矩阵空间。主要思路如下：

1. **标记首行和首列**：我们可以利用矩阵的第一行和第一列来记录各行各列是否需要被置零。因此，首先要遍历整个矩阵，使用两个布尔变量 `firstRowHasZero` 和 `firstColHasZero` 来记录第一行和第一列是否需要被置零。

2. **用首行和首列作标记**：在遍历整个矩阵时，如果某个位置 `matrix[i][j]` 为零，我们将 `matrix[i][0]` 和 `matrix[0][j]` 置为零，作为标记表示第 `i` 行和第 `j` 列需要被置零。

3. **从第二行、第二列开始置零**：根据第一列和第一行的标记，从第二行和第二列开始，把需要置零的行和列置为零。

4. **检查第一行和第一列**：最后，根据 `firstRowHasZero` 和 `firstColHasZero`，确定是否该将第一行和第一列置零。

这种方法确保我们仅使用O(1)的额外空间并且在原地进行操作。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def setZeroes(matrix):
    # 检查第一行和第一列是否需要置零
    firstRowHasZero = any(matrix[0][j] == 0 for j in range(len(matrix[0])))
    firstColHasZero = any(matrix[i][0] == 0 for i in range(len(matrix)))
    
    # 使用第一行和第一列来标记其他行和列
    for i in range(1, len(matrix)):
        for j in range(1, len(matrix[0])):
            if matrix[i][j] == 0:
                matrix[i][0] = 0
                matrix[0][j] = 0
    
    # 根据标记将相应的行和列置零
    for i in range(1, len(matrix)):
        if matrix[i][0] == 0:
            for j in range(1, len(matrix[0])):
                matrix[i][j] = 0
    for j in range(1, len(matrix[0])):
        if matrix[0][j] == 0:
            for i in range(1, len(matrix)):
                matrix[i][j] = 0
    
    # 最后处理第一行和第一列
    if firstRowHasZero:
        for j in range(len(matrix[0])):
            matrix[0][j] = 0
    if firstColHasZero:
        for i in range(len(matrix)):
            matrix[i][0] = 0
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        bool firstRowHasZero = false, firstColHasZero = false;

        // 检查第一行和第一列是否需要置零
        for (int j = 0; j < matrix[0].size(); ++j)
            if (matrix[0][j] == 0) firstRowHasZero = true;
        for (int i = 0; i < matrix.size(); ++i)
            if (matrix[i][0] == 0) firstColHasZero = true;

        // 使用第一行和第一列来标记其他行和列
        for (int i = 1; i < matrix.size(); ++i)
            for (int j = 1; j < matrix[0].size(); ++j)
                if (matrix[i][j] == 0)
                    matrix[i][0] = matrix[0][j] = 0;

        // 根据标记将相应的行和列置零
        for (int i = 1; i < matrix.size(); ++i)
            if (matrix[i][0] == 0)
                for (int j = 1; j < matrix[0].size(); ++j)
                    matrix[i][j] = 0;
        for (int j = 1; j < matrix[0].size(); ++j)
            if (matrix[0][j] == 0)
                for (int i = 1; i < matrix.size(); ++i)
                    matrix[i][j] = 0;

        // 最后处理第一行和第一列
        if (firstRowHasZero)
            for (int j = 0; j < matrix[0].size(); ++j)
                matrix[0][j] = 0;
        if (firstColHasZero)
            for (int i = 0; i < matrix.size(); ++i)
                matrix[i][0] = 0;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function setZeroes(matrix) {
    let firstRowHasZero = matrix[0].some(x => x === 0);
    let firstColHasZero = matrix.some(row => row[0] === 0);

    // 使用第一行和第一列来标记其他行和列
    for (let i = 1; i < matrix.length; i++) {
        for (let j = 1; j < matrix[0].length; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }

    // 根据标记将相应的行和列置零
    for (let i = 1; i < matrix.length; i++) {
        if (matrix[i][0] === 0) {
            for (let j = 1; j < matrix[0].length; j++) {
                matrix[i][j] = 0;
            }
        }
    }
    for (let j = 1; j < matrix[0].length; j++) {
        if (matrix[0][j] === 0) {
            for (let i = 1; i < matrix.length; i++) {
                matrix[i][j] = 0;
            }
        }
    }

    // 最后处理第一行和第一列
    if (firstRowHasZero) {
        for (let j = 0; j < matrix[0].length; j++) {
            matrix[0][j] = 0;
        }
    }
    if (firstColHasZero) {
        for (let i = 0; i < matrix.length; i++) {
            matrix[i][0] = 0;
        }
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public void setZeroes(int[][] matrix) {
        boolean firstRowHasZero = false, firstColHasZero = false;

        // 检查第一行和第一列是否需要置零
        for (int j = 0; j < matrix[0].length; j++)
            if (matrix[0][j] == 0) firstRowHasZero = true;
        for (int i = 0; i < matrix.length; i++)
            if (matrix[i][0] == 0) firstColHasZero = true;

        // 使用第一行和第一列来标记其他行和列
        for (int i = 1; i < matrix.length; i++)
            for (int j = 1; j < matrix[0].length; j++)
                if (matrix[i][j] == 0)
                    matrix[i][0] = matrix[0][j] = 0;

        // 根据标记将相应的行和列置零
        for (int i = 1; i < matrix.length; i++)
            if (matrix[i][0] == 0)
                for (int j = 1; j < matrix[0].length; j++)
                    matrix[i][j] = 0;
        for (int j = 1; j < matrix[0].length; j++)
            if (matrix[0][j] == 0)
                for (int i = 1; i < matrix.length; i++)
                    matrix[i][j] = 0;

        // 最后处理第一行和第一列
        if (firstRowHasZero)
            for (int j = 0; j < matrix[0].length; j++)
                matrix[0][j] = 0;
        if (firstColHasZero)
            for (int i = 0; i < matrix.length; i++)
                matrix[i][0] = 0;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(m \times n)$，需要一次完整遍历矩阵以设置标记，并再次遍历矩阵以进行置零操作。`
`空间复杂度：$O(1)$，原地操作，不使用额外空间。
