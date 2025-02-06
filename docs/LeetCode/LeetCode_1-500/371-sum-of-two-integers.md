---
sidebar_position: 371
tags:
  - bit-manipulation
  - Medium
---

# 371.两整数之和

标签: `bit-manipulation`

难度: Medium

通过率: 52.85%

原题链接: https://leetcode.com/problems/sum-of-two-integers/description/

## 题目描述
给定两个整数 $a$ 和 $b$，在不使用加号和减号的情况下返回这两个整数的和。

## 解题思路
这道题要求我们在不使用加减运算符的情况下计算两个整数的和。这可以通过位操作来实现。实现思路如下：

1. **位运算基础**：计算机中，整数是以二进制的形式存储的。两个整数相加的过程也可以用多次移位和与或操作模拟出来。

2. **模拟进位过程**：
   - 首先，用按位与操作得到所有进位信息：`carry = a & b`。
   - 然后，计算不考虑进位的和：`a = a ^ b`。
   - `carry` 左移一位，对其加到结果上。

3. **迭代更新**：对更新后的 `a` 和 `carry` 重复上述过程，直到 `carry` 为0，即没有新的进位产生。

通过上述方法，我们可以一直迭代，直到所有的位都处理完毕，此时 `a` 就是最终的和。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def get_sum(a: int, b: int) -> int:
    # 继续直到没有进位
    while b != 0:
        # 进位
        carry = a & b
        # 不考虑进位的和
        a = a ^ b
        # 进位移动到下一个更高位
        b = carry << 1
    return a

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int getSum(int a, int b) {
        // 继续直到没有进位
        while (b != 0) {
            // 进位
            int carry = a & b;
            // 不考虑进位的和
            a = a ^ b;
            // 进位移动到下一个更高位
            b = carry << 1;
        }
        return a;
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const getSum = (a, b) => {
    // 继续直到没有进位
    while (b !== 0) {
        // 进位
        const carry = a & b;
        // 不考虑进位的和
        a = a ^ b;
        // 进位移动到下一个更高位
        b = carry << 1;
    }
    return a;
};

```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int getSum(int a, int b) {
        // 继续直到没有进位
        while (b != 0) {
            // 进位
            int carry = a & b;
            // 不考虑进位的和
            a = a ^ b;
            // 进位移动到下一个更高位
            b = carry << 1;
        }
        return a;
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(1)$，因为整数的位数是有限的，最多需要经过固定次数的迭代。  
  
空间复杂度为 $O(1)$，因为只使用了有限的额外变量。
