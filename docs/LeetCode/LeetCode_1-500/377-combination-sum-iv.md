---
sidebar_position: 377
tags:
  - dynamic-programming
  - array
  - Medium
---

# 377.组合总和 IV

标签: `dynamic-programming`, `array`

难度: Medium

通过率: 54.43%

原题链接: https://leetcode.com/problems/combination-sum-iv/description/

## 题目描述
给定一个由不同整数组成的数组 nums 和一个目标整数 target，返回能使数字和为 target 的组合的数量。不同的序列被视作不同的组合。

## 解题思路
这个问题可以用动态规划来解决。定义一个数组 dp，其中 dp[i] 表示目标和为 i 的所有组合数的个数。初始时 dp[0] = 1，因为没有数字的组合和为 0 有一种方式（即不选择任何数字）。然后，对于 1 到 target 之间的每一个 i，依次考虑每个数字 num ∈ nums，如果 $i >= num$，则 dp[i] 可以由 dp[i - num] 得到（因为从 dp[i - num] 加上 num 可以得到 i）。因此，状态转移方程为：

$$ dp[i] = \sum_{num \in \text{nums, }i \geq num} dp[i - num] $$

通过这种方式，最终 `dp[target]` 就是所需要的答案。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def combinationSum4(nums, target):
    # 创建动态规划数组，长度为target + 1，初始值为0
    dp = [0] * (target + 1)
    # 目标为0的情况只有一种组合，就是没有选择任何数字
    dp[0] = 1

    # 遍历从1到target的每一个数
    for i in range(1, target + 1):
        # 对于每个数，遍历数组中的每一个数字
        for num in nums:
            # 如果当前数大于等于数组中的数字
            if i >= num:
                # 更新dp[i]，即组合数
                dp[i] += dp[i - num]

    # 返回目标target的组合数
    return dp[target]

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int combinationSum4(vector<int>& nums, int target) {
        // 创建动态规划数组，长度为target + 1，初始值为0
        vector<int> dp(target + 1, 0);
        // 目标为0的情况只有一种组合，就是没有选择任何数字
        dp[0] = 1;

        // 遍历从1到target的每一个数
        for (int i = 1; i <= target; ++i) {
            // 对于每个数，遍历数组中的每一个数字
            for (int num : nums) {
                // 如果当前数大于等于数组中的数字
                if (i >= num) {
                    // 更新dp[i]，即组合数
                    dp[i] += dp[i - num];
                }
            }
        }

        // 返回目标target的组合数
        return dp[target];
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function combinationSum4(nums, target) {
    // 创建动态规划数组，长度为target + 1，初始值为0
    let dp = Array(target + 1).fill(0);
    // 目标为0的情况只有一种组合，就是没有选择任何数字
    dp[0] = 1;

    // 遍历从1到target的每一个数
    for (let i = 1; i <= target; i++) {
        // 对于每个数，遍历数组中的每一个数字
        for (let num of nums) {
            // 如果当前数大于等于数组中的数字
            if (i >= num) {
                // 更新dp[i]，即组合数
                dp[i] += dp[i - num];
            }
        }
    }

    // 返回目标target的组合数
    return dp[target];
}

```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int combinationSum4(int[] nums, int target) {
        // 创建动态规划数组，长度为target + 1，初始值为0
        int[] dp = new int[target + 1];
        // 目标为0的情况只有一种组合，就是没有选择任何数字
        dp[0] = 1;

        // 遍历从1到target的每一个数
        for (int i = 1; i <= target; i++) {
            // 对于每个数，遍历数组中的每一个数字
            for (int num : nums) {
                // 如果当前数大于等于数组中的数字
                if (i >= num) {
                    // 更新dp[i]，即组合数
                    dp[i] += dp[i - num];
                }
            }
        }

        // 返回目标target的组合数
        return dp[target];
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n \times \text{target})$，其中 n 是数组 nums 的长度，因为我们需要遍历每个目标值和每个数组中的元素。  
  
空间复杂度：$O(\text{target})$，因为我们使用了一个长度为 target+1 的动态规划数组。
