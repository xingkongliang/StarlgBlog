---
sidebar_position: 222
tags:
  - tree
  - binary-search
  - depth-first-search
  - Easy
---

# 222.计算完全二叉树的节点数

标签: `tree`, `binary-search`, `depth-first-search`

难度: Easy

通过率: 68.18%

原题链接: https://leetcode.com/problems/count-complete-tree-nodes/description/

## 题目描述
给定一棵完全二叉树的根节点，返回树中节点的数量。

## 解题思路
完全二叉树的特性是除了最后一层，其余层都是满的且最后一层的节点靠左排列。由于完全二叉树这样特殊的性质，使得在一些子树中递归计算节点数可以更有效。步骤如下：

1. 首先，计算左子树和右子树的高度。如果左右子树高度相同，则左子树是满的，可以通过公式直接计算节点数：$2^h - 1$，再加上根节点即为左子树的所有节点数。

2. 如果左右高度不同，说明右子树是个满的二叉树，高度为右子树高，再递归地计算左子树的节点数。这种情况则反过来计算右子树的节点数。

3. 通过递归上述步骤，最终我们可以在 $O(\log^2 n)$ 时间复杂度以内计算出整个二叉树节点的总数。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def countNodes(self, root: TreeNode) -> int:
        # 计算完全二叉树的高度
        def getHeight(node):
            if not node:
                return 0
            return 1 + getHeight(node.left)
        
        if not root:
            return 0

        left_height = getHeight(root.left)
        right_height = getHeight(root.right)

        if left_height == right_height:
            # 左子树是满的，直接计算，它有 2^left_height - 1 个节点，加上根节点
            return (1 << left_height) + self.countNodes(root.right)
        else:
            # 右子树是满的，直接计算，它有 2^right_height - 1 个节点，加上根节点
            return (1 << right_height) + self.countNodes(root.left)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// Definition for a binary tree node.
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    int countNodes(TreeNode* root) {
        // 计算完全二叉树的高度
        auto getHeight = [](TreeNode* node) {
            int height = 0;
            while (node) {
                height++;
                node = node->left;
            }
            return height;
        };

        if (!root) return 0;

        int left_height = getHeight(root->left);
        int right_height = getHeight(root->right);

        if (left_height == right_height) {
            // 左子树是满的，直接计算，它有 2^left_height - 1 个节点，加上根节点
            return (1 << left_height) + countNodes(root->right);
        } else {
            // 右子树是满的，直接计算，它有 2^right_height - 1 个节点，加上根节点
            return (1 << right_height) + countNodes(root->left);
        }
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// Definition for a binary tree node.
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function(root) {
    // 计算完全二叉树的高度
    const getHeight = (node) => {
        if (!node) return 0;
        return 1 + getHeight(node.left);
    };

    if (!root) return 0;

    const leftHeight = getHeight(root.left);
    const rightHeight = getHeight(root.right);

    if (leftHeight === rightHeight) {
        // 左子树是满的，直接计算，它有 2^left_height - 1 个节点，加上根节点
        return (1 << leftHeight) + countNodes(root.right);
    } else {
        // 右子树是满的，直接计算，它有 2^right_height - 1 个节点，加上根节点
        return (1 << rightHeight) + countNodes(root.left);
    }
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Definition for a binary tree node.
public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    public int countNodes(TreeNode root) {
        // 计算完全二叉树的高度
        int getHeight(TreeNode node) {
            if (node == null) return 0;
            return 1 + getHeight(node.left);
        }

        if (root == null) return 0;

        int leftHeight = getHeight(root.left);
        int rightHeight = getHeight(root.right);

        if (leftHeight == rightHeight) {
            // 左子树是满的，直接计算，它有 2^left_height - 1 个节点，加上根节点
            return (1 << leftHeight) + countNodes(root.right);
        } else {
            // 右子树是满的，直接计算，它有 2^right_height - 1 个节点，加上根节点
            return (1 << rightHeight) + countNodes(root.left);
        }
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(\log^2 n)$，这是因为每次递归调用都涉及树的高度的计算，而完全二叉树的高度是 $O(\log n)$，且递归调用可以在 $O(\log n)$ 内完成。  
  
空间复杂度：$O(\log n)$，主要是递归调用使用的堆栈空间与树的高度相关。
