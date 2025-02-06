---
sidebar_position: 96
tags:
  - dynamic-programming
  - tree
  - Medium
---

# 96.不同的二叉搜索树

标签: `dynamic-programming`, `tree`

难度: Medium

通过率: 61.89%

原题链接: https://leetcode.com/problems/unique-binary-search-trees/description/

## 题目描述
给定一个整数 $n$，返回具有 $n$ 个节点的唯一值二叉搜索树的数量，这些节点的值从 1 到 $n$。

## 解题思路
要解决这个问题，我们可以使用动态规划。设 $G(n)$ 表示有 $n$ 个不同节点可以组成的不同二叉搜索树的数量。我们尝试把每一个节点作为根节点，假设我们选择 $i$ 作为根节点：

- 左子树的节点来自 $1$ 到 $i-1$，即有 $i-1$ 个节点。
- 右子树的节点来自 $i+1$ 到 $n$，即有 $n-i$ 个节点。

因此，
$$ G(i-1) \text{ 是 } i-1 \text{ 个节点组成的二叉搜索树的个数} $$
$$ G(n-i) \text{ 是 } n-i \text{ 个节点组成的二叉搜索树的个数} $$

所以，对于固定的根 $i$，能够组成的二叉搜索树的数量为 $G(i-1) \times G(n-i)$。

通过对所有的可能根节点求和，有：
$$ G(n) = \sum_{i=1}^{n} G(i-1) \times G(n-i) $$

而边界条件是 $G(0)=1$，因为空树也是一种二叉搜索树。

因此，利用上述公式，我们可以从 $G(0)$ 开始递归计算直到 $G(n)$。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def numTrees(n):
    # 创建一个数组来存储所有 G(i) 的值
    G = [0] * (n + 1)
    # 边界条件
    G[0], G[1] = 1, 1
    # 从 2 到 n 开始动态规划计算
    for i in range(2, n + 1):
        for j in range(1, i + 1):
            G[i] += G[j - 1] * G[i - j]
    return G[n]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int numTrees(int n) {
        vector<int> G(n + 1, 0);
        G[0] = G[1] = 1;
        for (int i = 2; i <= n; ++i) {
            for (int j = 1; j <= i; ++j) {
                G[i] += G[j - 1] * G[i - j];
            }
        }
        return G[n];
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function numTrees(n) {
    // 创建一个数组来存储所有 G(i) 的值
    const G = new Array(n + 1).fill(0);
    // 边界条件
    G[0] = G[1] = 1;
    // 从 2 到 n 开始动态规划计算
    for (let i = 2; i <= n; i++) {
        for (let j = 1; j <= i; j++) {
            G[i] += G[j - 1] * G[i - j];
        }
    }
    return G[n];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int numTrees(int n) {
        int[] G = new int[n + 1];
        G[0] = G[1] = 1;
        for (int i = 2; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                G[i] += G[j - 1] * G[i - j];
            }
        }
        return G[n];
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n^2)$，因为有两个嵌套的循环，每个循环迭代 $n$ 次。`
空间复杂度：$O(n)$，因为我们使用了一个大小为 $n+1$ 的数组。
