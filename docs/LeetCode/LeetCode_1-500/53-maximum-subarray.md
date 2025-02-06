---
sidebar_position: 53
tags:
  - array
  - divide-and-conquer
  - dynamic-programming
  - Medium
---

# 53.最大子数组和

标签: `array`, `divide-and-conquer`, `dynamic-programming`

难度: Medium

通过率: 51.48%

原题链接: https://leetcode.com/problems/maximum-subarray/description/

## 题目描述
给定一个整数数组，找到具有最大和的连续子数组并返回其和。

## 解题思路
本题是一道经典的动态规划问题，题目要求我们找到一个连续子数组，使其和最大。我们可以使用Kadane's算法来解决这个问题。具体的步骤如下：  

1. 初始化一个变量`max_so_far`来保存全局的最大和，另一个变量`max_ending_here`来保存局部的最大和，初始时都设为数组的第一个元素。  
2. 从数组的第二个元素开始遍历，对于每一个元素：  
   - 更新局部最大和，即`max_ending_here = max(max_ending_here + nums[i], nums[i])`，这表示我们要么把当前元素加入之前的子数组，要么重新开始一个新的子数组。  
   - 更新全局最大和，即`max_so_far = max(max_so_far, max_ending_here)`。  
3. 遍历结束后，`max_so_far`即为所求的最大子数组和。  

这个算法的核心思想是通过动态规划逐步更新子数组的最大和，其时间复杂度为$O(n)$，空间复杂度为$O(1)$，因为我们只使用了常量级别的额外空间。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def max_subarray(nums):
    # 初始最大和都赋值为数组第一个元素
    max_so_far = max_ending_here = nums[0]
    # 从数组第二个元素开始遍历
    for num in nums[1:]:
        # 如果当前和小于零，不如从当前开始重新计算
        max_ending_here = max(max_ending_here + num, num)
        # 更新全局最大和
        max_so_far = max(max_so_far, max_ending_here)
    return max_so_far

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int maxSubArray(vector<int>& nums) {
    // 初始最大和都赋值为数组第一个元素
    int max_so_far = nums[0], max_ending_here = nums[0];
    // 从数组第二个元素开始遍历
    for (int i = 1; i < nums.size(); i++) {
        // 如果当前和小于零，不如从当前开始重新计算
        max_ending_here = max(max_ending_here + nums[i], nums[i]);
        // 更新全局最大和
        max_so_far = max(max_so_far, max_ending_here);
    }
    return max_so_far;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function maxSubArray(nums) {
    // 初始最大和都赋值为数组第一个元素
    let maxSoFar = nums[0], maxEndingHere = nums[0];
    // 从数组第二个元素开始遍历
    for (let i = 1; i < nums.length; i++) {
        const num = nums[i];
        // 如果当前和小于零，不如从当前开始重新计算
        maxEndingHere = Math.max(maxEndingHere + num, num);
        // 更新全局最大和
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    return maxSoFar;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int maxSubArray(int[] nums) {
    // 初始最大和都赋值为数组第一个元素
    int maxSoFar = nums[0], maxEndingHere = nums[0];
    // 从数组第二个元素开始遍历
    for (int i = 1; i < nums.length; i++) {
        // 如果当前和小于零，不如从当前开始重新计算
        maxEndingHere = Math.max(maxEndingHere + nums[i], nums[i]);
        // 更新全局最大和
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    return maxSoFar;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中$n$是数组的长度，因为我们只需遍历数组一次。  
空间复杂度：$O(1)$，只使用了常数级别的额外空间。
