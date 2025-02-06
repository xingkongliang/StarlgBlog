---
sidebar_position: 413
tags:
  - array
  - dynamic-programming
  - Medium
---

# 413.等差数列片段

标签: `array`, `dynamic-programming`

难度: Medium

通过率: 64.94%

原题链接: https://leetcode.com/problems/arithmetic-slices/description/

## 题目描述
一个整数数组被称为等差数组，如果它包含至少三个元素，并且任意两个连续元素之间的差值相同。例如，数组 `[1,3,5,7,9]`、`[7,7,7,7]` 和 `[3,-1,-5,-9]` 都是等差数组。给定一个整数数组 `nums`，返回 `nums` 中等差子数组的数量。一个子数组是数组的连续子序列。

## 解题思路
题目要求找出数组中所有的等差子数组的数量。办法是使用动态规划的方法来处理。可以定义一个动态规划数组 `dp`，`dp[i]` 表示以第 `i` 个元素结尾的等差数列的数量。在遍历数组的时候，如果 `nums[i] - nums[i-1] == nums[i-1] - nums[i-2]`，说明 `nums[i-2]`，`nums[i-1]` 和 `nums[i]` 形成一个等差数列，此时 `dp[i]` 就等于 `dp[i-1] + 1`。否则，`dp[i]` 就等于零。最后，将 `dp` 数组里所有的值累加起来，就是等差子数组的总数量。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def numberOfArithmeticSlices(nums):
    # 数组长度小于3时，无法形成等差数列
    if len(nums) < 3:
        return 0
    
    # 初始为0的动态规划数组
    dp = [0] * len(nums)
    total_slices = 0
    
    # 遍历数组的第三个元素开始
    for i in range(2, len(nums)):
        # 判断三个连续元素是否形成等差数列
        if nums[i] - nums[i-1] == nums[i-1] - nums[i-2]:
            dp[i] = dp[i-1] + 1
            total_slices += dp[i]
    
    return total_slices
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int numberOfArithmeticSlices(vector<int>& nums) {
    // 数组长度小于3时，无法形成等差数列
    if (nums.size() < 3) return 0;
    
    // 初始为0的动态规划常量和结果
    int dp = 0, total_slices = 0;
    
    // 从第三个数字开始遍历
    for (int i = 2; i < nums.size(); ++i) {
        // 判断三个连续元素是否形成等差数列
        if (nums[i] - nums[i-1] == nums[i-1] - nums[i-2]) {
            dp += 1;
            total_slices += dp;
        } else {
            dp = 0;
        }
    }
    return total_slices;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function numberOfArithmeticSlices(nums) {
    // 数组长度小于3时，无法形成等差数列
    if (nums.length < 3) return 0;

    let dp = 0, total_slices = 0;

    // 从第三个数字开始遍历
    for (let i = 2; i < nums.length; i++) {
        // 判断三个连续元素是否形成等差数列
        if (nums[i] - nums[i-1] === nums[i-1] - nums[i-2]) {
            dp += 1;
            total_slices += dp;
        } else {
            dp = 0;
        }
    }
    return total_slices;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int numberOfArithmeticSlices(int[] nums) {
    // 数组长度小于3时，无法形成等差数列
    if (nums.length < 3) return 0;
    
    int dp = 0, total_slices = 0;

    // 从第三个数字开始遍历
    for (int i = 2; i < nums.length; i++) {
        // 判断三个连续元素是否形成等差数列
        if (nums[i] - nums[i-1] == nums[i-1] - nums[i-2]) {
            dp += 1;
            total_slices += dp;
        } else {
            dp = 0;
        }
    }
    return total_slices;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 是数组的长度，因为我们只需遍历整个数组一次。  
  
空间复杂度为 $O(1)$，因为我们只使用了常数空间来存储中间变量。
