---
sidebar_position: 231
tags:
  - math
  - bit-manipulation
  - Easy
---

# 231.二的幂

标签: `math`, `bit-manipulation`

难度: Easy

通过率: 48.09%

原题链接: https://leetcode.com/problems/power-of-two/description/

## 题目描述
给定一个整数 n，如果它是二的幂，返回 true；否则，返回 false。整数 n 是二的幂，若存在整数 x 使得 n == 2^x。

## 解题思路
判断一个数是否为二的幂可以通过以下策略：

1. **性质**：二的幂在二进制表示中，只有一个位为 1 ，其余位为 0。比如，$2^0=1$ 表示为二进制是 `0001`，$2^1=2$ 表示为二进制是 `0010`。

2. **位操作法**：对于二的幂数值 n，如果 n > 0，并且 n & (n-1) == 0，这样的 n 即为二的幂。因为 n-1 会使 n 原来唯一的 1 变为 0，而更低位的 0 变为 1。二进制与操作 `n & (n-1)` 会将此唯一的 1 消去。

3. **不使用循环/递归的方法**：由于 2 的幂的特定性质，我们可以利用上述的位操作条件来快速判断。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def isPowerOfTwo(n: int) -> bool:
    # 检查 n 是否大于 0 且 n 的二进制表示中仅有一个位为 1
    return n > 0 and (n & (n - 1)) == 0

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
bool isPowerOfTwo(int n) {
    // 检查 n 是否大于 0 且 n 的二进制表示中仅有一个位为 1
    return n > 0 && (n & (n - 1)) == 0;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function isPowerOfTwo(n) {
    // 检查 n 是否大于 0 且 n 的二进制表示中仅有一个位为 1
    return n > 0 && (n & (n - 1)) === 0;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public boolean isPowerOfTwo(int n) {
        // 检查 n 是否大于 0 且 n 的二进制表示中仅有一个位为 1
        return n > 0 && (n & (n - 1)) == 0;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度**：$O(1)$，因为只是执行了常量次的位操作。  
  
**空间复杂度**：$O(1)$，没有使用额外的空间存储。
