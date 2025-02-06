---
sidebar_position: 152
tags:
  - array
  - dynamic-programming
  - Medium
---

# 152.最大乘积子数组

标签: `array`, `dynamic-programming`

难度: Medium

通过率: 34.28%

原题链接: https://leetcode.com/problems/maximum-product-subarray/description/

## 题目描述
给定一个整数数组 nums，找出一个具有最大乘积的连续子数组（子数组最少包含一个元素），返回该子数组的乘积。

测试用例确保答案在 32 位有符号整数范围内。

## 解题思路
这道题的关键在于乘积有正负的影响，可能因为一个负数而改变最大乘积。因此我们需要同时记录当前的最大乘积和最小乘积。

对于每一个元素，我们有三个选择：
1. 与前面的最大乘积相乘
2. 与前面的最小乘积相乘（因为负负得正，可能获得最大）
3. 自己作为新的起点

在计算下一个状态最大值之前，要更新当前状态的最大最小乘积。

具体步骤如下：
1. 初始化 `maxProd` 和 `minProd` 为数组第一个元素，`result` 也设为数组第一个元素。
2. 从数组第二个元素开始遍历，计算当前元素，前面的最大乘积乘当前元素和前面的最小乘积乘当前元素的最大值，同时更新前面的最小乘积。用临时变量存储这些值。
3. 用当前 `maxProd` 更新结果 `result`。
4. 返回 `result`。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def maxProduct(nums):
    # 初始化用于跟踪当前最大和最小乘积，以及结果最大值
    maxProd = minProd = result = nums[0]

    # 从第二个元素开始遍历数组
    for num in nums[1:]:
        # 临时变量存储当前最大和最小乘积
        temp_max = max(num, maxProd * num, minProd * num)
        minProd = min(num, maxProd * num, minProd * num)
        maxProd = temp_max

        # 更新结果最大值
        result = max(result, maxProd)

    return result

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int maxProduct(vector<int>& nums) {
    int maxProd = nums[0], minProd = nums[0], result = nums[0];

    for (int i = 1; i < nums.size(); ++i) {
        int num = nums[i];
        int temp_max = max(num, maxProd * num, minProd * num);
        minProd = min(num, maxProd * num, minProd * num);
        maxProd = temp_max;

        result = max(result, maxProd);
    }

    return result;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function maxProduct(nums) {
    // 初始化当前最大和最小乘积，以及结果最大值
    let maxProd = nums[0], minProd = nums[0], result = nums[0];

    // 从第二个元素开始遍历数组
    for (let i = 1; i < nums.length; i++) {
        let num = nums[i];
        let temp_max = Math.max(num, maxProd * num, minProd * num);
        minProd = Math.min(num, maxProd * num, minProd * num);
        maxProd = temp_max;

        // 更新结果最大值
        result = Math.max(result, maxProd);
    }

    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int maxProduct(int[] nums) {
        int maxProd = nums[0];
        int minProd = nums[0];
        int result = nums[0];

        for (int i = 1; i < nums.length; i++) {
            int num = nums[i];
            int temp_max = Math.max(num, maxProd * num, minProd * num);
            minProd = Math.min(num, maxProd * num, minProd * num);
            maxProd = temp_max;

            result = Math.max(result, maxProd);
        }

        return result;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是数组的长度。数组中的每个元素仅被遍历一次。  
  
空间复杂度：$O(1)$，使用了常数个额外的变量。
