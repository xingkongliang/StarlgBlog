---
sidebar_position: 295
tags:
  - heap
  - design
  - Hard
---

# 295.从数据流中找到中位数

标签: `heap`, `design`

难度: Hard

通过率: 52.67%

原题链接: https://leetcode.com/problems/find-median-from-data-stream/description/

## 题目描述
中位数是有序整数列表中的中间值。如果列表的大小为偶数，则没有中间值，中位数是两个中间值的平均值。实现 MedianFinder 类：

## 解题思路
为了在数据流中找到中位数，可以使用两个堆来实现。重点在于如何动态维护两个堆的大小和数据关系。

1. **小顶堆和大顶堆组合**：
   - 使用两个堆：一个最大堆 `max_heap` 和一个最小堆 `min_heap`。
   - 最大堆 `max_heap` 用于存储数据流中较小的一半元素，堆顶元素是最大值。
   - 最小堆 `min_heap` 用于存储数据流中较大的一半元素，堆顶元素是最小值。
   - **平衡原则**：保持两个堆的大小平衡，或让最大堆的大小比最小堆大1。

2. **添加数字的操作**：
   - 初始时将新数 `num` 添加到最大堆。然后将最大堆的堆顶元素提取放到最小堆。
   - 如果最小堆的大小超过最大堆，将最小堆的堆顶元素重新放入最大堆。
   - 通过这种方式，两个堆随时保持平衡，且中位数可以很快计算出来。

3. **寻找中位数的操作**：
   - 如果两个堆大小相等，中位数为两个堆顶元素的平均数。
   - 如果最大堆比最小堆多一个元素，中位数就是最大堆的堆顶，即较小的一半中的最大值。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
import heapq

class MedianFinder:
    def __init__(self):
        """初始化两个堆：max_heap 用于存储较小的一半(最大堆)，min_heap 用于存储较大的一半(最小堆)"""
        self.max_heap = []  # 最大堆，保存较小的一半
        self.min_heap = []  # 最小堆，保存较大的一半

    def addNum(self, num: int) -> None:
        # 将新数加入最大堆
        heapq.heappush(self.max_heap, -num)
        # 最大堆的堆顶元素移入最小堆
        heapq.heappush(self.min_heap, -heapq.heappop(self.max_heap))

        # 保持最大堆的大小不小于最小堆
        if len(self.max_heap) < len(self.min_heap):
            heapq.heappush(self.max_heap, -heapq.heappop(self.min_heap))

    def findMedian(self) -> float:
        # 如果总数为奇数，返回最大堆堆顶
        if len(self.max_heap) > len(self.min_heap):
            return -self.max_heap[0]
        # 如果总数为偶数，返回两个堆顶的平均值
        return (-self.max_heap[0] + self.min_heap[0]) / 2.0

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class MedianFinder {
    private PriorityQueue<Integer> maxHeap; // 最大堆
    private PriorityQueue<Integer> minHeap; // 最小堆

    /** 初始化两个堆 **/
    public MedianFinder() {
        maxHeap = new PriorityQueue<>(Comparator.reverseOrder()); //较小的一半
        minHeap = new PriorityQueue<>(); //较大的一半
    }

    public void addNum(int num) {
        // 添加数字到最大堆
        maxHeap.offer(num);
        // 最大堆堆顶移到最小堆
        minHeap.offer(maxHeap.poll());
        // 平衡两堆大小
        if (maxHeap.size() < minHeap.size()) {
            maxHeap.offer(minHeap.poll());
        }
    }

    public double findMedian() {
        // 计算中位数
        if (maxHeap.size() > minHeap.size())
            return maxHeap.peek();
        return (maxHeap.peek() + minHeap.peek()) / 2.0;
    }
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class MedianFinder {
    constructor() {
        // 用于存储较小数的最大堆，需反转优先级
        this.maxHeap = new MinPriorityQueue({ compare: (a, b) => b - a });
        // 用于存储较大数的最小堆
        this.minHeap = new MinPriorityQueue();
    }

    /** 添加数字 **/
    addNum(num) {
        // 添加到最大堆
        this.maxHeap.enqueue(num);
        // 平衡最大堆堆顶到最小堆
        this.minHeap.enqueue(this.maxHeap.dequeue().element);

        // 保持最大堆的大小不小于最小堆
        if (this.maxHeap.size() < this.minHeap.size()) {
            this.maxHeap.enqueue(this.minHeap.dequeue().element);
        }
    }

    /** 找到当前的中位数 **/
    findMedian() {
        if (this.maxHeap.size() > this.minHeap.size()) {
            return this.maxHeap.front().element;
        } else {
            return (this.maxHeap.front().element + this.minHeap.front().element) / 2;
        }
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.PriorityQueue;

class MedianFinder {
    private PriorityQueue<Integer> maxHeap; // 存储较小一半的数据
    private PriorityQueue<Integer> minHeap; // 存储较大一半的数据

    /** 初始化两个堆 **/
    public MedianFinder() {
        maxHeap = new PriorityQueue<>((a, b) -> b - a); // 最大堆
        minHeap = new PriorityQueue<>(); // 最小堆
    }

    public void addNum(int num) {
        // 将新数加入最大堆
        maxHeap.offer(num);
        // 将最大堆的堆顶转移到最小堆
        minHeap.offer(maxHeap.poll());

        // 保证最大堆总是比最小堆多一个或者相同
        if (minHeap.size() > maxHeap.size()) {
            maxHeap.offer(minHeap.poll());
        }
    }

    public double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.peek();
        } else {
            return (maxHeap.peek() + minHeap.peek()) / 2.0;
        }
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度**：

每次加入数字的时间复杂度为 $O(\log{}n)$，因为需要往堆中添加和移除元素。查找中位数的时间复杂度为 $O(1)$，因为中位数是在堆顶元素计算出来的。


**空间复杂度**：

空间复杂度为 $O(n)$，其中 $n$ 是添加到数据结构中的元素数量，因为需要存储所有的元素。
