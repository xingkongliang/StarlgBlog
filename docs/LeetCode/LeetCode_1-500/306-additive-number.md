---
sidebar_position: 306
tags:
  - backtracking
  - string
  - Medium
---

# 306.累加数

标签: `backtracking`, `string`

难度: Medium

通过率: 32.1%

原题链接: https://leetcode.com/problems/additive-number/description/

## 题目描述
累加数是一个字符串，其数字可以形成一个累加序列。一个有效的累加序列至少包含三个数字。除了前两个数字外，序列中的每个后续数字必须是前两个数字之和。

给定一个只包含数字的字符串，如果它是累加数则返回true，否则返回false。注意：累加序列中的数字不能有前导零，因此像序列1, 2, 03或1, 02, 3是无效的。

## 解题思路
我们可以使用回溯算法来解决这个问题。核心思路是尝试不同的拆分方式，将字符串拆分成三个及以上的数字并验证它们是否遵循累加数的规则。

具体步骤如下：

1. 遍历字符串，选择第一个数字，注意避开前导零。第一个数字最大不能超过字符串的一半。
2. 在剩下的字符串中选择第二个数字，注意避开前导零。第二个数字最大不能超过字符串的一半。
3. 对于选定的第一个和第二个数字，验证从第三个数字开始的后续序列是否符合累加规则，即当前数字是否等于前两个数字之和。
4. 如果某个选定对导致整个字符串被成功拆分成累加数，则返回true。
5. 如果尝试所有可能的第一个和第二个数字的组合都不能成功，将返回false。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def is_additive_number(num):
    def valid_sequence(num1, num2, remaining):
        if not remaining:
            # 当没有剩余字符时，说明成功构建了累加序列
            return True
        # 计算下一个期望的数字
        sum_str = str(int(num1) + int(num2))
        # 判断期望的数字是否在剩余的字符串的开始部分
        if not remaining.startswith(sum_str):
            return False
        # 继续向下验证
        return valid_sequence(num2, sum_str, remaining[len(sum_str):])

    n = len(num)
    # 第一个数字的最大逆限制为一半
    for i in range(1, n):
        num1 = num[:i]
        # 检查前导零
        if len(num1) > 1 and num1[0] == '0':
            break
        # 第二个数字最大不能超长度的一半
        for j in range(i+1, n):
            num2 = num[i:j]
            if len(num2) > 1 and num2[0] == '0':
                break
            if valid_sequence(num1, num2, num[j:]):
                return True
    return False
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
bool isAdditiveNumber(string num) {
    int n = num.size();
    for (int i = 1; i <= n / 2; ++i) {
        for (int j = 1; j <= (n - i) / 2; ++j) {
            if (isValid(i, j, num)) {
                return true;
            }
        }
    }
    return false;
}

bool isValid(int i, int j, string num) {
    if (num[0] == '0' && i > 1) return false;
    if (num[i] == '0' && j > 1) return false;
    long long num1 = stoll(num.substr(0, i));
    long long num2 = stoll(num.substr(i, j));
    string sum;
    for (int start = i + j; start < num.size(); start += sum.size()) {
        num2 = num1 + num2;
        num1 = num2 - num1;
        sum = to_string(num2);
        if (num.substr(start, sum.size()) != sum) return false;
    }
    return true;
}
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function isAdditiveNumber(num) {
    const isValid = (a, b, remaining) => {
        if (!remaining.length) return true;
        const sumStr = (parseInt(a) + parseInt(b)).toString();
        if (!remaining.startsWith(sumStr)) return false;
        return isValid(b, sumStr, remaining.slice(sumStr.length));
    };
    const n = num.length;
    for (let i = 1; i <= n / 2; i++) {
        for (let j = 1; j <= (n - i) / 2; j++) {
            const num1 = num.slice(0, i);
            const num2 = num.slice(i, i + j);
            if ((num1.length > 1 && num1.startsWith('0')) || (num2.length > 1 && num2.startsWith('0'))) {
                continue;
            }
            if (isValid(num1, num2, num.slice(i + j))) {
                return true;
            }
        }
    }
    return false;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
public boolean isAdditiveNumber(String num) {
    int n = num.length();
    for (int i = 1; i <= n / 2; i++) {
        for (int j = 1; j <= (n - i) / 2; j++) {
            if (isValid(i, j, num)) {
                return true;
            }
        }
    }
    return false;
}

private boolean isValid(int i, int j, String num) {
    if (num.charAt(0) == '0' && i > 1) return false;
    if (num.charAt(i) == '0' && j > 1) return false;
    long num1 = Long.parseLong(num.substring(0, i));
    long num2 = Long.parseLong(num.substring(i, i + j));
    String sum;
    for (int start = i + j; start < num.length(); start += sum.length()) {
        num2 = num1 + num2;
        num1 = num2 - num1;
        sum = Long.toString(num2);
        if (!num.startsWith(sum, start)) return false;
    }
    return true;
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：

$O(N^3)$

其中 $N$ 是字符串的长度。我们需要枚举两个分割点，因此是 $O(N^2)$ 的复杂度，验证整个序列则需要 $O(N)$，故总共是 $O(N^3)$。


空间复杂度：

$O(1)$

只需要常数级别的额外空间来保存数字和索引信息。
