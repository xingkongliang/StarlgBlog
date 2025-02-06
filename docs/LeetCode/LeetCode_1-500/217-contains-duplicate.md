---
sidebar_position: 217
tags:
  - array
  - hash-table
  - Easy
---

# 217.存在重复元素

标签: `array`, `hash-table`

难度: Easy

通过率: 62.52%

原题链接: https://leetcode.com/problems/contains-duplicate/description/

## 题目描述
给定一个整数数组 nums，如果数组中任何一个值在数组中出现至少两次，返回 true。如果数组中每个元素都不同，则返回 false。

## 解题思路
要解决这个问题，我们可以利用集合（set）的特性：集合中的元素是唯一的。具体来说，我们可以遍历数组，并将元素添加到集合中。在添加之前，请检查该元素是否已经存在于集合中。如果它已经存在，则说明存在重复元素，返回 true。否则，继续添加。如果遍历完所有元素都没有发现重复元素，则返回 false。使用集合的好处是查找元素的时间复杂度为常数级别。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def containsDuplicate(nums):
    # 创建一个空的集合来存储元素
    seen = set()
    # 遍历数组中的每个元素
    for num in nums:
        if num in seen:  # 检查当前元素之前是否已经出现过
            return True # 如果已出现，返回 True（有重复）
        seen.add(num)  # 如果没有出现，则将其加入集合
    return False # 遍历结束后没有发现重复，返回 False
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen; // 创建一个无序集合来存储元素
        for (int num : nums) {
            if (seen.count(num)) { // 检查当前元素是否已经在集合中
                return true; // 如果已存在，返回 true
            }
            seen.insert(num); // 否则将元素加入集合
        }
        return false; // 遍历完成后没有重复元素，返回 false
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function containsDuplicate(nums) {
    // 创建一个集合来存储已访问的元素
    const seen = new Set();
    for (let num of nums) {
        if (seen.has(num)) { // 检查集合中是否已经有该元素
            return true; // 如果有，返回 true 表示有重复元素
        }
        seen.add(num); // 如果没有，则加入集合中
    }
    return false; // 如果遍历完没有发现重复，返回 false
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>(); // 使用HashSet来存储元素
        for (int num : nums) {
            if (seen.contains(num)) { // 检查元素是否已经存在于集合中
                return true; // 如果存在，返回 true 表示有重复
            }
            seen.add(num); // 否则将元素添加到集合
        }
        return false; // 遍历完成，没有重复元素，返回 false
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 是数组的长度，因为在最坏情况下，我们需要检查每一个元素并插入到集合中。每次插入集合和查找集合中的元素的操作都是 $O(1)$ 的时间复杂度。  
  
空间复杂度为 $O(n)$，需要一个集合来储存数组中的元素以便查找重复项。
