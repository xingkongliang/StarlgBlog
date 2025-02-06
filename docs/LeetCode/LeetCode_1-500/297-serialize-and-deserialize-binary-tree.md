---
sidebar_position: 297
tags:
  - tree
  - design
  - Hard
---

# 297.序列化与反序列化二叉树

标签: `tree`, `design`

难度: Hard

通过率: 57.95%

原题链接: https://leetcode.com/problems/serialize-and-deserialize-binary-tree/description/

## 题目描述
设计一个算法来序列化和反序列化二叉树。没有限制应该如何进行序列化和反序列化，只需确保一种表达格式可以被恢复成同样的树结构即可。

## 解题思路
要解决这个问题，可以使用二叉树的前序遍历来进行序列化和反序列化。具体实现如下：

1. **序列化**：
   - 使用递归或者迭代方法进行前序遍历。
   - 如果遇到一个节点，用它的值添加到结果序列中。
   - 如果遇到一个空节点，使用一个特定字符（例如`#`）来表示它。
   - 不同节点间用逗号分隔。

2. **反序列化**：
   - 根据序列化生成的字符串，使用分隔符分割成一个列表。
   - 使用递归方法，从列表头部依次取元素。
   - 如果取出的元素是数字，则构建节点，并递归构建左右子树。
   - 如果取出的元素是特定字符（表示空节点），则返回`null`。

通过这种方法，能够保证序列化后的字符串能够正确地被反序列化回原来的二叉树结构。

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

class Codec:

    def serialize(self, root):
        # 使用先序遍历的方式来序列化二叉树
        def preorder(node):
            if not node:
                return ['#']  # 空节点用`#`表示
            # 当前节点值 + 左子树 + 右子树
            return [str(node.val)] + preorder(node.left) + preorder(node.right)
        return ','.join(preorder(root))

    def deserialize(self, data):
        # 将字符串数据转回列表
        values = data.split(',')

        def build():
            val = values.pop(0)
            if val == '#':
                return None  # 用`#`表示空节点
            node = TreeNode(int(val))
            node.left = build()
            node.right = build()
            return node

        return build()
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class TreeNode {
public:
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Codec {
public:

    // 使用先序遍历序列化二叉树
    string serialize(TreeNode* root) {
        if (!root) return "#";
        return to_string(root->val) + "," + serialize(root->left) + "," + serialize(root->right);
    }

    // 将字符串数据反序列化成二叉树
    TreeNode* deserialize(string data) {
        queue<string> nodes;
        string val;
        for (char ch : data) {
            if (ch == ',') {
                nodes.push(val);
                val.clear();
            } else {
                val.push_back(ch);
            }
        }
        if (!val.empty()) nodes.push(val);
        return build(nodes);
    }

private:

    TreeNode* build(queue<string>& nodes) {
        if (nodes.empty()) return nullptr;
        string val = nodes.front(); nodes.pop();
        if (val == "#") return nullptr;
        TreeNode* node = new TreeNode(stoi(val));
        node->left = build(nodes);
        node->right = build(nodes);
        return node;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Codec {
    // 使用先序遍历序列化二叉树
    serialize(root) {
        const preorder = (node) => {
            if (!node) return ['#']; // 使用`#`表示空节点
            return [node.val.toString(), ...preorder(node.left), ...preorder(node.right)];
        };
        return preorder(root).join(',');
    }

    // 将字符串数据反序列化成二叉树
    deserialize(data) {
        const values = data.split(',');
        const build = () => {
            if (values.length === 0) return null;
            const val = values.shift();
            if (val === '#') return null;
            const node = new TreeNode(parseInt(val));
            node.left = build();
            node.right = build();
            return node;
        };
        return build();
    }
}
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

public class Codec {

    // Encodes a tree to a single string.
    public String serialize(TreeNode root) {
        if (root == null) return "#";
        return root.val + "," + serialize(root.left) + "," + serialize(root.right);
    }

    // Decodes your encoded data to tree.
    public TreeNode deserialize(String data) {
        List<String> values = new LinkedList<>(Arrays.asList(data.split(",")));
        return build(values);
    }

    private TreeNode build(List<String> values) {
        if (values.isEmpty()) return null;
        String val = values.remove(0);
        if (val.equals("#")) return null;
        TreeNode node = new TreeNode(Integer.parseInt(val));
        node.left = build(values);
        node.right = build(values);
        return node;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
序列化和反序列化的时间复杂度都是 $O(n)$，其中 $n$ 是树中节点的数量，因为每个节点都被访问了一次。  
  
空间复杂度同样是 $O(n)$，因为用于存储结果字符串或递归过程中生成的堆栈数据数量与节点数量成正比。
