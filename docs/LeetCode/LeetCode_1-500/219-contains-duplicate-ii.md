---
sidebar_position: 219
tags:
  - array
  - hash-table
  - Easy
---

# 219.是否存在重复的元素 II

标签: `array`, `hash-table`

难度: Easy

通过率: 47.36%

原题链接: https://leetcode.com/problems/contains-duplicate-ii/description/

## 题目描述
给定一个整数数组 `nums` 和一个整数 `k`，如果数组中存在两个不同的索引 `i` 和 `j` ，使得 `nums[i] == nums[j]` 且 `|i - j| <= k` ，则返回 `true`，否则返回 `false`。

## 解题思路
要判断数组中是否存在两个元素相同且索引差不超过 `k` ，我们可以使用一个哈希表来记录每个元素最后一次出现的索引。这种方法将使我们在遍历数组时能快速找到每个元素的先前出现索引，并判断它们的差值是否符合条件。

具体步骤如下：
1. 初始化一个空的哈希表 `index_map`。
2. 遍历数组 `nums`。
   - 对于每个元素 `nums[i]`：
     - 如果该元素已经在 `index_map` 中存在，并且满足索引差小于等于 `k`，则返回 `true`。
     - 否则，更新 `index_map`，记录该元素最后一次出现的索引。
3. 如果遍历结束仍未找到这样的元素，返回 `false`。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def containsNearbyDuplicate(nums, k):
    # 创建一个字典来保存每个元素最后出现的索引
    index_map = {}
    # 遍历数组中的每个元素和其索引
    for i, num in enumerate(nums):
        # 检查元素是否存在于字典中，并且检查索引差是否小于等于k
        if num in index_map and i - index_map[num] <= k:
            return True
        # 更新元素的最后出现索引
        index_map[num] = i
    # 如果没有符合条件的元素，返回False
    return False
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    bool containsNearbyDuplicate(vector<int>& nums, int k) {
        unordered_map<int, int> index_map; // 用于存储元素及其最后出现的索引
        for (int i = 0; i < nums.size(); ++i) {
            if (index_map.count(nums[i]) && i - index_map[nums[i]] <= k) {
                return true; // 找到符合条件的元素
            }
            index_map[nums[i]] = i; // 更新元素的最后出现索引
        }
        return false; // 未找到符合条件的元素
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function containsNearbyDuplicate(nums, k) {
    const indexMap = new Map(); // 用于存储元素及其最后出现的索引
    for (let i = 0; i < nums.length; i++) {
        if (indexMap.has(nums[i]) && i - indexMap.get(nums[i]) <= k) {
            return true; // 找到符合条件的元素
        }
        indexMap.set(nums[i], i); // 更新元素的最后出现索引
    }
    return false; // 未找到符合条件的元素
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public boolean containsNearbyDuplicate(int[] nums, int k) {
        Map<Integer, Integer> indexMap = new HashMap<>(); // 用于存储元素及其最后出现的索引
        for (int i = 0; i < nums.length; i++) {
            if (indexMap.containsKey(nums[i]) && i - indexMap.get(nums[i]) <= k) {
                return true; // 找到符合条件的元素
            }
            indexMap.put(nums[i], i); // 更新元素的最后出现索引
        }
        return false; // 未找到符合条件的元素
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是数组的长度。因为我们只需遍历数组一次，并且对每个元素的哈希表操作（插入和查找）在平均情况下都是 $O(1)$。  
  
空间复杂度：$O(n)$，用于存储哈希表，其中存储的元素数量与数组的长度成线性关系。
