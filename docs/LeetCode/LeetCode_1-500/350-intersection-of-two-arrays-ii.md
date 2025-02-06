---
sidebar_position: 350
tags:
  - array
  - hash-table
  - two-pointers
  - sort
  - Easy
---

# 350.两个数组的交集 II

标签: `array`, `hash-table`, `two-pointers`, `sort`

难度: Easy

通过率: 58.79%

原题链接: https://leetcode.com/problems/intersection-of-two-arrays-ii/description/

## 题目描述
给定两个整数数组 nums1 和 nums2，返回一个数组，代表它们的交集。输出结果中每个元素出现的次数必须与它在两个数组中出现的次数一致。输出结果可以是任意顺序。

## 解题思路
要解此问题，我们可以采用哈希表来记录每个数组中数字出现的次数，然后找出交集。具体步骤如下：

1. 创建一个字典 `counts` 来记录 `nums1` 中每个数字的出现次数。
2. 遍历 `nums1`，对每个数字进行计数。
3. 初始化一个空列表 `intersection` 来存储交集结果。
4. 遍历 `nums2`，对于每个数字，检查它是否在 `counts` 中存在且计数大于0。如果是，则将该数字加入到 `intersection` 中，并将其计数减少1。
5. 返回 `intersection` 作为结果。

这种方法确保每个数字在结果中出现的次数正好是它在两个数组中都出现的次数。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def intersect(nums1, nums2):
    # 创建字典来记录 nums1 中每个数字的出现次数
    counts = {}
    for num in nums1:
        if num in counts:
            counts[num] += 1
        else:
            counts[num] = 1

    # 初始化结果数组
    intersection = []
    for num in nums2:
        # 若当前数字在 counts 中记录且计数大于0
        if num in counts and counts[num] > 0:
            intersection.append(num)  # 将其加入结果数组
            counts[num] -= 1  # 减少计数

    return intersection

# 示例用例
print(intersect([1, 2, 2, 1], [2, 2]))  # 输出: [2, 2]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
std::vector<int> intersect(std::vector<int>& nums1, std::vector<int>& nums2) {
    std::unordered_map<int, int> counts;
    for (int num : nums1) {
        counts[num]++;  // 记录 nums1 中每个数字的频率
    }
    std::vector<int> intersection;
    for (int num : nums2) {
        if (counts[num] > 0) {  // 检查 nums2 的数字是否存在于 counts 中
            intersection.push_back(num);  // 将其加入交集结果
            counts[num]--;  // 减少计数
        }
    }
    return intersection;
}

// 示例用例
// std::vector<int> result = intersect(std::vector<int>{1, 2, 2, 1}, std::vector<int>{2, 2});
// 输出: [2, 2]
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function intersect(nums1, nums2) {
    const counts = {};
    for (const num of nums1) {
        counts[num] = (counts[num] || 0) + 1;  // 统计每个数字在 nums1 中的出现次数
    }
    const intersection = [];
    for (const num of nums2) {
        if (counts[num] > 0) {  // 检查当前数字在 counts 中的计数
            intersection.push(num);  // 加入结果数组
            counts[num]--;  // 减少计数
        }
    }
    return intersection;
}

// 示例用例
// console.log(intersect([1, 2, 2, 1], [2, 2]));  // 输出: [2, 2]
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

public class Solution {
    public int[] intersect(int[] nums1, int[] nums2) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int num : nums1) {
            counts.put(num, counts.getOrDefault(num, 0) + 1);  // 统计 nums1 中每个数字的出现次数
        }
        List<Integer> intersection = new ArrayList<>();
        for (int num : nums2) {
            if (counts.getOrDefault(num, 0) > 0) {  // 检查当前数字的计数值
                intersection.add(num);  // 加入到结果数组
                counts.put(num, counts.get(num) - 1);  // 减少计数
            }
        }
        // 将 List 转换为 int 数组并返回
        return intersection.stream().mapToInt(i -> i).toArray();
    }

    // 示例用例
    // Solution sol = new Solution();
    // int[] result = sol.intersect(new int[]{1, 2, 2, 1}, new int[]{2, 2});  // 输出: [2, 2]
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(m+n)$，其中 $m$ 和 $n$ 分别是数组 $nums1$ 和 $nums2$ 的长度。我们在遍历两数组的同时操作哈希表。  
  
空间复杂度为 $O(min(m, n))$，我们为较小的数组开辟哈希表存储频次，从而求交集结果。
