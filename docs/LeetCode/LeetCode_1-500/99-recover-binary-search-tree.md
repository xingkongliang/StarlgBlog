---
sidebar_position: 99
tags:
  - tree
  - depth-first-search
  - binary-search-tree
  - Medium
---

# 99.恢复二叉搜索树

标签: `tree`, `depth-first-search`, `binary-search-tree`

难度: Medium

通过率: 54.92%

原题链接: https://leetcode.com/problems/recover-binary-search-tree/description/

## 题目描述
给定一个二叉搜索树（BST）的根节点，其中恰好有两个节点的值因错误交换。恢复这棵树，但不能改变树的结构。

## 解题思路
这个问题要求我们恢复一个被错误交换了两个节点的二叉搜索树。首先我们应该明白二叉搜索树的中序遍历结果是一个升序数组。我们要做的是找到这两个错误的节点并交换它们的值使得树恢复为一个有效的BST。接下来的步骤为：

1. **中序遍历**：在一趟中序遍历中，我们会按从小到大的顺序得到树的节点。
2. **识别错误节点**：通过比较连续的两个节点，找到不满足顺序的地方，一般来说，只有两个点是不满足顺序的：
   - 第一个错误是前一个节点的值大于当前节点。
   - 第二个错误发生在再次碰到这样的情况，找到了当前节点的值小于前一个节点。
3. **恢复顺序**：一旦识别出两个节点异常的节点，我们可以通过交换两个节点的值来恢复BST。

我们可以在3种情况下找到交换错误的节点：
- 针对两个相邻节点交换(`e1 > e2`)的情况。在中序遍历时，只会有人一个相反次序，我们需要交换这两个相邻节点即可。
- 非相邻点出现两次异常(`e1 > e2` 和 `e2 > e3`)的情况，在中序遍历中，会出现两次，例如`(9, 3, 8)`，我们需要交换`9`和`3`。

我们可以使用莫里斯遍历(Morris Traversal) 来实现O(1)的空间复杂度。这种遍历方法无需用栈和递归，能节省空间。不过，完整的莫里斯遍历需要一些复杂的树指针操作。

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

def recoverTree(root):
    def inorder(node):
        """中序遍历二叉树，找出错误的两个节点。返回三个点：第一个错误节点、第二个错误节点和前驱节点。"""
        nonlocal prev, first, second
        if not node:
            return
        # 遍历左子树
        inorder(node.left)
        # 找到两个错误的节点
        if prev and prev.val > node.val:
            if not first:
                first = prev
            second = node
        prev = node
        # 遍历右子树
        inorder(node.right)

    prev, first, second = None, None, None
    inorder(root)
    # 交换错误节点的值，恢复二叉搜索树
    if first and second:
        first.val, second.val = second.val, first.val
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
    void recoverTree(TreeNode* root) {
        TreeNode *prev = nullptr, *first = nullptr, *second = nullptr;
        inorder(root, prev, first, second);
        if (first && second) {
            std::swap(first->val, second->val);
        }
    }
    
private:
    void inorder(TreeNode* node, TreeNode*& prev, TreeNode*& first, TreeNode*& second) {
        if (!node) return;
        inorder(node->left, prev, first, second);
        if (prev && prev->val > node->val) {
            if (!first) first = prev;
            second = node;
        }
        prev = node;
        inorder(node->right, prev, first, second);
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

const recoverTree = function(root) {
    let prev = null, first = null, second = null;
    const inorder = (node) => {
        if (!node) return;
        inorder(node.left);
        if (prev && prev.val > node.val) {
            if (!first) {
                first = prev;
            }
            second = node;
        }
        prev = node;
        inorder(node.right);
    }
    inorder(root);
    if (first && second) {
        [first.val, second.val] = [second.val, first.val];
    }
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
    public void recoverTree(TreeNode root) {
        TreeNode prev = null, first = null, second = null;
        inorder(root, new TreeNode[1], new TreeNode[1], new TreeNode[1]);
        if (first != null && second != null) {
            int temp = first.val;
            first.val = second.val;
            second.val = temp;
        }
    }

    private void inorder(TreeNode node, TreeNode[] prev, TreeNode[] first, TreeNode[] second) {
        if (node == null) return;
        inorder(node.left, prev, first, second);
        if (prev[0] != null && prev[0].val > node.val) {
            if (first[0] == null) first[0] = prev[0];
            second[0] = node;
        }
        prev[0] = node;
        inorder(node.right, prev, first, second);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(n)$，其中 $n$ 是树中节点的个数，因为需要完整遍历这棵树。
- 空间复杂度：$O(1)$（使用Morris遍历），在不考虑递归栈空间的情况下，因为我们在空间上没有使用额外的数据结构来存储节点。
