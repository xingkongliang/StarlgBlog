---
sidebar_position: 230
tags:
  - tree
  - binary-search-tree
  - depth-first-search
  - Medium
---

# 230.二叉搜索树中第K小的元素

标签: `tree`, `binary-search-tree`, `depth-first-search`

难度: Medium

通过率: 74.23%

原题链接: https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/

## 题目描述
给定一个二叉搜索树的根节点和一个整数k，返回树中第k小的节点值（1索引数）。

## 解题思路
在二叉搜索树（BST）中，中序遍历将节点按升序排列。因为树的特性，左子树的所有节点值总是小于根节点，右子树的所有节点值大于根节点。通过对这棵树执行中序遍历，我们可以得到所有节点值的有序排列，然后选择第k个最小的值即可。具体步骤如下：

1. 初始化一个空列表用于存储中序遍历的结果。
2. 定义一个递归函数，用于对树进行中序遍历：
   - 如果当前节点为空，返回。
   - 递归遍历左子树。
   - 将当前节点值添加到结果列表中。
   - 递归遍历右子树。
3. 对根节点调用这个递归函数，得到中序遍历的结果列表。
4. 返回结果列表中的第k-1个元素（因为列表是0索引，而k是1索引）。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# Python 代码实现
# 定义树节点
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# 定义函数来找出BST中第k小的元素
def kthSmallest(root: TreeNode, k: int) -> int:
    # 中序遍历的结果
elements = []

    # 内部函数用于中序遍历
    def inorder(node):
        if node is None:
            return
        # 遍历左子树
        inorder(node.left)
        # 记录当前节点
        elements.append(node.val)
        # 遍历右子树
        inorder(node.right)

    # 执行中序遍历
    inorder(root)
    # 返回中序遍历结果中的第k-1个元素
    return elements[k-1]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++ 代码实现
// 定义树节点
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution {
public:
    int kthSmallest(TreeNode* root, int k) {
        // 用于存储中序遍历结果的列表
        vector<int> elements;
        // 内部函数进行中序遍历
        inorder(root, elements);
        // 返回第k-1个最小的元素
        return elements[k-1];
    }

private:
    void inorder(TreeNode* node, vector<int>& elements) {
        if (node == nullptr) return;
        // 遍历左子树
        inorder(node->left, elements);
        // 存储当前节点的值
        elements.push_back(node->val);
        // 遍历右子树
        inorder(node->right, elements);
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript 代码实现
// 定义树节点
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

// 找出BST中第k小的元素
var kthSmallest = function(root, k) {
    // 结果数组来存储中序遍历结果
    const elements = [];

    // 定义中序遍历递归函数
    const inorder = function(node) {
        if (!node) return;
        // 访问左子树
        inorder(node.left);
        // 存储当前节点
        elements.push(node.val);
        // 访问右子树
        inorder(node.right);
    };

    // 执行中序遍历
    inorder(root);
    // 返回结果数组中的第k-1个元素
    return elements[k-1];
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java 代码实现
// 定义树节点
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

class Solution {
    public int kthSmallest(TreeNode root, int k) {
        // 保存中序遍历结果的列表
        List<Integer> elements = new ArrayList<>();
        // 进行中序遍历
        inorder(root, elements);
        // 返回中序遍历结果中的第k-1个元素
        return elements.get(k - 1);
    }

    private void inorder(TreeNode node, List<Integer> elements) {
        if (node == null) return;
        // 遍历左子树
        inorder(node.left, elements);
        // 记录当前节点
        elements.add(node.val);
        // 遍历右子树
        inorder(node.right, elements);
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，因为在最坏情况下我们需要访问所有节点进行中序遍历。  
  
空间复杂度：$O(n)$，因为中序遍历结果需要包含所有节点的值，额外的递归栈空间在最坏情况下达到树的高度，即$O(n)$。
