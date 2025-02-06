---
sidebar_position: 412
tags:
  - array
  - math
  - Easy
---

# 412.412. Fizz Buzz

标签: `array`, `math`

难度: Easy

通过率: 73.47%

原题链接: https://leetcode.com/problems/fizz-buzz/description/

## 题目描述
给定一个整数 $n$，返回一个字符串数组 $answer$，其中：
```
answer[i] == "FizzBuzz" 如果 i 能同时被 3 和 5 整除。
answer[i] == "Fizz" 如果 i 能被 3 整除。
answer[i] == "Buzz" 如果 i 能被 5 整除。
answer[i] == i （作为字符串）如果以上条件都不满足。
```

## 解题思路
题目要求对于从1到$n$的每一个数，判断其是否可以被3整除，被5整除，或者同时被3和5整除，并有不同的输出。根据条件我们可以简单地使用条件语句来实现：
- 如果一个数字$i$同时被3和5整除，我们输出"FizzBuzz"；
- 如果只被3整除，则输出"Fizz"；
- 如果只被5整除，则输出"Buzz"；
- 如果以上条件都不满足，则输出该数字本身。

这种题目理论上是经典的练习条件判断的例子，按顺序检查每一个数即可。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def fizzBuzz(n):
    # 初始化一个空列表储存结果
    result = []
    # 遍历1到n
    for i in range(1, n+1):
        # 如果同时被3和5整除，将其值为'FizzBuzz'
        if i % 3 == 0 and i % 5 == 0:
            result.append('FizzBuzz')
        # 如果只被3整除，将其值为'Fizz'
        elif i % 3 == 0:
            result.append('Fizz')
        # 如果只被5整除，将其值为'Buzz'
        elif i % 5 == 0:
            result.append('Buzz')
        # 如果都不满足，直接转化为字符串存入结果
        else:
            result.append(str(i))
    # 返回结果列表
    return result

print(fizzBuzz(15))
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
vector<string> fizzBuzz(int n) {
    vector<string> result;
    for (int i = 1; i <= n; ++i) {
        // 如果同时被3和5整除
        if (i % 3 == 0 && i % 5 == 0) {
            result.push_back("FizzBuzz");
        }
        // 如果只被3整除
        else if (i % 3 == 0) {
            result.push_back("Fizz");
        }
        // 如果只被5整除
        else if (i % 5 == 0) {
            result.push_back("Buzz");
        }
        // 如果都不满足
        else {
            result.push_back(to_string(i));
        }
    }
    return result;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function fizzBuzz(n) {
    const result = [];
    for (let i = 1; i <= n; i++) {
        // 判断能同时被3和5整除
        if (i % 3 === 0 && i % 5 === 0) {
            result.push('FizzBuzz');
        } 
        // 判断能被3整除
        else if (i % 3 === 0) {
            result.push('Fizz');
        } 
        // 判断能被5整除
        else if (i % 5 === 0) {
            result.push('Buzz');
        } 
        // 不满足以上条件
        else {
            result.push(i.toString());
        }
    }
    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

public class Solution {
    public List<String> fizzBuzz(int n) {
        List<String> result = new ArrayList<>();
        for (int i = 1; i <= n; i++) {
            // 如果同时被3和5整除
            if (i % 3 == 0 && i % 5 == 0) {
                result.add("FizzBuzz");
            }
            // 如果只被3整除
            else if (i % 3 == 0) {
                result.add("Fizz");
            }
            // 如果只被5整除
            else if (i % 5 == 0) {
                result.add("Buzz");
            }
            // 如果都不满足
            else {
                result.add(Integer.toString(i));
            }
        }
        return result;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度是 $O(n)$，因为我们需要遍历从1到$n$的每个数。  
  
空间复杂度是 $O(1)$，不包含存储结果的输出数组。
