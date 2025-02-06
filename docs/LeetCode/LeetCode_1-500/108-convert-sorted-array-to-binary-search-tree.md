---
sidebar_position: 108
tags:
  - binary-search-tree
  - divide-and-conquer
  - tree
  - Easy
---

# 108.将有序数组转换为二叉搜索树

标签: `binary-search-tree`, `divide-and-conquer`, `tree`

难度: Easy

通过率: 73.14%

原题链接: https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/description/

## 题目描述
给定一个整数数组 `nums` ，其中元素已经按升序排列，将其转换为一棵高度平衡的二叉搜索树。

## 解题思路
要将一个有序数组转换为高度平衡的二叉搜索树，可以使用递归的方式。考虑到中序遍历二叉搜索树会得到一个有序序列，我们可以选择中间的元素作为根节点，这样左右子树的高度差最小，保证了树的平衡性。递归地对左右两侧的子数组构建子树。具体步骤如下：

1. 找到数组的中间索引，将其中间元素作为当前子树的根节点。
2. 递归地对中间元素左侧的子数组创建左子树。
3. 递归地对中间元素右侧的子数组创建右子树。
4. 通过递归的方式，直到数组的分区为空，逐步构建整棵树。

通过这样的分治法不断地将问题规模减半，最终得到的即为要求的高度平衡的二叉搜索树。

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

class Solution:
    def sortedArrayToBST(self, nums):
        if not nums:
            return None
        # 找到中间索引
        mid = len(nums) // 2
        # 创建根节点
        root = TreeNode(nums[mid])
        # 递归创建左子树和右子树
        root.left = self.sortedArrayToBST(nums[:mid])
        root.right = self.sortedArrayToBST(nums[mid+1:])
        return root
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

class Solution {
public:
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        return helper(nums, 0, nums.size() - 1);
    }
    
    TreeNode* helper(vector<int>& nums, int left, int right) {
        if (left > right) return nullptr;
        // 找到中间索引
        int mid = left + (right - left) / 2;
        TreeNode* node = new TreeNode(nums[mid]);
        // 递归创建左子树和右子树
        node->left = helper(nums, left, mid - 1);
        node->right = helper(nums, mid + 1, right);
        return node;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
var sortedArrayToBST = function(nums) {
    if (nums.length === 0) return null;

    function helper(left, right) {
        if (left > right) return null;
        // 找到中间索引
        let mid = Math.floor((left + right) / 2);
        // 创建根节点
        let node = new TreeNode(nums[mid]);
        // 递归创建左子树和右子树
        node.left = helper(left, mid - 1);
        node.right = helper(mid + 1, right);
        return node;
    }

    return helper(0, nums.length - 1);
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class TreeNode {
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

class Solution {
    public TreeNode sortedArrayToBST(int[] nums) {
        return helper(nums, 0, nums.length - 1);
    }

    private TreeNode helper(int[] nums, int left, int right) {
        if (left > right) return null;
        // 找到中间索引
        int mid = left + (right - left) / 2;
        TreeNode node = new TreeNode(nums[mid]);
        // 递归创建左子树和右子树
        node.left = helper(nums, left, mid - 1);
        node.right = helper(nums, mid + 1, right);
        return node;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度: $O(n)$，其中 $n$ 是数组的长度，因为我们遍历了所有元素。
- 空间复杂度: $O(\log n)$，由于递归深度为 $\log n$ 。
