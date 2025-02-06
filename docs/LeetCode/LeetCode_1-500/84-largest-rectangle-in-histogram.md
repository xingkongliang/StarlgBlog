---
sidebar_position: 84
tags:
  - array
  - stack
  - dynamic-programming
  - Hard
---

# 84.直方图中的最大矩形

标签: `array`, `stack`, `dynamic-programming`

难度: Hard

通过率: 46.06%

原题链接: https://leetcode.com/problems/largest-rectangle-in-histogram/description/

## 题目描述
给定一个表示直方图的整数数组 heights，数组中每个元素表示直方图中柱子的高度，每个柱子的宽度为1，返回在该直方图中能勾勒出的矩形的最大面积。

## 解题思路
要找到直方图中能勾勒出的最大矩形面积，可以使用单调栈来解决这一问题。基本思路如下：

1. **创建栈**：使用栈来帮助我们跟踪当前可能形成最大矩形的柱子。

2. **遍历柱子**：对于每个柱子，检查它是否比栈顶的柱子更低。
   - 如果`heights[i] >= heights[stack[-1]]`，则将当前柱子的索引入栈。
   - 否则，不断弹出栈顶元素，并计算以被弹出的柱子为高的矩形面积。这个矩形的宽度由当前柱子的位置和新的栈顶之间的距离决定。

3. **计算面积**：每当我们弹出栈顶的元素时，计算以该柱子为高的矩形面积：
   - 高度 = 被弹出柱子的高度
   - 宽度 = 当前索引 - `stack[-1] - 1`（如果栈没有空）或者 当前索引（如果栈为空）。
   - 更新最大面积。

4. **处理剩余的栈**：如果遍历完所有柱子后，栈中仍有元素，则继续弹出栈内剩余元素，并使用上述方法计算面积并更新最大面积。

5. **返回结果**：最后，返回记录的最大矩形面积。

通过这种方法，算法能够在一次遍历中（即时间复杂度为$O(n)$）找到最大矩形面积。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def largestRectangleArea(heights):
    # 创建一个栈来保存柱子的索引
    stack = []
    max_area = 0
    # 在高度数组的末尾添加一个0，便于清空栈
    heights.append(0)

    for i in range(len(heights)):
        # 如果当前高度小于栈顶柱子的高度，则去处理该栈顶
        while stack and heights[i] < heights[stack[-1]]:
            # 弹出栈顶索引
            h = heights[stack.pop()]
            # 计算弹出栈顶后的面积
            # 如果栈为空，说明这是最矮的柱子
            w = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, h * w)
        # 将当前柱子的索引压入栈中
        stack.append(i)

    # 返回最大面积
    return max_area

# 示例调用
# print(largestRectangleArea([2,1,5,6,2,3])) # 输出: 10
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        heights.push_back(0); // 在末尾添加0，处理完整个栈
        stack<int> st;
        int max_area = 0;

        for (int i = 0; i < heights.size(); ++i) {
            // 当前柱子高度小于栈顶柱子高度时，开始处理
            while (!st.empty() && heights[i] < heights[st.top()]) {
                int h = heights[st.top()];
                st.pop();
                int w = st.empty() ? i : i - st.top() - 1;
                max_area = max(max_area, h * w);
            }
            // 将当前柱子的索引入栈
            st.push(i);
        }

        return max_area;
    }
};

// 示例调用
// Solution().largestRectangleArea({2, 1, 5, 6, 2, 3}); // 输出: 10
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function largestRectangleArea(heights) {
    // 在末尾添加一个哨兵元素 0
    heights.push(0);
    const stack = [];
    let maxArea = 0;

    for (let i = 0; i < heights.length; i++) {
        // 当前柱子高度小于栈顶柱子高度时，开始处理
        while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
            const h = heights[stack.pop()];
            const w = stack.length ? i - stack[stack.length - 1] - 1 : i;
            maxArea = Math.max(maxArea, h * w);
        }
        // 将当前柱子的索引压入栈中
        stack.push(i);
    }

    return maxArea;
}

// 示例调用
// console.log(largestRectangleArea([2, 1, 5, 6, 2, 3])); // 输出: 10
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.Stack;

public class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length;
        Stack<Integer> stack = new Stack<>();
        int maxArea = 0;
        // 在末尾添加一个0，便于最后清空栈
        for (int i = 0; i <= n; i++) {
            int h = (i == n ? 0 : heights[i]);
            // 如果当前高度小于栈顶柱子的高度，开始处理
            while (!stack.isEmpty() && h < heights[stack.peek()]) {
                int height = heights[stack.pop()];
                int width = stack.isEmpty() ? i : i - stack.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            // 将当前柱子的索引压入栈中
            stack.push(i);
        }

        return maxArea;
    }

    // 示例调用
    // public static void main(String[] args) {
    //     System.out.println(new Solution().largestRectangleArea(new int[]{2, 1, 5, 6, 2, 3})); // 输出: 10
    // }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中$n$是柱子的数量，因为每个柱子最多只会入栈和出栈一次。`
空间复杂度：$O(n)$，用于维护栈，在最坏情况下，所有柱子都可能会被压入栈中。
