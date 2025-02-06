---
sidebar_position: 260
tags:
  - bit-manipulation
  - array
  - Medium
---

# 260.只出现一次的数字 III

标签: `bit-manipulation`, `array`

难度: Medium

通过率: 70.79%

原题链接: https://leetcode.com/problems/single-number-iii/description/

## 题目描述
给定一个整数数组nums，其中恰好有两个元素只出现一次，其他每个元素均出现两次。找出只出现一次的两个元素。你可以以任意顺序返回答案。你必须设计一个运行时间复杂度为线性并且只使用常量额外空间的算法。

## 解题思路
要解决这个问题，我们可以利用异或（XOR）运算的特性。异或运算有一个很重要的性质：相同的数字异或结果为0，不同的数字异或结果保留二者的不同位。

具体步骤如下：

1. **初步异或所有数字**: 第一步我们对数组中所有数进行异或，最后得到的结果是两个只出现一次的数的异或结果（设为xor）。因为其它数字均出现两次，互相抵消为0。

2. **区分两组数字**: 找到xor中任一为1的位置(假设为第k位)，这说明在这个位置上，两数是不同的。我们可以通过这个位将数组分成两组。第一组的第k位是0，第二组的第k位是1。

3. **分别异或**: 对这两组数分别进行异或运算，由于其他成对的数都在相同的组，所以组内异或结果是0。因此每组异或的结果就是我们要找的只出现一次的数之一。

通过这种方式，我们可以在 $O(n)$ 的时间和 $O(1)$ 的空间复杂度下解决问题。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def singleNumber(nums):
    # 步骤1: 找到两个只出现一次的数字的异或结果
    xor_result = 0
    for num in nums:
        xor_result ^= num

    # 步骤2: 找到区分这两个数字的最低位
    rightmost_bit = xor_result & -xor_result

    # 步骤3: 将数字分成两组，分别异或得出结果
    num1 = num2 = 0
    for num in nums:
        # 根据当前位是否为0分组
        if num & rightmost_bit:
            num1 ^= num
        else:
            num2 ^= num

    return [num1, num2]

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<int> singleNumber(vector<int>& nums) {
        // 步骤1：计算所有数字的异或结果
        int xor_result = 0;
        for (int num : nums) {
            xor_result ^= num;
        }

        // 步骤2：找到最低位上异或结果为1的位置
        int rightmost_bit = xor_result & ~(xor_result - 1);

        // 步骤3：根据最低位划分为两组，分别进行异或运算
        int num1 = 0, num2 = 0;
        for (int num : nums) {
            if (num & rightmost_bit) {
                num1 ^= num;
            } else {
                num2 ^= num;
            }
        }

        return {num1, num2};
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function singleNumber(nums) {
    // 步骤1：用异或找出不同的两个数的异或结果
    let xor_result = 0;
    for (let num of nums) {
        xor_result ^= num;
    }

    // 步骤2：找到mask
    const rightmost_bit = xor_result & -xor_result;

    // 步骤3：分为两组，并分别找出两个只出现一次的数字
    let num1 = 0, num2 = 0;
    for (let num of nums) {
        if (num & rightmost_bit) {
            num1 ^= num;
        } else {
            num2 ^= num;
        }
    }
    return [num1, num2];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int[] singleNumber(int[] nums) {
        // 第一步：所有数字异或
        int xor_result = 0;
        for (int num : nums) {
            xor_result ^= num;
        }

        // 第二步：找到低位第一个为1的位，作为mask
        int rightmost_bit = xor_result & -xor_result;

        // 第三步：分开两个数字，异或得到最终结果
        int num1 = 0, num2 = 0;
        for (int num : nums) {
            if ((num & rightmost_bit) == 0) {
                num1 ^= num;
            } else {
                num2 ^= num;
            }
        }

        return new int[] {num1, num2};
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中$n$是数组的长度，因为我们只需遍历数组常数次。    
    
空间复杂度：$O(1)$，不使用额外空间，只需常量空间存储中间变量。
