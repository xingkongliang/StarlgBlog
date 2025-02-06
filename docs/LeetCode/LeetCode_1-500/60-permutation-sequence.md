---
sidebar_position: 60
tags:
  - math
  - backtracking
  - Hard
---

# 60.排列序列

标签: `math`, `backtracking`

难度: Hard

通过率: 48.63%

原题链接: https://leetcode.com/problems/permutation-sequence/description/

## 题目描述
给定一个包含 [1, 2, 3, ..., n] 的集合，该集合包含总共 $n!$ 个唯一的全排列。通过按顺序列出所有排列，我们得到以下序列对于 $n = 3$:\` "123" "132" "213" "231" "312" "321" \` 给定 $n$ 和 $k$，返回第 $k$ 个排列序列。

## 解题思路
要找到第 $k$ 个排列，可以利用排列的性质。每个位置的元素会每 $(n-1)!$ 次循环一次。例如，对于 $n=4$ 和 $k=9$，我们首先确定第一个位置上的元素。因为有 $3! = 6$ 个排列以 `1` 开始，$3! = 6$ 个排列以 `2` 开始，从而得知第一个数字是 `2`。

然后，我们在剩下的 `[1, 3, 4]` 找到第 $(k - (a-1)!)$ 个排列，其中 $a$ 是第一个位置元素，继续这个过程直到找完所有数字。实现步骤如下：

1. 创建一个整数数组 `numbers` 初始化为 `[1,2,...,n]`。
2. 减小 $k$ 的值 $1$ ，因为索引是从 0 开始。
3. 初始化一个空字符串 `permutation` 来存储结果排列。
4. 计算每个位置的阶乘以便找出元素。
5. 通过计算整数除法获得每个位置的元素，并更新 $k$ 的值。
6. 从 `numbers` 数组中删除已经使用的元素。
7. 返回最终的排列序列。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def getPermutation(n, k):
    # 创建用于储存1到n的数字
    numbers = list(range(1, n + 1))
    # 创建用于储存阶乘的数组
    factorial = [1] * n
    # 计算每个位置的阶乘值
    for i in range(1, n):
        factorial[i] = factorial[i - 1] * i

    # 将k转换成0索引化
    k -= 1
    # 准备用于存储排列的字符串
    permutation = []

    for i in range(n, 0, -1):
        # 找到这个位置的索引
        index = k // factorial[i - 1]
        # 将相应数字追加到排列中
        permutation.append(str(numbers[index]))
        # 移除使用过的数字
        numbers.pop(index)
        # 更新k的值
        k %= factorial[i - 1]

    return ''.join(permutation)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
std::string getPermutation(int n, int k) {
    // 创建一个存储1到n的字符数组
    std::vector<int> numbers;
    std::vector<int> factorial(n, 1);
    
    for (int i = 1; i <= n; i++) {
        numbers.push_back(i);
    }
    // 计算阶乘
    for (int i = 1; i < n; i++) {
        factorial[i] = factorial[i - 1] * i;
    }

    // 将k转换成0索引
    k--;
    std::string result;

    for (int i = n; i > 0; i--) {
        int index = k / factorial[i - 1];
        result += std::to_string(numbers[index]);
        numbers.erase(numbers.begin() + index);
        k %= factorial[i - 1];
    }

    return result;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function getPermutation(n, k) {
    // 创建存储1到n的数组
    const numbers = Array.from({ length: n }, (_, i) => i + 1);
    const factorial = new Array(n).fill(1);
    for (let i = 1; i < n; i++) {
        factorial[i] = factorial[i - 1] * i;
    }

    // 将k转换成0索引
    k--;
    let result = '';
    
    for (let i = n; i > 0; i--) {
        const index = Math.floor(k / factorial[i - 1]);
        result += numbers[index];
        numbers.splice(index, 1);
        k %= factorial[i - 1];
    }

    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public String getPermutation(int n, int k) {
        List<Integer> numbers = new ArrayList<>();
        int[] factorial = new int[n];
        factorial[0] = 1;
        for (int i = 1; i < n; i++) {
            factorial[i] = factorial[i - 1] * i;
        }
        for (int i = 1; i <= n; i++) {
            numbers.add(i);
        }

        // 将k转换成0索引
        k--;
        StringBuilder result = new StringBuilder();
        
        for (int i = n; i > 0; i--) {
            int index = k / factorial[i - 1];
            result.append(numbers.get(index));
            numbers.remove(index);
            k %= factorial[i - 1];
        }

        return result.toString();
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n^2)$，其中 $n$ 是给定的数字，因为我们需对 $n$ 个元素进行操作和删除。每次删除的复杂度是 $O(n)$。`
空间复杂度：$O(n)$，因为我们需要一个数组来存储 $n$ 个数字。
