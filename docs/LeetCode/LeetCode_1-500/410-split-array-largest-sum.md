---
sidebar_position: 410
tags:
  - binary-search
  - dynamic-programming
  - Hard
---

# 410.分割数组的最大子数组和

标签: `binary-search`, `dynamic-programming`

难度: Hard

通过率: 56.93%

原题链接: https://leetcode.com/problems/split-array-largest-sum/description/

## 题目描述
给定一个整数数组 `nums` 和一个整数 `k`，将 `nums` 分割成 `k` 个非空子数组，使得每个子数组的和中的最大值最小化。返回分割后的最大子数组和的最小值。

## 解题思路
要解决这个问题，可以使用二分查找和贪心算法的结合。具体步骤如下：

1. **定义边界**：
   - 初始的最小值 `left` 为数组 `nums` 中的最大值，因为最小的最大子数组和至少应该是所有元素中的最大值。
   - 初始最大值 `right` 为整个数组之和，因为如果不分割，最大子数组和就是数组的和。

2. **二分查找**：
   - 在 `left` 和 `right` 之间进行二分查找，寻找最小的可能的最大子数组和。
   - 对于每个中间值 `mid`，判断能否将数组分割成 `k` 个或更少子数组，使得每个子数组的和不超过 `mid`。这个判断可以通过一个贪心算法实现。

3. **验证可行性**：
   - 使用一个当前子数组和 `current_sum` 和子数组数量 `count` 初始化为1。
   - 遍历数组 `nums`，逐个累计 `current_sum`，如果 `current_sum` 加上当前元素超过了 `mid`，则增加子数组数量 `count` 而不是累加，即开始新的子数组。
   - 如果在遍历结束时，`count` 超过 `k`，说明对于这个 `mid` 的值，不能成功分割出 `k` 个符合条件的子数组。
   - 否则说明可行。

4. **调整边界**：
   - 如果 `mid` 是可行的（`count <= k`），则尝试更小的最大值，因此调整 `right = mid`。
   - 如果 `mid` 不可行，则调整 `left = mid + 1`。

最后，`left` 会收敛到最小的最大子数组和，即为题目所求。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def splitArray(nums, k):
    def can_split(guess):
        current_sum, count = 0, 1
        for num in nums:
            current_sum += num
            if current_sum > guess:  # 超出当前猜测的最大和
                count += 1
                current_sum = num
                if count > k:  # 分割的子数组数量超过 k
                    return False
        return True

    left, right = max(nums), sum(nums)
    while left < right:
        mid = (left + right) // 2
        if can_split(mid):
            right = mid
        else:
            left = mid + 1

    return left
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int splitArray(vector<int>& nums, int k) {
    auto can_split = [&](int guess) {
        int current_sum = 0, count = 1;
        for (int num : nums) {
            current_sum += num;
            if (current_sum > guess) { // 超过猜测值
                count++;
                current_sum = num;
                if (count > k) // 超过允许的子数组数量
                    return false;
            }
        }
        return true;
    };

    int left = *max_element(nums.begin(), nums.end());
    int right = accumulate(nums.begin(), nums.end(), 0);
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (can_split(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function splitArray(nums, k) {
    function can_split(guess) {
        let current_sum = 0, count = 1;
        for (let num of nums) {
            current_sum += num;
            if (current_sum > guess) { // 超出猜测值
                count++;
                current_sum = num;
                if (count > k) // 超过允许的子数组数量
                    return false;
            }
        }
        return true;
    }

    let left = Math.max(...nums);
    let right = nums.reduce((a, b) => a + b, 0);
    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (can_split(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int splitArray(int[] nums, int k) {
    int left = Arrays.stream(nums).max().getAsInt();
    int right = Arrays.stream(nums).sum();
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (canSplit(nums, mid, k)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left;
}

private boolean canSplit(int[] nums, int guess, int k) {
    int currentSum = 0, count = 1;
    for (int num : nums) {
        currentSum += num;
        if (currentSum > guess) {
            count++;
            currentSum = num;
            if (count > k) {
                return false;
            }
        }
    }
    return true;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n \log S)$，其中 $n$ 是数组的长度，$S$ 是数组所有元素的总和。二分查找进行 $\log S$ 次，每次检查的复杂度为 $O(n)$。  
  
空间复杂度：$O(1)$，只使用了常数级的额外空间。
