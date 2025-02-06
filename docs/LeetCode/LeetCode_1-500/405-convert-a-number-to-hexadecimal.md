---
sidebar_position: 405
tags:
  - math
  - bit-manipulation
  - Easy
---

# 405.将数字转换为十六进制

标签: `math`, `bit-manipulation`

难度: Easy

通过率: 49.86%

原题链接: https://leetcode.com/problems/convert-a-number-to-hexadecimal/description/

## 题目描述
给定一个32位整数 `num`，返回其对应的十六进制表示的字符串。对于负整数，使用补码表示。答案字符串中的字母应全部是小写字符，除了数字0本身不应有任何前导零。不得使用任何内置库方法直接解决此问题。

## 解题思路
要将一个32位整数转换为十六进制，我们需要逐步提取较低的4位进行转换，这可以通过重复除16（或取模）来实现。特别是在处理负数时，需要将其转换为无符号整数对应的补码形式，这可以通过将其与 $\text{0xFFFFFFFF}$ 相与（使用位掩码）实现。然后逐步从右到左处理每4位，转换为十六进制字符并记录下来。直到 `num` 变为0，最后反转得到的结果字符串。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def to_hex(num):
    # 十六进制字符映射
    hex_chars = "0123456789abcdef"
    # 若为0则直接返回
    if num == 0:
        return "0"
    # 处理负数，通过与0xFFFFFFFF相与得到无符号数
    num &= 0xFFFFFFFF
    # 存储结果
    result = ""
    # 循环直到整数为0
    while num != 0:
        # 提取最后4位并找到对应字符
        result = hex_chars[num & 0xF] + result
        # 右移4位
        num >>= 4
    return result
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
std::string toHex(int num) {
    // 定义十六进制字符映射
    const char hexChars[] = "0123456789abcdef";
    // 若num为0直接返回"0"
    if (num == 0) return "0";
    // 使用掩码将负数转换为无符号整数形式
    unsigned int n = num;
    std::string result = "";
    // 提取每4位
    while (n != 0) {
        result = hexChars[n & 0xF] + result;
        n >>= 4;
    }
    return result;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function toHex(num) {
    // 定义十六进制字符
    const hexChars = "0123456789abcdef";
    // 如果num为0，直接返回"0"
    if (num === 0) return "0";
    // 将num转换为无符号整数形式
    num >>>= 0;
    let result = "";
    while (num !== 0) {
        // 提取低4位转换为十六进制字符
        result = hexChars[num & 0xF] + result;
        num >>>= 4;  // 无符号右移
    }
    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public String toHex(int num) {
        // 定义十六进制字符映射
        char[] hexChars = "0123456789abcdef".toCharArray();
        // 若num是0，直接返回"0"
        if (num == 0) return "0";
        // 将num转换为无符号形式
        long n = num & 0xFFFFFFFFL;
        StringBuilder result = new StringBuilder();
        // 提取每4位数字
        while (n != 0) {
            result.insert(0, hexChars[(int)(n & 0xF)]);
            n >>= 4;
        }
        return result.toString();
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：由于每次减少4位，最多执行8次，因此时间复杂度为 $O(1)$。  

空间复杂度：主要用于存储结果的字符串，也是 $O(1)$。
