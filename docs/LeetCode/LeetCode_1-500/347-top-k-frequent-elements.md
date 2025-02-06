---
sidebar_position: 347
tags:
  - hash-table
  - heap
  - sort
  - Medium
---

# 347.前K个高频元素

标签: `hash-table`, `heap`, `sort`

难度: Medium

通过率: 63.73%

原题链接: https://leetcode.com/problems/top-k-frequent-elements/description/

## 题目描述
给定一个整数数组 nums 和一个整数 k，返回出现频率前 k 高的元素。返回的答案可以按任意顺序返回。

## 解题思路
这道题要求我们找出出现频率最高的 k 个元素，可以利用计数和堆的性质来高效解决这个问题。具体步骤如下：

1. 使用哈希表统计每个元素出现的次数。键是数组中的元素，值是其出现次数。
2. 维护一个小顶堆，用于保存频率最高的 k 个元素。堆的大小最多为 k 。
3. 遍历哈希表，将每个元素加入堆中。如果堆的大小超过 k ，则弹出堆顶元素，这样最终堆中保留的是频率最高的 k 个元素。
4. 将堆中的元素收集起来，返回结果。

这种方法通过小顶堆的性质，达到将时间复杂度优化到 $O(n \log k)$ 的目的，其中 $n$ 是数组的长度。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
from collections import Counter
import heapq

def topKFrequent(nums, k):
    # 统计每个数字出现的次数
    count = Counter(nums)
    # 构建小顶堆，比较频率
    # 使用count.items()生成的键值对流入堆
    return heapq.nlargest(k, count.keys(), key=count.get)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> count;
        // 统计每个数字出现的次数
        for (int num : nums) {
            count[num]++;
        }
        // 构建小顶堆，比较频率
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> heap;
        for (auto& p : count) {
            heap.emplace(p.second, p.first);
            if (heap.size() > k) heap.pop();
        }
        vector<int> result;
        while (!heap.empty()) {
            result.push_back(heap.top().second);
            heap.pop();
        }
        return result;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function topKFrequent(nums, k) {
    // 统计每个数字出现的次数
    const count = new Map();
    for (const num of nums) {
        count.set(num, (count.get(num) || 0) + 1);
    }
    // 构建小顶堆，比较频率
    const heap = [];
    const comparator = (a, b) => count.get(a) - count.get(b);
    for (let [num, freq] of count.entries()) {
        heap.push(num);
        heap.sort(comparator);
        if (heap.length > k) heap.shift();
    }
    return heap;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

class Solution {
    public List<Integer> topKFrequent(int[] nums, int k) {
        // 统计每个数字出现的次数
        Map<Integer, Integer> count = new HashMap<>();
        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }
        // 构建小顶堆，比较频率
        PriorityQueue<Integer> heap = new PriorityQueue<>((n1, n2) -> count.get(n1) - count.get(n2));
        for (int n : count.keySet()) {
            heap.add(n);
            if (heap.size() > k) heap.poll();
        }
        List<Integer> result = new ArrayList<>();
        while (!heap.isEmpty()) {
            result.add(heap.poll());
        }
        return result;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n \log k)$，其中 $n$ 是数组的长度，因为我们利用了小顶堆来维护频率最高的 k 个元素。  
  
空间复杂度：$O(n)$，用于存储元素及其频率的哈希表和可能的堆的存储。
