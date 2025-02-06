---
sidebar_position: 117
tags:
  - tree
  - breadth-first-search
  - depth-first-search
  - Medium
---

# 117.填充每个节点的下一个右侧节点指针 II

标签: `tree`, `breadth-first-search`, `depth-first-search`

难度: Medium

通过率: 54.26%

原题链接: https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/description/

## 题目描述
给定一个二叉树，将每个节点的 `next` 指针填充到其下一个右侧节点。如果没有下一个右侧节点，则将 `next` 指针设置为 NULL。最初所有的 `next` 指针都被设置为 NULL。

## 解题思路
为了填充每个节点的下一个右侧节点的指针，我们可以使用层次遍历的方法，这种方法可以用广度优先搜索实现。

1. 初始化一个变量 `current` 指向根节点。我们需要一个外层循环遍历每一层节点，并在内层循环中遍历当前层的每个节点。
2. 对于每层的节点，通过 `next` 指针找到所有节点，使用一个额外的指针 `dummy` 作为新的下一层的起始。
3. 遍历当前层使用 `next` 指针。在遍历过程中，链接下一层的所有节点。即，把当前节点的左子节点和右子节点用 `next` 链接起来。
4. 调整 `current` 指向下一层的起始节点，继续进行步骤2和3。

伪代码如下：

- 初始化 `current` 为根节点。
- 循环直到 `current` 为 NULL：
  - 初始化 `dummy` 节点作为连结节点。
  - 使用变量 `tail` 指向 `dummy`。
  - 遍历 `current` 所有的节点：
    - 如果节点有左子节点，让 `tail.next = current.left` 然后移动 `tail`。
    - 如果节点有右子节点，让 `tail.next = current.right` 然后移动 `tail`。
  - 更新 `current` 指向 `dummy.next`（这一层的开始节点）。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class Solution:  
    def connect(self, root: 'Optional[Node]') -> 'Optional[Node]':
        if not root:
            return root

        # 从根开始，逐层连接
        current = root
        while current:
            dummy = Node(0)  # 用dummy来起头
            tail = dummy
            # 遍历当前层
            while current:
                if current.left:
                    tail.next = current.left  # 链接左子节点
                    tail = tail.next             # 继续移动 tail
                if current.right:
                    tail.next = current.right # 链接右子节点
                    tail = tail.next            # 继续移动 tail
                current = current.next          # 移动至下一个节点
            # 移动至下一层，dummy.next是新的起点
            current = dummy.next
        return root

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
    public Node connect(Node root) {
        if (root == null) {
            return root;
        }
        
        // 从根节点开始
        Node current = root;
        while (current != null) {
            Node dummy = new Node(0);
            Node tail = dummy;

            // 遍历当前层的所有节点
            while (current != null) {
                if (current.left != null) {
                    tail.next = current.left;  // 链接左子节点
                    tail = tail.next;
                }
                if (current.right != null) {
                    tail.next = current.right; // 链接右子节点
                    tail = tail.next;
                }
                current = current.next;  // 移动至下一个节点
            }
            // 移至下一层
            current = dummy.next;
        }
        return root;
    }
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function connect(root) {
    if (root === null) {
        return root;
    }

    // 开始从根节点
    let current = root;
    while (current !== null) {
        let dummy = new Node(0);
        let tail = dummy;

        // 遍历该层
        while (current !== null) {
            if (current.left !== null) {
                tail.next = current.left;  // 链接左子节点
                tail = tail.next;
            }
            if (current.right !== null) {
                tail.next = current.right; // 链接右子节点
                tail = tail.next;
            }
            current = current.next; // 移动到下一个
        }
        // 继续到下一层
        current = dummy.next;
    }
    return root;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public Node connect(Node root) {
        if (root == null) {
            return root;
        }

        // 从顶层开始
        Node current = root;
        while (current != null) {
            Node dummy = new Node(0);
            Node tail = dummy;

            // 遍历当前层中的所有节点
            while (current != null) {
                if (current.left != null) {
                    tail.next = current.left; // 左子节点
                    tail = tail.next;
                }
                if (current.right != null) {
                    tail.next = current.right; // 右子节点
                    tail = tail.next;
                }
                current = current.next; // 下一节点
            }
            // 转移到下层
            current = dummy.next;
        }
        return root;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度 $O(n)$，其中 $n$ 是树中节点的数量，因为每个节点都被访问一次。  
空间复杂度 $O(1)$，不计算递归栈空间，额外的空间使用是常数级的。
