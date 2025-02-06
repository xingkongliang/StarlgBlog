---
sidebar_position: 132
tags:
  - dynamic-programming
  - string
  - Hard
---

# 132.回文分割 II

标签: `dynamic-programming`, `string`

难度: Hard

通过率: 34.6%

原题链接: https://leetcode.com/problems/palindrome-partitioning-ii/description/

## 题目描述
给定一个字符串 $s$，将 $s$ 划分为一些子串，使每个子串都是回文。返回使每个子串都是回文的最小分割次数。

## 解题思路
为了解决这个问题，我们需要计算字符串 $s$ 的最小分割次数，使得每段分割都是回文。因此，这个问题有两个关键点：如何判断一个子串是否为回文，以及如何使用动态规划计算最小切割次数。```
1. 判断回文：
    - 可以用一个二维数组 $p[i][j]$ 表示字符串 $s[i...j]$ 是否是回文。
    - 初始化时，$p[i][i] = true$（每个单独字符是回文）。
    - 对于 $s[i...j]$，如果 $s[i] == s[j]$ 且 $s[i+1...j-1]$ 是回文（即 $p[i+1][j-1] = true$），则 $p[i][j] = true$。

2. 动态规划：
    - 使用一维数组 $dp[i]$ 表示字符串 $s[0...i]$ 的最小分割次数。
    - 初始化时，$dp[i] = i$，因为最坏情况下，无法利用回文特性，我们需要切割 $i$ 次，即每个字符单独作为一个子串。
    - 如果 $s[0...i]$ 本身是一个回文，即 $p[0][i] = true$，则无需剪切设置 $dp[i] = 0$。
    - 否则，对于每个 $j$ 从 $0$ 到 $i$，如果 $s[j...i]$ 是回文（即 $p[j][i] = true$），则可以考虑 $dp[i] = min(dp[i], dp[j-1] + 1)$，这意味着在 $j-1$ 处做一个切割。```
最终，我们需要的最小切割次数就是 $dp[n-1]$，其中 $n$ 是字符串 $s$ 的长度。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def minCut(s: str) -> int:
    n = len(s)
    # 初始化二维列表用于检测是否是回文
    is_palindrome = [[False] * n for _ in range(n)]
    # 初始化 dp 数组
    dp = [0] * n
    
    for end in range(n):
        # 最坏情况下，每个字符切一下
        min_cut = end
        for start in range(end + 1):
            # 如果是回文，那么更新 is_palindrome
            if s[start] == s[end] and (end - start <= 2 or is_palindrome[start + 1][end - 1]):
                is_palindrome[start][end] = True
                # 如果是起点就不需切割
                min_cut = 0 if start == 0 else min(min_cut, dp[start - 1] + 1)
        dp[end] = min_cut
    return dp[-1]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int minCut(string s) {
        int n = s.size();
        vector<vector<bool>> is_palindrome(n, vector<bool>(n, false));
        vector<int> dp(n, 0);
        
        for (int end = 0; end < n; ++end) {
            int min_cut = end;
            for (int start = 0; start <= end; ++start) {
                if (s[start] == s[end] && (end - start <= 2 || is_palindrome[start + 1][end - 1])) {
                    is_palindrome[start][end] = true;
                    min_cut = (start == 0) ? 0 : min(min_cut, dp[start - 1] + 1);
                }
            }
            dp[end] = min_cut;
        }
        return dp[n - 1];
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function minCut(s) {
    const n = s.length;
    const isPalindrome = Array.from({length: n}, () => Array(n).fill(false));
    const dp = Array(n).fill(0);
    
    for (let end = 0; end < n; end++) {
        let minCut = end;
        for (let start = 0; start <= end; start++) {
            if (s[start] === s[end] && (end - start <= 2 || isPalindrome[start + 1][end - 1])) {
                isPalindrome[start][end] = true;
                minCut = start === 0 ? 0 : Math.min(minCut, dp[start - 1] + 1);
            }
        }
        dp[end] = minCut;
    }
    return dp[n - 1];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.Arrays;

public class Solution {
    public int minCut(String s) {
        int n = s.length();
        boolean[][] isPalindrome = new boolean[n][n];
        int[] dp = new int[n];
        
        for (int end = 0; end < n; end++) {
            int minCut = end;
            for (int start = 0; start <= end; start++) {
                if (s.charAt(start) == s.charAt(end)
                        && (end - start <= 2 || isPalindrome[start + 1][end - 1])) {
                    isPalindrome[start][end] = true;
                    minCut = (start == 0) ? 0 : Math.min(minCut, dp[start - 1] + 1);
                }
            }
            dp[end] = minCut;
        }
        return dp[n - 1];
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n^2)$，其中 $n$ 是字符串的长度，因为我们需要遍历每一对 $(i, j)$。
空间复杂度为 $O(n^2)$，我们使用了一个二维数组来记录回文状态。
