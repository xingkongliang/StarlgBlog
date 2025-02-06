---
sidebar_position: 391
tags:
  - array
  - math
  - hash-table
  - Hard
---

# 391.完美矩形

标签: `array`, `math`, `hash-table`

难度: Hard

通过率: 34.41%

原题链接: https://leetcode.com/problems/perfect-rectangle/description/

## 题目描述
给定一个二维数组 `rectangles`，其中 `rectangles[i] = [xi, yi, ai, bi]` 表示一个轴对齐矩形，矩形的左下角为 $(xi, yi)$，右上角为 $(ai, bi)$。返回是否可以将所有的矩形精确地拼接成一个长方形区域。

## 解题思路
解决此问题的关键在于检测出所有矩形能否完全覆盖一个无缝的长方形，并且它们不能重叠或有空隙。具体来说，需要检查以下几个条件：

1. 总面积：首先需要求出所有小矩形之和，它应该等于所形成的大矩形的面积。
2. 顶点的独特性：
   - 所有小矩形的四个顶点依次为左下、左上、右下、右上。如果它们能完全构成一个完美的以下情况，最终的长方形只会有四个角点，其余点的出现应成对出现。
   - 通过哈希表记录每个顶点出现的次数，每个内角出现的次数必须是偶数，只有四个角点出现奇数次。
3. 计算全局大矩形的四个边界：计算所有矩形联合后的左下角和右上角，确保所有小矩形面积之和等于边界形成的大矩形面积。

综合以上，我们可以通过面积验证和顶点统计来判断是否能拼接成一个完美矩形。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def isRectangleCover(rectangles):
    # 使用一个集合来跟踪每个顶点出现的次数
    point_set = set()
    # 计算总的面积
    area = 0
    # 初始化边界
    min_x = float('inf')
    min_y = float('inf')
    max_x = float('-inf')
    max_y = float('-inf')
    
    for x1, y1, x2, y2 in rectangles:
        # 计算当前矩形的面积
        area += (x2 - x1) * (y2 - y1)
        # 更新边界
        min_x = min(min_x, x1)
        min_y = min(min_y, y1)
        max_x = max(max_x, x2)
        max_y = max(max_y, y2)
        
        # 更新点集合
        for point in [(x1, y1), (x1, y2), (x2, y1), (x2, y2)]:
            if point in point_set:
                point_set.remove(point)
            else:
                point_set.add(point)
    
    # 总的完美矩形面积
    total_area = (max_x - min_x) * (max_y - min_y)
    
    # 检查面积匹配和顶点数量
    if area != total_area or len(point_set) != 4 or \
       (min_x, min_y) not in point_set or (min_x, max_y) not in point_set or \
       (max_x, min_y) not in point_set or (max_x, max_y) not in point_set:
        return False
    
    return True

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    bool isRectangleCover(vector<vector<int>>& rectangles) {
        unordered_set<string> pointSet;
        int area = 0;
        int minX = INT_MAX, minY = INT_MAX, maxX = INT_MIN, maxY = INT_MIN;

        for (const auto& rect : rectangles) {
            int x1 = rect[0], y1 = rect[1], x2 = rect[2], y2 = rect[3];
            area += (x2 - x1) * (y2 - y1);

            // Update bounds
            minX = min(minX, x1);
            minY = min(minY, y1);
            maxX = max(maxX, x2);
            maxY = max(maxY, y2);

            vector<string> points = { 
                to_string(x1) + " " + to_string(y1), 
                to_string(x1) + " " + to_string(y2),
                to_string(x2) + " " + to_string(y1),
                to_string(x2) + " " + to_string(y2)
            };

            // Update point set 
            for (const auto &p : points) {
                if (pointSet.count(p)) {
                    pointSet.erase(p);
                } else {
                    pointSet.insert(p);
                }
            }
        }

        int totalArea = (maxX - minX) * (maxY - minY);
        if (area != totalArea || pointSet.size() != 4 ||
            !pointSet.count(to_string(minX) + " " + to_string(minY)) ||
            !pointSet.count(to_string(minX) + " " + to_string(maxY)) ||
            !pointSet.count(to_string(maxX) + " " + to_string(minY)) ||
            !pointSet.count(to_string(maxX) + " " + to_string(maxY))) {
            return false;
        }

        return true;
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function isRectangleCover(rectangles) {
    const pointSet = new Set();
    let area = 0;
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    for (const [x1, y1, x2, y2] of rectangles) {
        area += (x2 - x1) * (y2 - y1);
        minX = Math.min(minX, x1);
        minY = Math.min(minY, y1);
        maxX = Math.max(maxX, x2);
        maxY = Math.max(maxY, y2);

        const points = [
            `${x1},${y1}`,
            `${x1},${y2}`,
            `${x2},${y1}`,
            `${x2},${y2}`
        ];

        points.forEach(point => {
            if (pointSet.has(point)) {
                pointSet.delete(point);
            } else {
                pointSet.add(point);
            }
        });
    }

    const totalArea = (maxX - minX) * (maxY - minY);
    if (area !== totalArea || pointSet.size !== 4 ||
        !pointSet.has(`${minX},${minY}`) ||
        !pointSet.has(`${minX},${maxY}`) ||
        !pointSet.has(`${maxX},${minY}`) ||
        !pointSet.has(`${maxX},${maxY}`)) {
        return false;
    }

    return true;
}

```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public boolean isRectangleCover(int[][] rectangles) {
        HashSet<String> pointSet = new HashSet<>();
        int area = 0;
        int minX = Integer.MAX_VALUE, minY = Integer.MAX_VALUE;
        int maxX = Integer.MIN_VALUE, maxY = Integer.MIN_VALUE;

        for (int[] rect : rectangles) {
            int x1 = rect[0], y1 = rect[1], x2 = rect[2], y2 = rect[3];
            area += (x2 - x1) * (y2 - y1);
            minX = Math.min(minX, x1);
            minY = Math.min(minY, y1);
            maxX = Math.max(maxX, x2);
            maxY = Math.max(maxY, y2);

            String[] points = {
                x1 + " " + y1,
                x1 + " " + y2,
                x2 + " " + y1,
                x2 + " " + y2
            };

            for (String point : points) {
                if (pointSet.contains(point)) {
                    pointSet.remove(point);
                } else {
                    pointSet.add(point);
                }
            }
        }

        int totalArea = (maxX - minX) * (maxY - minY);
        if (area != totalArea || pointSet.size() != 4 ||
            !pointSet.contains(minX + " " + minY) ||
            !pointSet.contains(minX + " " + maxY) ||
            !pointSet.contains(maxX + " " + minY) ||
            !pointSet.contains(maxX + " " + maxY)) {
            return false;
        }

        return true;
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是输入矩形数组的长度，因为我们需遍历所有矩形以计算面积并更新顶点记录。  
  
空间复杂度：$O(m)$，其中 $m$ 是矩形顶点的数量。在最坏情况下，每个矩形贡献四个不同的顶点。
