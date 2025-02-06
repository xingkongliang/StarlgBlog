---
sidebar_position: 111
tags:
  - tree
  - breadth-first-search
  - depth-first-search
  - Easy
---

# 111.二叉树的最小深度

标签: `tree`, `breadth-first-search`, `depth-first-search`

难度: Easy

通过率: 49.53%

原题链接: https://leetcode.com/problems/minimum-depth-of-binary-tree/description/

## 题目描述
给定一个二叉树，找到其最小深度。最小深度是从根节点到最近的叶子节点的最短路径上的节点数量。注意：叶子是指没有子节点的节点。

## 解题思路
对于这个问题，可以使用深度优先搜索（DFS）或者广度优先搜索（BFS）来解决。由于我们需要找的是从根到最近叶子节点的路径，因此对于二叉树这样的问题，BFS更合适，因为BFS是层级遍历，当第一次遇到叶子节点时，它就是从根到该叶子节点的最短路径。

### 广度优先搜索（BFS）
对于BFS解法，我们可以使用一个队列。首先将根节点加入队列，然后开始遍历：
1. 从队列中取出一个节点。
2. 如果该节点是叶子节点，直接返回此时的深度。
3. 如果该节点有左子节点，加入队列。
4. 如果该节点有右子节点，加入队列。
5. 深度增加1，继续遍历。

根节点到第一个叶子节点的路径长度就是我们需要的最小深度。

### 深度优先搜索（DFS）
DFS解法一般使用递归实现。在DFS中：
1. 如果当前节点是空，返回深度为0。
2. 如果当前节点是叶子节点，返回深度为1（因为自己是根）。
3. 如果左子树为空，最小深度为右子树的最小深度+1；如果右子树为空，最小深度为左子树的最小深度+1；如果左右子树均不为空，返回左、右子树的最小深度的最小值加1。

DFS递归实现起来通常较为简洁，但在最坏情况下，即树呈单链状时，调用栈空间使用可能较大。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# Python 广度优先搜索实现
import collections

def minDepth(root):
    if not root:
        return 0
    
    queue = collections.deque([(root, 1)])  # 队列中保存节点和当前深度
    while queue:
        node, depth = queue.popleft()
        # 检查是否为叶子节点
        if not node.left and not node.right:
            return depth
        if node.left:
            queue.append((node.left, depth + 1))
        if node.right:
            queue.append((node.right, depth + 1))

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++ 广度优先搜索实现
#include <queue>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

int minDepth(TreeNode* root) {
    if (!root) return 0;
    queue<pair<TreeNode*, int>> q;
    q.push(make_pair(root, 1));
    while (!q.empty()) {
        auto [node, depth] = q.front(); q.pop();
        if (!node->left && !node->right) return depth;
        if (node->left) q.push(make_pair(node->left, depth + 1));
        if (node->right) q.push(make_pair(node->right, depth + 1));
    }
    return 0;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript 广度优先搜索实现
function minDepth(root) {
    if (!root) return 0;
    const queue = [[root, 1]]; // 使用数组模拟队列，并记录深度
    while (queue.length > 0) {
        const [node, depth] = queue.shift(); // 取出队首元素
        if (!node.left && !node.right) return depth; // 遇到叶子节点
        if (node.left) queue.push([node.left, depth + 1]);
        if (node.right) queue.push([node.right, depth + 1]);
    }
    return 0;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java 广度优先搜索实现
import java.util.LinkedList;
import java.util.Queue;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

class Solution {
    public int minDepth(TreeNode root) {
        if (root == null) return 0;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        int depth = 1;
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                if (node.left == null && node.right == null) return depth; // 叶子节点
                if (node.left != null) queue.add(node.left);
                if (node.right != null) queue.add(node.right);
            }
            depth++;
        }
        return depth;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(N)$，其中 $N$ 是二叉树中的节点数。每个节点访问一次。
- 空间复杂度：最坏情况下是 $O(N)$，对应于树呈现为一条链的情况。对于完全二叉树，空间复杂度为 $O(\log N)$。
