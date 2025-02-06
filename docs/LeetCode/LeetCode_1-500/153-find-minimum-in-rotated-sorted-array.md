---
sidebar_position: 153
tags:
  - array
  - binary-search
  - Medium
---

# 153.寻找旋转排序数组中的最小值

标签: `array`, `binary-search`

难度: Medium

通过率: 51.77%

原题链接: https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/description/

## 题目描述
假设按照升序排序的数组在预先未知的某个点上进行了旋转。例如，数组 [0,1,2,4,5,6,7] 可能变为：

- [4,5,6,7,0,1,2] 如果它在 4 个位置上进行了旋转；
- [0,1,2,4,5,6,7] 如果它在 7 个位置上进行旋转。

注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转 1 次结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]] 。

给你一个元素值互不相同的排序数组 nums ，其中 nums 是按照升序排序后的数组在预先未知的某个点上进行了旋转。请你找出并返回数组中的最小元素。

你必须设计一个时间复杂度为 O(log n) 的算法解决此问题。

## 解题思路
要在时间复杂度为 $O(\log n)$ 的条件下找到旋转排序数组中的最小值，可以使用二分查找法。旋转数组有两部分：旋转后的前半段和后半段。最小值总是存在于这种分段的拐点位置。

算法步骤如下：
1. 初始时令 `left` 指向数组的第一个元素，`right` 指向数组的最后一个元素。
2. 如果数组没有旋转，或满足 `nums[left] < nums[right]`，则 `nums[left]` 就是最小值，直接返回。
3. 进行二分查找：
   - 计算 `mid = (left + right) // 2`。
   - 如果 `nums[mid] > nums[right]`，说明最小值在 `mid` 的右侧，更新 `left = mid + 1`。
   - 否则，说明最小值在 `mid` 左侧或就是 `mid`，更新 `right = mid`。
4. 循环结束时，`left` 和 `right` 会收敛到最小元素，返回 `nums[left]` 或 `nums[right]`。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def findMin(nums):
    # 初始化两个指针
    left, right = 0, len(nums) - 1
    
    # 如果数组没有旋转，直接返回第一个元素
    if nums[left] < nums[right]:
        return nums[left]
    
    # 二分查找
    while left < right:
        mid = (left + right) // 2
        
        # 缩小搜索范围
        if nums[mid] > nums[right]:
            left = mid + 1  # 最小值在右侧
        else:
            right = mid  # 最小值在左侧或就是它
    
    return nums[left]  # 或 nums[right]，最终时两者相等
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int findMin(vector<int>& nums) {
    int left = 0, right = nums.size() - 1;

    // 如果没有旋转
    if (nums[left] < nums[right]) {
        return nums[left];
    }

    // 二分查找
    while (left < right) {
        int mid = left + (right - left) / 2;

        // 判断哪个方向
        if (nums[mid] > nums[right]) {
            left = mid + 1;  // 最小值在右侧
        } else {
            right = mid;  // 最小值在左侧或就是它
        }
    }

    return nums[left];  // 或者 nums[right]
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function findMin(nums) {
    let left = 0;
    let right = nums.length - 1;

    // 如果没有旋转
    if (nums[left] < nums[right]) {
        return nums[left];
    }

    // 二分查找
    while (left < right) {
        const mid = Math.floor((left + right) / 2);

        // 确定方向
        if (nums[mid] > nums[right]) {
            left = mid + 1;  // 最小值在右侧
        } else {
            right = mid;  // 最小值在左侧或就是它
        }
    }

    return nums[left];  // 或 nums[right]
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int findMin(int[] nums) {
    int left = 0, right = nums.length - 1;

    // 无旋转情况，直接返回
    if (nums[left] < nums[right]) {
        return nums[left];
    }

    // 二分查找
    while (left < right) {
        int mid = left + (right - left) / 2;

        // 判断方向
        if (nums[mid] > nums[right]) {
            left = mid + 1;  // 最小值在右侧
        } else {
            right = mid;  // 最小值在左侧或就是它
        }
    }

    return nums[left];  // 或 nums[right]
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(\log n)$，因为每次操作都将搜索空间减半。  
  
空间复杂度：$O(1)$，因为我们只使用了有限的额外空间。
