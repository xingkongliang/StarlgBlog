---
sidebar_position: 40
tags:
  - array
  - backtracking
  - Medium
---

# 40. 组合总和 II

标签: `array`, `backtracking`

难度: Medium

通过率: 56.84%

原题链接: https://leetcode.com/problems/combination-sum-ii/description/

## 题目描述
给定一个候选数字集合 `candidates` 和一个目标数字 `target`，找出所有候选数字中和为目标值的唯一组合。`candidates` 中的每个数字只能在每个组合中使用一次。

注意：解决方案集不得包含重复的组合。

## 解题思路
这个问题可以用回溯法来解决。回溯法可以用来遍历所有的组合，并在生成每个组合时检查这种组合的和是否等于目标值。具体步骤如下：

1. 首先对 `candidates` 进行排序，这样可以帮助我们在回溯的过程中跳过重复的元素，从而避免产生重复的组合。

2. 定义一个递归函数 `backtrack(start, target, path)`，其中 `start` 表示从 `candidates` 的哪个位置开始考虑元素，`target` 是当前需要达成的目标和，`path` 是到目前为止构成的组合。

3. 如果 `target` 为0，说明找到了一个满足条件的组合，应该将其加入结果集中。

4. 遍历 `candidates`，通过从 `start` 开始选择不重复元素进行尝试：
   - 如果 `candidates[i]` > `target`，因为 `candidates` 已经排序，所以从这一项开始后续都不可能满足条件，直接结束循环。
   - 如果 `i > start` 且 `candidates[i]` == `candidates[i-1]`，跳过重复的元素。
   - 否则，递归调用 `backtrack` 函数，尝试加入 `candidates[i]` 后的组合，并减少目标值 `target`。

5. 返回所有满足条件的组合。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def combinationSum2(candidates, target):
    def backtrack(start, target, path):
        # 如果目标和为 0，说明找到一个正确的组合
        if target == 0:
            res.append(path)
            return
        # 从 start 开始遍历 candidates
        for i in range(start, len(candidates)):
            # 如果当前数字大于目标值，直接剪枝
            if candidates[i] > target:
                break
            # 跳过重复元素
            if i > start and candidates[i] == candidates[i - 1]:
                continue
            # 递归调用，继续探测下一个元素
            backtrack(i + 1, target - candidates[i], path + [candidates[i]])

    candidates.sort()  # 先排序
    res = []
    backtrack(0, target, [])
    return res

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        vector<vector<int>> res;
        vector<int> path;
        sort(candidates.begin(), candidates.end());
        backtrack(candidates, target, 0, path, res);
        return res;
    }

private:
    void backtrack(vector<int>& candidates, int target, int start, vector<int>& path, vector<vector<int>>& res) {
        if (target == 0) {
            res.push_back(path);
            return;
        }
        for (int i = start; i < candidates.size(); ++i) {
            if (candidates[i] > target) break;
            if (i > start && candidates[i] == candidates[i - 1]) continue;
            path.push_back(candidates[i]);
            backtrack(candidates, target - candidates[i], i + 1, path, res);
            path.pop_back();
        }
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    const res = [];
    candidates.sort((a, b) => a - b);

    const backtrack = (start, target, path) => {
        if (target === 0) {
            res.push([...path]);
            return;
        }
        for (let i = start; i < candidates.length; i++) {
            if (candidates[i] > target) break;
            if (i > start && candidates[i] === candidates[i - 1]) continue;
            path.push(candidates[i]);
            backtrack(i + 1, target - candidates[i], path);
            path.pop();
        }
    };

    backtrack(0, target, []);
    return res;
};

```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(candidates);
        backtrack(candidates, target, 0, new ArrayList<>(), res);
        return res;
    }

    private void backtrack(int[] candidates, int target, int start, List<Integer> path, List<List<Integer>> res) {
        if (target == 0) {
            res.add(new ArrayList<>(path));
            return;
        }
        for (int i = start; i < candidates.length; i++) {
            if (candidates[i] > target) break;
            if (i > start && candidates[i] == candidates[i - 1]) continue;
            path.add(candidates[i]);
            backtrack(candidates, target - candidates[i], i + 1, path, res);
            path.remove(path.size() - 1);
        }
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度: $O(2^n)$，其中 $n$ 是 `candidates` 的大小。这是在最坏情况下，考虑所有可能的组合。`
空间复杂度: $O(n)$，因为递归栈的深度最多为 $n$。
