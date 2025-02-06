---
sidebar_position: 303
tags:
  - array
  - design
  - Easy
---

# 303. 区间和检索 - 数组不可变

标签: `array`, `design`

难度: Easy

通过率: 66.22%

原题链接: https://leetcode.com/problems/range-sum-query-immutable/description/

## 题目描述
给定一个整数数组 `nums`，处理多次查询。每次查询请求计算从索引 `left` 到 `right`（包含 `left` 和 `right`）之间的 `nums` 元素的和，其中 `left <= right`。

## 解题思路
为了高效地回答多次区间和查询，可以使用前缀和技术。我们先计算一个前缀和数组 `prefix_sum`，其中 `prefix_sum[i]` 表示数组 `nums` 从起始到第 `i` 个元素的和。然后对于任何一个给定的查询 `(left, right)`，我们可以通过公式：

$$ \text{sumRange}(left, right) = \text{prefix\_sum}[right+1] - \text{prefix\_sum}[left] $$

这个方法的构建（前缀和数组）的时间复杂度是 $O(n)$，而每个查询的时间复杂度是 $O(1)$。具体步骤如下：

1. 初始化一个前缀和数组 `prefix_sum`，长度为 `n + 1`，其中 `n` 为 `nums` 的长度。`prefix_sum[0]` 初始化为 `0`。
2. 遍历 `nums`，计算前缀和。
3. 对于任意查询 `(left, right)`，通过前缀和数组来计算结果。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class NumArray:
    def __init__(self, nums: list):
        # 初始化前缀和数组
        self.prefix_sum = [0] * (len(nums) + 1)
        for i in range(len(nums)):
            # 计算前缀和数组
            self.prefix_sum[i + 1] = self.prefix_sum[i] + nums[i]

    def sumRange(self, left: int, right: int) -> int:
        # 返回任何一个区间的和
        return self.prefix_sum[right + 1] - self.prefix_sum[left]

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class NumArray {
private:
    vector<int> prefix_sum;
public:
    NumArray(vector<int>& nums) {
        // 初始化前缀和数组
        prefix_sum.resize(nums.size() + 1);
        prefix_sum[0] = 0;
        for (int i = 0; i < nums.size(); ++i) {
            // 计算前缀和数组
            prefix_sum[i + 1] = prefix_sum[i] + nums[i];
        }
    }
    
    int sumRange(int left, int right) {
        // 返回任何一个区间的和
        return prefix_sum[right + 1] - prefix_sum[left];
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class NumArray {
    constructor(nums) {
        // 初始化前缀和数组
        this.prefix_sum = new Array(nums.length + 1).fill(0);
        for (let i = 0; i < nums.length; i++) {
            // 计算前缀和数组
            this.prefix_sum[i + 1] = this.prefix_sum[i] + nums[i];
        }
    }

    sumRange(left, right) {
        // 返回任何一个区间的和
        return this.prefix_sum[right + 1] - this.prefix_sum[left];
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class NumArray {
    private int[] prefixSum;

    public NumArray(int[] nums) {
        // 初始化前缀和数组
        prefixSum = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++) {
            // 计算前缀和数组
            prefixSum[i + 1] = prefixSum[i] + nums[i];
        }
    }

    public int sumRange(int left, int right) {
        // 返回任何一个区间的和
        return prefixSum[right + 1] - prefixSum[left];
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
计算前缀和数组的时间复杂度为 $O(n)$。  
  
每个查询的时间复杂度为 $O(1)$。  
  
空间复杂度为 $O(n)$，需要额外的空间存储前缀和数组。
