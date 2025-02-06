---
sidebar_position: 138
tags:
  - linked-list
  - hash-table
  - Medium
---

# 138.复制带随机指针的链表

标签: `linked-list`, `hash-table`

难度: Medium

通过率: 58.67%

原题链接: https://leetcode.com/problems/copy-list-with-random-pointer/description/

## 题目描述
给定一个长度为 $n$ 的链表，其中每个节点包含一个额外的随机指针，指向链表中的任意节点或 $null$。构造链表的深拷贝。深拷贝应该由正好 $n$ 个全新节点组成，其中每个新节点的值设置为其对应的原始节点的值。新节点的 $next$ 和 $random$ 指针应该指向复制链表中的新节点，使得原始链表和复制链表中的指针对应于相同的列表状态。在新列表中，不能有指针指向原始列表中的节点。

## 解题思路
要解决这个问题，通常我们需要三个步骤：

1. **复制节点并插入到原始节点之后：**
   - 遍历链表，对于每个原始节点，创建一个新节点，并将它插入到原始节点的后面。这样，新列表和旧列表的组合将交错在一起。

2. **设置新节点的随机指针：**
   - 再次遍历链表，通过 $original.next.random = original.random.next$ 来设置新节点的随机指针。

3. **将交错的链表分离：**
   - 最后一个遍历，通过跳转访问（让每个节点的 $next$ 指针跳过一个节点）来恢复原始链表并取出复制链表。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = x
        self.next = next
        self.random = random

class Solution:
    def copyRandomList(self, head: 'Optional[Node]') -> 'Optional[Node]':
        if not head:
            return None
        
        # Step 1: 复制节点并插入到原始节点之后
        current = head
        while current:
            copy = Node(current.val, current.next)
            current.next = copy
            current = copy.next
            
        # Step 2: 设置新节点的随机指针
        current = head
        while current:
            if current.random:
                current.next.random = current.random.next
            current = current.next.next
            
        # Step 3: 分离链表
        current = head
        pseudo_head = Node(0)
        copy_current = pseudo_head
        while current:
            copy = current.next
            copy_current.next = copy
            copy_current = copy
            current.next = copy.next
            current = current.next
        
        return pseudo_head.next
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
struct Node {
    int val;
    Node* next;
    Node* random;
    Node(int _val) : val(_val), next(NULL), random(NULL) {}
};

class Solution {
public:
    Node* copyRandomList(Node* head) {
        if (!head) return NULL;
        
        // Step 1: 复制节点并插入到原始节点之后
        Node* current = head;
        while (current) {
            Node* copy = new Node(current->val);
            copy->next = current->next;
            current->next = copy;
            current = copy->next;
        }
        
        // Step 2: 设置新节点的随机指针
        current = head;
        while (current) {
            if (current->random) {
                current->next->random = current->random->next;
            }
            current = current->next->next;
        }
        
        // Step 3: 分离链表
        current = head;
        Node* pseudo_head = new Node(0);
        Node* copy_current = pseudo_head;
        while (current) {
            Node* copy = current->next;
            copy_current->next = copy;
            copy_current = copy;
            current->next = copy->next;
            current = current->next;
        }
        
        return pseudo_head->next;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function Node(val, next, random) {
    this.val = val;
    this.next = next;
    this.random = random;
}

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
    if (!head) return null;
    
    // Step 1: 复制节点并插入到原始节点之后
    let current = head;
    while (current) {
        const copy = new Node(current.val, current.next);
        current.next = copy;
        current = copy.next;
    }
    
    // Step 2: 设置新节点的随机指针
    current = head;
    while (current) {
        if (current.random) {
            current.next.random = current.random.next;
        }
        current = current.next.next;
    }
    
    // Step 3: 分离链表
    current = head;
    const pseudoHead = new Node(0);
    let copyCurrent = pseudoHead;
    while (current) {
        const copy = current.next;
        copyCurrent.next = copy;
        copyCurrent = copy;
        current.next = copy.next;
        current = current.next;
    }
    
    return pseudoHead.next;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Node {
    int val;
    Node next;
    Node random;
    
    public Node(int val) {
        this.val = val;
        this.next = null;
        this.random = null;
    }
}

public class Solution {
    public Node copyRandomList(Node head) {
        if (head == null) return null;

        // Step 1: 复制节点并插入到原始节点之后
        Node current = head;
        while (current != null) {
            Node copy = new Node(current.val);
            copy.next = current.next;
            current.next = copy;
            current = copy.next;
        }
    
        // Step 2: 设置新节点的随机指针
        current = head;
        while (current != null) {
            if (current.random != null) {
                current.next.random = current.random.next;
            }
            current = current.next.next;
        }

        // Step 3: 分离链表
        Node pseudoHead = new Node(0);
        Node copyCurrent = pseudoHead;
        current = head;
        while (current != null) {
            Node copy = current.next;
            copyCurrent.next = copy;
            copyCurrent = copy;
            current.next = copy.next;
            current = current.next;
        }

        return pseudoHead.next;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是链表的节点数。
空间复杂度：$O(1)$，因为我们只使用了常数空间来存储指针。
