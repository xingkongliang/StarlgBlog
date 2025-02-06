---
sidebar_position: 263
tags:
  - math
  - Easy
---

# 263.丑数

标签: `math`

难度: Easy

通过率: 42.19%

原题链接: https://leetcode.com/problems/ugly-number/description/

## 题目描述
丑数是指只包含质因子2, 3和5的正整数。给定一个整数n，如果n是丑数则返回true，否则返回false。

## 解题思路
要判断一个数是否是丑数，我们需要验证它除了因数2, 3和5之外，是否还有其他质因数。具体流程如下：

1. 如果 $n \leq 0$ ，则直接返回 `false`，因为丑数必须是正整数。
2. 将$n$尽可能多地除以2，直到不能被2整除。
3. 将所得结果尽可能多地除以3，直到不能被3整除。
4. 将此结果再尽可能多地除以5，直到不能被5整除。
5. 如果最终得到的结果为1，那么$n$是一个丑数。

这个思路的基本原理是，不断地去掉n的2, 3和5因子，如果剩下的数是1，则说明n只包含这些因子，因此是一个丑数。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def isUgly(n):
    # 如果n小于等于0，不是丑数
    if n <= 0:
        return False
    # 除去所有的2因子
    while n % 2 == 0:
        n //= 2
    # 除去所有的3因子
    while n % 3 == 0:
        n //= 3
    # 除去所有的5因子
    while n % 5 == 0:
        n //= 5
    # 如果最终结果是1，说明它是一个丑数
    return n == 1
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    bool isUgly(int n) {
        // 如果n小于等于0，不是丑数
        if (n <= 0) return false;
        // 除去所有的2因子
        while (n % 2 == 0) n /= 2;
        // 除去所有的3因子
        while (n % 3 == 0) n /= 3;
        // 除去所有的5因子
        while (n % 5 == 0) n /= 5;
        // 如果最终结果是1，说明它是一个丑数
        return n == 1;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function isUgly(n) {
    // 如果n小于等于0，不是丑数
    if (n <= 0) return false;
    // 除去所有的2因子
    while (n % 2 === 0) n /= 2;
    // 除去所有的3因子
    while (n % 3 === 0) n /= 3;
    // 除去所有的5因子
    while (n % 5 === 0) n /= 5;
    // 如果最终结果是1，说明它是一个丑数
    return n === 1;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public boolean isUgly(int n) {
        // 如果n小于等于0，不是丑数
        if (n <= 0) return false;
        // 除去所有的2因子
        while (n % 2 == 0) n /= 2;
        // 除去所有的3因子
        while (n % 3 == 0) n /= 3;
        // 除去所有的5因子
        while (n % 5 == 0) n /= 5;
        // 如果最终结果是1，说明它是一个丑数
        return n == 1;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(\log n)$，因为我们每次都将输入减少到原来的一半。  
  
空间复杂度：$O(1)$，因为我们使用的空间不随输入大小而变化。
