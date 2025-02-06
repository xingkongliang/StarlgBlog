---
sidebar_position: 236
tags:
  - tree
  - depth-first-search
  - Medium
---

# 236.二叉树的最近公共祖先

标签: `tree`, `depth-first-search`

难度: Medium

通过率: 64.85%

原题链接: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/description/

## 题目描述
给定一棵二叉树，找到两个指定节点的最近公共祖先（LCA）。根据维基百科中LCA的定义：“最近公共祖先是两节点在树中最低的公共祖先节点（节点允许作为其后代）。”

## 解题思路

题目要求找到二叉树中两个节点的最低公共祖先（LCA）。可以用递归的方法来解决这个问题。

1. **基本思路：**
   - 如果当前节点是 `None`，返回 `None`。
   - 如果当前节点等于 `p` 或 `q`，那么当前节点就是最低公共祖先。
   - 对左右子树递归查找：
     - 如果左右子树的递归结果都不为 `None`，说明 `p` 和 `q` 分别位于当前节点的两侧，当前节点就是最低公共祖先。
     - 如果左右子树中只有一个递归结果不为 `None`，则说明最低公共祖先在另一侧。

2. **递归函数逻辑：**
   - 如果当前节点是 `p` 或 `q`，直接返回当前节点。
   - 递归搜索左子树和右子树。
   - 根据左右子树返回值判断是否找到最低公共祖先。

---

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        # 如果当前节点为空，返回 None
        if not root:
            return None
        
        # 如果当前节点是 p 或 q，返回当前节点
        if root == p or root == q:
            return root
        
        # 递归搜索左子树和右子树
        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)
        
        # 如果左右子树都有返回值，说明当前节点是最低公共祖先
        if left and right:
            return root
        
        # 如果只有一侧有返回值，返回那一侧
        return left if left else right
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
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
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        // 如果找到p或q就返回
        if (!root || root == p || root == q)
            return root;
        
        // 递归查找左子树和右子树
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        
        // 如果左边和右边都有值，说明当前节点是LCA
        if (left && right)
            return root;
        
        // 否则，返回非空子树中的LCA
        return left ? left : right;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    // 如果找到p或q就返回
    if (!root || root === p || root === q) {
        return root;
    }
    
    // 递归查找左子树和右子树
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);
    
    // 如果左边和右边都有值，说明当前节点是LCA
    if (left && right) {
        return root;
    }
    
    // 否则，返回非空子树中的LCA
    return left ? left : right;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
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
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        // 如果找到p或q就返回
        if (root == null || root == p || root == q) {
            return root;
        }
        
        // 递归查找左子树和右子树
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        
        // 如果左边和右边都有值，说明当前节点是LCA
        if (left != null && right != null) {
            return root;
        }
        
        // 否则，返回非空子树中的LCA
        return left != null ? left : right;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中$n$是树中的节点数量。递归遍历每个节点一次。  
  
空间复杂度：$O(n)$，用于递归堆栈。当树为平衡树时，递归深度为 $O(	ext{log}n)$，最坏情况下递归深度为 $O(n)$。

这段代码可以解决通用二叉树的最低公共祖先问题，而不仅限于二叉搜索树。