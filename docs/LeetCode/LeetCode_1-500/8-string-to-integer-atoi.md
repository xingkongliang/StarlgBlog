---
sidebar_position: 8
tags:
  - string
  - math
  - Medium
---

# 8.将字符串转换为整数

标签: `string`, `math`

难度: Medium

通过率: 18.35%

原题链接: https://leetcode.com/problems/string-to-integer-atoi/description/

## 题目描述
实现 `myAtoi(string s)` 函数，该函数将字符串转换为32位有符号整数。算法步骤如下：
1. 跳过前导空格。
2. 检查下一个字符是 '-' 还是 '+'，以确定整数的符号。如果两者都不是，默认认为是正数。
3. 从当前位置开始读取数字字符，直到遇到非数字字符或字符串结束。如果没有读取任何数字，则结果为0。
4. 如果读取的整数超出32位有符号整数范围 [-2^{31}, 2^{31} - 1]，则将整数截断到该范围。

返回整数结果。
例如：
```
输入: s = "42"
输出: 42
```

## 解题思路
解题思路如下：

1. **跳过前导空格**：使用一个指针从字符串起始位置遍历，跳过所有的空格字符，找到第一个非空格字符的位置。

2. **确定整数符号**：检查当前非空字符是否为'+'或'-'，如果是，将符号设置为正或负。然后，将指针移动到下一个字符。

3. **转换数字字符为整数**：从当前字符开始，逐个读取字符，如果是数字字符，将其转换为相应的整数值并累积到结果中。在累积过程中，注意处理整数的溢出情况。如果累积的值超出了32位有符号整数的范围，则根据溢出的方向（正溢出或负溢出）选择截断为 `2^{31}-1` 或 `−2^{31}`。

4. **返回结果**：停止读取字符并返回整数结果。

关键在于如何处理溢出问题：在每次累积新的数字前检查累积值是否会超出范围。溢出判断通过比较即将累积的数字与最大、最小值的商进行预判。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def myAtoi(s):
    # 定义上下界常量
    INT_MAX = 2**31 - 1
    INT_MIN = -2**31
    
    # 移除字符串前后的空白字符
    s = s.lstrip()
    
    # 如果字符串为空，则返回0
    if not s:
        return 0

    # 初始化符号和结果
    sign = 1
    result = 0
    index = 0
    
    # 检查符号
    if s[index] == '-' or s[index] == '+':
        sign = -1 if s[index] == '-' else 1
        index += 1
    
    # 按数字字符逐个转换并累积结果
    while index < len(s) and s[index].isdigit():
        digit = int(s[index])
        # 检查累积值是否会溢出
        if result > (INT_MAX - digit) / 10:
            return INT_MAX if sign == 1 else INT_MIN
        result = result * 10 + digit
        index += 1
    
    return sign * result
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int myAtoi(string s) {
        int index = 0, sign = 1, result = 0;
        const int INT_MAX = 2147483647;
        const int INT_MIN = -2147483648;
        
        // 去除前导空格
        while (index < s.size() && s[index] == ' ') {
            index++;
        }
        
        // 检查符号
        if (index < s.size() && (s[index] == '+' || s[index] == '-')) {
            sign = (s[index] == '-') ? -1 : 1;
            index++;
        }
        
        // 读取数字字符并转换为整数
        while (index < s.size() && isdigit(s[index])) {
            int digit = s[index] - '0';
            // 检查溢出
            if (result > (INT_MAX - digit) / 10) {
                return sign == 1 ? INT_MAX : INT_MIN;
            }
            result = result * 10 + digit;
            index++;
        }
        
        return sign * result;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function myAtoi(s) {
    const INT_MAX = Math.pow(2, 31) - 1;
    const INT_MIN = -Math.pow(2, 31);
    let index = 0, sign = 1, result = 0;
    
    // 移除前导空格
    s = s.trim();
    
    // 检查符号
    if (s[index] === '+' || s[index] === '-') {
        sign = s[index] === '-' ? -1 : 1;
        index++;
    }
    
    // 读取数字并转换为整数
    while (index < s.length && /\d/.test(s[index])) {
        const digit = s[index].charCodeAt(0) - '0'.charCodeAt(0);
        // 检查溢出
        if (result > Math.floor((INT_MAX - digit) / 10)) {
            return sign === 1 ? INT_MAX : INT_MIN;
        }
        result = result * 10 + digit;
        index++;
    }
    
    return result * sign;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int myAtoi(String s) {
        int index = 0, sign = 1, result = 0;
        int INT_MAX = Integer.MAX_VALUE;
        int INT_MIN = Integer.MIN_VALUE;
        
        // 去除前导空格
        s = s.trim();
        
        // 检查符号
        if (index < s.length() && (s.charAt(index) == '+' || s.charAt(index) == '-')) {
            sign = s.charAt(index) == '-' ? -1 : 1;
            index++;
        }
        
        // 读取数字字符并转换为整数
        while (index < s.length() && Character.isDigit(s.charAt(index))) {
            int digit = s.charAt(index) - '0';
            // 检查溢出
            if (result > (INT_MAX - digit) / 10) {
                return sign == 1 ? INT_MAX : INT_MIN;
            }
            result = result * 10 + digit;
            index++;
        }
        
        return result * sign;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度**: $O(n)$，其中 $n$ 是输入字符串的长度。我们需要遍历字符串的每个字符以确定结果。尽管可能提前终止遍历（例如遇到非数字字符），但最坏情况下仍可能需要检查所有字符。

**空间复杂度**: $O(1)$。只使用了若干常数个额外变量，没有依赖于输入大小的额外空间消耗。
