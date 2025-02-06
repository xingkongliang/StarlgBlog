---
sidebar_position: 74
tags:
  - array
  - binary-search
  - Medium
---

# 74.搜索二维矩阵

标签: `array`, `binary-search`

难度: Medium

通过率: 51.43%

原题链接: https://leetcode.com/problems/search-a-2d-matrix/description/

## 题目描述
你被给定一个 $m \times n$ 的二维整数矩阵，具有如下性质：

1. 每一行中的整数都按非递减顺序排列。
2. 每一行的第一个整数大于上一行的最后一个整数。

给定一个整数 $\text{target}$，如果 $\text{target}$ 存在于矩阵中，返回 `true`；否则，返回 `false`。

要求你的解决方案的时间复杂度应为 $O(\log(m \times n))$。

## 解题思路
对于一个 $m \times n$ 的二维矩阵，我们可以将其视为一个长度为 $m \times n$ 的一维有序数组。具体来说，第 $i$ 行第 $j$ 列的元素在一维数组中的索引为 $i \times n + j$。

因此，我们可以对矩阵使用二分搜索。搜索过程中：
1. 初始化两个指针 `left` 为 0，`right` 为 $m \times n - 1$。
2. 进行二分搜索：
   - 计算中间位置 `mid = (left + right) / 2`。
   - 根据 `mid` 计算其在矩阵中的行列坐标 `row = mid // n` 和 `col = mid % n`。
   - 比较 `matrix[row][col]` 与 `target` 的值：
     - 如果相等，返回 `true`。
     - 如果大于 `target`，则缩小右边界 `right` 为 `mid - 1`。
     - 否则，扩大左边界 `left` 为 `mid + 1`。
3. 如果搜索完毕仍未找到，返回 `false`。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def searchMatrix(matrix, target):
    # 获取矩阵的行数和列数
    m, n = len(matrix), len(matrix[0])
    left, right = 0, m * n - 1
    
    while left <= right:
        mid = (left + right) // 2
        # 将一维索引转换为二维索引
        row, col = divmod(mid, n)
        
        # 如果找到了目标值
        if matrix[row][col] == target:
            return True
        elif matrix[row][col] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return False
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int m = matrix.size();
        if (m == 0) return false;
        int n = matrix[0].size();
        int left = 0, right = m * n - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int row = mid / n, col = mid % n;
            
            if (matrix[row][col] == target) {
                return true;
            } else if (matrix[row][col] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return false;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function searchMatrix(matrix, target) {
    // 获取矩阵的行数和列数
    const m = matrix.length;
    const n = matrix[0].length;
    let left = 0, right = m * n - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const row = Math.floor(mid / n);
        const col = mid % n;
        
        if (matrix[row][col] === target) {
            return true;
        } else if (matrix[row][col] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return false;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int m = matrix.length;
        if (m == 0) return false;
        int n = matrix[0].length;
        int left = 0, right = m * n - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            int row = mid / n, col = mid % n;
            
            if (matrix[row][col] == target) {
                return true;
            } else if (matrix[row][col] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return false;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(\log(m \times n))$，其中$m \times n$是矩阵中的元素总数。
空间复杂度：$O(1)$。
