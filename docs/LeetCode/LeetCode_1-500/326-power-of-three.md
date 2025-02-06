---
sidebar_position: 326
tags:
  - math
  - Easy
---

# 326.3 的幂

标签: `math`

难度: Easy

通过率: 47.36%

原题链接: https://leetcode.com/problems/power-of-three/description/

## 题目描述
给定一个整数 $n$ ，如果它是 $3$ 的幂，则返回 `true`；否则，返回 `false`。如果存在一个整数 $x$ 使得 $n = 3^x$ ，则整数 $n$ 是 3 的幂。

## 解题思路
要判断一个数是否是3的幂，可以使用循环或递归的方法，对数字进行反复除以3直到不能被3整除，如果最终结果为1则说明这个数是3的幂。具体步骤如下：
```
1. 如果 $n <= 0$，那么它不可能是3的幂，直接返回 false。
2. 循环判断，若 $n$ 能被3整除，则不断除以3；否则跳出循环。
3. 最后检查，如果结果是1，则 $n$ 是3的幂，返回 true；否则返回 false。
```

在不使用循环/递归的情况下，我们可以利用3的幂的性质：

- 在整数范围内最大的3的幂是 $1162261467$（即 $3^{19}$）。我们可以检查 $n$ 是否是 $1162261467$ 的约数，如果是，则 $n$ 是3的幂。

这种方法的实现如下：
- 检查 $n > 0$ 且 $1162261467 \mod n == 0$。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def isPowerOfThree(n: int) -> bool:
    # 用循环的方法判断是否为3的幂
    # 如果 n 小于等于0，直接返回 False
    if n <= 0:
        return False
    # 当 n 能整除 3 时，不断将 n 除以 3
    while n % 3 == 0:
        n //= 3
    # 若 n 最后变成1，说明它是3的幂
    return n == 1
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    bool isPowerOfThree(int n) {
        // 用循环的方法判断是否为3的幂
        if (n <= 0) return false;
        while (n % 3 == 0) {
            n /= 3;
        }
        return n == 1;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function isPowerOfThree(n) {
    // 用循环的方法判断是否为3的幂
    if (n <= 0) return false;
    while (n % 3 === 0) {
        n /= 3;
    }
    return n === 1;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public boolean isPowerOfThree(int n) {
        // 不用循环的方法 - 最大的 int 范围内 3 的幂是 1162261467 (3^19)
        return (n > 0 && 1162261467 % n == 0);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：对于循环方法，最坏情况下需要不断除以3，时间复杂度为 $O(\log_3 n)$。对于不使用循环/递归的方法，则为 $O(1)$。  
  
空间复杂度：$O(1)$，不需要额外的空间。
