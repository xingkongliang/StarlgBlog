---
sidebar_position: 415
tags:
  - string
  - math
  - Easy
---

# 415.字符串相加

标签: `string`, `math`

难度: Easy

通过率: 51.63%

原题链接: https://leetcode.com/problems/add-strings/description/

## 题目描述
给定两个表示为字符串的非负整数 $num1$ 和 $num2$，返回 $num1$ 和 $num2$ 的和，结果也用字符串表示。不能使用任何内置库来处理大整数（例如 BigInteger），也不能直接将输入转换为整数。

## 解题思路
为了解决这个问题，需要模拟小学时的加法过程，从最低位开始逐位相加，同时处理进位。具体步骤如下：

1. 初始化一个 `carry` 变量为 0，用于存储进位。并初始化一个空的 `result` 列表来存储每一位的计算结果。

2. 创建两个指针 `i` 和 `j`，分别指向 `num1` 和 `num2` 的最后一个字符。

3. 从后向前逐位进行加法运算，直到两个字符串的指针都到达最前面且最后一位已经计算完成（即 `carry` 为0）：
   - 如果指针 `i` 没有到达最前面，获取 `num1` 的当前位的值，否则该位为0。
   - 同理，如果指针 `j` 没有到达最前面，获取 `num2` 的当前位的值，否则该位为0。
   - 计算当前位的和以及进位：
     $$ \text{sum	extunderscore bit} = \text{digit1} + \text{digit2} + \text{carry} $$
     $$ \text{carry} = \frac{\text{sum	extunderscore bit}}{10} $$
     $$ \text{result	extunderscore bit} = \text{sum	extunderscore bit} \mod 10 $$
   - 将 `result_bit` 作为字符串拼接到 `result` 列表的前面。
   - 更新指针 `i` 和 `j`。

4. 如果循环结束后 `carry` 仍然不是0，将其加入 `result`。

5. 将 `result` 列表连接成字符串返回。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def addStrings(num1: str, num2: str) -> str:
    # 初始化结果字符串，使用列表来构建字符更有效
    result = []
    carry = 0
    # 从后往前遍历
    i, j = len(num1) - 1, len(num2) - 1
    while i >= 0 or j >= 0 or carry:
        # 获取当前位的数值，如果下标超出则为0
        digit1 = int(num1[i]) if i >= 0 else 0
        digit2 = int(num2[j]) if j >= 0 else 0
        # 计算当前位的和
        sum_bit = digit1 + digit2 + carry
        # 更新进位
        carry = sum_bit // 10
        # 当前位的结果
        result.append(str(sum_bit % 10))
        # 移动到下个个位
        i -= 1
        j -= 1
    # 结果列表的顺序是从低位到高位，需要反转
    return ''.join(reversed(result))
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
std::string addStrings(std::string num1, std::string num2) {
    std::string result;
    int carry = 0;
    int i = num1.size() - 1;
    int j = num2.size() - 1;
    while (i >= 0 || j >= 0 || carry) {
        // 获取当前位的数值，如果下标超出则为0
        int digit1 = i >= 0 ? num1[i] - '0' : 0;
        int digit2 = j >= 0 ? num2[j] - '0' : 0;
        // 计算当前位的和
        int sum = digit1 + digit2 + carry;
        // 更新进位
        carry = sum / 10;
        // 当前位的结果
        result.push_back(sum % 10 + '0');
        // 移动到下一个个位
        i--;
        j--;
    }
    // 结果字符串目前是反转的
    std::reverse(result.begin(), result.end());
    return result;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function addStrings(num1, num2) {
    let result = [];
    let carry = 0;
    let i = num1.length - 1;
    let j = num2.length - 1;
    while (i >= 0 || j >= 0 || carry !== 0) {
        // 获取当前位的数值，如果下标超出则为0
        const digit1 = i >= 0 ? parseInt(num1.charAt(i), 10) : 0;
        const digit2 = j >= 0 ? parseInt(num2.charAt(j), 10) : 0;
        // 计算当前位的和
        const sum = digit1 + digit2 + carry;
        // 更新进位
        carry = Math.floor(sum / 10);
        // 当前位的结果
        result.push(sum % 10);
        // 移动到下一个个位
        i--;
        j--;
    }
    // 结果数组目前是反转的
    return result.reverse().join('');
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public String addStrings(String num1, String num2) {
    StringBuilder result = new StringBuilder();
    int carry = 0;
    int i = num1.length() - 1;
    int j = num2.length() - 1;
    while (i >= 0 || j >= 0 || carry != 0) {
        // 获取当前位的数值，如果下标超出则为0
        int digit1 = i >= 0 ? num1.charAt(i) - '0' : 0;
        int digit2 = j >= 0 ? num2.charAt(j) - '0' : 0;
        // 计算当前位的和
        int sum = digit1 + digit2 + carry;
        // 更新进位
        carry = sum / 10;
        // 当前位的结果
        result.append(sum % 10);
        // 移动到下一个个位
        i--;
        j--;
    }
    // 结果字符串目前是反转的
    return result.reverse().toString();
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(\max(n, m))$，其中 $n$ 和 $m$ 分别是 $num1$ 和 $num2$ 的长度。我们需要从最低位到最高位遍历每个字符。  
  
空间复杂度：$O(\max(n, m))$，用于存储结果字符串。
