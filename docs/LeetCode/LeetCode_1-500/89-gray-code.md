---
sidebar_position: 89
tags:
  - bit-manipulation
  - math
  - backtracking
  - Medium
---

# 89.格雷码

标签: `bit-manipulation`, `math`, `backtracking`

难度: Medium

通过率: 60.66%

原题链接: https://leetcode.com/problems/gray-code/description/

## 题目描述
n 位格雷码序列是一个长度为 $2^n$ 的整数序列，满足：

- 每个整数都在范围 $[0, 2^n - 1]$ 内；
- 第一个整数是 0；
- 一个整数在序列中最多出现一次；
- 序列中每对相邻整数的二进制表示形式恰好有一位不同；
- 第一个和最后一个整数的二进制表示形式也恰好有一位不同。

给定一个整数 n，返回任何有效的 n 位格雷码序列。

## 解题思路
格雷码是一种特殊的二进制编码方式，相邻的两个数只有一个位不同。当我们要生成 $n$ 位的格雷码序列时，我们可以使用以下方法：

1. **递归生成**：
   - 当 $n = 0$ 时，格雷码序列为 `[0]`。
   - 当 $n > 0$ 时，我们可以基于 $n-1$ 的格雷码序列进行构造。
     1. 首先对 $n-1$ 位的格雷码加上前缀 `0`，这些数就是前半部分。
     2. 其次对 $n-1$ 位的格雷码按逆序加上前缀 `1`，这些数就是后半部分。
   - 组合这两部分即可得到 $n$ 位的格雷码。
   
2. **位运算**：
   - 对于给定的 $i$（$0 \leq i < 2^n$），对应的格雷码是 $i$ 与 $i$ 右移一位的按位异或，也即 `i ^ (i >> 1)`。

通过上面的方法，我们可以找到一个有效的格雷码序列。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def grayCode(n):
    # 基于位运算生成格雷码序列
    result = [(i >> 1) ^ i for i in range(1 << n)]
    return result

# 示例用法
n = 2
print(grayCode(n)) # 输出: [0, 1, 3, 2]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<int> grayCode(int n) {
        vector<int> result;
        // 基于位运算生成格雷码序列
        for (int i = 0; i < (1 << n); ++i) {
            result.push_back((i >> 1) ^ i);
        }
        return result;
    }
};

// 示例用法
// Solution().grayCode(2); // 输出: [0, 1, 3, 2]
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function grayCode(n) {
    const result = [];
    // 基于位运算生成格雷码序列
    for (let i = 0; i < (1 << n); i++) {
        result.push((i >> 1) ^ i);
    }
    return result;
}

// 示例用法
let n = 2;
console.log(grayCode(n)); // 输出: [0, 1, 3, 2]
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<Integer> grayCode(int n) {
        List<Integer> result = new ArrayList<>();
        // 基于位运算生成格雷码序列
        for (int i = 0; i < (1 << n); i++) {
            result.add((i >> 1) ^ i);
        }
        return result;
    }

    public static void main(String[] args) {
        Solution sol = new Solution();
        int n = 2;
        System.out.println(sol.grayCode(n)); // 输出: [0, 1, 3, 2]
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(2^n)$，因为需要迭代生成 $2^n$ 个格雷码。
- 空间复杂度：$O(2^n)$，因为存储结果需要 $2^n$ 空间。
