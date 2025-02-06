---
sidebar_position: 86
tags:
  - linked-list
  - two-pointers
  - Medium
---

# 86.分隔链表

标签: `linked-list`, `two-pointers`

难度: Medium

通过率: 57.81%

原题链接: https://leetcode.com/problems/partition-list/description/

## 题目描述
给定链表的头节点和一个值 $x$，将链表重新排列，使得所有小于 $x$ 的节点位于大于或等于 $x$ 的节点之前。需要保持每个分区中节点的初始相对顺序。

## 解题思路
为了实现分隔链表并且保证原始顺序，可以使用两个指针方法。我们需要创建两个虚拟链表: 一个用于存储小于 $x$ 的节点，另一个用于存储大于或等于 $x$ 的节点。对原链表进行遍历时，根据当前节点的值将其加入到相对应的链表中。随后，将两个链表连接起来即可。具体步骤如下：

1. 创建两个虚拟头节点 `before_head` 和 `after_head`，分别对应两个链表（小于 $x$ 和大于或等于 $x$）。初始化两个指针 `before` 和 `after` 指向这两个虚拟头节点。
2. 通过 `head` 遍历原链表：
   - 如果当前节点的值小于 $x$，则将其连接到 `before` 链表中，并移动 `before` 指针。
   - 否则，将其连接到 `after` 链表中，并移动 `after` 指针。
3. 遍历完成后，将 `after` 链表的末尾指向 `null`，以示结束。
4. 连接两个链表，将 `before` 链表的末尾连接上 `after_head.next`。
5. 最终返回 `before_head.next`，即为分隔后链表的头节点。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def partition(head: ListNode, x: int) -> ListNode:
    # 创建两个链表的虚拟头节点
    before_head = ListNode(0)
    after_head = ListNode(0)
    before = before_head
    after = after_head

    while head:
        if head.val < x:
            # 将节点添加到 'before' 列表中
            before.next = head
            before = before.next
        else:
            # 将节点添加到 'after' 列表中
            after.next = head
            after = after.next
        head = head.next

    # 保证 'after' 列表的末尾为 null
    after.next = None
    
    # 连接 'before' 和 'after' 列表
    before.next = after_head.next
    
    return before_head.next

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// Definition for singly-linked list.
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    ListNode* partition(ListNode* head, int x) {
        // 创建两个链表的虚拟头节点
        ListNode* before_head = new ListNode(0);
        ListNode* after_head = new ListNode(0);
        ListNode* before = before_head;
        ListNode* after = after_head;

        while (head != nullptr) {
            if (head->val < x) {
                // 将节点添加到 'before' 链表中
                before->next = head;
                before = before->next;
            } else {
                // 将节点添加到 'after' 链表中
                after->next = head;
                after = after->next;
            }
            head = head->next;
        }

        // 保证 'after' 链表的末尾为 nullptr
        after->next = nullptr;

        // 连接 'before' 和 'after' 链表
        before->next = after_head->next;

        return before_head->next;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
    // 创建两个链表的虚拟头节点
    let before_head = new ListNode(0);
    let after_head = new ListNode(0);
    let before = before_head;
    let after = after_head;

    while (head !== null) {
        if (head.val < x) {
            // 将节点添加到 'before' 链表中
            before.next = head;
            before = before.next;
        } else {
            // 将节点添加到 'after' 链表中
            after.next = head;
            after = after.next;
        }
        head = head.next;
    }

    // 保证 'after' 链表的末尾为 null
    after.next = null;

    // 连接 'before' 和 'after' 链表
    before.next = after_head.next;

    return before_head.next;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Definition for singly-linked list.
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode partition(ListNode head, int x) {
        // 创建两个链表的虚拟头节点
        ListNode before_head = new ListNode(0);
        ListNode after_head = new ListNode(0);
        ListNode before = before_head;
        ListNode after = after_head;

        while (head != null) {
            if (head.val < x) {
                // 将节点添加到 'before' 链表中
                before.next = head;
                before = before.next;
            } else {
                // 将节点添加到 'after' 链表中
                after.next = head;
                after = after.next;
            }
            head = head.next;
        }

        // 保证 'after' 链表的末尾为 null
        after.next = null;

        // 连接 'before' 和 'after' 链表
        before.next = after_head.next;

        return before_head.next;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 是链表的节点总数。

空间复杂度为 $O(1)$，因为我们只用了常数个额外指针。
