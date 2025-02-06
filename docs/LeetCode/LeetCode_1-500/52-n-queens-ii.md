---
sidebar_position: 52
tags:
  - backtracking
  - Hard
---

# 52.N 皇后 II

标签: `backtracking`

难度: Hard

通过率: 75.5%

原题链接: https://leetcode.com/problems/n-queens-ii/description/

## 题目描述
n 皇后问题是指将 n 个皇后放置在 n x n 的棋盘上，使得任何两个皇后都不能相互攻击的问题。给定整数 n，返回 n 皇后问题不同的解决方案的数量。

## 解题思路
N 皇后问题是经典的回溯问题。在 n x n 的棋盘上放置 n 个皇后，并确保任何两个皇后都不在同一行、同一列和同一对角线上。我们可以通过递归和回溯的方法解决该问题。具体思路如下：  

1. 使用一个递归函数进行逐行放置皇后。
2. 在每次递归中尝试在当前行的每一列放置一个皇后。
3. 创建三个记录数组来存储列和两条对角线的状态：
   - `cols[i]`：表示第 i 列是否有皇后。
   - `d1[i + j]`：表示从左下到右上的对角线是否有皇后（因为对角线的索引范围为 [-n+1, 2n-1]，映射为 [0, 2n-1]）。
   - `d2[i - j + n - 1]`：表示从左上到右下的对角线是否有皇后。
4. 每当放置一个皇后时，更新这三个数组，然后递归地尝试在下一行放置皇后。
5. 如果在第 n 行成功放置了 n 个皇后，则找到一种有效解决方案，计数加一。
6. 如果探索完所有位置，回溯到前一行继续尝试其他位置。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def totalNQueens(n):
    def backtrack(row):
        # 使用 nonlocal 来修改外部作用域的变量 solutions
        nonlocal solutions
        if row == n:
            # 找到一组有效解决方案
            solutions += 1
            return
        for col in range(n):
            if cols[col] or d1[row + col] or d2[row - col + n - 1]:
                continue  # 如果该列或两个对角线已被皇后占据，跳过
            # 放置皇后
            cols[col] = d1[row + col] = d2[row - col + n - 1] = True
            backtrack(row + 1)
            # 移除皇后
            cols[col] = d1[row + col] = d2[row - col + n - 1] = False

    solutions = 0
    cols = [False] * n
    d1 = [False] * (2 * n - 1)
    d2 = [False] * (2 * n - 1)
    backtrack(0)
    return solutions

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int totalNQueens(int n) {
        // 初始化控制变量
        std::vector<bool> cols(n, false);
        std::vector<bool> d1(2 * n - 1, false);
        std::vector<bool> d2(2 * n - 1, false);
        return backtrack(0, n, cols, d1, d2);
    }
    
private:
    int backtrack(int row, int n, std::vector<bool>& cols, std::vector<bool>& d1, std::vector<bool>& d2) {
        if (row == n) {
            // 找到一种有效解决方案
            return 1;
        }
        int solutions = 0;
        for (int col = 0; col < n; ++col) {
            if (cols[col] || d1[row + col] || d2[row - col + n - 1]) 
                continue; // 跳过已被占据的位置
            // 放置皇后
            cols[col] = d1[row + col] = d2[row - col + n - 1] = true;
            solutions += backtrack(row + 1, n, cols, d1, d2);
            // 移除皇后
            cols[col] = d1[row + col] = d2[row - col + n - 1] = false;
        }
        return solutions;
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function totalNQueens(n) {
    let solutions = 0;
    const cols = Array(n).fill(false);
    const d1 = Array(2 * n - 1).fill(false);
    const d2 = Array(2 * n - 1).fill(false);

    function backtrack(row) {
        if (row === n) {
            solutions++;
            return;
        }
        for (let col = 0; col < n; col++) {
            if (cols[col] || d1[row + col] || d2[row - col + n - 1]) continue;
            cols[col] = d1[row + col] = d2[row - col + n - 1] = true;
            backtrack(row + 1);
            cols[col] = d1[row + col] = d2[row - col + n - 1] = false;
        }
    }

    backtrack(0);
    return solutions;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int totalNQueens(int n) {
        boolean[] cols = new boolean[n];
        boolean[] d1 = new boolean[2 * n - 1];
        boolean[] d2 = new boolean[2 * n - 1];
        return backtrack(0, n, cols, d1, d2);
    }

    private int backtrack(int row, int n, boolean[] cols, boolean[] d1, boolean[] d2) {
        if (row == n) {
            return 1;
        }
        int solutions = 0;
        for (int col = 0; col < n; col++) {
            if (cols[col] || d1[row + col] || d2[row - col + n - 1]) continue;
            cols[col] = d1[row + col] = d2[row - col + n - 1] = true;
            solutions += backtrack(row + 1, n, cols, d1, d2);
            cols[col] = d1[row + col] = d2[row - col + n - 1] = false;
        }
        return solutions;
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度**: $O(N!)$  
在最坏情况下，递归树可能会产生多达 $N!$ 个节点，每个节点进行 $O(1)$ 的操作。  

**空间复杂度**: $O(N)$  
需要 $O(N)$ 的空间来存储列和对角线的状态，以及递归调用栈的深度为 $N$。
