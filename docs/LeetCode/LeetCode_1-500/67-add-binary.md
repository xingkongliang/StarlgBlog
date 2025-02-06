---
sidebar_position: 67
tags:
  - string
  - math
  - Easy
---

# 67.二进制求和

标签: `string`, `math`

难度: Easy

通过率: 54.82%

原题链接: https://leetcode.com/problems/add-binary/description/

## 题目描述
给定两个二进制字符串 `a` 和 `b`，返回它们的和（用二进制表示）。

## 解题思路
为了求两个二进制字符串的和，可以从字符串的末尾开始逐位相加，这和手动进行二进制加法时的操作相似。具体步骤如下：

1. 初始化结果字符串 `result` 和一个进位 `carry`（初始为 0）。
2. 从右到左逐位扫描两个字符串，分别取出当前位。对于较短的字符串，如果已扫描完，则看作是0。
3. 将当前位对应的数字与进位相加，得到当前位置的和。
4. 将该和对2取模，结果即为此位的值，将该值加到 `result` 的最前面。
5. 更新进位 `carry`，将当前位置的和整除2，结果即为新的进位。
6. 重复步骤2-5，直到所有位以及进位为0。
7. 如果最终进位不为 0，将其加到 `result` 的最前面。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def addBinary(a: str, b: str) -> str:
    # 初始化结果和进位
    result = []
    carry = 0
    
    # 从字符串末尾开始逐位相加
    i, j = len(a) - 1, len(b) - 1
    while i >= 0 or j >= 0 or carry:
        total_sum = carry

        # 如果字符串还有未处理的位，则加到 total_sum
        if i >= 0:
            total_sum += int(a[i])
            i -= 1
        if j >= 0:
            total_sum += int(b[j])
            j -= 1

        # 计算此位结果的数值和下一个进位
        result.append(str(total_sum % 2))
        carry = total_sum // 2

    # 返回结果字符数组的反转
    return ''.join(reversed(result))
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
std::string addBinary(std::string a, std::string b) {
    std::string result = "";
    int carry = 0, i = a.size() - 1, j = b.size() - 1;

    // 从字符串末尾开始逐位相加
    while (i >= 0 || j >= 0 || carry) {
        int total_sum = carry;
        
        // 如果字符串还有未处理的位，则加到 total_sum
        if (i >= 0) total_sum += a[i--] - '0';
        if (j >= 0) total_sum += b[j--] - '0';

        // 计算此位结果的数值和下一个进位
        result += (total_sum % 2) + '0';
        carry = total_sum / 2;
    }

    // 因为是从后向前依次得到的结果，所以需要反转
    std::reverse(result.begin(), result.end());
    return result;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function addBinary(a, b) {
    let result = "";
    let carry = 0;
    let i = a.length - 1, j = b.length - 1;

    // 从字符串末尾开始逐位相加
    while (i >= 0 || j >= 0 || carry) {
        let total_sum = carry;
        
        // 如果字符串还有未处理的位，则加到 total_sum
        if (i >= 0) total_sum += parseInt(a[i--], 10);
        if (j >= 0) total_sum += parseInt(b[j--], 10);

        // 计算此位结果的数值和下一个进位
        result = (total_sum % 2) + result;
        carry = Math.floor(total_sum / 2);
    }
    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public String addBinary(String a, String b) {
    StringBuilder result = new StringBuilder();
    int carry = 0, i = a.length() - 1, j = b.length() - 1;

    // 从字符串末尾开始逐位相加
    while (i >= 0 || j >= 0 || carry > 0) {
        int total_sum = carry;
        
        // 如果字符串还有未处理的位，则加到 total_sum
        if (i >= 0) total_sum += a.charAt(i--) - '0';
        if (j >= 0) total_sum += b.charAt(j--) - '0';

        // 计算此位结果的数值和下一个进位
        result.append(total_sum % 2);
        carry = total_sum / 2;
    }

    // 返回结果字符数组的反转
    return result.reverse().toString();
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(\max(m, n))$，其中 $m$ 和 $n$ 是两个字符串的长度。我们逐位扫描两个字符串。`  空间复杂度：$O(\max(m, n))$，用于存储结果。同时需要一个大小为 $O(1)$ 的额外空间来存储进位。
