---
sidebar_position: 164
tags:
  - array
  - sort
  - math
  - Medium
---

# 164.最大邻接差

标签: `array`, `sort`, `math`

难度: Medium

通过率: 47.99%

原题链接: https://leetcode.com/problems/maximum-gap/description/

## 题目描述
给定一个整数数组 `nums`，返回其排序表单中连续两个元素之间的最大差值。如果数组包含少于两个元素，则返回 0。要求算法以线性时间运行并使用线性额外空间。

## 解题思路
解决这个问题可以使用 **桶排序**（Bucket Sort）的思想，结合鸽巢原理（Pigeonhole Principle）来优化。这种方法可以在 `O(n)` 时间复杂度下完成：

1. 找到数组中的最大值 `max_val` 和最小值 `min_val`。
2. 计算每个桶的尺寸：`bucket_size = ceil((max_val - min_val) / (n - 1))`，其中 `n` 是数组的长度。这样安排可以确保最大差值不会存在于同一个桶中。
3. 创建若干个桶，每个桶记录进入桶中的最大值和最小值。
4. 把数组中的每个数放入对应的桶中：计算元素 `x` 该放入的桶的索引为 `(x - min_val) // bucket_size`。
5. 遍历每个非空桶，记录相邻非空桶的最小值与前一个桶的最大值之间的差值，取最大差值作为结果。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def maximumGap(nums):
    if len(nums) < 2:
        return 0

    min_val, max_val = min(nums), max(nums)
    if min_val == max_val:
        return 0

    n = len(nums)
    bucket_size = max(1, (max_val - min_val) // (n - 1))
    bucket_count = (max_val - min_val) // bucket_size + 1

    buckets = [[None, None] for _ in range(bucket_count)]

    for num in nums:
        idx = (num - min_val) // bucket_size
        if buckets[idx][0] is None:
            buckets[idx] = [num, num]
        else:
            buckets[idx][0] = min(buckets[idx][0], num)
            buckets[idx][1] = max(buckets[idx][1], num)

    max_gap, prev_max = 0, None
    for bmin, bmax in buckets:
        if bmin is None:
            continue
        if prev_max is not None:
            max_gap = max(max_gap, bmin - prev_max)
        prev_max = bmax

    return max_gap
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int maximumGap(vector<int>& nums) {
        if (nums.size() < 2) return 0;

        int min_val = *min_element(nums.begin(), nums.end());
        int max_val = *max_element(nums.begin(), nums.end());
        if (min_val == max_val) return 0;

        int n = nums.size();
        int bucket_size = max(1, (max_val - min_val) / (n - 1));
        int bucket_count = (max_val - min_val) / bucket_size + 1;

        vector<pair<int, int>> buckets(bucket_count, {INT_MAX, INT_MIN});

        for (int num : nums) {
            int idx = (num - min_val) / bucket_size;
            buckets[idx].first = min(buckets[idx].first, num);
            buckets[idx].second = max(buckets[idx].second, num);
        }

        int max_gap = 0;
        int prev_max = buckets[0].second;
        for (int i = 1; i < bucket_count; ++i) {
            if (buckets[i].first == INT_MAX) continue;
            max_gap = max(max_gap, buckets[i].first - prev_max);
            prev_max = buckets[i].second;
        }

        return max_gap;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function maximumGap(nums) {
    if (nums.length < 2) return 0;

    let min_val = Math.min(...nums);
    let max_val = Math.max(...nums);
    if (min_val === max_val) return 0;

    let n = nums.length;
    let bucket_size = Math.max(1, Math.floor((max_val - min_val) / (n - 1)));
    let bucket_count = Math.floor((max_val - min_val) / bucket_size) + 1;

    let buckets = Array.from({ length: bucket_count }, () => [Infinity, -Infinity]);

    for (let num of nums) {
        let idx = Math.floor((num - min_val) / bucket_size);
        buckets[idx][0] = Math.min(buckets[idx][0], num);
        buckets[idx][1] = Math.max(buckets[idx][1], num);
    }

    let max_gap = 0;
    let prev_max = buckets[0][1];
    for (let i = 1; i < bucket_count; i++) {
        if (buckets[i][0] === Infinity) continue;
        max_gap = Math.max(max_gap, buckets[i][0] - prev_max);
        prev_max = buckets[i][1];
    }
    return max_gap;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int maximumGap(int[] nums) {
        if (nums.length < 2) return 0;

        int min_val = Arrays.stream(nums).min().getAsInt();
        int max_val = Arrays.stream(nums).max().getAsInt();
        if (min_val == max_val) return 0;

        int n = nums.length;
        int bucket_size = Math.max(1, (max_val - min_val) / (n - 1));
        int bucket_count = (max_val - min_val) / bucket_size + 1;

        int[][] buckets = new int[bucket_count][2];
        for (int i = 0; i < bucket_count; i++) {
            buckets[i][0] = Integer.MAX_VALUE;
            buckets[i][1] = Integer.MIN_VALUE;
        }

        for (int num : nums) {
            int idx = (num - min_val) / bucket_size;
            buckets[idx][0] = Math.min(buckets[idx][0], num);
            buckets[idx][1] = Math.max(buckets[idx][1], num);
        }

        int max_gap = 0;
        int prev_max = buckets[0][1];
        for (int i = 1; i < bucket_count; i++) {
            if (buckets[i][0] == Integer.MAX_VALUE) continue;
            max_gap = Math.max(max_gap, buckets[i][0] - prev_max);
            prev_max = buckets[i][1];
        }

        return max_gap;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，因为我们在计算过程中只经过了常数次的遍历。  
  
空间复杂度为 $O(n)$，因为我们使用了额外的桶来存储部分数据。
