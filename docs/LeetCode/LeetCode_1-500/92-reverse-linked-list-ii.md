---
sidebar_position: 92
tags:
  - linked-list
  - Medium
---

# 92.反转链表 II

标签: `linked-list`

难度: Medium

通过率: 48.73%

原题链接: https://leetcode.com/problems/reverse-linked-list-ii/description/

## 题目描述
给定一个单链表的头节点以及两个整数 left 和 right，其中 $1 \leq \text{left} \leq \text{right} \leq \text{链表长度}$。反转从位置 left 到位置 right 的节点，返回反转后的链表。

## 解题思路
要反转从位置 `left` 到 `right` 的链表部分，我们需要进行以下步骤：  
1. 首先设置一个虚拟头节点 `dummy`，使其指向链表的头节点 `head`。这样就可以简化对链表头节点的处理。
2. 然后，找到 `left` 位置的前一个节点，这个节点叫 `pre`。可以通过从 `dummy` 开始走 `left-1` 步来找到。
3. `pre` 的下一个节点就是需要反转部分的第一个节点，命名为 `start`。
4. 反转从 `start` 开始的前 `right-left+1` 个节点。可以使用头插法对这部分进行反转。
5. 将反转后的这部分节点重新连接到链表中。

具体步骤如下：
- 初始化 `dummy` 节点并使其指向 `head`。
- 使用 `for` 循环找到 `pre` 节点。
- 初始化 `start` 节点为 `pre.next`。
- 使用头插法反转从 `start` 开始的 `m` 个节点：对 `n` 次迭代，每次将 `start.next` 插入到 `pre.next` 后面。
- 返回 `dummy.next`，即新的头节点。

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

def reverseBetween(head: ListNode, left: int, right: int) -> ListNode:
    # 创建虚拟头节点
    dummy = ListNode(0)
    dummy.next = head
    # 找到第left-1个节点（pre）
    pre = dummy
    for _ in range(left - 1):
        pre = pre.next
    
    # start是需要被反转的第一个节点
    start = pre.next
    # then是需要被移动的位置的下一个节点
    then = start.next
    
    # 进行反转操作
    for _ in range(right - left):
        start.next = then.next
        then.next = pre.next
        pre.next = then
        then = start.next

    # 返回新的头节点
    return dummy.next
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

class Solution {
public:
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        if (left == right) return head;

        // 创建虚拟头节点
        ListNode *dummy = new ListNode(0);
        dummy->next = head;

        // 找到第left-1个节点（pre）
        ListNode *pre = dummy;
        for (int i = 0; i < left - 1; ++i)
            pre = pre->next;

        // 开始反转
        ListNode *start = pre->next;
        ListNode *then = start->next;

        for (int i = 0; i < right - left; ++i) {
            start->next = then->next;
            then->next = pre->next;
            pre->next = then;
            then = start->next;
        }

        return dummy->next;
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

var reverseBetween = function(head, left, right) {
    // 创建虚拟头节点
    let dummy = new ListNode(0);
    dummy.next = head;

    // 找到第left-1个节点（pre）
    let pre = dummy;
    for (let i = 0; i < left - 1; i++) {
        pre = pre.next;
    }

    // 开始反转
    let start = pre.next;
    let then = start.next;

    for (let i = 0; i < right - left; i++) {
        start.next = then.next;
        then.next = pre.next;
        pre.next = then;
        then = start.next;
    }

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
    public ListNode reverseBetween(ListNode head, int left, int right) {
        if (left == right) return head;

        // 创建一个虚拟头节点
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        
        // 找到第 left-1 个节点
        ListNode pre = dummy;
        for (int i = 0; i < left - 1; i++) {
            pre = pre.next;
        }

        // 开始反转
        ListNode start = pre.next;
        ListNode then = start.next;
        
        for (int i = 0; i < right - left; i++) {
            start.next = then.next;
            then.next = pre.next;
            pre.next = then;
            then = start.next;
        }

        return dummy.next;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度: $O(n)$，其中 $n$ 是链表的长度，因为我们只遍历了链表一次。  
空间复杂度: $O(1)$，因为只使用了有限的额外空间。
