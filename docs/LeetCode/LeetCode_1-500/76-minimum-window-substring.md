---
sidebar_position: 76
tags:
  - two-pointers
  - hash-table
  - string
  - queue
  - Hard
---

# 76.最小覆盖子串

标签: `two-pointers`, `hash-table`, `string`, `queue`

难度: Hard

通过率: 44.21%

原题链接: https://leetcode.com/problems/minimum-window-substring/description/

## 题目描述
给定两个字符串 `s` 和 `t`，分别长度为 `m` 和 `n`，返回 `s` 的最小子串，使得 `t` 中的每个字符（包括重复字符）都包含在内。如果没有这样的子串，返回空字符串 ""。测试用例保证答案是唯一的。

## 解题思路
这个问题可以通过滑动窗口算法来解决：

1. **初始化与计数**：使用两个哈希表，一个用来统计 `t` 中字符的频次（target_map），另一个是当前窗口中字符的频次（window_map）。同时，`have` 变量用于记录窗口中满足条件的字符个数，`need` 是 `t` 中不同字符的数量。

2. **滑动窗口**：使用双指针技巧维护滑动窗口，左指针 `l` 和右指针 `r`。初始时两个指针都指向起始位置。右指针 `r` 向右扩展窗口，`l` 为窗口的左边界。

3. **扩展和收缩窗口**：
   - 移动右指针，包含当前字符到 `window_map` 中。
   - 如果 `window_map` 中某个字符的数量与 `target_map` 中该字符的数量相同，增加 `have`。
   - 当 `have` 等于 `need`，说明当前窗口已经包含了 `t` 中所有的字符。
   - 在此情况下，尝试收缩窗口。同时，在合适的情况下记录最小窗口。
   - 否则，继续扩展窗口。

4. **更新最小窗口**：每次窗口满足条件时，记录窗口大小，并更新最小窗口起始和结束位置。

5. **返回结果**：最后利用记录的最小起始和结束索引返回结果子串。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
from collections import Counter, defaultdict

def minWindow(s: str, t: str) -> str:
    if not s or not t:
        return ""

    # Counter for characters in t
    target_map = Counter(t)
    # Map for the sliding window
    window_map = defaultdict(int)

    # Two pointers, starting from both ends
    l, r = 0, 0
    have, need = 0, len(target_map)
    res, res_len = [-1, -1], float('inf')

    # Expand the right pointer
    while r < len(s):
        # Add character from right to window map
        char = s[r]
        window_map[char] += 1

        # If the frequency of current character in window equals frequency in target, update 'have'
        if char in target_map and window_map[char] == target_map[char]:
            have += 1

        # When the current window satisfies the condition
        while have == need:
            # Update the result if current window is smaller
            if (r - l + 1) < res_len:
                res = [l, r]
                res_len = r - l + 1

            # Pop from left of the window
            pop_char = s[l]
            window_map[pop_char] -= 1
            if pop_char in target_map and window_map[pop_char] < target_map[pop_char]:
                have -= 1
            l += 1

        # Move right pointer
        r += 1

    l, r = res
    return s[l:r+1] if res_len != float('inf') else ""
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
cpp
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function minWindow(s: string, t: string): string {
    if (s.length === 0 || t.length === 0) {
        return "";
    }

    const targetMap: Record<string, number> = {};
    for (let char of t) {
        targetMap[char] = (targetMap[char] || 0) + 1;
    }

    const windowMap: Record<string, number> = {};
    let have = 0, need = Object.keys(targetMap).length;
    let l = 0, r = 0;
    let res = [-1, -1];
    let minLength = Infinity;

    while (r < s.length) {
        let char = s[r];
        windowMap[char] = (windowMap[char] || 0) + 1;

        if (char in targetMap && windowMap[char] === targetMap[char]) {
            have++;
        }

        while (have === need) {
            if ((r - l + 1) < minLength) {
                res = [l, r];
                minLength = r - l + 1;
            }

            let popChar = s[l];
            windowMap[popChar] -= 1;
            if (popChar in targetMap && windowMap[popChar] < targetMap[popChar]) {
                have--;
            }
            l++;
        }

        r++;
    }

    const [start, end] = res;
    return minLength !== Infinity ? s.substring(start, end + 1) : "";
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public String minWindow(String s, String t) {
        if (s.length() == 0 || t.length() == 0) {
            return "";
        }

        HashMap<Character, Integer> targetMap = new HashMap<>();
        for (char c : t.toCharArray()) {
            targetMap.put(c, targetMap.getOrDefault(c, 0) + 1);
        }

        HashMap<Character, Integer> windowMap = new HashMap<>();
        int have = 0, need = targetMap.size();
        int l = 0, r = 0;
        int[] res = {-1, -1};
        int minLength = Integer.MAX_VALUE;

        while (r < s.length()) {
            char charRight = s.charAt(r);
            windowMap.put(charRight, windowMap.getOrDefault(charRight, 0) + 1);

            if (targetMap.containsKey(charRight) && windowMap.get(charRight).intValue() == targetMap.get(charRight).intValue()) {
                have++;
            }

            while (have == need) {
                if ((r - l + 1) < minLength) {
                    res[0] = l;
                    res[1] = r;
                    minLength = r - l + 1;
                }

                char charLeft = s.charAt(l);
                windowMap.put(charLeft, windowMap.get(charLeft) - 1);
                if (targetMap.containsKey(charLeft) && windowMap.get(charLeft).intValue() <
                    targetMap.get(charLeft).intValue()) {
                    have--;
                }
                l++;
            }
            r++;
        }

        return minLength != Integer.MAX_VALUE ? s.substring(res[0], res[1] + 1) : "";
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- **时间复杂度**: $O(m + n)$，因为每个字符在最坏情况下只会被处理两次（一次被添加到窗口中，一次被移出窗口）。
- **空间复杂度**: $O(n + |\Sigma|)$，其中 $|\Sigma|$ 是字符集的大小，为频次表的大小。
