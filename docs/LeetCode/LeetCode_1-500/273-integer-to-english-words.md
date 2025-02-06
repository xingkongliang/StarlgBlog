---
sidebar_position: 273
tags:
  - string
  - math
  - Hard
---

# 273.整数转英文单词

标签: `string`, `math`

难度: Hard

通过率: 34.15%

原题链接: https://leetcode.com/problems/integer-to-english-words/description/

## 题目描述
将非负整数转换为其英文单词表示形式。

## 解题思路
解决这个问题的关键在于分解数字并将其映射到英语单词。我们需要将数位分成不同的块（千、百万、十亿级等），对于每个块单独处理：

1. 设置映射表将个位数、十位数、百位数以及十到十九的数字映射为相应英文单词。
2. 按三位数为一个块对原始数字进行处理，这使得可以循环处理千、百万、亿这些块。
3. 对每一个三位数部分，分别处理个位、十位和百位，如果非零，则加上相应的单词。此外，根据块的位置添加“Thousand”、“Million”或“Billion”。

同时，我们需要注意以下几点：

- 处理特殊情况，比如当输入为0，直接返回"Zero"。
- 每个块应先剔除前缀0。
- 为避免字符串空格冗余，确保每层处理后适当修剪字符串。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# Python 版本
class Solution:
    def numberToWords(self, num: int) -> str:
        # 定义辅助函数
        def one(num):
            return ["", "One", "Two", "Three", "Four", "Five", 
                    "Six", "Seven", "Eight", "Nine"][num]
        
        def two_less_20(num):
            return ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", 
                    "Sixteen", "Seventeen", "Eighteen", "Nineteen"][num - 10]
        
        def ten(num):
            return ["", "", "Twenty", "Thirty", "Forty", "Fifty", 
                    "Sixty", "Seventy", "Eighty", "Ninety"][num]
        
        def two(num):
            if num == 0:
                return ""
            elif num < 10:
                return one(num)
            elif num < 20:
                return two_less_20(num)
            else:
                tenner = num // 10
                rest = num - tenner * 10
                return ten(tenner) + (" " + one(rest) if rest != 0 else "")

        def three(num):
            hundred = num // 100
            rest = num - hundred * 100
            result = ""
            if hundred != 0:
                result += one(hundred) + " Hundred"
            if rest != 0:
                if result != "":
                    result += " "
                result += two(rest)
            return result

        if num == 0:
            return "Zero"

        billion = num // 1000000000
        million = (num - billion * 1000000000) // 1000000
        thousand = (num - billion * 1000000000 - million * 1000000) // 1000
        rest = num - billion * 1000000000 - million * 1000000 - thousand * 1000

        result = ""
        if billion != 0:
            result += three(billion) + " Billion"
        if million != 0:
            if result != "":
                result += " "
            result += three(million) + " Million"
        if thousand != 0:
            if result != "":
                result += " "
            result += three(thousand) + " Thousand"
        if rest != 0:
            if result != "":
                result += " "
            result += three(rest)
        return result
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// C++ 版本
class Solution {
public:
    string numberToWords(int num) {
        if (num == 0) return "Zero";
        return helper(num).substr(1);
    }
    
private:
    // 构建数字到单词的映射
    vector<string> LESS_THAN_20 = {"", "One", "Two", "Three", "Four", "Five", 
                                   "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", 
                                   "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", 
                                   "Eighteen", "Nineteen"};
    vector<string> TENS = {"", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"};
    vector<string> THOUSANDS = {"", " Thousand", " Million", " Billion"};

    string helper(int num) {
        if (num == 0) return "";
        int i = 0;
        string words = "";
        while (num > 0) {
            if (num % 1000 != 0) {
                words = helper1000(num % 1000) + THOUSANDS[i] + words;
            }
            num /= 1000;
            ++i;
        }
        return words;
    }

    string helper1000(int num) {
        if (num == 0) return "";
        else if (num < 20) return " " + LESS_THAN_20[num];
        else if (num < 100) return " " + TENS[num / 10] + helper1000(num % 10);
        else return " " + LESS_THAN_20[num / 100] + " Hundred" + helper1000(num % 100);
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// JavaScript 版本
var numberToWords = function(num) {
    if (num === 0) return "Zero";

    const LESS_THAN_TWENTY = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const TENS = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const THOUSANDS = ["", " Thousand", " Million", " Billion"];

    const helper = (num) => {
        if (num === 0) return "";
        else if (num < 20) return LESS_THAN_TWENTY[num] + " ";
        else if (num < 100) return TENS[Math.floor(num / 10)] + " " + helper(num % 10);
        else return LESS_THAN_TWENTY[Math.floor(num / 100)] + " Hundred " + helper(num % 100);
    };

    let result = "";
    let i = 0;
    while (num > 0) {
        if (num % 1000 !== 0) {
            result = helper(num % 1000) + THOUSANDS[i] + " " + result;
        }
        num = Math.floor(num / 1000);
        i++;
    }
    return result.trim();
};
```

</TabItem>
<TabItem value="java" label="Java">

```java
// Java 版本
class Solution {
    private String[] LESS_THAN_20 = {"", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"};
    private String[] TENS = {"", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"};
    private String[] THOUSANDS = {"", " Thousand", " Million", " Billion"};

    public String numberToWords(int num) {
        if (num == 0) return "Zero";
        int i = 0;
        String words = "";
        while (num > 0) {
            if (num % 1000 != 0) {
                words = helper(num % 1000) + THOUSANDS[i] + " " + words;
            }
            num /= 1000;
            i++;
        }
        return words.trim();
    }

    private String helper(int num) {
        if (num == 0) return "";
        else if (num < 20) return LESS_THAN_20[num] + " ";
        else if (num < 100) return TENS[num / 10] + " " + helper(num % 10);
        else return LESS_THAN_20[num / 100] + " Hundred " + helper(num % 100);
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：对每个千位块都必须进行一次有限循环处理，因此整体时间复杂度为 $O(N)$ ，其中 $N$ 为整数的位数（最多能达到10位）。


空间复杂度：主要取决于数字与单词的映射表及构建最终输出的字符串，空间复杂度为 $O(1)$ 因为使用的辅助空间是常数级别的。即便产生的字符串本身有所增长，但其空间不影响算法的渐进复杂度。
