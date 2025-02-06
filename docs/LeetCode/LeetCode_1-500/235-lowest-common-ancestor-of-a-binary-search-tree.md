---
sidebar_position: 235
tags:
  - tree
  - binary-search-tree
  - depth-first-search
  - Medium
---

# 235.二叉搜索树的最近公共祖先

标签: `tree`, `binary-search-tree`, `depth-first-search`

难度: Medium

通过率: 66.79%

原题链接: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/description/

## 题目描述
给定一个二叉搜索树（BST），找到其中两个给定节点的最近公共祖先（LCA）。根据维基百科中的定义：“两个节点 p 和 q 的最近公共祖先是能够同时通过子树拥有 p 和 q 作为后代的最低节点（我们允许一个节点是它自己的后代）。”

## 解题思路
在二叉搜索树中，通过性质：左子树所有节点的值小于根节点值，右子树所有节点的值大于根节点值。我们可以从根节点出发，比较当前节点与 p 和 q 的值关系。如果当前节点的值大于 p 和 q 的值，说明它在公共祖先的右边，我们需要往左子树继续找；反之，如果当前节点的值小于 p 和 q 的值，说明它在公共祖先的左边，我们需要往右子树继续找；当当前节点的值介于 p 和 q 之间时，或者当前节点等于其中之一，则说明当前节点是公共祖先。

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

def lowestCommonAncestor(root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
    # 遍历树，寻找LCA
    current = root
    while current:
        # 如果当前节点的值大于p和q的值，往左走
        if p.val < current.val and q.val < current.val:
            current = current.left
        # 如果当前节点的值小于p和q的值，往右走
        elif p.val > current.val and q.val > current.val:
            current = current.right
        else:
            # 找到LCA
            return current

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class TreeNode {
public:
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        TreeNode* current = root;
        // 遍历直到找到LCA
        while (current) {
            if (p->val < current->val && q->val < current->val)
                current = current->left;
            else if (p->val > current->val && q->val > current->val)
                current = current->right;
            else
                return current;
        }
        return nullptr;
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

var lowestCommonAncestor = function(root, p, q) {
    let current = root;
    while (current) {
        if (p.val < current.val && q.val < current.val) {
            current = current.left;
        } else if (p.val > current.val && q.val > current.val) {
            current = current.right;
        } else {
            return current;
        }
    }
};

```

</TabItem>
<TabItem value="java" label="Java">

```java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        TreeNode current = root;
        while (current != null) {
            if (p.val < current.val && q.val < current.val)
                current = current.left;
            else if (p.val > current.val && q.val > current.val)
                current = current.right;
            else
                return current;
        }
        return null;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(h)$，其中 $h$ 是二叉搜索树的高度。在最坏情况下，这个复杂度可能为 $O(n)$，其中 $n$ 是节点的数量（例如，当没有平衡的树时）。  
  
空间复杂度为 $O(1)$，因为我们使用了迭代而不是递归，没有额外的递归调用栈开销。
