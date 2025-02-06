---
sidebar_position: 150
tags:
  - stack
  - Medium
---

# 150.逆波兰表达式求值

标签: `stack`

难度: Medium

通过率: 53.41%

原题链接: https://leetcode.com/problems/evaluate-reverse-polish-notation/description/

## 题目描述
给你一个字符串数组 `tokens` ，表示一个逆波兰表达式的算术表达式。请计算该表达式的值，返回一个表示表达式的整数值。注意：

- 有效的运算符是 '+', '-', '*' 和 '/'。
- 每个操作数可以是整数或另一个表达式。
- 两个整数之间的除法总是向零截断。
- 不会有除以零的操作。
- 输入表示一个有效的逆波兰表达式。
- 答案及所有的中间计算都可以用32位整数表示。

## 解题思路
逆波兰表达式（后缀表达式）计算通常使用栈的结构来实现。基本思想是遇到数字时将其压入栈中，遇到运算符时弹出栈顶的两个元素进行运算，并将结果压回栈中。最终栈中只剩一个元素即为结果。具体步骤如下：

1. 初始化一个空栈 `stack`。
2. 遍历 `tokens`：对于 `tokens` 中的每一个元素 `token`，执行以下操作：
   - 如果 `token` 是一个数字，将其转换成整数并压入 `stack`。
   - 如果 `token` 是一个运算符，则弹出 `stack` 顶部的两个元素，先弹出的为 `b`，后弹出的为 `a`；然后根据 `token` 对 `a` 和 `b` 执行相应的运算，并将结果压入 `stack`。
3. 遍历结束后，`stack` 中的唯一元素即为最后的计算结果。

需要注意的是在做除法时，因为题目要求结果向0截断，所以在除法操作时要使用整除符号 `//`（如 Python）来确保这一点。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def evalRPN(tokens):
    stack = []
    for token in tokens:
        if token in '+-*/':
            b = stack.pop()  # 弹出第二个操作数
            a = stack.pop()  # 弹出第一个操作数
            # 注意：Python中的除法是地板除而不是向零截断，因此需要特殊处理
            if token == '+':
                result = a + b
            elif token == '-':
                result = a - b
            elif token == '*':
                result = a * b
            else:  # token == '/'
                # 使用int(a / b)完成向零截断的功能
                result = int(a / b)
            stack.append(result)  # 将结果推回栈中
        else:
            stack.append(int(token))  # 将数字作为整型推入栈中
    return stack.pop()  # 最后栈中只剩下结果
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<int> stack;
        for (const auto& token : tokens) {
            if (token == "+" || token == "-" || token == "*" || token == "/") {
                int b = stack.top();
                stack.pop();
                int a = stack.top();
                stack.pop();
                int res = 0;
                if (token == "+") res = a + b;
                else if (token == "-") res = a - b;
                else if (token == "*") res = a * b;
                else res = a / b; // C++整数除法自动向零截断
                stack.push(res);
            } else {
                stack.push(stoi(token));
            }
        }
        return stack.top();
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function evalRPN(tokens) {
    const stack = [];
    for (const token of tokens) {
        if (['+', '-', '*', '/'].includes(token)) {
            const b = stack.pop();  // 弹出第二个操作数
            const a = stack.pop();  // 弹出第一个操作数
            let result;
            switch (token) {
                case '+':
                    result = a + b;
                    break;
                case '-':
                    result = a - b;
                    break;
                case '*':
                    result = a * b;
                    break;
                case '/':
                    result = (a / b) | 0; // 向零取整
                    break;
            }
            stack.push(result);
        } else {
            stack.push(Number(token));
        }
    }
    return stack.pop();
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int evalRPN(String[] tokens) {
    Stack<Integer> stack = new Stack<>();
    for (String token : tokens) {
        if ("+-*/".contains(token)) {
            int b = stack.pop();
            int a = stack.pop();
            switch (token) {
                case "+":
                    stack.push(a + b);
                    break;
                case "-":
                    stack.push(a - b);
                    break;
                case "*":
                    stack.push(a * b);
                    break;
                case "/":
                    stack.push(a / b); // Java整数除法自动向零截断
                    break;
            }
        } else {
            stack.push(Integer.valueOf(token));
        }
    }
    return stack.pop();
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度: $O(n)$，其中 $n$ 为tokens的长度。每个操作数和运算符都只被访问一次。    
    
空间复杂度: $O(n)$，最大情况下栈的深度与输入的长度成正比。
