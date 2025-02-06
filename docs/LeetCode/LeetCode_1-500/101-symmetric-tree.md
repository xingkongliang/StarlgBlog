---
sidebar_position: 101
tags:
  - tree
  - depth-first-search
  - breadth-first-search
  - Easy
---

# 101.对称二叉树

标签: `tree`, `depth-first-search`, `breadth-first-search`

难度: Easy

通过率: 58.14%

原题链接: https://leetcode.com/problems/symmetric-tree/description/

## 题目描述
给定一个二叉树的根节点，检查它是否是轴对称的。

**示例 1:**

输入: root = [1,2,2,3,4,4,3]
输出: true

**示例 2:**

输入: root = [1,2,2,null,3,null,3]
输出: false

**注意:**

- 节点数的范围是 [1, 1000]。
- 节点值的范围是 [-100, 100]。

**进阶:** 你可以使用递归和迭代两种方法解决这个问题吗？

## 解题思路
要检查给定的二叉树是否是轴对称的，可以使用递归和迭代两种方法。主要思想是检查二叉树左子树和右子树是否是镜像关系。

1. **递归方法：**
   - 定义一个辅助函数用于检查两个树是否镜像。
   - 基本情况：
     - 如果两个子树都为空，返回 `true`。
     - 如果只有一个为空，返回 `false`。
     - 如果两个子树的根节点值不相等，返回 `false`。
   - 如果上述情况都不符合，递归检查左子树的左孩子是否等于右子树的右孩子，同时左子树的右孩子是否等于右子树的左孩子。
   
2. **迭代方法（使用队列）：**
   - 使用队列（或栈）同时遍历树的左子树和右子树。
   - 每次从队列中取出两个节点检查它们是否相等：
     - 如果两个节点都为空，继续。
     - 如果其中一个为空或者值不相等，返回 `false`。
   - 如果节点匹配，继续将它们的子节点以镜像顺序加入队列。

最终，如果我们遍历完整个树且没有发现不对称的情况，则该树是对称的。

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
    def isSymmetric(self, root: TreeNode) -> bool:
        def isMirror(left: TreeNode, right: TreeNode) -> bool:
            if not left and not right:
                return True
            if not left or not right:
                return False
            if left.val != right.val:
                return False
            # 递归检查：外侧和内侧
            return isMirror(left.left, right.right) and isMirror(left.right, right.left)
        
        # 初始调用检查根节点左右子树是否是镜像
        return isMirror(root.left, root.right)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// 二叉树的结构体
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        return isMirror(root, root);
    }
    
    bool isMirror(TreeNode* t1, TreeNode* t2) {
        if (t1 == NULL && t2 == NULL) return true;
        if (t1 == NULL || t2 == NULL) return false;
        if (t1->val != t2->val) return false;
        return isMirror(t1->right, t2->left) && isMirror(t1->left, t2->right);
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function isSymmetric(root) {
    if (!root) return true;

    // 辅助函数检查是否镜像
    const isMirror = (left, right) => {
        if (!left && !right) return true;
        if (!left || !right) return false;
        if (left.val !== right.val) return false;
        return isMirror(left.left, right.right) && isMirror(left.right, right.left);
    };

    return isMirror(root.left, root.right);
}
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
    public boolean isSymmetric(TreeNode root) {
        if (root == null) return true;
        return isMirror(root.left, root.right);
    }
    
    private boolean isMirror(TreeNode left, TreeNode right) {
        if (left == null && right == null) return true;
        if (left == null || right == null) return false;
        return (left.val == right.val)
               && isMirror(left.left, right.right)
               && isMirror(left.right, right.left);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是二叉树中节点的个数。每个节点在递归或迭代过程中都被访问一次。`
空间复杂度：递归方法为 $O(h)$，迭代方法为 $O(n)$。其中 $h$ 是树的高度，而 $n$ 是迭代过程中最坏情况下队列/栈的大小。
