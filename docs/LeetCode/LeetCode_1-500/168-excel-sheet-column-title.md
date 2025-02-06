---
sidebar_position: 168
tags:
  - math
  - Easy
---

# 168.Excel工作表列标题

标签: `math`

难度: Easy

通过率: 42.4%

原题链接: https://leetcode.com/problems/excel-sheet-column-title/description/

## 题目描述
给定一个整数 `columnNumber`，返回其在Excel工作表中出现的相应列标题。比如：`A` -> 1，`B` -> 2，`C` -> 3，......，`Z` -> 26，`AA` -> 27，`AB` -> 28，等等。

## 解题思路
为了将Excel列编号转换为列名称，基本思路是模拟列名称的生成过程。这与26进制数的转换类似，只是没有“0”。

1. 假设我们有一个列编号`columnNumber`，我们需要将其转换为Excel列名称。
2. 每次从 `columnNumber` 中减去 1（因为我们是从 1 开始而非 0，所以要先减去 1），然后对26取余，这个余数可以映射到字符`A`到`Z`。
3. 余数 0 对应 `A`，即`chr(65 + 余数)`。
4. 将 `columnNumber` 除以 26 更新，以便进行下一位的计算。
5. 重复上述过程直至 `columnNumber` 变为 0，每次的字符拼接在结果字符串的前面。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def convertToTitle(columnNumber):
    # 初始化结果字符串
    result = ''
    
    while columnNumber > 0:
        # 将 columnNumber 减 1，然后计算余数
        columnNumber -= 1
        remainder = columnNumber % 26
        # 将余数对应字符添加到结果前面
        result = chr(remainder + 65) + result
        # 更新 columnNumber
        columnNumber //= 26
        
    return result

# 测试例子
print(convertToTitle(1))   # 输出: "A"
print(convertToTitle(28))  # 输出: "AB"
print(convertToTitle(701)) # 输出: "ZY"
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
std::string convertToTitle(int columnNumber) {
    std::string result = "";
    while (columnNumber > 0) {
        columnNumber -= 1;
        char ch = 'A' + columnNumber % 26;
        result = ch + result;
        columnNumber /= 26;
    }
    return result;
}

// 测试例子
std::cout << convertToTitle(1) << std::endl;   // 输出: "A"
std::cout << convertToTitle(28) << std::endl;  // 输出: "AB"
std::cout << convertToTitle(701) << std::endl; // 输出: "ZY"
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function convertToTitle(columnNumber) {
    let result = '';
    while (columnNumber > 0) {
        columnNumber--;
        let remainder = columnNumber % 26;
        result = String.fromCharCode(remainder + 65) + result;
        columnNumber = Math.floor(columnNumber / 26);
    }
    return result;
}

// 测试例子
console.log(convertToTitle(1));   // 输出: "A"
console.log(convertToTitle(28));  // 输出: "AB"
console.log(convertToTitle(701)); // 输出: "ZY"
```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public String convertToTitle(int columnNumber) {
        StringBuilder result = new StringBuilder();
        while (columnNumber > 0) {
            columnNumber--;
            char ch = (char)('A' + columnNumber % 26);
            result.insert(0, ch);
            columnNumber /= 26;
        }
        return result.toString();
    }

    public static void main(String[] args) {
        Solution solution = new Solution();
        System.out.println(solution.convertToTitle(1));   // 输出: "A"
        System.out.println(solution.convertToTitle(28));  // 输出: "AB"
        System.out.println(solution.convertToTitle(701)); // 输出: "ZY"
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(\log_{26}(n))$，其中 $n$ 是输入的列号。我们在每次迭代中都使 $columnNumber$ 减少一个因子26，因此迭代次数与 $\log_{26}(n)$ 成正比。  
  
空间复杂度：$O(1)$，除了存储结果字符串之外，不需要占用额外的空间。
