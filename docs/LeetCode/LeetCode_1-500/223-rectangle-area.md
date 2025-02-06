---
sidebar_position: 223
tags:
  - math
  - array
  - Medium
---

# 223.矩形面积

标签: `math`, `array`

难度: Medium

通过率: 46.95%

原题链接: https://leetcode.com/problems/rectangle-area/description/

## 题目描述
给定二维平面上两个直角的矩形的坐标，返回这两个矩形覆盖的总面积。第一个矩形定义为其左下角(ax1, ay1)和右上角(ax2, ay2)。第二个矩形定义为其左下角(bx1, by1)和右上角(bx2, by2)。

## 解题思路
要计算两个矩形覆盖的总面积，我们可以遵循以下步骤：

1. **计算每个矩形的面积**：
   - 第一个矩形的宽度为 $ax2 - ax1$，高度为 $ay2 - ay1$，所以面积为 $(ax2 - ax1) \times (ay2 - ay1)$。
   - 第二个矩形的宽度为 $bx2 - bx1$，高度为 $by2 - by1$，所以面积为 $(bx2 - bx1) \times (by2 - by1)$。

2. **计算重叠矩形的面积**：
   - 如果两个矩形重叠，我们需要确定重叠矩形的边界。
   - **重叠的宽度**：计算两个矩形 x 方向上重叠的范围，重叠部分的左边界是 $\max(ax1, bx1)$，右边界是 $\min(ax2, bx2)$，宽度就是 $\text{max}(0, \text{min}(ax2, bx2) - \text{max}(ax1, bx1))$。
   - **重叠的高度**：计算两个矩形 y 方向上重叠的范围，高度就是 $\text{max}(0, \text{min}(ay2, by2) - \text{max}(ay1, by1))$。
   - 如果宽度和高度均为非负，则重叠面积为这两个值的乘积。

3. **计算总面积**：两个矩形的总面积即为两个单独矩形面积之和减去重叠部分的面积。

这种方法可以确保即使矩形完全重叠、部分重叠或者不重叠，结果都能正确计算。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def compute_area(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2):
    # 计算第一个矩形的面积
    area1 = (ax2 - ax1) * (ay2 - ay1)
    # 计算第二个矩形的面积
    area2 = (bx2 - bx1) * (by2 - by1)
    
    # 计算重叠部分的宽度和高度
    overlap_width = max(0, min(ax2, bx2) - max(ax1, bx1))
    overlap_height = max(0, min(ay2, by2) - max(ay1, by1))
    
    # 计算重叠部分的面积
    overlap_area = overlap_width * overlap_height
    
    # 求总覆盖面积，这些是两个矩形的面积减去重叠的面积
    total_area = area1 + area2 - overlap_area
    
    return total_area
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int computeArea(int ax1, int ay1, int ax2, int ay2, int bx1, int by1, int bx2, int by2) {
    // 计算两个矩形的面积
    int area1 = (ax2 - ax1) * (ay2 - ay1);
    int area2 = (bx2 - bx1) * (by2 - by1);

    // 计算重叠部分的宽度和高度
    int overlapWidth = std::max(0, std::min(ax2, bx2) - std::max(ax1, bx1));
    int overlapHeight = std::max(0, std::min(ay2, by2) - std::max(ay1, by1));

    // 重叠部分的面积
    int overlapArea = overlapWidth * overlapHeight;

    // 总覆盖面积
    return area1 + area2 - overlapArea;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function computeArea(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
    // 计算每个矩形的面积
    const area1 = (ax2 - ax1) * (ay2 - ay1);
    const area2 = (bx2 - bx1) * (by2 - by1);
    
    // 计算重叠部分的宽度和高度
    const overlapWidth = Math.max(0, Math.min(ax2, bx2) - Math.max(ax1, bx1));
    const overlapHeight = Math.max(0, Math.min(ay2, by2) - Math.max(ay1, by1));
    
    // 重叠面积
    const overlapArea = overlapWidth * overlapHeight;
    
    // 总面积
    return area1 + area2 - overlapArea;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int computeArea(int ax1, int ay1, int ax2, int ay2, int bx1, int by1, int bx2, int by2) {
        // 计算每个矩形的面积
        int area1 = (ax2 - ax1) * (ay2 - ay1);
        int area2 = (bx2 - bx1) * (by2 - by1);

        // 计算重叠部分的宽和高
        int overlapWidth = Math.max(0, Math.min(ax2, bx2) - Math.max(ax1, bx1));
        int overlapHeight = Math.max(0, Math.min(ay2, by2) - Math.max(ay1, by1));

        // 计算重叠部分的面积
        int overlapArea = overlapWidth * overlapHeight;

        // 返回总覆盖面积
        return area1 + area2 - overlapArea;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(1)$，因为该算法在常数时间内计算出结果。  
  
空间复杂度为 $O(1)$，因为没有使用与输入规模相关的额外空间。
