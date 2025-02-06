---
sidebar_position: 47
tags:
  - array
  - backtracking
  - Medium
---

# 47.全排列 II

标签: `array`, `backtracking`

难度: Medium

通过率: 60.56%

原题链接: https://leetcode.com/problems/permutations-ii/description/

## 题目描述
给定一个可能包含重复元素的数字集合 `nums`，返回所有唯一的排列。

## 解题思路
要生成一个可能包含重复数字的数组的所有唯一排列，可以使用回溯算法。在生成排列时，为了避免生成重复的排列，可以对数组进行排序，并在回溯中跳过重复元素。这是通过以下步骤实现的：

1. **排序**：对数组进行排序，以便相同的元素靠在一起。

2. **回溯**：使用一个列表 `current` 来存储当前排列，一个布尔数组 `visited` 用于跟踪哪些元素已经被使用。递归地进行搜索。

3. **跳过重复**：在递归过程中，对于每一个新元素，如果它与前一个元素相同并且前一个元素没有被使用，说明这是一个重复的排列，跳过这种选择。

4. 递归出口是当 `current` 列表的长度与 `nums` 相同时，将其加入到答案列表 `result` 中。这意味着已经生成了一个完整的排列。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def permuteUnique(nums):
    # 排序使得重复元素相邻，以便于后面的去重
    nums.sort()
    result = []
    # 记录某个元素是否已经在当前排列中使用
    visited = [False] * len(nums)
    
    def backtrack(current):
        # 如果当前排列的长度与nums相同，记录结果
        if len(current) == len(nums):
            result.append(current[:])
            return
        
        for i in range(len(nums)):
            # 如果当前元素已经被使用，跳过
            if visited[i]:
                continue
            # 去除重复：当前元素与前一个元素相同且前一个未被使用
            if i > 0 and nums[i] == nums[i-1] and not visited[i-1]:
                continue
            # 做选择
            visited[i] = True
            current.append(nums[i])
            # 回溯递归
            backtrack(current)
            # 撤销选择
            visited[i] = False
            current.pop()
    
    backtrack([])
    return result

# 测试示例
print(permuteUnique([1, 1, 2]))
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++ 版本
#include <vector>
#include <algorithm>

using namespace std;

vector<vector<int>> permuteUnique(vector<int>& nums) {
    vector<vector<int>> result;
    vector<int> current;
    vector<bool> visited(nums.size(), false);
    
    sort(nums.begin(), nums.end()); // 排序
    
    function<void()> backtrack = [&]() {
        if (current.size() == nums.size()) {
            result.push_back(current);
            return;
        }
        for (int i = 0; i < nums.size(); ++i) {
            if (visited[i] || (i > 0 && nums[i] == nums[i - 1] && !visited[i - 1]))
                continue;
            visited[i] = true;
            current.push_back(nums[i]);
            backtrack();
            visited[i] = false;
            current.pop_back();
        }
    };
    backtrack();
    return result;
}

// 测试示例
// vector<int> nums = {1, 1, 2};
// auto result = permuteUnique(nums);
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript 版本
function permuteUnique(nums) {
    nums.sort((a, b) => a - b); // 排序
    const result = [];
    const visited = Array(nums.length).fill(false);

    function backtrack(current) {
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (visited[i]) continue;
            if (i > 0 && nums[i] === nums[i - 1] && !visited[i - 1]) continue;
            visited[i] = true;
            current.push(nums[i]);
            backtrack(current);
            visited[i] = false;
            current.pop();
        }
    }
    backtrack([]);
    return result;
}

// 测试示例
// console.log(permuteUnique([1, 1, 2]));
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java 版本
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class PermutationsII {
    public List<List<Integer>> permuteUnique(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(nums); // 排序
        backtrack(nums, new boolean[nums.length], new ArrayList<>(), result);
        return result;
    }

    private void backtrack(int[] nums, boolean[] visited, List<Integer> current, List<List<Integer>> result) {
        if (current.size() == nums.length) {
            result.add(new ArrayList<>(current));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (visited[i] || (i > 0 && nums[i] == nums[i - 1] && !visited[i - 1]))
                continue;
            visited[i] = true;
            current.add(nums[i]);
            backtrack(nums, visited, current, result);
            visited[i] = false;
            current.remove(current.size() - 1);
        }
    }

    // 测试示例
    // public static void main(String[] args) {
    //     PermutationsII obj = new PermutationsII();
    //     int[] nums = {1, 1, 2};
    //     List<List<Integer>> result = obj.permuteUnique(nums);
    //     System.out.println(result);
    // }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n \times n!)$，其中 $n$ 是数组的长度。这是因为一共有 $n!$ 个不同的排列组合，每一个排列组合都需要 $O(n)$ 的时间来生成。
空间复杂度：$O(n)$。递归栈使用的空间为 $O(n)$，`visited` 数组和 `current` 使用的空间也是 $O(n)$。
