---
sidebar_position: 27
tags:
  - array
  - two-pointers
  - Easy
---

# 27.移除元素

标签: `array`, `two-pointers`

难度: Easy

通过率: 58.9%

原题链接: https://leetcode.com/problems/remove-element/description/

## 题目描述
给定一个整数数组 `nums` 和一个整数 `val`，请你原地移除所有数值等于 `val` 的元素，并返回移除后数组的新长度。元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

## 解题思路
我们将使用双指针的方法来解决这个问题。对于数组 `nums`，我们使用两个指针：`i` 和 `j`。初始时，`i` 和 `j` 都指向数组的第一个元素。遍历数组的过程中，`i` 作为慢指针指向包含非 `val` 元素的下一个位置，`j` 作为快指针遍历整个数组。当 `j` 指向的元素不等于 `val` 时，我们将 `nums[j]` 的值赋给 `nums[i]`，然后 `i` 递增1。最后，`i` 的值即为不包含 `val` 的元素个数，也是新的数组长度。整个操作为常数空间复杂度 `O(1)`，而时间复杂度为 `O(n)`，其中 `n` 为数组的长度。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def removeElement(nums, val):
    # 初始化慢指针为0
    i = 0
    # 遍历数组
    for j in range(len(nums)):
        # 如果当前元素不等于val
        if nums[j] != val:
            # 将其复制到慢指针的位置
            nums[i] = nums[j]
            # 移动慢指针
            i += 1
    # 返回新的长度
    return i
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        // 慢指针初始化
        int i = 0;
        // 快指针遍历整个数组
        for (int j = 0; j < nums.size(); j++) {
            // 如果当前元素不等于val
            if (nums[j] != val) {
                // 将其复制到慢指针的位置
                nums[i] = nums[j];
                // 慢指针前移
                i++;
            }
        }
        // 返回非val元素的数量
        return i;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function removeElement(nums, val) {
    let i = 0;
    for (let j = 0; j < nums.length; j++) {
        if (nums[j] !== val) {
            nums[i] = nums[j];
            i++;
        }
    }
    return i;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int removeElement(int[] nums, int val) {
        int i = 0;
        for (int j = 0; j < nums.length; j++) {
            if (nums[j] != val) {
                nums[i] = nums[j];
                i++;
            }
        }
        return i;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度: $O(n)$，其中 $n$ 是数组的长度。需要遍历整个数组。`
`空间复杂度: $O(1)$。只使用了常数个额外变量。
