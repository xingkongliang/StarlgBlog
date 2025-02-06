---
sidebar_position: 33
tags:
  - array
  - binary-search
  - Medium
---

# 33.在旋转排序数组中搜索

标签: `array`, `binary-search`

难度: Medium

通过率: 41.95%

原题链接: https://leetcode.com/problems/search-in-rotated-sorted-array/description/

## 题目描述
有一个整数数组 `nums` ，它按照升序排序，数组中元素互不相同。`nums` 可能已在某个未知的枢轴处旋转$（1 <= k < nums.length）$，例如，数组 `[0,1,2,4,5,6,7]` 可能会在枢轴 3 处旋转后变为 `[4,5,6,7,0,1,2]`。给定旋转后的数组 `nums` 和一个整数 `target`，如果 `target` 在 `nums` 中，返回其索引；否则，返回 -1。您必须设计一个时间复杂度为 $O(\log n)$ 的算法。

## 解题思路
我们可以考虑使用二分查找算法实现这个问题，因为数组是部分有序的。具体的解决步骤如下：

1. 初始化两个指针 `left` 和 `right` 分别指向数组的开头和结尾。
2. 在每次循环中计算中间位置索引 `mid = (left + right) // 2`。
3. 检查 `nums[mid]` 是否等于目标值 `target`，如果是，则返回 `mid`。
4. 如果 `nums[mid]` 不等于 `target`，则需要确定哪一边是有序的：
   - 如果 `nums[left] <= nums[mid]`，说明左侧是有序的。
     - 如果 `target` 在 `nums[left]` 和 `nums[mid]` 之间，则将 `right` 设置为 `mid - 1`。
     - 否则，将 `left` 设置为 `mid + 1`。
   - 否则，右侧是有序的。
     - 如果 `target` 在 `nums[mid]` 和 `nums[right]` 之间，则将 `left` 设置为 `mid + 1`。
     - 否则，将 `right` 设置为 `mid - 1`。
5. 如果退出循环仍未找到目标值，则返回 -1。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def search(nums, target):
    left, right = 0, len(nums) - 1  # 初始化左右指针
    while left <= right:
        mid = (left + right) // 2   # 计算中间位置
        if nums[mid] == target:
            return mid  # 找到目标值
        # 判断左半部分是否有序
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1  # 缩小范围到左边
            else:
                left = mid + 1   # 缩小范围到右边
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1   # 缩小范围到右边
            else:
                right = mid - 1  # 缩小范围到左边
    return -1  # 未找到目标值
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int search(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target)
            return mid;  // 找到目标值
        if (nums[left] <= nums[mid]) {  // 左侧有序
            if (nums[left] <= target && target < nums[mid])
                right = mid - 1;  // 缩小到左边区域
            else
                left = mid + 1;  // 缩小到右边区域
        } else {  // 右侧有序
            if (nums[mid] < target && target <= nums[right])
                left = mid + 1;  // 缩小到右边区域
            else
                right = mid - 1;  // 缩小到左边区域
        }
    }
    return -1;  // 未找到目标值
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function search(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
            return mid;  // 找到目标值
        }
        if (nums[left] <= nums[mid]) {  // 左侧有序
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;  // 缩小到左边区域
            } else {
                left = mid + 1;  // 缩小到右边区域
            }
        } else {  // 右侧有序
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;  // 缩小到右边区域
            } else {
                right = mid - 1;  // 缩小到左边区域
            }
        }
    }
    return -1;  // 未找到目标值
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) {
            return mid;  // 找到目标值
        }
        if (nums[left] <= nums[mid]) {  // 左侧有序
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;  // 缩小到左边区域
            } else {
                left = mid + 1;  // 缩小到右边区域
            }
        } else {  // 右侧有序
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;  // 缩小到右边区域
            } else {
                right = mid - 1;  // 缩小到左边区域
            }
        }
    }
    return -1;  // 未找到目标值
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(\log n)$，因为我们使用二分查找算法。
空间复杂度：$O(1)$，只使用了常数空间。
