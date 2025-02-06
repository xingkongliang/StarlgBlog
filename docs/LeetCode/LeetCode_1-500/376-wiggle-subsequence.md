---
sidebar_position: 376
tags:
  - greedy
  - dynamic-programming
  - Medium
---

# 376.摆动序列

标签: `greedy`, `dynamic-programming`

难度: Medium

通过率: 48.67%

原题链接: https://leetcode.com/problems/wiggle-subsequence/description/

## 题目描述
摆动序列是一个序列，其中连续数字之间的差严格交替为正和负。第一个差（如果存在）可以是正数或负数。一个元素的序列和两个不同元素的序列是摆动序列。给定一个整数数组`nums`，返回`nums`的最长摆动子序列的长度。

## 解题思路
要找到最长的摆动子序列，我们需要关注三种情况：当前数比前一个大、比前一个小，或者和前一个相等。为了能有效地找出最长的摆动子序列，我们可以用动态规划或贪心法。在贪心法中，我们只需要遍历数组一次并保持追踪上一个差的方向（上下移动），然后更新长度。每次发现符合条件的新摆动时，增加计数器。我们保持一个up和down计数器，分别对应于结尾为上升和下降的最长摆动子序列长度。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def wiggleMaxLength(nums):
    # 如果数组长度<=1，则返回数组长度
    if len(nums) < 2:
        return len(nums)
    # 初始化上升和下降计数器
    up, down = 1, 1
    # 遍历数组从第二个元素开始
    for i in range(1, len(nums)):
        if nums[i] > nums[i - 1]:
            # 当前数大于前一个，更新上升计数器
            up = down + 1
        elif nums[i] < nums[i - 1]:
            # 当前数小于前一个，更新下降计数器
            down = up + 1
    # 返回最大的计数器值
    return max(up, down)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int wiggleMaxLength(vector<int>& nums) {
    // 如果数组长度<=1，则返回数组长度
    if (nums.size() < 2) {
        return nums.size();
    }
    // 初始化上升和下降计数器
    int up = 1, down = 1;
    // 遍历数组从第二个元素开始
    for (int i = 1; i < nums.size(); ++i) {
        if (nums[i] > nums[i - 1]) {
            // 当前数大于前一个，更新上升计数器
            up = down + 1;
        } else if (nums[i] < nums[i - 1]) {
            // 当前数小于前一个，更新下降计数器
            down = up + 1;
        }
    }
    // 返回最大的计数器值
    return max(up, down);
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function wiggleMaxLength(nums) {
    // 如果数组长度<=1，则返回数组长度
    if (nums.length < 2) {
        return nums.length;
    }
    // 初始化上升和下降计数器
    let up = 1;
    let down = 1;
    // 遍历数组从第二个元素开始
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            // 当前数大于前一个，更新上升计数器
            up = down + 1;
        } else if (nums[i] < nums[i - 1]) {
            // 当前数小于前一个，更新下降计数器
            down = up + 1;
        }
    }
    // 返回最大的计数器值
    return Math.max(up, down);
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int wiggleMaxLength(int[] nums) {
    // 如果数组长度<=1，则返回数组长度
    if (nums.length < 2) {
        return nums.length;
    }
    // 初始化上升和下降计数器
    int up = 1;
    int down = 1;
    // 遍历数组从第二个元素开始
    for (int i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) {
            // 当前数大于前一个，更新上升计数器
            up = down + 1;
        } else if (nums[i] < nums[i - 1]) {
            // 当前数小于前一个，更新下降计数器
            down = up + 1;
        }
    }
    // 返回最大的计数器值
    return Math.max(up, down);
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度是$O(n)$，其中$n$是数组的长度，因为我们只需对数组进行一次线性扫描。  
  
空间复杂度是$O(1)$，因为我们只需要常数空间来存储变量。
