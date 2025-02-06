---
sidebar_position: 131
tags:
  - backtracking
  - string
  - dynamic-programming
  - Medium
---

# 131.分割回文串

标签: `backtracking`, `string`, `dynamic-programming`

难度: Medium

通过率: 70.84%

原题链接: https://leetcode.com/problems/palindrome-partitioning/description/

## 题目描述
给定一个字符串 $s$，请分割 $s$ 使每个分割出的子串都是回文。返回所有可能的回文分割。

**示例 1:**

输入: s = "aab"

输出: [["a","a","b"],["aa","b"]]

**示例 2:**

输入: s = "a"

输出: [["a"]] 

**约束条件：**

- $1 \leq \text{s.length} \leq 16$
- $s$ 只包含小写英文字母。

## 解题思路
这道题可以通过回溯（Backtracking）算法来解决。具体来说，我们需要尝试将给定字符串 $s$ 的每个可能子串判断是否为回文，并进行分割。

1. **回溯函数设计：** 创建一个递归函数 `backtrack(start)`，它从索引 `start` 开始，尝试所有可能的分割。

2. **产生分割：** 对于每个从 `start` 到字符串末尾的索引 `end`：
   - 将子串 $s[start:end+1]$ 提取出来。
   - 检查它是否是回文。
   - 如果是回文，将其加入当前分割路径。
   - 然后递归调用 `backtrack(end + 1)` 继续检查下一个部分。
   - 递归返回后，回溯删除该部分。

3. **终止条件：** 当 `start` 等于字符串的长度时，说明已经遍历到字符串的结尾，当前路径是一个完整的分割。

4. **回文检查：** 在回溯过程中需要频繁的检查子串是否为回文，可以通过动态规划或直接双指针对称检查来实现。这里采用双指针对称检查以保持简单性。

通过这种回溯+剪枝的方式，收集所有可能的回文分割。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def partition(s):
    def is_palindrome(start, end):
        # 检查s[start:end+1]是否是回文
        while start < end:
            if s[start] != s[end]:
                return False
            start += 1
            end -= 1
        return True

    def backtrack(start, path, result):
        if start >= len(s):  # 终止条件：已经到达字符串末尾
            result.append(path.copy())  # 添加当前路径到结果集
            return

        for end in range(start, len(s)):
            if is_palindrome(start, end):  # 如果子串是回文
                path.append(s[start:end+1])  # 选择这个子串
                backtrack(end+1, path, result)  # 继续递归
                path.pop()  # 回溯，撤销选择

    result = []
    backtrack(0, [], result)
    return result
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
void partitionHelper(int start, vector<string>& path, vector<vector<string>>& result, const string& s) {
    if (start >= s.size()) {
        result.push_back(path);
        return;
    }
    for (int end = start; end < s.size(); end++) {
        if (isPalindrome(s, start, end)) {
            path.push_back(s.substr(start, end - start + 1));
            partitionHelper(end + 1, path, result, s);
            path.pop_back();
        }
    }
}

bool isPalindrome(const string& s, int start, int end) {
    while (start < end) {
        if (s[start] != s[end]) return false;
        start++;
        end--;
    }
    return true;
}

vector<vector<string>> partition(string s) {
    vector<vector<string>> result;
    vector<string> path;
    partitionHelper(0, path, result, s);
    return result;
}

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function partition(s) {
    function isPalindrome(l, r) {
        while (l < r) {
            if (s[l] !== s[r]) return false;
            l++;
            r--;
        }
        return true;
    }

    function backtrack(start, path, result) {
        if (start >= s.length) {
            result.push(Array.from(path));
            return;
        }
        for (let end = start; end < s.length; end++) {
            if (isPalindrome(start, end)) {
                path.push(s.substring(start, end + 1));
                backtrack(end + 1, path, result);
                path.pop();
            }
        }
    }

    const result = [];
    backtrack(0, [], result);
    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<List<String>> partition(String s) {
        List<List<String>> result = new ArrayList<>();
        backtrack(0, new ArrayList<>(), result, s);
        return result;
    }

    private void backtrack(int start, List<String> path, List<List<String>> result, String s) {
        if (start >= s.length()) {
            result.add(new ArrayList<>(path));
            return;
        }
        for (int end = start; end < s.length(); end++) {
            if (isPalindrome(s, start, end)) {
                path.add(s.substring(start, end + 1));
                backtrack(end + 1, path, result, s);
                path.remove(path.size() - 1);
            }
        }
    }

    private boolean isPalindrome(String s, int left, int right) {
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(n \times 2^n)$，由于每个字符可以分为自己和组合，可能的组合数约为 $2^n$。
- 空间复杂度：$O(n)$，这是递归栈可能达到的最大深度。
