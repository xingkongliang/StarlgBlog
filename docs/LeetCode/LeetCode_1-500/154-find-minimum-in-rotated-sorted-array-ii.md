---
sidebar_position: 154
tags:
  - array
  - binary-search
  - Hard
---

# 154.寻找旋转排序数组中的最小值 II

标签: `array`, `binary-search`

难度: Hard

通过率: 43.88%

原题链接: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/description/

## 题目描述
假设一个按升序排列的数组在某个未知点进行旋转。也就是说，该数组的某个前缀被移到了数组的尾部。需要注意的是，数组可能包含重复的元素。给定这样的数组，返回数组中的最小值。

## 解题思路
本题是 `Find Minimum in Rotated Sorted Array` 的进阶版本，这个版本允许数组中存在重复的元素。我们使用二分查找的方法来解决该问题。```

1. 初始化两个指针`left`和`right`分别指向数组的头和尾。
2. 在每次循环中，根据下标`mid = (left + right) // 2`获得中间元素。
3. 如果`nums[mid]`大于`nums[right]`，说明最小值在右半部分，因此我们需要将`left`移动到`mid + 1`。
4. 如果`nums[mid]`小于`nums[right]`，说明最小值在左半部分，故我们调整`right`指针至`mid`。
5. 当`nums[mid]`等于`nums[right]`时，由于无法判断最小值在哪一侧，将`right`左移一位，来跳过重复的元素。根据这种做法可以保证最小值不会被跳过。

通过以上过程，`left`最终会指向最小值。```

这一算法有效地结合了二分查找与线性扫描处理重复数据的优势，在保证复杂度的情况下很好地解决了问题。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def findMin(nums):
    left, right = 0, len(nums) - 1
    while left < right:
        mid = left + (right - left) // 2
        if nums[mid] > nums[right]:
            # 最小值在右边
            left = mid + 1
        elif nums[mid] < nums[right]:
            # 最小值在左边或就是mid
            right = mid
        else: # nums[mid] == nums[right]
            # 无法决定，缩小右侧边界
            right -= 1
    # 最小值为left
    return nums[left]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int findMin(vector<int>& nums) {
    int left = 0, right = nums.size() - 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] > nums[right]) {
            // 最小值在右半部分
            left = mid + 1;
        } else if (nums[mid] < nums[right]) {
            // 最小值在左半部分
            right = mid;
        } else {
            // nums[mid] == nums[right]
            // 缩小右侧边界
            right--;
        }
    }
    return nums[left];
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function findMin(nums) {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[mid] > nums[right]) {
            // 最小值在右边
            left = mid + 1;
        } else if (nums[mid] < nums[right]) {
            // 最小值在左边
            right = mid;
        } else { // nums[mid] == nums[right]
            // 无法判断，缩小右侧边界
            right--;
        }
    }
    return nums[left];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int findMin(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[right]) {
                // 最小值在右边
                left = mid + 1;
            } else if (nums[mid] < nums[right]) {
                // 最小值在左边
                right = mid;
            } else { // nums[mid] == nums[right]
                // 无法判断，缩小右侧边界
                right--;
            }
        }
        return nums[left];
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，因为在最坏情况下（数组中所有元素相同），对每个元素进行一次比较。  

空间复杂度为 $O(1)$，因为只使用了固定数量的额外空间。
