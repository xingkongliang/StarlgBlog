---
sidebar_position: 382
tags:
  - reservoir-sampling
  - linked-list
  - Medium
---

# 382.链表随机节点

标签: `reservoir-sampling`, `linked-list`

难度: Medium

通过率: 63.63%

原题链接: https://leetcode.com/problems/linked-list-random-node/description/

## 题目描述
给定一个单向链表，从链表中返回一个随机节点的值。每个节点被选中的概率需要相等。

## 解题思路
这个问题可以通过"水塘抽样"算法来高效解决，尤其是在链表长度未知的情况下，非常适合。水塘抽样算法能够在遍历数据的过程中仅用常数级别的内存获得均匀随机抽样。具体思路如下：

1. 初始化一个变量`result`存储随机节点的值，最开始指向head的节点值。
2. 从链表第一个节点开始，遍历到节点i时，生成一个随机数j，$0 <= j <= i$。
3. 如果j等于0，更新`result`为当前节点的值。这相当于以1/i的概率保留当前节点的值。
4. 不断遍历到链表的末尾即可。

这样在遍历完链表后，存储的`result`就是随机概率均匀分布下链表的一个节点值。

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
class ListNode:
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
    def __init__(self, val=0, next=None):
```

</TabItem>
<TabItem value="java" label="Java">

```java
        self.val = val
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：
$$O(n)$$，其中 $n$ 是链表中的节点数量，因为我们需要遍历整个链表。  
  
空间复杂度：
$$O(1)$$，使用了常数级别的额外空间。
