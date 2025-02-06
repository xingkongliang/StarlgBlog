---
sidebar_position: 312
tags:
  - dynamic-programming
  - Hard
---

# 312.戳气球

标签: `dynamic-programming`

难度: Hard

通过率: 60.26%

原题链接: https://leetcode.com/problems/burst-balloons/description/

## 题目描述
给定一个整数数组 nums 表示 n 个气球。每个气球上标有一个数字。需要将所有气球全部戳破。戳破第 i 个气球，你将获得 nums[i - 1] * nums[i] * nums[i + 1] 个硬币。 如果 i-1 或 i+1 超出了数组的边界，则将其视为有一个标记为 1 的气球。返回通过聪明地戳破气球所能获取的最大硬币数量。

## 解题思路
这个问题可以通过动态规划来解决。首先，我们在 nums 数组的两端各加入一个虚拟气球，数值为1，以使得所有气球均在边界内。然后，我们使用一个二维的动态规划数组 dp，其中 dp[i][j] 表示从位置 i 到位置 j (包括 i 和 j) 的最大硬币数。我们尝试在这个范围内的每一个可能的位置 k 戳破最后一个气球，计算每种情况下的硬币数。对于每个 dp[i][j]，其值是通过尝试从 i 到 j 间的所有可能 k 位置上计算得到的最大值：`dp[i][j] = max(dp[i][k-1] + nums[i-1]*nums[k]*nums[j+1] + dp[k+1][j])`。其中，`nums[i-1]*nums[k]*nums[j+1]` 计算的是戳破第 k 个气球时，产生的硬币数。通过这种方式，我们能从底部、自下而上的计算每个小区间的最大硬币数，直至计算出整个范围的最大硬币数。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def maxCoins(nums):
    # 在两端增加一个虚拟气球
    nums = [1] + nums + [1]
    n = len(nums)
    # 创建 DP 表
    dp = [[0] * n for _ in range(n)]
    # 遍历每一个可能的子数组长度
    for length in range(2, n):  # 长度从2到n
        for left in range(n - length):  # 左边界
            right = left + length  # 右边界
            # 在left和right之间寻找最佳位置进行最后一次戳破
            for k in range(left + 1, right):
                dp[left][right] = max(dp[left][right], 
                                      nums[left] * nums[k] * nums[right] + dp[left][k] + dp[k][right])
    return dp[0][n - 1]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int maxCoins(vector<int>& nums) {
    // 在两端增加一个虚拟气球
    nums.insert(nums.begin(), 1);
    nums.push_back(1);
    int n = nums.size();
    // 创建 DP 表
    vector<vector<int>> dp(n, vector<int>(n, 0));
    // 遍历每一个可能的子数组长度
    for (int length = 2; length < n; ++length) { // 长度从2到n
        for (int left = 0; left < n - length; ++left) { // 左边界
            int right = left + length; // 右边界
            // 在left和right之间寻找最佳位置进行最后一次戳破
            for (int k = left + 1; k < right; ++k) {
                dp[left][right] = max(dp[left][right], 
                                      nums[left] * nums[k] * nums[right] + dp[left][k] + dp[k][right]);
            }
        }
    }
    return dp[0][n - 1];
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function maxCoins(nums) {
    // 在两端增加一个虚拟气球
    nums.unshift(1);
    nums.push(1);
    const n = nums.length;
    // 创建 DP 表
    const dp = Array.from(Array(n), () => Array(n).fill(0));
    // 遍历每一个可能的子数组长度
    for (let length = 2; length < n; length++) { // 长度从2到n
        for (let left = 0; left < n - length; left++) { // 左边界
            const right = left + length; // 右边界
            // 在left和right之间寻找最佳位置进行最后一次戳破
            for (let k = left + 1; k < right; k++) {
                dp[left][right] = Math.max(dp[left][right], 
                                           nums[left] * nums[k] * nums[right] + dp[left][k] + dp[k][right]);
            }
        }
    }
    return dp[0][n - 1];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int maxCoins(int[] nums) {
    // 在两端增加一个虚拟气球
    int n = nums.length;
    int[] newNums = new int[n + 2];
    System.arraycopy(nums, 0, newNums, 1, n);
    newNums[0] = 1;
    newNums[n + 1] = 1;
    // 创建 DP 表
    int[][] dp = new int[n + 2][n + 2];
    // 遍历每一个可能的子数组长度
    for (int length = 2; length < n + 2; ++length) { // 长度从2到n+2
        for (int left = 0; left < n + 2 - length; ++left) { // 左边界
            int right = left + length; // 右边界
            // 在left和right之间寻找最佳位置进行最后一次戳破
            for (int k = left + 1; k < right; ++k) {
                dp[left][right] = Math.max(dp[left][right], 
                                           newNums[left] * newNums[k] * newNums[right] + dp[left][k] + dp[k][right]);
            }
        }
    }
    return dp[0][n + 1];
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n^3)$，其中 $n$ 是处理后（加上虚拟气球）的气球数量。由于需要遍历每个可能的子数组范围，并在每个范围中选择最后一个气球戳破，这需要三重循环。  

空间复杂度：$O(n^2)$，因为我们使用了一个二维数组 dp 来存储从每个 $i$ 到 $j$ 的最大硬币数。
