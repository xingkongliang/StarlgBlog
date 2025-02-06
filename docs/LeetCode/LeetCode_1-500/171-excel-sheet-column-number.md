---
sidebar_position: 171
tags:
  - math
  - string
  - Easy
---

# 171.Excel 表列序号

标签: `math`, `string`

难度: Easy

通过率: 64.96%

原题链接: https://leetcode.com/problems/excel-sheet-column-number/description/

## 题目描述
给定一个字符串 columnTitle ，表示 Excel 表格中的列名，返回其对应的列序号。`例如：`A -> 1  `B -> 2`  `C -> 3`  `...`  `Z -> 26`  `AA -> 27`  `AB -> 28`。

## 解题思路
对于 Excel 表格中的列名，可以看作是一个 26 进制的数，其中每个字母对应一个数字：A 对应 1，B 对应 2，以此类推到 Z 对应 26。对于字符串来说，从右到左依次处理每个字符，将其转换为相应的数值并乘以 26 的幂次，累加到结果中。这类似于将一个 26 进制的数转换成 10 进制的过程。`例如对于列号 "AB"，可以解释为 1*26 + 2 = 28。`

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def titleToNumber(columnTitle):
    # 初始化结果为0
    result = 0
    # 遍历每个字符
    for char in columnTitle:
        # 将当前字符转换为对应的数字，并累计到结果
        # ord(char) - ord('A') + 1 将 A对齐到1, B对齐到2，以此类推
        result = result * 26 + (ord(char) - ord('A') + 1)
    return result

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int titleToNumber(string columnTitle) {
        int result = 0;
        // 遍历每个字符
        for(char c : columnTitle) {
            // 将当前字符转换为对应的数字，并累计到结果
            result = result * 26 + (c - 'A' + 1);
        }
        return result;
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function titleToNumber(columnTitle) {
    let result = 0;
    // 遍历每个字符
    for (let char of columnTitle) {
        // 将当前字符转换为对应的数字，并累计到结果
        result = result * 26 + (char.charCodeAt(0) - 'A'.charCodeAt(0) + 1);
    }
    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int titleToNumber(String columnTitle) {
        int result = 0;
        // 遍历每个字符
        for (char c : columnTitle.toCharArray()) {
            // 将当前字符转换为对应的数字，并累计到结果
            result = result * 26 + (c - 'A' + 1);
        }
        return result;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：O(n)，其中 $n$ 是字符串 columnTitle 的长度，因为我们需要对每个字符进行处理。  
  
空间复杂度：O(1)，我们只需要常量级别的额外空间用于存储结果。
