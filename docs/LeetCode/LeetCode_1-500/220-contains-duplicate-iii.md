---
sidebar_position: 220
tags:
  - array
  - binary-search
  - sort
  - two-pointers
  - Hard
---

# 220.存在重复值 III

标签: `array`, `binary-search`, `sort`, `two-pointers`

难度: Hard

通过率: 23.2%

原题链接: https://leetcode.com/problems/contains-duplicate-iii/description/

## 题目描述
给定一个整数数组 $\text{nums}$ 和两个整数 $\text{indexDiff}$ 和 $\text{valueDiff}$。找到下标对 $(i, j)$ 满足：
- $i \neq j$  
- $|i - j| \leq \text{indexDiff}$  
- $|\text{nums}[i] - \text{nums}[j]| \leq \text{valueDiff}$  
如果存在这样的对，则返回 true，否则返回 false。

## 解题思路
我们可以考虑使用“滑动窗口 + 二分查找”的方法来解决这个问题。具体步骤如下：

1. 我们需要维护一个长度不超过 $\text{indexDiff} + 1$ 的滑动窗口。窗口中维护的是 $\text{nums}$ 的一个子集，元素间的索引差不超过 $\text{indexDiff}$。
2. 对于每一个即将插入滑动窗口的元素 $\text{nums}[i]$，我们利用一个有序的数据结构（如 `SortedList` 或 `TreeSet`）来动态维护窗口内的元素。
3. 在每次插入元素 $\text{nums}[i]$ 之前，查询窗口内是否存在一个元素 $x$ 满足 $\text{num}[i] - \text{valueDiff} \leq x \leq \text{num}[i] + \text{valueDiff}$。这是为了确保偏移不超出 $\text{valueDiff}$。
4. 找到这样的元素后，直接返回 true。
5. 若没有找到，插入 $\text{nums}[i]$ 到滑动窗口，并保证窗口大小不超过 $\text{indexDiff} + 1$。

通过上述步骤，我们能够在 $O(n \log \text{indexDiff})$ 的时间内解决问题，其中 $n$ 是数组长度。这是因为我们在滑动窗口中每插入一个新元素进行查找和插入的操作复杂度均为 $O(\log \text{indexDiff})$。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
from sortedcontainers import SortedList

# 使用滑动窗口和有序数据结构
# 这是 `SortedList` 的应用
class Solution:
    def containsNearbyAlmostDuplicate(self, nums: List[int], indexDiff: int, valueDiff: int) -> bool:
        if indexDiff < 0 or valueDiff < 0 or len(nums) < 2:
            return False

        window = SortedList()

        for i in range(len(nums)):
            # 检查当前窗口中是否有满足条件的数字
            if i > indexDiff:
                window.remove(nums[i - indexDiff - 1])
            # 进行二分搜索，检查可能的范围
            pos1 = SortedList.bisect_left(window, nums[i] - valueDiff)
            pos2 = SortedList.bisect_right(window, nums[i] + valueDiff)

            if pos1 != pos2:  # 存在满足条件的数
                return True

            window.add(nums[i])

        return False
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    bool containsNearbyAlmostDuplicate(vector<int>& nums, int indexDiff, int valueDiff) {
        if (indexDiff <= 0 || valueDiff < 0 || nums.size() < 2)
            return false;

        set<long> window;

        for (int i = 0; i < nums.size(); ++i) {
            if (i > indexDiff)
                window.erase(nums[i - indexDiff - 1]);

            auto pos = window.lower_bound((long)nums[i] - valueDiff);
            if (pos != window.end() && *pos <= (long)nums[i] + valueDiff)
                return true;

            window.insert(nums[i]);
        }

        return false;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
/**
 * @param {number[]} nums
 * @param {number} indexDiff
 * @param {number} valueDiff
 * @return {boolean}
 */
var containsNearbyAlmostDuplicate = function(nums, indexDiff, valueDiff) {
    if (indexDiff <= 0 || valueDiff < 0 || nums.length < 2) return false;

    const window = new SortedArray(); // 使用自定义的有序结构

    for (let i = 0; i < nums.length; i++) {
        if (i > indexDiff) window.remove(nums[i - indexDiff - 1]);

        let pos = window.lowerBound(nums[i] - valueDiff);
        if (pos < window.size() && window.get(pos) <= nums[i] + valueDiff) {
            return true;
        }

        window.insert(nums[i]);
    }

    return false;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.TreeSet;

class Solution {
    public boolean containsNearbyAlmostDuplicate(int[] nums, int indexDiff, int valueDiff) {
        if (indexDiff <= 0 || valueDiff < 0 || nums.length < 2) return false;

        TreeSet<Long> window = new TreeSet<>();

        for (int i = 0; i < nums.length; i++) {
            if (i > indexDiff) {
                window.remove((long) nums[i - indexDiff - 1]);
            }

            Long floor = window.floor((long) nums[i] + valueDiff);
            Long ceil = window.ceiling((long) nums[i] - valueDiff);

            if ((floor != null && floor >= nums[i]) ||
                (ceil != null && ceil <= nums[i])) {
                return true;
            }

            window.add((long) nums[i]);
        }

        return false;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n \log \text{indexDiff})$，其中 $n$ 是数组的长度。我们在滑动窗口中每插入一个新元素进行查找和插入的操作复杂度均为 $O(\log \text{indexDiff})$。  
  
空间复杂度：$O(\text{indexDiff})$，滑动窗口内最多有 $\text{indexDiff} + 1$ 个元素。
