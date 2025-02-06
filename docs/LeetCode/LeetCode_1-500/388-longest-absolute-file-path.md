---
sidebar_position: 388
tags:
  - string
  - stack
  - Medium
---

# 388.最长绝对文件路径

标签: `string`, `stack`

难度: Medium

通过率: 47.95%

原题链接: https://leetcode.com/problems/longest-absolute-file-path/description/

## 题目描述
假设我们有一个文件系统，该文件系统存储文件和目录。给定一个以文本形式表示的文件系统，返回该文件系统中最长文件的绝对路径长度。如果系统中没有文件，则返回0。

## 解题思路
首先，我们需要解析给定的文件系统字符串，识别出其中的目录和文件。我们可以用换行符 `\n` 将输入字符串分成多行，每行代表一个目录或文件。然后我们用制表符 `\t` 计数来识别目录或文件所在的深度（层级）。用一个栈来模拟文件系统的路径结构，栈中的元素表示当前路径下各级目录的长度。对于每一行：

1. 计算当前行的层级深度。
2. 如果当前层级到达新的文件或目录，根据深度，我们将栈中多余的部分弹出（需要维持栈中的元素和当前深度一致）。
3. 如果是文件，计算该文件的绝对路径长度，并更新最大路径长度。
4. 如果是目录，把当前的目录长度（包含 `/`）加入到栈中。

这种方法确保我们总是记录当前路径下的子目录，并能在遇到文件时正确计算出其绝对路径的长度。

## 代码实现
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="python" label="Python">

```python
def lengthLongestPath(input: str) -> int:
    # 初始化最大路径长度和栈
    max_length = 0
    path_length = {0: 0}  # path_length[depth] 用于记录当前深度下路径的长度

    for line in input.split('
'):
        name = line.lstrip('\t')  # 去除前导制表符，得到实际的文件/目录名称
        depth = len(line) - len(name)  # 当前行的深度

        if '.' in name:
            # 是文件，计算文件路径长度并更新最大路径长度
            max_length = max(max_length, path_length[depth] + len(name))
        else:
            # 是目录，更新当前深度的路径长度
            path_length[depth + 1] = path_length[depth] + len(name) + 1

    return max_length

```

</TabItem>
<TabItem value="cpp" label="C++">

```cpp
class Solution {
public:
    int lengthLongestPath(string input) {
        int max_length = 0;
        unordered_map<int, int> path_length; // path_length[depth]
        path_length[0] = 0;

        stringstream ss(input);
        string line;
        while (getline(ss, line, '
')) {
            int depth = 0;
            while (line[depth] == '\t') depth++;

            string name = line.substr(depth);
            if (name.find('.') != string::npos) {
                // 文件
                max_length = max(max_length, path_length[depth] + (int)name.size());
            } else {
                // 目录
                path_length[depth + 1] = path_length[depth] + (int)name.size() + 1;
            }
        }
        return max_length;
    }
};

```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
function lengthLongestPath(input) {
    let maxLength = 0;
    const pathLength = {0: 0};

    input.split('
').forEach(line => {
        const name = line.replace(/^\t+/, '');
        const depth = line.length - name.length;

        if (name.includes('.')) {
            // 如果是文件
            maxLength = Math.max(maxLength, pathLength[depth] + name.length);
        } else {
            // 如果是目录
            pathLength[depth + 1] = pathLength[depth] + name.length + 1;
        }
    });

    return maxLength;
}

```

</TabItem>
<TabItem value="java" label="Java">

```java
public class Solution {
    public int lengthLongestPath(String input) {
        int maxLength = 0;
        Map<Integer, Integer> pathLength = new HashMap<>();
        pathLength.put(0, 0);

        for (String line : input.split("
")) {
            int depth = line.lastIndexOf('\t') + 1;
            String name = line.substring(depth);

            if (name.contains(".")) {
                // 是文件
                maxLength = Math.max(maxLength, pathLength.get(depth) + name.length());
            } else {
                // 是目录
                pathLength.put(depth + 1, pathLength.get(depth) + name.length() + 1);
            }
        }

        return maxLength;
    }
}

```

</TabItem>
</Tabs>

## 复杂度分析
时间复杂度：$O(n)$，其中 $n$ 是输入字符串的长度。我们对输入的每个字符进行一次线性扫描。  
  
空间复杂度：$O(d)$，其中 $d$ 是文件系统的最大深度。我们使用一个哈希表来储存每个深度的路径长度。
