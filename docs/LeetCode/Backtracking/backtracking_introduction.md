---
sidebar_position: 0
---

# 回溯算法 介绍

回溯算法（Backtracking）是一种用于**搜索问题解空间**的算法，通常用于**组合、排列、子集、图算法、数独求解**等问题。其核心思想是**深度优先搜索（DFS）+ 剪枝**，在搜索过程中尝试所有可能的路径，并在遇到不符合条件的情况时回溯，避免不必要的计算。

---

## **回溯算法的基本框架**
回溯算法的核心是**递归**，通常包含以下三个部分：
1. **选择**：尝试选择一个可行的选项（状态）
2. **约束**：判断当前选择是否合法
3. **回溯**：如果当前选择不满足条件，则撤销该选择，回到上一步

回溯算法的一般框架如下：

```python
def backtrack(路径, 选择列表):
    if 满足结束条件:
        记录结果
        return
    
    for 选择 in 选择列表:
        做出选择
        backtrack(新的路径, 剩余选择)
        撤销选择  # 回溯
```

---

## **适用场景**
回溯算法适用于**暴力搜索所有解法**的问题，典型应用场景包括：
- **组合问题（Combination）**：从 n 个元素中选择 k 个元素的所有可能组合（如 `77. 组合`）。
- **排列问题（Permutation）**：n 个元素的所有排列方式（如 `46. 全排列`）。
- **子集问题（Subset）**：求所有可能的子集（如 `78. 子集`）。
- **字符串相关问题**：电话号码的字母组合、括号生成、单词搜索等（如 `17. 电话号码的字母组合`）。
- **数独求解**、**N 皇后问题**等。

---

## **LeetCode 经典题目**
### **1. 组合（LC 77）**
题目：给定两个整数 `n` 和 `k`，返回 `1...n` 组成的所有 `k` 个元素的组合。

**代码实现：**
```python
def combine(n: int, k: int) -> List[List[int]]:
    res = []
    
    def backtrack(start, path):
        if len(path) == k:
            res.append(path[:])
            return
        
        for i in range(start, n + 1):
            path.append(i)
            backtrack(i + 1, path)
            path.pop()  # 回溯

    backtrack(1, [])
    return res
```

---

### **2. 全排列（LC 46）**
题目：给定一个无重复元素的数组 `nums`，返回所有可能的全排列。

**代码实现：**
```python
def permute(nums: List[int]) -> List[List[int]]:
    res = []
    
    def backtrack(path, used):
        if len(path) == len(nums):
            res.append(path[:])
            return
        
        for i in range(len(nums)):
            if used[i]:  # 剪枝，避免重复使用元素
                continue
            used[i] = True
            path.append(nums[i])
            backtrack(path, used)
            path.pop()  # 回溯
            used[i] = False

    backtrack([], [False] * len(nums))
    return res
```

---

### **3. 子集（LC 78）**
题目：给定一个整数数组 `nums`，求所有的子集。

**代码实现：**
```python
def subsets(nums: List[int]) -> List[List[int]]:
    res = []
    
    def backtrack(start, path):
        res.append(path[:])  # 每个路径都是一个子集
        
        for i in range(start, len(nums)):
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()  # 回溯
    
    backtrack(0, [])
    return res
```

---

### **4. N 皇后（LC 51）**
题目：在 `N × N` 的棋盘上摆放 `N` 个皇后，使得它们不能相互攻击（不能在同一行、同一列、同一对角线）。

**代码实现：**
```python
def solveNQueens(n: int) -> List[List[str]]:
    res = []
    board = [["."] * n for _ in range(n)]
    
    def is_valid(row, col):
        for i in range(row):
            if board[i][col] == "Q":
                return False
            if col - (row - i) >= 0 and board[i][col - (row - i)] == "Q":
                return False
            if col + (row - i) < n and board[i][col + (row - i)] == "Q":
                return False
        return True
    
    def backtrack(row):
        if row == n:
            res.append(["".join(row) for row in board])
            return
        
        for col in range(n):
            if is_valid(row, col):
                board[row][col] = "Q"
                backtrack(row + 1)
                board[row][col] = "."  # 回溯

    backtrack(0)
    return res
```

---

## **优化：剪枝技巧**
回溯算法可能会遇到**指数级别的复杂度**，为了优化，我们可以：
1. **使用哈希表或布尔数组**来标记已使用的元素（如全排列问题）。
2. **提前终止不可能的分支**，减少不必要的计算（如 N 皇后问题）。
3. **使用 `start` 控制搜索范围**，避免重复组合（如组合问题）。

---

## **总结**
- **核心思想**：尝试所有可能的解，遇到不符合条件的情况就回溯。
- **适用问题**：
  - 组合（Combination）
  - 排列（Permutation）
  - 子集（Subset）
  - 经典问题（数独、N 皇后、括号生成）
- **优化手段**：
  - 剪枝（提前判断是否符合条件）
  - 记录状态（避免重复计算）
  - 约束搜索空间（减少不必要的搜索）

回溯算法虽然**时间复杂度较高**，但对于**搜索类问题**非常有用，是 LeetCode 中高频考察的算法之一！