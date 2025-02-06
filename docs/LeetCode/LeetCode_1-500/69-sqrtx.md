---
sidebar_position: 69
tags:
  - binary-search
  - math
  - Easy
---

# 69.Sqrt(x) 求平方根

标签: `binary-search`, `math`

难度: Easy

通过率: 39.73%

原题链接: https://leetcode.com/problems/sqrtx/description/

## 题目描述
给定一个非负整数 $x$，计算其平方根并返回结果的整数部分。要求不能使用任何内置的指数函数或运算符。

## 解题思路
我们可以通过二分查找算法来求解这一问题。基本思路是：

- 设定两个指针 $left$ 和 $right$，初始化为 0 和 $x$。
- 二分查找：
  - 计算中间值 $mid = \frac{left + right}{2}$。
  - 如果 $mid \times mid \leq x < (mid + 1) \times (mid + 1)$ ，那么 $mid$ 就是我们要寻找的平方根的整数部分。
  - 如果 $mid \times mid > x$，则调整 $right = mid - 1$。
  - 如果 $mid \times mid < x$，则调整 $left = mid + 1$。
- 继续反复上述过程，直到 $left$ 超过 $right$，此时可能余留下的 $right$ 即是所求的平方根整数部分。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def mySqrt(x):
    if x == 0:
        return 0
    # 初始化查找范围
    left, right = 1, x
    while left <= right:
        mid = (left + right) // 2
        # 判断mid是否是结果
        if mid * mid <= x < (mid + 1) * (mid + 1):
            return mid
        elif mid * mid > x:
            right = mid - 1
        else:
            left = mid + 1

# 示例运行
print(mySqrt(4))  # 输出: 2
print(mySqrt(8))  # 输出: 2
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int mySqrt(int x) {
    if (x == 0) return 0;
    int left = 1, right = x, mid, sqrt;
    while (left <= right) {
        mid = left + (right - left) / 2;
        if (mid <= x / mid) { // 防止mid*mid溢出，转换条件
            sqrt = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return sqrt;
}

// 示例运行
// cout << mySqrt(4) << endl;  // 输出: 2
// cout << mySqrt(8) << endl;  // 输出: 2
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function mySqrt(x) {
    if (x === 0) return 0;
    let left = 1, right = x;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (mid * mid <= x && (mid + 1) * (mid + 1) > x) {
            return mid;
        } else if (mid * mid > x) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
}

// 示例运行
// console.log(mySqrt(4));  // 输出: 2
// console.log(mySqrt(8));  // 输出: 2
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int mySqrt(int x) {
    if (x == 0) return 0;
    int left = 1, right = x, mid, sqrt = 0;
    while (left <= right) {
        mid = left + (right - left) / 2;
        if (mid <= x / mid) { // 防止mid*mid溢出，转换条件
            sqrt = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return sqrt;
}

// 示例运行
// System.out.println(mySqrt(4));  // 输出: 2
// System.out.println(mySqrt(8));  // 输出: 2
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(\log{x})$，因为我们使用二分查找。
空间复杂度：$O(1)$，只使用了常量级别的额外空间。
