---
sidebar_position: 83
tags:
  - linked-list
  - Easy
---

# 83.从有序链表中删除重复项

标签: `linked-list`

难度: Easy

通过率: 53.93%

原题链接: https://leetcode.com/problems/remove-duplicates-from-sorted-list/description/

## 题目描述
给定一个排好序的链表的头节点，删除所有重复元素，使每个元素只出现一次。返回排好序的链表。

## 解题思路
由题目给出的条件可知，链表是有序的，因此所有重复的元素都是连续出现的。我们可以使用一个指针遍历链表，如果当前节点和下一个节点的值相同，就跳过下一个节点，否则就移动当前节点指针到下一个节点。不断进行这一操作，直到链表的末尾。这样最终的链表中每个元素只出现一次。

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
    current = head
    # 遍历链表
    while current and current.next:
        # 如果当前节点和下一个节点值相同，跳过下一个节点
        if current.val == current.next.val:
            current.next = current.next.next
        else:
            current = current.next
    return head
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class ListNode {
public:
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode* current = head;
        // 遍历链表
        while (current != NULL && current->next != NULL) {
            // 如果当前节点和下一个节点值相同，跳过下一个节点
            if (current->val == current->next->val) {
                current->next = current->next->next;
            } else {
                current = current->next;
            }
        }
        return head;
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

function deleteDuplicates(head) {
    let current = head;
    // 遍历链表
    while (current !== null && current.next !== null) {
        // 如果当前节点和下一个节点值相同，跳过下一个节点
        if (current.val === current.next.val) {
            current.next = current.next.next;
        } else {
            current = current.next;
        }
    }
    return head;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; next = null; }
}

class Solution {
    public ListNode deleteDuplicates(ListNode head) {
        ListNode current = head;
        // 遍历链表
        while (current != null && current.next != null) {
            // 如果当前节点和下一个节点值相同，跳过下一个节点
            if (current.val == current.next.val) {
                current.next = current.next.next;
            } else {
                current = current.next;
            }
        }
        return head;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是链表的节点个数。需要遍历整个链表一次。  
空间复杂度：$O(1)$，没有使用额外的空间，仅使用了常量级别的内存。
