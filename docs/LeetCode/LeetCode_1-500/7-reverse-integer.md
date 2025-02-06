---
sidebar_position: 7
tags:
  - math
  - Medium
---

# 7.整数反转

标签: `math`

难度: Medium

通过率: 29.53%

原题链接: https://leetcode.com/problems/reverse-integer/description/

## 题目描述
给定一个32位有符号整数，将其数字部分翻转。如果翻转后的整数超出了32位整数的范围 $[-2^{31}, 2^{31} - 1]$ ，则返回0。假设不允许存储64位整数。

## 解题思路
要反转一个整数，首先需要考虑整数的正负号，可用一个变量来记录符号。而后将整数转换为字符串处理或用数学的方法逐位处理。最后，在翻转完后重新组合成整数。在这个过程中，需要检查是否会产生溢出情况，采用翻转后的整数与 $2^{31}$ 进行对比来判断。如产生溢出则返回0，否则返回翻转后的整数。具体步骤如下：

1. 记录符号，若为负数则记录后转为正数处理。
2. 使用一个循环，通过取余和整除的方式逐位取出数字，然后重新组合。
3. 在每个新数字准备添加到结果时检测是否溢出，通过检测当前结果是否超过 $(2^{31} - 1)/10$ 来判断。
4. 翻转结束后根据记录的符号还原为正数或负数。
5. 如果检测出溢出则返回0，否则返回翻转后的数字。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def reverse(x: int) -> int:
    # 32位整数的范围
    INT_MIN, INT_MAX = -2**31, 2**31 - 1
    result = 0
    sign = 1 if x >= 0 else -1
    x = abs(x)
    while x != 0:
        # 每次取最后一位数字
        pop = x % 10
        x //= 10
        # 如果result已经大于INT_MAX//10，则一定会溢出
        if result > INT_MAX // 10 or (result == INT_MAX // 10 and pop > 7):
            return 0
        result = result * 10 + pop
    return sign * result
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int reverse(int x) {
        int result = 0;
        while (x != 0) {
            int pop = x % 10;
            x /= 10;
            if (result > INT_MAX/10 || (result == INT_MAX / 10 && pop > 7)) return 0;
            if (result < INT_MIN/10 || (result == INT_MIN / 10 && pop < -8)) return 0;
            result = result * 10 + pop;
        }
        return result;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
var reverse = function(x) {
    const INT_MAX = Math.pow(2, 31) - 1;
    const INT_MIN = -Math.pow(2, 31);
    let result = 0;
    while (x !== 0) {
        let pop = x % 10;
        x = parseInt(x / 10);
        if (result > INT_MAX / 10 || (result === Math.floor(INT_MAX / 10) && pop > 7)) return 0;
        if (result < INT_MIN / 10 || (result === Math.floor(INT_MIN / 10) && pop < -8)) return 0;
        result = result * 10 + pop;
    }
    return result;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int reverse(int x) {
        int result = 0;
        while (x != 0) {
            int pop = x % 10;
            x /= 10;
            if (result > Integer.MAX_VALUE/10 || (result == Integer.MAX_VALUE / 10 && pop > 7)) return 0;
            if (result < Integer.MIN_VALUE/10 || (result == Integer.MIN_VALUE / 10 && pop < -8)) return 0;
            result = result * 10 + pop;
        }
        return result;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(log_{10}(x))$，其中 $x$ 是输入数字。这个复杂度来源于我们在循环中对每位数字进行处理。空间复杂度为 $O(1)$，因为除了整数存储本身，并没有使用额外的储存空间。
