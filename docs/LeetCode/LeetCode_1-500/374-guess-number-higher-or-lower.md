---
sidebar_position: 374
tags:
  - binary-search
  - Easy
---

# 374.猜数字大小

标签: `binary-search`

难度: Easy

通过率: 54.72%

原题链接: https://leetcode.com/problems/guess-number-higher-or-lower/description/

## 题目描述
你正在玩一个猜数字的游戏。游戏规则如下：我从 1 到 n 中选择一个数字。你需要猜测我选择了哪个数字。每次你猜错了，我会告诉你我选择的数字是比你猜的数字大还是小。你可以调用一个预定义的 API `int guess(int num)`，它会返回以下三个可能的结果： `-1` 表示你的猜测比我选的数字大；`1` 表示你的猜测比我选的数字小；`0` 表示你的猜测正确。返回我选的数字。

## 解题思路
这个问题可以使用二分查找算法来解决。由于我们知道数字是在从 1 到 n 的范围中选择的，我们可以将这一区间缩小为两个边界：低边界 `low` 与高边界 `high`（初始化为 1 和 n）。然后，计算中间值 `mid`，调用 `guess(mid)` 判断该值是否为目标值：- 如果 `guess(mid)` 返回 0，说明我们已经猜中，返回 `mid`；- 如果返回 -1，说明数字在 mid 左侧区域，将 `high` 更新为 `mid - 1`；- 如果返回 1，说明数字在 mid 右侧区域，将 `low` 更新为 `mid + 1`。通过不断缩小这一区间，我们可以在 O(log n) 的时间复杂度内找到这个数字。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def guessNumber(n):
    low, high = 1, n
    while low <= high:
        mid = (low + high) // 2
        result = guess(mid)  # 使用API获取结果
        if result == 0:
            return mid  # 猜对了
        elif result < 0:
            high = mid - 1  # 猜的太大了
        else:
            low = mid + 1  # 猜的太小了
    return -1  # 按理说不会到这里
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int guessNumber(int n) {
        int low = 1, high = n;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int result = guess(mid);
            if (result == 0) {
                return mid;  // 猜对了
            } else if (result < 0) {
                high = mid - 1;  // 猜的太大了
            } else {
                low = mid + 1;  // 猜的太小了
            }
        }
        return -1;  // 按理说不会到这里
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function guessNumber(n) {
    let low = 1, high = n;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        let result = guess(mid);
        if (result === 0) {
            return mid;  // 猜对了
        } else if (result < 0) {
            high = mid - 1;  // 猜的太大了
        } else {
            low = mid + 1;  // 猜的太小了
        }
    }
    return -1;  // 按理说不会到这里
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int guessNumber(int n) {
        int low = 1, high = n;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int result = guess(mid);
            if (result == 0) {
                return mid;  // 猜对了
            } else if (result < 0) {
                high = mid - 1;  // 猜的太大了
            } else {
                low = mid + 1;  // 猜的太小了
            }
        }
        return -1;  // 按理说不会到这里
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(\log n)$，因为用了二分查找法，我们将搜索空间每次减少一半。  
  
空间复杂度为 $O(1)$，因为我们只用了常数级别的额外空间用于存储变量。
