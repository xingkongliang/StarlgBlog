---
sidebar_position: 120
tags:
  - dynamic-programming
  - Medium
---

# 120.三角形

标签: `dynamic-programming`

难度: Medium

通过率: 58.16%

原题链接: https://leetcode.com/problems/triangle/description/

## 题目描述
给定一个三角形数组，返回从顶部到底部的最小路径和。在每一步中，你可以移动到下一行中与所在元素相邻的元素。

## 解题思路
这个问题可以通过动态规划（Dynamic Programming, DP）来解决。我们的目标是找到从顶部到底部的路径，使得路径上的数之和最小。为了达到这个目标，我们可以根据以下思路：

1. 从三角形的最底层开始，向上迭代到顶端。对每个元素计算它能形成的最小路径和。
2. 在每个位置，只需要考虑从下一行中两个可能的邻接元素来形成路径，因此状态转移方程为：
   $$ \text{dp}[i][j] = \text{triangle}[i][j] + \min(\text{dp}[i+1][j], \text{dp}[i+1][j+1]) $$
3. 整个计算可以原地进行，直接使用输入的三角形数组来保存状态（即修改输入数组）。

在完成上述计算后，三角形的顶层元素将成为从顶部到该元素的最小路径和。因此，返回三角形顶端的最小路径和就可以得到问题的解。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def minimumTotal(triangle):
    # 从倒数第二行开始，逐行向上处理
    for i in range(len(triangle) - 2, -1, -1):
        for j in range(len(triangle[i])):
            # 更新当前元素为当前路径最小和
            triangle[i][j] += min(triangle[i + 1][j], triangle[i + 1][j + 1])
    # 返回顶部的元素，它保存的是从顶到底的最小路径和
    return triangle[0][0]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int minimumTotal(vector<vector<int>>& triangle) {
        // 从倒数第二行开始，逐行向上处理
        for (int i = triangle.size() - 2; i >= 0; --i) {
            for (int j = 0; j < triangle[i].size(); ++j) {
                // 更新当前元素为当前路径最小和
                triangle[i][j] += min(triangle[i + 1][j], triangle[i + 1][j + 1]);
            }
        }
        // 返回顶部的元素，它保存的是从顶到底的最小路径和
        return triangle[0][0];
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
var minimumTotal = function(triangle) {
    // 从倒数第二行开始，逐行向上处理
    for (let i = triangle.length - 2; i >= 0; i--) {
        for (let j = 0; j < triangle[i].length; j++) {
            // 更新当前元素为当前路径最小和
            triangle[i][j] += Math.min(triangle[i + 1][j], triangle[i + 1][j + 1]);
        }
    }
    // 返回顶部的元素，它保存的是从顶到底的最小路径和
    return triangle[0][0];
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int minimumTotal(List<List<Integer>> triangle) {
        // 从倒数第二行开始，逐行向上处理
        for (int i = triangle.size() - 2; i >= 0; i--) {
            for (int j = 0; j < triangle.get(i).size(); j++) {
                // 更新当前元素为当前路径最小和
                int val = triangle.get(i).get(j);
                val += Math.min(triangle.get(i + 1).get(j), triangle.get(i + 1).get(j + 1));
                triangle.get(i).set(j, val);
            }
        }
        // 返回顶部的元素，它保存的是从顶到底的最小路径和
        return triangle.get(0).get(0);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n^2)$，其中 $n$ 是三角形的行数。我们需要计算每个元素的最小路径和。`
`空间复杂度：$O(1)$，我们在原地更新输入的三角形，不需要额外的空间。
