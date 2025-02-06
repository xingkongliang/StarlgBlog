---
sidebar_position: 237
tags:
  - linked-list
  - Medium
---

# 237.删除链表中的节点

标签: `linked-list`

难度: Medium

通过率: 81.28%

原题链接: https://leetcode.com/problems/delete-node-in-a-linked-list/description/

## 题目描述
单链表中，删除给定的某个节点。给你一个需要删除的节点，该节点不是链表的最后一个节点。我们需要将它从链表中删除。注意，这里删除节点并不是指从内存中移除，而是链表中不再包含该节点的值，也就是说，节点的数值不应出现在链表中，节点总数应减一，节点前后的值顺序不变。

## 解题思路
题目要求删除一个单链表节点，但未给出链表头节点。通过给定的节点，我们可以使用如下方法进行删除操作：

1. 因为无法获取前驱节点从而不能直接改变其next指针指向，因此不能使用常规的链表节点删除方法。

2. 题目说明被删除节点不是最后一个节点，这样我们可以将下一个节点的值赋给当前节点，然后直接删除下一个节点。

3. 具体实现：将当前节点的值替换为下一个节点的值，然后删除下一个节点（通过将当前节点的next指针指向`next.next`）。这种方法能够在常数时间内完成。

这种方法通过将后继节点的值复制到被删除的节点上，并调整节点指针，实现“伪删除”。使用这种方法的前提是被删除节点不是最后一个节点。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def deleteNode(self, node):
        # 将下一个节点的值复制到当前节点
        node.val = node.next.val
        # 跳过下一个节点
        node.next = node.next.next
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
    void deleteNode(ListNode* node) {
        // 将下一个节点的值复制到当前节点
        node->val = node->next->val;
        // 跳过下一个节点
        node->next = node->next->next;
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

/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function(node) {
    // 将下一个节点的值复制到当前节点
    node.val = node.next.val;
    // 跳过下一个节点
    node.next = node.next.next;
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
    public void deleteNode(ListNode node) {
        // 将下一个节点的值复制到当前节点
        node.val = node.next.val;
        // 跳过下一个节点
        node.next = node.next.next;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(1)$。因为删除操作仅涉及常数次指针操作和赋值。  
  
空间复杂度为 $O(1)$。只使用了常量级的额外空间。
