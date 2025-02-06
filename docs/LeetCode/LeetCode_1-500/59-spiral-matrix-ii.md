---
sidebar_position: 59
tags:
  - array
  - math
  - Medium
---

# 59.螺旋矩阵 II

标签: `array`, `math`

难度: Medium

通过率: 72.55%

原题链接: https://leetcode.com/problems/spiral-matrix-ii/description/

## 题目描述
给定一个正整数 $n$，生成一个 $n \times n$ 的矩阵，其中元素从 $1$ 到 $n^2$ 以螺旋顺序填充。

## 解题思路
我们可以使用逐步向内填充的方式来生成螺旋形矩阵。具体地说：

1. 初始化一个 $n \times n$ 的空矩阵 `matrix`，用 `0` 填充。

2. 使用`current_num`跟踪要放入矩阵中的下一个数字，初始化为 1。

3. 定义四个边界来限制螺旋的方向：`top`、`bottom`、`left` 和 `right`，分别从0、$n-1$、0 和 $n-1$ 初始化。

4. 使用一个循环，在 `current_num` 小于等于 $n^2$ 时循环：
   - 从 `left` 到 `right`，遍历 `top` 行，并将 `current_num` 放入矩阵相应位置，`current_num` 递增，然后 `top` 增加 1。
   - 从 `top` 到 `bottom`，遍历 `right` 列，并将 `current_num` 放入矩阵相应位置，`current_num` 递增，然后 `right` 减少 1。
   - 从 `right` 到 `left`，遍历 `bottom` 行，并将 `current_num` 放入矩阵相应位置，`current_num` 递增，然后 `bottom` 减少 1。
   - 从 `bottom` 到 `top`，遍历 `left` 列，并将 `current_num` 放入矩阵相应位置，`current_num` 递增，然后 `left` 增加 1。

5. 最终，返回矩阵 `matrix`。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def generateMatrix(n):
    # 初始化一个 n x n 的矩阵
    matrix = [[0] * n for _ in range(n)]
    # 初始化起始数字
    current_num = 1
    # 定义边界
    top, bottom, left, right = 0, n - 1, 0, n - 1
    
    while current_num <= n * n:
        # 从左到右遍历上边界
        for i in range(left, right + 1):
            matrix[top][i] = current_num
            current_num += 1
        top += 1
        
        # 从上到下遍历右边界
        for i in range(top, bottom + 1):
            matrix[i][right] = current_num
            current_num += 1
        right -= 1
        
        # 从右到左遍历下边界
        for i in range(right, left - 1, -1):
            matrix[bottom][i] = current_num
            current_num += 1
        bottom -= 1
        
        # 从下到上遍历左边界
        for i in range(bottom, top - 1, -1):
            matrix[i][left] = current_num
            current_num += 1
        left += 1
    
    return matrix
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
vector<vector<int>> generateMatrix(int n) {
    // 初始化 n x n 的矩阵
    vector<vector<int>> matrix(n, vector<int>(n, 0));
    // 初始化起始数字
    int current_num = 1;
    // 定义边界
    int top = 0, bottom = n - 1, left = 0, right = n - 1;
    
    while (current_num <= n * n) {
        // 从左到右遍历上边界
        for (int i = left; i <= right; ++i) {
            matrix[top][i] = current_num++;
        }
        ++top;
        
        // 从上到下遍历右边界
        for (int i = top; i <= bottom; ++i) {
            matrix[i][right] = current_num++;
        }
        --right;
        
        // 从右到左遍历下边界
        for (int i = right; i >= left; --i) {
            matrix[bottom][i] = current_num++;
        }
        --bottom;
        
        // 从下到上遍历左边界
        for (int i = bottom; i >= top; --i) {
            matrix[i][left] = current_num++;
        }
        ++left;
    }
    return matrix;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function generateMatrix(n) {
    // 初始化 n x n 的矩阵
    const matrix = Array.from({ length: n }, () => Array(n).fill(0));
    // 初始化起始数字
    let current_num = 1;
    // 定义边界
    let top = 0, bottom = n - 1, left = 0, right = n - 1;
    
    while (current_num <= n * n) {
        // 从左到右遍历上边界
        for (let i = left; i <= right; i++) {
            matrix[top][i] = current_num++;
        }
        top++;
        
        // 从上到下遍历右边界
        for (let i = top; i <= bottom; i++) {
            matrix[i][right] = current_num++;
        }
        right--;
        
        // 从右到左遍历下边界
        for (let i = right; i >= left; i--) {
            matrix[bottom][i] = current_num++;
        }
        bottom--;
        
        // 从下到上遍历左边界
        for (let i = bottom; i >= top; i--) {
            matrix[i][left] = current_num++;
        }
        left++;
    }
    return matrix;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int[][] generateMatrix(int n) {
    // 初始化 n x n 的矩阵
    int[][] matrix = new int[n][n];
    // 初始化起始数字
    int current_num = 1;
    // 定义边界
    int top = 0, bottom = n - 1, left = 0, right = n - 1;
    
    while (current_num <= n * n) {
        // 从左到右遍历上边界
        for (int i = left; i <= right; i++) {
            matrix[top][i] = current_num++;
        }
        top++;
        
        // 从上到下遍历右边界
        for (int i = top; i <= bottom; i++) {
            matrix[i][right] = current_num++;
        }
        right--;
        
        // 从右到左遍历下边界
        for (int i = right; i >= left; i--) {
            matrix[bottom][i] = current_num++;
        }
        bottom--;
        
        // 从下到上遍历左边界
        for (int i = bottom; i >= top; i--) {
            matrix[i][left] = current_num++;
        }
        left++;
    }
    return matrix;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n^2)$，因为我们必须填充 $n^2$ 个单元格。空间复杂度：$O(1)$，除了用于存储结果的矩阵，不需要额外的空间。
