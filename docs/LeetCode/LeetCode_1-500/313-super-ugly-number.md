---
sidebar_position: 313
tags:
  - heap
  - math
  - Medium
---

# 313.超级丑数

标签: `heap`, `math`

难度: Medium

通过率: 45.39%

原题链接: https://leetcode.com/problems/super-ugly-number/description/

## 题目描述
超级丑数是一个正整数，其所有的质因子都在给定的质数数组 primes 中。给定一个整数 n 和一个整数数组 primes，返回第 n 个超级丑数。

## 解题思路
我们可以使用多指针法加堆实现来求解这个问题。思路是维护一个堆用于存储当前的超级丑数，并通过不断从堆中取出最小的数来生成下一个超级丑数：

1. 初始化一个数组 `ugly`，其中 `ugly[0] = 1`（第一个超级丑数总是 1）。
2. 使用堆来维持当前的超级丑数。我们使用元组 `(值, 指数, 索引)` 存储，索引标识使用的质数。
3. 对每个质数 `p`，我们将 `(p, 0, index_p)` 放入堆，其中 `index_p` 是 `p` 在 primes 中的索引。
4. 从堆中不断取出最小的元素，依次填充 `ugly` 数组。对于每个从堆中取出的元素 `(value, i, index_p)`，我们将值写入数组，并将 `(primes[index_p] * ugly[i+1], i+1, index_p)` 插入堆。
5. 当我们填充完 `ugly[n-1]` 时，我们就得到了第 n 个超级丑数。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
import heapq  # 引入堆

def nthSuperUglyNumber(n: int, primes: List[int]) -> int:
    ugly = [1] * n  # 初始化超级丑数数组
    heap = [(prime, 0, prime) for prime in primes]  # 初始化堆 (当前值, 索引, 质数)
    heapq.heapify(heap)
    for i in range(1, n):
        ugly[i] = heap[0][0]  # 取堆顶的值作为下一个超级丑数
        while heap and heap[0][0] == ugly[i]:
            val, idx, prime = heapq.heappop(heap)  # 弹出堆顶
            heapq.heappush(heap, (prime * ugly[idx + 1], idx + 1, prime))
    return ugly[-1]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++ 解法
#include <vector>
#include <queue>

int nthSuperUglyNumber(int n, std::vector<int>& primes) {
    std::vector<int> ugly(n, 1);  // 初始化超级丑数数组
    std::priority_queue<std::tuple<int, int, int>, std::vector<std::tuple<int, int, int>>, std::greater<>> minHeap;
    
    // 把所有质数初始化进堆
    for (int prime : primes) {
        minHeap.emplace(prime, 0, prime);  // (当前值，索引，质数)
    }
    
    for (int i = 1; i < n; ++i) {
        ugly[i] = std::get<0>(minHeap.top());  // 取堆顶为下一个超级丑数
        
        while (!minHeap.empty() && std::get<0>(minHeap.top()) == ugly[i]) {
            auto [val, idx, prime] = minHeap.top();
            minHeap.pop();
            minHeap.emplace(prime * ugly[idx + 1], idx + 1, prime);
        }
    }
    return ugly.back();
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript 解法
function nthSuperUglyNumber(n, primes) {
    const ugly = Array(n).fill(1);
    const heap = new MinHeap();
    
    primes.forEach(prime => {
        heap.push([prime, 0, prime]);  // (当前值，索引，质数)
    });
    
    for (let i = 1; i < n; i++) {
        ugly[i] = heap.peek()[0];  // 堆顶为下一个超级丑数
        
        while (heap.size() && heap.peek()[0] === ugly[i]) {
            const [val, idx, prime] = heap.pop();
            heap.push([prime * ugly[idx + 1], idx + 1, prime]);
        }
    }
    return ugly[n - 1];
}

// 简单的最小堆实现
class MinHeap {
    constructor() {
        this.heap = [];
    }
    // 堆插入
    push(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }
    // 弹出堆顶
    pop() {
        if (this.size() > 1) {
            [this.heap[0], this.heap[this.heap.length - 1]] = [this.heap[this.heap.length - 1], this.heap[0]];
        }
        const popped = this.heap.pop();
        this.bubbleDown(0);
        return popped;
    }
    // 获取堆顶
    peek() {
        return this.heap[0];
    }
    // 堆大小
    size() {
        return this.heap.length;
    }
    // 上浮
    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex][0] <= this.heap[index][0]) break;
            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }
    // 下沉
    bubbleDown(index) {
        const lastIndex = this.size() - 1;
        while (true) {
            const leftChildIndex = index * 2 + 1;
            const rightChildIndex = index * 2 + 2;
            let smallestIndex = index;
            if (leftChildIndex <= lastIndex && this.heap[leftChildIndex][0] < this.heap[smallestIndex][0]) {
                smallestIndex = leftChildIndex;
            }
            if (rightChildIndex <= lastIndex && this.heap[rightChildIndex][0] < this.heap[smallestIndex][0]) {
                smallestIndex = rightChildIndex;
            }
            if (smallestIndex === index) break;
            [this.heap[smallestIndex], this.heap[index]] = [this.heap[index], this.heap[smallestIndex]];
            index = smallestIndex;
        }
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java 解法
import java.util.PriorityQueue;

public class Solution {
    public int nthSuperUglyNumber(int n, int[] primes) {
        int[] ugly = new int[n];  // 超级丑数数组
        ugly[0] = 1;

        PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> a[0] - b[0]);

        for (int prime : primes) {
            minHeap.offer(new int[]{prime, 0, prime});  // (当前值, 索引, 质数)
        }

        for (int i = 1; i < n; i++) {
            ugly[i] = minHeap.peek()[0];  // 取堆顶值为下一个超级丑数
            
            while (!minHeap.isEmpty() && minHeap.peek()[0] == ugly[i]) {
                int[] top = minHeap.poll();
                minHeap.offer(new int[]{top[2] * ugly[top[1] + 1], top[1] + 1, top[2]});
            }
        }
        return ugly[n - 1];
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n \log k)$，其中 $n$ 是我们要求的超级丑数的个数，$k$ 是质数数组的长度，因为我们使用了堆来维持当前的超级丑数。  
  
空间复杂度：$O(n + k)$，用于存储超级丑数的数组和堆。
