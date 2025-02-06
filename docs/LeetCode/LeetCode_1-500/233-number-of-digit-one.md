---
sidebar_position: 233
tags:
  - math
  - dynamic-programming
  - Hard
---

# 233.数字 1 的个数

标签: `math`, `dynamic-programming`

难度: Hard

通过率: 35.24%

原题链接: https://leetcode.com/problems/number-of-digit-one/description/

## 题目描述
给定一个整数 $n$，计算所有小于或等于 $n$ 的非负整数中数字 1 出现的总次数。

## 解题思路
解决这个问题可以通过分析数字每一位上的“1”来完成。基本思想是从个位数开始到最高位，依次计算在每一位上的"1"的数量。设当前位记为 $i$，那我们要计算 $i$ 位是 1 时，总的"1"的数量。

对于一个数字 $n$，我们拆分为三部分：
- 更高位数字：这些位大于当前位
- 当前位：正在分析的位
- 更低位数字：这些位小于当前位

假设当前位是第 $i$ 位，我们可以通过整除和取模操作计算这三部分。
- 更高位：$high = n // (10^{i+1})$
- 当前位：$curr = (n // 10^i) \% 10$
- 更低位：$low = n \% 10^i$

然后，我们分析 $i$ 位上的"1"的情况：
- 如果 $curr > 1$，那么当前位的"1"可以出现在 $0..9$ 每个数字组合中，即 $high + 1$ 次。
- 如果 $curr == 1$，那就在 $0..low$ 之间多出 $low + 1$ 个组合可以出现"1"。
- 如果 $curr == 0$，此位上不存在"1"，总可能数就是 $high$ 次。

我们迭代计算从个位到最高位，把每一位的"1"的数量累加即可得到最终的结果。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def countDigitOne(n):
    # 初始化位置和结果数量
    i = 1 # 用于定位当前分析的位数
    count = 0 # 最终计数结果
    # 逐位解析，直到超过数字n
    while i <= n:
        # 计算高位、当前位和低位的值
        high = n // (i * 10)
        curr = (n // i) % 10
        low = n % i
        if curr == 0:
            # 如果当前位为0，说明当前位没有1
            count += high * i
        elif curr == 1:
            # 当前位为1，计数包含低位变化
            count += high * i + (low + 1)
        else:
            # 当前位大于1，包含完全变化可能
            count += (high + 1) * i
        # 左移至下一位
        i *= 10
    return count

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int countDigitOne(int n) {
    long long i = 1; //起始位
    int count = 0; //储存计数的结果
    while (i <= n) {
        long long high = n / (i * 10);
        int curr = (n / i) % 10;
        int low = n % i;

        if (curr == 0) {
            count += high * i;
        } else if (curr == 1) {
            count += high * i + low + 1;
        } else {
            count += (high + 1) * i;
        }
        i *= 10;
    }
    return count;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function countDigitOne(n) {
    let count = 0;
    let i = 1;
    while (i <= n) {
        const high = Math.floor(n / (i * 10));
        const curr = Math.floor(n / i) % 10;
        const low = n % i;

        if (curr === 0) {
            count += high * i;
        } else if (curr === 1) {
            count += high * i + low + 1;
        } else {
            count += (high + 1) * i;
        }
        i *= 10;
    }
    return count;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int countDigitOne(int n) {
    long i = 1; // 用于定位当前位数
    int count = 0; // 记录计数
    while (i <= n) {
        long high = n / (i * 10);
        int curr = (int)((n / i) % 10);
        int low = (int)(n % i);

        if (curr == 0) {
            count += high * i;
        } else if (curr == 1) {
            count += high * i + low + 1;
        } else {
            count += (high + 1) * i;
        }

        i *= 10; // 乘10以处理下一位
    }
    return count;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(\log_{10}n)$，因为我们是逐位分析数字 $n$，而 $n$ 中的位数最多是 $\log_{10}n$。  
  空间复杂度为 $O(1)$，因为我们只用了常数级别的额外空间来跟踪状态和计算。
