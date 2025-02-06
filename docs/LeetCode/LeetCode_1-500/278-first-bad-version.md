---
sidebar_position: 278
tags:
  - binary-search
  - Easy
---

# 278.第一个错误的版本

标签: `binary-search`

难度: Easy

通过率: 45.26%

原题链接: https://leetcode.com/problems/first-bad-version/description/

## 题目描述
你是一个产品经理并正在领导一个团队开发新产品。不幸的是，你的产品中的某个版本没有通过质量检测。由于每个版本都是基于之前的版本开发的，所以之后的所有版本都是错误的。假设有 $n$ 个版本 $[1, 2, ..., n]$，你想要找出第一个出错的版本。你可以调用一个 API `isBadVersion(version)` 来判断版本是否错误。实现一个函数来找到第一个错误的版本，尽量减少对 API 的调用次数。

## 解题思路
要找到第一个错误的版本，我们可以利用二分查找来减少对 API 的调用次数。我们将版本范围 $[1, n]$ 作为搜索空间。每次检查中点版本：如果这个版本是错误的，那么第一个错误版本一定在中点之前或是中点；如果不是错误的，那么第一个错误版本一定在中点之后。通过不断缩小搜索区间，我们可以高效地找到第一个错误版本。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def firstBadVersion(n):
    # 二分查找初始化
    left, right = 1, n
    while left < right:
        # 找到中点
        mid = left + (right - left) // 2
        # 检查中点版本是否错误
        if isBadVersion(mid):
            # 中点版本错误，搜索区间改为[left, mid]
            right = mid
        else:
            # 否则搜索区间改为[mid + 1, right]
            left = mid + 1
    # 当left==right时，第一个错误版本即为left或right
    return left
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int firstBadVersion(int n) {
    int left = 1, right = n;
    while (left < right) {
        // 使用防止溢出的方式计算中点
        int mid = left + (right - left) / 2;
        if (isBadVersion(mid)) {
            // 中点版本错误，搜索区间为[left, mid]
            right = mid;
        } else {
            // 否则搜索区间为[mid + 1, right]
            left = mid + 1;
        }
    }
    // left == right时，即找到第一个错误版本
    return left;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var firstBadVersion = function(n) {
    let left = 1, right = n;
    while (left < right) {
        // 计算中点
        const mid = Math.floor(left + (right - left) / 2);
        if (isBadVersion(mid)) {
            // 中点版本是错误的，那么错误版本在[left, mid]
            right = mid;
        } else {
            // 否则在[mid + 1, right]
            left = mid + 1;
        }
    }
    // 第一个错误版本
    return left;
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int firstBadVersion(int n) {
        int left = 1, right = n;
        while (left < right) {
            // 防止加法溢出
            int mid = left + (right - left) / 2;
            if (isBadVersion(mid)) {
                // 中点版本是错误的，搜索区间为[left, mid]
                right = mid;
            } else {
                // 否则搜索区间为[mid + 1, right]
                left = mid + 1;
            }
        }
        // 当left == right时，第一个错误版本即为left或right
        return left;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(\log n)$，因为我们使用二分查找，每次将搜索空间减半。  
  
空间复杂度为 $O(1)$，因为只需要常数个额外变量来进行计算和存储结果。
