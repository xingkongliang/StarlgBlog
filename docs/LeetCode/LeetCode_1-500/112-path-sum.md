---
sidebar_position: 112
tags:
  - tree
  - depth-first-search
  - binary-search-tree
  - Easy
---

# 112.路径总和

标签: `tree`, `depth-first-search`, `binary-search-tree`

难度: Easy

通过率: 51.95%

原题链接: https://leetcode.com/problems/path-sum/description/

## 题目描述
给定一个二叉树的根节点和一个整数目标和，判断是否存在从根节点到叶子节点的路径，使得沿路径的所有节点值之和等于目标和。叶子节点是指没有子节点的节点。

## 解题思路
可以使用深度优先搜索来解决这个问题。我们从根节点开始进行递归搜索，每到一个节点，减去当前节点的值，然后递归地搜索其子节点。在搜索过程中，如果到达一个叶子节点时，剩余的值正好为零，则说明找到了满足条件的路径。具体步骤如下：

1. 从根节点开始，初始目标和为 `targetSum`。
2. 每到达一个节点，将当前节点的值从目标和中减去。
3. 如果当前节点是一个叶子节点，并且剩余的目标和为零，则返回 `true`。
4. 如果当前节点不是叶子节点，递归搜索其左子树（如果存在）和右子树（如果存在）。
5. 如果左右子树均返回 `false`，则当前路径不满足条件，返回 `false`。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# Python 的实现
# 定义二叉树节点
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def hasPathSum(self, root: TreeNode, targetSum: int) -> bool:
        # 如果树为空，返回 False
        if not root:
            return False
        
        # 如果当前是叶子节点，检查路径和是否满足条件
        if not root.left and not root.right:
            return targetSum == root.val
        
        # 递归检查左右子树
        return (self.hasPathSum(root.left, targetSum - root.val) or
                self.hasPathSum(root.right, targetSum - root.val))
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++ 的实现
// 定义二叉树节点
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
    bool hasPathSum(TreeNode* root, int targetSum) {
        // 如果树为空，返回 false
        if (!root)
            return false;
        
        // 如果当前是叶子节点，检查路径和是否满足条件
        if (!root->left && !root->right)
            return targetSum == root->val;
        
        // 递归检查左右子树
        return hasPathSum(root->left, targetSum - root->val) ||
               hasPathSum(root->right, targetSum - root->val);
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript 的实现
// 定义二叉树节点
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

var hasPathSum = function(root, targetSum) {
    // 如果树为空，返回 false
    if (!root) return false;
    
    // 如果当前是叶子节点，检查路径和是否满足条件
    if (!root.left && !root.right) {
        return targetSum === root.val;
    }
    
    // 递归检查左右子树
    return hasPathSum(root.left, targetSum - root.val) ||
           hasPathSum(root.right, targetSum - root.val);
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java 的实现
// 定义二叉树节点
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
    public boolean hasPathSum(TreeNode root, int targetSum) {
        // 如果树为空，返回 false
        if (root == null) return false;
        
        // 如果当前是叶子节点，检查路径和是否满足条件
        if (root.left == null && root.right == null) {
            return targetSum == root.val;
        }
        
        // 递归检查左右子树
        return hasPathSum(root.left, targetSum - root.val) ||
               hasPathSum(root.right, targetSum - root.val);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(N)$，其中 $N$ 是二叉树中的节点数。因为每个节点都可能被访问一次。  
空间复杂度：$O(h)$，其中 $h$ 是树的高度。在最坏的情况下（树是高度为 $N$ 的单链），需要 $O(N)$ 的空间用于递归调用栈。
