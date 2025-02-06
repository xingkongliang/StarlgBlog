---
sidebar_position: 151
tags:
  - string
  - Medium
---

# 151.翻转字符串里的单词

标签: `string`

难度: Medium

通过率: 48.33%

原题链接: https://leetcode.com/problems/reverse-words-in-a-string/description/

## 题目描述
给定一个输入字符串 `s`，翻转其中单词的顺序。一个单词是由非空格字符组成的序列，单词间用至少一个空格分隔。返回一个单空格分隔单词的字符串，并去掉多余的空格。注意：`s`中可能会有前导或尾随空格，或者在两个单词之间有多个空格。返回的字符串中应该只有一个空格分隔单词，不包含任何多余的空格。

## 解题思路
我们可以通过以下步骤来解决这个问题：

1. 先删除字符串开头和结尾的空格。
2. 使用 split 方法将字符串拆分为单词列表。split 方法会自动去掉多余的空格。
3. 颠倒单词列表的顺序。
4. 使用 join 方法将单词列表重新连接成一个以单空格分隔的字符串。

这样就能实现单词顺序的翻转，并且去掉多余的空格。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def reverseWords(s):
    # 移除开头和结尾的空格，并用空格拆分字符串成单词列表
    words = s.strip().split()
    # 颠倒列表中的单词顺序
    words.reverse()
    # 用单个空格连接单词列表
    return ' '.join(words)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    string reverseWords(string s) {
        // 先去掉首尾空格
        stringstream input(s);
        string word;
        vector<string> words;
        
        while (input >> word) { // 使用 stringstream 分割
            words.push_back(word);
        }
        reverse(words.begin(), words.end()); // 颠倒单词顺序
        
        stringstream result;
        for (int i = 0; i < words.size(); ++i) {
            if (i > 0) result << " "; // 不是第一个单词前加空格
            result << words[i];
        }
        return result.str();
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function reverseWords(s) {
    // 去除首尾空格并分割为单词列表
    const words = s.trim().split(/\s+/);
    // 颠倒单词列表
    words.reverse();
    // 使用单空格连接单词
    return words.join(' ');
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public String reverseWords(String s) {
        // 移除首尾多余空格
        String[] words = s.trim().split("\\s+");
        // 颠倒单词列表
        Collections.reverse(Arrays.asList(words));
        // 用单个空格连接所有单词
        return String.join(" ", words);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是字符串的长度，因为我们需要遍历整个字符串。  
  
空间复杂度：$O(n)$，用于存储去掉多余空格的单词列表。
