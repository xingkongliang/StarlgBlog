---
sidebar_position: 345
tags:
  - two-pointers
  - string
  - Easy
---

# 345.翻转字符串中的元音字母

标签: `two-pointers`, `string`

难度: Easy

通过率: 55.8%

原题链接: https://leetcode.com/problems/reverse-vowels-of-a-string/description/

## 题目描述
给定一个字符串 `s`，只反转其中的所有元音字母并返回。

元音字母为 'a'，'e'，'i'，'o'，'u'，它们可以以小写和大写形式出现，并且可能出现多次。

## 解题思路
这个问题需要反转字符串中的元音字母，同时保持其他字符不变。为了解决这个问题，我们可以使用双指针方法：

1. 初始化两个指针，`left` 从字符串的起始位置开始，`right` 从字符串的末尾位置开始。
2. 使用一个集合或数组来存储所有可能的元音字符以方便查找。
3. 当 `left` 指向的字符不是元音时，移动 `left` 指针向右。
4. 当 `right` 指向的字符不是元音时，移动 `right` 指针向左。
5. 如果 `left` 和 `right` 都指向元音，则交换这两个位置的字符。
6. 重复以上步骤，直到两个指针相遇，即 `left >= right`。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def reverseVowels(s):
    # 将字符串转换为列表以便于操作
    s = list(s)
    # 定义元音集合
    vowels = set("aeiouAEIOU")
    left, right = 0, len(s) - 1
    
    while left < right:
        while left < right and s[left] not in vowels:
            left += 1
        while left < right and s[right] not in vowels:
            right -= 1
        if left < right:
            # 交换元音字符
            s[left], s[right] = s[right], s[left]
            left, right = left + 1, right - 1
    
    # 将列表转换回字符串
    return ''.join(s)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    string reverseVowels(string s) {
        // 定义元音字符
        unordered_set<char> vowels = {'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'};
        // 使用双指针
        int left = 0, right = s.size() - 1;
        while (left < right) {
            while (left < right && vowels.find(s[left]) == vowels.end()) {
                left++;
            }
            while (left < right && vowels.find(s[right]) == vowels.end()) {
                right--;
            }
            if (left < right) {
                // 交换元音字符
                swap(s[left], s[right]);
                left++;
                right--;
            }
        }
        return s;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function reverseVowels(s) {
    // 定义元音字符
    const vowels = new Set('aeiouAEIOU');
    const chars = s.split('');
    let left = 0, right = chars.length - 1;
    
    while (left < right) {
        while (left < right && !vowels.has(chars[left])) {
            left++;
        }
        while (left < right && !vowels.has(chars[right])) {
            right--;
        }
        if (left < right) {
            // 交换元音字符
            [chars[left], chars[right]] = [chars[right], chars[left]];
            left++;
            right--;
        }
    }
    
    return chars.join('');
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public String reverseVowels(String s) {
        char[] chars = s.toCharArray();
        // 定义元音字符
        String vowelsStr = "aeiouAEIOU";
        int left = 0, right = chars.length - 1;
        
        while (left < right) {
            while (left < right && vowelsStr.indexOf(chars[left]) == -1) {
                left++;
            }
            while (left < right && vowelsStr.indexOf(chars[right]) == -1) {
                right--;
            }
            if (left < right) {
                // 交换元音字符
                char temp = chars[left];
                chars[left] = chars[right];
                chars[right] = temp;
                left++;
                right--;
            }
        }
        
        return new String(chars);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度: $O(n)$，其中 $n$ 是字符串的长度。每个指针只遍历字符串一次。  
  
空间复杂度: $O(n)$，主要用于存储输入字符串的副本。
