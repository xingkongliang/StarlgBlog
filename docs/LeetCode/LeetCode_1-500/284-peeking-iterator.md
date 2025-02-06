---
sidebar_position: 284
tags:
  - design
  - array
  - stack
  - Medium
---

# 284.设计支持`peek`操作的迭代器

标签: `design`, `array`, `stack`

难度: Medium

通过率: 60.15%

原题链接: https://leetcode.com/problems/peeking-iterator/description/

## 题目描述
设计一个支持 `peek` 操作的迭代器。除了 `next` 和 `hasNext` 操作外，还需要实现一个 `peek` 操作，该操作返回下一个元素但不移动指针。

## 解题思路
为了解决这个问题，我们可以维护一个「预取」变量来存储下一个元素，从而在调用 `peek` 时可以直接查看。我们可以如下实现 `PeekingIterator` 类：

1. 在类初始化时，调用迭代器的 `next()` 方法来获得并存储第一个元素。
2. 重写 `peek()` 方法，直接返回存储的下一个元素而不移动指针。
3. 在 `next()` 方法中，返回存储的下一个元素，然后通过调用原始迭代器的 `next()`（如果有下一个元素）来更新存储。
4. `hasNext()` 方法只需检查存储的下一个元素是否为 `None` 即可。

实现过程中，需要小心处理在序列结尾时的情况：确保不多次调用不必要的 `next()` 防止抛出异常。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class PeekingIterator:
    def __init__(self, iterator):
        """初始化：接收一个迭代器"""
        # 存储当前迭代器
        self.iterator = iterator
        # 存储下一个元素
        self.next_element = None
        if self.iterator.hasNext():
            # 提前保存下一个元素
            self.next_element = self.iterator.next()

    def peek(self):
        """获取下一个元素，但不移动指针"""
        return self.next_element

    def next(self):
        """返回下一个元素并移动指针"""
        current_element = self.next_element
        self.next_element = None
        if self.iterator.hasNext():
            self.next_element = self.iterator.next()
        return current_element

    def hasNext(self):
        """判断是否还有更多元素"""
        return self.next_element is not None
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class PeekingIterator {
    private Iterator<Integer> iterator;
    private Integer nextElement;

    public PeekingIterator(Iterator<Integer> iterator) {
        // 对输入的迭代器进行存储
        this.iterator = iterator;
        // 初始化下一个元素
        if (iterator.hasNext()) {
            nextElement = iterator.next();
        }
    }

    public Integer peek() {
        // 直接返回下一个元素
        return nextElement;
    }

    public Integer next() {
        // 下一个元素被访问
        Integer currentElement = nextElement;
        nextElement = iterator.hasNext() ? iterator.next() : null;
        return currentElement;
    }

    public boolean hasNext() {
        // 判断是否有下一个
        return nextElement != null;
    }
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class PeekingIterator {
    constructor(iterator) {
        // 初始化内部迭代器
        this.iterator = iterator;
        // 获取第一个元素
        this.nextElement = this.iterator.hasNext() ? this.iterator.next() : null;
    }

    peek() {
        // 返回下一个元素
        return this.nextElement;
    }

    next() {
        // 返回当前元素，并更新下一个元素
        const currentElement = this.nextElement;
        this.nextElement = this.iterator.hasNext() ? this.iterator.next() : null;
        return currentElement;
    }

    hasNext() {
        // 判断是否有下一个元素
        return this.nextElement !== null;
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.Iterator;

class PeekingIterator implements Iterator<Integer> {
    private Iterator<Integer> iterator;
    private Integer nextElement;

    public PeekingIterator(Iterator<Integer> iterator) {
        // 缓存传入的迭代器
        this.iterator = iterator;
        // 预先获取第一个元素
        if (iterator.hasNext()) {
            this.nextElement = iterator.next();
        }
    }

    public Integer peek() {
        // 查看下一个元素而不移动指针
        return nextElement;
    }

    @Override
    public Integer next() {
        // 返回下一个元素并移动指针
        Integer curElement = nextElement;
        nextElement = iterator.hasNext() ? iterator.next() : null;
        return curElement;
    }

    @Override
    public boolean hasNext() {
        // 判定是否存在下一个元素
        return nextElement != null;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度： 

每个操作 `next`、`peek` 和 `hasNext` 的时间复杂度均为 $O(1)$，因为这些操作都只涉及存取和更新指针。

空间复杂度：  
仅需要额外的 $O(1)$ 空间来存储一个 `nextElement` 变量。
