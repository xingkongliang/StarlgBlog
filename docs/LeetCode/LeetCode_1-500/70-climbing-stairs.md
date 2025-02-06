---
sidebar_position: 70
tags:
  - dynamic-programming
  - Easy
---

# 70.爬楼梯

标签: `dynamic-programming`

难度: Easy

通过率: 53.26%

原题链接: https://leetcode.com/problems/climbing-stairs/description/

## 题目描述
你正在爬楼梯。需要 $n$ 阶你才能到达楼顶。每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶？

## 解题思路
这个问题的解法主要运用动态规划思想。因为每次可以选择爬1个台阶或2个台阶，因此到达第 $n$ 阶楼梯的方法可以通过以下两种情况累加得到：
- 从第 $n-1$ 阶爬1个台阶。
- 从第 $n-2$ 阶爬2个台阶。

因此，可以设定一个动态规划数组 $dp$，其中 $dp[i]$ 代表到达第 $i$ 阶楼梯的方法总数。

状态转移方程为：
\[ dp[i] = dp[i-1] + dp[i-2] \]

初始条件：
- $dp[0] = 1$，因为在地面不需要爬台阶。
- $dp[1] = 1$，因为到达第一阶只有一种方法。

最后 $dp[n]$ 就是所求的答案。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def climbStairs(n):
    # 处理特殊情况，当 n 为 1 时，直接返回 1
    if n == 1:
        return 1
    
    # 初始化dp数组，dp[i]表示到达第i阶的方法数
    dp = [0] * (n + 1)
    dp[0], dp[1] = 1, 1
    
    # 自底向上计算每一个楼梯阶的结果
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    # 返回到达第n阶的方法数
    return dp[n]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int climbStairs(int n) {
        // 如果只有一阶，则只有一种方法
        if (n == 1) return 1;

        // 定义dp数组
        int dp[46]; // n最大为45，所以dp的大小设置为46
        dp[0] = 1;
        dp[1] = 1;

        // 动态规划计算dp数组值
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }

        return dp[n];
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function climbStairs(n) {
    // 只有一级台阶的特殊情况
    if (n === 1) return 1;

    // 用数组dp记录到达每一阶的方法数
    const dp = new Array(n + 1);
    dp[0] = 1;
    dp[1] = 1;

    // 计算每一阶的方法数
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int climbStairs(int n) {
        if (n == 1) return 1;
        
        // 定义DP数组
        int[] dp = new int[n + 1];
        dp[0] = 1;
        dp[1] = 1;
        
        // 填充DP数组
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        
        return dp[n];
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，因为我们遍历了一次从 $2$ 到 $n$ 的循环。  

空间复杂度：$O(n)$，使用了大小为 $n+1$ 的数组来存储计算结果。
