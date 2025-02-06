---
sidebar_position: 212
tags:
  - trie
  - backtracking
  - Hard
---

# 212.单词搜索 II

标签: `trie`, `backtracking`

难度: Hard

通过率: 36.82%

原题链接: https://leetcode.com/problems/word-search-ii/description/

## 题目描述
给定一个字符的 $m \times n$ 的棋盘和一个字符串列表 words，返回棋盘上可以组成的所有单词。 每个单词必须由顺序相邻的单元格构成，其中相邻单元格是水平或垂直相邻的。 同一个单元格中的字母不能多次在一个单词中重复使用。

## 解题思路
这个问题可以使用字典树（Trie）结合回溯算法来解决。主要步骤如下：

1. **构建字典树 (Trie)：**
   - 先将所有的单词插入到一棵字典树中。字典树可以帮助我们有效地检索前缀和单词。

2. **遍历棋盘进行搜索：**
   - 对棋盘上的每一个单元格，尝试从该单元格开始，通过深度优先搜索来查看是否可以找到任何以此单元格开始的单词。
   - 使用方向数组来实现移动（上下左右）。
   - 在搜索过程中，使用字典树来检索当前路径形成的字符串是否是某个单词的前缀或者是某个单词。

3. **标记访问：**
   - 在深度优先搜索的过程中，使用一个额外的数组来标记已经访问过的单元格，以防止在同一个路径中重复访问。

4. **剪枝和优化：**
   - 如果当前访问的前缀不在字典树中，不必继续搜索。
   - 对于已经找到的单词，可以从字典树中删掉，以减少以后的搜索。

这种方法结合了字典树的高效前缀查找能力和深度优先搜索的路径扩展能力，能够在合理的时间内解决大规模数据的问题。

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

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True

class Solution:
    def findWords(self, board, words):
        def backtrack(i, j, node, path):
            if node.is_end_of_word:
                result.add(path)
                node.is_end_of_word = False  # 关键步骤，防止重复加入同一单词
            if i < 0 or i >= len(board) or j < 0 or j >= len(board[0]) or board[i][j] == "#":
                return
            char = board[i][j]
            if char not in node.children:
                return
            board[i][j] = "#"  # 标记为访问
            for x, y in [(i + 1, j), (i - 1, j), (i, j + 1), (i, j - 1)]:
                backtrack(x, y, node.children[char], path + char)
            board[i][j] = char  # 恢复状态
        
        result = set()
        trie = Trie()
        node = trie.root
        for word in words:
            trie.insert(word)
        for i in range(len(board)):
            for j in range(len(board[0])):
                backtrack(i, j, node, "")
        return list(result)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
struct TrieNode {
    std::unordered_map<char, TrieNode*> children;
    bool is_end_of_word = false;
};

class Trie {
public:
    TrieNode* root;
    Trie() { root = new TrieNode(); }
    void insert(const std::string& word) {
        TrieNode* node = root;
        for (char c : word) {
            if (node->children.find(c) == node->children.end())
                node->children[c] = new TrieNode();
            node = node->children[c];
        }
        node->is_end_of_word = true;
    }
};

class Solution {
public:
    std::vector<std::string> findWords(std::vector<std::vector<char>>& board, std::vector<std::string>& words) {
        Trie trie;
        for (const std::string& word : words) {
            trie.insert(word);
        }

        std::unordered_set<std::string> result;
        for (int i = 0; i < board.size(); ++i) {
            for (int j = 0; j < board[0].size(); ++j) {
                backtrack(board, i, j, trie.root, "", result);
            }
        }

        return std::vector<std::string>(result.begin(), result.end());
    }

private:
    void backtrack(std::vector<std::vector<char>>& board, int i, int j, TrieNode* node, std::string path, std::unordered_set<std::string>& result) {
        if (node->is_end_of_word) {
            result.insert(path);
            node->is_end_of_word = false;  // 防止重复放入结果集
        }

        if (i < 0 || i >= board.size() || j < 0 || j >= board[0].size() || board[i][j] == '#')
            return;
        
        char c = board[i][j];
        if (node->children.find(c) == node->children.end())
            return;

        board[i][j] = '#';  // 标记为访问
        for (auto [x, y] : {std::make_pair(i+1, j), std::make_pair(i-1, j), std::make_pair(i, j+1), std::make_pair(i, j-1)}) {
            backtrack(board, x, y, node->children[c], path + c, result);
        }
        board[i][j] = c;  // 恢复状态
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }
    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }
}

var findWords = function(board, words) {
    const trie = new Trie();
    for (let word of words) {
        trie.insert(word);
    }

    const result = new Set();
    const rows = board.length;
    const cols = board[0].length;

    const backtrack = (i, j, node, path) => {
        if (node.isEndOfWord) {
            result.add(path);
            node.isEndOfWord = false;  // 避免重复结果
        }
        if (i < 0 || i >= rows || j < 0 || j >= cols || board[i][j] === '#') return;

        const char = board[i][j];
        if (!node.children[char]) return;

        board[i][j] = '#';  // 标记为访问过
        for (const [x, y] of [[i+1, j], [i-1, j], [i, j+1], [i, j-1]]) {
            backtrack(x, y, node.children[char], path + char);
        }
        board[i][j] = char;  // 恢复状态
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            backtrack(i, j, trie.root, "");
        }
    }

    return Array.from(result);
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    boolean isEndOfWord = false;
}

class Trie {
    TrieNode root = new TrieNode();
    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            node.children.putIfAbsent(c, new TrieNode());
            node = node.children.get(c);
        }
        node.isEndOfWord = true;
    }
}

class Solution {
    public List<String> findWords(char[][] board, String[] words) {
        Trie trie = new Trie();
        for (String word : words) {
            trie.insert(word);
        }
        
        Set<String> result = new HashSet<>();
        for (int i = 0; i < board.length; i++) {
            for (int j = 0; j < board[0].length; j++) {
                backtrack(board, i, j, trie.root, "", result);
            }
        }
        return new ArrayList<>(result);
    }

    private void backtrack(char[][] board, int i, int j, TrieNode node, String path, Set<String> result) {
        if (node.isEndOfWord) {
            result.add(path);
            node.isEndOfWord = false;  // 防止重复结果
        }

        if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] == '#')
            return;

        char c = board[i][j];
        TrieNode childNode = node.children.get(c);
        if (childNode == null)
            return;

        board[i][j] = '#';  // 标记为访问
        int[][] directions = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        for (int[] d : directions) {
            backtrack(board, i + d[0], j + d[1], childNode, path + c, result);
        }
        board[i][j] = c;  // 恢复标记
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：构造字典树的时间复杂度为 $O(L)$，其中 $L$ 是所有单词字符的总数。搜索的时间复杂度在最坏情况下为 $O(m \times n \times 4^k)$，其中 $k$ 是单词的平均长度。搜索的最坏情况是遇到每个单元格尝试4个方向。

空间复杂度：空间复杂度为 $O(L + m \times n)$，用于存储字典树和递归调用时使用的栈空间及标记访问的数组。
