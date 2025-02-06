---
sidebar_position: 381
tags:
  - design
  - array
  - hash-table
  - Hard
---

# 381.插入删除获取随机元素 - O(1) 时间复杂度（允许重复）

标签: `design`, `array`, `hash-table`

难度: Hard

通过率: 35.71%

原题链接: https://leetcode.com/problems/insert-delete-getrandom-o1-duplicates-allowed/description/

## 题目描述
RandomizedCollection 是一种可以包含重复元素的数集。它支持插入和删除特定元素，并能够返回一个随机元素。

## 解题思路
为了实现插入、删除和获取随机元素的平均 $O(1)$ 时间复杂度，我们需要一种高效的方式来处理重复元素。可以使用数组和哈希表两种数据结构来实现：

1. **数组 (List)**: 用于存储插入的元素，因为数组可以以 $O(1)$ 时间访问任意索引位置，从而快速获取随机元素。
2. **哈希表 (Map or Dict)**: 存储元素值对应数组中索引的集合。由于允许重复元素，所以每个值会对应一个索引集合，这保证了在删除时可以快速找到并移除一个特定的元素。

具体步骤如下：
1. **Insert 操作**: 将元素插入到数组的末尾，并在哈希表中记录该元素的索引。如果哈希表中已有该元素，返回 `false`；否则返回 `true`。
2. **Remove 操作**: 为了将删除操作保持在 $O(1)$ 时间复杂度，从数组中删除一个元素时，可以将其与数组末尾的元素互换，然后直接去除数组的最后一项，同时更新哈希表中相应的索引记录。若元素不存在，返回 `false`；否则返回 `true`。
3. **getRandom 操作**: 返回数组中任意一个随机索引的位置的元素。

这样设计的关键在于利用数组来提供快速的随机访问能力，同时结合哈希表来管理元素的重复和快速索引访问。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
import random
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class RandomizedCollection:
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
    def __init__(self):
```

</TabItem>
<TabItem value="java" label="Java">

```java
        self.nums = []  # 存储元素的数组
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：

$$O(1)$$

空间复杂度：

$$O(n)$$

其中，$n$ 是插入元素的个数。
