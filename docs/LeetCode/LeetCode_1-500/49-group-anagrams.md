---
sidebar_position: 49
tags:
  - array
  - hash-table
  - string
  - Medium
---

# 49.分组字母异位词

标签: `array`, `hash-table`, `string`

难度: Medium

通过率: 69.9%

原题链接: https://leetcode.com/problems/group-anagrams/description/

## 题目描述
给定一个字符串数组 strs，将字母异位词组合在一起。可以按任意顺序返回答案。

## 解题思路
字母异位词是由相同字符组成的单词，只是字符的位置不同。解决这个问题的关键是找到一种方法来识别哪些单词是字母异位词。以下是可以使用的思路：

对于每个单词，首先将它的字符排序，排序后的结果会是字母异位词的唯一标识。

然后我们可以利用一个字典（或哈希表）将这些标识作为键来存储每个字母异位词组。键对应的值为具有相同排序字符的原始字符串组成的列表。

最后，我们返回字典中所有值的集合即可，因为每个值即为一个字母异位词组。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def groupAnagrams(strs):
    # 创建一个字典用于存储排序后的字符串为键值，字母异位词组为值
    anagrams = {}
    for s in strs:
        # 对字符串进行排序，并将排序结果作为键
        sorted_s = ''.join(sorted(s))
        if sorted_s not in anagrams:
            anagrams[sorted_s] = [s]
        else:
            anagrams[sorted_s].append(s)
    # 返回字典中的所有字母异位词组
    return list(anagrams.values())
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
vector<string> groupAnagrams(vector<string>& strs) {
    // 创建一个map来存储排序后的字符串为键值，字母异位词组为值
    unordered_map<string, vector<string>> anagrams;
    for (string s : strs) {
        // 对字符串进行排序，并将排序后的结果作为键
        string sorted_s = s;
        sort(sorted_s.begin(), sorted_s.end());
        anagrams[sorted_s].push_back(s);
    }
    // 创建一个vector用来存储结果
    vector<vector<string>> result;
    for (auto it = anagrams.begin(); it != anagrams.end(); ++it) {
        result.push_back(it->second);
    }
    return result;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function groupAnagrams(strs) {
    // 创建一个map来存储排序后的字符串为键值，字母异位词组为值
    const anagrams = new Map();
    strs.forEach(s => {
        // 对字符串进行排序，并将排序后的结果作为键
        const sorted_s = s.split('').sort().join('');
        if (!anagrams.has(sorted_s)) {
            anagrams.set(sorted_s, [s]);
        } else {
            anagrams.get(sorted_s).push(s);
        }
    });
    // 使用Array.from将字母异位词组返回
    return Array.from(anagrams.values());
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

public class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        // 创建一个map来存储排序后的字符串为键值，字母异位词组为值
        Map<String, List<String>> anagrams = new HashMap<>();
        for (String s : strs) {
            // 对字符串进行排序，并将排序后的结果作为键
            char[] charArray = s.toCharArray();
            Arrays.sort(charArray);
            String sorted_s = new String(charArray);
            if (!anagrams.containsKey(sorted_s)) {
                anagrams.put(sorted_s, new ArrayList<>());
            }
            anagrams.get(sorted_s).add(s);
        }
        // 将字母异位词组返回
        return new ArrayList<>(anagrams.values());
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度: $O(NK \log K)$，其中 $N$ 是字符串的数量，$K$ 是字符串的最大长度。对于每个字符串，我们都要排序它。`\log K` 是字符串排序的复杂度。空间复杂度: $O(NK)$，因为需要存储所有的字符串。
