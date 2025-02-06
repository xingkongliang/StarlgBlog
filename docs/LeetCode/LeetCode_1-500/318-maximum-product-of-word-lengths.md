---
sidebar_position: 318
tags:
  - bit-manipulation
  - array
  - Medium
---

# 318.最大单词长度乘积

标签: `bit-manipulation`, `array`

难度: Medium

通过率: 60.32%

原题链接: https://leetcode.com/problems/maximum-product-of-word-lengths/description/

## 题目描述
给定一个字符串数组 `words`，返回其中两个不包含相同字符的单词长度的最大乘积。如果不存在这样的两个单词，返回 0。

## 解题思路
为了计算两个不含相同字母的单词长度的最大乘积，我们可以使用位运算的方法。首先，我们对每个单词创建一个整数掩码 `mask`，该掩码的每一位表示该单词中是否包含对应的英文字母（'a' 表示掩码的最低位，'z' 是最高位）。这可以通过将字母映射为一个位并进行或操作实现。然后，我们只需比较每一对掩码，找出不含相同字母的单词对即可（即掩码的按位与为 0）。在这些不含相同字母的单词对中，找出其长度乘积的最大值。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def maxProduct(words):
    # 创建每个单词对应的掩码列表
    masks = []
    lengths = []
    for word in words:
        mask = 0
        for char in word:
            # 使用或运算来生成掩码
            mask |= 1 << (ord(char) - ord('a'))
        masks.append(mask)
        lengths.append(len(word))

    max_prod = 0
    for i in range(len(words)):
        for j in range(i + 1, len(words)):
            # 比较两个单词的掩码，检查是否共用相同的字母
            if masks[i] & masks[j] == 0:
                max_prod = max(max_prod, lengths[i] * lengths[j])

    return max_prod
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int maxProduct(vector<string>& words) {
        vector<int> masks(words.size(), 0);
        vector<int> lengths(words.size(), 0);
        for (int i = 0; i < words.size(); i++) {
            string word = words[i];
            lengths[i] = word.size();
            for (char c : word) {
                // 生成掩码
                masks[i] |= 1 << (c - 'a');
            }
        }

        int maxProd = 0;
        for (int i = 0; i < words.size(); ++i) {
            for (int j = i + 1; j < words.size(); ++j) {
                // 检查掩码是否有重叠
                if ((masks[i] & masks[j]) == 0) {
                    maxProd = max(maxProd, lengths[i] * lengths[j]);
                }
            }
        }
        return maxProd;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function maxProduct(words) {
    const masks = [];
    const lengths = [];
    for (const word of words) {
        let mask = 0;
        for (const char of word) {
            // 使用位或操作生成掩码
            mask |= 1 << (char.charCodeAt(0) - 'a'.charCodeAt(0));
        }
        masks.push(mask);
        lengths.push(word.length);
    }

    let maxProd = 0;
    for (let i = 0; i < words.length; i++) {
        for (let j = i + 1; j < words.length; j++) {
            // 检查掩码是否有重叠
            if ((masks[i] & masks[j]) === 0) {
                maxProd = Math.max(maxProd, lengths[i] * lengths[j]);
            }
        }
    }
    return maxProd;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int maxProduct(String[] words) {
        int n = words.length;
        int[] masks = new int[n];
        int[] lengths = new int[n];
        for (int i = 0; i < n; i++) {
            String word = words[i];
            lengths[i] = word.length();
            for (char c : word.toCharArray()) {
                // 设置掩码
                masks[i] |= 1 << (c - 'a');
            }
        }

        int maxProd = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                // 检查掩码是否重叠
                if ((masks[i] & masks[j]) == 0) {
                    maxProd = Math.max(maxProd, lengths[i] * lengths[j]);
                }
            }
        }
        return maxProd;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n^2 + L)$，其中 $n$ 是单词的数量，$L$ 是所有单词长度的总和，因为对每对单词检查掩码时需要 $O(n^2)$，而创建掩码的总时间是 $O(L)$。    
    
空间复杂度为 $O(n)$，用于存储每个单词的掩码与长度信息。
