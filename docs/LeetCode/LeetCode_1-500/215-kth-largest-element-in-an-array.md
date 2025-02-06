---
sidebar_position: 215
tags:
  - array
  - divide-and-conquer
  - heap
  - Medium
---

# 215.数组中的第K个最大元素

标签: `array`, `divide-and-conquer`, `heap`

难度: Medium

通过率: 67.34%

原题链接: https://leetcode.com/problems/kth-largest-element-in-an-array/description/

## 题目描述
给定一个整数数组 `nums` 和一个整数 `k`，返回数组中第 `k` 个最大的元素。注意，它是排序后第 `k` 个最大的元素，而不是第 `k` 个不同的元素。

你能否不通过排序来解决问题？

## 解题思路
这个问题可以通过使用堆来解决。我们可以通过维护一个最小堆来找到第 `k` 大的元素。以下是具体步骤：

1. **使用最小堆**: 我们维护一个大小为 `k` 的最小堆。首先遍历数组 `nums` 的前 `k` 个元素，将它们压入堆中。
2. **维护堆的大小**: 对于接下来的元素，我们检查该元素是否大于堆顶（最小堆的堆顶是当前堆中的最小值）。如果大于，则将堆顶元素弹出，并将当前元素加入堆中。
3. **堆的堆顶即为所求**: 最终，当遍历完所有元素后，堆顶的元素即为第 `k` 个最大的元素。

通过以上方法，我们可以在保持时间复杂度为 \(O(n \log k)\) 的同时，解决问题，而不需要对整个数组进行排序，即避免了 \(O(n \log n)\) 的时间复杂度。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
import heapq

# 定义函数，找出数组中的第k个最大元素
def findKthLargest(nums, k):
    # 使用Python中的heapq来创建最小堆
    # 初始化一个大小为k的最小堆
    min_heap = nums[:k]
    heapq.heapify(min_heap)
  
    # 从第k个元素开始遍历
    for num in nums[k:]:
        # 如果当前数大于最小堆的堆顶，则替换最小堆的堆顶
        if num > min_heap[0]:
            heapq.heappushpop(min_heap, num)

    # 最终最小堆的堆顶即是第k个最大的元素
    return min_heap[0]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++
#include <queue>
#include <vector>

int findKthLargest(std::vector<int>& nums, int k) {
    // 创建大小为k的最小堆
    std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;
    
    // 将前k个元素推入堆中
    for (int num : nums) {
        minHeap.push(num);
        if (minHeap.size() > k) {
            minHeap.pop();
        }
    }
    
    // 返回堆顶元素，即第k大元素
    return minHeap.top();
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript
function findKthLargest(nums, k) {
    // 创建最小堆
    const minHeap = new MinPriorityQueue({ priority: x => x });
    
    // 将前k个元素加入堆中
    for (const num of nums) {
        minHeap.enqueue(num);
        if (minHeap.size() > k) {
            minHeap.dequeue();
        }
    }
    
    // 堆顶元素即为所求的第k大元素
    return minHeap.front().element;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java
import java.util.PriorityQueue;

class Solution {
    public int findKthLargest(int[] nums, int k) {
        // 创建大小为k的最小堆
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        
        // 将前k个元素加入堆中
        for (int num : nums) {
            minHeap.add(num);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        
        // 返回堆顶元素，即第k大元素
        return minHeap.peek();
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度**: \(O(n \log k)\)，其中 \(n\) 是数组中的元素数量，\(k\) 是堆的大小。在最坏情况下，对于每个元素我们都可能需要调整堆，而调整堆的时间复杂度是 \(O(\log k)\)。


**空间复杂度**: \(O(k)\)，用于存储大小为 \(k\) 的堆。
