---
sidebar_position: 0
---

# Python 学习大纲

## **第一阶段：Python 基础**
### **目标**：
掌握 Python 语法、基本数据结构，能够编写简单的 Python 程序。

### **学习内容**：
1. **Python 语法基础**
   - Python 语言特点
   - 变量、数据类型（int, float, str, list, tuple, dict, set）
   - 条件语句（`if-else`）
   - 循环结构（`for` 循环, `while` 循环）
   - 基本输入输出（`print()` 和 `input()`）

2. **函数与作用域**
   - `def` 语法，参数与返回值
   - 关键字参数 (`*args`, `**kwargs`)
   - 作用域（全局变量、局部变量）

3. **Python 内置数据结构**
   - 列表（`list`）操作，列表推导式
   - 字典（`dict`）的基本用法
   - 集合（`set`）和去重
   - 元组（`tuple`）的不可变特性

4. **文件操作**
   - 读写文本文件 (`open()`, `with` 语句)
   - 读写 CSV 和 JSON 文件

5. **错误与异常处理**
   - `try-except`
   - `finally`
   - 自定义异常类

### **实践**
✅ 刷 LeetCode 简单题  
✅ 编写一个批量重命名工具  
✅ 练习 Python 100 题（[Python练习册](https://github.com/Yixiaohan/show-me-the-code)）  

---

## **第二阶段：Python 进阶**
### **目标**：
深入理解 Python 语言特性，提高编程能力。

### **学习内容**：
1. **面向对象编程（OOP）**
   - 类与对象 (`class`, `self`)
   - `__init__` 构造函数，`__str__`，`__repr__`
   - 继承、多态、封装
   - 类方法 (`@classmethod`) 和静态方法 (`@staticmethod`)
   - 运算符重载 (`__add__`, `__eq__`)

2. **迭代器与生成器**
   - `iter()` 与 `next()`
   - `yield` 关键字
   - `itertools` 模块

3. **装饰器**
   - `@property`
   - `@staticmethod`, `@classmethod`
   - 自定义装饰器

4. **正则表达式**
   - `re` 模块
   - 常见正则匹配语法

5. **多线程与多进程**
   - `threading` 和 `multiprocessing`
   - GIL（全局解释器锁）机制

### **实践**
✅ 刷 LeetCode 中等难度题目  
✅ 实现一个 Web 爬虫  
✅ 通过 [Project Euler](https://projecteuler.net/) 做数学编程练习  

---

## **第三阶段：Python Web 开发**
### **目标**：
能够使用 Python 开发 Web 应用，熟练使用常见框架。

### **学习内容**：
1. **Web 开发基础**
   - HTTP 基础知识
   - `requests` 库发送 HTTP 请求
   - Web 服务的基本概念（RESTful API）

2. **Web 框架**
   - Flask（轻量级 Web 框架）
   - Django（全功能 Web 框架）
   - FastAPI（快速构建 API）

3. **数据库操作**
   - SQLite、MySQL、PostgreSQL
   - `SQLAlchemy` ORM 框架

4. **爬虫**
   - `requests` 发送 HTTP 请求
   - `BeautifulSoup` 解析 HTML
   - `Scrapy` 爬虫框架

### **实践**
✅ 编写一个博客系统  
✅ 用 Flask 开发 RESTful API  
✅ 使用爬虫抓取数据，并进行分析  

---

## **第四阶段：Python 数据科学 & AI**
### **目标**：
掌握数据分析、机器学习和深度学习。

### **学习内容**：
1. **数据分析**
   - `NumPy` 处理数组
   - `Pandas` 处理数据表
   - `Matplotlib` 和 `Seaborn` 数据可视化

2. **机器学习**
   - `scikit-learn` 机器学习库
   - 线性回归、决策树、SVM、随机森林
   - 交叉验证、超参数优化

3. **深度学习**
   - `TensorFlow` / `PyTorch`
   - CNN、RNN、Transformer
   - 计算机视觉、自然语言处理（NLP）

### **实践**
✅ Kaggle 竞赛  
✅ 训练一个 MNIST 手写数字识别模型  
✅ 股票市场数据分析项目  

---

## **第五阶段：Python 高级应用**
### **目标**：
掌握 Python 内部原理，提升工程能力。

### **学习内容**：
1. **Python 底层原理**
   - CPython 解释器
   - 内存管理、垃圾回收
   - `sys` 和 `os` 模块

2. **高性能 Python**
   - `Cython` 提高执行速度
   - `Numba` 优化数值计算
   - `concurrent.futures` 并行计算

3. **架构设计**
   - 设计模式（工厂模式、单例模式）
   - `asyncio` 异步编程
   - `Celery` 任务队列

### **实践**
✅ 编写一个 Python 库并上传到 PyPI  
✅ 研究 Python 源码，比如 `flask` 框架  
✅ 用 `asyncio` 实现高并发 Web 服务  

---

## **学习路线总结**
📌 **第一阶段** - 语法基础（1-2 个月）  
📌 **第二阶段** - Python 进阶（2-3 个月）  
📌 **第三阶段** - Web 开发（3-4 个月）  
📌 **第四阶段** - 数据科学/机器学习（3-6 个月）  
📌 **第五阶段** - Python 高级应用（长期）  

---

## **学习资源推荐**
1. **书籍**
   - 《Python 编程：从入门到实践》
   - 《流畅的 Python》
   - 《Python 高性能编程》

2. **在线课程**
   - [CS50 Python](https://cs50.harvard.edu/python/) - 哈佛公开课
   - [Real Python](https://realpython.com/) - 高质量 Python 教程
   - [PyTorch 官方教程](https://pytorch.org/tutorials/)

3. **在线练习平台**
   - [LeetCode](https://leetcode.com/) - 刷算法题
   - [Kaggle](https://www.kaggle.com/) - 数据分析 & 机器学习
   - [HackerRank](https://www.hackerrank.com/domains/tutorials/10-days-of-python) - Python 练习  

---

## **总结**
系统学习 Python 需要 **理论+实践** 结合，建议在学习过程中做一些小项目来加深理解。同时，结合你的目标（Web 开发、数据分析、机器学习等）来选择深入的方向。坚持练习和项目实践，才能真正掌握 Python！🚀