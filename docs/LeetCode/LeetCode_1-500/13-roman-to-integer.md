---
sidebar_position: 13
tags:
  - greedy
  - string
  - Easy
---

# 13.罗马数字转整数

标签: `greedy`, `string`

难度: Easy

通过率: 63.49%

原题链接: https://leetcode.com/problems/roman-to-integer/description/

## 题目描述
罗马数字由七个不同的符号表示：I（1）、V（5）、X（10）、L（50）、C（100）、D（500）和M（1000）。给定一个罗马数字，将其转换为整数。

## 解题思路
要将罗马数字转换为整数，我们可以从左到右遍历这个字符串。对于每个字符，应该取它对应的数值。如果当前字符对应的数值小于后续字符对应的数值，说明这种组合形式表示一个“减法”模式（例如，IV代表4），我们应该将当前数值从总和中减去。如果当前字符对应的数值大于或等于后续字符对应的数值，则表示一个“加法”模式，我们应该将数值加到总和中。通过这种方式处理整个字符串，最终得到对应的整数。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def romanToInt(s: str) -> int:
    # 创建一个字典来存储罗马数字符号及其对应的整数值
    roman_to_int = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    }
    
    total = 0
    prev_value = 0  # 初始化前一个值为0
    
    # 从左到右遍历字符串
    for char in s:
        # 获取当前符号对应的整数值
        value = roman_to_int[char]
        
        # 如果前一个值小于当前值，需要减去前一个值然后加上新的值
        if prev_value < value:
            total += value - 2 * prev_value  # 减去之前添加的prev_value
        else:
            total += value
        
        prev_value = value  # 更新前一个值
    
    return total
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int romanToInt(string s) {
        // 创建一个映射来保存罗马数字字符及其对应的整数值
        unordered_map<char, int> roman_to_int = {
            {'I', 1},
            {'V', 5},
            {'X', 10},
            {'L', 50},
            {'C', 100},
            {'D', 500},
            {'M', 1000}
        };
        
        int total = 0;
        int prev_value = 0;  // 初始化前一个值为0
        
        // 遍历字符串
        for (char c : s) {
            // 获取当前符号对应的整数值
            int value = roman_to_int[c];
            
            // 如果前一个值小于当前值，则当前组合为减法形式，要减去之前加的前一个值
            if (prev_value < value) {
                total += value - 2 * prev_value;  // 减去多加的prev_value
            } else {
                total += value;
            }
            
            prev_value = value;  // 更新前一个值
        }
        
        return total;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function romanToInt(s) {
    // 建立一个映射来查找罗马数字字符对应的整数值
    const roman_to_int = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    };
    
    let total = 0;
    let prev_value = 0; // 初始化前一个值
    
    // 遍历字符串
    for (let char of s) {
        // 获取对应的整数值
        let value = roman_to_int[char];
        
        // 如果前一个符号的值小于当前符号的值，表示之前的组合为减法
        if (prev_value < value) {
            total += value - 2 * prev_value; // 减去之前多加的值
        } else {
            total += value;
        }
        
        prev_value = value; // 更新前一个值
    }
    
    return total;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int romanToInt(String s) {
        // 使用一个哈希映射来存储罗马数字字符及其对应的整数值
        Map<Character, Integer> roman_to_int = new HashMap<>();
        roman_to_int.put('I', 1);
        roman_to_int.put('V', 5);
        roman_to_int.put('X', 10);
        roman_to_int.put('L', 50);
        roman_to_int.put('C', 100);
        roman_to_int.put('D', 500);
        roman_to_int.put('M', 1000);
        
        int total = 0;
        int prev_value = 0; // 初始化前一个值
        
        // 遍历字符串
        for (char c : s.toCharArray()) {
            // 获取当前符号对应的整数值
            int value = roman_to_int.get(c);
            
            // 如果前一个值比当前值小，那之前的组合为减法
            if (prev_value < value) {
                total += value - 2 * prev_value; // 减去多加的值
            } else {
                total += value;
            }
            
            prev_value = value; // 更新前一个值
        }
        
        return total;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 是输入罗马数字的长度，因为我们需要遍历整个字符串。空间复杂度为 $O(1)$，因为我们只需常量级的额外空间来存储映射、总和和前一个字符的值。
