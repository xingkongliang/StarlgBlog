---
sidebar_position: 416
tags:
  - array
  - dynamic-programming
  - Medium
---

# 416.分割等和子集

标签: `array`, `dynamic-programming`

难度: Medium

通过率: 46.98%

原题链接: https://leetcode.com/problems/partition-equal-subset-sum/description/

## 题目描述
给定一个整数数组 nums，如果能够将数组分割成两个子集，使得两个子集的元素和相等，则返回 true；否则返回 false。

## 解题思路
问题可以转化为：判断数组能否分成总和相等的两个子集。这意味着，如果数组的总和是偶数，我们需要找到一个子集，其和等于总和的一半，否则返回 false。首先计算数组的总和，如果是奇数，直接返回 false。然后定义一个动态规划数组 dp，其中 dp[i] 表示是否可以得到和为 i 的子集。初始时令 dp[0] 为 true，因为不取任何元素和为0可以达成。遍历数组的每个数字 num，从 total // 2 到 num 的索引，更新 dp 数组。具体操作是 dp[j] 将由 dp[j] 或 dp[j - num] 决定。如果 dp[j - num] 为 true，说明存在一个和为 j-num 的子集，加上 num 就可以得到和为 j 的子集。最终返回 dp[total // 2]。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def canPartition(nums):
    total = sum(nums)
    # 如果总和是奇数，直接返回 False
    if total % 2 != 0:
        return False
    
    target = total // 2
    n = len(nums)
    dp = [False] * (target + 1)
    dp[0] = True  # 和为0必然可以实现（什么也不选）
    
    for num in nums:
        # 从后向前遍历，确保每个 num 只被使用一次
        for j in range(target, num - 1, -1):
            dp[j] = dp[j] or dp[j - num]
    
    return dp[target]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
bool canPartition(vector<int>& nums) {
    int total = accumulate(nums.begin(), nums.end(), 0);
    // 如果总和是奇数，直接返回 false
    if (total % 2 != 0) return false;

    int target = total / 2;
    vector<bool> dp(target + 1, false);
    dp[0] = true;  // 和为 0 必然可以实现

    for (int num : nums) {
        // 从后向前遍历，确保每个 num 只被使用一次
        for (int j = target; j >= num; --j) {
            dp[j] = dp[j] || dp[j - num];
        }
    }
    return dp[target];
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function canPartition(nums) {
    const total = nums.reduce((acc, num) => acc + num, 0);
    // 如果总和是奇数，直接返回 false
    if (total % 2 !== 0) return false;

    const target = total / 2;
    const n = nums.length;
    const dp = new Array(target + 1).fill(false);
    dp[0] = true; // 和为 0 必然可以实现

    for (const num of nums) {
        // 从后向前遍历，确保每个 num 只被使用一次
        for (let j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }
    return dp[target];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public boolean canPartition(int[] nums) {
    int total = Arrays.stream(nums).sum();
    // 如果总和是奇数，直接返回 false
    if (total % 2 != 0) return false;

    int target = total / 2;
    boolean[] dp = new boolean[target + 1];
    dp[0] = true; // 和为 0 必然可以实现

    for (int num : nums) {
        // 从后向前遍历，确保每个 num 只被使用一次
        for (int j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }
    return dp[target];
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n \times \text{target})$，其中 $n$ 是数组的长度，$\text{target}$ 是子集目标和（总和的一半）。  
  
空间复杂度：$O(\text{target})$，我们使用了一维数组作为动态规划的表。
