---
sidebar_position: 228
tags:
  - array
  - Easy
---

# 228.汇总区间

标签: `array`

难度: Easy

通过率: 52.16%

原题链接: https://leetcode.com/problems/summary-ranges/description/

## 题目描述
给定一个升序排列且不含重复数字的整数数组 `nums`。要求返回最短的有序区间列表，以恰好覆盖数组中所有数字。每个数字恰好出现在一个区间中，并且区间内数字连续。输出格式为：

- 当区间是 [a, b] 并且 a != b 时，表示为 "a->b" 
- 当区间是 [a, a] 时，表示为 "a"

## 解题思路
要解决这个问题，我们可以逐步遍历数组 `nums`，并根据连续性定义区间。我们需要一个起始值 `start` 来标记区间的开始。然后逐步比较当前数字与前一个数字差值是否为1来判断连续性。如果不连续，我们将之前的区间添加到结果中并更新 `start` 为新的起始点。遍历结束后，别忘了添加最后一个区间。为了准备输出，针对区间长度为1和大于1的情况分别进行输出格式化。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def summaryRanges(nums):
    # 用于存放结果的列表
    ranges = []
    if not nums:
        return ranges

    # 用于指示当前区间的起点
    start = nums[0]

    for i in range(1, len(nums)):
        # 检查当前数字与前一个数字是否连续
        if nums[i] != nums[i - 1] + 1:
            # 如不连续，则添加一个区间
            if start == nums[i - 1]:
                ranges.append(str(start))
            else:
                ranges.append(f"{start}->{nums[i - 1]}")
            # 更新新的起点
            start = nums[i]

    # 最后一个区间
    if start == nums[-1]:
        ranges.append(str(start))
    else:
        ranges.append(f"{start}->{nums[-1]}")

    return ranges
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<string> summaryRanges(vector<int>& nums) {
        vector<string> ranges;
        if (nums.empty()) return ranges;

        int start = nums[0]; // 用于记录当前区间的起点
        for (int i = 1; i < nums.size(); ++i) {
            if (nums[i] != nums[i - 1] + 1) {
                // 如果不连续，则形成一个区间
                if (start == nums[i - 1]) {
                    ranges.push_back(to_string(start));
                } else {
                    ranges.push_back(to_string(start) + "->" + to_string(nums[i - 1]));
                }
                // 更新起点
                start = nums[i];
            }
        }
        // 最后一个区间
        if (start == nums.back()) {
            ranges.push_back(to_string(start));
        } else {
            ranges.push_back(to_string(start) + "->" + to_string(nums.back()));
        }

        return ranges;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function summaryRanges(nums) {
    const ranges = [];
    if (nums.length === 0) return ranges;

    let start = nums[0]; // 用于记录当前区间的起点
    for (let i = 1; i < nums.length; ++i) {
        if (nums[i] !== nums[i - 1] + 1) {
            // 如果不连续，则形成一个区间
            if (start === nums[i - 1]) {
                ranges.push(String(start));
            } else {
                ranges.push(`${start}->${nums[i - 1]}`);
            }
            // 更新起点
            start = nums[i];
        }
    }
    // 最后一个区间
    if (start === nums[nums.length - 1]) {
        ranges.push(String(start));
    } else {
        ranges.push(`${start}->${nums[nums.length - 1]}`);
    }

    return ranges;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public List<String> summaryRanges(int[] nums) {
        List<String> ranges = new ArrayList<>();
        if (nums.length == 0) return ranges;

        int start = nums[0]; // 用于记录当前区间的起点
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] != nums[i - 1] + 1) {
                // 如果不连续，则形成一个区间
                if (start == nums[i - 1]) {
                    ranges.add(String.valueOf(start));
                } else {
                    ranges.add(start + "->" + nums[i - 1]);
                }
                // 更新起点
                start = nums[i];
            }
        }
        // 最后一个区间
        if (start == nums[nums.length - 1]) {
            ranges.add(String.valueOf(start));
        } else {
            ranges.add(start + "->" + nums[nums.length - 1]);
        }

        return ranges;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 是数组 `nums` 的长度。因为我们只需要遍历一次数组即可完成汇总。  
  
空间复杂度为 $O(1)$，除了结果列表外，使用的额外空间几乎是常量级的。
