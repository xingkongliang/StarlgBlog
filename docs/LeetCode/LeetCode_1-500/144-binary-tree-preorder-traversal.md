---
sidebar_position: 144
tags:
  - tree
  - depth-first-search
  - stack
  - Easy
---

# 144.二叉树的前序遍历

标签: `tree`, `depth-first-search`, `stack`

难度: Easy

通过率: 71.62%

原题链接: https://leetcode.com/problems/binary-tree-preorder-traversal/description/

## 题目描述
给定一个二叉树的根节点，返回它的节点值的前序遍历序列。

## 解题思路
前序遍历是一种深度优先搜索（DFS）的方式，按照根节点 -> 左子树 -> 右子树的顺序访问节点。实现前序遍历有两种主要方法：递归和迭代。递归实现较为直接，而迭代实现则常常使用栈来维护遍历的节点轨迹。下面是递归和迭代两种实现方法：

1. **递归方法：**
   - 递归方法非常直接，依次访问根节点，递归遍历左子树，然后递归遍历右子树。

2. **迭代方法：**
   - 使用栈来模拟递归过程。首先将根节点入栈，然后不断循环直到栈为空：
     - 从栈中弹出一个节点，记录它的值。
     - 如果该节点有右子节点，将右子节点入栈，因为右子节点需要在左子节点之后访问。
     - 如果该节点有左子节点，将左子节点入栈，因为左子节点会先于右子节点访问。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# Python 代码
# 定义二叉树的节点类
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# 递归版本的前序遍历
def preorderTraversal_recursive(root):
    def helper(node):
        if not node:
            return []
        # 访问根节点，再访问左子树，最后访问右子树
        return [node.val] + helper(node.left) + helper(node.right)
    return helper(root)

# 迭代版本的前序遍历
def preorderTraversal_iterative(root):
    if not root:
        return []

    stack, output = [root], []
    while stack:
        node = stack.pop()
        if node:
            output.append(node.val)  # 访问当前节点
            if node.right:
                stack.append(node.right)  # 右子节点入栈
            if node.left:
                stack.append(node.left)  # 左子节点入栈
    return output
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++ 代码
// 定义二叉树的节点类
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

// 递归版本的前序遍历
class Solution {
public:
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> result;
        helper(root, result);
        return result;
    }
    
private:
    void helper(TreeNode* node, vector<int> &result) {
        if (!node) return;
        result.push_back(node->val);  // 访问当前节点
        helper(node->left, result);   // 递归访问左子树
        helper(node->right, result);  // 递归访问右子树
    }
};

// 迭代版本的前序遍历
class IterativeSolution {
public:
    vector<int> preorderTraversal(TreeNode* root) {
        if (!root) return {};

        stack<TreeNode*> stack;
        vector<int> output;
        stack.push(root);

        while (!stack.empty()) {
            TreeNode* node = stack.top();
            stack.pop();
            output.push_back(node->val);  // 访问当前节点
            if (node->right) stack.push(node->right);  // 右子节点入栈
            if (node->left) stack.push(node->left);    // 左子节点入栈
        }

        return output;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript 代码
// 定义二叉树的节点类
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val);
    this.left = (left===undefined ? null : left);
    this.right = (right===undefined ? null : right);
}

// 递归版本的前序遍历
var preorderTraversal_recursive = function(root) {
    const result = [];
    function helper(node) {
        if (!node) return;
        result.push(node.val);  // 访问根节点
        helper(node.left);      // 递归访问左子树
        helper(node.right);     // 递归访问右子树
    }
    helper(root);
    return result;
};

// 迭代版本的前序遍历
var preorderTraversal_iterative = function(root) {
    const stack = [];
    const output = [];
    if (root) stack.push(root);

    while (stack.length) {
        const node = stack.pop();
        output.push(node.val);  // 访问当前节点
        if (node.right) stack.push(node.right);  // 右子节点入栈
        if (node.left) stack.push(node.left);    // 左子节点入栈
    }
    return output;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java 代码
// 定义二叉树的节点类
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

// 递归版本的前序遍历
class SolutionRecursive {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        helper(root, result);
        return result;
    }

    private void helper(TreeNode node, List<Integer> result) {
        if (node == null) return;
        result.add(node.val);  // 访问当前节点
        helper(node.left, result);   // 递归访问左子树
        helper(node.right, result);  // 递归访问右子树
    }
}

// 迭代版本的前序遍历
class SolutionIterative {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> output = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        if (root != null) stack.push(root);

        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            output.add(node.val);  // 访问当前节点
            if (node.right != null) stack.push(node.right);  // 右子节点入栈
            if (node.left != null) stack.push(node.left);    // 左子节点入栈
        }

        return output;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 递归方法的时间复杂度为 $O(n)$，其中 $n$ 是二叉树中的节点数。因为每个节点都访问一次。  

- 空间复杂度为 $O(n)$，主要由于递归栈的深度可能达到二叉树高度。

- 迭代方法的时间复杂度同样为 $O(n)$，每个节点都被访问一次。  

- 空间复杂度在最坏情况下仍为 $O(n)$，因为栈中最多可能存储所有节点。
