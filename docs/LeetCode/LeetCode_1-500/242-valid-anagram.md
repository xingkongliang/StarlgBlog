---
sidebar_position: 242
tags:
  - hash-table
  - string
  - sort
  - Easy
---

# 242.有效的字母异位词

标签: `hash-table`, `string`, `sort`

难度: Easy

通过率: 65.75%

原题链接: https://leetcode.com/problems/valid-anagram/description/

## 题目描述
给定两个字符串 $s$ 和 $t$，如果 $t$ 是 $s$ 的字母异位词，则返回 true ，否则返回 false。

## 解题思路
要解决此问题，可以采用以下思路：

1. **排序法**：因为若 $t$ 是 $s$ 的字母异位词，则它们排序后的结果相同。可以对两个字符串分别排序，然后比较排序后的结果是否相同。

2. **哈希表法**：可以使用哈希表来统计两个字符串中每个字符的出现次数。若两个字符串是字母异位词，它们的字符计数应该是一样的。在遍历字符串的过程中，将第一个字符串的字符计数增加，第二个字符串的字符计数减少，最后判断哈希表中所有字符的计数是否为零。如果是，则表示 $t$ 是 $s$ 的字母异位词。

本题可以选择第二种方法来提高效率，因为直接比较字符计数可以在线性时间内完成。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def isAnagram(s: str, t: str) -> bool:
    # 如果两个字符串长度不同，则不可能是字母异位词
    if len(s) != len(t):
        return False
    
    # 创建一个哈希表来记录字符出现的次数
    count = {}
    
    # 遍历第一个字符串，记录每个字符的次数
    for char in s:
        count[char] = count.get(char, 0) + 1
    
    # 遍历第二个字符串，减少每个字符的次数
    for char in t:
        if char not in count:
            return False
        count[char] -= 1
        if count[char] < 0:
            return False
    
    return True
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
bool isAnagram(string s, string t) {
    // 如果长度不相等，直接返回 false
    if (s.size() != t.size()) return false;
    
    // 定义哈希表，记录字符的出现次数
    unordered_map<char, int> count;
    
    // 遍历第一个字符串并记录字符出现次数
    for (char c : s) {
        count[c]++;
    }
    
    // 遍历第二个字符串并减少字符出现次数
    for (char c : t) {
        if (count.find(c) == count.end() || count[c] == 0) {
            return false;
        }
        count[c]--;
    }
    
    return true;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function isAnagram(s, t) {
    // 如果两个字符串的长度不同，直接返回 false
    if (s.length !== t.length) return false;
    
    // 使用一个对象来记录每个字符出现的次数
    const count = {};
    
    // 遍历第一个字符串来增加字符计数
    for (const char of s) {
        count[char] = (count[char] || 0) + 1;
    }
    
    // 遍历第二个字符串，减少字符计数
    for (const char of t) {
        if (!count[char]) {
            return false;
        }
        count[char]--;
    }
    
    return true;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public boolean isAnagram(String s, String t) {
    // 如果两个字符串长度不同，直接返回 false
    if (s.length() != t.length()) return false;
    
    // 使用一个数组记录每个字符出现次数
    int[] count = new int[26];
    
    // 遍历第一个字符串并记录字符出现次数
    for (int i = 0; i < s.length(); i++) {
        count[s.charAt(i) - 'a']++;
    }
    
    // 遍历第二个字符串，减少字符出现次数
    for (int i = 0; i < t.length(); i++) {
        count[t.charAt(i) - 'a']--;
        if (count[t.charAt(i) - 'a'] < 0) {
            return false;
        }
    }
    
    return true;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 为字符串的长度，因需遍历整个字符串。  
  
空间复杂度为 $O(1)$，因为只需固定大小的哈希表存储字符计数，大小与字符集大小有关。
