---
sidebar_position: 436
tags:
  - array
  - binary-search
  - sort
  - Medium
---

# 436.寻找右区间

标签: `array`, `binary-search`, `sort`

难度: Medium

通过率: 53.08%

原题链接: https://leetcode.com/problems/find-right-interval/description/

## 题目描述
给定一个由多个区间组成的数组，其中每个区间用 `[start_i, end_i]` 表示，并且所有的 `start_i` 是唯一的。对于每个区间 `i`，需要找到一个“右区间” `j`，满足 `start_j >= end_i` 且 `start_j` 最小。请返回每个区间的右区间索引数组。如果没有右区间存在，则返回 `-1`。

## 解题思路
首先我们可以将所有区间的起点和它们对应的原始索引进行记录，并根据起点进行排序。这样做是为了便于快速查询具有最小起点且满足条件的右区间。接下来，我们可以通过二分查找来找到每个区间的结束点对应的右区间索引。具体步骤如下：

1. 将区间的起点与索引记录为元组 `(start_i, index_i)` 并对这些元组按起点 `start_i` 进行排序。
2. 对于每个区间，使用二分查找在排序后的起点中找到第一个大于或等于当前区间结束点的起点。由于起点已排序，这样可以利用二分查找来获得 $O(\log n)$ 的查找时间。
3. 如果找到了符合条件的起点，就记录下其对应的索引；否则记录 `-1`。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def findRightInterval(intervals):
    import bisect
    # 我们记录每个区间起点及其索引
    n = len(intervals)
    start_points = sorted((start, index) for index, (start, _) in enumerate(intervals))

    result = [-1] * n
    # 遍历每个区间
    for index, (_, end) in enumerate(intervals):
        # 使用二分查找寻找第一个起点大于等于当前区间终点的位置
        pos = bisect.bisect_left(start_points, (end,))
        if pos < n:
            # 找到合适的右区间
            result[index] = start_points[pos][1]
    return result
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
std::vector<int> findRightInterval(std::vector<std::vector<int>>& intervals) {
    int n = intervals.size();
    std::vector<std::pair<int, int>> starts;
    for (int i = 0; i < n; ++i) {
        // 收集起始值和对应的索引
        starts.emplace_back(intervals[i][0], i);
    }
    // 按起始值排序
    std::sort(starts.begin(), starts.end());

    std::vector<int> result(n, -1);
    for (int i = 0; i < n; ++i) {
        int end = intervals[i][1];
        auto it = std::lower_bound(starts.begin(), starts.end(), std::make_pair(end, 0));
        if (it != starts.end()) {
            // 找到合适的右区间
            result[i] = it->second;
        }
    }
    return result;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function findRightInterval(intervals) {
    const n = intervals.length;
    const startPoints = intervals
        .map((interval, index) => [interval[0], index])
        .sort((a, b) => a[0] - b[0]);

    const result = new Array(n).fill(-1);
    for (let i = 0; i < n; i++) {
        const end = intervals[i][1];
        let low = 0, high = n - 1;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            if (startPoints[mid][0] >= end) {
                result[i] = startPoints[mid][1];
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
    }
    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int[] findRightInterval(int[][] intervals) {
    int n = intervals.length;
    int[][] starts = new int[n][2];
    for (int i = 0; i < n; i++) {
        // 收集起始值和对应的索引
        starts[i] = new int[]{intervals[i][0], i};
    }
    // 根据起始值排序
    Arrays.sort(starts, (a, b) -> Integer.compare(a[0], b[0]));

    int[] result = new int[n];
    Arrays.fill(result, -1);
    for (int i = 0; i < n; i++) {
        int end = intervals[i][1];
        int left = 0, right = n - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (starts[mid][0] >= end) {
                result[i] = starts[mid][1];
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
    }
    return result;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：对起始点数组排序的时间复杂度是 $O(n \log n)$，对于每个区间执行二分查找的时间复杂度是 $O(\log n)$，因此总时间复杂度为 $O(n \log n)$。  
  
空间复杂度：主要为存储排序后的起点数组所需的空间，因此空间复杂度为 $O(n)$。
