---
sidebar_position: 1
tags:
  - tree
---

# 二叉树（Binary Tree）

## 1. 介绍

二叉树（Binary Tree）是计算机科学中一种重要的数据结构，它具有以下特点：

1. **结构特点**：
   - 二叉树是树形结构的一种，其中每个节点最多有两个子节点。
   - 子节点分为**左子节点（Left Child）**和**右子节点（Right Child）**。
   - 二叉树的最上面的节点称为**根节点（Root）**，没有子节点的节点称为**叶节点（Leaf Node）**。

2. **基本术语**：
   - **节点（Node）**：树中的每个元素。
   - **根节点（Root）**：树的起始节点。
   - **叶子节点（Leaf）**：没有子节点的节点。
   - **高度（Height）**：从根节点到最远叶子节点的最长路径。
   - **深度（Depth）**：从根节点到某节点的路径长度。
     
3. **分类**：
   - **满二叉树**：每一层的节点都达到了最大值（除了叶子节点外，每个节点都有两个子节点）。
   - **完全二叉树**：除最后一层外，其余各层都是满的，并且最后一层的节点从左到右依次排列。
   - **二叉搜索树（Binary Search Tree, BST）**：对于每个节点，其左子树的所有节点值小于该节点值，其右子树的所有节点值大于该节点值。
   - **平衡二叉树**：一种特殊的二叉搜索树，任何节点的左右子树高度差不超过1，如AVL树和红黑树。

4. **遍历方式**：
   - **前序遍历（Preorder Traversal）**：根节点 -> 左子树 -> 右子树。
   - **中序遍历（Inorder Traversal）**：左子树 -> 根节点 -> 右子树。（二叉搜索树的中序遍历结果是有序的）
   - **后序遍历（Postorder Traversal）**：左子树 -> 右子树 -> 根节点。
   - **层次遍历（Level-order Traversal）**：按层从上到下，从左到右依次遍历。



## 2. 二叉树操作的 Python 示例及说明

### **1. 二叉树的节点定义**
```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
```

---

### **2. 构造二叉树**
从列表构造二叉树（LeetCode 常用输入格式）。

```python
from collections import deque

def build_tree(values):
    """
    从列表构造二叉树
    :param values: List[int]，树的层序遍历表示（空节点用 None 表示）
    :return: TreeNode，构造的二叉树的根节点
    """
    if not values:
        return None
    root = TreeNode(values[0])
    queue = deque([root])
    i = 1
    while queue and i < len(values):
        node = queue.popleft()
        if values[i] is not None:
            node.left = TreeNode(values[i])
            queue.append(node.left)
        i += 1
        if i < len(values) and values[i] is not None:
            node.right = TreeNode(values[i])
            queue.append(node.right)
        i += 1
    return root
```

---

### **3. 二叉树的遍历**

**3.1 前序遍历（Preorder Traversal）**
```python
def preorder_traversal(root):
    """
    前序遍历：根 -> 左 -> 右
    :param root: TreeNode
    :return: List[int]，前序遍历结果
    """
    result = []
    def dfs(node):
        if not node:
            return
        result.append(node.val)
        dfs(node.left)
        dfs(node.right)
    dfs(root)
    return result
```

**3.2 中序遍历（Inorder Traversal）**
```python
def inorder_traversal(root):
    """
    中序遍历：左 -> 根 -> 右
    :param root: TreeNode
    :return: List[int]，中序遍历结果
    """
    result = []
    def dfs(node):
        if not node:
            return
        dfs(node.left)
        result.append(node.val)
        dfs(node.right)
    dfs(root)
    return result
```

**3.3 后序遍历（Postorder Traversal）**
```python
def postorder_traversal(root):
    """
    后序遍历：左 -> 右 -> 根
    :param root: TreeNode
    :return: List[int]，后序遍历结果
    """
    result = []
    def dfs(node):
        if not node:
            return
        dfs(node.left)
        dfs(node.right)
        result.append(node.val)
    dfs(root)
    return result
```

**3.4 层序遍历（Level Order Traversal）**
```python
from collections import deque

def level_order_traversal(root):
    """
    层序遍历：逐层从左到右
    :param root: TreeNode
    :return: List[List[int]]，层序遍历结果
    """
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result
```

---

### **4. 判断二叉树属性**

**4.1 判断是否是对称二叉树**
```python
def is_symmetric(root):
    """
    判断二叉树是否对称
    :param root: TreeNode
    :return: bool
    """
    if not root:
        return True

    def is_mirror(t1, t2):
        if not t1 and not t2:
            return True
        if not t1 or not t2:
            return False
        return t1.val == t2.val and is_mirror(t1.left, t2.right) and is_mirror(t1.right, t2.left)

    return is_mirror(root.left, root.right)
```

**4.2 判断二叉树是否是二叉搜索树**
```python
def is_valid_bst(root):
    """
    判断二叉树是否为二叉搜索树
    :param root: TreeNode
    :return: bool
    """
    def helper(node, lower=float('-inf'), upper=float('inf')):
        if not node:
            return True
        val = node.val
        if val <= lower or val >= upper:
            return False
        return helper(node.left, lower, val) and helper(node.right, val, upper)

    return helper(root)
```

---

### **5. 二叉树的深度和高度**

**5.1 计算二叉树的最大深度**
```python
def max_depth(root):
    """
    计算二叉树的最大深度
    :param root: TreeNode
    :return: int
    """
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))
```

**5.2 判断是否为平衡二叉树**
```python
def is_balanced(root):
    """
    判断二叉树是否平衡
    :param root: TreeNode
    :return: bool
    """
    def height(node):
        if not node:
            return 0
        left_height = height(node.left)
        right_height = height(node.right)
        if abs(left_height - right_height) > 1:
            raise ValueError("Unbalanced")
        return 1 + max(left_height, right_height)
    
    try:
        height(root)
        return True
    except ValueError:
        return False
```

---

这些代码涵盖了 LeetCode 中常见的二叉树问题所需的基本操作和技巧，可根据具体题目需求进行调整和扩展。