---
sidebar_position: 378
tags:
  - array
  - binary-search
  - heap
  - Medium
---

# 378.有序矩阵中的第 K 小元素

标签: `array`, `binary-search`, `heap`

难度: Medium

通过率: 63.02%

原题链接: https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/description/

## 题目描述
给定一个 $n \times n$ 的矩阵，其中每一行和每一列都按照升序排序。返回矩阵中的第 $k$ 小的元素。注意，这个元素是排序顺序中的第 $k$ 小，而不是第 $k$ 个不同的元素。

## 解题思路
为了找出矩阵中的第 $k$ 小元素，我们可以使用两种方法：小顶堆（优先队列）和二分查找。这里介绍使用二分查找的方法，因为它内存占用较小。

二分查找方法的思路如下：
1. 设定二分查找的左右边界，最左边（最小值）为矩阵的左上角，即 matrix[0][0]，最右边（最大值）为矩阵的右下角，即 matrix[n-1][n-1]。
2. 进行二分查找：在每次查找中，计算中间值 mid。
3. 使用一个辅助函数计算矩阵中小于等于 mid 的元素个数 cnt。如果 cnt 小于 k，说明第 k 小的元素在右半部分，移动左边界，否则移动右边界。
4. 当左右边界相遇时，左边界或者右边界就是第 k 小的元素值。

这种方法利用了矩阵的行列有序性，可以通过每次参考矩阵中的某个值，逐步缩小搜索范围，最终找到第 k 小的值。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# 使用二分查找解决问题
# 输入矩阵为 n x n 的二维数组 matrix，整数 k
# 输出矩阵中第 k 小的元素值
def kthSmallest(matrix, k):
    n = len(matrix)
    
    # 定义二分查找的左右边界
    left, right = matrix[0][0], matrix[-1][-1]
    
    while left < right:
        mid = left + (right - left) // 2
        
        # 计算不大于 mid 的元素个数
        count = 0
        j = n - 1
        for i in range(n):
            while j >= 0 and matrix[i][j] > mid:
                j -= 1
            count += (j + 1)
        
        # 根据 count 和 k 的关系调整左右边界
        if count < k:
            left = mid + 1
        else:
            right = mid
    
    return left
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// 使用二分查找解决问题
// 输入矩阵为 n x n 的二维数组 matrix，整数 k
// 输出矩阵中第 k 小的元素值
class Solution {
public:
    int kthSmallest(vector<vector<int>>& matrix, int k) {
        int n = matrix.size();
        
        // 定义二分查找的左右边界
        int left = matrix[0][0], right = matrix[n-1][n-1];
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            // 计算不大于 mid 的元素个数
            int count = 0;
            int j = n - 1;
            for (int i = 0; i < n; ++i) {
                while (j >= 0 && matrix[i][j] > mid) {
                    --j;
                }
                count += (j + 1);
            }
            
            // 根据 count 和 k 的关系调整左右边界
            if (count < k) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        return left;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// 使用二分查找解决问题
// 输入矩阵为 n x n 的二维数组 matrix，整数 k
// 输出矩阵中第 k 小的元素值
var kthSmallest = function(matrix, k) {
    var n = matrix.length;
    
    // 定义二分查找的左右边界
    var left = matrix[0][0], right = matrix[n-1][n-1];
    
    while (left < right) {
        var mid = left + Math.floor((right - left) / 2);
        
        // 计算不大于 mid 的元素个数
        var count = 0;
        var j = n - 1;
        for (var i = 0; i < n; i++) {
            while (j >= 0 && matrix[i][j] > mid) {
                j--;
            }
            count += (j + 1);
        }
        
        // 根据 count 和 k 的关系调整左右边界
        if (count < k) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
// 使用二分查找解决问题
// 输入矩阵为 n x n 的二维数组 matrix，整数 k
// 输出矩阵中第 k 小的元素值
class Solution {
    public int kthSmallest(int[][] matrix, int k) {
        int n = matrix.length;
        
        // 定义二分查找的左右边界
        int left = matrix[0][0], right = matrix[n-1][n-1];
        
        while (left < right) {
            int mid = left + (right - left) / 2;
            
            // 计算不大于 mid 的元素个数
            int count = 0;
            int j = n - 1;
            for (int i = 0; i < n; ++i) {
                while (j >= 0 && matrix[i][j] > mid) {
                    --j;
                }
                count += (j + 1);
            }
            
            // 根据 count 和 k 的关系调整左右边界
            if (count < k) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        return left;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：二分查找的次数为 $\log(r-l)$，在每次二分查找中需要花费 $O(n)$ 的时间去统计不大于 mid 的元素个数，总时间复杂度为 $O(n\log(max_{ij}-min_{ij}))$。


空间复杂度：由于使用的是二分查找和常量级的辅助变量，因此空间复杂度为 $O(1)$。
