---
sidebar_position: 135
tags:
  - array
  - greedy
  - Hard
---

# 135.糖果问题

标签: `array`, `greedy`

难度: Hard

通过率: 44.07%

原题链接: https://leetcode.com/problems/candy/description/

## 题目描述
有 $n$ 个小朋友站成一条直线，每个小朋友都有一个与之相关的评分。你需要给这些小朋友分发糖果，满足以下要求：

1. 每个小朋友至少得到一颗糖果。
2. 评分较高的小朋友要比相邻的评分较低的小朋友得到更多的糖果。

返回你需要准备的糖果的最小数量。

## 解题思路
这个问题可以通过贪心算法来解决。我们可以分两步进行：

1. **从左到右扫描**：
    - 如果当前小朋友的评分比左边的小朋友高，那么当前小朋友的糖果数量就比左边的小朋友多一颗。
    - 否则，保持糖果数量不变或减少以满足条件。

2. **从右到左扫描**：
    - 如果当前小朋友的评分比右边的小朋友高，并且糖果数量没有其多，那么需要增加当前小朋友的糖果数量，使其比右边的小朋友多一颗。

这样经过两次遍历，我们可以确保每个小朋友满足条件，得到的糖果数量是最少的。通过这种方法，我们能够在$O(n)$时间内完成糖果分配。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def candy(ratings):
    n = len(ratings)
    if n == 0:
        return 0
    
    # Initialize candies array where each child gets at least one candy
    candies = [1] * n
    
    # Left to right: ensure right higher gets more
    for i in range(1, n):
        if ratings[i] > ratings[i - 1]:
            candies[i] = candies[i - 1] + 1
    
    # Right to left: ensure left higher gets more
    for i in range(n - 2, -1, -1):
        if ratings[i] > ratings[i + 1]:
            candies[i] = max(candies[i], candies[i + 1] + 1)
    
    # Total candies is the sum of candies array
    return sum(candies)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int candy(vector<int>& ratings) {
    int n = ratings.size();
    if (n == 0) return 0;
    
    vector<int> candies(n, 1); // 每个孩子至少一颗糖果
    
    // 从左到右，保证右边的孩子获得更多糖果
    for (int i = 1; i < n; ++i) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }
    
    // 从右到左，保证左边的孩子获得更多糖果
    for (int i = n - 2; i >= 0; --i) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = max(candies[i], candies[i + 1] + 1);
        }
    }
    
    // 返回所有糖果的和
    return accumulate(candies.begin(), candies.end(), 0);
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function candy(ratings) {
    const n = ratings.length;
    if (n === 0) return 0;
    
    const candies = Array(n).fill(1); // 初始每个孩子至少一颗糖果
    
    // 从左到右，右边评分高的孩子获得更多糖果
    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }
    
    // 从右到左，左边评分高的孩子获得更多糖果
    for (let i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
    }
    
    // 返回所有糖果的总数
    return candies.reduce((a, b) => a + b, 0);
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int candy(int[] ratings) {
        int n = ratings.length;
        if (n == 0) return 0;

        int[] candies = new int[n];
        Arrays.fill(candies, 1); // 每个孩子至少一颗糖果

        // 从左到右，保证右边的孩子获得更多糖果
        for (int i = 1; i < n; i++) {
            if (ratings[i] > ratings[i - 1]) {
                candies[i] = candies[i - 1] + 1;
            }
        }

        // 从右到左，保证左边的孩子获得更多糖果
        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) {
                candies[i] = Math.max(candies[i], candies[i + 1] + 1);
            }
        }

        // 返回所有糖果的和
        int sum = 0;
        for (int candy : candies) {
            sum += candy;
        }
        return sum;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(n)$，其中$n$是小朋友的数量。我们需要进行两次线性扫描。
- 空间复杂度：$O(n)$，需要一个和输入大小相同的数组来存储每个小朋友应该分配的糖果。
