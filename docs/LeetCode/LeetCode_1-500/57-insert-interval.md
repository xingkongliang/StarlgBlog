---
sidebar_position: 57
tags:
  - array
  - sort
  - Medium
---

# 57.插入区间

标签: `array`, `sort`

难度: Medium

通过率: 42.61%

原题链接: https://leetcode.com/problems/insert-interval/description/

## 题目描述
给定一个由非重叠区间组成的数组，其中每个区间按照其起始值升序排列。还给定一个新的区间，将新区间插入区间数组中，使数组仍然有序且没有重叠（必要时合并重叠区间）。返回插入后的区间数组。

## 解题思路
要处理这个插入问题，我们可以将其划分为以下几个步骤：
1. 遍历原有的区间数组`intervals`。
2. 找出所有在`newInterval`之前的偏左区间（即结尾在`newInterval`的开头之前的区间），直接将这些区间添加到结果数组中。
3. 对于那些与`newInterval`有重叠的区间，合并它们。当发现`newInterval`的起始小于某个区间的结尾，且`newInterval`的结尾大于等于某个区间的开头时，它们是重叠的。用`newInterval`的起始与这些区间起始的最小值作为新的起始位置，用`newInterval`的结尾与这些区间结尾的最大值作为新的结尾位置。
4. 若发现没有重叠的区间，并且这些区间的起始大于`newInterval`的结尾，那么`newInterval`应该被插入在这些区间之前。
5. 最后，将剩下所有区间添加到结果列表中。

整个过程需要扫描一次原有区间列表，因此时间复杂度是$O(n)$，其中$n$是区间的数量。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def insert(intervals, newInterval):
    result = []
    i = 0
    # 1. Add all the intervals ending before newInterval starts.
    while i < len(intervals) and intervals[i][1] < newInterval[0]:
        result.append(intervals[i])
        i += 1
    # 2. Merge all overlapping intervals to one considering newInterval.
    while i < len(intervals) and intervals[i][0] <= newInterval[1]:
        newInterval[0] = min(newInterval[0], intervals[i][0])
        newInterval[1] = max(newInterval[1], intervals[i][1])
        i += 1
    # Add the merged interval.
    result.append(newInterval)
    # Add all the rest.
    while i < len(intervals):
        result.append(intervals[i])
        i += 1
    return result
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> result;
        int i = 0;
        // 1. Add all the intervals ending before newInterval starts.
        while (i < intervals.size() && intervals[i][1] < newInterval[0]) {
            result.push_back(intervals[i++]);
        }
        // 2. Merge all overlapping intervals to one considering newInterval.
        while (i < intervals.size() && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = min(newInterval[0], intervals[i][0]);
            newInterval[1] = max(newInterval[1], intervals[i][1]);
            i++;
        }
        // Add the merged interval.
        result.push_back(newInterval);
        // Add all the rest.
        while (i < intervals.size()) {
            result.push_back(intervals[i++]);
        }
        return result;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function insert(intervals, newInterval) {
    const result = [];
    let i = 0;
    // 1. Add all the intervals ending before newInterval starts.
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i++]);
    }
    // 2. Merge all overlapping intervals to one considering newInterval.
    while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    // Add the merged interval.
    result.push(newInterval);
    // Add all the rest.
    while (i < intervals.length) {
        result.push(intervals[i++]);
    }
    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> result = new ArrayList<>();
        int i = 0;
        // 1. Add all the intervals ending before newInterval starts.
        while (i < intervals.length && intervals[i][1] < newInterval[0]) {
            result.add(intervals[i++]);
        }
        // 2. Merge all overlapping intervals to one considering newInterval.
        while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        // Add the merged interval.
        result.add(newInterval);
        // Add all the rest.
        while (i < intervals.length) {
            result.add(intervals[i++]);
        }
        return result.toArray(new int[result.size()][]);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度： $O(n)$，其中$n$是输入区间的数量。
- 空间复杂度： $O(n)$，用于存储结果区间。
