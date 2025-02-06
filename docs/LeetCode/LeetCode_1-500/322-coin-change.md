---
sidebar_position: 322
tags:
  - dynamic-programming
  - breadth-first-search
  - Medium
---

# 322.硬币兑换

标签: `dynamic-programming`, `breadth-first-search`

难度: Medium

通过率: 45.35%

原题链接: https://leetcode.com/problems/coin-change/description/

## 题目描述
给定一个整数数组 coins，表示不同面额的硬币，以及一个整数 amount，表示总金额。返回凑成该金额所需的最少硬币个数。如果无法凑成该金额，返回 -1。可以认为每种硬币的数量是无限的。

## 解题思路

这是一个典型的动态规划问题，要求用最少数量的硬币组成指定金额 `amount`。若无法组成，则返回 -1。

动态规划的核心是记录中间子问题的最优解，构建最终解答。这里的子问题是：**"用最少的硬币组成金额 `x`"**。

1. **状态定义**：
   - `dp[i]` 表示组成金额 `i` 所需的最少硬币数。

2. **状态转移方程**：
   - 对于每个金额 `i`，我们尝试使用每一种硬币 `coin`，如果 `i - coin >= 0`，则：
     $$
     dp[i] = \min(dp[i], dp[i - coin] + 1)
     $$
   - 即，当前金额的最优解取决于：用硬币 `coin` 之前的金额的最优解加上 1。

3. **初始化**：
   - `dp[0] = 0`，因为组成金额 0 不需要任何硬币。
   - 其余的 `dp[i]` 初始化为一个不可能的高值（如 `float('inf')`），表示当前金额无法组成。

4. **结果**：
   - 如果 `dp[amount] == float('inf')`，说明无法组成该金额，返回 -1；
   - 否则返回 `dp[amount]`。


## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
from typing import List

class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        # 初始化 dp 数组
        dp = [float('inf')] * (amount + 1)
        dp[0] = 0  # 金额为 0 时，需要 0 个硬币

        # 遍历每个金额
        for i in range(1, amount + 1):
            # 尝试每种硬币
            for coin in coins:
                if i - coin >= 0:  # 金额足够时更新状态
                    dp[i] = min(dp[i], dp[i - coin] + 1)

        # 判断是否能够组成目标金额
        return dp[amount] if dp[amount] != float('inf') else -1
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int coinChange(vector<int>& coins, int amount) {
    // 初始化 dp 数组，并设置为无穷大表示无法凑出
    vector<int> dp(amount + 1, INT_MAX);
    dp[0] = 0;  // 金额为0时，所需硬币数为0

    // 遍历每种面额的硬币
    for (int coin : coins) {
        for (int i = coin; i <= amount; ++i) {
            if (dp[i - coin] != INT_MAX) {
                // 状态转移方程
                dp[i] = min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    // 结果判断
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function coinChange(coins, amount) {
    // 初始化 dp 数组，并设置为无穷大表示无法凑出
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;  // 金额为0时，所需硬币数为0

    // 遍历每种面额的硬币
    for (let coin of coins) {
        for (let i = coin; i <= amount; i++) {
            // 状态转移方程
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
        }
    }

    // 结果判断
    return dp[amount] === Infinity ? -1 : dp[amount];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int coinChange(int[] coins, int amount) {
        // 初始化 dp 数组，并设置为无穷大表示无法凑出
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);  // 设置为不可能的大值
        dp[0] = 0;  // 金额为0时，所需硬币数为0

        // 遍历每种面额的硬币
        for (int coin : coins) {
            for (int i = coin; i <= amount; i++) {
                // 状态转移方程
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }

        // 结果判断
        return dp[amount] > amount ? -1 : dp[amount];
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析

1. **时间复杂度**：
   - 外层循环遍历金额：`O(amount)`；
   - 内层循环遍历硬币种类：`O(len(coins))`；
   - 总时间复杂度：`O(amount * len(coins))`。

2. **空间复杂度**：
   - 使用了 `dp` 数组，空间复杂度为：`O(amount)`。
