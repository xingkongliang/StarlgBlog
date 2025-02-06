---
sidebar_position: 199
tags:
  - tree
  - depth-first-search
  - breadth-first-search
  - Medium
---

# 199.二叉树的右视图

标签: `tree`, `depth-first-search`, `breadth-first-search`

难度: Medium

通过率: 64.54%

原题链接: https://leetcode.com/problems/binary-tree-right-side-view/description/

## 题目描述
给定一棵二叉树的根节点，想象自己站在它的右侧，从上到下返回你所能看见的节点值。

## 解题思路
可以采用广度优先搜索（BFS）或深度优先搜索（DFS）来解决这个问题。对于BFS，我们可以按层次遍历二叉树，每层从右到左遍历，这样每层我们遇到的第一个节点就是我们能从右侧看到的节点。对于DFS，我们优先遍历右子树，然后是左子树，这样在每层第一个被访问的节点就是右视图中的节点。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# Python实现
# 定义树节点
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# 方法：广度优先搜索
from collections import deque

def rightSideView(root):
    if not root:
        return []
    queue = deque([root])
    view = []
    # 按层次遍历
    while queue:
        level_length = len(queue)
        # 遍历每一层
        for i in range(level_length):
            node = queue.popleft()
            # 将每层的最右节点加入view
            if i == level_length - 1:
                view.append(node.val)
            # 将子节点加入队列
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
    return view

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++实现
// 定义树节点
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

#include <vector>
#include <queue>

using namespace std;

vector<int> rightSideView(TreeNode* root) {
    if (!root) return {};
    vector<int> view;
    queue<TreeNode*> queue;
    queue.push(root);
    // 按层次遍历
    while (!queue.empty()) {
        int level_size = queue.size();
        // 遍历每一层
        for (int i = 0; i < level_size; ++i) {
            TreeNode* node = queue.front();
            queue.pop();
            // 将每层的最右节点加入view
            if (i == level_size - 1) {
                view.push_back(node->val);
            }
            // 将子节点加入队列
            if (node->left) {
                queue.push(node->left);
            }
            if (node->right) {
                queue.push(node->right);
            }
        }
    }
    return view;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript实现
// 定义树节点
class TreeNode {
    constructor(val, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
function rightSideView(root) {
    if (!root) return [];
    const queue = [root];
    const view = [];
    // 按层次遍历
    while (queue.length) {
        const level_length = queue.length;
        // 遍历每一层
        for (let i = 0; i < level_length; i++) {
            const node = queue.shift();
            // 将每层的最右节点加入view
            if (i === level_length - 1) {
                view.push(node.val);
            }
            // 将子节点加入队列
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }
        }
    }
    return view;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java实现
// 定义树节点
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

import java.util.*;

class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> view = new ArrayList<>();
        if (root == null) return view;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        // 按层次遍历
        while (!queue.isEmpty()) {
            int level_size = queue.size();
            // 遍历每一层
            for (int i = 0; i < level_size; i++) {
                TreeNode node = queue.poll();
                // 将每层的最右节点加入view
                if (i == level_size - 1) {
                    view.add(node.val);
                }
                // 将子节点加入队列
                if (node.left != null) {
                    queue.offer(node.left);
                }
                if (node.right != null) {
                    queue.offer(node.right);
                }
            }
        }
        return view;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：对于广度优先搜索，每个节点恰好进入和离开队列一次，时间复杂度为 $O(n)$，其中 $n$ 是二叉树中节点的数量。  
  
空间复杂度：额外空间是队列所需的空间，在最坏情况下，队列中的元素数目等于二叉树中最大的一层节点数，因此空间复杂度为 $O(w)$，其中 $w$ 是二叉树的最大宽度。
