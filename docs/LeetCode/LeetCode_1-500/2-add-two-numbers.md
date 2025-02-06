---
sidebar_position: 2
tags:
  - linked-list
  - math
  - Medium
---

# 2.两数相加

标签: `linked-list`, `math`

难度: Medium

通过率: 44.82%

原题链接: https://leetcode.com/problems/add-two-numbers/description/

## 题目描述
给定两个非空的链表，表示两个非负的整数。数字以逆序存储，每个链表的节点只存储单个数字。将这两个数相加，并以链表形式返回结果。可以假设这两个数没有前导零，除了数字0本身。

## 解题思路
这道题可以通过遍历两个链表，并逐位相加的方法来解决。考虑进位情况，我们可以使用一个变量来记录计算过程中是否有进位。具体步骤如下： 
1. 初始化一个空节点`dummy`和一个`current`节点，指向`dummy`。同时初始化一个`carry`变量为0。 
2. 遍历两个链表，直到两个链表的节点都处理完毕。 
3. 在每一位上，将两个链表对应节点的值相加，以及`carry`的值。得到的结果分为两部分：`new_val`作为当前节点的值，`carry`为新计算的进位值。 `new_val = (l1.val + l2.val + carry) % 10` `carry = (l1.val + l2.val + carry) // 10` 
4. 更新`current`节点指向的下一个节点为`new_val`，并将`current`移动到下一个节点。 
5. 对两个输入链表`l1`和`l2`，如果其中一个已经为null，另一个仍需继续遍历。 
6. 如果遍历结束，`carry`仍不为零，则需要在结果链表的末尾添加一个新节点。 
7. 最后返回结果链表的头节点，即`dummy.next`。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# Python实现
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def addTwoNumbers(l1: ListNode, l2: ListNode) -> ListNode:
    dummy = ListNode()  # 创建一个dummy节点
    current = dummy
    carry = 0
    
    # 遍历两个链表
    while l1 or l2:
        val1 = l1.val if l1 else 0  # 如果l1仍有节点，取其值，否则取0
        val2 = l2.val if l2 else 0  # 如果l2仍有节点，取其值，否则取0
        # 计算新节点的值和新的进位值
        newVal = val1 + val2 + carry
        carry = newVal // 10
        newVal = newVal % 10
        
        current.next = ListNode(newVal)  # 创建新节点
        current = current.next
        
        # 步进到下一个节点
        if l1:
            l1 = l1.next
        if l2:
            l2 = l2.next
    
    # 处理剩余的进位
    if carry:
        current.next = ListNode(carry)
    
    return dummy.next
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++实现
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode* dummy = new ListNode(0);
        ListNode* current = dummy;
        int carry = 0;
        
        while (l1 != nullptr || l2 != nullptr) {
            int val1 = (l1 != nullptr) ? l1->val : 0;
            int val2 = (l2 != nullptr) ? l2->val : 0;
            
            int newVal = val1 + val2 + carry;
            carry = newVal / 10;
            newVal = newVal % 10;
            
            current->next = new ListNode(newVal);
            current = current->next;
            
            if (l1 != nullptr) l1 = l1->next;
            if (l2 != nullptr) l2 = l2->next;
        }
        
        if (carry > 0) {
            current->next = new ListNode(carry);
        }
        
        return dummy->next;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript实现
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val);
    this.next = (next===undefined ? null : next);
}

var addTwoNumbers = function(l1, l2) {
    let dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;
    
    while (l1 !== null || l2 !== null) {
        let val1 = (l1 !== null) ? l1.val : 0;
        let val2 = (l2 !== null) ? l2.val : 0;
        
        let newVal = val1 + val2 + carry;
        carry = Math.floor(newVal / 10);
        newVal = newVal % 10;
        
        current.next = new ListNode(newVal);
        current = current.next;
        
        if (l1 !== null) l1 = l1.next;
        if (l2 !== null) l2 = l2.next;
    }
    
    if (carry > 0) {
        current.next = new ListNode(carry);
    }
    
    return dummy.next;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java实现
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        int carry = 0;
        
        while (l1 != null || l2 != null) {
            int val1 = (l1 != null) ? l1.val : 0;
            int val2 = (l2 != null) ? l2.val : 0;
            
            int newVal = val1 + val2 + carry;
            carry = newVal / 10;
            newVal = newVal % 10;
            
            current.next = new ListNode(newVal);
            current = current.next;
            
            if (l1 != null) l1 = l1.next;
            if (l2 != null) l2 = l2.next;
        }
        
        if (carry > 0) {
            current.next = new ListNode(carry);
        }
        
        return dummy.next;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度: $O(\max(m, n))$，其中$m$和$n$分别是两个链表的长度。因为我们需要遍历每一个链表。`max(m, n)`表示两个长度中的最大者。`
- 空间复杂度: $O(\max(m, n))$，生成的结果链表最多可能要存储$\max(m, n) + 1$个节点。
