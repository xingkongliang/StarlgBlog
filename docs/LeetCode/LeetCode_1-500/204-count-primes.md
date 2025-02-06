---
sidebar_position: 204
tags:
  - math
  - array
  - Medium
---

# 204.计算质数

标签: `math`, `array`

难度: Medium

通过率: 34.22%

原题链接: https://leetcode.com/problems/count-primes/description/

## 题目描述
给定一个整数 $n$，返回严格小于 $n$ 的质数的数量。

## 解题思路
题目要求统计小于 $n$ 的质数个数。解决这个问题的高效方法是使用**埃氏筛法（Sieve of Eratosthenes）**，以下是具体步骤：  

1. 创建一个布尔列表 `is_prime`，长度为 $n$，其中每个位置初始化为 `True`。

2. 将列表的第0位和第1位设为 `False`，因为0和1不是质数。

3. 从2开始遍历到 $	ext{floor}(	ext{sqrt}(n))$。
   - 对于每个质数（最初假定为所有数都是质数），将其倍数位置设为 `False`，因为这些位置对应的都是合数。
   - 具体来说，标记公式是：对于质数 $p$，从 $p \times p$ 开始，以 $p$ 为步长，标记所有位置为 `False`。

4. 遍历结束后，列表中剩下的 `True` 位置的下标即为小于 $n$ 的质数。

最后，统计布尔列表中值为 `True` 的数量，即为小于 $n$ 的质数总数。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def countPrimes(n):
    # 如果小于等于2，直接返回0，因为没有小于n的质数
    if n <= 2:
        return 0

    # 初始化一个列表，默认设置所有数是质数
    is_prime = [True] * n
    is_prime[0] = is_prime[1] = False  # 0和1不是质数

    # 只需要筛到sqrt(n)即可
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            # 将质数的倍数标记为False，从i*i开始，步长为i
            for j in range(i * i, n, i):
                is_prime[j] = False

    # 返回True的数量，即质数的数量
    return sum(is_prime)

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int countPrimes(int n) {
    if (n <= 2) return 0;  // 没有小于2的质数

    vector<bool> is_prime(n, true);
    is_prime[0] = is_prime[1] = false;  // 0和1不是质数

    for (int i = 2; i * i < n; ++i) {
        if (is_prime[i]) {
            for (int j = i * i; j < n; j += i) {
                is_prime[j] = false;
            }
        }
    }

    return count(is_prime.begin(), is_prime.end(), true);
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function countPrimes(n) {
    if (n <= 2) return 0;  // 0和1不是质数

    const isPrime = new Array(n).fill(true);
    isPrime[0] = isPrime[1] = false;  // 0和1不是质数

    for (let i = 2; i * i < n; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j < n; j += i) {
                isPrime[j] = false;
            }
        }
    }

    return isPrime.reduce((count, prime) => count + prime, 0);
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int countPrimes(int n) {
        if (n <= 2) return 0;  // 没有质数

        boolean[] isPrime = new boolean[n];
        Arrays.fill(isPrime, true);
        isPrime[0] = isPrime[1] = false;  // 0和1不是质数

        for (int i = 2; i * i < n; i++) {
            if (isPrime[i]) {
                for (int j = i * i; j < n; j += i) {
                    isPrime[j] = false;
                }
            }
        }

        int count = 0;
        for (boolean prime : isPrime) {
            if (prime) count++;
        }
        return count;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：埃氏筛法的时间复杂度为 $O(n \log \log n)$。  
  
空间复杂度：我们需要一个大小为 $n$ 的数组来判断 $n$ 个数是否为质数，所以空间复杂度为 $O(n)$。
