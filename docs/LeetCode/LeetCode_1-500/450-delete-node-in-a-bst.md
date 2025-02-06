---
sidebar_position: 450
tags:
  - tree
  - binary-search-tree
  - Medium
---

# 450.删除二叉搜索树中的节点

标签: `tree`, `binary-search-tree`

难度: Medium

通过率: 52.31%

原题链接: https://leetcode.com/problems/delete-node-in-a-bst/description/

## 题目描述
给定一个二叉搜索树的根节点和一个键值，删除键值对应的节点并返回更新后的二叉搜索树的根节点。如果没有找到键值对应的节点，不做任何改变并返回原来的根节点。

## 解题思路
要在二叉搜索树（BST）中删除一个节点，可以按照以下步骤进行：
1. **寻找节点**：首先在树中搜索该节点。如果节点的值小于键值，则在右子树中查找；如果大于键值，则在左子树中查找。

2. **删除节点**：当找到该节点时，有三种可能情况：
   - **叶子节点**：直接删除。
   - **只有一个孩子的节点**：将该节点删除，并让其唯一的孩子替代它的位置。
   - **有两个孩子的节点**：找到该节点的中序后继（或者中序前驱），用这个节点的值替换当前节点的值，然后删除中序后继（或前驱）。

特别注意到，当删除有两个孩子的节点时，中序后继是其右子树中值最小的节点，而中序前驱是其左子树中值最大的节点。这两个节点都至多只有一个孩子，因此删除它们相对简单。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def deleteNode(self, root: TreeNode, key: int) -> TreeNode:
        if not root:
            return None
        
        # 找到要删除的节点
        if key < root.val:
            root.left = self.deleteNode(root.left, key)
        elif key > root.val:
            root.right = self.deleteNode(root.right, key)
        else:
            # 节点值等于key，删除此节点
            if not root.left:
                return root.right
            if not root.right:
                return root.left
            
            # 取右子树中的最小节点替换
            min_larger_node = self.getMin(root.right)
            root.val = min_larger_node.val
            root.right = self.deleteNode(root.right, min_larger_node.val)
        return root

    def getMin(self, node):
        while node.left:
            node = node.left
        return node
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution {
public:
    TreeNode* deleteNode(TreeNode* root, int key) {
        if (!root) return nullptr;
        
        // 找到要删除的节点
        if (key < root->val) {
            root->left = deleteNode(root->left, key);
        } else if (key > root->val) {
            root->right = deleteNode(root->right, key);
        } else {
            // 节点值等于key，删除此节点
            if (!root->left) return root->right;
            if (!root->right) return root->left;

            // 取右子树中的最小节点替换
            TreeNode* minLargerNode = getMin(root->right);
            root->val = minLargerNode->val;
            root->right = deleteNode(root->right, minLargerNode->val);
        }
        return root;
    }

private:
    TreeNode* getMin(TreeNode* node) {
        while (node->left)
            node = node->left;
        return node;
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    deleteNode(root, key) {
        if (!root) return null;

        // 找到要删除的节点
        if (key < root.val) {
            root.left = this.deleteNode(root.left, key);
        } else if (key > root.val) {
            root.right = this.deleteNode(root.right, key);
        } else {
            // 节点值等于key，删除此节点
            if (!root.left) return root.right;
            if (!root.right) return root.left;

            // 取右子树中的最小节点替换
            let minLargerNode = this.getMin(root.right);
            root.val = minLargerNode.val;
            root.right = this.deleteNode(root.right, minLargerNode.val);
        }
        return root;
    }

    getMin(node) {
        while (node.left)
            node = node.left;
        return node;
    }
}

```

</TabItem>
<TabItem value="java" label="Java">

```java
public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

class Solution {
    public TreeNode deleteNode(TreeNode root, int key) {
        if (root == null) return null;

        // 找到要删除的节点
        if (key < root.val) {
            root.left = deleteNode(root.left, key);
        } else if (key > root.val) {
            root.right = deleteNode(root.right, key);
        } else {
            // 节点值等于key，删除此节点
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;

            // 取右子树中的最小节点替换
            TreeNode minLargerNode = getMin(root.right);
            root.val = minLargerNode.val;
            root.right = deleteNode(root.right, minLargerNode.val);
        }
        return root;
    }

    private TreeNode getMin(TreeNode node) {
        while (node.left != null)
            node = node.left;
        return node;
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(h)$，其中 $h$ 是树的高度。在平均情况下，搜索和删除的过程都是按照树的高度进行的。此时，对于一个平衡树，高度是 $\log n$，而在最坏情况下（退化成链表），高度是 $n$。 
  
空间复杂度为 $O(h)$，递归调用栈的深度同样取决于树的高度。
