---
sidebar_position: 169
tags:
  - array
  - divide-and-conquer
  - hash-table
  - sort
  - Easy
---

# 169.多数元素

标签: `array`, `divide-and-conquer`, `hash-table`, `sort`

难度: Easy

通过率: 65.37%

原题链接: https://leetcode.com/problems/majority-element/description/

## 题目描述
给定一个大小为 $n$ 的数组 $\text{nums}$，返回其中的多数元素。多数元素是指在数组中出现次数大于 $\lfloor n / 2 \rfloor$ 次的元素。可以假设数组是非空的，并且多数元素总是存在于数组中。

## 解题思路
要找到数组中的多数元素，可以有多种策略，这里介绍多种方法：

1. **哈希表**：利用哈希表来存储每个元素出现的次数。随后遍历哈希表，找到出现次数最多的元素。
  - 时间复杂度：$O(n)$
  - 空间复杂度：$O(n)$

2. **排序**：将数组排序，多数元素一定会出现在中间位置。直接返回中间位置的元素即可。
  - 时间复杂度：$O(n \log n)$
  - 空间复杂度：$O(1)$

3. **摩尔投票法**：一种寻找潜在多数元素的计数算法。
  - 思路：
    1. 初始化一个候选人变量为第一个元素，计数器初始化为 1。
    2. 遍历数组，每当发现元素与当前候选人相同，计数器加1，否则减1。
    3. 当计数器为0时，更新候选人为当前的元素并将计数器重置为1。
    4. 最后留下的候选人即为多数元素。
  - 时间复杂度：$O(n)$
  - 空间复杂度：$O(1)$

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def majorityElement(nums):
    # 使用摩尔投票法寻找多数元素
    candidate = None
    count = 0
    for num in nums:
        if count == 0:
            # 如果计数器为0，选择当前元素作为新的候选人
            candidate = num
        # 如果当前的元素等于候选人，增加计数器；否则减少计数器
        count += (1 if num == candidate else -1)
    return candidate
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        // 使用摩尔投票法
        int candidate = nums[0];
        int count = 0;
        for (int num : nums) {
            if (count == 0) {
                // 更新候选人
                candidate = num;
            }
            // 根据当前数字是否与候选人相同调整计数器
            count += (num == candidate ? 1 : -1);
        }
        return candidate;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
var majorityElement = function(nums) {
    // 使用摩尔投票算法
    let candidate = null;
    let count = 0;
    for (let num of nums) {
        if (count === 0) {
            // 计数器为0时，更新候选人
            candidate = num;
        }
        // 计数器加一或减一
        count += (num === candidate ? 1 : -1);
    }
    return candidate;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int majorityElement(int[] nums) {
        // 使用摩尔投票算法
        int candidate = nums[0];
        int count = 0;
        for (int num : nums) {
            if (count == 0) {
                // 设置新候选人
                candidate = num;
            }
            // 修改计数器
            count += (num == candidate ? 1 : -1);
        }
        return candidate;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$  
  
空间复杂度：$O(1)$
