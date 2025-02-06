---
sidebar_position: 404
tags:
  - tree
  - depth-first-search
  - breadth-first-search
  - Easy
---

# 404.左叶子之和

标签: `tree`, `depth-first-search`, `breadth-first-search`

难度: Easy

通过率: 61.19%

原题链接: https://leetcode.com/problems/sum-of-left-leaves/description/

## 题目描述
给定一棵二叉树的根节点，返回所有左叶子节点的值之和。叶子是没有子节点的节点，左叶子是作为其他节点的左子节点的叶子节点。

## 解题思路
要解决这个问题，我们可以通过递归遍历树的每个节点来实现。对于每个节点，我们检查其左子节点是否是一个叶子节点，如果是，则累加其值。然后我们递归检查其左子树和右子树。具体的做法如下：  

1. 定义一个递归函数 `sumLeftLeaves(node, isLeft)`，其中 `node` 是当前遍历的节点，`isLeft` 是一个布尔值，表示该节点是否是其父节点的左子节点。
   
2. 在递归函数中，首先检查节点是否为空，如果是，返回0。

3. 如果节点是一个叶子节点并且 `isLeft` 为真，则返回该节点的值，因为这是一个左叶子节点。

4. 如果节点不是叶子节点，则进行递归调用，累加左子树和右子树的结果：  
   - 调用 `sumLeftLeaves(node.left, true)` 以检查左子树。
   - 调用 `sumLeftLeaves(node.right, false)` 以检查右子树。

5. 开始时调用 `sumLeftLeaves(root, false)`，因为根节点没有父节点，不是任何节点的左子节点。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# 定义树节点类
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def sumOfLeftLeaves(self, root: TreeNode) -> int:
        # 辅助递归函数
        def sumLeftLeaves(node: TreeNode, isLeft: bool) -> int:
            if not node:
                return 0
            # 如果该节点是叶子并且是左子节点
            if not node.left and not node.right and isLeft:
                return node.val
            # 递归计算左子树和右子树的左叶子和
            return sumLeftLeaves(node.left, True) + sumLeftLeaves(node.right, False)

        # 初次调用时，根节点不是任何节点的左子节点，所以标记为False
        return sumLeftLeaves(root, False)

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// 定义树节点结构
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
    int sumOfLeftLeaves(TreeNode* root) {
        return sumLeftLeaves(root, false);
    }

private:
    // 辅助递归函数
    int sumLeftLeaves(TreeNode* node, bool isLeft) {
        if (!node) return 0;
        // 如果该节点是叶子并且是左子节点
        if (!node->left && !node->right && isLeft) return node->val;
        // 递归计算左子树和右子树的左叶子和
        return sumLeftLeaves(node->left, true) + sumLeftLeaves(node->right, false);
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// 定义树节点类
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

var sumOfLeftLeaves = function(root) {
    // 辅助递归函数
    const sumLeftLeaves = (node, isLeft) => {
        if (!node) return 0;
        // 如果该节点是叶子并且是左子节点
        if (!node.left && !node.right && isLeft) return node.val;
        // 递归计算左子树和右子树的左叶子和
        return sumLeftLeaves(node.left, true) + sumLeftLeaves(node.right, false);
    };

    // 初次调用时，根节点不是任何节点的左子节点，所以标记为False
    return sumLeftLeaves(root, false);
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
// 定义树节点类
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
    public int sumOfLeftLeaves(TreeNode root) {
        return sumLeftLeaves(root, false);
    }

    // 辅助递归函数
    private int sumLeftLeaves(TreeNode node, boolean isLeft) {
        if (node == null) return 0;
        // 如果该节点是叶子并且是左子节点
        if (node.left == null && node.right == null && isLeft) return node.val;
        // 递归计算左子树和右子树的左叶子和
        return sumLeftLeaves(node.left, true) + sumLeftLeaves(node.right, false);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度: $O(n)$，其中 $n$ 是二叉树中的节点数。每个节点被访问一次。  
  
空间复杂度: $O(h)$，其中 $h$ 是树的高度。递归堆栈的最大深度受限于树的高度。
