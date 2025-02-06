---
sidebar_position: 191
tags:
  - bit-manipulation
  - Easy
---

# 191.位1的个数

标签: `bit-manipulation`

难度: Easy

通过率: 73.16%

原题链接: https://leetcode.com/problems/number-of-1-bits/description/

## 题目描述
给定一个正整数 $n$，编写一个函数返回其二进制表示中 1 的个数（又称汉明重量）。

## 解题思路
我们需要计算二进制数中'1'的个数，这是一个位操作相关的问题。常见的解法有两种：

1. **逐位检查法**：
   - 逐位检查$n$的每一位是否为'1'。方法是用一个标志位（例如1），每次将标志位左移一位，然后与$n$进行按位与操作，通过判断结果是否为0来确定当前位是否为'1'。
   - 每次判断后，将标志位左移，直到超出$n$表示的比特长度。

2. **消除最低位的1法**：
   - 这个方法通过$n = n \& (n - 1)$来将二进制数中最低位的'1'消除。这是因为$n - 1$会将从低到高的第一个'1'变为'0'并将其后面的所有位变为'1'。
   - 每次消除最低位的'1'后，计数器加1，循环直到$n$为0。

第二种方法通常效率更高，因为它的操作次数与'1'的个数成正比。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def hammingWeight(n: int) -> int:
    count = 0
    while n:
        # 将 n 和 n-1 进行按位与操作
        n &= (n - 1)
        # 计数器增加
        count += 1
    return count
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int hammingWeight(uint32_t n) {
        int count = 0;
        while (n) {
            // 将 n 和 n-1 进行按位与操作
            n &= (n - 1);
            // 计数器增加
            count++;
        }
        return count;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
var hammingWeight = function(n) {
    let count = 0;
    while (n !== 0) {
        // 将 n 和 n-1 进行按位与操作
        n &= n - 1;
        // 计数器增加
        count++;
    }
    return count;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    // 计算汉明重量的函数
    public int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            // 通过 n 和 n-1 的按位与操作消去最低位的 '1'
            n &= (n - 1);
            // 增加计数器
            count++;
        }
        return count;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(k)$，其中$k$是输入数字$n$的二进制表示中'1'的个数。操作次数与'1'的数量成正比。  
  
空间复杂度：$O(1)$，只使用了常数个额外空间。
