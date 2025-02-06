---
sidebar_position: 279
tags:
  - dynamic-programming
  - breadth-first-search
  - math
  - Medium
---

# 279.最少的完全平方数

标签: `dynamic-programming`, `breadth-first-search`, `math`

难度: Medium

通过率: 55.25%

原题链接: https://leetcode.com/problems/perfect-squares/description/

## 题目描述
给定一个整数 $n$，返回和为 $n$ 的完全平方数的最少数量。``一个完全平方数是一个整数，它是某个整数的平方；换句话说，它是某个整数自乘的结果。``例如 1，4，9 和 16 是完全平方数，而 3 和 11 不是。

## 解题思路
我们可以使用动态规划的方法来解决这个问题。定义 $dp[i]$ 表示和为 $i$ 的最少数量的完全平方数。从小到大计算每个 $dp[i]$，对于每一个 $i$，我们尝试用一个比它小的完全平方数减去，然后看剩下的数值需要多少个完全平方数可以组成（这个剩余的数值即为 $i - j^2$，其中 $j$ 为当前尝试的完全平方数的平方根）。这样，问题就变成了递归定义的动态规划问题：``$dp[i] = \min(dp[i - j * j] + 1)$，其中 $j^2 \le i$``我们需要遍历所有可能的完全平方数，找到这当中最小的值。``初始状态为 $dp[0] = 0$，因为 0 不需要任何数字。``最后，我们返回 $dp[n]$ 即为结果。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def numSquares(n):
    # 定义DP数组，dp[i] 表示和为 i 的完全平方数的最少数量
    dp = [float('inf')] * (n + 1)
    dp[0] = 0
    
    # 遍历每个数
    for i in range(1, n + 1):
        # 计算当前数能够由哪些完全平方数组成
        j = 1
        while j * j <= i:
            # 状态转移方程
            dp[i] = min(dp[i], dp[i - j * j] + 1)
            j += 1
    
    return dp[n]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int numSquares(int n) {
    vector<int> dp(n + 1, INT_MAX);
    dp[0] = 0;
    
    for (int i = 1; i <= n; ++i) {
        for (int j = 1; j * j <= i; ++j) {
            dp[i] = min(dp[i], dp[i - j * j] + 1);
        }
    }
    
    return dp[n];
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function numSquares(n) {
    const dp = new Array(n + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j * j <= i; j++) {
            dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
        }
    }
    
    return dp[n];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int numSquares(int n) {
        int[] dp = new int[n + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;
        
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j * j <= i; j++) {
                dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
            }
        }
        
        return dp[n];
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n\sqrt{n})$``因为外层循环遍历 $n$，内层循环最多遍历 $\sqrt{n}$ 个完全平方数。  

空间复杂度：$O(n)$``需要一个大小为 $n+1$ 的数组来存储动态规划的结果。
