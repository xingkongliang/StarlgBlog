---
sidebar_position: 368
tags:
  - dynamic-programming
  - sort
  - Medium
---

# 368.最大的可整除子集

标签: `dynamic-programming`, `sort`

难度: Medium

通过率: 45.75%

原题链接: https://leetcode.com/problems/largest-divisible-subset/description/

## 题目描述
给定一个由不同正整数组成的集合 $nums$，返回一个最大的子集 $answer$，使得在这个子集中每一对元素 $(answer[i], answer[j])$ 满足：

- $answer[i] \% answer[j] == 0$，或 
- $answer[j] \% answer[i] == 0$

若有多个解，返回其中任意一个。

## 解题思路
这个问题可以通过动态规划来解决。首先，将数组 $nums$ 进行排序，这可以确保在检查可整除性时，较大的数字出现在较小的数字后面。接下来，我们创建一个数组 $dp$，其中 $dp[i]$ 表示以 $nums[i]$ 为结尾的最大可整除子集的长度。同时，我们还需要一个跟踪数组 $parent$ 来构建结果子集。

使用两重循环遍历数组：对于每一个 $nums[i]$，我们查看之前的所有元素 $nums[j]$（$j < i$），如果 $nums[i] \% nums[j] == 0$，则 $nums[i]$ 可以加入以 $nums[j]$ 为结尾的最大子集中。这时，我们就更新 $dp[i] = dp[j] + 1$ 。同时更新 $parent[i] = j$ 来记录 $nums[j]$ 是 $nums[i]$ 的前继节点。

最后，找到 $dp$ 数组中的最大值，这就是最大可整除子集的长度，通过 $parent$ 数组从后往前追踪，就可以构建出这个子集。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def largestDivisibleSubset(nums):
    # 如果数组为空，直接返回空列表
    if not nums:
        return []
    
    n = len(nums)
    nums.sort()
    # dp[i] 表示以 nums[i] 为结尾的最大可整除子集的大小
    dp = [1] * n
    # parent 用于重构子集
    parent = [-1] * n

    max_size = 0
    max_index = -1

    # 动态规划以找到最大的子集
    for i in range(n):
        for j in range(i):
            if nums[i] % nums[j] == 0:
                if dp[j] + 1 > dp[i]:
                    dp[i] = dp[j] + 1
                    parent[i] = j
        if dp[i] > max_size:
            max_size = dp[i]
            max_index = i

    # 通过 parent 数组来重构结果子集
    result = []
    while max_index != -1:
        result.append(nums[max_index])
        max_index = parent[max_index]

    return result[::-1]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution:
    def largestDivisibleSubset(self, nums: List[int]) -> List[int]:
        if not nums:
            return []

        n = len(nums)
        nums.sort()

        dp = [1] * n
        parent = [-1] * n

        max_size = 0
        max_index = -1

        for i in range(n):
            for j in range(i):
                if nums[i] % nums[j] == 0:
                    if dp[j] + 1 > dp[i]:
                        dp[i] = dp[j] + 1
                        parent[i] = j
            if dp[i] > max_size:
                max_size = dp[i]
                max_index = i

        result = []
        while max_index != -1:
            result.append(nums[max_index])
            max_index = parent[max_index]

        return result[::-1]
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function largestDivisibleSubset(nums) {
    if (!nums || nums.length === 0) return [];

    nums.sort((a, b) => a - b);

    let n = nums.length;
    let dp = new Array(n).fill(1);
    let parent = new Array(n).fill(-1);

    let max_size = 0;
    let max_index = -1;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] % nums[j] === 0) {
                if (dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1;
                    parent[i] = j;
                }
            }
        }
        if (dp[i] > max_size) {
            max_size = dp[i];
            max_index = i;
        }
    }

    let result = [];
    while (max_index !== -1) {
        result.push(nums[max_index]);
        max_index = parent[max_index];
    }

    return result.reverse();
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public List<Integer> largestDivisibleSubset(int[] nums) {
    if (nums.length == 0) return new ArrayList<>();

    Arrays.sort(nums);

    int n = nums.length;
    int[] dp = new int[n];
    int[] parent = new int[n];
    Arrays.fill(dp, 1);
    Arrays.fill(parent, -1);

    int max_size = 0;
    int max_index = -1;

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[i] % nums[j] == 0) {
                if (dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1;
                    parent[i] = j;
                }
            }
        }
        if (dp[i] > max_size) {
            max_size = dp[i];
            max_index = i;
        }
    }

    List<Integer> result = new ArrayList<>();
    while (max_index != -1) {
        result.add(nums[max_index]);
        max_index = parent[max_index];
    }

    Collections.reverse(result);
    return result;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n^2)$，因为我们需要对每一对可能的数对进行检查。此外，排序操作为 $O(n \log n)$，所以总的时间复杂度为 $O(n^2)$。  
  
空间复杂度为 $O(n)$，用于存储 $dp$ 和 $parent$ 数组。
