---
sidebar_position: 375
tags:
  - dynamic-programming
  - Medium
---

# 375.猜数字大小 II

标签: `dynamic-programming`

难度: Medium

通过率: 50.29%

原题链接: https://leetcode.com/problems/guess-number-higher-or-lower-ii/description/

## 题目描述
我们正在玩一个猜数字游戏。游戏规则如下：

- 我挑选了一个从 1 到 n 的数字。
- 你来猜测一个数字。
- 如果你猜对了数字，你就赢得游戏。
- 如果你猜错了数字，我会告诉你答案是更高还是更低，并且你会继续猜测。
- 每次你猜错时，需要支付与你猜的数字等值的钱。如果你的钱用完了，你就输掉了游戏。

给定一个特定的 n，返回无论我选择哪个数字，你需要保证获胜所需的最少金额。

## 解题思路
这个问题可以使用动态规划来解决。我们定义一个二维数组 $dp[i][j]$，表示我们想在范围 $[i, j]$ 内找到目标数字所需支付的最小金额。

基本的想法是：在 $[i, j]$ 中选择一个数字 $k$ 作为猜测的基准。
- 如果猜的数字小于目标数字，我们就知道目标数字在 $[k+1, j]$ 的范围内。
- 如果猜的数字大于目标数字，我们就知道目标数字在 $[i, k-1]$ 的范围内。

因此，对于猜测数字 $k$，我们需要支付 $k$ 元，那么我们需要递归地在 $[i, k-1]$ 和 $[k+1, j]$ 的范围内继续猜测。我们支付的费用将是：

$$ k + \max(dp[i][k-1], dp[k+1][j]) $$

我们的目的是最小化该值，因此对于每一个 $k$ 都需要进行这样的计算，并选择其中的最小值。

初始条件为：
- 当 $i \geq j$ 时（即范围内只有一个或没有数字），我们不需要支付任何费用，因此 $dp[i][j] = 0$。

最终我们需要计算的是 $dp[1][n]$ 的值。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def getMoneyAmount(n):
    # 创建一个 (n+1) x (n+1) 的二维数组，dp[i][j] 表示从 i 到 j 范围内猜数的最小费用
    dp = [[0] * (n + 1) for _ in range(n + 1)]

    # 考虑范围长度从 2 到 n
    for length in range(2, n + 1):
        for start in range(1, n - length + 2):
            end = start + length - 1
            dp[start][end] = float('inf')

            # 选择一个猜测点 pivot，从 start 到 end
            for pivot in range(start, end):
                cost = pivot + max(dp[start][pivot - 1], dp[pivot + 1][end])
                
                # 更新当前区域 [start, end] 的最小费用
                dp[start][end] = min(dp[start][end], cost)

    # 返回从 1 到 n 的猜数字的最小费用
    return dp[1][n]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int getMoneyAmount(int n) {
        // 创建一个 (n+1) x (n+1) 的二维数组，dp[i][j] 表示从 i 到 j 范围内猜数的最小费用
        vector<vector<int>> dp(n + 1, vector<int>(n + 1, 0));

        // 考虑范围长度从 2 到 n
        for (int length = 2; length <= n; ++length) {
            for (int start = 1; start <= n - length + 1; ++start) {
                int end = start + length - 1;
                dp[start][end] = INT_MAX;

                // 选择一个猜测点 pivot，从 start 到 end
                for (int pivot = start; pivot < end; ++pivot) {
                    int cost = pivot + max(dp[start][pivot - 1], dp[pivot + 1][end]);
                    
                    // 更新当前区域 [start, end] 的最小费用
                    dp[start][end] = min(dp[start][end], cost);
                }
            }
        }

        // 返回从 1 到 n 的猜数字的最小费用
        return dp[1][n];
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function getMoneyAmount(n) {
    // 创建一个 (n+1) x (n+1) 的二维数组，dp[i][j] 表示从 i 到 j 范围内猜数的最小费用
    const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

    // 考虑范围长度从 2 到 n
    for (let length = 2; length <= n; ++length) {
        for (let start = 1; start <= n - length + 1; ++start) {
            const end = start + length - 1;
            dp[start][end] = Infinity;

            // 选择一个猜测点 pivot，从 start 到 end
            for (let pivot = start; pivot < end; ++pivot) {
                const cost = pivot + Math.max(dp[start][pivot - 1], dp[pivot + 1][end]);

                // 更新当前区域 [start, end] 的最小费用
                dp[start][end] = Math.min(dp[start][end], cost);
            }
        }
    }

    // 返回从 1 到 n 的猜数字的最小费用
    return dp[1][n];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int getMoneyAmount(int n) {
        // 创建一个 (n+1) x (n+1) 的二维数组，dp[i][j] 表示从 i 到 j 范围内猜数的最小费用
        int[][] dp = new int[n + 1][n + 1];

        // 考虑范围长度从 2 到 n
        for (int length = 2; length <= n; ++length) {
            for (int start = 1; start <= n - length + 1; ++start) {
                int end = start + length - 1;
                dp[start][end] = Integer.MAX_VALUE;

                // 选择一个猜测点 pivot，从 start 到 end
                for (int pivot = start; pivot < end; ++pivot) {
                    int cost = pivot + Math.max(dp[start][pivot - 1], dp[pivot + 1][end]);

                    // 更新当前区域 [start, end] 的最小费用
                    dp[start][end] = Math.min(dp[start][end], cost);
                }
            }
        }

        // 返回从 1 到 n 的猜数字的最小费用
        return dp[1][n];
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n^3)$，因为我们需要遍历所有可能的起始点和终止点，以及在每个范围内选择一个 pivot。


空间复杂度为 $O(n^2)$，因为我们使用了一个二维数组来存储所有子问题的结果。
