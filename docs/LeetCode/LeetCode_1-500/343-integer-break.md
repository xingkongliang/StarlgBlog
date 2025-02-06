---
sidebar_position: 343
tags:
  - math
  - dynamic-programming
  - Medium
---

# 343.整数拆分

标签: `math`, `dynamic-programming`

难度: Medium

通过率: 60.77%

原题链接: https://leetcode.com/problems/integer-break/description/

## 题目描述
给定一个整数 $n$，将其拆分为至少两个正整数之和，且使这些整数的乘积最大化。返回可以获得的最大乘积。

## 解题思路
这道题的本质是数学上的一个问题：给定一个整数，将其拆分为至少两个正整数之和，并使乘积最大化。要解决这个问题，我们可以使用动态规划或者贪心算法两种方法进行处理。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def integerBreak(n):
    # dp[i] 表示将整数 i 拆分（至少两部分）后各部分的乘积的最大值
    dp = [0] * (n + 1)
    # 整数2只能拆成1+1，乘积为1
    dp[2] = 1
    
    # 依次计算从3到n的最大乘积
    for i in range(3, n + 1):
        for j in range(1, i // 2 + 1):
            # 取max是因为无论i拆成几部分，至少有一个部分>2，否则是没有意义的
            # 我们每次选择拆成j和i-j，将他们结合
            dp[i] = max(dp[i], j * (i - j), j * dp[i - j])
    
    return dp[n]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int integerBreak(int n) {
    // dp[i] 表示将整数 i 拆分（至少两部分）后各部分的乘积的最大值
    vector<int> dp(n + 1, 0);
    // 整数2只能拆成1+1，乘积为1
    dp[2] = 1;

    // 依次计算从3到n的最大乘积
    for (int i = 3; i <= n; ++i) {
        for (int j = 1; j <= i / 2; ++j) {
            // 取max是因为无论i拆成几部分，至少有一个部分>2，否则是没有意义的
            // 我们每次选择拆成j和i-j，将他们结合
            dp[i] = max(dp[i], j * (i - j), j * dp[i - j]);
        }
    }

    return dp[n];
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function integerBreak(n) {
    // dp[i] 表示将整数 i 拆分（至少两部分）后各部分的乘积的最大值
    const dp = Array(n + 1).fill(0);
    // 整数2只能拆成1+1，乘积为1
    dp[2] = 1;

    // 依次计算从3到n的最大乘积
    for (let i = 3; i <= n; i++) {
        for (let j = 1; j <= Math.floor(i / 2); j++) {
            // 取max是因为无论i拆成几部分，至少有一个部分>2，否则是没有意义的
            // 我们每次选择拆成j和i-j，将他们结合
            dp[i] = Math.max(dp[i], j * (i - j), j * dp[i - j]);
        }
    }

    return dp[n];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int integerBreak(int n) {
        // dp[i] 表示将整数 i 拆分（至少两部分）后各部分的乘积的最大值
        int[] dp = new int[n + 1];
        // 整数2只能拆成1+1，乘积为1
        dp[2] = 1;

        // 依次计算从3到n的最大乘积
        for (int i = 3; i <= n; i++) {
            for (int j = 1; j <= i / 2; j++) {
                // 取max是因为无论i拆成几部分，至少有一个部分>2，否则是没有意义的
                // 我们每次选择拆成j和i-j，将他们结合
                dp[i] = Math.max(dp[i], j * (i - j), j * dp[i - j]);
            }
        }

        return dp[n];
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n^2)$，其中 $n$ 是给定的整数，这是因为我们使用了嵌套循环来计算可能的组合。  
  
空间复杂度：$O(n)$，我们使用了一个数组来存储计算过程中的结果。
