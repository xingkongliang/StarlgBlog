---
sidebar_position: 383
tags:
  - hash-table
  - string
  - Easy
---

# 383.赎金信

标签: `hash-table`, `string`

难度: Easy

通过率: 63.32%

原题链接: https://leetcode.com/problems/ransom-note/description/

## 题目描述
给定两个字符串 `ransomNote` 和 `magazine`，如果 `ransomNote` 能够由 `magazine` 中的字母构成，返回 `true`，否则返回 `false`。`magazine` 中的每个字母只能在 `ransomNote` 中使用一次。

## 解题思路
要解决这个问题，可以通过计数来判断 `magazine` 是否能够提供足够的字母来构成 `ransomNote`。我们可以使用哈希表来存储 `magazine` 中每个字母的出现次数，然后遍历 `ransomNote`，检查每个字母是否在 `magazine` 中有足够的数量。具体步骤如下：

1. 创建一个哈希表 `count` 用来记录 `magazine` 中每个字母的出现次数。
2. 遍历 `magazine`，对每个字母在 `count` 中计数增加。
3. 遍历 `ransomNote`。对于其中的每个字母，检查 `count` 中是否存在并且数量大于0。
   - 如果存在且数量大于0，则减少 `count` 中该字母的计数。
   - 否则，返回 `false`。
4. 如果遍历完 `ransomNote`，则返回 `true`。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def canConstruct(ransomNote: str, magazine: str) -> bool:
    # 创建一个哈希表来计数 magazine 中每个字符的出现次数
    count = {}
    for char in magazine:
        if char in count:
            count[char] += 1
        else:
            count[char] = 1
    
    # 检查 ransomNote 中的每个字符是否在 magazine 中有足够的数量
    for char in ransomNote:
        if char in count and count[char] > 0:
            count[char] -= 1
        else:
            return False
    return True
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
bool canConstruct(string ransomNote, string magazine) {
    // 使用一个数组来存储 magazine 中每个字符的出现次数
    vector<int> count(26, 0);
    for (char c : magazine) {
        count[c - 'a']++;
    }
    
    // 检查 ransomNote 中每个字符是否有足够的出现次数
    for (char c : ransomNote) {
        if (count[c - 'a'] <= 0) {
            return false;
        }
        count[c - 'a']--;
    }
    return true;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function canConstruct(ransomNote, magazine) {
    // 创建一个对象来记录 magazine 中字符的出现次数
    let charCount = {};
    for (let char of magazine) {
        charCount[char] = (charCount[char] || 0) + 1;
    }

    for (let char of ransomNote) {
        if (!charCount[char] || charCount[char] === 0) {
            return false;
        }
        charCount[char]--;
    }
    return true;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public boolean canConstruct(String ransomNote, String magazine) {
    // 用一个数组来存储 magazine 中每个字符的出现次数
    int[] count = new int[26];
    for (char c : magazine.toCharArray()) {
        count[c - 'a']++;
    }
    
    // 检查 ransomNote 中每个字符是否有足够的次数
    for (char c : ransomNote.toCharArray()) {
        if (count[c - 'a'] <= 0) {
            return false;
        }
        count[c - 'a']--;
    }
    return true;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n + m)$，其中 $n$ 是 `magazine` 的长度，$m$ 是 `ransomNote` 的长度。因为我们需要遍历这两个字符串各一次。  
  
空间复杂度：$O(1)$，因为最多只需存储 26 个英文字母的计数，使用常数级别的额外空间。
