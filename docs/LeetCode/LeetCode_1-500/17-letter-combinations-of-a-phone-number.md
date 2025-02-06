---
sidebar_position: 17
tags:
  - string
  - backtracking
  - Medium
---

# 17.电话号码的字母组合

标签: `string`, `backtracking`

难度: Medium

通过率: 62.47%

原题链接: https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/

## 题目描述
给定一个包含数字2-9的字符串，返回所有它能表示的字母组合。答案可以按任意顺序返回。每个数字对应的字母如下所示（类似电话键盘）。注意1不对应任何字母。

## 解题思路
这个问题可以用回溯法来解决。由于数字与字母之间的对应关系是确定的，我们可以使用一个哈希表来存储这种映射关系。对于输入的每一位数字，我们可以递归地找出当前数字对应的所有字母，并尝试将这些字母与之前的组合进行拼接。当递归遍历完所有数字后，我们就得到了一种完整的组合，并可以将其加入结果集中。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def letterCombinations(digits):
    # 数字到字母的映射
    phone = {'2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
             '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'}
    
    # 如果输入为空，则返回空列表
    if not digits:
        return []

    # 结果列表
    result = []

    # 回溯算法
    def backtrack(combination, next_digits):
        # 如果没有更多的数字要处理，完成当前组合
        if not next_digits:
            result.append(combination)
        else:
            # 处理下一个数字对应的所有可能字母
            for letter in phone[next_digits[0]]:
                backtrack(combination + letter, next_digits[1:])

    # 从空组合开始处理所有输入的数字
    backtrack("", digits)
    return result

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<string> letterCombinations(string digits) {
        // 数字到字母的映射
        vector<string> phone = {"abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};

        // 如果输入为空，则返回空列表
        if (digits.empty()) {
            return {};
        }

        // 结果列表
        vector<string> result;
        
        // 回溯算法
        function<void(string, string)> backtrack = [&](string combination, string next_digits) {
            // 如果没有更多的数字要处理，完成当前组合
            if (next_digits.empty()) {
                result.push_back(combination);
            } else {
                // 处理下一个数字对应的所有可能字母
                string letters = phone[next_digits[0] - '2'];
                for (char letter : letters) {
                    backtrack(combination + letter, next_digits.substr(1));
                }
            }
        };

        // 从空组合开始处理所有输入的数字
        backtrack("", digits);
        return result;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function letterCombinations(digits) {
    // 数字到字母的映射
    const phone = {
        '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',
        '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'
    };

    // 如果输入为空，则返回空列表
    if (!digits) {
        return [];
    }

    // 结果数组
    const result = [];

    // 回溯算法
    function backtrack(combination, nextDigits) {
        // 如果没有更多的数字要处理，完成当前组合
        if (!nextDigits.length) {
            result.push(combination);
        } else {
            // 处理下一个数字对应的所有可能字母
            const digit = nextDigits[0];
            const letters = phone[digit];
            for (let i = 0; i < letters.length; i++) {
                backtrack(combination + letters[i], nextDigits.slice(1));
            }
        }
    }

    // 从空组合开始处理所有输入的数字
    backtrack("", digits);
    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<String> letterCombinations(String digits) {
        // 数字到字母的映射
        String[] phone = {"abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};

        // 如果输入为空，则返回空列表
        List<String> result = new ArrayList<>();
        if (digits == null || digits.length() == 0) {
            return result;
        }
        
        // 回溯算法
        backtrack(result, "", digits, phone);
        return result;
    }

    private void backtrack(List<String> result, String combination, String nextDigits, String[] phone) {
        // 如果没有更多的数字要处理，完成当前组合
        if (nextDigits.length() == 0) {
            result.add(combination);
        } else {
            // 处理下一个数字对应的所有可能字母
            String letters = phone[nextDigits.charAt(0) - '2'];
            for (char letter : letters.toCharArray()) {
                backtrack(result, combination + letter, nextDigits.substring(1), phone);
            }
        }
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：给定数字的数量为$n$，每个数字对应最多4个字母，故总时间复杂度为$O(4^n)$。因为每个数字需各自的组合。`空间复杂度`：使用$O(n)$的辅助空间储存当前的组合。
