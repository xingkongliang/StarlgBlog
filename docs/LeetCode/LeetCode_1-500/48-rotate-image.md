---
sidebar_position: 48
tags:
  - array
  - math
  - Medium
---

# 48.旋转图像

标签: `array`, `math`

难度: Medium

通过率: 76.58%

原题链接: https://leetcode.com/problems/rotate-image/description/

## 题目描述
给定一个 $n \times n$ 的 2D 矩阵表示一个图像，将图像顺时针旋转 90 度。要求你必须在原地旋转图像，这意味着需要直接修改输入的 2D 矩阵。不要为旋转另辟其他 2D 矩阵。

## 解题思路
要在不使用额外存储的情况下顺时针旋转矩阵 90 度，可以分为两个步骤：

1. 将矩阵转置。即将矩阵的行和列交换。
2. 将矩阵的每一行进行反转（水平翻转）。

具体步骤如下：

- **转置矩阵**：遍历矩阵的上三角区（不包括对角线），对于每个元素 matrix[i][j]，与其对称的元素 matrix[j][i] 进行交换。

- **水平翻转每一行**：对于矩阵的每一行，利用双指针，首尾元素互换，直到中间。

通过这两个简单的步骤就可以实现矩阵的原地旋转。这是因为转置矩阵的作用是从左下到右上的对角线镜像翻转，而水平翻转相当于将得到的形状旋转了 90 度。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def rotate(matrix):
    # 获取矩阵的大小
    n = len(matrix)

    # 转置矩阵
    for i in range(n):
        for j in range(i + 1, n):
            # 交换 matrix[i][j] 和 matrix[j][i]
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]

    # 反转矩阵的每一行
    for i in range(n):
        matrix[i].reverse()
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        // 先转置矩阵
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                // 交换 matrix[i][j] 和 matrix[j][i]
                swap(matrix[i][j], matrix[j][i]);
            }
        }
        // 再反转每一行
        for (int i = 0; i < n; ++i) {
            reverse(matrix[i].begin(), matrix[i].end());
        }
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function rotate(matrix) {
    const n = matrix.length;
    // 转置矩阵
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            // 交换 matrix[i][j] 和 matrix[j][i]
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    // 反转每一行
    for (let i = 0; i < n; i++) {
        matrix[i].reverse();
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        // 转置矩阵
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // 交换 matrix[i][j] 和 matrix[j][i]
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        // 反转每一行
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n / 2; j++) {
                // 交换 matrix[i][j] 和 matrix[i][n-j-1]
                int temp = matrix[i][j];
                matrix[i][j] = matrix[i][n - j - 1];
                matrix[i][n - j - 1] = temp;
            }
        }
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n^2)$，因为需要遍历所有元素进行转置和翻转。`
空间复杂度：$O(1)$，因为这是就地算法，无需额外空间。
