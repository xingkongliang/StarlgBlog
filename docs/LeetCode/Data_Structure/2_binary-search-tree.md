---
sidebar_position: 2
tags:
  - tree
---
# 二叉搜索树（Binary Search Tree）

### 什么是 Binary Search Tree (BST)?

![Binary_search_tree](./assets/Binary_search_tree.svg)

二叉搜索树 (Binary Search Tree, 简称 BST) 是一种二叉树，其特点是节点按一定的顺序排列，便于快速查找、插入和删除。具体定义如下：

- 每个节点有一个值。
- 对于每个节点，其左子树中的所有节点值都小于该节点的值。
- 对于每个节点，其右子树中的所有节点值都大于该节点的值。
- 每个子树本身也是一个二叉搜索树。

### BST 的特性

1. **有序性**：通过中序遍历 (in-order traversal) 可以得到从小到大的排序结果。
2. **动态性**：BST 可以随时插入或删除节点，并保持其结构的正确性。
3. **高效性**：在理想情况下（树是平衡的），查找、插入和删除的时间复杂度为 $O(\log n)$。

### 性能

BST 的性能依赖于树的高度：
- 平衡 BST（如 AVL 树或红黑树）的高度为 $O(\log n)$，操作性能良好。
- 如果输入数据有序，普通 BST 可能会退化成链表，操作时间复杂度变为 $O(n)$。

### 应用

1. **动态集合操作**：如查找、插入、删除等。
2. **排序**：通过中序遍历得到有序序列。
3. **实现符号表**：在编译器、数据库等场景中存储和查找键值对。
4. **范围查询**：快速找到值在某个范围内的所有节点。

### 总结

二叉搜索树是一种高效的数据结构，适用于动态数据集的管理。然而，普通 BST 在数据不均匀分布时可能会退化，因此在实际应用中，常结合平衡技术（如红黑树、AVL 树）以提升性能。

---

## 二叉搜索树的操作

在 **LeetCode** 中，涉及 **Binary Search Tree (BST)** 的题目主要围绕查找、插入、删除、遍历，以及与树结构相关的高级应用。这些题目可以帮助理解和练习 BST 的基本操作及优化方法。以下是相关操作和典型题目分类：

---

### 1. **查找操作**

#### 核心思路：
- 从根节点开始，根据值的大小决定递归进入左子树或右子树。
- 如果找到值则返回对应节点或 `True`，未找到则返回 `False`。

#### 示例题目：
- **LeetCode 700: Search in a Binary Search Tree**
  - **描述**：在 BST 中查找值等于 `target` 的节点，返回该节点的子树。
  - **代码**：
    ```python
    def searchBST(root, val):
        if not root or root.val == val:
            return root
        return searchBST(root.left, val) if val < root.val else searchBST(root.right, val)
    ```

---

### 2. **插入操作**

#### 核心思路：
- 从根节点开始，递归找到适当位置插入新节点，同时保持 BST 的有序性。

#### 示例题目：
- **LeetCode 701: Insert into a Binary Search Tree**
  - **描述**：向 BST 中插入一个新的值，返回修改后的树。
  - **代码**：
    ```python
    def insertIntoBST(root, val):
        if not root:
            return TreeNode(val)
        if val < root.val:
            root.left = insertIntoBST(root.left, val)
        else:
            root.right = insertIntoBST(root.right, val)
        return root
    ```

---

### 3. **删除操作**

#### 核心思路：
删除一个节点时，需要处理以下几种情况：
1. 节点为叶子节点，直接删除。
2. 节点只有一个子节点，用子节点代替当前节点。
3. 节点有两个子节点，用**中序后继**或**中序前驱**替代当前节点的值，然后删除该替代节点。

#### 示例题目：
- **LeetCode 450: Delete Node in a BST**
  - **描述**：删除 BST 中指定的节点，返回修改后的树。
  - **代码**：
    ```python
    def deleteNode(root, key):
        if not root:
            return None
        if key < root.val:
            root.left = deleteNode(root.left, key)
        elif key > root.val:
            root.right = deleteNode(root.right, key)
        else:
            if not root.left:
                return root.right
            if not root.right:
                return root.left
            # Find in-order successor
            successor = root.right
            while successor.left:
                successor = successor.left
            root.val = successor.val
            root.right = deleteNode(root.right, successor.val)
        return root
    ```

