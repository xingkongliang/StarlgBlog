---
sidebar_position: 211
tags:
  - trie
  - design
  - string
  - Medium
---

# 211.设计添加和搜索单词的数据结构

标签: `trie`, `design`, `string`

难度: Medium

通过率: 46.34%

原题链接: https://leetcode.com/problems/design-add-and-search-words-data-structure/description/

## 题目描述
设计一种支持添加新单词和查找是否有字符串匹配任何以前添加的字符串的数据结构。实现 WordDictionary 类：

- WordDictionary() 初始化对象。
- void addWord(word) 将单词添加到数据结构中，以后可以匹配。
- bool search(word) 如果数据结构中存在与单词匹配的字符串，则返回 true，否则返回 false。单词可能包含点 '.'，点可以匹配任何字母。

## 解题思路
为了高效实现这个问题，我们可以使用字典树（Trie）数据结构。字典树提供了一种高效的方式来存储大量字符串，并且支持高效的前缀查找和带有通配符的单词查找。这个题目的关键点在于需要支持任意位置的通配符 '.'，这可以通过深度优先搜索的方式来处理。

### 解题步骤：

1. **实现 Trie 节点的结构：**
   每个节点包含一个子节点数组（或者字典）指向它的孩子节点，以及一个布尔标志表示是否是一个完整的单词结尾。

2. **建立 Trie 树：**
   实现 `addWord` 函数，将单词逐一添加到 Trie 树中。

3. **搜索函数实现：**
   为 `search` 函数实现递归的深度优先搜索。对于普通字符，沿着 Trie 树向下搜索；对于 '.'，则递归遍历所有可能的子节点。

这种设计能够很好地处理最多含有两个 '.' 的搜索查询。递归地处理通配符部分，并进行回溯搜索，直到找到匹配的位置或确定没有匹配。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class WordDictionary:
    def __init__(self):
        self.root = TrieNode()

    def addWord(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True

    def search(self, word: str) -> bool:
        def dfs(index, node):
            if index == len(word):
                return node.is_end_of_word
            char = word[index]
            if char == '.':
                return any(dfs(index + 1, child) for child in node.children.values())
            if char in node.children:
                return dfs(index + 1, node.children[char])
            return False

        return dfs(0, self.root)

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class TrieNode {
public:
    TrieNode* children[26];
    bool is_end_of_word;
    TrieNode() : is_end_of_word(false) {
        memset(children, 0, sizeof(children));
    }
};

class WordDictionary {
private:
    TrieNode* root;

public:
    WordDictionary() {
        root = new TrieNode();
    }

    void addWord(const string &word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children[c - 'a']) {
                node->children[c - 'a'] = new TrieNode();
            }
            node = node->children[c - 'a'];
        }
        node->is_end_of_word = true;
    }

    bool search(const string &word) {
        return dfs(word.c_str(), root);
    }

    bool dfs(const char* word, TrieNode* node) {
        for (int i = 0; word[i]; ++i) {
            char c = word[i];
            if (c == '.') {
                for (int j = 0; j < 26; ++j) {
                    if (node->children[j] && dfs(word + i + 1, node->children[j])) {
                        return true;
                    }
                }
                return false;
            }
            else {
                if (!node->children[c - 'a']) return false;
                node = node->children[c - 'a'];
            }
        }
        return node->is_end_of_word;
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class TrieNode {
    constructor() {
        this.children = {};
        this.is_end_of_word = false;
    }
}

class WordDictionary {
    constructor() {
        this.root = new TrieNode();
    }

    addWord(word) {
        let node = this.root;
        for (let char of word) {
            if (!(char in node.children)) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.is_end_of_word = true;
    }

    search(word) {
        const dfs = (index, node) => {
            if (index === word.length) return node.is_end_of_word;
            const char = word[index];
            if (char === '.') {
                for (let key in node.children) {
                    if (dfs(index + 1, node.children[key])) return true;
                }
                return false;
            } else {
                if (!(char in node.children)) return false;
                return dfs(index + 1, node.children[char]);
            }
        };
        return dfs(0, this.root);
    }
}

```

</TabItem>
<TabItem value="java" label="Java">

```java
class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    boolean is_end_of_word = false;
}

class WordDictionary {
    private TrieNode root;

    public WordDictionary() {
        root = new TrieNode();
    }

    public void addWord(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            node.children.putIfAbsent(c, new TrieNode());
            node = node.children.get(c);
        }
        node.is_end_of_word = true;
    }

    public boolean search(String word) {
        return dfs(word, 0, root);
    }

    private boolean dfs(String word, int index, TrieNode node) {
        if (index == word.length()) return node.is_end_of_word;
        char c = word.charAt(index);
        if (c == '.') {
            for (TrieNode child : node.children.values()) {
                if (dfs(word, index + 1, child)) return true;
            }
            return false;
        } else {
            if (!node.children.containsKey(c)) return false;
            return dfs(word, index + 1, node.children.get(c));
        }
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：

对于 `addWord` 操作，由于我们需要将该单词的每个字符插入到 Trie 中，所以时间复杂度是 $O(L)$，其中 $L$ 是单词的长度。对于 `search` 操作，最坏情况下也需要遍历该单词的每个字符，因此时间复杂度是 $O(L)$。需要注意的是，`search` 在遇到通配符 '.' 时可能需要遍历多个字母的分支，但这一般不会影响复杂度。

空间复杂度：

在最坏的情况下，Trie 的空间复杂度是 $O(N \times L)$，其中 $N$ 是插入单词的个数且 $L$ 是单词的平均长度，因为我们需要为 Trie 中的每个节点分配空间。
