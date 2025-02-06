---
sidebar_position: 238
tags:
  - array
  - dynamic-programming
  - Medium
---

# 238.除自身以外数组的乘积

标签: `array`, `dynamic-programming`

难度: Medium

通过率: 67.07%

原题链接: https://leetcode.com/problems/product-of-array-except-self/description/

## 题目描述
给定一个整数数组 `nums`，返回一个数组 `answer`，对于每一个 `answer[i]`，其等于 `nums` 中除了 `nums[i]` 之外的所有元素的乘积。

不可使用除法操作，并且要求时间复杂度为 $O(n)$。

## 解题思路
这个问题要求我们在不使用除法的情况下，计算数组中每个元素除外的乘积，可以借用前缀积和后缀积的思想来解决。

算法分为两步：

1. **计算前缀积：** 首先，我们遍历数组，计算每个元素 `i` 的左侧所有元素的乘积。在数组 `answer[i]` 中保存这些前缀积。并且初始化 `answer[0]` 为1，因为第一个元素左侧没有元素。

    - 例如：对于 `nums=[1,2,3,4]`，我们计算出前缀积为 `[1,1,2,6]`。

2. **计算后缀积并累乘：** 接着，我们以相反的方向遍历数组，即从右向左，逐步更新 `answer[i]`。在这个过程中，我们维护一个变量 `R` 来记录当前元素右侧所有元素的乘积，初始化为1。对每个元素 `nums[i]`，我们用 `answer[i]` *= `R` 来获取完整的乘积值，并更新 `R` 为当前元素 `nums[i]` 的乘积：`R` *= `nums[i]`。

    - 继续以 `nums=[1,2,3,4]` 为例，后缀积依次为 `R=1`，乘积更新后为 `[24,12,8,6]`，即是最终结果。

这种方法省去了额外的数组空间，因为我们复用了结果存储数组 `answer` 来存储中间的前缀积以及最终的乘积。这个算法的时间复杂度是 $O(n)$，空间复杂度是 $O(1)$（不计入结果数组）。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def product_except_self(nums):
    # 初始化结果数组，大小与 nums 一致
    length = len(nums)
    answer = [0] * length
    
    # 计算前缀积
    answer[0] = 1
    for i in range(1, length):
        answer[i] = nums[i - 1] * answer[i - 1]
        
    # 计算后缀积并更新结果
    R = 1
    for i in reversed(range(length)):
        # 乘上后缀积
        answer[i] = answer[i] * R
        # 更新后缀积
        R *= nums[i]
    
    return answer
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
vector<int> productExceptSelf(vector<int>& nums) {
    int length = nums.size();
    vector<int> answer(length);
    
    // 计算前缀积
    answer[0] = 1;
    for (int i = 1; i < length; i++) {
        answer[i] = nums[i - 1] * answer[i - 1];
    }
    
    // 计算后缀积并更新结果
    int R = 1;
    for (int i = length - 1; i >= 0; i--) {
        // 乘上后缀积
        answer[i] *= R;
        // 更新后缀积
        R *= nums[i];
    }
    
    return answer;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function productExceptSelf(nums) {
    const length = nums.length;
    const answer = new Array(length);

    // 计算前缀积
    answer[0] = 1;
    for (let i = 1; i < length; i++) {
        answer[i] = nums[i - 1] * answer[i - 1];
    }

    // 计算后缀积并更新结果
    let R = 1;
    for (let i = length - 1; i >= 0; i--) {
        // 乘上后缀积
        answer[i] *= R;
        // 更新后缀积
        R *= nums[i];
    }

    return answer;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int[] productExceptSelf(int[] nums) {
        int length = nums.length;
        int[] answer = new int[length];

        // 计算前缀积
        answer[0] = 1;
        for (int i = 1; i < length; i++) {
            answer[i] = nums[i - 1] * answer[i - 1];
        }

        // 计算后缀积并更新结果
        int R = 1;
        for (int i = length - 1; i >= 0; i--) {
            // 乘上后缀积
            answer[i] *= R;
            // 更新后缀积
            R *= nums[i];
        }

        return answer;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度是 $O(n)$，因为我们只需遍历数组两次（前缀和后缀计算）。


空间复杂度是 $O(1)$，因为除了输出数组 `answer` 外，我们仅使用了常量级别的额外空间（变量 `R`）。
