---
sidebar_position: 26
tags:
  - array
  - two-pointers
  - Easy
---

# 26.删除排序数组中的重复项

标签: `array`, `two-pointers`

难度: Easy

通过率: 58.61%

原题链接: https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/

## 题目描述
给定一个按非递减顺序排序的整数数组 `nums`，你需要原地删除重复元素，使得数组中的每个唯一元素只出现一次。元素的相对顺序应该保持不变。然后返回唯一元素的个数。你需要做的是：

1. 修改数组 `nums`，使得前 `k` 个元素包含唯一元素，且顺序与 `nums` 初始时相同。
2. 返回 `k`，即唯一元素的个数。

测试程序会通过对返回的 `k` 值及 `nums` 数组中前 `k` 个元素进行判断来验证你的代码。

## 解题思路
由于数组是有序的，我们可以使用双指针的技术来解决这个问题。具体步骤如下：  

1. 使用两个指针 `i` 和 `j`，其中 `i` 是慢指针，用于存储唯一元素的位置，而 `j` 是快指针，用于迭代整个数组。  
2. 初始化 `i = 0`，遍历数组，从 `j = 1` 开始：  
   * 如果 `nums[j]` 与 `nums[i]` 不同，则说明发现了新的唯一元素，先将 `i` 增加 1，然后将 `nums[j]` 的值赋给 `nums[i]`。 
   * 否则，继续增加 `j`。 
3. 最后，遍历结束后，返回 `i + 1`，这个值代表数组中有多少个唯一元素。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def removeDuplicates(nums):
    # 当数组为空时，返回0
    if not nums:
        return 0

    i = 0  # 慢指针，指向唯一元素放置的位置
    for j in range(1, len(nums)):
        # 快指针遍历数组，寻找不同的数字
        if nums[j] != nums[i]:
            i += 1
            nums[i] = nums[j]

    return i + 1  # 返回唯一元素的个数
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if (nums.empty()) return 0;
        int i = 0; // 慢指针
        for (int j = 1; j < nums.size(); j++) {
            if (nums[j] != nums[i]) {
                i++;
                nums[i] = nums[j];
            }
        }
        return i + 1; // 返回唯一元素的个数
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function removeDuplicates(nums) {
    if (nums.length === 0) return 0;
    
    let i = 0;
    for (let j = 1; j < nums.length; j++) {
        if (nums[j] !== nums[i]) {
            i++; 
            nums[i] = nums[j];
        }
    }
    return i + 1; // 返回唯一元素的个数
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        int i = 0;
        for (int j = 1; j < nums.length; j++) {
            if (nums[j] != nums[i]) {
                i++;
                nums[i] = nums[j];
            }
        }
        return i + 1; // 返回唯一元素的个数
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是数组的长度，因为我们遍历数组一次。  
空间复杂度：$O(1)$，我们只使用了常数级别的额外空间。
