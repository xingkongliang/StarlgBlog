---
sidebar_position: 387
tags:
  - hash-table
  - string
  - Easy
---

# 387.字符串中的第一个唯一字符

标签: `hash-table`, `string`

难度: Easy

通过率: 62.91%

原题链接: https://leetcode.com/problems/first-unique-character-in-a-string/description/

## 题目描述
给定一个字符串 $s$，找到它的第一个不重复的字符并返回其索引。如果不存在，则返回 -1。

## 解题思路
我们可以通过使用哈希表来解决这个问题。这种方法的基本思路是通过两次遍历字符串，首先统计每个字符出现的次数，然后找到第一个出现次数为1的字符。具体步骤如下：

1. 创建一个哈希表，用于存储每个字符对应的出现次数。
2. 遍历字符串，对于每个字符，将其在哈希表中的计数加1。
3. 再次遍历字符串，检查每个字符是否在哈希表中的计数为1，若是，则返回该字符的索引。
4. 如果遍历结束都没有找到这样一个字符，返回 -1。

这种方法能够保证在线性时间内找到第一个非重复字符，因此对于大多数情况下是有效的。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def firstUniqChar(s: str) -> int: 
    # 字典用于存储字符及其计数
    count = {}
    
    # 计数每个字符出现的次数
    for char in s:
        count[char] = count.get(char, 0) + 1
    
    # 找到第一个计数为1的字符
    for index, char in enumerate(s):
        if count[char] == 1:
            return index
    
    # 未找到不重复字符
    return -1

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int firstUniqChar(string s) {
    // 创建一个数组用于存储每个字符出现的次数
    vector<int> count(26, 0);
    
    // 统计每个字符出现的次数
    for (char ch : s) {
        count[ch - 'a']++;
    }
    
    // 找到第一个出现次数为1的字符
    for (int i = 0; i < s.size(); ++i) {
        if (count[s[i] - 'a'] == 1) {
            return i;
        }
    }
    
    // 未找到不重复字符
    return -1;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function firstUniqChar(s) {
    // 创建一个对象用于存储每个字符出现的次数
    const count = {};
    
    // 计数每个字符出现的次数
    for (let char of s) {
        count[char] = (count[char] || 0) + 1;
    }
    
    // 找到第一个计数为1的字符
    for (let i = 0; i < s.length; i++) {
        if (count[s[i]] === 1) {
            return i;
        }
    }
    
    // 未找到不重复字符
    return -1;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int firstUniqChar(String s) {
    // 创建一个数组用于存储每个字符出现的次数
    int[] count = new int[26];
    
    // 统计每个字符出现的次数
    for (char ch : s.toCharArray()) {
        count[ch - 'a']++;
    }
    
    // 找到第一个出现次数为1的字符
    for (int i = 0; i < s.length(); i++) {
        if (count[s.charAt(i) - 'a'] == 1) {
            return i;
        }
    }
    
    // 未找到不重复字符
    return -1;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是字符串的长度，因为我们需要遍历字符串两次。

空间复杂度：$O(1)$，因为哈希表中存储的键值最多为固定数量，即字母表中的字符数。
