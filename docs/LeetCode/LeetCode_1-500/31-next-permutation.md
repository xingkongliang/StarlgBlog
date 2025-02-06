---
sidebar_position: 31
tags:
  - array
  - two-pointers
  - Medium
---

# 31.下一个排列

标签: `array`, `two-pointers`

难度: Medium

通过率: 41.78%

原题链接: https://leetcode.com/problems/next-permutation/description/

## 题目描述
排列是整数数组的一个排列组合，表示为一个线性序列。例如，对于数组 $[1,2,3]$，所有可能的排列有 $[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]$。给定一个整数数组 $nums$，其`下一个排列`是指在所有可能的排列中，字典序仅次于当前排列的下一个组合。如果不存在下一个字典序更大的排列，则将数组重新排序为最小的字典序（即升序）。例如：对于数组 $[1,2,3]$，下一个排列是 $[1,3,2]$；对于数组 $[3,2,1]$，下一个排列是 $[1,2,3]$。这个问题要求在原地修改数组，并且只使用常数级别的额外空间。

## 解题思路
为求出给定数组的下一个排列，我们可以遵循以下步骤：

1. 从右往左找到第一个相邻升序对：即找到最大索引 $k$，使得 `nums[k] < nums[k+1]`。如果不存在这样的索引，说明当前排列是最大的字典序排列，我们需要将其逆序为最小字典序排列。

2. 如果找到了这样的索引 $k$，从右往左找到第一个大于 $nums[k]$ 的元素：即找到最大索引 $l$，满足 `nums[k] < nums[l]`。

3. 交换`nums[k]`和`nums[l]`。

4. 反转`nums[k+1]`到数组末尾的元素，使其成为升序以得到下一个字典序最小的排列。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def nextPermutation(nums):
    # 从后向前找到第一个升序对
    k = len(nums) - 2
    while k >= 0 and nums[k] >= nums[k + 1]:
        k -= 1
    
    if k == -1:  # 如果没找到升序对，直接反转整个数组
        nums.reverse()
    else:
        # 找到第一个比nums[k]大的元素从后往前
        l = len(nums) - 1
        while nums[l] <= nums[k]:
            l -= 1
        # 交换
        nums[k], nums[l] = nums[l], nums[k]
        # 反转后面的元素
        nums[k + 1:] = nums[k + 1:][::-1]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int k = nums.size() - 2;
        // 找到第一个升序对
        while (k >= 0 && nums[k] >= nums[k + 1]) {
            --k;
        }
        if (k == -1) {
            // 如果没找到，逆序整个数组
            reverse(nums.begin(), nums.end());
            return;
        }
        int l = nums.size() - 1;
        // 找到第一个大于nums[k]的数
        while (nums[l] <= nums[k]) {
            --l;
        }
        // 交换这两个元素
        swap(nums[k], nums[l]);
        // 反转从k+1到结尾
        reverse(nums.begin() + k + 1, nums.end());
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function nextPermutation(nums) {
    // 从后往前找到第一个升序对
    let k = nums.length - 2;
    while (k >= 0 && nums[k] >= nums[k + 1]) {
        k -= 1;
    }
    
    if (k === -1) { // 如果没有这样的升序对，逆序整个数组
        nums.reverse();
    } else {
        // 从后往前找到第一个比nums[k]大的数
        let l = nums.length - 1;
        while (nums[l] <= nums[k]) {
            l -= 1;
        }
        // 交换
        [nums[k], nums[l]] = [nums[l], nums[k]];
        // 把k+1到结尾的部分逆序
        nums.splice(k + 1, nums.length - (k + 1), ...nums.slice(k + 1).reverse());
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public void nextPermutation(int[] nums) {
        int k = nums.length - 2;
        // 找到第一个升序对
        while (k >= 0 && nums[k] >= nums[k + 1]) {
            k--;
        }
        if (k == -1) {
            // 如果没找到，reverse整个数组
            reverse(nums, 0, nums.length - 1);
            return;
        }
        int l = nums.length - 1;
        // 找到第一个比nums[k]大的
        while (nums[l] <= nums[k]) {
            l--;
        }
        // 交换
        swap(nums, k, l);
        // reverse k+1到末尾
        reverse(nums, k + 1, nums.length - 1);
    }
    
    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
    
    private void reverse(int[] nums, int start, int end) {
        while (start < end) {
            swap(nums, start, end);
            start++;
            end--;
        }
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是数组的长度。最坏情况下左右指针各遍历一次数组。`
空间复杂度：$O(1)$，我们只使用了常数级别的额外空间。`}
