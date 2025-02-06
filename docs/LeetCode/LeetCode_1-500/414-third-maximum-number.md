---
sidebar_position: 414
tags:
  - array
  - sort
  - Easy
---

# 414.第三大的数

标签: `array`, `sort`

难度: Easy

通过率: 36.2%

原题链接: https://leetcode.com/problems/third-maximum-number/description/

## 题目描述
给定一个整数数组 `nums` ，返回数组中第三大的非重复数。如果没有第三大的数，返回最大的数。

## 解题思路
要在数组中找到第三大的非重复数，需要先去重并降序排序：

1. **去重**：使用集合去重可以快速得到非重复元素，时间复杂度为 $O(n)$。
2. **排序**：对去重后的结果排序，可以采用内置的排序算法，时间复杂度为 $O(k \log k)$，其中 $k$ 是去重后的元素数量。
3. **查找第三大数**：检查如果去重后的数组中元素少于 3 个，返回最大的数，否则返回第三大数。可以直接通过索引来获取。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def thirdMax(nums):
    # 使用集合去重
    nums = list(set(nums))
    # 对去重的数组进行降序排序
    nums.sort(reverse=True)
    # 如果元素数量少于3，返回最大值，否则返回第三大值
    return nums[0] if len(nums) < 3 else nums[2]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int thirdMax(vector<int>& nums) {
        // 使用集合去重
        set<int> numSet(nums.begin(), nums.end());
        // 转换回向量并降序排序
        vector<int> uniqueNums(numSet.begin(), numSet.end());
        sort(uniqueNums.begin(), uniqueNums.end(), greater<int>());
        // 如果元素数量少于3，返回最大值，否则返回第三大值
        return uniqueNums.size() < 3 ? uniqueNums[0] : uniqueNums[2];
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function thirdMax(nums) {
    // 使用集合去重
    let numsSet = new Set(nums);
    // 将集合转换回数组并降序排序
    let uniqueNums = Array.from(numsSet).sort((a, b) => b - a);
    // 如果元素数量少于3，返回最大值，否则返回第三大值
    return uniqueNums.length < 3 ? uniqueNums[0] : uniqueNums[2];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

public class Solution {
    public int thirdMax(int[] nums) {
        // 使用集合去重
        Set<Integer> numSet = new HashSet<>();
        for (int num : nums) {
            numSet.add(num);
        }
        // 转换为数组并升序排序
        List<Integer> uniqueNums = new ArrayList<>(numSet);
        uniqueNums.sort(Collections.reverseOrder());
        // 如果元素数量少于3，返回最大值，否则返回第三大值
        return uniqueNums.size() < 3 ? uniqueNums.get(0) : uniqueNums.get(2);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(n \log n)$，排序复杂度为 $O(n \log n)$，其中 $n$ 是输入数组的长度。
  
  
- 空间复杂度：$O(k)$，其中 $k$ 是去重后的数组长度，需要额外空间存储去重后的数组。
