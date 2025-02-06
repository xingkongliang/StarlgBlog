---
sidebar_position: 126
tags:
  - breadth-first-search
  - backtracking
  - Hard
---

# 126.单词接龙 II

标签: `breadth-first-search`, `backtracking`

难度: Hard

通过率: 27.12%

原题链接: https://leetcode.com/problems/word-ladder-ii/description/

## 题目描述
给定两个单词，beginWord 和 endWord，再给一个字典 wordList，返回从 beginWord 变换到 endWord 的所有最短转换序列。每次变换只能改变一个字母，每次变换后的中间单词都必须在字典 wordList 里。

如果不存在这样的序列，返回空列表。

## 解题思路
解决这个问题可以通过广度优先搜索（BFS）来寻找最短路径，再结合回溯法来构造所有的路径。

- **步骤1: 广度优先搜索**
    - 先使用BFS从起始单词 `beginWord` 开始查找所有可能的变换路径，一直到遇到目标单词 `endWord`。
    - 在遍历过程中，我们需要建立一个映射关系 `word -> 前驱单词列表`，用于记录在某个层级上某个单词是通过哪些单词变换而来的。
    - 为了优化，我们可以从两端（`beginWord` 和 `endWord`）同时进行 BFS，这样可以减少遍历的层级。

- **步骤2: 回溯构造路径**
    - 在得到所有的前驱单词信息后，使用深度优先搜索（DFS）或回溯，结合从 `endWord` 向 `beginWord` 回溯来构造所有的最短路径序列。

- **注意点:**
    - 我们需要在 BFS 的过程中维护一个 level 的信息，以确保我们可以找到最短路径。
    - 可以通过在 BFS 中访问单词时，标记该单词已经访问过，以避免重复访问。

- **边界情况:**
    - 如果 `endWord` 不在 `wordList` 中，直接返回空列表。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
from collections import defaultdict, deque

def findLadders(beginWord, endWord, wordList):
    wordSet = set(wordList)
    if endWord not in wordSet:
        return []

    # 使用双向BFS以加速搜索
    front, back = {beginWord}, {endWord}
    tree, is_found = defaultdict(set), False
    wordSet.discard(beginWord)

    while front and not is_found:
        next_front = set()

        for word in front:
            for i in range(len(word)):
                for c in 'abcdefghijklmnopqrstuvwxyz':
                    neigh = word[:i] + c + word[i+1:]
                    if neigh in back:
                        is_found = True
                        tree[neigh].add(word)
                    if neigh in wordSet:
                        tree[neigh].add(word)
                        next_front.add(neigh)

        wordSet -= next_front
        front = next_front if len(next_front) < len(back) else back
        back = back if len(next_front) < len(back) else front

    def backtrack(word):
        if word == beginWord:
            return [[beginWord]]
        return [[word] + path for w in tree[word] for path in backtrack(w)]

    return backtrack(endWord)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
