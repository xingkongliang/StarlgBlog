---
sidebar_position: 429
tags:
  - tree
  - breadth-first-search
  - Medium
---

# 429.N叉树的层序遍历

标签: `tree`, `breadth-first-search`

难度: Medium

通过率: 71.08%

原题链接: https://leetcode.com/problems/n-ary-tree-level-order-traversal/description/

## 题目描述
给定一个n叉树，返回其节点值的层序遍历结果。输入的n叉树采用层序遍历的方式进行序列化，每一组子节点之间用null值进行分隔。

## 解题思路
我们可以使用广度优先搜索（BFS）来解决这个问题。BFS的基本思想是从树的根节点开始，逐层访问节点。对N叉树进行BFS遍历时，我们同时维护一个队列来记录待访问的节点，并在遍历过程中逐层记录其值。具体步骤如下：

1. 初始化一个队列Queue，并将根节点放入队列中。
2. 只要队列不为空，执行以下步骤：
   - 从队列中弹出当前层的所有节点，并将它们的值加入到当前层的结果中。
   - 对于当前层的每个节点，将其所有子节点加入队列，以便在下一层访问。
3. 重复步骤2，直到队列为空。
4. 将每层的节点值结果加入到最终的结果列表中，最后返回这个列表。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class Node:
    def __init__(self, val=None, children=None):
        self.val = val
        self.children = children if children is not None else []

from collections import deque

class Solution:
    def levelOrder(self, root: 'Node') -> List[List[int]]:
        if not root:
            return []
        result = []
        queue = deque([root])  # 使用双端队列进行层次遍历
        while queue:
            level_size = len(queue)
            level_values = []
            for _ in range(level_size):
                node = queue.popleft()  # 逐层弹出节点
                level_values.append(node.val)
                for child in node.children:
                    queue.append(child)  # 将子节点加入队列
            result.append(level_values)  # 将当前层的值加入结果中
        return result
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Node {
    public int val;
    public List<Node> children;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, List<Node> _children) {
        val = _val;
        children = _children;
    }
};

class Solution {
    public List<List<Integer>> levelOrder(Node root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) {
            return result;
        }
        Queue<Node> queue = new LinkedList<>();
        queue.offer(root); // 将根节点加入队列
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> levelValues = new ArrayList<>();
            for (int i = 0; i < levelSize; i++) {
                Node node = queue.poll(); // 弹出层级中的节点
                levelValues.add(node.val);
                queue.addAll(node.children); // 将子节点加入队列
            }
            result.add(levelValues); // 将当前层的值加入结果
        }
        return result;
    }
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function Node(val, children) {
    this.val = val === undefined ? null : val;
    this.children = children === undefined ? [] : children;
}

var levelOrder = function(root) {
    if (!root) return [];
    const result = [];
    const queue = [root]; // 初始化队列并将根节点加入
    while (queue.length > 0) {
        const levelSize = queue.length;
        const levelValues = [];
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift(); // 从队列中获取节点
            levelValues.push(node.val);
            node.children.forEach(child => queue.push(child)); // 将子节点加入
        }
        result.push(levelValues); // 将当前层的值加入结果
    }
    return result;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.List;
import java.util.ArrayList;
import java.util.Queue;
import java.util.LinkedList;

class Node {
    public int val;
    public List<Node> children;

    public Node() {}

    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, List<Node> _children) {
        val = _val;
        children = _children;
    }
}

class Solution {
    public List<List<Integer>> levelOrder(Node root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<Node> queue = new LinkedList<>();
        queue.offer(root); // 将根节点放入队列
        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> levelValues = new ArrayList<>();
            for (int i = 0; i < levelSize; i++) {
                Node node = queue.poll(); // 从队列中获取节点
                levelValues.add(node.val);
                queue.addAll(node.children); // 将当前节点的所有子节点加入队列
            }
            result.add(levelValues); // 将当前层的节点值加入结果
        }
        return result;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(N)$，其中$N$是树中的节点数量。因为每个节点都需要访问一次。  
  
空间复杂度：$O(W)$，其中$W$是树的最大宽度，也就是在某一层中拥有最多节点的层的节点数。实际使用的额外空间主要是用于维护队列。
