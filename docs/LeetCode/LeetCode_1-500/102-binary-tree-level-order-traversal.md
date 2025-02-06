---
sidebar_position: 102
tags:
  - tree
  - breadth-first-search
  - Medium
---

# 102.二叉树层序遍历

标签: `tree`, `breadth-first-search`

难度: Medium

通过率: 69.2%

原题链接: https://leetcode.com/problems/binary-tree-level-order-traversal/description/

## 题目描述
给定一个二叉树的根节点 root，返回其节点值的层序遍历结果。（即逐层从左到右访问所有节点）。

## 解题思路
层序遍历的关键在于使用一个队列来记录当前层的节点。我们从根节点开始，将其入队，然后迭代性地处理每一层。在每层处理中，我们从队列中取出该层的所有节点，将这些节点的值存储在一个列表中，并将它们的左右子节点（如果有）依次入队以便处理下一层。这样不断直到所有层都处理完，从而得到完整的层序遍历结果。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# Python 代码
# 定义二叉树的节点
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

from collections import deque

def levelOrder(root):
    if not root:
        return []  # 如果树为空，返回空列表

    result = []
    queue = deque([root])  # 用双端队列初始化队列，并从根节点开始

    while queue:
        level_size = len(queue)  # 当前层中节点的数量
        current_level = []

        for _ in range(level_size):  # 遍历当前层节点
            node = queue.popleft()  # 从队列头部取出节点
            current_level.append(node.val)  # 记录节点值

            if node.left:
                queue.append(node.left)  # 将左子节点入队
            if node.right:
                queue.append(node.right)  # 将右子节点入队

        result.append(current_level)  # 将当前层结果加入到整体结果中

    return result
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++代码
#include <vector>
#include <queue>
using namespace std;

// 定义二叉树的节点
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

vector<vector<int>> levelOrder(TreeNode* root) {
    if (!root) return {}; // 如果树为空，返回空结果
    
    vector<vector<int>> result;
    queue<TreeNode*> q;
    q.push(root); // 将根节点入队

    while (!q.empty()) {
        int level_size = q.size(); // 当前层节点个数
        vector<int> current_level;

        for (int i = 0; i < level_size; ++i) { // 遍历当前层的所有节点
            TreeNode* node = q.front();
            q.pop(); // 从队列头取出节点
            current_level.push_back(node->val); // 记录节点值

            if (node->left) q.push(node->left); // 左子节点入队
            if (node->right) q.push(node->right); // 右子节点入队
        }

        result.push_back(current_level); // 将该层的结果保存
    }

    return result;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript代码
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

var levelOrder = function(root) {
    if (!root) return []; // 如果树为空，返回空结果
    
    const result = [];
    const queue = [root]; // 使用数组模拟队列，将根节点入队

    while (queue.length > 0) {
        const level_size = queue.length; // 当前层节点个数
        const current_level = [];

        for (let i = 0; i < level_size; i++) {
            const node = queue.shift(); // 从队列头部推出一个节点
            current_level.push(node.val); // 记录节点的值

            if (node.left) queue.push(node.left); // 左子节点入队
            if (node.right) queue.push(node.right); // 右子节点入队
        }

        result.push(current_level); // 保存当前层的结果
    }

    return result;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java代码
import java.util.*;

// 定义二叉树的节点
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
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result; // 如果树为空，返回空结果
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root); // 根节点入队列

        while (!queue.isEmpty()) {
            int level_size = queue.size(); // 当前层的节点数
            List<Integer> current_level = new ArrayList<>();

            for (int i = 0; i < level_size; i++) {
                TreeNode node = queue.poll(); // 从队列中获取一个节点
                current_level.add(node.val); // 记录节点值

                if (node.left != null) queue.offer(node.left); // 左子节点入队
                if (node.right != null) queue.offer(node.right); // 右子节点入队
            }

            result.add(current_level); // 保存层结果
        }

        return result;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度: O(n)，其中 $n$ 是二叉树的节点数，因为需要访问每个节点一次。  
空间复杂度: O(n)，队列在最坏情况下可能包含 $O(n)$ 个节点（例如，完全二叉树的最后一层）。
