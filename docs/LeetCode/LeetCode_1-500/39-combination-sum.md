---
sidebar_position: 39
tags:
  - array
  - backtracking
  - Medium
---

# 39.组合总和

标签: `array`, `backtracking`

难度: Medium

通过率: 73.36%

原题链接: https://leetcode.com/problems/combination-sum/description/

## 题目描述
给定一个由不同整数构成的数组 `candidates` 和一个目标整数 `target`，返回 `candidates` 中所有可以使数字和为 `target` 的唯一组合。你可以以任意顺序返回这些组合。`candidates` 中的同一个数字可以无限次被选取。两个组合是唯一的，只有当至少一个被选取的数字的频次不同。测试用例保证和为 `target` 的唯一组合数最多为 150 个。

## 解题思路
可以使用回溯法解决这个问题。我们进行深度遍历，并在发现符合条件的组合时加入结果列表中。同时，为了避免重复组合，我们在递归调用中，始终以当前数字或当前数字之后的数字开始进行选择。

解题步骤如下：

1. 针对 `candidates` 数组中的每个元素进行遍历，尝试加入到当前构造的组合中。
2. 如果新组合的和刚好等于 `target`，则找到一个符合条件的解，将其加入结果。
3. 如果新组合的和超过 `target`，则不必继续进行该路径上的搜索。
4. 否则，再次调用递归函数并继续探查，用当前或以后数组中的元素可以获得的所有组合。
5. 回溯步骤中移除当前元素，以便探索新的路径。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# Python 解法
# 使用回溯法来生成所有符合条件的组合
from typing import List

def combinationSum(candidates: List[int], target: int) -> List[List[int]]:
    res = []

    def backtrack(remain, combo, start):
        if remain == 0:
            # 找到一个组合，使其和为 target
            res.append(list(combo))
            return
        elif remain < 0:
            # 如果组合和超过 target，停止探索
            return
        
        # 继续探索，以当前或后续的数组元素能获得的所有组合
        for i in range(start, len(candidates)):
            # 将当前元素加入组合
            combo.append(candidates[i])
            # 递归调用 backtrack，允许重复使用当前的元素
            backtrack(remain - candidates[i], combo, i)
            # 回溯，移除当前元素，探索其它路径
            combo.pop()

    backtrack(target, [], 0)
    return res
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++ 解法
#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> res;
        vector<int> combo;
        backtrack(candidates, target, res, combo, 0);
        return res;
    }

private:
    void backtrack(vector<int>& candidates, int remain, vector<vector<int>>& res, vector<int>& combo, int start) {
        if (remain == 0) {
            res.push_back(combo);
            return;
        }
        if (remain < 0) return;

        for (int i = start; i < candidates.size(); i++) {
            combo.push_back(candidates[i]);
            backtrack(candidates, remain - candidates[i], res, combo, i);
            combo.pop_back();
        }
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript 解法
// 使用回溯法来生成所有符合条件的组合
var combinationSum = function(candidates, target) {
    const res = [];

    const backtrack = (remain, combo, start) => {
        if (remain === 0) {
            res.push([...combo]);
            return;
        } else if (remain < 0) {
            return;
        }

        for (let i = start; i < candidates.length; i++) {
            combo.push(candidates[i]);
            backtrack(remain - candidates[i], combo, i);
            combo.pop();
        }
    };

    backtrack(target, [], 0);
    return res;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java 解法
import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(res, new ArrayList<>(), candidates, target, 0);
        return res;
    }

    private void backtrack(List<List<Integer>> res, List<Integer> combo, int[] candidates, int remain, int start) {
        if (remain == 0) {
            res.add(new ArrayList<>(combo));
            return;
        } else if (remain < 0) {
            return;
        }

        for (int i = start; i < candidates.length; i++) {
            combo.add(candidates[i]);
            backtrack(res, combo, candidates, remain - candidates[i], i);
            combo.remove(combo.size() - 1);
        }
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(2^t \cdot k)$，其中 $t$ 是目标和 $target$，$k$ 是候选数组的平均长度。由于候选元素数量有限，我们总共最多有 $2^t$ 种组合。
- 空间复杂度：$O(t)$，在递归过程中，栈深度最坏情况下会达到与目标和 $target$ 成比例的深度。
