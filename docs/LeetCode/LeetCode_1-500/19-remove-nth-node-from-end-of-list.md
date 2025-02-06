---
sidebar_position: 19
tags:
  - linked-list
  - two-pointers
  - Medium
---

# 19.删除链表的倒数第N个节点

标签: `linked-list`, `two-pointers`

难度: Medium

通过率: 47.47%

原题链接: https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/

## 题目描述
给定一个链表的头节点，删除链表的倒数第 $n$ 个节点，并返回链表的头节点。

## 解题思路
解决这个问题的关键在于如何在一次遍历中有效地找到倒数第 $n$ 个节点。我们可以使用双指针的方法来解决这个问题。具体步骤如下：

1. 初始化两个指针 `fast` 和 `slow`，都指向链表的头节点。在头节点之前，我们可以引入虚拟头节点，以处理删除头节点的特殊情况。

2. 让 `fast` 指针先移动 $n+1$ 步，这样 `fast` 和 `slow` 之间就有 $n$ 个节点的距离。

3. 然后同时移动 `fast` 和 `slow`，直到 `fast` 到达链表的末尾。此时，`slow` 的下一个节点就是我们要删除的节点。

4. 通过调整 `slow` 的 `next` 指针来删除该节点，然后返回链表的头节点即可。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def removeNthFromEnd(self, head: ListNode, n: int) -> ListNode:
        # 创建一个虚拟头节点
        dummy = ListNode(0)
        dummy.next = head
        fast = slow = dummy

        # fast 指针先走 n+1 步
        for _ in range(n + 1):
            fast = fast.next

        # fast 和 slow 同时走
        while fast:
            fast = fast.next
            slow = slow.next

        # 删除倒数第 n 个节点
        slow.next = slow.next.next

        return dummy.next
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode* dummy = new ListNode(0);
        dummy->next = head;
        ListNode* fast = dummy;
        ListNode* slow = dummy;
        
        // fast 指针先走 n+1 步
        for (int i = 0; i <= n; ++i) {
            fast = fast->next;
        }
        
        // fast 和 slow 同时走
        while (fast) {
            fast = fast->next;
            slow = slow->next;
        }
        
        // 删除倒数第 n 个节点
        ListNode* toDelete = slow->next;
        slow->next = slow->next->next;
        delete toDelete;
        
        return dummy->next;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

var removeNthFromEnd = function(head, n) {
    const dummy = new ListNode(0);
    dummy.next = head;
    let fast = dummy;
    let slow = dummy;
    
    // fast 指针先走 n+1 步
    for (let i = 0; i <= n; i++) {
        fast = fast.next;
    }
    
    // fast 和 slow 同时走
    while (fast) {
        fast = fast.next;
        slow = slow.next;
    }
    
    // 删除倒数第 n 个节点
    slow.next = slow.next.next;
    
    return dummy.next;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode fast = dummy;
        ListNode slow = dummy;

        // fast 指针先走 n+1 步
        for (int i = 0; i <= n; i++) {
            fast = fast.next;
        }

        // fast 和 slow 同时走
        while (fast != null) {
            fast = fast.next;
            slow = slow.next;
        }

        // 删除倒数第 n 个节点
        slow.next = slow.next.next;

        return dummy.next;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(sz)$，其中 $sz$ 是链表的节点数，因为我们只遍历链表一次。空间复杂度为 $O(1)$，因为我们只使用了常数个额外的指针。
