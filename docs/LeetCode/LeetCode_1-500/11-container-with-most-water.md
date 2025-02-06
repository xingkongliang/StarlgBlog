---
sidebar_position: 11
tags:
  - array
  - two-pointers
  - Medium
---

# 11.盛最多水的容器

标签: `array`, `two-pointers`

难度: Medium

通过率: 56.69%

原题链接: https://leetcode.com/problems/container-with-most-water/description/

## 题目描述
给定一个长度为 $n$ 的整数数组 $height$。在坐标 $(i, 0)$ 和 $(i, height[i])$ 之间画垂直线。找出其中的两条线，使得它们与 $x$ 轴共同构成的容器可以容纳最多的水。返回容器可以储存的最大水量。注意：你不能倾斜容器。

## 解题思路
我们的目标是选择两个高度，使它们与 $x$ 轴形成一个能容积最多水的容器。解决这个问题的关键在于用“双指针”方法：

1. 初始化两个指针，一个指针指向数组的开头（`left`），另一个指针指向数组的末尾（`right`）。
2. 计算以这两个指针对应的高度组成的容器能盛多少水，该面积为 $\text{area} = \min(\text{height}[\text{left}], \text{height}[\text{right}]) \times (\text{right} - \text{left})$。
3. 更新最大面积。
4. 移动指向较小高度的指针，因为较短的那一边限制了水的容纳量，移动它有可能增加最大面积。
5. 重复上述步骤，直到两个指针相遇。

这种方法通过在每一步选择有效的方向来接近最优解，并确保遍历所有可能的情况。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def maxArea(height):
    # 初始化两个指针和最大面积
    left, right = 0, len(height) - 1
    max_area = 0

    # 当左指针小于右指针时
    while left < right:
        # 计算当前面积
        current_area = min(height[left], height[right]) * (right - left)
        # 更新最大面积
        max_area = max(max_area, current_area)

        # 移动指针：移动较短的向内
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return max_area
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int maxArea(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int max_area = 0;

    while (left < right) {
        // 计算当前面积
        int current_area = min(height[left], height[right]) * (right - left);
        // 更新最大面积
        max_area = max(max_area, current_area);

        // 移动指针：移动较短的向内
        if (height[left] < height[right])
            ++left;
        else
            --right;
    }

    return max_area;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function maxArea(height) {
    let left = 0, right = height.length - 1;
    let max_area = 0;
    
    while (left < right) {
        // 计算当前面积
        const current_area = Math.min(height[left], height[right]) * (right - left);
        // 更新最大面积
        max_area = Math.max(max_area, current_area);

        // 移动指针：移动较短的向内
        if (height[left] < height[right])
            left++;
        else
            right--;
    }

    return max_area;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int maxArea(int[] height) {
    int left = 0, right = height.length - 1;
    int max_area = 0;

    while (left < right) {
        // 计算当前面积
        int current_area = Math.min(height[left], height[right]) * (right - left);
        // 更新最大面积
        max_area = Math.max(max_area, current_area);

        // 移动指针：移动较短的向内
        if (height[left] < height[right])
            left++;
        else
            right--;
    }

    return max_area;
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(n)$，因为我们只进行了一次线性扫描。
- 空间复杂度：$O(1)$，因为只使用了有限的额外空间。
