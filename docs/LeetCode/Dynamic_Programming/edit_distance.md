---
sidebar_position: 2
tags:
  - dynamic-programming
---
# 编辑距离问题

## 问题描述

LeetCode 72 的问题是关于**编辑距离**（Edit Distance）。给定两个字符串 `word1` 和 `word2`，你需要找到将 `word1` 转换为 `word2` 所使用的最少操作数。允许的操作有：
1. 插入一个字符
2. 删除一个字符
3. 替换一个字符

---

## 解题思路

这个问题可以使用动态规划（Dynamic Programming, DP）解决。以下是具体的步骤和思路：

### 1. 状态定义

我们定义一个二维数组 `dp`，其中 `dp[i][j]` 表示将字符串 `word1` 的前 `i` 个字符转换为 `word2` 的前 `j` 个字符所需的最少操作数。

### 2. 转移方程

有三种基本操作可以将 `word1` 转换为 `word2`：

1. **插入操作**：
   如果我们在 `word1` 的末尾插入一个字符，使其等于 `word2` 的第 `j` 个字符，那么：
   $$
   dp[i][j] = dp[i][j-1] + 1
   $$

2. **删除操作**：
   如果我们删除 `word1` 的第 `i` 个字符，使其更接近 `word2`，那么：
   $$
   dp[i][j] = dp[i-1][j] + 1
   $$

3. **替换操作**：
   如果我们将 `word1` 的第 `i` 个字符替换为 `word2` 的第 `j` 个字符，那么：
   $$
   dp[i][j] = dp[i-1][j-1] + 1
   $$

   如果 `word1[i-1] == word2[j-1]`（注意索引偏移），说明这两个字符已经相等，不需要替换：
   $$
   dp[i][j] = dp[i-1][j-1]
   $$

综上，状态转移方程为：
$$
dp[i][j] = \min(dp[i-1][j] + 1, \, dp[i][j-1] + 1, \, dp[i-1][j-1] + \text{cost})
$$
其中：
$$
\text{cost} = 
\begin{cases} 
0, & \text{if } word1[i-1] = word2[j-1] \\
1, & \text{if } word1[i-1] \neq word2[j-1]
\end{cases}
$$

### 3. 初始化

- `dp[0][j]` 表示将空字符串转换为 `word2` 的前 `j` 个字符，需要进行 `j` 次插入操作，因此：
  $$
  dp[0][j] = j
  $$
- `dp[i][0]` 表示将 `word1` 的前 `i` 个字符转换为空字符串，需要进行 `i` 次删除操作，因此：
  $$
  dp[i][0] = i
  $$

### 4. 最终答案

最终答案就是 `dp[m][n]`，其中 `m` 和 `n` 分别是 `word1` 和 `word2` 的长度。

---

## Python 实现代

### 递归 代码实现

以下是 Python 的递归解法：

```python
def minDistance(word1: str, word2: str) -> int:
    def helper(i, j):
        # 递归终止条件
        if i == 0: return j  # word1 为空，需要插入 j 次
        if j == 0: return i  # word2 为空，需要删除 i 次
        
        # 如果字符相等，继续比较前面的字符
        if word1[i - 1] == word2[j - 1]:
            return helper(i - 1, j - 1)
        
        # 如果字符不相等，计算插入、删除和替换的最小值
        return min(
            helper(i - 1, j),    # 删除
            helper(i, j - 1),    # 插入
            helper(i - 1, j - 1) # 替换
        ) + 1

    # 开始递归
    return helper(len(word1), len(word2))
```

---

#### 示例讲解

假设 $ word1 = "horse", word2 = "ros" $，递归过程如下：

1. 比较 $ helper(5, 3) $：
   - $ word1[4] = 'e' $，$ word2[2] = 's' $，不相等。
   - 递归拆解成插入、删除和替换的子问题：
     - 插入：$ helper(5, 2) + 1 $
     - 删除：$ helper(4, 3) + 1 $
     - 替换：$ helper(4, 2) + 1 $
     
2. 继续递归，最终通过逐步计算返回结果。

---

#### 时间复杂度与优化

#### 1. 时间复杂度（未优化）
由于递归中存在大量重复计算（例如多次计算 $ helper(i-1, j-1) $），时间复杂度为指数级：($O(3^{\min(m, n)})$) 。

#### 2. 优化：记忆化递归
为避免重复计算，我们可以使用 **记忆化递归**（即将中间结果存储在字典或数组中）。


### 记忆化递归 代码实现

```python
def minDistance(word1: str, word2: str) -> int:
    memo = {}
    
    def helper(i, j):
        # 如果已经计算过，直接返回结果
        if (i, j) in memo:
            return memo[(i, j)]
        
        # 递归终止条件
        if i == 0: return j
        if j == 0: return i
        
        # 如果字符相等
        if word1[i - 1] == word2[j - 1]:
            memo[(i, j)] = helper(i - 1, j - 1)
        else:
            # 插入、删除、替换的最小值
            memo[(i, j)] = min(
                helper(i - 1, j), 
                helper(i, j - 1), 
                helper(i - 1, j - 1)
            ) + 1
        
        return memo[(i, j)]
    
    # 开始递归
    return helper(len(word1), len(word2))
```

---

#### 小结

1. **递归：** 简单直观，但效率较低。
2. **记忆化递归：** 通过缓存中间结果避免重复计算，时间复杂度优化为 $ O(m \times n) $，空间复杂度为 $ O(m \times n) $。
3. 对于小规模输入，递归解法易于实现和理解；但对于大规模输入，记忆化递归或动态规划解法更优。

###  DP表 代码实现

```python
def minDistance(word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    # 创建 DP 表，大小为 (m+1) x (n+1)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # 初始化
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j

    # 填充 DP 表
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                # 如果当前字符相等，不需要额外操作
                dp[i][j] = dp[i - 1][j - 1]
            else:
                # 插入、删除、替换三者取最小值
                dp[i][j] = min(
                    dp[i - 1][j] + 1,    # 删除
                    dp[i][j - 1] + 1,    # 插入
                    dp[i - 1][j - 1] + 1 # 替换
                )

    return dp[m][n]
```

---

#### 复杂度分析

1. **时间复杂度**：
   动态规划的状态转移需要遍历整个 `dp` 表，每个状态的计算复杂度为 $O(1)$。因此时间复杂度为：$O(m \times n)$

2. **空间复杂度**：
   如果直接使用二维数组存储 `dp` 值，空间复杂度为 $O(m \times n)$。如果使用滚动数组优化，空间复杂度可以降到 $O(\min(m, n))$。

---

### 滚动数组优化版本

如果你希望进一步优化空间复杂度，可以使用滚动数组来存储前一行的状态值：

```python
def minDistance(word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    # 使用滚动数组，只存储前一行
    prev = list(range(n + 1))
    curr = [0] * (n + 1)

    for i in range(1, m + 1):
        curr[0] = i  # 初始化当前行的第一列
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                curr[j] = prev[j - 1]
            else:
                curr[j] = min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + 1)
        prev, curr = curr, prev

    return prev[n]
```
