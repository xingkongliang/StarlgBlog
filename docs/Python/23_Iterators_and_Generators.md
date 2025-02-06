---
sidebar_position: 23
---

# Python 迭代器与生成器
迭代器（Iterator）和生成器（Generator）是 Python 中处理数据流的重要概念，它们可以高效地迭代数据，而不需要一次性加载所有数据到内存。

---

## **1. `iter()` 与 `next()`**
### **概念**
- **迭代器（Iterator）** 是一种对象，它实现了 `__iter__()` 和 `__next__()` 方法，能够逐个返回元素。
- **`iter()`** 将可迭代对象（如列表、元组、字符串）转换为迭代器。
- **`next()`** 获取迭代器的下一个元素，直到 `StopIteration` 异常结束。

### **实例**
```python
# 使用 iter() 将列表转换为迭代器
numbers = [1, 2, 3, 4]
num_iter = iter(numbers)  # 创建迭代器

print(next(num_iter))  # 输出: 1
print(next(num_iter))  # 输出: 2
print(next(num_iter))  # 输出: 3
print(next(num_iter))  # 输出: 4
# print(next(num_iter))  # 触发 StopIteration 异常
```

### **自定义迭代器**
```python
class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self  # 返回迭代器本身

    def __next__(self):
        if self.current <= 0:
            raise StopIteration  # 终止迭代
        self.current -= 1
        return self.current

# 创建迭代器
countdown = Countdown(5)
for num in countdown:
    print(num)  # 输出: 4 3 2 1 0
```

---

## **2. `yield` 关键字**
### **概念**
- `yield` 关键字用于创建 **生成器（Generator）**，它是一种特殊的迭代器。
- 生成器不会一次性返回所有数据，而是按需生成数据，提高内存效率。
- `yield` 暂停函数执行，并返回值，下一次调用时从暂停处继续执行。

### **实例**
```python
def countdown(n):
    while n > 0:
        yield n
        n -= 1

# 使用生成器
for num in countdown(5):
    print(num)  # 输出: 5 4 3 2 1
```

### **生成斐波那契数列**
```python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# 生成前 10 个斐波那契数
fib_gen = fibonacci(10)
print(list(fib_gen))  # 输出: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

---

## **3. `itertools` 模块**
### **概念**
`itertools` 是 Python 内置的一个强大模块，提供了多种高效的迭代工具。

### **常见 `itertools` 迭代器**
| 函数 | 作用 |
|------|------|
| `count(start, step)` | 无限生成等差数列 |
| `cycle(iterable)` | 无限循环迭代 |
| `repeat(value, times)` | 重复某个值 |
| `chain(iter1, iter2, ...)` | 连接多个可迭代对象 |
| `islice(iterable, start, stop, step)` | 切片 |
| `combinations(iterable, r)` | 生成 r 长度的组合 |
| `permutations(iterable, r)` | 生成 r 长度的排列 |
| `product(iterable1, iterable2, ...)` | 笛卡尔积 |
| `groupby(iterable, keyfunc)` | 按键分组 |

---

### **实例**
#### **1) `itertools.count()` 无限生成数列**
```python
import itertools

for i in itertools.count(10, 2):  # 从 10 开始，每次加 2
    print(i)
    if i > 20:
        break  # 否则无限循环
```
**输出**:
```
10
12
14
16
18
20
```

---

#### **2) `itertools.cycle()` 无限循环**
```python
import itertools

colors = itertools.cycle(["red", "blue", "green"])
for i in range(5):
    print(next(colors))
```
**输出**:
```
red
blue
green
red
blue
```

---

#### **3) `itertools.repeat()` 重复某个值**
```python
import itertools

for item in itertools.repeat("Python", 3):
    print(item)
```
**输出**:
```
Python
Python
Python
```

---

#### **4) `itertools.chain()` 连接多个迭代器**
```python
import itertools

list1 = [1, 2, 3]
list2 = ['a', 'b', 'c']
combined = itertools.chain(list1, list2)

print(list(combined))  # 输出: [1, 2, 3, 'a', 'b', 'c']
```

---

#### **5) `itertools.islice()` 切片迭代器**
```python
import itertools

nums = range(100)
print(list(itertools.islice(nums, 10, 20, 2)))  # 输出: [10, 12, 14, 16, 18]
```

---

#### **6) `itertools.combinations()` 组合**
```python
import itertools

items = ['A', 'B', 'C']
print(list(itertools.combinations(items, 2)))
# 输出: [('A', 'B'), ('A', 'C'), ('B', 'C')]
```

---

#### **7) `itertools.permutations()` 排列**
```python
import itertools

items = ['A', 'B', 'C']
print(list(itertools.permutations(items, 2)))
# 输出: [('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'C'), ('C', 'A'), ('C', 'B')]
```

---

#### **8) `itertools.product()` 笛卡尔积**
```python
import itertools

list1 = [1, 2]
list2 = ['a', 'b']
print(list(itertools.product(list1, list2)))
# 输出: [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')]
```

---

#### **9) `itertools.groupby()` 按键分组**
```python
import itertools

data = [{'name': 'Alice', 'age': 25}, {'name': 'Bob', 'age': 25}, {'name': 'Charlie', 'age': 30}]
data.sort(key=lambda x: x['age'])  # 先排序，否则 groupby 不会正确分组

grouped = itertools.groupby(data, key=lambda x: x['age'])
for key, group in grouped:
    print(f"Age {key}: {[person['name'] for person in group]}")
```
**输出**:
```
Age 25: ['Alice', 'Bob']
Age 30: ['Charlie']
```

---

## **总结**
| **概念** | **用途** | **示例** |
|---------|---------|---------|
| **迭代器** (`iter()`, `next()`) | 按需获取元素 | `iter([1,2,3])`, `next(iterator)` |
| **生成器** (`yield`) | 生成数据流，提高效率 | `def gen(): yield x` |
| **itertools** | 处理迭代对象的工具 | `count()`, `cycle()`, `combinations()` |

Python 的 **迭代器和生成器** 能够大幅度提高内存使用效率，特别适用于 **大数据处理、流数据、懒加载** 等场景，同时 `itertools` 提供了丰富的工具来处理迭代对象！🚀