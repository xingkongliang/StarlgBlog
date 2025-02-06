---
sidebar_position: 282
tags:
  - backtracking
  - string
  - dynamic-programming
  - Hard
---

# 282.表达式添加运算符

标签: `backtracking`, `string`, `dynamic-programming`

难度: Hard

通过率: 40.7%

原题链接: https://leetcode.com/problems/expression-add-operators/description/

## 题目描述
给定一个只包含数字的字符串 `num` 和一个整数 `target`，返回所有可能的方式插入二元运算符 `+`、`-` 和/或 `*` 在 `num` 的数字之间，使得计算结果等于 `target` 值。

注意返回的表达式中的操作数不应包含前导零。

## 解题思路
这个问题可以使用回溯算法解决。基本思路是对字符串的每个位置尝试切割，选择一个数字作为操作数，并尝试在不同的位置插入不同的运算符。当我们处理到字符串的最后一个字符，并且当前的表达式结果等于目标值 `target` 时，就可以将这个表达式加入到结果集中。

过程中需要记录当前的计算结果 `current_value`，上一个运算符的值 `previous_operand` 以处理乘法的优先级问题，以及当前生成的表达式 `expression`。

1. 用递归函数 `backtrack` 定义参数：当前索引 `index`，当前计算值 `current_value`，前一个操作数 `previous_operand` 以及目前的表达式 `expression`：
   - 递归出口：如果 `index` 是 `num` 的末尾，并且 `current_value` 是 `target`，则将 `expression` 加入结果列表。
   - 遍历 `num` 中的每个可能的结束位置 `end` 从 `index` 开始；这意味着提取的数列 `num[index:end]` 作为当前操作数。若以 0 开始的数字不允许有前导零，退出循环。
   - 转换切割部分成整数 `current_operand`。
   - 如果 `index` 为 0，直接开始新的表达式（因为表达式不能有开头符号）并更新 `current_value` 和 `previous_operand`。
   - 否则，对加法、减法、乘法分别进行：
     - 加法：向 `expression` 中添加 `+` 和当前操作数。
     - 减法：向 `expression` 中添加 `-` 和当前操作数。
     - 乘法：需要注意将乘法操作结合之前的操作以正确处理运算符优先级。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def addOperators(num: str, target: int):
    def backtrack(index, current_value, previous_operand, expression):
        # 到达字符串的结尾，检查当前表达式的值是否等于目标值
        if index == len(num):
            if current_value == target:
                results.append(expression)
            return

        # 遍历从当前索引到字符串末尾的所有交叉段
        for i in range(index, len(num)):
            # 提取子字符串并处理其为整数
            current_str = num[index:i+1]
            current_operand = int(current_str)

            # 阻止前导零情况，但单个 0 允许 (e.g., "105")
            if index > 0 and num[index] == "0":
                break

            if index == 0:
                # 递归继续，不加符号的情况
                backtrack(i + 1, current_operand, current_operand, current_str)
            else:
                # 尝试 '+' 操作
                backtrack(i + 1, current_value + current_operand, current_operand, expression + '+' + current_str)
                # 尝试 '-' 操作
                backtrack(i + 1, current_value - current_operand, -current_operand, expression + '-' + current_str)
                # 尝试 '*' 操作
                backtrack(i + 1, current_value - previous_operand + previous_operand * current_operand, previous_operand * current_operand, expression + '*' + current_str)

    results = []
    backtrack(0, 0, 0, "")
    return results

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<string> addOperators(string num, int target) {
        vector<string> results;
        function<void(int, long, long, string)> backtrack = [&](int index, long currentValue, long previousOperand, string expression) {
            if (index == num.size()) {
                if (currentValue == target) results.push_back(expression);
                return;
            }
            for (int i = index; i < num.size(); ++i) {
                string currentStr = num.substr(index, i - index + 1);
                long currentOperand = stol(currentStr);
                if (to_string(currentOperand) != currentStr) break;  // Ignore numbers with leading zero

                if (index == 0) {
                    backtrack(i + 1, currentOperand, currentOperand, currentStr);
                } else {
                    backtrack(i + 1, currentValue + currentOperand, currentOperand, expression + "+" + currentStr);
                    backtrack(i + 1, currentValue - currentOperand, -currentOperand, expression + "-" + currentStr);
                    backtrack(i + 1, currentValue - previousOperand + previousOperand * currentOperand, previousOperand * currentOperand, expression + "*" + currentStr);
                }
            }
        };
        backtrack(0, 0, 0, "");
        return results;
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function addOperators(num, target) {
    const results = [];
    const backtrack = (index, currentValue, previousOperand, expression) => {
        if (index === num.length) {
            if (currentValue === target) results.push(expression);
            return;
        }
        for (let i = index; i < num.length; i++) {
            const currentStr = num.slice(index, i + 1);
            const currentOperand = parseInt(currentStr, 10);
            if (num[index] === '0' && i !== index) break;  // Prevent leading zero

            if (index === 0) {
                backtrack(i + 1, currentOperand, currentOperand, currentStr);
            } else {
                backtrack(i + 1, currentValue + currentOperand, currentOperand, expression + '+' + currentStr);
                backtrack(i + 1, currentValue - currentOperand, -currentOperand, expression + '-' + currentStr);
                backtrack(i + 1, currentValue - previousOperand + previousOperand * currentOperand, previousOperand * currentOperand, expression + '*' + currentStr);
            }
        }
    };
    backtrack(0, 0, 0, "");
    return results;
}

```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public List<String> addOperators(String num, int target) {
        List<String> results = new ArrayList<>();
        backtrack(results, num, target, 0, 0, 0, "");
        return results;
    }

    private void backtrack(List<String> results, String num, int target, int index, long currentValue, long previousOperand, String expression) {
        if (index == num.length()) {
            if (currentValue == target) results.add(expression);
            return;
        }
        for (int i = index; i < num.length(); i++) {
            String currentStr = num.substring(index, i + 1);
            long currentOperand = Long.parseLong(currentStr);
            if (num.charAt(index) == '0' && i != index) break;  // Stop for leading zeros

            if (index == 0) {
                backtrack(results, num, target, i + 1, currentOperand, currentOperand, currentStr);
            } else {
                backtrack(results, num, target, i + 1, currentValue + currentOperand, currentOperand, expression + '+' + currentStr);
                backtrack(results, num, target, i + 1, currentValue - currentOperand, -currentOperand, expression + '-' + currentStr);
                backtrack(results, num, target, i + 1, currentValue - previousOperand + previousOperand * currentOperand, previousOperand * currentOperand, expression + '*' + currentStr);
            }
        }
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
**时间复杂度**：

由于递归树可能会有 $O(3^n)$ 种可能的表达式（每一位数字后面可能跟着三种运算符或不加），时间复杂度是指数级别，具体情况还与测试输入有关。


**空间复杂度**：

递归的最大深度是表达式的最大长度 $O(n)$，因此空间复杂度是 $O(n)$。
