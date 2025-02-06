---
sidebar_position: 155
tags:
  - stack
  - design
  - Medium
---

# 155.最小栈

标签: `stack`, `design`

难度: Medium

通过率: 55.48%

原题链接: https://leetcode.com/problems/min-stack/description/

## 题目描述
设计一个支持在常数时间内执行push、pop、top和检索最小元素操作的栈。

实现MinStack类：

- `MinStack()` 初始化栈对象。
- `void push(int val)` 将元素val推入栈中。
- `void pop()` 删除栈顶的元素。
- `int top()` 获取栈顶元素。
- `int getMin()` 检索栈中的最小元素。

你必须实现一个满足每个方法都是固定的 $O(1)$ 时间复杂度的解决方案。

## 解题思路
为了实现最小栈，我们可以使用两个栈来解决这个问题：

1. **主栈（主数据栈）**：用于存储正常的入栈数据。
2. **辅助栈（最小值栈）**：用于存储每个对应状态当前的最小值。这样在元素被弹出后，可以方便地检索到在这个元素弹出后栈中的新的最小值。

**具体实现步骤如下**：

- **push(val)**: 将val推入主栈，并根据情况推入辅助栈。在辅助栈中，总是存储的是当前主栈中所有元素的最小值。如果辅助栈为空或val小于等于辅助栈的栈顶元素，我们也将val推入辅助栈。
- **pop()**: 从主栈弹出元素，同时如果弹出的元素等于辅助栈的栈顶（意味着该元素是当前最小值），也弹出辅助栈的栈顶元素。
- **top()**: 返回主栈的栈顶元素。
- **getMin()**: 返回辅助栈的栈顶元素，因为它始终记录着主栈当前所有元素的最小值。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class MinStack:
    def __init__(self):
        # 初始化两个栈：主栈和用来存储最小值的栈
        self.stack = []
        self.min_stack = []

    def push(self, val: int) -> None:
        # 每次push时将值推入主栈
        self.stack.append(val)
        # 若辅助栈为空或当前值小于等于辅助栈的栈顶，则推入辅助栈
        if not self.min_stack or val <= self.min_stack[-1]:
            self.min_stack.append(val)

    def pop(self) -> None:
        # 从主栈弹出元素
        if self.stack:
            top = self.stack.pop()
            # 如果弹出的元素和辅助栈的栈顶相同，我们也要从辅助栈弹出
            if top == self.min_stack[-1]:
                self.min_stack.pop()

    def top(self) -> int:
        # 返回主栈的栈顶元素
        return self.stack[-1] if self.stack else None

    def getMin(self) -> int:
        # 返回辅助栈的栈顶元素（当前主栈的最小值）
        return self.min_stack[-1] if self.min_stack else None
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class MinStack {
private:
    stack<int> mainStack;
    stack<int> minStack;

public:
    MinStack() {}

    void push(int val) {
        mainStack.push(val);
        // If the minStack is empty or the current value is less than or equal to the top of minStack
        if (minStack.empty() || val <= minStack.top()) {
            minStack.push(val);
        }
    }

    void pop() {
        if (!mainStack.empty()) {
            // If the top of mainStack is equal to the top of minStack
            if (mainStack.top() == minStack.top()) {
                minStack.pop();
            }
            mainStack.pop();
        }
    }

    int top() {
        return mainStack.top();
    }

    int getMin() {
        return minStack.top();
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
var MinStack = function() {
    // Use two stacks: one for original values, another for the minimum values
    this.stack = [];
    this.minStack = [];
};

/** 
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
    this.stack.push(val);
    // Push to the minStack if it's empty or the current value is less than or equal to the top of the minStack
    if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
        this.minStack.push(val);
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    if (this.stack.length > 0) {
        // Check if the popped value is equal to the top of the minStack
        if (this.stack[this.stack.length - 1] === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }
        this.stack.pop();
    }
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.minStack[this.minStack.length - 1];
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class MinStack {
    private Stack<Integer> stack;
    private Stack<Integer> minStack;

    /** initialize your data structure here. */
    public MinStack() {
        stack = new Stack<>();
        minStack = new Stack<>();
    }
    
    public void push(int val) {
        stack.push(val);
        // Push to the minStack if it's empty or the current value is less than or equal to the top of the minStack
        if (minStack.isEmpty() || val <= minStack.peek()) {
            minStack.push(val);
        }
    }
    
    public void pop() {
        if (!stack.isEmpty()) {
            // If the top of stack is equal to the top of minStack, pop from minStack
            if (stack.peek().equals(minStack.peek())) {
                minStack.pop();
            }
            stack.pop();
        }
    }
    
    public int top() {
        return stack.peek();
    }
    
    public int getMin() {
        return minStack.peek();
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- **时间复杂度**: 每个操作 `push`, `pop`, `top`, `getMin` 都是 $O(1)$。


- **空间复杂度**: $O(n)$，其中 $n$ 是 `push` 操作的调用次数，因为最坏情况下每个 `push` 操作都可能导致辅助栈 `min_stack` 的增加。
