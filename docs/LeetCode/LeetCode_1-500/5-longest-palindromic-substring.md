---
sidebar_position: 5
tags:
  - string
  - dynamic-programming
  - two-pointers
  - Medium
---

# 5.最长回文子串

标签: `string`, `dynamic-programming`, `two-pointers`

难度: Medium

通过率: 34.91%

原题链接: https://leetcode.com/problems/longest-palindromic-substring/description/

## 题目描述
给定一个字符串 $s$，返回 $s$ 中最长的回文子串。

## 解题思路
要找到字符串中的最长回文子串，可以使用不同的方法，通常有以下几种常用方法：

1. **动态规划**：
   我们定义一个二维布尔数组 $dp[i][j]$ 表示子串 $s[i...j]$ 是否是回文。如果 $s[i]$ 和 $s[j]$ 相等，并且 $s[i+1...j-1]$ 是回文，那么 $s[i...j]$ 就是回文。这样我们可以从较短的子串逐步构造出较长的回文子串。
   - 状态转移方程：
     $$ dp[i][j] = (s[i] == s[j]) \land (j-i<3 \lor dp[i+1][j-1]) $$
   - 初始化：单个字符总是回文，即 $dp[i][i] = \text{True}$。
   
2. **中心扩展**：
   回文从中心展开，如果我们固定一个中心，从中心向两端扩展，可以快速找到一个回文串。由于回文的长度可能是奇数也可能是偶数，所以中心可能在一个字符上或者两个字符之间。
   - 借助双指针：分别向左、右扩展，直到不再构成回文。

我们将详细实现中心扩展法，因为它对于此类问题通常更高效。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def longest_palindrome(s: str) -> str:
    def expand_around_center(left: int, right: int) -> str:
        # 向两边扩展找到最长回文
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return s[left + 1:right]

    if len(s) < 1:
        return ""

    longest = ""
    for i in range(len(s)):
        # 奇数长度的回文
        odd_palindrome = expand_around_center(i, i)
        # 偶数长度的回文
        even_palindrome = expand_around_center(i, i + 1)

        # 更新最长回文子串
        longest = max(longest, odd_palindrome, even_palindrome, key=len)

    return longest
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    string longestPalindrome(string s) {
        auto expand_around_center = [&](int left, int right) {
            while (left >= 0 && right < s.size() && s[left] == s[right]) {
                left--;
                right++;
            }
            return s.substr(left + 1, right - left - 1);
        };

        if (s.size() < 1) return "";

        string longest = "";
        for (int i = 0; i < s.size(); i++) {
            string odd_palindrome = expand_around_center(i, i);
            string even_palindrome = expand_around_center(i, i + 1);
            if (odd_palindrome.size() > longest.size())
                longest = odd_palindrome;
            if (even_palindrome.size() > longest.size())
                longest = even_palindrome;
        }

        return longest;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function longestPalindrome(s) {
    const expandAroundCenter = (left, right) => {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return s.substring(left + 1, right);
    };

    if (s.length < 1) return "";

    let longest = "";
    for (let i = 0; i < s.length; i++) {
        const oddPalindrome = expandAroundCenter(i, i);
        const evenPalindrome = expandAroundCenter(i, i + 1);
        if (oddPalindrome.length > longest.length) longest = oddPalindrome;
        if (evenPalindrome.length > longest.length) longest = evenPalindrome;
    }

    return longest;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public String longestPalindrome(String s) {
        if (s == null || s.length() < 1) return "";
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            int len1 = expandAroundCenter(s, i, i);
            int len2 = expandAroundCenter(s, i, i + 1);
            int len = Math.max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }

    private int expandAroundCenter(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- **时间复杂度**：中心扩展法的时间复杂度是 $O(n^2)$，其中 $n$ 是字符串的长度，因为我们对每一个字符以及字符之间的位置作为中心进行扩展，每次扩展的最坏情况即是整个字符串长度的扩展。
- **空间复杂度**：$O(1)$，这里只使用了一些额外的变量保存最长回文的起点和终点，所需的额外空间极其有限。
