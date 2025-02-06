---
sidebar_position: 407
tags:
  - heap
  - breadth-first-search
  - Hard
---

# 407.接雨水 II

标签: `heap`, `breadth-first-search`

难度: Hard

通过率: 48.62%

原题链接: https://leetcode.com/problems/trapping-rain-water-ii/description/

## 题目描述
给定一个 $m \times n$ 的整数矩阵 heightMap 代表2D地形图的每个单元格的高度，返回下雨后它能捕获的水的体积。

## 解题思路
问题需要找到在地形中能捕获水的区域。一个有效的解决方案是使用广度优先搜索（BFS）并结合最小堆来解决。具体步骤如下：

1. **初始化**：我们需要一个优先队列（最小堆）来处理边界最低部分。首先将地形的四个边界全部放入优先队列中，作为初始边界。

2. **开始搜索**：从优先队列中取出高度最低的单元格，这是我们当前最低的边界。使用这个单元格的高度（当前最小高度）作为水能否留存的判断基准。

3. **扩大搜索区域**：从当前最低的单元格出发，检查其相邻（上下左右）的单元格：
   - 如果邻近的单元格的高度低于当前最小高度，说明可以容纳水，水量是当前最小高度与邻近单元格高度的差，加入水量中。
   - 更新邻近单元格为已访问，并将其添加到优先队列中（其高度默认为边界）。

4. **重复**上述过程，直到优先队列为空。此时所有可能蓄水的区域都已计算。

该方法类似于“墙倒水漫”的思路，在探索空间时，总是跟随最低高的边界扩展计算，当越过坡度时就记录水量。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
import heapq  # Python的优先队列需要使用heapq库

def trapRainWater(heightMap):
    if not heightMap or not heightMap[0]:
        return 0

    m, n = len(heightMap), len(heightMap[0])
    visited = [[False] * n for _ in range(m)]  # 判定是否访问过
    heap = []
    
    # 把所有边界加入堆中
    for i in range(m):
        heapq.heappush(heap, (heightMap[i][0], i, 0))
        heapq.heappush(heap, (heightMap[i][n-1], i, n-1))
        visited[i][0] = visited[i][n-1] = True
    for j in range(1, n-1):  # 避免角落重复加入
        heapq.heappush(heap, (heightMap[0][j], 0, j))
        heapq.heappush(heap, (heightMap[m-1][j], m-1, j))
        visited[0][j] = visited[m-1][j] = True
        
    result = 0
    directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]  # 上下左右四个方向
    
    # 开始BFS
    while heap:
        height, x, y = heapq.heappop(heap)
        # 检查四个方向
        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            if 0 <= nx < m and 0 <= ny < n and not visited[nx][ny]:
                visited[nx][ny] = True
                # 水量计算，水只能有height那么高
                result += max(0, height - heightMap[nx][ny])
                # 新单元加入堆
                heapq.heappush(heap, (max(heightMap[nx][ny], height), nx, ny))

    return result
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int trapRainWater(vector<vector<int>>& heightMap) {
        if (heightMap.empty() || heightMap[0].empty())
            return 0;

        int m = heightMap.size(), n = heightMap[0].size();
        vector<vector<bool>> visited(m, vector<bool>(n, false));
        priority_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, greater<>> minHeap;

        // 初始化，把边界加入堆中
        for (int i = 0; i < m; ++i) {
            minHeap.emplace(heightMap[i][0], i, 0);
            minHeap.emplace(heightMap[i][n - 1], i, n - 1);
            visited[i][0] = visited[i][n - 1] = true;
        }
        for (int j = 1; j < n - 1; ++j) {
            minHeap.emplace(heightMap[0][j], 0, j);
            minHeap.emplace(heightMap[m - 1][j], m - 1, j);
            visited[0][j] = visited[m - 1][j] = true;
        }

        int result = 0;
        vector<pair<int, int>> directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

        // 开始BFS
        while (!minHeap.empty()) {
            auto [height, x, y] = minHeap.top();
            minHeap.pop();

            for (auto& [dx, dy] : directions) {
                int nx = x + dx, ny = y + dy;
                if (nx >= 0 && nx < m && ny >= 0 && ny < n && !visited[nx][ny]) {
                    visited[nx][ny] = true;
                    result += max(0, height - heightMap[nx][ny]);
                    minHeap.emplace(max(heightMap[nx][ny], height), nx, ny);
                }
            }
        }

        return result;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function trapRainWater(heightMap) {
    if (!heightMap || !heightMap.length || !heightMap[0].length) {
        return 0;
    }

    const m = heightMap.length;
    const n = heightMap[0].length;
    const visited = Array.from({ length: m }, () => Array(n).fill(false));
    const heap = new MinPriorityQueue();

    // 初始化，把边界加入堆中
    for (let i = 0; i < m; i++) {
        heap.enqueue([heightMap[i][0], i, 0]);
        heap.enqueue([heightMap[i][n - 1], i, n - 1]);
        visited[i][0] = visited[i][n - 1] = true;
    }

    for (let j = 1; j < n - 1; j++) {
        heap.enqueue([heightMap[0][j], 0, j]);
        heap.enqueue([heightMap[m - 1][j], m - 1, j]);
        visited[0][j] = visited[m - 1][j] = true;
    }

    let result = 0;
    const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];

    // 广度优先搜索
    while (!heap.isEmpty()) {
        const [height, x, y] = heap.dequeue().element;

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < m && ny >= 0 && ny < n && !visited[nx][ny]) {
                visited[nx][ny] = true;
                // 计算蓄水高度
                result += Math.max(0, height - heightMap[nx][ny]);
                heap.enqueue([Math.max(heightMap[nx][ny], height), nx, ny]);
            }
        }
    }

    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.PriorityQueue;

class Solution {
    public int trapRainWater(int[][] heightMap) {
        if (heightMap == null || heightMap.length == 0 || heightMap[0].length == 0) return 0;

        int m = heightMap.length, n = heightMap[0].length;

        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        boolean[][] visited = new boolean[m][n];

        // 初始化，把边界加入堆中
        for (int i = 0; i < m; i++) {
            pq.offer(new int[]{heightMap[i][0], i, 0});
            pq.offer(new int[]{heightMap[i][n - 1], i, n - 1});
            visited[i][0] = visited[i][n - 1] = true;
        }

        for (int j = 1; j < n - 1; j++) {
            pq.offer(new int[]{heightMap[0][j], 0, j});
            pq.offer(new int[]{heightMap[m - 1][j], m - 1, j});
            visited[0][j] = visited[m - 1][j] = true;
        }

        int result = 0;
        int[][] directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};

        // 广度优先搜索
        while (!pq.isEmpty()) {
            int[] cur = pq.poll();
            int height = cur[0], x = cur[1], y = cur[2];

            for (int[] dir : directions) {
                int nx = x + dir[0], ny = y + dir[1];
                if (nx >= 0 && nx < m && ny >= 0 && ny < n && !visited[nx][ny]) {
                    visited[nx][ny] = true;
                    result += Math.max(0, height - heightMap[nx][ny]);
                    pq.offer(new int[]{Math.max(heightMap[nx][ny], height), nx, ny});
                }
            }
        }

        return result;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(mn\log(mn))$，其中$m$和$n$分别为矩阵的行数和列数。我们使用优先队列维护边界，其开销为对所有元素进行排序。


空间复杂度：$O(mn)$，用于存储每个位置的访问状态以及优先队列存储的元素。
