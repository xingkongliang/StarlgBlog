---
sidebar_position: 94
tags:
  - binary-search-tree
  - tree
  - stack
  - depth-first-search
  - Easy
---

# 94.二叉树的中序遍历

标签: `binary-search-tree`, `tree`, `stack`, `depth-first-search`

难度: Easy

通过率: 77.57%

原题链接: https://leetcode.com/problems/binary-tree-inorder-traversal/description/

## 题目描述
给定一个二叉树的根节点，返回它的节点值的中序遍历。

## 解题思路
中序遍历要求按照左节点 -> 根节点 -> 右节点的顺序进行遍历。一般情况下可以用递归实现，但题目要求我们尝试用迭代的方法实现。`\n`### 递归方法`\n`1. 如果当前节点为空，直接返回`\n`2. 否则，按照以下顺序进行递归：`\n`   * 递归遍历左子树`\n`   * 返回根节点的值`\n`   * 递归遍历右子树`\n`### 迭代方法（使用栈）`\n`1. 创建一个空栈和一个存储返回结果的列表`\n`2. 将当前节点设置为根节点`\n`3. 当栈不为空或者当前节点不为空时，重复以下步骤：`\n`   * 如果当前节点不为空：`\n`     - 将当前节点压入栈`\n`     - 移动当前节点到其左子节点`\n`   * 如果当前节点为空：`\n`     - 从栈中弹出一个节点`\n`     - 将该节点值添加到结果列表中`\n`     - 将当前节点设置为该节点的右子节点`\n`4. 最后返回结果列表。`\n`这种方法可以实现在线性时间复杂度内完成中序遍历，并且只用了我们期待的树高度的空间复杂度。

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
    def inorderTraversal(self, root: TreeNode) -> List[int]:
        res = []
        stack = []
        current = root
        while current is not None or stack:
            # Reach the left most Node of the current Node
            while current is not None:
                # Place pointer to a tree node on the stack before traversing the node's left subtree
                stack.append(current)
                current = current.left

            # Current must be None at this point
            current = stack.pop()
            res.append(current.val)  # Add the node's value to the result list

            # We have visited the node and its left subtree. Now, it's right subtree's turn
            current = current.right

        return res
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> res;
        stack<TreeNode*> stack;
        TreeNode* current = root;
        while (current != nullptr || !stack.empty()) {
            // Reach the left most Node of the current Node
            while (current != nullptr) {
                stack.push(current);
                current = current->left;
            }
            current = stack.top();
            stack.pop();
            res.push_back(current->val);
            current = current->right;
        }
        return res;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    const res = [];
    const stack = [];
    let current = root;
    while (current !== null || stack.length > 0) {
        // Reach the left most Node of the current Node
        while (current !== null) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        res.push(current.val);
        current = current.right;
    }
    return res;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
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
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode current = root;
        while (current != null || !stack.isEmpty()) {
            // Reach the left most Node of the current Node
            while (current != null) {
                stack.push(current);
                current = current.left;
            }
            current = stack.pop();
            res.add(current.val);
            current = current.right;
        }
        return res;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中$n$是二叉树中的节点数。每个节点恰好被遍历一次。`\n`空间复杂度：$O(h)$，其中$h$是树的高度。由于使用了栈，最糟糕情况下需要存储$h$个节点。
