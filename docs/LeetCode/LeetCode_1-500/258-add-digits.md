---
sidebar_position: 258
tags:
  - math
  - Easy
---

# 258.各位数字相加

标签: `math`

难度: Easy

通过率: 67.37%

原题链接: https://leetcode.com/problems/add-digits/description/

## 题目描述
给定一个整数 `num`，重复将其所有数字相加，直到结果只有一位数字，并返回它。

## 解题思路
这个问题可以通过数学上的数字根（数根）概念来解决。数字根是对一个整数反复取各个位数之和，直到得到一个个位数。计算方法可以利用模运算性质进行优化：

根据数论中的 *分块求和 (digit root)* 公式，对于一个非零整数 $num$，它的数根可以通过下面的公式计算：
- 如果 $num=0$，则 $\text{digit root}(num) = 0$。
- 如果 $num \neq 0$，则 $\text{digit root}(num) = 1 + ((num - 1) \bmod 9)$。

这个公式的推导是基于每次计算和时，每位数字的权重是在 $10$ 上进行求余数操作，其余数等价于对 $9$ 取余。这一性质使得我们可以在 $\mathcal{O}(1)$ 的时间里得出结果，而不需要使用循环或递归。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def addDigits(num):
    # 如果 num 为 0，那么数根也是 0
    if num == 0:
        return 0
    # 应用数根公式
    return 1 + (num - 1) % 9
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int addDigits(int num) {
    // 如果 num 为 0，那么数根也是 0
    if (num == 0) return 0;
    // 应用数根公式
    return 1 + (num - 1) % 9;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function addDigits(num) {
    // 如果 num 为 0，那么数根也是 0
    if (num === 0) return 0;
    // 应用数根公式
    return 1 + ((num - 1) % 9);
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int addDigits(int num) {
        // 如果 num 为 0，那么数根也是 0
        if (num == 0) return 0;
        // 应用数根公式
        return 1 + (num - 1) % 9;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $\mathcal{O}(1)$，因为我们仅需进行有限次的数学运算。  
空间复杂度为 $\mathcal{O}(1)$，因为不依赖于任何输入的大小，使用的空间是常数级别的。
