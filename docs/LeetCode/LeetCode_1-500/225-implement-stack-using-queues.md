---
sidebar_position: 225
tags:
  - stack
  - queue
  - design
  - Easy
---

# 225.用队列实现栈

标签: `stack`, `queue`, `design`

难度: Easy

通过率: 65.92%

原题链接: https://leetcode.com/problems/implement-stack-using-queues/description/

## 题目描述
实现一个后入先出（LIFO）的栈，仅使用两个队列。实现的栈应该支持所有标准栈操作（push、top、pop、empty）。

## 解题思路
我们可以通过两个队列来实现一个栈，以模拟栈的后入先出特性。关键在于如何用队列的操作来实现栈的 `push`、`pop`、`top` 和 `empty` 操作。实现思路如下：

1. **push(x)**: 直接将元素添加到主队列 `q1` 中。这是队列的基本操作。

2. **pop()**: 为了实现“栈顶元素出栈”，我们需要将队列中的所有元素除最后一个外全部移到辅助队列 `q2`，然后弹出最后一个元素，之后 `q1` 和 `q2` 交换即可。

3. **top()**: 实现方式与 `pop()` 类似，但需要将最后一个元素留在 `q1` 中，并在 `q2` 中加入该元素。

4. **empty()**: 只需检查主队列 `q1` 是否为空。

可以这样用两个队列模拟栈操作：每次需要弹出和查看栈顶元素时，只需要将队列中的元素调换到另一个队列中，实际上保持了队列先进先出的特点，但实现了栈的后入先出操作。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
from collections import deque

class MyStack:
    def __init__(self):
        # 使用两个队列
        self.q1 = deque()
        self.q2 = deque()

    # 压入元素x到栈顶
    def push(self, x: int) -> None:
        self.q1.append(x)

    # 移除并返回栈顶元素
    def pop(self) -> int:
        while len(self.q1) > 1:
            # 将q1的前n-1个元素移动到q2
            self.q2.append(self.q1.popleft())
        # 弹出q1中最后一个元素，同时这也是栈顶元素
        res = self.q1.popleft()
        # 交换q1和q2
        self.q1, self.q2 = self.q2, self.q1
        return res

    # 返回栈顶元素
    def top(self) -> int:
        while len(self.q1) > 1:
            self.q2.append(self.q1.popleft())
        # 先存储q1中最后一个元素再移动
        res = self.q1.popleft()
        self.q2.append(res)
        # 交换q1和q2
        self.q1, self.q2 = self.q2, self.q1
        return res

    # 返回栈是否为空
    def empty(self) -> bool:
        return not self.q1
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class MyStack {
    Queue<Integer> q1;
    Queue<Integer> q2;

    public MyStack() {
        q1 = new LinkedList<>();
        q2 = new LinkedList<>();
    }

    public void push(int x) {
        q1.add(x);
    }

    public int pop() {
        while (q1.size() > 1) {
            q2.add(q1.remove());
        }
        int res = q1.remove();
        Queue<Integer> temp = q1;
        q1 = q2;
        q2 = temp;
        return res;
    }

    public int top() {
        while (q1.size() > 1) {
            q2.add(q1.remove());
        }
        int res = q1.remove();
        q2.add(res);
        Queue<Integer> temp = q1;
        q1 = q2;
        q2 = temp;
        return res;
    }

    public boolean empty() {
        return q1.isEmpty();
    }
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class MyStack {
    constructor() {
        // 初始化两个队列
        this.q1 = [];
        this.q2 = [];
    }

    // 向栈中添加元素
    push(x) {
        this.q1.push(x);
    }

    // 移除并返回栈顶元素
    pop() {
        while (this.q1.length > 1) {
            this.q2.push(this.q1.shift());
        }
        const res = this.q1.shift();
        const temp = this.q1;
        this.q1 = this.q2;
        this.q2 = temp;
        return res;
    }

    // 返回栈顶元素
    top() {
        while (this.q1.length > 1) {
            this.q2.push(this.q1.shift());
        }
        const res = this.q1.shift();
        this.q2.push(res);
        const temp = this.q1;
        this.q1 = this.q2;
        this.q2 = temp;
        return res;
    }

    // 判断栈是否为空
    empty() {
        return this.q1.length === 0;
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.LinkedList;
import java.util.Queue;

class MyStack {

    private Queue<Integer> q1;
    private Queue<Integer> q2;

    public MyStack() {
        q1 = new LinkedList<>();
        q2 = new LinkedList<>();
    }

    // 将元素压入栈顶
    public void push(int x) {
        q1.add(x);
    }

    // 移除并返回栈顶元素
    public int pop() {
        while (q1.size() > 1) {
            q2.add(q1.remove());
        }
        int res = q1.remove();
        Queue<Integer> tmp = q1;
        q1 = q2;
        q2 = tmp;
        return res;
    }

    // 获取栈顶元素
    public int top() {
        while (q1.size() > 1) {
            q2.add(q1.remove());
        }
        int res = q1.remove();
        q2.add(res);
        Queue<Integer> temp = q1;
        q1 = q2;
        q2 = temp;
        return res;
    }

    // 判断栈是否为空
    public boolean empty() {
        return q1.isEmpty();
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度**: 

- `push(x)` 操作的时间复杂度为 $O(1)$。
- `pop()` 和 `top()` 操作的时间复杂度为 $O(n)$，因为我们需要将队列的所有元素移动到另一个队列。
- `empty()` 操作的时间复杂度为 $O(1)$。


**空间复杂度**: 

- 总的空间复杂度为 $O(n)$，其中 $n$ 是栈中元素的数量，因为我们使用两个队列来存储栈中的元素。