---

### 4. **遍历操作**

BST 遍历通常涉及：
1. **中序遍历**：按升序排列输出所有节点。
2. **前序遍历**：在构建树或序列化时常用。
3. **后序遍历**：在删除操作中可能有用。

#### 示例题目：
- **LeetCode 94: Binary Tree Inorder Traversal**
  - **描述**：返回树的中序遍历。
  - **代码**：
    ```python
    def inorderTraversal(root):
        return inorderTraversal(root.left) + [root.val] + inorderTraversal(root.right) if root else []
    ```

---

### 5. **验证 BST**

#### 核心思路：
通过递归检查每个节点是否满足 BST 的性质：左子树的最大值 < 当前节点 < 右子树的最小值。

#### 示例题目：
- **LeetCode 98: Validate Binary Search Tree**
  - **描述**：判断一棵树是否是 BST。
  - **代码**：
    ```python
    def isValidBST(root, low=float('-inf'), high=float('inf')):
        if not root:
            return True
        if not (low < root.val < high):
            return False
        return isValidBST(root.left, low, root.val) and isValidBST(root.right, root.val, high)
    ```

---

### 6. **查找 Kth Smallest/Largest 元素**

#### 核心思路：
利用中序遍历可以得到有序的节点列表，从中直接定位第 K 小/大的元素。

#### 示例题目：
- **LeetCode 230: Kth Smallest Element in a BST**
  - **描述**：返回 BST 中第 K 小的元素。
  - **代码**：
    ```python
    def kthSmallest(root, k):
        stack = []
        while True:
            while root:
                stack.append(root)
                root = root.left
            root = stack.pop()
            k -= 1
            if k == 0:
                return root.val
            root = root.right
    ```

---

### 7. **最近公共祖先 (LCA)**

#### 核心思路：
在 BST 中，最近公共祖先是两个节点路径上最后一个分叉点。

#### 示例题目：
- **LeetCode 235: Lowest Common Ancestor of a Binary Search Tree**
  - **描述**：找到两个节点的最近公共祖先。
  - **代码**：
    ```python
    def lowestCommonAncestor(root, p, q):
        if root.val > p.val and root.val > q.val:
            return lowestCommonAncestor(root.left, p, q)
        elif root.val < p.val and root.val < q.val:
            return lowestCommonAncestor(root.right, p, q)
        return root
    ```

---

### 8. **范围查询**

#### 核心思路：
递归遍历节点时，只处理值在范围内的节点。

#### 示例题目：
- **LeetCode 938: Range Sum of BST**
  - **描述**：计算 BST 中所有值在 `[low, high]` 范围内的节点值之和。
  - **代码**：
    ```python
    def rangeSumBST(root, low, high):
        if not root:
            return 0
        if root.val < low:
            return rangeSumBST(root.right, low, high)
        elif root.val > high:
            return rangeSumBST(root.left, low, high)
        return root.val + rangeSumBST(root.left, low, high) + rangeSumBST(root.right, low, high)
    ```

---

### 9. **构建树**

#### 示例题目：
- **LeetCode 108: Convert Sorted Array to Binary Search Tree**
  - **描述**：将有序数组转换为高度平衡的 BST。
  - **代码**：
    ```python
    def sortedArrayToBST(nums):
        if not nums:
            return None
        mid = len(nums) // 2
        root = TreeNode(nums[mid])
        root.left = sortedArrayToBST(nums[:mid])
        root.right = sortedArrayToBST(nums[mid+1:])
        return root
    ```

---

### 总结

在 LeetCode 中，BST 的操作题目涵盖了：
- 基础操作：查找、插入、删除。
- 辅助功能：验证 BST、查找第 K 小值、最近公共祖先等。
- 高级应用：范围查询、构建树、平衡树操作。

通过练习这些题目，可以深入理解 BST 的性质及其高效操作。