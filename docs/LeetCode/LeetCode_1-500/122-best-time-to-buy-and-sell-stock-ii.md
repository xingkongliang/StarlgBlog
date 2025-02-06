---
sidebar_position: 122
tags:
  - array
  - greedy
  - Medium
---

# 122.买卖股票的最佳时机 II

标签: `array`, `greedy`

难度: Medium

通过率: 68.3%

原题链接: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/description/

## 题目描述
给定一个整数数组 `prices`，其中 `prices[i]` 表示股票在第 `i` 天的价格。每一天，你可以决定购买和/或出售股票。你最多只能持有一股股票。但你可以在同一天买入并立即卖出。找出并返回你可以获得的最大利润。

## 解题思路
为了实现最大利润，我们可以采用贪心策略。具体来说，只要在每天的价格比前一天高时，我们就进行一次买入和卖出操作。通过持续这样做，我们可以累积所有价格上升的差价。这是因为，如果我们在一个价格上升趋势中，只进行一次买入和卖出，不如抓住所有上升的机会多次买入和卖出。

算法实现如下：
1. 初始化 `max_profit` 为 0。
2. 从第二天开始遍历每一天的 `prices`：
   - 如果当前价格高于前一天的价格，就将两者的差价加入到 `max_profit` 中。
3. 最后返回 `max_profit`。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def max_profit(prices):
    # 初始化最大利润为0
    max_profit = 0
    # 遍历价格，从第二天开始
    for i in range(1, len(prices)):
        # 如果今天的价格比昨天高，就买入并立即卖出
        if prices[i] > prices[i - 1]:
            max_profit += prices[i] - prices[i - 1]
    return max_profit
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int maxProfit(vector<int>& prices) {
    int max_profit = 0;
    for (int i = 1; i < prices.size(); ++i) {
        // 如果当天价格高于前一天，就买入并卖出
        if (prices[i] > prices[i - 1]) {
            max_profit += prices[i] - prices[i - 1];
        }
    }
    return max_profit;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function maxProfit(prices) {
    let max_profit = 0;
    for (let i = 1; i < prices.length; i++) {
        // 如果今天的价格比昨天高
        if (prices[i] > prices[i - 1]) {
            max_profit += prices[i] - prices[i - 1];
        }
    }
    return max_profit;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int maxProfit(int[] prices) {
        int max_profit = 0;
        for (int i = 1; i < prices.length; i++) {
            // 如果今天的价格高于昨天
            if (prices[i] > prices[i - 1]) {
                max_profit += prices[i] - prices[i - 1];
            }
        }
        return max_profit;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(n)$，其中 $n$ 是价格数组的长度。我们只需要遍历一次价格数组。
- 空间复杂度：$O(1)$，仅使用了常数的额外空间。
