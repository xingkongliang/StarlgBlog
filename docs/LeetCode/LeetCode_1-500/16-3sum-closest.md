---
sidebar_position: 16
tags:
  - array
  - two-pointers
  - sort
  - Medium
---

# 16.3Sum Closest

标签: `array`, `two-pointers`, `sort`

难度: Medium

通过率: 46.37%

原题链接: https://leetcode.com/problems/3sum-closest/description/

## 题目描述
给定一个长度为 $n$ 的整数数组 $nums$ 和一个整数 $target$，在 $nums$ 中找到三个整数，使得这三个数的和最接近 $target$。返回这三个整数的和。你可以假设每组输入只存在唯一解。

## 解题思路
我们可以利用双指针技术来有效地解决这个问题。首先，我们需要对数组进行排序。这样一来，我们就可以使用两个指针的方法来查找有序数组中的三个数：

1. 遍历数组，对于每一个数，固定第一个元素的指针。
2. 使用双指针对其右侧范围内的所有数进行检查。双指针中，一个指向最左边的数，另一个指向最右边的数。
3. 计算这三个数的和，根据其结果调整两个指针的位置。
    - 如果当前三个数的和等于目标值 $target$，那么这就是最接近的结果，可以直接返回。
    - 如果和小于目标值 $target$，那么需要增加和，因此左指针向右移动。
    - 如果和大于目标值 $target$，需要减小和，因此右指针向左移动。
4. 记录并更新最接近 $target$ 的和。

这种方法的时间复杂度是 $O(n^2)$，因为排序的时间复杂度是 $O(n\log n)$，而双指针搜索的时间复杂度是 $O(n^2)$。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def threeSumClosest(nums, target):
    # 首先对数组进行排序
    nums.sort()
    # 设定一个变量来记录最接近的和
    closest_sum = float('inf')
    n = len(nums)
    
    # 遍历数组
    for i in range(n - 2):
        left, right = i + 1, n - 1
        while left < right:
            current_sum = nums[i] + nums[left] + nums[right]
            # 如果找到精确的目标值，直接返回
            if current_sum == target:
                return current_sum
            # 如果当前和比记录的更接近，更新最接近的和
            if abs(current_sum - target) < abs(closest_sum - target):
                closest_sum = current_sum
            
            # 移动双指针
            if current_sum < target:
                left += 1
            else:
                right -= 1
    return closest_sum
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int threeSumClosest(vector<int>& nums, int target) {
    // 首先对数组进行排序
    sort(nums.begin(), nums.end());
    // 初始化一个用于记录最接近的和的变量
    int closest_sum = INT_MAX;
    int n = nums.size();
    
    // 遍历数组
    for (int i = 0; i < n - 2; i++) {
        int left = i + 1, right = n - 1;
        while (left < right) {
            int current_sum = nums[i] + nums[left] + nums[right];
            // 如果发现精确的目标值，直接返回
            if (current_sum == target)
                return current_sum;
            // 如果当前和更接近目标值，更新最接近的和
            if (abs(current_sum - target) < abs(closest_sum - target))
                closest_sum = current_sum;
            // 调整双指针
            if (current_sum < target)
                left++;
            else
                right--;
        }
    }
    return closest_sum;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function threeSumClosest(nums, target) {
    // 首先对数组进行排序
    nums.sort((a, b) => a - b);
    let closestSum = Infinity;
    const n = nums.length;
    
    // 遍历数组
    for (let i = 0; i < n - 2; i++) {
        let left = i + 1,
            right = n - 1;
        while (left < right) {
            const currentSum = nums[i] + nums[left] + nums[right];
            // 一旦找到精确等于目标值的和，立即返回
            if (currentSum === target) {
                return currentSum;
            }
            // 更新最接近的和
            if (Math.abs(currentSum - target) < Math.abs(closestSum - target)) {
                closestSum = currentSum;
            }
            // 移动双指针
            if (currentSum < target) {
                left++;
            } else {
                right--;
            }
        }
    }
    return closestSum;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int threeSumClosest(int[] nums, int target) {
    // 首先对数组进行排序
    Arrays.sort(nums);
    // 初始化最接近的和
    int closestSum = Integer.MAX_VALUE;
    int n = nums.length;
    
    // 遍历数组
    for (int i = 0; i < n - 2; i++) {
        int left = i + 1, right = n - 1;
        while (left < right) {
            int currentSum = nums[i] + nums[left] + nums[right];
            // 如果发现了精确的目标和，直接返回
            if (currentSum == target) {
                return currentSum;
            }
            // 更新最接近的和
            if (Math.abs(currentSum - target) < Math.abs(closestSum - target)) {
                closestSum = currentSum;
            }
            // 移动双指针
            if (currentSum < target) {
                left++;
            } else {
                right--;
            }
        }
    }
    return closestSum;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n^2)$，因为对数组排序需要 $O(n\log n)$ 时间，而双指针需要 $O(n^2)$ 的时间来遍历所有可能的三元素组合。整体上，由于 $n \log n + n^2$ 中 $n^2$ 的增长速度较快，因此简化为 $O(n^2)$。
空间复杂度为 $O(1)$，因为我们只使用了常数空间来存储变量。
