---
sidebar_position: 234
tags:
  - linked-list
  - two-pointers
  - Easy
---

# 234.回文链表

标签: `linked-list`, `two-pointers`

难度: Easy

通过率: 54.67%

原题链接: https://leetcode.com/problems/palindrome-linked-list/description/

## 题目描述
给定一个单链表的头节点，判断该链表是否为回文链表。如果是回文链表，返回 `true`，否则返回 `false`。

## 解题思路
要判断一个链表是否为回文，可以使用快慢指针的方法来查找链表的中点，将链表分成两个部分，然后反转后半部分并与前半部分比较。具体步骤如下：

1. 使用快慢指针找到链表的中点。快指针每次移动两步，慢指针每次移动一步。当快指针到达链表末尾时，慢指针将位于链表中点。

2. 将链表从中点分为两部分，并反转第二部分链表。例如，对于链表 `[1,2,2,1]`，反转后将为 `[1,2]` 和 `[1,2]`。

3. 比较前半部分和反转后的后半部分链表节点的值是否相等。如果它们全部相等，则链表是一个回文链表。

4. 可选：可以在比较后再次反转后半部分链表以恢复链表的原始结构。

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
    def isPalindrome(self, head: ListNode) -> bool:
        if not head or not head.next:
            return True

        # 找到链表中点
        slow, fast = head, head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        # 反转后半部分链表
        prev, curr = None, slow
        while curr:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node

        # 比较前半部分和后半部分
        first, second = head, prev
        while second:  # 只用比较后半部分
            if first.val != second.val:
                return False
            first = first.next
            second = second.next

        return True
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
    bool isPalindrome(ListNode* head) {
        if (!head || !head->next) return true;
        
        // 找到链表中点
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }

        // 反转后半部分链表
        ListNode *prev = nullptr, *curr = slow;
        while (curr) {
            ListNode *next_node = curr->next;
            curr->next = prev;
            prev = curr;
            curr = next_node;
        }

        // 比较前半部分和后半部分
        ListNode *first = head, *second = prev;
        while (second) { // 只用比较后半部分
            if (first->val != second->val) return false;
            first = first->next;
            second = second->next;
        }

        return true;
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

var isPalindrome = function(head) {
    if (!head || !head.next) return true;

    // 找到链表中点
    let slow = head, fast = head;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    // 反转后半部分链表
    let prev = null, curr = slow;
    while (curr) {
        let next_node = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next_node;
    }

    // 比较前半部分和后半部分
    let first = head, second = prev;
    while (second) { // 只用比较后半部分
        if (first.val !== second.val) return false;
        first = first.next;
        second = second.next;
    }

    return true;
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
    public boolean isPalindrome(ListNode head) {
        if (head == null || head.next == null) return true;
        
        // 找到链表中点
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        // 反转后半部分链表
        ListNode prev = null, curr = slow;
        while (curr != null) {
            ListNode nextNode = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextNode;
        }

        // 比较前半部分和后半部分
        ListNode first = head, second = prev;
        while (second != null) { // 只用比较后半部分
            if (first.val != second.val) return false;
            first = first.next;
            second = second.next;
        }

        return true;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是链表的长度，因为需要遍历链表两次：一次是找到中点，另一次是反转和比较。  
  
空间复杂度：$O(1)$，我们只使用了几个指针变量来控制链表节点的过程，没有使用额外的空间。
