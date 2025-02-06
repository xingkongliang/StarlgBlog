---
sidebar_position: 50
tags:
  - math
  - divide-and-conquer
  - Medium
---

# 50.Pow(x, n) 幂运算

标签: `math`, `divide-and-conquer`

难度: Medium

通过率: 36.08%

原题链接: https://leetcode.com/problems/powx-n/description/

## 题目描述
实现函数 pow(x, n)，计算 $x^n$ 的值。

## 解题思路
这道题的关键在于如何有效地计算 $x^n$。直接的循环乘法在 $n$ 非常大的情况下效率较低。因此，我们可以使用分治法（快速幂法）来提高计算效率。快速幂方法的思路是：

1. 当 $n$ 为0时，任何数的0次幂都是1。
2. 当 $n$ 为负数时，我们可以把 $x^n$ 转化为 $\frac{1}{x^{-n}}$。
3. 将 $n$ 逐步减半，并不断地平方 $x$，以实现加速。

具体步骤如下：

- 如果 $n$ 是偶数，则 $x^n = (x^{n/2})^2$。
- 如果 $n$ 是奇数，则 $x^n = x \times x^{n-1}$ 并将其转化为 $x \times (x^{(n-1)/2})^2$。

通过递归或迭代的方式，可以在对数级别的时间复杂度内求出 $x^n$。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def myPow(x: float, n: int) -> float:
    # 如果指数是 0，任何数的 0 次方都为 1
    if n == 0:
        return 1
    # 处理负数指数的情况
    if n < 0:
        x = 1 / x
        n = -n
    # 初始化答案
    result = 1
    current_product = x
    
    while n > 0:
        # 如果 n 是奇数
        if n % 2 == 1:
            result *= current_product
        # 平方底数
        current_product *= current_product
        # 右移 n，相当于 n 变成 n // 2
        n //= 2
    return result
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
double myPow(double x, int n) {
    // 如果指数是 0，任何数的 0 次方都为 1
    if (n == 0) return 1;
    // 处理负数指数的情况
    long long N = n;
    if (N < 0) {
        x = 1 / x;
        N = -N;
    }
    double result = 1;
    double current_product = x;
    while (N > 0) {
        // 如果 n 是奇数
        if (N % 2 == 1) {
            result *= current_product;
        }
        // 平方底数
        current_product *= current_product;
        // 右移 N，相当于 N 变成 N / 2
        N /= 2;
    }
    return result;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function myPow(x, n) {
    // 如果指数是 0，任何数的 0 次方都为 1
    if (n === 0) return 1;
    // 处理负数指数的情况
    if (n < 0) {
        x = 1 / x;
        n = -n;
    }
    let result = 1;
    let current_product = x;
    while (n > 0) {
        // 如果 n 是奇数
        if (n % 2 === 1) {
            result *= current_product;
        }
        // 平方底数
        current_product *= current_product;
        // 右移 n，相当于 n 变成 n >> 1
        n = Math.floor(n / 2);
    }
    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public double myPow(double x, int n) {
        // 如果指数是 0，任何数的 0 次方都为 1
        if (n == 0) return 1;
        // 处理负数指数的情况
        long N = n;
        if (N < 0) {
            x = 1 / x;
            N = -N;
        }
        double result = 1;
        double current_product = x;
        while (N > 0) {
            // 如果 n 是奇数
            if (N % 2 == 1) {
                result *= current_product;
            }
            // 平方底数
            current_product *= current_product;
            // 右移 N，相当于 N 变成 N / 2
            N /= 2;
        }
        return result;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(\log n)$，因为每次迭代 $n$ 都会减半。`
`空间复杂度：$O(1)$，只使用了常数级别的额外空间。
