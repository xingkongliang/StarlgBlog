---
sidebar_position: 315
tags:
  - array
  - binary-indexed-tree
  - binary-search
  - divide-and-conquer
  - Hard
---

# 315.计算右侧小于当前元素的数

标签: `array`, `binary-indexed-tree`, `binary-search`, `divide-and-conquer`

难度: Hard

通过率: 42.65%

原题链接: https://leetcode.com/problems/count-of-smaller-numbers-after-self/description/

## 题目描述
给定一个整数数组 nums，返回一个整数数组 counts，其中 counts[i] 表示 nums[i] 右侧小于 nums[i] 的元素个数。

## 解题思路
此问题可以通过二分思想结合归并排序来解决。首先，从右到左遍历数组，这样可以在生成结果时保持计算顺序；其次，在遍历过程中对于每个元素 nums[i]，通过归并排序的方法定位该元素在已排序序列中的位置，这样即可实现对右侧小元素的计数。具体步骤如下：

1. 对数组 `nums` 按索引进行归并排序。
2. 在归并过程中维护一个计数数组 `counts` 来记录每个元素右侧小于它的元素数量。
3. 使用归并排序的性质，左数组中的元素与右数组比大小时，若 `nums[left] > nums[right]`，说明 `left` 位置的元素比 `right...ounts` 中对应位置的计数。
4. 归并排序完成后，`counts` 就是结果。

这样，通过分治策略，每次分割处理一半数组，可以高效地完成整个计数过程。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class Solution:
    def countSmaller(self, nums):
        # 首先处理输入的索引和初始化计数
        counts = [0] * len(nums)
        indexed_nums = list(enumerate(nums))

        def merge_sort(enum):
            half = len(enum) // 2
            if half:
                left, right = merge_sort(enum[:half]), merge_sort(enum[half:])
                for i in range(len(enum) - 1, -1, -1):
                    if not right or left and left[-1][1] > right[-1][1]:
                        counts[left[-1][0]] += len(right)
                        enum[i] = left.pop()
                    else:
                        enum[i] = right.pop()
            return enum

        merge_sort(indexed_nums)
        return counts
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<int> countSmaller(vector<int>& nums) {
        int n = nums.size();
        vector<int> counts(n, 0), indexes(n);
        iota(indexes.begin(), indexes.end(), 0); // 初始化索引

        function<void(int, int)> merge_sort = [&] (int left, int right) {
            if (right <= left) return;
            int mid = (left + right) / 2;
            merge_sort(left, mid);
            merge_sort(mid + 1, right);

            // 合并两部分并计数
            int i = left, j = mid + 1, k = 0;
            vector<int> temp(right - left + 1);
            while (i <= mid && j <= right) {
                if (nums[indexes[i]] > nums[indexes[j]]) {
                    counts[indexes[i]] += right - j + 1;
                    temp[k++] = indexes[i++];
                } else {
                    temp[k++] = indexes[j++];
                }
            }
            while (i <= mid) {
                temp[k++] = indexes[i++];
            }
            while (j <= right) {
                temp[k++] = indexes[j++];
            }
            for (i = left, k = 0; i <= right; i++, k++) {
                indexes[i] = temp[k];
            }
        };

        merge_sort(0, n - 1);
        return counts;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function countSmaller(nums) {
    const counts = new Array(nums.length).fill(0);
    const indices = nums.map((_, index) => index);

    const mergeSort = (start, end) => {
        if (end <= start) return;
        const mid = Math.floor((start + end) / 2);
        mergeSort(start, mid);
        mergeSort(mid + 1, end);

        const temp = [];
        let i = start, j = mid + 1, rightCounter = 0;
        while (i <= mid || j <= end) {
            if (j > end || (i <= mid && nums[indices[i]] > nums[indices[j]])) {
                counts[indices[i]] += rightCounter;
                temp.push(indices[i++]);
            } else {
                rightCounter++;
                temp.push(indices[j++]);
            }
        }

        for (let k = 0; k < temp.length; k++) {
            indices[start + k] = temp[k];
        }
    };

    mergeSort(0, nums.length - 1);
    return counts;
}

```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

class Solution {
    public List<Integer> countSmaller(int[] nums) {
        Integer[] counts = new Integer[nums.length];
        Arrays.fill(counts, 0);
        int[] indexes = new int[nums.length];
        for (int i = 0; i < nums.length; i++) indexes[i] = i;

        mergeSort(nums, indexes, counts, 0, nums.length - 1);

        return Arrays.asList(counts);
    }

    private void mergeSort(int[] nums, int[] indexes, Integer[] counts, int left, int right) {
        if (left >= right) return;
        int mid = (left + right) / 2;
        mergeSort(nums, indexes, counts, left, mid);
        mergeSort(nums, indexes, counts, mid + 1, right);

        int[] merged = new int[right - left + 1];
        int i = left, j = mid + 1, k = 0, rightCounter = 0;
        while (i <= mid || j <= right) {
            if (j > right || (i <= mid && nums[indexes[i]] > nums[indexes[j]])) {
                counts[indexes[i]] += rightCounter;
                merged[k++] = indexes[i++];
            } else {
                rightCounter++;
                merged[k++] = indexes[j++];
            }
        }

        for (i = left, k = 0; i <= right; i++, k++) {
            indexes[i] = merged[k];
        }
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n \log n)$，其中 $n$ 是数组的长度。归并排序在最坏情况下是线性对数复杂度。  
  
空间复杂度为 $O(n)$，主要用于存储辅助数组和索引数组。
