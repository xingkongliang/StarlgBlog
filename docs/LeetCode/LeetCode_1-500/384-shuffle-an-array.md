---
sidebar_position: 384
tags:
  - array
  - design
  - Medium
---

# 384.打乱数组

标签: `array`, `design`

难度: Medium

通过率: 58.69%

原题链接: https://leetcode.com/problems/shuffle-an-array/description/

## 题目描述
给定一个整数数组 nums，设计一个算法将数组打乱。数组的所有排列组合应该是等可能的结果。实现 Solution 类：

- Solution(int[] nums) 初始化对象，接收整数数组 nums。
- int[] reset() 将数组重置为其原始配置并返回。
- int[] shuffle() 返回数组的随机打乱。

示例 1：

输入：
["Solution", "shuffle", "reset", "shuffle"]
[[[1, 2, 3]], [], [], []]
输出：[null, [3, 1, 2], [1, 2, 3], [1, 3, 2]]

解释：
Solution solution = new Solution([1, 2, 3]);
solution.shuffle();    // 打乱数组 [1,2,3]，并返回打乱后的结果。
                       // 所有的排列组合都应该等可能返回。
                       // 示例：返回 [3, 1, 2]
solution.reset();      // 将数组重置为其原始配置 [1,2,3]。返回 [1, 2, 3]
solution.shuffle();    // 返回数组 [1,2,3] 的随机打乱。示例：返回 [1, 3, 2]


## 解题思路
该问题要求我们设计一个算法，能够确保一个数组在打乱时，所有的排列都是等概率可能出现的。

为此，Fisher-Yates 洗牌算法是一种经典的解决方案。它的基本思想是：

1. 从数组的最后一个元素开始，逐步向前遍历数组。
2. 在遍历到的当前元素位置，随机选择一个其自身及其之前位置的元素，并与当前元素进行交换。
3. 重复上述步骤，直到遍历完整个数组。

这样就可以确保数组的每个排列出现的概率都是相等的。

`reset()` 方法只需要返回数组初始存储状态下的顺序即可。因此，在初始化时，可以保存原始数组的拷贝。
`shuffle()` 方法则执行上述洗牌算法以便打乱数组。


## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
import random

class Solution:
    def __init__(self, nums):
        """初始化数组和其拷贝"""
        self.original = list(nums)
        self.array = list(nums)

    def reset(self):
        """重置数组为原始顺序"""
        self.array = list(self.original)
        return self.array

    def shuffle(self):
        """使用Fisher-Yates洗牌算法打乱数组"""
        for i in range(len(self.array) - 1, 0, -1):
            j = random.randint(0, i)
            self.array[i], self.array[j] = self.array[j], self.array[i]
        return self.array

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
    private int[] original;
    private int[] array;
    private Random random;

    public Solution(int[] nums) {
        original = nums.clone();
        array = nums.clone();
        random = new Random();
    }

    public int[] reset() {
        array = original.clone();
        return array;
    }

    public int[] shuffle() {
        for (int i = array.length - 1; i > 0; i--) {
            int j = random.nextInt(i + 1);
            int temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class Solution {
    constructor(nums) {
        this.original = nums.slice();
        this.array = nums.slice();
    }

    reset() {
        this.array = this.original.slice();
        return this.array;
    }

    shuffle() {
        for (let i = this.array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.array[i], this.array[j]] = [this.array[j], this.array[i]];
        }
        return this.array;
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.Random;

class Solution {
    private int[] original;
    private int[] array;
    private Random random;
    
    public Solution(int[] nums) {
        original = nums.clone();
        array = nums.clone();
        random = new Random();
    }

    public int[] reset() {
        array = original.clone();
        return array;
    }

    public int[] shuffle() {
        for (int i = array.length - 1; i > 0; i--) {
            int j = random.nextInt(i + 1);
            int temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：

执行`reset`方法的时间复杂度为 $O(n)$，因为需要复制数组。

执行`shuffle`方法的时间复杂度为 $O(n)$，因为每个元素在洗牌过程中被操作一次。

空间复杂度：

由于需要存储原始数组和当前数组，因此空间复杂度为 $O(n)$。
