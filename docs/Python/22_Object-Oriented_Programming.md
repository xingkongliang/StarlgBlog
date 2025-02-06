---
sidebar_position: 22
---

# Python 面向对象编程（OOP）介绍及实例

面向对象编程（Object-Oriented Programming, OOP）是一种编程范式，它将程序组织为 **对象（Object）**，对象是 **类（Class）** 的实例。OOP 主要有 **封装（Encapsulation）**、**继承（Inheritance）** 和 **多态（Polymorphism）** 三大特性。

---

## **1. 类与对象 (`class`, `self`)**
### **概念**
- **类（Class）** 是对象的模板，定义了对象的属性（变量）和方法（函数）。
- **对象（Object）** 是类的具体实例。
- `self` 代表当前对象的实例，必须在类的方法中作为第一个参数。

### **实例**
```python
class Person:
    def __init__(self, name, age):  # 构造函数
        self.name = name
        self.age = age

    def introduce(self):  # 实例方法
        print(f"My name is {self.name} and I am {self.age} years old.")

# 创建对象
p1 = Person("Alice", 25)
p1.introduce()  # 输出: My name is Alice and I am 25 years old.
```

---

## **2. `__init__` 构造函数，`__str__`，`__repr__`**
### **概念**
- `__init__` 是 Python 的构造方法（构造函数），在创建对象时自动调用，用于初始化对象的属性。
- `__str__` 定义对象的**用户可读字符串**表示（`print()` 调用）。
- `__repr__` 返回**更正式的字符串**，通常用于调试，应该返回一个**可以用 `eval()` 解析**的字符串。

### **实例**
```python
class Car:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

    def __str__(self):
        return f"{self.brand} {self.model}"  # 用户可读字符串

    def __repr__(self):
        return f"Car('{self.brand}', '{self.model}')"  # 供开发者调试

car1 = Car("Tesla", "Model 3")
print(str(car1))   # 输出: Tesla Model 3
print(repr(car1))  # 输出: Car('Tesla', 'Model 3')
```

---

## **3. 继承、多态、封装**
### **概念**
- **继承（Inheritance）**：一个类可以继承另一个类的属性和方法，提高代码复用性。
- **多态（Polymorphism）**：子类可以重写父类的方法，实现不同的行为。
- **封装（Encapsulation）**：将数据和方法封装到类内部，避免外部直接修改数据，提高安全性。

### **实例**
```python
# 父类（基类）
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):  # 这是一个多态方法，子类可以重写
        raise NotImplementedError("Subclass must implement abstract method")

# 子类（派生类）
class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

dog = Dog("Buddy")
cat = Cat("Kitty")

print(dog.speak())  # 输出: Buddy says Woof!
print(cat.speak())  # 输出: Kitty says Meow!
```

### **封装示例**
```python
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self.__balance = balance  # 私有属性

    def deposit(self, amount):
        self.__balance += amount

    def withdraw(self, amount):
        if amount > self.__balance:
            print("Insufficient funds")
        else:
            self.__balance -= amount

    def get_balance(self):  # 通过方法访问私有属性
        return self.__balance

# 创建账户
account = BankAccount("Alice", 1000)
account.deposit(500)
print(account.get_balance())  # 输出: 1500
# print(account.__balance)  # AttributeError: 'BankAccount' object has no attribute '__balance'
```
> **注意**: `__balance` 是私有变量，不能直接访问，必须通过 `get_balance()` 方法获取。

---

## **4. 类方法 (`@classmethod`) 和静态方法 (`@staticmethod`)**
### **概念**
- `@classmethod` **类方法**: 作用于类，而不是实例。第一个参数是 `cls`，代表类本身。
- `@staticmethod` **静态方法**: 不依赖实例和类，可独立使用，没有 `self` 或 `cls`。

### **实例**
```python
class MathOperations:
    _pi = 3.14159  # 类属性

    @classmethod
    def get_pi(cls):
        return cls._pi

    @staticmethod
    def add(a, b):
        return a + b

# 调用类方法
print(MathOperations.get_pi())  # 输出: 3.14159

# 调用静态方法
print(MathOperations.add(3, 5))  # 输出: 8
```

---

## **5. 运算符重载 (`__add__`, `__eq__`)**
### **概念**
- Python 允许重载运算符，使自定义对象支持 `+`, `==` 等运算。
- 通过重载 `__add__`，可以让两个对象相加。
- 通过重载 `__eq__`，可以比较两个对象是否相等。

### **实例**
```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __str__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(2, 3)
v2 = Vector(4, 5)
v3 = v1 + v2  # 调用 __add__ 方法
print(v3)  # 输出: Vector(6, 8)

print(v1 == v2)  # False
print(v1 == Vector(2, 3))  # True
```

---

## **总结**
|  **OOP 概念**  | **说明** | **示例方法** |
|---------------|---------|-------------|
| **类与对象** | `class` 定义类，实例化对象 | `Person` |
| **构造函数** | `__init__` 用于初始化对象 | `Car` |
| **字符串表示** | `__str__`, `__repr__` 定义对象的文本表示 | `Car` |
| **继承** | 子类继承父类的方法和属性 | `Animal -> Dog/Cat` |
| **多态** | 子类重写父类方法 | `speak()` |
| **封装** | 私有属性 (`__balance`) | `BankAccount` |
| **类方法** | `@classmethod` 操作类本身 | `get_pi()` |
| **静态方法** | `@staticmethod` 与类和实例无关 | `add(a, b)` |
| **运算符重载** | `__add__`, `__eq__` | `Vector` |

通过这些概念和实例，你可以更好地理解 **Python 面向对象编程** 并运用到实际项目中！ 🚀