---
sidebar_position: 268
tags:
  - array
  - math
  - Easy
---

# 268.缺失数

标签: `array`, `math`

难度: Easy

通过率: 68.73%

原题链接: https://leetcode.com/problems/missing-number/description/

## 题目描述
给定一个长度为 $n$ 的数组 `nums`，其中包含了范围 $[0, n]$ 内的 $n$ 个互不相同的数字，找出在该范围内缺失的那个数字。

## 解题思路
解题思路可以利用数学的思想：

1. **求和法**：利用高斯求和公式。数组中应该是 $0$ 到 $n$ 的所有数，所以其总和为 $\frac{n(n+1)}{2}$。数组中实际的和则是 $\sum nums[i]$。通过两个和的差值即可得到缺失的数字，即 $\frac{n(n+1)}{2} - \sum nums[i]$。

2. **异或法**：另外一种思路是利用异或运算的性质。将数组中的所有数进行一次异或运算，得到 $X$；同时，对 $0$ 到 $n$ 的所有数进行异或运算，得到 $Y$。这样，对 $X$ 和 $Y$ 再进行异或就能得到缺失的数字，因为相同的数字互相抵消，只剩下缺失的数字。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def missingNumber(nums):
    # 求出期望的总和
    n = len(nums)
    expected_sum = n * (n + 1) // 2
    # 求出实际的总和
    actual_sum = sum(nums)
    # 返回期望和与实际和的差
    return expected_sum - actual_sum

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int missingNumber(vector<int>& nums) {
    int n = nums.size();
    int expected_sum = n * (n + 1) / 2;
    int actual_sum = accumulate(nums.begin(), nums.end(), 0);
    return expected_sum - actual_sum;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function missingNumber(nums) {
    let n = nums.length;
    let expected_sum = n * (n + 1) / 2;
    let actual_sum = nums.reduce((sum, num) => sum + num, 0);
    return expected_sum - actual_sum;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length;
        int expected_sum = n * (n + 1) / 2;
        int actual_sum = 0;
        for (int num : nums) {
            actual_sum += num;
        }
        return expected_sum - actual_sum;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，因为我们遍历数组以计算其和。  
  
空间复杂度为 $O(1)$，因为只使用了常数级别的额外空间。
