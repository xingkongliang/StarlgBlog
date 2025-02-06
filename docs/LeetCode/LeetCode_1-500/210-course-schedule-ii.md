---
sidebar_position: 210
tags:
  - graph
  - topological-sort
  - depth-first-search
  - breadth-first-search
  - Medium
---

# 210.课程安排 II

标签: `graph`, `topological-sort`, `depth-first-search`, `breadth-first-search`

难度: Medium

通过率: 52.09%

原题链接: https://leetcode.com/problems/course-schedule-ii/description/

## 题目描述
给定一个表示课程先后顺序的数组 prerequisites，其中 prerequisites[i] = [a_i, b_i] 表示在选修课程 a_i 之前，你必须修完课程 b_i 。返回课程的一个排序，以便你可以顺利完成所有课程。如果不可能完成所有课程，返回一个空数组。

## 解题思路
问题本质上是寻找一个有向图的拓扑排序。若存在一个拓扑排序，则可以完成所有课程。否则，说明图中存在环，无法完成课程。我们可以通过以下两种方法解决问题：

1. **深度优先搜索(DFS)**: 使用DFS检测图中的环，并生成一个拓扑排序。
   - 使用一个状态数组，记录每个节点的状态：未访问，访问中，已访问。
   - 如果在进行DFS的过程中再次访问到一个访问中的节点，说明存在环。
   - 如果不存在环，每次DFS完成一个节点后，将其加入结果数组。

2. **广度优先搜索(BFS, Kahn's Algorithm)**: 使用入度数组和队列实现。
   - 初始化每个节点的入度，并将入度为0的节点加入队列。
   - 每次从队列中取出入度为0的节点，加入结果数组，并在图中移除该节点，减少其邻接节点的入度。
   - 如果最终结果数组中含有所有节点，则表示存在拓扑排序，否则表示存在环。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def findOrder(numCourses, prerequisites):
    # 构建邻接表和入度数组
    from collections import defaultdict, deque
    adj_list = defaultdict(list)
    indegree = [0] * numCourses
    
    # 填充邻接表和入度数组
    for dest, src in prerequisites:
        adj_list[src].append(dest)
        indegree[dest] += 1
    
    # 初始化队列，将所有入度为0的节点入队
    zero_indegree_queue = deque([k for k in range(numCourses) if indegree[k] == 0])
    topological_sorted_order = []
    
    # 处理队列中的节点
    while zero_indegree_queue:
        vertex = zero_indegree_queue.popleft()
        topological_sorted_order.append(vertex)
        # 减少相邻节点的入度
        for neighbor in adj_list[vertex]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                zero_indegree_queue.append(neighbor)
    
    if len(topological_sorted_order) == numCourses:
        return topological_sorted_order
    else:
        return []

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        // 构建邻接表和入度数组
        vector<vector<int>> adj_list(numCourses);
        vector<int> indegree(numCourses, 0);
        for (const auto& prereq : prerequisites) {
            adj_list[prereq[1]].push_back(prereq[0]);
            indegree[prereq[0]]++;
        }
        // 初始化队列，将所有入度为0的节点入队
        queue<int> zero_indegree_queue;
        for (int i = 0; i < numCourses; ++i) {
            if (indegree[i] == 0) {
                zero_indegree_queue.push(i);
            }
        }
        vector<int> topological_sorted_order;
        // 处理队列中的节点
        while (!zero_indegree_queue.empty()) {
            int vertex = zero_indegree_queue.front();
            zero_indegree_queue.pop();
            topological_sorted_order.push_back(vertex);
            for (auto neighbor : adj_list[vertex]) {
                indegree[neighbor]--;
                if (indegree[neighbor] == 0) {
                    zero_indegree_queue.push(neighbor);
                }
            }
        }
        if (topological_sorted_order.size() == numCourses) {
            return topological_sorted_order;
        } else {
            return {};
        }
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function findOrder(numCourses, prerequisites) {
    // 构建邻接表和入度数组
    const adjList = new Array(numCourses).fill(0).map(() => []);
    const indegree = new Array(numCourses).fill(0);
    for (const [course, pre] of prerequisites) {
        adjList[pre].push(course);
        indegree[course]++;
    }
    // 初始化队列，将所有入度为0的节点入队
    const zeroIndegreeQueue = [];
    for (let i = 0; i < numCourses; i++) {
        if (indegree[i] === 0) {
            zeroIndegreeQueue.push(i);
        }
    }
    const topologicalSortedOrder = [];
    // 处理队列中的节点
    while (zeroIndegreeQueue.length) {
        const vertex = zeroIndegreeQueue.shift();
        topologicalSortedOrder.push(vertex);
        for (const neighbor of adjList[vertex]) {
            indegree[neighbor]--;
            if (indegree[neighbor] === 0) {
                zeroIndegreeQueue.push(neighbor);
            }
        }
    }
    if (topologicalSortedOrder.length === numCourses) {
        return topologicalSortedOrder;
    } else {
        return [];
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

public class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        // 构建邻接表和入度数组
        List<List<Integer>> adjList = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) {
            adjList.add(new ArrayList<>());
        }
        int[] indegree = new int[numCourses];
        for (int[] pair : prerequisites) {
            adjList.get(pair[1]).add(pair[0]);
            indegree[pair[0]]++;
        }
        // 初始化队列，将所有入度为0的节点入队
        Queue<Integer> zeroIndegreeQueue = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) {
                zeroIndegreeQueue.offer(i);
            }
        }
        int[] topologicalSortedOrder = new int[numCourses];
        int index = 0;
        // 处理队列中的节点
        while (!zeroIndegreeQueue.isEmpty()) {
            int vertex = zeroIndegreeQueue.poll();
            topologicalSortedOrder[index++] = vertex;
            for (int neighbor : adjList.get(vertex)) {
                indegree[neighbor]--;
                if (indegree[neighbor] == 0) {
                    zeroIndegreeQueue.offer(neighbor);
                }
            }
        }
        if (index == numCourses) {
            return topologicalSortedOrder;
        } else {
            return new int[0];
        }
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(V + E)$，其中 $V$ 是课程数量，$E$ 是先修课要求的数量。因为我们需要遍历每个节点和每条边。  
  
空间复杂度：$O(V + E)$，用于表示图的邻接表和保存每个节点的入度信息。
