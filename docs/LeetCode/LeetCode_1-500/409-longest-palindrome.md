---
sidebar_position: 409
tags:
  - hash-table
  - greedy
  - Easy
---

# 409.最长的回文

标签: `hash-table`, `greedy`

难度: Easy

通过率: 55.39%

原题链接: https://leetcode.com/problems/longest-palindrome/description/

## 题目描述
给定一个由大小写字母组成的字符串 $s$，返回可以用这些字母构建的最长回文的长度。字母是区分大小写的，例如，"Aa" 不是回文。

## 解题思路
要构建最长的回文，我们需要统计每个字母的出现次数。因为回文是对称的，所以对于每个字母，我们可以使用其成对的部分。具体而言：

1. 我们需要一个哈希表来记录每个字符出现的次数。
2. 对于每个字符次数 $count$，可以贡献给回文的部分是 $count//2 \times 2$，即取出偶数部分，因为偶数是成对的。
3. 如果有任何奇数的字符，我们最多只能使用其中的一个作为回文中间的部分。
4. 因此，初始答案为所有字符的偶数部分的和，如果存在任何奇数计数的字符，我们可以在结果中加1，因为最多可以使用一个奇数字符作为中心部分。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def longestPalindrome(s: str) -> int:
    # 用于记录每个字符出现的次数
    char_count = {}
    for char in s:
        if char in char_count:
            char_count[char] += 1
        else:
            char_count[char] = 1
    
    length = 0
    odd_found = False
    
    for count in char_count.values():
        # 加上这个字符对形成的长度
        length += (count // 2) * 2
        # 如果是奇数，标记奇数字符存在
        if count % 2 == 1:
            odd_found = True
    
    # 如果有任何奇数计数的字符，可以增加一个字符作为中心
    if odd_found:
        length += 1

    return length
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int longestPalindrome(string s) {
    // 用于记录每个字符出现的次数
    unordered_map<char, int> char_count;
    for (char c : s) {
        char_count[c]++;
    }

    int length = 0;
    bool odd_found = false;

    for (auto &entry : char_count) {
        // 加上这个字符对形成的长度
        length += (entry.second / 2) * 2;
        // 如果是奇数，标记奇数字符存在
        if (entry.second % 2 == 1) {
            odd_found = true;
        }
    }

    // 如果有任何奇数计数的字符，可以增加一个字符作为中心
    if (odd_found) {
        length++;
    }

    return length;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function longestPalindrome(s) {
    // 用于记录每个字符出现的次数
    let charCount = {};
    for (let char of s) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    let length = 0;
    let oddFound = false;

    for (let count of Object.values(charCount)) {
        // 加上这个字符对形成的长度
        length += Math.floor(count / 2) * 2;
        // 如果是奇数，标记奇数字符存在
        if (count % 2 === 1) {
            oddFound = true;
        }
    }

    // 如果有任何奇数计数的字符，可以增加一个字符作为中心
    if (oddFound) {
        length += 1;
    }

    return length;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int longestPalindrome(String s) {
        // 用于记录每个字符出现的次数
        HashMap<Character, Integer> charCount = new HashMap<>();
        for (char c : s.toCharArray()) {
            charCount.put(c, charCount.getOrDefault(c, 0) + 1);
        }

        int length = 0;
        boolean oddFound = false;

        for (int count : charCount.values()) {
            // 加上这个字符对形成的长度
            length += (count / 2) * 2;
            // 如果是奇数，标记奇数字符存在
            if (count % 2 == 1) {
                oddFound = true;
            }
        }

        // 如果有任何奇数计数的字符，可以增加一个字符作为中心
        if (oddFound) {
            length += 1;
        }

        return length;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是字符串 $s$ 的长度，因为我们需要遍历每个字符以构建哈希表。  
  
空间复杂度：$O(1)$，因为哈希表的大小最多为52（26个小写和26个大写字母）。
