---
sidebar_position: 437
tags:
  - tree
  - depth-first-search
  - Medium
---

# 437.路径总和 III

标签: `tree`, `depth-first-search`

难度: Medium

通过率: 46.05%

原题链接: https://leetcode.com/problems/path-sum-iii/description/

## 题目描述
给定一个二叉树的根节点和一个整数目标和targetSum，返回路径中节点值总和等于targetSum的路径数量。路径不需要从根节点开始或结束，但必须在向下的父节点到子节点的方向上。

## 解题思路
我们需要找到从某个节点开始往下的所有路径中，路径节点值的和等于给定目标和targetSum的路径数量。为此，我们可以采用深度优先搜索（DFS），来枚举所有可能的路径，并统计满足要求的路径。具体步骤如下：

1. 遍历树的每个节点，对于每个节点，我们计算包含该节点在内的所有向下路径和。
2. 在处理每个节点时，用一个前缀和的哈希表来记录路径上各节点的和，注意初始化当前路径和为0，并把当前路径和加入到表中。
3. 递归到其子节点，并在子节点返回后，清理路径和表，以便不影响之后的计算。
4. 如果在路径上找到了满足条件的和（路径和减去targetSum的和出现在前缀和表中），则路径数量增加相应的次数。
5. 返回总的路径数量。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# 使用深度优先搜索的方法来查找路径数，使用前缀和
class Solution:
    def pathSum(self, root: TreeNode, targetSum: int) -> int:
        # 定义一个帮助函数，进行dfs 
        def dfs(node, current_sum):
            nonlocal count
            if not node: return
            # 更新当前路径和
            current_sum += node.val
            
            # 检查是否有从路径开头到当前节点的路径和等于targetSum
            if current_sum - targetSum in prefix_sums:
                count += prefix_sums[current_sum - targetSum]
            
            # 更新路径和计数
            prefix_sums[current_sum] = prefix_sums.get(current_sum, 0) + 1
            
            # 继续搜索子节点
            dfs(node.left, current_sum)
            dfs(node.right, current_sum)
            
            # 回溯，清理路径和记录
            prefix_sums[current_sum] -= 1
            
        count = 0
        prefix_sums = {0: 1}  # 初始化，路径和为0时计为1
        dfs(root, 0)
        return count
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

// 使用深度优先搜索的方法来查找路径数，使用前缀和
class Solution {
public:
    int pathSum(TreeNode* root, int targetSum) {
        unordered_map<long long, int> prefix_sums = {{0, 1}};
        return dfs(root, 0, targetSum, prefix_sums);
    }

private:
    int dfs(TreeNode* node, long long current_sum, int targetSum, unordered_map<long long, int>& prefix_sums) {
        if (!node) return 0;
        
        current_sum += node->val;
        int count = prefix_sums[current_sum - targetSum];
        
        prefix_sums[current_sum]++;
        count += dfs(node->left, current_sum, targetSum, prefix_sums);
        count += dfs(node->right, current_sum, targetSum, prefix_sums);
        prefix_sums[current_sum]--;
        
        return count;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

// 使用深度优先搜索的方法来查找路径数，使用前缀和
var pathSum = function(root, targetSum) {
    let count = 0;
    let prefix_sums = {0: 1};

    const dfs = (node, current_sum) => {
        if (!node) return;

        current_sum += node.val;

        if (prefix_sums[current_sum - targetSum] !== undefined) {
            count += prefix_sums[current_sum - targetSum];
        }

        prefix_sums[current_sum] = (prefix_sums[current_sum] || 0) + 1;

        dfs(node.left, current_sum);
        dfs(node.right, current_sum);

        prefix_sums[current_sum]--;
    };

    dfs(root, 0);

    return count;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

// 使用深度优先搜索的方法来查找路径数，使用前缀和
class Solution {
    public int pathSum(TreeNode root, int targetSum) {
        Map<Long, Integer> prefix_sums = new HashMap<>();
        prefix_sums.put(0L, 1);
        return dfs(root, 0, targetSum, prefix_sums);
    }

    private int dfs(TreeNode node, long current_sum, int targetSum, Map<Long, Integer> prefix_sums) {
        if (node == null) {
            return 0;
        }
        current_sum += node.val;
        int count = prefix_sums.getOrDefault(current_sum - targetSum, 0);

        prefix_sums.put(current_sum, prefix_sums.getOrDefault(current_sum, 0) + 1);
        count += dfs(node.left, current_sum, targetSum, prefix_sums);
        count += dfs(node.right, current_sum, targetSum, prefix_sums);
        prefix_sums.put(current_sum, prefix_sums.get(current_sum) - 1);

        return count;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 是树中节点的数量。每个节点被访问一次。  
  
空间复杂度为 $O(h)$，其中 $h$ 是树的高度。递归栈的深度不得超过树的高度，此外，前缀和表空间的最大消耗也同样是 $O(h)$。
