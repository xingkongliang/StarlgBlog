---
sidebar_position: 445
tags:
  - linked-list
  - stack
  - Medium
---

# 445.两数相加 II

标签: `linked-list`, `stack`

难度: Medium

通过率: 61.54%

原题链接: https://leetcode.com/problems/add-two-numbers-ii/description/

## 题目描述
给定两个非空链表，表示两个非负整数。数字以逆序存储，它们的每个节点包含一个数字。将这两个数字相加，并以链表形式返回它们的和。你可以假设这两个数字没有前导零，除了数字0本身。

## 解题思路
问题的挑战在于如何从链尾开始进行加法。一个简单的解决方案是使用栈来存储链表中的每个数字，因为栈是后进先出的结构，这与我们需要从最低位开始相加的要求相符。基本步骤如下：

1. 使用两种栈分别存储两个链表的值，然后用一个变量 `carry`表示进位。
2. 逐步从两个栈中弹出元素进行相加，加上 `carry` 的值。
3. 计算新值 `current` 为 `(val1 + val2 + carry) % 10`，并更新 `carry` 为 `(val1 + val2 + carry) // 10`。
4. 最后可能会有一个 `carry`，如果 `carry` 不为零，也要生成一个节点。
5. 将所有结果节点连接组成新的链表并返回。注意链表结构需要新节点不断链接在链表头部，因为我们是从最低位开始构建结果链表的。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def addTwoNumbers(l1: ListNode, l2: ListNode) -> ListNode:
    # 用于存数字的两个栈
    stack1, stack2 = [], []

    # 将l1的所有节点放入栈1
    while l1:
        stack1.append(l1.val)
        l1 = l1.next

    # 将l2的所有节点放入栈2
    while l2:
        stack2.append(l2.val)
        l2 = l2.next

    carry = 0
    head = None

    # 开始从栈中取值相加
    while stack1 or stack2 or carry:
        sum = carry
        if stack1:
            sum += stack1.pop()
        if stack2:
            sum += stack2.pop()
        # 计算当前节点值和进位
        carry = sum // 10
        sum = sum % 10
        # 创建新节点
        new_node = ListNode(sum)
        new_node.next = head
        head = new_node

    return head
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        stack<int> stack1, stack2;
        // 用栈来保存列表逆序的数字
        while (l1) {
            stack1.push(l1->val);
            l1 = l1->next;
        }
        while (l2) {
            stack2.push(l2->val);
            l2 = l2->next;
        }

        int carry = 0;
        ListNode* head = nullptr;

        // 从栈中取值相加
        while (!stack1.empty() || !stack2.empty() || carry) {
            int sum = carry;
            if (!stack1.empty()) {
                sum += stack1.top();
                stack1.pop();
            }
            if (!stack2.empty()) {
                sum += stack2.top();
                stack2.pop();
            }
            // 计算进位和当前位的值
            carry = sum / 10;
            sum %= 10;
            // 新节点在头部
            ListNode* newNode = new ListNode(sum);
            newNode->next = head;
            head = newNode;
        }

        return head;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class ListNode {
    constructor(val=0, next=null) {
        this.val = val;
        this.next = next;
    }
}

var addTwoNumbers = function(l1, l2) {
    const stack1 = [], stack2 = [];
    // 用两个栈来存储列表中的每个数字
    while (l1) {
        stack1.push(l1.val);
        l1 = l1.next;
    }
    while (l2) {
        stack2.push(l2.val);
        l2 = l2.next;
    }

    let carry = 0;
    let head = null;

    // 从栈中取数字进行相加操作
    while (stack1.length > 0 || stack2.length > 0 || carry > 0) {
        let sum = carry;
        if (stack1.length > 0) {
            sum += stack1.pop();
        }
        if (stack2.length > 0) {
            sum += stack2.pop();
        }
        // 计算新的值和进位
        carry = Math.floor(sum / 10);
        sum = sum % 10;
        const newNode = new ListNode(sum);
        newNode.next = head;
        head = newNode;
    }

    return head;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}

class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        Stack<Integer> stack1 = new Stack<>();
        Stack<Integer> stack2 = new Stack<>();
        // 使用栈存储列表中的每个数字
        while (l1 != null) {
            stack1.push(l1.val);
            l1 = l1.next;
        }
        while (l2 != null) {
            stack2.push(l2.val);
            l2 = l2.next;
        }

        int carry = 0;
        ListNode head = null;

        // 从栈中弹出数字相加
        while (!stack1.isEmpty() || !stack2.isEmpty() || carry != 0) {
            int sum = carry;
            if (!stack1.isEmpty()) {
                sum += stack1.pop();
            }
            if (!stack2.isEmpty()) {
                sum += stack2.pop();
            }
            // 计算进位和当前位完成的值
            carry = sum / 10;
            sum %= 10;
            ListNode newNode = new ListNode(sum);
            newNode.next = head;
            head = newNode;
        }

        return head;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n + m)$，其中 $n$ 和 $m$ 分别是两个链表的长度，因为每个链表中的节点都会被访问一次。  
  
空间复杂度为 $O(n + m)$，因为使用了堆栈来存储两个链表的节点值。
