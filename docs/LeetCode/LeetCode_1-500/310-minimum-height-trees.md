---
sidebar_position: 310
tags:
  - tree
  - breadth-first-search
  - graph
  - Medium
---

# 310.树的最小高度

标签: `tree`, `breadth-first-search`, `graph`

难度: Medium

通过率: 41.9%

原题链接: https://leetcode.com/problems/minimum-height-trees/description/

## 题目描述
一棵树是一个无向图，其中任意两个节点之间只有一个路径。简单来说，没有简单环的连通图就是树。 给定一个由 $n$ 个节点（标记为0到$n-1$）组成的树，以及一个包含$n-1$条边的数组edges，其中edges[i] = [ai, bi] 表示节点 ai 和 bi 之间存在一条无向边。 可以选择树的任何节点作为根。当选择节点 $x$ 作为根时，结果树的高度为 $h$。在可能的所有树中，具有最小高度的树被称为最小高度树(MHTs)。 返回所有MHTs的根标签列表。您可以以任何顺序返回答案。 树的高度是从根到叶子的最长路径上的边数。

## 解题思路
解决这个问题的核心思想是找到距离树中心最近的点。我们可以通过逐步去除叶子节点，直到剩余最多两个结点为止。剩下的结点就是离树中心最近的结点，也即潜在的最小高度树的根节点。具体步骤如下： 1. 将所有节点和边转换成邻接列表。 2. 初始化所有叶子节点（度为1的节点）。 3. 进行拓扑排序；从图中逐步去除叶子节点，更新每个相邻节点的度。当度变为1时，意味着它成为新的叶子节点。 4. 重复上述步骤直到图中剩余最多两个节点。这些剩余的节点就是所有可能的MHT的根。 这种方法基于拓扑排序，类似于Kahn的算法，用来找出有向图的拓扑排序。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def findMinHeightTrees(n, edges):
    if n == 1:
        return [0]  # 特殊情况：只有一个节点

    from collections import defaultdict, deque

    # 构建图的邻接表
    neighbors = defaultdict(list)
    for start, end in edges:
        neighbors[start].append(end)
        neighbors[end].append(start)

    # 初始化叶子节点
    leaves = deque([i for i in range(n) if len(neighbors[i]) == 1])

    # 剩余的节点数
    remaining_nodes = n

    # 移除叶子节点，直到剩余的节点数 <= 2
    while remaining_nodes > 2:
        leaves_size = len(leaves)
        remaining_nodes -= leaves_size
        new_leaves = deque()

        # 移除当前叶子节点，并寻找新的叶子节点
        while leaves:
            leaf = leaves.popleft()
            # 叶子节点的邻居
            neighbor = neighbors[leaf].pop()
            neighbors[neighbor].remove(leaf)

            # 如果邻居变成了新的叶子节点
            if len(neighbors[neighbor]) == 1:
                new_leaves.append(neighbor)

        # 更新叶子节点队列
        leaves = new_leaves

    # 剩余的节点就是最小高度树的根
    return list(leaves)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<int> findMinHeightTrees(int n, vector<vector<int>>& edges) {
        if (n == 1) return {0};  // 特殊情况：只有一个节点
        
        vector<vector<int>> adj(n);
        // 构建图的邻接表
        for (auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }
        
        // 使用队列来存储叶子节点
        queue<int> leaves;
        for (int i = 0; i < n; ++i) {
            if (adj[i].size() == 1) leaves.push(i);
        }
        
        int remainingNodes = n;
        while (remainingNodes > 2) {
            int leavesSize = leaves.size();
            remainingNodes -= leavesSize;
            for (int i = 0; i < leavesSize; ++i) {
                int leaf = leaves.front();
                leaves.pop();

                for (int neighbor : adj[leaf]) {
                    adj[neighbor].erase(remove(adj[neighbor].begin(), adj[neighbor].end(), leaf), adj[neighbor].end());
                    if (adj[neighbor].size() == 1) leaves.push(neighbor);
                }
            }
        }
        vector<int> result;
        while (!leaves.empty()) {
            result.push_back(leaves.front());
            leaves.pop();
        }
        return result;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
var findMinHeightTrees = function(n, edges) {
    if (n === 1) return [0];  // 特殊情况：只有一个节点

    const neighbors = Array.from({length: n}, () => []);
    // 构建图的邻接表
    for (let [start, end] of edges) {
        neighbors[start].push(end);
        neighbors[end].push(start);
    }

    const leaves = [];
    for (let i = 0; i < n; i++) {
        if (neighbors[i].length === 1) {
            leaves.push(i);
        }
    }

    let remainingNodes = n;
    while (remainingNodes > 2) {
        const size = leaves.length;
        remainingNodes -= size;
        for (let i = 0; i < size; i++) {
            const leaf = leaves.shift();
            for (let neighbor of neighbors[leaf]) {
                neighbors[neighbor] = neighbors[neighbor].filter(v => v !== leaf);
                if (neighbors[neighbor].length === 1) {
                    leaves.push(neighbor);
                }
            }
        }
    }

    return leaves;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
public List<Integer> findMinHeightTrees(int n, int[][] edges) {
    if (n == 1) return Collections.singletonList(0); // 特殊情况：只有一个节点

    List<Set<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; ++i) adj.add(new HashSet<>());
    // 构建图的邻接表
    for (int[] edge : edges) {
        adj.get(edge[0]).add(edge[1]);
        adj.get(edge[1]).add(edge[0]);
    }

    List<Integer> leaves = new ArrayList<>();
    for (int i = 0; i < n; ++i) {
        if (adj.get(i).size() == 1) leaves.add(i);
    }

    int remainingNodes = n;
    while (remainingNodes > 2) {
        remainingNodes -= leaves.size();
        List<Integer> newLeaves = new ArrayList<>();

        for (int leaf : leaves) {
            int neighbor = adj.get(leaf).iterator().next();
            adj.get(neighbor).remove(leaf);
            if (adj.get(neighbor).size() == 1) newLeaves.add(neighbor);
        }

        leaves = newLeaves;
    }

    return leaves;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是节点数。每个节点和边都只被访问一次。    
    
    
空间复杂度：$O(n)$，用于存储邻接表和度信息。
