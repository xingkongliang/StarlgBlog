---
sidebar_position: 81
tags:
  - array
  - binary-search
  - Medium
---

# 81.在旋转排序数组中搜索 II

标签: `array`, `binary-search`

难度: Medium

通过率: 38.39%

原题链接: https://leetcode.com/problems/search-in-rotated-sorted-array-ii/description/

## 题目描述
有一个整数数组 `nums`，已按非递减顺序排序（不一定只有唯一值）。在传递给函数之前，数组 `nums` 在未知的下标 `k` （`0 <= k < nums.length`）上进行了旋转，使得数组变为了 `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]`。例如，`[0,1,2,4,4,4,5,6,6,7]` 可能在下标 5 处旋转后变为 `[4,5,6,6,7,0,1,2,4,4]`。给你旋转后的数组 `nums` 和一个整数 `target`，如果 `target` 在 `nums` 中，则返回 `true`；否则返回 `false`。

## 解题思路
解决这个问题的主要挑战在于数组中可能包含重复的元素，这使得标准的二分搜索稍微复杂一些，因为我们不能明确判断哪一边是有序的。为了处理可能的重复项，算法可以进行如下调整：  

1. **初始化左右指针：** 初始化两个指针，左指针 `left` 指向数组开头，右指针 `right` 指向数组结尾。

2. **二分查找循环：** 当 `left <= right` 时，进行以下步骤：  

    a. **计算中点：** 计算中点 `mid = left + (right - left) // 2`。

    b. **检查目标：** 如果 `nums[mid] == target`，则直接返回 `true`。

    c. **处理重复元素：** 如果 `nums[left] == nums[mid] == nums[right]`，无法判断哪边是有序的，此时通过 `left++` 和 `right--` 来缩减范围。  

    d. **确定有序部分：**
        - 如果 `nums[left] <= nums[mid]`，左半部分是有序的：
          - 如果 `nums[left] <= target < nums[mid]`，则目标在左半部分，令 `right = mid - 1`。
          - 否则，目标在右半部分，令 `left = mid + 1`。
        - 否则，右半部分是有序的：
          - 如果 `nums[mid] < target <= nums[right]`，则目标在右半部分，令 `left = mid + 1`。
          - 否则，目标在左半部分，令 `right = mid - 1`。

3. **返回结果：** 如果退出循环仍未找到目标，则返回 `false`。  

这一策略有效地克服了由于重复项可能造成的模糊性，进而进行了二分搜索。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = left + (right - left) // 2
        # 如果找到了目标值，直接返回True
        if nums[mid] == target:
            return True
        # 如果出现数组左值, 中值, 右值相等，无法判断哪侧有序，只能逐步缩小搜索范围
        if nums[left] == nums[mid] == nums[right]:
            left += 1
            right -= 1
        # 左半部分有序
        elif nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # 右半部分有序
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return False

# 示例用法
print(search([2,5,6,0,0,1,2], 0))  # 输出: True
print(search([2,5,6,0,0,1,2], 3))  # 输出: False
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    bool search(vector<int>& nums, int target) {
        int left = 0, right = nums.size() - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            // 找到目标值
            if (nums[mid] == target) {
                return true;
            }
            // 如果无法判断哪侧有序，因为左，中，右相等
            if (nums[left] == nums[mid] && nums[mid] == nums[right]) {
                ++left;
                --right;
            }
            // 左半部分有序
            else if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            // 右半部分有序
            } else {
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return false;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function search(nums, target) {
    let left = 0, right = nums.length - 1;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        // 找到目标值
        if (nums[mid] === target) {
            return true;
        }
        // 如果无法判断哪侧有序，因为左，中，右相等
        if (nums[left] === nums[mid] && nums[mid] === nums[right]) {
            left++;
            right--;
        }
        // 左半部分有序
        else if (nums[left] <= nums[mid]) {
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        // 右半部分有序
        } else {
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return false;
}

// 示例用法
console.log(search([2,5,6,0,0,1,2], 0));  // 输出: true
console.log(search([2,5,6,0,0,1,2], 3));  // 输出: false
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public boolean search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            // 找到目标值
            if (nums[mid] == target) {
                return true;
            }
            // 如果无法判断哪侧有序，因为左，中，右相等
            if (nums[left] == nums[mid] && nums[mid] == nums[right]) {
                ++left;
                --right;
            }
            // 左半部分有序
            else if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            // 右半部分有序
            } else {
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return false;
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：在最坏情况下，由于逐步缩小边界的过程，时间复杂度为 $O(n)$。
- 空间复杂度：算法使用了常数额外空间，因此空间复杂度为 $O(1)$。
