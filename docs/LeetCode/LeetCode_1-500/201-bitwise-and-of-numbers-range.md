---
sidebar_position: 201
tags:
  - bit-manipulation
  - Medium
---

# 201.数字范围按位与

标签: `bit-manipulation`

难度: Medium

通过率: 47.36%

原题链接: https://leetcode.com/problems/bitwise-and-of-numbers-range/description/

## 题目描述
给定两个整数 left 和 right，表示范围 [left, right]，返回该范围内所有数字的按位与结果（含左右边界）。

## 解题思路
要找到 [left, right] 范围内所有数字的按位与，一个有效的方法是找到 left 和 right 的公共前缀。所有不在这个公共前缀范围内的位在进行按位与时最终都会变成0。因此，我们将 left 和 right 同时不断向右移动，直到两者相等，此时累计的已经移除的位数即为从末尾需要移除的公共0位数。然后我们将找到的公共前缀向左移动相同的位数即可得到结果。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def rangeBitwiseAnd(left: int, right: int) -> int: 
    # 位计数初始化
    shift_count = 0
    # 找到公共前缀
    while left < right:
        left >>= 1
        right >>= 1
        shift_count += 1
    # 将公共前缀左移回去
    return left << shift_count
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int rangeBitwiseAnd(int left, int right) {
        // 位计数初始化
        int shift_count = 0;
        // 找到公共前缀
        while (left < right) {
            left >>= 1;
            right >>= 1;
            shift_count++;
        }
        // 将公共前缀左移回去
        return left << shift_count;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function rangeBitwiseAnd(left, right) {
    // 位计数初始化
    let shift_count = 0;
    // 找到公共前缀
    while (left < right) {
        left >>= 1;
        right >>= 1;
        shift_count++;
    }
    // 将公共前缀左移回去
    return left << shift_count;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int rangeBitwiseAnd(int left, int right) {
        // 位计数初始化
        int shift_count = 0;
        // 找到公共前缀
        while (left < right) {
            left >>= 1;
            right >>= 1;
            shift_count++;
        }
        // 将公共前缀左移回去
        return left << shift_count;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(\log \max(\text{left}, \text{right}))$  
  
空间复杂度：$O(1)$
