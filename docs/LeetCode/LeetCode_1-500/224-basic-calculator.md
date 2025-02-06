---
sidebar_position: 224
tags:
  - stack
  - string
  - Hard
---

# 224.基本计算器

标签: `stack`, `string`

难度: Hard

通过率: 44.37%

原题链接: https://leetcode.com/problems/basic-calculator/description/

## 题目描述
给定一个字符串 `s` 表示一个有效的表达式，计算其结果并返回。注意：不允许使用任何内置函数来评估字符串作为数学表达式，如 `eval()`。表达式中可能包含 `+`、`-`、`(`、`)` 以及空格。

## 解题思路
这道题要求实现一个简单的计算器来解析处理包含`+`、`-`、`(`、`)`的字符串表达式。很明显地，遇到括号时需要特别处理。我们可以利用栈来实现这一功能。以下是具体思路：

1. 初始化：
   - `stack` 用于存放在括号内的结果。
   - `result` 保存当前局部运算结果。
   - `sign` 保存当前操作符，初始化为1（相当于正号）。
   - `number` 用于构建多位数。

2. 遍历字符串 `s`：

   - 如果遇到数字：继续构建数字，因为可能是多位数。
   - 如果遇到`+`或者`-`：终止当前数字的构造，将`number`加入到`result`中，并更新`sign`。
   - 如果遇到`(`：意味着开始一个新的子表达式。将`result`和`sign`入栈，以便稍后能返回到当前的结果上下文中，并重置`result`和`sign`。
   - 如果遇到`)`：结束一个子表达式。先将子表达式的`result`加入到局部的`result`中，再将`stack`栈顶元素（先前的`result`）加上当前`result`和一个`sign`操作，这样便回到更高一级的上下文结果。

3. 最后：遍历结束后，将构造的最后一个数字加入到`result`中并返回。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def calculate(s):
    # 初始化栈和临时变量
    stack = []
    result = 0
    number = 0
    sign = 1
    
    # 遍历字符串中的每个字符
    for char in s:
        if char.isdigit():
            number = number * 10 + int(char)  # 连续数字则构建数字
        elif char in ['+', '-']:
            result += sign * number  # 先把前面的数字计算加到结果中
            sign = 1 if char == '+' else -1  # 更新当前符号
            number = 0  # 重置当前数字
        elif char == '(':  # 遇到左括号
            stack.append(result)
            stack.append(sign)
            result = 0
            sign = 1
        elif char == ')':  # 遇到右括号
            result += sign * number
            result *= stack.pop()  # stack.pop()为括号前一个小表达式的符号
            result += stack.pop()  # stack.pop()为括号前的子表达式结果
            number = 0
    
    # 最后的一个数字
    result += sign * number
    return result
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int calculate(string s) {
        stack<int> st;
        int result = 0;
        int number = 0;
        int sign = 1;
        
        for (char c : s) {
            if (isdigit(c)) {
                number = number * 10 + (c - '0');
            } else if (c == '+') {
                result += sign * number;
                sign = 1;
                number = 0;
            } else if (c == '-') {
                result += sign * number;
                sign = -1;
                number = 0;
            } else if (c == '(') {
                st.push(result);
                st.push(sign);
                result = 0;
                sign = 1;
            } else if (c == ')') {
                result += sign * number;
                result *= st.top(); st.pop();
                result += st.top(); st.pop();
                number = 0;
            }
        }
        
        result += sign * number;
        return result;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function calculate(s) {
    let stack = [];
    let result = 0;
    let number = 0;
    let sign = 1;
    
    for (let char of s) {
        if (!isNaN(char) && char !== ' ') {
            number = number * 10 + parseInt(char);
        } else if (char === '+' || char === '-') {
            result += sign * number;
            sign = (char === '+') ? 1 : -1;
            number = 0;
        } else if (char === '(') {
            stack.push(result);
            stack.push(sign);
            result = 0;
            sign = 1;
        } else if (char === ')') {
            result += sign * number;
            result *= stack.pop();
            result += stack.pop();
            number = 0;
        }
    }
    
    result += sign * number;
    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int calculate(String s) {
        Stack<Integer> stack = new Stack<>();
        int result = 0;
        int number = 0;
        int sign = 1;
        
        for (char c : s.toCharArray()) {
            if (Character.isDigit(c)) {
                number = number * 10 + (c - '0');
            } else if (c == '+') {
                result += sign * number;
                sign = 1;
                number = 0;
            } else if (c == '-') {
                result += sign * number;
                sign = -1;
                number = 0;
            } else if (c == '(') {
                stack.push(result);
                stack.push(sign);
                result = 0;
                sign = 1;
            } else if (c == ')') {
                result += sign * number;
                result *= stack.pop();
                result += stack.pop();
                number = 0;
            }
        }
        
        result += sign * number;
        return result;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：

由于每个字符只被遍历一次，每次操作都仅涉及栈的出入栈操作，因此算法的时间复杂度为 $O(n)$，其中 $n$ 是字符串 $s$ 的长度。


空间复杂度：

主要是用来保存每次遇到左括号的执行上下文（即$stack$的大小），最坏情况下是所有字符都为括号（未关闭）。因此，空间复杂度为 $O(n)$。
