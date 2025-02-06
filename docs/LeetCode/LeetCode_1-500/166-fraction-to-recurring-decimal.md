---
sidebar_position: 166
tags:
  - math
  - hash-table
  - string
  - Medium
---

# 166.分数转化为循环小数

标签: `math`, `hash-table`, `string`

难度: Medium

通过率: 25.65%

原题链接: https://leetcode.com/problems/fraction-to-recurring-decimal/description/

## 题目描述
给定表示分数的两个整数，分子和分母，返回该分数的字符串格式。```
如果小数部分是循环的，则将循环部分括在括号中。

如果有多个答案，一律返回其中一种。```

## 解题思路
我们可以通过长除法来求解这个问题。长除法不仅用于计算小数部分，还能够帮助我们检测到小数部分何时开始循环。具体步骤如下：

1. 首先处理符号问题，确定结果的符号。若分子和分母中，一者为负数一者为正数，结果就为负数，否则为正。
2. 通过divmod函数获取商与余数，记录商为整数部分。
3. 如果余数为零，直接返回结果，因为分数能够被整除，说明没有小数部分。
4. 否则处理小数部分，创建一个字典用于记录各个余数出现在小数部分的位置。
5. 启动一个循环，在余数不为0且未出现过的条件下开展：
    - 跟踪余数并更新其所在位置
    - 通过乘以10计算新的商和余数
    - 在结果中记录新的商
6. 如果余数再次出现，说明出现了循环，在循环位置插入括号并返回结果。
7. 如果余数为0，表示整数除尽，返回结果。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def fraction_to_decimal(numerator: int, denominator: int) -> str:
    if numerator == 0:
        return "0"
    
    result = []
    # If either number is negative (but not both), result is negative
    if (numerator < 0) != (denominator < 0):
        result.append("-")
    
    # Use absolute values to simplify division
    numerator, denominator = abs(numerator), abs(denominator)

    # Integer part
    integer_part, remainder = divmod(numerator, denominator)
    result.append(str(integer_part))

    # If no remainder, return the result as is
    if remainder == 0:
        return "".join(result)

    result.append(".")
    # Map to store previously seen remainders
    remainder_map = {}
    remainder_map[remainder] = len(result)
    
    # Calculate fractional part
    while remainder != 0:
        remainder *= 10
        digit, remainder = divmod(remainder, denominator)
        result.append(str(digit))

        if remainder in remainder_map:
            index = remainder_map[remainder]
            result.insert(index, "(")
            result.append(")")
            break

        remainder_map[remainder] = len(result)

    return "".join(result)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    string fractionToDecimal(int numerator, int denominator) {
        if (numerator == 0) return "0";
        string result;
        // Add the sign
        if (numerator < 0 ^ denominator < 0) result += "-";
        // Convert to long long to avoid overflow
        long long n = labs(numerator);
        long long d = labs(denominator);
        long long quotient = n / d;
        result += to_string(quotient);
        long long remainder = n % d;
        if (remainder == 0) return result;
        result += ".";
        unordered_map<int, int> remainderMap;
        while (remainder != 0) {
            if (remainderMap.find(remainder) != remainderMap.end()) {
                result.insert(remainderMap[remainder], "(");
                result += ")";
                break;
            }
            remainderMap[remainder] = result.size();
            remainder *= 10;
            result += to_string(remainder / d);
            remainder %= d;
        }
        return result;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function fractionToDecimal(numerator, denominator) {
    if (numerator === 0) return "0";
    let result = '';
    // Sign
    if ((numerator < 0) ^ (denominator < 0)) result += '-';
    let n = Math.abs(numerator);
    let d = Math.abs(denominator);
    result += Math.floor(n / d);
    let remainder = n % d;
    if (remainder === 0) return result;
    result += '.';
    const remainderMap = new Map();
    while (remainder !== 0) {
        if (remainderMap.has(remainder)) {
            result = result.slice(0, remainderMap.get(remainder)) + '(' + result.slice(remainderMap.get(remainder)) + ')';
            break;
        }
        remainderMap.set(remainder, result.length);
        remainder *= 10;
        result += Math.floor(remainder / d);
        remainder %= d;
    }
    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public String fractionToDecimal(int numerator, int denominator) {
        if (numerator == 0) return "0";
        StringBuilder result = new StringBuilder();
        // handle sign
        if ((numerator > 0) ^ (denominator > 0)) result.append("-");
        long n = Math.abs((long) numerator);
        long d = Math.abs((long) denominator);
        result.append(n / d);
        long remainder = n % d;
        if (remainder == 0) return result.toString();
        result.append('.');
        Map<Long, Integer> map = new HashMap<>();
        // Compute the fractional part
        while (remainder != 0) {
            if (map.containsKey(remainder)) {
                result.insert(map.get(remainder), "(");
                result.append(')');
                break;
            }
            map.put(remainder, result.length());
            remainder *= 10;
            result.append(remainder / d);
            remainder %= d;
        }
        return result.toString();
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 为小数部分的长度，因为我们可能会检查小数部分中每个数字。    
    
空间复杂度为 $O(1)$，不考虑存储结果的空间，余数表的大小理论上受限于 $d$。
