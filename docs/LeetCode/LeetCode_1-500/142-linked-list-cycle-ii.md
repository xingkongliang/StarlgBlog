---
sidebar_position: 142
tags:
  - linked-list
  - two-pointers
  - Medium
---

# 142.链表中的环 II

标签: `linked-list`, `two-pointers`

难度: Medium

通过率: 53.31%

原题链接: https://leetcode.com/problems/linked-list-cycle-ii/description/

## 题目描述
给定一个链表的头节点，返回链表开始入环的第一个节点。如果链表中没有环，则返回null。链表中是否有环，如果有环，环入口节点的位置用pos表示，pos是尾节点链接到的序号(0-indexed)。该位置不是作为参数传递。请不要修改链表。

## 解题思路
我们可以使用一种称为弗洛伊德的 “龟兔赛跑” (Floyd's Tortoise and Hare) 算法检测链表中的环。当使用两个指针来遍历链表时，一个移动得较慢 (tortoise)，一个移动得较快 (hare)。初始时，两个指针都在链表的头部，hare每次移动两步，而tortoise每次移动一步。`若存在环，hare与tortoise必定会在环内相遇。`

一旦在环内相遇，我们可以通过以下步骤找到环的入口节点：

1. 相遇后，将tortoise指针重新指向链表头部，hare指针保持在相遇点。
2. 两个指针每次都向前移动一步。
3. 他们第一次重合的位置，就是环的起始节点。

该方法的核心在于利用巧妙的数学关系。设L为链表头部到环入口的长度，C为环的长度，相遇时两个指针走过的距离可以表达为`x = L + mC`, `y = L + nC`, 其中m, n为整数。因此，重合点的实际距离为`L + C - L`，即为完整环长的整数倍。当tortoise回到起始点并与hare相会时，他们都已经走完L步，正好抵消掉先前的L。

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

def detectCycle(head):
    if not head or not head.next:
        return None

    tortoise = head
    hare = head

    # 寻找相遇点
    while hare and hare.next:
        tortoise = tortoise.next
        hare = hare.next.next

        if tortoise == hare:
            # 重新开始寻找环的入口
            start = head
            while start != tortoise:
                start = start.next
                tortoise = tortoise.next
            return start

    return None
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) {
        val = x;
        next = null;
    }
}

public class Solution {
    public ListNode detectCycle(ListNode head) {
        if (head == null || head.next == null) {
            return null;
        }

        ListNode tortoise = head;
        ListNode hare = head;

        while (hare != null && hare.next != null) {
            tortoise = tortoise.next;
            hare = hare.next.next;

            if (tortoise == hare) {
                ListNode start = head;
                while (start != tortoise) {
                    start = start.next;
                    tortoise = tortoise.next;
                }
                return start;
            }
        }
        return null;
    }
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function ListNode(val) {
    this.val = val;
    this.next = null;
}

var detectCycle = function(head) {
    if (!head || !head.next) return null;

    let tortoise = head;
    let hare = head;

    while (hare && hare.next) {
        tortoise = tortoise.next;
        hare = hare.next.next;
        if (tortoise === hare) {
            let start = head;
            while (start !== tortoise) {
                start = start.next;
                tortoise = tortoise.next;
            }
            return start;
        }
    }
    return null;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) {
        val = x;
        next = null;
    }
}

public class Solution {
    public ListNode detectCycle(ListNode head) {
        if (head == null || head.next == null) {
            return null;
        }

        ListNode tortoise = head;
        ListNode hare = head;

        while (hare != null && hare.next != null) {
            tortoise = tortoise.next;
            hare = hare.next.next;

            if (tortoise == hare) {
                ListNode start = head;
                while (start != tortoise) {
                    start = start.next;
                    tortoise = tortoise.next;
                }
                return start;
            }
        }
        return null;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是链表中节点的个数。在最坏情况下，我们需要遍历链表中的所有节点。由于两个指针 (兔子和乌龟) 都在以不同速度移动，我们可以保证在 $2n$ 步内找到环的入口。  
空间复杂度：$O(1)$，因为我们只使用了两个额外的指针。
