---
sidebar_position: 352
tags:
  - design
  - binary-search
  - array
  - Hard
---

# 352.数据流中的不相交区间

标签: `design`, `binary-search`, `array`

难度: Hard

通过率: 60.22%

原题链接: https://leetcode.com/problems/data-stream-as-disjoint-intervals/description/

## 题目描述
给定一个非负整数的数据流输入 $a_1, a_2, ..., a_n$，将到目前为止看到的数字汇总为不相交区间的列表。实现 SummaryRanges 类：

- `SummaryRanges()` 初始化对象为空流。
- `void addNum(int value)` 将整数 value 添加到数据流中。
- `int[][] getIntervals()` 返回当前数据流中的整数汇总为不相交区间列表 `[start_i, end_i]`。答案应按 `start_i` 排序。

## 解题思路
此问题需要我们实时地构建和更新一个不重叠的区间列表。从而在数据流中不断地加入新的数字后，能够快速、有效地更新这些区间。

这个问题的关键是如何高效地合并区间。我们可以维护一个有序的不重叠区间列表，每次加入新的数时，通过以下步骤更新：

1. 使用**二分查找**确定新数在当前区间列表中的插入位置。
2. 检查新数是否可以与前一个区间合并（即，新数位于该区间末尾加1的位置）。
3. 检查新数是否可以与后一个区间合并（即，新数位于该区间起始值减1的位置）。
4. 如果有合并，则更新区间。如果不能合并，则创建一个新的区间插入列表中恰当位置。

这种方法可以通过寻找到正确的插入位置及合并点，来保证操作的高效性。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class SummaryRanges:
    def __init__(self):
        # 初始化区间列表
        self.intervals = []

    def addNum(self, value: int) -> None:
        # 初始化插入的位置和当前位置
        intervals = self.intervals
        left, right = 0, len(intervals)

        # 二分查找插入位置
        while left < right:
            mid = (left + right) // 2
            if intervals[mid][0] <= value <= intervals[mid][1]:
                return
            elif value < intervals[mid][0]:
                right = mid
            else:
                left = mid + 1

        # 检查与左右区间的合并情况
        start, end = value, value
        if left < len(intervals) and intervals[left][0] == value + 1:
            end = intervals[left][1]
            intervals.pop(left)
        if left > 0 and intervals[left-1][1] + 1 == value:
            start = intervals[left-1][0]
            intervals.pop(left-1)
            left -= 1

        # 插入合并后的新区间
        intervals.insert(left, [start, end])

    def getIntervals(self) -> List[List[int]]:
        return self.intervals
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class SummaryRanges {
    private TreeSet<int[]> intervalSet;

    public SummaryRanges() {
        // 使用TreeSet来存储和管理区间
        intervalSet = new TreeSet<>((a, b) -> Integer.compare(a[0], b[0]));
    }

    public void addNum(int value) {
        int[] newInterval = {value, value};

        // 找到大于或等于给定值的最小区间
        int[] higher = intervalSet.ceiling(newInterval);
        int[] lower = intervalSet.floor(newInterval);

        if (lower != null && lower[1] + 1 >= value) {
            // value可以合并到左侧区间
            lower[1] = Math.max(lower[1], value);
            if (higher != null && higher[0] == lower[1] + 1) {
                // 同时能合并左侧和右侧区间
                lower[1] = higher[1];
                intervalSet.remove(higher);
            }
        } else if (higher != null && higher[0] == value + 1) {
            // 仅能合并到右侧区间
            higher[0] = value;
        } else {
            // 无法与现有区间合并，创建新区间
            intervalSet.add(newInterval);
        }
    }

    public int[][] getIntervals() {
        return intervalSet.toArray(new int[0][]);
    }
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class SummaryRanges {
    constructor() {
        // 使用数组来维护区间的集合
        this.intervals = [];
    }

    addNum(value) {
        let newInterval = [value, value];
        const intervals = this.intervals;
        let left = 0;
        let right = intervals.length;

        // 二分查找插入位置
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (intervals[mid][0] <= value && value <= intervals[mid][1]) {
                return;
            } else if (value < intervals[mid][0]) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }

        // 检查与左右区间的合并情况
        if (left < intervals.length && intervals[left][0] === value + 1) {
            newInterval[1] = intervals[left][1];
            intervals.splice(left, 1);
        }
        if (left > 0 && intervals[left - 1][1] + 1 === value) {
            newInterval[0] = intervals[left - 1][0];
            intervals.splice(left - 1, 1);
            left -= 1;
        }

        // 插入合并后的新区间
        intervals.splice(left, 0, newInterval);
    }

    getIntervals() {
        return this.intervals;
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.ArrayList;
import java.util.List;
import java.util.TreeSet;

class SummaryRanges {
    private TreeSet<int[]> intervalSet;

    public SummaryRanges() {
        // 创建一个空的TreeSet用于存储区间
        intervalSet = new TreeSet<>((a, b) -> Integer.compare(a[0], b[0]));
    }

    public void addNum(int value) {
        int[] newInterval = {value, value};
        int[] higher = intervalSet.ceiling(newInterval);
        int[] lower = intervalSet.floor(newInterval);

        if (lower != null && lower[1] + 1 >= value) {
            lower[1] = Math.max(lower[1], value);
            if (higher != null && higher[0] == lower[1] + 1) {
                lower[1] = higher[1];
                intervalSet.remove(higher);
            }
        } else if (higher != null && higher[0] == value + 1) {
            higher[0] = value;
        } else {
            intervalSet.add(newInterval);
        }
    }

    public int[][] getIntervals() {
        return intervalSet.toArray(new int[0][]);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：

对于每次调用 `addNum`，在最坏情况下，需要对插入和合并操作进行二分查找，时间复杂度为 $O(\log n)$，其中 $n$ 是区间数量。

对于 `getIntervals`，由于仅需线性遍历区间，时间复杂度为 $O(m)$，其中 $m$ 为当前已存储的区间数量。

  
空间复杂度：

在最坏情况下，当区间完全不重叠时，需要存储最多 $O(n)$ 个区间，其中 $n$ 是添加的元素个数。

