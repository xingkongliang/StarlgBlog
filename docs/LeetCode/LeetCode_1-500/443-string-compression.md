---
sidebar_position: 443
tags:
  - array
  - two-pointers
  - Medium
---

# 443.字符串压缩

标签: `array`, `two-pointers`

难度: Medium

通过率: 56.62%

原题链接: https://leetcode.com/problems/string-compression/description/

## 题目描述
给定一个字符数组 `chars`，请使用如下算法将其压缩：`
`
从一个空字符串 `s` 开始。对于 `chars` 中每一组连续重复的字符：
- 如果该组长度为 `1`，则只需在 `s` 之后追加该字符。
- 否则，在 `s` 之后追加该字符和组的长度。

最后，压缩后的字符串 `s` 不应该单独返回，而是应该存储在输入的字符数组 `chars` 中。此外，组的长度如果为 10 或更长，则应将其分割为多个字符存储在 `chars` 中。

完成对输入数组的修改后，返回数组的新长度。

你必须仅使用常数额外空间来编写算法。

## 解题思路
该题目要求在就地对字符数组进行压缩，只能使用常数额外空间。为了实现这一点，可以使用双指针的方法：一个指针 `write` 用于在原地写入字符，另一个指针 `read` 用于遍历字符数组。

1. 初始化两个指针 `read` 和 `write` 均为 0 位置。
2. 使用 `read` 指针遍历整个 `chars` 数组。对于每一次遇到的一组连续重复字符：
   - 记下该组字符的开始位置 `start`。
   - 用 `read` 指针向前遍历直至读到一个不同的字符或者到了数组的末尾。
   - 计算字符出现的次数 `count = read - start`。
   - 将该字符写入到 `write` 指针所指的位置。
   - 如果 `count > 1`，将 `count` 的每一位也逐位转换为字符写入。
   - 更新 `write` 指针的位置。
3. 返回 `write` 指针所指的位置，即为数组的最终长度。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def compress(chars):
    write = 0  # 用于写入的位置
    read = 0   # 用于读取的位置
    n = len(chars)

    while read < n:
        start = read
        # 移动read指针直到字符改变或者到达末尾
        while read < n and chars[read] == chars[start]:
            read += 1
        
        count = read - start  # 计算当前字符的连续频率
        chars[write] = chars[start]  # 写入字符
        write += 1

        # 如果字符出现超过一次，将其频率写入到字符数组
        if count > 1:
            for digit in str(count):
                chars[write] = digit
                write += 1

    return write  # 返回新的长度
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int compress(vector<char>& chars) {
        int write = 0;  // 写入指针
        int read = 0;   // 读取指针
        int n = chars.size();

        while (read < n) {
            int start = read;
            // 移动read指针直到字符改变或者到达末尾
            while (read < n && chars[read] == chars[start]) {
                read++;
            }

            int count = read - start;  // 当前字符的连续频率
            chars[write++] = chars[start];  // 写入字符

            if (count > 1) {
                for (char c : to_string(count)) {
                    chars[write++] = c;
                }
            }
        }

        return write;  // 返回新的长度
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function compress(chars) {
    let write = 0;  // 写入指针
    let read = 0;   // 读取指针
    const n = chars.length;

    while (read < n) {
        const start = read;
        // 移动read指针直到字符改变或者到达末尾
        while (read < n && chars[read] === chars[start]) {
            read++;
        }

        const count = read - start;  // 当前字符的连续频率
        chars[write++] = chars[start];  // 写入字符

        if (count > 1) {
            const countStr = count.toString();
            for (let c of countStr) {
                chars[write++] = c;
            }
        }
    }

    return write;  // 返回新的长度
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public int compress(char[] chars) {
        int write = 0;  // 写入指针
        int read = 0;   // 读取指针
        int n = chars.length;

        while (read < n) {
            int start = read;
            // 移动read指针直到字符改变或者到达末尾
            while (read < n && chars[read] == chars[start]) {
                read++;
            }

            int count = read - start;  // 当前字符的连续频率
            chars[write++] = chars[start];  // 写入字符

            if (count > 1) {
                for (char c : Integer.toString(count).toCharArray()) {
                    chars[write++] = c;
                }
            }
        }

        return write;  // 返回新的长度
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 是输入数组的长度，因为每个字符最多被读和写一次。  
  
空间复杂度为 $O(1)$，因为我们是在原数组上进行就地修改，只用到了常数的额外空间。
