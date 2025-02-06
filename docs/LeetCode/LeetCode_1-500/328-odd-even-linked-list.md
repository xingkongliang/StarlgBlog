---
sidebar_position: 328
tags:
  - linked-list
  - Medium
---

# 328.奇偶链表

标签: `linked-list`

难度: Medium

通过率: 61.72%

原题链接: https://leetcode.com/problems/odd-even-linked-list/description/

## 题目描述
给定一个单链表的头节点，将所有索引奇数的节点分组到一起，然后是所有索引偶数的节点，并返回重新排序后的链表。第一个节点被认为是奇数，第二个节点是偶数，以此类推。注意，奇数组和偶数组内的相对顺序应与输入时相同。你必须在 O(1) 的额外空间复杂度和 O(n) 的时间复杂度内解决这个问题。

## 解题思路
此问题要求在原地对链表进行重排序，即使用 $O(1)$ 的空间复杂度。可以通过维护两个指针，一个指向奇数索引的链表节点（`odd`），另一个指向偶数索引的链表节点（`even`），来实现此目的。具体步骤如下：

1. 若链表为空或只有一个节点，则无需排序，直接返回头节点。
2. 初始化两个变量：`odd` 指向头节点，第一个节点即奇数索引节点；`even` 指向第二个节点，偶数索引节点。另外，还需要存储偶数节点的头节点 `evenHead`，以便在最终连接奇偶节点时使用。
3. 通过遍历整个链表，将 `odd.next` 连接到 `even.next`，然后移动 `odd`；将 `even.next` 连接到 `odd.next`，然后移动 `even`。重复此操作，直到 `even` 为 null 或 `even.next` 为 null。
4. 将 `odd.next` 连接到 `evenHead`，形成最终的排序链表。

这样，所有奇数索引节点保持相对顺序连接，后面紧随偶数索引节点保持相对顺序。

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

def oddEvenList(head):
    if not head or not head.next:
        return head
    
    # 初始化奇数和偶数头节点
    odd = head
    even = head.next
    evenHead = even

    # 开始重排链表
    while even and even.next:
        odd.next = even.next
        odd = odd.next
        even.next = odd.next
        even = even.next
    
    # 将奇数部分和偶数部分连接
    odd.next = evenHead
    return head
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
    ListNode* oddEvenList(ListNode* head) {
        if (!head || !head->next) return head;

        ListNode* odd = head;
        ListNode* even = head->next;
        ListNode* evenHead = even;

        while (even && even->next) {
            odd->next = even->next;
            odd = odd->next;
            even->next = odd->next;
            even = even->next;
        }

        odd->next = evenHead;
        return head;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function oddEvenList(head) {
    if (!head || !head.next) return head;

    let odd = head;
    let even = head.next;
    let evenHead = even;

    while (even && even.next) {
        odd.next = even.next;
        odd = odd.next;
        even.next = odd.next;
        even = even.next;
    }

    odd.next = evenHead;
    return head;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; }
}

class Solution {
    public ListNode oddEvenList(ListNode head) {
        if (head == null || head.next == null) return head;

        ListNode odd = head;
        ListNode even = head.next;
        ListNode evenHead = even;

        while (even != null && even.next != null) {
            odd.next = even.next;
            odd = odd.next;
            even.next = odd.next;
            even = even.next;
        }

        odd.next = evenHead;
        return head;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，因为我们只需要遍历链表一次。  
  
空间复杂度为 $O(1)$，因为我们没有使用额外的存储空间，所有操作都是在原链表上进行的。
