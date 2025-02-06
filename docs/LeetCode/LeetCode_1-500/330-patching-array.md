---
sidebar_position: 330
tags:
  - greedy
  - math
  - Hard
---

# 330.补丁数组

标签: `greedy`, `math`

难度: Hard

通过率: 53.26%

原题链接: https://leetcode.com/problems/patching-array/description/

## 题目描述
给定一个已排序的整数数组 nums 和一个整数 n，向数组中添加补丁元素以使 [1, n] 范围内的所有数字都可以由数组中的一些元素之和组成。返回所需的最小补丁数。

## 解题思路
为了能够用数组中的元素之和表示范围 [1, n] 中的每一个数，我们可以使用一个贪心算法：

1. 维护一个变量 `miss`，表示我们目前能表示的最小数字。初始值设为 1，因为我们最开始想要表示的最小数字是 1。
2. 遍历给定的数组 `nums`，同时维护一个索引 `i` 表示当前正在处理的数组位置。初始 `i` 为0。
3. 如果 `nums[i]` $<=$ `miss`，则我们可以用 `nums[i]` 来扩展可以表示的范围，将 `miss` 的值增加到 `miss + nums[i]` (用它表示更多的数字)，并将 `i` 增加 1。
4. 如果 `nums[i]` > `miss`，说明我们缺少一个能够表示 `miss` 的数字。这时我们将 `miss` 本身增加到数组中，这样可以保证新的 `miss` 变成 `miss + miss`。
5. 每次需要补丁的时候，计数器 `patches` 增加 1。
6. 重复上述过程直到 `miss` 大于 `n`。最后 `patches` 即为我们需要的结果。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def minPatches(nums, n):
    patches = 0
    miss = 1
    i = 0
    length = len(nums)
    
    while miss <= n:
        # 如果当前元素能帮助覆盖更大的范围
        if i < length and nums[i] <= miss:
            miss += nums[i]  # 用它表示更多的值
            i += 1
        else:
            # 需要补丁
            miss += miss  # 引入一个缺失值的补丁
            patches += 1
    
    return patches

# 示例用法
print(minPatches([1,3], 6))  # 输出: 1
print(minPatches([1,5,10], 20))  # 输出: 2
print(minPatches([1,2,2], 5))  # 输出: 0
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int minPatches(vector<int>& nums, int n) {
        int patches = 0;
        long long miss = 1;
        int i = 0;
        while (miss <= n) {
            // 如果当前元素能覆盖 miss
            if (i < nums.size() && nums[i] <= miss) {
                miss += nums[i++]; // 用它扩展范围
            } else {
                // 否则需要增加补丁
                miss += miss; // 添加补丁
                patches++;
            }
        }
        return patches;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function minPatches(nums, n) {
    let patches = 0;
    let miss = 1;
    let i = 0;

    while (miss <= n) {
        // 如果当前元素能帮助覆盖 miss
        if (i < nums.length && nums[i] <= miss) {
            miss += nums[i]; // 用它扩展范围
            i++;
        } else {
            // 需要补丁
            miss += miss; // 引入缺失值补丁
            patches++;
        }
    }

    return patches;
}

// 示例用法
console.log(minPatches([1,3], 6)); // 输出: 1
console.log(minPatches([1,5,10], 20)); // 输出: 2
console.log(minPatches([1,2,2], 5)); // 输出: 0
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int minPatches(int[] nums, int n) {
        int patches = 0;
        long miss = 1;
        int i = 0;
        
        while (miss <= n) {
            // 如果当前元素能够覆盖 miss
            if (i < nums.length && nums[i] <= miss) {
                miss += nums[i]; // 用它扩展范围
                i++;
            } else {
                // 否则需要补丁
                miss += miss; // 插入补丁
                patches++;
            }
        }
        
        return patches;
    }
}

// 示例用法
// Solution().minPatches(new int[]{1,3}, 6) => 1
// Solution().minPatches(new int[]{1,5,10}, 20) => 2
// Solution().minPatches(new int[]{1,2,2}, 5) => 0
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(m + \\log{n})$，其中 $m$ 是数组 `nums` 的长度，而由于每次补丁时 `miss` 加倍，最多只需要进行 $O(\\log{n})$ 次补充。  
  
空间复杂度为 $O(1)$，因为算法只使用了固定的额外空间。
