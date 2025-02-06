---
sidebar_position: 38
tags:
  - string
  - Medium
---

# 38.报数

标签: `string`

难度: Medium

通过率: 57.24%

原题链接: https://leetcode.com/problems/count-and-say/description/

## 题目描述
报数序列是通过递归公式定义的一系列数字字符串：
```
countAndSay(1) = "1"
countAndSay(n) 是 countAndSay(n - 1) 的运行长度编码（RLE）。
```

运行长度编码（RLE）是一种字符串压缩的方法，通过将连续相同的字符（重复2次或更多）替换为该字符和计数的连接。例如，为了压缩字符串"3322251"，我们将"33"替换为"23"，将"222"替换为"32"，将"5"替换为"15"，将"1"替换为"11"。因此，压缩后的字符串变为"23321511"。

给定一个正整数 n，返回报数序列的第 n 项。

## 解题思路
报数问题要求我们生成一种特定的数字序列，该序列由递归定义。在本题中，我们首先定义序列的第一项为字符串"1"。然后从第二项开始，我们使用运行长度编码（RLE）来确定前一项的内容。具体来说：

1. 我们的任务是返回第 n 项报数序列值。
2. 从起始项"1"开始逐步生成第 n 项：
   - 对于每一个之前的项，我们计算其数量和描述，比如"21"意味着"一个2和一个1"。
3. 使用迭代的方法，从第一个项开始依次生成后续的项，直到生成出第 n 项。
4. 进行每一个项的RLE时：
   - 初始化一个空字符串用以存储结果。
   - 遍历当前项中的每个字符，计数相同字符的数量，同时追加到结果中。
5. 继续这个过程直到生成所需的项。

通过这样的方法，我们可以产生出第 n 项的报数值。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def countAndSay(n):
    # 起始项为"1"
    current = "1"
    for _ in range(n - 1):
        next_seq = ""
        i = 0
        # 对当前项进行运行长度编码
        while i < len(current):
            count = 1
            # 统计连续相同字符的数量
            while i + 1 < len(current) and current[i] == current[i + 1]:
                i += 1
                count += 1
            # 将计数及字符追加到结果中
            next_seq += str(count) + current[i]
            i += 1
        # 更新当前项为新生成的序列
        current = next_seq
    return current

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    string countAndSay(int n) {
        string current = "1";
        for (int j = 0; j < n - 1; ++j) {
            string nextSeq = "";
            int i = 0;
            while (i < current.size()) {
                int count = 1;
                // 统计连续相同字符的数量
                while (i + 1 < current.size() && current[i] == current[i + 1]) {
                    ++i;
                    ++count;
                }
                // 将计数及字符追加到结果中
                nextSeq += to_string(count) + current[i];
                ++i;
            }
            // 更新当前项为新生成的序列
            current = nextSeq;
        }
        return current;
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function countAndSay(n) {
    let current = "1";
    for(let j = 0; j < n - 1; j++) {
        let nextSeq = "";
        let i = 0;
        while(i < current.length) {
            let count = 1;
            // 统计连续相同字符的数量
            while(i + 1 < current.length && current.charAt(i) === current.charAt(i + 1)) {
                i++;
                count++;
            }
            // 将计数及字符追加到结果中
            nextSeq += count.toString() + current.charAt(i);
            i++;
        }
        // 更新当前项为新生成的序列
        current = nextSeq;
    }
    return current;
}

```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public String countAndSay(int n) {
        String current = "1";
        for (int j = 0; j < n - 1; j++) {
            StringBuilder nextSeq = new StringBuilder();
            int i = 0;
            while (i < current.length()) {
                int count = 1;
                // 统计连续相同字符的数量
                while (i + 1 < current.length() && current.charAt(i) == current.charAt(i + 1)) {
                    i++;
                    count++;
                }
                // 将计数及字符追加到结果中
                nextSeq.append(count).append(current.charAt(i));
                i++;
            }
            // 更新当前项为新生成的序列
            current = nextSeq.toString();
        }
        return current;
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
- 时间复杂度：$O(n \times m)$，其中 $n$ 是所求的项数，$m$ 是所产生的序列长度。
- 空间复杂度：$O(m)$，存储生成的序列需要的空间。
