---
sidebar_position: 107
tags:
  - tree
  - breadth-first-search
  - Medium
---

# 107.二叉树的层序遍历 II

标签: `tree`, `breadth-first-search`

难度: Medium

通过率: 64.89%

原题链接: https://leetcode.com/problems/binary-tree-level-order-traversal-ii/description/

## 题目描述
给定一个二叉树的根节点，返回其节点值自底向上的层序遍历。即，按从叶子到根的层次顺序，从左到右访问每一层中的节点。

## 解题思路
此题要求进行二叉树的层序遍历，并从底部到顶部返回结果。我们可以使用广度优先搜索（BFS）来实现标准的层序遍历，然后在返回结果时进行反向处理。

具体步骤如下：
1. 使用一个队列实现BFS，从根节点开始，将每一层的所有节点依次放入队列中。
2. 当处理一层后，将该层的所有节点值存储在一个临时列表中。
3. 继续遍历直到所有节点都被访问。
4. 在访问完所有层后，将节点值的列表反转，以获得从底到顶的层序遍历结果。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
from collections import deque

# 定义二叉树节点
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# 二叉树层序遍历 II 函数
def levelOrderBottom(root):
    if not root:
        return []

    result = []  # 用于存储最终结果
    queue = deque([root])  # 用于BFS的队列，初始化时将根节点加入

    while queue:
        level_size = len(queue)
        level_nodes = []  # 用于存储当前层的节点值

        for _ in range(level_size):
            node = queue.popleft()  # 弹出队列最左端的节点
            level_nodes.append(node.val)  # 记录当前节点的值
            if node.left:
                queue.append(node.left)  # 将左孩子加入队列
            if node.right:
                queue.append(node.right)  # 将右孩子加入队列

        result.insert(0, level_nodes)  # 将当前层结果插入到结果列表的最前端

    return result # 返回结果列表
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
#include <queue>

class Solution {
public:
    vector<vector<int>> levelOrderBottom(TreeNode* root) {
        if (!root) return {};

        vector<vector<int>> result;
        queue<TreeNode*> q;
        q.push(root);

        while (!q.empty()) {
            int level_size = q.size();
            vector<int> level_nodes;

            for (int i = 0; i < level_size; i++) {
                TreeNode* node = q.front();
                q.pop();
                level_nodes.push_back(node->val);

                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }

            result.insert(result.begin(), level_nodes); // 插入到结果的开始位置
        }

        return result;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// 二叉树节点定义
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

// 二叉树层序遍历 II 函数
var levelOrderBottom = function(root) {
    if (!root) return [];

    const result = [];
    const queue = [root];

    while (queue.length > 0) {
        const levelSize = queue.length;
        const levelNodes = [];

        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            levelNodes.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        result.unshift(levelNodes); // 插入结果集的最前
    }

    return result;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
// 二叉树节点类
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

// 二叉树层序遍历 II 方法
class Solution {
    public List<List<Integer>> levelOrderBottom(TreeNode root) {
        List<List<Integer>> result = new LinkedList<>();
        if (root == null) return result;

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> levelNodes = new ArrayList<>();

            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                levelNodes.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }

            result.add(0, levelNodes); // 将当前层添加到结果的开始位置
        }

        return result;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中$n$是树中节点的个数。每个节点访问一次。`
`空间复杂度：$O(n)$，用于存储队列的最大空间（通常是一个完整的层的节点数）。
