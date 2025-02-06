---
sidebar_position: 227
tags:
  - stack
  - string
  - Medium
---

# 227.基本计算器 II

标签: `stack`, `string`

难度: Medium

通过率: 44.8%

原题链接: https://leetcode.com/problems/basic-calculator-ii/description/

## 题目描述
给定一个字符串 $s$，表示一个表达式，计算并返回其值。整数除法应向零截断。你可以假设给定的表达式始终有效。所有中间结果都在 $[-2^{31}, 2^{31} - 1]$ 范围内。注意：你不能使用任何内置函数来评估字符串作为数学表达式，比如 `eval()`。

## 解题思路
要计算表达式的值，可以使用栈来实现对运算符优先级的处理。具体思路如下：

1. 初始化一个栈 `stack` 和一个变量 `current_number` 保存当前的数字，`operator`初始化为 `'+'`。

2. 遍历字符串 `s`，对每一个字符 `c`：
   - 如果 `c` 是一个数字，则将其累积到 `current_number`。
   - 如果 `c` 是一个运算符（`+`, `-`, `*`, `/`）或者是字符串最后一个字符：
     - 根据前一个运算符，将 `current_number` 进行相应的操作：
       - 如果前一个运算符是 `'+'`，则将 `current_number` 压栈。
       - 如果前一个运算符是 `'-'`，则将 `-current_number` 压栈。
       - 如果前一个运算符是 `'*'`，则将栈顶元素弹出，与 `current_number` 相乘后压回栈。
       - 如果前一个运算符是 `'/'`，则将栈顶元素弹出，与 `current_number` 整数除法后压回栈。
     - 更新运算符为当前运算符，将 `current_number` 重置为 0。

3. 遍历结束后，栈中的所有数的和即为表达式的结果。

这一算法使用了栈来处理乘除法的优先级，并保留加减法的原始顺序，使得整个运算符优先级得到正确处理。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def calculate(s: str) -> int:
    # 初始化栈，当前数字和运算符
    stack = []
    current_number = 0
    operator = '+'
    
    for i, c in enumerate(s):
        if c.isdigit():
            # 构建当前数字
            current_number = current_number * 10 + int(c)
        
        if c in '+-*/' or i == len(s) - 1:
            if operator == '+':
                stack.append(current_number)
            elif operator == '-':
                stack.append(-current_number)
            elif operator == '*':
                stack.append(stack.pop() * current_number)
            elif operator == '/':
                # 弹出栈顶元素，进行除法操作
                stack.append(int(stack.pop() / current_number))
            # 更新当前运算符和重置当前数字
            operator = c
            current_number = 0
    
    # 返回栈中所有数的和
    return sum(stack)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int calculate(string s) {
        stack<int> stack;
        int currentNumber = 0;
        char op = '+';
        
        for (int i = 0; i < s.size(); ++i) {
            if (isdigit(s[i])) {
                currentNumber = currentNumber * 10 + (s[i] - '0');
            }
            if (!isdigit(s[i]) && s[i] != ' ' || i == s.size() - 1) {
                if (op == '+') {
                    stack.push(currentNumber);
                } else if (op == '-') {
                    stack.push(-currentNumber);
                } else if (op == '*') {
                    int top = stack.top();
                    stack.pop();
                    stack.push(top * currentNumber);
                } else if (op == '/') {
                    int top = stack.top();
                    stack.pop();
                    stack.push(top / currentNumber);
                }
                op = s[i];
                currentNumber = 0;
            }
        }
        int result = 0;
        while (!stack.empty()) {
            result += stack.top();
            stack.pop();
        }
        return result;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function calculate(s) {
    const stack = [];
    let currentNumber = 0;
    let operator = '+';

    for (let i = 0; i < s.length; i++) {
        const c = s[i];
        if (!isNaN(c) && c !== ' ') {
            currentNumber = currentNumber * 10 + (c - '0');
        }
        if ((isNaN(c) && c !== ' ') || i === s.length - 1) {
            switch (operator) {
                case '+':
                    stack.push(currentNumber);
                    break;
                case '-':
                    stack.push(-currentNumber);
                    break;
                case '*':
                    stack.push(stack.pop() * currentNumber);
                    break;
                case '/':
                    stack.push(Math.trunc(stack.pop() / currentNumber));
                    break;
            }
            operator = c;
            currentNumber = 0;
        }
    }

    return stack.reduce((acc, num) => acc + num, 0);
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int calculate(String s) {
        Stack<Integer> stack = new Stack<>();
        int currentNumber = 0;
        char operator = '+';

        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (Character.isDigit(c)) {
                currentNumber = currentNumber * 10 + (c - '0');
            }
            if (!Character.isDigit(c) && c != ' ' || i == s.length() - 1) {
                if (operator == '+') {
                    stack.push(currentNumber);
                } else if (operator == '-') {
                    stack.push(-currentNumber);
                } else if (operator == '*') {
                    stack.push(stack.pop() * currentNumber);
                } else if (operator == '/') {
                    stack.push(stack.pop() / currentNumber);
                }
                operator = c;
                currentNumber = 0;
            }
        }

        int result = 0;
        while (!stack.isEmpty()) {
            result += stack.pop();
        }
        return result;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是字符串的长度，因为需要遍历一遍字符串。

空间复杂度：$O(n)$，最坏情况下需要存储操作数和中间结果。
