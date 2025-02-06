---
sidebar_position: 198
tags:
  - dynamic-programming
  - array
  - Medium
---

# 198.打家劫舍

标签: `dynamic-programming`, `array`

难度: Medium

通过率: 51.78%

原题链接: https://leetcode.com/problems/house-robber/description/

## 题目描述
你是一名专业的小偷，计划沿着街道打劫房屋。每个房子都有一定数量的现金，唯一的限制是相邻的房屋装有相互连接的安全系统，如果同一个晚上其中任何两个相邻的房子被闯入，安全系统会自动联系警方。给定一个整数数组 nums ，代表每个房子的现金数，返回在不触发安全系统的情况下，可以偷盗的最高金额。

## 解题思路
此题可以用动态规划的方法来解决。设定一个数组 dp ，其中 dp[i] 表示从第 0 个房子到第 i 个房子之间所能偷盗的最大金额。在选择偷或不偷第 i 个房子时，有以下两种情况：

1. 不偷第 i 个房子：此时最大金额为前 i-1 个房子能偷到的最大金额，即 dp[i-1]。
2. 偷第 i 个房子：此时不能偷第 i-1 个房子，所以加上第 i-2 个房子的最大金额，即 dp[i-2] + nums[i]。

因此，状态转移方程为：
$$
dp[i] = \max(dp[i-1], dp[i-2] + nums[i])
$$

初始条件：
- dp[0] = nums[0]，即只偷第一家时能获得的金额。
- dp[1] = \max(nums[0], nums[1])，即只偷前两家时的最大金额。

最终的答案即为 dp[nums.length - 1]。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def rob(nums):
    # 如果房子数量为0，返回0
    if not nums:
        return 0
    
    n = len(nums)
    # 如果只有一个房子，直接返回该房子的钱数
    if n == 1:
        return nums[0]
    
    # 动态规划数组
    dp = [0] * n
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])
    
    # 填充dp数组
    for i in range(2, n):
        dp[i] = max(dp[i-1], dp[i-2] + nums[i])
    
    # 返回最后一个元素，即为可以偷盗的最大金额
    return dp[-1]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int rob(vector<int>& nums) {
    int n = nums.size();
    if (n == 0) return 0;
    if (n == 1) return nums[0];
    
    vector<int> dp(n, 0);
    dp[0] = nums[0];
    dp[1] = max(nums[0], nums[1]);
    
    for (int i = 2; i < n; ++i) {
        dp[i] = max(dp[i - 1], dp[i - 2] + nums[i]);
    }
    
    return dp[n - 1];
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function rob(nums) {
    const n = nums.length;
    if (n === 0) return 0;
    if (n === 1) return nums[0];
    
    const dp = new Array(n).fill(0);
    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);
    
    for (let i = 2; i < n; i++) {
        dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
    }
    
    return dp[n - 1];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int rob(int[] nums) {
        int n = nums.length;
        if (n == 0) return 0;
        if (n == 1) return nums[0];
        
        int[] dp = new int[n];
        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);
        
        for (int i = 2; i < n; i++) {
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
        }
        
        return dp[n - 1];
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是房屋的数量。我们只需要遍历一遍房屋即可。  
  
空间复杂度：$O(n)$，动态规划数组 $dp$ 需要考虑整个房子的数量。
