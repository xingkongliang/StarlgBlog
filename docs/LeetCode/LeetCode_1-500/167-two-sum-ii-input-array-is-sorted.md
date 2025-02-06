---
sidebar_position: 167
tags:
  - array
  - two-pointers
  - binary-search
  - Medium
---

# 167.两数之和 II - 输入有序数组

标签: `array`, `two-pointers`, `binary-search`

难度: Medium

通过率: 62.49%

原题链接: https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/

## 题目描述
给定一个以1为基数的整数数组，该数组已按照非递减顺序排序，找出两个数，使得它们的和等于一个指定的目标数。记这两个数为numbers[index1]和numbers[index2]，其中 $1 <= index1 < index2 <= numbers.length$ 。返回这两个数的下标，其中下标加一作为整数数组[index1, index2]返回，长度为2。测试是生成的，因此恰好有一个解决方案。不能使用同一个元素两次。

## 解题思路
由于数组是有序的，我们可以使用双指针方法来解决这个问题。用一个指针指向数组的起始位置，另一个指针指向数组的末尾位置。我们检查这两个位置的数的和：

- 如果和等于目标值，返回这两个指针。
- 如果和小于目标值，增大左指针以增加和。
- 如果和大于目标值，减小右指针以减少和。

通过这种方法，能够在不需要额外存储空间的情况下在 $O(n)$ 时间复杂度内解决问题。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def twoSum(numbers, target):
    # 初始化左右指针
    left, right = 0, len(numbers) - 1
    
    # 当左指针小于右指针时继续循环
    while left < right:
        current_sum = numbers[left] + numbers[right]  # 当前和
        
        # 如果找到目标和，返回结果
        if current_sum == target:
            return [left + 1, right + 1]  # 返回1索引结果
        elif current_sum < target:
            left += 1  # 增加左指针，因为我们需要一个更大的和
        else:
            right -= 1  # 减小右指针，因为我们需要一个更小的和
    
    return []
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function twoSum(numbers, target) {
    let left = 0, right = numbers.length - 1;
    
    // 使用双指针法进行查找
    while (left < right) {
        const currentSum = numbers[left] + numbers[right];
        
        if (currentSum === target) {
            return [left + 1, right + 1];  // 返回索引时加1
        } else if (currentSum < target) {
            left++;  // 增加左指针以寻找更大的和
        } else {
            right--;  // 减少右指针以寻找更小的和
        }
    }

    return [];
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int[] twoSum(int[] numbers, int target) {
    int left = 0, right = numbers.length - 1;
    
    // 双指针实现
    while (left < right) {
        int currentSum = numbers[left] + numbers[right];
        
        if (currentSum == target) {
            return new int[]{left + 1, right + 1};  // 返回1索引的结果
        } else if (currentSum < target) {
            left++;  // 增加左指针
        } else {
            right--;  // 减少右指针
        }
    }

    return new int[]{};
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度: $O(n)$，其中 $n$ 是数组的长度。我们最多需要遍历整个数组一次。  
  
空间复杂度: $O(1)$，我们只使用了常数的额外空间（两个指针）。
