---
sidebar_position: 402
tags:
  - stack
  - greedy
  - Medium
---

# 402.移除K位数字

标签: `stack`, `greedy`

难度: Medium

通过率: 34.17%

原题链接: https://leetcode.com/problems/remove-k-digits/description/

## 题目描述
给定一个代表非负整数的字符串 `num` 和一个整数 `k`，要求移除 `num` 中的 `k` 位数字，使得剩下的数字形成的整数最小。

## 解题思路
为了使删除后的数字尽可能小，我们可以使用贪心算法和栈实现。具体方法如下：

1. 我们遍历数字字符串的每一个字符，对于每个字符，我们尝试将其加入栈中。

2. 在加入新字符时，如果当前栈顶元素比该字符大，我们可以考虑将栈顶元素移出栈，因为这样可以使更低的数字排在前面。

3. 为此，我们在加入新字符前应移除不大于 `k` 个栈顶元素。这样总共移除 `k` 个元素后，剩余的数字将是最小的。

4. 遍历过程中，将删除元素的次数累加，未能删除 `k` 个时，继续从栈中移除。

5. 最后，将栈中的元素组成一个新的字符串，如果结果中有前导0，则应将其去掉，转为最小的整数。

这种方法有效利用了栈的特性，能够在 **O(n)** 的时间内完成。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# 移除K位数字的Python实现
class Solution:
    def removeKdigits(self, num: str, k: int) -> str:
        # 使用列表模拟栈
        stack = []

        for digit in num:
            # 当栈非空且需要删除消耗量未到并且栈顶元素比当前元素大时，删除栈顶元素
            while k > 0 and stack and stack[-1] > digit:
                stack.pop()
                k -= 1
            stack.append(digit)

        # 如果还有未删除的元素，继续删除栈顶
        stack = stack[:-k] if k else stack

        # 删除前导零并转换为字符串
        return ''.join(stack).lstrip('0') or '0'
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++ 移除K位数字的实现
class Solution {
public:
    string removeKdigits(string num, int k) {
        string stack;
        for (char digit : num) {
            // 当栈非空、k大于0且栈顶元素大于当前数字时，出栈
            while (k > 0 && !stack.empty() && stack.back() > digit) {
                stack.pop_back();
                k--;
            }
            stack.push_back(digit);
        }
        // 如果还有未使用的删除次数，从后面继续删
        stack.resize(stack.size() - k);
        // 去掉前导零
        int i = 0;
        while (i < stack.size() && stack[i] == '0') i++;
        return i == stack.size() ? "0" : stack.substr(i);
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript 移除K位数字的实现
var removeKdigits = function(num, k) {
    const stack = [];
    for (const digit of num) {
        // 栈非空且可删且值大于当前值时执行删除
        while (k > 0 && stack.length > 0 && stack[stack.length - 1] > digit) {
            stack.pop();
            k--;
        }
        stack.push(digit);
    }
    // 从后向前删除剩余的k个
    stack.splice(stack.length - k, k);
    // 清除前导零并返回
    return stack.join('').replace(/^0+/, '') || "0";
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java 移除K位数字的实现
class Solution {
    public String removeKdigits(String num, int k) {
        StringBuilder stack = new StringBuilder();
        for (char digit : num.toCharArray()) {
            while (k > 0 && stack.length() > 0 && stack.charAt(stack.length() - 1) > digit) {
                stack.deleteCharAt(stack.length() - 1);
                k--;
            }
            stack.append(digit);
        }
        // 截断多余的k
        stack.setLength(stack.length() - k);
        // 移除前导零
        while (stack.length() > 0 && stack.charAt(0) == '0') stack.deleteCharAt(0);
        return stack.length() == 0 ? "0" : stack.toString();
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n)$，其中 $n$ 是字符串 `num` 的长度，因为每个字符至多入栈一次，出栈一次。  
  
空间复杂度为 $O(n)$，因为栈最多储存所有的字符。
