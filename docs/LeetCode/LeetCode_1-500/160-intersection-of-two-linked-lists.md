---
sidebar_position: 160
tags:
  - linked-list
  - two-pointers
  - Easy
---

# 160.相交链表

标签: `linked-list`, `two-pointers`

难度: Easy

通过率: 59.61%

原题链接: https://leetcode.com/problems/intersection-of-two-linked-lists/description/

## 题目描述
给定两个单链表的头节点 headA 和 headB，返回它们相交的第一个节点。如果两个链表没有交点，返回 null。

## 解题思路
解题的关键在于找到两个链表的交点位置。有一个简单且有效的方法可以在 O(m + n) 时间内完成，使用恒定的 O(1) 空间。核心思想如下：

1. 初始化两个指针：`ptrA` 从 `headA` 开始，`ptrB` 从 `headB` 开始。
2. 逐步让两个指针遍历各自的链表节点，当走到链表末尾（指向 `null`）时，将其指向另一个链表的头部。
3. 如果两个链表有交点，最终两个指针会在交点相遇。当它们再次相遇时（不为 `null` 的位置），即是交点位置。
4. 如果两个链表没有交点，则两个指针最终都会在同一轮或不同轮内到达 `null`，即 `ptrA == ptrB == null`。

通过这种方法，我们可以确保两个指针在最多遍历两个链表长度的时间复杂度内找到交点位置。

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

def getIntersectionNode(headA: ListNode, headB: ListNode) -> ListNode:
    # 初始化两个指针
    ptrA, ptrB = headA, headB

    # 遍历两个链表
    while ptrA != ptrB:
        # 当 ptrA 到达终点，将其重置到 headB
        if ptrA is None:
            ptrA = headB
        else:
            ptrA = ptrA.next

        # 当 ptrB 到达终点，将其重置到 headA
        if ptrB is None:
            ptrB = headA
        else:
            ptrB = ptrB.next

    # 当 ptrA == ptrB 时，不论是都指向null，还是到达交点，返回其中之一即可
    return ptrA
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) {
        val = x;
        next = null;
    }
}

public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
    // 初始化两个指针
    ListNode ptrA = headA;
    ListNode ptrB = headB;

    // 遍历两个链表
    while (ptrA != ptrB) {
        // 当 ptrA 到达终点，将其重置到 headB
        ptrA = (ptrA == null) ? headB : ptrA.next;
        // 当 ptrB 到达终点，将其重置到 headA
        ptrB = (ptrB == null) ? headA : ptrB.next;
    }

    // 当 ptrA == ptrB 时，不论是都指向null，还是到达交点，返回其中之一即可
    return ptrA;
}
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

function getIntersectionNode(headA, headB) {
    // 初始化两个指针
    let ptrA = headA;
    let ptrB = headB;

    // 遍历两个链表
    while (ptrA !== ptrB) {
        // 当 ptrA 到达终点，将其重置到 headB
        ptrA = ptrA === null ? headB : ptrA.next;
        // 当 ptrB 到达终点，将其重置到 headA
        ptrB = ptrB === null ? headA : ptrB.next;
    }

    // 当 ptrA === ptrB 时，不论是都指向null，还是到达交点，返回其中之一即可
    return ptrA;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) {
        val = x;
        next = null;
    }
}

public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        // 初始化两个指针
        ListNode ptrA = headA;
        ListNode ptrB = headB;

        // 遍历两个链表
        while (ptrA != ptrB) {
            // 当 ptrA 到达终点，将其重置到 headB
            ptrA = (ptrA == null) ? headB : ptrA.next;
            // 当 ptrB 到达终点，将其重置到 headA
            ptrB = (ptrB == null) ? headA : ptrB.next;
        }

        // 当 ptrA == ptrB 时，不论是都指向null，还是到达交点，返回其中之一即可
        return ptrA;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(m + n)$，其中 $m$ 和 $n$ 分别为链表A和B的长度。  
  
空间复杂度为 $O(1)$，因为我们只使用了两个额外的指针。
