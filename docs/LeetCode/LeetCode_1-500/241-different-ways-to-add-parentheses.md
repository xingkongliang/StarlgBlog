---
sidebar_position: 241
tags:
  - divide-and-conquer
  - dynamic-programming
  - Medium
---

# 241.不同方法加括号

标签: `divide-and-conquer`, `dynamic-programming`

难度: Medium

通过率: 71.88%

原题链接: https://leetcode.com/problems/different-ways-to-add-parentheses/description/

## 题目描述
给定一个由数字和运算符组成的字符串表达式，返回通过不同方式分组数字和运算符计算所有可能结果的所有可能结果。答案的顺序可以是任意的。

## 解题思路
这个问题可以通过分治法来解决。当我们遇到一个运算符时，我们可以将表达式划分为左边的子表达式和右边的子表达式，然后递归求解每一个子表达式可能得到的所有结果。通过这些结果和当前的运算符，我们可以组合计算出当前划分下的结果。当表达式中没有运算符时，这个表达式就是一个单独的数字，结果是它自己。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def diffWaysToCompute(expression):
    # 使用记忆化来避免重复计算
    memo = {}
    
    def ways(exp):
        if exp in memo:
            return memo[exp]
        
        # 存放当前表达式的可能结果
        result = []
        # 遍历表达式
        for i, char in enumerate(exp):
            if char in '+-*':
                # 分左右递归获取结果
                left = ways(exp[:i])
                right = ways(exp[i+1:])
                # 组合从左边和右边获得的结果
                for l in left:
                    for r in right:
                        if char == '+':
                            result.append(l + r)
                        elif char == '-':
                            result.append(l - r)
                        elif char == '*':
                            result.append(l * r)
        # 如果结果集为空，说明它是一个数字
        if not result:
            result = [int(exp)]
        
        # 记忆化结果
        memo[exp] = result
        return result
    
    return ways(expression)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<int> diffWaysToCompute(string expression) {
        // 使用记忆化存储来避免重复计算
        unordered_map<string, vector<int>> memo;
        return ways(expression, memo);
    }
    
private:
    vector<int> ways(const string &exp, unordered_map<string, vector<int>> &memo) {
        if (memo.find(exp) != memo.end())
            return memo[exp];
        
        vector<int> result;
        for (int i = 0; i < exp.size(); ++i) {
            if (exp[i] == '+' || exp[i] == '-' || exp[i] == '*') {
                // 分左右递归
                vector<int> left = ways(exp.substr(0, i), memo);
                vector<int> right = ways(exp.substr(i + 1), memo);
                // 组合从左边和右边获得的结果
                for (int l : left) {
                    for (int r : right) {
                        switch (exp[i]) {
                            case '+': result.push_back(l + r); break;
                            case '-': result.push_back(l - r); break;
                            case '*': result.push_back(l * r); break;
                        }
                    }
                }
            }
        }
        // 如果结果是空的，说明它仅是数字
        if (result.empty()) {
            result.push_back(stoi(exp));
        }
        // 记忆化
        memo[exp] = result;
        return result;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function diffWaysToCompute(expression) {
    const memo = new Map();
    
    const ways = exp => {
        if (memo.has(exp)) {
            return memo.get(exp);
        }

        const result = [];
        for (let i = 0; i < exp.length; ++i) {
            if ('+-*'.includes(exp[i])) {
                // 分左右递归
                const left = ways(exp.substring(0, i));
                const right = ways(exp.substring(i + 1));
                // 组合从左边和右边获得的结果
                for (const l of left) {
                    for (const r of right) {
                        switch (exp[i]) {
                            case '+': result.push(l + r); break;
                            case '-': result.push(l - r); break;
                            case '*': result.push(l * r); break;
                        }
                    }
                }
            }
        }
        // 如果结果是空的，说明它是一个数字
        if (result.length === 0) {
            result.push(parseInt(exp));
        }

        memo.set(exp, result);
        return result;
    };

    return ways(expression);
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

class Solution {
    public List<Integer> diffWaysToCompute(String expression) {
        return ways(expression, new HashMap<String, List<Integer>>());
    }
    
    private List<Integer> ways(String exp, Map<String, List<Integer>> memo) {
        if (memo.containsKey(exp)) return memo.get(exp);

        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < exp.length(); i++) {
            char c = exp.charAt(i);
            if (c == '+' || c == '-' || c == '*') {
                // 分左右递归
                List<Integer> left = ways(exp.substring(0, i), memo);
                List<Integer> right = ways(exp.substring(i + 1), memo);
                // 组合从左边和右边获得的结果
                for (int l : left) {
                    for (int r : right) {
                        switch (c) {
                            case '+': result.add(l + r); break;
                            case '-': result.add(l - r); break;
                            case '*': result.add(l * r); break;
                        }
                    }
                }
            }
        }
        // 如果结果集为空，说明它仅是数字
        if (result.isEmpty()) {
            result.add(Integer.parseInt(exp));
        }
        // 记忆化
        memo.put(exp, result);
        return result;
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：由于每个操作符都可以产生多种可能的括号组合，复杂度大约为 $O(4^n/n^{1.5})$，其中 $n$ 是操作符的个数。这个是 Catalan 数的复杂度。  
  
空间复杂度：$O(4^n/n^{1.5})$，用于存储递归生成的可能结果。
