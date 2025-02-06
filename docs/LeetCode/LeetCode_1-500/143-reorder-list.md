---
sidebar_position: 143
tags:
  - linked-list
  - two-pointers
  - Medium
---

# 143.重排链表

标签: `linked-list`, `two-pointers`

难度: Medium

通过率: 60.93%

原题链接: https://leetcode.com/problems/reorder-list/description/

## 题目描述
给定一个单链表的头节点，链表形式如下：

L0 → L1 → … → Ln - 1 → Ln

重排链表为如下形式：

L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …

你不能修改链表节点中的值，只能调整节点本身的位置。

## 解题思路
解决这个问题可以通过以下几个步骤实现：

1. **寻找中间节点：** 使用快慢指针找到链表的中间节点。快指针每次前进两个节点，慢指针每次前进一个节点，当快指针到达末尾时，慢指针恰好在中间节点的位置。

2. **反转后半部分链表：** 从中间节点出发，反转链表后半部分。我们可以通过迭代的方式反转链表。

3. **交替合并链表：** 将前半部分和经过反转的后半部分交替合并，得到最终结果。通过遍历两个链表，分别取一个节点加入到新链表中。

通过这三步就可以实现链表的重排。

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
    def reorderList(self, head: ListNode) -> None:
        """
        Do not return anything, modify head in-place instead.
        """
        if not head or not head.next:
            return

        # step 1: find the middle of the list
        slow, fast = head, head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        # step 2: reverse the second half of the list
        prev, curr = None, slow.next
        slow.next = None  # split the list into two parts
        while curr:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node

        # step 3: merge both halves
        first, second = head, prev
        while second:
            tmp1 = first.next
            tmp2 = second.next
            first.next = second
            second.next = tmp1
            first = tmp1
            second = tmp2

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
    void reorderList(ListNode* head) {
        if (!head || !head->next) return;

        // step 1: find the middle of the list
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }

        // step 2: reverse the second half of the list
        ListNode* prev = nullptr;
        ListNode* curr = slow->next;
        slow->next = nullptr; // split the list into two parts
        while (curr) {
            ListNode* next_node = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next_node;
        }

        // step 3: merge both halves
        ListNode* first = head;
        ListNode* second = prev;
        while (second) {
            ListNode* tmp1 = first->next;
            ListNode* tmp2 = second->next;
            first->next = second;
            second->next = tmp1;
            first = tmp1;
            second = tmp2;
        }
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
}

var reorderList = function(head) {
    if (!head || !head.next) return;

    // step 1: find the middle of the list
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // step 2: reverse the second half of the list
    let prev = null, curr = slow.next;
    slow.next = null;  // split the list into two parts
    while (curr) {
        let next_node = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next_node;
    }

    // step 3: merge both halves
    let first = head, second = prev;
    while (second) {
        let tmp1 = first.next;
        let tmp2 = second.next;
        first.next = second;
        second.next = tmp1;
        first = tmp1;
        second = tmp2;
    }
};

```

</TabItem>
<TabItem value="java" label="Java">

```java
public class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public void reorderList(ListNode head) {
        if (head == null || head.next == null) return;

        // step 1: find the middle of the list
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        // step 2: reverse the second half of the list
        ListNode prev = null, curr = slow.next;
        slow.next = null;  // split the list into two parts
        while (curr != null) {
            ListNode nextNode = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextNode;
        }

        // step 3: merge both halves
        ListNode first = head, second = prev;
        while (second != null) {
            ListNode tmp1 = first.next;
            ListNode tmp2 = second.next;
            first.next = second;
            second.next = tmp1;
            first = tmp1;
            second = tmp2;
        }
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 是链表中的节点数量，因为我们遍历了链表几次。  
  
空间复杂度为 $O(1)$，因为我们只使用了常数个额外的节点指针进行操作。
