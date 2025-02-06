---
sidebar_position: 109
tags:
  - linked-list
  - tree
  - divide-and-conquer
  - depth-first-search
  - Medium
---

# 109.将有序链表转换为二叉搜索树

标签: `linked-list`, `tree`, `divide-and-conquer`, `depth-first-search`

难度: Medium

通过率: 63.41%

原题链接: https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/description/

## 题目描述
给定一个单链表的头结点，其中的元素按升序排序，将其转换为高度平衡的二叉搜索树。

## 解题思路
这个问题的关键在于从给定的升序链表中创建一个高度平衡的二叉搜索树。所谓高度平衡，指的是每个节点的两个子树的高度差不能超过1。我们可以使用以下方法：

1. **中分法**：链表的中间节点将被用作树的根，递归地在根的左边构建左子树，在根的右边构建右子树。如此操作，可以确保保持树的高度平衡。
2. **双指针法找到中间节点**：使用快慢指针的方法来找到链表的中间节点。慢指针每次走一步，快指针每次走两步，当快指针到达链表末尾时，慢指针正好到达中间位置。
3. **递归构造**：
   - 如果链表为空，则返回空树。
   - 找到中间节点，将其作为当前子树的根节点。
   - 递归地构建左子树和右子树。

通过以上步骤，我们可以将有序链表转换为一个高度平衡的二叉搜索树。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# Python 代码
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def sortedListToBST(self, head: ListNode) -> TreeNode:
        # 辅助函数：用快慢指针法找到链表的中间节点
        def findMiddle(left, right):
            slow = fast = left
            while fast != right and fast.next != right:
                fast = fast.next.next
                slow = slow.next
            return slow

        # 主函数：递归构建二叉搜索树
        def convertListToBST(left, right):
            if left == right:  # 基本情况为空子树
                return None
            mid = findMiddle(left, right)
            node = TreeNode(mid.val)
            node.left = convertListToBST(left, mid)  # 构建左子树
            node.right = convertListToBST(mid.next, right)  # 构建右子树
            return node

        return convertListToBST(head, None)
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++ 代码
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

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
    TreeNode* sortedListToBST(ListNode* head) {
        return buildBST(head, nullptr);
    }

private:
    // 帮助函数：快慢指针法找中间节点
    ListNode* findMiddle(ListNode* left, ListNode* right) {
        ListNode* slow = left;
        ListNode* fast = left;
        while (fast != right && fast->next != right) {
            fast = fast->next->next;
            slow = slow->next;
        }
        return slow;
    }

    // 构建二叉搜索树
    TreeNode* buildBST(ListNode* left, ListNode* right) {
        if (left == right) return nullptr;
        ListNode* mid = findMiddle(left, right);
        TreeNode* node = new TreeNode(mid->val);
        node->left = buildBST(left, mid);
        node->right = buildBST(mid->next, right);
        return node;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript 代码
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

var sortedListToBST = function(head) {
    // 找到链表的中间节点
    function findMiddle(left, right) {
        let slow = left;
        let fast = left;
        while (fast !== right && fast.next !== right) {
            fast = fast.next.next;
            slow = slow.next;
        }
        return slow;
    }

    // 构建二叉搜索树
    function convertListToBST(left, right) {
        if (left === right) return null;
        let mid = findMiddle(left, right);
        let node = new TreeNode(mid.val);
        node.left = convertListToBST(left, mid);
        node.right = convertListToBST(mid.next, right);
        return node;
    }

    return convertListToBST(head, null);
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java 代码
class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

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

class Solution {
    public TreeNode sortedListToBST(ListNode head) {
        return convertListToBST(head, null);
    }

    private TreeNode convertListToBST(ListNode left, ListNode right) {
        if (left == right) return null;
        ListNode mid = findMiddle(left, right);
        TreeNode node = new TreeNode(mid.val);
        node.left = convertListToBST(left, mid);
        node.right = convertListToBST(mid.next, right);
        return node;
    }

    private ListNode findMiddle(ListNode left, ListNode right) {
        ListNode slow = left, fast = left;
        while (fast != right && fast.next != right) {
            fast = fast.next.next;
            slow = slow.next;
        }
        return slow;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(n \log n)$，其中$n$是链表的节点数。每个节点的查找和构建都是$O(\log n)$的递归过程。
- 空间复杂度：$O(\log n)$，用于递归栈的空间。
