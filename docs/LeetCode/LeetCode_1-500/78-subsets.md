---
sidebar_position: 78
tags:
  - array
  - backtracking
  - bit-manipulation
  - Medium
---

# 78.子集

标签: `array`, `backtracking`, `bit-manipulation`

难度: Medium

通过率: 79.78%

原题链接: https://leetcode.com/problems/subsets/description/

## 题目描述
给定一个由唯一元素组成的整数数组 $nums$，返回所有可能的子集（幂集）。解集不能包含重复的子集。返回解集的顺序可以是任意的。

## 解题思路
要得到一个集合的所有子集，可以使用回溯法或者位运算来解决。**回溯法**是一种常用的全排列、组合或者子集问题的求解方法：

1. 初始化一个空数组来存储结果。
2. 使用递归函数来遍历原数组，每次递归选择是否把当前元素加入当前子集中。
3. 递归终止的条件是遍历完所有元素。
4. 每次递归都保存当前子集到结果数组。
5. 最后返回结果数组。

**位运算方法**：

每个数有两种状态：在子集中或不在子集中，对于一个有$n$个元素的数组来说，总共有$2^n$种子集，每一个子集可以用一个长度为$n$的二进制数来表示，选择1表明在子集中，0表明不在子集中，因此:

1. 枚举从$0$到$2^n-1$的所有数。
2. 对于每个数，将其二进制表示的位作为是否选择对应数组元素的标志。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def subsets(nums):
    result = []  # 存放所有子集
    subset = []  # 当前递归路径对应的子集
    
    def backtrack(start):
        # 每次递归都记录当前子集
        result.append(subset.copy())
        for i in range(start, len(nums)):
            # 选择当前数
            subset.append(nums[i])
            # 递归产生下一个子集
            backtrack(i + 1)
            # 回溯前恢复状态
            subset.pop()
    
    backtrack(0)
    return result

# 测试
print(subsets([1, 2, 3]))
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> result;
        vector<int> subset;
        function<void(int)> backtrack = [&](int start) {
            // 在结果集中记录当前子集
            result.push_back(subset);
            for (int i = start; i < nums.size(); i++) {
                // 选择当前元素
                subset.push_back(nums[i]);
                // 递归产生下一个子集
                backtrack(i + 1);
                // 回溯前恢复状态
                subset.pop_back();
            }
        };
        backtrack(0);
        return result;
    }
};

// 测试
// Solution().subsets(vector<int>{1, 2, 3});
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function subsets(nums) {
    const result = [];
    const subset = [];

    const backtrack = (start) => {
        result.push([...subset]);
        for (let i = start; i < nums.length; i++) {
            subset.push(nums[i]);
            backtrack(i + 1);
            subset.pop();
        }
    };

    backtrack(0);
    return result;
}

// 测试
console.log(subsets([1, 2, 3]));
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.ArrayList;
import java.util.List;

class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> subset = new ArrayList<>();
        backtrack(0, nums, subset, result);
        return result;
    }

    private void backtrack(int start, int[] nums, List<Integer> subset, List<List<Integer>> result) {
        result.add(new ArrayList<>(subset)); // 记录当前子集
        for (int i = start; i < nums.length; i++) {
            subset.add(nums[i]); // 选择当前元素
            backtrack(i + 1, nums, subset, result); // 递归产生下一个子集
            subset.remove(subset.size() - 1); // 回溯前恢复状态
        }
    }

    // 测试
    // new Solution().subsets(new int[]{1, 2, 3});
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(2^n \cdot n)$，其中$n$是数组的长度，每个子集的生成涉及复制和递归。
空间复杂度：$O(n)$，递归栈的深度和中间变量存储所需的空间。
