---
sidebar_position: 46
tags:
  - backtracking
  - array
  - Medium
---

# 46.全排列

标签: `backtracking`, `array`

难度: Medium

通过率: 79.73%

原题链接: https://leetcode.com/problems/permutations/description/

## 题目描述
给定一个由不重复整数构成的数组 `nums`，返回其所有可能的全排列。可以按任意顺序返回答案。

## 解题思路
全排列问题的典型解决方法是回溯法。回溯法通过递归地构造排列，依次探索每种可能的情况，并且在每种情况中选择一个下一个数字，然后继续构建。具体步骤如下：

1. 创建一个结果列表 `result` 用来存储所有完整的排列。
2. 创建一个当前排列列表 `path`，在递归过程中追踪当前的排列。
3. 使用一个布尔数组 `used` 来记录当前递归路径中哪些数字已经被使用。
4. 在每次递归调用中，遍历 `nums` 数组的每一个数字：
   - 如果该数字尚未被使用（即 `used[i]` 为 `False`），则：
     - 将该数字添加入当前排列列表 `path`。
     - 标记该数字为已使用，即 `used[i] = True`。
     - 递归调用以继续探索下一个数字。
     - 取消标记该数字为已使用，即 `used[i] = False`，并从当前排列列表中移除该数字以回溯。
5. 当排列的长度等于 `nums` 的长度时，将完整的排列加入结果列表 `result`。
6. 重复上述步骤直到遍历完所有可能的排列。

该方法通过递归遍历并构建所有可能的排列，同时确保不重复使用元素，直至生成所有的全排列。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def permute(nums):
    # 结果列表
    result = []
    
    # 回溯辅助函数
    def backtrack(path, used):
        # 如果路径长度等于nums的长度，说明找到一个完整的排列
        if len(path) == len(nums):
            result.append(path[:])  # 添加该排列到结果中
            return
        # 遍历nums中所有的数字
        for i in range(len(nums)):
            # 如果数字nums[i]未被使用
            if not used[i]:
                # 将nums[i]添加到当前排列路径中
                path.append(nums[i])
                used[i] = True  # 标记为已使用
                backtrack(path, used)  # 递归调用
                # 回溯
                path.pop()
                used[i] = False
    
    backtrack([], [False] * len(nums))
    return result

# 示例用法
nums = [1, 2, 3]
print(permute(nums))
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    // Helper function for backtracking
    void backtrack(vector<int>& nums, vector<bool>& used, vector<int>& path, vector<vector<int>>& result) {
        if (path.size() == nums.size()) {
            result.push_back(path); // Found a full permutation
            return;
        }
        for (int i = 0; i < nums.size(); ++i) {
            if (!used[i]) {  // If nums[i] is not used
                path.push_back(nums[i]); // Add nums[i] to current path
                used[i] = true;  // Mark it as used
                backtrack(nums, used, path, result); // Recursively explore further
                path.pop_back(); // Backtrack
                used[i] = false; // Unmark it
            }
        }
    }
    
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> result;
        vector<int> path;
        vector<bool> used(nums.size(), false);
        backtrack(nums, used, path, result);
        return result;
    }
};

// 示例用法
int main() {
    Solution sol;
    vector<int> nums = {1, 2, 3};
    auto res = sol.permute(nums);
    for (const auto& perm : res) {
        for (int num : perm) {
            cout << num << " ";
        }
        cout << endl;
    }
    return 0;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function permute(nums) {
    // 结果数组
    const result = [];
    // 回溯函数
    function backtrack(path, used) {
        if (path.length === nums.length) {
            result.push([...path]); // 找到一个完整的排列
            return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (!used[i]) { // 如果nums[i]未被使用
                path.push(nums[i]); // 添加到路径中
                used[i] = true; // 标记为已使用
                backtrack(path, used); // 递归调用
                path.pop(); // 回溯
                used[i] = false; // 撤销标记
            }
        }
    }
    backtrack([], Array(nums.length).fill(false));
    return result;
}

// 示例用法
const nums = [1, 2, 3];
console.log(permute(nums));
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>(); // 结果列表
        List<Integer> path = new ArrayList<>(); // 当前排列路径
        boolean[] used = new boolean[nums.length]; // 标记使用情况
        backtrack(nums, used, path, result);
        return result;
    }
    
    // 回溯辅助方法
    private void backtrack(int[] nums, boolean[] used, List<Integer> path, List<List<Integer>> result) {
        if (path.size() == nums.length) {
            result.add(new ArrayList<>(path)); // 找到一个完整的排列
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (!used[i]) { // 如果nums[i]未被使用
                path.add(nums[i]); // 加入路径
                used[i] = true; // 标记为已使用
                backtrack(nums, used, path, result); // 递归调用
                path.remove(path.size() - 1); // 回溯
                used[i] = false; // 撤销标记
            }
        }
    }

    // 示例用法
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums = {1, 2, 3};
        List<List<Integer>> res = sol.permute(nums);
        for (List<Integer> perm : res) {
            System.out.println(perm);
        }
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n! \times n)$，其中 $n$ 是数组的长度，因为我们需要生成 $n!$ 个排列，每个排列的平均构建时间为 $O(n)$。
空间复杂度：$O(n)$，用于递归栈和标记数组 `used` 的空间。
