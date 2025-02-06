---
sidebar_position: 373
tags:
  - array
  - heap
  - greedy
  - Medium
---

# 373.寻找和最小的K对数

标签: `array`, `heap`, `greedy`

难度: Medium

通过率: 40.26%

原题链接: https://leetcode.com/problems/find-k-pairs-with-smallest-sums/description/

## 题目描述
给定两个按非递减顺序排序的整数数组 `nums1` 和 `nums2`，以及一个整数 `k`。定义一对 `(u, v)`，其中 `u` 是第一个数组中的一个元素，`v` 是第二个数组中的一个元素。返回 `k` 对和最小的数对 `(u1, v1), (u2, v2), ..., (uk, vk)`。

## 解题思路
这道题可以使用优先队列（最小堆）来高效地找到前 `k` 个和最小的数对。具体步骤如下：

1. 初始化一个最小堆，将每个可能的组合 `(nums1[0], nums2[j])` 及其和与索引对 `(0, j)` 插入堆中，其中 `j` 的范围为 `0` 到 `min(k, len(nums2))`。这样做是因为从数组中选择前 `k` 个元素已经能够包含所有可能的最小和。

2. 弹出堆顶元素（最小和的数对），将其记录到结果列表中。

3. 对于弹出的数对 `(i, j)`，将 `nums1` 中下一个元素与 `nums2[j]` 组合的新数对 `(i+1, j)` 插入到堆中。

4. 重复步骤 2 和 3，直到找到 `k` 个最小和的数对为止。

通过使用堆，我们能在不需要计算所有组合的情况下高效地找到具有最小和的 `k` 对。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
import heapq

def kSmallestPairs(nums1, nums2, k):
    # 定义结果列表
    result = []
    
    # 定义最小堆
    min_heap = []
    
    # 初始化堆，将第一个数组元素与第二个数组的前k个元素组合
    for j in range(min(k, len(nums2))):
        heapq.heappush(min_heap, (nums1[0] + nums2[j], 0, j))

    # 找到前k个最小和的数对
    while k > 0 and min_heap:
        k -= 1
        # 弹出最小的数对
        sum, i, j = heapq.heappop(min_heap)
        result.append([nums1[i], nums2[j]])
        
        # 将下一个可能的数对加入堆中
        if i + 1 < len(nums1):
            heapq.heappush(min_heap, (nums1[i + 1] + nums2[j], i + 1, j))
    
    return result

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
```cpp
#include <vector>
#include <queue>
using namespace std;

vector<pair<int, int>> kSmallestPairs(vector<int>& nums1, vector<int>& nums2, int k) {
    vector<pair<int, int>> result;
    auto comp = [&](const tuple<int, int, int>& a, const tuple<int, int, int>& b) {
        return get<0>(a) > get<0>(b);
    };
    priority_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, decltype(comp)> min_heap(comp);

    for (int j = 0; j < min(k, (int)nums2.size()); ++j) {
        min_heap.emplace(nums1[0] + nums2[j], 0, j);
    }

    while (k-- && !min_heap.empty()) {
        auto [sum, i, j] = min_heap.top();
        min_heap.pop();
        result.emplace_back(nums1[i], nums2[j]);

        if (i + 1 < nums1.size()) {
            min_heap.emplace(nums1[i + 1] + nums2[j], i + 1, j);
        }
    }

    return result;
}
```
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function kSmallestPairs(nums1, nums2, k) {
    // 定义结果数组
    const result = [];
    
    // 定义最小堆
    const minHeap = new MinPriorityQueue({ priority: x => x[0] });
    
    // 初始化堆，将nums1[0]与nums2的前k个元素组合
    for (let j = 0; j < Math.min(k, nums2.length); j++) {
        minHeap.enqueue([nums1[0] + nums2[j], 0, j]);
    }
    
    // 找到前k个最小和的数对
    while (k > 0 && !minHeap.isEmpty()) {
        k--;
        const [sum, i, j] = minHeap.dequeue().element;
        result.push([nums1[i], nums2[j]]);
        
        // 将下一个可能的数对加入堆中
        if (i + 1 < nums1.length) {
            minHeap.enqueue([nums1[i + 1] + nums2[j], i + 1, j]);
        }
    }
    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

public class Solution {
    public List<int[]> kSmallestPairs(int[] nums1, int[] nums2, int k) {
        List<int[]> result = new ArrayList<>();
        PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> Integer.compare(a[0], b[0]));
        
        // 初始化堆，将nums1[0]与nums2的前k个元素组合
        for (int j = 0; j < Math.min(k, nums2.length); j++) {
            minHeap.offer(new int[]{nums1[0] + nums2[j], 0, j});
        }
        
        // 找到前k个最小和的数对
        while (k > 0 && !minHeap.isEmpty()) {
            k--;
            int[] top = minHeap.poll();
            int sum = top[0], i = top[1], j = top[2];
            result.add(new int[]{nums1[i], nums2[j]});
            
            // 将下一个可能的数对加入堆中
            if (i + 1 < nums1.length) {
                minHeap.offer(new int[]{nums1[i + 1] + nums2[j], i + 1, j});
            }
        }
        return result;
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：由于我们最多处理 $k$ 个元素，并且每次操作（如插入和弹出）在堆中花费 $O(\log k)$ 时间，总的时间复杂度为 $O(k \log k)$。  
  
空间复杂度：最小堆使用的空间为 $O(k)$，因为堆中最多存储 $k$ 个元素。
