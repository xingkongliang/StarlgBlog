---
sidebar_position: 68
tags:
  - greedy
  - string
  - Hard
---

# 68.文本对齐

标签: `greedy`, `string`

难度: Hard

通过率: 46.18%

原题链接: https://leetcode.com/problems/text-justification/description/

## 题目描述
给定一个字符串数组 `words` 和一个整数 `maxWidth`，格式化文本，使每行恰好有 `maxWidth` 个字符，并且为完全（左右两边）对齐。 通过贪心算法来排列，每行尽可能多地装入单词，必要时用额外的空格填充，使每行恰好达到 `maxWidth`。多余的空格应该尽可能均匀地分配在单词之间。如果一个行中的空格不能均匀分配，则左侧的空格比右侧的多。最后一行文本应左对齐，且单词之间不插入额外的空格。

## 解题思路
解决这个问题，我们从左到右扫描 `words`，尝试将尽可能多的单词放入当前行。在将单词放入行中时，我们同时积累当前行中单词的长度总和。如果加入下一个单词会超出 `maxWidth`，我们就开始处理本行：

1. 计算需要的空格数，将空格尽可能平均地分配给每个单词之间。
2. 如果空格不能平均分配（即空格数不能被单词间隔数整除），则前面的空隙需要比后面的多。
3. 如果当前行只有一个单词，则左对齐这个单词，余下的全填充空格。

对于最后一行，要求左对齐，即单词间只放一个空格，行末补足空格至 `maxWidth`。这样，我们迭代处理所有的单词，最终获得完整且对齐的文本输出。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
class Solution:    
    def fullJustify(self, words, maxWidth):
        results = []  # 结果列表
        i = 0        # 当前处理到的单词索引
        while i < len(words):
            # 找出多少个单词能够放到当前行里
            line_length = len(words[i])  # 当前行长度
            last = i + 1  # 探测下一个单词的索引
            while last < len(words):
                if line_length + 1 + len(words[last]) > maxWidth:
                    break
                line_length += 1 + len(words[last])
                last += 1
            # 创建当前行的字符串
            line = ""
            num_words_in_line = last - i
            num_spaces_to_fill = maxWidth - line_length
            if last == len(words) or num_words_in_line == 1:  # 如果是最后一行或只有一个单词
                for j in range(i, last):
                    line += words[j] + " "
                line = line.strip()  # 去掉行末多余的空格
                line += " " * (maxWidth - len(line))  # 补充至 maxWidth长度
            else:
                spaces_between_words = num_spaces_to_fill // (num_words_in_line - 1)
                extra_spaces = num_spaces_to_fill % (num_words_in_line - 1)
                for j in range(i, last - 1):
                    line += words[j] + " " * (spaces_between_words + (1 if j - i < extra_spaces else 0))
                line += words[last - 1]  # 加上最后一个单词
            results.append(line)
            i = last
        return results
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    vector<string> fullJustify(vector<string>& words, int maxWidth) {
        vector<string> result;  // 结果集合
        int i = 0;
        while (i < words.size()) {
            int lineLength = words[i].length();  // 当前行已占用长度
            int last = i + 1;
            while (last < words.size()) {
                if (lineLength + 1 + words[last].length() > maxWidth) break;
                lineLength += 1 + words[last].length();
                last++;
            }
            string line = words[i];
            int numWordsInLine = last - i;
            if (last == words.size() || numWordsInLine == 1) {  // 处理最后一行或只有一个单词
                for (int j = i + 1; j < last; j++) {
                    line += " " + words[j];
                }
                line += string(maxWidth - line.length(), ' ');  // 填充空格至 maxWidth
            } else {
                int spacesBetweenWords = (maxWidth - lineLength) / (numWordsInLine - 1);
                int extraSpaces = (maxWidth - lineLength) % (numWordsInLine - 1);
                for (int j = i + 1; j < last; j++) {
                    int spaces = spacesBetweenWords + (extraSpaces-- > 0 ? 1 : 0);
                    line += string(spaces, ' ') + words[j];
                }
            }
            result.push_back(line);
            i = last;
        }
        return result;
    }
};
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function fullJustify(words, maxWidth) {
    let result = [];  // 存储结果的数组
    let i = 0;
    while (i < words.length) {
        let line = [], lineLength = words[i].length;
        let last = i + 1;
        // 尝试放更多的单词到当前行
        while (last < words.length) {
            if (lineLength + 1 + words[last].length > maxWidth) break;
            lineLength += 1 + words[last].length;
            last++;
        }
        line.push(words[i]);
        let numLineWords = last - i;
        if (last == words.length || numLineWords === 1) {  // 左对齐处理
            for (let j = i + 1; j < last; j++) line.push(" ", words[j]);
            line.push(" ".repeat(maxWidth - lineLength));  // 填充至 maxWidth
        } else {  // 间隔均匀分布
            let spacesBetween = Math.floor((maxWidth - lineLength) / (numLineWords - 1));
            let extraSpaces = (maxWidth - lineLength) % (numLineWords - 1);
            for (let j = i + 1; j < last; j++) {
                let spaces = spacesBetween + (extraSpaces-- > 0 ? 1 : 0);
                line.push(" ".repeat(spaces), words[j]);
            }
        }
        result.push(line.join(''));
        i = last;
    }
    return result;
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
class Solution {
    public List<String> fullJustify(String[] words, int maxWidth) {
        List<String> result = new ArrayList<>();  // 结果列表
        int index = 0;
        while (index < words.length) {
            int totalChars = words[index].length();  // 当前行总长度
            int last = index + 1;
            // 找出能放多少单词到一行
            while (last < words.length) {
                if (totalChars + 1 + words[last].length() > maxWidth) break;
                totalChars += 1 + words[last].length();
                last++;
            }
            StringBuilder builder = new StringBuilder();
            int numWordsInLine = last - index;
            if (last == words.length || numWordsInLine == 1) {  // 左对齐处理
                for (int i = index; i < last; i++) {
                    builder.append(words[i]).append(" ");
                }
                builder.deleteCharAt(builder.length() - 1);  // 移除多余空格
                int remaining = maxWidth - builder.length();
                for (int i = 0; i < remaining; i++) {
                    builder.append(" ");
                }
            } else {  // 完全对齐处理
                int spaces = (maxWidth - totalChars) / (numWordsInLine - 1);
                int extraSpaces = (maxWidth - totalChars) % (numWordsInLine - 1);
                for (int i = index; i < last - 1; i++) {
                    builder.append(words[i]);
                    builder.append(" ");
                    for (int j = 0; j < spaces + (i - index < extraSpaces ? 1 : 0); j++) {
                        builder.append(" ");
                    }
                }
                builder.append(words[last - 1]);  // 追加最后一个单词
            }
            result.add(builder.toString());
            index = last;
        }
        return result;
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是所有字符数的总和。因为我们遍历所有单词，并且调整字符间距。
空间复杂度：$O(1)$，不计算输出结果的空间，代码主要使用常量级别的额外空间。
