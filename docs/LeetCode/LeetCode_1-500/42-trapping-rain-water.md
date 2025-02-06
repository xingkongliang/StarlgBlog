---
sidebar_position: 42
tags:
  - array
  - two-pointers
  - dynamic-programming
  - stack
  - Hard
---

# 42.接雨水

标签: `array`, `two-pointers`, `dynamic-programming`, `stack`

难度: Hard

通过率: 63.69%

原题链接: https://leetcode.com/problems/trapping-rain-water/description/

## 题目描述
给定 $n$ 个非负整数表示一个高度图，其中每个条的宽度为 1，计算下雨后它能放多少水。

## 解题思路
问题的核心在于找到每个位置能够储水的量。可以通过以下方法解决：

1. **动态规划**：
   - 首先，计算每个位置 `i` 左侧的最大高度 `left_max[i]` 和右侧的最大高度 `right_max[i]`。
   - 某个位置能够储水的高度为 `min(left_max[i], right_max[i]) - height[i]`。
   - 通过两个循环完成这些计算，然后累加每个位置的储水量。

2. **双指针**：
   - 定义两个指针 `left` 和 `right` 分别从数组的两端开始移动。
   - 维护两个变量 `left_max` 和 `right_max`，分别表示左侧和右侧的最大高度。
   - 如果 `height[left]` 小于或等于 `height[right]`，那么检查 `left_max`；反之，检查 `right_max`。对较低一侧，计算能够储水的量并将指针向中心移动。
   - 直到两个指针相遇，即完成所有计算。

这两种方法均有效率较高，但双指针方法可以节省空间复杂度。下面提供代码实现。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def trap(height):
    if not height:
        return 0
    n = len(height)
    left_max, right_max = [0] * n, [0] * n
    water_trapped = 0

    # Fill in left_max array
    left_max[0] = height[0]
    for i in range(1, n):
        left_max[i] = max(left_max[i - 1], height[i])

    # Fill in right_max array
    right_max[n - 1] = height[n - 1]
    for i in range(n - 2, -1, -1):
        right_max[i] = max(right_max[i + 1], height[i])

    # Calculate trapped water
    for i in range(0, n):
        water_trapped += min(left_max[i], right_max[i]) - height[i]

    return water_trapped

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int trap(vector<int>& height) {
    if(height.empty()) return 0;
    int n = height.size();
    vector<int> left_max(n), right_max(n);
    int water_trapped = 0;

    // Fill left_max array
    left_max[0] = height[0];
    for(int i = 1; i < n; i++) {
        left_max[i] = max(left_max[i - 1], height[i]);
    }

    // Fill right_max array
    right_max[n - 1] = height[n - 1];
    for(int i = n - 2; i >= 0; i--) {
        right_max[i] = max(right_max[i + 1], height[i]);
    }

    // Calculate trapped water
    for(int i = 0; i < n; i++) {
        water_trapped += min(left_max[i], right_max[i]) - height[i];
    }

    return water_trapped;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function trap(height) {
    if (!height.length) return 0;
    const n = height.length;
    const left_max = Array(n).fill(0);
    const right_max = Array(n).fill(0);
    let water_trapped = 0;

    // Fill left_max array
    left_max[0] = height[0];
    for (let i = 1; i < n; i++) {
        left_max[i] = Math.max(left_max[i - 1], height[i]);
    }

    // Fill right_max array
    right_max[n - 1] = height[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        right_max[i] = Math.max(right_max[i + 1], height[i]);
    }

    // Calculate trapped water
    for (let i = 0; i < n; i++) {
        water_trapped += Math.min(left_max[i], right_max[i]) - height[i];
    }

    return water_trapped;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int trap(int[] height) {
        if (height.length == 0) return 0;
        int n = height.length;
        int[] left_max = new int[n];
        int[] right_max = new int[n];
        int water_trapped = 0;

        // Fill left_max array
        left_max[0] = height[0];
        for (int i = 1; i < n; i++) {
            left_max[i] = Math.max(left_max[i - 1], height[i]);
        }

        // Fill right_max array
        right_max[n - 1] = height[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            right_max[i] = Math.max(right_max[i + 1], height[i]);
        }

        // Calculate trapped water
        for (int i = 0; i < n; i++) {
            water_trapped += Math.min(left_max[i], right_max[i]) - height[i];
        }

        return water_trapped;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是高度数组的长度，因为需要遍历数组多次。`
`空间复杂度：$O(n)$，用于存储 `left_max` 和 `right_max` 数组。
