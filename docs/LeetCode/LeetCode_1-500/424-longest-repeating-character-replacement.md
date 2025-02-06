---
sidebar_position: 424
tags:
  - two-pointers
  - string
  - greedy
  - hash-table
  - Medium
---

# 424.最长重复字符替换

标签: `two-pointers`, `string`, `greedy`, `hash-table`

难度: Medium

通过率: 55.89%

原题链接: https://leetcode.com/problems/longest-repeating-character-replacement/description/

## 题目描述
给定一个字符串 s 和一个整数 k。你可以选择字符串中的任意字符并将其更改为任何其他大写英文字符。你最多可以执行此操作 k 次。返回执行上述操作后，您可以获得的最长子字符串长度，该子字符串包含相同的字母。

## 解题思路
我们可以利用滑动窗口技巧来解决这个问题。核心思想是维护一个窗口，使得窗口中的字符通过最多 k 次替换能够变成同一个字符。我们要找的就是这样的最大窗口长度。具体步骤如下：

1. 初始化两个指针 `left` 和 `right`，都指向字符串开头，表示当前滑动窗口的左右边界。
2. 使用一个字典 `count` 记录当前窗口中每个字符出现的次数，以及一个整数 `max_freq` 记录当前窗口中出现次数最多的字符的次数。
3. 向右移动 `right` 指针，每次移动更新 `count` 和 `max_freq`。
4. 当窗口的大小减去 `max_freq` 大于 k 时，需要移动 `left` 指针以缩小窗口。移动 `left` 时需要更新 `count` 中对 `s[left]` 的计数。
5. 记录每次移动后 `right - left + 1` 的最大值，直到 `right` 达到字符串末尾。
6. 返回记录的最大长度。

通过这样的方法，我们使用滑动窗口在 $O(n)$ 的时间复杂度内找到所需的结果。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def characterReplacement(s: str, k: int) -> int:
    # 初始化计数器和窗口边界
    count = {}
    max_freq = 0
    left = 0
    max_len = 0
    
    # 遍历字符串
    for right in range(len(s)):
        count[s[right]] = count.get(s[right], 0) + 1
        
        # 更新窗口中字符的最大频率
        max_freq = max(max_freq, count[s[right]])
        
        # 当前窗口长度与最大频率减少后的长度相比是否超出可替换的字符数k
        while (right - left + 1) - max_freq > k:
            count[s[left]] -= 1
            left += 1
        
        # 更新最大长度
        max_len = max(max_len, right - left + 1)
    
    return max_len
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int characterReplacement(string s, int k) {
    unordered_map<char, int> count;
    int max_freq = 0;
    int left = 0;
    int max_len = 0;

    for (int right = 0; right < s.size(); ++right) {
        count[s[right]]++;
        max_freq = max(max_freq, count[s[right]]);

        while ((right - left + 1) - max_freq > k) {
            count[s[left]]--;
            left++;
        }

        max_len = max(max_len, right - left + 1);
    }

    return max_len;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function characterReplacement(s, k) {
    let count = {};
    let max_freq = 0;
    let left = 0;
    let max_len = 0;
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        count[char] = (count[char] || 0) + 1;
        
        max_freq = Math.max(max_freq, count[char]);

        while ((right - left + 1) - max_freq > k) {
            count[s[left]]--;
            left++;
        }

        max_len = Math.max(max_len, right - left + 1);
    }
    
    return max_len;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int characterReplacement(String s, int k) {
    Map<Character, Integer> count = new HashMap<>();
    int max_freq = 0;
    int left = 0;
    int max_len = 0;

    for (int right = 0; right < s.length(); right++) {
        char char_right = s.charAt(right);
        count.put(char_right, count.getOrDefault(char_right, 0) + 1);
        max_freq = Math.max(max_freq, count.get(char_right));

        while ((right - left + 1) - max_freq > k) {
            char char_left = s.charAt(left);
            count.put(char_left, count.get(char_left) - 1);
            left++;
        }

        max_len = Math.max(max_len, right - left + 1);
    }

    return max_len;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是字符串 $s$ 的长度，因为每个字符最多被访问两次（一次被右指针，一次被左指针）。  
  
空间复杂度：$O(1)$，因为最多需要存储26个大写字母的计数。
