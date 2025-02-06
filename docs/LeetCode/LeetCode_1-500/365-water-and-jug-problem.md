---
sidebar_position: 365
tags:
  - math
  - breadth-first-search
  - Medium
---

# 365.水壶问题

标签: `math`, `breadth-first-search`

难度: Medium

通过率: 42.12%

原题链接: https://leetcode.com/problems/water-and-jug-problem/description/

## 题目描述
你有两个容量分别为 $x$ 升和 $y$ 升的壶，并有无限的水供应。使用以下操作判断在这两个壶中是否可以达到目标水量：

 1. 将任意一个壶完全灌满。
 2. 将任意一个壶倒空。
 3. 将一个壶中的水倒入另一个壶，直到接收壶满或是倒出壶空。

给定两个壶的容量和目标水量，判断是否可以通过以上操作达到目标水量。

## 解题思路
解决这个问题的关键是研究数学基础而不是暴力模拟所有可能的水量组合。具体来说，这个问题可以通过Bézout's identity来解决，这涉及计算两个数的最大公约数（GCD）。在数学领域，Bézout's identity指出对于任何整数 $a$ 和 $b$，存在整数 $x$ 和 $y$ 来使 $ax + by = 	ext{gcd}(a, b)$ 成立。对于某个目标值 $z$，若 $z$ 可以用 $ax + by = z$ 表示，则 $z$ 必须是 $a$ 和 $b$ 的最大公约数的倍数。换言之，只要 $z$ 是 $x$ 和 $y$ 的最大公约数的倍数，并且 $z$ 不大于 $x + y$ （这是因为一个水壶问题的本质限制），则目标值是可达成的。

基于此，我们的解题步骤如下：
1. 检查目标值 $z$ 是否大于 $x$ 和 $y$ 之和，如果是则返回 `false`。
2. 计算 $x$ 和 $y$ 的最大公约数。
3. 检查 $z$ 是否为 $x$ 和 $y$ 的最大公约数的倍数，如果是则返回 `true`；否则返回 `false`。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
from math import gcd

# 判断是否可以使用水壶操作达到目标水量的函数
# x: 第一个水壶的容量
# y: 第二个水壶的容量
# target: 目标水量
# 返回值：布尔值，表明是否可以达到目标水量

def canMeasureWater(x, y, target):
    # 如果目标水量大于两个水壶总和，则无法实现
    if target > x + y:
        return False
    # 使用最大公约数判定条件
    return target % gcd(x, y) == 0
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// 导入标准库中用于求最大公约数的函数
declare function gcd(a: int, b: int) -> int;

// 判断是否可以用水壶操作达到目标水量的函数
// x: 第一个水壶的容量
// y: 第二个水壶的容量
// target: 目标水量
// 返回值：布尔值，表示是否可以达到目标水量
bo
ol canMeasureWater(int x, int y, int target) {
    // 如果目标水量大于两个水壶容量之和，则返回 false
    if (target > x + y) return false;
    // 检查 target 是否是最大公约数的倍数
    return target % gcd(x, y) == 0;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// 判断是否可以用水壶操作达到目标水量
// x: 第一个水壶的容量
// y: 第二个水壶的容量
// target: 目标水量
// 返回值：布尔值，表示是否可以达到目标水量
function canMeasureWater(x, y, target) {
    // 如果目标水量大于两个水壶容量之和，则返回 false
    if (target > x + y) return false;
    // 使用最大公约数判定条件
    const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
    return target % gcd(x, y) === 0;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

// 判断是否可以用水壶操作达到目标水量的函数
// x: 第一个水壶的容量
// y: 第二个水壶的容量
// target: 目标水量
// 返回值：布尔值，表示是否可以达到目标水量
public class Solution {
    public boolean canMeasureWater(int x, int y, int target) {
        // 如果目标水量大于两个水壶容量之和，则无法实现
        if (target > x + y) return false;
        // 使用最大公约数判定条件
        return target % gcd(x, y) == 0;
    }
    
    // 计算两个数的最大公约数
    private int gcd(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度主要取决于计算最大公约数的过程，其复杂度为 $O(\log(\min(x, y)))$。  
  
空间复杂度为 $O(1)$，因为我们只使用了常数额外的空间。
