---
sidebar_position: 342
tags:
  - math
  - bit-manipulation
  - Easy
---

# 342.4的幂

标签: `math`, `bit-manipulation`

难度: Easy

通过率: 48.77%

原题链接: https://leetcode.com/problems/power-of-four/description/

## 题目描述
给定一个整数 n ，如果 n 是 4 的幂次则返回 true ，否则返回 false。`一个数 n 是 4 的幂次，当且仅当存在一个整数 x 使得 n = 4^x 。

## 解题思路
要判断一个数是否为4的幂，有以下几点判断：

1. 首先，确保 n 是一个正数，如果 n 小于等于 0，直接返回 false。 
2. 确保 n 是 2 的幂。 n 是 2 的幂意味着 n 的唯一一个二进制位是 1，其余位全是0，我们可以通过 `(n & (n - 1)) == 0` 来验证。
3. 进一步确保 n 是 4 的幂。由于4是2的偶数幂，所有4的幂次的那些二进制1都会出现在奇数位上。在 32 位整数中，把所有4的幂的二进制位加起来的是 `0x55555555` (交错的0和1)。所以可以通过 `(n & 0x55555555) != 0` 来验证。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def isPowerOfFour(n):
    # 检查是否 n 是正数，并且是2的幂，并且满足4的幂的额外条件
    return n > 0 and (n & (n - 1)) == 0 and (n & 0x55555555) != 0

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    bool isPowerOfFour(int n) {
        // 检查是否 n 是正数，并且是2的幂，并且满足4的幂的额外条件
        return n > 0 && (n & (n - 1)) == 0 && (n & 0x55555555) != 0;
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function isPowerOfFour(n) {
    // 检查是否 n 是正数，并且是2的幂，并且满足4的幂的额外条件
    return n > 0 && (n & (n - 1)) === 0 && (n & 0x55555555) !== 0;
}

```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public boolean isPowerOfFour(int n) {
        // 检查是否 n 是正数，并且是2的幂，并且满足4的幂的额外条件
        return n > 0 && (n & (n - 1)) == 0 && (n & 0x55555555) != 0;
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度是 $O(1)$  
  
空间复杂度是 $O(1)$
