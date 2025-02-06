---
sidebar_position: 394
tags:
  - stack
  - string
  - Medium
---

# 394. 解码字符串

标签: `stack`, `string`

难度: Medium

通过率: 60.34%

原题链接: https://leetcode.com/problems/decode-string/description/

## 题目描述
给定一个经过编码的字符串，返回它解码后的字符串。编码规则为：$k[encoded\_string]$，表示方括号中的 $encoded\_string$ 正好重复 $k$ 次。假设输入字符串总是有效的，例如，没有多余的空格，方括号是配对出现的等。此外，可以假设原始数据不包含数字，所有数字仅表示重复的次数 $k$。

## 解题思路
这个问题可以通过使用栈来解决。我们需要解析嵌套的结构，所以栈会很有帮助。具体步骤如下：

1. 使用两个栈，一个用于存储待重复的字符串片段，另一个存储与这些片段对应的重复次数。
2. 遍历字符串 $s$，处理每个字符：
   - 如果是数字，计算完整的数值 $k$（可能有多位）来表示重复次数。
   - 如果是'['，将当前构建的字符串片段和 $k$ 压入栈，并开始一个新的字符串片段。
   - 如果是']'，弹出栈顶元素；重复栈顶的字符串片段，然后将其与当前字符串片段连接。
   - 如果是字母，将其附加到当前构建的字符串上。
3. 最终，解码后的字符串会构建在一个累积容器中，合并所有部分得到最终的结果。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def decodeString(s):
    # 初始化栈结构
    stack = []
    current_num = 0
    current_string = ''
    
    # 遍历每个字符
    for char in s:
        if char.isdigit():
            # 如果是数字，计算完整的数值
            current_num = current_num * 10 + int(char)
        elif char == '[':
            # 如果是 '['，将其前面的数字和当前字符串压入栈
            stack.append((current_string, current_num))
            current_string = ''
            current_num = 0
        elif char == ']':
            # 如果是 ']', 从栈中弹出数据并构造新的字符串
            last_string, repeat_num = stack.pop()
            current_string = last_string + current_string * repeat_num
        else:
            # 如果是字符，加入当前字符串
            current_string += char
    
    return current_string
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
cpp代码如下：
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript

#include <string>
#include <stack>
using namespace std;

string decodeString(string s) {
    stack<string> stringStack;
    stack<int> countStack;
    string currentString = "";
    int currentNum = 0;
    
    for (char ch : s) {
        if (isdigit(ch)) {
            // 如果是数字，更新当前计算的数值
            currentNum = currentNum * 10 + (ch - '0');
        } else if (ch == '[') {
            // 如果是 '['，把当前字符串和数字压入栈
            stringStack.push(currentString);
            countStack.push(currentNum);
            currentString = "";
            currentNum = 0;
        } else if (ch == ']') {
            // 如果是 ']', 构造对应的字符串
            string temp = currentString;
            int repeatTimes = countStack.top();
            countStack.pop();
            currentString = stringStack.top();
            stringStack.pop();
            while (repeatTimes-- > 0) {
                currentString += temp;
            }
        } else {
            // 如果是字符，加入当前构建的字符串
            currentString += ch;
        }
    }
    return currentString;
}

```

</TabItem>
<TabItem value="java" label="Java">

```java
function decodeString(s) {
    const stringStack = [];
    const countStack = [];
    let currentString = '';
    let currentNum = 0;

    for (let char of s) {
        if (!isNaN(char)) {
            // 如果是数字，更新当前计算的数值
            currentNum = currentNum * 10 + Number(char);
        } else if (char === '[') {
            // 如果是 '['，将当前字符串和数字压入栈
            stringStack.push(currentString);
            countStack.push(currentNum);
            currentString = '';
            currentNum = 0;
        } else if (char === ']') {
            // 如果是 ']', 构造完整的字符串
            let tempString = currentString;
            currentString = stringStack.pop();
            let repeatTimes = countStack.pop();
            currentString += tempString.repeat(repeatTimes);
        } else {
            // 如果是字符，加入当前构建的字符串
            currentString += char;
        }
    }
    return currentString;
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 是输入字符串的长度。我们对字符串进行了一次线性遍历，并在过程中构建最终字符串。

  

空间复杂度为 $O(m)$，其中 $m$ 是嵌套结构中需要存储到栈里的字符串和数字次数，它与字符串的嵌套深度有关。
