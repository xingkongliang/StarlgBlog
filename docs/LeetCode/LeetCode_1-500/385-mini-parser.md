---
sidebar_position: 385
tags:
  - stack
  - string
  - Medium
---

# 385.Mini 解析器

标签: `stack`, `string`

难度: Medium

通过率: 39.26%

原题链接: https://leetcode.com/problems/mini-parser/description/

## 题目描述
给定一个字符串 `s`，表示嵌套列表的序列化，实现一个解析器来反序列化它，并返回反序列化的 `NestedInteger`。每个元素要么是整数，要么是一个其元素也可能是整数或其他列表的列表。

## 解题思路
题目要求解析一个嵌套列表的字符串表示，最后得到一个 `NestedInteger` 对象。字符串形式类似多层嵌套的 JSON 格式，可以通过遍历字符串逐字符解析。使用栈结构来辅助解析，通过一个栈来存储当前正在解析的 `NestedInteger` 对象。具体的解析流程如下：

1. 如果字符是 `[`，那么新建一个新的 `NestedInteger` 对象，并将其推入栈中。
2. 如果字符是 `]`，那么弹出栈顶的 `NestedInteger` 对象，并将其加入到新的栈顶对象中（如果栈非空的话）。
3. 如果字符是数字或者是负号，则开始解析一个完整的数字，解析完后赋值给当前栈顶的 `NestedInteger` 对象。
4. 如果字符是 `,`，则跳过，因为逗号用于分隔不同元素，对嵌套结构无实际影响。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class NestedInteger:
    def __init__(self, value=None):
        self.value = value if value is not None else []
    
    def isInteger(self):
        return isinstance(self.value, int)

    def add(self, elem):
        if not self.isInteger():
            self.value.append(elem)

    def setInteger(self, value):
        self.value = value

    def getInteger(self):
        if self.isInteger():
            return self.value
        return None

    def getList(self):
        if not self.isInteger():
            return self.value
        return None

class Solution:
    def deserialize(self, s: str) -> NestedInteger:
        if not s:
            return NestedInteger()

        if s[0] != '[':
            # if the string does not start with '[', it must be a single integer
            return NestedInteger(int(s))

        stack = []
        current = None
        start = 0  # start index for numbers within brackets

        for i, char in enumerate(s):
            if char == '[':
                if current is not None:
                    stack.append(current)
                current = NestedInteger()
                start = i + 1
            elif char == ']':
                if s[start:i].strip():  # there's a number between this and last '[' or ','
                    current.add(NestedInteger(int(s[start:i])))
                if stack:
                    last = stack.pop()
                    last.add(current)
                    current = last
                start = i + 1
            elif char == ',':
                if s[start:i].strip():
                    current.add(NestedInteger(int(s[start:i])))
                start = i + 1

        return current
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class NestedInteger {
public:
    NestedInteger() {}
    NestedInteger(int value): value(value), isInt(true) {}

    bool isInteger() const { return isInt; }

    int getInteger() const { return value; }

    void add(const NestedInteger &ni) { 
        if (!isInt) list.push_back(ni); 
    }

    void setInteger(int val) { value = val; isInt = true; }

    const vector<NestedInteger> &getList() const { return list; }

private:
    int value = 0;
    bool isInt = false;
    vector<NestedInteger> list;
};

class Solution {
public:
    NestedInteger deserialize(string s) {
        if (s.empty()) return NestedInteger();

        if (s[0] != '[') // single integer
            return NestedInteger(stoi(s));

        stack<NestedInteger> stk;
        NestedInteger *current = nullptr;
        int start = 0;

        for (int i = 0; i < s.size(); ++i) {
            char ch = s[i];
            if (ch == '[') {
                if (current) stk.push(move(*current));
                current = new NestedInteger();
                start = i + 1;
            } else if (ch == ']' || ch == ',') {
                if (ch == ']' && current && start < i) {
                    current->add(NestedInteger(stoi(s.substr(start, i - start))));
                }
                if (ch == ']' && !stk.empty()) {
                    NestedInteger temp = move(*current);
                    current = new NestedInteger(move(stk.top()));
                    current->add(temp);
                    stk.pop();
                }
                start = i + 1;
            }
        }

        return *current;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class NestedInteger {
    constructor(value) {
        if (value === undefined) {
            this.value = [];
        } else {
            this.value = value;
        }
    }

    isInteger() {
        return typeof this.value === 'number';
    }

    getInteger() {
        if (this.isInteger()) {
            return this.value;
        }
        return null;
    }

    setInteger(value) {
        this.value = value;
    }

    add(elem) {
        if (!this.isInteger()) {
            this.value.push(elem);
        }
    }

    getList() {
        if (!this.isInteger()) {
            return this.value;
        }
        return null;
    }
}

var deserialize = function(s) {
    if (s.length === 0) return new NestedInteger();

    if (s[0] !== '[') {
        return new NestedInteger(parseInt(s));
    }

    let stack = [];
    let current = null;
    let start = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '[') {
            if (current !== null) stack.push(current);
            current = new NestedInteger();
            start = i + 1;
        } else if (s[i] === ',' || s[i] === ']') {
            if (start < i) {
                const num = parseInt(s.substring(start, i));
                current.add(new NestedInteger(num));
            }
            if (s[i] === ']' && stack.length !== 0) {
                const top = stack.pop();
                top.add(current);
                current = top;
            }
            start = i + 1;
        }
    }

    return current;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.Stack;

class NestedInteger {
    private Integer value;
    private List<NestedInteger> list;

    public NestedInteger() {
        this.list = new ArrayList<NestedInteger>();
    }

    public NestedInteger(int value) {
        this.value = value;
    }

    public boolean isInteger() {
        return value != null;
    }

    public Integer getInteger() {
        return this.value;
    }

    public void setInteger(int value) {
        this.value = value;
    }

    public void add(NestedInteger ni) {
        if (this.list == null) {
            this.list = new ArrayList<NestedInteger>();
        }
        this.list.add(ni);
    }

    public List<NestedInteger> getList() {
        return this.list;
    }
}

public class Solution {
    public NestedInteger deserialize(String s) {
        if (s.isEmpty()) return new NestedInteger();

        if (s.charAt(0) != '[') { // single integer
            return new NestedInteger(Integer.parseInt(s));
        }

        Stack<NestedInteger> stack = new Stack<>();
        NestedInteger current = null;
        int start = 0;

        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            if (ch == '[') {
                if (current != null) stack.push(current);
                current = new NestedInteger();
                start = i + 1;
            } else if (ch == ']' || ch == ',') {
                if (start < i) {
                    int num = Integer.parseInt(s.substring(start, i));
                    current.add(new NestedInteger(num));
                }
                if (ch == ']' && !stack.isEmpty()) {
                    NestedInteger top = stack.pop();
                    top.add(current);
                    current = top;
                }
                start = i + 1;
            }
        }
        return current;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是字符串的长度，因为每个字符都被处理一次。  
  
空间复杂度：$O(n)$，用于存储栈中可能的嵌套结构，如果字符串含有深度嵌套，这可能达到完整的字符串长度。
