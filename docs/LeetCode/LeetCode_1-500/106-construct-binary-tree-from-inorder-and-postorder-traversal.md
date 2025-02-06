---
sidebar_position: 106
tags:
  - tree
  - array
  - depth-first-search
  - Medium
---

# 106.从中序与后序遍历序列构造二叉树

标签: `tree`, `array`, `depth-first-search`

难度: Medium

通过率: 65.01%

原题链接: https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/

## 题目描述
给定两个整数数组 inorder 和 postorder，其中 inorder 是二叉树的中序遍历，postorder 是同一棵树的后序遍历，请构造并返回这棵二叉树。

## 解题思路
根据中序遍历和后序遍历构造二叉树的基本思路是利用后序遍历的特点，因为在后序遍历中，根节点是最后一个访问的节点。

1. 从后序遍历数组中取出最后一个元素，因为后序遍历的最后一个元素就是树的根节点。
2. 在中序遍历数组中找到这个根节点，以此分割出左右子树。根节点左边的元素都是左子树的节点，右边的元素都是右子树的节点。
3. 重复上述步骤递归构造左子树和右子树。

通过递归和分治法，我们可以有效地重建整棵二叉树。对于递归的终止条件，当子数组中没有元素时，返回null。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def buildTree(self, inorder: List[int], postorder: List[int]) -> TreeNode:
        if not inorder or not postorder:
            return None

        # 从后序遍历中获取根节点的值
        root_val = postorder.pop()
        root = TreeNode(root_val)

        # 在中序遍历中找到根节点的位置
        root_index = inorder.index(root_val)

        # 构造右子树（注意后序遍历要先构造右子树）
        root.right = self.buildTree(inorder[root_index + 1:], postorder)
        # 构造左子树
        root.left = self.buildTree(inorder[:root_index], postorder)

        return root
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++解法
#include <vector>
#include <unordered_map>
using namespace std;

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
    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        if (inorder.empty() || postorder.empty()) return nullptr;

        int root_val = postorder.back();
        postorder.pop_back();

        TreeNode* root = new TreeNode(root_val);
        auto it = find(inorder.begin(), inorder.end(), root_val);
        int index = it - inorder.begin();

        // 先构造右子树，再构造左子树
        vector<int> rightInorder(it + 1, inorder.end());
        root->right = buildTree(rightInorder, postorder);

        vector<int> leftInorder(inorder.begin(), it);
        root->left = buildTree(leftInorder, postorder);

        return root;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript解法
var buildTree = function(inorder, postorder) {
    if (inorder.length === 0 || postorder.length === 0) return null;

    // 从后序遍历中获取根节点的值
    const root_val = postorder.pop();
    const root = new TreeNode(root_val);

    // 在中序遍历中找到根节点的位置
    const root_index = inorder.indexOf(root_val);

    // 构造右子树
    root.right = buildTree(inorder.slice(root_index + 1), postorder);
    // 构造左子树
    root.left = buildTree(inorder.slice(0, root_index), postorder);

    return root;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java 解法
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;

    TreeNode(int val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class Solution {
    public TreeNode buildTree(int[] inorder, int[] postorder) {
        if (inorder.length == 0 || postorder.length == 0) return null;

        // 从后序遍历中获取根节点的值
        int root_val = postorder[postorder.length - 1];
        TreeNode root = new TreeNode(root_val);

        // 从inorder数组中找到根节点的位置
        int root_index = 0;
        for (int i = 0; i < inorder.length; i++) {
            if (inorder[i] == root_val) {
                root_index = i;
                break;
            }
        }

        // 递归地构造右子树
        root.right = buildTree(
            Arrays.copyOfRange(inorder, root_index + 1, inorder.length),
            Arrays.copyOfRange(postorder, root_index, postorder.length - 1)
        );

        // 递归地构造左子树
        root.left = buildTree(
            Arrays.copyOfRange(inorder, 0, root_index),
            Arrays.copyOfRange(postorder, 0, root_index)
        );

        return root;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n^2)$，其中 $n$ 是树中节点的个数。在最坏情况下，每次迭代中我们需要遍历数组来找到根节点。`
空间复杂度：$O(n)$，用于存储递归调用栈的数据。
