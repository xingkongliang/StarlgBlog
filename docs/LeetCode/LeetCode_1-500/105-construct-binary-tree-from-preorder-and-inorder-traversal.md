---
sidebar_position: 105
tags:
  - tree
  - array
  - divide-and-conquer
  - binary-search-tree
  - Medium
---

# 105.从前序与中序遍历序列构造二叉树

标签: `tree`, `array`, `divide-and-conquer`, `binary-search-tree`

难度: Medium

通过率: 65.6%

原题链接: https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/

## 题目描述
给定两个整数数组 `preorder` 和 `inorder` ，其中 `preorder` 是二叉树的前序遍历序列， `inorder` 是同一棵树的中序遍历序列，请构造并返回这颗二叉树。

## 解题思路

给定二叉树的前序遍历（preorder）和中序遍历（inorder），需要构造该二叉树。
1.	理解前序遍历和中序遍历的特点：
    - 前序遍历：根 -> 左子树 -> 右子树。第一个元素是根节点。
	- 中序遍历：左子树 -> 根 -> 右子树。根节点分隔左、右子树。
2.	构造二叉树的基本思想：
	- 利用前序遍历的第一个元素确定根节点。
	- 在中序遍历中找到该根节点，根节点左边的元素是左子树，右边的元素是右子树。
	- 递归地对左子树和右子树构造子树。
3.	算法步骤：
	- 如果前序遍历或中序遍历为空，返回空。
	- 从前序遍历取第一个元素作为当前根节点。
	- 在中序遍历中找到该根节点的位置，将中序序列分为左、右子树。
	- 根据左子树的节点数量，分割前序遍历为左、右子树的前序序列。
	- 递归构造左子树和右子树。


## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
from typing import List, Optional

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
        if not preorder or not inorder:
            return None

        # 根节点的值是前序遍历的第一个元素
        root_val = preorder[0]
        root = TreeNode(root_val)

        # 在中序遍历中找到根节点的位置
        root_index = inorder.index(root_val)

        # 左子树的中序遍历
        left_inorder = inorder[:root_index]
        # 右子树的中序遍历
        right_inorder = inorder[root_index + 1:]

        # 左子树的前序遍历
        left_preorder = preorder[1:1 + len(left_inorder)]
        # 右子树的前序遍历
        right_preorder = preorder[1 + len(left_inorder):]

        # 递归构造左子树和右子树
        root.left = self.buildTree(left_preorder, left_inorder)
        root.right = self.buildTree(right_preorder, right_inorder)

        return root
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++ 版本的二叉树节点类定义
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution {
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        // 使用哈希表来保存中序值和对应索引
        unordered_map<int, int> inorderMap;
        for (int i = 0; i < inorder.size(); ++i) {
            inorderMap[inorder[i]] = i;
        }
        return buildSubTree(preorder, 0, preorder.size()-1, inorder, 0, inorder.size()-1, inorderMap);
    }

private:
    TreeNode* buildSubTree(vector<int>& preorder, int preLeft, int preRight, 
                           vector<int>& inorder, int inLeft, int inRight,
                           unordered_map<int, int>& inorderMap) {
        if (preLeft > preRight) return nullptr;

        int rootVal = preorder[preLeft];
        TreeNode* root = new TreeNode(rootVal);

        int inRootIndex = inorderMap[rootVal];
        int leftTreeSize = inRootIndex - inLeft;

        // 构建左子树
        root->left = buildSubTree(preorder, preLeft + 1, preLeft + leftTreeSize, 
                                  inorder, inLeft, inRootIndex - 1, inorderMap);
        // 构建右子树
        root->right = buildSubTree(preorder, preLeft + leftTreeSize + 1, preRight, 
                                   inorder, inRootIndex + 1, inRight, inorderMap);

        return root;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        // 连续映射中序值到索引
        Map<Integer, Integer> inorderMap = new HashMap<>();
        for (int i = 0; i < inorder.length; i++) {
            inorderMap.put(inorder[i], i);
        }
        return buildSubTree(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1, inorderMap);
    }

    private TreeNode buildSubTree(int[] preorder, int preLeft, int preRight, 
                                  int[] inorder, int inLeft, int inRight,
                                  Map<Integer, Integer> inorderMap) {
        if (preLeft > preRight) return null;

        int rootVal = preorder[preLeft];
        TreeNode root = new TreeNode(rootVal);

        int inRootIndex = inorderMap.get(rootVal);
        int leftTreeSize = inRootIndex - inLeft;

        // 构建左子树
        root.left = buildSubTree(preorder, preLeft + 1, preLeft + leftTreeSize, 
                                 inorder, inLeft, inRootIndex - 1, inorderMap);
        // 构建右子树
        root.right = buildSubTree(preorder, preLeft + leftTreeSize + 1, preRight, 
                                  inorder, inRootIndex + 1, inRight, inorderMap);

        return root;
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
/**
 * 二叉树节点类定义
 * @param {number} val
 * @param {TreeNode} left
 * @param {TreeNode} right
 */
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
    const inorderMap = new Map();
    for (let i = 0; i < inorder.length; i++) {
        inorderMap.set(inorder[i], i);
    }

    const buildSubTree = function(preLeft, preRight, inLeft, inRight) {
        if (preLeft > preRight) return null;

        const rootVal = preorder[preLeft];
        const root = new TreeNode(rootVal);

        const inRootIndex = inorderMap.get(rootVal);
        const leftTreeSize = inRootIndex - inLeft;

        root.left = buildSubTree(preLeft + 1, preLeft + leftTreeSize, inLeft, inRootIndex - 1);
        root.right = buildSubTree(preLeft + leftTreeSize + 1, preRight, inRootIndex + 1, inRight);

        return root;
    }

    return buildSubTree(0, preorder.length - 1, 0, inorder.length - 1);
};
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(n)$，其中 $n$ 是树节点的数量。每个节点被访问一次。
- 空间复杂度：$O(n)$，用于递归栈和存储中序序列索引的哈希表。
