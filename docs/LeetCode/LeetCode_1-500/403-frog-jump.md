---
sidebar_position: 403
tags:
  - dynamic-programming
  - depth-first-search
  - Hard
---

# 403.青蛙过河

标签: `dynamic-programming`, `depth-first-search`

难度: Hard

通过率: 46.3%

原题链接: https://leetcode.com/problems/frog-jump/description/

## 题目描述
一只青蛙正在过河。这个河被分成了若干个单元，每个单元可能有也可能没有石头。青蛙可以停在石头上，但不能跳入水中。给定石头的位置列表（按升序排列），确定青蛙是否能通过所有石头到达最后一块石头。青蛙一开始在第一块石头上，并假设第一次跳跃必须是1个单位。如果青蛙的最后一次跳跃是k个单位，则下次跳跃必须是k-1、k或k+1个单位。青蛙只能向前跳。

## 解题思路
为了判断青蛙是否可以跳到最后一个石头，我们可以使用动态规划结合深度优先搜索的方法。我们用一个字典来记录青蛙在每个石头上能以哪些步长(k)到达。初始情况下，只有第一块石头上有步长为0的可能。然后对每一块石头，计算以每种可能的步长k到达该石头的情况下，青蛙下一步可能的的跳跃步长，为k-1, k和k+1。若这三种步长能到达的石头存在，我们就在对应的石头上添加新的步长可能性。循环遍历迭代这一过程直到处理所有石头。如果最后一块石头有任何可能的步长到达，则表示青蛙可以到达，否则不可以。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def canCross(stones):
    # 记录那些石头可以以哪些步长(k)到达
    dp = {stone: set() for stone in stones}
    dp[stones[0]].add(0)

    for stone in stones:
        for k in dp[stone]:
            # 尝试k-1, k, k+1步长的跳跃
            for step in [k - 1, k, k + 1]:
                if step > 0 and (stone + step) in dp:
                    dp[stone + step].add(step)

    # 查看最后一个石头是否存在能以某个步长到达
    return bool(dp[stones[-1]])
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution { 
public:
    bool canCross(vector<int>& stones) {
        unordered_map<int, unordered_set<int>> dp;
        for (int stone : stones) {
            dp[stone] = unordered_set<int>();
        }
        dp[stones[0]].insert(0);

        for (int stone : stones) {
            for (int k : dp[stone]) {
                for (int step : {k - 1, k, k + 1}) {
                    if (step > 0 && dp.count(stone + step)) {
                        dp[stone + step].insert(step);
                    }
                }
            }
        }

        return !dp[stones.back()].empty();
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function canCross(stones) {
    const dp = new Map();
    for (const stone of stones) {
        dp.set(stone, new Set());
    }
    dp.get(stones[0]).add(0);

    for (const stone of stones) {
        for (const k of dp.get(stone)) {
            for (const step of [k - 1, k, k + 1]) {
                if (step > 0 && dp.has(stone + step)) {
                    dp.get(stone + step).add(step);
                }
            }
        }
    }

    return dp.get(stones[stones.length - 1]).size > 0;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public boolean canCross(int[] stones) {
        if (stones == null || stones.length == 0) return false;

        // 动态规划字典，记录每块石头可到达的步长
        Map<Integer, Set<Integer>> dp = new HashMap<>();
        for (int stone : stones) {
            dp.put(stone, new HashSet<>());
        }
        dp.get(stones[0]).add(0);

        for (int stone : stones) {
            for (int k : dp.get(stone)) {
                for (int step : new int[]{k - 1, k, k + 1}) {
                    if (step > 0 && dp.containsKey(stone + step)) {
                        dp.get(stone + step).add(step);
                    }
                }
            }
        }

        return !dp.get(stones[stones.length - 1]).isEmpty();
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n^2)$，其中 $n$ 是石头的数量，因为每个石头可以检查的步长可能性最多有 $n$ 个。  
  
空间复杂度为 $O(n^2)$，字典用来存储每块石头的步长可能性。
