---
sidebar_position: 438
tags:
  - array
  - hash-table
  - two-pointers
  - string
  - sort
  - sort
  - binary-search
  - Medium
---

# 438.在字符串中找到所有字母异位词

标签: `array`, `hash-table`, `two-pointers`, `string`, `sort`, `sort`, `binary-search`

难度: Medium

通过率: 51.59%

原题链接: https://leetcode.com/problems/find-all-anagrams-in-a-string/description/

## 题目描述
给定两个字符串 `s` 和 `p`，返回 `p` 的所有字母异位词在 `s` 中的起始索引。可以以任何顺序返回答案。

## 解题思路
为了在字符串 `s` 中找出所有 `p` 的字母异位词，我们可以使用滑动窗口的方法。具体步骤如下：

1. 首先，计算 `p` 中每个字符的频次，并存储在一个字典中。

2. 然后，在 `s` 上使用一个固定大小为 `len(p)` 的滑动窗口，同时用一个字典维护这个窗口中字符的频次。

3. 每次移动滑动窗口时，移除左侧一个字符并添加右侧一个字符，同时更新窗口内的字符频次。

4. 在每次移动滑动窗口后，比较当前窗口内字符的频次字典与 `p` 的字符频次字典。如果它们相等，则说明当前窗口是一个字母异位词。

5. 记录下所有满足条件的起始索引。

这种方法利用了双指针（水准窗口）和哈希表频次统计的方法，在大部分情况下效率较高。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
from collections import Counter, defaultdict

def findAnagrams(s: str, p: str) -> list:
    # 记录 p 的字符频次
    p_count = Counter(p)
    # 用于记录滑动窗口中的字符频次
    s_count = defaultdict(int)
    result = []
    p_length = len(p)
    for i in range(len(s)):
        # 将当前字符添加到窗口中
        s_count[s[i]] += 1
        if i >= p_length:
            # 窗口缩小，移除窗口左端字符
            if s_count[s[i - p_length]] == 1:
                del s_count[s[i - p_length]]
            else:
                s_count[s[i - p_length]] -= 1
        # 如果当前窗口和 p 的频次相同，记录起始索引
        if s_count == p_count:
            result.append(i - p_length + 1)
    return result

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
```cpp
#include <vector>
#include <string>
#include <unordered_map>
using namespace std;

vector<int> findAnagrams(string s, string p) {
    unordered_map<char, int> p_count;
    unordered_map<char, int> s_count;
    vector<int> result;
    int p_length = p.size();
    for (char c : p) 
        ++p_count[c];
    for (int i = 0; i < s.size(); ++i) {
        ++s_count[s[i]];
        if (i >= p_length) {
            if (--s_count[s[i - p_length]] == 0)
                s_count.erase(s[i - p_length]);
        }
        if (s_count == p_count)
            result.push_back(i - p_length + 1);
    }
    return result;
}
```
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function findAnagrams(s, p) {
    const p_count = {};
    const s_count = {};
    const result = [];
    const p_length = p.length;
    // 初始化 p 的频次计数
    for (const char of p) {
        p_count[char] = (p_count[char] || 0) + 1;
    }
    for (let i = 0; i < s.length; i++) {
        // 在窗口中添加当前字符频次
        s_count[s[i]] = (s_count[s[i]] || 0) + 1;
        if (i >= p_length) {
            if (s_count[s[i - p_length]] === 1) {
                delete s_count[s[i - p_length]];
            } else {
                s_count[s[i - p_length]] -= 1;
            }
        }
        if (JSON.stringify(s_count) === JSON.stringify(p_count)) {
            result.push(i - p_length + 1);
        }
    }
    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Solution {
    public List<Integer> findAnagrams(String s, String p) {
        List<Integer> result = new ArrayList<>();
        Map<Character, Integer> pCount = new HashMap<>();
        Map<Character, Integer> sCount = new HashMap<>();
        int pLength = p.length();

        for (char ch : p.toCharArray()) {
            pCount.put(ch, pCount.getOrDefault(ch, 0) + 1);
        }
        
        for (int i = 0; i < s.length(); i++) {
            char current = s.charAt(i);
            sCount.put(current, sCount.getOrDefault(current, 0) + 1);
            if (i >= pLength) {
                char leftChar = s.charAt(i - pLength);
                if (sCount.get(leftChar) == 1) {
                    sCount.remove(leftChar);
                } else {
                    sCount.put(leftChar, sCount.get(leftChar) - 1);
                }
            }
            if (sCount.equals(pCount)) {
                result.add(i - pLength + 1);
            }
        }
        return result;
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(N + M)$，其中 $N$ 是字符串 $s$ 的长度，$M$ 是字符串 $p$ 的长度。我们遍历了一次字符串 $s$，同时在每次滑动窗口时只对固定大小的字符集做了频次统计。  
  
空间复杂度为 $O(1)$，因为总共只需要存储两个大小为 26 的字母频次表。
