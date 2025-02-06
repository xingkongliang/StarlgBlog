---
sidebar_position: 20
tags:
  - stack
  - string
  - Easy
---

# 20.有效的括号

标签: `stack`, `string`

难度: Easy

通过率: 41.48%

原题链接: https://leetcode.com/problems/valid-parentheses/description/

## 题目描述
给定一个只包含字符 '('，')'，'{'，'}'，'[' 和 ']' 的字符串 s，判断输入字符串是否有效。一个有效的字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
3. 每个右括号都有一个对应的相同类型的左括号。

## 解题思路
这个问题可以用栈来解决。栈是一种先进后出的数据结构，非常适合处理类似括号匹配的问题。

1. 初始化一个空栈。
2. 遍历字符串的每个字符：
   - 如果字符是左括号 `(`，`{` 或 `[`，将其压入栈中。
   - 如果字符是右括号，则检查栈顶元素：
     - 若栈为空，则匹配失败（没有对应的左括号）。
     - 否则，弹出栈顶元素并检查是否匹配对应的左括号。
     - 如果不匹配，则字符串无效。
3. 最后检查栈是否为空：
   - 如果栈为空，说明所有的括号都匹配成功，字符串有效。
   - 如果栈不为空，说明有未匹配的左括号，字符串无效。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def isValid(s):
    # 定义括号的对应关系
    bracket_map = {')': '(', '}': '{', ']': '['}
    stack = []

    for char in s:
        # 如果当前字符是右括号
        if char in bracket_map:
            # 栈顶（如果存在）对应的左括号
            top_element = stack.pop() if stack else '#'
            # 检查是否匹配
            if bracket_map[char] != top_element:
                return False
        else:
            # 当前字符是左括号，推入栈中
            stack.append(char)

    # 检查栈是否为空
    return not stack
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
bool isValid(string s) {
    unordered_map<char, char> bracket_map = {{')', '('}, {'}', '{'}, {']', '['}};
    stack<char> stack;

    for (char& char : s) {
        if (bracket_map.find(char) != bracket_map.end()) {
            char top_element = stack.empty() ? '#' : stack.top();
            stack.pop();
            if (top_element != bracket_map[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    return stack.empty();
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function isValid(s) {
    const bracketMap = {')': '(', '}': '{', ']': '['};
    const stack = [];

    for (let char of s) {
        if (bracketMap[char]) {
            const topElement = stack.length === 0 ? '#' : stack.pop();
            if (topElement !== bracketMap[char]) {
                return false;
            }
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public boolean isValid(String s) {
    HashMap<Character, Character> bracketMap = new HashMap<>(){{
        put(')', '(');
        put('}', '{');
        put(']', '[');
    }};
    Stack<Character> stack = new Stack<>();

    for (char ch : s.toCharArray()) {
        if (bracketMap.containsKey(ch)) {
            char topElement = stack.empty() ? '#' : stack.pop();
            if (topElement != bracketMap.get(ch)) {
                return false;
            }
        } else {
            stack.push(ch);
        }
    }
    return stack.isEmpty();
}
```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度**: $O(n)$，其中 $n$ 是字符串的长度。我们一次遍历字符串，并对栈进行常数时间的操作。`

**空间复杂度**: $O(n)$，在最坏的情况下，例如输入全是左括号的情况下，栈的空间与输入字符串的长度成正比。
