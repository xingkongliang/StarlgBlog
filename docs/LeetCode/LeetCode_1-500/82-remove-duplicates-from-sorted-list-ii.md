---
sidebar_position: 82
tags:
  - linked-list
  - two-pointers
  - Medium
---

# 82.删除排序链表中的重复元素 II

标签: `linked-list`, `two-pointers`

难度: Medium

通过率: 48.81%

原题链接: https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/description/

## 题目描述
给定一个排序链表的头节点，删除所有存在重复数字的节点，只留下原始链表中没有重复出现的数字。返回链表的头节点。

## 解题思路
要解决这个问题，我们可以使用一个虚拟节点，作为新链表的起始节点，方便处理链表头的边界情况。我们初始化三个指针：`prev` 指针指向虚拟节点，`curr` 指针用于遍历原链表，`next` 指针用于提前查看下一个节点的值。接着，开始遍历链表。当遇到连续的相同数字时，跳过这些节点。具体做法如下：

1. 初始化`prev`指向一个虚拟节点，其next指向链表的头，`curr`初始化为头节点。
2. 当`curr`不为null时，通过内层循环检查`curr.next`是否存在且值相同，从而判断是否为重复节点。
3. 如果找到重复节点，就一直跳过这些重复节点，保持`curr.next`为这些连续重复节点后面的第一个节点。
4. 如果没有重复节点，则将`prev.next`指向当前的`curr`。
5. 在检查完一个可能的重复子段后，将`prev`和`curr`进行更新：若`prev.next`仍与当前`curr`相同，说明当前节点没有重复。否则，`prev`位置不变。
6. 重复以上步骤直至到达链表尾部。

这样处理完链表后，`dummy.next`就是我们所需要的去重后的链表。

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

def deleteDuplicates(head: ListNode) -> ListNode:
    # 创建一个虚拟节点，并让其指向链表头部
    dummy = ListNode(0, head)
    # prev指针初始化为dummy节点
    prev = dummy
    # curr指针用于遍历节点，初始化为head
    curr = head
    
    while curr:
        # 查找当前值的重复节点
        if curr.next and curr.val == curr.next.val:
            while curr.next and curr.val == curr.next.val:
                curr = curr.next
            # 跳过所有重复节点
            prev.next = curr.next
        else:
            # 若无重复，安全地移动prev指针
            prev = prev.next
        # curr指针继续前移
        curr = curr.next
    
    return dummy.next
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        // 创建一个虚拟节点，并让其指向链表头部
        ListNode *dummy = new ListNode(0);
        dummy->next = head;
        ListNode *prev = dummy;
        ListNode *curr = head;
        
        while (curr) {
            if (curr->next && curr->val == curr->next->val) {
                while (curr->next && curr->val == curr->next->val) {
                    curr = curr->next;
                }
                // 跳过所有重复节点
                prev->next = curr->next;
            } else {
                // 移动prev辅助指针
                prev = prev->next;
            }
            // curr 指针继续移动
            curr = curr->next;
        }
        
        return dummy->next;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

var deleteDuplicates = function(head) {
    // 创建一个虚拟节点，指向链表头部
    let dummy = new ListNode(0, head);
    let prev = dummy;
    let curr = head;
    
    while (curr !== null) {
        if (curr.next !== null && curr.val === curr.next.val) {
            while (curr.next !== null && curr.val === curr.next.val) {
                curr = curr.next;
            }
            // 跳过所有重复节点
            prev.next = curr.next;
        } else {
            prev = prev.next;
        }
        curr = curr.next;
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
    ListNode(int x) { val = x; }
}

class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        // 创建一个虚拟节点，该节点的下一个节点为链表头部
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode prev = dummy;
        ListNode curr = head;
        
        while (curr != null) {
            if (curr.next != null && curr.val == curr.next.val) {
                while (curr.next != null && curr.val == curr.next.val) {
                    curr = curr.next;
                }
                // 跳过所有重复节点
                prev.next = curr.next;
            } else {
                prev = prev.next;
            }
            curr = curr.next;
        }
        
        return dummy.next;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 是链表中的节点数，因为我们只遍历了一次链表。`
空间复杂度为 $O(1)$，我们只使用了有限的几个额外指针，空间并不随输入链表大小而改变。
