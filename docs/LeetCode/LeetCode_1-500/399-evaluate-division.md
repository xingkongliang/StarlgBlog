---
sidebar_position: 399
tags:
  - graph
  - union-find
  - depth-first-search
  - Medium
---

# 399. Evaluate Division

标签: `graph`, `union-find`, `depth-first-search`

难度: Medium

通过率: 62.49%

原题链接: https://leetcode.com/problems/evaluate-division/description/

## 题目描述
你被给定了一个由变量对构成的方程数组和一个实数值数组。每个方程的形式为 $[A_i, B_i]$，其值为 $A_i / B_i = values[i]$。每个 $A_i$ 或 $B_i$ 是表示单个变量的字符串。还给定一些查询，查询为 $[C_j, D_j]$，要求你找到 $C_j / D_j = ?$ 的答案。返回所有查询的答案。如果一个答案无法确定，则返回 -1.0。

示例 1：

输入: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
输出: [6.00000,0.50000,-1.00000,1.00000,-1.00000]

说明: 
给定: a / b = 2.0, b / c = 3.0
查询: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ? 
返回: [6.0, 0.5, -1.0, 1.0, -1.0 ]
注意: x 是未定义的变量 => -1.0

## 解题思路
我们可以将每个等式视作图中的一条带权边，其中变量是节点，边的权值是变量之间的比例关系。给定查询等价于在图中寻找两节点之间的路径，并通过路径上的权重计算出结果。可以用深度优先搜索（DFS）或并查集（类似）来实现这个操作。以下是使用DFS方法的解题思路：

1. **建立有向图**：以每个变量为图中的一个节点，用每个比例 (value) 为边的权重，建立有向图的数据结构。例如"a/b=2.0" 可以表示为有向边a -> b，权重为2.0。还需要加上边b -> a，权重为1/2.0，确保图可以双向搜索。
2. **DFS查找路径**：对于每个查询，使用DFS在图中搜索从初始节点到目标节点的路径。在搜索过程中累积边权重以得到最终结果。
3. **处理特殊情况**：
   - 如果在搜索过程中发现查询涉及未定义的变量，则直接返回 -1。
   - 自身除法返回1（如a/a）。

通过DFS，我们可以有效地查找到任意两点之间的路径，并计算出对应的除法值。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def calcEquation(equations, values, queries):
    from collections import defaultdict

    # 构建图
    graph = defaultdict(dict)
    for (dividend, divisor), value in zip(equations, values):
        graph[dividend][divisor] = value
        graph[divisor][dividend] = 1 / value

    def dfs(start, end, visited):
        # 如果节点已经访问过，跳过（避免循环）
        if start not in graph or end not in graph:
            return -1.0
        if end in graph[start]:
            return graph[start][end]
        visited.add(start)
        for neighbor, value in graph[start].items():
            if neighbor not in visited:
                temp = dfs(neighbor, end, visited)
                if temp == -1:
                    continue
                else:
                    return value * temp
        return -1.0

    results = []
    for dividend, divisor in queries:
        if dividend == divisor:
            # 自身除法返回1
            if dividend in graph:
                results.append(1.0)
            else:
                results.append(-1.0)
        else:
            results.append(dfs(dividend, divisor, set()))
    return results
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class UnionFind {
    constructor() {
        this.parent = {};
        this.weight = {};
    }

    find(x) {
        if (!(x in this.parent)) {
            this.parent[x] = x;
            this.weight[x] = 1.0;
        }

        if (x !== this.parent[x]) {
            const origParent = this.parent[x];
            this.parent[x] = this.find(origParent);
            this.weight[x] *= this.weight[origParent];
        }

        return this.parent[x];
    }

    union(x, y, value) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX !== rootY) {
            this.parent[rootX] = rootY;
            this.weight[rootX] = value * this.weight[y] / this.weight[x];
        }
    }

    isConnected(x, y) {
        if (!(x in this.parent) || !(y in this.parent)) return -1.0;
        if (this.find(x) !== this.find(y)) return -1.0;
        return this.weight[x] / this.weight[y];
    }
}

