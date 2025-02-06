---
sidebar_position: 12
tags:
  - math
  - string
  - Medium
---

# 12.整数转罗马数字

标签: `math`, `string`

难度: Medium

通过率: 67.11%

原题链接: https://leetcode.com/problems/integer-to-roman/description/

## 题目描述
给你一个整数，将其转换为罗马数字。

## 解题思路
罗马数字由以下七种字符表示：`I`、`V`、`X`、`L`、`C`、`D` 和 `M`。转换规则：

1. 从左到右，从高位到低位依次处理。
2. 对于较大数值(如`1000`)用对应的字母`M`，如果是接近某些特定值(如`4`, `9`)时，需处理为减法组合。
3. 设有待处理数字`num`，声明一个字符串集合数组，将大的值放在前面：

   ```
   values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
   symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']
   ```

4. 使用贪心思想，对于每一个值 `value`，尽量从`num`中去减去`value`并且在结果中添加对应的`symbol`。
5. 继续迭代直到剩余的`num`为零。

经过以上流程，最终组合出的字符串即为罗马数字形式。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# Python 代码实现整数转罗马数字

def intToRoman(num):
    # 定义罗马数字字符集和对应数值
    values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
    symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I']

    # 结果字符串
    roman = ""

    # 遍历值数组
    for i in range(len(values)):
        # 当num大于等于当前值时
        while num >= values[i]:
            # 减去该值
            num -= values[i]
            # 加入对应的罗马字符
            roman += symbols[i]

    return roman

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++ 代码实现整数转罗马数字

#include <vector>
#include <string>

std::string intToRoman(int num) {
    // 定义罗马数字字符集和对应数值
    std::vector<int> values = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
    std::vector<std::string> symbols = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};

    // 结果字符串
    std::string roman = "";

    // 遍历值数组
    for (int i = 0; i < values.size(); ++i) {
        // 当num大于等于当前值时
        while (num >= values[i]) {
            // 减去该值
            num -= values[i];
            // 加入对应的罗马字符
            roman += symbols[i];
        }
    }

    return roman;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript 代码实现整数转罗马数字

function intToRoman(num) {
    // 定义罗马数字字符集和对应数值
    const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const symbols = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

    // 结果字符串
    let roman = '';

    // 遍历值数组
    for (let i = 0; i < values.length; i++) {
        // 当num大于等于当前值时
        while (num >= values[i]) {
            // 减去该值
            num -= values[i];
            // 加入对应的罗马字符
            roman += symbols[i];
        }
    }

    return roman;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java 代码实现整数转罗马数字

class Solution {
    public String intToRoman(int num) {
        // 定义罗马数字字符集和对应数值
        int[] values = {1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1};
        String[] symbols = {"M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"};

        // 结果字符串
        StringBuilder roman = new StringBuilder();

        // 遍历值数组
        for (int i = 0; i < values.length; i++) {
            // 当num大于等于当前值时
            while (num >= values[i]) {
                // 减去该值
                num -= values[i];
                // 加入对应的罗马字符
                roman.append(symbols[i]);
            }
        }

        return roman.toString();
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(1)$，因为在最坏的情况下，对一个数组进行线性扫描，数组大小是常数（13个元素）。
空间复杂度为 $O(1)$，使用的辅助空间很少且不随输入大小变化。
