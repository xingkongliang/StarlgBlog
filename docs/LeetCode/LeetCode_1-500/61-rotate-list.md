---
sidebar_position: 61
tags:
  - linked-list
  - two-pointers
  - Medium
---

# 61.旋转链表

标签: `linked-list`, `two-pointers`

难度: Medium

通过率: 39.03%

原题链接: https://leetcode.com/problems/rotate-list/description/

## 题目描述
给定一个链表的头节点，将链表向右旋转 $k$ 个位置。

## 解题思路

旋转链表的问题可以通过以下步骤解决：
1.	**计算链表长度**：遍历链表，获取链表的节点总数  $n$ 。如果链表为空、只有一个节点，或者  $k = 0$ ，无需旋转，直接返回原链表。
2.	**形成环**：将链表的尾节点与头节点连接，形成一个循环链表。这样可以通过一次遍历轻松找到新头节点的位置。
3.	**计算有效旋转步数**：由于  $k$  可能大于链表长度  $n$ ，实际需要的旋转步数是  $k \mod n$ 。如果  $k = 0$ ，无需旋转，直接返回原链表。
4.	**找到新尾节点**：新尾节点的位置是从头节点向后移动  $n - k - 1$  步的位置。
5.	**断开环**：将新尾节点的 next 设置为 null，断开循环链表，同时将新尾节点的下一个节点作为新头节点。

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

def rotateRight(head: ListNode, k: int) -> ListNode: 
    if not head or k == 0: 
        return head
    # 计算链表长度
    length = 1
    old_tail = head
    while old_tail.next: 
        old_tail = old_tail.next
        length += 1
    
    # 连接尾巴和头部形成环
    old_tail.next = head 
    
    # 找到新的尾部：向后移动 (n - k % length - 1) 次
    k = k % length
    new_tail = head
    for _ in range(length - k - 1):
        new_tail = new_tail.next
    
    # 新的头部是新的尾部的下一个节点
    new_head = new_tail.next

    # 断开环
    new_tail.next = None
    
    return new_head
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
    ListNode* rotateRight(ListNode* head, int k) {
    if (!head || k == 0) return head;
    
    // 计算链表长度
    int length = 1;
    ListNode* old_tail = head;
    while (old_tail->next) {
        old_tail = old_tail->next;
        ++length;
    }
    
    // 形成环
    old_tail->next = head;
    
    // 计算新的尾巴的位置
    k = k % length;
    ListNode* new_tail = head;
    for (int i = 0; i < length - k - 1; ++i) {
        new_tail = new_tail->next;
    }
    
    // 新的头
    ListNode* new_head = new_tail->next;
    
    // 断开环
    new_tail->next = nullptr;
    
    return new_head;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

function rotateRight(head, k) {
    if (!head || k === 0) return head;
    
    // 计算链表长度
    let length = 1;
    let old_tail = head;
    while (old_tail.next) {
        old_tail = old_tail.next;
        length++;
    }
    
    // 形成环
    old_tail.next = head;
    
    // 找到新的尾巴
    k = k % length;
    let new_tail = head;
    for (let i = 0; i < length - k - 1; i++) {
        new_tail = new_tail.next;
    }
    
    // 新的头
    let new_head = new_tail.next;
    
    // 断开环
    new_tail.next = null;
    
    return new_head;
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
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null || k == 0) return head;
        
        // 计算链表长度
        ListNode old_tail = head;
        int length = 1;
        while (old_tail.next != null) {
            old_tail = old_tail.next;
            length++;
        }
        
        // 形成环
        old_tail.next = head;
        
        // 找到新的尾
        k = k % length;
        ListNode new_tail = head;
        for (int i = 0; i < length - k - 1; i++) {
            new_tail = new_tail.next;
        }
        
        // 新的头
        ListNode new_head = new_tail.next;
        
        // 断开链表的环
        new_tail.next = null;
        
        return new_head;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度**：$O(n)$，其中 $n$ 是链表的长度。旋转操作需要遍历链表两次以形成环和找到新位置。  
**空间复杂度**：$O(1)$，只使用了常数级别的额外空间。
