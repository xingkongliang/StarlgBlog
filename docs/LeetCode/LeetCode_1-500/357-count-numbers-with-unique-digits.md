---
sidebar_position: 357
tags:
  - math
  - dynamic-programming
  - backtracking
  - Medium
---

# 357. 统计各位数字都不同的数字个数

标签: `math`, `dynamic-programming`, `backtracking`

难度: Medium

通过率: 53.58%

原题链接: https://leetcode.com/problems/count-numbers-with-unique-digits/description/

## 题目描述
给定一个整数 $n$，返回所有不超过 $10^n$ 的各位数字都不同的数字的个数。

## 解题思路
为了解决这个问题，我们需要统计位数不超过 $n$ 的数字，且这些数字的每一位都不相同。 

我们可以认为这是一个排列问题：我们有 $10$ 个数字（$0$ 到 $9$），从中选择不同的数字组成数字。由于选择的数字可以不排列成满位数，因此也要考虑短位数的排列。

问题可以用动态规划来求解：

- $f(n)$ 表示位数为 $n$ 的各位数字不同的数字的个数。
- 当 $n = 0$ 时， $f(0) = 1$，因为只有数字 $0$ 本身。

对于 $n = 1$，自然有 $10$ 个不同的数字（$0$ 到 $9$）。即 $f(1) = 10$。

当 $n > 1$ 时，比如 $n = 2$：
- 第一位可以选择 $1$ 到 $9$ 共 $9$ 种可能。
- 第二位可以选择 $0$ 到 $9$ 中除去第一位的数字，共 $9$ 种可能。
- 即 $f(2) = 9 \times 9$。

推广到一般的 $n$：

- 对于第 $i$ 位，可以选择的数字有 $10 - i$ 种，注意第一个数字不能为 $0$。
- 因此 $f(n)$ 可以通过累积不同位数的数字解决：$$ f(n) = 9 \times 9 \times 8 \times \ldots \times (10 - n + 1)$$

然后累积求和所有 $m \leq n$ 的 $f(m)$ 。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def countNumbersWithUniqueDigits(n):
    # 如果 n 为 0，则只有数字 0 是不重复的
    if n == 0:
        return 1

    # 初始化总计数为 10，第一个数字有 10 种可能性
    total_count = 10
    # 可选的数字从 9 开始，因为第一个数字不能是 0
    available_numbers = 9
    # 初始化动态组合的乘积
    product = 9

    # 从第二个数字开始计算
    for i in range(2, n + 1):
        product *= available_numbers
        total_count += product
        available_numbers -= 1

    return total_count
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int countNumbersWithUniqueDigits(int n) {
    if (n == 0) return 1;
    int total_count = 10;
    int product = 9;
    int available_numbers = 9;
    for (int i = 2; i <= n; ++i) {
        product *= available_numbers;
        total_count += product;
        available_numbers--;
    }
    return total_count;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function countNumbersWithUniqueDigits(n) {
    if (n === 0) return 1;
    let total_count = 10;
    let product = 9;
    let available_numbers = 9;
    for (let i = 2; i <= n; i++) {
        product *= available_numbers;
        total_count += product;
        available_numbers--;
    }
    return total_count;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int countNumbersWithUniqueDigits(int n) {
    if (n == 0) return 1;
    int total_count = 10;
    int product = 9;
    int available_numbers = 9;
    for (int i = 2; i <= n; i++) {
        product *= available_numbers;
        total_count += product;
        available_numbers--;
    }
    return total_count;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度： $O(n)$  
  
空间复杂度： $O(1)$
