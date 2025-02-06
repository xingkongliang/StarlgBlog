---
sidebar_position: 397
tags:
  - dynamic-programming
  - math
  - Medium
---

# 397.整数替换

标签: `dynamic-programming`, `math`

难度: Medium

通过率: 36.22%

原题链接: https://leetcode.com/problems/integer-replacement/description/

## 题目描述
给定一个正整数 $n$，你可以应用以下操作之一： 

- 如果 $n$ 是偶数，则替换 $n$ 为 $n / 2$。
- 如果 $n$ 是奇数，则替换 $n$ 为 $n + 1$ 或 $n - 1$。

返回使 $n$ 变成 1 所需的最小操作次数。

## 解题思路
该问题的解题思路是使用递归或动态规划来处理，因为每一步式两种选择之一，利用递归或动态规划能够有效地降低计算量。对于给定的整数 $n$：

1. **递归**：
   - 如果 $n$ 是偶数，直接让 $n = n / 2$，递归求解所需步骤数。
   - 如果 $n$ 是奇数，我们将有两个选择：将 $n$ 变为 $n + 1$ 或 $n - 1$，递归地分别计算这两种选择所需的步骤数，取较小者加一作为当前步骤所需的步骤数。

2. **动态规划优化**：
   - 利用一个字典（或数组）存储已计算过的结果，以避免重复计算。

对于递推方程，如果 $n$ 是偶数：
$$ f(n) = 1 + f(n/2) $$
如果 $n$ 是奇数：
$$ f(n) = 1 + \min(f(n+1), f(n-1)) $$

开始递归自 $n$ 直到 $n=1$。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def integerReplacement(n: int) -> int:
    # 记忆化递归使用字典缓存计算结果
    memo = {}
    
    def helper(x):
        if x == 1:
            return 0
        if x in memo:
            return memo[x]
        if x % 2 == 0:
            memo[x] = 1 + helper(x // 2)
        else:
            memo[x] = 1 + min(helper(x + 1), helper(x - 1))
        return memo[x]

    return helper(n)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int integerReplacement(int n) {
        unordered_map<long, int> memo;
        return helper(n, memo);
    }

private:
    int helper(long n, unordered_map<long, int>& memo) {
        if (n == 1) return 0;
        if (memo.count(n)) return memo[n];

        // 若是偶数
        if (n % 2 == 0) {
            memo[n] = 1 + helper(n / 2, memo);
        } else { // 若是奇数
            memo[n] = 1 + min(helper(n + 1, memo), helper(n - 1, memo));
        }

        return memo[n];
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function integerReplacement(n) {
    const memo = new Map();
    
    const helper = (x) => {
        if (x === 1) return 0;
        if (memo.has(x)) return memo.get(x);
        
        let result;
        if (x % 2 === 0) {
            result = 1 + helper(x / 2);
        } else {
            result = 1 + Math.min(helper(x + 1), helper(x - 1));
        }
        
        memo.set(x, result);
        return result;
    };
    
    return helper(n);
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int integerReplacement(int n) {
        return helper(n, new HashMap<Long, Integer>());
    }

    private int helper(long n, Map<Long, Integer> memo) {
        if (n == 1) return 0;
        if (memo.containsKey(n)) return memo.get(n);

        int steps;
        if (n % 2 == 0) {
            steps = 1 + helper(n / 2, memo);
        } else {
            steps = 1 + Math.min(helper(n + 1, memo), helper(n - 1, memo));
        }

        memo.put(n, steps);
        return steps;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(\log n)$，因为每次操作都至少将数字减半。  
  
空间复杂度为 $O(\log n)$，用于递归调用的栈空间和记忆化所需的存储空间（字典或数组）。
