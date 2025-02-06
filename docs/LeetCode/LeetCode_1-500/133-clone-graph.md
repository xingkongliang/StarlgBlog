---
sidebar_position: 133
tags:
  - depth-first-search
  - breadth-first-search
  - graph
  - hash-table
  - Medium
---

# 133.克隆图

标签: `depth-first-search`, `breadth-first-search`, `graph`, `hash-table`

难度: Medium

通过率: 60.27%

原题链接: https://leetcode.com/problems/clone-graph/description/

## 题目描述
给定一个无向连通图的一个节点引用，返回对该图的深度拷贝（克隆）。除了节点值（int）外，每个节点还包含一个邻居列表（List[Node]）。要返回克隆节点的引用，作为克隆图的起始点。

## 解题思路
要实现图的深度拷贝，我们可以使用深度优先搜索（DFS）或者广度优先搜索（BFS）来遍历图，同时构建一个映射，以复制每个节点及其邻居。基本思路如下：

1. 使用一个散列表（也称为映射）来记录已经克隆过的节点（这样就避免重复克隆，以及形成环路）。

2. 对于给定的起始节点，如果此前未被克隆过，则创建一个新节点，并把它记录在散列表中。

3. 递归（或迭代）地克隆每个节点的邻居，并将克隆的邻居添加到当前克隆节点的邻居列表中。

4. 最终返回克隆的起始节点。

这种方案中，我们使用的映射的键是原始节点，值是克隆过的节点。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        if not node:
            return None

        # 创建一个哈希表保存已克隆的节点
        cloned = {}

        # 使用DFS克隆图
        def dfs(node):
            # 如果节点已克隆过，直接返回其克隆
            if node in cloned:
                return cloned[node]

            # 克隆当前节点
            clone = Node(node.val)
            cloned[node] = clone

            # 克隆邻居
            for neighbor in node.neighbors:
                clone.neighbors.append(dfs(neighbor))
            return clone

        return dfs(node)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node() {
        val = 0;
        neighbors = vector<Node*>();
    }
    Node(int _val) {
        val = _val;
        neighbors = vector<Node*>();
    }
    Node(int _val, vector<Node*> _neighbors) {
        val = _val;
        neighbors = _neighbors;
    }
};

class Solution {
public:
    Node* cloneGraph(Node* node) {
        if (!node) return nullptr;

        unordered_map<Node*, Node*> cloned;

        // Lambda表达式用于递归DFS克隆节点
        function<Node*(Node*)> dfs = [&](Node* curr) {
            if (cloned.find(curr) != cloned.end())
                return cloned[curr];

            // 克隆当前节点
            Node* clone = new Node(curr->val);
            cloned[curr] = clone;

            // 克隆邻居
            for (Node* neighbor : curr->neighbors) {
                clone->neighbors.push_back(dfs(neighbor));
            }

            return clone;
        };

        return dfs(node);
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
/**
 * Definition for a Node.
 * function Node(val,neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * } */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
    if (!node) return null;

    const cloned = new Map();

    const dfs = (node) => {
        if (cloned.has(node)) return cloned.get(node);

        // 创建新节点
        const clone = new Node(node.val);
        cloned.set(node, clone);

        // 克隆邻居
        for (let neighbor of node.neighbors) {
            clone.neighbors.push(dfs(neighbor));
        }

        return clone;
    };

    return dfs(node);
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
/**
 * Definition for a Node.
 * class Node {
 *     public int val;
 *     public List<Node> neighbors;
 *     public Node() {
 *         val = 0;
 *         neighbors = new ArrayList<Node>();
 *     }
 *     public Node(int _val) {
 *         val = _val;
 *         neighbors = new ArrayList<Node>();
 *     }
 *     public Node(int _val, ArrayList<Node> _neighbors) {
 *         val = _val;
 *         neighbors = _neighbors;
 *     }
 * }
 */

class Solution {
    public Node cloneGraph(Node node) {
        if (node == null) return null;

        Map<Node, Node> cloned = new HashMap<>();

        // DFS函数
        return dfs(node, cloned);
    }
    
    private Node dfs(Node node, Map<Node, Node> cloned) {
        if (cloned.containsKey(node)) return cloned.get(node);

        // 克隆当前节点
        Node clone = new Node(node.val);
        cloned.put(node, clone);

        // 克隆邻居
        for (Node neighbor : node.neighbors) {
            clone.neighbors.add(dfs(neighbor, cloned));
        }

        return clone;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(V + E)$，其中 $V$ 是节点数，$E$ 是边数。每个节点和每条边都只会遍历一次。
空间复杂度：$O(V)$，用于存储已克隆的节点。
