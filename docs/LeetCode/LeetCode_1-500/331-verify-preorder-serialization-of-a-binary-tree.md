---
sidebar_position: 331
tags:
  - stack
  - string
  - Medium
---

# 331.验证二叉树的前序序列化

标签: `stack`, `string`

难度: Medium

通过率: 45.7%

原题链接: https://leetcode.com/problems/verify-preorder-serialization-of-a-binary-tree/description/

## 题目描述
给定一个以逗号分隔的字符串 `preorder`，其中包含整数和字符 `#`（表示 `null` 节点），判断它是否为一个二叉树的正确前序遍历序列化。你不能重建这棵树。

## 解题思路
解决这个问题的基本思想是遍历给定的前序序列，使用一个槽位（slot）概念来跟踪节点需求。初始时我们需要一个槽位，因为我们想要放入根节点。遇到非空节点时，我们使用一个槽位并增加两个新的槽位（因为每个非空节点都需要左右两个孩子）。遇到空节点`#`时，只需消耗一个槽位。最终如果所有的槽位全部被正确使用完，则表示前序序列是有效的，反之则无效。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def isValidSerialization(preorder: str) -> bool:
    # 以逗号分隔序列
    nodes = preorder.split(',')
    # 初始槽位
    slots = 1
    # 遍历节点
    for node in nodes:
        # 消耗槽位
        slots -= 1
        # 如果槽位为负数，说明不可能构成有效序列
        if slots < 0:
            return False
        # 如果节点非空，则增加两个槽位（为两个子树准备）
        if node != '#':
            slots += 2
    # 最终槽位应全部被使用完
    return slots == 0
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
bool isValidSerialization(string preorder) {
    // 分割节点字符串
    vector<string> nodes;
    size_t pos = 0;
    string token;
    while ((pos = preorder.find(',')) != string::npos) {
        token = preorder.substr(0, pos);
        nodes.push_back(token);
        preorder.erase(0, pos + 1);
    }
    nodes.push_back(preorder);
    
    // 初始槽位
    int slots = 1;
    // 遍历所有节点
    for (const string& node : nodes) {
        // 消耗槽位
        slots--;
        // 判断槽位是否为负
        if (slots < 0) return false;
        // 如果节点非#，则增加两个槽位
        if (node != "#") slots += 2;
    }
    // 检查所有槽位是否用完
    return slots == 0;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function isValidSerialization(preorder) {
    // 分割节点字符串
    let nodes = preorder.split(',');
    // 初始槽位
    let slots = 1;
    // 遍历节点
    for (let node of nodes) {
        // 消耗一个槽位
        slots--;
        // 若槽位为负，返回false
        if (slots < 0) return false;
        // 若节点不是空，则增加两个槽位
        if (node !== '#') slots += 2;
    }
    // 检查所有槽位是否用完
    return slots === 0;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public boolean isValidSerialization(String preorder) {
    // 分割节点字符串
    String[] nodes = preorder.split(",");
    // 初始槽位为1
    int slots = 1;
    // 遍历所有节点
    for (String node : nodes) {
        // 消耗一个槽位
        slots--;
        // 槽位为负时，表示无效
        if (slots < 0) return false;
        // 如果不是空节点，则增加两个槽位
        if (!node.equals("#")) slots += 2;
    }
    // 最后槽位应为0
    return slots == 0;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 是输入序列中的节点数量，因为每个节点都会被遍历一次。  
  
空间复杂度为 $O(1)$，因为我们只使用了有限的额外空间跟踪槽位。
