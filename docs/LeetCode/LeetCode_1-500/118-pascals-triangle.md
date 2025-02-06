---
sidebar_position: 118
tags:
  - array
  - dynamic-programming
  - Easy
---

# 118.帕斯卡三角形

标签: `array`, `dynamic-programming`

难度: Easy

通过率: 75.94%

原题链接: https://leetcode.com/problems/pascals-triangle/description/

## 题目描述
给定一个整数 numRows，返回帕斯卡三角形的前 numRows 行。帕斯卡三角形中的每个数字是它上方两个数字之和。

## 解题思路
帕斯卡三角形是一种逐行生成的三角形排列，其中每一行的首尾元素恒为 1，内部的每个元素是其正上方和正上方前一个元素之和。给定要求的行数 numRows，我们需要逐行生成。从第一行开始，每一行的第一个和最后一个元素都是 1，而中间的元素可以通过使用上一行的元素来计算。具体步骤如下：

1. 初始化一个空列表 result 用于存储生成的帕斯卡三角形。
2. 迭代范围从 0 到 numRows - 1，表示我们需要生成的行数。
3. 对于每一行：
   - 初始化第一行或者更新当前行的第一个元素和末尾元素为 1。
   - 对于当前行的其他元素，其值等于上一行中相邻两个元素之和。
   - 更新当前行的结果，加到 result。
4. 返回 result 作为最终结果。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def generate(numRows):
    # 初始化结果列表
    result = []
    # 逐行生成帕斯卡三角形
    for i in range(numRows):
        # 初始化当前行的数字为1的列表
        row = [1] * (i + 1)
        # 填充中间需要计算的数字
        for j in range(1, i):
            # 当前元素等于上一行两个元素之和
            row[j] = result[i - 1][j - 1] + result[i - 1][j]
        # 将生成的当前行添加到结果中
        result.append(row)
    return result
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
vector<vector<int>> generate(int numRows) {
    // 初始化结果向量
    vector<vector<int>> result;
    // 逐行生成帕斯卡三角形
    for (int i = 0; i < numRows; i++) {
        // 生成当前行，初始所有元素为1
        vector<int> row(i + 1, 1);
        // 填充中间需要计算的数字
        for (int j = 1; j < i; j++) {
            // 当前元素等于上一行两个元素之和
            row[j] = result[i - 1][j - 1] + result[i - 1][j];
        }
        // 将生成的当前行添加到结果中
        result.push_back(row);
    }
    return result;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function generate(numRows) {
    // 初始化结果数组
    const result = [];
    // 逐行生成帕斯卡三角形
    for (let i = 0; i < numRows; i++) {
        // 创建新行，并初始化为1
        const row = new Array(i + 1).fill(1);
        // 填充中间需要计算的数字
        for (let j = 1; j < i; j++) {
            // 当前元素等于上一行两个元素之和
            row[j] = result[i - 1][j - 1] + result[i - 1][j];
        }
        // 将生成的当前行添加到结果中
        result.push(row);
    }
    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> result = new ArrayList<>();
        // 逐行生成帕斯卡三角形
        for (int i = 0; i < numRows; i++) {
            List<Integer> row = new ArrayList<>(Collections.nCopies(i + 1, 1));
            // 填充中间需要计算的数字
            for (int j = 1; j < i; j++) {
                // 当前元素等于上一行两个元素之和
                row.set(j, result.get(i - 1).get(j - 1) + result.get(i - 1).get(j));
            }
            // 将生成的当前行添加到结果中
            result.add(row);
        }
        return result;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n^2)$，其中 $n$ 是行数 numRows，因为需要生成帕斯卡三角形的每一行。`
`空间复杂度为 $O(n^2)$，因为最终的结果二维数组包含了所有生成的值。
