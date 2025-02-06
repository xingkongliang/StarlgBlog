---
sidebar_position: 336
tags:
  - trie
  - string
  - hash-table
  - Hard
---

# 336.回文对

标签: `trie`, `string`, `hash-table`

难度: Hard

通过率: 35.82%

原题链接: https://leetcode.com/problems/palindrome-pairs/description/

## 题目描述
你得到一个0索引的独特字符串数组words。一个回文对是指一对整数(i, j)，满足：`0 <= i, j < words.length`, `i != j`, 并且words[i] + words[j]（两个字符串的连接）是一个回文。返回所有回文对的数组。你的算法必须具有O(sum of words[i].length)的运行时间复杂度。

## 解题思路
解决此问题的关键是有效地检查两个字符串的连接是否是回文。我们可以借助于字典树（Trie）来更高效地查找和匹配回文。考虑到多个字符串，会有以下几类策略来寻找回文对：

1. 根据回文的定义，若$prefix + str + suffix$是回文，则$prefix$和$suffix$同时是回文。所以我们可以拆分每个字符串，检查分割点两边是否可以形成回文。

2. 对于每个单词，将其逆序作为键存储在字典树中，这样可以快速找到某个前缀或后缀的反转。

3. 遍历每一个字符串，对每个可能的切分点，检查该字符串分割的前缀是否是回文，同时在字典树中寻找其后缀的反转，以及检查后缀是否是回文并寻找其前缀的反转。

4. 特别地，如果字符串为空，那么其他每一个单个字符均可以形成回文。

通过上述策略，我们可以在遍历字符串的过程中，借助字典树快速判断和匹配可能的回文对，从而达到预期的时间复杂度。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class Solution:
    def palindromePairs(self, words: List[str]) -> List[List[int]]:
        # 构建字典，存储每个单词的逆序及索引
        lookup = {word[::-1]: i for i, word in enumerate(words)}
        res = []

        for i, word in enumerate(words):
            for j in range(len(word) + 1):
                # 拆分字符串成prefix和suffix
                prefix, suffix = word[:j], word[j:]

                # 如果prefix是回文，那么suffix的逆序应该在lookup中
                if prefix == prefix[::-1] and suffix in lookup and lookup[suffix] != i:
                    res.append([lookup[suffix], i])

                # 如果suffix是回文，那么prefix的逆序应该在lookup中，避免重复，我们略过j==0的情况
                if j != len(word) and suffix == suffix[::-1] and prefix in lookup and lookup[prefix] != i:
                    res.append([i, lookup[prefix]])

        return res
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<vector<int>> palindromePairs(vector<string>& words) {
        unordered_map<string, int> lookup;
        for (int i = 0; i < words.size(); ++i) {
            string key = words[i];
            reverse(key.begin(), key.end());
            lookup[key] = i;
        }
        vector<vector<int>> res;
        for (int i = 0; i < words.size(); ++i) {
            string word = words[i];
            for (int j = 0; j <= word.size(); ++j) {
                string prefix = word.substr(0, j);
                string suffix = word.substr(j);

                if (isPalindrome(prefix) && lookup.count(suffix) && lookup[suffix] != i) {
                    res.push_back({lookup[suffix], i});
                }
                if (!suffix.empty() && isPalindrome(suffix) && lookup.count(prefix) && lookup[prefix] != i) {
                    res.push_back({i, lookup[prefix]});
                }
            }
        }
        return res;
    }
    
private:
    bool isPalindrome(const string& s) {
        int left = 0, right = s.size() - 1;
        while (left < right) {
            if (s[left++] != s[right--]) return false;
        }
        return true;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
var palindromePairs = function(words) {
    const lookup = new Map();
    words.forEach((word, i) => {
        lookup.set([...word].reverse().join(''), i);
    });

    const res = [];

    words.forEach((word, i) => {
        for (let j = 0; j <= word.length; j++) {
            const prefix = word.slice(0, j);
            const suffix = word.slice(j);

            if (isPalindrome(prefix) && lookup.has(suffix) && lookup.get(suffix) !== i) {
                res.push([lookup.get(suffix), i]);
            }
            if (suffix && isPalindrome(suffix) && lookup.has(prefix) && lookup.get(prefix) !== i) {
                res.push([i, lookup.get(prefix)]);
            }
        }
    });

    return res;

    function isPalindrome(word) {
        let left = 0, right = word.length - 1;
        while (left < right) {
            if (word[left++] !== word[right--]) return false;
        }
        return true;
    }
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {
    public List<List<Integer>> palindromePairs(String[] words) {
        Map<String, Integer> lookup = new HashMap<>();
        for (int i = 0; i < words.length; i++) {
            lookup.put(new StringBuilder(words[i]).reverse().toString(), i);
        }

        List<List<Integer>> res = new ArrayList<>();

        for (int i = 0; i < words.length; i++) {
            String word = words[i];
            for (int j = 0; j <= word.length(); j++) {
                String prefix = word.substring(0, j);
                String suffix = word.substring(j);

                if (isPalindrome(prefix)) {
                    Integer suffixIndex = lookup.get(suffix);
                    if (suffixIndex != null && suffixIndex != i) {
                        res.add(List.of(suffixIndex, i));
                    }
                }
                if (!suffix.isEmpty() && isPalindrome(suffix)) {
                    Integer prefixIndex = lookup.get(prefix);
                    if (prefixIndex != null && prefixIndex != i) {
                        res.add(List.of(i, prefixIndex));
                    }
                }
            }
        }

        return res;
    }

    private boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left++) != s.charAt(right--)) {
                return false;
            }
        }
        return true;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n \, k^2)$，其中 $n$ 是单词数量，$k$ 是单词的最大长度。因为对于每个单词，我们在为每个长度迭代进行分割并检查前缀和后缀是否为回文。  
  
空间复杂度为 $O(n \, k)$，用于存储每个单词的逆序和字典树的构建。
