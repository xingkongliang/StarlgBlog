---
sidebar_position: 139
tags:
  - dynamic-programming
  - hash-table
  - Medium
---

# 139.单词拆分

标签: `dynamic-programming`, `hash-table`

难度: Medium

通过率: 47.58%

原题链接: https://leetcode.com/problems/word-break/description/

## 题目描述
给定一个字符串 $s$ 和一个字符串列表 $wordDict$ 作为字典，如果 $s$ 可以拆分成一个由字典中单词组成的空格分隔序列，返回 $true$。注意：字典中的单词可以重复使用。

## 解题思路
这个问题可以用动态规划来解决。我们用 $dp[i]$ 表示字符串 $s[0:i]$ 是否可以拆分成字典中的单词序列。为了实现动态规划，需要以下步骤：

1. 初始化：定义一个大小为 $n+1$ 的布尔型数组 $dp$，其中 $n$ 是字符串 $s$ 的长度。将 $dp[0]$ 设为 $true$，因为空字符串总是可以被认为是由空单词组成的。
2. 遍历字符串 $s$ 的每个位置 $i$，对于每个位置 $i$，在字典中检查每个单词 $word$：
   - 如果 $word$ 可以用在 $i$ 位置上的话（即 $s[i-len(word):i]==word$），并且 $dp[i-len(word)]$ 为 $true$，那么 $dp[i]$ 就为 $true$。
3. 最后的答案为 $dp[n]$，它表示整个字符串是否可以被拆分。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def wordBreak(s, wordDict):
    # 创建一个集合来快速查找字典中的单词
    word_set = set(wordDict)
    # dp[i] 表示 s 的前 i 个字符是否可以由字典中的单词组成
    dp = [False] * (len(s) + 1)
    # 空字符串可以被认为是由字典中的单词组成
    dp[0] = True
    
    # 遍历字符串的每一位
    for i in range(1, len(s) + 1):
        # 检查每个可能的前缀
        for j in range(i):
            # 如果前缀能形成，并且切片在字典中，这条路径成立
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break
    # 返回整体字符串是否能被切割、组成
    return dp[len(s)]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> word_set(wordDict.begin(), wordDict.end());
        vector<bool> dp(s.size() + 1, false);
        dp[0] = true;
        
        for (int i = 1; i <= s.size(); ++i) {
            for (int j = 0; j < i; ++j) {
                if (dp[j] && word_set.find(s.substr(j, i - j)) != word_set.end()) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.size()];
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function wordBreak(s, wordDict) {
    const wordSet = new Set(wordDict);
    const dp = Array(s.length + 1).fill(false);
    dp[0] = true;
    
    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            if (dp[j] && wordSet.has(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[s.length];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> wordSet = new HashSet<>(wordDict);
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        
        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && wordSet.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.length()];
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n^2 \cdot m)$，其中 $n$ 是字符串 $s$ 的长度，$m$ 是字典中最长单词的长度。内循环最多需要扫描 $n$ 个位置，且每个子字符串需要在集合中检查。  
空间复杂度：$O(n)$，需要一个大小为 $n+1$ 的数组 $dp$。
