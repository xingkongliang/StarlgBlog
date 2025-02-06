---
sidebar_position: 141
tags:
  - linked-list
  - two-pointers
  - Easy
---

# 141.环形链表

标签: `linked-list`, `two-pointers`

难度: Easy

通过率: 51.55%

原题链接: https://leetcode.com/problems/linked-list-cycle/description/

## 题目描述
给定一个链表的头结点，判断链表中是否存在环。存在环是指某个节点可以通过连续跟随 `next` 指针再次到达。返回 `true` 如果链表中存在环，否则返回 `false`。

## 解题思路
判断链表是否有环的经典方法是使用快慢指针（Floyd's Cycle-Finding Algorithm）。我们设置两个指针，一个快指针 `fast` 每次移动两个节点，一个慢指针 `slow` 每次移动一个节点。初始时，两者都指向链表的头节点。如果链表中存在环，快指针最终会追上慢指针，否则快指针会到达链表的末尾。

具体步骤如下：
1. 初始化两个指针 `slow` 和 `fast`，都指向链表的头节点。
2. 进入一个循环，直到 `fast` 或 `fast.next` 为 `null`：
   - `slow` 指针前进一步。
   - `fast` 指针前进两步。
   - 如果在任何时刻 `slow` 和 `fast` 相遇，则链表有环。
3. 如果循环结束且没有相遇，返回 `false`，表示链表无环。

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

def hasCycle(head):
    if not head or not head.next:
        return False
    slow, fast = head, head.next
    # 使用快慢指针来检测环
    while fast and fast.next:
        if slow == fast:
            return True
        slow = slow.next
        fast = fast.next.next
    return False
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
    bool hasCycle(ListNode *head) {
        if (!head || !head->next)
            return false;
        ListNode *slow = head;
        ListNode *fast = head->next;
        // 使用快慢指针来检测环
        while (fast && fast->next) {
            if (slow == fast)
                return true;
            slow = slow->next;
            fast = fast->next->next;
        }
        return false;
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

var hasCycle = function(head) {
    if (!head || !head.next)
        return false;
    let slow = head;
    let fast = head.next;
    // 使用快慢指针来检测环
    while (fast && fast.next) {
        if (slow === fast)
            return true;
        slow = slow.next;
        fast = fast.next.next;
    }
    return false;
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
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null)
            return false;
        ListNode slow = head;
        ListNode fast = head.next;
        // 使用快慢指针来检测环
        while (fast != null && fast.next != null) {
            if (slow == fast)
                return true;
            slow = slow.next;
            fast = fast.next.next;
        }
        return false;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是链表中结点的数量。在循环中快指针和慢指针最多运行 $n$ 步。  
空间复杂度：$O(1)$，我们只使用了两个指针。
