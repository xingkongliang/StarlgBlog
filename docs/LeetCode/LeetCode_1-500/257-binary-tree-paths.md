---
sidebar_position: 257
tags:
  - tree
  - depth-first-search
  - backtracking
  - Easy
---

# 257.二叉树路径

标签: `tree`, `depth-first-search`, `backtracking`

难度: Easy

通过率: 65.31%

原题链接: https://leetcode.com/problems/binary-tree-paths/description/

## 题目描述
给定一个二叉树的根节点，返回所有从根节点到叶子节点的路径。``一个叶子节点是指没有子节点的节点。

## 解题思路
我们可以使用深度优先搜索（DFS）来遍历整个二叉树，并记录下从根节点到当前节点的路径。一旦我们到达叶子节点，就将路径保存到结果中。我们可以使用递归来实现这一过程。在递归过程中，从根节点开始，逐步构建路径并往下传递，如果遇到叶子节点，就将完整路径保存。为了避免重复工作，构建路径时使用字符串拼接的方式。

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

def binaryTreePaths(root: TreeNode) -> List[str]:
    def construct_paths(node, path):
        if node:
            # 将当前节点添加到路径中
            path += str(node.val)
            if not node.left and not node.right:  # 当前是叶子节点
                paths.append(path)  # 将完整路径添加到结果中
            else:
                path += "->"  # 添加路径分隔符
                # 递归构建左右子树的路径
                construct_paths(node.left, path)
                construct_paths(node.right, path)

    paths = []
    construct_paths(root, "")  # 从根节点开始构建路径
    return paths
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// Definition for a binary tree node.
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution {
public:
    vector<string> binaryTreePaths(TreeNode* root) {
        vector<string> paths;
        if (!root) return paths;
        construct_paths(root, "", paths);
        return paths;
    }
    
private:
    void construct_paths(TreeNode* node, string path, vector<string>& paths) {
        if (node) {
            path += to_string(node->val);
            if (!node->left && !node->right) {
                paths.push_back(path);  // 当前是叶子节点，添加路径到结果中
            } else {
                path += "->";  // 添加路径分隔符
                construct_paths(node->left, path, paths);  // 递归左子树
                construct_paths(node->right, path, paths);  // 递归右子树
            }
        }
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
    const paths = [];

    const construct_paths = (node, path) => {
        if (node !== null) {
            path += node.val;
            if (node.left === null && node.right === null) {  // 当前是叶子节点
                paths.push(path);  // 添加路径到结果中
            } else {
                path += '->';  // 添加路径分隔符
                construct_paths(node.left, path);  // 递归左子树
                construct_paths(node.right, path);  // 递归右子树
            }
        }
    };

    construct_paths(root, '');
    return paths;
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
 *     TreeNode(int x) { val = x; }
 * }
 */

class Solution {
    public List<String> binaryTreePaths(TreeNode root) {
        List<String> paths = new ArrayList<>();
        if (root != null) {
            construct_paths(root, "", paths);
        }
        return paths;
    }

    private void construct_paths(TreeNode node, String path, List<String> paths) {
        if (node != null) {
            path += Integer.toString(node.val);
            if (node.left == null && node.right == null) {
                paths.add(path);  // 当前是叶子节点
            } else {
                path += "->";  // 添加路径分隔符
                construct_paths(node.left, path, paths);  // 递归左子树
                construct_paths(node.right, path, paths);  // 递归右子树
            }
        }
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(N)$，其中$N$是二叉树中的节点数量。每个节点只需要访问一次。  
  
空间复杂度：$O(N)$，这是递归调用栈的空间消耗，相当于二叉树最大深度。
