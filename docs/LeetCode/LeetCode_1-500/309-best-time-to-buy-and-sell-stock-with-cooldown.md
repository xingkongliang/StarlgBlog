---
sidebar_position: 309
tags:
  - dynamic-programming
  - Medium
---

# 309.最佳买卖股票时机含冷冻期

标签: `dynamic-programming`

难度: Medium

通过率: 59.48%

原题链接: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/description/

## 题目描述
给定一个整数数组 `prices` ，其中 `prices[i]` 表示第 `i` 天的股票价格。在满足以下限制的情况下，找到你可以获得的最大利润：

- 你可以尽可能地完成交易（即买入和卖出股票），但卖出后你必须至少等待一天才能再次买入。

注意：你不能同时参与多笔交易（即你必须在再次购买前出售股票）。

## 解题思路
我们可以通过动态规划来解决这个问题。设定三个状态数组：

- `hold[i]`：到第 `i` 天为止，手中持有股票的最大利润。
- `sell[i]`：到第 `i` 天为止，不持有股票且今天卖出了股票的最大利润。
- `rest[i]`：到第 `i` 天为止，不持有股票且今天没有进行交易（即休息）的最大利润。

可以根据以下递推公式推导出状态转换：

- `hold[i] = max(hold[i-1], rest[i-1] - prices[i])`，即要么昨天已经持有，要么今天买入。
- `sell[i] = hold[i-1] + prices[i]`，即昨天持有，今天卖出。
- `rest[i] = max(rest[i-1], sell[i-1])`，即昨天已经是休息或者昨天刚卖出。

初始条件为：在第一天，我们可以选择买入`hold[0] = -prices[0]`或者休息`rest[0] = 0`。

最终的结果是 `max(sell[last], rest[last])`，因为我们不能以持有股票结束。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def maxProfit(prices):
    if not prices:
        return 0
    n = len(prices)
    hold = [0] * n
    sell = [0] * n
    rest = [0] * n
    
    # 第一天下的一些初始条件
    hold[0] = -prices[0]
    sell[0] = 0
    rest[0] = 0
    
    for i in range(1, n):
        hold[i] = max(hold[i - 1], rest[i - 1] - prices[i])
        sell[i] = hold[i - 1] + prices[i]
        rest[i] = max(rest[i - 1], sell[i - 1])
    
    return max(sell[-1], rest[-1])
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        if (prices.empty()) return 0;
        int n = prices.size();
        vector<int> hold(n, 0), sell(n, 0), rest(n, 0);
        hold[0] = -prices[0];
        
        for (int i = 1; i < n; ++i) {
            hold[i] = max(hold[i-1], rest[i-1] - prices[i]);
            sell[i] = hold[i-1] + prices[i];
            rest[i] = max(rest[i-1], sell[i-1]);
        }
        return max(sell[n-1], rest[n-1]);
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function maxProfit(prices) {
    if (!prices.length) return 0;
    const n = prices.length;
    let hold = Array(n).fill(0);
    let sell = Array(n).fill(0);
    let rest = Array(n).fill(0);
    hold[0] = -prices[0];
    
    for (let i = 1; i < n; i++) {
        hold[i] = Math.max(hold[i-1], rest[i-1] - prices[i]);
        sell[i] = hold[i-1] + prices[i];
        rest[i] = Math.max(rest[i-1], sell[i-1]);
    }
    return Math.max(sell[n-1], rest[n-1]);
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int maxProfit(int[] prices) {
        if (prices.length == 0) return 0;
        int n = prices.length;
        int[] hold = new int[n];
        int[] sell = new int[n];
        int[] rest = new int[n];
        hold[0] = -prices[0];
        
        for (int i = 1; i < n; i++) {
            hold[i] = Math.max(hold[i-1], rest[i-1] - prices[i]);
            sell[i] = hold[i-1] + prices[i];
            rest[i] = Math.max(rest[i-1], sell[i-1]);
        }
        return Math.max(sell[n-1], rest[n-1]);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中$n$是价格数组的长度。我们只需要一次线性扫描。  
  
空间复杂度：$O(n)$，我们需要大小为$n$的三个数组来存储状态。
