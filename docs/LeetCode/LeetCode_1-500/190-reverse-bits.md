---
sidebar_position: 190
tags:
  - bit-manipulation
  - Easy
---

# 190.翻转比特位

标签: `bit-manipulation`

难度: Easy

通过率: 61.3%

原题链接: https://leetcode.com/problems/reverse-bits/description/

## 题目描述
给定一个32位无符号整数，将其比特位翻转。

## 解题思路
对于一个32位无符号整数，我们需要将其从最低位到最高位进行翻转。具体来说，我们可以从右到左遍历每一位，将它们逐个转移到结果的相应位置上。具体步骤如下：

1. 初始化结果数为0。
2. 遍历整数的每一位，从低位到高位：
   - 每次从原数的最低位取出一位（可以使用按位与运算 'n & 1' 取得最低位）。
   - 将取得的位移到结果数的相应位置（使用左移操作）。
   - 然后将原数右移一位，以便下一轮循环处理下一个最低位。
3. 遍历完成后，结果数即为翻转后的无符号整数。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def reverseBits(n: int) -> int:
    # 初始化结果
    result = 0
    # 遍历32位
    for i in range(32):
        # 将result左移以腾出低位位置
        result <<= 1
        # 将n的最低位加到result中
        result |= n & 1
        # 右移n以处理下一个位
        n >>= 1
    return result
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        uint32_t result = 0;
        for (int i = 0; i < 32; ++i) {
            // 左移结果以移动到下一个位置
            result <<= 1;
            // 添加n的最低位
            result |= (n & 1);
            // 右移n
            n >>= 1;
        }
        return result;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function reverseBits(n) {
    let result = 0;
    for (let i = 0; i < 32; i++) {
        // 将result左移以腾出低位位置
        result <<= 1;
        // 把n的最低位加到result中
        result |= n & 1;
        // 右移n以处理下一位
        n >>= 1;
    }
    return result >>> 0; // 无符号右移，确保返回值是无符号的
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int reverseBits(int n) {
        int result = 0;
        for (int i = 0; i < 32; i++) {
            // 向左移一位以便加上下一位
            result <<= 1;
            // 加上n的最低位
            result |= (n & 1);
            // 右移n以处理下一位
            n >>= 1;
        }
        return result;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(1)$


空间复杂度：$O(1)$
