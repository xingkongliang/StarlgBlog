---
sidebar_position: 4
tags:
  - array
  - divide-and-conquer
  - binary-search
  - Hard
---

# 4.两个排序数组的中位数

标签: `array`, `divide-and-conquer`, `binary-search`

难度: Hard

通过率: 42.25%

原题链接: https://leetcode.com/problems/median-of-two-sorted-arrays/description/

## 题目描述
给定两个已排序的数组 nums1 和 nums2 ，分别包含 m 和 n 个元素，返回这两个已排序数组的中位数。总的时间复杂度应该为 $O(\log (m+n))$。

## 解题思路
要在两个排序数组中找到中位数，我们可以利用二分查找的思想来缩小搜索空间。假设 nums1 长度较短，我们将 nums1 分为两部分 $left1$ 和 $right1$，将 nums2 分为 $left2$ 和 $right2$，以保证 $\text{len}(left1) + \text{len}(left2) = \text{len}(right1) + \text{len}(right2)$。我们希望找出一个分割点，使得 $\max(left1, left2) \leq \min(right1, right2)$。通过对 nums1 的分割点进行二分搜索，我们可以在 $O(\log (\min(m, n)))$ 的时间复杂度内找到这个合适的分割点。一旦找到这个点，中位数可以根据数组的总长度是奇数还是偶数来计算。奇数时，中位数是$\max(left1, left2)$；偶数时，中位数是$\frac{\max(left1, left2) + \min(right1, right2)}{2}$。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def findMedianSortedArrays(nums1, nums2):
    # 确保 nums1 是较短的数组以优化时间复杂度
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1

    x, y = len(nums1), len(nums2)
    low, high = 0, x

    while low <= high:
        partitionX = (low + high) // 2
        partitionY = (x + y + 1) // 2 - partitionX

        # 边界条件
        maxX = float('-inf') if partitionX == 0 else nums1[partitionX - 1]
        minX = float('inf') if partitionX == x else nums1[partitionX]

        maxY = float('-inf') if partitionY == 0 else nums2[partitionY - 1]
        minY = float('inf') if partitionY == y else nums2[partitionY]

        # 检查分割是否合适
        if maxX <= minY and maxY <= minX:
            if (x + y) % 2 == 0:
                return (max(maxX, maxY) + min(minX, minY)) / 2
            else:
                return max(maxX, maxY)
        elif maxX > minY:
            high = partitionX - 1
        else:
            low = partitionX + 1

    raise ValueError("Input arrays are not valid for median calculation.")
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    double findMedianSortedArrays(std::vector<int>& nums1, std::vector<int>& nums2) {
        if (nums1.size() > nums2.size()) {
            return findMedianSortedArrays(nums2, nums1);
        }
        int x = nums1.size();
        int y = nums2.size();
        int low = 0, high = x;
        while (low <= high) {
            int partitionX = (low + high) / 2;
            int partitionY = (x + y + 1) / 2 - partitionX;

            int maxX = (partitionX == 0) ? INT_MIN : nums1[partitionX - 1];
            int minX = (partitionX == x) ? INT_MAX : nums1[partitionX];

            int maxY = (partitionY == 0) ? INT_MIN : nums2[partitionY - 1];
            int minY = (partitionY == y) ? INT_MAX : nums2[partitionY];

            if (maxX <= minY && maxY <= minX) {
                if ((x + y) % 2 == 0) {
                    return (double)(std::max(maxX, maxY) + std::min(minX, minY)) / 2;
                } else {
                    return (double)(std::max(maxX, maxY));
                }
            } else if (maxX > minY) {
                high = partitionX - 1;
            } else {
                low = partitionX + 1;
            }
        }
        throw std::invalid_argument("Input arrays are not valid for median calculation.");
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function findMedianSortedArrays(nums1, nums2) {
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    let x = nums1.length;
    let y = nums2.length;
    let low = 0, high = x;

    while (low <= high) {
        let partitionX = Math.floor((low + high) / 2);
        let partitionY = Math.floor((x + y + 1) / 2) - partitionX;

        let maxX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
        let minX = partitionX === x ? Infinity : nums1[partitionX];

        let maxY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
        let minY = partitionY === y ? Infinity : nums2[partitionY];

        if (maxX <= minY && maxY <= minX) {
            if ((x + y) % 2 === 0) {
                return (Math.max(maxX, maxY) + Math.min(minX, minY)) / 2;
            } else {
                return Math.max(maxX, maxY);
            }
        } else if (maxX > minY) {
            high = partitionX - 1;
        } else {
            low = partitionX + 1;
        }
    }
    throw new Error("Input arrays are not valid for median calculation.");
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) {
            return findMedianSortedArrays(nums2, nums1);
        }
        int x = nums1.length;
        int y = nums2.length;

        int low = 0, high = x;
        while (low <= high) {
            int partitionX = (low + high) / 2;
            int partitionY = (x + y + 1) / 2 - partitionX;

            int maxX = (partitionX == 0) ? Integer.MIN_VALUE : nums1[partitionX - 1];
            int minX = (partitionX == x) ? Integer.MAX_VALUE : nums1[partitionX];

            int maxY = (partitionY == 0) ? Integer.MIN_VALUE : nums2[partitionY - 1];
            int minY = (partitionY == y) ? Integer.MAX_VALUE : nums2[partitionY];

            if (maxX <= minY && maxY <= minX) {
                if ((x + y) % 2 == 0) {
                    return ((double)Math.max(maxX, maxY) + Math.min(minX, minY)) / 2;
                } else {
                    return (double)Math.max(maxX, maxY);
                }
            } else if (maxX > minY) {
                high = partitionX - 1;
            } else {
                low = partitionX + 1;
            }
        }
        throw new IllegalArgumentException("Input arrays are not valid for median calculation.");
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度: 由于我们用二分搜索解决这个问题，因此时间复杂度是 $O(\log(\min(m, n)))$，其中 $m$ 和 $n$ 为两个数组的长度。我们总是对较短的数组进行二分搜索以优化性能。`
- 空间复杂度: 由于只使用了常量级别的额外空间，空间复杂度为 $O(1)$。
