---
sidebar_position: 9
tags:
  - math
  - Easy
---

# 9.回文数

标签: `math`

难度: Easy

通过率: 58.13%

原题链接: https://leetcode.com/problems/palindrome-number/description/

## 题目描述
给定一个整数 $x$，如果 $x$ 是一个回文数，返回 true；否则，返回 false。

## 解题思路
我们可以通过反转整数来解决这个问题。首先需要处理负数的情况，因为负数不可能是回文数。然后，对于非负数，我们将其反转并检查是否等于原数。具体步骤如下：  
1. 如果 $x$ 是负数，直接返回 false。  
2. 初始化一个反转整数变量 $\text{revertedNumber} = 0$。  
3. 当 $x$ 大于 $\text{revertedNumber}$ 时，逐位反转 $x$。具体地：  
   - 将 $\text{revertedNumber}$ 乘以 10 并加上 $x$ 取余后的最后一位。  
   - 将 $x$ 去掉最后一位。  
4. 循环结束后，比较 $x$ 和 $\text{revertedNumber}$。由于我们是逐位构造反转数的，只需检查 $x == \text{revertedNumber}$ 或 $x == \text{revertedNumber} / 10$ （这是针对奇位数长度的情况）。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def isPalindrome(x: int) -> bool:
    # 如果 x 是负数，它不可能是回文数
    if x < 0:
        return False
    
    revertedNumber = 0
    currentNumber = x
    # 反转一半的整数
    while currentNumber > revertedNumber:
        revertedNumber = revertedNumber * 10 + currentNumber % 10
        currentNumber //= 10
    # 当数字长度为奇数时，我们可以通过 revertedNumber // 10 来去掉中间位
    return currentNumber == revertedNumber or currentNumber == revertedNumber // 10
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    bool isPalindrome(int x) {
        // 如果 x 是负数，它不可能是回文数
        if (x < 0) return false;
        
        int revertedNumber = 0;
        int currentNumber = x;
        // 反转一半的整数
        while (currentNumber > revertedNumber) {
            revertedNumber = revertedNumber * 10 + currentNumber % 10;
            currentNumber /= 10;
        }
        // 当数字长度为奇数时，我们可以通过 revertedNumber / 10 来去掉中间位
        return currentNumber == revertedNumber || currentNumber == revertedNumber / 10;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function isPalindrome(x) {
    // 如果 x 是负数，它不可能是回文数
    if (x < 0) return false;
    
    let revertedNumber = 0;
    let currentNumber = x;
    // 反转一半的整数
    while (currentNumber > revertedNumber) {
        revertedNumber = revertedNumber * 10 + currentNumber % 10;
        currentNumber = Math.floor(currentNumber / 10);
    }
    // 当数字长度为奇数时，我们可以通过 Math.floor(revertedNumber / 10) 来去掉中间位
    return currentNumber === revertedNumber || currentNumber === Math.floor(revertedNumber / 10);
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public boolean isPalindrome(int x) {
        // 如果 x 是负数，它不可能是回文数
        if (x < 0) return false;
        
        int revertedNumber = 0;
        int currentNumber = x;
        // 反转一半的整数
        while (currentNumber > revertedNumber) {
            revertedNumber = revertedNumber * 10 + currentNumber % 10;
            currentNumber /= 10;
        }
        // 当数字长度为奇数时，我们可以通过 revertedNumber / 10 来去掉中间位
        return currentNumber == revertedNumber || currentNumber == revertedNumber / 10;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(\log_{10}(n))$，其中 $n$ 是整数 $x$ 的位数。我们反转了一半的整数，所需迭代次数与数字的位数成正比。  
空间复杂度：$O(1)$，只使用了常数空间来存储若干整数变量。
