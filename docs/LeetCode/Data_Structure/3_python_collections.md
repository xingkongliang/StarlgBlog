---
sidebar_position: 2
---

# Python `collections` 模块中常用数据结构

Python 的 `collections` 模块提供了一些扩展的数据结构，它们是对基本数据结构的补充，提供了更多的功能和性能优化。这些数据结构在处理特定类型的问题时能大大简化代码并提高效率。

## `namedtuple`
- `namedtuple` 是一个工厂函数，它用来创建类似元组的对象，但字段有名称，这提高了程序的可读性和自文档性。
- 使用 `namedtuple` 可以通过名称访问元组的元素，而不仅仅是索引。

**示例：**
```python
from collections import namedtuple

# 定义一个namedtuple，名为Point，有两个字段：x和y
Point = namedtuple('Point', ['x', 'y'])

# 创建一个Point对象
pt = Point(1, 2)

# 访问字段
print(pt.x)  # 输出: 1
print(pt.y)  # 输出: 2
```

## `deque`（双端队列）
- `deque` 支持从两端快速添加（`append`）和弹出（`pop`）元素。
- 它是一个线程安全的、快速从两端操作的数据结构，适合用作队列和栈。
- 相比于列表，`deque` 在两端进行插入和删除操作时的性能更优。

**示例：**
```python
from collections import deque

# 创建一个deque
d = deque()

# 在右端添加元素
d.append('a')
d.append('b')

# 在左端添加元素
d.appendleft('z')

# 输出deque内容
print(d)  # 输出: deque(['z', 'a', 'b'])

# 弹出右端元素
d.pop()
print(d)  # 输出: deque(['z', 'a'])

# 弹出左端元素
d.popleft()
print(d)  # 输出: deque(['a'])
```

## `Counter`
- `Counter` 是一个字典的子类，用于计数可哈希对象。
- 它内部是一个键值对的结构，键是元素，值是元素出现的次数。
- 可以用来方便地计算数据中元素的频率。

**示例：**
```python
from collections import Counter

# 创建一个Counter对象
c = Counter('banana')

# 访问计数
print(c)  # 输出: Counter({'a': 3, 'n': 2, 'b': 1})

# 更新计数
c.update('apple')
print(c)  # 输出: Counter({'a': 4, 'p': 2, 'n': 2, 'b': 1, 'l': 1, 'e': 1})
```

## `OrderedDict`
- `OrderedDict` 是一个字典的子类，它保持了元素被添加的顺序。
- 这在某些场合下非常有用，比如需要一个稳定的输出顺序时。
- Python 3.7+ 的普通字典也是有序的，但 `OrderedDict` 仍然在功能上有所不同，如它的 `popitem` 方法可以用来弹出第一个或最后一个元素。

**示例：**
```python
from collections import OrderedDict

# 创建一个有序字典
od = OrderedDict()
od['z'] = 1
od['e'] = 2
od['d'] = 3

# 输出有序字典的内容
print(od)  # 输出: OrderedDict([('z', 1), ('e', 2), ('d', 3)])

# 更改添加的顺序
od.move_to_end('z')
print(od)  # 输出: OrderedDict([('e', 2), ('d', 3), ('z', 1)])
```

## `defaultdict`
- `defaultdict` 在访问不存在的键时，会自动创建该键并将其值设为默认值，这通常是通过调用一个工厂函数来实现的。
- 这使得用户不需要检查键是否存在于字典中。

**示例：**
```python
from collections defaultdict

# 创建一个defaultdict，默认值为int（即0）
dd = defaultdict(int)

# 访问不存在的键'a'
print(dd['a'])  # 输出: 0

# 添加一些值
dd['b'] = 4
print(dd['b'])  # 输出: 4
```

以上是 `collections` 模块中常用数据结构的简介和示例，希望能帮助你更好地理解和使用这些工具。