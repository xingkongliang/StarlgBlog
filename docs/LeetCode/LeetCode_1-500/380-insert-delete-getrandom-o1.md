---
sidebar_position: 380
tags:
  - hash-table
  - design
  - Medium
---

# 380.380. 插入 删除 和随机获取 O(1)

标签: `hash-table`, `design`

难度: Medium

通过率: 54.78%

原题链接: https://leetcode.com/problems/insert-delete-getrandom-o1/description/

## 题目描述
实现 RandomizedSet 类： RandomizedSet() 初始化 RandomizedSet 对象。 bool insert(int val) 如果 set 中不存在 val，插入并返回 true，否则返回 false。 bool remove(int val) 如果 set 中存在 val，移除并返回 true，否则返回 false。 int getRandom() 返回随机的元素（保证至少有一个元素存在）。所有元素被返回的概率相等。 所有方法都应该在平均 O(1) 时间复杂度内完成。

## 解题思路
为了实现 $O(1)$ 时间复杂度地插入、删除和获取随机元素，我们可以使用一个数组和一个哈希表：

1. **插入操作**：
   - 首先检查元素是否在集合中存在。
   - 如果存在，返回 `false`。
   - 如果不存在，将元素加入数组，并在哈希表中记录该元素的索引。
   - 返回 `true`。

2. **删除操作**：
   - 检查元素是否在集合中存在。
   - 如果不存在，返回 `false`。
   - 如果存在，将该元素在数组中的位置与最后一个元素进行交换。
   - 更新最后一个元素在哈希表的索引。
   - 移除数组的最后一个元素，并在哈希表中删除该元素。
   - 返回 `true`。

3. **随机获取操作**：
   - 随机选取数组中的一个元素，因为数组大小是动态管理的，所有元素在数组中的概率是相等的。

通过这种方法，插入和删除操作都能在平均 $O(1)$ 时间内完成，因为我们只需操作数组尾部的元素；而随机获取操作能在 $O(1)$ 时间内实现，因为只需从数组直接随机访问。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
import random

class RandomizedSet:
    def __init__(self):
        # 存储元素形成的列表
        self.nums = []
        # 存储每个元素的索引
        self.num_to_index = {}

    def insert(self, val: int) -> bool:
        if val in self.num_to_index:
            return False
        # 将元素加入数组末尾
        self.num_to_index[val] = len(self.nums)
        self.nums.append(val)
        return True

    def remove(self, val: int) -> bool:
        if val not in self.num_to_index:
            return False
        # 获取要删除元素的索引
        index = self.num_to_index[val]
        # 用数组的最后一个元素覆盖要删除的元素
        last_val = self.nums[-1]
        self.nums[index] = last_val
        self.num_to_index[last_val] = index
        # 移除最后一个元素
        self.nums.pop()
        del self.num_to_index[val]
        return True

    def getRandom(self) -> int:
        # 从数组选择随机元素
        return random.choice(self.nums)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <vector>
#include <unordered_map>
#include <cstdlib>

class RandomizedSet {
public:
    RandomizedSet() {}

    // 插入函数
    bool insert(int val) {
        if (numToIndex.find(val) != numToIndex.end()) {
            return false;
        }
        nums.push_back(val);
        numToIndex[val] = nums.size() - 1;
        return true;
    }

    // 删除函数
    bool remove(int val) {
        if (numToIndex.find(val) == numToIndex.end()) {
            return false;
        }
        int index = numToIndex[val];
        int lastVal = nums.back();
        nums[index] = lastVal;
        numToIndex[lastVal] = index;
        nums.pop_back();
        numToIndex.erase(val);
        return true;
    }

    // 获取随机元素
    int getRandom() {
        return nums[std::rand() % nums.size()];
    }

private:
    std::vector<int> nums;
    std::unordered_map<int, int> numToIndex;
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class RandomizedSet {
    constructor() {
        this.nums = [];
        this.numToIndex = new Map();
    }

    // 插入函数
    insert(val) {
        if (this.numToIndex.has(val)) {
            return false;
        }
        this.nums.push(val);
        this.numToIndex.set(val, this.nums.length - 1);
        return true;
    }

    // 删除函数
    remove(val) {
        if (!this.numToIndex.has(val)) {
            return false;
        }
        const index = this.numToIndex.get(val);
        const lastVal = this.nums[this.nums.length - 1];
        this.nums[index] = lastVal;
        this.numToIndex.set(lastVal, index);
        this.nums.pop();
        this.numToIndex.delete(val);
        return true;
    }

    // 获取随机元素
    getRandom() {
        const randomIndex = Math.floor(Math.random() * this.nums.length);
        return this.nums[randomIndex];
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

class RandomizedSet {
    private List<Integer> nums;
    private Map<Integer, Integer> numToIndex;
    private Random rand;

    public RandomizedSet() {
        nums = new ArrayList<>();
        numToIndex = new HashMap<>();
        rand = new Random();
    }

    public boolean insert(int val) {
        if (numToIndex.containsKey(val)) {
            return false;
        }
        numToIndex.put(val, nums.size());
        nums.add(val);
        return true;
    }

    public boolean remove(int val) {
        if (!numToIndex.containsKey(val)) {
            return false;
        }
        int index = numToIndex.get(val);
        int lastVal = nums.get(nums.size() - 1);
        nums.set(index, lastVal);
        numToIndex.put(lastVal, index);
        nums.remove(nums.size() - 1);
        numToIndex.remove(val);
        return true;
    }

    public int getRandom() {
        return nums.get(rand.nextInt(nums.size()));
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度: 每次插入、删除操作都需要进行常数时间内的数组操作和哈希表操作，所以期望时间复杂度是 $O(1)$。随机获取操作使用标准库提供的随机选择器，也是 $O(1)$。  
  
空间复杂度: 需要开辟额外的空间存储哈希表和数组，所以空间复杂度为 $O(n)$，其中 $n$ 是元素的数量。
