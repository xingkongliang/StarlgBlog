---
sidebar_position: 442
tags:
  - array
  - hash-table
  - Medium
---

# 442.寻找数组中的重复数

标签: `array`, `hash-table`

难度: Medium

通过率: 76.12%

原题链接: https://leetcode.com/problems/find-all-duplicates-in-an-array/description/

## 题目描述
给定一个长度为 $n$ 的整数数组 $\text{nums}$，其中所有整数在 $[1, n]$ 范围内，并且每个整数最多出现两次。请返回一个数组，包含所有出现两次的整数。

## 解题思路
可以利用数组元素的范围特性进行原地标记，以在 $O(n)$ 时间内找到所有重复元素并且只使用常数的辅助空间。

思路如下：

1. 遍历数组 $\text{nums}$ 中的每个元素，对每个元素以其值为索引来访问其对应位置的元素（需考虑索引从 $0$ 开始，因此应在定位时减去 $1$）。

2. 对于每个访问的元素，如果它的值是负数，说明我们之前已经访问过这个位置，表示该值重复出现。

3. 如果某个元素的值是正的，我们将该索引位置的元素变为其负数，以标记这个元素已经被访问过。

4. 最终，所有访问过两次的元素都会在处理它们原本位置时，使得原位置的元素为负数。我们维护一个列表来存储那些在第二次访问时即已经为负数的索引所对应的数。

注意，这种标记的方式不会影响原有数据的实际值，并且借用了原有数组的空间来进行标记操作，从而保证了常数的额外空间复杂度。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def findDuplicates(nums):
    # 初始化空结果数组
    res = []
    
    # 遍历nums
    for i in range(len(nums)):
        # 对每个元素取值
        num = abs(nums[i])
        
        # 如果该位置已经被标记为负数，说明之前已经访问过
        if nums[num - 1] < 0:
            res.append(num)
        # 否则，进行标记为负数
        else:
            nums[num - 1] *= -1

    return res
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
std::vector<int> findDuplicates(std::vector<int>& nums) {
    // 初始化结果数组
    std::vector<int> res;
    
    // 遍历nums数组
    for (int i = 0; i < nums.size(); ++i) {
        // 获取绝对值
        int num = abs(nums[i]);

        // 如果该位置已经标记为负数，添加到结果数组
        if (nums[num - 1] < 0) {
            res.push_back(num);
        } else {
            // 否则标记为负数
            nums[num - 1] *= -1;
        }
    }

    return res;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function findDuplicates(nums) {
    // 初始化结果数组
    const res = [];
    
    // 遍历nums
    for (let i = 0; i < nums.length; i++) {
        // 获取绝对值
        const num = Math.abs(nums[i]);

        // 如果已经被标记为负数
        if (nums[num - 1] < 0) {
            res.push(num);
        } else {
            // 标记为负数
            nums[num - 1] *= -1;
        }
    }

    return res;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<Integer> findDuplicates(int[] nums) {
        // 初始化结果列表
        List<Integer> res = new ArrayList<>();

        // 遍历数组
        for (int i = 0; i < nums.length; i++) {
            int num = Math.abs(nums[i]);

            // 如果出现过，添加到结果中
            if (nums[num - 1] < 0) {
                res.add(num);
            } else {
                // 否则标记为负数
                nums[num - 1] *= -1;
            }
        }

        return res;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中$n$是数组 $\text{nums}$ 的长度。我们只需要遍历数组一遍。  
  
空间复杂度：$O(1)$，我们使用常数的附加空间（不包括存储结果的数组）。
