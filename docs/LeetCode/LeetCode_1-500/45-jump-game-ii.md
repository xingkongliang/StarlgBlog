---
sidebar_position: 45
tags:
  - array
  - greedy
  - Medium
---

# 45.跳跃游戏 II

标签: `array`, `greedy`

难度: Medium

通过率: 40.93%

原题链接: https://leetcode.com/problems/jump-game-ii/description/

## 题目描述
给定一个长度为 $n$ 的整数数组 $nums$。你初始位置在 $nums[0]$。每个元素 $nums[i]$ 表示从索引 $i$ 向前跳跃的最大长度。换句话说，如果你在 $nums[i]$，你可以跳跃到 $nums[i + j]$，其中 $0 \leq j \leq nums[i]$ 且 $i + j < n$。返回到达 $nums[n - 1]$ 的最小跳跃次数。题目保证你总是可以到达数组的最后一个元素。

## 解题思路
要解决这个问题，可以使用贪心算法。通过贪心选择每一步能到达的最远点来最小化跳跃次数。具体步骤如下：

1. 初始化 `steps` 表示跳跃次数为 0。
2. 使用 `end` 表示当前跳跃的边界，初始为 0。
3. 使用 `farthest` 来记录下一步能到达的最远位置，初始化为 0。
4. 遍历数组，当遍历到当前边界 (`end`) 时，更新跳跃次数，并更新新的边界为刚才计算的最远点 (`farthest`)。
5. 如果当前的索引到达或超过了数组最后一个元素的位置，返回当前的跳跃次数。

通过这种方法，每次找到能跳的最远位置，确保步数最少。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def jump(nums):
    # 初始化跳跃次数、当前跳跃结束位置和当前能到达的最远位置
    steps = 0
    end = 0
    farthest = 0
    # 遍历数组
    for i in range(len(nums) - 1):
        # 更新能到达的最远位置
        farthest = max(farthest, i + nums[i])
        # 如果到达当前跳跃的结束位置
        if i == end:
            # 增加跳跃次数
            steps += 1
            # 更新跳跃结束位置为能到达的最远位置
            end = farthest
    return steps
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int jump(vector<int>& nums) {
        int steps = 0;
        int end = 0;
        int farthest = 0;
        for (int i = 0; i < nums.size() - 1; ++i) {
            // 更新最远达到位置
            farthest = max(farthest, i + nums[i]);
            // 如果到达跳跃结束位置
            if (i == end) {
                // 需要跳跃一次
                ++steps;
                // 更新跳跃结束位置
                end = farthest;
            }
        }
        return steps;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function jump(nums) {
    // 初始化跳跃次数、当前跳跃结束位置和能到达的最远位置
    let steps = 0;
    let end = 0;
    let farthest = 0;
    // 遍历数组
    for (let i = 0; i < nums.length - 1; i++) {
        // 计算能到达的最远位置
        farthest = Math.max(farthest, i + nums[i]);
        // 当遍历到当前跳跃的结束位置
        if (i === end) {
            // 跳跃次数加一
            steps++;
            // 更新跳跃边界
            end = farthest;
        }
    }
    return steps;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int jump(int[] nums) {
        int steps = 0;
        int end = 0;
        int farthest = 0;
        for (int i = 0; i < nums.length - 1; ++i) {
            // 更新能达到的最远距离
            farthest = Math.max(farthest, i + nums[i]);
            // 如果到达了跳跃范围的末尾
            if (i == end) {
                // 跳跃次数加一
                ++steps;
                // 更新跳跃范围的边界
                end = farthest;
            }
        }
        return steps;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 为数组的长度，因为只需要一次线性遍历。`
空间复杂度为 $O(1)$，因为只使用了常数个额外的空间。
