---
sidebar_position: 232
tags:
  - stack
  - design
  - Easy
---

# 232.使用栈实现队列

标签: `stack`, `design`

难度: Easy

通过率: 67.39%

原题链接: https://leetcode.com/problems/implement-queue-using-stacks/description/

## 题目描述
使用两个栈实现一个先进先出(FIFO)队列。应支持所有普通队列的功能：push、peek、pop、empty。

## 解题思路
为了使用两个栈实现一个FIFO队列，我们可以维护两个栈：`stack1`和`stack2`。`stack1`用于支持入队操作，`stack2`用于支持出队操作。具体步骤如下：

1. **push操作：**
   - 直接将元素压入`stack1`。

2. **pop操作：**
   - 如果`stack2`为空（即没有元素可以出队），则将`stack1`中的所有元素依次弹出并压入`stack2`，然后从`stack2`弹出栈顶元素。
   - 如果`stack2`不为空，直接弹出其栈顶元素。

3. **peek操作：**
   - 操作与`pop`类似，只是这里不弹出元素：
   - 如果`stack2`为空，将`stack1`的所有元素移到`stack2`。
   - 返回`stack2`的栈顶元素。

4. **empty操作：**
   - 当且仅当`stack1`和`stack2`均为空时，返回`true`。

这里的核心思想是，将`stack1`中的元素逆序转移到`stack2`中，这样`stack2`顶上的元素就是队列最前面的元素。每一次`pop`或者`peek`可能会完成整个`stack1`到`stack2`的转移，这保证了出队和查看队列头部的高效性。由于这个转移过程在平均意义上是分摊的，因此总的时间复杂度是摊销O(1)。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class MyQueue:
    def __init__(self):
        # 使用两个栈，stack1用于接收push操作，stack2用于pop和peek操作
        self.stack1 = []
        self.stack2 = []

    def push(self, x: int) -> None:
        # push操作直接将元素压入stack1
        self.stack1.append(x)

    def pop(self) -> int:
        # 如果stack2为空，将stack1的所有元素导入到stack2
        if not self.stack2:
            while self.stack1:
                self.stack2.append(self.stack1.pop())
        # 弹出stack2的栈顶元素
        return self.stack2.pop()

    def peek(self) -> int:
        # 如果stack2为空，将stack1的所有元素导入到stack2
        if not self.stack2:
            while self.stack1:
                self.stack2.append(self.stack1.pop())
        # 返回stack2的栈顶元素
        return self.stack2[-1]

    def empty(self) -> bool:
        # 如果两个栈都为空，队列空
        return not self.stack1 and not self.stack2

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class MyQueue {
    std::stack<int> stack1;
    std::stack<int> stack2;

public:
    MyQueue() {
    }

    void push(int x) {
        // push操作直接将元素压入stack1
        stack1.push(x);
    }

    int pop() {
        // 如果stack2为空，将stack1的所有元素导入到stack2
        if (stack2.empty()) {
            while (!stack1.empty()) {
                stack2.push(stack1.top());
                stack1.pop();
            }
        }
        // 弹出stack2的栈顶元素
        int top = stack2.top();
        stack2.pop();
        return top;
    }

    int peek() {
        // 如果stack2为空，将stack1的所有元素导入到stack2
        if (stack2.empty()) {
            while (!stack1.empty()) {
                stack2.push(stack1.top());
                stack1.pop();
            }
        }
        // 返回stack2的栈顶元素
        return stack2.top();
    }

    bool empty() {
        // 如果两个栈都为空，队列空
        return stack1.empty() && stack2.empty();
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class MyQueue {
    constructor() {
        // stack1用于接收push操作，stack2用于pop和peek操作
        this.stack1 = [];
        this.stack2 = [];
    }

    push(x) {
        // push操作直接将元素压入stack1
        this.stack1.push(x);
    }

    pop() {
        // 如果stack2为空，将stack1的所有元素导入到stack2
        if (this.stack2.length === 0) {
            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop());
            }
        }
        // 弹出stack2的栈顶元素
        return this.stack2.pop();
    }

    peek() {
        // 如果stack2为空，将stack1的所有元素导入到stack2
        if (this.stack2.length === 0) {
            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop());
            }
        }
        // 返回stack2的栈顶元素
        return this.stack2[this.stack2.length - 1];
    }

    empty() {
        // 如果两个栈都为空，队列空
        return this.stack1.length === 0 && this.stack2.length === 0;
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.Stack;

class MyQueue {
    private Stack<Integer> stack1;
    private Stack<Integer> stack2;

    public MyQueue() {
        // 初始化两个栈
        stack1 = new Stack<>();
        stack2 = new Stack<>();
    }

    public void push(int x) {
        // push操作直接将元素压入stack1
        stack1.push(x);
    }

    public int pop() {
        // 如果stack2为空，将stack1的所有元素导入到stack2
        if (stack2.isEmpty()) {
            while (!stack1.isEmpty()) {
                stack2.push(stack1.pop());
            }
        }
        // 弹出stack2的栈顶元素
        return stack2.pop();
    }

    public int peek() {
        // 如果stack2为空，将stack1的所有元素导入到stack2
        if (stack2.isEmpty()) {
            while (!stack1.isEmpty()) {
                stack2.push(stack1.pop());
            }
        }
        // 返回stack2的栈顶元素
        return stack2.peek();
    }

    public boolean empty() {
        // 如果两个栈都为空，队列空
        return stack1.isEmpty() && stack2.isEmpty();
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：

在摊销意义上，每个操作的时间复杂度是 $O(1)$。虽然`pop`和`peek`可能需要进行大量的元素转移，但这种转移是以渐进的方式完成的，即在压入和弹出之间分摊。

空间复杂度：

空间复杂度为 $O(n)$，其中 $n$ 是队列中的元素个数。我们使用了两个栈存储元素，因此空间复杂度为线性级别。
