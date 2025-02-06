---
sidebar_position: 114
tags:
  - tree
  - depth-first-search
  - Medium
---

# 114.展开二叉树为链表

标签: `tree`, `depth-first-search`

难度: Medium

通过率: 67.1%

原题链接: https://leetcode.com/problems/flatten-binary-tree-to-linked-list/description/

## 题目描述
给定一个二叉树的根节点，将其展平成一个“链表”：

- 这个“链表”应当使用与二叉树相同的树节点类，其中右孩子指针指向链表中的下一个节点，而左孩子指针永远为 null。
- “链表”的节点顺序应与二叉树的先序遍历顺序相同。

示例 1：

输入：root = [1,2,5,3,4,null,6]
输出：[1,null,2,null,3,null,4,null,5,null,6]

示例 2：

输入：root = []
输出：[]

示例 3：

输入：root = [0]
输出：[0]


进阶：你能否仅使用 $O(1)$ 的额外空间展开这棵树吗？

## 解题思路
要将二叉树展平为链表，我们要将树的节点按先序遍历的顺序，用右孩子指针连接起来，而每个节点的左孩子指针要置空。我们可以使用前序遍历的方法按序来重新调整每个节点的左右指针。

一种有效的方式是使用“逆后序遍历”（从右到左的后序遍历），这样每经过一个节点可以随时把之前已遍历的节点（即链表中的下一个节点）连接到当前节点的右子树上。

具体步骤如下：

1. 从根节点开始。
2. 记录右节点指针到 `next` 变量中。
3. 将左节点移到右节点位置，然后将左节点设置为 null。
4. 递归处理处理新右节点；
5. 递归处理原右节点（保存在 `next` 指针中的）。

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

def flatten(root):
    # 定义一个指针记录前一个遍历的节点
    prev = None
    
    def helper(node):
        nonlocal prev
        if not node:
            return
        # 先访问右子树
        helper(node.right)
        # 访问左子树
        helper(node.left)
        # 当前节点的右指针指向 prev 节点
        node.right = prev
        # 左节点设为 None
        node.left = None
        # 更新 prev 节点为当前节点
        prev = node
    # 从根节点开始转换
    helper(root)
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
    void flatten(TreeNode* root) {
        TreeNode* prev = nullptr;
        helper(root, prev);
    }

private:
    void helper(TreeNode* node, TreeNode*& prev) {
        if (!node) return;
        helper(node->right, prev);
        helper(node->left, prev);
        node->right = prev;
        node->left = nullptr;
        prev = node;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

function flatten(root) {
    let prev = null;
    function helper(node) {
        if (!node) return;
        helper(node.right);
        helper(node.left);
        node.right = prev;
        node.left = null;
        prev = node;
    }
    helper(root);
}
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
    private TreeNode prev = null;
    public void flatten(TreeNode root) {
        if (root == null) return;
        flatten(root.right);
        flatten(root.left);
        root.right = prev;
        root.left = null;
        prev = root;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中$n$是二叉树的节点数量，因为每个节点都需要被访问一次。`
`空间复杂度：$O(1)$，使用了反向前序遍历，在原地修改，空间复杂度为常数级别。
