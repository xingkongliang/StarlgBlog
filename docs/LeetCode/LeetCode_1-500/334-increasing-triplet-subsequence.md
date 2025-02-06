---
sidebar_position: 334
tags:
  - array
  - greedy
  - Medium
---

# 334.递增的三元子序列

标签: `array`, `greedy`

难度: Medium

通过率: 39.26%

原题链接: https://leetcode.com/problems/increasing-triplet-subsequence/description/

## 题目描述
给定一个整数数组 nums，当存在三个下标 (i, j, k) 时满足 i < j < k 且 nums[i] < nums[j] < nums[k]，返回 true；否则，返回 false。

## 解题思路
这个问题可以使用贪心算法来解决，以实现 $O(n)$ 时间复杂度和 $O(1)$ 空间复杂度。思路是使用两个变量 first 和 second 来记录三个升序数中的第一个和第二个。我们遍历数组，如果当前数小于或等于 first，则更新 first；如果当前数大于 first 且小于等于 second，则更新 second；如果当前数大于 second，则说明找到了一个满足条件的递增三元子序列。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def increasingTriplet(nums):
    # 初始化两个变量，first和second，分别代表三元组中的第一和第二个数
    first = float('inf')
    second = float('inf')
    
    # 遍历数组元素
    for num in nums:
        # 更新第一个数
        if num <= first:
            first = num
        # 更新第二个数
        elif num <= second:
            second = num
        # 找到了第三个数，返回True
        else:
            return True
    # 如果遍历结束没有找到满足条件的三元组，返回False
    return False
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    bool increasingTriplet(vector<int>& nums) {
        int first = INT_MAX, second = INT_MAX;
        for (int n : nums) {
            // 寻找第一个数
            if (n <= first) {
                first = n;
            // 寻找第二个数
            } else if (n <= second) {
                second = n;
            // 找到了第三个数
            } else {
                return true;
            }
        }
        return false;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function increasingTriplet(nums) {
    // 初始化第一个和第二个数为无穷大
    let first = Infinity, second = Infinity;
    
    for (const n of nums) {
        // 更新第一个数
        if (n <= first) {
            first = n;
        // 更新第二个数
        } else if (n <= second) {
            second = n;
        // 找第三个数
        } else {
            return true;
        }
    }
    return false;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public boolean increasingTriplet(int[] nums) {
        int first = Integer.MAX_VALUE, second = Integer.MAX_VALUE;
        for (int n : nums) {
            // 更新第一个数
            if (n <= first) {
                first = n;
            // 更新第二个数
            } else if (n <= second) {
                second = n;
            // 找到第三个数
            } else {
                return true;
            }
        }
        return false;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度是 $O(n)$，由于我们只遍历了一遍数组。  
  
空间复杂度是 $O(1)$，因为我们只使用了常数级的额外空间。
