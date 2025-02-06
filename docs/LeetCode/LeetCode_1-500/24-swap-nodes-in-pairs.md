---
sidebar_position: 24
tags:
  - linked-list
  - Medium
---

# 24.交换链表中的节点对

标签: `linked-list`

难度: Medium

通过率: 65.97%

原题链接: https://leetcode.com/problems/swap-nodes-in-pairs/description/

## 题目描述
给定一个链表，交换每两个相邻的节点并返回其头节点。必须在不修改节点内部值的情况下完成此操作（即，只能更改节点本身）。

## 解题思路
为了交换链表中每两个相邻节点，我们可以遍历链表，同时为每对节点进行交换。具体实现时，可以使用一个虚拟头节点来简化操作：

1. 创建一个虚拟节点 `dummy`，其 `next` 指向链表的头节点，这样即使头节点也需要交换时，操作起来也很方便。

2. 初始化一个指针 `current` 指向这个虚拟节点。

3. 遍历链表，当 `current.next` 和 `current.next.next` 都不为空时，进行以下操作：
    - 定义两个指针 `first` 和 `second` 分别指向 `current.next` 和 `current.next.next`。
    - 进行节点交换：
       - 将 `first` 的 `next` 指针指向 `second.next`。
       - 将 `second` 的 `next` 指针指向 `first`。
       - 将 `current` 的 `next` 指针指向 `second`。
    - 将 `current` 更新为 `first`，为下一次交换做准备。

4. 返回 `dummy.next`，也就是新链表的头。

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
    def swapPairs(self, head: ListNode) -> ListNode:
        # 建立一个虚拟节点
        dummy = ListNode(0)
        dummy.next = head
        current = dummy
        
        # 当有足够的节点可以交换时
        while current.next and current.next.next:
            first = current.next
            second = current.next.next
            
            # 交换这两个节点
            first.next = second.next
            second.next = first
            current.next = second
            
            # 将 current 指针向前移动两个节点
            current = first
        
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
    ListNode* swapPairs(ListNode* head) {
        ListNode* dummy = new ListNode(0, head);
        ListNode* current = dummy;
        
        while (current->next && current->next->next) {
            ListNode* first = current->next;
            ListNode* second = current->next->next;
            
            // 交换这两个节点
            first->next = second->next;
            second->next = first;
            current->next = second;
            
            // 将 current 指针向前移动两个节点
            current = first;
        }
        
        return dummy->next;
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
var swapPairs = function(head) {
    let dummy = new ListNode(0);
    dummy.next = head;
    let current = dummy;
    
    // 当有足够的节点可以交换时
    while (current.next !== null && current.next.next !== null) {
        let first = current.next;
        let second = current.next.next;
        
        // 交换这两个节点
        first.next = second.next;
        second.next = first;
        current.next = second;
        
        // 将 current 指针向前移动两个节点
        current = first;
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
    public ListNode swapPairs(ListNode head) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode current = dummy;
        
        while (current.next != null && current.next.next != null) {
            ListNode first = current.next;
            ListNode second = current.next.next;
            
            // 交换这两个节点
            first.next = second.next;
            second.next = first;
            current.next = second;
            
            // 将 current 指针向前移动两个节点
            current = first;
        }
        
        return dummy.next;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度**: $O(n)$，其中 $n$ 是链表的节点数。每个节点我们访问一次，因此该算法是线性时间复杂度。`
`
**空间复杂度**: $O(1)$。我们只使用了常数空间，没有使用任何与输入规模相关的额外空间。
