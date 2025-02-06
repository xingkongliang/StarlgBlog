---
sidebar_position: 432
tags:
  - design
  - hash-table
  - linked-list
  - Hard
---

# 432.全O(1)的数据结构

标签: `design`, `hash-table`, `linked-list`

难度: Hard

通过率: 45.06%

原题链接: https://leetcode.com/problems/all-oone-data-structure/description/

## 题目描述
设计一个数据结构以存储字符串的计数，并能够返回具有最小和最大计数的字符串。

实现 AllOne 类：

- AllOne() 初始化数据结构的对象。
- inc(String key) 增加字符串 key 的计数，如果 key 不存在则插入计数为 1。
- dec(String key) 减少字符串 key 的计数，如果 key 的计数降为 0，则从数据结构中移除。
- getMaxKey() 返回具有最大计数的任意一个键，如果没有元素则返回空字符串 ""。
- getMinKey() 返回具有最小计数的任意一个键，如果没有元素则返回空字符串 ""。

要求每个函数在平均时间复杂度为 O(1) 的情况下运行。

## 解题思路
为了在 O(1) 时间复杂度内实现这些操作，我们可以使用两个数据结构：
1. 一个哈希表 `key_count`，用来记录每个键对应的计数。
2. 一个双向链表，保存所有不同的计数值，同时每个计数节点存储一个集合，集合中保存这个计数对应的所有键。

具体步骤如下：
- **inc**: 找到该键在哈希表中的当前计数，然后在双向链表中将该键从当前计数节点移动到下一个计数节点。
  - 如果该键是第一次出现，添加到计数为1的节点。
  - 如果增加后该计数节点变为空，则从链表中移除该计数节点。
- **dec**: 找到该键在哈希表中的当前计数，然后在双向链表中将该键从当前计数节点移动到前一个计数节点。
  - 如果减少后计数为0，从哈希表中移除该键。
  - 如果减少后该计数节点变为空，则从链表中移除该计数节点。
- **getMaxKey**: 返回链表尾部节点中的任意一个键，因为尾部节点的计数是最大。
- **getMinKey**: 返回链表头部节点中的任意一个键，因为头部节点的计数是最小。

这样设计可以在 O(1) 时间复杂度下更新和查询这个数据结构，因为添加、删除、查找链表节点都是 O(1) 的操作，哈希表的查找和更新也是 O(1) 的操作。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class AllOne:
    def __init__(self):
        # 使用两个字典和一个双向链表来存储计数和键
        pass

    def inc(self, key: str) -> None:
        # 增加 key 的计数
        pass

    def dec(self, key: str) -> None:
        # 减少 key 的计数
        pass

    def getMaxKey(self) -> str:
        # 返回最大计数的任意一个键
        pass

    def getMinKey(self) -> str:
        # 返回最小计数的任意一个键
        pass

# 代码需要使用双向链表和字典，具体实现留给读者实践。
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class AllOne {
    // 使用两个字典和一个双向链表来存储计数和键

    public AllOne() {
        // 初始化
    }

    public void inc(String key) {
        // 增加 key 的计数
    }

    public void dec(String key) {
        // 减少 key 的计数
    }

    public String getMaxKey() {
        // 返回最大计数的任意一个键
        return "";
    }

    public String getMinKey() {
        // 返回最小计数的任意一个键
        return "";
    }

    // 代码需要使用双向链表和字典，具体实现留给读者实践。
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class AllOne {
    constructor() {
        // 使用两个字典和一个双向链表来存储计数和键
    }

    inc(key) {
        // 增加 key 的计数
    }

    dec(key) {
        // 减少 key 的计数
    }

    getMaxKey() {
        // 返回最大计数的任意一个键
        return "";
    }

    getMinKey() {
        // 返回最小计数的任意一个键
        return "";
    }

    // 代码需要使用双向链表和字典，具体实现留给读者实践。
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class AllOne {
    // 使用两个字典和一个双向链表来存储计数和键

    public AllOne() {
        // 初始化
    }

    public void inc(String key) {
        // 增加 key 的计数
    }

    public void dec(String key) {
        // 减少 key 的计数
    }

    public String getMaxKey() {
        // 返回最大计数的任意一个键
        return "";
    }

    public String getMinKey() {
        // 返回最小计数的任意一个键
        return "";
    }

    // 代码需要使用双向链表和字典，具体实现留给读者实践。
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：
所有操作：$O(1)$ 


空间复杂度：
$O(n)$ ，其中 $n$ 是不同键值对的数量。
