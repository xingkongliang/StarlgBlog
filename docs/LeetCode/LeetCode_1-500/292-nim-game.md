---
sidebar_position: 292
tags:
  - math
  - dynamic-programming
  - Easy
---

# 292.Nim 游戏

标签: `math`, `dynamic-programming`

难度: Easy

通过率: 57.62%

原题链接: https://leetcode.com/problems/nim-game/description/

## 题目描述
你和朋友正在玩Nim 游戏：`初始时，有一堆石头。你们轮流拿走1到3块石头，你先手。拿走最后一块石头的人获胜。`给定石头数量n，判断你是否能获胜，即返回true或false，假设两人都以最优策略进行游戏。

## 解题思路
该问题的关键在于每个人每次可以拿走1到3块石头，我们可以通过分析石头数量的情况找出规律。观察以下几种情况：

- 当$n = 1, 2, 3$时，你可以直接拿走所有石头赢得比赛。
- 当$n = 4$时，任何你拿1、2或3颗石头对方都能拿走剩下的石头使自己赢得比赛，因此你无法获胜。

这种模式会一直延续下去：
- 若你面对$n$是4的倍数，这时无论你怎么取，都会导致对方处在一个非4的倍数的$n$情况，对方能采取使你回到4倍数的策略使自己最终胜利。

因此，只有当$n$不是4的倍数时，你才有取胜策略。所以，解决这个问题的关键是判断$n$是否为4的倍数。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def canWinNim(n):
    # 当石头数不是4的倍数时你可以赢
    return n % 4 != 0
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    bool canWinNim(int n) {
        // 当石头数不是4的倍数时你可以赢
        return n % 4 != 0;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function canWinNim(n) {
    // 当石头数不是4的倍数时你可以赢
    return n % 4 !== 0;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public boolean canWinNim(int n) {
        // 当石头数不是4的倍数时你可以赢
        return n % 4 != 0;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(1)$  因为只进行了一次模运算。  
  
空间复杂度：$O(1)$  因为只使用了基本的变量存储。
