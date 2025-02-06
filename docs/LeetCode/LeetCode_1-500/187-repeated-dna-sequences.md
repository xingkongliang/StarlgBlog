---
sidebar_position: 187
tags:
  - hash-table
  - string
  - bit-manipulation
  - Medium
---

# 187.重复的DNA序列

标签: `hash-table`, `string`, `bit-manipulation`

难度: Medium

通过率: 50.22%

原题链接: https://leetcode.com/problems/repeated-dna-sequences/description/

## 题目描述
DNA序列由以 'A'、'C'、'G' 和 'T' 表示的核苷酸组成。对于一个给定的字符串 $s$，表示DNA序列，请输出在DNA分子中出现超过一次的所有长度为10的序列（子字符串）。可以以任意顺序返回答案。

## 解题思路
要解决这个问题，我们可以使用滑动窗口的技术来遍历字符串，同时利用哈希表来记录出现过的序列，寻找重复的序列。具体步骤如下：

1. 使用哈希集合 `seen` 来记录我们已经遇到的序列。
2. 使用另一个哈希集合 `repeated` 来记录出现过多次的序列。
3. 遍历字符串 `s`，从开头到倒数第10个字符，取出每个长度为10的子字符串。
4. 对于每个子字符串：
   * 如果子字符串已经在 `seen` 中出现过，且不在 `repeated` 中，将其加入 `repeated`，表示重复出现。
   * 否则，将其加入 `seen`。
5. 最终返回 `repeated` 中的所有序列作为结果。

这种方法的优点在于，我们不需要对10个字符的子串进行大量比较（直接比较字符串即可），利用哈希集合有效地记录和查找出现的序列。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def findRepeatedDnaSequences(s: str) -> list:
    # 定义两个集合来保存过程中的数据
    seen = set()
    repeated = set()
    
    # 遍历字符串，取出每一个连续的10个字符的子字符串
    for i in range(len(s) - 9):
        current_substr = s[i:i+10]
        # 检查当前子串是否已经出现过
        if current_substr in seen:
            repeated.add(current_substr)
        else:
            seen.add(current_substr)
    
    # 返回所有重复的DNA序列
    return list(repeated)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<string> findRepeatedDnaSequences(string s) {
        unordered_set<string> seen, repeated;
        // 移动窗口，提取10字符的子串
        for (int i = 0; i <= s.length() - 10; ++i) {
            string cur = s.substr(i, 10);
            // 检查是否已经遇见
            if (seen.count(cur)) {
                repeated.insert(cur);
            } else {
                seen.insert(cur);
            }
        }
        return vector<string>(repeated.begin(), repeated.end());
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function findRepeatedDnaSequences(s) {
    const seen = new Set();
    const repeated = new Set();
    
    // 遍历字符串以找到长度为10的所有子串
    for (let i = 0; i <= s.length - 10; i++) {
        const substring = s.substring(i, i + 10);
        if (seen.has(substring)) {
            repeated.add(substring);
        } else {
            seen.add(substring);
        }
    }
    
    // 返回所有重复的DNA子序列
    return Array.from(repeated);
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

class Solution {
    public List<String> findRepeatedDnaSequences(String s) {
        Set<String> seen = new HashSet<>();
        Set<String> repeated = new HashSet<>();
        
        // 遍历字符串，执行滑动窗口算法
        for (int i = 0; i <= s.length() - 10; i++) {
            String substr = s.substring(i, i + 10);
            if (seen.contains(substr)) {
                repeated.add(substr);
            } else {
                seen.add(substr);
            }
        }
        return new ArrayList<>(repeated);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：由于我们需要遍历字符串，每次检查长度为10的子串，所以时间复杂度为 $O(n)$，其中 $n$ 是字符串的长度。  
  
空间复杂度：使用了两个集合来记录至少出现两次的子串和所有出现过的子串，因此空间复杂度为 $O(n)$。
