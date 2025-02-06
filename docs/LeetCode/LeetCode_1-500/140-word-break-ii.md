---
sidebar_position: 140
tags:
  - dynamic-programming
  - backtracking
  - Hard
---

# 140.单词拆分 II

标签: `dynamic-programming`, `backtracking`

难度: Hard

通过率: 52.42%

原题链接: https://leetcode.com/problems/word-break-ii/description/

## 题目描述
给定一个字符串 $s$ 和一个字符串字典 $wordDict$，在 $s$ 中插入空格以构造一个句子，使得句子中的每个单词是一个有效的字典单词。返回所有可能的句子，顺序不限。注意：字典中的同一个单词可以在分段中重复使用。

## 解题思路
这个问题可被视为一个动态规划和回溯结合的问题。我们需要找到所有可能的方式将字符串 $s$ 分割成字典中存在的单词。要处理这个问题，可以利用以下策略：

1. **动态规划前导步骤**：首先，我们利用动态规划数组 `dp[i]` 存储从开头到位置 $i-1$ 的子字符串是否可以由字典中的单词组成。我们通过检查当前子字符串的每一个划分来更新 `dp[i]`。

2. **回溯法**：当 `dp` 数组的目标位置值可用时，意味着存在一种方法可以将 $s[0:i]$ 拆分为字典中的单词。此时，使用回溯法从字符串的末尾逐步构建可能的句子。通过递归从 `s` 的末尾开始检查每一个可行的逆向分割，逐步返回有效路径，然后将这些路径拼接成完整的结果。

3. **字典查询加速**：通过使用集合来加速对字典单词的查询。

总体来说，采用动态规划解决可分段性问题，然后通过回溯构建具体的分割路径。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def wordBreak(s: str, wordDict: List[str]) -> List[str]:
    # 用集合存储字典以加速查找
    wordSet = set(wordDict)
    n = len(s)
    
    # 定义dp数组
    dp = [False] * (n + 1)
    dp[0] = True  # 空字符串可以认为是字典的一部分
    
    # 动态规划填充dp数组
    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in wordSet:
                dp[i] = True
                break

    # 用来存储答案
    res = []
    
    # 如果最后一个位置不可分，说明无解
    if not dp[n]:
        return res

    # 回溯方法构造所有可能的句子
    def backtrack(index, path):
        if index == 0:
            res.append(' '.join(reversed(path)))
            return
        for i in range(index):
            if dp[i] and s[i:index] in wordSet:
                backtrack(i, path + [s[i:index]])

    backtrack(n, [])
    return res

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<string> wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> wordSet(wordDict.begin(), wordDict.end());
        int n = s.size();
        vector<bool> dp(n + 1, false);
        dp[0] = true;

        for (int i = 1; i <= n; ++i) {
            for (int j = 0; j < i; ++j) {
                if (dp[j] && wordSet.count(s.substr(j, i - j))) {
                    dp[i] = true;
                    break;
                }
            }
        }

        vector<string> res;
        if (!dp[n]) return res;

        function<void(int, vector<string>&)> backtrack = [&](int index, vector<string>& path) {
            if (index == 0) {
                string sentence;
                for (int i = path.size() - 1; i >= 0; --i) {
                    sentence += path[i];
                    if (i != 0) sentence += " ";
                }
                res.push_back(sentence);
                return;
            }
            for (int i = 0; i < index; ++i) {
                if (dp[i] && wordSet.count(s.substr(i, index - i))) {
                    path.push_back(s.substr(i, index - i));
                    backtrack(i, path);
                    path.pop_back();
                }
            }
        };

        vector<string> path;
        backtrack(n, path);

        return res;
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const n = s.length;
    const dp = Array(n + 1).fill(false);
    dp[0] = true;

    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }

    const res = [];
    if (!dp[n]) return res;

    const backtrack = (index, path) => {
        if (index === 0) {
            res.push(path.reverse().join(' '));
            path.reverse();
            return;
        }
        for (let i = 0; i < index; i++) {
            if (dp[i] && wordSet.has(s.substring(i, index))) {
                path.push(s.substring(i, index));
                backtrack(i, path);
                path.pop();
            }
        }
    };

    backtrack(n, []);
    return res;
}

```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

class Solution {
    public List<String> wordBreak(String s, List<String> wordDict) {
        Set<String> wordSet = new HashSet<>(wordDict);
        int n = s.length();
        boolean[] dp = new boolean[n + 1];
        dp[0] = true;

        for (int i = 1; i <= n; i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && wordSet.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }

        List<String> res = new ArrayList<>();
        if (!dp[n]) return res;

        Deque<String> path = new ArrayDeque<>();
        backtrack(s, wordSet, dp, n, path, res);

        return res;
    }

    private void backtrack(String s, Set<String> wordSet, boolean[] dp, int end, Deque<String> path, List<String> res) {
        if (end == 0) {
            res.add(String.join(" ", path));
            return;
        }
        for (int i = 0; i < end; i++) {
            if (dp[i] && wordSet.contains(s.substring(i, end))) {
                path.addFirst(s.substring(i, end));
                backtrack(s, wordSet, dp, i, path, res);
                path.removeFirst();
            }
        }
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(2^n)$，最坏情况下，所有子分隔法都可能需要被探测，尤其是在回溯过程中。
- 空间复杂度：$O(n^2)$，用于存储动态规划表格和递归栈深度可能达到 $O(n)$。
