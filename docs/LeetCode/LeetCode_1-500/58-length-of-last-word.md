---
sidebar_position: 58
tags:
  - string
  - Easy
---

# 58.最后单词的长度

标签: `string`

难度: Easy

通过率: 54.68%

原题链接: https://leetcode.com/problems/length-of-last-word/description/

## 题目描述
给定一个由单词和空格组成的字符串 $s$，返回字符串中最后一个单词的长度。一个单词是只包含非空格字符的最大子字符串。

## 解题思路
要找出字符串中最后一个单词的长度，我们可以从字符串的末尾开始向前遍历，忽略结尾的空格后，从这里的第一个非空字符开始计数，直到遇到下一个空格或到达字符串的开头。这样，我们可以很高效地找到最后一个单词并计算其长度。具体步骤如下：  
1. 从字符串的末尾开始向前遍历，跳过所有空格。  
2. 一旦遇到第一个非空格字符，开始计数。  
3. 继续向前遍历，直到再次遇到空格，或者到达字符串开头。这时累积的计数器就是最后一个单词的长度。  
这种方法避免了在字符串中间或开始位置多余的单词和空格出现问题，有效地找到最后一个单词。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def length_of_last_word(s: str) -> int: 
    # 初始化计数器
    length = 0
    # 从字符串的最后一个字符开始向前遍历
    i = len(s) - 1
    
    # 跳过末尾的空格
    while i >= 0 and s[i] == ' ':
        i -= 1
    
    # 计算最后一个单词的长度
    while i >= 0 and s[i] != ' ':
        length += 1
        i -= 1
        
    return length
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int lengthOfLastWord(string s) {
    int length = 0;
    int i = s.length() - 1;
    
    // 跳过末尾的空格
    while (i >= 0 && s[i] == ' ') {
        i--;
    }
    
    // 计算最后一个单词的长度
    while (i >= 0 && s[i] != ' ') {
        length++;
        i--;
    }
    return length;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
var lengthOfLastWord = function(s) {
    let length = 0;
    let i = s.length - 1;
    
    // 跳过末尾的空格
    while (i >= 0 && s[i] === ' ') {
        i--;
    }
    
    // 计算最后一个单词的长度
    while (i >= 0 && s[i] !== ' ') {
        length++;
        i--;
    }
    return length;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int lengthOfLastWord(String s) {
        int length = 0;
        int i = s.length() - 1;
        
        // 跳过末尾的空格
        while (i >= 0 && s.charAt(i) == ' ') {
            i--;
        }
        
        // 计算最后一个单词的长度
        while (i >= 0 && s.charAt(i) != ' ') {
            length++;
            i--;
        }
        return length;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度**: $O(n)$，其中 $n$ 是字符串的长度。因为在最坏情况下，我们可能需要遍历整个字符串。  
**空间复杂度**: $O(1)$，因为我们只使用了有限的额外空间。
