---
sidebar_position: 287
tags:
  - array
  - two-pointers
  - binary-search
  - Medium
---

# 287.寻找重复数

标签: `array`, `two-pointers`, `binary-search`

难度: Medium

通过率: 61.97%

原题链接: https://leetcode.com/problems/find-the-duplicate-number/description/

## 题目描述
给定一个包含 $n + 1$ 个整数的数组，其中每个整数都在范围 $[1, n]$ 之内。数组中只有一个重复的数字，找出这个重复的数字。要求在不修改数组的情况下，并且使用常数级别的额外空间来解决问题。

## 解题思路
我们可以利用 Floyd 的 Tortoise and Hare（龟兔赛跑）算法找到数组中的重复数字。这个算法的思想是基于链表圈的判定。 由于数列中的数值所表示的索引会形成一个类似链表的结构，其中必然存在一个环，因为一共有 $n+1$ 个数，但每个数的值只在 $1$ 到 $n$ 之间。通过以下步骤，我们可以找到重复的数：

1. **寻找环中的相遇点**：初始化两个指针，快指针（hare）每次走两步，慢指针（tortoise）每次走一步。如果存在环，则这两个指针最终会在环中相遇。

2. **找到环的入口，也就是重复数字**：将快指针重置到起点，然后两个指针各自同时走一步，直至相遇。此时它们相遇的索引就是重复数字的位置。这个过程类似于“相遇后重置起点”的方法来检测环的起始点。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def findDuplicate(nums):
    # 初始化龟和兔都在起点
    tortoise = nums[0]
    hare = nums[0]
    
    # 寻找相遇点
    while True:
        tortoise = nums[tortoise]  # 慢指针每次走一步
        hare = nums[nums[hare]]    # 快指针每次走两步
        if tortoise == hare:
            break
    
    # 找入口点（重复数字）
    tortoise = nums[0]
    while tortoise != hare:
        tortoise = nums[tortoise]
        hare = nums[hare]
    
    return hare
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int findDuplicate(vector<int>& nums) {
    // 初始化龟和兔都在起点
    int tortoise = nums[0];
    int hare = nums[0];
    
    // 寻找相遇点
    do {
        tortoise = nums[tortoise];
        hare = nums[nums[hare]];
    } while (tortoise != hare);
    
    // 找入口点（重复数字）
    tortoise = nums[0];
    while (tortoise != hare) {
        tortoise = nums[tortoise];
        hare = nums[hare];
    }
    
    return hare;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function findDuplicate(nums) {
    // 初始化龟和兔都在起点
    let tortoise = nums[0];
    let hare = nums[0];
    
    // 寻找相遇点
    do {
        tortoise = nums[tortoise];
        hare = nums[nums[hare]];
    } while (tortoise !== hare);
    
    // 找入口点（重复数字）
    tortoise = nums[0];
    while (tortoise !== hare) {
        tortoise = nums[tortoise];
        hare = nums[hare];
    }
    
    return hare;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int findDuplicate(int[] nums) {
    // 初始化龟和兔都在起点
    int tortoise = nums[0];
    int hare = nums[0];
    
    // 寻找相遇点
    do {
        tortoise = nums[tortoise];
        hare = nums[nums[hare]];
    } while (tortoise != hare);
    
    // 找入口点（重复数字）
    tortoise = nums[0];
    while (tortoise != hare) {
        tortoise = nums[tortoise];
        hare = nums[hare];
    }
    
    return hare;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：由于我们只需要遍历数组中的元素几次，所以总体时间复杂度为 $O(n)$。  
  
空间复杂度：我们只使用了常量级的额外空间，因此空间复杂度为 $O(1)$。
