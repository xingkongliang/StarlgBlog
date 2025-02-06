---
sidebar_position: 448
tags:
  - array
  - hash-table
  - Easy
---

# 448.找到数组中所有消失的数字

标签: `array`, `hash-table`

难度: Easy

通过率: 61.67%

原题链接: https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/description/

## 题目描述
给定一个长度为n的整数数组nums，其中nums[i]的值在[1, n]范围内。返回一个包含所有在[1, n]范围内但未出现在nums中的整数的数组。

## 解题思路
题目要求在数组中找到所有未出现的整数，并且希望使用O(n)的时间复杂度和尽量少的额外空间。考虑使用输入数组本身来标记出现的数字。具体思路如下：

1. 遍历数组 `nums` 中的每一个数字 `nums[i]`（注意其值的范围是1到n）。
2. 对于每一个数字 `num = nums[i]`，我们可以将 `nums[num - 1]` 这个位置的数标记为负数，表示数字 `num` 已出现在数组中。
3. 最后，再遍历数组 `nums`，对于每一个正数 `nums[i]`，表示该索引加1的数字 `i+1` 在 `nums` 中没有出现。
4. 返回这些缺失的数字组成的数组。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def findDisappearedNumbers(nums):
    # 遍历 nums 并将出现的数所对应的索引处的数变为其负值
    for num in nums:
        index = abs(num) - 1  # 计算原始索引
        nums[index] = -abs(nums[index])  # 标记为负数

    # 收集结果
    result = [i + 1 for i, num in enumerate(nums) if num > 0]
    return result

# 测试用例：
# 输入: [4,3,2,7,8,2,3,1]
# 输出: [5,6]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
std::vector<int> findDisappearedNumbers(std::vector<int>& nums) {
    // 标记出现的数字
    for (int num : nums) {
        int index = abs(num) - 1;
        nums[index] = -abs(nums[index]);  // 将该位置数字置为负
    }
    
    // 收集未出现的数字
    std::vector<int> result;
    for (int i = 0; i < nums.size(); i++) {
        if (nums[i] > 0) {
            result.push_back(i + 1);  // 索引+1即为未出现的数字
        }
    }
    return result;

    // 测试用例：
    // 输入: [4,3,2,7,8,2,3,1]
    // 输出: [5,6]
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function findDisappearedNumbers(nums) {
    // 标记数组中出现的数字
    for (let i = 0; i < nums.length; i++) {
        let index = Math.abs(nums[i]) - 1;
        nums[index] = -Math.abs(nums[index]);  // 位置的数标记为负
    }

    // 收集未出现的数字
    let result = [];
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > 0) {
            result.push(i + 1);  // 索引加1为缺失的数
        }
    }
    return result;

    // 测试用例：
    // 输入: [4,3,2,7,8,2,3,1]
    // 输出: [5,6]
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<Integer> findDisappearedNumbers(int[] nums) {
        // 标记出现的数字
        for (int i = 0; i < nums.length; i++) {
            int index = Math.abs(nums[i]) - 1;
            nums[index] = -Math.abs(nums[index]);  // 将该位置数字标记为负
        }

        // 收集结果
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > 0) {
                result.add(i + 1);  // 索引+1即为未出现的数字
            }
        }
        return result;

        // 测试用例：
        // 输入: [4,3,2,7,8,2,3,1]
        // 输出: [5,6]
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，需要遍历数组两次。  
  
空间复杂度：$O(1)$，不使用额外的空间，使用输入数组本身来标记信息。
