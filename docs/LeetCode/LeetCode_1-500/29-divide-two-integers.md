---
sidebar_position: 29
tags:
  - math
  - binary-search
  - Medium
---

# 29.除数问题

标签: `math`, `binary-search`

难度: Medium

通过率: 17.96%

原题链接: https://leetcode.com/problems/divide-two-integers/description/

## 题目描述
给定两个整数 dividend 和 divisor，将两个整数相除，要求不使用乘法、除法和 mod 运算符。``整数除法的结果应当截断为零（即结果小数部分应被舍弃）。``返回除法结果的商。``注意：假设处理的环境只能存储 32 位有符号整数的范围：[−2^{31}, 2^{31} − 1]。对于本题中的整数除法，请假设如果商 严格大于 2^{31} − 1，则返回 2^{31} − 1；如果商 严格小于 −2^{31}，则返回 −2^{31}。

## 解题思路
这道题目要求不用乘法、除法和取模运算来实现整数除法，我们可以采用二进制的位操作来替代这些操作。具体解法如下：``1. 首先要处理特殊情况，例如 divisor 为零的情况（虽然题目中已保证不会出现），和处理 dividend 是极小值的情况（-2^31），避免溢出，可以先特别处理。``2. 其次确定结果的符号，根据 dividend 和 divisor 的符号，如果两者符号相同，商就是正，否则是负。为了便于操作先取这两个数的绝对值。``3. 使用二分搜索的思想，也就是不断地将 divisor 左移，直到它大于等于 dividend，然后对 divisor 进行适当右移，直到再次小于 dividend。这可以有效找到最大的倍数。``4. 在实现时，我们可通过位移来确定最大的倍数，即从最高位开始逐位测试。将 divisor 左移直到超过 dividend 的范围，记录下来最大位移步数，将 dividend 减去对应的结果，更新余数，继续判断。``5. 最终根据商的符号返回结果，并处理超出范围的情况。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def divide(dividend: int, divisor: int) -> int:    # 处理溢出和特殊情况    if dividend == -2**31 and divisor == -1:        return 2**31 - 1    # 确定结果的符号    negative = (dividend < 0) ^ (divisor < 0)    # 获取绝对值    dividend, divisor = abs(dividend), abs(divisor)    result = 0    # 逐步逼近    while dividend >= divisor:        temp, count = divisor, 1        while dividend >= (temp << 1):            temp <<= 1            count <<= 1        dividend -= temp        result += count    return -result if negative else result
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {public:    int divide(int dividend, int divisor) {        // 处理溢出和特殊情况        if (dividend == INT_MIN && divisor == -1)            return INT_MAX;        // 确定结果的符号        bool negative = (dividend < 0) ^ (divisor < 0);        // 获取绝对值        long long dividend_l = labs(dividend), divisor_l = labs(divisor);        int result = 0;        // 逐步逼近        while (dividend_l >= divisor_l) {            long long temp = divisor_l, count = 1;            while (dividend_l >= (temp << 1)) {                temp <<= 1;                count <<= 1;            }            dividend_l -= temp;            result += count;        }        return negative ? -result : result;    }}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function divide(dividend, divisor) {    // 处理溢出和特殊情况    if (dividend === -Math.pow(2, 31) && divisor === -1)        return Math.pow(2, 31) - 1;    // 确定结果的符号    let negative = (dividend < 0) ^ (divisor < 0);    // 获取绝对值    dividend = Math.abs(dividend);    divisor = Math.abs(divisor);    let result = 0;    // 逐步逼近    while (dividend >= divisor) {        let temp = divisor, count = 1;        while (dividend >= (temp << 1)) {            temp <<= 1;            count <<= 1;        }        dividend -= temp;        result += count;    }    return negative ? -result : result;}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {    public int divide(int dividend, int divisor) {        // 处理溢出和特殊情况        if (dividend == Integer.MIN_VALUE && divisor == -1)            return Integer.MAX_VALUE;        // 确定结果的符号        boolean negative = (dividend < 0) ^ (divisor < 0);        // 获取绝对值        long dividendL = Math.abs((long)dividend);        long divisorL = Math.abs((long)divisor);        int result = 0;        // 逐步逼近        while (dividendL >= divisorL) {            long temp = divisorL, count = 1;            while (dividendL >= (temp << 1)) {                temp <<= 1;                count <<= 1;            }            dividendL -= temp;            result += count;        }        return negative ? -result : result;    }}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(\log^2 n)$，由于使用了位移操作和多个倍数运算，复杂度相乘结果达到$O(\log^2 n)$。``空间复杂度：$O(1)$，只需要常数级别的辅助空间。
