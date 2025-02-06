---
sidebar_position: 172
tags:
  - math
  - Medium
---

# 172.阶乘尾数

标签: `math`

难度: Medium

通过率: 44.18%

原题链接: https://leetcode.com/problems/factorial-trailing-zeroes/description/

## 题目描述
给定一个整数 $n$，返回 $n!$（即 $n$ 的阶乘，$n! = n \times (n - 1) \times (n - 2) \times ... \times 3 \times 2 \times 1$）中尾随零的个数。

## 解题思路
要在 $n!$ 中找到尾随零的个数，我们需要知道有多少个 10 作为因数。由于 $10 = 2 \times 5$，在阶乘序列中，2 的因数总是比 5 的因数多，因此问题归结为阶乘 $n!$ 中有多少个 5 作为因数。 为了找到这些 5 的因数，我们只需要考虑 $\lfloor \frac{n}{5} \rfloor + \lfloor \frac{n}{25} \rfloor + \lfloor \frac{n}{125} \rfloor + \ldots$，直到 $n$ 小于 $5^k$ 。

具体地，我们首先计算 $\lfloor \frac{n}{5} \rfloor$，这是可以产生一个 5 作为因数的数量，我们继续计算 $\lfloor \frac{n}{25} \rfloor$，因为每 25 个数中出现一个额外的 5，依此类推，直到 $n$ 小于 5 的幂。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def trailingZeroes(n):
    # 初始化零计数器
    zeros = 0
    # 5 的幂
    power_of_5 = 5
    # 逐次计算 5 的幂在 n 中的倍数
    while n >= power_of_5:
        # 计算有多少个完整的 5 的倍数
        zeros += n // power_of_5
        # 更新 5 的幂
        power_of_5 *= 5
    return zeros
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int trailingZeroes(int n) {
    // 初始化零计数器
    int zeros = 0;
    // 5 的幂
    long long power_of_5 = 5;
    // 逐次计算 5 的幂在 n 中的倍数
    while (n >= power_of_5) {
        // 计算有多少个完整的 5 的倍数
        zeros += n / power_of_5;
        // 更新 5 的幂
        power_of_5 *= 5;
    }
    return zeros;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function trailingZeroes(n) {
    // 初始化零计数器
    let zeros = 0;
    // 5 的幂
    let power_of_5 = 5;
    // 逐次计算 5 的幂在 n 中的倍数
    while (n >= power_of_5) {
        // 计算有多少个完整的 5 的倍数
        zeros += Math.floor(n / power_of_5);
        // 更新 5 的幂
        power_of_5 *= 5;
    }
    return zeros;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int trailingZeroes(int n) {
        // 初始化零计数器
        int zeros = 0;
        // 5 的幂
        long power_of_5 = 5;
        // 逐次计算 5 的幂在 n 中的倍数
        while (n >= power_of_5) {
            // 计算有多少个完整的 5 的倍数
            zeros += n / power_of_5;
            // 更新 5 的幂
            power_of_5 *= 5;
        }
        return zeros;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：
$O(\log_5 n)$


空间复杂度：
$O(1)$
