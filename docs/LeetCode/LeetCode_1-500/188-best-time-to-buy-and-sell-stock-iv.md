---
sidebar_position: 188
tags:
  - dynamic-programming
  - Hard
---

# 188.买卖股票的最佳时机 IV

标签: `dynamic-programming`

难度: Hard

通过率: 45.32%

原题链接: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/description/

## 题目描述
给定一个整数数组 `prices`，其中 `prices[i]` 是第 `i` 天的股票价格，以及一个整数 `k`。你可以最多进行 `k` 次交易，即最多买入 `k` 次并卖出 `k` 次。找到你能获得的最大利润。注意：你不能同时参与多笔交易（也就是说，你必须在再次购买之前售出股票）。

## 解题思路
这是一个经典的动态规划问题。问题的核心在于如何有效地在保证不超过 `k` 次的情况下最大化利润。在每一天，我们有两种决策：保持现有状态或者进行一次交易（买入或卖出）。

定义状态 `dp[i][j][0]` 为在第 `i` 天进行了 `j` 次交易并且手头没有持有股票时的最大利润；`dp[i][j][1]` 为当天持有一支股票时的最大利润。

动态转移方程如下：

1. 如果手头没有股票，表示可能是从前一天也没有股票的情况或者今天卖出了手中的股票：
   $$dp[i][j][0] = \max(dp[i-1][j][0], dp[i-1][j][1] + prices[i])$$
2. 如果手头持有一支股票，表示可能是从前一天就持有或者今天买入了一支股票：
   $$dp[i][j][1] = \max(dp[i-1][j][1], dp[i-1][j-1][0] - prices[i])$$

初始条件：
- 第一天没有股票，利润为零：`dp[0][j][0] = 0`
- 第一天如果持有股票，由于无法在之前买入，所以不能有贡献，这里以负的价格进行初始化（即不可能的情况）：`dp[0][0][1] = -prices[0]`

边界条件：
- `j` 的范围是 `1` 到 `k`。

最后答案为：`max(dp[n-1][j][0])`，其中 `n` 是价格数组的长度。因为最后一天利润最大化的前提是不持有股票。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def maxProfit(k: int, prices: List[int]) -> int:
    n = len(prices)
    if n == 0 or k == 0:
        return 0
    
    # When k is greater than half of n, it's equivalent to full trading days
    if k > n // 2:
        max_profit = 0
        for i in range(1, n):
            if prices[i] > prices[i - 1]:
                max_profit += prices[i] - prices[i - 1]
        return max_profit
    
    dp = [[[0] * 2 for _ in range(k + 1)] for _ in range(n)]
    
    for j in range(1, k + 1):
        dp[0][j][1] = -prices[0]

    for i in range(1, n):
        for j in range(1, k + 1):
            dp[i][j][0] = max(dp[i-1][j][0], dp[i-1][j][1] + prices[i])
            dp[i][j][1] = max(dp[i-1][j][1], dp[i-1][j-1][0] - prices[i])

    return max(dp[n-1][j][0] for j in range(1, k + 1))

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int maxProfit(int k, vector<int>& prices) {
        int n = prices.size();
        if (n == 0 || k == 0) return 0;
        
        if (k > n / 2) {
            int max_profit = 0;
            for (int i = 1; i < n; i++) {
                if (prices[i] > prices[i - 1]) {
                    max_profit += prices[i] - prices[i - 1];
                }
            }
            return max_profit;
        }
        
        vector<vector<vector<int>>> dp(n, vector<vector<int>>(k + 1, vector<int>(2, 0)));
        
        for (int j = 1; j <= k; j++) {
            dp[0][j][1] = -prices[0];
        }

        for (int i = 1; i < n; i++) {
            for (int j = 1; j <= k; j++) {
                dp[i][j][0] = max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i]);
                dp[i][j][1] = max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i]);
            }
        }

        int max_profit = 0;
        for (int j = 1; j <= k; j++) {
            max_profit = max(max_profit, dp[n - 1][j][0]);
        }

        return max_profit;
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function maxProfit(k, prices) {
    const n = prices.length;
    if (n === 0 || k === 0) return 0;

    if (k > Math.floor(n / 2)) {
        let maxProfit = 0;
        for (let i = 1; i < n; i++) {
            if (prices[i] > prices[i - 1]) {
                maxProfit += prices[i] - prices[i - 1];
            }
        }
        return maxProfit;
    }
    
    const dp = Array.from({length: n}, () => Array.from({length: k + 1}, () => [0, -prices[0]]));
    
    for (let i = 1; i < n; i++) {
        for (let j = 1; j <= k; j++) {
            dp[i][j][0] = Math.max(dp[i-1][j][0], dp[i-1][j][1] + prices[i]);
            dp[i][j][1] = Math.max(dp[i-1][j][1], dp[i-1][j-1][0] - prices[i]);
        }
    }

    return Math.max(...dp[n-1].map(v => v[0]));
}

```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int maxProfit(int k, int[] prices) {
        int n = prices.length;
        if (n == 0 || k == 0) return 0;

        if (k > n / 2) {
            int maxProfit = 0;
            for (int i = 1; i < n; i++) {
                if (prices[i] > prices[i - 1]) {
                    maxProfit += prices[i] - prices[i - 1];
                }
            }
            return maxProfit;
        }

        int[][][] dp = new int[n][k + 1][2];
        for (int j = 1; j <= k; j++) {
            dp[0][j][1] = -prices[0];
        }

        for (int i = 1; i < n; i++) {
            for (int j = 1; j <= k; j++) {
                dp[i][j][0] = Math.max(dp[i-1][j][0], dp[i-1][j][1] + prices[i]);
                dp[i][j][1] = Math.max(dp[i-1][j][1], dp[i-1][j-1][0] - prices[i]);
            }
        }

        int maxProfit = 0;
        for (int j = 1; j <= k; j++) {
            maxProfit = Math.max(maxProfit, dp[n-1][j][0]);
        }

        return maxProfit;
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n \times k)$，其中 $n$ 是价格数组的长度，$k$ 是最多允许的交易次数。我们需要计算每一天、每个交易次数状态的利润。


空间复杂度：$O(n \times k)$，我们使用了一个三维数组来存储每一状态下的最大利润。
