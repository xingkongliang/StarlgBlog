---
sidebar_position: 367
tags:
  - math
  - binary-search
  - Easy
---

# 367.验证完全平方数

标签: `math`, `binary-search`

难度: Easy

通过率: 43.97%

原题链接: https://leetcode.com/problems/valid-perfect-square/description/

## 题目描述
给定一个正整数 `num`，如果 `num` 是一个完全平方数，返回 `true`；否则返回 `false`。完全平方数是一个整数，是另一个整数的平方，即是某个整数与其自身的乘积。你不能使用任何内置的库函数，比如 `sqrt`。

## 解题思路
可以通过二分查找来确定一个数是否为完全平方数。

首先，我们知道对一个正整数 `num` 来说，如果它是一个完全平方数，那么它可以表示为一个整数乘以自身。如果我们假设这个整数为 `x`，则有 $x^2 = num$。

利用二分查找的思想：
1. 初始化左边界 `left` 为 1，右边界 `right` 为 `num`。
2. 计算中间值 `mid = (left + right) // 2`。
3. 计算 `mid` 的平方 `mid^2`。
4. 如果 `mid^2` 刚好等于 `num`，则 `num` 是完全平方数，返回 `true`。
5. 如果 `mid^2` 小于 `num`，则说明我们的目标数在 `mid` 的右侧，更新`left = mid + 1`。
6. 如果 `mid^2` 大于 `num`，则说明我们的目标数在 `mid` 的左侧，更新`right = mid - 1`。
7. 如果循环结束时没有找到，我们返回 `false`。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def isPerfectSquare(num):
    # 初始条件，左边界为1，右边界为num
    left, right = 1, num
    while left <= right:
        mid = (left + right) // 2
        mid_squared = mid * mid
        if mid_squared == num:
            return True
        elif mid_squared < num:
            left = mid + 1
        else:
            right = mid - 1
    return False

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    bool isPerfectSquare(int num) {
        long left = 1, right = num;
        while (left <= right) {
            long mid = left + (right - left) / 2;
            long mid_squared = mid * mid;
            if (mid_squared == num) {
                return true;
            } else if (mid_squared < num) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return false;
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function isPerfectSquare(num) {
    let left = 1, right = num;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const mid_squared = mid * mid;
        if (mid_squared === num) {
            return true;
        } else if (mid_squared < num) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return false;
}

```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public boolean isPerfectSquare(int num) {
        long left = 1, right = num;
        while (left <= right) {
            long mid = left + (right - left) / 2;
            long mid_squared = mid * mid;
            if (mid_squared == num) {
                return true;
            } else if (mid_squared < num) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return false;
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(\log n)$，其中 $n$ 是给定的 `num`。这是因为我们使用了二分查找的方法，每次查找时都会将问题的规模减少一半。  
  
空间复杂度为 $O(1)$，因为我们只使用了常数的额外空间来维护变量。
