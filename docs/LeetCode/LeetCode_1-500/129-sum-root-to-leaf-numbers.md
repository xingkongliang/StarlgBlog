---
sidebar_position: 129
tags:
  - tree
  - depth-first-search
  - binary-search-tree
  - Medium
---

# 129.路径总和从根到叶

标签: `tree`, `depth-first-search`, `binary-search-tree`

难度: Medium

通过率: 67.37%

原题链接: https://leetcode.com/problems/sum-root-to-leaf-numbers/description/

## 题目描述
给定一个只包含数字0到9的二叉树，每条从根到叶的路径都代表一个数字。返回所有根到叶路径数字的总和。

## 解题思路

题目要求从根节点到叶子节点的所有路径组成的数字的和。我们可以使用**深度优先搜索（DFS）**或**广度优先搜索（BFS）**来遍历二叉树并计算路径和。

1. **递归（DFS）解法：**
   - 从根节点开始，沿着每条路径累加数字（注意数字的拼接是通过乘以10然后加上当前节点值）。
   - 当到达叶子节点时，将当前路径的数字累加到结果中。
   - 递归地对左右子树执行相同操作。

2. **迭代（BFS）解法：**
   - 使用队列存储节点和对应的路径和。
   - 每次从队列中取出一个节点，如果是叶子节点，就将其路径和累加到结果中。
   - 否则，将其左右子节点和对应的路径和加入队列。


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

# 1. 递归（DFS）解法
class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        def dfs(node, current_sum):
            if not node:
                return 0
            current_sum = current_sum * 10 + node.val
            # 如果是叶子节点，返回当前路径和
            if not node.left and not node.right:
                return current_sum
            # 否则递归左右子树
            return dfs(node.left, current_sum) + dfs(node.right, current_sum)
        
        return dfs(root, 0)


# 2. 迭代（BFS）解法
from collections import deque

class Solution:
    def sumNumbers(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        
        queue = deque([(root, root.val)])
        total_sum = 0
        
        while queue:
            node, current_sum = queue.popleft()
            # 如果是叶子节点，累加路径和
            if not node.left and not node.right:
                total_sum += current_sum
            # 否则将左右子节点加入队列
            if node.left:
                queue.append((node.left, current_sum * 10 + node.left.val))
            if node.right:
                queue.append((node.right, current_sum * 10 + node.right.val))
        
        return total_sum
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class TreeNode {
public:
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:
    int sumNumbers(TreeNode* root) {
        return dfs(root, 0);
    }

private:
    int dfs(TreeNode* node, int current_sum) {
        if (node == nullptr) return 0;

        // 更新当前路径的数字
        current_sum = current_sum * 10 + node->val;

        // 如果到达叶节点，返回当前完整的路径数字
        if (node->left == nullptr && node->right == nullptr) {
            return current_sum;
        }

        // 递归计算左子树和右子树的路径数字总和
        return dfs(node->left, current_sum) + dfs(node->right, current_sum);
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

var sumNumbers = function(root) {
    const dfs = (node, current_sum) => {
        if (!node) return 0;

        // 更新当前路径的数字
        current_sum = current_sum * 10 + node.val;

        // 如果到达叶节点，返回当前完整的路径数字
        if (!node.left && !node.right) {
            return current_sum;
        }

        // 递归计算左子树和右子树的路径数字总和
        return dfs(node.left, current_sum) + dfs(node.right, current_sum);
    };
    
    return dfs(root, 0);
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
    public int sumNumbers(TreeNode root) {
        return dfs(root, 0);
    }

    private int dfs(TreeNode node, int current_sum) {
        if (node == null) return 0;

        // 更新当前路径的数字
        current_sum = current_sum * 10 + node.val;

        // 如果到达叶节点，返回当前完整的路径数字
        if (node.left == null && node.right == null) {
            return current_sum;
        }

        // 递归计算左子树和右子树的路径数字总和
        return dfs(node.left, current_sum) + dfs(node.right, current_sum);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(N)$，其中 $N$ 是树中节点的数目。我们需要遍历每个节点。

空间复杂度：最坏情况下是 $O(H)$，其中 $H$ 是树的高度，考虑到递归调用栈的深度。
