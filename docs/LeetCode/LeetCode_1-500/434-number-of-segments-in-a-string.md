---
sidebar_position: 434
tags:
  - string
  - Easy
---

# 434.字符串中的单词数

标签: `string`

难度: Easy

通过率: 36.27%

原题链接: https://leetcode.com/problems/number-of-segments-in-a-string/description/

## 题目描述
给定一个字符串 $s$，返回字符串中的段数。一个段被定义为一组连续的非空格字符。

## 解题思路
解题思路是扫描整个字符串，当遇到一个非空格字符且该字符前一个字符是空格（或是字符串的起始位置）时，统计段数加一。这样可以确保每个独立的连续字符段都被计数到。需要注意的是，字符串可能为空字符串或全部为空格，在这种情况下，分段数为0。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def countSegments(s: str) -> int:  
    # 初始化段数为0
    segment_count = 0
    # 遍历字符串的每一个字符
    for i in range(len(s)):
        # 如果当前字符是非空格且前一个字符是空格（或当前字符是第一个字符）
        # 那么它是一个新的段起始
        if s[i] != ' ' and (i == 0 or s[i-1] == ' '):
            segment_count += 1
    return segment_count
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int countSegments(string s) {
    // 初始化段数为0
    int segment_count = 0;
    // 遍历字符串的每一个字符
    for(int i = 0; i < s.length(); i++) {
        // 如果当前字符是非空格且前一个字符是空格（或当前字符是第一个字符）
        // 那么它是一个新的段起始
        if(s[i] != ' ' && (i == 0 || s[i-1] == ' ')) {
            segment_count++;
        }
    }
    return segment_count;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function countSegments(s) {
    // 初始化段数为0
    let segment_count = 0;
    // 遍历字符串的每一个字符
    for (let i = 0; i < s.length; i++) {
        // 如果当前字符是非空格且前一个字符是空格（或当前字符是第一个字符）
        // 那么它是一个新的段起始
        if (s[i] !== ' ' && (i === 0 || s[i-1] === ' ')) {
            segment_count++;
        }
    }
    return segment_count;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int countSegments(String s) {
        // 初始化段数为0
        int segment_count = 0;
        // 遍历字符串的每一个字符
        for (int i = 0; i < s.length(); i++) {
            // 如果当前字符是非空格且前一个字符是空格（或当前字符是第一个字符）
            // 那么它是一个新的段起始
            if (s.charAt(i) != ' ' && (i == 0 || s.charAt(i-1) == ' ')) {
                segment_count++;
            }
        }
        return segment_count;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是字符串的长度。我们需要扫描字符串中的每个字符一次。  
  
空间复杂度：$O(1)$。我们只使用了常数级别的辅助空间。
