---
sidebar_position: 87
tags:
  - dynamic-programming
  - string
  - Hard
---

# 87.扰乱字符串

标签: `dynamic-programming`, `string`

难度: Hard

通过率: 41.24%

原题链接: https://leetcode.com/problems/scramble-string/description/

## 题目描述
给定两个长度相同的字符串 $s_1$ 和 $s_2$，判断 $s_2$ 是否是 $s_1$ 的扰乱字符串。

我们可以通过以下算法将字符串 $s$ 扰乱成字符串 $t$：

1. 如果字符串的长度为 1，则停止。
2. 如果字符串的长度大于 1，执行以下步骤：
   - 将字符串分割成两个非空的子字符串，分割的位置是随机的，即如果字符串是 $s$，将其分割成 $x$ 和 $y$，其中 $s = x + y$。
   - 随机决定是交换两个子串还是保持它们的顺序，即在这一步之后，$s$ 可以变成 $s = x + y$ 或 $s = y + x$。
   - 对两个子字符串 $x$ 和 $y$ 递归地应用步骤 1。

返回 $s_2$ 是否是 $s_1$ 的扰乱字符串。

## 解题思路
要确定字符串 $s_2$ 是否可由 $s_1$ 扰乱而成，我们可以使用递归加动态规划来解决问题。由于我们尝试的扰乱操作是随机的，并且涉及递归地分割字符串，因此简单的模拟可能导致指数级复杂度。为了高效检查，我们考虑递归地验证。

1. **递归定义**：
   - 定义一个递归函数 `is_scramble(s1, s2)`，这个函数返回 $s_2[0..n-1]$ 是否为 $s_1[0..n-1]$ 的扰乱字符串。

2. **转移方程**：
   - 将字符串分为两部分，如果 $s_1 = x + y$ 和 $s_2 = u + v$，则 $s_2$ 是 $s_1$ 的扰乱字符串有两种可能情况：
     1. $x$ 是 $u$ 的扰乱字符串，且 $y$ 是 $v$ 的扰乱字符串。
     2. $x$ 是 $v$ 的扰乱字符串，且 $y$ 是 $u$ 的扰乱字符串。
   - 检查这两种情况，如果其中任意一种成立，则说明 $s_2$ 是 $s_1$ 的扰乱字符串。

3. **边界条件**：
   - 如果 $s_1$ 和 $s_2$ 长度不同，直接返回 false。
   - 如果 $s_1$ 和 $s_2$ 相等，直接返回 true。
   - 如果 $s_1$ 和 $s_2$ 中有不同的字符（可以通过比较字符计数），直接返回 false。

4. **记忆化搜索**：
   - 在递归中使用缓存（记忆化表）来存储已经计算过的结果，避免重复计算。

这样，通过动态规划可以在合理的时间内解决问题。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def isScramble(s1, s2):
    # 记忆化缓存
    cache = {}

    def dfs(s1, s2):
        # 如果两字符串长度不同，直接返回False
        if len(s1) != len(s2):
            return False
        # 如果两字符串一致，直接返回True
        if s1 == s2:
            return True
        # 如果字符元素和不一致，直接返回False
        if sorted(s1) != sorted(s2):
            return False

        # 使用缓存来减少重复计算
        if (s1, s2) in cache:
            return cache[(s1, s2)]

        n = len(s1)
        for i in range(1, n):
            # 不交换的情况
            if dfs(s1[:i], s2[:i]) and dfs(s1[i:], s2[i:]):
                cache[(s1, s2)] = True
                return True
            # 交换的情况
            if dfs(s1[:i], s2[-i:]) and dfs(s1[i:], s2[:-i]):
                cache[(s1, s2)] = True
                return True

        cache[(s1, s2)] = False
        return False

    return dfs(s1, s2)

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
bool isScramble(string s1, string s2) {
    // 用于缓存中间结果
    unordered_map<string, bool> cache;

    function<bool(string, string)> dfs = [&](string s1, string s2) -> bool {
        // 长度不同直接返回false
        if (s1.length() != s2.length())
            return false;
        // 字符串相同直接返回true
        if (s1 == s2)
            return true;
        // 如果排序后不同，直接返回false
        string sorted_s1 = s1, sorted_s2 = s2;
        sort(sorted_s1.begin(), sorted_s1.end());
        sort(sorted_s2.begin(), sorted_s2.end());
        if (sorted_s1 != sorted_s2)
            return false;
        
        string key = s1 + "," + s2;
        if (cache.find(key) != cache.end())
            return cache[key];

        int n = s1.length();
        for (int i = 1; i < n; i++) {
            if (dfs(s1.substr(0, i), s2.substr(0, i)) && dfs(s1.substr(i), s2.substr(i))) {
                cache[key] = true;
                return true;
            }
            if (dfs(s1.substr(0, i), s2.substr(n-i)) && dfs(s1.substr(i), s2.substr(0, n-i))) {
                cache[key] = true;
                return true;
            }
        }
        cache[key] = false;
        return false;
    };

    return dfs(s1, s2);
}

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function isScramble(s1, s2) {
    const cache = new Map(); // 缓存

    const dfs = (s1, s2) => {
        if (s1.length !== s2.length) return false;
        if (s1 === s2) return true;
        if ([...s1].sort().join('') !== [...s2].sort().join('')) return false;
        const key = `${s1},${s2}`;
        if (cache.has(key)) return cache.get(key);

        const n = s1.length;
        for (let i = 1; i < n; i++) {
            if (dfs(s1.substring(0, i), s2.substring(0, i)) &&
                dfs(s1.substring(i), s2.substring(i))) {
                cache.set(key, true);
                return true;
            }
            if (dfs(s1.substring(0, i), s2.substring(n - i)) &&
                dfs(s1.substring(i), s2.substring(0, n - i))) {
                cache.set(key, true);
                return true;
            }
        }
        cache.set(key, false);
        return false;
    };

    return dfs(s1, s2);
}

```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public boolean isScramble(String s1, String s2) {
        Map<String, Boolean> cache = new HashMap<>(); // 缓存

        return isScrambleUtil(s1, s2, cache);
    }

    private boolean isScrambleUtil(String s1, String s2, Map<String, Boolean> cache) {
        if (s1.equals(s2)) {
            return true;
        }
        if (s1.length() != s2.length()) {
            return false;
        }
        String sorted_s1 = sortString(s1);
        String sorted_s2 = sortString(s2);
        if (!sorted_s1.equals(sorted_s2)) {
            return false;
        }
        String key = s1 + "," + s2;
        if (cache.containsKey(key)) {
            return cache.get(key);
        }

        int n = s1.length();
        for (int i = 1; i < n; i++) {
            if ((isScrambleUtil(s1.substring(0, i), s2.substring(0, i), cache) &&
                 isScrambleUtil(s1.substring(i), s2.substring(i), cache)) ||
                (isScrambleUtil(s1.substring(0, i), s2.substring(n-i), cache) &&
                 isScrambleUtil(s1.substring(i), s2.substring(0, n-i), cache))) {
                cache.put(key, true);
                return true;
            }
        }
        cache.put(key, false);
        return false;
    }

    private String sortString(String s) {
        char[] arr = s.toCharArray();
        Arrays.sort(arr);
        return new String(arr);
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度: $O(n^4)$, 其中 $n$ 是字符串的长度。对于每对字符串，有 $n$ 种分割点，每个分割点导致 $O(n)$ 时间的字符串比较。
- 空间复杂度: $O(n^3)$, 由于记忆化搜索使用的哈希表，可以存储 $O(n^3)$ 个状态。
