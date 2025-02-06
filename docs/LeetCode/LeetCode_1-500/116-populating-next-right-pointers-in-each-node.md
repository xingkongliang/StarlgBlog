---
sidebar_position: 116
tags:
  - tree
  - depth-first-search
  - breadth-first-search
  - Medium
---

# 116.填充每个节点的下一个右侧节点指针

标签: `tree`, `depth-first-search`, `breadth-first-search`

难度: Medium

通过率: 64.32%

原题链接: https://leetcode.com/problems/populating-next-right-pointers-in-each-node/description/

## 题目描述
给定一个完美二叉树，即所有叶子节点都在同一层，并且每个父节点都有两个孩子节点。定义二叉树节点如下：

```c
struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
```

填充每个节点的 `next` 指针，使其指向其下一个右侧节点。如果没有下一个右侧节点，则将 `next` 指针设置为 `NULL`。

最初，所有 `next` 指针都被设置为 `NULL`。

### 示例 1:

输入: root = [1,2,3,4,5,6,7]
输出: [1,#,2,3,#,4,5,6,7,#]
解释: 给定的完美二叉树如图 A 所示，您的函数应将每个 `next` 指针填充为指向其下一个右侧节点，如图 B 所示。序列化输出为按 `next` 指针连接的层序表示，`#` 表示每层的结束。

### 示例 2:

输入: root = []
输出: []


### 进阶:

- 您只能使用常量级额外空间。
- 递归方法也可以接受。假设隐式堆栈空间不算作额外空间。

## 解题思路
在一个完美二叉树中，每个父节点都有两个子节点，所有叶子节点都位于同一层。因此我们可以利用这种结构来填充 `next` 指针。

### 解决方案

使用层级遍历（类似广度优先搜索）的思路，但我们不使用显式队列，而使用 `next` 指针本身来遍历同一层中的节点。在每一层，我们将该层的每个节点的左、右子节点的 `next` 指针连接起来。

假设 `current` 是当前层的第一个节点，我们每次处理该层时，从 `current` 开始沿着 `next` 遍历。

1. 将 `current` 的左子节点的 `next` 指针指向 `current` 的右子节点。
2. 如果 `current` 有下一节点 `current.next`，则将 `current` 右子节点的 `next` 指针指向 `current.next` 的左子节点。
3. 当处理完当前层的所有节点后，进入下一层。
4. 重复此过程直到所有节点的 `next` 指针都已设置。

由于这是一棵完美二叉树，我们可以通过访问每层的第一个节点来移动到下一层的第一个节点，即 `current = current.left`。这样我们利用了树本身的结构，因此不需要额外的存储空间。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class Node:
    def __init__(self, val=0, left=None, right=None, next=None):
        self.val = val
        self.left = left
        self.right = right
        self.next = next

class Solution:
    def connect(self, root: 'Node') -> 'Node':
        if not root:
            return None
        
        # 从根节点开始，将每层的节点连接
        leftmost = root
        
        while leftmost.left:
            # 遍历当前层的节点并连接下一层的节点
            head = leftmost
            while head:
                # 将左子节点的 `next` 指向右子节点
                head.left.next = head.right
                
                # 如果 `head` 有下一个节点，则将当前右子节点的 `next` 指向下一个节点的左子节点
                if head.next:
                    head.right.next = head.next.left
                
                # 移动到同层的下一个节点
                head = head.next
            
            # 移动到下一层的左most节点
            leftmost = leftmost.left
        
        return root
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Node {
public:
    int val;
    Node* left;
    Node* right;
    Node* next;
    
    Node() : val(0), left(NULL), right(NULL), next(NULL) {}
    Node(int _val) : val(_val), left(NULL), right(NULL), next(NULL) {}
    Node(int _val, Node* _left, Node* _right, Node* _next)
        : val(_val), left(_left), right(_right), next(_next) {}
};

class Solution {
public:
    Node* connect(Node* root) {
        if (!root) return nullptr;
        
        // 从根节点开始处理每一层
        Node* leftmost = root;
        while (leftmost->left) {
            Node* head = leftmost;
            while (head) {
                // 将左子节点的 `next` 指向右子节点
                head->left->next = head->right;
                
                // 如果当前节点有下一个节点，将当前右子节点的 `next` 指向下一个节点的左子节点
                if (head->next) {
                    head->right->next = head->next->left;
                }
                
                // 遍历同层的下一个节点
                head = head->next;
            }
            // 移动到下一层
            leftmost = leftmost->left;
        }
        return root;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function Node(val, left, right, next) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
    this.next = (next===undefined ? null : next);
};

var connect = function(root) {
    if (!root) return null;
    
    // 处理以每层为单位的连接
    let leftmost = root;
    
    while (leftmost.left) {
        // 遍历当前层并连接下一层的节点
        let head = leftmost;
        while (head) {
            // 将左子节点的 `next` 指向右子节点
            head.left.next = head.right;
            
            // 如果当前节点有下一个，将当前右节点的 `next` 指向下一个节点的左节点
            if (head.next) {
                head.right.next = head.next.left;
            }
            
            // 移动到当前层的下一个节点
            head = head.next;
        }
        
        // 下移到下一层
        leftmost = leftmost.left;
    }
    
    return root;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Node {
    public int val;
    public Node left;
    public Node right;
    public Node next;
    
    public Node() {}
    
    public Node(int val) {
        this.val = val;
    }
    
    public Node(int val, Node left, Node right, Node next) {
        this.val = val;
        this.left = left;
        this.right = right;
        this.next = next;
    }
}

class Solution {
    public Node connect(Node root) {
        if (root == null) return null;
        
        // 从根节点开始
        Node leftmost = root;
        
        while (leftmost.left != null) {
            Node head = leftmost;
            while (head != null) {
                // 将左孩子的 `next` 指向右孩子
                head.left.next = head.right;
                
                // 如果当前节点有下一个，将当前右孩子的 `next` 指向下一个节点的左孩子
                if (head.next != null) {
                    head.right.next = head.next.left;
                }
                
                // 移动到当前层的下一个节点
                head = head.next;
            }
            // 移动到下一层的最左边结点
            leftmost = leftmost.left;
        }
        return root;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度**: $O(n)$，其中 $n$ 是树中节点的数量。我们每个节点都只访问常数次，因此时间复杂度为 $O(n)$。`    
    `
**空间复杂度**: $O(1)$，因为我们没有使用任何额外的存储空间（递归调用栈不算额外空间）。在每个节点的处理过程中，只使用有限的标志变量，因此空间复杂度为常数。
