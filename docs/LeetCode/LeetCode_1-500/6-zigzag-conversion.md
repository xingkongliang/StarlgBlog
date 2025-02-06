---
sidebar_position: 6
tags:
  - string
  - Medium
---

# 6.Z字形变换

标签: `string`

难度: Medium

通过率: 50.08%

原题链接: https://leetcode.com/problems/zigzag-conversion/description/

## 题目描述
将字符串按照给定的行数以Z字形读写，然后按行输出结果。例如输入字符串为“PAYPALISHIRING”时，给定行数为3，则按照Z字可得如下排列：```P   A   H   N, A P L S I I G, Y   I   R```输出为“PAHNAPLSIIGYIR”。

## 解题思路
该问题的关键在于模拟将字符串按"锯齿状"写入的过程，并且保持字符输出的顺序。可以通过逐行读取字符的方式，将字符存储到不同的行中，然后最后按顺序输出。具体步骤如下：

1. 首先，我们可以判断当输入行数只有一行时，直接返回原字符串即可，因为没有“Z字形”。

2. 使用一个列表来存储每一行的字符。

3. 通过一个指针来决定当前的行，并且利用一个方向标志来确定遍历的方向(向下或向上)。将字符依次放入对应行。
   - 当指针指向最后一行时，方向改为向上（用于模拟斜线部分）。
   - 当指针为第一行时，方向改为向下。

4. 当字符分配完成后，进行拼接每一行的字符组成最终结果。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def convert(s: str, numRows: int) -> str:
    # 如果只有一行或者字符串长度小于等于行数，直接返回原字符串
    if numRows == 1 or numRows >= len(s):
        return s
    
    # 创建存储每行字符的列表，初始化为空字符串
    rows = [''] * numRows
    
    # 初始化当前行和方向
    current_row = 0
    going_down = False
    
    # 遍历字符串，将字符放入对应行
    for c in s:
        rows[current_row] += c
        # 如果到了第一行或者最后一行，改变方向
        if current_row == 0 or current_row == numRows - 1:
            going_down = not going_down
        # 根据方向调整当前行
        current_row += 1 if going_down else -1
    
    # 将所有行的字符拼接成结果字符串
    return ''.join(rows)

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++ 实现
// 根据题目要求实现一个 zigzag 字符串变换
class Solution {
public:
    std::string convert(std::string s, int numRows) {
        // 如果只有一行或者字符串长度小于等于行数，直接返回原字符串
        if (numRows == 1 || numRows >= s.length()) return s;

        // 创建存储每行字符的容器
        std::vector<std::string> rows(numRows);
        // 初始化当前行和方向
        int current_row = 0;
        bool going_down = false;
        
        // 遍历字符串，将字符放入对应行
        for (char c : s) {
            rows[current_row] += c;
            // 如果到了第一行或者最后一行，改变方向
            if (current_row == 0 || current_row == numRows - 1) {
                going_down = !going_down;
            }
            // 根据方向调整当前行
            current_row += going_down ? 1 : -1;
        }

        // 将所有行的字符拼接成结果字符串
        std::string result;
        for (const auto &row : rows) {
            result += row;
        }
        return result;
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function convert(s, numRows) {
    // 如果只有一行或者字符串长度小于等于行数，直接返回原字符串
    if (numRows === 1 || numRows >= s.length) return s;

    // 创建存储每行字符的数组
    const rows = new Array(numRows).fill('');
    // 初始化当前行和方向
    let currentRow = 0;
    let goingDown = false;

    // 遍历字符串，将字符放入对应行
    for (let c of s) {
        rows[currentRow] += c;
        // 如果到了第一行或者最后一行，改变方向
        if (currentRow === 0 || currentRow === numRows - 1) 
            goingDown = !goingDown;
        // 根据方向调整当前行
        currentRow += goingDown ? 1 : -1;
    }

    // 将所有行的字符拼接成结果字符串
    return rows.join('');
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public String convert(String s, int numRows) {
        // 如果只有一行或者字符串长度小于等于行数，直接返回原字符串
        if (numRows == 1 || numRows >= s.length())
            return s;

        // 创建存储每行字符的列表
        StringBuilder[] rows = new StringBuilder[numRows];
        for (int i = 0; i < numRows; i++) {
            rows[i] = new StringBuilder();
        }

        // 初始化当前行和方向
        int currentRow = 0;
        boolean goingDown = false;

        // 遍历字符串，将字符放入对应行
        for (char c : s.toCharArray()) {
            rows[currentRow].append(c);
            // 如果到了第一行或者最后一行，改变方向
            if (currentRow == 0 || currentRow == numRows - 1) {
                goingDown = !goingDown;
            }
            // 根据方向调整当前行
            currentRow += goingDown ? 1 : -1;
        }

        // 将所有行的字符拼接成结果字符串
        StringBuilder result = new StringBuilder();
        for (StringBuilder row : rows) {
            result.append(row);
        }
        return result.toString();
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度**：$O(n)$，其中 $n$ 是输入字符串的长度。因为每个字符都会被遍历一次。`
`
**空间复杂度**：$O(n)$，用于存储每行的字符，最后将这些字符拼接成结果字符串。
