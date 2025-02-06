---
sidebar_position: 43
tags:
  - string
  - math
  - Medium
---

# 43.字符串相乘

标签: `string`, `math`

难度: Medium

通过率: 41.45%

原题链接: https://leetcode.com/problems/multiply-strings/description/

## 题目描述
给定两个用字符串表示的非负整数 `num1` 和 `num2`，返回 `num1` 和 `num2` 的乘积，它们的乘积也应该用字符串表示。**注：**你不能使用任何内建的用于处理大整数的库，也不能直接将输入转换为整数。

## 解题思路
要解决这个问题，我们可以模拟手动计算两个大整数相乘的过程。以下是详细的步骤：  

1. 初始化一个长度为 `num1.length + num2.length` 的数组 `res` 用于存储乘积中间结果，所有元素初始化为零。
2. 从 `num1` 的最低位（即个位）开始，逐位与 `num2` 的每个位相乘。
3. 对于每位乘积，计算其在 `res` 中的正确位置。具体公式是将 `num1` 的第 `i` 位与 `num2` 的第 `j` 位相乘，这个积应放在 `res[i + j]` 和 `res[i + j + 1]` 上，考虑进位。
4. 将多位相乘的结果合并到 `res` 中，同时处理进位。
5. 处理完所有位的乘积后，逆序遍历 `res` 除去前面的所有零，拼接成最终结果字符串返回。

这个算法类似于列式乘法，每次乘后一步一步把进位也记录到相应位置，最后整理结果。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def multiply(num1: str, num2: str) -> str:
    # 如果任何一个数字是0，乘积就是0
    if num1 == "0" or num2 == "0":
        return "0"
    
    # 初始化结果数组，长度为两个数字长度之和
    res = [0] * (len(num1) + len(num2))
    
    # 从最低位到最高位遍历num1和num2的每一位
    for i in range(len(num1) - 1, -1, -1):
        for j in range(len(num2) - 1, -1, -1):
            # 计算两个数字当前位置的乘积
            mul = int(num1[i]) * int(num2[j])
            # 计算在结果数组中的起始位置
            p1, p2 = i + j, i + j + 1
            # 累加到当前位置，并处理进位
            sum_ = mul + res[p2]
            res[p2] = sum_ % 10
            res[p1] += sum_ // 10
    
    # 结果可能前面有多个0，转成字符串并移除前导0
    result = ''.join(map(str, res)).lstrip('0')
    return result
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    string multiply(string num1, string num2) {
        if (num1 == "0" || num2 == "0") return "0";
        vector<int> res(num1.size() + num2.size(), 0);
        for (int i = num1.size() - 1; i >= 0; i--) {
            for (int j = num2.size() - 1; j >= 0; j--) {
                int mul = (num1[i] - '0') * (num2[j] - '0');
                int sum = res[i + j + 1] + mul;
                res[i + j + 1] = sum % 10;
                res[i + j] += sum / 10;
            }
        }
        string result;
        for (int num : res) if (!(result.empty() && num == 0)) result.push_back(num + '0');
        return result.empty() ? "0" : result;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function multiply(num1, num2) {
    if (num1 === '0' || num2 === '0') return '0';
    const res = Array(num1.length + num2.length).fill(0);
    for (let i = num1.length - 1; i >= 0; i--) {
        for (let j = num2.length - 1; j >= 0; j--) {
            const mul = (num1[i] - '0') * (num2[j] - '0');
            const sum = mul + res[i + j + 1];
            res[i + j + 1] = sum % 10;
            res[i + j] += Math.floor(sum / 10);
        }
    }
    // 拼接结果并移除前导0
    return res.join('').replace(/^0+(?!$)/, '');
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public String multiply(String num1, String num2) {
        if ("0".equals(num1) || "0".equals(num2)) return "0";
        int[] res = new int[num1.length() + num2.length()];
        for (int i = num1.length() - 1; i >= 0; i--) {
            for (int j = num2.length() - 1; j >= 0; j--) {
                int mul = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');
                int sum = mul + res[i + j + 1];
                res[i + j + 1] = sum % 10;
                res[i + j] += sum / 10;
            }
        }
        StringBuilder sb = new StringBuilder();
        for (int num : res) if (!(sb.length() == 0 && num == 0)) sb.append(num);
        return sb.length() == 0 ? "0" : sb.toString();
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(m \times n)$，其中 $m$ 和 $n$ 分别是 `num1` 和 `num2` 的长度。
空间复杂度：$O(m + n)$，用于存储结果的数组。
