---
sidebar_position: 194
tags:
  - array
  - string
  - Medium
---

# 194.转置文件

标签: `array`, `string`

难度: Medium

通过率: 27.27%

原题链接: https://leetcode.com/problems/transpose-file/description/

## 题目描述
给定一个文本文件 `file.txt` ，请转置其内容。可以假设每一行有相同数量的列，并且每个字段由空格字符分隔。

## 解题思路
要转置文件的内容，我们需要把文本文件的每一行都视作一个字符串数组，数组中的每个元素代表文本中的一个字段。转置的操作类似于矩阵转置，即将文本的第 `i` 行的第 `j` 列元素变换到第 `j` 行的第 `i` 列。假设文本文件是 `file.txt`，操作步骤如下：

1. 读取文件中的每一行，分割成字符串数组。
2. 根据行数和列数建立一个新的数组，准备存储转置后的内容。
3. 遍历原始数组，把每个元素放到新的数组中的相应位置。
4. 使用新的数组内容写入输出，得到转置后的文件内容。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
# 执行 Shell 脚本可以使用命令行工具

# 使用awk命令进行文件转置的代码示例:
awk '  
{ 
    # 逐列处理每一行
    for(i=1; i<=NF; i++) 
    {
        # 读取第i列的元素，追加到数组tranpose中对应的行
        if(NR==1)
            tranpose[i]=$i
        else
            tranpose[i]=tranpose[i] " "$i
    }

} 
END 
{
    # 输出转置后的结果
    for(i=1; i<=NF; i++)
        print tranpose[i]   
}' file.txt


```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
// 使用C++还需要shell命令提前处理好

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// 使用JavaScript还需要shell命令提前处理好

```

</TabItem>
<TabItem value="java" label="Java">

```java
// 使用Java还需要shell命令提前处理好
```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：对于文件中每一个元素，我们都需要读取并写入新的位置，时间复杂度是 $O(m \cdot n)$，其中$m$是行数，$n$是列数。  
  
空间复杂度：需要一个额外的存储空间来存储转置后的内容，因此空间复杂度是 $O(m \cdot n)$。
