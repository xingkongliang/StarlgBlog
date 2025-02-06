---
sidebar_position: 208
tags:
  - trie
  - design
  - Medium
---

# 208.实现 Trie (前缀树)

标签: `trie`, `design`

难度: Medium

通过率: 66.96%

原题链接: https://leetcode.com/problems/implement-trie-prefix-tree/description/

## 题目描述
实现一个 Trie (前缀树) 数据结构以存储和检索字符串集合中的键。实现以下操作：
* `Trie()`：初始化前缀树对象。
* `insert(String word)`：在前缀树中插入字符串 `word`。
* `search(String word)`：如果字符串 `word` 在前缀树中，则返回 `true`，否则返回 `false`。
* `startsWith(String prefix)`：如果存在以给定前缀 `prefix` 开头的字符串，则返回 `true`，否则返回 `false`。

## 解题思路
为了实现一个 Trie，我们将其设计为一个树形结构，其中每个节点代表一个字母。根节点为空，之后的每个节点中包括以下几个部分：
1. 一个固定大小为26的指针列表(数组)，用于指向其它节点（代表 26 个小写英文字母 a-z）。
2. 一个布尔值 `isEnd`，用于判断该节点是否是某个单词的结尾。

插入（`insert`）的操作：
- 从根节点开始，逐个字符向下移动，并根据字符创建新的节点，直到插入完所有字符。标记最后一个字符节点的 `isEnd` 为真，表示这是一个完整单词的结尾。

查找（`search`）的操作：
- 从根节点开始，逐个字符向下移动，如果找不到对应的节点直接返回 `false`，最后查看当前节点的 `isEnd` 即可判断单词是否存在。

前缀匹配（`startsWith`）的操作：
- 与 `search` 类似，不同的是不需要检查最后一个节点的 `isEnd`，因为我们只判断前缀存在性。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class TrieNode:
    def __init__(self):
        # Initialize the children to an empty dictionary
        self.children = {}
        # Boolean value to check if it is the end of a word
        self.isEnd = False

class Trie:
    def __init__(self):
        # Initialize the root of Trie
        self.root = TrieNode()

    def insert(self, word: str):
        # Start from the root node
        node = self.root
        for char in word:
            # If the character is not in the trie, create a new TrieNode
            if char not in node.children:
                node.children[char] = TrieNode()
            # Move to the child node
            node = node.children[char]
        # Mark the end of the word
        node.isEnd = True

    def search(self, word: str) -> bool:
        # Start from the root node
        node = self.root
        for char in word:
            # If character is not found, return False
            if char not in node.children:
                return False
            # Move to the child node
            node = node.children[char]
        # Return True if current node marks the end of a valid word
        return node.isEnd

    def startsWith(self, prefix: str) -> bool:
        # Start from the root node
        node = self.root
        for char in prefix:
            # If character is not found, return False
            if char not in node.children:
                return False
            # Move to the child node
            node = node.children[char]
        # If every character of prefix is found then return True
        return True
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class TrieNode {
public:
    // Array for all possible children of this TrieNode
    TrieNode* children[26];
    // Indicate if the TrieNode marks the end of a word
    bool isEnd;

    TrieNode() : isEnd(false) {
        fill(begin(children), end(children), nullptr);
    }
};

class Trie {
private:
    TrieNode* root;

public:
    Trie() {
        root = new TrieNode();
    }

    void insert(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children[c - 'a']) {
                node->children[c - 'a'] = new TrieNode();
            }
            node = node->children[c - 'a'];
        }
        node->isEnd = true;
    }

    bool search(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children[c - 'a']) {
                return false;
            }
            node = node->children[c - 'a'];
        }
        return node->isEnd;
    }

    bool startsWith(string prefix) {
        TrieNode* node = root;
        for (char c : prefix) {
            if (!node->children[c - 'a']) {
                return false;
            }
            node = node->children[c - 'a'];
        }
        return true;
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class TrieNode {
    // Initialize your data structure here.
    constructor() {
        this.children = new Map();
        this.isEnd = false;
    }
}

class Trie {
    constructor() {
        // Initialize the root node
        this.root = new TrieNode();
    }
    
    /**
     * Inserts a word into the trie.
     * @param {string} word
     * @return {void}
     */
    insert(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode());
            }
            node = node.children.get(char);
        }
        node.isEnd = true;
    }
    
    /**
     * Returns if the word is in the trie.
     * @param {string} word
     * @return {boolean}
     */
    search(word) {
        let node = this.root;
        for (const char of word) {
            if (!node.children.has(char)) {
                return false;
            }
            node = node.children.get(char);
        }
        return node.isEnd;
    }
    
    /**
     * Returns if there is any word in the trie that starts with the given prefix.
     * @param {string} prefix
     * @return {boolean}
     */
    startsWith(prefix) {
        let node = this.root;
        for (const char of prefix) {
            if (!node.children.has(char)) {
                return false;
            }
            node = node.children.get(char);
        }
        return true;
    }
}

```

</TabItem>
<TabItem value="java" label="Java">

```java
class TrieNode {
    TrieNode[] children;
    boolean isEnd;

    public TrieNode() {
        children = new TrieNode[26];
        isEnd = false;
    }
}

public class Trie {
    private TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (node.children[c - 'a'] == null) {
                node.children[c - 'a'] = new TrieNode();
            }
            node = node.children[c - 'a'];
        }
        node.isEnd = true;
    }

    public boolean search(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (node.children[c - 'a'] == null) {
                return false;
            }
            node = node.children[c - 'a'];
        }
        return node.isEnd;
    }

    public boolean startsWith(String prefix) {
        TrieNode node = root;
        for (char c : prefix.toCharArray()) {
            if (node.children[c - 'a'] == null) {
                return false;
            }
            node = node.children[c - 'a'];
        }
        return true;
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度**
对于 `insert` 操作和 `search`、`startsWith` 操作，时间复杂度都是 $O(m)$，其中 $m$ 是插入/查询字符串的长度。


**空间复杂度**
在最坏的情况下，空间复杂度为 $O(m \, \times \ n)$，其中 $m$ 是字符串的平均长度，$n$ 是插入的字符串数量。
