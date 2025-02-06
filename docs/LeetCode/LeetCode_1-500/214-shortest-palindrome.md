---
sidebar_position: 214
tags:
  - string
  - two-pointers
  - greedy
  - Hard
---

# 214.最短回文串

标签: `string`, `two-pointers`, `greedy`

难度: Hard

通过率: 40.02%

原题链接: https://leetcode.com/problems/shortest-palindrome/description/

## 题目描述
给定一个字符串 $s$。通过在其前面添加字符，可以将 $s$ 转换为回文串。返回你可以找到的最短回文串。

## 解题思路
我们需要在给定字符串的前面添加最少的字符以形成回文串。思路如下：

1. 我们可以从字符串的开头和结尾分别进行比较，找出最长的前缀，该前缀同时也是字符串结尾的后缀。
2. 利用KMP算法的思想，我们可以通过构造新的字符串 "s#s_reverse"，其中"#"是一个不在 $s$ 中的字符，然后计算其前缀函数。通过前缀函数，我们可以知道，最长的前缀同时也是后缀的部分，会对应原字符串的最长前缀。
3. 利用这个信息，我们可以知道哪些字符需要被翻转并加到字符串前面，形成最短的回文串。特别地，前面添加的部分就是从字符串的非重叠部分倒序生成。
4. 通过这种方式，我们可以较快构造出答案。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def shortestPalindrome(s):
    # 处理边界条件
    if not s:
        return s
    
    # 创建新字符串
    new_s = s + '#' + s[::-1]
    # 计算前缀数组，利用KMP算法思想
    n = len(new_s)
    lps = [0] * n
    j = 0
    for i in range(1, n):
        while j > 0 and new_s[i] != new_s[j]:
            j = lps[j - 1]
        if new_s[i] == new_s[j]:
            j += 1
        lps[i] = j
    
    # 计算需要添加的字符串部分
    need_add = s[lps[-1]:][::-1]
    # 返回结果
    return need_add + s
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
string shortestPalindrome(string s) {
    // 处理边界条件
    int len = s.length();
    if (len == 0) return s;
    
    // 创建新字符串
    string rev_s = s;
    reverse(rev_s.begin(), rev_s.end());
    string new_s = s + '#' + rev_s;
    
    // 计算前缀数组，利用KMP算法思想
    int n = new_s.size();
    vector<int> lps(n, 0);
    int j = 0;
    for (int i = 1; i < n; ++i) {
        while (j > 0 && new_s[i] != new_s[j]) {
            j = lps[j - 1];
        }
        if (new_s[i] == new_s[j]) {
            j++;
        }
        lps[i] = j;
    }
    
    // 计算需要添加的字符串部分
    string need_add = s.substr(lps[n-1]);
    reverse(need_add.begin(), need_add.end());
    // 返回结果
    return need_add + s;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function shortestPalindrome(s) {
    // 处理边界条件
    if (s.length === 0) return s;
    
    // 创建新字符串
    let rev_s = s.split('').reverse().join('');
    let new_s = s + '#' + rev_s;
    
    // 计算前缀数组，利用KMP算法思想
    let n = new_s.length;
    let lps = Array(n).fill(0);
    let j = 0;
    for (let i = 1; i < n; ++i) {
        while (j > 0 && new_s[i] !== new_s[j]) {
            j = lps[j - 1];
        }
        if (new_s[i] === new_s[j]) {
            j++;
        }
        lps[i] = j;
    }
    
    // 计算需要添加的字符串部分
    let need_add = s.substring(lps[n-1]).split('').reverse().join('');
    // 返回结果
    return need_add + s;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public String shortestPalindrome(String s) {
        // 处理边界条件
        int len = s.length();
        if (len == 0) return s;
        
        // 创建新字符串
        StringBuilder rev_s = new StringBuilder(s).reverse();
        String new_s = s + '#' + rev_s.toString();
        
        // 计算前缀数组，利用KMP算法思想
        int n = new_s.length();
        int[] lps = new int[n];
        int j = 0;
        for (int i = 1; i < n; ++i) {
            while (j > 0 && new_s.charAt(i) != new_s.charAt(j)) {
                j = lps[j - 1];
            }
            if (new_s.charAt(i) == new_s.charAt(j)) {
                j++;
            }
            lps[i] = j;
        }
        
        // 计算需要添加的字符串部分
        String need_add = new StringBuilder(s.substring(lps[n-1])).reverse().toString();
        // 返回结果
        return need_add + s;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度: $O(n)$, 其中 $n$ 是字符串 $s$ 的长度。由于采用了KMP算法，计算前缀函数的复杂度为线性。

空间复杂度: $O(n)$, 主要用于存储前缀函数数组和反转字符串的空间。
