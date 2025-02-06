---
sidebar_position: 400
tags:
  - math
  - Medium
---

# 400.第N位数字

标签: `math`

难度: Medium

通过率: 35.25%

原题链接: https://leetcode.com/problems/nth-digit/description/

## 题目描述
给定一个整数 $n$，返回无限整数序列 `[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...]` 中的第 $n$ 位数字。

## 解题思路
我们需要从由每个数字的所有排列组合形成的无限序列中找到第 $n$ 个数字。可以通过以下步骤实现：

1. **确定数字的范围**: 首先，在个位数的数字中，总共有 $9$ 个数字（即 $1$ 到 $9$），共 $9 \times 1 = 9$ 个数字位。对于两位数的数字，数字在 $10$ 到 $99$ 之间，共有 $90$ 个数字，因而共有 $90 \times 2 = 180$ 个数字位。
2. **找到对应的位数**: 我们逐步减少 $n$，直到找到 $n$ 所落于的某个特定位数。
   - 如果 $n \leq 9$，则在前面 $9$ 个数字中找到第 $n$ 个。
   - 如果不在上述范围内，递归地检查下一个更高位数的数字段。
3. **定位具体的数字**: 确定所在的数字位数后，计算出当前 $n$ 所在的具体数字$\text{int}$。计算方法是：
   - 确定完整的数字个数：$\text{index} = \lfloor \frac{n-1}{\text{digit数目}} \rfloor$。
   - 找出具体数字：从最低的数字开始加上刚才确定的索引得到完整数字。
4. **提取最后结果**: 通过 $n$ 在数字中的具体位置，提取指定的数字位。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def findNthDigit(n):
    # 数字开始由几位数组成
    digit_length = 1
    # 其范围内总共的数字位数
    count = 9

    # 找到第n个数字所在的位数区间
    while n > digit_length * count:
        n -= digit_length * count
        digit_length += 1
        count *= 10

    # 确定实际的数字
    start = 10 ** (digit_length - 1)
    number = start + (n - 1) // digit_length

    # 确定具体的位置并返回结果
    digit_index = (n - 1) % digit_length
    return int(str(number)[digit_index])
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int findNthDigit(int n) {
    // 初始数字位数及个数
    long long digit_length = 1, count = 9;
    // 找到范围所在的位区间
    while (n > digit_length * count) {
        n -= digit_length * count;
        digit_length++;
        count *= 10;
    }
    // 得到具体的起始数字
    long long start = pow(10, digit_length - 1);
    long long number = start + (n - 1) / digit_length;
    // 确定返回的数字之位
    return to_string(number)[(n - 1) % digit_length] - '0';
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function findNthDigit(n) {
    let digit_length = 1;
    let count = 9;
    
    // 找到第n个数字所在的位数
    while (n > digit_length * count) {
        n -= digit_length * count;
        digit_length++;
        count *= 10;
    }
    
    // 找出具体的数字
    let start = Math.pow(10, digit_length - 1);
    let number = start + Math.floor((n - 1) / digit_length);
    
    // 提取数字位
    return Number(String(number).charAt((n - 1) % digit_length));
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int findNthDigit(int n) {
        int digit_length = 1;
        long count = 9;
        
        // 确定第n位在哪一组数字中
        while (n > digit_length * count) {
            n -= digit_length * count;
            digit_length++;
            count *= 10;
        }
        
        // 确定具体数字
        long start = (long) Math.pow(10, digit_length - 1);
        long number = start + (n - 1) / digit_length;
        
        // 确定结果
        return Long.toString(number).charAt((n - 1) % digit_length) - '0';
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度**:  
$O(d)$，其中 $d$ 为目标数字的位数。因为逐个减去全位数的数量直到找到所需位数。

**空间复杂度**:  
$O(1)$，因为仅用了少数变量进行计算的固定空间。
