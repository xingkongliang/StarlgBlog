---
sidebar_position: 22
tags:
  - backtracking
  - string
  - Medium
---

# 22.生成括号

标签: `backtracking`, `string`

难度: Medium

通过率: 76.04%

原题链接: https://leetcode.com/problems/generate-parentheses/description/

## 题目描述
给定 $n$ 对括号，编写一个函数生成所有可能的、格式正确的括号组合。

## 解题思路
我们需要生成所有的可能组合，其中每一个组合都是格式正确的括号。要实现这一点，可以使用**回溯法**来解决问题。具体步骤如下：
1. 定义一个函数 `backtrack`，它使用一个递归的方法来尝试生成括号组合。
2. 使用两个计数器 `open` 和 `close` 来跟踪当前生成的括号字符串中已经加入的左括号和右括号的数量。
3. 当左括号 `open` 的数量小于 `n` 时，可以添加左括号(这保证了左括号配对的可能性)；当右括号 `close` 的数量小于 `open` 时，可以添加右括号(这确保了当前子字符串是格式正确的)。`
4. 当生成的字符串长度达到 `2*n` 时，说明生成了一个完成的括号组合，可以将其加入结果列表。`
5. 重复上述步骤直到所有可能的组合都生成完成。`


## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def generateParenthesis(n):
    def backtrack(S = '', open = 0, close = 0):
        # 如果当前括号组合长度为2 * n，那么就是一个有效的结果
        if len(S) == 2 * n:
            result.append(S)
            return
        # 如果我们还可以添加左括号
        if open < n:
            backtrack(S + '(', open + 1, close)
        # 如果我们还可以添加右括号
        if close < open:
            backtrack(S + ')', open, close + 1)

    result = []
    backtrack()
    return result

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<string> result;
        backtrack(result, "", 0, 0, n);
        return result;
    }

private:
    void backtrack(vector<string>& result, string current, int open, int close, int max) {
        // 如果当前组合长度等于2 * max，说明它是一个有效的解
        if (current.length() == max * 2) {
            result.push_back(current);
            return;
        }
        // 可以添加左括号
        if (open < max) {
            backtrack(result, current + "(", open + 1, close, max);
        }
        // 可以添加右括号
        if (close < open) {
            backtrack(result, current + ")", open, close + 1, max);
        }
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
var generateParenthesis = function(n) {
    const result = [];
    const backtrack = (current, open, close) => {
        // 如果当前字符串长度是2 * n，那么是一个有效结果
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }
        // 添加一个左括号
        if (open < n) {
            backtrack(current + '(', open + 1, close);
        }
        // 添加一个右括号
        if (close < open) {
            backtrack(current + ')', open, close + 1);
        }
    };
    backtrack('', 0, 0);
    return result;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> result = new ArrayList<>();
        backtrack(result, "", 0, 0, n);
        return result;
    }
    
    private void backtrack(List<String> result, String current, int open, int close, int max) {
        // 如果当前字符串长度是 2 * max
        if (current.length() == max * 2) {
            result.add(current);
            return;
        }
        // 添加左括号
        if (open < max) {
            backtrack(result, current + "(", open + 1, close, max);
        }
        // 添加右括号
        if (close < open) {
            backtrack(result, current + ")", open, close + 1, max);
        }
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：生成有效括号组合的数量是 Catalan 数，给定 $n$ 对括号，总的组合数为 $\frac{1}{n+1} \binom{2n}{n}$，因此时间复杂度是 $O\left(\frac{4^n}{\sqrt{n}}\right)$。`
- 空间复杂度：栈的最大深度是 $O(n)$，因此空间复杂度是 $O(n)$。
