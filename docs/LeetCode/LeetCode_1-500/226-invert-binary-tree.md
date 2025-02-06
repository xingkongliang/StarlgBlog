---
sidebar_position: 226
tags:
  - tree
  - depth-first-search
  - breadth-first-search
  - Easy
---

# 226.翻转二叉树

标签: `tree`, `depth-first-search`, `breadth-first-search`

难度: Easy

通过率: 78.25%

原题链接: https://leetcode.com/problems/invert-binary-tree/description/

## 题目描述
给定一个二叉树的根节点，翻转这棵树，并返回它的根节点。示例中，输入树通过层序遍历的形式给出。

## 解题思路
翻转二叉树可以通过递归或迭代的方法实现。基本思想是对于每一个节点，我们交换其左子树和右子树的位置，递归地进行这个操作直到处理完所有节点。递归过程如下：

1. 从根节点开始，如果节点为空，直接返回。
2. 交换当前节点的左右子树。
3. 递归地调用翻转函数处理新的左子树和新的右子树。
4. 当所有节点都处理完后，返回新的树的根节点。

迭代的方法可以使用广度优先搜索（BFS）或深度优先搜索（DFS）来实现翻转操作，使用队列或栈来帮助遍历节点。

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
    def invertTree(self, root: TreeNode) -> TreeNode:
        if not root:
            return None
        # 交换左右子树
        root.left, root.right = root.right, root.left
        # 递归地翻转左右子树
        self.invertTree(root.left)
        self.invertTree(root.right)
        return root
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
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        // 交换左右子树
        TreeNode* temp = root->left;
        root->left = root->right;
        root->right = temp;
        // 递归地翻转左右子树
        invertTree(root->left);
        invertTree(root->right);
        return root;
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

var invertTree = function(root) {
    if (!root) return null;
    // 交换左右子树
    [root.left, root.right] = [root.right, root.left];
    // 递归地翻转左右子树
    invertTree(root.left);
    invertTree(root.right);
    return root;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
class TreeNode {
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
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        // 交换左右子树
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;
        // 递归地翻转左右子树
        invertTree(root.left);
        invertTree(root.right);
        return root;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 是二叉树中节点的数量，因为我们需要访问每个节点一次。  
  
空间复杂度为 $O(h)$，其中 $h$ 是二叉树的高度，这是递归调用栈的最大深度。对于完全平衡的二叉树，$h = \log n$，而在最坏情况下（如一个链状树），$h = n$。
