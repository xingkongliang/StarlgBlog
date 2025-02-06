---
sidebar_position: 202
tags:
  - math
  - hash-table
  - Easy
---

# 202.快乐数

标签: `math`, `hash-table`

难度: Easy

通过率: 57.21%

原题链接: https://leetcode.com/problems/happy-number/description/

## 题目描述
编写算法判断一个数n是否是快乐数。`一个快乐数是通过以下过程定义的：从任意一个正整数开始，将该数替换为其各个位数字的平方和，并重复该过程，直到该数为1（在这种情况下它就是快乐数），或者它陷入了一个不包含1的无限循环中。返回n是快乐数则为true，否则为false。`示例：`输入: n = 19`输出: true`解释:` $1^2 + 9^2 = 82$` $8^2 + 2^2 = 68$` $6^2 + 8^2 = 100$ ` $1^2 + 0^2 + 0^2 = 1$

## 解题思路
为了判断一个数是否是快乐数，我们可以利用检测循环的方法来解决这个问题。对于任意一个数字n，我们可以计算其每位数字的平方和，重复这一过程，直到结果为1（表示是快乐数）或者陷入一个循环。为此，可以使用一个哈希集合来存储以前出现的所有数字，如果某个数字重复出现，说明进入了循环，不可能是快乐数。具体步骤如下：1. 初始化一个集合用于存储之前出现的值。2. 对n进行处理，计算其每位的平方和，如果平方和为1，返回true，因为此时是快乐数。3. 如果平方和已存在于集合中，返回false，表示这不是快乐数。4. 如果平方和不在集合中，重复步骤2和3。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def isHappy(n):
    def get_next(number):
        total_sum = 0
        while number > 0:
            number, digit = divmod(number, 10)
            total_sum += digit ** 2
        return total_sum

    seen = set()
    while n != 1 and n not in seen:
        seen.add(n)
        n = get_next(n)
    return n == 1
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <unordered_set>
using namespace std;

class Solution {
public:
    bool isHappy(int n) {
        auto get_next = [](int n) {
            int total_sum = 0;
            while (n > 0) {
                int digit = n % 10;
                total_sum += digit * digit;
                n /= 10;
            }
            return total_sum;
        };

        unordered_set<int> seen;
        while (n != 1 && seen.find(n) == seen.end()) {
            seen.insert(n);
            n = get_next(n);
        }
        return n == 1;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function isHappy(n) {
    const getNext = (number) => {
        let totalSum = 0;
        while (number > 0) {
            const digit = number % 10;
            totalSum += digit * digit;
            number = Math.floor(number / 10);
        }
        return totalSum;
    }

    const seen = new Set();
    while (n !== 1 && !seen.has(n)) {
        seen.add(n);
        n = getNext(n);
    }
    return n === 1;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.HashSet;
import java.util.Set;

public class Solution {
    public boolean isHappy(int n) {
        Set<Integer> seen = new HashSet<>();
        while (n != 1 && !seen.contains(n)) {
            seen.add(n);
            n = getNext(n);
        }
        return n == 1;
    }

    private int getNext(int n) {
        int totalSum = 0;
        while (n > 0) {
            int digit = n % 10;
            totalSum += digit * digit;
            n /= 10;
        }
        return totalSum;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：由于每次迭代都需要计算一次各位数字的平方和，最坏情况下需要通过多次迭代来形成一个循环或达到1。对于每个数字，我们最多迭代$O(	ext{log} n)$次，故时间复杂度为$O(	ext{log} n)$. ` `空间复杂度：我们使用一个集合去记录已经出现过的数字，所以空间复杂度为$O(	ext{log} n)$，最坏情况下每次计算结果均不相同，都被记录。
