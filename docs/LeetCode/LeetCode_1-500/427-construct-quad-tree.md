---
sidebar_position: 427
tags:
  - tree
  - divide-and-conquer
  - depth-first-search
  - Medium
---

# 427.构造四叉树

标签: `tree`, `divide-and-conquer`, `depth-first-search`

难度: Medium

通过率: 76.32%

原题链接: https://leetcode.com/problems/construct-quad-tree/description/

## 题目描述
给你一个只包含0和1的n*n矩阵grid，想要用四叉树来表示grid。返回表示grid的四叉树的根节点。四叉树是一种树形数据结构，每个内部节点正好有四个子节点。此外，每个节点有两个属性：`val`和`isLeaf`。如果节点表示的网格全是1，则`val`为True；如果全是0，则`val`为False。无论`isLeaf`如何，只要节点值相同，都可以接受。在部分值不同的情况下，`isLeaf`为False，将当前网格划分为四个子网格，然后对每个子网格递归。

## 解题思路
要构建四叉树，我们可以使用递归方法。对于给定的网格，如果所有的值相同（即全是0或全是1），则说明这是一个叶子节点，设置其`isLeaf`为True，`val`为该值，并返回这个节点。否则，我们需要将网格划分为四个子网格，并分别构建四叉树。具体步骤如下：

1. 检查当前子网格的值是否全相同：
   - 如果全相同，创建一个叶子节点，`isLeaf=True`，`val`等于该值。
   - 如果不全相同，创建一个非叶子节点，`isLeaf=False`，`val`可以是True或False（但这不重要），并递归地构建其四个子节点。

2. 对于非叶子节点，将网格划分为四个等大小的子网格：
   - 左上：`grid[x][y]`到`grid[midX-1][midY-1]`
   - 右上：`grid[x][midY]`到`grid[midX-1][endY]`
   - 左下：`grid[midX][y]`到`grid[endX][midY-1]`
   - 右下：`grid[midX][midY]`到`grid[endX][endY]`

3. 递归构建每一个子节点。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# Python解决方案
class Node:
    def __init__(self, val, isLeaf, topLeft, topRight, bottomLeft, bottomRight):
        self.val = val
        self.isLeaf = isLeaf
        self.topLeft = topLeft
        self.topRight = topRight
        self.bottomLeft = bottomLeft
        self.bottomRight = bottomRight

class Solution:
    def construct(self, grid):
        def isLeaf(x, y, length):
            """
            检查这个子网格是否是一个叶子节点
            """
            val = grid[x][y]
            for i in range(x, x + length):
                for j in range(y, y + length):
                    if grid[i][j] != val:
                        return False, None
            return True, val

        def build(x, y, length):
            """
            递归构建四叉树
            """
            leaf, val = isLeaf(x, y, length)
            if leaf:
                return Node(val == 1, True, None, None, None, None)
            halfLength = length // 2
            return Node(
                True,  # val for non-leaf node does not matter
                False,
                build(x, y, halfLength),
                build(x, y + halfLength, halfLength),
                build(x + halfLength, y, halfLength),
                build(x + halfLength, y + halfLength, halfLength)
            )

        return build(0, 0, len(grid))

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++解决方案
class Node {
public:
    bool val;
    bool isLeaf;
    Node* topLeft;
    Node* topRight;
    Node* bottomLeft;
    Node* bottomRight;
    Node(bool _val, bool _isLeaf) {
        val = _val;
        isLeaf = _isLeaf;
        topLeft = nullptr;
        topRight = nullptr;
        bottomLeft = nullptr;
        bottomRight = nullptr;
    }
};

class Solution {
public:
    Node* construct(vector<vector<int>>& grid) {
        return build(grid, 0, 0, grid.size());
    }

    Node* build(vector<vector<int>>& grid, int x, int y, int length) {
        if (isLeaf(grid, x, y, length)) {
            return new Node(grid[x][y] == 1, true);
        }
        int halfLength = length / 2;
        return new Node(
            true,  // 不重要的val
            false, 
            build(grid, x, y, halfLength),
            build(grid, x, y + halfLength, halfLength),
            build(grid, x + halfLength, y, halfLength),
            build(grid, x + halfLength, y + halfLength, halfLength)
        );
    }

    bool isLeaf(vector<vector<int>>& grid, int x, int y, int length) {
        int val = grid[x][y];
        for (int i = x; i < x + length; ++i) {
            for (int j = y; j < y + length; ++j) {
                if (grid[i][j] != val) return false;
            }
        }
        return true;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript解决方案
class Node {
    constructor(val, isLeaf, topLeft, topRight, bottomLeft, bottomRight) {
        this.val = val;
        this.isLeaf = isLeaf;
        this.topLeft = topLeft;
        this.topRight = topRight;
        this.bottomLeft = bottomLeft;
        this.bottomRight = bottomRight;
    }
}

var construct = function(grid) {
    function isLeaf(x, y, length) {
        const val = grid[x][y];
        for (let i = x; i < x + length; ++i) {
            for (let j = y; j < y + length; ++j) {
                if (grid[i][j] !== val) {
                    return [false, null];
                }
            }
        }
        return [true, val];
    }

    function build(x, y, length) {
        const [leaf, val] = isLeaf(x, y, length);
        if (leaf) {
            return new Node(val === 1, true, null, null, null, null);
        }
        const halfLength = length / 2;
        return new Node(
            true,  // 不重要的val
            false,
            build(x, y, halfLength),
            build(x, y + halfLength, halfLength),
            build(x + halfLength, y, halfLength),
            build(x + halfLength, y + halfLength, halfLength)
        );
    }

    return build(0, 0, grid.length);
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java解决方案
/*
// Definition for a QuadTree node.
class Node {
    public boolean val;
    public boolean isLeaf;
    public Node topLeft;
    public Node topRight;
    public Node bottomLeft;
    public Node bottomRight;
    
    public Node(boolean _val, boolean _isLeaf) {
        val = _val;
        isLeaf = _isLeaf;
        topLeft = null;
        topRight = null;
        bottomLeft = null;
        bottomRight = null;
    }
}
*/
class Solution {
    public Node construct(int[][] grid) {
        return build(grid, 0, 0, grid.length);
    }

    private Node build(int[][] grid, int x, int y, int length) {
        if (isLeaf(grid, x, y, length)) {
            return new Node(grid[x][y] == 1, true);
        }
        int halfLength = length / 2;
        return new Node(
            true,  // 不重要的val
            false, 
            build(grid, x, y, halfLength),
            build(grid, x, y + halfLength, halfLength),
            build(grid, x + halfLength, y, halfLength),
            build(grid, x + halfLength, y + halfLength, halfLength)
        );
    }

    private boolean isLeaf(int[][] grid, int x, int y, int length) {
        int val = grid[x][y];
        for (int i = x; i < x + length; ++i) {
            for (int j = y; j < y + length; ++j) {
                if (grid[i][j] != val) return false;
            }
        }
        return true;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：

在最坏情况下，每个节点会检查整个 $n \times n$ 的子网格，并且每次分裂成四个子节点。
每个检查都是 $O(n^2)$ 时间复杂度，因此整体时间复杂度为 $O(n^2 \log n)$，因为每次将其分解成为大小为 $n/2$ 的子问题。

空间复杂度：

对于递归的深度，最深为 $rac{n}{2}$，因此空间复杂度是 $O(\log n)$。
