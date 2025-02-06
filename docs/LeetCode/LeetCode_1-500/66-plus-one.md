---
sidebar_position: 66
tags:
  - array
  - math
  - Easy
---

# 66.加一

标签: `array`, `math`

难度: Easy

通过率: 46.66%

原题链接: https://leetcode.com/problems/plus-one/description/

## 题目描述
给你一个由整数数组表示的大整数 digits，其中每个 digits[i] 表示整数的第 i 位。数字按从左到右的顺序排列，且不含前导 0。请你将该整数加一，并以数组形式返回结果。

## 解题思路
这个问题需要在一个按位存储的大整数上加一。当我们执行加一操作时，从最低位开始进位，这类似于我们平常在纸上做加法：

1. 从数组的最后一位开始，尝试在该位上加一。
2. 如果这位加一后小于10，则无需再进位，直接返回数组。
3. 如果加一后等于10（这时该位需要进位），将该位设为0，然后继续计算更高位的进位。
4. 继续执行上述步骤，直到没有进位为止。
5. 如果一直进位到最高位（即每一位都是9），我们需要在最前面补一个1，例如999加1后变为1000。

通过这几个步骤，我们能够正确处理所有需要进位的情况。代码只需一次遍历数组，时间复杂度为$O(n)$。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def plusOne(digits):
    # 从数组最后一位开始向前遍历
    for i in range(len(digits) - 1, -1, -1):
        # 当前位加一
        digits[i] += 1
        
        # 如果当前位<10，说明不需要进位，直接返回结果
        if digits[i] < 10:
            return digits
        
        # 如果当前位==10，进行进位操作
        digits[i] = 0
    
    # 如果所有位都进位了，例如999变为1000
    # 此时我们需要在最前面加一个1
    return [1] + digits

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        // 从数组末尾开始遍历
        for (int i = digits.size() - 1; i >= 0; --i) {
            // 当前位加一
            ++digits[i];
            // 如果当前位小于10，说明无需进位，直接返回结果
            if (digits[i] < 10)
                return digits;
            // 如果当前位等于10，进行进位操作
            digits[i] = 0;
        }
        // 若完成循环说明所有位都进位，需要在最高位前插入1
        digits.insert(digits.begin(), 1);
        return digits;
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function plusOne(digits) {
    // 从数组最后一位开始
    for (let i = digits.length - 1; i >= 0; i--) {
        digits[i]++;
        // 如果当前位小于10，说明不进位
        if (digits[i] < 10) {
            return digits;
        }
        // 需要进位
        digits[i] = 0;
    }
    // 全部进位的情况，例如[9,9,9]变为[1,0,0,0]
    digits.unshift(1);
    return digits;
}

```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int[] plusOne(int[] digits) {
        // 从数组的最后一位开始向前遍历
        for (int i = digits.length - 1; i >= 0; i--) {
            digits[i]++;
            // 如果没有进位，则直接返回
            if (digits[i] < 10) {
                return digits;
            }
            // 需要进位，将当前位设为0
            digits[i] = 0;
        }
        // 如果所有位都进位了，例如[9,9,9]，则在最高位前插入1
        int[] newDigits = new int[digits.length + 1];
        newDigits[0] = 1;
        return newDigits;
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中$n$是数字的位数，即数组长度。我们最多遍历整个数组一次。
空间复杂度：$O(1)$，不考虑输入输出占用的空间。除非在全部进位的极端情况下，需要额外的常数空间。
