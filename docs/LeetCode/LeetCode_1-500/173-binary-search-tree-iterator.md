---
sidebar_position: 173
tags:
  - stack
  - tree
  - design
  - binary-search-tree
  - Medium
---

# 173.二叉搜索树迭代器

标签: `stack`, `tree`, `design`, `binary-search-tree`

难度: Medium

通过率: 73.77%

原题链接: https://leetcode.com/problems/binary-search-tree-iterator/description/

## 题目描述
实现一个BSTIterator类，它表示二叉搜索树（BST）的中序遍历的迭代器。

- **BSTIterator(TreeNode root)** 初始化对象，给定BST的根作为构造函数的一部分。指针应初始化为一个不存在的比BST中任意元素小的数字。
- **boolean hasNext()** 如果存在指针右边的下一个数字，返回true，否则返回false。
- **int next()** 将指针移向右边，然后返回指针所指的数字。

初始化指针为不存在的最小数，使得首次调用next()将返回BST中的最小元素。

假设next()的调用总是有效的，即在调用next()时，in-order遍历中至少存在一个下一个数字。

## 解题思路
这个问题要求我们实现一个能够按中序遍历顺序遍历二叉搜索树的迭代器。中序遍历的特点是：首先访问左子树，再访问根节点，最后访问右子树。为了实现高效的遍历，我们可以使用自定义的栈来模拟递归遍历的过程。

具体实现思路如下：

1. 初始化时，将指针设为BST的根节点，同时用一个栈维护当前节点的父节点链，这个链会指向我们还未访问完的节点。

2. 在调用`next()`时，我们需要根据栈的状态和节点关系进行遍历：从栈弹出一个节点，返回这个节点值，然后把节点的右子树所有的最左节点压栈。

3. `hasNext()`方法只需要检查栈是否为空，栈不为空则表示仍有节点未遍历。

此方法模拟了递归调用的栈过程，但实际上使用的是显式栈，因此节省了系统调用栈的内存占用。

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

class BSTIterator:
    def __init__(self, root: TreeNode):
        # 初始化栈用来追踪节点
        self.stack = []
        # 将当前指针指向给定根节点
        self._leftmost_inorder(root)

    def _leftmost_inorder(self, root):
        # 将最左节点压入栈中
        while root:
            self.stack.append(root)
            root = root.left

    def next(self) -> int:
        # 弹出栈顶元素即为当前应访问的节点
        topmost_node = self.stack.pop()

        # 如果还有右子节点，将右子节点的所有左子节点压栈
        if topmost_node.right:
            self._leftmost_inorder(topmost_node.right)

        return topmost_node.val

    def hasNext(self) -> bool:
        # 如果栈不为空，返回True
        return len(self.stack) > 0
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

class BSTIterator {
    // 定义一个栈储存节点
    private Stack<TreeNode> stack = new Stack<>();

    public BSTIterator(TreeNode root) {
        // 初始化时将给定节点的最左路径保存下来
        pushLeft(root);
    }

    private void pushLeft(TreeNode node) {
        // 将节点及其所有左子节点压入栈中
        while (node != null) {
            stack.push(node);
            node = node.left;
        }
    }

    public int next() {
        // 弹出当前栈顶节点
        TreeNode node = stack.pop();
        // 如果弹出的节点有右子树则将其右子树最左路径入栈
        if (node.right != null) {
            pushLeft(node.right);
        }
        return node.val;
    }

    public boolean hasNext() {
        // 检查栈是否为空
        return !stack.isEmpty();
    }
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

var BSTIterator = function(root) {
    this.stack = [];
    // 初始化时将最左路径入栈
    this._leftmostInOrder(root);
};

BSTIterator.prototype._leftmostInOrder = function(root) {
    while (root) {
        this.stack.push(root);
        root = root.left;
    }
};

BSTIterator.prototype.next = function() {
    // 栈顶即为下一个元素
    const node = this.stack.pop();
    if (node.right) {
        // 如果有右子树, 将右子树最左路径入栈
        this._leftmostInOrder(node.right);
    }
    return node.val;
};

BSTIterator.prototype.hasNext = function() {
    // 检查栈是否为空
    return this.stack.length > 0;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.Stack;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

public class BSTIterator {
    // 存储节点的栈
    private Stack<TreeNode> stack;

    public BSTIterator(TreeNode root) {
        this.stack = new Stack<TreeNode>();
        // 初始化为最左路径
        while (root != null) {
            stack.push(root);
            root = root.left;
        }
    }

    public int next() {
        // 弹出当前最顶的节点
        TreeNode node = stack.pop();
        int value = node.val;
        // 检查是否有右子树，若有则压入右子树的最左路径
        if (node.right != null) {
            node = node.right;
            while (node != null) {
                stack.push(node);
                node = node.left;
            }
        }
        return value;
    }

    public boolean hasNext() {
        // 判断栈是否为空
        return !stack.isEmpty();
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度：** `next()` 和 `hasNext()` 操作的平均时间复杂度都是 $O(1)$。虽然在最坏情况下`next()`可能是 $O(h)$，其中 $h$ 是树的高度，但因为节点总数是固定的，随着树的节点不断被访问，这些操作的均摊时间复杂度为 $O(1)$。  
  
**空间复杂度：** 由于需要维护一个显式的栈以保存未遍历节点，所以空间复杂度是 $O(h)$，其中 $h$ 是树的高度。在最坏情况下，这一复杂度接近于 $O(\log n)$（对于平衡树）或 $O(n)$（对于一条直线的树）。
