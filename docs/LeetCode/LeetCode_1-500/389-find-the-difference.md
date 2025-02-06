---
sidebar_position: 389
tags:
  - hash-table
  - string
  - bit-manipulation
  - Easy
---

# 389.找到不同字符

标签: `hash-table`, `string`, `bit-manipulation`

难度: Easy

通过率: 59.54%

原题链接: https://leetcode.com/problems/find-the-difference/description/

## 题目描述
给定两个字符串 $s$ 和 $t$。字符串 $t$ 是通过随机打乱字符串 $s$ 并添加一个随机字母生成的，返回添加到 $t$ 中的字母。

## 解题思路
对于这个问题，我们可以使用位运算（异或操作）来找出不同的字符。由于字符对象在计算机中可以用整数表示，异或操作可以把相同字符抵消，仅留下不同的那个字符。具体思路为：将字符串 $s$ 和 $t$ 的所有字符进行异或操作，最终得到的结果就是两字符串中不同的字符。在异或的过程中，相同字符将被抵消，因为 $a \oplus a = 0$。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def findTheDifference(s: str, t: str) -> str:  
    # 初始化结果为0，这是因为任何数和0异或是其自身。
    result = 0  
    # 将字符串s和t里的所有字符都做异或操作
    for char in s + t:  
        # 异或字符，将其转换为整数
        result ^= ord(char)  
    # 异或后的结果转换回字符即为所求字符  
    return chr(result)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    char findTheDifference(string s, string t) {
        char result = 0;
        // 遍历字符串s和t并对每个字符进行异或
        for (char c : s + t) {
            result ^= c;
        }
        return result; // 返回最终异或结果
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function findTheDifference(s) {
    let result = 0;
    // 将字符串s和t里的所有字符都做异或操作
    for (let char of s + t) {
        result ^= char.charCodeAt(0);
    }
    // 异或后的结果转换回字符即为所求字符
    return String.fromCharCode(result);
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public char findTheDifference(String s, String t) {
        char result = 0;
        // 遍历字符串s和t并对每个字符进行异或
        for (char c : s.toCharArray()) {
            result ^= c;
        }
        for (char c : t.toCharArray()) {
            result ^= c;
        }
        return result; // 返回最终异或结果
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是字符串 $s$ 的长度。我们需要遍历字符串 $s$ 和 $t$ 的总长度，因此时间复杂度是线性级别的。  
  
空间复杂度：$O(1)$。除了有限个变量用于计算，未使用额外的数据结构，因此空间复杂度是常数级别的。
