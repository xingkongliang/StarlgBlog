---
sidebar_position: 446
tags:
  - array
  - dynamic-programming
  - Hard
---

# 446.等差数列 II - 子序列

标签: `array`, `dynamic-programming`

难度: Hard

通过率: 54.57%

原题链接: https://leetcode.com/problems/arithmetic-slices-ii-subsequence/description/

## 题目描述
给定一个整数数组 $\text{nums}$，返回 $\text{nums}$ 的所有等差子序列的个数。序列至少应包含三个元素，并且两个连续元素之间的差异应该相等。子序列是可以通过移除数组中的某些元素（可能不移除）形成的序列。

## 解题思路
为了计算所有等差子序列的个数，我们需要使用动态规划。可以使用一个哈希表数组 $\text{dp}$，其中 $\text{dp}[i]$ 是一个哈希表，记录以 $\text{nums}[i]$ 为结尾的等差子序列，其差值为 key 的子序列个数。

我们遍历数组，对每个位置 $i$ 寻找前面的 $j$，计算它们之间的差值 $d = \text{nums}[i] - \text{nums}[j]$。然后，当前的子序列数 $\text{dp}[i][d]$ 可以更新为 $\text{dp}[i][d] + \text{dp}[j][d]$，这意味着新发现了一些以 $\text{nums}[i]$ 结尾的子序列。同时，由于 $\text{nums}[i]$ 和 $\text{nums}[j]$ 自身也可以构成新的子序列，因此需加上 1。

最终，统计每个位置的 $\text{dp}$ 表中所有等差子序列（至少 3 个以上）的个数。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def numberOfArithmeticSlices(nums):
    # dp数组存储以每个元素结尾、不同公差的子序列个数
    dp = [{} for _ in nums]
    count = 0
    
    for i in range(len(nums)):
        for j in range(i):
            diff = nums[i] - nums[j]
            # get 方法用于获取指定键的值，如果不存在则返回 0
            dp[i][diff] = dp[i].get(diff, 0) + dp[j].get(diff, 0) + 1
            # 增加基于 nums[j], nums[i] 构成的新子序列
            count += dp[j].get(diff, 0)
    
    return count
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int numberOfArithmeticSlices(vector<int>& nums) {
        int n = nums.size();
        vector<unordered_map<long long, int>> dp(n);
        int count = 0;
        
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < i; ++j) {
                long long diff = (long long)nums[i] - (long long)nums[j];
                // 更新当前的dp[i]
                dp[i][diff] += dp[j][diff] + 1;
                // 只有 dp[j][diff] 才是形成至少 3 个元素的子序列
                count += dp[j][diff];
            }
        }
        
        return count;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function numberOfArithmeticSlices(nums) {
    // dp数组存储以每个元素结尾、不同公差的子序列个数
    const dp = Array.from({length: nums.length}, () => new Map());
    let count = 0;

    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            const diff = nums[i] - nums[j];
            const cnt = (dp[j].get(diff) || 0);
            // 更新dp[i]
            dp[i].set(diff, (dp[i].get(diff) || 0) + cnt + 1);
            // cnt值累加到结果中
            count += cnt;
        }
    }
    
    return count;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

class Solution {
    public int numberOfArithmeticSlices(int[] nums) {
        int n = nums.length;
        List<Map<Long, Integer>> dp = new ArrayList<>();
        for (int i = 0; i < n; i++) dp.add(new HashMap<>());
        int count = 0;
        
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < i; j++) {
                long diff = (long) nums[i] - (long) nums[j];
                int cnt = dp.get(j).getOrDefault(diff, 0);
                dp.get(i).put(diff, dp.get(i).getOrDefault(diff, 0) + cnt + 1);
                count += cnt;
            }
        }
        return count;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度**  
该算法的时间复杂度为 $O(n^2)$，其中 $n$ 是数组的长度。算法主要由两层循环组成。  
  
**空间复杂度**  
空间复杂度也为 $O(n^2)$，因为我们使用了一个二维数组 $\text{dp}$ 来存储每个元素和每个可能的公差的子序列个数。
