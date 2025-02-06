---
sidebar_position: 307
tags:
  - segment-tree
  - binary-indexed-tree
  - array
  - Medium
---

# 307.区域和检索 - 可变

标签: `segment-tree`, `binary-indexed-tree`, `array`

难度: Medium

通过率: 41.42%

原题链接: https://leetcode.com/problems/range-sum-query-mutable/description/

## 题目描述
给定一个整数数组 `nums` ，处理下面类型的多个查询：

- 更新 `nums` 中某个元素的值。
- 计算 `nums` 中索引 `left` 和 `right` 之间（包含两者）的元素和，其中 `left <= right`。

## 解题思路
为了在进行更新和求和操作时都保持较好的性能，我们可以使用 **树状数组 (Binary Indexed Tree)** 或 **线段树 (Segment Tree)** 来解决这个问题。

**树状数组**是一种高效的数据结构，支持 O(log n) 时间复杂度的前缀和查询和更新。这使得 `update` 和 `sumRange` 操作都能在对数时间内完成。

### 树状数组的实现步骤：
1. 使用树状数组（大小为 `n+1`，其中 `n` 是 `nums` 的长度）来存储更新和前缀和信息。
2. 在初始化时，构建树状数组，通过遍历 `nums` 调用 `update` 来更新每个元素至树状数组。
3. 每次 `update` 操作时，更新树状数组中相应位置的值。
4. 每次 `sumRange` 查询时，通过计算两个前缀和之差得到区间和。

这种方法可以有效处理高频的更新和求和操作，非常适合本题这种动态变化的情况。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class NumArray:
    def __init__(self, nums):
        # 初始化时保存原始数组，并创建树状数组
        self.nums = nums
        self.n = len(nums)
        self.BIT = [0] * (self.n + 1)

        # 构造树状数组
        for i in range(self.n):
            self._update_BIT(i, nums[i])

    def _update_BIT(self, index, delta):
        # 更新树状数组
        i = index + 1  # 树状数组是1-indexed的
        while i <= self.n:
            self.BIT[i] += delta
            i += i & (-i)

    def update(self, index: int, val: int) -> None:
        # 更新数组并更新树状数组
        delta = val - self.nums[index]
        self.nums[index] = val
        self._update_BIT(index, delta)

    def _sum(self, i):
        # 计算前缀和
        s = 0
        while i > 0:
            s += self.BIT[i]
            i -= i & (-i)
        return s

    def sumRange(self, left: int, right: int) -> int:
        # 返回区间和
        return self._sum(right + 1) - self._sum(left)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class NumArray {
    vector<int> BIT, nums;
    int n;
public:
    NumArray(vector<int>& nums) : nums(nums) {
        n = nums.size();
        BIT.resize(n + 1, 0);
        for (int i = 0; i < n; i++) {
            initUpdate(i, nums[i]);
        }
    }
    
    void initUpdate(int i, int delta) {
        i++;
        while (i <= n) {
            BIT[i] += delta;
            i += i & -i;
        }
    }

    void update(int index, int val) {
        int delta = val - nums[index];
        nums[index] = val;
        initUpdate(index, delta);
    }

    int sum(int i) {
        int s = 0;
        while (i > 0) {
            s += BIT[i];
            i -= i & -i;
        }
        return s;
    }

    int sumRange(int left, int right) {
        return sum(right + 1) - sum(left);
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class NumArray {
    constructor(nums) {
        this.n = nums.length;
        this.nums = nums;
        this.BIT = new Array(this.n + 1).fill(0);
        for (let i = 0; i < this.n; i++) {
            this.updateBIT(i, nums[i]);
        }
    }

    updateBIT(index, delta) {
        let i = index + 1;
        while (i <= this.n) {  
            this.BIT[i] += delta;
            i += i & (-i);
        }
    }

    update(index, val) {
        const delta = val - this.nums[index];
        this.nums[index] = val;
        this.updateBIT(index, delta);
    }

    prefixSum(i) {
        let sum = 0;
        while (i > 0) {
            sum += this.BIT[i];
            i -= i & (-i);
        }
        return sum;
    }

    sumRange(left, right) {
        return this.prefixSum(right + 1) - this.prefixSum(left);
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class NumArray {
    private int[] BIT;
    private int[] nums;
    private int n;

    public NumArray(int[] nums) {
        this.n = nums.length;
        this.nums = nums;
        this.BIT = new int[n + 1];
        for (int i = 0; i < n; i++) {
            addBIT(i, nums[i]);
        }
    }

    private void addBIT(int index, int delta) {
        int i = index + 1;
        while (i <= n) {
            BIT[i] += delta;
            i += i & (-i);
        }
    }

    public void update(int index, int val) {
        int delta = val - nums[index];
        nums[index] = val;
        addBIT(index, delta);
    }

    private int prefixSum(int i) {
        int sum = 0;
        while (i > 0) {
            sum += BIT[i];
            i -= i & (-i);
        }
        return sum;
    }

    public int sumRange(int left, int right) {
        return prefixSum(right + 1) - prefixSum(left);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度**：

每次更新和求和操作的时间复杂度均为 $O(\log n)$，其中 $n$ 是数组的长度，因为树状数组支持对数时间的更新和查询。


**空间复杂度**：

空间复杂度为 $O(n)$，因为需要额外的存储空间来维护大小为 $n+1$ 的树状数组。
