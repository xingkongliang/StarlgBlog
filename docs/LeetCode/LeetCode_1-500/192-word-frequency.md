---
sidebar_position: 192
tags:
  - string
  - sort
  - Medium
---

# 192.单词频率

标签: `string`, `sort`

难度: Medium

通过率: 26.37%

原题链接: https://leetcode.com/problems/word-frequency/description/

## 题目描述
编写一个bash脚本，以计算文本文件words.txt中每个单词的频率。假设文件只包含小写字母和空格，单词由一个或多个空格分隔。

## 解题思路
思路是利用shell命令处理文本文件。我们将分步进行：
1. 使用`tr`命令将非字母字符转换为空格，这在本题中不是必须的，因为已知输入只包含小写字母和空格。
2. 使用`tr -s`命令将多空格缩减为单空格，并用`tr '\n' ' '`将换行符换成空格，将所有单词行聚合成一行。
3. 使用`tr ' '`将空格换成换行符，这样每一行都是一个单词。
4. 使用`sort`命令对单词进行排序。
5. 使用`uniq -c`命令计算每个单词出现的次数，前面是count，后面是单词。
6. 使用`sort -nr`根据频率降序排列单词。
7. 使用`awk`格式化输出，使单词和频率之间有空格分隔。

一个示例的完整Unix shell命令为：
```sh
cat words.txt | tr -s ' ' '\n' | sort | uniq -c | sort -nr | awk '{print $2, $1}'
```

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# 使用cat读取文件内容，然后使用tr将空格转换为换行，然后排序并用uniq来计数每个单词的频率，
# 最后用sort命令根据频率降序排列，并用awk格式化输出。
cat words.txt | tr -s ' ' '
' | sort | uniq -c | sort -nr | awk '{print $2, $1}'
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
#!/bin/bash

# 利用管道命令处理文本
cat words.txt | tr -s ' ' '
' | sort | uniq -c | sort -nr | awk '{print $2, $1}'
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript

```

</TabItem>
<TabItem value="java" label="Java">

```java
import java.nio.file.*;
import java.io.*;
import java.util.*;

public class WordFrequency {
    public static void main(String[] args) throws IOException {
        Path path = Paths.get("words.txt");
        List<String> lines = Files.readAllLines(path);

        Map<String, Integer> frequencyMap = new HashMap<>();

        for (String line : lines) {
            String[] words = line.trim().split("\\s+");
            for (String word : words) {
                frequencyMap.put(word, frequencyMap.getOrDefault(word, 0) + 1);
            }
        }

        List<Map.Entry<String, Integer>> entries = new ArrayList<>(frequencyMap.entrySet());
        entries.sort((a, b) -> b.getValue() - a.getValue());

        for (Map.Entry<String, Integer> entry : entries) {
            System.out.println(entry.getKey() + " " + entry.getValue());
        }
    }
}
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度为 $O(n \log n)$，其中 $n$ 是单词总数，因为需要对单词进行排序。  
  
空间复杂度为 $O(n)$，主要用于存储所有的单词及其频率。
