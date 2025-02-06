---
sidebar_position: 55
tags:
  - array
  - greedy
  - Medium
---

# 55.跳跃游戏

标签: `array`, `greedy`

难度: Medium

通过率: 38.95%

原题链接: https://leetcode.com/problems/jump-game/description/

## 题目描述
给定一个整数数组 `nums`。你最初位于数组的第一个下标，数组中的每个元素代表你在该位置可以跳跃的最大长度。  
如果你能够到达最后一个下标，返回 `true`；否则，返回 `false`。

## 解题思路
要解决这个问题，我们可以采用贪心算法的策略。我们只需跟踪最远可以到达的位置。如果我们在遍历的过程中，最远可达位置至少能到达当前的下标，继续更新最远可达位置为每一步可能到达的更远位置，否则无法继续。具体步骤如下：  
1. 初始化一个变量 `maxReach` 为 0，表示从第一个位置开始最远可到达的索引。  
2. 遍历数组 `nums` 中的每个元素 `nums[i]`。  
3. 如果 `i` 超过了当前的 `maxReach`，说明当前位置是无法到达的，返回 `false`。  
4. 更新 `maxReach` 为 `max(i + nums[i], maxReach)`，表示在当前位置，通过当前位置的最大跳跃可以到达的最远位置。  
5. 如果 `maxReach` 已经大于等于数组的最后一个索引，则返回 `true`。  
6. 遍历结束后，返回 `false`。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def canJump(nums):
    # 记录最远可以达到的索引
    maxReach = 0
    # 遍历数组里的每一个元素
    for i, num in enumerate(nums):
        # 如果当前索引超过了最远可达位置，直接返回False
        if i > maxReach:
            return False
        # 更新最远可到达的位置
        maxReach = max(maxReach, i + num)
        # 如果已经到达或超过最后一个索引，返回True
        if maxReach >= len(nums) - 1:
            return True
    return False
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
bool canJump(vector<int>& nums) {
    int maxReach = 0;  // 最远可以到达的索引
    for (int i = 0; i < nums.size(); ++i) {
        // 如果当前位置 i 超过了最远可以到达的索引，返回 false
        if (i > maxReach) return false;
        // 更新最远可到达的索引
        maxReach = max(maxReach, i + nums[i]);
        // 如果已经可以到达或超过最后一个索引，返回 true
        if (maxReach >= nums.size() - 1) return true;
    }
    return false;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function canJump(nums) {
    let maxReach = 0;  // 记录能到达的最远索引
    for (let i = 0; i < nums.length; i++) {
        // 如果当前位置超过了能到达的最远索引，返回 false
        if (i > maxReach) {
            return false;
        }
        // 更新能到达的最远索引
        maxReach = Math.max(maxReach, i + nums[i]);
        // 如果能到达或超过最后一个索引，返回 true
        if (maxReach >= nums.length - 1) {
            return true;
        }
    }
    return false;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public boolean canJump(int[] nums) {
    int maxReach = 0;  // 能到达的最远索引
    for (int i = 0; i < nums.length; i++) {
        // 如果当前位置超过了最远可达的索引，返回 false
        if (i > maxReach) {
            return false;
        }
        // 更新最远可到达的索引
        maxReach = Math.max(maxReach, i + nums[i]);
        // 如果能到达或超过最后一个索引，返回 true
        if (maxReach >= nums.length - 1) {
            return true;
        }
    }
    return false;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度: $O(n)$，其中 $n$ 是数组的长度，因为我们只需遍历数组一次。  
空间复杂度: $O(1)$，因为只使用了常数额外空间。
