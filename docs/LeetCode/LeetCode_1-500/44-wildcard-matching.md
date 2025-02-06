---
sidebar_position: 44
tags:
  - dynamic-programming
  - string
  - Hard
---

# 44.通配符匹配

标签: `dynamic-programming`, `string`

难度: Hard

通过率: 29.01%

原题链接: https://leetcode.com/problems/wildcard-matching/description/

## 题目描述
给定一个输入字符串（s）和一个模式（p），实现支持通配符的模式匹配，其中通配符支持：

- '?' 匹配任何单个字符。
- '*' 匹配任何字符序列（包括空序列）。

匹配应覆盖输入字符串的整个部分（不是部分匹配）。

## 解题思路
我们可以通过动态规划（Dynamic Programming）来解决这个问题。定义一个二维布尔数组 `dp`，其中 `dp[i][j]` 表示字符串 `s` 的前 `i` 个字符与模式 `p` 的前 `j` 个字符是否匹配。

### 动态规划方程：
1. `dp[0][0] = true`：空字符串和空模式是匹配的。
2. 如果 `j > 0` 且 `p[j-1] == '*'`，`dp[0][j] = dp[0][j-1]`：因为 `*` 可以匹配空字符串。
3. 对于其他情况：
   - 当 `p[j-1] == '*'` 时，`dp[i][j] = dp[i-1][j] 或 dp[i][j-1]`：前者表示 `*` 匹配一个字符，后者表示 `*` 匹配空字符串。
   - 当 `p[j-1] == '?'` 或 `s[i-1] == p[j-1]` 时，`dp[i][j] = dp[i-1][j-1]`：这表示如果匹配那么移除这两个字符后的结果应当是匹配的。

### 初始化：
- `dp[0][0] = true` 表示两个空字符串是匹配的。
- 对于 `p` 中以 `*` 开头的部分，初始化 `dp[0][j]` 为前一列的值，因为 `*` 可以匹配空字符串。

### 最终解：
- `dp[s.length][p.length]` 表示字符串 `s` 和模式 `p` 是否整体匹配。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def isMatch(s: str, p: str) -> bool:
    # 获取字符串和模式的长度
    m, n = len(s), len(p)
    # 初始化动态规划表，dp[i][j] 表示 s 的前 i 个字符和 p 的前 j 个字符是否匹配
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    # 空字符串和空模式匹配
    dp[0][0] = True
    
    # 处理 p 开头的 * 的情况
    for j in range(1, n + 1):
        if p[j - 1] == '*':
            dp[0][j] = dp[0][j - 1]

    # 通过动态规划填充表格
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j - 1] == '*':
                # * 可以匹配空序列或者一个字符
                dp[i][j] = dp[i][j - 1] or dp[i - 1][j]
            elif p[j - 1] == '?' or s[i - 1] == p[j - 1]:
                # ? 可以匹配任意单个字符
                dp[i][j] = dp[i - 1][j - 1]
    
    return dp[m][n]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
bool isMatch(string s, string p) {
    int m = s.length(), n = p.length();
    vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
    dp[0][0] = true; // 空字符串匹配

    for (int j = 1; j <= n; ++j) {
        if (p[j - 1] == '*') {
            dp[0][j] = dp[0][j - 1];
        }
    }

    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (p[j - 1] == '*') {
                dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
            } else if (p[j - 1] == '?' || s[i - 1] == p[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
        }
    }

    return dp[m][n];
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function isMatch(s, p) {
    const m = s.length, n = p.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(false));
    dp[0][0] = true;

    for (let j = 1; j <= n; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 1];
        }
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (p[j - 1] === '*') {
                dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
            } else if (p[j - 1] === '?' || s[i - 1] === p[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            }
        }
    }

    return dp[m][n];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public boolean isMatch(String s, String p) {
    int m = s.length(), n = p.length();
    boolean[][] dp = new boolean[m + 1][n + 1];
    dp[0][0] = true;

    for (int j = 1; j <= n; j++) {
        if (p.charAt(j - 1) == '*') {
            dp[0][j] = dp[0][j - 1];
        }
    }

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (p.charAt(j - 1) == '*') {
                dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
            } else if (p.charAt(j - 1) == '?' || s.charAt(i - 1) == p.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1];
            }
        }
    }
    
    return dp[m][n];
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度: $O(m \times n)$，其中 $m$ 是字符串 $s$ 的长度，$n$ 是模式 $p$ 的长度，因为我们需要填充大小为 $(m+1) \times (n+1)$ 的动态规划表。
- 空间复杂度: $O(m \times n)$，用于存储动态规划表。
