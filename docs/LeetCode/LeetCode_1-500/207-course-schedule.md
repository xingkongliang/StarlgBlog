---
sidebar_position: 207
tags:
  - graph
  - depth-first-search
  - breadth-first-search
  - topological-sort
  - Medium
---

# 207.课程表

标签: `graph`, `depth-first-search`, `breadth-first-search`, `topological-sort`

难度: Medium

通过率: 48.0%

原题链接: https://leetcode.com/problems/course-schedule/description/

## 题目描述
有一共有 numCourses 门课，你需要修完这些课，课程编号从 0 到 numCourses - 1。你得到一个数组 prerequisites，其中 prerequisites[i] = [ai, bi] 表示如果你想选修课程 ai，你需要先完成课程 bi。返回 true 如果你能够完成所有课程，否则返回 false。

## 解题思路
该问题可以转化为检测是否存在有向环的问题，也即是判断一个有向图是否为无环图（DAG）。我们可以通过拓扑排序来解决这个问题。拓扑排序的具体步骤如下：

1. 构建图：将课程和先修关系以图的形式表示。课程序列可以作为图的节点，而先修关系可以作为有向边。
2. 计算每个节点的入度：入度表示需要先修课程的数量。
3. 使用一个队列保存所有入度为 0 的节点，这些节点表示可以直接选修的课程。
4. 开始处理队列中的节点：
   - 取出队列中的节点，表示当前可以选修该课程。
   - 然后减少该课程所有出边（子课程）的入度。
   - 如果某个子课程的入度变为 0，则将其加入队列，表示该课程现在可以选修。
5. 重复步骤 4，直到队列为空为止。
6. 如果能够处理所有节点则返回 true， 否则返回 false 指示存在环。

这样，该问题可以通过广度优先搜索解决，使用队列来模拟拓扑排序过程。自然也可以使用深度优先搜索通过颜色标记或栈实现拓扑排序来解决。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
from collections import defaultdict, deque

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        graph = defaultdict(list)
        indegree = [0] * numCourses
        
        # 建图并计算入度
        for u, v in prerequisites:
            graph[v].append(u)
            indegree[u] += 1
        
        # 将入度为0的节点加入队列
        queue = deque([i for i in range(numCourses) if indegree[i] == 0])
        
        visited = 0
        while queue:
            node = queue.popleft()
            visited += 1
            # 对于node的每一个邻接点，将其入度减1
            for neighbor in graph[node]:
                indegree[neighbor] -= 1
                # 如果入度减为0，则加入队列
                if indegree[neighbor] == 0:
                    queue.append(neighbor)
        
        # 如果能访问所有节点，则返回True，否则返回False
        return visited == numCourses
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<int> indegree(numCourses, 0);
        vector<vector<int>> graph(numCourses);
        
        for (auto& pre : prerequisites) {
            graph[pre[1]].push_back(pre[0]);
            indegree[pre[0]]++;
        }
        
        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) q.push(i);
        }

        int visited = 0;
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            visited++;
            for (int neighbor : graph[node]) {
                indegree[neighbor]--;
                if (indegree[neighbor] == 0) q.push(neighbor);
            }
        }
        return visited == numCourses;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    let graph = Array.from({length: numCourses}, () => []);
    let indegree = new Array(numCourses).fill(0);

    for (let [u, v] of prerequisites) {
        graph[v].push(u);
        indegree[u]++;
    }
    
    let queue = [];
    for (let i = 0; i < numCourses; i++) {
        if (indegree[i] === 0) queue.push(i);
    }

    let visited = 0;
    while (queue.length > 0) {
        let node = queue.shift();
        visited++;
        for (let neighbor of graph[node]) {
            indegree[neighbor]--;
            if (indegree[neighbor] === 0) queue.push(neighbor);
        }
    }

    return visited === numCourses;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        int[] indegree = new int[numCourses];
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) {
            graph.add(new ArrayList<>());
        }

        for (int[] pre : prerequisites) {
            graph.get(pre[1]).add(pre[0]);
            indegree[pre[0]]++;
        }
        
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) queue.offer(i);
        }

        int visited = 0;
        while (!queue.isEmpty()) {
            int node = queue.poll();
            visited++;
            for (int neighbor : graph.get(node)) {
                indegree[neighbor]--;
                if (indegree[neighbor] == 0) queue.offer(neighbor);
            }
        }

        return visited == numCourses;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(V + E)$，其中 $V$ 是课程数，$E$ 是先修课程关系数。

空间复杂度为 $O(V + E)$，因为我们需要存储图结构和节点的入度。
