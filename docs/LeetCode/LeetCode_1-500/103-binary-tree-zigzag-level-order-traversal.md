---
sidebar_position: 103
tags:
  - tree
  - breadth-first-search
  - Medium
---

# 103.二叉树之字形层序遍历

标签: `tree`, `breadth-first-search`

难度: Medium

通过率: 60.53%

原题链接: https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/

## 题目描述
给定一个二叉树的根节点，返回其节点值的之字形层序遍历。从左到右，然后下一层从右到左交替进行。

## 解题思路
该题要求对二叉树进行之字形的层序遍历，即每一层的遍历方向交替变化。为此，我们可以使用广度优先搜索（BFS）结合双向队列来高效实现。具体步骤如下：

1. 使用一个列表 `results` 来存储最终的结果，每个元素对应二叉树每一层的结果。
2. 如果树为空，立即返回空列表。
3. 初始化一个双向队列 `queue`，将根节点加入到 `queue` 中。
4. 使用一个布尔变量 `left_to_right` 来指示当前层的遍历方向，初始值为 `True`。
5. 进入循环：
    - 获取 `queue` 的当前大小 `level_size`，这代表当前层的节点数量。
    - 初始化一个新的列表 `level_nodes` 以存储当前层的节点值。
    - 遍历当前层（从 `0` 到 `level_size - 1`）：
      - 从 `queue` 的左端弹出一个节点。如果 `left_to_right` 为 `True`，则把节点值附加到 `level_nodes` 的尾部；否则附加到头部。
      - 将该节点的子节点（若有）分别从右向左加入 `queue` 的右端，以便下一层的正确遍历。
    - 此循环结束后，将 `level_nodes` 添加到 `results`。
    - 翻转 `left_to_right` 的值。
6. 返回 `results` 列表。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
from collections import deque

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def zigzagLevelOrder(self, root: TreeNode) -> List[List[int]]:
        if not root:
            return []
        
        results = []
        queue = deque([root])
        left_to_right = True
        
        while queue:
            level_size = len(queue)
            level_nodes = deque()
            
            # 遍历当前层的所有节点
            for _ in range(level_size):
                node = queue.popleft()
                if left_to_right:
                    level_nodes.append(node.val)
                else:
                    level_nodes.appendleft(node.val)
                
                # 将子节点加入队列
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            
            results.append(list(level_nodes))
            left_to_right = not left_to_right
        
        return results
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
/* Definition for a binary tree node. */
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
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        if (!root) return {};
        
        vector<vector<int>> results;
        deque<TreeNode*> dq;
        dq.push_back(root);
        bool left_to_right = true;

        while (!dq.empty()) {
            int level_size = dq.size();
            vector<int> level_nodes(level_size);
            
            // 遍历当前层的所有节点
            for (int i = 0; i < level_size; ++i) {
                TreeNode* node = dq.front();
                dq.pop_front();
                
                // 选择放在哪个位置
                int index = left_to_right ? i : (level_size - 1 - i);
                level_nodes[index] = node->val;
                
                // 将子节点加入队列
                if (node->left) dq.push_back(node->left);
                if (node->right) dq.push_back(node->right);
            }
            results.push_back(level_nodes);
            left_to_right = !left_to_right;
        }
        return results;
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
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
    if (!root) return [];
    
    const results = [];
    const queue = [root];
    let leftToRight = true;
    
    while (queue.length) {
        const levelSize = queue.length;
        const levelNodes = new Array(levelSize);
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            const index = leftToRight ? i : (levelSize - 1 - i);
            levelNodes[index] = node.val;
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        results.push(levelNodes);
        leftToRight = !leftToRight;
    }
    return results;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

/** Definition for a binary tree node. */
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
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
        List<List<Integer>> results = new ArrayList<>();
        if (root == null) return results;
        
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        boolean leftToRight = true;

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> levelNodes = new ArrayList<>(levelSize);

            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                if (leftToRight) {
                    levelNodes.add(node.val);
                } else {
                    levelNodes.add(0, node.val);
                }
                
                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
            }
            results.add(levelNodes);
            leftToRight = !leftToRight;
        }
        return results;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(n)$, 其中 $n$ 是二叉树中的节点数。每个节点被访问一次。
- 空间复杂度：$O(n)$, 用于存储结果和队列的空间。
