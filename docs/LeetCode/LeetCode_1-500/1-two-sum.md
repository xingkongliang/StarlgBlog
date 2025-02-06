---
sidebar_position: 1
tags:
  - array
  - hash-table
  - Easy
---

# 1.两数之和

标签: `array`, `hash-table`

难度: Easy

通过率: 54.45%

原题链接: https://leetcode.com/problems/two-sum/description/

## 题目描述
给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出和为目标值的那 **两个** 整数，并返回它们的数组下标。你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。你可以按任意顺序返回答案。

## 解题思路
可以使用一个哈希表来帮助快速查找数组中是否存在与当前数字配对的数字。具体步骤如下：  
1. 创建一个空的哈希表来存储数字与其对应的索引。  
2. 遍历数组中的每一个元素：  
   - 计算与当前数字之和为目标值的另一数字 `complement = target - nums[i]`。  
   - 检查 `complement` 是否已经存在于哈希表中：若存在，则返回当前索引和 `complement` 的索引。  
   - 如果 `complement` 不存在， 将当前数字和索引存入哈希表中。  
这样在遍历数组的过程中，通过哈希表的快速查找，可以找到一对满足条件的数，且时间复杂度为 $O(n)$。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def twoSum(nums, target):
    # 创建一个字典来存储数值与索引的映射关系
    num_dict = {}
    
    # 遍历每一个数
    for i, num in enumerate(nums):
        # 计算需要的补数
        complement = target - num
        
        # 检查补数是否在字典中
        if complement in num_dict:
            # 如果找到，返回目前索引与补数的索引
            return [num_dict[complement], i]
        
        # 没有找到，将当前数与其索引存入字典
        num_dict[num] = i

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // 创建哈希表来存储数值与索引的映射关系
        unordered_map<int, int> num_map;
        
        // 遍历每一个数
        for(int i = 0; i < nums.size(); i++) {
            // 计算需要的补数
            int complement = target - nums[i];
            
            // 检查补数是否在哈希表中
            if(num_map.find(complement) != num_map.end()) {
                // 如果找到，返回目前索引与补数的索引
                return {num_map[complement], i};
            }
            
            // 没有找到，将当前数与其索引存入哈希表
            num_map[nums[i]] = i;
        }
        return {};
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function twoSum(nums, target) {
    // 创建一个Map来存储数值与索引的映射关系
    const numMap = new Map();
    
    // 遍历每一个数
    for (let i = 0; i < nums.length; i++) {
        // 计算需要的补数
        const complement = target - nums[i];
        
        // 检查补数是否在Map中
        if (numMap.has(complement)) {
            // 如果找到，返回目前索引与补数的索引
            return [numMap.get(complement), i];
        }
        
        // 没有找到，将当前数与其索引存入Map
        numMap.set(nums[i], i);
    }
    return [];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        // 创建一个字典来存储数值与索引的映射关系
        Map<Integer, Integer> numMap = new HashMap<>();
        
        // 遍历每一个数
        for (int i = 0; i < nums.length; i++) {
            // 计算需要的补数
            int complement = target - nums[i];
            
            // 检查补数是否在字典中
            if (numMap.containsKey(complement)) {
                // 如果找到，返回目前索引与补数的索引
                return new int[] { numMap.get(complement), i };
            }
            
            // 没有找到，将当前数与其索引存入字典
            numMap.put(nums[i], i);
        }
        throw new IllegalArgumentException("No two sum solution");
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，因为我们只需遍历数组一遍。空间复杂度为 $O(n)$，因为哈希表存储了最多 $n-1$ 个元素。
