---
sidebar_position: 337
tags:
  - dynamic-programming
  - tree
  - depth-first-search
  - Medium
---

# 337.打家劫舍 III

标签: `dynamic-programming`, `tree`, `depth-first-search`

难度: Medium

通过率: 54.58%

原题链接: https://leetcode.com/problems/house-robber-iii/description/

## 题目描述
聪明的小偷又发现了一个新的行窃地点，这次是一个二叉树的形式。树的根为入口，每个房子都有可能有一个到两个邻屋。聪明的小偷意识到，不能在同一夜晚偷窃直接连接的房子，否则会自动报警。给定二叉树的根节点，返回小偷能够偷取的最高金额。

## 解题思路
这道题是经典的动态规划问题，结合了树的结构，我们可以使用后序遍历的方法来解决。基本思路是：

- 对每个节点，计算两种情况下的最大收益：盗窃这个节点和不盗窃这个节点。
    1. 如果盗窃当前节点，那么我们不能盗窃它的子节点，此时总金额是当前节点的金额加上不盗窃两个子节点的金额。
    2. 如果不盗窃当前节点，那么总金额是两个子节点无论盗窃与否的最大金额之和。

- 我们使用一个递归函数处理每个节点，返回一个二元组 `(withRoot, withoutRoot)`，其中 `withRoot` 表示以当前节点为根节点且盗窃当前节点的最大金额，`withoutRoot` 表示以当前节点为根节点且不盗窃当前节点的最大金额。

- 在遍历树的过程中，每个节点通过从其子节点返回的信息进行决策。因此，这是一个自底向上的动态规划过程。

通过比较根节点的这两种情况中的最大值，即可得到最终的解。

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

# 动态规划解决方法
class Solution:
    def rob(self, root: TreeNode) -> int:
        # 后序遍历的递归函数
        def dfs(node):
            if not node:
                return (0, 0) # (盗窃当前节点, 不盗窃当前节点)

            # 获得左右孩子的结果
            left = dfs(node.left)
            right = dfs(node.right)

            # 盗窃当前节点
            rob_current = node.val + left[1] + right[1]
            # 不盗窃当前节点
            not_rob_current = max(left) + max(right)

            return (rob_current, not_rob_current)

        # 计算根节点的结果
        result = dfs(root)
        # 返回根节点的两种情况下的最大值
        return max(result)

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
    pair<int, int> robSub(TreeNode* root) {
        if (!root) return {0, 0};
        // 计算左子树与右子树
        auto left = robSub(root->left);
        auto right = robSub(root->right);
        // 盗窃当前节点的情况
        int rob_current = root->val + left.second + right.second;
        // 不盗窃当前节点的情况
        int not_rob_current = max(left.first, left.second) + max(right.first, right.second);
        return {rob_current, not_rob_current};
    }
    int rob(TreeNode* root) {
        auto result = robSub(root);
        return max(result.first, result.second);
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function TreeNode(val, left = null, right = null) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

var rob = function(root) {
    // 帮助函数，返回两个值：盗窃和不盗窃的最大金额
    const dfs = (node) => {
        if (!node) return [0, 0];
        const left = dfs(node.left);
        const right = dfs(node.right);
        // 盗窃当前节点的情况
        const robCurrent = node.val + left[1] + right[1];
        // 不盗窃当前节点的情况
        const notRobCurrent = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
        return [robCurrent, notRobCurrent];
    };
    const result = dfs(root);
    return Math.max(result[0], result[1]);
};

```

</TabItem>
<TabItem value="java" label="Java">

```java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) {
        this.val = val;
    }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    public int rob(TreeNode root) {
        int[] result = robSub(root);
        return Math.max(result[0], result[1]);
    }
    
    private int[] robSub(TreeNode node) {
        if (node == null) return new int[]{0, 0};
        int[] left = robSub(node.left);
        int[] right = robSub(node.right);
        // 盗窃当前节点，不能盗窃它的孩子
        int robCurrent = node.val + left[1] + right[1];
        // 不盗窃当前节点，可以选择盗窃或不盗窃它的孩子
        int notRobCurrent = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
        return new int[]{robCurrent, notRobCurrent};
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：整个算法会遍历每一个节点一次，所以时间复杂度是 $O(N)$，其中 $N$ 是树中节点的数量。  
  
空间复杂度：递归调用的深度决定了空间复杂度，最差情况下（例如一个链表型的树）深度是 $O(N)$。平均情况下，对于平衡树，深度为 $O(\log N)$。
