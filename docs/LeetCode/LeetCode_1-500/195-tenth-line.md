---
sidebar_position: 195
tags:
  - string
  - Easy
---

# 195.第十行

标签: `string`

难度: Easy

通过率: 33.91%

原题链接: https://leetcode.com/problems/tenth-line/description/

## 题目描述
给定一个文本文件 file.txt，输出该文件的第十行内容。通常假设文件有如下内容： ` Line 1  Line 2  Line 3  Line 4  Line 5  Line 6  Line 7  Line 8  Line 9  Line 10 ` 你的脚本应该输出第十行内容： ` Line 10 ` **注意：**  
1. 如果文件中少于10行，应该输出什么？ 
2. 有至少三种不同的解决方案，尝试探索所有可能性。

## 解题思路
我们需要读取文本文件中的第十行，并需要处理以下条件：如果文件中行数少于十行，则输出为空。可以通过以下几种方法来实现：

1. **使用 `awk` 命令**：`awk 'BEGIN { counter=0; } { counter++; if (counter == 10) { print $0; exit; } }' file.txt` 该命令逐行读取文件，一旦计数器达到10，就输出当前行并退出。

2. **使用 `sed` 命令**： 使用 `sed -n '10p' file.txt` 可以直接打印第十行。

3. **使用 `head` 和 `tail` 组合**：可以先用 `head -n 10 file.txt` 取出前10行，然后用 `tail -n 1` 取出最后一行。整个命令为 `head -n 10 file.txt | tail -n 1`。

这些方法在文件长度不足10行时会输出空行。文件处理命令本身会在没有足够行数时不做输出。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# Read the tenth line of a file using awk
awk 'BEGIN { counter=0; } { counter++; if (counter == 10) { print $0; exit; } }' file.txt
```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
# 使用 sed 打印第十行
# -n 表示抑制默认输出，'10p' 命令打印第十行
sed -n '10p' file.txt
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
# 使用 head 和 tail 组合
# head -n 10 取前十行，tail -n 1 取出最后一行，即第十行
head -n 10 file.txt | tail -n 1
```

</TabItem>
<TabItem value="java" label="Java">

```java
# 将以上命令的逻辑转换为 Java 或 Python 中的文件处理:
# 这是一个 Python 示例，用于情境说明
with open('file.txt') as f:
    lines = f.readlines()
    if len(lines) >= 10:
        print(lines[9].strip())  # 文件行从0开始计数
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：

处理文件的复杂度取决于到达指定行之前需要读取的行数。在最坏情况，即读取第10行时，复杂度可以视为 $O(N)$，其中 $N$ 是文件的行数（但实际上只对前十行进行操作）。


空间复杂度：

由于只是逐行读取文件，不会存储整个文件在内存中，所以空间复杂度为 $O(1)$。但如果在代码中使用类似 `readlines` 所有行都存入内存，空间复杂度将为 $O(N)$。
