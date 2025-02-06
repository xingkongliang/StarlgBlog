---
sidebar_position: 453
tags:
  - array
  - math
  - Medium
---

# 453.使数组元素相等的最小操作次数

标签: `array`, `math`

难度: Medium

通过率: 57.33%

原题链接: https://leetcode.com/problems/minimum-moves-to-equal-array-elements/description/

## 题目描述
给定一个大小为 $n$ 的整数数组 $nums$，返回使所有数组元素相等所需的最小操作次数。每次操作中，你可以将 $n - 1$ 个数组元素增加 1。

## 解题思路
由于每次操作可以将 $n-1$ 个元素同时增加，因此等价于每次将一个元素减少 1。为使所有元素相等，我们可以将数组元素逐步减少到最小值（称为 $min$）。即从每个元素减小到最小值所需的步数即为该元素和最小值的差，总的步数为所有这些差的总和：

$$ \text{moves} = \sum_{i=0}^{n-1} (a[i] - \min(a)) $$

这个公式直观上表示将数组每个元素变成当前最小元素所需的整体操作次数。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def minMoves(nums):
    # 找到数组中的最小值
    min_num = min(nums)
    # 计算总的步数，将每个元素减到最小值所需的步数累加
    moves = sum(num - min_num for num in nums)
    return moves
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int minMoves(vector<int>& nums) {
        // 找到数组中的最小值
        int min_num = *min_element(nums.begin(), nums.end());
        // 计算总的步数，将每个元素减到最小值所需的步数累加
        int moves = 0;
        for (int num : nums) {
            moves += num - min_num;
        }
        return moves;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function minMoves(nums) {
    // 找到数组中的最小值
    const minNum = Math.min(...nums);
    // 计算总的步数，将每个元素减到最小值所需的步数累加
    let moves = nums.reduce((sum, num) => sum + (num - minNum), 0);
    return moves;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int minMoves(int[] nums) {
        // 找到数组中的最小值
        int minNum = nums[0];
        for (int num : nums) {
            if (num < minNum) {
                minNum = num;
            }
        }
        // 计算总的步数，将每个元素减到最小值所需的步数累加
        int moves = 0;
        for (int num : nums) {
            moves += num - minNum;
        }
        return moves;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度: $O(n)$，其中 $n$ 是数组的长度，因为我们需要遍历数组来找到最小值并计算总步数。  
  
空间复杂度: $O(1)$，因为我们只使用了常数个额外的变量来存储最小值和操作次数。
