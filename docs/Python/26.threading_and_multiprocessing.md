---
sidebar_position: 26
---

# Python 多线程与多进程
Python 提供了 `threading`（多线程）和 `multiprocessing`（多进程）模块，以支持并发编程。它们在提高程序执行效率、优化 CPU 资源使用方面非常重要。由于 **GIL（全局解释器锁）** 的存在，Python 的多线程在 CPU 密集型任务中有一定的局限，因此多进程更适合 CPU 密集型任务。

---

## **1. `threading`（多线程）**
### **概念**
- **线程（Thread）** 是操作系统调度的最小单位，多个线程可以共享同一进程的内存空间。
- **适用于 I/O 密集型任务**，如文件读写、网络请求等。
- **Python 的 `threading` 受 GIL 限制**，多个线程不能同时执行 CPU 密集型任务。

---

### **1.1 创建多线程**
```python
import threading

def print_numbers():
    for i in range(5):
        print(f"Thread: {i}")

# 创建并启动线程
thread = threading.Thread(target=print_numbers)
thread.start()
thread.join()  # 等待线程执行完毕
print("Main thread finished")
```
**输出**：
```
Thread: 0
Thread: 1
Thread: 2
Thread: 3
Thread: 4
Main thread finished
```
> `thread.join()` 确保主线程等待子线程执行完毕。

---

### **1.2 使用 `threading.Thread` 继承类**
```python
import threading

class MyThread(threading.Thread):
    def run(self):
        for i in range(3):
            print(f"Thread {self.name}: {i}")

# 创建并启动多个线程
threads = [MyThread() for _ in range(3)]
for thread in threads:
    thread.start()
for thread in threads:
    thread.join()
```
> 继承 `Thread` 类，并重写 `run()` 方法。

---

### **1.3 `threading.Lock` 线程同步**
多个线程访问共享资源时可能会发生**数据竞争**，可以使用 `Lock` 来确保同一时间只有一个线程访问资源。

```python
import threading

counter = 0
lock = threading.Lock()

def increment():
    global counter
    for _ in range(100000):
        with lock:  # 确保同一时刻只有一个线程修改 counter
            counter += 1

threads = [threading.Thread(target=increment) for _ in range(5)]

for thread in threads:
    thread.start()
for thread in threads:
    thread.join()

print(f"Final counter value: {counter}")
```
**输出（可能不稳定）：**
```
Final counter value: 500000
```
> **如果没有 `lock`，结果可能会小于 500000**，因为多个线程可能会同时读取 `counter`，导致丢失更新。

---

## **2. `multiprocessing`（多进程）**
### **概念**
- **进程（Process）** 是独立运行的程序，每个进程有自己的内存空间。
- **适用于 CPU 密集型任务**，如科学计算、图像处理等。
- **绕过 GIL**，可真正实现多核 CPU 并行计算。

---

### **2.1 创建多进程**
```python
import multiprocessing

def print_numbers():
    for i in range(5):
        print(f"Process: {i}")

# 创建并启动进程
process = multiprocessing.Process(target=print_numbers)
process.start()
process.join()  # 等待进程执行完毕
print("Main process finished")
```
> 与 `threading.Thread` 类似，但使用 `multiprocessing.Process`。

---

### **2.2 使用 `multiprocessing.Process` 继承类**
```python
import multiprocessing

class MyProcess(multiprocessing.Process):
    def run(self):
        for i in range(3):
            print(f"Process {self.name}: {i}")

# 创建并启动多个进程
processes = [MyProcess() for _ in range(3)]
for process in processes:
    process.start()
for process in processes:
    process.join()
```
> `Process` 继承方式类似 `Thread`。

---

### **2.3 `multiprocessing.Queue` 进程间通信**
不同进程之间**不能共享全局变量**，但可以通过 `Queue` 进行数据传递。
```python
import multiprocessing

def worker(q):
    q.put("Hello from process")

queue = multiprocessing.Queue()
process = multiprocessing.Process(target=worker, args=(queue,))
process.start()
process.join()

print(queue.get())  # 输出: Hello from process
```

---

### **2.4 `multiprocessing.Pool` 进程池**
如果需要管理多个进程，`Pool` 提供了更方便的方式。
```python
import multiprocessing

def square(n):
    return n * n

pool = multiprocessing.Pool(processes=4)  # 4 个进程
results = pool.map(square, [1, 2, 3, 4, 5])
pool.close()
pool.join()

print(results)  # 输出: [1, 4, 9, 16, 25]
```
> `map()` 可自动分配任务到多个进程。

---

## **3. GIL（全局解释器锁）机制**
### **概念**
- **GIL（Global Interpreter Lock）** 是 Python 解释器的锁，**同一时刻只能有一个线程执行 Python 代码**，即使有多个 CPU 核心。
- 这意味着 Python **多线程** **不能利用多核 CPU 并行执行**，而**多进程可以绕过 GIL**。

### **如何选择？**
| 任务类型 | 适合方式 | 解释 |
|----------|---------|-----|
| I/O 密集型（文件、网络请求） | `threading` | 线程在 I/O 操作时释放 GIL |
| CPU 密集型（计算、图像处理） | `multiprocessing` | 绕过 GIL，真正并行 |
| 大量小任务 | `concurrent.futures` | 线程池/进程池更优 |

---

## **4. 总结**
| **特性** | **多线程 (`threading`)** | **多进程 (`multiprocessing`)** |
|----------|----------------|----------------|
| **适用场景** | I/O 密集型（网络、磁盘） | CPU 密集型（计算、图像） |
| **全局解释器锁（GIL）** | 受限 | 无限制 |
| **内存使用** | 共享进程内存 | 独立进程，不共享内存 |
| **数据共享** | 需要 `Lock` | 需要 `Queue/Pipe` |
| **创建开销** | 小 | 大 |
| **执行方式** | `Thread` | `Process` |

### **推荐使用方式**
1. **I/O 密集型任务**（网络爬虫、文件读写）→ `threading`
2. **CPU 密集型任务**（数学计算、图像处理）→ `multiprocessing`
3. **大量小任务**（任务池）→ `concurrent.futures.ThreadPoolExecutor` / `ProcessPoolExecutor`

---

## **5. 实践案例：多线程 vs 多进程**
### **任务：计算 1-1000000 的平方和**
```python
import threading
import multiprocessing

def calculate_sum(n):
    return sum(i * i for i in range(n))

n = 10**6

# 多线程
thread = threading.Thread(target=calculate_sum, args=(n,))
thread.start()
thread.join()

# 多进程
process = multiprocessing.Process(target=calculate_sum, args=(n,))
process.start()
process.join()
```
> 由于 GIL 存在，**多线程不会比单线程快**，但 **多进程可以真正加速计算**。

---

### **结论**
Python 的 **`threading` 适合 I/O 密集型任务**，而 **`multiprocessing` 适合 CPU 密集型任务**。通过合理使用，可以大幅提升程序性能！🚀