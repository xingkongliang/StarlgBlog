---
sidebar_position: 206
tags:
  - linked-list
  - Easy
---

# 206.反转链表

标签: `linked-list`

难度: Easy

通过率: 78.19%

原题链接: https://leetcode.com/problems/reverse-linked-list/description/

## 题目描述
给定一个单链表的头结点，将链表反转，并返回反转后的链表。

## 解题思路
反转链表可以通过迭代和递归两种方法实现。对于迭代方法，我们需要在遍历链表时逐个反转节点，把每个节点的下一个指针指向它前面的节点。具体实现步骤如下：
- 初始化三个指针：`prev` 指向 `null`，`curr` 指向头结点，`next` 用来保存 `curr` 的下一个节点。
- 在迭代过程中：
  1. 将 `next` 指针设置为 `curr.next`，保存下一个节点的信息。
  2. 将 `curr.next` 设为 `prev`，实现反转。
  3. 将 `prev` 和 `curr` 指针向前移动一位：`prev = curr`，`curr = next`。
- 完成迭代后，`prev` 指向新的头结点，返回 `prev`。

对于递归方法，我们从链表的头结点开始递归直至链表的最后一个节点，然后从后往前反转这些节点。具体如下：
- 终止条件：如果当前节点是 `null` 或者是最后一个节点，则开始返回。
- 对于其他节点，递归处理其后续节点的反转。
- 将当前节点的 `next.next` 指向当前节点，实现反转。
- 将当前节点的 `next` 设置为 `null`，断开旧链表的链接。
- 返回新的头结点。

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

# 迭代法
class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        prev = None  # 初始化 prev 为 null
        curr = head  # 当前节点为头节点
        while curr is not None:
            next_node = curr.next  # 暂存下一个节点
            curr.next = prev  # 反转当前节点的指针
            prev = curr  # prev 前进到当前节点
            curr = next_node  # 当前节点前进到下一个节点
        return prev  # 返回新的头结点

# 递归法
class SolutionRecursive:
    def reverseList(self, head: ListNode) -> ListNode:
        # 如果链表为空或只有一个节点，直接返回它
        if head is None or head.next is None:
            return head
        # 递归反转后续节点
        new_head = self.reverseList(head.next)
        # 将后一个节点的 next 指针指向当前节点
        head.next.next = head
        # 断开当前节点的 next
        head.next = None
        return new_head
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

// 迭代法
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr; // 初始化 prev 为 null
        ListNode* curr = head;   // 当前节点为头节点
        while (curr != nullptr) {
            ListNode* next_node = curr->next; // 暂存下一个节点
            curr->next = prev;  // 反转当前节点的指针
            prev = curr;        // prev 前进到当前节点
            curr = next_node;   // 当前节点前进到下一个节点
        }
        return prev; // 返回新的头结点
    }
};

// 递归法
class SolutionRecursive {
public:
    ListNode* reverseList(ListNode* head) {
        if (head == nullptr || head->next == nullptr) {
            return head;
        }
        ListNode* new_head = reverseList(head->next);
        head->next->next = head;
        head->next = nullptr;
        return new_head;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function ListNode(val) {
    this.val = val;
    this.next = null;
}

// 迭代法
var reverseList = function(head) {
    let prev = null;  // 初始化 prev 为 null
    let curr = head;  // 当前节点为头节点
    while (curr !== null) {
        let next_node = curr.next; // 暂存下一个节点
        curr.next = prev;          // 反转当前节点的指针
        prev = curr;               // prev 前进到当前节点
        curr = next_node;          // 当前节点前进到下一个节点
    }
    return prev; // 返回新的头结点
};

// 递归法
var reverseListRecursive = function(head) {
    if (head === null || head.next === null) {
        return head;
    }
    const new_head = reverseListRecursive(head.next);
    head.next.next = head;
    head.next = null;
    return new_head;
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

// 迭代法
class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;  // 初始化 prev 为 null
        ListNode curr = head;  // 当前节点为头节点
        while (curr != null) {
            ListNode next_node = curr.next; // 暂存下一个节点
            curr.next = prev;               // 反转当前节点的指针
            prev = curr;                    // prev 前进到当前节点
            curr = next_node;               // 当前节点前进到下一个节点
        }
        return prev; // 返回新的头结点
    }
}

// 递归法
class SolutionRecursive {
    public ListNode reverseList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }
        ListNode new_head = reverseList(head.next);
        head.next.next = head;
        head.next = null;
        return new_head;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度： $O(n)$，其中 $n$ 是链表中节点的个数。无论是迭代还是递归，每个节点仅被访问一次。  
  
空间复杂度：迭代方法为 $O(1)$，因为使用的是常量级的额外空间；递归方法为 $O(n)$，主要由递归调用栈的深度决定。
