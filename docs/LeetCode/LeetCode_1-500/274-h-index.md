---
sidebar_position: 274
tags:
  - array
  - sort
  - Medium
---

# 274.H 指数

标签: `array`, `sort`

难度: Medium

通过率: 39.66%

原题链接: https://leetcode.com/problems/h-index/description/

## 题目描述
给定一个整数数组 `citations`，其中 `citations[i]` 是某位研究员的第 i 篇论文被引用的次数。返回该研究员的 h 指数。根据维基百科中 h 指数的定义：h 指数是指研究员发表的 N 篇论文中，有 h 篇论文分别被引用了至少 h 次，其余 N - h 篇论文被引用了不超过 h 次。

## 解题思路
要找到研究人员的 h 指数，我们需要确定一个整数 h，使得有至少 h 篇论文被引用了至少 h 次。一个简单有效的实现方案就是使用排序。以下是具体的步骤：

1. **排序步骤**：首先对数组 `citations` 进行从大到小排序。排序后，较大的引用次数会出现在前面。

2. **遍历和计算 h 指数**：遍历排序后的数组，找到最大的 h 使得前 h 篇论文每篇的引用次数都大于或等于 h。即，对每个引用次数 `citations[i]`，我们检查 `citations[i] >= i+1` 成立与否。

3. **返回结果**：当条件不再满足时，返回 h。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def hIndex(citations):
    # 排序数组，将大值放在前面
    citations.sort(reverse=True)
    h = 0
    # 遍历排序后的数组
    for i in range(len(citations)):
        # 检查是否可以是 h 指数
        if citations[i] >= i + 1:
            h = i + 1
        else:
            break
    return h
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
int hIndex(vector<int>& citations) {
    // 排序数组，将大值放在前面
    sort(citations.rbegin(), citations.rend());
    int h = 0;
    // 遍历排序后的数组
    for (int i = 0; i < citations.size(); ++i) {
        // 检查是否可以是 h 指数
        if (citations[i] >= i + 1) {
            h = i + 1;
        } else {
            break;
        }
    }
    return h;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function hIndex(citations) {
    // 排序数组，将大值放在前面
    citations.sort((a, b) => b - a);
    let h = 0;
    // 遍历排序后的数组
    for (let i = 0; i < citations.length; i++) {
        // 检查是否可以是 h 指数
        if (citations[i] >= i + 1) {
            h = i + 1;
        } else {
            break;
        }
    }
    return h;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public int hIndex(int[] citations) {
    // 排序数组，将大值放在前面
    Arrays.sort(citations);
    int h = 0, n = citations.length;
    // 遍历排序后的数组
    for (int i = 0; i < n; i++) {
        // 检查是否可以是 h 指数
        if (citations[n - i - 1] >= i + 1) {
            h = i + 1;
        } else {
            break;
        }
    }
    return h;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n \log n)$，其中 $n$ 为论文数量，因为需要对数组进行排序。  
  
空间复杂度为 $O(1)$，只需要常量级的额外空间进行计算。
