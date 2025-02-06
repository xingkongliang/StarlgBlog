---
sidebar_position: 110
tags:
  - tree
  - depth-first-search
  - binary-search-tree
  - Easy
---

# 110.平衡二叉树

标签: `tree`, `depth-first-search`, `binary-search-tree`

难度: Easy

通过率: 54.06%

原题链接: https://leetcode.com/problems/balanced-binary-tree/description/

## 题目描述
给定一个二叉树，判断它是否是高度平衡的。

一个二叉树每个节点的左右两个子树的高度差的绝对值不超过1，该二叉树是高度平衡的。

## 解题思路
我们可以通过递归的方式来判断一个二叉树是否为平衡二叉树。具体地，我们希望对每个节点检查其左右子树的高度差是否不超过1。

下面是解题步骤：
1. 从根节点开始，对树进行后序遍历。后序遍历的好处是我们可以首先得到左右子树的高度，然后再进行平衡性检查。
2. 一个辅助函数`height`用于计算以当前节点为根的子树的高度，并且顺便检查其是否平衡。如果子树不平衡，则返回-1指示不平衡（高度不会是负数，所以可以用-1作为特殊标记）。
3. 如果左右子树任意一个不是平衡的（高度返回为-1），那么当前树必然不平衡。
4. 否则，如果左右子树的高度差不超过1，则返回子树的高度，即`max(左子树高度, 右子树高度) + 1`。
5. 初次调用height函数时，以整棵树的root作为参数。
6. 最后，根据`height`函数的返回值来判断整个树是否是平衡的。

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
    def isBalanced(self, root: TreeNode) -> bool:
        def height(node):
            # 空节点高度为0
            if not node:
                return 0

            # 计算左子树高度
            left_height = height(node.left)
            if left_height == -1:
                return -1

            # 计算右子树高度
            right_height = height(node.right)
            if right_height == -1:
                return -1

            # 如果当前节点不平衡，返回-1
            if abs(left_height - right_height) > 1:
                return -1

            # 返回当前节点的高度
            return max(left_height, right_height) + 1

        # 判断整棵树是否平衡
        return height(root) != -1
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
    bool isBalanced(TreeNode* root) {
        // 递归计算节点高度并检查平衡性
        return height(root) != -1;
    }

private:
    int height(TreeNode* node) {
        if (!node) return 0;

        // 计算左子树高度
        int leftHeight = height(node->left);
        if (leftHeight == -1) return -1;

        // 计算右子树高度
        int rightHeight = height(node->right);
        if (rightHeight == -1) return -1;

        // 检查当前节点是否平衡
        if (abs(leftHeight - rightHeight) > 1) return -1;

        // 返回当前节点的高度
        return max(leftHeight, rightHeight) + 1;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

var isBalanced = function(root) {
    const height = function(node) {
        if (!node) return 0;

        // 计算左子树高度
        let leftHeight = height(node.left);
        if (leftHeight == -1) return -1;

        // 计算右子树高度
        let rightHeight = height(node.right);
        if (rightHeight == -1) return -1;

        // 检查当前节点是否平衡
        if (Math.abs(leftHeight - rightHeight) > 1) return -1;

        // 返回当前节点的高度
        return Math.max(leftHeight, rightHeight) + 1;
    };

    // 检查树是否平衡
    return height(root) != -1;
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

public class Solution {
    public boolean isBalanced(TreeNode root) {
        return height(root) != -1;
    }

    private int height(TreeNode node) {
        if (node == null) return 0;

        // 计算左子树高度
        int leftHeight = height(node.left);
        if (leftHeight == -1) return -1;

        // 计算右子树高度
        int rightHeight = height(node.right);
        if (rightHeight == -1) return -1;

        // 检查当前节点是否平衡
        if (Math.abs(leftHeight - rightHeight) > 1) return -1;

        // 返回节点的高度
        return Math.max(leftHeight, rightHeight) + 1;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中$n$是二叉树的节点数量。我们需要访问每个节点一次。`
空间复杂度：$O(h)$，其中$h$是二叉树的高度。由于递归调用栈的深度取决于树的高度，本算法的空间复杂度受树的高度的影响。`
