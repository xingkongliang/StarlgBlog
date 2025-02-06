---
sidebar_position: 113
tags:
  - tree
  - binary-search-tree
  - backtracking
  - depth-first-search
  - Medium
---

# 113.路径总和 II

标签: `tree`, `binary-search-tree`, `backtracking`, `depth-first-search`

难度: Medium

通过率: 59.67%

原题链接: https://leetcode.com/problems/path-sum-ii/description/

## 题目描述
给定一个二叉树的根节点和一个整数目标和，返回所有从根节点到叶子节点路径的节点值之和等于目标和的路径。每条路径应该以节点值列表的形式返回，而不是节点引用。一个从根到叶子的路径是一个从根节点开始且以任何一个叶子节点结束的路径。一个叶子节点是没有子节点的节点。

## 解题思路
可以通过深度优先搜索 (DFS) 来解决这个问题。在遍历每个节点时，我们需要做以下几步：

1. 将当前节点值加入到路径中。
2. 判断当前节点是否是叶子节点，并且当前路径的和是否等于目标和，如果是，将此路径加入结果集中。
3. 如果当前节点不是叶子节点，递归地去遍历它的左右子节点。
4. 如果子树路径的递归返回后，移除当前节点值以回溯到父节点，尝试其他路径。

这种解决方案利用了回溯的思想，借助递归在二叉树中进行遍历，收集符合条件的路径。为了防止在遍历过程中路径污染，每次递归返回之后需要清理走过的路径（即从路径中移除最近加入的节点）。

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
    def pathSum(self, root: TreeNode, targetSum: int) -> List[List[int]]:
        def dfs(node, current_path, current_sum):
            if not node:
                return
            
            current_sum += node.val
            current_path.append(node.val)
            
            # 检查是否到达叶子节点并且路径和等于目标和
            if not node.left and not node.right and current_sum == targetSum:
                results.append(list(current_path))
            
            # 递归遍历左子树和右子树
            dfs(node.left, current_path, current_sum)
            dfs(node.right, current_path, current_sum)
            
            # 回溯，移除当前节点
            current_path.pop()
            
        results = []
        dfs(root, [], 0)
        return results
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
    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
        vector<vector<int>> results;
        vector<int> current_path;
        dfs(root, targetSum, current_path, results);
        return results;
    }
    
    void dfs(TreeNode* node, int targetSum, vector<int>& current_path, vector<vector<int>>& results) {
        if (!node) return;
        
        current_path.push_back(node->val);
        targetSum -= node->val;
        
        // 如果到达叶子节点且路径和等于targetSum
        if (!node->left && !node->right && targetSum == 0) {
            results.push_back(current_path);
        }
        
        // 递归左子树和右子树
        dfs(node->left, targetSum, current_path, results);
        dfs(node->right, targetSum, current_path, results);
        
        // 回溯，移除当前节点
        current_path.pop_back();
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function TreeNode(val=0, left=null, right=null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

var pathSum = function(root, targetSum) {
    const results = [];
    
    function dfs(node, currentPath, currentSum) {
        if (!node) return;
        
        currentSum += node.val;
        currentPath.push(node.val);
        
        // 检查到达叶子节点和路径和是否为 targetSum
        if (!node.left && !node.right && currentSum === targetSum) {
            results.push([...currentPath]);
        }
        
        // 递归搜索左右子树
        dfs(node.left, currentPath, currentSum);
        dfs(node.right, currentPath, currentSum);
        
        // 回溯
        currentPath.pop();
    }
    
    dfs(root, [], 0);
    return results;
};
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
    public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        List<List<Integer>> results = new ArrayList<>();
        findPaths(root, targetSum, new ArrayList<>(), results);
        return results;
    }
    
    private void findPaths(TreeNode node, int targetSum, List<Integer> currentPath, List<List<Integer>> results) {
        if (node == null) return;
        
        currentPath.add(node.val);
        targetSum -= node.val;
        
        // 检查到达叶子节点和路径和是否为 targetSum
        if (node.left == null && node.right == null && targetSum == 0) {
            results.add(new ArrayList<>(currentPath));
        }
        
        // 递归搜索左右子树
        findPaths(node.left, targetSum, currentPath, results);
        findPaths(node.right, targetSum, currentPath, results);
        
        // 回溯
        currentPath.remove(currentPath.size() - 1);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度: $O(N^2)$，其中 $N$ 是树中节点数目。在最坏情况下，我们可能需要从根节点遍历到所有叶子节点，而且需要复制每个路径的节点。对于每个叶子路径可能涉及 $O(N)$ 的时间操作。`
`空间复杂度: $O(N)$，主要是递归栈的空间和路径存储的空间。递归栈最多可能使用 $O(N)$ 空间，而保存路径本身也需要 $O(N)$ 的空间。
