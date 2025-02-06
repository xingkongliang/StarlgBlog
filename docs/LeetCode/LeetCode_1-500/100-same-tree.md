---
sidebar_position: 100
tags:
  - tree
  - depth-first-search
  - Easy
---

# 100.相同的树

标签: `tree`, `depth-first-search`

难度: Easy

通过率: 63.95%

原题链接: https://leetcode.com/problems/same-tree/description/

## 题目描述
给定两个二叉树的根节点 `p` 和 `q`，编写一个函数检查它们是否相同。两个二叉树被认为是相同的当且仅当它们在结构上是完全相同的，并且节点具有相同的值。

## 解题思路
要判断两个二叉树是否相同，可以使用递归的方法。具体来说，对于每一个节点，我们需要检查以下条件：

1. 如果两个节点都为空，则说明在结构上相同。
2. 如果两个节点之一为空而另一个不为空，则说明结构不同。
3. 如果两个节点的值不同，则说明节点值不同。
4. 递归检查两个节点的左子树和右子树。

如果以上条件都满足，则说明两棵树相同。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

def isSameTree(p: TreeNode, q: TreeNode) -> bool:
    # 如果两个节点都为空，说明在该位置处结构相同
    if not p and not q:
        return True
    # 如果一个节点为空而另一个不为空，说明结构不同
    if not p or not q:
        return False
    # 如果两个节点的值不同，说明节点值不同
    if p.val != q.val:
        return False
    # 递归检查左右子树
    return isSameTree(p.left, q.left) and isSameTree(p.right, q.right)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// Definition for a binary tree node.
// struct TreeNode {
//     int val;
//     TreeNode *left;
//     TreeNode *right;
//     TreeNode() : val(0), left(nullptr), right(nullptr) {}
//     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
//     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
// };

bool isSameTree(TreeNode* p, TreeNode* q) {
    // 如果两个节点都为空，说明在该位置处结构相同
    if (!p && !q) return true;
    // 如果一个节点为空而另一个不为空，说明结构不同
    if (!p || !q) return false;
    // 如果两个节点的值不同，说明节点值不同
    if (p->val != q->val) return false;
    // 递归检查左右子树
    return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// Definition for a binary tree node.
// class TreeNode {
//     constructor(val=0, left=null, right=null) {
//         this.val = val;
//         this.left = left;
//         this.right = right;
//     }
// }

var isSameTree = function(p, q) {
    // 如果两个节点都为空，说明在该位置处结构相同
    if (!p && !q) return true;
    // 如果一个节点为空而另一个不为空，说明结构不同
    if (!p || !q) return false;
    // 如果两个节点的值不同，说明节点值不同
    if (p.val !== q.val) return false;
    // 递归检查左右子树
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Definition for a binary tree node.
// public class TreeNode {
//     int val;
//     TreeNode left;
//     TreeNode right;
//     TreeNode() {}
//     TreeNode(int val) { this.val = val; }
//     TreeNode(int val, TreeNode left, TreeNode right) {
//         this.val = val;
//         this.left = left;
//         this.right = right;
//     }
// }

class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        // 如果两个节点都为空，说明在该位置处结构相同
        if (p == null && q == null) return true;
        // 如果一个节点为空而另一个不为空，说明结构不同
        if (p == null || q == null) return false;
        // 如果两个节点的值不同，说明节点值不同
        if (p.val != q.val) return false;
        // 递归检查左右子树
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是两棵树中节点的总数。在最坏情况下（两棵树完全相同），算法需要访问每一个节点。  
空间复杂度：$O(h)$，其中 $h$ 是树的高度。在递归过程中，需要为递归函数调用栈保留存储空间。
