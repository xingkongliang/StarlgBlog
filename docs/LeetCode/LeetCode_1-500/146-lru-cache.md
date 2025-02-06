---
sidebar_position: 146
tags:
  - design
  - hash-table
  - linked-list
  - Medium
---

# 146.LRU缓存

标签: `design`, `hash-table`, `linked-list`

难度: Medium

通过率: 43.9%

原题链接: https://leetcode.com/problems/lru-cache/description/

## 题目描述
设计一种数据结构，遵循最近最少使用（LRU）缓存的约束。实现LRUCache类：`LRUCache(int capacity)`用正整数容量初始化LRU缓存；`int get(int key)`如果键存在于缓存中，则返回键的值；否则返回-1；`void put(int key, int value)`如果键已存在，则变更其值；否则将键值对添加到缓存中。如果缓存达到其容量，则在插入新项目之前，使最近最少使用的项目无效。`get`和`put`函数必须以O(1)的平均时间复杂度运行。

## 解题思路
LRU缓存是一种需要快速存取元素的数据结构，同时也需要在达到容量时及时淘汰最近未被使用的元素。为了实现高效的访问和更新，我们可以利用哈希表（为了获得O(1)的时间复杂度来访问节点）和双向链表（为了方便删除和添加节点到链表头）。

- **双向链表**：主要是存储缓存中的键值对。双向链表中的节点按访问时间排列，最新访问的在链表头，而最近最少使用的在链表尾部。这种排列使得在尾部的元素成为淘汰目标。
- **哈希表**：用来存储键和链表节点的映射关系，这样可以在O(1)时间复杂度内查找到链表中的节点。

算法步骤：
1. `put(key, value)`：
   - 如果键已经存在，更新其对应节点的值，并提升该节点到链表头部（将其标记为最近访问）。
   - 如果键不存在，先检查缓存是否满：
     - 如果是满的，则删除链表尾部的节点（表示淘汰最近最少使用的节点）。
     - 然后将新的键值对插入链表头部，并在哈希表中做相应记录。
2. `get(key)`：
   - 检查哈希表，如果键存在，取出对应节点，将该节点提升至链表头，返回该节点的值。
   - 如果键不存在，返回-1。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class ListNode:
    def __init__(self, key=None, value=None):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}
        self.head = ListNode()
        self.tail = ListNode()
        self.head.next = self.tail
        self.tail.prev = self.head

    def _remove(self, node):
        """从链表中移除节点。"""
        prev_node = node.prev
        next_node = node.next
        prev_node.next = next_node
        next_node.prev = prev_node

    def _add_to_head(self, node):
        """将节点添加到链表头部。"""
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._add_to_head(node)
            return node.value
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            node = self.cache[key]
            node.value = value
            self._remove(node)
            self._add_to_head(node)
        else:
            if len(self.cache) >= self.capacity:
                # Remove node from the tail
                node_to_remove = self.tail.prev
                self._remove(node_to_remove)
                del self.cache[node_to_remove.key]

            new_node = ListNode(key, value)
            self.cache[key] = new_node
            self._add_to_head(new_node)

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class LRUCache {
public:
    LRUCache(int capacity) : capacity_(capacity) {}

    int get(int key) {
        auto it = cache_.find(key);
        if (it == cache_.end()) {
            return -1;
        }
        // Key exists, move it to the front
        order_.splice(order_.begin(), order_, it->second);
        return it->second->second;
    }

    void put(int key, int value) {
        auto it = cache_.find(key);
        if (it != cache_.end()) {
            // Key exists, update value and move it to the front
            order_.splice(order_.begin(), order_, it->second);
            it->second->second = value;
        } else {
            // Key does not exist, check capacity
            if (order_.size() == capacity_) {
                // Cache is full, remove the LRU item
                int lru_key = order_.back().first;
                order_.pop_back();
                cache_.erase(lru_key);
            }
            order_.emplace_front(key, value);
            cache_[key] = order_.begin();
        }
    }

private:
    int capacity_;
    std::list<std::pair<int, int>> order_;
    std::unordered_map<int, std::list<std::pair<int, int>>::iterator> cache_;
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map(); // 使用 Map 保证迭代的顺序
    }

    get(key) {
        if (!this.cache.has(key)) {
            return -1;
        }
        // 删除旧的位置并将其推到缓存的顶部
        let value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        this.cache.set(key, value);
        if (this.cache.size > this.capacity) {
            // Map 的 keys 方法返回一个 iterator
            this.cache.delete(this.cache.keys().next().value);
        }
    }
}

```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.LinkedHashMap;
import java.util.Map;

class LRUCache extends LinkedHashMap<Integer, Integer> {
    private int capacity;

    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }

    public int get(int key) {
        return super.getOrDefault(key, -1);
    }

    public void put(int key, int value) {
        super.put(key, value);
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity;
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：对于 `get` 和 `put` 操作都是 $O(1)$. 我们使用哈希表进行所有查找操作，双向链表进行节点移动和插入删除。由于这些操作在表头插入和在表尾弹出都是常数时间。  
  
空间复杂度： $O(capacity)$，因为我们使用的额外空间与缓存的容量成线性关系。
