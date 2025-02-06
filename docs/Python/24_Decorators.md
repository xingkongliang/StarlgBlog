---
sidebar_position: 24
---

# Python 装饰器（Decorators）

装饰器（Decorator）是 Python 提供的一种用于增强函数或类方法功能的语法，它允许在不修改原有代码的情况下，动态地增加功能。常见的装饰器包括 `@property`、`@staticmethod`、`@classmethod` 以及自定义装饰器。

---

## **1. `@property`**
### **概念**
- `@property` 允许我们将类的方法转换为**属性**，在访问时无需加 `()`。
- 主要用于**封装（Encapsulation）**，隐藏内部实现，同时提供一个受控的方式访问属性。
- `@property` 结合 `@setter` 和 `@deleter`，可以定义**只读**或**可修改**的属性。

### **实例**
```python
class Person:
    def __init__(self, name, age):
        self._name = name
        self._age = age  # 使用私有变量存储

    @property
    def age(self):
        """获取年龄"""
        return self._age

    @age.setter
    def age(self, value):
        """设置年龄"""
        if value < 0:
            raise ValueError("Age cannot be negative")
        self._age = value

    @age.deleter
    def age(self):
        """删除年龄"""
        print("Deleting age...")
        del self._age

# 使用 @property
p = Person("Alice", 25)
print(p.age)  # 调用 age 方法，但不需要加括号，输出: 25

p.age = 30  # 使用 setter 修改年龄
print(p.age)  # 输出: 30

del p.age  # 触发 deleter
# print(p.age)  # AttributeError: 'Person' object has no attribute '_age'
```

**应用场景**：
- **数据封装**：防止外部直接修改对象属性。
- **计算属性**：如 `Rectangle` 类的 `area` 属性可以通过 `width * height` 计算，而无需存储 `area`。

---

## **2. `@staticmethod` 和 `@classmethod`**
### **概念**
| 装饰器 | 作用 | 主要区别 |
|--------|--------|------------|
| `@staticmethod` | 定义静态方法，不需要 `self` 或 `cls` 参数 | 不能访问实例或类属性，仅执行独立逻辑 |
| `@classmethod` | 定义类方法，第一个参数是 `cls` | 可访问或修改类变量，影响整个类 |

### **实例**
```python
class MathUtils:
    pi = 3.14159  # 类变量

    @staticmethod
    def add(a, b):
        """静态方法: 计算两个数的和"""
        return a + b

    @classmethod
    def get_pi(cls):
        """类方法: 获取类变量 pi"""
        return cls.pi

# 调用静态方法
print(MathUtils.add(3, 5))  # 输出: 8

# 调用类方法
print(MathUtils.get_pi())  # 输出: 3.14159
```

### **什么时候使用 `@staticmethod` 和 `@classmethod`？**
- **`@staticmethod`** 适用于**不依赖实例或类**的工具方法，如数学计算、格式转换等。
- **`@classmethod`** 适用于**修改或访问类属性**的方法，如创建不同配置的对象、管理全局状态等。

**示例：使用 `@classmethod` 实现工厂方法**
```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def from_string(cls, person_str):
        """从字符串创建对象"""
        name, age = person_str.split("-")
        return cls(name, int(age))

# 通过 from_string 方法创建对象
p = Person.from_string("Bob-30")
print(p.name, p.age)  # 输出: Bob 30
```

---

## **3. 自定义装饰器**
### **概念**
- **装饰器** 是一个**高阶函数**，它接受一个函数作为参数，并返回一个**增强版**的函数。
- 语法：使用 `@装饰器名称` 直接作用于函数，而不需要修改原始代码。
- 常用于**日志记录、权限控制、缓存、性能分析等**。

---

### **基础装饰器**
```python
def my_decorator(func):
    def wrapper():
        print("执行前")
        func()  # 调用被装饰的函数
        print("执行后")
    return wrapper

@my_decorator  # 等价于 `say_hello = my_decorator(say_hello)`
def say_hello():
    print("Hello, world!")

say_hello()
```
**输出**：
```
执行前
Hello, world!
执行后
```

---

### **装饰器带参数**
```python
def repeat(n):
    """重复执行 n 次的装饰器"""
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(n):
                func(*args, **kwargs)
        return wrapper
    return decorator

@repeat(3)  # 使函数执行 3 次
def greet():
    print("Hello!")

greet()
```
**输出**：
```
Hello!
Hello!
Hello!
```

---

### **装饰器应用**
#### **1) 计算函数执行时间**
```python
import time

def timing_decorator(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"执行 {func.__name__} 耗时: {end_time - start_time:.4f} 秒")
        return result
    return wrapper

@timing_decorator
def slow_function():
    time.sleep(2)
    print("函数执行完毕")

slow_function()
```
**输出**：
```
函数执行完毕
执行 slow_function 耗时: 2.0001 秒
```

---

#### **2) 权限控制装饰器**
```python
def check_permission(func):
    def wrapper(user):
        if user != "admin":
            print("无权限访问")
            return
        return func(user)
    return wrapper

@check_permission
def access_admin_panel(user):
    print(f"欢迎 {user} 访问管理员面板")

access_admin_panel("guest")  # 输出: 无权限访问
access_admin_panel("admin")  # 输出: 欢迎 admin 访问管理员面板
```

---

## **总结**
| **装饰器** | **用途** | **示例** |
|------------|---------|---------|
| `@property` | 将方法转换为属性 | `obj.age` |
| `@staticmethod` | 定义静态方法，不访问实例或类 | `MathUtils.add(3, 5)` |
| `@classmethod` | 作用于类，可修改类变量 | `Person.from_string("Alice-25")` |
| 自定义装饰器 | 增强函数功能（如日志、权限、缓存） | `@timing_decorator`, `@check_permission` |

Python 的 **装饰器** 提供了一种强大的方式来**增强代码功能**，而不破坏原始代码结构。它被广泛用于 **Web 开发（Flask/Django）、日志记录、权限控制** 等场景。🚀