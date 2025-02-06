---
sidebar_position: 91
tags:
  - dynamic-programming
  - string
  - Medium
---

# 91.解码方法

标签: `dynamic-programming`, `string`

难度: Medium

通过率: 35.81%

原题链接: https://leetcode.com/problems/decode-ways/description/

## 题目描述
你拦截了一条被编码为数字字符串的秘密消息。消息通过以下映射进行解码：

"1" -> 'A'
"2" -> 'B'
...
"25" -> 'Y'
"26" -> 'Z'

然而，在解码消息时，你意识到有很多不同的方法可以解码消息，因为某些代码包含在其他代码中（"2" 和 "5" 与 "25"）。

例如，“11106”可以解码为：

- "AAJF"（1，1，10，6）
- "KJF"（11，10，6）
- 组合（1，11，06）无效，因为 “06”不是有效代码（只有“6”是有效的）。

注意：可能存在无法解码的字符串。

给定一个仅包含数字的字符串 s，返回解码它的方式总数。如果无法以任何有效方式解码整个字符串，则返回 0。

## 解题思路
这个问题可以采用动态规划的方法来解决。定义一个数组 $dp$ ，其中 $dp[i]$ 表示字符串 $s$ 的前 $i$ 个字符可以解码的方法数。

初始化 $dp[0] = 1$ 因为空字符串有一种“解码方式”。对每个字符 $s[i]$（$i \geq 1$），我们考虑以下情况：

- 如果单个字符 $s[i-1]$ （即一个有效的 1 位数字）是从 '1' 到 '9' 之间的数字，则它本身可以被解码为相应的字母，所以 $dp[i] += dp[i-1]$。

- 如果两个字符 $s[i-2]s[i-1]$ 表示的数字是从 '10' 到 '26' 之间的数字，则它可以被解码为相应的字母，所以 $dp[i] += dp[i-2]$。

这是因为，如果最后一个数字独立解码，前面的数字的解码方法数量不变，而如果最后两个数字可以共同解码，则前面减去这两个数字后的字符串的解码方法数需要加到当前方案数中。

最后，$dp[n]$ 将是我们的答案，其中 $n$ 是字符串 $s$ 的长度。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def numDecodings(s):
    # 如果字符串以'0'开头，无法解码
    if not s or s[0] == '0':
        return 0

    n = len(s)
    # dp数组初始化，长度为n+1，初始值为0
    dp = [0] * (n + 1)
    # 空字符串有一种解码方法
    dp[0] = 1
    # 初始化第一个字符的解码方法
    dp[1] = 1 if s[0] != '0' else 0

    # 遍历字符串，从第二个字符开始
    for i in range(2, n+1):
        # 单个字符解码，如果不是‘0’，增加dp[i]
        if 1 <= int(s[i-1:i]) <= 9:
            dp[i] += dp[i-1]
        # 两个字符解码，如果在范围内，增加dp[i]
        if 10 <= int(s[i-2:i]) <= 26:
            dp[i] += dp[i-2]

    # 最后的dp[n]是解码方法总数
    return dp[n]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int numDecodings(string s) {
        if (s.empty() || s[0] == '0') return 0;

        int n = s.size();
        vector<int> dp(n + 1, 0);
        dp[0] = 1;
        dp[1] = s[0] != '0' ? 1 : 0;

        for (int i = 2; i <= n; ++i) {
            if (s[i-1] >= '1' && s[i-1] <= '9') {
                dp[i] += dp[i-1];
            }
            if (s[i-2] == '1' || (s[i-2] == '2' && s[i-1] <= '6')) {
                dp[i] += dp[i-2];
            }
        }

        return dp[n];
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
var numDecodings = function(s) {
    if (s[0] === '0') return 0;
    const n = s.length;
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;
    dp[1] = s[0] !== '0' ? 1 : 0;

    for (let i = 2; i <= n; i++) {
        if (s[i - 1] !== '0') {
            dp[i] += dp[i - 1];
        }
        if (s[i - 2] === '1' || (s[i - 2] === '2' && s[i - 1] <= '6')) {
            dp[i] += dp[i - 2];
        }
    }

    return dp[n];
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int numDecodings(String s) {
        if (s == null || s.length() == 0 || s.charAt(0) == '0') {
            return 0;
        }
        int n = s.length();
        int[] dp = new int[n + 1];
        dp[0] = 1;
        dp[1] = s.charAt(0) != '0' ? 1 : 0;

        for (int i = 2; i <= n; i++) {
            int oneDigit = Integer.parseInt(s.substring(i - 1, i));
            int twoDigits = Integer.parseInt(s.substring(i - 2, i));

            if (oneDigit >= 1 && oneDigit <= 9) {
                dp[i] += dp[i - 1];
            }

            if (twoDigits >= 10 && twoDigits <= 26) {
                dp[i] += dp[i - 2];
            }
        }

        return dp[n];
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是字符串 $s$ 的长度，因为我们只需要遍历一次字符串。
空间复杂度：$O(n)$，用于存储解码方式数量的动态规划数组 $dp$。
