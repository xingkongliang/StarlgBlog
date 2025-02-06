---
sidebar_position: 3
tags:
  - hash-table
  - string
  - two-pointers
  - dynamic-programming
  - Medium
---

# 3.无重复字符的最长子串

标签: `hash-table`, `string`, `two-pointers`, `dynamic-programming`

难度: Medium

通过率: 35.9%

原题链接: https://leetcode.com/problems/longest-substring-without-repeating-characters/description/

## 题目描述
给定一个字符串 $s$ ，请你找出其中不含有重复字符的 **最长子串** 的长度。

## 解题思路
我们可以使用滑动窗口和哈希表的方法来解决这个问题。滑动窗口技巧帮助我们优雅地处理字符串的子串。我们维护一个窗口(这可以通过两个指针来实现)，其中所有的字符都是唯一的。我们使用一个哈希表来记录已经出现的字符及其最右侧的位置。

具体步骤如下：

1. 使用两个指针 `left` 和 `right` 代表窗口的左右边界，初始时都指向字符串的开头。
2. 使用一个哈希表 `char_index_map` 来记录每个字符最后出现的位置。
3. 我们将 `right` 向右移动，并处理新的字符：
   - 如果这个字符已经在哈希表中存在，并且其上次出现的位置大于等于 `left`，这时说明出现了重复字符，我们需要移动 `left` 以跳过重复字符。具体来说，将 `left` 更新为 `char_index_map` 中重复字符上次出现的位置加一。
   - 如果这个字符没有重复，我们将其位置记录在 `char_index_map` 中。
4. 每次更新都计算当前窗口的长度，并用其更新最大窗口长度。
5. 当 `right` 遍历完整个字符串后，最大窗口长度就是不包含重复字符的最长子串的长度。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def length_of_longest_substring(s: str) -> int:
    # 用于记录字符最后出现的索引
    char_index_map = {}
    # 初始化左右指针和最大长度
    left = 0
    max_length = 0
    for right, char in enumerate(s):
        if char in char_index_map and char_index_map[char] >= left:
            # 如果字符重复且位于当前窗口内，移动左指针
            left = char_index_map[char] + 1
        # 更新字符的最后出现索引
        char_index_map[char] = right
        # 更新最大长度
        max_length = max(max_length, right - left + 1)
    return max_length
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> charIndexMap;
        int left = 0, maxLength = 0;
        for (int right = 0; right < s.length(); ++right) {
            char currentChar = s[right];
            if (charIndexMap.count(currentChar) && charIndexMap[currentChar] >= left) {
                left = charIndexMap[currentChar] + 1;
            }
            charIndexMap[currentChar] = right;
            maxLength = max(maxLength, right - left + 1);
        }
        return maxLength;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function lengthOfLongestSubstring(s) {
    let charIndexMap = new Map();
    let left = 0;
    let maxLength = 0;
    for (let right = 0; right < s.length; right++) {
        let currentChar = s[right];
        if (charIndexMap.has(currentChar) && charIndexMap.get(currentChar) >= left) {
            left = charIndexMap.get(currentChar) + 1;
        }
        charIndexMap.set(currentChar, right);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    return maxLength;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> charIndexMap = new HashMap<>();
        int left = 0, maxLength = 0;
        for (int right = 0; right < s.length(); right++) {
            char currentChar = s.charAt(right);
            if (charIndexMap.containsKey(currentChar) && charIndexMap.get(currentChar) >= left) {
                left = charIndexMap.get(currentChar) + 1;
            }
            charIndexMap.put(currentChar, right);
            maxLength = Math.max(maxLength, right - left + 1);
        }
        return maxLength;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：O(n)，其中 $n$ 是字符串的长度。左右指针分别遍历了整个字符串。
- 空间复杂度：O(min(m, n))，其中 $m$ 是字符集的大小。哈希表在最坏情况下可能包含每个字符的索引。
