---
sidebar_position: 341
tags:
  - stack
  - design
  - Medium
---

# 341.展开嵌套列表迭代器

标签: `stack`, `design`

难度: Medium

通过率: 64.97%

原题链接: https://leetcode.com/problems/flatten-nested-list-iterator/description/

## 题目描述
给定一个嵌套的整数列表 `nestedList`。列表中的每个元素或者是一个整数，或者是一个列表，其元素也可能是整数或者其他列表。实现一个迭代器 `NestedIterator` 类来展开这种嵌套的列表。

`NestedIterator` 类需要实现以下方法：

- `NestedIterator(List<NestedInteger> nestedList)` 初始化嵌套列表的迭代器。
- `int next()` 返回嵌套列表中的下一个整数。
- `boolean hasNext()` 如果列表中仍然有整数，则返回 `true`，否则返回 `false`。

输入`nestedList`是一个包含整数和列表的结构，返回值应该是列表中所有整数按顺序展开后的平面化列表。

## 解题思路
我们需要设计一个迭代器以便按顺序输出嵌套列表中的每一个整数。这可以通过将递归结构展开到一个栈中来实现。

具体步骤如下：

1. 在类初始化时，我们使用一个栈来存储所有的列表或整数。为了保证按顺序展开，我们首先将整个 `nestedList` 反向推入栈中。

2. 在实现 `next` 和 `hasNext` 方法时，始终从栈顶开始处理。

3. `hasNext` 方法将负责展开栈中的下一层，如果栈顶是一个整数，那么它返回 `true`，否则继续展开列表中的元素。

4. `next` 方法则直接从栈顶弹出一个整数返回。注意此方法执行前应确保 `hasNext` 为 `true`。

通过这种设计，我们可以在迭代的过程中动态展开列表，并平整地输出每一个元素。使用栈的结构来辅助展开，可以有效地管理嵌套关系。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class NestedIterator:
    def __init__(self, nestedList):
        # 将整个nestedList反转推入栈中
        self.stack = []
        for item in reversed(nestedList):
            self.stack.append(item)

    def next(self) -> int:
        # 弹出栈顶的整数
        return self.stack.pop().getInteger()

    def hasNext(self) -> bool:
        # 确保栈中存在下一个整数
        while self.stack:
            top = self.stack[-1]
            if top.isInteger():
                return True
            self.stack.pop()
            for item in reversed(top.getList()):
                self.stack.append(item)
        return False

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class NestedIterator {
    private Stack<NestedInteger> stack = new Stack<>();

    public NestedIterator(List<NestedInteger> nestedList) {
        // 将整个nestedList反转推入栈中
        for (int i = nestedList.size() - 1; i >= 0; i--) {
            stack.push(nestedList.get(i));
        }
    }

    @Override
    public Integer next() {
        // 弹出栈顶的整数
        return stack.pop().getInteger();
    }

    @Override
    public boolean hasNext() {
        // 确保栈中存在下一个整数
        while (!stack.isEmpty()) {
            NestedInteger top = stack.peek();
            if (top.isInteger()) {
                return true;
            } else {
                stack.pop();
                List<NestedInteger> list = top.getList();
                for (int i = list.size() - 1; i >= 0; i--) {
                    stack.push(list.get(i));
                }
            }
        }
        return false;
    }
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
var NestedIterator = function(nestedList) {
    this.stack = Array.from(nestedList).reverse();
};

NestedIterator.prototype.hasNext = function() {
    while (this.stack.length > 0) {
        let top = this.stack[this.stack.length - 1];
        if (top.isInteger()) {
            return true;
        }
        this.stack.pop();
        for (let i = top.getList().length - 1; i >= 0; i--) {
            this.stack.push(top.getList()[i]);
        }
    }
    return false;
};

NestedIterator.prototype.next = function() {
    return this.stack.pop().getInteger();
};

```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.Iterator;
import java.util.List;
import java.util.Stack;

public class NestedIterator implements Iterator<Integer> {

    private Stack<NestedInteger> stack = new Stack<>();

    public NestedIterator(List<NestedInteger> nestedList) {
        // 将整个nestedList反转推入栈中
        for (int i = nestedList.size() - 1; i >= 0; i--) {
            stack.push(nestedList.get(i));
        }
    }

    @Override
    public Integer next() {
        // 弹出栈顶的整数
        return stack.pop().getInteger();
    }

    @Override
    public boolean hasNext() {
        // 确保栈中存在下一个整数
        while (!stack.isEmpty()) {
            NestedInteger top = stack.peek();
            if (top.isInteger()) {
                return true;
            }
            stack.pop();
            List<NestedInteger> nestedList = top.getList();
            for (int i = nestedList.size() - 1; i >= 0; i--) {
                stack.push(nestedList.get(i));
            }
        }
        return false;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度**: 

每个元素仅被处理一次，因此总的时间复杂度为 $O(n)$，其中 $n$ 是嵌套列表中所有整数的总数。


**空间复杂度**: 

在最糟糕的情况下，栈的空间复杂度为 $O(n)$，其中 $n$ 是嵌套列表中的所有元素总数。
