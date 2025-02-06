---
sidebar_position: 149
tags:
  - hash-table
  - math
  - array
  - Hard
---

# 149.同一直线上的最多点数

标签: `hash-table`, `math`, `array`

难度: Hard

通过率: 28.0%

原题链接: https://leetcode.com/problems/max-points-on-a-line/description/

## 题目描述
给定一个点数组，其中points[i] = [xi, yi]表示X-Y平面上的一个点，返回相同直线上最多的点数。

## 解题思路
要解决这个问题，主要是找到最大数量的共线点。对每个点i，我们需要计算通过它与其他任何一个点j (j != i) 的直线，并记录这些直线。这里的关键是在计算斜率时需要处理浮点数精度问题。为避免浮点误差，我们使用分数形式表示斜率，即 (dy/dx)，其中 dy 和 dx 是两点间的y差和x差。同时为处理负斜率的方向，常通过求最大公约数(GCD)来标准化分数。` 

具体步骤如下：

1. 使用双重循环，外循环选择每个点作为起点i。内循环与其他点j (j != i) 计算斜率。
2. 使用哈希表记录每条通过点i的直线上点的个数，key为斜率。
3. 对每个起点i，找到具有相同斜率的直线上最多的点。
4. 更新答案为所有情况下直线上最大点数。

注意，直接重合的点应特殊处理，每遇到一个直接重合的点，应额外在当前经过该点的直线基础上加1。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
from collections import defaultdict`
`import math`
``
def maxPoints(points):`
    def gcd(a, b):`
        while b:`
            a, b = b, a % b`
        return a`
``
    def slope(p1, p2):`
        dx = p2[0] - p1[0]`
        dy = p2[1] - p1[1]`
        if dx == 0:`
            return ('inf', 0)  # 垂直线的特殊标记`
        g = gcd(dx, dy)`
        return (dy // g, dx // g)`
``
    n = len(points)`
    if n < 3:`
        return n`
    max_points = 0`
``
    for i in range(n):`
        slopes = defaultdict(int)`
        duplicates = 1`
        for j in range(i + 1, n):`
            if points[i] == points[j]:`
                duplicates += 1`
            else:`
                s = slope(points[i], points[j])`
                slopes[s] += 1`
``
        max_points = max(max_points, max(slopes.values(), default=0) + duplicates)`
``
    return max_points
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
```cpp
#include <vector>
#include <unordered_map>
#include <algorithm>

using namespace std;

class Solution {
public:
    int gcd(int a, int b) {
        return b ? gcd(b, a % b) : a;
    }

    int maxPoints(vector<vector<int>>& points) {
        int n = points.size();
        if (n < 3) return n;
        int max_points = 0;
        
        for (int i = 0; i < n; ++i) {
            unordered_map<string, int> slopes;
            int duplicates = 1;
            for (int j = i + 1; j < n; ++j) {
                int dx = points[j][0] - points[i][0];
                int dy = points[j][1] - points[i][1];
                if (dx == 0 && dy == 0) {
                    ++duplicates;
                    continue;
                }
                int g = gcd(dx, dy);
                dx /= g; dy /= g;
                string slope = to_string(dy) + "/" + to_string(dx);
                ++slopes[slope];
            }
            int current_max = 0;
            for (auto it : slopes) {
                current_max = max(current_max, it.second);
            }
            max_points = max(max_points, current_max + duplicates);
        }
        return max_points;
    }
};
```
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function gcd(a, b) {`
    return b === 0 ? a : gcd(b, a % b);`
}`
`
var maxPoints = function(points) {`
    if (points.length < 3) return points.length;`
    let max_points = 0;`
    for (let i = 0; i < points.length; i++) {`
        let slopes = new Map();`
        let duplicates = 1;`
        for (let j = i + 1; j < points.length; j++) {`
            let dx = points[j][0] - points[i][0];`
            let dy = points[j][1] - points[i][1];`
            if (dx === 0 && dy === 0) {`
                duplicates++;`
                continue;`
            }`
            const g = gcd(dx, dy);`
            dx /= g;`
            dy /= g;`
            const slope = dy + '/' + dx;`
            slopes.set(slope, (slopes.get(slope) || 0) + 1);`
        }`
        let current_max = 0;`
        for (let [, count] of slopes.entries()) {`
            current_max = Math.max(current_max, count);`
        }`
        max_points = Math.max(max_points, current_max + duplicates);`
    }`
    return max_points;`
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;`
`
class Solution {`
    private int gcd(int a, int b) {`
        return b == 0 ? a : gcd(b, a % b);`
    }`
`
    public int maxPoints(int[][] points) {`
        int n = points.length;`
        if (n < 3) return n;`
        int maxPoints = 0;`
        for (int i = 0; i < n; i++) {`
            Map<String, Integer> slopes = new HashMap<>();`
            int duplicates = 1;`
            for (int j = i + 1; j < n; j++) {`
                int dx = points[j][0] - points[i][0];`
                int dy = points[j][1] - points[i][1];`
                if (dx == 0 && dy == 0) {`
                    duplicates++;`
                    continue;`
                }`
                int g = gcd(dx, dy);`
                dx /= g;`
                dy /= g;`
                String slope = dy + "/" + dx;`
                slopes.put(slope, slopes.getOrDefault(slope, 0) + 1);`
            }`
            int currentMax = 0;`
            for (int count : slopes.values()) {`
                currentMax = Math.max(currentMax, count);`
            }`
            maxPoints = Math.max(maxPoints, currentMax + duplicates);`
        }`
        return maxPoints;`
    }`
}`

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n^2)$，因为我们需要对每个点计算通过其他点的斜率。  
  
空间复杂度为 $O(n)$，用于存储每个点的斜率信息和重合点数。
