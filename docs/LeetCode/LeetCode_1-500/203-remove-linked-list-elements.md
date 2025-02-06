---
sidebar_position: 203
tags:
  - linked-list
  - Easy
---

# 203.移除链表元素

标签: `linked-list`

难度: Easy

通过率: 50.57%

原题链接: https://leetcode.com/problems/remove-linked-list-elements/description/

## 题目描述
给定一个链表的头节点和一个整数 val，移除链表中所有节点值等于 val 的节点，并返回新的头节点。

## 解题思路
要删除链表中所有节点值等于val的节点，可以使用双指针技术，逐个遍历链表中的节点进行检查。我们可以使用一个虚拟头节点（dummy node）来简化操作，特别是当要删除的节点位于链表头部时，这种方式非常有效。步骤如下：

1. 创建一个虚拟节点 `dummy`，其 `next` 指针指向链表头节点 `head`，这样即使要删除的节点是头节点也不需要特殊处理。
2. 初始化指针 `current` 指向 `dummy`。
3. 遍历链表，当 `current.next` 不为空时：
    - 如果 `current.next.val` 等于 `val`，则跳过该节点，即设置 `current.next = current.next.next`。
    - 否则，继续遍历，即移动指针 `current = current.next`。
4. 最后返回 `dummy.next`。

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

# 声明方法
def removeElements(head: ListNode, val: int) -> ListNode:
    # 创建虚拟头节点
    dummy = ListNode(next=head)
    current = dummy
    
    # 遍历链表
    while current.next is not None:
        # 如果找到值为val的节点
        if current.next.val == val:
            # 删除节点
            current.next = current.next.next
        else:
            # 否则继续遍历
            current = current.next
    
    # 返回处理后的头节点
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
    ListNode* removeElements(ListNode* head, int val) {
        // 创建虚拟头节点
        ListNode* dummy = new ListNode();
        dummy->next = head;
        ListNode* current = dummy;
        
        // 遍历链表
        while (current->next != nullptr) {
            // 如果找到值为val的节点
            if (current->next->val == val) {
                // 删除节点
                ListNode* toDelete = current->next;
                current->next = current->next->next;
                delete toDelete;
            } else {
                // 否则继续遍历
                current = current->next;
            }
        }
        // 返回处理后的头节点
        ListNode* newHead = dummy->next;
        delete dummy;
        return newHead;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

function removeElements(head, val) {
    // 创建虚拟头节点
    let dummy = new ListNode(0);
    dummy.next = head;
    let current = dummy;
    
    // 遍历链表
    while (current.next !== null) {
        // 如果找到值为val的节点
        if (current.next.val === val) {
            // 删除节点
            current.next = current.next.next;
        } else {
            // 否则继续遍历
            current = current.next;
        }
    }
    // 返回处理后的头节点
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
    public ListNode removeElements(ListNode head, int val) {
        // 创建虚拟头节点
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode current = dummy;
        
        // 遍历链表
        while (current.next != null) {
            // 如果找到值为val的节点
            if (current.next.val == val) {
                // 删除节点
                current.next = current.next.next;
            } else {
                // 否则继续遍历
                current = current.next;
            }
        }
        // 返回处理后的头节点
        return dummy.next;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中$n$是链表中节点的数量。我们只需要遍历一次链表即可。  
  
空间复杂度：$O(1)$，不需要使用额外的存储空间，除了一些变量。
