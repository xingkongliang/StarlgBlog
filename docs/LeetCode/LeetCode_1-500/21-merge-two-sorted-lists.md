---
sidebar_position: 21
tags:
  - linked-list
  - two-pointers
  - Easy
---

# 21.合并两个有序链表

标签: `linked-list`, `two-pointers`

难度: Easy

通过率: 65.82%

原题链接: https://leetcode.com/problems/merge-two-sorted-lists/description/

## 题目描述
给定两个升序链表的头节点 `list1` 和 `list2`，将它们合并成一个升序链表，并返回合并后链表的头节点。

## 解题思路
为了合并两个有序链表，我们可以使用一个虚拟头节点 `dummy` 和一个指针 `current` 来构建新链表。我们从头开始遍历两个输入链表 `list1` 和 `list2`，比较它们的当前节点的值：
1. 如果 `list1` 的当前节点值小于或等于 `list2` 的当前节点值，我们就将 `list1` 的当前节点接到 `current` 上，并将 `list1` 的指针向前移动。
2. 否则，我们将 `list2` 的当前节点接到 `current` 上，并将 `list2` 的指针向前移动。
3. 无论哪种情况，我们都将 `current` 指针向前移动。

这一步骤会在其中一个输入链表用完时结束。此时，我们只需要将 `current` 与另一个链表未处理的部分相接就可以得到合并后的链表。

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

def mergeTwoLists(list1, list2):
    # 创建一个虚拟头节点
    dummy = ListNode()
    current = dummy

    # 遍历两个链表
    while list1 and list2:
        if list1.val <= list2.val: 
            current.next = list1
            list1 = list1.next
        else:
            current.next = list2
            list2 = list2.next
        current = current.next

    # 将剩余的节点连接到结果链表中
    current.next = list1 if list1 else list2

    # 返回新的合并后的链表的头节点
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
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // 创建一个虚拟头节点
        ListNode dummy;
        ListNode* current = &dummy;

        // 遍历两个链表
        while (list1 && list2) {
            if (list1->val <= list2->val) {
                current->next = list1;
                list1 = list1->next;
            } else {
                current->next = list2;
                list2 = list2->next;
            }
            current = current->next;
        }

        // 将剩余的节点连接到结果链表中
        current->next = list1 ? list1 : list2;

        // 返回新的合并后的链表的头节点
        return dummy.next;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

var mergeTwoLists = function(list1, list2) {
    // 创建一个虚拟头节点
    let dummy = new ListNode();
    let current = dummy;

    // 遍历两个链表
    while (list1 && list2) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }

    // 将剩余的节点连接到结果链表中
    current.next = list1 ? list1 : list2;

    // 返回新的合并后的链表的头节点
    return dummy.next;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // 创建一个虚拟头节点
        ListNode dummy = new ListNode();
        ListNode current = dummy;

        // 遍历两个链表
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                current.next = list1;
                list1 = list1.next;
            } else {
                current.next = list2;
                list2 = list2.next;
            }
            current = current.next;
        }

        // 将剩余的节点连接到结果链表中
        current.next = (list1 != null) ? list1 : list2;

        // 返回新的合并后的链表的头节点
        return dummy.next;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n + m)$，其中 $n$ 和 $m$ 分别是 `list1` 和 `list2` 的长度。因为每个节点仅会访问一次，所以遍历时间为两者长度之和。`空间复杂度`为 $O(1)$，因为合并过程不需要使用额外空间，返回的只是输入节点的重新链接。
