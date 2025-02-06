---
sidebar_position: 239
tags:
  - array
  - heap
  - queue
  - two-pointers
  - Hard
---

# 239.滑动窗口最大值

标签: `array`, `heap`, `queue`, `two-pointers`

难度: Hard

通过率: 47.05%

原题链接: https://leetcode.com/problems/sliding-window-maximum/description/

## 题目描述
给定一个整数数组 `nums`，有一个大小为 `k` 的滑动窗口，它是从数组的最左侧移动到最右侧的。您只能在窗口中看到 `k` 个数字。每次滑动窗口向右移动一个位置。返回滑动窗口中的最大值。

## 解题思路
我们可以通过双端队列（deque）来高效地解决此问题。双端队列具有在两端添加和删除元素的能力，且这些操作都可以在 $O(1)$ 时间内完成。具体步骤如下：  
1. 初始化一个双端队列 `deque`，用于存储每个滑动窗口中的元素的索引。队列中的元素按所在位置的数值递减排列。  
2. 遍历数组中的每个元素，并按以下步骤更新 `deque`：
   - 移除位于队首且已经不在当前窗口的元素（它们的索引小于当前索引减去 `k`）。
   - 从队尾开始移除所有小于当前元素 `nums[i]` 的元素索引，因为这些元素在未来窗口中不可能成为最大值。
   - 将当前元素索引 `i` 加入 `deque`。
3. 在每次窗口更新时（即从索引 `k-1` 到 `n-1`），将 `deque` 队首的元素（最大值的索引对应的值）加入结果数组 `result`。  
通过以上步骤，我们可以在每个滑动窗口中高效地找到最大值。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
from collections import deque

def maxSlidingWindow(nums, k):
    n = len(nums)
    if n * k == 0:
        return []

    # Initialize deque and output
    d = deque()
    max_idx = 0
    for i in range(k):
        # remove indices of all elements which are smaller than the current element nums[i] from the back of deque
        while d and nums[i] >= nums[d[-1]]:
            d.pop()
        d.append(i)
        # update max in first k elements
        if nums[i] > nums[max_idx]:
            max_idx = i
    output = [nums[max_idx]]

    # Build output
    for i in range(k, n):
        # remove the elements which are out of this window (from front)
        if d[0] == i - k:
            d.popleft()

        # remove all elements that are smaller than the incoming element nums[i] (from back)
        while d and nums[i] >= nums[d[-1]]:
            d.pop()

        d.append(i)
        output.append(nums[d[0]])
    return output

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#include <vector>
#include <deque>

std::vector<int> maxSlidingWindow(std::vector<int>& nums, int k) {
    std::deque<int> d;
    std::vector<int> result;
    for (int i = 0; i < nums.size(); ++i) {
        // Remove indexes of elements not in the window
        if (!d.empty() && d.front() == i - k) {
            d.pop_front();
        }
        // Remove from deque all elements smaller than nums[i]
        while (!d.empty() && nums[i] > nums[d.back()]) {
            d.pop_back();
        }
        d.push_back(i);
        // Add max of the current window
        if (i >= k - 1) {
            result.push_back(nums[d.front()]);
        }
    }
    return result;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function maxSlidingWindow(nums, k) {
    const n = nums.length;
    const result = [];
    const d = [];

    for (let i = 0; i < n; i++) {
        // Remove indexes of elements not in the window
        if (d.length && d[0] === i - k) {
            d.shift();
        }

        // Remove smaller elements in k range as they will not be useful
        while (d.length && nums[i] >= nums[d[d.length - 1]]) {
            d.pop();
        }

        d.push(i);
        // Window has been fully scanned
        if (i >= k - 1) {
            result.push(nums[d[0]]);
        }
    }
    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.util.ArrayList;
import java.util.Deque;
import java.util.LinkedList;
import java.util.List;

public class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || nums.length == 0) return new int[0];
        
        Deque<Integer> deque = new LinkedList<>();
        List<Integer> result = new ArrayList<>();
        
        for (int i = 0; i < nums.length; i++) {
            // Remove indexes of elements not in the window
            if (!deque.isEmpty() && deque.peek() == i - k) {
                deque.poll();
            }
            // Remove smaller elements in k range as they will not be useful
            while (!deque.isEmpty() && nums[i] >= nums[deque.peekLast()]) {
                deque.pollLast();
            }

            deque.offer(i);
            // Window has been fully scanned
            if (i >= k - 1) {
                result.add(nums[deque.peek()]);
            }
        }
        return result.stream().mapToInt(i->i).toArray();
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 是数组 `nums` 的长度。每个元素最多被插入和删除一次。  
  
空间复杂度为 $O(k)$，因为我们使用的双端队列 `deque` 最多存储 $k$ 个元素的索引。
