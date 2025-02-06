---
sidebar_position: 123
tags:
  - dynamic-programming
  - Hard
---

# 123.买卖股票的最佳时机 III

标签: `dynamic-programming`

难度: Hard

通过率: 49.75%

原题链接: https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/

## 题目描述
给定一个数组 `prices` ，其中 `prices[i]` 是某支股票在第 `i` 天的价格。**至多**完成两笔交易来获取最大利润。**注意：**你不能同时参与多笔交易（即，你必须在再次购买之前售出常量）。

**示例 1：**

输入： `prices = [3,3,5,0,0,3,1,4]`
输出： `6`
解释：在第 4 天（价格 = 0）买入，在第 6 天（价格 = 3）卖出，利润 = 3-0 = 3。然后，在第 7 天（价格 = 1）买入，在第 8 天（价格 = 4）卖出，利润 = 4-1 = 3。

**示例 2：**

输入： `prices = [1,2,3,4,5]`
输出： `4`
解释：在第 1 天（价格 = 1）买入，在第 5 天（价格 = 5）卖出，利润 = 5-1 = 4。注意你不能在第 1 天和第 2 天买入，然后再之后卖出，因为你同时参与了多笔交易。你必须在买之前先卖掉。

**示例 3：**

输入： `prices = [7,6,4,3,1]`
输出： `0`
解释：在这种情况下，没有交易完成，即最大利润 = 0。

## 解题思路
可以通过动态规划方法解决这个问题，使用四个状态分别表示这四种操作：

1. `buy1`：第一次购买后手上的现金净值。
2. `sell1`：完成第一次出售后手上的现金净值。
3. `buy2`：第二次购买后手上的现金净值。
4. `sell2`：完成第二次出售后手上的现金净值。

最初，我们将 `buy1` 初始化为负的价格第一天的值，因为我们要假设买入，把它初始化得尽可能小。`sell1` 和 `sell2` 可以设置为 0，因为还没有开始交易时利润为0。`buy2` 同样初始化为负的价格第一天的值。

我们的目标是经过遍历完该列表后最大化 `sell2` 的值。对于每天的价格，我们更新这四个状态：

- `buy1` 为在当天买入后的最大净收益。
- `sell1` 为当天卖出后的最大净收益。
- `buy2` 为在第二次买入后的最大净收益。
- `sell2` 为当天进行第二次卖出后的最大净收益。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def maxProfit(prices):
    if not prices:
        return 0
    
    # 初始化四个变量用于DP
    buy1, sell1, buy2, sell2 = -float('inf'), 0, -float('inf'), 0
    
    for price in prices:
        buy1 = max(buy1, -price)  # 第一次买入，确保手里持有的价值尽可能大
        sell1 = max(sell1, buy1 + price)  # 第一次卖出
        buy2 = max(buy2, sell1 - price)  # 第二次买入
        sell2 = max(sell2, buy2 + price)  # 第二次卖出
    
    return sell2
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int maxProfit(vector<int>& prices) {
    int buy1 = INT_MIN, sell1 = 0, buy2 = INT_MIN, sell2 = 0;
    for (int price : prices) {
        buy1 = max(buy1, -price); // 更新第一次买入
        sell1 = max(sell1, buy1 + price); // 更新第一次卖出
        buy2 = max(buy2, sell1 - price); // 更新第二次买入
        sell2 = max(sell2, buy2 + price); // 更新第二次卖出
    }
    return sell2;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function maxProfit(prices) {
    let buy1 = -Number.MAX_VALUE, sell1 = 0, buy2 = -Number.MAX_VALUE, sell2 = 0;
    for (let price of prices) {
        buy1 = Math.max(buy1, -price); // 更新第一次买入
        sell1 = Math.max(sell1, buy1 + price); // 更新第一次卖出
        buy2 = Math.max(buy2, sell1 - price); // 更新第二次买入
        sell2 = Math.max(sell2, buy2 + price); // 更新第二次卖出
    }
    return sell2;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int maxProfit(int[] prices) {
    int buy1 = Integer.MIN_VALUE, sell1 = 0;
    int buy2 = Integer.MIN_VALUE, sell2 = 0;
    for (int price : prices) {
        buy1 = Math.max(buy1, -price); // 更新第一次买入
        sell1 = Math.max(sell1, buy1 + price); // 更新第一次卖出
        buy2 = Math.max(buy2, sell1 - price); // 更新第二次买入
        sell2 = Math.max(sell2, buy2 + price); // 更新第二次卖出
    }
    return sell2;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度是 $O(n)$，因为我们只需遍历价格数组一次。`
`空间复杂度是 $O(1)$，因为我们只使用了固定数目的额外存储。`
