---
sidebar_position: 119
tags:
  - array
  - dynamic-programming
  - Easy
---

# 119.帕斯卡三角形 II

标签: `array`, `dynamic-programming`

难度: Easy

通过率: 65.16%

原题链接: https://leetcode.com/problems/pascals-triangle-ii/description/

## 题目描述
给定一个整数 rowIndex，返回帕斯卡三角形的第 rowIndex 行（从 0 开始）。在帕斯卡三角形中，每个数字是其上方左右两个数字之和。

## 解题思路
帕斯卡三角形的第 $i$ 行可以通过第 $i-1$ 行推导出来。具体来说，第 $i$ 行的第 $j$ 个元素可以表示为第 $i-1$ 行的第 $j-1$ 个元素和第 $j$ 个元素之和。为了精简空间复杂度，可以意识到我们只需一个列表，每次从后往前更新列表中的值，就能得到下一行的值。初始情况下，我们的列表仅包含一个元素 1（一行中的第一项）。随后，我们从第 $j-1$ 项到第 1 项（包含）进行逆向更新，确保在计算步骤中未覆盖所需值。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def getRow(rowIndex):
    # 初始化结果数组，初始为大小为 rowIndex + 1 的全 1 数组
    result = [1] * (rowIndex + 1)
    # 从第二行开始更新
    for i in range(2, rowIndex + 1):
        # 从后到前更新当前行的值，以防止覆盖掉尚未使用的旧值
        for j in range(i - 1, 0, -1):
            # 更新当前元素，它应该是上一行的两个元素之和
            result[j] += result[j - 1]
    return result
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
std::vector<int> getRow(int rowIndex) {
    std::vector<int> row(rowIndex + 1, 1);
    for (int i = 2; i <= rowIndex; ++i) {
        for (int j = i - 1; j > 0; --j) {
            row[j] += row[j - 1];
        }
    }
    return row;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function getRow(rowIndex) {
    const row = new Array(rowIndex + 1).fill(1);
    for (let i = 2; i <= rowIndex; i++) {
        for (let j = i - 1; j > 0; j--) {
            row[j] += row[j - 1];
        }
    }
    return row;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public List<Integer> getRow(int rowIndex) {
    List<Integer> row = new ArrayList<>(Collections.nCopies(rowIndex + 1, 1));
    for (int i = 2; i <= rowIndex; i++) {
        for (int j = i - 1; j > 0; j--) {
            row.set(j, row.get(j) + row.get(j - 1));
        }
    }
    return row;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n^2)$，其中 $n$ 为 rowIndex，因为我们需要计算高达 $n$ 行的帕斯卡三角形。`空间复杂度：$O(n)$，因为我们只需要存储一行的数据。`
