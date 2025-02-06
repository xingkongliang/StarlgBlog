---
sidebar_position: 121
tags:
  - array
  - dynamic-programming
  - Easy
---

# 121.买卖股票的最佳时机

标签: `array`, `dynamic-programming`

难度: Easy

通过率: 54.47%

原题链接: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/

## 题目描述
给定一个整数数组 `prices` ，其中 `prices[i]` 表示第 `i` 天的股票价格。你只允许选择某一天买入这只股票，并选择在未来的某一个不同的日子卖出该股票。设计一个算法以找到最大的利润。如果在所有情况下都不赚钱，返回0。

## 解题思路
我们需要找到一个买入和卖出的最佳时机，使得利润最大化。一个简单的方法是，遍历数组，记录迄今为止的最低股票价格，然后对于每一天计算当前价格与最低价格的差值，即当天卖出的可能利润。如果这个利润大于当前已知的最大利润，则更新最大利润。通过一次遍历就可以实现这一目标。这个方法只需要维护两个变量：一个是最低价格，一个是最大利润。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def maxProfit(prices):
    # 初始化最大利润和最低价格
    max_profit = 0
    min_price = float('inf')
    
    # 遍历每个价格
    for price in prices:
        # 更新最低价格
        if price < min_price:
            min_price = price
        
        # 计算利润并更新最大利润
        potential_profit = price - min_price
        if potential_profit > max_profit:
            max_profit = potential_profit
    
    return max_profit
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function maxProfit(prices) {
    // 初始化最大利润和最低价格
    let max_profit = 0;
    let min_price = Infinity;
    
    // 遍历每个价格
    for (let price of prices) {
        // 更新最低价格
        if (price < min_price) {
            min_price = price;
        }
        
        // 计算利润并更新最大利润
        let potential_profit = price - min_price;
        if (potential_profit > max_profit) {
            max_profit = potential_profit;
        }
    }
    
    return max_profit;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int maxProfit(int[] prices) {
        // 初始化最大利润和最低价格
        int maxProfit = 0;
        int minPrice = Integer.MAX_VALUE;
        
        // 遍历每个价格
        for (int price : prices) {
            // 更新最低价格
            if (price < minPrice) {
                minPrice = price;
            }
            
            // 计算利润并更新最大利润
            int potentialProfit = price - minPrice;
            if (potentialProfit > maxProfit) {
                maxProfit = potentialProfit;
            }
        }
        
        return maxProfit;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是价格数组的长度。我们只需遍历一次价格数组。`
空间复杂度：$O(1)$，只使用了常数级别的额外空间。`
