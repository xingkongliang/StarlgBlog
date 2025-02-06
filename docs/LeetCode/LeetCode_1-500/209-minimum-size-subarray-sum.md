---
sidebar_position: 209
tags:
  - array
  - two-pointers
  - binary-search
  - Medium
---

# 209.最小长度子数组和

标签: `array`, `two-pointers`, `binary-search`

难度: Medium

通过率: 48.33%

原题链接: https://leetcode.com/problems/minimum-size-subarray-sum/description/

## 题目描述
给定一个正整数数组 `nums` 和一个正整数 `target`，返回其总和大于或等于 `target` 的最小连续子数组的长度。如果没有这样的子数组，则返回 `0`。

## 解题思路
这道题可以使用滑动窗口的技巧来解决。我们维持两个指针 `start` 和 `end`，分别表示当前考虑的子数组的起始位置和结束位置。我们不断增大 `end` 来扩大当前子数组的范围，直到子数组的和大于或等于 `target`。然后，增加 `start` 来缩小当前子数组的范围，直到子数组的和小于 `target`，并在这一过程中记录满足条件的最小子数组长度。具体步骤如下：  

1. 初始化 `start` 和 `end` 为 0，`curr_sum` 表示当前子数组的和，`min_length` 为无穷大。
2. 遍历数组，增大 `end` 指针，将 `nums[end]` 加到 `curr_sum` 中。
3. 当 `curr_sum` 大于或等于 `target` 时，尽量增大 `start` 减小子数组长度，记录此时的长度并更新 `min_length`。
4. 重复步骤 2 和 3 直到 `end` 达到数组的末尾。
5. 返回 `min_length`，如果没有找到满足条件的子数组则返回 0。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def min_sub_array_len(target, nums):
    n = len(nums)
    min_length = float('inf')
    start = 0
    curr_sum = 0
    
    # 使用滑动窗口法
    for end in range(n):
        curr_sum += nums[end]
        
        # 移动 start 使得 curr_sum 尽量小但仍不小于 target
        while curr_sum >= target:
            min_length = min(min_length, end - start + 1)
            curr_sum -= nums[start]
            start += 1
        
    return 0 if min_length == float('inf') else min_length

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int n = nums.size();
        int start = 0, curr_sum = 0;
        int min_length = INT_MAX;
        
        // 使用滑动窗口法
        for (int end = 0; end < n; ++end) {
            curr_sum += nums[end];
            
            // 移动 start 使得 curr_sum 尽量小但仍不小于 target
            while (curr_sum >= target) {
                min_length = min(min_length, end - start + 1);
                curr_sum -= nums[start];
                start++;
            }
        }
        
        return min_length == INT_MAX ? 0 : min_length;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function minSubArrayLen(target, nums) {
    let n = nums.length;
    let minLength = Infinity;
    let start = 0;
    let currSum = 0;
    
    // 使用滑动窗口法
    for (let end = 0; end < n; end++) {
        currSum += nums[end];
        
        // 移动 start 使得 currSum 尽量小但仍不小于 target
        while (currSum >= target) {
            minLength = Math.min(minLength, end - start + 1);
            currSum -= nums[start];
            start++;
        }
    }
    
    return minLength === Infinity ? 0 : minLength;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int n = nums.length;
        int minLength = Integer.MAX_VALUE;
        int start = 0, currSum = 0;
        
        // 使用滑动窗口法
        for (int end = 0; end < n; end++) {
            currSum += nums[end];
            
            // 移动 start 使得 currSum 尽量小但仍不小于 target
            while (currSum >= target) {
                minLength = Math.min(minLength, end - start + 1);
                currSum -= nums[start];
                start++;
            }
        }
        
        return minLength == Integer.MAX_VALUE ? 0 : minLength;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度**: $O(n)$，其中 $n$ 是数组的长度。我们只需遍历一次数组，每个元素最多被访问两次。  
  
**空间复杂度**: $O(1)$，我们使用了固定大小的额外空间来存储变量。
