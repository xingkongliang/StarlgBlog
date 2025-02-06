---
sidebar_position: 447
tags:
  - array
  - hash-table
  - Medium
---

# 447.回旋镖的数量

标签: `array`, `hash-table`

难度: Medium

通过率: 55.95%

原题链接: https://leetcode.com/problems/number-of-boomerangs/description/

## 题目描述
给定平面上 $n$ 个不同的点，其中 $\text{points}[i] = [x_i, y_i]$。一个回旋镖是一个点的三元组 $(i, j, k)$，使得 $i$ 和 $j$ 之间的距离等于 $i$ 和 $k$ 之间的距离（元组的顺序很重要）。返回回旋镖的数量。

## 解题思路
我们通过计算每对点之间的距离来解决这个问题。对于每个点 $i$，计算其他点 $j$ 到点 $i$ 的距离，并将这些距离存储在一个哈希表中，其中键是距离，值是具有该距离的点的数量。对于每个距离 $d$，如果有 $v$ 个点到点 $i$ 的距离为 $d$，则有 $v \times (v-1)$ 种方式选择 $j$ 和 $k$，这是因为我们可以从 $v$ 个点中选择两个点来排列成回旋镖的第二和第三点。最后，将所有点作为中心点时获得的回旋镖数量相加，即可得到总的回旋镖数量。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def numberOfBoomerangs(points):
    # 初始化回旋镖的数量为0
    boomerangs_count = 0
    # 遍历每一个点作为中心点
    for i in points:
        # 创建一个字典来统计到点i距离相同的点的个数
        dist_count = {}
        for j in points:
            # 计算点i到点j的距离的平方，避免浮点运算
            dist = (i[0] - j[0]) ** 2 + (i[1] - j[1]) ** 2
            # 将其记录在字典中
            if dist in dist_count:
                dist_count[dist] += 1
            else:
                dist_count[dist] = 1
        # 对于每种距离，计算可以形成多少个回旋镖
        for k in dist_count:
            count = dist_count[k]
            # 只有至少有两个点的距离相同，才能形成回旋镖
            if count > 1:
                boomerangs_count += count * (count - 1)
    return boomerangs_count
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int numberOfBoomerangs(vector<vector<int>>& points) {
    int boomerangs_count = 0;
    // 遍历每个点作为中心点
    for (const auto& i : points) {
        unordered_map<int, int> dist_count;
        // 计算其他点到中心点的距离
        for (const auto& j : points) {
            int dist = (i[0] - j[0]) * (i[0] - j[0]) + (i[1] - j[1]) * (i[1] - j[1]);
            // 统计每个距离的点的个数
            dist_count[dist]++;
        }
        // 根据距离相同的点数计算回旋镖的数量
        for (const auto& d : dist_count) {
            int count = d.second;
            if (count > 1)
                boomerangs_count += count * (count - 1);
        }
    }
    return boomerangs_count;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function numberOfBoomerangs(points) {
    let boomerangs_count = 0;
    // 遍历每个点作为中心点
    points.forEach((i) => {
        const dist_count = new Map();
        // 计算其他点到中心点的距离
        points.forEach((j) => {
            const dist = Math.pow(i[0] - j[0], 2) + Math.pow(i[1] - j[1], 2);
            // 统计每个距离的点的个数
            dist_count.set(dist, (dist_count.get(dist) || 0) + 1);
        });
        // 根据距离相同的点数计算回旋镖的数量
        dist_count.forEach((count) => {
            if (count > 1) {
                boomerangs_count += count * (count - 1);
            }
        });
    });
    return boomerangs_count;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int numberOfBoomerangs(int[][] points) {
        int boomerangs_count = 0;
        // 遍历每个点作为中心点
        for (int[] i : points) {
            Map<Integer, Integer> dist_count = new HashMap<>();
            // 计算其他点到中心点的距离
            for (int[] j : points) {
                int dist = (i[0] - j[0]) * (i[0] - j[0]) + (i[1] - j[1]) * (i[1] - j[1]);
                // 统计每个距离的点的个数
                dist_count.put(dist, dist_count.getOrDefault(dist, 0) + 1);
            }
            // 根据距离相同的点数计算回旋镖的数量
            for (int count : dist_count.values()) {
                if (count > 1) {
                    boomerangs_count += count * (count - 1);
                }
            }
        }
        return boomerangs_count;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n^2)$，其中 $n$ 是点的数量。我们需要计算每对点之间的距离，并统计具有相同距离的点。  
  
空间复杂度为 $O(n)$，用于存储到点 $i$ 的距离的计数。
