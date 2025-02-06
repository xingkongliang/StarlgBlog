---
sidebar_position: 435
tags:
  - greedy
  - sort
  - Medium
---

# 435. 无重叠区间

标签: `greedy`, `sort`

难度: Medium

通过率: 54.55%

原题链接: https://leetcode.com/problems/non-overlapping-intervals/description/

## 题目描述
给定一个区间的数组intervals，其中intervals[i] = [starti, endi]，返回需要移除的最小区间数量，以便其余区间互不重叠。注意，如果两个区间仅在一个点相交，则它们是非重叠的，例如[1, 2]和[2, 3]是非重叠的。

## 解题思路
要解决这个问题，可以使用贪心算法。我们需要最大化非重叠区间的数量，这样就可以最小化需要移除的区间数量。具体思路如下：

1. 首先按每个区间的结束时间进行排序。
2. 初始化一个变量`end`记录当前已选择的区间的结束位置，初始设置为$-	ext{inf}$。
3. 遍历排序后的区间列表。
   - 如果当前区间的开始时间大于等于`end`，说明当前区间与之前选的区间不重叠，此时可以选择当前区间，并更新`end`为当前区间的结束时间。
   - 否则，当前区间与之前的区间重叠，我们需要移除它。
4. 最后返回需要移除的区间数量。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def eraseOverlapIntervals(intervals):
    # 先按区间的结束时间进行排序
    intervals.sort(key=lambda x: x[1])
    # 初始化已选区间的结束时间为负无穷
    end = float('-inf')
    # 记录需要移除的区间数
    count = 0

    for interval in intervals:
        # 如果当前区间的开始时间不小于已选区间的结束时间，则可以选择当前区间
        if interval[0] >= end:
            # 更新选中区间的结束时间
            end = interval[1]
        else:
            # 否则需要移除当前区间
            count += 1

    return count
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        // 按区间的结束时间排序
        sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] < b[1];
        });

        // 初始化已选区间的结束时间为负无穷
        int end = INT_MIN;
        // 记录需要移除的区间数
        int count = 0;

        for (const auto& interval : intervals) {
            // 如果当前区间的开始时间不小于已选区间的结束时间，可以选择当前区间
            if (interval[0] >= end) {
                // 更新已选区间的结束时间
                end = interval[1];
            } else {
                // 否则需要移除当前区间
                count++;
            }
        }

        return count;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function eraseOverlapIntervals(intervals) {
    // 按区间的结束时间排序
    intervals.sort((a, b) => a[1] - b[1]);
    // 初始化已选区间的结束时间为负无穷
    let end = -Infinity;
    // 记录需要移除的区间数
    let count = 0;

    for (let interval of intervals) {
        // 如果当前区间的开始时间不小于已选区间的结束时间，可以选择当前区间
        if (interval[0] >= end) {
            // 更新已选区间的结束时间
            end = interval[1];
        } else {
            // 否则需要移除当前区间
            count++;
        }
    }

    return count;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.Arrays;

class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        // 按区间的结束时间排序
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));
        // 初始化已选区间的结束时间为负无穷
        int end = Integer.MIN_VALUE;
        // 记录需要移除的区间数
        int count = 0;

        for (int[] interval : intervals) {
            // 如果当前区间的开始时间不小于已选区间的结束时间，可以选择当前区间
            if (interval[0] >= end) {
                // 更新已选区间的结束时间
                end = interval[1];
            } else {
                // 否则需要移除当前区间
                count++;
            }
        }

        return count;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n \log n)$，其中$n$是区间的数量，排序所需的时间是$O(n \log n)$，遍历区间需要$O(n)$。  
  
空间复杂度：$O(1)$，这里只需要常数的额外空间。
