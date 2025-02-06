---
sidebar_position: 189
tags:
  - array
  - two-pointers
  - Medium
---

# 189.旋转数组

标签: `array`, `two-pointers`

难度: Medium

通过率: 42.03%

原题链接: https://leetcode.com/problems/rotate-array/description/

## 题目描述
给定一个整数数组 `nums`，将数组中的元素向右轮转 `k` 个位置，其中 `k` 是非负数。

## 解题思路
这道题的核心思想是如何有效地将数组中的元素右移 $k$ 个位置。一种高效的做法是使用数组反转的方法：首先将整个数组进行反转，然后分别反转前 $k$ 个元素和剩下的元素。这种方法的完成步骤如下：

1. 将整个数组反转。
2. 反转数组的前 $k \mod n$ 个元素。（注意这里可能需要取模操作，因为 $k$ 可能大于数组长度）
3. 反转数组的后 $n-k \mod n$ 个元素。

这样经过三次反转之后，数组就实现了向右轮转 $k$ 个位置的效果，无需使用额外的空间，具有 $O(1)$ 的空间复杂度。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def rotate(nums, k):
    # 定义一个函数用于反转数组的一部分
    def reverse(start, end):
        while start < end:
            nums[start], nums[end] = nums[end], nums[start]
            start += 1
            end -= 1

    n = len(nums)
    k = k % n  # 处理k大于数组长度的情况
    reverse(0, n - 1)  # 反转整个数组
    reverse(0, k - 1)  # 反转前k个元素
    reverse(k, n - 1)  # 反转后n-k个元素

# 示例用法
nums = [1,2,3,4,5,6,7]
k = 3
rotate(nums, k)
print(nums) # 输出: [5,6,7,1,2,3,4]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
void rotate(vector<int>& nums, int k) {
    int n = nums.size();
    k %= n;  // 处理k大于数组长度的情况
    // 定义一个函数用于反转数组的一部分
    auto reverse = [&](int start, int end) {
        while (start < end) {
            swap(nums[start], nums[end]);
            start++;
            end--;
        }
    };
    reverse(0, n - 1);  // 反转整个数组
    reverse(0, k - 1);  // 反转前k个元素
    reverse(k, n - 1);  // 反转后n-k个元素
}

// 示例用法
vector<int> nums = {1,2,3,4,5,6,7};
int k = 3;
rotate(nums, k);
for (int num : nums) {
    cout << num << " ";
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function rotate(nums, k) {
    const n = nums.length;
    k = k % n;  // 处理k大于数组长度的情况
    
    // 定义一个函数用于反转数组的一部分
    const reverse = (start, end) => {
        while (start < end) {
            [nums[start], nums[end]] = [nums[end], nums[start]];
            start++;
            end--;
        }
    };
    
    reverse(0, n - 1);  // 反转整个数组
    reverse(0, k - 1);  // 反转前k个元素
    reverse(k, n - 1);  // 反转后n-k个元素
}

// 示例用法
let nums = [1,2,3,4,5,6,7];
let k = 3;
rotate(nums, k);
console.log(nums); // 输出: [5,6,7,1,2,3,4]
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k %= n;  // 处理k大于数组长度的情况
        
        // 定义一个方法用于反转数组的一部分
        void reverse(int start, int end) {
            while (start < end) {
                int temp = nums[start];
                nums[start] = nums[end];
                nums[end] = temp;
                start++;
                end--;
            }
        }
        
        reverse(0, n - 1);  // 反转整个数组
        reverse(0, k - 1);  // 反转前k个元素
        reverse(k, n - 1);  // 反转后n-k个元素
    }

    // 示例用法
    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] nums = {1,2,3,4,5,6,7};
        solution.rotate(nums, 3);
        System.out.println(Arrays.toString(nums)); // 输出: [5,6,7,1,2,3,4]
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是数组的长度，因为反转操作需要遍历数组几次。  
  
空间复杂度：$O(1)$，没有使用额外的空间。
