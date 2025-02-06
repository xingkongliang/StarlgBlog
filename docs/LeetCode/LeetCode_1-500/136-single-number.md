---
sidebar_position: 136
tags:
  - array
  - bit-manipulation
  - Easy
---

# 136.只出现一次的数字

标签: `array`, `bit-manipulation`

难度: Easy

通过率: 74.77%

原题链接: https://leetcode.com/problems/single-number/description/

## 题目描述
给定一个非空整数数组，除某个元素仅出现一次外，其余每个元素均出现两次。找出那个只出现了一次的元素。

## 解题思路
解决这个问题可以利用位操作的异或性质。异或操作满足以下性质：任何数与自身异或结果为0，任何数与0异或结果为数本身，以及异或操作满足交换律和结合律。由于数组中每个元素都出现两次，只有一个元素出现一次，如果我们将所有数字进行异或操作，成对的数字会相互抵消（即变为0），最终的结果就是那个只出现一次的数字。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def singleNumber(nums):
    # 初始化一个变量来保存最终结果
    result = 0
    
    # 遍历数组中的每个数字，进行异或操作
    for num in nums:
        result ^= num
    
    # 返回结果
    return result

# 示例使用
print(singleNumber([2,2,1]))  # 输出: 1
print(singleNumber([4,1,2,1,2]))  # 输出: 4
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        // 初始化变量保存最终结果
        int result = 0;
        
        // 遍历数组中的每个数字，进行异或操作
        for (int num : nums) {
            result ^= num;
        }
        
        // 返回结果
        return result;
    }
};

// 示例使用
// Solution().singleNumber({2, 2, 1}) 输出: 1
// Solution().singleNumber({4, 1, 2, 1, 2}) 输出: 4
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function singleNumber(nums) {
    // 初始化变量来保存最终结果
    let result = 0;
    
    // 遍历数组中的每个数字，进行异或操作
    for (let num of nums) {
        result ^= num;
    }
    
    // 返回结果
    return result;
}

// 示例使用
console.log(singleNumber([2,2,1]));  // 输出: 1
console.log(singleNumber([4,1,2,1,2]));  // 输出: 4
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int singleNumber(int[] nums) {
        // 初始化变量来保存最终结果
        int result = 0;
        
        // 遍历数组中的每个数字，进行异或操作
        for (int num : nums) {
            result ^= num;
        }
        
        // 返回结果
        return result;
    }
    
    // 示例使用
    // System.out.println(new Solution().singleNumber(new int[]{2,2,1}));  // 输出: 1
    // System.out.println(new Solution().singleNumber(new int[]{4,1,2,1,2}));  // 输出: 4
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度: $O(n)$，其中 $n$ 是数组的长度。需要遍历数组一次。  
空间复杂度: $O(1)$。只使用了常数级别的额外空间。
