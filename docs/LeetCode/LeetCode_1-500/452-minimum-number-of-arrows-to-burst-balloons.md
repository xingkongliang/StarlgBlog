---
sidebar_position: 452
tags:
  - greedy
  - sort
  - Medium
---

# 452.射爆气球的最小箭数

标签: `greedy`, `sort`

难度: Medium

通过率: 59.68%

原题链接: https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/description/

## 题目描述
给定一个二维整数数组 points ，其中 points[i] = [xstart, xend] 表示一个气球。每个气球的水平直径为 [xstart, xend]。你可以沿着 x 轴垂直地在任意位置射箭，每个箭可以射穿这个位置上方所有气球。返回射穿所有气球所需的最小箭数。

## 解题思路
为了找出射爆所有气球需要的最少箭数，我们可以采用贪心思路：

1. 首先，将所有气球按照其结束位置进行升序排序。

2. 开始时设置一支箭，这支箭的水平投影初始位置为第一个气球的结束位置。这样可以确保它可以爆炸这个气球。

3. 然后，从第二个气球开始遍历：
   - 如果一个气球的开始位置已经超过了当前箭的投影位置，意味着上一个箭不能同时射穿这个气球，我们需要再增加一支箭，并且将新箭的水平投影位置更新为这个气球的结束位置。

4. 最终，箭的数量即为所求的最少箭数。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def findMinArrowShots(points):
    # 如果气球数组为空，则返回0
    if not points:
        return 0

    # 按照气球的结束位置进行排序
    points.sort(key=lambda x: x[1])

    # 第一个箭就定为第一个气球的结束位置
    arrows = 1
    current_end = points[0][1]

    # 从第二个气球开始遍历
    for x_start, x_end in points[1:]:
        # 如果当前气球的起始位置超过了当前箭的射程
        if x_start > current_end:
            # 需要一个新的箭
            arrows += 1
            current_end = x_end

    return arrows

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int findMinArrowShots(vector<vector<int>>& points) {
    if (points.empty()) return 0;
    
    // 按照气球的结束位置进行排序
    sort(points.begin(), points.end(), [](const vector<int>& a, const vector<int>& b) {
        return a[1] < b[1];
    });

    // 初始的箭数量和位置
    int arrows = 1;
    int current_end = points[0][1];

    for (int i = 1; i < points.size(); ++i) {
        // 如果当前气球的起始位置超过了当前箭的射程
        if (points[i][0] > current_end) {
            // 增加一支箭
            arrows++;
            current_end = points[i][1];
        }
    }

    return arrows;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function findMinArrowShots(points) {
    if (points.length === 0) return 0;
    
    // 按照气球的结束位置进行排序
    points.sort((a, b) => a[1] - b[1]);

    let arrows = 1;
    let current_end = points[0][1];
    
    for (let i = 1; i < points.length; i++) {
        // 如果当前气球的起始位置超过了当前箭的射程
        if (points[i][0] > current_end) {
            arrows++;
            current_end = points[i][1];
        }
    }

    return arrows;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int findMinArrowShots(int[][] points) {
        if (points.length == 0) return 0;
        
        // 按照气球的结束位置进行排序
        Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));

        int arrows = 1;
        int current_end = points[0][1];

        for (int i = 1; i < points.length; i++) {
            // 如果当前气球的起始位置超过了当前箭的射程
            if (points[i][0] > current_end) {
                arrows++;
                current_end = points[i][1];
            }
        }

        return arrows;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n \log n)$，因为对气球进行排序需要 $O(n \log n)$ 时间，而遍历气球的复杂度是 $O(n)$。  

空间复杂度：$O(1)$，如果不计排序所需的空间。这依赖于排序算法的实现，通常排序是原地进行的。
