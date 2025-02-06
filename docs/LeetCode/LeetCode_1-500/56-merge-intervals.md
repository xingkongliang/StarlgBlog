---
sidebar_position: 56
tags:
  - array
  - sort
  - Medium
---

# 56.合并区间

标签: `array`, `sort`

难度: Medium

通过率: 48.41%

原题链接: https://leetcode.com/problems/merge-intervals/description/

## 题目描述
给定一个由区间构成的数组，其中每个区间用两个整数表示，合并所有重叠的区间，并返回一个不重叠的区间数组，覆盖所有输入的区间。

## 解题思路
首先，我们将所有的区间按照起始位置进行升序排序。然后，我们创建一个新的列表 merged 来存储合并后的区间。我们遍历排序后的区间：对于每一个区间，我们检查它是否可以与 merged 列表中最后一个区间合并。具体来说，如果当前区间的起始位置小于等于 merged 列表中最后一个区间的结束位置，那么它们是重叠的，我们将二者合并。合并方式是更新最后一个区间的结束位置为这两个区间结束位置的较大者。如果它们不重叠，则将当前区间添加到 merged 列表中。这样，最后在 merged 列表中就保留了所有合并后的不重叠区间。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def merge(intervals):
    # 将区间按起始位置排序
    intervals.sort(key=lambda x: x[0])

    # 存储合并后的区间
    merged = []

    for interval in intervals:
        # 如果 merged 为空或者当前区间不重叠，直接添加
        if not merged or merged[-1][1] < interval[0]:
            merged.append(interval)
        else:
            # 合并重叠的区间，更新结束位置
            merged[-1][1] = max(merged[-1][1], interval[1])

    return merged

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
vector<pair<int,int>> merge(vector<pair<int,int>>& intervals) {
    if(intervals.empty()) return {};

    // 将区间按起始位置排序
    sort(intervals.begin(), intervals.end());

    vector<pair<int,int>> merged;

    for (auto interval : intervals) {
        // 如果 merged 为空或者当前区间不重叠，直接添加
        if (merged.empty() || merged.back().second < interval.first) {
            merged.push_back(interval);
        } else {
            // 合并重叠的区间，更新结束位置
            merged.back().second = max(merged.back().second, interval.second);
        }
    }

    return merged;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function merge(intervals) {
    // 将区间按起始位置排序
    intervals.sort((a, b) => a[0] - b[0]);

    const merged = [];

    for (let i = 0; i < intervals.length; i++) {
        const currInterval = intervals[i];
        // 如果 merged 为空或者当前区间不重叠，直接添加
        if (merged.length === 0 || merged[merged.length - 1][1] < currInterval[0]) {
            merged.push(currInterval);
        } else {
            // 合并重叠的区间，更新结束位置
            merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], currInterval[1]);
        }
    }

    return merged;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length == 0) return new int[0][0];

        // 将区间按起始位置排序
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);

        List<int[]> merged = new ArrayList<>();

        for (int[] interval : intervals) {
            // 如果 merged 为空或者当前区间不重叠，直接添加
            if (merged.isEmpty() || merged.get(merged.size() - 1)[1] < interval[0]) {
                merged.add(interval);
            } else {
                // 合并重叠的区间，更新结束位置
                merged.get(merged.size() - 1)[1] = Math.max(merged.get(merged.size() - 1)[1], interval[1]);
            }
        }

        return merged.toArray(new int[merged.size()][]);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n \log n)$，其中 $n$ 是区间的数量，排序的时间复杂度为 $O(n \log n)$，合并的时间复杂度为 $O(n)$。  
空间复杂度：$O(n)$，用来存储合并后的区间。
