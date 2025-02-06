---
sidebar_position: 25
tags:
  - linked-list
  - Hard
---

# 25.K-组翻转链表

标签: `linked-list`

难度: Hard

通过率: 61.28%

原题链接: https://leetcode.com/problems/reverse-nodes-in-k-group/description/

## 题目描述
给定一个链表的头节点，将链表的每 $k$ 个节点进行反转，返回修改后的链表。$k$ 是小于等于链表长度的正整数。如果节点数不是 $k$ 的倍数，则最后剩余的节点保持原有顺序。注意，你不能直接改变节点中的值，只能改变节点的位置。

## 解题思路
要解决这个问题，我们需要分段的对链表中的节点进行反转。具体步骤如下：  
1. 从链表头节点开始，遍历链表，以 $k$ 为一个单位进行分组。
2. 对每个分组的 $k$ 个节点进行反转操作。
3. 在进行反转时，需要维护好各分组之间的链接。
4. 如果剩余节点数不足 $k$，则不进行反转。

实现过程中，我们可以使用三个指针来帮助反转链表中的 $k$ 个节点：
- `prev`：指向当前待反转分组的前一个节点，用于连接反转后的部分。
- `current`：指向当前正在处理的节点。
- `next`：用于暂存节点，帮助进行链表中的操作。

主要的挑战是如何进行 $k$ 个节点的翻转，关键在于：将当前分组内的所有节点的指向关系进行逆转，这需要在遍历该分组的过程中调整节点的 `next` 指针。通过不断调整指针，我们可以在 $O(1)$ 的额外空间复杂度下完成翻转。

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

def reverseKGroup(head: ListNode, k: int) -> ListNode:
    # 创建一个虚拟节点，指向头节点
    dummy = ListNode(0)
    dummy.next = head
    previous = dummy
    
    while True:
        # 用于检查是否有足够的节点进行反转
        count = 0
        current = previous
        while count < k and current.next:
            current = current.next
            count += 1
        # 如果节点数量不足k个，结束反转
        if count < k:
            break

        # 保存下一个起点
        next_start = current.next
        
        # 开始反转k个节点
        prev = next_start
        current = previous.next
        for _ in range(k):
            tmp_next = current.next
            current.next = prev
            prev = current
            current = tmp_next
        # 将反转后的部分接入链表
        temp = previous.next
        previous.next = prev
        previous = temp
    
    return dummy.next
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

public ListNode reverseKGroup(ListNode head, int k) {
    // 创建一个虚拟节点，指向头节点
    ListNode dummy = new ListNode(0);
    dummy.next = head;
    ListNode previous = dummy;

    while (true) {
        // 用于检查是否有足够的节点进行反转
        int count = 0;
        ListNode current = previous;
        while (count < k && current.next != null) {
            current = current.next;
            count++;
        }
        // 如果节点数量不足k个，结束反转
        if (count < k) {
            break;
        }

        // 保存下一个起点
        ListNode nextStart = current.next;

        // 开始反转k个节点
        ListNode prev = nextStart;
        current = previous.next;
        for (int i = 0; i < k; i++) {
            ListNode tempNext = current.next;
            current.next = prev;
            prev = current;
            current = tempNext;
        }
        // 将反转后的部分接入链表
        ListNode temp = previous.next;
        previous.next = prev;
        previous = temp;
    }
    return dummy.next;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

var reverseKGroup = function(head, k) {
    // 创建一个虚拟节点，指向头节点
    const dummy = new ListNode(0);
    dummy.next = head;
    let previous = dummy;

    while (true) {
        // 用于检查是否有足够的节点进行反转
        let count = 0;
        let current = previous;
        while (count < k && current.next !== null) {
            current = current.next;
            count++;
        }
        // 如果节点数量不足k个，结束反转
        if (count < k) {
            break;
        }

        // 保存下一个起点
        const nextStart = current.next;

        // 开始反转k个节点
        let prev = nextStart;
        current = previous.next;
        for (let i = 0; i < k; i++) {
            const tempNext = current.next;
            current.next = prev;
            prev = current;
            current = tempNext;
        }
        // 将反转后的部分接入链表
        const temp = previous.next;
        previous.next = prev;
        previous = temp;
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

public class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        // 创建一个虚拟节点，指向头节点
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode previous = dummy;

        while (true) {
            // 用于检查是否有足够的节点进行反转
            int count = 0;
            ListNode current = previous;
            while (count < k && current.next != null) {
                current = current.next;
                count++;
            }
            // 如果节点数量不足k个，结束反转
            if (count < k) {
                break;
            }

            // 保存下一个起点
            ListNode nextStart = current.next;

            // 开始反转k个节点
            ListNode prev = nextStart;
            current = previous.next;
            for (int i = 0; i < k; i++) {
                ListNode tempNext = current.next;
                current.next = prev;
                prev = current;
                current = tempNext;
            }
            // 将反转后的部分接入链表
            ListNode temp = previous.next;
            previous.next = prev;
            previous = temp;
        }
        return dummy.next;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：每个节点恰好被访问一次，故时间复杂度是 $O(n)$，其中 $n$ 是链表中节点的总数。  
空间复杂度：由于只使用了常数个额外指针，因此额外空间复杂度为 $O(1)$。
