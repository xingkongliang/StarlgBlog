---
sidebar_position: 137
tags:
  - bit-manipulation
  - array
  - Medium
---

# 137.只出现一次的数字II

标签: `bit-manipulation`, `array`

难度: Medium

通过率: 64.24%

原题链接: https://leetcode.com/problems/single-number-ii/description/

## 题目描述
给定一个整数数组 `nums` ，其中每个元素出现三次，除了一个元素只出现一次。找出只出现一次的元素并返回它。`你必须实现一个具有线性运行时复杂度并且只使用常数额外空间的解决方案。`

## 解题思路
题目要求在线性时间复杂度内并使用常数空间找到只出现一次的数字，这意味着不能使用额外的数据结构如哈希表计数。解决此问题的关键是理解如何使用位运算来处理。

#### 解题思路
我们利用每个数的位级表示，用位运算来统计每个位上`1`的出现次数。考虑到每个数字除了一个出现 `1` 次，其他都出现 `3` 次，所以我们可以依次统计每个位上 `1` 的出现次数，然后对 `3` 取模，剩下的数会留下未出错的那个数字。

具体步骤：
1. 我们使用两个位掩码（`ones` 和 `twos`）来记录每个位的计数。
2. `ones` 在第 `i` 位上为 `1` 表示有一个数字在该位为 `1`，`twos` 在第 `i` 位上为 `1` 表示有两个数字的第 `i` 位为 `1`。
3. 当某一位有三个数字为 `1` 时，`ones` 和 `twos` 都在这一位重置为 `0`，这个通过第二次累积 `twos` 时发现已经不影响 `ones` 来控制。
4. 最终，仅出现一次的数字会通过这样的位累积以二进制形式保留在`ones`中。


## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def singleNumber(nums):
    # 记录每个位上出现1次和2次的数字
    ones, twos = 0, 0
    for num in nums:
        # 如果当前位上已经有1的，则记录到twos
        twos |= ones & num
        # 在ones中加入新的1
        ones ^= num
        # 当一个位上有3个1时，清除该位
        common_mask = ~(ones & twos)
        ones &= common_mask
        twos &= common_mask
    return ones

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int ones = 0, twos = 0, common_mask;
        for(int num : nums) {
            // 记录每个位上出现2次的数字
            twos |= ones & num;
            // 记录每个位上出现1次的数字
            ones ^= num;
            // 清除重复出现3次的数字位
            common_mask = ~(ones & twos);
            ones &= common_mask;
            twos &= common_mask;
        }
        return ones;
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const singleNumber = function(nums) {
    let ones = 0, twos = 0;
    for (const num of nums) {
        // 记录每个位上出现2次的数字
        twos |= ones & num;
        // 记录每个位上出现1次的数字
        ones ^= num;
        // 清除重复出现3次的数字位
        const common_mask = ~(ones & twos);
        ones &= common_mask;
        twos &= common_mask;
    }
    return ones;
};

```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int singleNumber(int[] nums) {
        int ones = 0, twos = 0, common_mask;
        for (int num : nums) {
            // 记录每个位上出现2次的数字
            twos |= ones & num;
            // 记录每个位上出现1次的数字
            ones ^= num;
            // 清除重复出现3次的数字位
            common_mask = ~(ones & twos);
            ones &= common_mask;
            twos &= common_mask;
        }
        return ones;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是数组的长度。我们只需要遍历一次数组。`
空间复杂度：$O(1)$，只使用了常数数量的额外空间。`
