---
sidebar_position: 0
tags:
  - linked-list
---
# 链表（Linked List）

## 1. 定义链表节点

在 Python 中，链表节点通常定义为一个类，每个节点包含 val 和 next。

### 示例代码
```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
```

## 2. 创建链表


从数组创建一个链表，这是链表题目中常用的初始化步骤。

### 示例代码
```python
def create_linked_list(arr):
    # 创建一个哑节点作为链表的开头
    dummy = ListNode(0)
    current = dummy
    for val in arr:
        current.next = ListNode(val)
        current = current.next
    return dummy.next

# 示例
head = create_linked_list([1, 2, 3, 4])
```

### 注释

 - 使用哑节点可以简化处理链表头部的逻辑。
 - 最终返回哑节点的 next，即链表的真正头部。

## 3. 打印链表

将链表的值以数组形式输出，便于调试。

### 示例代码
```python
def print_linked_list(head):
    result = []
    while head:
        result.append(head.val)
        head = head.next
    print(result)

# 示例
print_linked_list(head)
```

### 注释
 - 通过遍历链表，逐一访问节点的值并存储到数组中。

## 4. 反转链表

经典题目：反转单链表。

### 示例代码
```python
def reverse_linked_list(head):
    prev = None
    current = head
    while current:
        next_node = current.next  # 暂存下一节点
        current.next = prev  # 反转指针
        prev = current  # 更新 prev
        current = next_node  # 移动到下一节点
    return prev

# 示例
reversed_head = reverse_linked_list(head)
```

### 注释
 - 使用 prev 指针保存反转后的链表头。
 - 不断更新 current.next 指向前一个节点。

## 5. 检查链表是否有环

使用快慢指针判断链表中是否存在环。

### 示例代码
```python
def has_cycle(head):
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False
```
### 注释
 - 快指针每次走两步，慢指针每次走一步。
 - 如果存在环，快慢指针一定会相遇。

## 6. 合并两个有序链表

归并两个有序链表。

### 示例代码
```python
def merge_two_sorted_lists(l1, l2):
    dummy = ListNode()
    current = dummy
    while l1 and l2:
        if l1.val < l2.val:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next
    current.next = l1 or l2  # 将剩余部分接入
    return dummy.next
```
## 7. 删除链表中的节点

删除链表中值为给定值的节点。

### 示例代码
```python
def delete_node(head, val):
    dummy = ListNode(0, head)
    current = dummy
    while current.next:
        if current.next.val == val:
            current.next = current.next.next
        else:
            current = current.next
    return dummy.next
```
### 注释
 - 使用哑节点简化删除头节点的特殊情况。

## 8. 查找链表的中间节点

使用快慢指针查找链表的中间节点。

### 示例代码
```python
def find_middle_node(head):
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow
```
### 注释
 - 快指针移动两步，慢指针移动一步。
 - 当快指针到达链表末尾时，慢指针正好到达中间。

## 9. 从链表中移除倒数第 k 个节点

使用双指针法。

### 示例代码
```python
def remove_nth_from_end(head, n):
    dummy = ListNode(0, head)
    first, second = dummy, dummy
    for _ in range(n + 1):
        first = first.next
    while first:
        first = first.next
        second = second.next
    second.next = second.next.next
    return dummy.next
```
### 注释
 - 双指针间隔 n+1，确保当第一个指针到达链表尾部时，第二个指针位于目标节点的前一个节点。

## 10.  合并 K 个有序链表

使用分治法或优先队列。

### 示例代码（优先队列实现）

```python
import heapq

def merge_k_sorted_lists(lists):
    heap = []
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))
    dummy = ListNode()
    current = dummy
    while heap:
        val, i, node = heapq.heappop(heap)
        current.next = node
        current = current.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    return dummy.next
```

### 注释
 - 使用 Python 的 heapq 模块维护小顶堆。
 - 堆中存储 (值, 索引, 节点)，以避免值重复时引发比较错误。

这些代码示例涵盖了绝大多数 LeetCode 链表相关的题型和操作，希望对你有所帮助！