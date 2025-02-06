---
sidebar_position: 398
tags:
  - reservoir-sampling
  - hash-table
  - design
  - Medium
---

# 398.随机选择索引

标签: `reservoir-sampling`, `hash-table`, `design`

难度: Medium

通过率: 64.12%

原题链接: https://leetcode.com/problems/random-pick-index/description/

## 题目描述
给定一个可能包含重复元素的整数数组 `nums`，随机输出一个给定目标数字的索引。可以假设目标数字肯定存在于数组中。实现 Solution 类来解决这个问题。实现以下方法：

- `Solution(int[] nums)` 用数组 `nums` 初始化对象。
- `int pick(int target)` 随机选择 `nums` 中元素等于 `target` 的一个索引。对于使用这种方法的多次调用，如果存在多个合法索引，则每个索引具有相同的返回概率。

## 解题思路
要在给定的数组中随机选择满足某些条件（如值等于给定目标）的索引，我们可以使用水塘抽样算法。流程如下：

1. **初始化**：构造函数收到一个数组 `nums`，我们需要保存该数组，以便在 `pick` 方法中使用。

2. **选择索引**：对于 `pick(target)` 方法，扫描整个数组 `nums`，记录扫描时目标值的索引并选择一个。

    - 使用一个计数器 `count` 来追踪发现目标值的次数。
    - 使用随机数生成来选择当前发现的目标值索引为结果，方法是：

      - 对于每个符合条件的索引 `i`，以 $1/count$ 的概率选择该索引（即 `rand() % count == 0`)，以此均匀概率选择当前目标索引为结果。

    - 最终返回选中的索引。

这种方法能够在多次遇到符合条件的索引时，以相等概率进行选择。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
import random

class Solution:
    def __init__(self, nums):
        # 保存输入的数组
        self.nums = nums

    def pick(self, target):
        result = -1  # 用于存储选中的索引
        count = 0  # 用于记录发现的目标的次数

        # 遍历数组
        for i, num in enumerate(self.nums):
            if num == target:
                count += 1
                # 以1/count的概率替换结果
                if random.randint(0, count - 1) == 0:
                    result = i
        return result

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
    private:
        vector<int> nums;
    public:
        Solution(vector<int>& nums) {
            this->nums = nums;
        }
        
        int pick(int target) {
            int result = -1;
            int count = 0;
            for (int i = 0; i < nums.size(); ++i) {
                if (nums[i] == target) {
                    ++count;
                    // 以1/count的概率选择索引
                    if (rand() % count == 0) {
                        result = i;
                    }
                }
            }
            return result;
        }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class Solution {
    constructor(nums) {
        this.nums = nums;  // 保存数组
    }

    pick(target) {
        let result = -1;
        let count = 0;
        for (let i = 0; i < this.nums.length; i++) {
            if (this.nums[i] === target) {
                count++;
                if (Math.floor(Math.random() * count) === 0) {
                    result = i;
                }
            }
        }
        return result;
    }
}

```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.Random;

class Solution {
    private int[] nums;
    private Random rand;

    public Solution(int[] nums) {
        this.nums = nums;
        this.rand = new Random();
    }
    
    public int pick(int target) {
        int result = -1;
        int count = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == target) {
                count++;
                // 以1/count的概率选择索引
                if (rand.nextInt(count) == 0) {
                    result = i;
                }
            }
        }
        return result;
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：

$$O(n)$$ 其中 $n$ 是数组 $nums$ 的长度，因为我们需要遍历整个数组。


空间复杂度：

$$O(1)$$ 除了存储数组和一些使用随机数的变量外，我们不需要额外的空间。