var calcEquation = function(equations, values, queries) {
    const uf = new UnionFind();
    
    // 构建并查集
    for (let i = 0; i < equations.length; i++) {
        const [dividend, divisor] = equations[i];
        const value = values[i];
        uf.union(dividend, divisor, value);
    }
    
    const results = [];
    for (const [dividend, divisor] of queries) {
        if (dividend === divisor && dividend in uf.parent) {
            results.push(1.0);
        } else {
            results.push(uf.isConnected(dividend, divisor));
        }
    }
    return results;
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
import java.util.*;

public class Solution {
    class Node {
        String parent;
        double ratio;
        public Node(String parent, double ratio) {
            this.parent = parent;
            this.ratio = ratio;
        }
    }

    Map<String, Node> map = new HashMap<>();

    public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {
        for (int i = 0; i < equations.size(); i++) {
            List<String> equation = equations.get(i);
            add(equation.get(0), equation.get(1), values[i]);
        }

        double[] result = new double[queries.size()];
        for (int i = 0; i < queries.size(); i++) {
            List<String> query = queries.get(i);
            result[i] = compute(query.get(0), query.get(1));
        }

        return result;
    }

    private void add(String x, String y, double value) {
        if (!map.containsKey(x) && !map.containsKey(y)) {
            map.put(x, new Node(y, value));
            map.put(y, new Node(y, 1.0));
        } else if (!map.containsKey(x)) {
            map.put(x, new Node(y, value));
        } else if (!map.containsKey(y)) {
            map.put(y, new Node(x, 1 / value));
        } else {
            Node rootX = find(x);
            Node rootY = find(y);
            if (!rootX.parent.equals(rootY.parent)) {
                rootX.parent = rootY.parent;
                rootX.ratio = value * rootY.ratio / rootX.ratio;
            }
        }
    }

    private Node find(String x) {
        Node node = map.get(x);
        if (!node.parent.equals(x)) {
            Node root = find(node.parent);
            node.parent = root.parent;
            node.ratio *= root.ratio;
        }
        return node;
    }

    private double compute(String x, String y) {
        if (!map.containsKey(x) || !map.containsKey(y)) return -1.0;
        Node rootX = find(x);
        Node rootY = find(y);
        if (!rootX.parent.equals(rootY.parent)) return -1.0;
        return rootX.ratio / rootY.ratio;
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

public class Solution {

    private Map<String, Map<String, Double>> graph = new HashMap<>();

    public double[] calcEquation(List<List<String>> equations, double[] values, List<List<String>> queries) {
        // 建立图
        for (int i = 0; i < equations.size(); i++) {
            String dividend = equations.get(i).get(0);
            String divisor = equations.get(i).get(1);
            double value = values[i];

            graph.computeIfAbsent(dividend, k -> new HashMap<>()).put(divisor, value);
            graph.computeIfAbsent(divisor, k -> new HashMap<>()).put(dividend, 1 / value);
        }

        double[] results = new double[queries.size()];
        for (int i = 0; i < queries.size(); i++) {
            results[i] = dfs(queries.get(i).get(0), queries.get(i).get(1), new HashSet<>());
        }
        return results;
    }

    private double dfs(String start, String end, Set<String> visited) {
        if (!graph.containsKey(start) || !graph.containsKey(end)) return -1.0;
        if (start.equals(end)) return 1.0;
        visited.add(start);
        Map<String, Double> neighbors = graph.get(start);
        for (Map.Entry<String, Double> entry : neighbors.entrySet()) {
            String next = entry.getKey();
            if (visited.contains(next)) continue;
            double product = dfs(next, end, visited);
            if (product != -1.0) return entry.getValue() * product;
        }
        return -1.0;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(V \times E)$，其中 $V$ 是节点的数量，即不同的变量数量，而 $E$ 是方程的数量。虽然看起来是二次方，但由于方程数量比较小，有效搜索空间也是有限的。  
  
空间复杂度为 $O(V+E)$，我们需要存储每个变量及其查找到的父节点和权重。
