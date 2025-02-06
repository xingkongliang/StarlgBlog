---
sidebar_position: 205
tags:
  - hash-table
  - string
  - Easy
---

# 205.同构字符串

标签: `hash-table`, `string`

难度: Easy

通过率: 46.07%

原题链接: https://leetcode.com/problems/isomorphic-strings/description/

## 题目描述
给定两个字符串 s 和 t，判断它们是否是同构的。两个字符串是同构的，如果 s 中的字符可以替换为得到 t。字符的所有出现必须用另一个字符替换，同时保持字符的顺序。没有两个字符可以映射到同一个字符，但一个字符可以映射到它自己。

## 解题思路
要判断两个字符串是否是同构的，可以使用两个哈希表，分别用于字符的双向映射：

1. 第一个哈希表 `map_s` 用于存储从 s 到 t 的映射。
2. 第二个哈希表 `map_t` 用于存储从 t 到 s 的映射。

通过迭代字符串 s 和 t 的每个字符，对每个字符对 `(c1, c2)`：
- 如果 `c1` 已存在于 `map_s` 中，检查其对应的值是否是 `c2`。若不是，则返回 false。
- 如果 `c2` 已存在于 `map_t` 中，检查其对应的值是否是 `c1`。若不是，则返回 false。
- 如果 `c1` 和 `c2` 均未被映射，将它们互映。

当遍历完所有字符后，如果没有发现冲突，两个字符串就是同构的，返回 true。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def isIsomorphic(s: str, t: str) -> bool:
    # 记录字符串 s 到 t 的映射
    map_s = {}
    # 记录字符串 t 到 s 的映射
    map_t = {}
    for c1, c2 in zip(s, t):
        # 如果 c1 已经映射过，但映射的结果不是 c2，返回 False
        if c1 in map_s:
            if map_s[c1] != c2:
                return False
        # 如果 c2 已经映射过，但映射的结果不是 c1，返回 False
        elif c2 in map_t:
            if map_t[c2] != c1:
                return False
        # 将 c1 映射到 c2 并且 c2 映射到 c1
        else:
            map_s[c1] = c2
            map_t[c2] = c1
    return True
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    bool isIsomorphic(string s, string t) {
        unordered_map<char, char> map_s;
        unordered_map<char, char> map_t;
        for (int i = 0; i < s.size(); ++i) {
            char c1 = s[i], c2 = t[i];
            if (map_s.count(c1) && map_s[c1] != c2) return false;
            if (map_t.count(c2) && map_t[c2] != c1) return false;
            map_s[c1] = c2;
            map_t[c2] = c1;
        }
        return true;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function isIsomorphic(s, t) {
    const mapS = new Map();
    const mapT = new Map();
    for (let i = 0; i < s.length; i++) {
        const c1 = s[i], c2 = t[i];
        if (mapS.has(c1) && mapS.get(c1) !== c2) return false;
        if (mapT.has(c2) && mapT.get(c2) !== c1) return false;
        mapS.set(c1, c2);
        mapT.set(c2, c1);
    }
    return true;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public boolean isIsomorphic(String s, String t) {
        HashMap<Character, Character> mapS = new HashMap<>();
        HashMap<Character, Character> mapT = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            char c1 = s.charAt(i);
            char c2 = t.charAt(i);
            if (mapS.containsKey(c1) && mapS.get(c1) != c2)
                return false;
            if (mapT.containsKey(c2) && mapT.get(c2) != c1)
                return false;
            mapS.put(c1, c2);
            mapT.put(c2, c1);
        }
        return true;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 是字符串的长度，因为我们需要遍历每个字符。  
  
空间复杂度为 $O(1)$，最多需要存储 256 个 ASCII 字符的映射关系。
