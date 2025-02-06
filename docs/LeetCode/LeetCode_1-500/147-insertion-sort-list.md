---
sidebar_position: 147
tags:
  - linked-list
  - sort
  - Medium
---

# 147.插入排序链表

标签: `linked-list`, `sort`

难度: Medium

通过率: 55.28%

原题链接: https://leetcode.com/problems/insertion-sort-list/description/

## 题目描述
给定一个单链表的头节点，使用插入排序对链表进行排序，并返回排序后的链表头节点。

## 解题思路
插入排序是一种类似于我们打扑克牌排序的方法。从链表的第二个节点开始，每次遍历节点时，将当前节点从链表中移除，并插入到已经排序好的部分中正确的位置。具体步骤如下：

1. 创建一个虚拟头节点 `dummy`，其 `next` 指向 `head`。
2. 初始化 `last_sorted` 为 `head`，表示已排好序链表的最后一个节点。
3. 从 `head` 的下一个节点开始，即 `curr`，遍历链表。如果当前节点 `curr` 的值大于最后一个已排序节点 `last_sorted` 的值，则继续向后移动；否则，需要在已排序部分中找出插入点：
    - 定义指针 `prev` ，开始时指向 `dummy`。
    - 循环移动 `prev` 直到 `prev.next` 节点的值大于 `curr`。
    - 调整 `prev.next` 和 `last_sorted.next` 以及 `curr.next` 以完成插入操作。
4. 重复以上过程直到所有节点处理完毕。

最终，`dummy.next` 即为排序后的链表的头节点。

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
    def insertionSortList(self, head: ListNode) -> ListNode:
        # 辅助节点
        dummy = ListNode(0)
        dummy.next = head
        last_sorted = head
        curr = head.next

        while curr:
            if last_sorted.val <= curr.val:
                # 当前节点不需要移动
                last_sorted = curr
            else:
                # 找到插入点
                prev = dummy
                while prev.next.val <= curr.val:
                    prev = prev.next
                # 插入curr
                last_sorted.next = curr.next
                curr.next = prev.next
                prev.next = curr
            # 处理下一个节点
            curr = last_sorted.next

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
    ListNode* insertionSortList(ListNode* head) {
        ListNode dummy(0);
        dummy.next = head;
        ListNode* last_sorted = head;
        ListNode* curr = head->next;

        while (curr != nullptr) {
            if (last_sorted->val <= curr->val) {
                last_sorted = curr;
            } else {
                ListNode* prev = &dummy;
                while (prev->next->val <= curr->val) {
                    prev = prev->next;
                }
                last_sorted->next = curr->next;
                curr->next = prev->next;
                prev->next = curr;
            }
            curr = last_sorted->next;
        }

        return dummy.next;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function insertionSortList(head) {
    const dummy = { val: 0, next: head };
    let lastSorted = head;
    let curr = head ? head.next : null;

    while (curr !== null) {
        if (lastSorted.val <= curr.val) {
            lastSorted = curr;
        } else {
            let prev = dummy;
            while (prev.next.val <= curr.val) {
                prev = prev.next;
            }
            lastSorted.next = curr.next;
            curr.next = prev.next;
            prev.next = curr;
        }
        curr = lastSorted.next;
    }

    return dummy.next;
}
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
    public ListNode insertionSortList(ListNode head) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode lastSorted = head;
        ListNode curr = head.next;

        while (curr != null) {
            if (lastSorted.val <= curr.val) {
                lastSorted = curr;
            } else {
                ListNode prev = dummy;
                while (prev.next.val <= curr.val) {
                    prev = prev.next;
                }
                lastSorted.next = curr.next;
                curr.next = prev.next;
                prev.next = curr;
            }
            curr = lastSorted.next;
        }

        return dummy.next;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：

$$O(n^2)$$

因为每次插入时，可能会遍历排序好的链表。


空间复杂度：

$$O(1)$$

因为只使用了常数级别的额外指针。
