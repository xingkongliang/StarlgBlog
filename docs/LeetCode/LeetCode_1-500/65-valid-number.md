---
sidebar_position: 65
tags:
  - string
  - Hard
---

# 65.有效数字

标签: `string`

难度: Hard

通过率: 20.75%

原题链接: https://leetcode.com/problems/valid-number/description/

## 题目描述
给定一个字符串 $s$ ，返回 $s$ 是否是一个有效数字。有效数字的定义如下：

- 表示一个整数的数字可以后接一个可选指数。
- 一个十进制数字可以后接一个可选指数。

整数定义为一个可选的符号 '-' 或 '+'，紧跟随的必须是一串数字。

十进制数字定义为一个可选的符号 '-' 或 '+'，并遵循以下定义之一：

- 数字后面跟随一个点 '.'。
- 数字后面跟随一个点 '.'，后面再跟随数字。
- 一个点 '.' 后面直接跟随数字。

一个指数定义为指数符号 'e' 或 'E' 后跟一个整数。

数字定义为一个或多个数字。

## 解题思路
解决这个问题的主要思想是使用有限状态机（Finite State Machine, FSM）来验证字符串是否是一个有效数字。你需要逐个字符检查，并根据出现的字符转换状态。通过实现一个状态转换的完整流程，决定该字符串是否是一个有效数字。

以下是状态转换机的解释：

1. 初始化状态，正在处理开头的符号。
2. 正在读取整数或小数之前的部分数字。
3. 确定小数点的位置并处理小数部分的数字输入。
4. 处理科学计数法中的指数符号。
5. 读取指数部分的数字。
6. 提取任何后的无效字符。

根据对字符串进行遍历的过程来调整状态，最后检查状态是否能够保证字符串是一个有效数字。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def isNumber(s: str) -> bool:
    # 定义状态机的状态集合
    state = [
        {},  # dummy state 0
        {'blank': 1, 'sign': 2, 'digit': 3, '.': 4},  # state 1: start, leading whitespace allowed
        {'digit': 3, '.': 4},  # state 2: sign
        {'digit': 3, '.': 5, 'e': 6, 'blank': 9},  # state 3: digit (integer part)
        {'digit': 5},  # state 4: dot has been met, need at least one digit after it
        {'digit': 5, 'e': 6, 'blank': 9},  # state 5: digit (fractional part)
        {'sign': 7, 'digit': 8},  # state 6: e or E met
        {'digit': 8},  # state 7: sign after e
        {'digit': 8, 'blank': 9},  # state 8: digit after e
        {'blank': 9}  # state 9: trailing whitespaces allowed
    ]

    current_state = 1

    for char in s:
        if char.isdigit():
            transition = 'digit'
        elif char in '+-':
            transition = 'sign'
        elif char in 'eE':
            transition = 'e'
        elif char == '.':
            transition = '.'
        elif char == ' ':
            transition = 'blank'
        else:
            transition = '?'  # illegal character

        # Check the transition
        if transition not in state[current_state]:
            return False

        # Change to next state
        current_state = state[current_state][transition]

    # Accepting states: 3, 5, 8, 9
    return current_state in [3, 5, 8, 9]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    bool isNumber(string s) {
        enum State {
            START,
            SIGN,
            INTEGER,
            DOT,
            DECIMAL,
            EXPONENT_SIGN,
            EXPONENT,
            END
        };

        State state = START;
        bool seenDigit = false;
        bool seenExponent = false;
        bool seenDot = false;

        for (const char &ch : s) {
            if (isdigit(ch)) {
                seenDigit = true;
                if (state == START || state == SIGN || state == INTEGER) {
                    state = INTEGER;
                } else if (state == DOT || state == DECIMAL) {
                    state = DECIMAL;
                } else if (state == EXPONENT_SIGN || state == EXPONENT)
                    state = EXPONENT;
            } else if (ch == '+' || ch == '-') {
                if (state == START) {
                    state = SIGN;
                } else if (state == EXPONENT && !seenDigit)
                    state = EXPONENT_SIGN;
                else
                    return false;
            } else if (ch == '.') {
                if ((state == START || state == SIGN || state == INTEGER) && !seenDot) {
                    state = DOT;
                    seenDot = true;
                } else return false;
            } else if (ch == 'e' || ch == 'E') {
                if (seenDigit && !seenExponent) {
                    state = EXPONENT;
                    seenExponent = true;
                    seenDigit = false; // need a digit after exponent
                } else
                    return false;
            } else if (ch == ' ') {
                if (state == INTEGER || state == DECIMAL || state == EXPONENT)
                    state = END;
                else if (state != END)
                    return false;
            } else {
                return false;
            }
        }

        return state == INTEGER || state == DECIMAL || state == END;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const isNumber = function(s) {
    const states = [
        {'blank': 0, 'sign': 1, 'digit': 2, '.': 3},
        {'digit': 2, '.': 3},
        {'digit': 2, '.': 4, 'e': 5, 'blank': 8},
        {'digit': 4},
        {'digit': 4, 'e': 5, 'blank': 8},
        {'sign': 6, 'digit': 7},
        {'digit': 7},
        {'digit': 7, 'blank': 8},
        {'blank': 8}
    ];

    let currentState = 0;

    for (const char of s) {
        let transition = '';
        if (char >= '0' && char <= '9') transition = 'digit';
        else if (char === '+' || char === '-') transition = 'sign';
        else if (char === 'e' || char === 'E') transition = 'e';
        else if (char === '.') transition = '.';
        else if (char === ' ') transition = 'blank';
        else transition = '?';

        if (!(transition in states[currentState])) return false;
        currentState = states[currentState][transition];
    }

    return [2, 4, 7, 8].includes(currentState);
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public boolean isNumber(String s) {
        int[][] state = {
            { 0, 1, 2, 3, -1, -1}, // state 0
            { -1, -1, 2, 3, -1, -1}, // state 1
            { 8, -1, 2, 4, 5, -1}, // state 2
            { -1, -1, 4, -1, -1, -1}, // state 3
            { 8, -1, 4, -1, 5, -1}, // state 4
            { -1, 6, 7, -1, -1, -1}, // state 5
            { -1, -1, 7, -1, -1, -1}, // state 6
            { 8, -1, 7, -1, -1, -1}, // state 7
            { 8, -1, -1, -1, -1, -1} // state 8
        };

        int currentState = 0;

        for (char c : s.toCharArray()) {
            int transition = -1;
            if (Character.isDigit(c)) transition = 2;
            else if (c == '+' || c == '-') transition = 1;
            else if (c == '.') transition = 3;
            else if (c == 'e' || c == 'E') transition = 4;
            else if (c == ' ') transition = 0;
            if (transition == -1 || state[currentState][transition] == -1) return false;
            currentState = state[currentState][transition];
        }

        return currentState == 2 || currentState == 4 || currentState == 7 || currentState == 8;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度是 $O(n)$，其中 $n$ 是字符串 $s$ 的长度。
空间复杂度是 $O(1)$，因为只需要有限个状态变量来跟踪状态机的状态变化。
