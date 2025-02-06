---
sidebar_position: 41
tags:
  - array
  - Hard
---

# 41.第一个缺失的正数

标签: `array`

难度: Hard

通过率: 40.28%

原题链接: https://leetcode.com/problems/first-missing-positive/description/

## 题目描述
给定一个未排序的整数数组 `nums`，返回在 `nums` 中找不到的最小正整数。你必须实现一个时间复杂度为 $O(n)$ 并且只使用常数级额外空间的算法。

## 解题思路
解决这个问题的一种有效方法是利用数组本身来记录信息，从而在 $O(n)$ 时间复杂度和 $O(1)$ 的空间复杂度内解决问题。基本思路如下：

1. **标记不可能的索引**：如果 `nums` 中的任何元素 `x` 不在 `1` 到 `n` 之间（其中 `n` 是数组长度），将其修改为 `n+1`。这样我们可以安全地忽略这些值，因为它们肯定不是缺失的最小正整数。

2. **利用数组本身进行标记**：接下来，在数组中进行第二遍，使用每个数值的正负号将数值所在位置的索引标记。例如，当看到一个数 `x` 为正，我们将位置 `x-1` 的数标记为负。具体来说：
   - 遍历数组 `nums` 中的每个数 `x`。
   - 如果 `x` 在有效范围内（`1` 到 `n`），则标记 `nums[x-1]` 为负表示 `x` 出现过。

3. **寻找第一个缺失的正整数**：最后，再次遍历数组。如果某个位置的数是正的，意味着它的位置 `+1` 即为缺失的最小正整数。否则如果所有位置都标记过了，那么缺失的最小正整数则为 `n+1`。

这个算法的核心在于重新利用数组的空间来充当哈希表的作用，从而达到理想的时间和空间复杂度。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def firstMissingPositive(nums):
    n = len(nums)
    
    # Step 1: Remove numbers that are less than 1 or larger than n by replacing them with n+1 (invalid positive number)
    for i in range(n):
        if nums[i] <= 0 or nums[i] > n:
            nums[i] = n + 1
    
    # Step 2: Mark the indices corresponding to the numbers seen in the array
    for i in range(n):
        num = abs(nums[i])
        if 1 <= num <= n:
            nums[num - 1] = -abs(nums[num - 1])
    
    # Step 3: Find the first index with a positive value
    for i in range(n):
        if nums[i] > 0:
            return i + 1
    
    return n + 1

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        // Step 1
        for (int i = 0; i < n; ++i) {
            if (nums[i] <= 0 || nums[i] > n) {
                nums[i] = n + 1;
            }
        }
        // Step 2
        for (int i = 0; i < n; ++i) {
            int num = abs(nums[i]);
            if (1 <= num && num <= n) {
                nums[num - 1] = -abs(nums[num - 1]);
            }
        }
        // Step 3
        for (int i = 0; i < n; ++i) {
            if (nums[i] > 0) {
                return i + 1;
            }
        }
        return n + 1;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function firstMissingPositive(nums) {
    const n = nums.length;
    // Step 1
    for (let i = 0; i < n; i++) {
        if (nums[i] <= 0 || nums[i] > n) {
            nums[i] = n + 1;
        }
    }
    // Step 2
    for (let i = 0; i < n; i++) {
        const num = Math.abs(nums[i]);
        if (num >= 1 && num <= n) {
            nums[num - 1] = -Math.abs(nums[num - 1]);
        }
    }
    // Step 3
    for (let i = 0; i < n; i++) {
        if (nums[i] > 0) {
            return i + 1;
        }
    }
    return n + 1;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int firstMissingPositive(int[] nums) {
        int n = nums.length;
        // Step 1
        for (int i = 0; i < n; i++) {
            if (nums[i] <= 0 || nums[i] > n) {
                nums[i] = n + 1;
            }
        }
        // Step 2
        for (int i = 0; i < n; i++) {
            int num = Math.abs(nums[i]);
            if (num >= 1 && num <= n) {
                nums[num - 1] = -Math.abs(nums[num - 1]);
            }
        }
        // Step 3
        for (int i = 0; i < n; i++) {
            if (nums[i] > 0) {
                return i + 1;
            }
        }
        return n + 1;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$ - 我们完整地遍历数组三遍，每一遍的复杂度都是线性的。
空间复杂度：$O(1)$ - 只是使用常数级别的额外空间，没有引入新的数据结构依赖。
