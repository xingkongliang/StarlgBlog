---
sidebar_position: 390
tags:
  - math
  - array
  - Medium
---

# 390.消除游戏

标签: `math`, `array`

难度: Medium

通过率: 45.36%

原题链接: https://leetcode.com/problems/elimination-game/description/

## 题目描述
给定一个有序数组 $arr$，该数组包括 $[1, n]$ 范围内的所有整数，按严格递增顺序排列。对 $arr$ 应用以下算法：

1. 从左到右移除第一个数字及之后的每隔一个的数字，直到到达数组末尾。
2. 重复上一步，但这次从右到左移除末尾的数字及之后的每隔一个的数字。
3. 持续重复这两步，交替进行左右方向的移除，直到只剩下一个数字。

给定整数 $n$，返回最终剩下的最后一个数字。

## 解题思路
这个问题涉及从两边交替删除元素。归纳分析揭示了一个模式：

每次从左到右删除和从右到左删除的操作都可以看作是在更新剩余数组的起点、步长和总数。我们只需要跟踪当前列表的起点（head）、步长（step），以及数组中剩余的元素数量（remaining）。

- 我们开始时，起点为1，步长为1，剩余元素数量为n。
- 每次从左到右删除时，因为从左边开始，头部总是被移除，所以新的头部变为`head + step`。而步长翻倍，即`step * 2`。
- 如果从右向左删除，我们需要确认剩余的数量是否为偶数。如果为奇数，最右边即为删除的起点，从左得来的头部需要被更新为 `head + step`。

通过这个循环计算，直到剩余数量 `remaining` 为1，即只剩一个元素时，我们就能得到所需要的结果。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def lastRemaining(n: int) -> int:
    head = 1  # 初始位置的头节点
    step = 1  # 初始步长
    left_to_right = True  # 是否从左到右
    remaining = n  # 剩余的元素数量

    while remaining > 1:
        if left_to_right or remaining % 2 == 1:
            # 如果是从左到右，或者剩余数量是奇数，更新起始头节点
            head += step
        step *= 2  # 步长加倍
        remaining //= 2  # 剩余数量减半
        left_to_right = not left_to_right  # 反转方向

    return head

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int lastRemaining(int n) {
        int head = 1;
        int step = 1;
        bool left_to_right = true;
        int remaining = n;
        
        while (remaining > 1) {
            if (left_to_right || remaining % 2 == 1) {
                // 如果从左到右或剩余数量为奇数
                head += step;
            }
            step *= 2;  // 步长加倍
            remaining /= 2;  // 剩余数量减半
            left_to_right = !left_to_right;  // 切换方向
        }
        return head;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function lastRemaining(n) {
    let head = 1; // 初始位置的头节点
    let step = 1; // 初始步长
    let left_to_right = true; // 标识方向
    let remaining = n; // 剩余的元素数量

    while (remaining > 1) {
        if (left_to_right || remaining % 2 === 1) {
            // 如果从左到右，或者剩余数量是奇数，更新起始头节点
            head += step;
        }
        step *= 2;  // 步长加倍
        remaining = Math.floor(remaining / 2); // 剩余数量减半
        left_to_right = !left_to_right;  // 反转方向
    }

    return head;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int lastRemaining(int n) {
        int head = 1;  // 初始头结点
        int step = 1;  // 初始步长
        boolean leftToRight = true; // 初始方向
        int remaining = n;  // 剩余元素个数

        while (remaining > 1) {
            if (leftToRight || remaining % 2 == 1) {
                // 如果是从左到右执行操作或剩余元素个数为奇数
                head += step;
            }
            step *= 2;  // 步长加倍
            remaining /= 2;  // 剩余数量减半
            leftToRight = !leftToRight;  // 改变方向
        }

        return head;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度**

在每次迭代中，剩余数组大小减半，因此时间复杂度是 $O(\log n)$。


**空间复杂度**

我们只使用了常数个变量来存储中间结果，因此空间复杂度是 $O(1)$。
