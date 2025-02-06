---
sidebar_position: 423
tags:
  - hash-table
  - string
  - Medium
---

# 423.重建英文表示的原始数字

标签: `hash-table`, `string`

难度: Medium

通过率: 51.33%

原题链接: https://leetcode.com/problems/reconstruct-original-digits-from-english/description/

## 题目描述
给定一个字符串 $s$，其中包含英文表示的无序数字0-9，返回按升序排列的数字。

## 解题思路
为了求解这个问题，可以利用每个英文数字的某些独特字母来识别数字。例如：
- 字母 'z' 只出现在 "zero" 中。
- 字母 'w' 只出现在 "two" 中。
- 字母 'u' 只出现在 "four" 中。
- 字母 'x' 只出现在 "six" 中。
- 字母 'g' 只出现在 "eight" 中。

通过确定这些独特的数字，我们可以逐步从字符串中减去对应的字符并记录这些数字的出现次数。然后我们处理剩余的数字：
- 字母 'o' 用于 "one", "zero", "two", "four" 后，可以识别 "one"。
- 字母 'h' 用于 "three", "eight", 可以识别 "three"。
- 字母 'f' 用于 "five", "four", 可以识别 "five"。
- 字母 's' 用于 "seven", "six", 可以识别 "seven"。
- 字母 'i' 用于 "nine", "five", "six", "eight", 可以识别 "nine"。

最后，根据已经识别数字的出现次数，按照升序汇编成最终的答案。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def originalDigits(s):
    from collections import Counter

    # Create a counter for all letters in the input string
    count = Counter(s)

    # Initialize a list to count each digit from 0 to 9
    out = [0] * 10

    # Identify numbers with unique letters
    out[0] = count['z']  # 'z' is unique to "zero"
    out[2] = count['w']  # 'w' is unique to "two"
    out[4] = count['u']  # 'u' is unique to "four"
    out[6] = count['x']  # 'x' is unique to "six"
    out[8] = count['g']  # 'g' is unique to "eight"

    # Deduce remaining numbers
    out[1] = count['o'] - out[0] - out[2] - out[4]  # 'o' in "one"
    out[3] = count['h'] - out[8]  # 'h' in "three"
    out[5] = count['f'] - out[4]  # 'f' in "five"
    out[7] = count['s'] - out[6]  # 's' in "seven"
    out[9] = count['i'] - out[5] - out[6] - out[8]  # 'i' in "nine"

    # Construct the output string based on the digit counts
    result = []
    for i in range(10):
        result.append(str(i) * out[i])

    return ''.join(result)

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    string originalDigits(string s) {
        vector<int> count(26, 0);
        for (char c : s) {
            count[c - 'a']++;
        }

        vector<int> out(10, 0);
        out[0] = count['z' - 'a']; // zero
        out[2] = count['w' - 'a']; // two
        out[4] = count['u' - 'a']; // four
        out[6] = count['x' - 'a']; // six
        out[8] = count['g' - 'a']; // eight

        // Deduce other numbers
        out[1] = count['o' - 'a'] - out[0] - out[2] - out[4];
        out[3] = count['h' - 'a'] - out[8];
        out[5] = count['f' - 'a'] - out[4];
        out[7] = count['s' - 'a'] - out[6];
        out[9] = count['i' - 'a'] - out[5] - out[6] - out[8];

        string result;
        for (int i = 0; i < 10; i++) {
            result += string(out[i], '0' + i);
        }
        return result;
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function originalDigits(s) {
    const count = {};
    for (let c of s) {
        count[c] = (count[c] || 0) + 1;
    }

    const out = new Array(10).fill(0);
    out[0] = count['z'] || 0;
    out[2] = count['w'] || 0;
    out[4] = count['u'] || 0;
    out[6] = count['x'] || 0;
    out[8] = count['g'] || 0;

    out[1] = (count['o'] || 0) - out[0] - out[2] - out[4];
    out[3] = (count['h'] || 0) - out[8];
    out[5] = (count['f'] || 0) - out[4];
    out[7] = (count['s'] || 0) - out[6];
    out[9] = (count['i'] || 0) - out[5] - out[6] - out[8];

    let result = '';
    for (let i = 0; i < 10; i++) {
        result += ('' + i).repeat(out[i]);
    }
    return result;
}

```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.HashMap;
import java.util.Map;

class Solution {
    public String originalDigits(String s) {
        Map<Character, Integer> count = new HashMap<>();
        for (char c : s.toCharArray()) {
            count.put(c, count.getOrDefault(c, 0) + 1);
        }

        int[] out = new int[10];
        out[0] = count.getOrDefault('z', 0); // zero
        out[2] = count.getOrDefault('w', 0); // two
        out[4] = count.getOrDefault('u', 0); // four
        out[6] = count.getOrDefault('x', 0); // six
        out[8] = count.getOrDefault('g', 0); // eight

        out[1] = count.getOrDefault('o', 0) - out[0] - out[2] - out[4];
        out[3] = count.getOrDefault('h', 0) - out[8];
        out[5] = count.getOrDefault('f', 0) - out[4];
        out[7] = count.getOrDefault('s', 0) - out[6];
        out[9] = count.getOrDefault('i', 0) - out[5] - out[6] - out[8];

        StringBuilder result = new StringBuilder();
        for (int i = 0; i < 10; i++) {
            result.append(String.valueOf(i).repeat(out[i]));
        }
        return result.toString();
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(N)$，其中 $N$ 是字符串 $s$ 的长度，因为我们对字符串进行了一次扫描来进行计数。
