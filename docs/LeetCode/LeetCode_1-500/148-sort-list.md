---
sidebar_position: 148
tags:
  - linked-list
  - sort
  - divide-and-conquer
  - Medium
---

# 148.排序链表

标签: `linked-list`, `sort`, `divide-and-conquer`

难度: Medium

通过率: 60.23%

原题链接: https://leetcode.com/problems/sort-list/description/

## 题目描述
给定一个链表的头节点，将链表中的节点按升序排序后返回。

## 解题思路
解决排序链表问题的有效方法是使用归并排序。这主要因为归并排序的时间复杂度为 $O(n \log n)$，符合题目对于时间复杂度的要求。虽然在链表中实现归并排序通常会使用 $O(\log n)$ 的递归栈空间，但也可以通过更复杂的操作来实现 $O(1)$ 的空间复杂度。具体思路如下：

1. **拆分**：通过快慢指针方法，将当前链表拆分成两个子链表。
   - 使用两指针 `slow` 和 `fast`，`slow`每次移动一步，`fast`每次移动两步。`fast`到达链表末尾时，`slow`就在中点。
   - 将链表断开，形成两个独立的子链表。

2. **递归排序**：对拆分出来的两个子链表分别进行排序。
   - 递归调用排序函数，对两个子链表分别排序。

3. **合并两个已排序的子链表**：
   - 使用合并两个有序链表的方法，将两个子链表合并成一个有序链表。
   - 创建一个哨兵节点用于简化合并过程。

这样递归拆分和合并，直到所有子链表长度为1，最终完成了排序。

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
    def sortList(self, head: ListNode) -> ListNode:
        # 定义merge函数用于合并两个有序链表
        def merge(l1, l2):
            dummy = tail = ListNode(0)  # 创建哑节点
            while l1 and l2:
                if l1.val < l2.val:
                    tail.next, l1 = l1, l1.next
                else:
                    tail.next, l2 = l2, l2.next
                tail = tail.next
            tail.next = l1 or l2
            return dummy.next
        
        # 基本情况
        if not head or not head.next:
            return head

        # 使用快慢指针法找到中间节点，拆分链表
        slow, fast = head, head.next
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        mid = slow.next
        slow.next = None

        # 递归拆分并排序
        left = self.sortList(head)
        right = self.sortList(mid)

        # 合并已排序链表
        return merge(left, right)
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
    ListNode* sortList(ListNode* head) {
        // 定义合并两个有序链表的函数
        auto merge = [](ListNode* l1, ListNode* l2) {
            ListNode dummy, *tail = &dummy;
            while (l1 && l2) {
                if (l1->val < l2->val) {
                    tail->next = l1;
                    l1 = l1->next;
                } else {
                    tail->next = l2;
                    l2 = l2->next;
                }
                tail = tail->next;
            }
            tail->next = l1 ? l1 : l2;
            return dummy.next;
        };

        // 基本情况
        if (!head || !head->next) return head;

        // 找到链表的中间节点并断开
        ListNode *slow = head, *fast = head->next;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        ListNode* mid = slow->next;
        slow->next = nullptr;

        // 递归地拆分、排序链表
        ListNode* left = sortList(head);
        ListNode* right = sortList(mid);

        // 合并两个已排序的链表
        return merge(left, right);
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

var sortList = function(head) {
    // 定义合并两个有序链表的函数
    const merge = (l1, l2) => {
        let dummy = new ListNode(0);
        let tail = dummy;
        while (l1 && l2) {
            if (l1.val < l2.val) {
                tail.next = l1;
                l1 = l1.next;
            } else {
                tail.next = l2;
                l2 = l2.next;
            }
            tail = tail.next;
        }
        tail.next = l1 || l2;
        return dummy.next;
    };

    // 基本情况
    if (!head || !head.next) return head;

    // 找出中间节点并拆分链表
    let slow = head, fast = head.next;
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    let mid = slow.next;
    slow.next = null;

    // 递归拆分和排序
    let left = sortList(head);
    let right = sortList(mid);

    // 合并已排序的子链表
    return merge(left, right);
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
    public ListNode sortList(ListNode head) {
        // 用于合并两个有序链表的函数
        ListNode merge(ListNode l1, ListNode l2) {
            ListNode dummy = new ListNode(0);
            ListNode tail = dummy;
            while (l1 != null && l2 != null) {
                if (l1.val < l2.val) {
                    tail.next = l1;
                    l1 = l1.next;
                } else {
                    tail.next = l2;
                    l2 = l2.next;
                }
                tail = tail.next;
            }
            tail.next = (l1 != null) ? l1 : l2;
            return dummy.next;
        }

        // 基本情况
        if (head == null || head.next == null) {
            return head;
        }

        // 使用快慢指针法找到中间节点
        ListNode slow = head, fast = head.next;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        ListNode mid = slow.next;
        slow.next = null;

        // 递归排序
        ListNode left = sortList(head);
        ListNode right = sortList(mid);

        // 合并排序
        return merge(left, right);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n \log n)$，每次组合操作时间为 $O(n)$，且递归深度为 $O(\log n)$。  
  
空间复杂度：$O(\log n)$，由于递归的栈空间。
