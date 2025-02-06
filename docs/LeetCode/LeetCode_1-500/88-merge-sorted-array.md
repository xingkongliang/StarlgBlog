---
sidebar_position: 88
tags:
  - array
  - two-pointers
  - sort
  - Easy
---

# 88.合并排序数组

标签: `array`, `two-pointers`, `sort`

难度: Easy

通过率: 51.7%

原题链接: https://leetcode.com/problems/merge-sorted-array/description/

## 题目描述
你有两个按非递减顺序排序的整数数组 `nums1` 和 `nums2`，以及两个整数 `m` 和 `n`，分别代表 `nums1` 和 `nums2` 的元素数量。

将 `nums2` 合并到 `nums1` 中，使合并后的数组同样为非递减顺序。

最终排序后的数组不应该由函数返回，而是应该存储在数组 `nums1` 中。为此，`nums1` 的长度为 `m + n`，其中前 `m` 个元素表示要合并的元素，最后 `n` 个元素设置为0，应该被忽略。 `nums2` 的长度为 `n`。

## 解题思路
我们可以使用双指针法从后向前合并这两个有序数组。由于 `nums1` 有足够的空间容纳最终结果，我们可以使用三个指针：`p1` 指向 `nums1` 的有效部分（前 `m` 个元素），`p2` 指向 `nums2` 的有效部分（全部 `n` 个元素），以及 `p` 指向合并后数组的最后一个位置（`m + n - 1`）。

我们从数组的末尾开始填充 `nums1`，每次比较 `nums1[p1]` 和 `nums2[p2]`，将较大的那个放到 `nums1[p]`，然后相应地移动指针。 

- 若 `nums1[p1] > nums2[p2]`，则将 `nums1[p1]` 放到 `nums1[p]`，同时令 `p1` 前移（减少1）。
- 反之，将 `nums2[p2]` 放到 `nums1[p]`，同时令 `p2` 前移。
- 无论哪种情况，指针 `p` 均减少1。

当 `p2` 到达头部（即小于0）时，表示所有 `nums2` 中的元素都已经合并完成。注意，如果所有的 `nums1` 中的元素都更大或者相等，那么就直接保持现状即可，因为需要合并的已经在 `nums1` 的合适位置上。

如果合并过程中只剩 `nums2` 的数了，可以直接把剩下的填到 `nums1` 的前面。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def merge(nums1, m, nums2, n):
    # 设置指针 p1, p2 和 p，分别指向 nums1 和 nums2 的末尾，以及合并后的末尾
    p1, p2, p = m - 1, n - 1, m + n - 1
    
    # 从后往前填充 nums1
    while p2 >= 0:  # 当 nums2 还有元素未合并时
        if p1 >= 0 and nums1[p1] > nums2[p2]:
            nums1[p] = nums1[p1]
            p1 -= 1
        else:
            nums1[p] = nums2[p2]
            p2 -= 1
        p -= 1

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int p1 = m - 1, p2 = n - 1, p = m + n - 1;
        while (p2 >= 0) {
            if (p1 >= 0 && nums1[p1] > nums2[p2]) {
                nums1[p] = nums1[p1];
                p1--;
            } else {
                nums1[p] = nums2[p2];
                p2--;
            }
            p--;
        }
    }
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function merge(nums1, m, nums2, n) {
    let p1 = m - 1, p2 = n - 1, p = m + n - 1;
    while (p2 >= 0) {
        if (p1 >= 0 && nums1[p1] > nums2[p2]) {
            nums1[p] = nums1[p1];
            p1--;
        } else {
            nums1[p] = nums2[p2];
            p2--;
        }
        p--;
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public void merge(int[] nums1, int m, int[] nums2, int n) {
        int p1 = m - 1, p2 = n - 1, p = m + n - 1;
        while (p2 >= 0) {
            if (p1 >= 0 && nums1[p1] > nums2[p2]) {
                nums1[p] = nums1[p1];
                p1--;
            } else {
                nums1[p] = nums2[p2];
                p2--;
            }
            p--;
        }
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度**：

$O(m + n)$，因为每个元素只处理一次。

**空间复杂度**：

$O(1)$，因为合并是就地进行的，不需要额外的空间。
