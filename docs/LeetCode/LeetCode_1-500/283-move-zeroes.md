---
sidebar_position: 283
tags:
  - array
  - two-pointers
  - Easy
---

# 283.移动零

标签: `array`, `two-pointers`

难度: Easy

通过率: 62.34%

原题链接: https://leetcode.com/problems/move-zeroes/description/

## 题目描述
给定一个整数数组 `nums`，请将所有的 0 移动到数组的末尾，同时保持非零元素的相对顺序。请注意，必须在不复制数组的情况下就地完成操作。

## 解题思路
我们可以使用两个指针来解决这个问题，一个指针用于遍历整个数组，另一个指针 `insertPos` 用于记录下一个非零元素应该存放的位置。遍历数组时，当发现一个非零元素时，就将该元素移动到 `insertPos` 的位置，同时将 `insertPos` 向前推进一位。遍历完成后，所有的非零元素都被移到了数组的前部分，接着我们将 `insertPos` 后面的元素全部置零即可。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def moveZeroes(nums):
    # 初始化下一个非零元素应该存放的位置
    insertPos = 0
    # 遍历整个数组
    for num in nums:
        if num != 0:
            # 若元素不为零，将其放到下一个非零位置
            nums[insertPos] = num
            # 更新下一个非零位置
            insertPos += 1
    # 将剩余部分填充为零
    for i in range(insertPos, len(nums)):
        nums[i] = 0

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int insertPos = 0; // 下一个非零元素应插入的位置
        for (int num : nums) {
            if (num != 0) { // 如果当前元素非零
                nums[insertPos] = num; // 将其插入到 insertPos
                insertPos++; // 更新插入位置
            }
        }
        // 将剩下的位置置为零
        for (int i = insertPos; i < nums.size(); i++) {
            nums[i] = 0;
        }
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
var moveZeroes = function(nums) {
    let insertPos = 0; // 用于指示下一个非零元素要放置的位置
    // 遍历整个数组
    for (let num of nums) {
        if (num !== 0) { // 如果元素不为零
            nums[insertPos] = num; // 将其放置在 insertPos
            insertPos++; // 更新插入位置
        }
    }
    // 将剩下的位置置为零
    for (let i = insertPos; i < nums.length; i++) {
        nums[i] = 0;
    }
};

```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public void moveZeroes(int[] nums) {
        int insertPos = 0; // 下一个非零元素的位置
        for (int num : nums) {
            if (num != 0) { // 如果找到非零元素
                nums[insertPos] = num; // 将其放到下一个位置
                insertPos++; // 更新插入位置
            }
        }
        // 将剩下的位置设置为零
        for (int i = insertPos; i < nums.length; i++) {
            nums[i] = 0;
        }
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 为数组的长度，因为我们进行了两次线性遍历。  
  
空间复杂度为 $O(1)$，因为我们只使用了常数个额外空间来存储变量。
