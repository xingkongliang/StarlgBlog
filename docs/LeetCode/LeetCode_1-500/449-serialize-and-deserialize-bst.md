---
sidebar_position: 449
tags:
  - tree
  - design
  - Medium
---

# 449.序列化和反序列化二叉搜索树

标签: `tree`, `design`

难度: Medium

通过率: 58.15%

原题链接: https://leetcode.com/problems/serialize-and-deserialize-bst/description/

## 题目描述
设计一个算法来序列化和反序列化一个二叉搜索树。序列化是将数据结构或对象转换为可以存储或传输的比特序列的过程，反序列化是将序列转换回原始数据结构的过程。

## 解题思路
为了序列化二叉搜索树，我们可以利用它的中序遍历性质——左子树节点值小于根节点，右子树节点值大于根节点。假设我们使用前序遍历的方式来序列化树，因为前序遍历首先访问根节点，然后是左子树，最后是右子树，这样序列化字符串自然就能在反序列化时递归地重建树。`\n`
`\n`序列化时：
- 如果当前节点为空，返回空字符串。
- 否则，访问当前节点，将它的值加入序列化结果。
- 递归访问左子树和右子树，将结果依次拼接。`\n`
`\n`反序列化时：
- 将字符串分割为节点列表。
- 利用前序遍历特性，递归生成二叉搜索树，保证左子树节点小于当前节点，右子树节点大于当前节点。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class Codec:    
    def serialize(self, root):
        """Encodes a tree to a single string."""
        # 使用前序遍历（前序遍历）
        def preorder(node):
            return [str(node.val)] + preorder(node.left) + preorder(node.right) if node else []
        
        return ' '.join(preorder(root))

    def deserialize(self, data):
        """Decodes your encoded data to tree."""
        # 使用迭代器
        def build_tree(iterator, min_val, max_val):
            if iterator and (min_val < iterator[0] < max_val):
                val = iterator.pop(0)
                node = TreeNode(val)
                node.left = build_tree(iterator, min_val, val)
                node.right = build_tree(iterator, val, max_val)
                return node
            return None

        # 使用map(int, data.split()) 来转换字符串为整数
        return build_tree(list(map(int, data.split())), float('-inf'), float('inf'))
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Codec {
public:
    
    // 序列化函数
    string serialize(TreeNode* root) {
        vector<int> nums;
        preorder(root, nums);
        string data;
        // 将遍历结果转换为字符串
        for (int num : nums) {
            data += to_string(num) + " ";
        }
        return data;
    }

    // 反序列化函数
    TreeNode* deserialize(string data) {
        vector<int> nums;
        stringstream ss(data);
        string temp;
        // 将字符串转换为整数列表
        while (ss >> temp) {
            nums.push_back(stoi(temp));
        }

        return buildTree(nums, INT_MIN, INT_MAX);
    }

private:
    // 前序遍历序列化
    void preorder(TreeNode* node, vector<int>& nums) {
        if (!node) return;
        nums.push_back(node->val);
        preorder(node->left, nums);
        preorder(node->right, nums);
    }

    // 构建树
    TreeNode* buildTree(vector<int>& nums, int lower, int upper) {
        if (nums.empty() || nums.front() < lower || nums.front() > upper) return nullptr;

        int val = nums.front();
        nums.erase(nums.begin());
        TreeNode* node = new TreeNode(val);
        node->left = buildTree(nums, lower, val);
        node->right = buildTree(nums, val, upper);
        return node;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class Codec {
    
    // 将一颗二叉搜索树序列化为字符串
    serialize(root) {
        return this.preorder(root).join(' ');
    }

    // 辅助方法：前序遍历
    preorder(node) {
        if (!node) return [];
        return [node.val, ...this.preorder(node.left), ...this.preorder(node.right)];
    }

    // 从字符串反序列化为二叉搜索树
    deserialize(data) {
        const nums = data.split(' ').map(Number);
        return this.buildTree(nums, -Infinity, Infinity);
    }

    buildTree(nums, lower, upper) {
        if (!nums.length || nums[0] < lower || nums[0] > upper) return null;
        const val = nums.shift();
        const node = new TreeNode(val);
        node.left = this.buildTree(nums, lower, val);
        node.right = this.buildTree(nums, val, upper);
        return node;
    }
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Codec {
    
    // 序列化函数
    public String serialize(TreeNode root) {
        // 使用StringBuilder比较高效
        StringBuilder sb = new StringBuilder();
        preorderSerialize(root, sb);
        return sb.toString();
    }

    // 前序遍历序列化
    private void preorderSerialize(TreeNode node, StringBuilder sb) {
        if (node == null) return;
        sb.append(node.val).append(" ");
        preorderSerialize(node.left, sb);
        preorderSerialize(node.right, sb);
    }

    // 反序列化函数
    public TreeNode deserialize(String data) {
        String[] values = data.split(" ");
        LinkedList<Integer> nums = new LinkedList<>();
        for (String value : values) {
            if (!value.isEmpty()) {
                nums.add(Integer.parseInt(value));
            }
        }
        return buildTree(nums, Integer.MIN_VALUE, Integer.MAX_VALUE);
    }

    // 根据数值构建搜索树
    private TreeNode buildTree(LinkedList<Integer> nums, int lower, int upper) {
        if (nums.isEmpty() || nums.getFirst() < lower || nums.getFirst() > upper) return null;
        int val = nums.removeFirst();
        TreeNode node = new TreeNode(val);
        node.left = buildTree(nums, lower, val);
        node.right = buildTree(nums, val, upper);
        return node;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度**：序列化和反序列化的时间复杂度均为 $O(n)$，其中 $n$ 是树中的节点数。每个节点被访问一次。  
  
**空间复杂度**：由于递归的调用栈深度为 $O(h)$，其中 $h$ 是树的高度，因此空间复杂度也为 $O(n)$，因为在最坏情况下（例如链表形式的树） $h = n$.
