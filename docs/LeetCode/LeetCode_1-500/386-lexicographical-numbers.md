---
sidebar_position: 386
tags:
  - depth-first-search
  - sort
  - Medium
---

# 386.词典序排列

标签: `depth-first-search`, `sort`

难度: Medium

通过率: 72.83%

原题链接: https://leetcode.com/problems/lexicographical-numbers/description/

## 题目描述
给定一个整数 $n$，返回范围 [1, n] 内所有数的词典序排列。要求算法运行时间为 $O(n)$，且只能使用 $O(1)$ 的额外空间。

## 解题思路
要生成从 1 到 n 的词典序排列，我们可以模拟字典顺序的遍历过程。具体来说：

1. 从 1 开始，我们可以尝试优先走深一层（即从某个数 x 变为 10 * x），这样保持了字典序的特点（类似 DFS）。
2. 如果当前数不能再深入（因为 10*x 大于 n），我们尝试增加当前数 x++。
3. 如果增加后的数最后一位是 9，或者大于 n，那么需要回退（例如从19 回到 2）。
4. 整个过程直到数大于 n 为止。

这样，通过不断的深入和回退即可生成一个符合字典序的数字序列，并且不需要额外的存储空间，只利用数值变量进行标记。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def lexicalOrder(n):
    result = []
    current = 1
    for _ in range(n):
        # 加入结果
        result.append(current)
        # 尝试深入一层
        if current * 10 <= n:
            current *= 10
        else:
            # 如果无法深入，尝试增加一
            if current >= n:
                current //= 10
            current += 1
            # 处理末尾是9或者超过范围的情况
            while current % 10 == 0:
                current //= 10
    return result

# 示例
print(lexicalOrder(13))  # 输出 [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<int> lexicalOrder(int n) {
        vector<int> result;
        int current = 1;
        for (int i = 0; i < n; ++i) {
            result.push_back(current);
            // 尝试深入一层
            if (current * 10 <= n) {
                current *= 10;
            } else {
                // 如果无法深入，尝试增加一
                if (current >= n) {
                    current /= 10;
                }
                current += 1;
                // 处理末尾是9或者超过范围的情况
                while (current % 10 == 0) {
                    current /= 10;
                }
            }
        }
        return result;
    }
};

// 示例
Solution().lexicalOrder(13);  // 输出 [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9]
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function lexicalOrder(n) {
    const result = [];
    let current = 1;
    for (let i = 0; i < n; i++) {
        result.push(current);
        // 尝试深入一层
        if (current * 10 <= n) {
            current *= 10;
        } else {
            // 如果无法深入，尝试增加一
            if (current >= n) {
                current = Math.floor(current / 10);
            }
            current += 1;
            // 处理末尾是9或者超过范围的情况
            while (current % 10 === 0) {
                current = Math.floor(current / 10);
            }
        }
    }
    return result;
}

// 示例
console.log(lexicalOrder(13));  // 输出 [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9]
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public List<Integer> lexicalOrder(int n) {
        List<Integer> result = new ArrayList<>();
        int current = 1;
        for (int i = 0; i < n; i++) {
            result.add(current);
            // 尝试深入一层
            if (current * 10 <= n) {
                current *= 10;
            } else {
                // 如果无法深入，尝试增加一
                if (current >= n) {
                    current /= 10;
                }
                current += 1;
                // 处理末尾是9或者超过范围的情况
                while (current % 10 == 0) {
                    current /= 10;
                }
            }
        }
        return result;
    }
}

// 示例
new Solution().lexicalOrder(13);  // 输出 [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9]
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，因为每个数都被访问了一次并按字典顺序直接添加到结果中。  
  
空间复杂度为 $O(1)$，因为除了结果数组，使用常量额外的空间。
