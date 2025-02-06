---
sidebar_position: 300
tags:
  - array
  - binary-search
  - dynamic-programming
  - Medium
---

# 300.最长递增子序列

标签: `array`, `binary-search`, `dynamic-programming`

难度: Medium

通过率: 56.79%

原题链接: https://leetcode.com/problems/longest-increasing-subsequence/description/

## 题目描述
给定一个整数数组 nums，返回其中最长严格递增子序列的长度。

## 解题思路
解决这个问题可以有两种经典方法：动态规划和二分查找结合动态规划。

### 方法一：动态规划
我们定义一个数组 $dp$，其中 $dp[i]$ 表示以 $nums[i]$ 结尾的最长递增子序列的长度。对于每个元素 $nums[i]$，我们需要找到 $j<i$ 使得 $nums[j] < nums[i]$ 且 $dp[j]$ 最大，然后 $dp[i] = dp[j] + 1$。初始情况下，所有元素都是长度为1的子序列，因此 $dp[i]$ 初始化为1。

整个数组遍历完毕后，返回 $dp$ 数组的最大值。

### 方法二：二分查找结合动态规划
我们假设一种更高效的途径，通过构建一个新数组 $tails$ 来追踪当前子序列的最小结尾。

1. 初始化一个空的 $tails$ 数组。
2. 对于每个 $num$：
   - 使用二分查找在 $tails$ 中寻找第一个大于或等于 $num$ 的位置。如果找到了，那么用 $num$ 更新这个位置；如果没有找到，就把 $num$ 添加到 $tails$ 的末尾。

这个过程保证了 $tails$ 中的元素是递增的，最终 $tails$ 的长度即为最长递增子序列的长度。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def lengthOfLIS(nums):
    # 动态规划方法
    if not nums:
        return 0
    dp = [1] * len(nums)  # 初始化dp数组
    for i in range(len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)  # 返回dp数组中的最大值
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int lengthOfLIS(vector<int>& nums) {
    vector<int> dp(nums.size(), 1); // 初始化dp数组，默认长度为1
    for (int i = 1; i < nums.size(); i++) {
        for (int j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                // 如果找到一个比nums[i]小的值，更新dp[i]
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
    }
    return *max_element(dp.begin(), dp.end()); // 返回dp数组中的最大值
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function lengthOfLIS(nums) {
    if (nums.length === 0) return 0;

    const dp = new Array(nums.length).fill(1); // 初始化dp数组
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    return Math.max(...dp); // 返回dp数组中的最大值
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int lengthOfLIS(int[] nums) {
    if (nums.length == 0) return 0;

    int[] dp = new int[nums.length]; // 初始化dp数组
    Arrays.fill(dp, 1); // 所有子序列初始长度为1

    for (int i = 1; i < nums.length; i++) {
        for (int j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    int max = 0;
    for (int length : dp) {
        max = Math.max(max, length);
    }
    return max; // 返回dp数组中的最大值
}
```

</TabItem>
</Tabs>

## 复杂度分析
### 方法一：动态规划
时间复杂度：$O(n^2)$，其中 $n$ 是数组的长度，因为需要两层遍历。

空间复杂度：$O(n)$，需要储存 dp 数组。


### 方法二：二分查找结合动态规划
时间复杂度：$O(n \log n)$，其中 $n$ 是数组长度。每个元素进行二分查找的复杂度为 $O(\log n)$。

空间复杂度：$O(n)$，需要储存 tails 数组。
