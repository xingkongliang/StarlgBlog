---
sidebar_position: 218
tags:
  - divide-and-conquer
  - heap
  - Hard
---

# 218.天际线问题

标签: `divide-and-conquer`, `heap`

难度: Hard

通过率: 43.36%

原题链接: https://leetcode.com/problems/the-skyline-problem/description/

## 题目描述
给定一个城市中所有建筑的位置信息和高度，返回由这些建筑共同形成的天际线。每个建筑信息给定为一个数组 buildings，其中 buildings[i] = [lefti, righti, heighti] 。

## 解题思路
对于此问题，我们可以使用分治法和最大堆来解决。其基本思路是：

1. 收集所有关键点。在所有建筑物中收集建筑物的开头和结束的关键点，并且记录是开始还是结束。
2. 对所有关键点按照 x 坐标进行排序。对于相同的 x 值，如果是开始关键点，按高度降序排列；如果是结束关键点，按高度升序排列。
3. 使用最大堆动态地维护活跃的建筑物高度。对于每一个关键点：
   - 如果是建筑物开始，则加入堆中。
   - 如果是建筑物结束，从堆中移除该建筑物。
4. 对于每一个关键点，检查当前最大高度是否与上一个最大高度不同，如果不同，说明这是一个新的轮廓关键点，应将其加入到结果中。

通过这种方法，我们可以有效地检测建筑物轮廓线的变换，并最终返回完整的天际线轮廓。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
import heapq

def getSkyline(buildings):
    # 建立事件列表，包括起始和结束事件
    events = [(L, -H, R) for L, R, H in buildings]
    # 结束事件
    events += [(R, 0, None) for _, R, _ in buildings]
    # 按照 (x, 高度) 排序，如果 x 相同，起始的高度负数排在前面
    events.sort()

    # 优先队列/最大堆，使用负数表示最大堆效果
    result = [[0, 0]]
    liveHeap = [(0, float('inf'))]

    for x, negH, R in events:
        # 移除已过期的建筑物
        while liveHeap[0][1] <= x:
            heapq.heappop(liveHeap)
        if negH:
            # 把新的建筑物加入堆中
            heapq.heappush(liveHeap, (negH, R))
        # 查询当前最大高度
        maxH = -liveHeap[0][0]
        # 如果最高点不变，不需要加入结果集
        if result[-1][1] != maxH:
            result.append([x, maxH])
    return result[1:]

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
cpp
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class Solution {
public:
    vector<vector<int>> getSkyline(vector<vector<int>>& buildings) {
        vector<vector<int>> events;
        // 创建事件列表，包括每个建筑的开始和结束
        for (const auto& building : buildings) {
            events.push_back({building[0], -building[2], building[1]}); // 开始事件
            events.push_back({building[1], 0, 0}); // 结束事件
        }
        // 按x排序，x相同，高度由高到低
        sort(events.begin(), events.end());

        // 使用multiset作为最大堆
        multiset<int> heights = {0};
        vector<vector<int>> result;
        int prev_max_height = 0;
        
        for (const auto& event : events) {
            // 事件发生在x
            int x = event[0], h = event[1], r = event[2];
            
            if (h < 0) {
                // 如果是开始事件，将高度加入集合
                heights.insert(-h);
            } else {
                // 结束事件，将高度移出集合
                heights.erase(heights.find(r));
            }

            // 获取当前最大高度
            int current_max_height = *heights.rbegin();

            // 发现高度变化，记录关键节点
            if (current_max_height != prev_max_height) {
                result.push_back({x, current_max_height});
                prev_max_height = current_max_height;
            }
        }

        return result;
    }
};

```

</TabItem>
<TabItem value="java" label="Java">

```java
function getSkyline(buildings) {
    // 创建事件数组，包括建筑的开始和结束
    const events = [];
    buildings.forEach(([L, R, H]) => {
        events.push([L, -H, R]);  // 开始事件
        events.push([R, 0, 0]);   // 结束事件
    });

    // 按x排序，如果相同则按照h的降序
    events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    const result = [];
    const live = [[0, Infinity]];  // 当前活动建筑高度及其终点

    events.forEach(([x, h, R]) => {
        // 移除已经过去了的建筑
        while (live[0][1] <= x) live.shift();
        // 添加新建筑到堆
        if (h !== 0) live.unshift([h, R]);
        // 进行堆的排序，保持最大堆性质
        live.sort((a, b) => b[0] - a[0]);
        // 变换高度则将点加入结果
        if (result.length === 0 || result[result.length - 1][1] !== -live[0][0]) {
            result.push([x, -live[0][0]]);
        }
    });

    return result;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度: $O(n \log n)$，其中 $n$ 是建筑物的数量。我们需要对所有事件进行排序，并使用堆来管理当前的建筑物。

空间复杂度: $O(n)$，用于存储堆和最终结果。
