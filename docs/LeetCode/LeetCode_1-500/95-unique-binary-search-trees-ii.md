---
sidebar_position: 95
tags:
  - dynamic-programming
  - tree
  - binary-search-tree
  - backtracking
  - Medium
---

# 95.不同的二叉搜索树 II

标签: `dynamic-programming`, `tree`, `binary-search-tree`, `backtracking`

难度: Medium

通过率: 59.27%

原题链接: https://leetcode.com/problems/unique-binary-search-trees-ii/description/

## 题目描述
给定一个整数 $n$，返回所有包含 $1$ 到 $n$ 节点的唯一二叉搜索树（BST）。请按任意顺序返回答案。

## 解题思路
为了生成所有独特的二叉搜索树，我们可以考虑使用递归和回溯的方法。对于一个给定的整数范围 $1, 2, \ldots, n$，选择其中的任何一个整数 $i$ 作为树的根节点，这样左子树可以形成于范围 $1, 2, \ldots, i-1$，右子树形成于范围 $i+1, \ldots, n$。通过递归的方法，我们可以为这两个子范围生成所有可能的子树，然后将每一种左子树和右子树组合，形成以 $i$ 为根的唯一BST。递归终止于子范围为空，此时我们返回`null`来表示树的终止。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def generateTrees(self, n: int) -> List[TreeNode]:
        if n == 0:
            return []

        def build_trees(start, end):
            trees = []
            if start > end:
                trees.append(None)
                return trees
            
            for i in range(start, end + 1):
                # 所有左子树
                left_trees = build_trees(start, i - 1)
                # 所有右子树
                right_trees = build_trees(i + 1, end)
                
                # 将每种左子树和右子树组合
                for left in left_trees:
                    for right in right_trees:
                        root = TreeNode(i)
                        root.left = left
                        root.right = right
                        trees.append(root)
            return trees

        return build_trees(1, n)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++
// 定义二叉树节点类
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

class Solution {
public:
    vector<TreeNode*> generateTrees(int n) {
        if (n == 0) return {};
        return buildTrees(1, n);
    }

private:
    vector<TreeNode*> buildTrees(int start, int end) {
        vector<TreeNode*> trees;
        if (start > end) {
            trees.push_back(nullptr);
            return trees;
        }

        for (int i = start; i <= end; ++i) {
            vector<TreeNode*> leftTrees = buildTrees(start, i - 1);
            vector<TreeNode*> rightTrees = buildTrees(i + 1, end);

            for (auto left : leftTrees) {
                for (auto right : rightTrees) {
                    TreeNode* root = new TreeNode(i);
                    root->left = left;
                    root->right = right;
                    trees.push_back(root);
                }
            }
        }
        return trees;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function(n) {
    if (n === 0) return [];

    const buildTrees = (start, end) => {
        const trees = [];
        if (start > end) {
            trees.push(null);
            return trees;
        }

        for (let i = start; i <= end; i++) {
            const leftTrees = buildTrees(start, i - 1);
            const rightTrees = buildTrees(i + 1, end);

            for (const left of leftTrees) {
                for (const right of rightTrees) {
                    const root = new TreeNode(i);
                    root.left = left;
                    root.right = right;
                    trees.push(root);
                }
            }
        }
        return trees;
    };

    return buildTrees(1, n);
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java
// 定义二叉树节点类
public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}

class Solution {
    public List<TreeNode> generateTrees(int n) {
        if (n == 0) return new ArrayList<>();
        return buildTrees(1, n);
    }
    
    private List<TreeNode> buildTrees(int start, int end) {
        List<TreeNode> trees = new ArrayList<>();
        if (start > end) {
            trees.add(null);
            return trees;
        }

        for (int i = start; i <= end; i++) {
            List<TreeNode> leftTrees = buildTrees(start, i - 1);
            List<TreeNode> rightTrees = buildTrees(i + 1, end);

            for (TreeNode left : leftTrees) {
                for (TreeNode right : rightTrees) {
                    TreeNode root = new TreeNode(i);
                    root.left = left;
                    root.right = right;
                    trees.add(root);
                }
            }
        }

        return trees;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(n \cdot C_n)$，其中 $C_n$ 是卡塔兰数。
- 空间复杂度：$O(n \cdot C_n)$，用于存储中间结果的空间。
