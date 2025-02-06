---
sidebar_position: 430
tags:
  - linked-list
  - depth-first-search
  - Medium
---

# 430.扁平化多级双向链表

标签: `linked-list`, `depth-first-search`

难度: Medium

通过率: 60.7%

原题链接: https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/description/

## 题目描述
给定一个双向链表，其中每个节点包含一个 `next` 指针、一个 `previous` 指针，以及一个额外的 `child` 指针。这个 `child` 指针可能指向一个单独的双向链表，这种子链表也含有这些特殊节点。这些子链表可能从一个或多个节点延伸出去形成一个多层次的数据结构。需要将这个多级链表扁平化为一个单级双向链表。在扁平化过程中，当遇到某个节点具有子链表时，子链表的节点应该出现在当前节点后面，紧接着是该节点的后续节点。

## 解题思路
可以使用深度优先搜索（DFS）来解决这个问题。基本思路是从头节点开始遍历链表，如果遇到某个节点有 `child` 指针，那么就需要对这个子链表递归地进行扁平化处理。具体步骤如下：

1. 初始化一个 `current` 指针，指向链表的头部，然后开始遍历。
2. 对于每个 `current` 节点，检查其 `child` 指针是否为空。
   - 如果不为空，将这个 `child` 链表扁平化，并插入到 `current` 和 `current.next` 之间。更新当前节点的 `next` 指针，指向扁平化子链表的头部。
   - 然后遍历到子链表的末尾节点（找到子链表的尾节点）。
   - 将末尾节点的 `next` 指针指向原始的 `current.next`。
   - 更新 `current` 下一节点为`current.child`的开头，并将 `current.child` 置为 `null`。
3. 将 `current` 移到下一个节点，继续处理，直到 `current` 为 `null`。
4. 当遍历完整个链表后，返回头部节点。

通过这些步骤，能够实现将多级双向链表扁平化为单级双向链表。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class Node:
    def __init__(self, val, prev=None, next=None, child=None):
        self.val = val
        self.prev = prev
        self.next = next
        self.child = child

def flatten(head):
    if not head:
        return head
    
    # 使用堆栈存储每层节点
    stack = []
    current = head

    while current:
        
        # 如果存在child节点，需要处理该child节点
        if current.child:
            # 如果current.next不为空，入栈保存
            if current.next:
                stack.append(current.next)
            
            # 将current.next指向current.child
            current.next = current.child
            if current.next:
                current.next.prev = current
            current.child = None
        
        # 如果当前节点没有下一节点而堆栈不为空，出栈
        if not current.next and stack:
            current.next = stack.pop()
            if current.next:
                current.next.prev = current
        
        # 移动到下一个节点
        current = current.next
    
    return head
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
/*
 * Definition for a Node.
 * struct Node {
 *     int val;
 *     Node* prev;
 *     Node* next;
 *     Node* child;
 * };
 */

class Solution {
public:
    Node* flatten(Node* head) {
        if (!head) return head;
        
        // Stack to manage nodes
        stack<Node*> stack;
        Node* current = head;

        while (current) {
            // If there is a child
            if (current->child) {
                // If next is available, push to stack
                if (current->next) {
                    stack.push(current->next);
                }
                
                // Make current next as the child
                current->next = current->child;
                if (current->next) {
                    current->next->prev = current;
                }
                current->child = nullptr;
            }
            
            // If there are no more next nodes in the list
            // pop a node from the stack
            if (!current->next && !stack.empty()) {
                current->next = stack.top();
                stack.pop();
                current->next->prev = current;
            }
            
            // Move to next node
            current = current->next;
        }

        return head;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// Definition for a Node.
function Node(val, prev, next, child) {
    this.val = val;
    this.prev = prev;
    this.next = next;
    this.child = child;
}

/**
 * @param {Node} head
 * @return {Node}
 */
var flatten = function(head) {
    if (!head) return head;
    
    const stack = [];
    let current = head;
    
    while (current) {
        if (current.child) {
            if (current.next) {
                stack.push(current.next);
            }
            current.next = current.child;
            if (current.next) {
                current.next.prev = current;
            }
            current.child = null;
        }
        
        if (!current.next && stack.length > 0) {
            current.next = stack.pop();
            current.next.prev = current;
        }
        current = current.next;
    }
    
    return head;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
/**
 * // Definition for a Node.
 * class Node {
 *     public int val;
 *     public Node prev;
 *     public Node next;
 *     public Node child;
 *     public Node(int val) { this.val = val; }
 * }
 */
class Solution {
    public Node flatten(Node head) {
        if (head == null) return head;
        
        Stack<Node> stack = new Stack<>();
        Node current = head;
        
        while (current != null) {
            if (current.child != null) {
                if (current.next != null) {
                    stack.push(current.next);
                }
                current.next = current.child;
                if (current.next != null) {
                    current.next.prev = current;
                }
                current.child = null;
            }
            
            if (current.next == null && !stack.isEmpty()) {
                current.next = stack.pop();
                current.next.prev = current;
            }
            current = current.next;
        }
        
        return head;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是链表中所有节点的总数，我们遍历每个节点一次且只遍历一次。  
  
空间复杂度：$O(d)$，其中 $d$ 是嵌套的深度。当链表平坦化时，我们可能会将每个正在处理的子链表的头插入堆栈中，因此最多使用 $O(d)$ 的额外空间。
