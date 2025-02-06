---
sidebar_position: 23
tags:
  - linked-list
  - divide-and-conquer
  - heap
  - Hard
---

# 23.合并K个排序链表

标签: `linked-list`, `divide-and-conquer`, `heap`

难度: Hard

通过率: 55.03%

原题链接: https://leetcode.com/problems/merge-k-sorted-lists/description/

## 题目描述
给定一个由k个已排序链表组成的数组，将所有链表合并为一个排序链表，返回合并后的链表。

## 解题思路
这个问题要求我们将多个已排序的链表合并成一个整体已排序的链表。可以使用以下几种方法来解决：

1. **逐步合并**：使用一个循环，两两合并链表。这种方法简单直观，但效率不高，时间复杂度为$O(k \cdot n)$，其中$k$是链表的数量，$n$是每个链表的平均长度。

2. **优先级队列（小顶堆）**：
    - 初始化一个优先级队列(或小顶堆)，将每个链表的首节点入队。
    - 从堆中提取最小节点，然后将这个节点的next节点（如果有的话）入队。
    - 重复这个过程，直到堆为空。
    - 这种方法在每次选择节点的时候只选择堆顶节点，所以合并的时间复杂度为$O(n \log k)$，其中$n$是链表中节点的总数。

3. **分治**：
    - 类似于归并排序的思想，可以采用分治法。
    - 将k个链表进行两两合并，先合并相邻的链表，继续递归直到合并成一个完整的链表。
    - 这种方法的时间复杂度是$O(n \log k)$，空间复杂度为$O(1)$。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# Python 版本
import heapq

class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeKLists(self, lists):
        # 定义一个优先级队列
        heap = []
        # 初始化优先级队列，将每个链表的首节点入队
        for i, ln in enumerate(lists):
            if ln:
                heapq.heappush(heap, (ln.val, i, ln))
        # 创建一个哑节点来构建返回的链表
        dummy = ListNode()
        current = dummy
        # 从优先级队列中逐个取出最小节点构建新的链表
        while heap:
            val, i, node = heapq.heappop(heap)
            current.next = node
            current = current.next
            if node.next:
                heapq.heappush(heap, (node.next.val, i, node.next))
        # 返回合并后的链表
        return dummy.next

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++ 版本
#include <queue>
#include <vector>

struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

class Solution {
public:
    ListNode* mergeKLists(std::vector<ListNode*>& lists) {
        // 定义优先级队列
        auto comp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
        std::priority_queue<ListNode*, std::vector<ListNode*>, decltype(comp)> pq(comp);

        // 将每个链表的首节点加入到优先级队列中
        for (auto list : lists) {
            if (list) pq.push(list);
        }

        ListNode* dummy = new ListNode(0);
        ListNode* current = dummy;

        // 从优先级队列中提取最小节点
        while (!pq.empty()) {
            ListNode* node = pq.top();
            pq.pop();
            current->next = node;
            current = current->next;
            if (node->next) pq.push(node->next);
        }

        return dummy->next;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript 版本
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

function mergeKLists(lists) {
    const heap = [];
    
    // 将每个链表的首节点加入最小堆中
    for (let i = 0; i < lists.length; i++) {
        if (lists[i]) {
            heap.push(lists[i]);
        }
    }
    heap.sort((a, b) => a.val - b.val);

    const dummy = new ListNode();
    let current = dummy;

    while (heap.length > 0) {
        let smallest = heap.shift();
        current.next = smallest;
        current = current.next;
        if (smallest.next) {
            heap.push(smallest.next);
            heap.sort((a, b) => a.val - b.val);
        }
    }

    return dummy.next;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java 版本
import java.util.PriorityQueue;
import java.util.Comparator;

class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        PriorityQueue<ListNode> queue = new PriorityQueue<>(Comparator.comparingInt(o -> o.val));
        
        // 将每个链表的首节点加入到优先级队列中
        for (ListNode node : lists) {
            if (node != null) {
                queue.add(node);
            }
        }
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        
        // 从优先级队列中提取最小节点
        while (!queue.isEmpty()) {
            ListNode node = queue.poll();
            current.next = node;
            current = current.next;
            if (node.next != null) {
                queue.add(node.next);
            }
        }
        return dummy.next;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
### 时间复杂度:
使用优先级队列的小顶堆方法，时间复杂度为 $O(n \log k)$，其中$k$是链表的数量，$n$是所有节点的总数。

### 空间复杂度:
优先级队列最多包含$k$个元素，因此空间复杂度为 $O(k)$。
