---
sidebar_position: 338
tags:
  - dynamic-programming
  - bit-manipulation
  - Easy
---

# 338.计算各个位上1的数量

标签: `dynamic-programming`, `bit-manipulation`

难度: Easy

通过率: 79.12%

原题链接: https://leetcode.com/problems/counting-bits/description/

## 题目描述
给定一个整数 $n$，返回一个长度为 $n + 1$ 的数组 $ans$，对于每个 $i$ $(0 <= i <= n)$，$ans[i]$ 是 $i$ 的二进制表示中 1 的个数。

## 解题思路
解决该问题的一种高效方法是利用动态规划和位操作来实现线性时间复杂度。我们可以通过观察二进制的规律来发现：

- 如果 $i$ 是偶数，那么 $i$ 的二进制 1 的个数与 $i/2$ 是相同的，因为右移操作相当于去掉末尾的 0。
- 如果 $i$ 是奇数，那么 $i$ 的二进制 1 的个数比 $i-1$ 多一个。因为奇数的二进制最后一位是 1。

因此我们可以利用以下的递推公式来求解：

- 如果 $i \% 2 == 0$ （即 $i$ 是偶数），那么有 $countBits[i] = countBits[i/2]$。
- 如果 $i \% 2 == 1$ （即 $i$ 是奇数），那么有 $countBits[i] = countBits[i/2] + 1$。

根据上述规律，我们可以自底向上逐个计算所有数的二进制表示中 1 的数量。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def countBits(n):
    # 初始化结果数组，长度为n+1
    ans = [0] * (n + 1)
    
    # 从1到n开始填充数组
    for i in range(1, n + 1):
        # 使用递推公式计算每一个数字1的个数
        ans[i] = ans[i >> 1] + (i & 1)
        # i >> 1 相当于i // 2，(i & 1)用于检查最后一位是否为1
    
    return ans
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
vector<int> countBits(int n) {
    // 初始化结果数组，长度为n+1
    vector<int> ans(n + 1);
    
    // 从1到n开始填充数组
    for (int i = 1; i <= n; ++i) {
        // 使用递推公式计算每一个数字1的个数
        ans[i] = ans[i >> 1] + (i & 1);
        // i >> 1 相当于i / 2，(i & 1)用于检查最后一位是否为1
    }
    
    return ans;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function countBits(n) {
    // 初始化结果数组，长度为n+1
    const ans = new Array(n + 1).fill(0);
    
    // 从1到n开始填充数组
    for (let i = 1; i <= n; i++) {
        // 使用递推公式计算每一个数字1的个数
        ans[i] = ans[i >> 1] + (i & 1);
        // i >> 1 相当于Math.floor(i / 2)，(i & 1)用于检查最后一位是否为1
    }
    
    return ans;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int[] countBits(int n) {
    // 初始化结果数组，长度为n+1
    int[] ans = new int[n + 1];
    
    // 从1到n开始填充数组
    for (int i = 1; i <= n; i++) {
        // 使用递推公式计算每一个数字1的个数
        ans[i] = ans[i >> 1] + (i & 1);
        // i >> 1 相当于i / 2，(i & 1)用于检查最后一位是否为1
    }
    
    return ans;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$。每个数的二进制 1 的个数可以在常数时间内计算得出。  
  
空间复杂度为 $O(n)$。我们需要一个长度为 $n+1$ 的数组来保存结果。
