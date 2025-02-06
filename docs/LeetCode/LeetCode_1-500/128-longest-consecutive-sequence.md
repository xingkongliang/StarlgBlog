---
sidebar_position: 128
tags:
  - array
  - hash-table
  - union-find
  - Medium
---

# 128.最长连续序列

标签: `array`, `hash-table`, `union-find`

难度: Medium

通过率: 47.68%

原题链接: https://leetcode.com/problems/longest-consecutive-sequence/description/

## 题目描述
给定一个未排序的整数数组 `nums`，找出数字连续出现的最长序列的长度。要求算法的时间复杂度为 $O(n)$。

## 解题思路
为了在 $O(n)$ 时间复杂度内解决这个问题，可以使用哈希表来实现。具体步骤如下：

1. 首先将数组中的所有元素存入哈希表中。这可以在$O(n)$的时间内完成。哈希表的作用是快速查找元素是否存在。

2. 然后遍历数组中的每个数字，尝试找到以该数字为起点的连续序列。

3. 对于每个数字 `num`，首先检查是否存在 `num - 1`。如果存在，说明 `num` 被包含在了之前的序列处理中，不需要再次处理。

4. 如果`num - 1` 不存在，说明 `num` 是一个新序列的可能起点。此时，开始计数从 `num` 开始的最长连续序列长度，使用一个计数器 `length`，依次检查 `num + 1, num + 2, ...` 是否在哈希表中存在并将其长度记录到 `length` 中。

5. 在遍历完整个数组后，维护一个变量 `maxLen` 来存储发现的最大序列长度。

这种方法的核心思路就是只从可能的新序列起点来开始计数，而不是重复检查已经处理过的序列内数字，这样能确保复杂度是线性的。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def longestConsecutive(nums):
    # 利用 set 数据结构去重并支持 O(1) 时间复杂度的查找
    num_set = set(nums)
    max_length = 0

    for num in num_set:
        # 如果 num - 1 不在 set 中，则 num 是序列的起点
        if num - 1 not in num_set:
            current_num = num
            current_length = 1

            # 尝试找下一个连续的数
            while current_num + 1 in num_set:
                current_num += 1
                current_length += 1

            # 更新最大长度
            max_length = max(max_length, current_length)

    return max_length

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int longestConsecutive(vector<int>& nums) {
    unordered_set<int> num_set(nums.begin(), nums.end());
    int maxLength = 0;

    for (int num : num_set) {
        // 如果 num-1 不在集合中，说明是一个新的序列的起点
        if (!num_set.count(num - 1)) {
            int currentNum = num;
            int currentLength = 1;

            // 检查下一个连续的数
            while (num_set.count(currentNum + 1)) {
                currentNum++;
                currentLength++;
            }

            // 更新最长序列长度
            maxLength = max(maxLength, currentLength);
        }
    }

    return maxLength;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function longestConsecutive(nums) {
    const numSet = new Set(nums);
    let maxLength = 0;

    for (let num of numSet) {
        // 如果 num - 1 不在集合中，说明 num 是新的序列起点
        if (!numSet.has(num - 1)) {
            let currentNum = num;
            let currentLength = 1;

            // 寻找连续的下一个数
            while (numSet.has(currentNum + 1)) {
                currentNum += 1;
                currentLength += 1;
            }

            // 更新最大序列长度
            maxLength = Math.max(maxLength, currentLength);
        }
    }

    return maxLength;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.HashSet;
import java.util.Set;

class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> numSet = new HashSet<>();
        for (int num : nums) {
            numSet.add(num);
        }

        int maxLength = 0;

        for (int num : numSet) {
            // 检查是否是新序列的起点
            if (!numSet.contains(num - 1)) {
                int currentNum = num;
                int currentLength = 1;

                // 查找下一个连续的数
                while (numSet.contains(currentNum + 1)) {
                    currentNum += 1;
                    currentLength += 1;
                }

                // 更新最长序列长度
                maxLength = Math.max(maxLength, currentLength);
            }
        }

        return maxLength;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，因为每个数字均被访问常数次。
空间复杂度：$O(n)$，用于存储哈希表。
