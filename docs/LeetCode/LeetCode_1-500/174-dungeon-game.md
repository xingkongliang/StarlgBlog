---
sidebar_position: 174
tags:
  - dynamic-programming
  - array
  - Hard
---

# 174.地牢游戏

标签: `dynamic-programming`, `array`

难度: Hard

通过率: 38.8%

原题链接: https://leetcode.com/problems/dungeon-game/description/

## 题目描述
恶魔抓住了公主并将她囚禁在地牢的右下角。地牢由一个 $m \times n$ 的房间组成，摆成一个二维的网格。勇敢的骑士起初在左上角的房间，他必须通过地牢去拯救公主。骑士有一个初始的健康点数，表示为正整数。如果在任何时候他的健康点降到 $0$ 或以下，他会立即死去。有些房间被恶魔把守（以负整数表示），因此骑士进入这些房间会损失健康点；其他房间为空（表示为 $0$），或者包含会增加骑士健康点的魔法球（以正整数表示）。为了尽快达到公主所在的房间，骑士决定每一步只往右或往下移动。返回骑士要成功解救公主所需的最低初始健康点。注意，即使是骑士首次进入的房间和公主囚禁的右下角房间也可以包含威胁或增益效果。

## 解题思路
我们需要找到一个从左上角到右下角的路径，使得骑士的最低初始健康点始终保持大于 $0$。由于路径只允许向右或向下，所以这是一个典型的二维动态规划问题。我们用一个二维数组 $dp[i][j]$ 表示骑士在位置 $(i,j)$ 处的最低健康点数。因为我们知道骑士最后必须到达右下角 $(m-1,n-1)$，所以从这个点开始倒推。对于每个房间 $(i,j)$，我们计算出从 $(i,j)$ 到达终点所需的最低健康点数，这取决于到达 $(i+1,j)$ 或 $(i,j+1)$ 所需的健康点数。因此，状态转移方程为：
$$
dp[i][j] = \max(1, \min(dp[i+1][j], dp[i][j+1]) - \text{dungeon}[i][j])
$$
其中，$\text{dungeon}[i][j]$ 是房间对健康点的影响（可以为负、正或零），最后整个网格的计算结果就是骑士在起点 $(0,0)$ 所需的最低健康点数。初始条件是，终点处即需要至少一个健康点：$dp[m-1][n-1] = \max(1, 1 - \text{dungeon}[m-1][n-1])$。然后返回 $dp[0][0]$ 便是解。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def calculateMinimumHP(dungeon):
    # 获取地牢的行数和列数
    m, n = len(dungeon), len(dungeon[0])
    # 创建二维dp数组，大小为 (m+1) x (n+1)，初始化为正无穷大
    dp = [[float('inf')] * (n + 1) for _ in range(m + 1)]
    # 终点最低健康点，因为骑士到达后需要至少有1点生命值
    dp[m][n - 1] = dp[m - 1][n] = 1

    # 逆序遍历地牢网格
    for i in range(m - 1, -1, -1):
        for j in range(n - 1, -1, -1):
            min_health_on_exit = min(dp[i + 1][j], dp[i][j + 1])
            dp[i][j] = max(1, min_health_on_exit - dungeon[i][j])

    return dp[0][0]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int calculateMinimumHP(vector<vector<int>>& dungeon) {
        int m = dungeon.size();
        int n = dungeon[0].size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, INT_MAX));
        dp[m][n - 1] = dp[m - 1][n] = 1; // 地牢出口的最低生命值

        for (int i = m - 1; i >= 0; --i) {
            for (int j = n - 1; j >= 0; --j) {
                int min_health_on_exit = min(dp[i + 1][j], dp[i][j + 1]);
                dp[i][j] = max(1, min_health_on_exit - dungeon[i][j]);
            }
        }
        return dp[0][0];
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function calculateMinimumHP(dungeon) {
    const m = dungeon.length;
    const n = dungeon[0].length;
    const dp = Array.from({length: m + 1}, () => Array(n + 1).fill(Infinity));
    dp[m][n - 1] = dp[m - 1][n] = 1; // 在出口处的最低健康点数

    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            const minHealthOnExit = Math.min(dp[i + 1][j], dp[i][j + 1]);
            dp[i][j] = Math.max(1, minHealthOnExit - dungeon[i][j]);
        }
    }

    return dp[0][0];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int calculateMinimumHP(int[][] dungeon) {
        int m = dungeon.length;
        int n = dungeon[0].length;
        int[][] dp = new int[m + 1][n + 1];
        for (int[] row : dp) Arrays.fill(row, Integer.MAX_VALUE);
        dp[m][n - 1] = dp[m - 1][n] = 1; // 地牢出口最低健康点数

        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                int minHealthOnExit = Math.min(dp[i + 1][j], dp[i][j + 1]);
                dp[i][j] = Math.max(1, minHealthOnExit - dungeon[i][j]);
            }
        }

        return dp[0][0];
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(m \times n)$

空间复杂度：$O(m \times n)$，用于存储动态规划表
