---
sidebar_position: 327
tags:
  - array
  - binary-search
  - divide-and-conquer
  - Hard
---

# 327.区间和的个数

标签: `array`, `binary-search`, `divide-and-conquer`

难度: Hard

通过率: 36.35%

原题链接: https://leetcode.com/problems/count-of-range-sum/description/

## 题目描述
给定一个整数数组 `nums` 和两个整数 `lower` 和 `upper` ，返回位于 `[lower, upper]` 间的区间和的数量。区间和 $S(i, j)$ 被定义为数组 `nums` 中下标 `i` 到 `j` 之间元素的总和，包含 `i` 和 `j` 。

## 解题思路
解决这个问题的关键在于如何在 $O(n \log n)$ 的时间复杂度内计算所有符合条件的区间和。由于直接暴力计算所有可能的区间和会导致 $O(n^2)$ 的时间复杂度，因此需要更有效的方法。我们可以通过以下方式来解决：

1. **前缀和**：初始化一个前缀和数组 `prefix_sums` ，其中 `prefix_sums[i]` 是 `nums[0]` 到 `nums[i-1]` 的和。
2. **归并排序与二分搜索**：在归并排序的过程中维持一个有序的前缀和数组。
3. 对于每个元素prefix_sums[j]，我们需要寻找有多少个 `i < j` 使得 `lower <= prefix_sums[j] - prefix_sums[i] <= upper`。
4. 通过用排序算法维护的有序数组来快速统计满足条件的区间和的数量，这是通过在进行 `merge` 时利用二分搜索来实现的。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def countRangeSum(nums, lower, upper):
    def merge_sort(lo, hi):
        if hi - lo <= 1:  # 若区间中只有一个元素
            return 0      # 区间无法形成两点的区间和

        mid = (lo + hi) // 2
        count = merge_sort(lo, mid) + merge_sort(mid, hi)  # 分治递归求解
        j = k = t = mid
        temp = []
        for i in range(lo, mid):
            while k < hi and prefix_sums[k] - prefix_sums[i] < lower:  # 找到第一个满足条件的 k
                k += 1
            while j < hi and prefix_sums[j] - prefix_sums[i] <= upper:  # 找到第一个不满足条件的 j
                j += 1
            count += j - k  # 在范围中的[j:j)
            while t < hi and prefix_sums[t] < prefix_sums[i]:
                temp.append(prefix_sums[t])  # 归并排序
                t += 1
            temp.append(prefix_sums[i])
        prefix_sums[lo:lo + len(temp)] = temp
        return count

    prefix_sums = [0]
    for num in nums:
        prefix_sums.append(prefix_sums[-1] + num)  # 构建前缀和数组

    return merge_sort(0, len(prefix_sums))

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int countRangeSum(vector<int>& nums, int lower, int upper) {
        vector<long> prefix_sums(1, 0);
        for (int num : nums) {
            prefix_sums.push_back(prefix_sums.back() + num);
        }
        return countWhileMergeSort(prefix_sums, 0, prefix_sums.size(), lower, upper);
    }

private:
    int countWhileMergeSort(vector<long>& prefix_sums, int lo, int hi, int lower, int upper) {
        if (hi - lo <= 1) return 0;
        int mid = lo + (hi - lo) / 2;
        int count = countWhileMergeSort(prefix_sums, lo, mid, lower, upper) +
                    countWhileMergeSort(prefix_sums, mid, hi, lower, upper);
        int j = mid, k = mid, t = mid;
        vector<long> temp;
        for (int i = lo; i < mid; ++i) {
            while (k < hi && prefix_sums[k] - prefix_sums[i] < lower) ++k;
            while (j < hi && prefix_sums[j] - prefix_sums[i] <= upper) ++j;
            count += j - k;
            while (t < hi && prefix_sums[t] < prefix_sums[i]) temp.push_back(prefix_sums[t++]);
            temp.push_back(prefix_sums[i]);
        }
        move(temp.begin(), temp.end(), prefix_sums.begin() + lo);
        return count;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function countRangeSum(nums, lower, upper) {
    function mergeSort(lo, hi) {
        if (hi - lo <= 1) return 0;

        let mid = Math.floor((lo + hi) / 2);
        let count = mergeSort(lo, mid) + mergeSort(mid, hi);

        let j = mid, k = mid, t = mid;
        const temp = [];
        for (let i = lo; i < mid; ++i) {
            while (k < hi && prefixSums[k] - prefixSums[i] < lower) ++k;
            while (j < hi && prefixSums[j] - prefixSums[i] <= upper) ++j;
            count += j - k;
            while (t < hi && prefixSums[t] < prefixSums[i]) temp.push(prefixSums[t++]);
            temp.push(prefixSums[i]);
        }
        prefixSums.splice(lo, temp.length, ...temp);
        return count;
    }

    const prefixSums = [0];
    for (let num of nums) {
        prefixSums.push(prefixSums[prefixSums.length - 1] + num);
    }
    return mergeSort(0, prefixSums.length);
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int countRangeSum(int[] nums, int lower, int upper) {
        long[] prefixSums = new long[nums.length + 1];
        for (int i = 0; i < nums.length; i++) {
            prefixSums[i + 1] = prefixSums[i] + nums[i];
        }
        return countWhileMergeSort(prefixSums, 0, prefixSums.length, lower, upper);
    }

    private int countWhileMergeSort(long[] prefixSums, int lo, int hi, int lower, int upper) {
        if (hi - lo <= 1) return 0;
        int mid = lo + (hi - lo) / 2;
        int count = countWhileMergeSort(prefixSums, lo, mid, lower, upper) +
                    countWhileMergeSort(prefixSums, mid, hi, lower, upper);
        int j = mid, k = mid, t = mid;
        long[] temp = new long[hi - lo];
        int r = 0;
        for (int i = lo; i < mid; ++i) {
            while (k < hi && prefixSums[k] - prefixSums[i] < lower) k++;
            while (j < hi && prefixSums[j] - prefixSums[i] <= upper) j++;
            count += j - k;
            while (t < hi && prefixSums[t] < prefixSums[i]) temp[r++] = prefixSums[t++];
            temp[r++] = prefixSums[i];
        }
        System.arraycopy(temp, 0, prefixSums, lo, r);
        return count;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n \log n)$，其中 $n$ 是数组 `nums` 的长度。算法的主要复杂度来自于归并排序阶段，该阶段涉及分割和归并过程中进行二分查找来计算有效的范围和数量。  
  
空间复杂度为 $O(n)$，用于存储中间的前缀和数组以及合并排序中的辅助数组。
