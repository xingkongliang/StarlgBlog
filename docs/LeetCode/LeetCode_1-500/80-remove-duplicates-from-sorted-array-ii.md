---
sidebar_position: 80
tags:
  - array
  - two-pointers
  - Medium
---

# 80.删除排序数组中的重复项 II

标签: `array`, `two-pointers`

难度: Medium

通过率: 61.2%

原题链接: https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/description/

## 题目描述
给定一个按非递减顺序排序的整数数组 `nums`，请在原地删除某些重复项，使得每个唯一元素最多出现两次。元素的相对顺序应该与原数组中的顺序相同。 既然某些语言中无法改变长度，结果应保存在数组 `nums` 的前一部分中。如果去重后有 `k` 个元素，则 `nums` 的前 `k` 个元素应包含结果。在 `k` 之后的内容可以是任何值。返回 `k`。不能使用额外的数组空间，必须使用 $O(1)$ 的额外空间原地修改输入数组。

## 解题思路
为了达到题目的要求，我们可以使用双指针的方法，一个快速指针遍历数组，一个慢速指针帮助我们构建结果数组：  
1. 初始化一个慢指针 `j`，指向当前可以放置元素的位置。  
2. 初始慢指针为 0，因为至少允许留两个元素，所以我们可以直接将前两个元素保留。
3. 使用一个快指针 `i` 从 `nums` 数组的第三个元素开始遍历：
   - 对于每个元素 `nums[i]`，如果它与 `nums[j-2]` 不相同，那么 `nums[i]` 不是过多重复的，可以将其移动到慢指针所指的位置，并将 `j` 向前移动一位。
4. 遍历结束后，返回 `j` 作为最终去重后数组的长度。  
这保证每个元素在输出的结果数组中最多出现两次，并且是按顺序排列的。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def removeDuplicates(nums):
    # 用于记录可以放置位置的慢指针
    j = 0
    # 遍历整个数组
    for i in range(len(nums)):
        # 如果当前元素和两步之前元素不同或者前两个元素直接保留
        if j < 2 or nums[i] != nums[j-2]:
            # 则放置到 j 所在的位置
            nums[j] = nums[i]
            j += 1
    return j
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int removeDuplicates(vector<int>& nums) {
    // 慢指针指示可放置位置
    int j = 0;
    for (int i = 0; i < nums.size(); ++i) {
        // 确保最多出现两次
        if (j < 2 || nums[i] != nums[j - 2]) {
            nums[j] = nums[i];
            ++j;
        }
    }
    return j;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function removeDuplicates(nums) {
    // 慢指针初始化
    let j = 0;
    // 遍历数组
    for (let i = 0; i < nums.length; i++) {
        // 保证最多两次的条件
        if (j < 2 || nums[i] !== nums[j - 2]) {
            nums[j] = nums[i];
            j++;
        }
    }
    return j;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int removeDuplicates(int[] nums) {
    // 初始化慢指针
    int j = 0;
    // 遍历整个数组
    for (int i = 0; i < nums.length; i++) {
        // 检查是否满足条件
        if (j < 2 || nums[i] != nums[j - 2]) {
            nums[j] = nums[i];
            j++;
        }
    }
    return j;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是数组的长度，因为必须遍历整个数组。  
空间复杂度：$O(1)$，因为我们只使用了常数级别的额外空间来维护指针。
