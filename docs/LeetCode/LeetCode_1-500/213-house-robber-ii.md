---
sidebar_position: 213
tags:
  - dynamic-programming
  - Medium
---

# 213.打家劫舍 II

标签: `dynamic-programming`

难度: Medium

通过率: 42.85%

原题链接: https://leetcode.com/problems/house-robber-ii/description/

## 题目描述
你是一个专业的小偷，计划打劫一条街道上的房屋。每个房屋都有一定数量的钱。所有房屋形成一个环。也就是说，第一个房屋是最后一个房屋的邻居。同时，两个相邻的房屋不能在同一个晚上被打劫，因为它们的安全系统会互相连接，一旦两个相邻的房屋同时被打劫，就会自动报警。给定一个代表每个房屋的钱的整数数组 nums，返回你今晚可以打劫到的最大金额。

## 解题思路
由于房屋是环形排列的，因此不能同时取第一个和最后一个房屋。我们可以将问题分为两个子问题来解决：

1. 只考虑从第一个到倒数第二个房屋的情况，使用标准的动态规划方法求解。
2. 只考虑从第二个到最后一个房屋的情况，使用相同的方法求解。

这两个子问题分别对应于忽略第一个房屋和忽略最后一个房屋的情况。在每种情况下，我们使用与原始打家劫舍问题相同的动态规划方法，一个数组 `dp` 记录到达每个房屋所能获得的最大金额，总的最大金额为 `max(dp[-1])`。最后，我们取两种情况下的最大值，即为问题的解。

动态规划的方程为：

$$ dp[i] = \max(dp[i-1], dp[i-2] + nums[i]) $$

对于单个数组，初始条件为 `dp[0] = nums[0]` 和 `dp[1] = \max(nums[0], nums[1])`，计算到最后一位即可。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def rob(nums):
    if len(nums) == 1:
        return nums[0]
    
    def rob_linear(houses):
        n = len(houses)
        if n == 0:
            return 0
        if n == 1:
            return houses[0]
        # 初始化 dp 数组
        dp = [0] * n
        dp[0] = houses[0]
        dp[1] = max(houses[0], houses[1])
        
        # 填充 dp 数组
        for i in range(2, n):
            dp[i] = max(dp[i-1], dp[i-2] + houses[i])
        
        return dp[-1]

    # 两种情况，去掉第一个或最后一个房子
    return max(rob_linear(nums[:-1]), rob_linear(nums[1:]))
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int rob(vector<int>& nums) {
    if (nums.size() == 1) return nums[0];
    
    auto rob_linear = [](vector<int>& houses) {
        int n = houses.size();
        if (n == 0) return 0;
        if (n == 1) return houses[0];
        // 初始化 dp 数组
        vector<int> dp(n);
        dp[0] = houses[0];
        dp[1] = max(houses[0], houses[1]);
        
        // 填充 dp 数组
        for (int i = 2; i < n; ++i) {
            dp[i] = max(dp[i-1], dp[i-2] + houses[i]);
        }
        return dp[n-1];
    };

    // 两种情况，去掉第一个或最后一个房子
    vector<int> nums1(nums.begin(), nums.end() - 1);
    vector<int> nums2(nums.begin() + 1, nums.end());
    return max(rob_linear(nums1), rob_linear(nums2));
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function rob(nums) {
    if (nums.length === 1) return nums[0];
    
    const robLinear = (houses) => {
        const n = houses.length;
        if (n === 0) return 0;
        if (n === 1) return houses[0];
        // 初始化 dp 数组
        const dp = new Array(n).fill(0);
        dp[0] = houses[0];
        dp[1] = Math.max(houses[0], houses[1]);
        
        // 填充 dp 数组
        for (let i = 2; i < n; i++) {
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + houses[i]);
        }
        return dp[n - 1];
    };

    // 两种情况，去掉第一个或最后一个房子
    return Math.max(robLinear(nums.slice(0, -1)), robLinear(nums.slice(1)));
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int rob(int[] nums) {
    if (nums.length == 1) return nums[0];
    
    // 辅助函数，考虑线性排列的房屋
    int robLinear(int[] houses) {
        int n = houses.length;
        if (n == 0) return 0;
        if (n == 1) return houses[0];
        // 初始化 dp 数组
        int[] dp = new int[n];
        dp[0] = houses[0];
        dp[1] = Math.max(houses[0], houses[1]);
        
        // 填充 dp 数组
        for (int i = 2; i < n; i++) {
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + houses[i]);
        }
        return dp[n - 1];
    }

    // 两种情况，去掉第一个或最后一个房子
    return Math.max(robLinear(Arrays.copyOfRange(nums, 0, nums.length - 1)), robLinear(Arrays.copyOfRange(nums, 1, nums.length)));
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：

对于每种情况，我们需要依次计算 $O(n)$ 个状态的最大值，因此总的时间复杂度为 $O(n)$。


空间复杂度：

我们额外使用了大小为 $O(n)$ 的 dp 数组，因此空间复杂度为 $O(n)$。
