---
sidebar_position: 1
tags:
  - dynamic-programming
---

# 动态规划介绍

动态规划（Dynamic Programming, DP）是一种在解决最优化问题和决策问题时常用的算法设计思想，特别适用于具有**重叠子问题**和**最优子结构**性质的问题。动态规划通过将复杂问题分解为更简单的子问题，并存储这些子问题的解，从而避免重复计算，极大地提高了解决问题的效率。

---

## 1. 动态规划的核心思想

1. **重叠子问题**（Overlapping Subproblems）
   - 问题可以被分解成许多子问题，这些子问题会重复出现。例如，计算斐波那契数列时，`fib(n)`需要求解`fib(n-1)`和`fib(n-2)`，这两个子问题可能会在其他路径中被多次求解。

2. **最优子结构**（Optimal Substructure）
   - 问题的最优解可以通过其子问题的最优解来构造。例如，最短路径问题中，路径`A -> B -> C`的最优解可以由路径`A -> B`和路径`B -> C`的最优解组成。

3. **状态转移方程**（State Transition Equation）
   - 状态转移方程是动态规划的核心，用来描述从一个状态如何转移到另一个状态。例如，背包问题中`dp[i][j] = max(dp[i-1][j], dp[i-1][j-w[i]] + v[i])`。

---

## 2. 动态规划的基本步骤

### 1. **定义状态**
   - 状态表示问题的某个子问题。通常用一个数组或矩阵来存储状态。
   - 例如：
     - 背包问题：`dp[i][j]`表示前`i`个物品在总容量为`j`的背包中的最大价值。
     - 最长公共子序列：`dp[i][j]`表示字符串`s1`的前`i`个字符和字符串`s2`的前`j`个字符的最长公共子序列长度。

### 2. **状态转移方程**
   - 用数学公式表示从一个状态如何转移到另一个状态。例如：
     - 斐波那契数列：`dp[n] = dp[n-1] + dp[n-2]`
     - 背包问题：`dp[i][j] = max(dp[i-1][j], dp[i-1][j-w[i]] + v[i])`

### 3. **初始状态和边界条件**
   - 指定问题的基础状态。例如：
     - 斐波那契数列：`dp[0] = 0, dp[1] = 1`
     - 背包问题：`dp[0][j] = 0`（没有物品时的最大价值为0）

### 4. **状态计算顺序**
   - 按照状态之间的依赖关系，从基础状态逐步计算出目标状态。例如，从小的子问题递推到大的子问题。

---

## 3. 动态规划的分类

### 3.1 一维动态规划

**适用场景**：当状态只依赖于前一个或几个状态时。

**例题**：斐波那契数列

```python
def fib(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[0], dp[1] = 0, 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]
```

**优化空间复杂度**：由于状态只依赖于前两个值，可以用滚动数组优化。

```python
def fib(n):
    if n <= 1:
        return n
    prev, curr = 0, 1
    for _ in range(2, n + 1):
        prev, curr = curr, prev + curr
    return curr
```

---

### 3.2 二维动态规划

**适用场景**：当状态由两个维度描述时，例如网格路径问题。

**例题**：路径计数问题（从左上角到右下角有多少条路径）

```python
def uniquePaths(m, n):
    dp = [[1] * n for _ in range(m)]
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    return dp[m - 1][n - 1]
```

**优化空间复杂度**：用一维数组表示当前行的状态。

```python
def uniquePaths(m, n):
    dp = [1] * n
    for i in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j - 1]
    return dp[-1]
```

---

### 3.3 背包问题

背包问题是动态规划中的经典问题，分为**0-1背包**和**完全背包**。

#### 0-1 背包问题

每种物品只能取一次。

**状态转移方程**：  
$$
dp[i][w] = \max(dp[i-1][w], dp[i-1][w-\text{weight}[i]] + \text{value}[i])
$$
**代码示例**：

```python
def knapsack(values, weights, capacity):
    n = len(values)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(1, capacity + 1):
            if weights[i - 1] <= w:
                dp[i][w] = max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1])
            else:
                dp[i][w] = dp[i - 1][w]
    return dp[n][capacity]
```

#### 完全背包问题

每种物品可以取多次。

**状态转移方程**：  
$$
dp[w] = \max(dp[w], dp[w-\text{weight}[i]] + \text{value}[i])
$$

**代码示例**：

```python
def unboundedKnapsack(values, weights, capacity):
    dp = [0] * (capacity + 1)
    for i in range(len(values)):
        for w in range(weights[i], capacity + 1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    return dp[capacity]
```

---

### 3.4 区间动态规划

**适用场景**：问题需要分割区间，寻找最优解。例如：回文分割、矩阵链乘积。

**例题**：矩阵链乘积问题

**状态转移方程**：  
$$
dp[i][j] = \min(dp[i][k] + dp[k+1][j] + \text{cost}(i, k, j))
$$
---

### 3.5 记忆化搜索（自顶向下动态规划）

动态规划也可以通过递归实现，称为记忆化搜索。它利用递归解决问题，但通过一个哈希表或数组存储已经计算过的状态。

**示例**：斐波那契数列

```python
def fib(n, memo={}):
    if n <= 1:
        return n
    if n not in memo:
        memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    return memo[n]
```

---

## 3. 动态规划的适用问题

- 最短路径问题（如 Dijkstra 和 Floyd 算法）
- 最长递增子序列
- 编辑距离（Levenshtein Distance）
- 股票买卖问题
- 网格路径问题
- 背包问题
- 子集和问题

---

## 4. 常见的动态规划优化技巧

1. **空间优化**
   - 如果当前状态只依赖于前几个状态，可以用滚动数组或直接覆盖来优化空间复杂度。
   - 例如，斐波那契数列可以将`O(n)`的空间优化为`O(1)`。

2. **记忆化搜索**
   - 使用递归加缓存的方式，避免重复计算。
   - 通常用于需要用递归描述的问题，但可以转化为自底向上的DP形式。

3. **状态压缩**
   - 用更少的空间存储状态，通常用于减少存储多维数组的开销。

---

## 5. 动态规划的练习建议

1. **入门题目**：
   - 爬楼梯问题
   - 斐波那契数列
   - 最小路径和
2. **中级题目**：
   - 背包问题
   - 最长递增子序列
   - 编辑距离
3. **高级题目**：
   - 戳气球
   - 区间调度问题
   - 最长回文子序列

通过练习逐步掌握动态规划的建模和优化技巧，能够有效提升 LeetCode 解题能力！