---
sidebar_position: 77
tags:
  - backtracking
  - Medium
---

# 77.组合

标签: `backtracking`

难度: Medium

通过率: 71.83%

原题链接: https://leetcode.com/problems/combinations/description/

## 题目描述
给定两个整数 $n$ 和 $k$，返回从范围 $[1, n]$ 中选取 $k$ 个数的所有可能组合。你可以按任何顺序返回答案。

## 解题思路
为了解决组合问题，我们可以使用回溯法。回溯法是一种进行深度优先搜索的算法，专门适用于求解满足某些条件的所有可能解。具体思路如下：

1. 初始化一个空列表 `result` 用于存储所有满足条件的组合。
2. 使用回溯函数 `backtrack(start, path)`，其中 `start` 表示从哪个数开始选择，`path` 是当前选择的数字路径：
   - 如果 `path` 的长度达到 `k`，将其添加到 `result` 中。
   - 遍历从 `start` 到 `n` 之间的所有数 `i`：
     - 将 `i` 添加到 `path` 中。
     - 递归调用 `backtrack(i + 1, path)` 去找出下一个符合条件的数字。
     - 回撤到上一层，从 `path` 删除 `i`，以便尝试其他候选数字。
3. 最后返回 `result`。

这种方法利用了回溯的思想，即尝试每一条可能的路径并在不满足条件时回溯，保证不会遗漏任何一个可能的组合。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def combine(n, k):
    def backtrack(start, path):
        # 如果当前组合长度等于 k，添加到结果集
        if len(path) == k:
            result.append(path[:])
            return
        # 从 start 开始尝试
        for i in range(start, n + 1):
            path.append(i)  # 选择 i
            backtrack(i + 1, path)  # 向后推进一位
            path.pop()  # 撤销选择，回溯
    result = []
    backtrack(1, [])
    return result
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<vector<int>> combine(int n, int k) {
        vector<vector<int>> result;
        vector<int> path;
        backtrack(1, n, k, path, result);
        return result;
    }

private:
    void backtrack(int start, int n, int k, vector<int>& path, vector<vector<int>>& result) {
        if (path.size() == k) {  // 如果当前路径等于 k，存储结果
            result.push_back(path);
            return;
        }
        for (int i = start; i <= n; ++i) {
            path.push_back(i);  // 选择 i
            backtrack(i + 1, n, k, path, result);  // 递归搜索
            path.pop_back();  // 撤销选择节点 i
        }
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function combine(n, k) {
    const result = [];
    // 回溯函数
    function backtrack(start, path) {
        if (path.length === k) {  // 如果路径长度等于 k，存储结果
            result.push([...path]);
            return;
        }
        for (let i = start; i <= n; i++) {
            path.push(i);  // 选择数字 i
            backtrack(i + 1, path);  // 递归
            path.pop();  // 回溯
        }
    }
    backtrack(1, []);
    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<List<Integer>> combine(int n, int k) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(1, n, k, new ArrayList<>(), result);
        return result;
    }

    private void backtrack(int start, int n, int k, List<Integer> path, List<List<Integer>> result) {
        if (path.size() == k) {  // 如果路径长度等于 k，加入结果集
            result.add(new ArrayList<>(path));
            return;
        }
        for (int i = start; i <= n; i++) {
            path.add(i);  // 选择数字 i
            backtrack(i + 1, n, k, path, result);  // 递归
            path.remove(path.size() - 1);  // 回溯
        }
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(\binom{n}{k} \cdot k)$，其中 $\binom{n}{k}$ 是组合数，$k$ 是每个组合的长度。
空间复杂度：$O(k)$，递归函数的栈空间最大深度是 $k$。
