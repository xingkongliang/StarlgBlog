---
sidebar_position: 264
tags:
  - dynamic-programming
  - heap
  - math
  - Medium
---

# 264.丑数 II

标签: `dynamic-programming`, `heap`, `math`

难度: Medium

通过率: 49.13%

原题链接: https://leetcode.com/problems/ugly-number-ii/description/

## 题目描述
丑数是指只能被质因数 2, 3 或 5 整除的正整数。给定一个整数 n，返回第 n 个丑数。

## 解题思路
要获得第 $n$ 个丑数，我们可以使用动态规划的思路。我们维护一个数组 `ugly`，其中 `ugly[i]` 表示第 $i+1$ 个丑数。`ugly[0]` 初始化为 1，因为 1 是第一个丑数。接下来我们用三个指针 $p_2$, $p_3$, $p_5$，分别表示当前丑数*2、*3、*5 的最小值的索引。每轮选取三个候选丑数中最小的一个，这样才能保证按顺序获得丑数。依次对新加入的丑数做更新：

1. 将 `ugly[i]` 初始化为 `min(ugly[p_2]*2, ugly[p_3]*3, ugly[p_5]*5)` 的最小值。
2. 如果 `ugly[i]` 等于 `ugly[p_2]*2`，则增加 $p_2$ 的索引值，这样下次才能得到乘以 2 后的下一个候选值。
3. 如果 `ugly[i]` 等于 `ugly[p_3]*3`，则增加 $p_3$ 的索引值，这样下次才能得到乘以 3 后的下一个候选值。
4. 如果 `ugly[i]` 等于 `ugly[p_5]*5`，则增加 $p_5$ 的索引值。

重复上述过程直到找到第 $n$ 个丑数。这个思路确保了每个丑数的产生依靠的是之前生成的真实丑数，并保证了序列的有序性。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def nthUglyNumber(n):
    # 创建一个数组来保存丑数
    ugly = [1] * n
    # 初始化指针
    p2 = p3 = p5 = 0
    
    # 生成第2到第n个丑数
    for i in range(1, n):
        # 选取候选丑数中的最小值
        min_ugly = min(ugly[p2] * 2, ugly[p3] * 3, ugly[p5] * 5)
        ugly[i] = min_ugly
        
        # 相应的指针移动到下一个位置
        if min_ugly == ugly[p2] * 2:
            p2 += 1
        if min_ugly == ugly[p3] * 3:
            p3 += 1
        if min_ugly == ugly[p5] * 5:
            p5 += 1
    
    return ugly[-1]

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int nthUglyNumber(int n) {
        vector<int> ugly(n);
        ugly[0] = 1;
        int p2 = 0, p3 = 0, p5 = 0;
        for (int i = 1; i < n; i++) {
            int min_ugly = min({ugly[p2] * 2, ugly[p3] * 3, ugly[p5] * 5});
            ugly[i] = min_ugly;
            if (min_ugly == ugly[p2] * 2) p2++;
            if (min_ugly == ugly[p3] * 3) p3++;
            if (min_ugly == ugly[p5] * 5) p5++;
        }
        return ugly[n - 1];
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function nthUglyNumber(n) {
    const ugly = Array(n).fill(0);
    ugly[0] = 1;
    let p2 = 0, p3 = 0, p5 = 0;
    
    for (let i = 1; i < n; i++) {
        const minUgly = Math.min(ugly[p2] * 2, ugly[p3] * 3, ugly[p5] * 5);
        ugly[i] = minUgly;
        if (minUgly === ugly[p2] * 2) p2++;
        if (minUgly === ugly[p3] * 3) p3++;
        if (minUgly === ugly[p5] * 5) p5++;
    }
    
    return ugly[n - 1];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int nthUglyNumber(int n) {
        int[] ugly = new int[n];
        ugly[0] = 1;
        int p2 = 0, p3 = 0, p5 = 0;
        for (int i = 1; i < n; i++) {
            int min_ugly = Math.min(Math.min(ugly[p2] * 2, ugly[p3] * 3), ugly[p5] * 5);
            ugly[i] = min_ugly;
            if (min_ugly == ugly[p2] * 2) p2++;
            if (min_ugly == ugly[p3] * 3) p3++;
            if (min_ugly == ugly[p5] * 5) p5++;
        }
        return ugly[n - 1];
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 是要找到的丑数的个数。这是因为我们需要依次为每个丑数找到其位置。  
  
空间复杂度为 $O(n)$，因为我们需要一个大小为 $n$ 的数组来保存所有的丑数。
