---
sidebar_position: 85
tags:
  - array
  - dynamic-programming
  - stack
  - Hard
---

# 85.最大矩形

标签: `array`, `dynamic-programming`, `stack`

难度: Hard

通过率: 52.35%

原题链接: https://leetcode.com/problems/maximal-rectangle/description/

## 题目描述
给定一个由 0 和 1 组成的二维二进制矩阵，找到只包含 1 的最大矩形，并返回其面积。

## 解题思路
这道题可以通过将每一行看成直方图，计算最大矩形面积的方法来解决。具体步骤如下：

1. **将矩阵转换为直方图高度**：我们可以通过记录每一列中连续1的高度，将原始矩阵转化为直方图的高度数组，假设当前在第i行，从顶部到当前位置组成的高度为`heights[j]`，如果matrix[i][j]为'1'，那么`heights[j]`累加，否则置为0。
   
2. **在每一行计算最大矩形面积**：利用上一行求得的`heights`数组，我们可以将每一行当成直方图，用“柱状图中最大矩形”问题的解法来计算每一行对应的最大矩形面积。

3. **应用单调栈**：为了在每一行中高效地计算直方图的最大矩形面积，我们可以使用单调栈。具体而言，遍历每一列，使用栈来找到每一个柱子的左边界和右边界，然后计算出宽度，结合高度就能得到最大面积。

通过上述方法，逐行来处理，可以在$O(n \times m)$时间复杂度内完成整个计算。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class Solution:
    def maximalRectangle(self, matrix: List[List[str]]) -> int:
        if not matrix or not matrix[0]:
            return 0

        max_area = 0
        cols = len(matrix[0])
        heights = [0] * (cols + 1)  # Add a zero-height bar to the end

        for row in matrix:
            for index in range(cols):
                # Update the height of each column
                heights[index] = heights[index] + 1 if row[index] == '1' else 0
            
            stack = []
            for index in range(cols + 1):
                # Calculate the maximum area for the current row's histogram
                while stack and heights[index] < heights[stack[-1]]:
                    h = heights[stack.pop()]  # Last height
                    w = index if not stack else index - stack[-1] - 1  # Calculate width
                    max_area = max(max_area, h * w)
                stack.append(index)

        return max_area
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int maximalRectangle(vector<vector<char>>& matrix) {
        if(matrix.empty()) return 0;
        int maxArea = 0;
        int cols = matrix[0].size();
        vector<int> heights(cols + 1, 0);  // Add a zero-height bar for convenience

        for(auto &row : matrix) {
            for(int i = 0; i < cols; i++) {
                // Update the height of each column
                heights[i] = row[i] == '1' ? heights[i] + 1 : 0;
            }
            stack<int> indices;
            for(int i = 0; i <= cols; i++) {
                while(!indices.empty() && heights[i] < heights[indices.top()]) {
                    int h = heights[indices.top()];  // Histogram height
                    indices.pop();
                    int w = indices.empty() ? i : i - indices.top() - 1;  // Calculate width
                    maxArea = max(maxArea, h * w);
                }
                indices.push(i);
            }
        }
        return maxArea;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
var maximalRectangle = function(matrix) {
    if (!matrix.length || !matrix[0].length) return 0;
    const cols = matrix[0].length;
    const heights = new Array(cols + 1).fill(0); // Add a zero-height bar
    let maxArea = 0;

    for (let row of matrix) {
        for (let i = 0; i < cols; i++) {
            // Update the height of each column
            heights[i] = row[i] === '1' ? heights[i] + 1 : 0;
        }
        const stack = [];
        for (let i = 0; i <= cols; i++) {
            while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
                const h = heights[stack.pop()];
                const w = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
                maxArea = Math.max(maxArea, h * w);
            }
            stack.push(i);
        }
    }
    return maxArea;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int maximalRectangle(char[][] matrix) {
        if (matrix.length == 0) return 0;
        int maxArea = 0;
        int cols = matrix[0].length;
        int[] heights = new int[cols + 1]; // Add a zero-height bar

        for (char[] row : matrix) {
            for (int i = 0; i < cols; i++) {
                // Update the height of each column
                heights[i] = row[i] == '1' ? heights[i] + 1 : 0;
            }
            Stack<Integer> stack = new Stack<>();
            for (int i = 0; i <= cols; i++) {
                while (!stack.isEmpty() && heights[i] < heights[stack.peek()]) {
                    int h = heights[stack.pop()];
                    int w = stack.isEmpty() ? i : i - stack.peek() - 1;
                    maxArea = Math.max(maxArea, h * w);
                }
                stack.push(i);
            }
        }
        return maxArea;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(n \times m)$，其中 $n$ 是矩阵的行数，$m$ 是矩阵的列数。我们需要遍历每一个元素，并计算每一行的最大矩形。

- 空间复杂度：$O(m)$，需要额外的数组存储每一列的高度，以及用于维护栈的空间，其中 $m$ 是矩阵的列数。
