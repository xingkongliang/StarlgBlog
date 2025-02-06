---
sidebar_position: 421
tags:
  - trie
  - bit-manipulation
  - Medium
---

# 421.数组中两个数的最大异或值

标签: `trie`, `bit-manipulation`

难度: Medium

通过率: 53.26%

原题链接: https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/description/

## 题目描述
给定一个整数数组 nums，返回 $nums[i] \ XOR \ nums[j]$ 的最大结果，其中 $0 \leq i \leq j < n$。

## 解题思路
求两个数的最大异或值，暴力枚举所有可能的组合显然不够高效。为了更好地寻找一对数字使其异或值最大，我们可以利用二进制的性质。根据其位数的显著性，自最高位到最低位来构建解决方案。通过构建前缀树 (Trie) 来存储每个数字的二进制表示，可以有效地在考虑每个位时判断如何选择当前位以达到最大异或结果。

- 构建二进制前缀树：
  - 树的每个节点存储0或1两个分支，分别表示当前位为0或1。
  - 将所有数字插入这棵前缀树。

- 找到最大 XOR 值：
  - 对于每一个数字，尝试选择当前二进制位的另一个选项（0变1，1变0），以最大化临时结果。
  - 从树的根节点开始迭代每个位，构建临时的XOR值。
  - 仅当可能的分支存在时才转向该分支，否则选择现有的分支。

最终，得到的即为最大异或值。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class TrieNode:
    def __init__(self):
        self.children = {}

class Solution:
    def findMaximumXOR(self, nums: List[int]) -> int:
        # 根节点
        root = TrieNode()
        # 插入所有数字到Trie中
        for num in nums:
            node = root
            # 将num分解成二进制串插入
            for i in range(31, -1, -1):
                bit = (num >> i) & 1
                if bit not in node.children:
                    node.children[bit] = TrieNode()
                node = node.children[bit]

        max_xor = 0
        for num in nums:
            node = root
            current_xor = 0
            for i in range(31, -1, -1):
                bit = (num >> i) & 1
                # 选择相反的支路以最大化异或值
                toggled_bit = 1 - bit
                if toggled_bit in node.children:
                    current_xor = (current_xor << 1) | 1
                    node = node.children[toggled_bit]
                else:
                    current_xor = current_xor << 1
                    node = node.children[bit]
            max_xor = max(max_xor, current_xor)

        return max_xor

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class TrieNode {
    public: 
        TrieNode* children[2];
        TrieNode() {
            children[0] = nullptr;
            children[1] = nullptr;
        }
};

class Solution {
public:
    int findMaximumXOR(vector<int>& nums) {
        TrieNode* root = new TrieNode();
        for (int num : nums) {
            TrieNode* node = root;
            for (int i = 31; i >= 0; --i) {
                int bit = (num >> i) & 1;
                if (!node->children[bit]) {
                    node->children[bit] = new TrieNode();
                }
                node = node->children[bit];
            }
        }

        int max_xor = 0;
        for (int num : nums) {
            TrieNode* node = root;
            int current_xor = 0;
            for (int i = 31; i >= 0; --i) {
                int bit = (num >> i) & 1;
                int toggled_bit = 1 - bit;
                if (node->children[toggled_bit]) {
                    current_xor = (current_xor << 1) | 1;
                    node = node->children[toggled_bit];
                } else {
                    current_xor = current_xor << 1;
                    node = node->children[bit];
                }
            }
            max_xor = max(max_xor, current_xor);
        }

        return max_xor;
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
class TrieNode {
    constructor() {
        this.children = {};
    }
}

var findMaximumXOR = function(nums) {
    let root = new TrieNode();
    // 构建 Trie
    for (let num of nums) {
        let node = root;
        for (let i = 31; i >= 0; i--) {
            let bit = (num >> i) & 1;
            if (!node.children[bit]) {
                node.children[bit] = new TrieNode();
            }
            node = node.children[bit];
        }
    }

    let max_xor = 0;
    for (let num of nums) {
        let node = root;
        let current_xor = 0;
        for (let i = 31; i >= 0; i--) {
            let bit = (num >> i) & 1;
            let toggled_bit = 1 - bit;
            if (node.children[toggled_bit]) {
                current_xor = (current_xor << 1) | 1;
                node = node.children[toggled_bit];
            } else {
                current_xor = current_xor << 1;
                node = node.children[bit];
            }
        }
        max_xor = Math.max(max_xor, current_xor);
    }

    return max_xor;
};

```

</TabItem>
<TabItem value="java" label="Java">

```java
class TrieNode {
    TrieNode[] children;
    TrieNode() {
        children = new TrieNode[2];
    }
}

class Solution {
    public int findMaximumXOR(int[] nums) {
        TrieNode root = new TrieNode();
        // 构建 Trie
        for (int num : nums) {
            TrieNode node = root;
            for (int i = 31; i >= 0; i--) {
                int bit = (num >> i) & 1;
                if (node.children[bit] == null) {
                    node.children[bit] = new TrieNode();
                }
                node = node.children[bit];
            }
        }

        int max_xor = 0;
        for (int num : nums) {
            TrieNode node = root;
            int current_xor = 0;
            for (int i = 31; i >= 0; i--) {
                int bit = (num >> i) & 1;
                int toggled_bit = 1 - bit;
                if (node.children[toggled_bit] != null) {
                    current_xor = (current_xor << 1) | 1;
                    node = node.children[toggled_bit];
                } else {
                    current_xor = current_xor << 1;
                    node = node.children[bit];
                }
            }
            max_xor = Math.max(max_xor, current_xor);
        }

        return max_xor;
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(n \times L)$，其中 $n$ 是数组长度，$L$ 是整数的二进制位数（在这里为32位）。我们需要遍历每个数字并插入到Trie中以及对每个数字寻找最大异或值。  
  
  
- 空间复杂度：$O(n \times L)$，用于存储Trie中的所有二进制位。
