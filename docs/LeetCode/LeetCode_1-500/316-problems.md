---
sidebar_position: 316
tags:
  - stack
  - greedy
  - Medium
---

# 316.去除重复字母

标签: `stack`, `greedy`

难度: Medium

通过率: 50.49%

原题链接: Note: This question is the same as 1081: https://leetcode.com/problems/smallest-subsequence-of-distinct-characters/

## 题目描述
给定一个字符串 $s$，移除重复的字母以便每个字母只出现一次。你必须确保结果是所有可能结果中字典顺序最小的。

## 解题思路
为了确保字典顺序最小并且每个字母只出现一次，我们可以使用贪心算法并结合栈来解决这个问题。` 1. 计算字符串中每个字符出现的频次。` 2. 初始化一个栈，用于记录当前的字典序结果，以及一个集合用于标记哪些字符已经在栈中。` 3. 遍历字符串中的每个字符，对于每个字符：      * 如果该字符已经在栈中，则跳过（因为我们已经为该字符选择过最优位置）。      * 否则，检查栈顶元素。如果栈顶元素在接下来的字符中仍会出现，并且栈顶元素的字典序大于当前字符，则可以弹出栈顶元素以获得更小的字典序。      * 将当前字符压入栈并标记该字符已在栈中。` 4. 栈的内容即是所求的字典最小序列。` 这种方法确保了每个字符最多处理两次，因此效率较高，并且通过栈的操作维护了字典序的最小性。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def removeDuplicateLetters(s: str) -> str: 
    # 统计每个字符的出现次数
    char_count = {c: 0 for c in s}
    for c in s:
        char_count[c] += 1
    
    # 初始化栈和集合
    stack = []
    in_stack = set()
    
    for c in s:
        # 当前字符的计数减1
        char_count[c] -= 1
        
        # 如果字符已经在栈中，跳过
        if c in in_stack:
            continue
        
        # 如果栈不为空，并且栈顶元素比当前字符大，且栈顶元素以后还会出现
        while stack and stack[-1] > c and char_count[stack[-1]] > 0:
            # 出栈，并在集合中移除
            removed_char = stack.pop()
            in_stack.remove(removed_char)
        
        # 将当前字符入栈并在集合中标记
        stack.append(c)
        in_stack.add(c)
    
    # 将栈中的字符连接成结果字符串
    return ''.join(stack)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
std::string removeDuplicateLetters(std::string s) { 
    // 统计每个字符的出现次数
    std::unordered_map<char, int> char_count;
    for (char c : s) char_count[c]++;
    
    // 初始化栈和集合
    std::stack<char> stack;
    std::unordered_set<char> in_stack;
    
    for (char c : s) {
        // 当前字符的计数减1
        char_count[c]--;
        
        // 如果字符已经在栈中，跳过
        if (in_stack.count(c)) continue;
        
        // 如果栈不为空，并且栈顶元素比当前字符大，且栈顶元素以后还会出现
        while (!stack.empty() && stack.top() > c && char_count[stack.top()] > 0) {
            // 出栈，并在集合中移除
            in_stack.erase(stack.top());
            stack.pop();
        }
        
        // 将当前字符入栈并在集合中标记
        stack.push(c);
        in_stack.insert(c);
    }
    
    // 将栈中的字符连接成结果字符串
    std::string result;
    while (!stack.empty()) {
        result = stack.top() + result;
        stack.pop();
    }
    return result;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function removeDuplicateLetters(s) { 
    // 统计每个字符的出现次数
    const char_count = {};
    for (let c of s) {
        if (char_count[c]) char_count[c]++;
        else char_count[c] = 1;
    }
    
    // 初始化栈和集合
    const stack = [];
    const in_stack = new Set();
    
    for (let c of s) {
        // 当前字符的计数减1
        char_count[c]--;
        
        // 如果字符已经在栈中，跳过
        if (in_stack.has(c)) continue;
        
        // 如果栈不为空，并且栈顶元素比当前字符大，且栈顶元素以后还会出现
        while (stack.length > 0 && stack[stack.length - 1] > c && char_count[stack[stack.length - 1]] > 0) {
            // 出栈，并在集合中移除
            in_stack.delete(stack.pop());
        }
        
        // 将当前字符入栈并在集合中标记
        stack.push(c);
        in_stack.add(c);
    }
    
    // 将栈中的字符连接成结果字符串
    return stack.join('');
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public String removeDuplicateLetters(String s) {
        // 统计每个字符的出现次数
        int[] charCount = new int[26];
        for (char c : s.toCharArray()) {
            charCount[c - 'a']++;
        }
        
        // 初始化栈和集合
        Stack<Character> stack = new Stack<>();
        boolean[] inStack = new boolean[26];
        
        for (char c : s.toCharArray()) {
            // 当前字符的计数减1
            charCount[c - 'a']--;
            
            // 如果字符已经在栈中，跳过
            if (inStack[c - 'a']) continue;
            
            // 如果栈不为空，并且栈顶元素比当前字符大，且栈顶元素以后还会出现
            while (!stack.isEmpty() && stack.peek() > c && charCount[stack.peek() - 'a'] > 0) {
                // 出栈，并在集合中移除
                inStack[stack.pop() - 'a'] = false;
            }
            
            // 将当前字符入栈并在集合中标记
            stack.push(c);
            inStack[c - 'a'] = true;
        }
        
        // 将栈中的字符连接成结果字符串
        StringBuilder result = new StringBuilder();
        for (char c : stack) {
            result.append(c);
        }
        return result.toString();
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 为字符串 $s$ 的长度。每个字符在遍历时被处理，并且每个字符最多进入和离开栈一次。`  `  空间复杂度：$O(1)$，使用的额外空间与字符集大小相关，在本题中为常数级别的。
