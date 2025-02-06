---
sidebar_position: 216
tags:
  - backtracking
  - Medium
---

# 216.组合总和 III

标签: `backtracking`

难度: Medium

通过率: 70.97%

原题链接: https://leetcode.com/problems/combination-sum-iii/description/

## 题目描述
找到所有由k个数字组成的和为n的有效组合，其中：`只使用数字1到9`，`每个数字最多使用一次`，返回所有可能的有效组合。

## 解题思路
这一问题可以用**回溯法**来解决。回溯法是一种通过试图逐步构建解决方案的方法，通过探索所有可能的选项来发现所有正确的解决方案。问题的关键在于决定选择哪些数字，并确保组合中的数字个数为$k$且总和为$n$。我们首先考虑最小的数字$1$，然后尝试添加其他数字构建一个和为$n$的组合。在选择过程中，维持一个局部解决方案，只有满足要求的解决方案才会被加入到结果中。

具体步骤如下：

1. 初始化一个空列表`res`用于存储结果组合。
2. 设计一个辅助函数`backtrack(start, path, sum)`，参数分别为：
   - `start`：当前探索的位置。
   - `path`：当前考虑的组合。
   - `sum`：当前组合的和。
3. 在每次递归调用中，检查：
   - 如果`path`长度等于$k$且`sum`等于$n$，将`path`拷贝并加入`res`。
   - 如果`path`长度大于$k$或者`sum`超过$n$，则直接返回。
4. 从当前位置`start`遍历到$9$，对每个数字`i`：
   - 将`i`加入当前路径`path`。
   - 更新`sum`。
   - 递归调用`backtrack(i + 1, path, sum)`。
   - 完成后回溯，即撤销选择，将`i`从`path`中移除。
5. 初始调用`backtrack(1, [], 0)`开始回溯。
6. 返回结果`res`。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def combinationSum3(k, n):
    def backtrack(start, path, sum):
        # 如果当前路径的长度等于k并且和等于n，将路径加入结果
        if len(path) == k and sum == n:
            res.append(path[:])
            return
        # 如果路径长度超过k或当前和超过n，则停止继续
        if len(path) > k or sum > n:
            return
        # 从当前数字开始遍历
        for i in range(start, 10):
            path.append(i)
            backtrack(i + 1, path, sum + i)  # 递归，并更新起点和当前和
            path.pop()  # 回溯
    res = []
    backtrack(1, [], 0)
    return res
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<vector<int>> combinationSum3(int k, int n) {
        vector<vector<int>> res;
        vector<int> path;
        backtrack(1, k, n, path, res);
        return res;
    }
    void backtrack(int start, int k, int n, vector<int>& path, vector<vector<int>>& res) {
        if (path.size() == k && n == 0) {
            res.push_back(path);
            return;
        }
        if (path.size() > k || n < 0) return;
        for (int i = start; i <= 9; ++i) {
            path.push_back(i);
            backtrack(i + 1, k, n - i, path, res);
            path.pop_back();
        }
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function combinationSum3(k, n) {
    const res = [];

    const backtrack = (start, path, sum) => {
        if (path.length === k && sum === n) {
            res.push([...path]);
            return;
        }
        if (path.length > k || sum > n) {
            return;
        }
        for (let i = start; i <= 9; i++) {
            path.push(i);
            backtrack(i + 1, path, sum + i);
            path.pop();
        }
    };

    backtrack(1, [], 0);
    return res;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<List<Integer>> combinationSum3(int k, int n) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(1, k, n, new ArrayList<>(), res);
        return res;
    }
    private void backtrack(int start, int k, int n, List<Integer> path, List<List<Integer>> res) {
        if (path.size() == k && n == 0) {
            res.add(new ArrayList<>(path));
            return;
        }
        if (path.size() > k || n < 0) return;
        for (int i = start; i <= 9; i++) {
            path.add(i);
            backtrack(i + 1, k, n - i, path, res);
            path.remove(path.size() - 1);
        }
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度**:  
$O(\binom{9}{k})$，其中$\binom{9}{k}$表示从9个数中选出k个数的组合数量，这个问题的复杂度主要在于组合的生成和回溯的方案数。


**空间复杂度**:  
$O(k)$，由于需要存储每个组合的结果以及递归调用栈深度为$k$。
