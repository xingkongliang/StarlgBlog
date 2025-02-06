---
sidebar_position: 290
tags:
  - hash-table
  - string
  - Easy
---

# 290.单词模式

标签: `hash-table`, `string`

难度: Easy

通过率: 42.62%

原题链接: https://leetcode.com/problems/word-pattern/description/

## 题目描述
给定一个模式字符串 pattern 和一个字符串 s，判断 s 是否遵循与模式相同的形式。遵循表示模式中的每个字母可以唯一地映射到 s 中的一个非空单词，且每个非空单词唯一地映射到模式中的一个字母。

## 解题思路
我们可以使用两个哈希表来解决这个问题。一个哈希表 pattern_to_word 来存储模式中的字母如何映射到字符串中的单词，另一个哈希表 word_to_pattern 来存储字符串中的单词如何映射回模式中的字母。在遍历模式和字符串的同时，我们检查：

1. 如果模式中的当前字母已存在于 pattern_to_word 中，我们检查其映射的单词是否与字符串中的当前单词相同；
2. 如果字符串中的当前单词已存在于 word_to_pattern 中，我们检查其映射的模式字母是否与当前模式字母相同；
3. 如果任何一个检查失败，说明无法形成双射，返回 false；
4. 如果检查通过，我们在各自的哈希表中建立字母和单词的对应关系。

当我们完成遍历时，要保证所有的映射都是一一对应的，否则返回 false。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def wordPattern(pattern: str, s: str) -> bool:
    # 将字符串 s 按照空格分隔为单词列表
    words = s.split()
    
    # 如果 pattern 和 words 的长度不相等，说明无法形成一对一关系
    if len(pattern) != len(words):
        return False
    
    # 两个字典来存储 pattern 到 word 和 word 到 pattern 的映射
    pattern_to_word = {}
    word_to_pattern = {}

    # 遍历 pattern 和 words
    for p, w in zip(pattern, words):
        # 检查 pattern 到 word 的映射
        if p in pattern_to_word:
            if pattern_to_word[p] != w:
                return False
        else:
            pattern_to_word[p] = w

        # 检查 word 到 pattern 的映射
        if w in word_to_pattern:
            if word_to_pattern[w] != p:
                return False
        else:
            word_to_pattern[w] = p

    return True

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
bool wordPattern(string pattern, string s) {
    vector<string> words;
    stringstream ss(s);
    string word;
    
    // 将句子 s 分割为多个单词
    while (ss >> word) {
        words.push_back(word);
    }

    // 如果 pattern 和 words 的长度不相等，说明无法形成一对一关系
    if (pattern.size() != words.size()) {
        return false;
    }

    // 用两个字典存储映射关系
    unordered_map<char, string> pattern_to_word;
    unordered_map<string, char> word_to_pattern;

    // 遍历 pattern 和 words
    for (int i = 0; i < pattern.size(); ++i) {
        char p = pattern[i];
        string w = words[i];

        // 检查模式到单词的映射
        if (pattern_to_word.count(p)) {
            if (pattern_to_word[p] != w) {
                return false;
            }
        } else {
            pattern_to_word[p] = w;
        }

        // 检查单词到模式的映射
        if (word_to_pattern.count(w)) {
            if (word_to_pattern[w] != p) {
                return false;
            }
        } else {
            word_to_pattern[w] = p;
        }
    }

    return true;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function wordPattern(pattern, s) {
    const words = s.split(' ');
    
    // 如果 pattern 和 words 的长度不相等，说明无法形成一对一关系
    if (pattern.length !== words.length) {
        return false;
    }

    const patternToWord = new Map();
    const wordToPattern = new Map();

    // 遍历 pattern 和 words
    for (let i = 0; i < pattern.length; i++) {
        const p = pattern[i];
        const w = words[i];

        // 检查 pattern 到 word 的映射
        if (patternToWord.has(p)) {
            if (patternToWord.get(p) !== w) {
                return false;
            }
        } else {
            patternToWord.set(p, w);
        }

        // 检查 word 到 pattern 的映射
        if (wordToPattern.has(w)) {
            if (wordToPattern.get(w) !== p) {
                return false;
            }
        } else {
            wordToPattern.set(w, p);
        }
    }

    return true;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public boolean wordPattern(String pattern, String s) {
    String[] words = s.split(" ");

    // 如果 pattern 和 words 的长度不相等，说明无法形成一对一关系
    if (pattern.length() != words.length) {
        return false;
    }

    Map<Character, String> patternToWord = new HashMap<>();
    Map<String, Character> wordToPattern = new HashMap<>();

    // 遍历 pattern 和 words
    for (int i = 0; i < pattern.length(); i++) {
        char p = pattern.charAt(i);
        String w = words[i];

        // 检查 pattern 到 word 的映射
        if (patternToWord.containsKey(p)) {
            if (!patternToWord.get(p).equals(w)) {
                return false;
            }
        } else {
            patternToWord.put(p, w);
        }

        // 检查 word 到 pattern 的映射
        if (wordToPattern.containsKey(w)) {
            if (wordToPattern.get(w) != p) {
                return false;
            }
        } else {
            wordToPattern.put(w, p);
        }
    }

    return true;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是模式的长度或字符串单词的数量，因为我们需要线性扫描这两个集合。

空间复杂度：$O(m)$，其中 $m$ 是单词的数量，因为我们在最坏的情况下需要为每个单词和模式字母存储映射，这个数量与单词的数量成正比。
