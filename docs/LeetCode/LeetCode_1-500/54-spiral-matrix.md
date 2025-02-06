---
sidebar_position: 54
tags:
  - array
  - math
  - greedy
  - Medium
---

# 54.螺旋矩阵

标签: `array`, `math`, `greedy`

难度: Medium

通过率: 52.16%

原题链接: https://leetcode.com/problems/spiral-matrix/description/

## 题目描述
给定一个大小为 $m \times n$ 的矩阵，返回以螺旋顺序遍历矩阵中所有元素的列表。

## 解题思路
螺旋顺序遍历矩阵是一种方向不断变化的遍历。我们可以将这个问题转换为在矩阵的外围圈不断进行顺时针遍历，并逐渐向内收缩边界。对于每一次完整的循环，我们依次执行以下步骤：  
1. 从左向右遍历当前的上边界。
2. 从上到下遍历当前的右边界。
3. 从右向左遍历当前的下边界（如果下边界还存在）。
4. 从下到上遍历当前的左边界（如果左边界还存在）。

通过不断更新上边界、下边界、左边界和右边界的值，我们可以正确控制遍历的区域，直到整个矩阵被遍历完毕。每次遍历完一整圈后，缩小待遍历的圈范围，直到上边界大于下边界或者左边界大于右边界。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def spiralOrder(matrix):
    if not matrix:
        return []
    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1

    while top <= bottom and left <= right:
        # 从左到右
        for i in range(left, right + 1):
            result.append(matrix[top][i])
        top += 1

        # 从上到下
        for i in range(top, bottom + 1):
            result.append(matrix[i][right])
        right -= 1

        if top <= bottom:
            # 从右到左
            for i in range(right, left - 1, -1):
                result.append(matrix[bottom][i])
            bottom -= 1

        if left <= right:
            # 从下到上
            for i in range(bottom, top - 1, -1):
                result.append(matrix[i][left])
            left += 1

    return result
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
vector<vector<int>> spiralOrder(vector<vector<int>>& matrix) {
    vector<int> result;
    if (matrix.empty()) return result;
    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;

    while (top <= bottom && left <= right) {
        // 从左到右
        for (int i = left; i <= right; ++i)
            result.push_back(matrix[top][i]);
        top++;

        // 从上到下
        for (int i = top; i <= bottom; ++i)
            result.push_back(matrix[i][right]);
        right--;

        if (top <= bottom) {
            // 从右到左
            for (int i = right; i >= left; --i)
                result.push_back(matrix[bottom][i]);
            bottom--;
        }

        if (left <= right) {
            // 从下到上
            for (int i = bottom; i >= top; --i)
                result.push_back(matrix[i][left]);
            left++;
        }
    }

    return result;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function spiralOrder(matrix) {
    if (!matrix || matrix.length === 0) return [];
    const result = [];
    let top = 0, bottom = matrix.length - 1;
    let left = 0, right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
        // 从左到右
        for (let i = left; i <= right; i++)
            result.push(matrix[top][i]);
        top++;

        // 从上到下
        for (let i = top; i <= bottom; i++)
            result.push(matrix[i][right]);
        right--;

        if (top <= bottom) {
            // 从右到左
            for (let i = right; i >= left; i--)
                result.push(matrix[bottom][i]);
            bottom--;
        }

        if (left <= right) {
            // 从下到上
            for (let i = bottom; i >= top; i--)
                result.push(matrix[i][left]);
            left++;
        }
    }

    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public List<Integer> spiralOrder(int[][] matrix) {
    List<Integer> result = new ArrayList<>();
    if (matrix == null || matrix.length == 0) return result;
    int top = 0, bottom = matrix.length - 1;
    int left = 0, right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
        // 从左到右
        for (int i = left; i <= right; i++)
            result.add(matrix[top][i]);
        top++;

        // 从上到下
        for (int i = top; i <= bottom; i++)
            result.add(matrix[i][right]);
        right--;

        if (top <= bottom) {
            // 从右到左
            for (int i = right; i >= left; i--)
                result.add(matrix[bottom][i]);
            bottom--;
        }

        if (left <= right) {
            // 从下到上
            for (int i = bottom; i >= top; i--)
                result.add(matrix[i][left]);
            left++;
        }
    }

    return result;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(m \times n)$，其中 $m$ 和 $n$ 分别为矩阵的行数和列数。因为每个元素都被访问了一次。  
空间复杂度：$O(1)$，除了返回的结果列表外，使用的额外空间是常数级别的。
