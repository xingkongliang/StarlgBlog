---
sidebar_position: 98
tags:
  - tree
  - depth-first-search
  - binary-search-tree
  - Medium
---

# 98.验证二叉搜索树

标签: `tree`, `depth-first-search`, `binary-search-tree`

难度: Medium

通过率: 33.72%

原题链接: https://leetcode.com/problems/validate-binary-search-tree/description/

## 题目描述
给定一个二叉树的根节点，判断其是否为有效的二叉搜索树。有效的二叉搜索树定义如下：
- 节点的左子树只包含小于当前节点的数。
- 节点的右子树只包含大于当前节点的数。
- 所有左子树和右子树自身必须也是二叉搜索树。

## 解题思路
判断一棵树是否为二叉搜索树（BST）的关键在于对每个节点，判断其值是否在它所属范围内。对于二叉搜索树来说，每个节点的值应该大于其所有左子节点的值，同时小于其所有右子节点的值。因此，我们可以通过递归地检查每个节点的值是否在一个有效范围内来确认一个二叉树是否为BST。

具体思路如下：
1. 我们递归地遍历每个节点，在检查每个节点时，我们会带入当前节点所允许的值的范围。
2. 对于根节点，它的值在 $(-\infty, +\infty)$ 的范围内。
3. 对于每个左子节点，它的值应该在 $(-\infty, \text{当前节点的值})$ 的范围内。
4. 对于每个右子节点，它的值应该在 $(\text{当前节点的值}, +\infty)$ 的范围内。
5. 如果在某一个节点这个规则被打破，则树不是BST。
6. 如果我们检查完整个树都没有出问题，说明这是一个合法的BST。

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
    def isValidBST(self, root: TreeNode) -> bool:
        def validate(node, low=-float('inf'), high=float('inf')):
            # 空节点是合法的BST
            if not node:
                return True
            # 节点值不在合法范围内
            if node.val <= low or node.val >= high:
                return False
            # 递归验证左右子树
            return (validate(node.left, low, node.val) and
                    validate(node.right, node.val, high))
        return validate(root)
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
    bool isValidBST(TreeNode* root) {
        return validate(root, LONG_MIN, LONG_MAX);
    }
    
private:
    bool validate(TreeNode* node, long low, long high) {
        // 空节点是合法的BST
        if (!node) return true;
        // 节点值不在合法范围内
        if (node->val <= low || node->val >= high) return false;
        // 递归验证左右子树
        return validate(node->left, low, node->val) && 
               validate(node->right, node->val, high);
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

const isValidBST = function(root) {
    const validate = function(node, low = -Infinity, high = Infinity) {
        // 空节点是合法的BST
        if (!node) return true;
        // 节点值不在合法范围内
        if (node.val <= low || node.val >= high) return false;
        // 递归验证左右子树
        return validate(node.left, low, node.val) &&
               validate(node.right, node.val, high);
    };
    return validate(root);
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
    public boolean isValidBST(TreeNode root) {
        return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    
    private boolean validate(TreeNode node, long low, long high) {
        // 空节点是合法的BST
        if (node == null) return true;
        // 节点值不在合法范围内
        if (node.val <= low || node.val >= high) return false;
        // 递归验证左右子树
        return validate(node.left, low, node.val) &&
               validate(node.right, node.val, high);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(n)$，其中 $n$ 是二叉树中节点的个数，因为我们需要遍历每一个节点。
- 空间复杂度：$O(n)$，在最坏的情况下（例如完全不平衡树），需要保留递归栈的深度是 $n$。
