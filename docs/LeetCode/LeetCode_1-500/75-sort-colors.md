---
sidebar_position: 75
tags:
  - array
  - two-pointers
  - sort
  - Medium
---

# 75.颜色分类

标签: `array`, `two-pointers`, `sort`

难度: Medium

通过率: 65.71%

原题链接: https://leetcode.com/problems/sort-colors/description/

## 题目描述
给定一个包含红色、白色和蓝色三种颜色的数组，按红色、白色、蓝色的顺序对其进行原地排序，并使用整数0、1和2分别代表红色、白色和蓝色。要求不能使用库的排序功能。

## 解题思路
此问题是一个经典的荷兰国旗问题，可以使用双指针的思路来解决。我们维护三个指针：`p0`、`p1` 和 `p2`。其中：
1. `p0` 用于定位红色（0）放置的位置。
2. `p1` 用于遍历数组。
3. `p2` 用于定位蓝色（2）放置的位置。

算法思路如下：
- 初始化三个指针 `p0=0`，`p1=0`，`p2=n-1`。
- 遍历数组，当 `p1` 小于等于 `p2` 时，根据 `nums[p1]` 的值进行三种处理：
  - 如果 `nums[p1]` 为 0，与 `nums[p0]` 交换，移动 `p0` 和 `p1`。
  - 如果 `nums[p1]` 为 1，只移动 `p1`。
  - 如果 `nums[p1]` 为 2，与 `nums[p2]` 交换，移动 `p2`，而 `p1` 保持不动，继续检查交换后的值。

通过这种方式，能够在一趟遍历中将所有的颜色按照红、白、蓝排序，而且只使用常数空间。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def sortColors(nums):
    # 指针初始化
    p0, curr = 0, 0
    p2 = len(nums) - 1
    
    # 遍历数组，确保 curr 不大于 p2
    while curr <= p2:
        if nums[curr] == 0:
            # 当前为红色，和 p0 位置交换
            nums[p0], nums[curr] = nums[curr], nums[p0]
            p0 += 1
            curr += 1
        elif nums[curr] == 2:
            # 当前为蓝色，和 p2 位置交换
            nums[p2], nums[curr] = nums[curr], nums[p2]
            p2 -= 1
        else:
            # 当前为白色，直接移动到下一个
            curr += 1
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int p0 = 0, curr = 0, p2 = nums.size() - 1;
        
        while (curr <= p2) {
            if (nums[curr] == 0) {
                // 当前为红色，和 p0 位置交换
                swap(nums[p0++], nums[curr++]);
            } else if (nums[curr] == 2) {
                // 当前为蓝色，和 p2 位置交换
                swap(nums[curr], nums[p2--]);
            } else {
                // 当前为白色，直接移动到下一个
                curr++;
            }
        }
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function sortColors(nums) {
    let p0 = 0, curr = 0;
    let p2 = nums.length - 1;

    while (curr <= p2) {
        if (nums[curr] === 0) {
            // 当前为红色，和 p0 位置交换
            [nums[p0], nums[curr]] = [nums[curr], nums[p0]];
            p0++;
            curr++;
        } else if (nums[curr] === 2) {
            // 当前为蓝色，和 p2 位置交换
            [nums[curr], nums[p2]] = [nums[p2], nums[curr]];
            p2--;
        } else {
            // 当前为白色，直接移动到下一个
            curr++;
        }
    }
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public void sortColors(int[] nums) {
        int p0 = 0, curr = 0;
        int p2 = nums.length - 1;
        
        while (curr <= p2) {
            if (nums[curr] == 0) {
                // 当前为红色，和 p0 位置交换
                int temp = nums[p0];
                nums[p0++] = nums[curr];
                nums[curr++] = temp;
            } else if (nums[curr] == 2) {
                // 当前为蓝色，和 p2 位置交换
                int temp = nums[p2];
                nums[p2--] = nums[curr];
                nums[curr] = temp;
            } else {
                // 当前为白色，移动到下一个位置
                curr++;
            }
        }
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，因为每个元素最多被处理一次。  
空间复杂度：$O(1)$，因为我们使用常数级别的额外空间。
