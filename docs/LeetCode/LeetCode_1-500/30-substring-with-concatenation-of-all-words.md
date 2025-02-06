---
sidebar_position: 30
tags:
  - array
  - hash-table
  - string
  - two-pointers
  - Hard
---

# 30. 子数组的所有单词组合

标签: `array`, `hash-table`, `string`, `two-pointers`

难度: Hard

通过率: 32.62%

原题链接: https://leetcode.com/problems/substring-with-concatenation-of-all-words/description/

## 题目描述
给定一个字符串 `s`，和一个字符串数组 `words`。数组里面的所有字符串长度相同。一个连接字符串是指包含所有 `words` 中字符串的任意排列组合。返回所有在 `s` 中连接子串的起始索引。

## 解题思路
为了在字符串 `s` 中找到符合要求的连接子串，我们需要遵循以下步骤：

1. **单词长度统一**：首先读取每个单词的长度 `word_len`。由于所有单词的长度是相同的，所以我们可以直接获取 `words[0]` 的长度，如果数组为空则直接返回空数组。

2. **拼接字符串的总长度**：计算需要匹配的子串的总长度 `total_len`，即 `word_len * len(words)`。

3. **建立单词计数表**：创建一个字符字典 `word_count`，记录 `words` 中每个单词出现的次数，以便在后续的匹配过程中加以对比。

4. **滑动窗口遍历**：使用滑动窗口的方法遍历字符串 `s`，每次移动一个 `word_len` 的长度，用以检查 `total_len` 的长度范围内是否形成连接的所有单词组合。
   - 遍历不同起点，从 0 到 `word_len-1`，每次检查 `total_len` 长度在 `s` 里面的段。
   - 对于每个位置，构建当前窗口的单词计数表，比较它和 `word_count` 是否相同。
   - 如果发现匹配，则记录下起始的索引。

这种方法通过不断偏移起始点来处理相邻单词的起始匹配位置，有效覆盖所有可能的起始位置。

最终返回所有的起始索引。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def findSubstring(s: str, words: List[str]) -> List[int]:
    if not s or not words:
        return []

    # 所有单词长度相同
    word_len = len(words[0])
    total_len = word_len * len(words)
    word_count = Counter(words)
    result = []

    # 从每个偏移位置遍历
    for i in range(word_len):
        left = i
        current_count = Counter()
        # 位置从 i 开始，步长为 word_len，直到 s 剩余长度不足 total_len
        for j in range(i, len(s) - word_len + 1, word_len):
            word = s[j:j + word_len]
            if word in word_count:
                current_count[word] += 1
                # 移动窗口直到减小当前单词的 count < word_count
                while current_count[word] > word_count[word]:
                    current_count[s[left:left + word_len]] -= 1
                    left += word_len
                # 如果窗口长度正好为 total_len，说明是匹配的子数组
                if j + word_len - left == total_len:
                    result.append(left)
            else:
                current_count.clear()
                left = j + word_len

    return result
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<int> findSubstring(string s, vector<string>& words) {
        if (s.empty() || words.empty()) return {};

        int word_len = words[0].size(), total_len = word_len * words.size();
        unordered_map<string, int> word_count;
        vector<int> result;

        for (const string& word : words)
            ++word_count[word];

        for (int i = 0; i < word_len; ++i) {
            unordered_map<string, int> current_count;
            int left = i;
            for (int j = i; j + word_len <= s.size(); j += word_len) {
                string word = s.substr(j, word_len);
                if (word_count.count(word)) {
                    ++current_count[word];
                    while (current_count[word] > word_count[word]) {
                        --current_count[s.substr(left, word_len)];
                        left += word_len;
                    }
                    if (j + word_len - left == total_len) {
                        result.push_back(left);
                    }
                } else {
                    current_count.clear();
                    left = j + word_len;
                }
            }
        }

        return result;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function findSubstring(s, words) {
    if (!s || !words.length) return [];

    const word_len = words[0].length;
    const total_len = word_len * words.length;
    const word_count = {};
    const result = [];

    for (const word of words) {
        word_count[word] = (word_count[word] || 0) + 1;
    }

    for (let i = 0; i < word_len; i++) {
        let left = i;
        const current_count = {};

        for (let j = i; j <= s.length - word_len; j += word_len) {
            const word = s.substring(j, j + word_len);
            if (word_count[word]) {
                current_count[word] = (current_count[word] || 0) + 1;
                while (current_count[word] > word_count[word]) {
                    const left_word = s.substring(left, left + word_len);
                    current_count[left_word]--;
                    left += word_len;
                }
                if (j + word_len - left === total_len) {
                    result.push(left);
                }
            } else {
                current_count = {};
                left = j + word_len;
            }
        }
    }

    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public List<Integer> findSubstring(String s, String[] words) {
        if (s == null || s.length() == 0 || words == null || words.length == 0) return new ArrayList<>();

        int wordLen = words[0].length();
        int totalLen = wordLen * words.length;
        Map<String, Integer> wordCount = new HashMap<>();
        for (String word : words) {
            wordCount.put(word, wordCount.getOrDefault(word, 0) + 1);
        }

        List<Integer> result = new ArrayList<>();

        for (int i = 0; i < wordLen; i++) {
            int left = i;
            Map<String, Integer> currentCount = new HashMap<>();

            for (int j = i; j + wordLen <= s.length(); j += wordLen) {
                String word = s.substring(j, j + wordLen);
                if (wordCount.containsKey(word)) {
                    currentCount.put(word, currentCount.getOrDefault(word, 0) + 1);
                    while (currentCount.get(word) > wordCount.get(word)) {
                        String leftWord = s.substring(left, left + wordLen);
                        currentCount.put(leftWord, currentCount.get(leftWord) - 1);
                        left += wordLen;
                    }
                    if (j + wordLen - left == totalLen) {
                        result.add(left);
                    }
                } else {
                    currentCount.clear();
                    left = j + wordLen;
                }
            }
        }

        return result;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(n \cdot m)$，其中 $n$ 是字符串 $s$ 的长度，$m$ 是 `words` 中所有单词的长度和。
- 空间复杂度：$O(m)$，因为我们需要存储计数表 `current_count` 和 `word_count`。
