---
sidebar_position: 145
tags:
  - tree
  - depth-first-search
  - stack
  - Easy
---

# 145.二叉树的后序遍历

标签: `tree`, `depth-first-search`, `stack`

难度: Easy

通过率: 74.21%

原题链接: https://leetcode.com/problems/binary-tree-postorder-traversal/description/

## 题目描述
给定一个二叉树的根节点，返回其节点值的后序遍历。

## 解题思路
后序遍历二叉树的顺序是：**左子树 -> 右子树 -> 根结点**。直接使用递归的方法实现非常简单，而使用迭代法需要借助栈来模拟递归的过程。具体的迭代实现方法如下：
1. 创建一个栈 `stack` 和一个列表 `output`。
2. 将根节点 `root` 入栈。
3. 当栈不为空时：
   - 弹出栈顶节点 `node`。
   - 将 `node` 的值添加到 `output` 的开头。
   - 如果 `node` 有左子节点，则将左子节点入栈。
   - 如果 `node` 有右子节点，则将右子节点入栈。
4. 返回 `output`。

这种方法在后序遍历中，将访问顺序颠倒为 **根结点 -> 右子树 -> 左子树** 然后逆序存储，即可得到期望的后序遍历结果。

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

def postorderTraversal(root):
    if not root:
        return []
    stack, output = [root], []  # 初始化栈和输出列表
    while stack:
        node = stack.pop()      # 弹出栈顶元素
        output.append(node.val) # 将节点值添加到输出列表的末尾
        if node.left:           # 如果左子节点存在，入栈
            stack.append(node.left)
        if node.right:          # 如果右子节点存在，入栈
            stack.append(node.right)
    return output[::-1]         # 逆序输出列表得到后序遍历结果
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

class Solution {
public:
    vector<int> postorderTraversal(TreeNode* root) {
        if (!root) return {};
        stack<TreeNode*> stack;
        vector<int> output;
        stack.push(root);
        while (!stack.empty()) {
            TreeNode* node = stack.top();
            stack.pop();
            output.push_back(node->val);
            // 先入左子节点，后入右子节点
            if (node->left)
                stack.push(node->left);
            if (node->right)
                stack.push(node->right);
        }
        reverse(output.begin(), output.end());
        return output;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

var postorderTraversal = function(root) {
    if (root === null) return [];
    const stack = [root];
    const output = [];
    while (stack.length) {
        const node = stack.pop();
        output.push(node.val);
        if (node.left)
            stack.push(node.left);
        if (node.right)
            stack.push(node.right);
    }
    return output.reverse();
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

public class Solution {
    public List<Integer> postorderTraversal(TreeNode root) {
        LinkedList<Integer> output = new LinkedList<>();
        if (root == null) return output;
        Stack<TreeNode> stack = new Stack<>();
        stack.push(root);
        while (!stack.isEmpty()) {
            TreeNode node = stack.pop();
            output.addFirst(node.val); // 逆序添加节点值
            if (node.left != null) {
                stack.push(node.left);
            }
            if (node.right != null) {
                stack.push(node.right);
            }
        }
        return output;
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度: $O(n)$ ，其中 $n$ 为二叉树的节点数。每个节点恰好被访问一次。  
  
- 空间复杂度: $O(n)$ ，取决于栈的深度，最坏情况下需要存储所有节点。
