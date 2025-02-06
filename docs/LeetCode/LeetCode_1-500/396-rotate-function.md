---
sidebar_position: 396
tags:
  - array
  - math
  - Medium
---

# 396.旋转函数

标签: `array`, `math`

难度: Medium

通过率: 43.28%

原题链接: https://leetcode.com/problems/rotate-function/description/

## 题目描述
给定一个长度为 $n$ 的整数数组 $nums$。假设 $arr_k$ 是将 $nums$ 顺时针旋转 $k$ 个位置得到的数组。定义在 $nums$ 上的旋转函数 $F$ 如下：

$$F(k) = 0 \cdot arr_k[0] + 1 \cdot arr_k[1] + \ldots + (n-1) \cdot arr_k[n-1]$$

返回 $F(0), F(1), \ldots, F(n-1)$ 的最大值。

## 解题思路
题目要求我们计算对数组 $nums$ 的每种旋转 $k$，对应的旋转函数 $F(k)$ 的最大值。

首先，我们可以计算出 $F(0)$，并观察 $F(k)$与$F(k-1)$的关系：

$$F(k) = F(k-1) + \text{sum}(nums) - n \cdot nums[n-k]$$

这里，$\text{sum}(nums)$ 是数组 $nums$ 的所有元素之和。通过这个公式，我们可以根据 $F(k-1)$ 快速计算出 $F(k)$。因此，我们只需从 $F(0)$ 开始，逐个求出 $F(k)$ 的值，并记录其中的最大值即可。 

这种方法的关键在于理解 $F(k)$ 与 $F(k-1)$ 的关系，即每次旋转增加的总和减去每个元素因旋转带来的数值变化。从而可以在 $O(n)$ 的时间复杂度下求解。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def maxRotateFunction(nums):
    n = len(nums)
    total_sum = sum(nums)
    F = sum(i * num for i, num in enumerate(nums))
    max_value = F
    for k in range(1, n):
        F += total_sum - n * nums[-k]
        max_value = max(max_value, F)
    return max_value

# 测试用例
print(maxRotateFunction([4,3,2,6]))  # 输出：26
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int maxRotateFunction(vector<int>& nums) {
        int n = nums.size();
        long sum = 0, F = 0;
        for (int i = 0; i < n; ++i) {
            sum += nums[i];
            F += i * nums[i];
        }
        long maxValue = F;
        for (int k = 1; k < n; ++k) {
            F += sum - n * nums[n - k];
            maxValue = max(maxValue, F);
        }
        return maxValue;
    }
};

// 测试用例
// Solution().maxRotateFunction({4,3,2,6});  // 输出：26
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
var maxRotateFunction = function(nums) {
    const n = nums.length;
    let totalSum = nums.reduce((acc, val) => acc + val, 0);
    let F = nums.reduce((acc, val, i) => acc + i * val, 0);
    let maxValue = F;
    for (let k = 1; k < n; ++k) {
        F += totalSum - n * nums[n - k];
        maxValue = Math.max(maxValue, F);
    }
    return maxValue;
};

// 测试用例
// console.log(maxRotateFunction([4,3,2,6]));  // 输出：26
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int maxRotateFunction(int[] nums) {
        int n = nums.length;
        long totalSum = 0;
        long F = 0;
        for (int i = 0; i < n; i++) {
            totalSum += nums[i];
            F += i * nums[i];
        }
        long maxValue = F;
        for (int k = 1; k < n; k++) {
            F += totalSum - n * nums[n - k];
            maxValue = Math.max(maxValue, F);
        }
        return (int) maxValue;
    }
    
    // 测试用例
    // System.out.println(new Solution().maxRotateFunction(new int[]{4, 3, 2, 6}));  // 输出：26
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，因为我们需要遍历数组 $nums$ 一次以计算初始的 $F(0)$，然后遍历一次调整并求每一个 $F(k)$。  
  
空间复杂度为 $O(1)$，因为只使用了常量额外空间进行计算。
