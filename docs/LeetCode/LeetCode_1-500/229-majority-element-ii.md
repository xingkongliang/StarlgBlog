---
sidebar_position: 229
tags:
  - array
  - hash-table
  - Medium
---

# 229.求众数 II

标签: `array`, `hash-table`

难度: Medium

通过率: 53.16%

原题链接: https://leetcode.com/problems/majority-element-ii/description/

## 题目描述
给定一个大小为 n 的整数数组，找出所有出现次数超过 ⌊ n/3 ⌋ 次的元素。

## 解题思路
在这道题中，要求找出所有出现在数组中超过 ⌊ n/3 ⌋ 次的元素。可以利用Boyer-Moore投票算法的改进版来实现线性时间和常数空间的解法。` 
1. **算法思路**如下：` 
- 首先，我们观察到一个事实：在一个长度为 n 的数组中，出现次数超过 ⌊ n/3 ⌋ 次的元素最多有两个。` 
- 因此，我们可以尝试用两个变量来保存数组中可能出现的超过次数的两个候选元素。` 
- 使用两个变量 candidate1 和 candidate2 分别来记录这两个候选元素，并用 count1 和 count2 来记录它们的计数值。` 
` 
2. **实现步骤**：` 
- 初始化 candidate1, candidate2 为两个不同的任意值（可以是不在数组中的特殊值，比如 None），count1, count2 都为 0；` 
- 遍历数组中的每个元素：` 
  - 如果当前元素等于 candidate1，则增加 count1；` 
  - 否则，如果当前元素等于 candidate2，则增加 count2；` 
  - 如果 count1 为 0，则将 candidate1 设为当前元素，并把 count1 置为 1；` 
  - 否则如果 count2 为 0，则将 candidate2 设为当前元素，并把 count2 置为 1；` 
  - 否则，将 count1 和 count2 都减少 1。` 
` 
- 第二遍扫描数组以确认这两个候选元素的实际出现次数。` 
- 返回实际出现次数大于 ⌊ n/3 ⌋ 的元素。`

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def majorityElement(nums):
    # 初始化候选元素和计数
    candidate1, candidate2, count1, count2 = None, None, 0, 0
    
    # 第一次遍历找到候选者
    for num in nums:
        if candidate1 == num:
            count1 += 1
        elif candidate2 == num:
            count2 += 1
        elif count1 == 0:
            candidate1, count1 = num, 1
        elif count2 == 0:
            candidate2, count2 = num, 1
        else:
            count1 -= 1
            count2 -= 1
    
    # 第二次验证这两个候选者出现的次数
    result = []
    for candidate in [candidate1, candidate2]:
        if nums.count(candidate) > len(nums) // 3:
            result.append(candidate)
    return result
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
        // 初始化候选者和计数
        int candidate1 = 0, candidate2 = 1, count1 = 0, count2 = 0;
        
        // 第一次遍历确定候选者
        for (int num : nums) {
            if (candidate1 == num) {
                count1++;
            } else if (candidate2 == num) {
                count2++;
            } else if (count1 == 0) {
                candidate1 = num;
                count1 = 1;
            } else if (count2 == 0) {
                candidate2 = num;
                count2 = 1;
            } else {
                count1--;
                count2--;
            }
        }
        
        // 验证候选者的实际计数
        vector<int> result;
        if (count(nums.begin(), nums.end(), candidate1) > nums.size() / 3) {
            result.push_back(candidate1);
        }
        if (count(nums.begin(), nums.end(), candidate2) > nums.size() / 3) {
            result.push_back(candidate2);
        }
        return result;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function majorityElement(nums) {
    // 初始化候选者和计数
    let candidate1 = null, candidate2 = null, count1 = 0, count2 = 0;
    
    // 第一次遍历找到可能的候选者
    for (let num of nums) {
        if (candidate1 === num) {
            count1++;
        } else if (candidate2 === num) {
            count2++;
        } else if (count1 === 0) {
            candidate1 = num;
            count1 = 1;
        } else if (count2 === 0) {
            candidate2 = num;
            count2 = 1;
        } else {
            count1--;
            count2--;
        }
    }
    
    // 第二次验证这两个候选者
    let result = [];
    if (nums.filter(num => num === candidate1).length > Math.floor(nums.length / 3)) {
        result.push(candidate1);
    }
    if (nums.filter(num => num === candidate2).length > Math.floor(nums.length / 3)) {
        result.push(candidate2);
    }
    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public List<Integer> majorityElement(int[] nums) {
    List<Integer> result = new ArrayList<>();
    // 初始化候选者和计数
    int candidate1 = 0, candidate2 = 1, count1 = 0, count2 = 0;
    
    // 第一次遍历找出候选者
    for (int num : nums) {
        if (candidate1 == num) {
            count1++;
        } else if (candidate2 == num) {
            count2++;
        } else if (count1 == 0) {
            candidate1 = num;
            count1 = 1;
        } else if (count2 == 0) {
            candidate2 = num;
            count2 = 1;
        } else {
            count1--;
            count2--;
        }
    }
    
    // 验证候选者出现的次数
    count1 = count2 = 0;
    for (int num : nums) {
        if (num == candidate1) {
            count1++;
        } else if (num == candidate2) {
            count2++;
        }
    }
    if (count1 > nums.length / 3) result.add(candidate1);
    if (count2 > nums.length / 3) result.add(candidate2);
    return result;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 是数组的长度，因为我们最多只需要遍历两次数组。  
空间复杂度为 $O(1)$，因为只使用了固定数量的额外变量。
