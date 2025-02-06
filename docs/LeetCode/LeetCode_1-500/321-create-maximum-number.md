---
sidebar_position: 321
tags:
  - array
  - dynamic-programming
  - greedy
  - Hard
---

# 321.创建最大数

标签: `array`, `dynamic-programming`, `greedy`

难度: Hard

通过率: 31.31%

原题链接: https://leetcode.com/problems/create-maximum-number/description/

## 题目描述
给定两个整数数组nums1和nums2，它们的长度分别为m和n。nums1和nums2表示两个数字的各个位数。你还得到一个整数k。 从这两个数字的位数中创建一个长度为$k <= m + n$的最大数字。需要保持来自同一个数组的数字的相对顺序不变。 返回表示答案的k个数字的数组。

## 解题思路
这个问题可以分解为两个子问题：从单个数组中提取最大子序列的问题和合并两个子序列以形成最大序列的问题。具体步骤如下：

1. **提取单个数组的最大子序列：**
   我们首先需要一个函数，从一个数组中提取出长度为t的最大子序列。这可以通过一个贪心算法来实现，使用一个栈来维持一个递增的序列。通过遍历数组，我们确保栈中的元素总是尽可能大，并且在不违反“剩余元素足以补齐长度”的原则下弹出栈顶元素。

2. **合并两个数组使得结果最大：**
   处理完每个数组的最大子序列之后，我们需要合并两个子序列以获得一个长度为k的最大序列。可以通过比较两个子序列当前元素大小的方式进行挑选，把较大的数字加入结果集。值得注意的是，如果当前元相同时，我们需要比较其后面的元素来决定哪个数字加入到结果中。

3. **迭代所有可能的长度拆分：**
   对于长度k的结果，我们需要尝试所有可能的来自两个数组的长度组合，从而确保所生成的最大序列最优。

通过这种方法，问题被转换为多个可控的小问题，最终组合成为最优解。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def maxNumber(nums1, nums2, k):
    def getMaxArray(nums, t):
        # 使用贪心+栈法获取最大子序列
        drop = len(nums) - t
        stack = []
        for num in nums:
            while drop and stack and stack[-1] < num:
                stack.pop()
                drop -= 1
            stack.append(num)
        return stack[:t]

    def merge(nums1, nums2):
        # 合并两个序列，使合并结果最大
        return [max(nums1, nums2).pop(0) for _ in nums1 + nums2]

    ans = []
    # 迭代可能的分割点
    for i in range(max(0, k - len(nums2)), min(len(nums1), k) + 1):
        result = merge(getMaxArray(nums1, i), getMaxArray(nums2, k - i))
        ans = max(ans, result)
    return ans

# 示例用例
print(maxNumber([3,4,6,5], [9,1,2,5,8,3], 5)) # 输出: [9,8,6,5,3]
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
vector<int> maxNumber(vector<int>& nums1, vector<int>& nums2, int k) {
    auto getMaxArray = [&](vector<int>& nums, int t) {
        // 使用贪心算法+栈获取长度为t的最大子序列
        int drop = nums.size() - t;
        vector<int> stack;
        for (int num : nums) {
            while (drop && !stack.empty() && stack.back() < num) {
                stack.pop_back();
                drop--;
            }
            stack.push_back(num);
        }
        return vector<int>(stack.begin(), stack.begin() + t);
    };

    auto merge = [&](vector<int> nums1, vector<int> nums2) {
        // 合并两个数组以形成最大序列
        vector<int> merged;
        while (!nums1.empty() || !nums2.empty()) {
            vector<int>& temp = (nums1 > nums2) ? nums1 : nums2;
            merged.push_back(temp[0]);
            temp.erase(temp.begin());
        }
        return merged;
    };

    vector<int> ans;
    for (int i = max(0, k - nums2.size()); i <= min(k, (int)nums1.size()); i++) {
        vector<int> result = merge(getMaxArray(nums1, i), getMaxArray(nums2, k - i));
        ans = max(ans, result);
    }
    return ans;
}

// 示例用例
// vector<int> result = maxNumber(vector<int>{3,4,6,5}, vector<int>{9,1,2,5,8,3}, 5);
// result 应为: {9,8,6,5,3}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function maxNumber(nums1, nums2, k) {
    function getMaxArray(nums, t) {
        // 使用贪心+栈法获取最大子序列
        let drop = nums.length - t;
        const stack = [];
        for (const num of nums) {
            while (drop && stack.length && stack[stack.length - 1] < num) {
                stack.pop();
                drop--;
            }
            stack.push(num);
        }
        return stack.slice(0, t);
    }

    function merge(nums1, nums2) {
        // 合并两个序列，使合并结果最大
        const result = [];
        while (nums1.length || nums2.length) {
            const temp = nums1 > nums2 ? nums1 : nums2;
            result.push(temp.shift());
        }
        return result;
    }

    let ans = [];
    for (let i = Math.max(0, k - nums2.length); i <= Math.min(k, nums1.length); i++) {
        const result = merge(getMaxArray(nums1, i), getMaxArray(nums2, k - i));
        ans = ans > result ? ans : result;
    }
    return ans;
}

// 示例用例
// console.log(maxNumber([3,4,6,5], [9,1,2,5,8,3], 5)); // 输出: [9,8,6,5,3]
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.*;

public class Solution {
    public static int[] maxNumber(int[] nums1, int[] nums2, int k) {
        int[] ans = new int[k];
        for (int i = Math.max(0, k - nums2.length); i <= Math.min(k, nums1.length); i++) {
            int[] result = merge(getMaxArray(nums1, i), getMaxArray(nums2, k - i));
            if (greater(result, 0, ans, 0)) ans = result;
        }
        return ans;
    }

    private static int[] getMaxArray(int[] nums, int k) {
        int[] res = new int[k];
        int j = 0;
        for (int i = 0; i < nums.length; i++) {
            while (j > 0 && res[j - 1] < nums[i] && nums.length - i > k - j) j--;
            if (j < k) res[j++] = nums[i];
        }
        return res;
    }

    private static boolean greater(int[] nums1, int index1, int[] nums2, int index2) {
        while (index1 < nums1.length && index2 < nums2.length && nums1[index1] == nums2[index2]) {
            index1++;
            index2++;
        }
        return index2 == nums2.length || (index1 < nums1.length && nums1[index1] > nums2[index2]);
    }

    private static int[] merge(int[] nums1, int[] nums2) {
        int[] res = new int[nums1.length + nums2.length];
        int i = 0, j = 0, r = 0;
        while (i < nums1.length || j < nums2.length) {
            res[r++] = greater(nums1, i, nums2, j) ? nums1[i++] : nums2[j++];
        }
        return res;
    }

    public static void main(String[] args) {
        int[] result = maxNumber(new int[]{3,4,6,5}, new int[]{9,1,2,5,8,3}, 5);
        // result 应该是: [9,8,6,5,3]
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：

构造最大子序列的函数在最差情况下是 $O(m^2)$，因为每个元素都可能被放入和弹出栈一次。合并函数是 $O(k)$。遍历分割点的复杂度为 $O((m+n) k)$。因此，总时间复杂度为 $O((m+n)k)$。


空间复杂度：

使用了额外的空间保存临时子序列，复杂度为 $O(m+n)$，其中 $m$ 和 $n$ 是两个数组的长度。
