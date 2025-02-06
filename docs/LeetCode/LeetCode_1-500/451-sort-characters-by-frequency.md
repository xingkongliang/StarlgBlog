---
sidebar_position: 451
tags:
  - hash-table
  - sort
  - string
  - Medium
---

# 451.按频率排序字符

标签: `hash-table`, `sort`, `string`

难度: Medium

通过率: 73.35%

原题链接: https://leetcode.com/problems/sort-characters-by-frequency/description/

## 题目描述
给定一个字符串 $s$，按字符出现的频率降序排列。字符的频率是它在字符串中出现的次数。返回排序后的字符串。如果有多种排序结果，返回其中任意一个。

## 解题思路
首先，我们需要计算每个字符在字符串中出现的次数。然后可以将字符按照出现的频率进行排序。要实现这一点，我们可以采取以下步骤：

1. 使用哈希表来统计每个字符出现的频率。
2. 将字符和它们的频率存储到一个列表中。
3. 对列表按照频率进行降序排序。
4. 根据排序后的结果构建新字符串。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
from collections import Counter

# 定义函数，接受字符串s作为参数
def frequencySort(s: str) -> str:
    # 使用Counter统计每个字符的频率
    freq = Counter(s)
    
    # 根据频率对字符进行排序，然后用join函数合并字符
    # key=lambda x: (-x[1], x[0])表示按频率降序排序
    return ''.join([char * times for char, times in freq.most_common()])

# 示例用法
s = "tree"
print(frequencySort(s))  # 输出："eert"
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// 定义函数，接受字符串s作为参数
#include <string>
#include <unordered_map>
#include <vector>
#include <algorithm>
using namespace std;

string frequencySort(string s) {
    // 使用unordered_map统计每个字符的频率
    unordered_map<char, int> freq;
    for (char c : s) {
        freq[c]++;
    }
    
    // 使用vector存储字符和它们的频率
    vector<pair<char, int>> chars(freq.begin(), freq.end());
    
    // 根据频率降序排列
    sort(chars.begin(), chars.end(), [](const pair<char, int>& a, const pair<char, int>& b) {
        return a.second > b.second;
    });
    
    // 构建最终字符串
    string result;
    for (auto& pair : chars) {
        result += string(pair.second, pair.first);
    }
    return result;
}

// 示例用法
// int main() {
//     string s = "tree";
//     cout << frequencySort(s) << endl;  // 输出："eert"
// }
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// 定义函数，接受字符串s作为参数
function frequencySort(s) {
    // 使用Map统计每个字符的频率
    const freq = new Map();
    for (const char of s) {
        freq.set(char, (freq.get(char) || 0) + 1);
    }
    // 将字符按照频率排序然后构建结果字符串
    return [...freq.entries()]
        .sort((a, b) => b[1] - a[1]) // 按频率降序排序
        .map(([char, freq]) => char.repeat(freq))
        .join('');
}

// 示例用法
const s = "tree";
console.log(frequencySort(s));  // 输出："eert"
```

</TabItem>
<TabItem value="java" label="Java">

```java
// 定义函数，接受字符串s作为参数
import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

public class Solution {
    public String frequencySort(String s) {
        // 使用HashMap统计每个字符的频率
        Map<Character, Integer> freq = new HashMap<>();
        for (char c : s.toCharArray()) {
            freq.put(c, freq.getOrDefault(c, 0) + 1);
        }
        // 使用优先队列按频率排序字符
        PriorityQueue<Map.Entry<Character, Integer>> maxHeap =
            new PriorityQueue<>((a, b) -> b.getValue() - a.getValue());
        maxHeap.addAll(freq.entrySet());
        // 构建结果字符串
        StringBuilder result = new StringBuilder();
        while (!maxHeap.isEmpty()) {
            Map.Entry<Character, Integer> entry = maxHeap.poll();
            for (int i = 0; i < entry.getValue(); i++) {
                result.append(entry.getKey());
            }
        }
        return result.toString();
    }

    // 示例用法
    // public static void main(String[] args) {
    //     Solution sol = new Solution();
    //     System.out.println(sol.frequencySort("tree"));  // 输出："eert"
    // }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度是 $O(n \log n)$，其中 $n$ 是字符串的长度。在最坏情况下，我们需要对所有字符进行统计和排序。排序步骤是时间复杂度的主要贡献者。  
  
空间复杂度是 $O(n)$，用于存储字符的频率以及排序后的字符。
