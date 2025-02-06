---
sidebar_position: 440
tags:
  - math
  - depth-first-search
  - trie
  - Hard
---

# 440.字典序的第K小数字

标签: `math`, `depth-first-search`, `trie`

难度: Hard

通过率: 41.94%

原题链接: https://leetcode.com/problems/k-th-smallest-in-lexicographical-order/description/

## 题目描述
给定两个整数 $n$ 和 $k$，返回范围 $[1, n]$ 中字典序第 $k$ 小的整数。

## 解题思路
为了找到字典序的第 k 小的数字，我们可以通过模拟字典树（前缀树）方法来实现。具体思路如下：

1. 从数字 1 开始，依次寻找数字在字典树中的位置。
2. 使用一个 helper 函数 `get_steps(curr, n)` 来计算从 `curr` 开始到 `curr+1` 之间有多少个数字在给定范围 $[1, n]$ 中。其核心思想是不断地从当前节点累加其子节点的数量，来估算字典序间隔。
3. 通过模拟字典树逐层深入，对每一层分别判断：
   - 如果当前步数 `steps` 小于 `k`，则我们需要向右边移动到下一个兄弟节点，并调整 `k -= steps`。
   - 否则，如果当前步数大于等于 `k`，则继续在当前节点的子节点中进一步查找。
4. 不断调整 `k` 的值和查找范围，直到准确定位出第 k 个字典顺序的数。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def findKthNumber(n: int, k: int) -> int:
    def get_steps(curr, n):
        steps = 0
        first = curr
        last = curr
        while first <= n:
            steps += min(last, n) - first + 1
            first *= 10
            last = last * 10 + 9
        return steps

    curr = 1
    k -= 1  # Since we start from 1
    while k > 0:
        steps = get_steps(curr, n)
        if steps <= k:
            # Move to next sibling
            curr += 1
            k -= steps
        else:
            # Move to the first child
            curr *= 10
            k -= 1
    return curr
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int findKthNumber(int n, int k) {
    auto get_steps = [&](long curr, int n) -> int {
        long steps = 0;
        long first = curr;
        long last = curr;
        while (first <= n) {
            steps += min(last, (long)n) - first + 1;
            first *= 10;
            last = last * 10 + 9;
        }
        return steps;
    };

    int curr = 1;
    k -= 1;  // 为了准确切换至第k个元素
    while (k > 0) {
        int steps = get_steps(curr, n);
        if (steps <= k) {
            // 移动到下一个相邻节点
            curr += 1;
            k -= steps;
        } else {
            // 移动到当前节点的第一个子节点
            curr *= 10;
            k -= 1;
        }
    }
    return curr;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function findKthNumber(n, k) {
    const getSteps = (curr, n) => {
        let steps = 0;
        let first = curr;
        let last = curr;
        while (first <= n) {
            steps += Math.min(last, n) - first + 1;
            first *= 10;
            last = last * 10 + 9;
        }
        return steps;
    };

    let curr = 1;
    k -= 1; // 从1开始
    while (k > 0) {
        const steps = getSteps(curr, n);
        if (steps <= k) {
            // 移动到下一个兄弟节点
            curr += 1;
            k -= steps;
        } else {
            // 移动到子节点
            curr *= 10;
            k -= 1;
        }
    }
    return curr;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int findKthNumber(int n, int k) {
    int getSteps(long curr, int n) {
        long steps = 0;
        long first = curr;
        long last = curr;
        while (first <= n) {
            steps += Math.min(last, (long)n) - first + 1;
            first *= 10;
            last = last * 10 + 9;
        }
        return (int) steps;
    }
    int curr = 1;
    k -= 1; // 从1开始计数
    while (k > 0) {
        int steps = getSteps(curr, n);
        if (steps <= k) {
            // 移动到下一个兄弟节点
            curr += 1;
            k -= steps;
        } else {
            // 移动到子节点
            curr *= 10;
            k -= 1;
        }
    }
    return curr;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：在最坏情况下，算法需要逐个检查接近 $O(\log_{10}(n))$ 层的前缀树节点。对于每个节点可能遍历10个孩子节点，因此时间复杂度约为 $O(\log_{10}(n) \times 10) = O(\log{n})$。  
  
空间复杂度：不需要使用额外的大空间，空间复杂度为 $O(1)$。
