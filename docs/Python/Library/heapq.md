---
sidebar_position: 0
---

**`heapq`模块简介**  
Python 的 `heapq` 模块提供了一个基于堆（heap）的优先队列算法，可以有效地维护一个有序的元素集合。堆是一种特殊的树形数据结构，能够快速找出最小值（或最大值，取决于堆的类型）。`heapq` 实现的是一个最小堆，最小堆的性质是堆顶（根节点）元素总是整个堆中最小的。

通过 `heapq` 提供的操作，我们可以高效地完成以下任务：
- **向堆中插入一个元素**：O(log n) 时间复杂度。
- **弹出堆顶的最小元素**：O(log n) 时间复杂度。
- **快速获取堆顶的最小元素**：O(1) 时间复杂度。

---

**常用方法**
1. `heapq.heappush(heap, item)`：将 `item` 插入到堆中，保持堆的特性。
2. `heapq.heappop(heap)`：弹出并返回堆顶元素。
3. `heapq.heapify(x)`：将列表 `x` 原地转换为一个堆。
4. `heapq.heappushpop(heap, item)`：将 `item` 插入到堆中，然后弹出并返回堆顶元素（高效组合操作）。
5. `heapq.heapreplace(heap, item)`：弹出堆顶元素，然后将 `item` 插入到堆中。

---

**实例代码**

以下是一个简单示例，展示如何使用 `heapq` 模块维护一个最小堆：

```python
import heapq

# 初始化一个空堆
heap = []

# 插入元素
heapq.heappush(heap, 10)
heapq.heappush(heap, 5)
heapq.heappush(heap, 15)
heapq.heappush(heap, 3)

print("当前堆:", heap)  # 输出：[3, 5, 15, 10]

# 弹出堆顶元素（最小值）
smallest = heapq.heappop(heap)
print("弹出最小值:", smallest)  # 输出：3
print("堆的状态:", heap)  # 输出：[5, 10, 15]

# 将一个列表转换成堆
nums = [4, 6, 8, 2, 7]
heapq.heapify(nums)
print("堆化后的列表:", nums)  # 输出：[2, 6, 4, 8, 7]

# 插入新元素并弹出最小值
result = heapq.heappushpop(nums, 1)
print("插入 1 后弹出最小值:", result)  # 输出：1
print("堆的状态:", nums)  # 输出：[2, 6, 4, 8, 7]

# 替换堆顶元素
replaced = heapq.heapreplace(nums, 10)
print("替换堆顶元素后:", nums)  # 输出：[4, 6, 10, 8, 7]
```

---

**说明**
- `heapq` 默认实现的是最小堆，所以堆顶元素始终是最小值。
- 如果需要实现最大堆，可以在存入元素时存负数，然后在取出元素时还原为正数，或使用 `heapq` 提供的 `nlargest` 或 `nsmallest` 方法。

通过 `heapq` 提供的接口，我们可以方便地维护动态集合的最小（或最大）值，适用于诸如求第 k 大/小值、流式数据排序等场景。