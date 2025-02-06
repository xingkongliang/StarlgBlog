---
sidebar_position: 354
tags:
  - dynamic-programming
  - binary-search
  - Hard
---

# 354.俄罗斯套娃信封问题

标签: `dynamic-programming`, `binary-search`

难度: Hard

通过率: 37.11%

原题链接: https://leetcode.com/problems/russian-doll-envelopes/description/

## 题目描述
给定一个二维整数数组 envelopes，其中 envelopes[i] = [wi, hi] 表示信封的宽度和高度。一个信封可以装入另一个信封的条件是：一个信封的宽度和高度都大于另一个信封的宽度和高度。返回可以嵌套的最大信封数量。注意：信封不能旋转。

## 解题思路
这道题是求最大信封嵌套数量的问题，可以抽象为在二维坐标平面上找一条最长的严格递增子序列。具体解题思路如下：  
1. 首先，我们无法直接应用最长递增子序列的算法，因为我们需要同时考虑宽度和高度两个维度，因此，需要对信封进行排序。我们将信封根据宽度升序排序，对于宽度相同的信封根据高度降序排序（防止在后续高度的递增子序列中重复计算同宽信封）。  
2. 在排序后的数组中，我们只需要考虑高度这一维度，找出这个序列的最长递增子序列，这部分的问题可以通过动态规划或者贪心+二分查找来解决。  
   - 动态规划的思路是维护一个数组 dp, 其中 dp[i] 表示以第 i 个信封为结尾的最长递增子序列的长度。  
   - 采用贪心+二分查找的方法，这样能将时间复杂度从 $O(n^2)$ 优化到 $O(n \log n)$。维护一个数组 lis，lis[k] 代表高度为 k+1 的最长递增子序列中的最后一个信封的最小可能高度。对每一个信封，使用二分查找找到 lis 中第一个大于等于当前信封高度的位置，然后更新 lis。  
3. 则 lis 的长度即为最大信封嵌套数量。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def maxEnvelopes(envelopes):
    # 将信封按宽度升序排列，如果宽度相同，则按高度降序排列
    envelopes.sort(key=lambda x: (x[0], -x[1]))
    import bisect
    # 初始化高度列表
    heights = [envelope[1] for envelope in envelopes]
    # lis 用于存储最长递增子序列的最后一个信封的高度
    lis = []
    # 遍历所有高度
    for h in heights:
        # 使用二分查找找到 lis 中第一个大于等于当前高度的位置
        idx = bisect.bisect_left(lis, h)
        # 如果 idx 等于 lis 的长度，说明 h 可以作为新的最长子序列的末尾
        if idx == len(lis):
            lis.append(h)
        # 否则，更新 lis[idx]，用当前高度替换掉该位置已有的值
        else:
            lis[idx] = h
    # lis 的长度是最长递增子序列的长度
    return len(lis) 

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <vector>
#include <algorithm>
using namespace std;

int maxEnvelopes(vector<vector<int>>& envelopes) {
    // 对信封进行排序，先按宽度升序排序，若宽度相同则按高度降序排序
    sort(envelopes.begin(), envelopes.end(), [](const vector<int>& a, const vector<int>& b) {
        return a[0] == b[0] ? a[1] > b[1] : a[0] < b[0];
    });
    // 提取信封的高度
    vector<int> heights;
    for (const auto& envelope : envelopes) {
        heights.push_back(envelope[1]);
    }
    // lis 用于存储高度的最长递增子序列
    vector<int> lis;
    // 遍历高度
    for (int h : heights) {
        auto it = lower_bound(lis.begin(), lis.end(), h);
        if (it == lis.end()) {
            lis.push_back(h);  // 如果 h 大于所有已知的 lis 中的值
        } else {
            *it = h;  // 替换掉第一个不小于 h 的位置的值
        }
    }
    return lis.size();
}

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function maxEnvelopes(envelopes) {
    // 先排序，宽度升序，宽度相同高度降序
    envelopes.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
    // 提取高度
    let heights = envelopes.map(envelope => envelope[1]);
    // 用于存储最长递增子序列的数组
    let lis = [];
    heights.forEach(h => {
        // 二分查找
        let left = 0, right = lis.length;
        while (left < right) {
            let mid = Math.floor((left + right) / 2);
            if (lis[mid] < h) left = mid + 1;
            else right = mid;
        }
        if (right >= lis.length) lis.push(h);
        else lis[right] = h;
    });
    return lis.length;
}

```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

public class Solution {
    public int maxEnvelopes(int[][] envelopes) {
        // 先对信封按照宽度升序，宽度相同则按高度降序
        Arrays.sort(envelopes, (a, b) -> a[0] == b[0] ? b[1] - a[1] : a[0] - b[0]);
        // 提取高度信息
        int[] heights = new int[envelopes.length];
        for(int i = 0; i < envelopes.length; i++) {
            heights[i] = envelopes[i][1];
        }
        // lis 用于存储高度的最长递增子序列
        List<Integer> lis = new ArrayList<>();
        for(int h : heights) {
            int idx = Collections.binarySearch(lis, h);
            if (idx < 0) {
                idx = -(idx + 1);
            }
            if (idx == lis.size()) {
                lis.add(h);
            } else {
                lis.set(idx, h);
            }
        }
        return lis.size();
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n \log n)$，其中$n$是信封的数量。主要因为排序需要$O(n \log n)$，且每个信封在处理高度的递增子序列时使用二分查找需要$O(\log n)$。    
    
空间复杂度：$O(n)$，用来存储高度的列表和最长递增子序列信息。
