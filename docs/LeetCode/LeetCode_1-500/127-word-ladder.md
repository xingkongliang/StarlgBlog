---
sidebar_position: 127
tags:
  - breadth-first-search
  - hash-table
  - Hard
---

# 127.单词接龙

标签: `breadth-first-search`, `hash-table`

难度: Hard

通过率: 41.15%

原题链接: https://leetcode.com/problems/word-ladder/description/

## 题目描述
给定两个单词 `beginWord` 和 `endWord`，以及一个字典 `wordList`，寻找从 `beginWord` 到 `endWord` 的最短转换序列的长度。转换规则是：每次转换改变单词中的一个字母，且转换后的单词必须在 `wordList` 中。若不存在这样的转换序列，则返回 0。

## 解题思路
解决该问题的思路是使用广度优先搜索（BFS）算法。由于每个单词仅差一个字符，因此可以将每个单词视作图中的一个节点，相差一个字符的两个单词之间有边连接。问题即为求解从 `beginWord` 到 `endWord` 的最短路径，这与最短路径问题类似。步骤如下：

1. 用 `set` 类型的 `wordList` 来提高查找速度。
2. 如果 `endWord` 不在 `wordList` 中，直接返回 0，因为无法到达。
3. 使用队列（Queue）实现 BFS，将 `beginWord` 入队，并初始化层级为 1，因为起始处就是第一层。
4. 依次从队列中取出当前单词，对它的每个字符，尝试替换成字母表中的任何一个小写字母，从而生成新单词：
   - 如果新单词在 `wordList` 中，且等于 `endWord`，则返回当前层级加 1，表示找到路径。
   - 如果新单词在 `wordList` 中且不等于 `endWord`，将它加入队列中，并从 `wordList` 中删除以避免重复访问。
5. 如果队列为空则表示无法转换成功，返回 0。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
from collections import deque

def ladderLength(beginWord: str, endWord: str, wordList: List[str]) -> int:
    wordSet = set(wordList)  # 将单词列表转为集合，便于 O(1) 时间内查找
    if endWord not in wordSet:
        return 0
    
    queue = deque([(beginWord, 1)])  # 队列初始化时放入起始单词和初始层级 1
    
    while queue:
        currentWord, level = queue.popleft()
        for i in range(len(currentWord)):
            for c in "abcdefghijklmnopqrstuvwxyz":
                nextWord = currentWord[:i] + c + currentWord[i+1:]
                if nextWord == endWord:
                    return level + 1
                if nextWord in wordSet:
                    queue.append((nextWord, level + 1))
                    wordSet.remove(nextWord)
    
    return 0
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++
#include <unordered_set>
#include <queue>
#include <string>
using namespace std;

int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
    unordered_set<string> wordSet(wordList.begin(), wordList.end());
    if (wordSet.find(endWord) == wordSet.end()) return 0;

    queue<pair<string, int>> q;
    q.push({beginWord, 1});

    while (!q.empty()) {
        auto [currentWord, level] = q.front();
        q.pop();
        for (int i = 0; i < currentWord.length(); ++i) {
            char originalChar = currentWord[i];
            for (char c = 'a'; c <= 'z'; ++c) {
                if (c == originalChar) continue;
                currentWord[i] = c;
                if (currentWord == endWord) return level + 1;
                if (wordSet.find(currentWord) != wordSet.end()) {
                    q.push({currentWord, level + 1});
                    wordSet.erase(currentWord);
                }
            }
            currentWord[i] = originalChar;
        }
    }

    return 0;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript
function ladderLength(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;

    const queue = [[beginWord, 1]];

    while (queue.length > 0) {
        const [currentWord, level] = queue.shift();
        for (let i = 0; i < currentWord.length; i++) {
            for (let c = 97; c <= 122; c++) { // 'a' to 'z'
                const nextWord = currentWord.slice(0, i) + String.fromCharCode(c) + currentWord.slice(i + 1);
                if (nextWord === endWord) return level + 1;
                if (wordSet.has(nextWord)) {
                    queue.push([nextWord, level + 1]);
                    wordSet.delete(nextWord);
                }
            }
        }
    }

    return 0;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> wordSet = new HashSet<>(wordList);
        if (!wordSet.contains(endWord)) return 0;

        Queue<Pair<String, Integer>> queue = new LinkedList<>();
        queue.offer(new Pair<>(beginWord, 1));

        while (!queue.isEmpty()) {
            Pair<String, Integer> current = queue.poll();
            String currentWord = current.getKey();
            int level = current.getValue();

            for (int i = 0; i < currentWord.length(); i++) {
                char[] charArray = currentWord.toCharArray();
                for (char c = 'a'; c <= 'z'; c++) {
                    charArray[i] = c;
                    String nextWord = new String(charArray);
                    if (nextWord.equals(endWord)) return level + 1;
                    if (wordSet.contains(nextWord)) {
                        queue.offer(new Pair<>(nextWord, level + 1));
                        wordSet.remove(nextWord);
                    }
                }
            }
        }

        return 0;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(M \cdot N)$，其中 $M$ 是单词的长度，$N$ 是字典中单词的数量。在最坏情况下，每个单词的每个字符都可能被替换，从而检查变体在字典中的存在性。 

空间复杂度：$O(M \cdot N)$，最坏情况下，队列中的单词数量可能为 $N$，每个单词占用 $O(M)$ 的空间。