```cpp
#include <vector>
#include <string>
#include <unordered_set>
#include <unordered_map>
#include <queue>

using namespace std;

class Solution {
public:
    vector<vector<string>> findLadders(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> wordSet(wordList.begin(), wordList.end());
        if (!wordSet.count(endWord)) return {};

        unordered_set<string> frontSet {beginWord}, backSet {endWord};
        unordered_map<string, vector<string>> tree;
        bool isFound = false;

        while (!frontSet.empty() && !isFound) {
            unordered_set<string> nextFrontSet;
            for (string word : frontSet) wordSet.erase(word);
            for (string word : backSet) wordSet.erase(word);

            for (const string& word : frontSet) {
                string currentWord = word;
                for (int i = 0; i < currentWord.size(); ++i) {
                    char originalChar = currentWord[i];
                    for (char c = 'a'; c <= 'z'; ++c) {
                        currentWord[i] = c;
                        if (backSet.count(currentWord)) {
                            isFound = true;
                            tree[currentWord].push_back(word);
                        }
                        if (!isFound && wordSet.count(currentWord)) {
                            nextFrontSet.insert(currentWord);
                            tree[currentWord].push_back(word);
                        }
                    }
                    currentWord[i] = originalChar;
                }
            }

            if (nextFrontSet.size() < backSet.size())
                frontSet = nextFrontSet;
            else
                frontSet = backSet, backSet = nextFrontSet;
        }

        vector<vector<string>> results;
        if (isFound) backtrack(beginWord, endWord, tree, {endWord}, results);
        return results;
    }

private:
    void backtrack(const string& beginWord, const string& word,
                   unordered_map<string, vector<string>>& tree,
                   vector<string> path,
                   vector<vector<string>>& results) {
        if (word == beginWord) {
            reverse(path.begin(), path.end());
            results.push_back(path);
            return;
        }
        for (const string& prevWord : tree[word]) {
            path.push_back(prevWord);
            backtrack(beginWord, prevWord, tree, path, results);
            path.pop_back();
        }
    }
};
```
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function findLadders(beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return [];

    let front = new Set([beginWord]), back = new Set([endWord]);
    const tree = new Map(), isFound = false;

    while (front.size && !isFound) {
        const nextFront = new Set;
        for (const word of [...front, ...back]) wordSet.delete(word);

        for (const word of front) {
            const currentWord = word.split('');
            for (let i = 0; i < currentWord.length; i++) {
                const originalChar = currentWord[i];
                for (let c = 0; c < 26; c++) {
                    currentWord[i] = String.fromCharCode(97 + c);
                    const newWord = currentWord.join('');
                    if (back.has(newWord)) {
                        isFound = true;
                        if (!tree.has(newWord)) tree.set(newWord, []);
                        tree.get(newWord).push(word);
                    }
                    if (!isFound && wordSet.has(newWord)) {
                        if (!tree.has(newWord)) tree.set(newWord, []);
                        tree.get(newWord).push(word);
                        nextFront.add(newWord);
                    }
                }
                currentWord[i] = originalChar;
            }
        }
        front = nextFront.size < back.size ? nextFront : back;
        back = front === nextFront ? back : nextFront;
    }

    const results = [];
    if (isFound) {
        const pathStack = [endWord];
        function backtrack(word) {
            if (word === beginWord) {
                results.push([...pathStack].reverse());
                return;
            }
            for (const adj of tree.get(word) || []) {
                pathStack.push(adj);
                backtrack(adj);
                pathStack.pop();
            }
        }
        backtrack(endWord);
    }
    return results;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

class Solution {
    public List<List<String>> findLadders(String beginWord, String endWord, List<String> wordList) {
        Set<String> wordSet = new HashSet<>(wordList);
        if (!wordSet.contains(endWord)) return new ArrayList<>();

        Set<String> front = new HashSet<>(), back = new HashSet<>();
        front.add(beginWord);
        back.add(endWord);
        Map<String, List<String>> tree = new HashMap<>();
        boolean isFound = false, reverse = false;

        while (!front.isEmpty() && !isFound) {
            Set<String> nextFront = new HashSet<>();
            for (String word : front) wordSet.remove(word);

            for (String word : front) {
                char[] currentWord = word.toCharArray();
                for (int i = 0; i < currentWord.length; i++) {
                    char originalChar = currentWord[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        currentWord[i] = c;
                        String newWord = new String(currentWord);
                        if (back.contains(newWord)) {
                            isFound = true;
                            String key = reverse ? newWord : word;
                            String value = reverse ? word : newWord;
                            tree.computeIfAbsent(key, k -> new ArrayList<>()).add(value);
                        }
                        if (!isFound && wordSet.contains(newWord)) {
                            nextFront.add(newWord);
                            String key = reverse ? newWord : word;
                            String value = reverse ? word : newWord;
                            tree.computeIfAbsent(key, k -> new ArrayList<>()).add(value);
                        }
                    }
                    currentWord[i] = originalChar;
                }
            }
            front = nextFront.size() > back.size() ? back : nextFront;
            back = front == nextFront ? back : nextFront;
            reverse = front.size() > back.size();
        }

        List<List<String>> results = new ArrayList<>();
        if (isFound) {
            List<String> path = new LinkedList<>();
            path.add(beginWord);
            backtrack(beginWord, endWord, tree, path, results);
        }
        return results;
    }

    private void backtrack(String beginWord, String endWord, Map<String, List<String>> tree,
                           List<String> path, List<List<String>> results) {
        if (beginWord.equals(endWord)) {
            results.add(new ArrayList<>(path));
            return;
        }
        if (!tree.containsKey(beginWord)) return;
        for (String nextWord : tree.get(beginWord)) {
            path.add(nextWord);
            backtrack(nextWord, endWord, tree, path, results);
            path.remove(path.size() - 1);
        }
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(N \times M^2)$，其中 $N$ 是字典中单词的数量，$M$ 是单词的长度。在最坏的情况下，我们需要将每个单词的每个字符替换为其他 25 个字母，总共有 $N \times M \times 26$ 次操作。
空间复杂度：$O(N \times M)$，用于存储字典、队列和树。
