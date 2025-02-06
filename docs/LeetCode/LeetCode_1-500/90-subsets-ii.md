---
sidebar_position: 90
tags:
  - backtracking
  - Medium
---

# 90.子集 II

标签: `backtracking`

难度: Medium

通过率: 58.5%

原题链接: https://leetcode.com/problems/subsets-ii/description/

## 题目描述
给定一个可能包含重复数字的整数数组 nums，返回所有可能的子集（幂集）。解集不能包含重复的子集。以任意顺序返回解集。

## 解题思路
我们需要找到包含重复数字的数组的所有可能子集并且确保没有重复的子集。一个有效的方法是首先对数组进行排序，这样相同的数字会被放在一起。然后使用回溯算法生成子集，并在生成过程中跳过生成相同子集的情况。具体来说：

1. 对数组进行排序。
2. 使用回溯法递归地生成子集，在递归过程中跟进一个当前子集的路径。
3. 每次递归调用开始时，都将现有路径加入到结果集中。
4. 对于每个位置的数字，这个位置可以选择加入路径或不加入到路径中，然后对未处理的部分递归寻找。
5. 为了避免重复子集的产生，在遍历数列时如果当前数字与前一个数字相同且前一个数字尚未被处理（即，在本轮路径的起点，我们没有选择这个数），则跳过这个数字。
6. 结束条件是访问到数组的末尾。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def subsetsWithDup(nums):
    # 对数组进行排序
    nums.sort()
    result = []
    # 回溯法起始
    def backtrack(start, path):
        # 将当前的路径加入结果集
        result.append(path)
        # 从当前位置开始向后遍历剩余的数
        for i in range(start, len(nums)):
            # 如果当前数字和前一个数字相同，跳过以避免重复
            if i > start and nums[i] == nums[i - 1]:
                continue
            # 选择当前数字，递归到下一层
            backtrack(i + 1, path + [nums[i]])
    # 开始回溯
    backtrack(0, [])
    return result

# 示例用法
nums = [1, 2, 2]
print(subsetsWithDup(nums))  # 输出：[[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
vector<vector<int>> subsetsWithDup(vector<int>& nums) {
    // 对数组进行排序
    sort(nums.begin(), nums.end());
    vector<vector<int>> result;
    vector<int> path;
    // 回溯法起始
    function<void(int)> backtrack = [&](int start) {
        // 将当前的路径加入结果集
        result.push_back(path);
        // 从当前位置开始向后遍历剩余的数
        for (int i = start; i < nums.size(); ++i) {
            // 如果当前数字和前一个数字相同，跳过以避免重复
            if (i > start && nums[i] == nums[i - 1])
                continue;
            // 选择当前数字，递归到下一层
            path.push_back(nums[i]);
            backtrack(i + 1);
            path.pop_back();
        }
    };
    // 开始回溯
    backtrack(0);
    return result;
}

// 示例用法
// vector<int> nums = {1, 2, 2};
// auto result = subsetsWithDup(nums);
// 结果：[[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function subsetsWithDup(nums) {
    // 对数组进行排序
    nums.sort((a, b) => a - b);
    const result = [];

    function backtrack(start, path) {
        // 将当前路径加入结果中
        result.push([...path]);
        // 从当前位置开始，向后遍历剩余的数
        for (let i = start; i < nums.length; i++) {
            // 如果当前数字和前一个数字相同，跳过以避免重复
            if (i > start && nums[i] === nums[i - 1]) continue;
            // 选择当前数字，递归到下一层
            path.push(nums[i]);
            backtrack(i + 1, path);
            path.pop();
        }
    }
    // 开始回溯
    backtrack(0, []);
    return result;
}

// 示例用法
// const nums = [1, 2, 2];
// console.log(subsetsWithDup(nums)); // 输出：[[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        // 对数组进行排序
        Arrays.sort(nums);
        List<List<Integer>> result = new ArrayList<>();
        // 开始回溯算法
        backtrack(result, new ArrayList<>(), nums, 0);
        return result;
    }
    
    private void backtrack(List<List<Integer>> result, List<Integer> path, int[] nums, int start) {
        // 将当前的路径加入结果集
        result.add(new ArrayList<>(path));
        // 从当前位置开始向后遍历剩余的数
        for (int i = start; i < nums.length; i++) {
            // 如果当前数字和前一个数字相同，跳过以避免重复
            if (i > start && nums[i] == nums[i - 1]) continue;
            // 选择当前数字
            path.add(nums[i]);
            backtrack(result, path, nums, i + 1);
            // 回溯
            path.remove(path.size() - 1);
        }
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums = {1, 2, 2};
        System.out.println(sol.subsetsWithDup(nums));  // 输出：[[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(2^n \cdot n)$，其中$n$是数组的大小。产生每个子集的过程中可能需要$O(n)$的时间来处理。由于有重复数字，理论上会生成$2^n$个子集。`空间复杂度：$O(2^n \cdot n)$，用于存储所有子集的空间，以及递归调用栈空间。
