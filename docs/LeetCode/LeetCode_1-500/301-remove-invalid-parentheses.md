---
sidebar_position: 301
tags:
  - backtracking
  - depth-first-search
  - breadth-first-search
  - string
  - Hard
---

# 301.移除无效的括号

标签: `backtracking`, `depth-first-search`, `breadth-first-search`, `string`

难度: Hard

通过率: 48.75%

原题链接: https://leetcode.com/problems/remove-invalid-parentheses/description/

## 题目描述
给定一个包含括号和字母的字符串，移除最少数量的无效括号以使输入字符串有效。返回一组唯一的使括号匹配的最小移除结果的字符串，可以按任意顺序返回这些结果。

## 解题思路
为了生成所有可能的有效括号组合，我们需要进行广度优先搜索（BFS）或者深度优先搜索（DFS）。考虑到字符串的长度限制，我们选择广度优先搜索，通过逐层去掉无效的括号。我们可以从输入字符串开始，逐个去掉每一个字符（如果是括号）生成新的字符串，然后检查这些字符串是否有效。我们先找到去掉最少无效括号能达到的有效字符串。具体步骤如下：  

1. 使用队列（queue）保存待处理的字符串，从原始字符串开始。
2. 使用集合（set）记录已经访问过的字符串，以避免重复处理。
3. 每次从队列取出一个字符串，检查它是否是有效的括号组合。
   - 如果是，记录这个结果，并注意停止生成下一层的字符串，因为我们已经找到了最少移除的解。
4. 如果当前层没有有效解，则继续对当前字符串进行处理，生成下一层所有可能的字符串（通过去掉一个字符）。
5. 若某次生成了有效的字符串，队列中该层的其他字符串就不需要进一步处理，从而节省时间。
6. 返回所有找到的符合条件的结果。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
from collections import deque

# 判断字符串是否是有效的括号组合
def is_valid(s):
    balance = 0
    for char in s:
        if char == '(':  # 遇到左括号，计数加一
            balance += 1
        elif char == ')':  # 遇到右括号
            balance -= 1  # 计数减一
            if balance < 0:  # 如果计数小于零，说明右括号更多
                return False
    return balance == 0  # 最后应为零才算平衡

# 移除无效括号的主函数
def remove_invalid_parentheses(s):
    if not s:  # 空字符串返回空结果
        return ['']
    results = []
    queue = deque([s])  # 用队列进行广度优先搜索
    visited = set([s])  
    found = False  # 用于标记是否已找到有效括号

    while queue:
        current = queue.popleft()  # 取出队列的第一个字符串
        if is_valid(current):  # 检查当前字符串是否有效
            results.append(current)  # 有效则添加到结果列表
            found = True
        if found:  # 找到有效结果后不再生成下一级的字符串
            continue
        for i in range(len(current)):
            if current[i] in ('(', ')'):  # 仅对括号进行移除操作
                next_state = current[:i] + current[i + 1:]  # 生成新的字符串状态
                if next_state not in visited:  # 新状态未访问过
                    visited.add(next_state)  # 标记该状态已访问
                    queue.append(next_state)  # 将新状态加入队列
    return results

# 示例调用
s = "()())()"
print(remove_invalid_parentheses(s))  # 输出：['(())()', '()()()']
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<string> removeInvalidParentheses(string s) {
        vector<string> results;
        queue<string> q;
        unordered_set<string> visited;
        q.push(s);
        visited.insert(s);
        bool found = false;
        while (!q.empty()) {
            string current = q.front();
            q.pop();
            if (isValid(current)) {
                results.push_back(current);
                found = true;
            }
            if (found) {
                continue;
            }
            for (int i = 0; i < current.size(); ++i) {
                if (current[i] == '(' || current[i] == ')') {
                    string next = current.substr(0, i) + current.substr(i + 1);
                    if (!visited.count(next)) {
                        visited.insert(next);
                        q.push(next);
                    }
                }
            }
        }
        return results;
    }
    
private:
    bool isValid(const string& s) {
        int balance = 0;
        for (char c : s) {
            if (c == '(') {
                ++balance;
            } else if (c == ')') {
                --balance;
                if (balance < 0) {
                    return false;
                }
            }
        }
        return balance == 0;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function removeInvalidParentheses(s) {
    const results = [];
    const queue = [s];
    const visited = new Set([s]);
    let found = false;
    
    while (queue.length) {
        const current = queue.shift();  // 获取队列中的第一个字符串
        if (isValid(current)) {
            results.push(current);  // 如果当前字符串有效，则添加到结果集
            found = true;
        }
        if (found) {
            continue;  // 已找到最短有效，跳过生成下一层
        }
        for (let i = 0; i < current.length; i++) {
            if (current[i] === '(' || current[i] === ')') {
                const next = current.slice(0, i) + current.slice(i + 1);
                if (!visited.has(next)) {
                    visited.add(next);  // 标记已访问
                    queue.push(next);  // 加入队列
                }
            }
        }
    }
    return results;
}

function isValid(s) {
    let balance = 0;
    for (const char of s) {
        if (char === '(') {
            balance++;
        } else if (char === ')') {
            balance--;
            if (balance < 0) return false;
        }
    }
    return balance === 0;
}

// 示例调用
const s = "()())()";
console.log(removeInvalidParentheses(s));  // 输出：['(())()', '()()()']
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

public class Solution {
    public List<String> removeInvalidParentheses(String s) {
        List<String> results = new ArrayList<>();
        Queue<String> queue = new LinkedList<>();
        Set<String> visited = new HashSet<>();
        queue.offer(s);
        visited.add(s);
        boolean found = false;
        
        while (!queue.isEmpty()) {
            String current = queue.poll();  // 从队列头部获取一个字符串
            if (isValid(current)) {
                results.add(current);  // 如果当前字符串有效，则添加至结果
                found = true;
            }
            if (found) {
                continue;
            }
            for (int i = 0; i < current.length(); i++) {
                if (current.charAt(i) == '(' || current.charAt(i) == ')') {
                    String next = current.substring(0, i) + current.substring(i + 1);
                    if (!visited.contains(next)) {
                        visited.add(next);  // 标记为已访问
                        queue.offer(next);  // 加入队列
                    }
                }
            }
        }
        return results;
    }
    
    private boolean isValid(String s) {
        int balance = 0;
        for (char c : s.toCharArray()) {
            if (c == '(') {
                balance++;
            } else if (c == ')') {
                balance--;
                if (balance < 0) {
                    return false;
                }
            }
        }
        return balance == 0;
    }
    
    // 示例调用
    public static void main(String[] args) {
        Solution solution = new Solution();
        String s = "()())()";
        System.out.println(solution.removeInvalidParentheses(s));  // 输出：["(())()", "()()()"]
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(2^n)$，因为每个括号可能被保留或去除，对每个字符进行决策。  
  
空间复杂度为 $O(n \cdot 2^n)$，其中 $n$ 是字符串的长度，因为我们需要存储广度优先搜索过程中可能的字符串。
