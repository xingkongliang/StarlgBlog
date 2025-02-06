---
sidebar_position: 125
tags:
  - string
  - two-pointers
  - Easy
---

# 125.验证回文字符串

标签: `string`, `two-pointers`

难度: Easy

通过率: 49.48%

原题链接: https://leetcode.com/problems/valid-palindrome/description/

## 题目描述
给定一个字符串s，只考虑字母和数字字符，可以忽略字母的大小写。编写一个函数来判断该字符串是否是回文字符串。一个回文字符串在忽略字符顺序的变化后从左向右和从右向左读完全相同。

## 解题思路
解决这个问题，我们需要对字符串进行两步处理：第一步，移除所有非字母和数字的字符，并将所有字母转换为小写；第二步，利用双指针法来验证处理后的字符串是否为回文。具体步骤如下：

1. 将字符串中的所有字母转换为小写，并移除所有非字母和数字的字符。我们可以使用Python中的`isalpha()`和`isdigit()`函数辅助实现。

2. 在处理后的字符串上使用两个指针，一个从字符串开始，一个从字符串末尾开始，逐字符检查这两个指针对应的字符是否相同。

3. 如果全程所有字符都匹配，则该字符串为回文，返回`True`；反之，如果有不匹配的字符，返回`False`。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def isPalindrome(s: str) -> bool:
    # 处理字符串：移除所有非字母和数字的字符，并将其转为小写
    filtered_chars = [char.lower() for char in s if char.isalnum()]
    
    # 使用双指针法验证是否为回文
    left, right = 0, len(filtered_chars) - 1
    while left < right:
        if filtered_chars[left] != filtered_chars[right]:
            return False
        left += 1
        right -= 1
    return True
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    bool isPalindrome(string s) {
        // 处理字符串：移除所有非字母和数字的字符，并将其转为小写
        string filtered;
        for (char ch : s) {
            if (isalnum(ch)) {
                filtered += tolower(ch);
            }
        }
        
        // 使用双指针法验证是否为回文
        int left = 0, right = filtered.size() - 1;
        while (left < right) {
            if (filtered[left] != filtered[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function isPalindrome(s) {
    // 处理字符串：移除所有非字母和数字的字符，并将其转为小写
    const filteredChars = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // 使用双指针法验证是否为回文
    let left = 0, right = filteredChars.length - 1;
    while (left < right) {
        if (filteredChars[left] !== filteredChars[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public boolean isPalindrome(String s) {
        // 处理字符串：移除所有非字母和数字的字符，并将其转为小写
        StringBuilder filtered = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (Character.isLetterOrDigit(c)) {
                filtered.append(Character.toLowerCase(c));
            }
        }
        
        // 使用双指针法验证是否为回文
        int left = 0, right = filtered.length() - 1;
        while (left < right) {
            if (filtered.charAt(left) != filtered.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是字符串的长度。我们需要遍历字符串两次。一次用于过滤并转换字符，另一次用于验证回文。
空间复杂度：$O(n)$，用于存储过滤后的字符。
