---
sidebar_position: 304
tags:
  - array
  - dynamic-programming
  - Medium
---

# 304.二维区域和检索 - 矩阵不可变

标签: `array`, `dynamic-programming`

难度: Medium

通过率: 55.6%

原题链接: https://leetcode.com/problems/range-sum-query-2d-immutable/description/

## 题目描述
给定一个二维矩阵 `matrix`，处理多个类型的查询：计算由其左上角 `(row1, col1)` 和右下角 `(row2, col2)` 定义的矩形区域内的元素总和。需要设计一个算法，使得 `sumRegion` 函数在 $O(1)$ 时间复杂度内完成。

## 解题思路
为了实现 `sumRegion` 可以在 $O(1)$ 时间内计算区域和，我们可以利用一个前缀和矩阵 `preSum`。对于给定的二维矩阵 `matrix`，定义 `preSum[i][j]` 表示从 `(0,0)` 到 `(i,j)` 这个子矩阵内的所有元素之和。计算 `preSum` 满足以下公式：

$$
presum[i][j] = matrix[i][j] + (presum[i-1][j] \text{ if } i > 0 \text{ else } 0) + (presum[i][j-1] \text{ if } j > 0 \text{ else } 0) - (presum[i-1][j-1] \text{ if } i > 0 \text{ and } j > 0 \text{ else } 0)
$$

一旦完成前缀和矩阵的计算，每次查询由 `(row1, col1)` 到 `(row2, col2)` 的区域和可以通过以下公式计算：

$$
sumRegion(row1, col1, row2, col2) = presum[row2][col2] - (presum[row1-1][col2] \text{ if } row1 > 0 \text{ else } 0) - (presum[row2][col1-1] \text{ if } col1 > 0 \text{ else } 0) + (presum[row1-1][col1-1] \text{ if } row1 > 0 \text{ and } col1 > 0 \text{ else } 0)
$$

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class NumMatrix:
    def __init__(self, matrix: List[List[int]]):
        if not matrix or not matrix[0]:
            return
        rows, cols = len(matrix), len(matrix[0])
        self.preSum = [[0] * (cols + 1) for _ in range(rows + 1)]
        # 计算前缀和
        for i in range(1, rows + 1):
            for j in range(1, cols + 1):
                self.preSum[i][j] = matrix[i-1][j-1] \
                                    + self.preSum[i-1][j] \
                                    + self.preSum[i][j-1] \
                                    - self.preSum[i-1][j-1]

    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        # 使用前缀和公式来计算区域和
        return self.preSum[row2+1][col2+1] \
               - self.preSum[row1][col2+1] \
               - self.preSum[row2+1][col1] \
               + self.preSum[row1][col1]

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class NumMatrix {
public:
    NumMatrix(vector<vector<int>>& matrix) {
        int rows = matrix.size();
        if (rows == 0) return;
        int cols = matrix[0].size();
        preSum = vector<vector<int>>(rows + 1, vector<int>(cols + 1, 0));
        for (int i = 1; i <= rows; ++i) {
            for (int j = 1; j <= cols; ++j) {
                preSum[i][j] = matrix[i-1][j-1]
                               + preSum[i-1][j]
                               + preSum[i][j-1]
                               - preSum[i-1][j-1];
            }
        }
    }

    int sumRegion(int row1, int col1, int row2, int col2) {
        return preSum[row2+1][col2+1]
               - preSum[row1][col2+1]
               - preSum[row2+1][col1]
               + preSum[row1][col1];
    }

private:
    vector<vector<int>> preSum;
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class NumMatrix {
    constructor(matrix) {
        const rows = matrix.length;
        if (rows === 0) return;
        const cols = matrix[0].length;
        this.preSum = Array.from({ length: rows + 1 }, () => Array(cols + 1).fill(0));
        for (let i = 1; i <= rows; i++) {
            for (let j = 1; j <= cols; j++) {
                this.preSum[i][j] = matrix[i-1][j-1] 
                                    + this.preSum[i-1][j] 
                                    + this.preSum[i][j-1] 
                                    - this.preSum[i-1][j-1];
            }
        }
    }
    sumRegion(row1, col1, row2, col2) {
        return this.preSum[row2+1][col2+1]
             - this.preSum[row1][col2+1]
             - this.preSum[row2+1][col1]
             + this.preSum[row1][col1];
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class NumMatrix {
    private int[][] preSum;
    public NumMatrix(int[][] matrix) {
        int rows = matrix.length;
        if (rows == 0) return;
        int cols = matrix[0].length;
        preSum = new int[rows + 1][cols + 1];
        for (int i = 1; i <= rows; i++) {
            for (int j = 1; j <= cols; j++) {
                preSum[i][j] = matrix[i-1][j-1] 
                              + preSum[i-1][j] 
                              + preSum[i][j-1] 
                              - preSum[i-1][j-1];
            }
        }
    }
    public int sumRegion(int row1, int col1, int row2, int col2) {
        return preSum[row2+1][col2+1]
             - preSum[row1][col2+1]
             - preSum[row2+1][col1]
             + preSum[row1][col1];
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
预处理时，计算前缀和矩阵的时间复杂度为 $O(m \times n)$，其中 $m$ 和 $n$ 分别是矩阵的行数和列数。`sumRegion` 函数的时间复杂度为 $O(1)$。  
  
空间复杂度为 $O(m \times n)$，因为使用了额外的前缀和矩阵来存储累计和。
