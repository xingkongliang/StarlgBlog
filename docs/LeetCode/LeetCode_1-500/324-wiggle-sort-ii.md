---
sidebar_position: 324
tags:
  - array
  - sort
  - Medium
---

# 324.摆动排序 II

标签: `array`, `sort`

难度: Medium

通过率: 35.01%

原题链接: https://leetcode.com/problems/wiggle-sort-ii/description/

## 题目描述
给定一个整数数组 nums，将它重新排序，使得 nums[0] < nums[1] > nums[2] < nums[3] ... 你可以假设数组总是有一个合法的答案。例子：输入: nums = [1,5,1,1,6,4]，输出: [1,6,1,5,1,4]。这是因为 [1,4,1,5,1,6] 也被接受。

## 解题思路
这一题要实现'摆动排序'，我们可以通过以下步骤来完成： 1. 首先将数组排序。 2. 然后将排序后的数组分成两半：较小的一半和较大的一半。 3. 倒序插入方式将前半部分和后半部分交替插入一个新的数组中，以此形成摆动的效果。 具体来说：假设排序之后的数组为 [1, 1, 1, 4, 5, 6]，我们分成较小的部分[1, 1, 1]和较大的部分[4, 5, 6]。我们从较大的部分中从后到前取值，交替插入结果数组的位置1, 3, 5；从较小的部分中从后到前取值，交替插入结果数组的位置0, 2, 4。这样在最后能够完成摆动排序。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def wiggleSort(nums):
    # 对数组进行排序
    nums.sort()
    n = len(nums)
    # 找到数组中间位置
    mid = (n - 1) // 2
    left = nums[:mid + 1]  # 较小部分
    right = nums[mid + 1:] # 较大部分
    # 将其从最后开始插入新数组，形成摆动
    for i in range(n):
        if i % 2 == 0:
            nums[i] = left.pop()
        else:
            nums[i] = right.pop()
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    void wiggleSort(vector<int>& nums) {
        // 对数组进行排序
        sort(nums.begin(), nums.end());
        int n = nums.size();
        vector<int> left(nums.begin(), nums.begin() + (n + 1) / 2);
        vector<int> right(nums.begin() + (n + 1) / 2, nums.end());
        // 交替插入到原数组
        for (int i = 0, j = left.size() - 1, k = right.size() - 1; i < n; ++i) {
            nums[i] = i % 2 == 0 ? left[j--] : right[k--];
        }
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
var wiggleSort = function(nums) {
    // 排序
    nums.sort((a, b) => a - b);
    let n = nums.length;
    let mid = Math.ceil(n / 2);
    let left = nums.slice(0, mid);
    let right = nums.slice(mid);
    // 倒序插入
    for (let i = 0; i < n; i++) {
        nums[i] = i % 2 === 0 ? left.pop() : right.pop();
    }
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public void wiggleSort(int[] nums) {
        Arrays.sort(nums);
        int n = nums.length;
        int[] left = Arrays.copyOfRange(nums, 0, (n + 1) / 2);
        int[] right = Arrays.copyOfRange(nums, (n + 1) / 2, n);
        for (int i = 0, j = left.length - 1, k = right.length - 1; i < n; ++i) {
            nums[i] = (i % 2 == 0) ? left[j--] : right[k--];
        }
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n \log n)$，因为我们对数组进行了排序。  
  
空间复杂度为 $O(n)$，因为我们需要额外的空间来保存分割后的两个数组。
