---
sidebar_position: 124
tags:
  - tree
  - depth-first-search
  - dynamic-programming
  - Hard
---

# 124.二叉树中的最大路径和

标签: `tree`, `depth-first-search`, `dynamic-programming`

难度: Hard

通过率: 40.68%

原题链接: https://leetcode.com/problems/binary-tree-maximum-path-sum/description/

## 题目描述
在二叉树中，路径被定义为节点序列，其中每一对相邻节点之间都有一条边相连。节点在序列中最多只能出现一次。路径不一定需要经过根节点。路径的路径和是路径中所有节点的值的总和。给定一个二叉树的根节点，返回任何不为空路径的最大路径和。

## 解题思路
解决此问题的关键在于利用递归计算路径和，并在过程中维护一个全局变量来存储当前找到的最大路径和。在二叉树的每个节点，我们需要考虑以下几种情况，以确定从该节点出发的最大路径和：

1. 仅选择左子树的路径和。
2. 仅选择右子树的路径和。
3. 通过当前节点，选择左子树路径和加上右子树路径和，再加上当前节点的值。

使用递归实现：

- 从叶节点开始向上计算，递归函数返回以当前节点为路径终点的最大路径和。
- 在每个节点，首先递归计算左、右子树的最大路径和，如果小于0，则忽略（不选择这条路）。 
- 计算通过该节点的最大路径和，并更新全局最大值。
- 对于递归返回，需要返回单边最大值，即当前节点和其中一边的子树路径和。

这样，保证了不会计入负值路径，并且树的每个节点都被有效遍历，寻找最大可能路径和。

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
    def maxPathSum(self, root: TreeNode) -> int:
        def dfs(node):
            if not node:
                return 0
            
            # 计算左子树的最大路径和，负数则置为0（不选这条路）
            left_gain = max(dfs(node.left), 0)
            # 计算右子树的最大路径和，负数则置为0（不选这条路）
            right_gain = max(dfs(node.right), 0)
            
            # 经过当前节点的路径和
            price_newpath = node.val + left_gain + right_gain
            
            # 更新最大路径和
            self.max_sum = max(self.max_sum, price_newpath)

            # 返回节点的最大贡献值
            return node.val + max(left_gain, right_gain)

        self.max_sum = float('-inf')
        dfs(root)
        return self.max_sum
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
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
    private int maxSum = Integer.MIN_VALUE;

    public int maxPathSum(TreeNode root) {
        dfs(root);
        return maxSum;
    }

    private int dfs(TreeNode node) {
        if (node == null) {
            return 0;
        }

        // 获取左右子树的最大路径和，并忽略负数
        int leftMax = Math.max(dfs(node.left), 0);
        int rightMax = Math.max(dfs(node.right), 0);

        // 计算新的路径和
        int newPath = node.val + leftMax + rightMax;

        // 更新最大路径和
        maxSum = Math.max(maxSum, newPath);

        // 返回节点的最大贡献值
        return node.val + Math.max(leftMax, rightMax);
    }
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

var maxPathSum = function(root) {
    let maxSum = Number.MIN_SAFE_INTEGER;

    function dfs(node) {
        if (!node) {
            return 0;
        }

        // 计算左右子树的最大路径和
        const leftMax = Math.max(dfs(node.left), 0);
        const rightMax = Math.max(dfs(node.right), 0);

        // 通过当前节点的新路径和
        const newPath = node.val + leftMax + rightMax;

        // 更新最大路径和
        maxSum = Math.max(maxSum, newPath);

        // 返回节点的最大贡献值
        return node.val + Math.max(leftMax, rightMax);
    }

    dfs(root);
    return maxSum;
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

class Solution {
    private int maxSum = Integer.MIN_VALUE;

    public int maxPathSum(TreeNode root) {
        dfs(root);
        return maxSum;
    }

    private int dfs(TreeNode node) {
        if (node == null) {
            return 0;
        }

        // 获取左右子树的最大路径和，并忽略负数
        int leftMax = Math.max(dfs(node.left), 0);
        int rightMax = Math.max(dfs(node.right), 0);

        // 计算通过当前节点的新路径和
        int newPath = node.val + leftMax + rightMax;

        // 更新最大路径和
        maxSum = Math.max(maxSum, newPath);

        // 返回节点的最大贡献值
        return node.val + Math.max(leftMax, rightMax);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(N)$，其中 $N$ 是二叉树中的节点数。每个节点访问一次。
- 空间复杂度：$O(H)$，其中 $H$ 是树的高度。最坏情况下栈空间消耗是树的高度。
