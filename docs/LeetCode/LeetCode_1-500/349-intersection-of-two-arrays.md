---
sidebar_position: 349
tags:
  - array
  - hash-table
  - two-pointers
  - Easy
---

# 349.两个数组的交集

标签: `array`, `hash-table`, `two-pointers`

难度: Easy

通过率: 75.66%

原题链接: https://leetcode.com/problems/intersection-of-two-arrays/description/

## 题目描述
给定两个整数数组 `nums1` 和 `nums2` ，返回它们的交集。结果中的每个元素都必须是唯一的，并且可以以任意顺序返回。

## 解题思路
我们可以采用使用哈希集合（HashSet）的思路来解决此问题。步骤如下：

1. 将第一个数组 `nums1` 转换为集合 `set1`，这样可以去掉重复的元素。
2. 初始化一个空的集合 `intersection` 用于存储两个数组的交集。
3. 遍历第二个数组 `nums2`，检查每个元素是否存在于 `set1` 中。
   - 如果存在，则将此元素加入到 `intersection` 中。
   - 由于 `intersection` 是集合，在添加元素时会自动去重。
4. 最后将 `intersection` 转换为列表并返回即可。

这种方法利用了集合的快速查找特性，使得比较两个数组的过程更加高效。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def intersection(nums1, nums2):
    # 将nums1转化为集合去重
    set1 = set(nums1)
    # 用于存储结果的集合
    intersection = set()
    # 遍历nums2，找出交集
    for num in nums2:
        if num in set1:
            intersection.add(num)
    # 返回结果的列表
    return list(intersection)

# 示例使用
print(intersection([1, 2, 2, 1], [2, 2]))  # 输出: [2]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
std::vector<int> intersection(std::vector<int>& nums1, std::vector<int>& nums2) {
    // 使用集合去重和判断
    std::unordered_set<int> set1(nums1.begin(), nums1.end());
    std::unordered_set<int> result;
    // 遍历nums2，找出交集
    for (int num : nums2) {
        if (set1.count(num)) {
            result.insert(num);
        }
    }
    // 将结果转化为向量返回
    return std::vector<int>(result.begin(), result.end());
}

// 示例使用
// std::vector<int> result = intersection({1, 2, 2, 1}, {2, 2}); // 输出: {2}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function intersection(nums1, nums2) {
    // 将nums1转化为集合去重
    let set1 = new Set(nums1);
    // 用于存储结果的集合
    let intersection = new Set();
    for (let num of nums2) {
        if (set1.has(num)) {
            intersection.add(num);
        }
    }
    // 将集合转化为数组返回
    return Array.from(intersection);
}

// 示例使用
console.log(intersection([1, 2, 2, 1], [2, 2])); // 输出: [2]
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.HashSet;
import java.util.Set;

class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        // 将nums1转化为集合去重
        Set<Integer> set1 = new HashSet<>();
        for (int num : nums1) {
            set1.add(num);
        }
        // 用于存储结果的集合
        Set<Integer> resultSet = new HashSet<>();
        // 遍历nums2，找出交集
        for (int num : nums2) {
            if (set1.contains(num)) {
                resultSet.add(num);
            }
        }
        // 将结果集合转换为数组返回
        int[] result = new int[resultSet.size()];
        int i = 0;
        for (int num : resultSet) {
            result[i++] = num;
        }
        return result;
    }
}

// 示例使用
// Solution sol = new Solution();
// int[] result = sol.intersection(new int[]{1, 2, 2, 1}, new int[]{2, 2}); // 输出: {2}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：

$O(m + n)$，其中 $m$ 是 nums1 的长度，$n$ 是 nums2 的长度。因为我们需要遍历两个数组各一次。

空间复杂度：

$O(	ext{min}(m, n))$，用于存储结果集和其中一个数组的集合。
