---
sidebar_position: 104
tags:
  - tree
  - depth-first-search
  - breadth-first-search
  - Easy
---

# 104.二叉树的最大深度

标签: `tree`, `depth-first-search`, `breadth-first-search`

难度: Easy

通过率: 76.47%

原题链接: https://leetcode.com/problems/maximum-depth-of-binary-tree/description/

## 题目描述
给定一个二叉树的根节点，返回其最大深度。二叉树的最大深度是从根节点到最远叶子节点路径上的节点总数。

## 解题思路
要找出二叉树的最大深度，可以通过递归的方法，使用深度优先搜索（DFS）。方法是：
- 对于每个节点，首先计算其左子树的最大深度，然后计算其右子树的最大深度。
- 当前节点的最大深度则是其左右子树最大深度的较大值加一。

这种方法也可以通过广度优先搜索（BFS）进行，若使用BFS，则需要利用队列逐层遍历树，每遍历一层，深度加一。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

def maxDepth(root):
    # 如果当前节点为空，则返回深度为0
    if not root:
        return 0

    # 递归计算左子树的最大深度
    left_depth = maxDepth(root.left)
    # 递归计算右子树的最大深度
    right_depth = maxDepth(root.right)

    # 当前节点的最大深度为左右子树最大深度的较大值加1
    return max(left_depth, right_depth) + 1
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class TreeNode {
public:
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    int maxDepth(TreeNode* root) {
        // 如果节点为空，则返回深度0
        if (!root) {
            return 0;
        }
        // 递归计算左子树和右子树的最大深度
        int left_depth = maxDepth(root->left);
        int right_depth = maxDepth(root->right);
        // 当前节点的深度为其左右子树深度的最大值加1
        return max(left_depth, right_depth) + 1;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

var maxDepth = function(root) {
    // 如果节点为空，则返回深度0
    if (!root) return 0;
    
    // 递归计算左子树的深度
    let leftDepth = maxDepth(root.left);
    // 递归计算右子树的深度
    let rightDepth = maxDepth(root.right);
    
    // 返回当前节点的深度
    return Math.max(leftDepth, rightDepth) + 1;
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
    public int maxDepth(TreeNode root) {
        // 如果当前节点为空，则返回深度为0
        if (root == null)
            return 0;

        // 递归计算左子树的最大深度
        int leftDepth = maxDepth(root.left);
        // 递归计算右子树的最大深度
        int rightDepth = maxDepth(root.right);

        // 当前节点的最大深度为左右子树最大深度的较大值加1
        return Math.max(leftDepth, rightDepth) + 1;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是二叉树中的节点个数，因为每个节点都遍历一次。`
`空间复杂度：$O(h)$，其中 $h$ 是二叉树的高度，因为递归调用使用的栈空间取决于树的高度。
