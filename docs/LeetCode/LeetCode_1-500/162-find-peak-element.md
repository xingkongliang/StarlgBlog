---
sidebar_position: 162
tags:
  - array
  - binary-search
  - Medium
---

# 162.寻找峰值

标签: `array`, `binary-search`

难度: Medium

通过率: 46.21%

原题链接: https://leetcode.com/problems/find-peak-element/description/

## 题目描述
峰值元素是指其值严格大于左右相邻值的元素。给定一个从0开始索引的整数数组 `nums`，找到一个峰值，并返回其索引。如果数组中存在多个峰值，则返回任何一个峰值的索引即可。可以假设 `nums[-1] = nums[n] = -∞`。解决方案必须在 O(log n) 时间复杂度内完成。

## 解题思路
为了寻找峰值元素，我们可以利用二分查找算法，以下是具体步骤：

1. 初始化两个指针，`left` 为 0（数组的开始），`right` 为 `n-1`（数组的结束，`n`为数组的长度）。

2. 在每次迭代中，计算中点 `mid` 的索引值 `mid = left + (right - left) // 2`。

3. 比较 `nums[mid]` 和 `nums[mid + 1]` 的大小：
   - 如果 `nums[mid] > nums[mid + 1]`，这意味着峰值可能在 `mid` 的左边区域，包含 `mid`，因为 `mid` 本身有可能是峰值。移动 `right` 到 `mid`。
   - 否则，峰值在右边，移动 `left` 到 `mid + 1`。

4. 当 `left` 和 `right` 重合时，`left` 指向的就是一个峰值的位置。

这种方法利用二分查找，在每次迭代中将搜索范围缩小一半，并在 `nums` 中寻找局部峰值，复杂度为 `O(log n)`。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def find_peak_element(nums):
    left, right = 0, len(nums) - 1
    while left < right:
        mid = left + (right - left) // 2
        # 如果中间元素大于其右侧元素，则峰值在左半部分或者中间元素本身
        if nums[mid] > nums[mid + 1]:
            right = mid
        else:
            # 否则，峰值在右半部分
            left = mid + 1
    return left
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int left = 0, right = nums.size() - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            // 如果中间元素大于其右侧元素，则峰值在左半部分或者中间元素本身
            if (nums[mid] > nums[mid + 1]) {
                right = mid;
            } else {
                // 否则，峰值在右半部分
                left = mid + 1;
            }
        }
        return left;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function findPeakElement(nums) {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        let mid = Math.floor(left + (right - left) / 2);
        // 如果中间元素大于其右侧元素，则峰值在左半部分或者中间元素本身
        if (nums[mid] > nums[mid + 1]) {
            right = mid;
        } else {
            // 否则，峰值在右半部分
            left = mid + 1;
        }
    }
    return left;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int findPeakElement(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            // 如果中间元素大于其右侧元素，则峰值在左半部分或者中间元素本身
            if (nums[mid] > nums[mid + 1]) {
                right = mid;
            } else {
                // 否则，峰值在右半部分
                left = mid + 1;
            }
        }
        return left;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(\log n)$，因为我们在每次循环中都将搜索空间减半。  
  
空间复杂度：$O(1)$，因为我们只使用了常量级的额外空间，用于存储指针和中间变量。
