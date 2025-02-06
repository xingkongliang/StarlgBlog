---
sidebar_position: 34
tags:
  - array
  - binary-search
  - Medium
---

# 34.在排序数组中查找元素的第一个和最后一个位置

标签: `array`, `binary-search`

难度: Medium

通过率: 45.67%

原题链接: https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/

## 题目描述
给定一个按非递减顺序排序的整数数组 `nums`，找到给定目标值的起始和结束位置。**如果数组中不存在目标值，返回 `[-1, -1]`。**你必须设计一个时间复杂度为 $O(\log n)$ 的算法。

## 解题思路
要在这个问题中找到目标的起始和结束位置，我们可以利用二分查找算法。我们需要分别找到目标值的第一个位置和最后一个位置。由于整体数组是排序的，这样可以用二分查找来达到 $O(\log n)$ 复杂度。具体步骤如下：

1. **查找目标的第一个位置：**使用二分查找算法，从数组的左侧开始查找。如果找到了目标值，继续在左半部分查找，直到找到目标值的第一个位置。

2. **查找目标的最后一个位置：**再次使用二分查找算法，从数组的右侧开始查找。如果找到了目标值，继续在右半部分查找，直到找到目标值的最后一个位置。

3. **返回结果：**如果在任何一次二分查找中没有找到目标值，直接返回 `[-1, -1]`；如果找到了，则返回对应的起始和结束位置的下标。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def searchRange(nums, target):
    # 查找第一个和最后一个给定目标的索引
    def findPosition(isFirst):
        left, right = 0, len(nums) - 1
        position = -1

        while left <= right:
            mid = left + (right - left) // 2
            if nums[mid] == target:
                position = mid
                # 如果查找第一个位置，继续在左边查找
                if isFirst:
                    right = mid - 1
                # 如果查找最后一个位置，继续在右边查找
                else:
                    left = mid + 1
            elif nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1

        return position

    # 找起始位置
    firstPosition = findPosition(True)
    # 找结束位置
    lastPosition = findPosition(False)

    return [firstPosition, lastPosition]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        // 查找第一个和最后一个给定目标的索引
        auto findPosition = [&](bool isFirst) {
            int left = 0, right = nums.size() - 1, position = -1;
            while (left <= right) {
                int mid = left + (right - left) / 2;
                if (nums[mid] == target) {
                    position = mid;
                    if (isFirst) {
                        right = mid - 1; // 查找第一个位置
                    } else {
                        left = mid + 1; // 查找最后一个位置
                    }
                } else if (nums[mid] < target) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
            return position;
        };

        // 找起始位置
        int firstPosition = findPosition(true);
        // 找结束位置
        int lastPosition = findPosition(false);

        return {firstPosition, lastPosition};
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
var searchRange = function(nums, target) {
    // 查找第一个和最后一个给定目标的索引
    const findPosition = (isFirst) => {
        let left = 0, right = nums.length - 1;
        let position = -1;

        while (left <= right) {
            let mid = Math.floor((left + right) / 2);
            if (nums[mid] === target) {
                position = mid;
                if (isFirst) {
                    right = mid - 1; // 查找第一个位置
                } else {
                    left = mid + 1; // 查找最后一个位置
                }
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return position;
    };

    // 找起始位置
    const firstPosition = findPosition(true);
    // 找结束位置
    const lastPosition = findPosition(false);

    return [firstPosition, lastPosition];
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int[] searchRange(int[] nums, int target) {
        // 查找第一个和最后一个给定目标的索引
        int findPosition(boolean isFirst) {
            int left = 0, right = nums.length - 1, position = -1;
            while (left <= right) {
                int mid = left + (right - left) / 2;
                if (nums[mid] == target) {
                    position = mid;
                    if (isFirst) {
                        right = mid - 1; // 查找第一个位置
                    } else {
                        left = mid + 1; // 查找最后一个位置
                    }
                } else if (nums[mid] < target) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
            return position;
        }

        // 找起始位置
        int firstPosition = findPosition(true);
        // 找结束位置
        int lastPosition = findPosition(false);

        return new int[]{firstPosition, lastPosition};
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(\log n)$，因为使用了二分查找。
- 空间复杂度：$O(1)$，因为没有使用额外的空间，所有操作都在输入数组上进行。
