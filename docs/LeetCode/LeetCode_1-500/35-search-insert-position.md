---
sidebar_position: 35
tags:
  - array
  - binary-search
  - Easy
---

# 35.搜索插入位置

标签: `array`, `binary-search`

难度: Easy

通过率: 47.81%

原题链接: https://leetcode.com/problems/search-insert-position/description/

## 题目描述
给定一个排序的整数数组和一个目标值，如果找到目标值则返回其索引。如果没有找到，返回它将被按顺序插入的位置。你必须设计一个时间复杂度为 $O(\log n)$ 的算法。

## 解题思路
因为数组是排序的，我们可以利用二分查找来实现 $O(\log n)$ 的时间复杂度。使用二分查找的方法来查找目标值：

1. 初始化两个指针：`left` 和 `right`，分别指向数组的开始和结尾。
2. 计算中间位置 `mid`。
3. 如果 `nums[mid]` 等于目标值，则直接返回 `mid`。
4. 如果 `nums[mid]` 小于目标值，则搜索范围缩小到右半部分，将 `left` 更新为 `mid + 1`。
5. 如果 `nums[mid]` 大于目标值，则搜索范围缩小到左半部分，将 `right` 更新为 `mid - 1`。
6. 当 `left` 超过 `right` 时退出循环，此时 `left` 的位置就是目标值应插入的位置。

这一过程利用了数组有序的特性，所以时间复杂度为 $O(\log n)$。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def searchInsert(nums, target):
    # 初始化左右指针
    left, right = 0, len(nums) - 1
    while left <= right:
        # 计算中间位置
        mid = (left + right) // 2
        if nums[mid] == target:
            # 找到目标值，返回当前位置
            return mid
        elif nums[mid] < target:
            # 中间值小于目标值，搜索右半部分
            left = mid + 1
        else:
            # 中间值大于目标值，搜索左半部分
            right = mid - 1
    # `left` 是插入位置
    return left
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int searchInsert(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            // 找到目标值
            return mid;
        } else if (nums[mid] < target) {
            // 目标值大，进入右边部分
            left = mid + 1;
        } else {
            // 目标值小，进入左边部分
            right = mid - 1;
        }
    }
    // `left` 是插入目标的位置
    return left;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function searchInsert(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            // 找到目标值，返回索引
            return mid;
        } else if (nums[mid] < target) {
            // 目标在右半边
            left = mid + 1;
        } else {
            // 目标在左半边
            right = mid - 1;
        }
    }
    // 未找到的情况下，返回插入位置
    return left;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int searchInsert(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) {
                // 找到目标值
                return mid;
            } else if (nums[mid] < target) {
                // 目标在右半边
                left = mid + 1;
            } else {
                // 目标在左半边
                right = mid - 1;
            }
        }
        // `left` 是插入目标的位置
        return left;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(\log n)$，其中 $n$ 是数组的长度，因为我们使用二分查找。`
空间复杂度：$O(1)$，只使用了常数级别的额外空间。
