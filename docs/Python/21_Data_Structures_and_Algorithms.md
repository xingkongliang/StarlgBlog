---
sidebar_position: 21
---

# Python 数据结构与算法

Python 提供了多种数据结构和算法，其中 `collections` 模块提供了一些高效的数据结构，而时间复杂度分析（Big O 记法）可以帮助我们衡量算法的效率。此外，常见的算法包括 **排序、搜索、动态规划**，它们在编程中广泛使用。

---

## **1️⃣ collections 模块**
Python 的 `collections` 模块提供了许多高级数据结构，包括 `Counter`（计数器）、`deque`（双端队列）和 `defaultdict`（带默认值的字典），它们可以优化代码性能。

### **(1) Counter - 计数器**
`Counter` 是 `collections` 模块中的一个子类，用于统计可迭代对象中元素的出现次数。

#### **示例**
```python
from collections import Counter

# 统计字符出现次数
text = "hello world"
counter = Counter(text)
print(counter)  # 输出：Counter({'l': 3, 'o': 2, 'h': 1, 'e': 1, ' ': 1, 'w': 1, 'r': 1, 'd': 1})

# 统计单词出现次数
words = ["apple", "banana", "apple", "orange", "banana", "apple"]
word_count = Counter(words)
print(word_count)  # 输出：Counter({'apple': 3, 'banana': 2, 'orange': 1})

# 获取最常见的两个元素
print(word_count.most_common(2))  # 输出：[('apple', 3), ('banana', 2)]
```

---

### **(2) deque - 双端队列**
`deque`（double-ended queue）是一个双端队列，支持 **O(1) 复杂度** 的快速插入和删除操作，比 Python 内置的 `list` 更高效。

#### **示例**
```python
from collections import deque

# 初始化 deque
dq = deque(["a", "b", "c"])

# 在两端插入元素
dq.append("d")    # 末尾插入
dq.appendleft("z") # 头部插入
print(dq)  # 输出：deque(['z', 'a', 'b', 'c', 'd'])

# 在两端删除元素
dq.pop()  # 删除末尾
dq.popleft()  # 删除头部
print(dq)  # 输出：deque(['a', 'b', 'c'])

# 旋转队列
dq.rotate(1)  # 向右旋转 1 步
print(dq)  # 输出：deque(['c', 'a', 'b'])
```

---

### **(3) defaultdict - 带默认值的字典**
`defaultdict` 允许你在访问字典中 **不存在的键时** 自动初始化一个默认值，而不会抛出 `KeyError`。

#### **示例**
```python
from collections import defaultdict

# 创建一个默认值为 list 的字典
d = defaultdict(list)

# 向字典中添加值
d["fruits"].append("apple")
d["fruits"].append("banana")
d["vegetables"].append("carrot")

print(d)  
# 输出：defaultdict(<class 'list'>, {'fruits': ['apple', 'banana'], 'vegetables': ['carrot']})

# 访问不存在的键，不会报错，而是返回空列表
print(d["unknown"])  # 输出：[]
```

---

## **2️⃣ 时间复杂度（Big O 记法）**
时间复杂度（Time Complexity）描述了 **算法执行时间的增长趋势**，通常用 **Big O 记法** 表示。

### **常见时间复杂度**
| 复杂度 | 名称 | 例子 |
|--------|------|------|
| **O(1)** | 常数时间 | 访问数组元素 |
| **O(log n)** | 对数时间 | 二分查找 |
| **O(n)** | 线性时间 | 遍历列表 |
| **O(n log n)** | 线性对数时间 | 快速排序、归并排序 |
| **O(n²)** | 二次时间 | 冒泡排序、选择排序 |
| **O(2ⁿ)** | 指数时间 | 斐波那契递归 |
| **O(n!)** | 阶乘时间 | 旅行商问题 |

### **示例**
```python
# O(1) - 常数时间
def constant_time(arr):
    return arr[0]  # 直接访问元素

# O(n) - 线性时间
def linear_time(arr):
    for item in arr:
        print(item)

# O(n^2) - 二次时间
def quadratic_time(arr):
    for i in arr:
        for j in arr:
            print(i, j)
```

---

## **3️⃣ 常见算法**
## **(1) 排序算法**
### **冒泡排序（O(n²))**
```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

print(bubble_sort([3, 1, 4, 1, 5, 9, 2]))
```

### **快速排序（O(n log n))**
```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

print(quick_sort([3, 1, 4, 1, 5, 9, 2]))
```

---

## **(2) 搜索算法**
### **二分查找（O(log n))**
```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

print(binary_search([1, 2, 3, 4, 5, 6], 4))  # 输出: 3
```

---

## **(3) 动态规划**
动态规划（Dynamic Programming, DP）适用于最优子结构问题，如 **斐波那契数列、背包问题、最长公共子序列**。

### **斐波那契数列（O(n)）**
```python
def fibonacci(n):
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]

print(fibonacci(10))  # 输出: 55
```

### **0-1 背包问题**
```python
def knapsack(weights, values, W):
    n = len(weights)
    dp = [[0] * (W + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(W + 1):
            if weights[i - 1] <= w:
                dp[i][w] = max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1])
            else:
                dp[i][w] = dp[i - 1][w]
    
    return dp[n][W]

weights = [2, 3, 4, 5]
values = [3, 4, 5, 6]
capacity = 5
print(knapsack(weights, values, capacity))  # 输出: 7
```

---

## **总结**
- `collections` 模块提供了高效的数据结构，如 `Counter`、`deque`、`defaultdict`。
- `Big O` 记法用于分析算法效率，常见时间复杂度包括 **O(1)、O(n)、O(n log n)、O(n²)**。
- 重要算法：
  - 排序（冒泡、快速排序）
  - 搜索（二分查找）
  - 动态规划（斐波那契、背包问题）

这些知识对 **数据结构与算法面试** 非常重要，建议多加练习！🚀