---
sidebar_position: 395
tags:
  - divide-and-conquer
  - string
  - Medium
---

# 395.至少有K个重复字符的最长子串

标签: `divide-and-conquer`, `string`

难度: Medium

通过率: 45.26%

原题链接: https://leetcode.com/problems/longest-substring-with-at-least-k-repeating-characters/description/

## 题目描述
给定一个字符串 $s$ 和一个整数 $k$，返回 $s$ 的最长子串的长度，其中这个子串中的每个字符出现的频率都不小于 $k$。如果不存在这样的子串，返回 0。

## 解题思路
这个问题可以用分治法解决。思路是，对于字符串 $s$，我们从头到尾扫描统计每个字符的出现频率，然后对于每个低于 $k$ 次数的字符，一个可行的策略是将它作为分割点，因为任何包含该字符的子串都不能是合法的子串。因此递归地解决每个子片段，并取其中的最大值。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def longestSubstring(s: str, k: int) -> int:
    if len(s) < k:
        # 如果字符串的长度小于k，不可能有合法子串
        return 0

    # 统计每个字符的出现次数
    char_count = {char: s.count(char) for char in set(s)}

    for char, count in char_count.items():
        if count < k:
            # 如果某个字符的出现次数少于k，以该字符为分割点，递归地求解每个部分
            return max(longestSubstring(subs, k) for subs in s.split(char))

    # 如果所有字符的出现次数都大于等于k，整个字符串都是合法的
    return len(s)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int longestSubstring(string s, int k) {
    int n = s.size();
    if (n < k) return 0;
    unordered_map<char, int> count;
    for (char c : s) count[c]++;

    for (int i = 0; i < n; i++) {
        if (count[s[i]] < k) {
            int j = i + 1;
            while (j < n && count[s[j]] < k) j++;
            return max(longestSubstring(s.substr(0, i), k), longestSubstring(s.substr(j), k));
        }
    }
    return n;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function longestSubstring(s, k) {
    if (s.length < k) return 0;
    const count = {};
    for (const char of s) {
        count[char] = (count[char] || 0) + 1;
    }
    for (let i = 0; i < s.length; i++) {
        if (count[s[i]] < k) {
            const parts = s.split(s[i]);
            return Math.max(...parts.map(part => longestSubstring(part, k)));
        }
    }
    return s.length;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int longestSubstring(String s, int k) {
    int n = s.length();
    if (n < k) return 0;
    Map<Character, Integer> count = new HashMap<>();
    for (char c : s.toCharArray()) count.put(c, count.getOrDefault(c, 0) + 1);
    
    for (int i = 0; i < n; i++) {
        if (count.get(s.charAt(i)) < k) {
            int j = i + 1;
            while (j < n && count.get(s.charAt(j)) < k) j++;
            return Math.max(longestSubstring(s.substring(0, i), k), longestSubstring(s.substring(j), k));
        }
    }
    return n;
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(n \times |\Sigma|)$，其中$n$是字符串的长度，$|\Sigma|$是字符集的大小（这里为26个小写英文字母）。在每次分割时，我们需要遍历所有字符。  
  
- 空间复杂度：$O(|\Sigma|)$，我们需要额外的空间来存储字符的计数。
