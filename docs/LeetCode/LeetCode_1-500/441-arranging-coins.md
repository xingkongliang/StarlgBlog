---
sidebar_position: 441
tags:
  - math
  - binary-search
  - Easy
---

# 441.排列硬币

标签: `math`, `binary-search`

难度: Easy

通过率: 47.05%

原题链接: https://leetcode.com/problems/arranging-coins/description/

## 题目描述
你有 $n$ 枚硬币，你想用这些硬币建造一个阶梯。这个阶梯由 $k$ 行组成，其中第 $i$ 行正好有 $i$ 枚硬币。最后一行阶梯可能不完整。给定整数 $n$，返回你能建造的完整阶梯行数。

## 解题思路
我们可以利用数学公式来解决这个问题。确定可以完全填满的阶梯行数的问题可以转化为一个等差数列的和的问题：`i` 行总需要 $\frac{i(i+1)}{2}$ 枚硬币。因此，我们需要找到最大整数 $k$，使得：
$$ \frac{k(k+1)}{2} \leq n $$

通过数学推导（通过解正二次方程）可以得到：
$$ k = \lfloor \frac{-1 + \sqrt{1 + 8n}}{2} \rfloor $$

我们可以直接使用这个公式来计算 $k$，也可以采用二分搜索的方式来逐渐逼近 $k$ 的值。总的来说，数学解法或者二分搜索解法都是可行的。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
import math

def arrangeCoins(n: int) -> int:
    # 通过直接运用推导出来的公式来求解 k
    return int((-1 + math.sqrt(1 + 8 * n)) // 2)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int arrangeCoins(int n) {
        // 通过直接运用推导出来的公式来求解 k
        return (-1 + sqrt(1 + 8.0 * n)) / 2;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function arrangeCoins(n) {
    // 通过直接运用推导出来的公式来求解 k
    return Math.floor((-1 + Math.sqrt(1 + 8 * n)) / 2);
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int arrangeCoins(int n) {
        // 通过运用推导出来的公式来计算 k
        return (int)((-1 + Math.sqrt(1 + 8.0 * n)) / 2);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：

$O(1)$，因为我们使用了一个数学公式直接计算结果。


空间复杂度：

$O(1)$，因为我们只使用了常数空间。
