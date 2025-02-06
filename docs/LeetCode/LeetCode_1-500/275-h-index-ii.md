---
sidebar_position: 275
tags:
  - binary-search
  - array
  - Medium
---

# 275.H 指数 II

标签: `binary-search`, `array`

难度: Medium

通过率: 38.58%

原题链接: https://leetcode.com/problems/h-index-ii/description/

## 题目描述
给定一个整数数组 `citations`，其中 `citations[i]` 表示某位研究者的第 `i` 篇论文的被引用次数，并且 `citations` 已按升序排列，返回该研究者的 h 指数。根据维基百科上的定义：h 指数是指研究者发表的至少 `h` 篇论文分别被引用了至少 `h` 次的最大整数 `h`。要求设计一个对数时间复杂度的算法。

## 解题思路
首先给出数组 `citations` 的长度 `n`。我们的目标是找到最大的 `h`，使得满足条件`n - i >= citations[i]`。由于数组已排序，我们可以通过二分查找来实现。`n - i` 表示至少 `h` 次引用的论文数。我们需要找到最小的 `i`，使得 `citations[i] >= n - i`，这意味着可以找到 `h = n - i`。我们用二分法尝试找到这个 `i`。

具体步骤：
1. 初始化 `left` 为 0，`right` 为 `n - 1`。
2. 使用二分查找：
   - 计算中间索引 `mid = left + (right - left) // 2`。
   - 检查 `citations[mid]` 是否大于等于 `n - mid`。
     - 如果是，说明我们可以尝试更小的 `mid`，因此将 `right = mid - 1`。
     - 否则，应该增大 `mid`，因此将 `left = mid + 1`。
3. 最后返回 `n - left`，即为 h-index。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def hIndex(citations):
    n = len(citations)
    left, right = 0, n - 1
    while left <= right:
        mid = left + (right - left) // 2
        # 检查条件
        if citations[mid] >= n - mid:
            right = mid - 1
        else:
            left = mid + 1
    # 最后 left 表示的是使条件成立的最小 i，所以返回 n - left
    return n - left
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int hIndex(vector<int>& citations) {
        int n = citations.size();
        int left = 0, right = n - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (citations[mid] >= n - mid) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return n - left;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function hIndex(citations) {
    let n = citations.length;
    let left = 0, right = n - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (citations[mid] >= n - mid) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return n - left;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int hIndex(int[] citations) {
        int n = citations.length;
        int left = 0, right = n - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (citations[mid] >= n - mid) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        return n - left;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(\log n)$，因为我们使用的是二分查找。  
  
空间复杂度为 $O(1)$，因为我们只使用了常量级别的额外空间。
