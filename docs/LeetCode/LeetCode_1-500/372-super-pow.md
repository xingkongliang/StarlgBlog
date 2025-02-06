---
sidebar_position: 372
tags:
  - math
  - Medium
---

# 372.超级次幂

标签: `math`

难度: Medium

通过率: 35.12%

原题链接: https://leetcode.com/problems/super-pow/description/

## 题目描述
计算 $a^b \mod 1337$，其中 $a$ 是一个正整数，$b$ 是一个以数组形式给出的极大正整数。

## 解题思路
由于 $b$ 是一个超大的正整数，因此我们不能直接计算 $a^b$，解决这个问题的关键在于使用模幂算法和阶乘营造出一种递归的方式来逐步减少问题的规模。

可以应用以下递归公式：

$$a^{b \times 10 + c} \equiv (a^{10})^{b} \times a^c \mod 1337$$

首先，我们定义一个帮助函数 `superPow(a, b)`，这个函数将对数组 $b$ 的每一位进行递归。

在该方法中：
- 如果 $b$ 是空数组，返回 1，因为任何数的 0 次方都等于 1。
- 我们取数组 $b$ 的最后一位（$c$），然后从 $b$ 中去掉它。递归应用：
  - 计算 $part1 = (superPow(a, b))^{10} \mod 1337$。
  - 计算 $part2 = a^c \mod 1337$。
  - 结果是 $(part1 \times part2) \mod 1337$。

这通过抵消掉因为 $b$ 太大而无法直接计算的问题，逐步减少 $b$ 的大小，直到可以被合理处理。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def superPow(a, b):
    # 定义递归函数
    def helper(a, b):
        if not b:
            return 1
        last_digit = b.pop()
        part1 = pow(helper(a, b), 10, 1337)  # 计算我们递归的部分
        part2 = pow(a, last_digit, 1337)    # 计算这个最后一位的幂
        return (part1 * part2) % 1337

    return helper(a, b)  # 调用辅助函数
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int superPow(int a, vector<int>& b) {
        return helper(a, b);
    }
    
private:
    int helper(int a, vector<int>& b) {
        if (b.empty()) return 1;
        int last_digit = b.back();
        b.pop_back();
        int part1 = myPow(helper(a, b), 10, 1337);
        int part2 = myPow(a, last_digit, 1337);
        return (part1 * part2) % 1337;
    }
    
    int myPow(int a, int k, int mod) {
        long long res = 1;
        long long base = a;
        while (k > 0) {
            if (k % 2 == 1) res = (res * base) % mod;
            base = (base * base) % mod;
            k /= 2;
        }
        return res;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function superPow(a, b) {
    function helper(a, b) {
        if (!b.length) return 1;
        const last_digit = b.pop();
        const part1 = Math.pow(helper(a, b), 10) % 1337;
        const part2 = Math.pow(a, last_digit) % 1337;
        return (part1 * part2) % 1337;
    }
  
    return helper(a, b);
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int superPow(int a, int[] b) {
        return superPow(a, b, b.length - 1);
    }

    private int superPow(int a, int[] b, int index) {
        if (index < 0) return 1;
        int lastDigit = b[index];
        int part1 = pow(superPow(a, b, index - 1), 10, 1337);
        int part2 = pow(a, lastDigit, 1337);
        return (part1 * part2) % 1337;
    }

    private int pow(int a, int k, int mod) {
        long result = 1;
        long base = a;
        while (k > 0) {
            if (k % 2 == 1) result = (result * base) % mod;
            base = (base * base) % mod;
            k /= 2;
        }
        return (int)result;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中$n$是数组$b$的长度。因为我们对每一位调用递归函数，所以线性依赖于$b$的大小。  
  
空间复杂度：$O(n)$，在最坏情况下，我们会对每个数组项进行递归调用，因此，递归栈的深度为$b$的长度。
