---
sidebar_position: 363
tags:
  - array
  - dynamic-programming
  - binary-search
  - divide-and-conquer
  - Hard
---

# 363.不大于K的最大矩形和

标签: `array`, `dynamic-programming`, `binary-search`, `divide-and-conquer`

难度: Hard

通过率: 44.35%

原题链接: https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/description/

## 题目描述
给定一个大小为 m x n 的矩阵和一个整数 k，返回矩阵中不大于 k 的最大矩形和。保证至少存在一个和不大于 k 的矩形。

## 解题思路
要解决这个问题，我们需要在矩阵的所有可能子矩形中找到一个总和不超过 k 的最大矩形。这个问题可以分解为一维子问题，即找出不超过 k 的连续数组的最大和。具体步骤如下：

1. **将问题转换为一维**：选择两个固定的行索引 `r1` 和 `r2`，计算这两行之间每列的和，这样就将二维问题转化为一维问题，即在这个由 r1 到 r2 行组成的“压缩”数组中寻找不超过 k 的最大子数组和。

2. **求解一维问题**：对于压缩的一维数组，我们可以使用前缀和以及二分搜索的方法。具体地，假设 `prefix[j]` 表示从列 0 到列 j 的累积和，那么对于每一列 j，我们需要找到一个最小的 `prefix[i]`（`i < j`），使得 `prefix[j] - prefix[i] <= k`。

3. 我们可以使用有序集合(如 TreeSet)来存储前缀和，并通过二分查找来快速找到满足条件的最小 `prefix[i]`。

通过将所有可能的 `(r1, r2)` 对组合遍历，我们能找到最终的不大于 k 的最大子矩形和。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
import bisect`  # 导入模块用于二分查找`  def maxSumSubmatrix(matrix: List[List[int]], k: int) -> int:`    max_sum = float('-inf')  # 初始化最大和为负无穷`    rows, cols = len(matrix), len(matrix[0])`    for r1 in range(rows):`        cols_sum = [0] * cols  # 初始化列和`        for r2 in range(r1, rows):`            for c in range(cols):`                cols_sum[c] += matrix[r2][c]  # 计算压缩数组的列和`            # 使用有序集合存储前缀和以二分查找`            prefix_sums = [0]`            current_sum = 0`            for sum_ in cols_sum:`                current_sum += sum_`                # 通过二分查找找出最小的满足条件的前缀和`                i = bisect.bisect_left(prefix_sums, current_sum - k)`                if i < len(prefix_sums):`                    max_sum = max(max_sum, current_sum - prefix_sums[i])`                # 插入当前前缀和到有序集合中`                bisect.insort(prefix_sums, current_sum)`    return max_sum`
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <set>`// 如果需要导入额外的库，在此处添加`class Solution {`public:`    int maxSumSubmatrix(vector<vector<int>>& matrix, int k) {`        int max_sum = INT_MIN;`        int rows = matrix.size(), cols = matrix[0].size();`        for (int r1 = 0; r1 < rows; ++r1) {`            vector<int> cols_sum(cols, 0);`            for (int r2 = r1; r2 < rows; ++r2) {`                for (int c = 0; c < cols; ++c) {`                    cols_sum[c] += matrix[r2][c];`                }`                set<int> prefix_sums;`                prefix_sums.insert(0);`                int current_sum = 0;`                for (int sum : cols_sum) {`                    current_sum += sum;`                    auto it = prefix_sums.lower_bound(current_sum - k);`                    if (it != prefix_sums.end()) {`                        max_sum = max(max_sum, current_sum - *it);`                    }`                    prefix_sums.insert(current_sum);`                }`            }`        }`        return max_sum;`    }`};`
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function maxSumSubmatrix(matrix, k) {`    let maxSum = -Infinity;`    const rows = matrix.length, cols = matrix[0].length;`    for (let r1 = 0; r1 < rows; r1++) {`        const colsSum = new Array(cols).fill(0);`        for (let r2 = r1; r2 < rows; r2++) {`            for (let c = 0; c < cols; c++) {`                colsSum[c] += matrix[r2][c];`            }`            const prefixSums = [0];`            let currentSum = 0;`            for (let sum of colsSum) {`                currentSum += sum;`                const i = binarySearch(prefixSums, currentSum - k);`                if (i !== null) {`                    maxSum = Math.max(maxSum, currentSum - prefixSums[i]);`                }`                insert(prefixSums, currentSum);`            }`        }`    }`    return maxSum;`}`// 用于二分查找的函数`function binarySearch(prefixSums, target) {`    let left = 0, right = prefixSums.length - 1;`    while (left <= right) {`        const mid = left + ((right - left) >> 1);`        if (prefixSums[mid] >= target) {`            right = mid - 1;`        } else {`            left = mid + 1;`        }`    }`    return left < prefixSums.length ? left : null;`}`// 插入有序数组的函数`function insert(prefixSums, num) {`    let left = 0, right = prefixSums.length - 1;`    while (left <= right) {`        const mid = left + ((right - left) >> 1);`        if (prefixSums[mid] < num) {`            left = mid + 1;`        } else {`            right = mid - 1;`        }`    }`    prefixSums.splice(left, 0, num);`}`
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;`class Solution {`    public int maxSumSubmatrix(int[][] matrix, int k) {`        int maxSum = Integer.MIN_VALUE;`        int rows = matrix.length, cols = matrix[0].length;`        for (int r1 = 0; r1 < rows; r1++) {`            int[] colsSum = new int[cols];`            for (int r2 = r1; r2 < rows; r2++) {`                for (int c = 0; c < cols; c++) {`                    colsSum[c] += matrix[r2][c];`                }`                TreeSet<Integer> prefixSums = new TreeSet<>();`                prefixSums.add(0);`                int currentSum = 0;`                for (int sum : colsSum) {`                    currentSum += sum;`                    Integer num = prefixSums.ceiling(currentSum - k);`                    if (num != null) {`                        maxSum = Math.max(maxSum, currentSum - num);`                    }`                    prefixSums.add(currentSum);`                }`            }`        }`        return maxSum;`    }`}`
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(m^2 \cdot n \cdot \log n)$，其中 $m$ 为行数，$n$ 为列数。对于每一对行，我们都需要对列进行前缀和的计算，并且使用二分查找来寻找满足条件的前缀和。`  `  空间复杂度为 $O(n)$，需要一个数组来存储当前两个固定行之间的每列的和。
